import type { Apod } from "../../models/Apod";
import "./HistoryEntry.css";
import { FaPlay, FaCalendarCheck } from "react-icons/fa";

type HistoryEntryProps = {
  apod: Apod;
  goToApodDetails(apod: Apod): void;
  index?: number;
};

export default function HistoryEntry({
  apod,
  goToApodDetails,
  index = 0
}: HistoryEntryProps) {
  
  const formattedVisitDate = apod.requestedAt
    ? new Date(apod.requestedAt).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : "Fecha desconocida";

  return (
    <div 
      className="history-entry-timeline" 
      onClick={() => goToApodDetails(apod)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="timeline-node"></div>
      <div className="history-entry-content">
        <div className="history-entry-media">
          {apod.media_type === "image" ? (
            <img src={apod.url} alt={apod.title} loading="lazy" />
          ) : (
            <div className="history-video-placeholder">
               <img src={apod.thumbnail_url || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"} alt={apod.title} />
               <FaPlay className="video-icon" />
            </div>
          )}
        </div>
        <div className="history-entry-info">
          <div className="history-meta">
            <span className="history-date">{apod.date}</span>
            <span className="history-visit">
              <FaCalendarCheck /> {formattedVisitDate}
            </span>
          </div>
          <h3 className="history-title">{apod.title}</h3>
          <p className="history-description">
             {apod.explanation && apod.explanation.length > 180 
                ? apod.explanation.slice(0, 180) + "..." 
                : apod.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}
