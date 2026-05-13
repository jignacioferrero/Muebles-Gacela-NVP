import emailjs from '@emailjs/browser';

// ─── EmailJS Configuration ───────────────────────────────────────────────────
// Configurar estas variables en el archivo .env.local del proyecto
// Ver README_EMAIL_SETUP.md para instrucciones paso a paso
const PUBLIC_KEY    = import.meta.env.VITE_EMAILJS_PUBLIC_KEY   || '';
const SERVICE_ID    = import.meta.env.VITE_EMAILJS_SERVICE_ID   || '';
const TEMPLATE_ID   = import.meta.env.VITE_EMAILJS_TEMPLATE_ID  || '';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface EmailPayload {
  subject:    string;
  from_name:  string;
  from_email: string;
  message:    string;
  extra?:     Record<string, string>;
}

// ─── Send Email ───────────────────────────────────────────────────────────────
export async function sendEmail(payload: EmailPayload): Promise<void> {
  if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
    // En desarrollo, simular envío si no hay credenciales configuradas
    console.warn('[EmailJS] No están configuradas las variables de entorno. Simulando envío:', payload);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  }

  const templateParams = {
    subject:    payload.subject,
    from_name:  payload.from_name,
    from_email: payload.from_email,
    message:    payload.message,
    to_email:   'info@mueblesgacela.com.ar',
    ...payload.extra,
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}
