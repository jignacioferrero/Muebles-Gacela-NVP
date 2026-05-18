import emailjs from '@emailjs/browser';

// ─── EmailJS Configuration ───────────────────────────────────────────────────
const PUBLIC_KEY       = import.meta.env.VITE_EMAILJS_PUBLIC_KEY       || '';
const SERVICE_ID       = import.meta.env.VITE_EMAILJS_SERVICE_ID       || '';
const TEMPLATE_CONTACT = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT || '';
const TEMPLATE_CLAIMS  = import.meta.env.VITE_EMAILJS_TEMPLATE_CLAIMS  || '';

// ─── EmailJS RRHH (Sumate) Configuration ─────────────────────────────────────
const RRHH_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_RRHH_PUBLIC_KEY  || '';
const RRHH_SERVICE_ID  = import.meta.env.VITE_EMAILJS_RRHH_SERVICE_ID  || '';
const RRHH_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_RRHH_TEMPLATE_ID || '';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface EmailPayload {
  subject:         string;
  from_name:       string;
  from_email:      string;
  message:         string;
  attachment_url?: string;
  extra?:          Record<string, string>;
}

export interface RRHHEmailPayload {
  from_name:       string;
  from_email:      string;
  phone:           string;
  city:            string;
  interest_area:   string;
  message:         string;
  attachment_url:  string;
}

// ─── Send Email ───────────────────────────────────────────────────────────────
export async function sendEmail(payload: EmailPayload, useClaimsTemplate: boolean = false): Promise<void> {
  const templateId = useClaimsTemplate ? TEMPLATE_CLAIMS : TEMPLATE_CONTACT;

  if (!PUBLIC_KEY || !SERVICE_ID || !templateId) {
    // En desarrollo, simular envío si no hay credenciales configuradas
    console.warn('[EmailJS] No están configuradas las variables de entorno correctas. Simulando envío:', {
      templateId,
      payload,
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  }

  const templateParams = {
    subject:         payload.subject,
    from_name:       payload.from_name,
    from_email:      payload.from_email,
    message:         payload.message,
    attachment_url:  payload.attachment_url || '',
    to_email:        'info@mueblesgacela.com.ar',
    ...payload.extra,
  };

  await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);
}

// ─── Send RRHH Email ─────────────────────────────────────────────────────────
export async function sendRRHHEmail(payload: RRHHEmailPayload): Promise<void> {
  if (!RRHH_PUBLIC_KEY || !RRHH_SERVICE_ID || !RRHH_TEMPLATE_ID) {
    console.warn('[EmailJS - RRHH] No están configuradas las variables de entorno de RRHH. Simulando envío:', payload);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  }

  await emailjs.send(RRHH_SERVICE_ID, RRHH_TEMPLATE_ID, payload as any, RRHH_PUBLIC_KEY);
}

// ─── File Upload Helper (Optional / Fallback) ──────────────────────────────────
export async function uploadAttachment(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    // Subir a un host temporal público para poder enviarlo en el cuerpo del mail
    const response = await fetch('https://file.io/?expires=2w', { // Expira en 2 semanas
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.link;
  } catch (err) {
    console.error('[FileUpload] Fallo la subida a file.io:', err);
    return 'Error al subir el archivo adjunto.';
  }
}


