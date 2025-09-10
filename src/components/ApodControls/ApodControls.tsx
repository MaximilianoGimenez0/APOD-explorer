import type { Apod } from "../../models/Apod";
import "./ApodControls.css";
import { useState } from "react";

type ApodControlsProps = {
  apod: Apod;
  addFavourite: (apod: Apod) => void;
  share: (apod: Apod) => void;
};

export default function ApodControls({
  apod,
  addFavourite,
  share,
}: ApodControlsProps) {
  const apodKey = apod.date + apod.title;

  const [liked, setLiked] = useState(isLiked(apodKey));

  const handleClick = () => {
    addFavourite(apod);
    setLiked(isLiked(apodKey));
  };

  return (
    <>
      <div className="user-controls">
        <div className="favourite-button">
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
        <div className="share-button">
          <button className="control-button" onClick={() => share(apod)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

function isLiked(apodKey: string) {
  if (localStorage.getItem(apodKey)) {
    return true;
  }
  return false;
}
