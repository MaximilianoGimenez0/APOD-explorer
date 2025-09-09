import type { Apod } from "../../models/Apod";
import "./FavouriteEntry.css";

type FavouriteEntryProps = {
  apod: Apod;
  goToApodDetails(apod: Apod): void;
};

export default function FavouriteEntry({
  apod,
  goToApodDetails,
}: FavouriteEntryProps) {
  return (
    <>
      <div className="favourite-entry" onClick={() => goToApodDetails(apod)}>
        <span className="favourite-title">{apod.title}</span>
        <span className="favourite-date">{apod.date}</span>
      </div>
    </>
  );
}
