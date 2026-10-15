import "./Favourites.css";
import FavouriteEntry from "../../components/FavouriteEntry/FavouriteEntry";

import type { Apod } from "../../models/Apod";
import { useNavigate } from "react-router";
import { FaHeart, FaCompass } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useTranslation } from "../../i18n";

export default function Favourites() {
  const [apods, setApods] = useState<Apod[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setApods(readApods());
  }, []);

  function goToApodDetails(apod: Apod) {
    navigate("/detail", { state: apod });
  }

  function handleLikeChange() {
    setApods(readApods());
  }

  return (
    <div className="favourites-page">
      <div className="favourites-main">
        <div className="favourites-header-section">
          <div className="favourites-title-group">
            <h1>{t('pages.favourites.title')}</h1>
            <p>{t('pages.favourites.subtitle')}</p>
          </div>

          {apods.length > 0 && (
            <div className="favourites-count-badge">
              <FaHeart className="badge-heart-icon" />
              <span>
                {apods.length === 1
                  ? t('pages.favourites.countSingular', { count: apods.length })
                  : t('pages.favourites.countPlural', { count: apods.length })}
              </span>
            </div>
          )}
        </div>

        {apods.length === 0 ? (
          <div className="favourites-empty">
            <div className="empty-icon-container">
              <FaHeart className="empty-icon" />
            </div>
            <h2>{t('pages.favourites.emptyTitle')}</h2>
            <p>
              {t('pages.favourites.emptyDesc')}
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/discover")}>
              <FaCompass /> {t('pages.favourites.startExploring')}
            </button>
          </div>
        ) : (
          <div className="favourites-list">
            {apods.map((apod, index) => (
              <FavouriteEntry
                key={apod.date + apod.title + index}
                goToApodDetails={goToApodDetails}
                apod={apod}
                onLikeChange={handleLikeChange}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function readApods(): Apod[] {
  const cachedFavourites = localStorage.getItem("favourites");
  return cachedFavourites ? JSON.parse(cachedFavourites) : [];
}
