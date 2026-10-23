import type { Apod } from "../../models/Apod";
import "./ApodCard.css";
import { FaPlay, FaCalendarAlt, FaArrowRight, FaVideo, FaImage, FaUserAlt } from "react-icons/fa";
import { handleImageLoad, handleImageRef } from "../../utils/imageLoader";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80";

export default function ApodCard({ apod }: { apod: Apod }) {
  const isVideo = apod.media_type === "video" || apod.media_type === "iframe";
  const author = apod.copyright || apod.credit;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.src !== FALLBACK_IMAGE) {
      target.src = FALLBACK_IMAGE;
    }
    handleImageLoad(e);
  };

  return (
    <article className="apod-card-premium">
      <div className="apod-card-media shimmer-media-container">
        {apod.media_type === "image" ? (
          <img
            src={apod.url}
            alt={apod.title}
            loading="lazy"
            ref={handleImageRef}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="apod-card-video">
            <img
              src={apod.thumbnail_url || FALLBACK_IMAGE}
              alt={apod.title}
              ref={handleImageRef}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <div className="video-play-badge">
              <FaPlay className="video-icon" />
            </div>
          </div>
        )}
        <div className="apod-card-overlay"></div>

        <div className="apod-media-badges">
          <span className="badge-glass date-badge">
            <FaCalendarAlt className="badge-icon" /> {apod.date}
          </span>
          <span
            className={`badge-glass media-type-badge ${isVideo ? "video" : "image"}`}
            title={isVideo ? "Video" : "Imagen"}
          >
            {isVideo ? (
              <FaVideo className="badge-icon" />
            ) : (
              <FaImage className="badge-icon" />
            )}
          </span>
        </div>
      </div>

      <div className="apod-card-content">
        <h3 className="apod-card-title" title={apod.title}>
          {apod.title}
        </h3>
        <p className="apod-card-description">{apod.explanation}</p>

        <div className="apod-card-footer">
          <div className="apod-card-author" title={author ? `Créditos: ${author}` : "NASA / APOD"}>
            <FaUserAlt className="author-icon" />
            <span className="author-name">{author || "NASA / APOD"}</span>
          </div>
          <div className="apod-card-arrow-wrapper">
            <FaArrowRight className="card-arrow" />
          </div>
        </div>
      </div>
    </article>
  );
}
