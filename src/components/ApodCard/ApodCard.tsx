import { useRef } from "react";
import type { Apod } from "../../models/Apod";
import "./ApodCard.css";

export default function ApodCard({ apod }: { apod: Apod }) {
  const imageRef = useRef<HTMLImageElement>(null);

  const previewText =
    apod.explanation.length > 150
      ? apod.explanation.slice(0, 150) + "..."
      : apod.explanation;

  return (
    <div className="card h-100 shadow-sm">
      {apod.media_type === "image" ? (
        <img
          ref={imageRef}
          src={apod.url}
          className="card-img-top"
          alt={apod.title}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <div className="ratio ratio-16x9">
          <iframe src={apod.url} title={apod.title} allowFullScreen></iframe>
        </div>
      )}
      <div className="card-body">
        <h5 className="card-title">{apod.title}</h5>
        <p className="card-text small">{previewText}</p>
        {apod.explanation.length > 150 && (
          <button className="btn btn-link p-0">Ver más</button>
        )}
        <p className="text-muted small">📅 {apod.date}</p>
      </div>
    </div>
  );
}
