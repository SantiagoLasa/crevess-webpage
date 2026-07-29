// Cloudflare Pages Function — POST /api/contact
// Independiente del build de Next (modo export). Cloudflare la compila y
// despliega como Worker automáticamente por vivir en /functions.
//
// Flujo: valida payload (zod, mismo schema del cliente) → honeypot →
// rate limit por IP → verificación Turnstile → Resend (correo al equipo +
// acuse al visitante).
//
// Env vars (Cloudflare Pages → Settings → Environment variables):
//   RESEND_API_KEY        — API key de Resend
//   TURNSTILE_SECRET_KEY  — secreto de Turnstile (si falta, se omite la
//                           verificación: útil en previews, nunca en prod)
//   CONTACT_TO_EMAIL      — bandeja del equipo
//   CONTACT_FROM_EMAIL    — remitente verificado en Resend
// Nunca en el repo, nunca con prefijo NEXT_PUBLIC_.

import { contactSchema } from '../../src/lib/contact-schema';

type Env = {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

// Rate limit en memoria del isolate: suficiente como primera barrera (se
// resetea en cold starts). Para garantías duras, sumar una regla WAF de
// Cloudflare o un binding KV.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Limpieza oportunista para no crecer sin límite.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => t <= windowStart)) hits.delete(key);
    }
  }
  return false;
}

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function verifyTurnstile(
  secret: string,
  token: string | undefined,
  ip: string,
): Promise<boolean> {
  if (!token) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

async function sendEmail(
  apiKey: string,
  payload: Record<string, unknown>,
): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return res.ok;
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(400, { ok: false, error: 'invalid' });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: 'invalid' });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return json(400, { ok: false, error: 'invalid' });
  const data = parsed.data;

  // Honeypot con algo escrito: bot. Respondemos ok y descartamos en silencio.
  if (data.website) return json(200, { ok: true });

  if (rateLimited(ip)) return json(429, { ok: false, error: 'rate_limited' });

  if (env.TURNSTILE_SECRET_KEY) {
    const human = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, data.turnstileToken, ip);
    if (!human) return json(403, { ok: false, error: 'turnstile' });
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    console.error('contact: faltan env vars de correo');
    return json(500, { ok: false, error: 'server' });
  }

  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Brand', data.brand],
    ['Instagram', data.instagram || '—'],
    ['Service', data.service],
    ['Budget', data.budget],
    ['Message', data.message],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6F6257">${k}</td><td style="padding:6px 0;color:#241C16">${escapeHtml(String(v))}</td></tr>`,
    )
    .join('');

  const teamSent = await sendEmail(env.RESEND_API_KEY, {
    from: env.CONTACT_FROM_EMAIL,
    to: env.CONTACT_TO_EMAIL,
    reply_to: data.email,
    subject: `New application — ${data.brand}`,
    html: `<table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
  });

  if (!teamSent) {
    console.error('contact: fallo el envio al equipo');
    return json(500, { ok: false, error: 'server' });
  }

  // Acuse al visitante — si falla, no bloquea la respuesta exitosa.
  await sendEmail(env.RESEND_API_KEY, {
    from: env.CONTACT_FROM_EMAIL,
    to: data.email,
    subject: 'We received your application — Crevess',
    html: `<div style="font-family:sans-serif;font-size:14px;color:#241C16"><p>Hi ${escapeHtml(data.name)},</p><p>Thanks for reaching out to Crevess. We received your application and will reply within two business days.</p><p>— The Crevess team</p></div>`,
  });

  return json(200, { ok: true });
}
