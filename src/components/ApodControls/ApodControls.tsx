import type { Apod } from "../../models/Apod";
import "./ApodControls.css";

type ApodControlsProps = {
  apod: Apod;
  addFavourite: (apod: Apod) => void;
  share: () => void;
};

export default function ApodControls({
  apod,
  addFavourite,
  share,
}: ApodControlsProps) {
  return (
    <>
      <div className="user-controls">
        <div className="favourite-button">
          <button className="custom-button" onClick={() => addFavourite(apod)}>
            Favorito
          </button>
        </div>
        <div className="share-button">
          <button className="custom-button" onClick={share}>
            Compartir
          </button>
        </div>
      </div>
    </>
  );
}
