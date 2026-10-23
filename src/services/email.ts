import emailjs from "emailjs-com";
import type { SurveyFormData } from "@/utils/validation";

export const EMAIL_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  email: import.meta.env.VITE_EMAIL,
} as const;

export async function sendSurveyEmail(formData: SurveyFormData) {
  const { serviceId, templateId, publicKey, email } = EMAIL_CONFIG;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "Credenciales de EmailJS incompletas. Asegúrate de configurar VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID y VITE_EMAILJS_PUBLIC_KEY en tu archivo .env"
    );
  }

  const templateParams: Record<string, unknown> = {
    ...formData,
    ...(email ? { to_email: email } : {}),
  };

  return emailjs.send(serviceId, templateId, templateParams, publicKey);
}
