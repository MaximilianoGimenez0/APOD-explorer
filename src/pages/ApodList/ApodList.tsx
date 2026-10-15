import { useEffect, useState, useCallback } from "react";
import {
  getFilteredApodImages,
  getRandomApodImages,
  ApodApiError,
} from "../../services/apodService";
import type { Apod } from "../../models/Apod";
import ApodCard from "../../components/ApodCard/ApodCard";
import Filters from "../../components/Filters/Filters";
import ErrorFallback from "../../components/ErrorFallback/ErrorFallback";
import "./ApodList.css";
import { useNavigate } from "react-router";

import { useTranslation } from "../../i18n";

interface ErrorState {
  message: string;
  status?: number;
  isTimeout?: boolean;
}

interface LastQueryState {
  type: "random" | "filtered";
  year?: number;
  month?: number;
}

export default function ApodList() {
  const navigate = useNavigate();
  const [images, setImages] = useState<Apod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);
  const [lastQuery, setLastQuery] = useState<LastQueryState>({ type: "random" });
  const { t } = useTranslation();

  const loadCache = useCallback((apod: Apod[]) => {
    const toCache = JSON.stringify(apod);
    localStorage.setItem("cachedApods", toCache);
  }, []);

  const fetchRandomImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setLastQuery({ type: "random" });
      const imgs = await getRandomApodImages(12); // Fetch 12 images for a good gallery size
      setImages(imgs);
      loadCache(imgs);
    } catch (err: unknown) {
      console.error("Error fetching random APOD images:", err);
      const isApodError = err instanceof ApodApiError;
      setError({
        message: err instanceof Error ? err.message : t("components.errorFallback.defaultMessage"),
        status: isApodError ? err.status : undefined,
        isTimeout: isApodError ? err.isTimeout : false,
      });
    } finally {
      setLoading(false);
    }
  }, [t, loadCache]);

  const fetchFilteredImages = useCallback(
    async (year: number, month: number) => {
      try {
        setLoading(true);
        setError(null);
        setLastQuery({ type: "filtered", year, month });
        const imgs = await getFilteredApodImages(year, month);
        setImages(imgs);
        loadCache(imgs);
      } catch (err: unknown) {
        console.error("Error fetching filtered APOD images:", err);
        const isApodError = err instanceof ApodApiError;
        setError({
          message: err instanceof Error ? err.message : t("components.errorFallback.defaultMessage"),
          status: isApodError ? err.status : undefined,
          isTimeout: isApodError ? err.isTimeout : false,
        });
      } finally {
        setLoading(false);
      }
    },
    [t, loadCache]
  );

  useEffect(() => {
    const cachedApods = localStorage.getItem("cachedApods");
    if (cachedApods) {
      try {
        const results: Apod[] = JSON.parse(cachedApods);
        if (Array.isArray(results) && results.length > 0) {
          setImages(results);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Invalid cached apods, clearing storage:", err);
        localStorage.removeItem("cachedApods");
      }
    }
    fetchRandomImages();
  }, [fetchRandomImages]);

  function handleRetry() {
    if (lastQuery.type === "filtered" && lastQuery.year && lastQuery.month) {
      fetchFilteredImages(lastQuery.year, lastQuery.month);
    } else {
      fetchRandomImages();
    }
  }

  function handleReload() {
    // Clear potentially corrupted or stale cache and reload page
    localStorage.removeItem("cachedApods");
    window.location.reload();
  }

  function goToApodDetail(apod: Apod) {
    navigate("/detail", { state: apod });
  }

  return (
    <div className="discover-page-wrapper">
      <div className="discover-main">
        <div className="discover-layout">
          
          <aside className="discover-sidebar">
            <Filters
              onRandom={fetchRandomImages}
              onFiltered={fetchFilteredImages}
            />
          </aside>

          <section className="discover-content">
            <div className="discover-header">
              <h1 className="discover-title">{t('pages.discover.title')}</h1>
              <p className="discover-subtitle">{t('pages.discover.subtitle')}</p>
            </div>

            {loading ? (
              <div className="gallery-grid">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="gallery-skeleton"></div>
                ))}
              </div>
            ) : error ? (
              <ErrorFallback
                status={error.status}
                isTimeout={error.isTimeout}
                message={error.message}
                onReload={handleReload}
                onRetry={handleRetry}
              />
            ) : (
              <div className="gallery-grid">
                {images.map((apod, index) => (
                  <div
                    onClick={() => goToApodDetail(apod)}
                    className="gallery-item"
                    key={`${apod.date}-${apod.title}-${index}`}
                  >
                    <ApodCard apod={apod} />
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
