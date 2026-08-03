import type { Apod } from "../../models/Apod";
import "./FavouriteEntry.css";
import { addFavourite } from "../../services/internalFunctions";
import { useState } from "react";
import { FaHeart, FaPlay } from "react-icons/fa";

type FavouriteEntryProps = {
  apod: Apod;
  goToApodDetails(apod: Apod): void;
  onLikeChange?: () => void;
};

export default function FavouriteEntry({
  apod,
  goToApodDetails,
  onLikeChange
}: FavouriteEntryProps) {
  const apodKey = apod.date + apod.title;
  const [liked, setLiked] = useState(isLiked(apodKey));

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addFavourite(apod);
    setLiked(isLiked(apodKey));
    if (onLikeChange) {
      onLikeChange();
    }
  };

  return (
    <div className="fav-entry-card" onClick={() => goToApodDetails(apod)}>
      <div className="fav-entry-media">
        {apod.media_type === "image" ? (
          <img src={apod.url} alt={apod.title} loading="lazy" />
        ) : (
          <div className="fav-video-placeholder">
             <img src={apod.thumbnail_url || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"} alt={apod.title} />
             <FaPlay className="fav-video-icon" />
          </div>
        )}
        <div className="fav-entry-overlay"></div>
        <button 
          className={`fav-like-btn ${liked ? 'liked' : ''}`}
          onClick={handleClick}
          aria-label={liked ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <FaHeart />
        </button>
      </div>
      <div className="fav-entry-content">
        <span className="fav-entry-date">{apod.date}</span>
        <h3 className="fav-entry-title">{apod.title}</h3>
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
