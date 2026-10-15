import type { Apod } from "../../models/Apod";
import "./FavouriteEntry.css";
import { addFavourite } from "../../services/internalFunctions";
import { useState } from "react";
import { FaHeart, FaPlay } from "react-icons/fa";
import { useTranslation } from "../../i18n";
import { handleImageLoad, handleImageRef } from "../../utils/imageLoader";

type FavouriteEntryProps = {
  apod: Apod;
  goToApodDetails(apod: Apod): void;
  onLikeChange?: () => void;
  index?: number;
};

export default function FavouriteEntry({
  apod,
  goToApodDetails,
  onLikeChange,
  index = 0
}: FavouriteEntryProps) {
  const apodKey = apod.date + apod.title;
  const [liked, setLiked] = useState(isLiked(apodKey));
  const { t } = useTranslation();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addFavourite(apod);
    setLiked(isLiked(apodKey));
    if (onLikeChange) {
      onLikeChange();
    }
  };

  return (
    <div
      className="fav-entry-card"
      onClick={() => goToApodDetails(apod)}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="fav-entry-media shimmer-media-container">
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
          <div className="fav-video-placeholder">
            <img
              src={apod.thumbnail_url || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"}
              alt={apod.title}
              ref={handleImageRef}
              onLoad={handleImageLoad}
              onError={handleImageLoad}
            />
            <FaPlay className="fav-video-icon" />
          </div>
        )}
      </div>

      <div className="fav-entry-info">
        <div className="fav-meta">
          <span className="fav-date">{apod.date}</span>
          <button
            className={`fav-like-btn ${liked ? "liked" : ""}`}
            onClick={handleLikeClick}
            aria-label={liked ? t("components.apodControls.removeFromFavs") : t("components.apodControls.addToFavs")}
            title={liked ? t("components.apodControls.removeFromFavs") : t("components.apodControls.addToFavs")}
          >
            <FaHeart />
          </button>
        </div>

        <h3 className="fav-title">{apod.title}</h3>

        <p className="fav-description">
          {apod.explanation && apod.explanation.length > 180
            ? apod.explanation.slice(0, 180) + "..."
            : apod.explanation}
        </p>
      </div>
    </div>
  );
}

function isLiked(apodKey: string) {
  const cached = readApods();
  return cached.some((a) => a.date + a.title === apodKey);
}

function readApods(): Apod[] {
  const cachedFavourites = localStorage.getItem("favourites");
  return cachedFavourites ? JSON.parse(cachedFavourites) : [];
}
