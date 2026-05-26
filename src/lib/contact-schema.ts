import { z } from 'zod';

/** Shared validation for the contact form — used on both client and server. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name is too short')
    .max(80, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email'),
  subject: z
    .string()
    .trim()
    .min(3, 'Subject is too short')
    .max(120, 'Subject is too long')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'Tell me a bit more')
    .max(4000, 'Message is too long'),
  // Honeypot — bots fill hidden fields, humans never do. Server silently
  // 200s (without sending) when this is non-empty.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
