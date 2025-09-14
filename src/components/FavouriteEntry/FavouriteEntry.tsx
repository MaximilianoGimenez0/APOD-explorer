import type { Apod } from "../../models/Apod";
import "./FavouriteEntry.css";
import { addFavourite } from "../../services/internalFunctions";
import { useState } from "react";

type FavouriteEntryProps = {
  apod: Apod;
  goToApodDetails(apod: Apod): void;
};

export default function FavouriteEntry({
  apod,
  goToApodDetails,
}: FavouriteEntryProps) {
  const apodKey = apod.date + apod.title;

  const [liked, setLiked] = useState(isLiked(apodKey));

  const handleClick = () => {
    addFavourite(apod);
    setLiked(isLiked(apodKey));
  };

  return (
    <>
      <div className="favourite-entry">
        <div className="favourite-header" onClick={() => goToApodDetails(apod)}>
          <img className="favourite-img" src={apod.url} alt="" />
          <div className="favourite-info">
            <p className="favourite-data">{apod.title}</p>
            <p className="favourite-data">{apod.date}</p>
          </div>
        </div>
        <div className="like-container">
          <button
            className={`control-button ${
              liked ? "heart-liked" : "heart-unliked"
            }`}
            id="likeBtn"
            aria-label="Like"
            onClick={handleClick}
          >
            <svg viewBox="0 0 24 24" className="heart-icon">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
             2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3
             19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

function isLiked(apodKey: string) {
  const cached = readApods();
  if (cached.some((a) => a.date + a.title === apodKey)) {
    return true;
  } else {
    return false;
  }
}

function readApods(): Apod[] {
  const cachedFavourites = localStorage.getItem("favourites");
  const apods: Apod[] = cachedFavourites ? JSON.parse(cachedFavourites) : [];

  return apods;
}
