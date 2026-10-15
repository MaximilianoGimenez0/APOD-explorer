import type { Apod } from "../models/Apod";
import { API_URL, API_KEY } from "@/config/constants";

export const API_TIMEOUT_MS = 10000; // 10 segundos de espera máxima

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
      throw new ApodApiError("Tiempo de espera agotado (10s) sin respuesta de la NASA.", {
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
      // Ignore if response body cannot be parsed as JSON
    }

    if (response.status === 404) {
      throw new ApodApiError(
        errorDetail || "No se encontraron imágenes astronómicas para la consulta solicitada (Error 404).",
        { status: 404 }
      );
    }

    throw new ApodApiError(
      errorDetail || `Error al cargar imágenes de la NASA (${response.status})`,
      { status: response.status }
    );
  }

  return response.json();
}

//Traer apods con un rango de fechas
export async function getFilteredApodImages(
  year: number = 2024,
  month: number = 12,
  signal?: AbortSignal
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

  const response = await fetchWithTimeout(
    `${API_URL}?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`,
    { signal }
  );

  const data = await parseApiResponse(response);
  return Array.isArray(data) ? (data as Apod[]) : [data as Apod];
}

//Traer 6 apods random
export async function getRandomApodImages(
  count: number = 12,
  signal?: AbortSignal
): Promise<Apod[]> {
  const response = await fetchWithTimeout(
    `${API_URL}?count=${count}&api_key=${API_KEY}`,
    { signal }
  );
  const data = await parseApiResponse(response);
  return Array.isArray(data) ? (data as Apod[]) : [data as Apod];
}

