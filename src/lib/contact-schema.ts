import { z } from 'zod';

// Schema compartido entre el formulario (validación en cliente al perder
// foco) y la Cloudflare Pages Function (validación autoritativa).
// Los mensajes visibles de error viven en content/contact.ts — acá solo
// códigos estables por campo.

export const BUDGET_OPTIONS = ['under-2k', '2k-5k', '5k-10k', '10k-plus'] as const;

export const SERVICE_OPTIONS = [
  'social-media-management',
  'content-creation',
  'event-social-media',
  'video-production',
  'brand-strategy-consulting',
  'other-services',
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'name'),
  email: z.string().trim().email('email'),
  brand: z.string().trim().min(2, 'brand'),
  instagram: z
    .string()
    .trim()
    .transform((v) => v.replace(/^@/, ''))
    .optional()
    .or(z.literal('')),
  service: z.enum(SERVICE_OPTIONS, { errorMap: () => ({ message: 'service' }) }),
  budget: z.enum(BUDGET_OPTIONS, { errorMap: () => ({ message: 'budget' }) }),
  message: z.string().trim().min(10, 'message'),
  // Honeypot: siempre vacío para humanos.
  website: z.string().max(0).optional().or(z.literal('')),
  turnstileToken: z.string().optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;
export type ContactField = keyof Omit<ContactPayload, 'website' | 'turnstileToken'>;
