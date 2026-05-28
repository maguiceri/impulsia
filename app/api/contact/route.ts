import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
    }

    const { error: sendError } = await resend.emails.send({
      from: 'Impulsia Web <onboarding@resend.dev>',
      to: 'magui.cerisola@gmail.com',
      replyTo: email,
      subject: `Nuevo mensaje de ${name} — Impulsia`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#fafafa;border-radius:12px;">
          <h2 style="margin:0 0 8px;font-size:1.2rem;color:#0d0b18;">Nuevo mensaje desde la web</h2>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
          <p style="margin:0 0 6px;font-size:0.85rem;color:#888;">Nombre</p>
          <p style="margin:0 0 16px;font-size:1rem;color:#0d0b18;">${name}</p>
          <p style="margin:0 0 6px;font-size:0.85rem;color:#888;">Email</p>
          <p style="margin:0 0 16px;font-size:1rem;color:#0d0b18;"><a href="mailto:${email}">${email}</a></p>
          <p style="margin:0 0 6px;font-size:0.85rem;color:#888;">Mensaje</p>
          <p style="margin:0;font-size:1rem;color:#0d0b18;white-space:pre-wrap;">${message}</p>
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
