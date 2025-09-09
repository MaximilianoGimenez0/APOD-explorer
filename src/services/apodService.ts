import type { Apod } from "../models/Apod";
import { API_URL,API_KEY } from "./constats";

export async function getFilteredApodImages(
  year: number = 2024,
  month: number = 12
): Promise<Apod[]> {
  
  let start_date = "";
  let end_date = "";

  const mm = String(month).padStart(2, "0");

  if (month === 12) {
    start_date = `${year}-${mm}-01`;
    end_date = `${year + 1}-01-01`;
  } else {
    const nextMonth = String(month + 1).padStart(2, "0");
    start_date = `${year}-${mm}-01`;
    end_date = `${year}-${nextMonth}-01`;
  }

  console.log(start_date);
  console.log(end_date);

  const response = await fetch(
    `${API_URL}?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Error al cargar imágenes de la NASA");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

export async function getRandomApodImages(count: number = 6): Promise<Apod[]> {
  const response = await fetch(`${API_URL}?count=${count}&api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Error al cargar imágenes de la NASA");
  }
  return response.json();
}
