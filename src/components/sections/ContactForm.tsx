'use client';

import { useCallback, useRef, useState } from 'react';
import { contact } from '@/content/contact';
import { services } from '@/content/services';
import {
  contactSchema,
  type ContactField,
} from '@/lib/contact-schema';
import { cn } from '@/lib/cn';
import { Button } from '../ui/Button';
import { Field, fieldBorderClass, fieldControlClass } from '../ui/Field';

// Sin NEXT_PUBLIC_ para secretos: la site key de Turnstile es pública por
// diseño (va embebida en el HTML de cualquier sitio que lo use).
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status = 'idle' | 'submitting' | 'success' | 'error';
type ServerError = keyof typeof contact.form.serverErrors;

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
        },
      ) => string;
      reset: (id: string) => void;
    };
  }
}

// Turnstile invisible: el script se carga recién cuando el usuario toca el
// formulario; el token llega por callback y viaja con el POST.
function useTurnstile(container: React.RefObject<HTMLDivElement | null>) {
  const token = useRef<string | null>(null);
  const loaded = useRef(false);

  const ensure = useCallback(() => {
    if (!TURNSTILE_SITE_KEY || loaded.current || !container.current) return;
    loaded.current = true;
    const render = () => {
      if (window.turnstile && container.current) {
        window.turnstile.render(container.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (t) => {
            token.current = t;
          },
          'error-callback': () => {
            token.current = null;
          },
        });
      }
    };
    if (window.turnstile) {
      render();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.onload = render;
    document.head.appendChild(script);
  }, [container]);

  return { ensure, token };
}

export function ContactForm() {
  const [values, setValues] = useState<Record<string, string>>({
    name: '',
    email: '',
    brand: '',
    instagram: '',
    service: '',
    budget: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<ServerError>('server');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const { ensure, token } = useTurnstile(turnstileRef);

  const errorFor = (field: ContactField): string | undefined =>
    errors[field] && contact.form.errors[field as keyof typeof contact.form.errors];

  // Validación al perder foco (no al tipear) — sección 7.2.
  const validateField = (field: ContactField) => {
    const single = contactSchema.shape[field];
    const result = single.safeParse(values[field] || undefined);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : field,
    }));
  };

  const set = (field: string) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Un campo ya marcado se revalida al corregirlo, sin esperar otro blur.
    if (field in errors && errors[field as ContactField]) {
      const result = contactSchema.shape[field as ContactField].safeParse(value);
      if (result.success) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse({
      ...values,
      turnstileToken: token.current ?? undefined,
    });
    if (!parsed.success) {
      const fieldErrors: Partial<Record<ContactField, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as ContactField;
        fieldErrors[field] = field;
      }
      setErrors(fieldErrors);
      const first = document.querySelector('[aria-invalid="true"]') as HTMLElement | null;
      first?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        setStatus('success');
        return;
      }
      const data = (await res.json().catch(() => null)) as { error?: ServerError } | null;
      setServerError(data?.error && data.error in contact.form.serverErrors ? data.error : 'server');
      setStatus('error');
    } catch {
      setServerError('network');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-sand p-10" role="status">
        <p className="font-display text-display-m">{contact.form.success.title}</p>
        <p className="mt-4 max-w-[480px] text-body text-stone">
          {contact.form.success.body}
        </p>
      </div>
    );
  }

  const f = contact.form.fields;

  return (
    <form onSubmit={onSubmit} onFocus={ensure} noValidate>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="name" label={f.name.label} error={errorFor('name')}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={f.name.placeholder}
            value={values.name}
            onChange={(e) => set('name')(e.target.value)}
            onBlur={() => validateField('name')}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(fieldControlClass, fieldBorderClass(!!errors.name))}
          />
        </Field>
        <Field id="email" label={f.email.label} error={errorFor('email')}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={f.email.placeholder}
            value={values.email}
            onChange={(e) => set('email')(e.target.value)}
            onBlur={() => validateField('email')}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(fieldControlClass, fieldBorderClass(!!errors.email))}
          />
        </Field>
        <Field id="brand" label={f.brand.label} error={errorFor('brand')}>
          <input
            id="brand"
            name="brand"
            type="text"
            autoComplete="organization"
            placeholder={f.brand.placeholder}
            value={values.brand}
            onChange={(e) => set('brand')(e.target.value)}
            onBlur={() => validateField('brand')}
            aria-invalid={errors.brand ? true : undefined}
            aria-describedby={errors.brand ? 'brand-error' : undefined}
            className={cn(fieldControlClass, fieldBorderClass(!!errors.brand))}
          />
        </Field>
        <Field id="instagram" label={f.instagram.label}>
          <input
            id="instagram"
            name="instagram"
            type="text"
            placeholder={f.instagram.placeholder}
            value={values.instagram}
            onChange={(e) => set('instagram')(e.target.value)}
            className={cn(fieldControlClass, fieldBorderClass(false))}
          />
        </Field>
        <Field id="service" label={f.service.label} error={errorFor('service')}>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={(e) => set('service')(e.target.value)}
            onBlur={() => validateField('service')}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? 'service-error' : undefined}
            className={cn(
              fieldControlClass,
              fieldBorderClass(!!errors.service),
              !values.service && 'text-stone/60',
            )}
          >
            <option value="" disabled>
              {f.service.placeholder}
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
        <Field id="budget" label={f.budget.label} error={errorFor('budget')}>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(e) => set('budget')(e.target.value)}
            onBlur={() => validateField('budget')}
            aria-invalid={errors.budget ? true : undefined}
            aria-describedby={errors.budget ? 'budget-error' : undefined}
            className={cn(
              fieldControlClass,
              fieldBorderClass(!!errors.budget),
              !values.budget && 'text-stone/60',
            )}
          >
            <option value="" disabled>
              {f.budget.placeholder}
            </option>
            {contact.form.budgetOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="message"
          label={f.message.label}
          error={errorFor('message')}
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder={f.message.placeholder}
            value={values.message}
            onChange={(e) => set('message')(e.target.value)}
            onBlur={() => validateField('message')}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={cn(fieldControlClass, fieldBorderClass(!!errors.message), 'resize-y')}
          />
        </Field>
      </div>

      {/* Honeypot — invisible para humanos, irresistible para bots. */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set('website')(e.target.value)}
        />
      </div>

      <div ref={turnstileRef} />

      {status === 'error' && (
        <p role="alert" className="mt-6 border border-ember/40 bg-linen px-4 py-3 text-caption text-ember">
          {contact.form.serverErrors[serverError]}
        </p>
      )}

      <div className="mt-8">
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? contact.form.submitting : contact.form.submit}
        </Button>
      </div>
    </form>
  );
}
