import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/contact-schema';

// Read env at request time, not module load, so a missing key gives a clean
// 500 instead of crashing the build.
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  return new Resend(key);
}

// Cheap per-IP rate limit. In-memory — survives only as long as the
// serverless function instance does (minutes). Swap for Upstash Redis if
// real abuse becomes a problem.
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(ip, hits);
    return true;
  }
  hits.push(now);
  recent.set(ip, hits);
  return false;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests — try again in a minute.' },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ?? 'Validation failed.',
      },
      { status: 400 },
    );
  }

  // Honeypot triggered — silently succeed without sending.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, subject, message } = parsed.data;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!toEmail || !fromEmail) {
    console.error('CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set');
    return NextResponse.json(
      { error: 'Server is not configured.' },
      { status: 500 },
    );
  }

  try {
    const resend = getResend();
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] New message from ${name}`,
      text: [
        `From: ${name} <${email}>`,
        subject ? `Subject: ${subject}` : null,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    if (result.error) {
      console.error('Resend error', result.error);
      // In dev, surface the real reason so config issues (unverified domain,
      // bad API key, etc.) are visible in the UI instead of swallowed.
      // In prod, keep it generic so we don't leak internals to attackers.
      const message =
        process.env.NODE_ENV === 'development'
          ? `Resend: ${result.error.message ?? 'unknown error'}`
          : 'Send failed — try again.';
      return NextResponse.json({ error: message }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact route exception', err);
    return NextResponse.json(
      { error: 'Server error.' },
      { status: 500 },
    );
  }
}
