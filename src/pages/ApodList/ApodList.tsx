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
import { FaCalendarAlt, FaRandom, FaSlidersH, FaCompass } from "react-icons/fa";
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

const DEFAULT_YEAR = 2023;
const DEFAULT_MONTH = 6;

export default function ApodList() {
  const navigate = useNavigate();
  const [images, setImages] = useState<Apod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);
  const [lastQuery, setLastQuery] = useState<LastQueryState>({
    type: "filtered",
    year: DEFAULT_YEAR,
    month: DEFAULT_MONTH,
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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
      setMobileFiltersOpen(false);
      const imgs = await getRandomApodImages(12);
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
        setMobileFiltersOpen(false);
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
    fetchFilteredImages(DEFAULT_YEAR, DEFAULT_MONTH);
  }, [fetchFilteredImages]);

  function handleRetry() {
    if (lastQuery.type === "filtered" && lastQuery.year && lastQuery.month) {
      fetchFilteredImages(lastQuery.year, lastQuery.month);
    } else {
      fetchRandomImages();
    }
  }

  function handleReload() {
    localStorage.removeItem("cachedApods");
    window.location.reload();
  }

  function goToApodDetail(apod: Apod) {
    navigate("/detail", { state: apod });
  }

  return (
    <div className="discover-page-wrapper">
      <div className="discover-cosmic-glow glow-top-left" aria-hidden="true" />
      <div className="discover-cosmic-glow glow-bottom-right" aria-hidden="true" />

      <div className="discover-main">
        <div className="discover-layout">
          <aside className={`discover-sidebar ${mobileFiltersOpen ? "open" : ""}`}>
            <Filters
              onRandom={fetchRandomImages}
              onFiltered={fetchFilteredImages}
              loading={loading}
              activeMode={lastQuery.type}
              initialYear={DEFAULT_YEAR}
              initialMonth={DEFAULT_MONTH}
            />
          </aside>

          <section className="discover-content">
            <div className="discover-header">
              <div className="discover-title-row">
                <div>
                  <h1 className="discover-title">{t("pages.discover.title")}</h1>
                  <p className="discover-subtitle">{t("pages.discover.subtitle")}</p>
                </div>

                <button
                  type="button"
                  className="mobile-filter-toggle"
                  onClick={() => setMobileFiltersOpen((prev) => !prev)}
                  aria-expanded={mobileFiltersOpen}
                >
                  <FaSlidersH />
                  <span>{mobileFiltersOpen ? "Cerrar Filtros" : "Filtros"}</span>
                  {lastQuery.type === "filtered" && lastQuery.month && (
                    <span className="mobile-filter-badge">
                      {t(`common.months.${lastQuery.month}` as any).slice(0, 3)} {lastQuery.year}
                    </span>
                  )}
                </button>
              </div>

              <div className="discover-status-bar">
                <div className="status-chip-group">
                  {lastQuery.type === "filtered" && lastQuery.month ? (
                    <span className="status-chip date-chip">
                      <FaCalendarAlt className="chip-icon" />
                      {t(`common.months.${lastQuery.month}` as any)} {lastQuery.year}
                    </span>
                  ) : (
                    <span className="status-chip random-chip">
                      <FaRandom className="chip-icon" />
                      {t("components.filters.random")}
                    </span>
                  )}

                  {!loading && !error && (
                    <span className="results-count-badge">
                      {images.length} {images.length === 1 ? "descubrimiento" : "descubrimientos"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="gallery-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton-card">
                    <div className="skeleton-media shimmer-glow">
                      <div className="skeleton-badge left"></div>
                      <div className="skeleton-badge right"></div>
                    </div>
                    <div className="skeleton-body">
                      <div className="skeleton-line skeleton-title shimmer-glow"></div>
                      <div className="skeleton-line skeleton-text shimmer-glow"></div>
                      <div className="skeleton-line skeleton-text short shimmer-glow"></div>
                      <div className="skeleton-footer">
                        <div className="skeleton-author shimmer-glow"></div>
                        <div className="skeleton-arrow shimmer-glow"></div>
                      </div>
                    </div>
                  </div>
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
            ) : images.length === 0 ? (
              <div className="discover-empty-state glass-panel">
                <div className="empty-icon-wrap">
                  <FaCompass className="empty-icon" />
                </div>
                <h3>No se encontraron descubrimientos</h3>
                <p>No se encontraron publicaciones en el archivo para el período seleccionado.</p>
                <button
                  type="button"
                  className="btn-filter btn-random-action"
                  onClick={fetchRandomImages}
                >
                  <FaRandom /> Explorar Aleatorio
                </button>
              </div>
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
