import type { Apod } from "../../models/Apod";
import "./ApodControls.css";
import { addFavourite } from "../../services/internalFunctions";
import { useState } from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";

type ApodControlsProps = {
  apod: Apod;
  share: (apod: Apod) => void;
};

export default function ApodControls({ apod, share }: ApodControlsProps) {
  const apodKey = apod.date + apod.title;
  const [liked, setLiked] = useState(isLiked(apodKey));

  const handleClick = () => {
    addFavourite(apod);
    setLiked(isLiked(apodKey));
  };

  return (
    <div className="apod-controls-container glass-panel">
      <button
        className={`control-btn ${liked ? "btn-liked" : ""}`}
        onClick={handleClick}
        aria-label={liked ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        <FaHeart className="control-icon" />
        <span>{liked ? "Guardado" : "Guardar"}</span>
      </button>

      <div className="control-divider"></div>

      <button
        className="control-btn btn-share"
        onClick={() => share(apod)}
        aria-label="Compartir"
      >
        <FaShareAlt className="control-icon" />
        <span>Compartir</span>
      </button>
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
