import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { share, addHistory } from "../../services/internalFunctions";
import ErrorFallback from "../../components/ErrorFallback/ErrorFallback";
import "./ApodDetail.css";

import ApodControls from "../../components/ApodControls/ApodControls";
import { FaCalendarAlt } from "react-icons/fa";
import { useTranslation } from "../../i18n";

export default function ApodDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const apod = location.state;
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (apod) {
      addHistory(apod);
    }
  }, [apod]);

  if (!apod) {
    return (
      <div className="detail-page-wrapper">
        <div className="detail-error-wrapper">
          <ErrorFallback
            status={404}
            title={t("components.errorFallback.notFoundTitle")}
            message={t("components.errorFallback.notFoundMessage")}
            reloadLabel={t("pages.detail.back")}
            onReload={() => navigate("/discover")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page-wrapper">
      <div className="detail-main">
        {/* Media Hero Section */}
        <section className="detail-media-section">
          {apod.media_type === "image" ? (
            <div className="detail-image-container">
              {loading && (
                <div className="detail-media-skeleton">
                  <div className="skeleton-pulse"></div>
                </div>
              )}
              <img
                src={apod.hdurl || apod.url}
                alt={apod.title}
                className={`detail-image ${loading ? "hidden" : ""}`}
                ref={(el) => {
                  if (el && el.complete && el.naturalWidth > 0) {
                    setLoading(false);
                  }
                }}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
              />
            </div>
          ) : (
            <div className="detail-video-container">
              <iframe
                src={apod.url}
                title={apod.title}
                className="detail-video"
                allowFullScreen
                onLoad={() => setLoading(false)}
              />
            </div>
          )}
        </section>

        {/* Content Section */}
        <section className="detail-content-section">
          <div className="detail-content-inner">
            <header className="detail-header">
              <div className="detail-meta">
                <span className="detail-date">
                  <FaCalendarAlt /> {apod.date}
                </span>
                {apod.copyright && (
                  <span className="detail-copyright">{t('pages.detail.copyright')} {apod.copyright}</span>
                )}
              </div>
              <h1 className="detail-title">{apod.title}</h1>
              <ApodControls apod={apod} share={share} />
            </header>

            <article className="detail-explanation">
              <p>{apod.explanation}</p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
