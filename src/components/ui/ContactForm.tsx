'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';
import { EASE } from '@/lib/animations';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'error'; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      website: '',
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setStatus({
          kind: 'error',
          message: json.error ?? 'Send failed — try again.',
        });
        return;
      }
      setStatus({ kind: 'sent' });
      reset();
    } catch {
      setStatus({
        kind: 'error',
        message: 'Network error. Check your connection and try again.',
      });
    }
  };

  if (status.kind === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-8"
      >
        <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
          Sent
        </div>
        <p className="font-display text-2xl text-emerald-100 md:text-3xl">
          Message received.
        </p>
        <p className="mt-3 text-sm text-ink-300">
          I&apos;ll be in touch soon. Thanks for reaching out.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: 'idle' })}
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400 underline-offset-4 transition-colors hover:text-accent-glow hover:underline"
        >
          Send another →
        </button>
      </motion.div>
    );
  }

  const sending = status.kind === 'sending';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Honeypot — hidden from humans, irresistible to bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="!hidden"
        {...register('website')}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message} required>
          <input
            {...register('name')}
            autoComplete="name"
            className="input"
            placeholder="Your name"
            disabled={sending}
          />
        </Field>

        <Field label="Email" error={errors.email?.message} required>
          <input
            {...register('email')}
            type="email"
            autoComplete="email"
            className="input"
            placeholder="you@studio.com"
            disabled={sending}
          />
        </Field>
      </div>

      <Field label="Subject (optional)" error={errors.subject?.message}>
        <input
          {...register('subject')}
          className="input"
          placeholder="Project enquiry, role, collaboration…"
          disabled={sending}
        />
      </Field>

      <Field label="Message" error={errors.message?.message} required>
        <textarea
          {...register('message')}
          rows={5}
          className="input resize-none"
          placeholder="Tell me a bit about what you're working on."
          disabled={sending}
        />
      </Field>

      <div className="mt-3 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          data-hover
          className="group inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-50 px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] text-ink-950 shadow-[0_10px_40px_-10px_rgba(243,217,177,0.45)] transition-colors duration-500 hover:bg-accent-glow disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? 'Sending…' : 'Send message'}
          {!sending && (
            <span
              aria-hidden
              className="translate-x-0 transition-transform duration-500 ease-out group-hover:translate-x-1"
            >
              ↗
            </span>
          )}
        </button>

        {status.kind === 'error' && (
          <p
            role="alert"
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-300"
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-400">
        {label}
        {required && (
          <span aria-hidden className="text-accent-glow/70">
            *
          </span>
        )}
      </span>
      {children}
      {error && (
        <span
          role="alert"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-300"
        >
          {error}
        </span>
      )}
    </label>
  );
}
