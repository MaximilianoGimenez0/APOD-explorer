import type { Apod } from "../models/Apod";
import { API_URL, API_KEY } from "@/config/constants";

export const API_TIMEOUT_MS = 60000; // 60 segundos de espera máxima

export class ApodApiError extends Error {
  status?: number;
  isTimeout: boolean;

  constructor(message: string, options?: { status?: number; isTimeout?: boolean }) {
    super(message);
    this.name = "ApodApiError";
    this.status = options?.status;
    this.isTimeout = Boolean(options?.isTimeout);
    Object.setPrototypeOf(this, ApodApiError.prototype);
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = API_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  let isTimedOut = false;

  const timer = setTimeout(() => {
    isTimedOut = true;
    controller.abort();
  }, timeoutMs);

  if (options.signal) {
    if (options.signal.aborted) {
      controller.abort();
    } else {
      options.signal.addEventListener("abort", () => controller.abort(), { once: true });
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } catch (err: unknown) {
    if (isTimedOut || (err instanceof Error && err.name === "AbortError" && isTimedOut)) {
      throw new ApodApiError(`Tiempo de espera agotado (${Math.round(timeoutMs / 1000)}s) sin respuesta de la NASA.`, {
        isTimeout: true,
      });
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function parseApiResponse(response: Response): Promise<unknown> {
  if (!response.ok) {
    let errorDetail = "";
    try {
      const errJson = (await response.json()) as { msg?: string; error?: { message?: string } };
      errorDetail = errJson.msg || errJson.error?.message || "";
    } catch {
      // Ignorar si el cuerpo devuelto no es JSON (ej. páginas HTML en errores 500 de la NASA)
    }

    if (response.status === 404) {
      throw new ApodApiError(
        errorDetail || "No se encontraron imágenes astronómicas para la consulta solicitada (Error 404).",
        { status: 404 }
      );
    }

    if (response.status === 500) {
      throw new ApodApiError(
        errorDetail || "El servidor de la NASA no pudo procesar la solicitud en este momento (Error 500). Intenta nuevamente en unos instantes.",
        { status: 500 }
      );
    }

    throw new ApodApiError(
      errorDetail || `Error al cargar imágenes de la NASA (${response.status})`,
      { status: response.status }
    );
  }

  return response.json();
}

const getBaseUrl = (): string => {
  const url = API_URL || "https://science.nasa.gov/wp-json/wp/v2/apod-basic/";
  return url.endsWith("/") ? url : `${url}/`;
};

function cleanHtml(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function cleanExplanation(text?: string): string {
  if (!text) return "";
  let clean = text.replace(/^<strong[^>]*>Explanation:?<\/strong>\s*/i, "");
  clean = clean.replace(/^Explanation:?\s*/i, "");
  return cleanHtml(clean);
}

/**
 * Normaliza la respuesta del nuevo endpoint WordPress (science.nasa.gov/wp-json/wp/v2/apod-basic/)
 * para que sea totalmente compatible con los componentes de la aplicación.
 * - hdurl: imagen en alta resolución directa
 * - url: garantizado para <img src={apod.url}> (apunta a la imagen en vez de a la página HTML)
 * - permalink: enlace a la nota oficial en science.nasa.gov
 */
export function normalizeApod(raw: any): Apod {
  if (!raw || typeof raw !== "object") {
    throw new ApodApiError("Respuesta de la NASA con formato inválido.");
  }

  const mediaType = (raw.media_type as "image" | "video" | "iframe") || "image";
  const directAsset = raw.hdurl || raw.url || "";

  return {
    title: cleanHtml(raw.title) || "NASA Astronomy Picture of the Day",
    explanation: cleanExplanation(raw.explanation),
    url: mediaType === "image" ? directAsset : (raw.url || directAsset),
    hdurl: raw.hdurl || raw.url,
    date: raw.date || "",
    media_type: mediaType,
    thumbnail_url: raw.hdurl || raw.thumbnail_url || (mediaType === "image" ? directAsset : undefined),
    permalink: raw.permalink || raw.url,
    credit: cleanHtml(raw.credit),
    copyright: cleanHtml(raw.copyright),
    alt: raw.alt ? cleanHtml(raw.alt) : undefined,
    post_id: raw.post_id,
    basic_html_url: raw.basic_html_url,
  };
}

/**
 * Convierte una fecha YYYY-MM-DD al formato YYMMDD requerido por los parámetros de filtro de WordPress
 */
function toYYMMDD(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[0].slice(2)}${parts[1]}${parts[2]}`;
  }
  return dateStr;
}

// Traer apods con un rango de fechas
export async function getFilteredApodImages(
  year: number = 2024,
  month: number = 12,
  signal?: AbortSignal
): Promise<Apod[]> {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  // Evitar consultas a meses futuros
  if (year > currentYear || (year === currentYear && month > currentMonth)) {
    throw new ApodApiError("No se pueden consultar fechas futuras a la actual.", { status: 400 });
  }

  const mm = String(month).padStart(2, "0");
  const start_date = `${year}-${mm}-01`;

  // Calcular el último día del mes (28, 29, 30 o 31)
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  let finalEndDay = lastDayOfMonth;

  // Si es el mes y año en curso, limitar al día de hoy para no pedir fechas futuras
  if (year === currentYear && month === currentMonth) {
    finalEndDay = Math.min(lastDayOfMonth, today.getDate());
  }

  const end_date = `${year}-${mm}-${String(finalEndDay).padStart(2, "0")}`;
  const baseUrl = getBaseUrl();
  const dateFrom = toYYMMDD(start_date);
  const dateTo = toYYMMDD(end_date);

  const fetchPage = async (page: number) => {
    const keyParam = API_KEY ? `&api_key=${API_KEY}` : "";
    const url = `${baseUrl}?start_date=${start_date}&end_date=${end_date}&date_from=${dateFrom}&date_to=${dateTo}&page=${page}${keyParam}`;
    const res = await fetchWithTimeout(url, { signal });
    return parseApiResponse(res);
  };

  const p1Data = await fetchPage(1);
  let rawList: any[] = Array.isArray(p1Data) ? p1Data : [p1Data];

  // Si la página 1 contiene 25 elementos y el mes tiene más de 25 días, traer la página 2
  if (rawList.length === 25 && finalEndDay > 25) {
    try {
      const p2Data = await fetchPage(2);
      if (Array.isArray(p2Data) && p2Data.length > 0) {
        rawList = [...rawList, ...p2Data];
      }
    } catch {
      // Si la página 2 no existe o falla, mantenemos los 25 primeros resultados
    }
  }

  return rawList.map(normalizeApod);
}

// Traer apods aleatorios (máximo 25 según nueva documentación)
export async function getRandomApodImages(
  count: number = 12,
  signal?: AbortSignal
): Promise<Apod[]> {
  const safeCount = Math.min(Math.max(1, count), 25);
  const baseUrl = getBaseUrl();
  const keyParam = API_KEY ? `&api_key=${API_KEY}` : "";

  // Seleccionar una página aleatoria del archivo para garantizar variedad a lo largo de los años
  const randomPage = Math.floor(Math.random() * 250) + 1;
  const url = `${baseUrl}?count=${safeCount}&page=${randomPage}${keyParam}`;

  const response = await fetchWithTimeout(url, { signal });
  const data = await parseApiResponse(response);
  const items = Array.isArray(data) ? data : [data];

  // Barajar y tomar la cantidad deseada
  const shuffled = [...items].sort(() => 0.5 - Math.random()).slice(0, safeCount);
  return shuffled.map(normalizeApod);
}

// Consultar publicación de una fecha específica (YYYY-MM-DD)
export async function getApodByDate(
  date: string,
  signal?: AbortSignal
): Promise<Apod> {
  const baseUrl = getBaseUrl();
  const yyDate = toYYMMDD(date);
  const keyParam = API_KEY ? `?api_key=${API_KEY}` : "";
  const url = `${baseUrl}${yyDate}${keyParam}`;

  const response = await fetchWithTimeout(url, { signal });
  const data = await parseApiResponse(response);
  const item = Array.isArray(data) ? data[0] : data;
  return normalizeApod(item);
}

