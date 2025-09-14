import type { Apod } from "../models/Apod";

export function addFavourite(apod: Apod) {
  const apodKey = apod.date + apod.title;

  const stored = localStorage.getItem("favourites");
  let cached: Apod[] = stored ? JSON.parse(stored) : [];

  const exists = cached.some(a => a.date + a.title === apodKey);

  if (exists) {
    cached = cached.filter(a => a.date + a.title !== apodKey);
  } else {
    cached.push(apod);
  }

  localStorage.setItem("favourites", JSON.stringify(cached));
}

export function share(apod: Apod) {
  const email = "";
  const subject = `Mirá este APOD: ${apod.title}`;

  let body = `Hola!\n\nQuería compartirte este APOD que encontré:\n\n`;
  body += `Título: ${apod.title}\n\n`;
  body += `Fecha: ${apod.date}\n\n`;
  body += `Mirá la imagen/video acá: ${apod.url}\n\n`;

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.open(mailtoLink);
}
