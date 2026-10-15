import type { Apod } from "../../models/Apod";
import "./ApodControls.css";
import { addFavourite } from "../../services/internalFunctions";
import { useState } from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { useTranslation } from "../../i18n";

type ApodControlsProps = {
  apod: Apod;
  share: (apod: Apod) => void;
};

export default function ApodControls({ apod, share }: ApodControlsProps) {
  const apodKey = apod.date + apod.title;
  const [liked, setLiked] = useState(isLiked(apodKey));
  const { t } = useTranslation();

  const handleClick = () => {
    addFavourite(apod);
    setLiked(isLiked(apodKey));
  };

  return (
    <div className="apod-controls-container glass-panel">
      <button
        className={`control-btn ${liked ? "btn-liked" : ""}`}
        onClick={handleClick}
        aria-label={liked ? t('components.apodControls.removeFromFavs') : t('components.apodControls.addToFavs')}
      >
        <FaHeart className="control-icon" />
        <span>{liked ? t('components.apodControls.saved') : t('components.apodControls.save')}</span>
      </button>

      <div className="control-divider"></div>

      <button
        className="control-btn btn-share"
        onClick={() => share(apod)}
        aria-label={t('components.apodControls.share')}
      >
        <FaShareAlt className="control-icon" />
        <span>{t('components.apodControls.share')}</span>
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
