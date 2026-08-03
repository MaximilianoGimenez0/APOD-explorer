import type { Apod } from "../../models/Apod";
import "./ApodCard.css";
import { FaPlay } from "react-icons/fa";

export default function ApodCard({ apod }: { apod: Apod }) {
  const previewText =
    apod.explanation.length > 120
      ? apod.explanation.slice(0, 120) + "..."
      : apod.explanation;

  return (
    <div className="apod-card-premium">
      <div className="apod-card-media">
        {apod.media_type === "image" ? (
          <img
            src={apod.url}
            alt={apod.title}
            loading="lazy"
          />
        ) : (
          <div className="apod-card-video">
            <img 
               src={apod.thumbnail_url || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"} 
               alt={apod.title} 
               style={{opacity: 0.5}}
            />
            <FaPlay className="video-icon" />
          </div>
        )}
        <div className="apod-card-overlay"></div>
      </div>
      <div className="apod-card-content">
        <div className="apod-card-header">
          <span className="apod-card-date">{apod.date}</span>
          <h3 className="apod-card-title">{apod.title}</h3>
        </div>
        <p className="apod-card-description">{previewText}</p>
        <div className="apod-card-action">
          <span className="text-link">Explorar misterio</span>
        </div>
      </div>
    </div>
  );
}
