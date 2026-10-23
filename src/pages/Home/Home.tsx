import { useEffect, useState, useCallback } from "react";
import "./Home.css";

import { getRandomApodImages, ApodApiError } from "../../services/apodService";
import type { Apod } from "../../models/Apod";
import { useNavigate } from "react-router";
import { FaPlay, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "../../i18n";
import ErrorFallback from "../../components/ErrorFallback/ErrorFallback";
import { handleImageLoad, handleImageRef } from "../../utils/imageLoader";

interface ErrorState {
  message: string;
  status?: number;
  isTimeout?: boolean;
}

export default function Home() {
  const [featured, setFeatured] = useState<Apod | null>(null);
  const [discoveries, setDiscoveries] = useState<Apod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch 4 random images: 1 for hero, 3 for discovery section
      const imgs = await getRandomApodImages(4);
      if (imgs && imgs.length > 0) {
        setFeatured(imgs[0]);
        setDiscoveries(imgs.slice(1, 4));
      }
    } catch (err: unknown) {
      console.error("Error loading home content:", err);
      const isApodError = err instanceof ApodApiError;
      setError({
        message: err instanceof Error ? err.message : t("components.errorFallback.defaultMessage"),
        status: isApodError ? err.status : undefined,
        isTimeout: isApodError ? err.isTimeout : false,
      });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const goToDetail = (apod: Apod) => {
    navigate("/detail", { state: apod });
  };

  if (error) {
    return (
      <div className="main-content">
        <div className="home-error-wrapper">
          <ErrorFallback
            status={error.status}
            isTimeout={error.isTimeout}
            message={error.message}
            onReload={() => window.location.reload()}
            onRetry={loadContent}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <section className="hero-section">
        {loading ? (
          <div className="hero-skeleton">
            <div className="skeleton-pulse"></div>
          </div>
        ) : featured ? (
          <div className="hero-content">
            <div className="hero-background shimmer-media-container">
              {featured.media_type === "image" ? (
                <img
                  src={featured.url}
                  alt={featured.title}
                  className="hero-image"
                  ref={handleImageRef}
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                />
              ) : (
                <img
                  src={featured.thumbnail_url || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"}
                  alt={featured.title}
                  className="hero-image"
                  ref={handleImageRef}
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                />
              )}
              <div className="hero-overlay"></div>
            </div>

            <div className="hero-text-content">
              <div className="hero-badge">{t('pages.home.discoveryOfDay')}</div>
              <h1 className="hero-title">{featured.title}</h1>
              <p className="hero-date">{featured.date}</p>
              <p className="hero-description">
                {featured.explanation.substring(0, 180)}...
              </p>
              <div className="hero-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => goToDetail(featured)}
                >
                  {t('pages.home.exploreButton')} <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hero-empty">
            <h1>{t('pages.home.emptyHero')}</h1>
          </div>
        )}
      </section>

      <section className="discovery-section">
        <div className="section-header">
          <h2>{t('pages.home.exploreCosmos')}</h2>
          <button className="btn-link" onClick={() => navigate("/discover")}>
            {t('pages.home.viewMore')} <FaArrowRight />
          </button>
        </div>

        <div className="discovery-grid">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="discovery-card skeleton-card"></div>
            ))
          ) : (
            discoveries.map((apod, index) => (
              <div
                key={`${apod.date}-${index}`}
                className="discovery-card"
                onClick={() => goToDetail(apod)}
              >
                <div className="card-image-wrapper shimmer-media-container">
                  {apod.media_type === "image" ? (
                    <img
                      src={apod.url}
                      alt={apod.title}
                      loading="lazy"
                      ref={handleImageRef}
                      onLoad={handleImageLoad}
                      onError={handleImageLoad}
                    />
                  ) : (
                    <div className="video-placeholder">
                      <FaPlay className="video-icon" />
                    </div>
                  )}
                  <div className="card-overlay"></div>
                </div>
                <div className="card-content">
                  <span className="card-date">{apod.date}</span>
                  <h3 className="card-title">{apod.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
}
