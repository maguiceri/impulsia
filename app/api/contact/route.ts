import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 3 requests per IP per 10 minutes
const WINDOW_MS  = 10 * 60 * 1000;
const MAX_REQS   = 3;
const ipHits     = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now  = Date.now();
  const slot = ipHits.get(ip);
  if (!slot || now > slot.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (slot.count >= MAX_REQS) return false;
  slot.count++;
  return true;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Demasiados intentos. Esperá unos minutos.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const name    = typeof body.name    === 'string' ? body.name.trim()    : '';
    const email   = typeof body.email   === 'string' ? body.email.trim()   : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
    }
    if (name.length > 100 || email.length > 254 || message.length > 5000) {
      return NextResponse.json({ error: 'Un campo excede el largo permitido.' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'El email no es válido.' }, { status: 400 });
    }

    const safeName    = escapeHtml(name);
    const safeEmail   = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const { error: sendError } = await resend.emails.send({
      from: 'Impulsia Web <onboarding@resend.dev>',
      to: 'magui.cerisola@gmail.com',
      replyTo: email,
      subject: `Nuevo mensaje de ${safeName} — Impulsia`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#fafafa;border-radius:12px;">
          <h2 style="margin:0 0 8px;font-size:1.2rem;color:#0d0b18;">Nuevo mensaje desde la web</h2>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
          <p style="margin:0 0 6px;font-size:0.85rem;color:#888;">Nombre</p>
          <p style="margin:0 0 16px;font-size:1rem;color:#0d0b18;">${safeName}</p>
          <p style="margin:0 0 6px;font-size:0.85rem;color:#888;">Email</p>
          <p style="margin:0 0 16px;font-size:1rem;color:#0d0b18;"><a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p style="margin:0 0 6px;font-size:0.85rem;color:#888;">Mensaje</p>
          <p style="margin:0;font-size:1rem;color:#0d0b18;white-space:pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return NextResponse.json({ error: 'Error al enviar el mensaje.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error al enviar el mensaje.' }, { status: 500 });
  }
}
