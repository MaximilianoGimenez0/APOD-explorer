import emailjs from "emailjs-com";
import type { SurveyFormData } from "@/utils/validation";

/**
 * Configuración del servicio de correo inyectada desde variables de entorno.
 */
export const EMAIL_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  email: import.meta.env.VITE_EMAIL,
} as const;

/**
 * Envía el formulario de encuesta mediante EmailJS utilizando las credenciales de entorno.
 *
 * @param formData Datos completados por el usuario en la encuesta
 * @returns Promesa con la respuesta del envío de EmailJS
 */
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
