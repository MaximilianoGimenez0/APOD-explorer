import type { Apod } from "../../models/Apod";
import "./HistoryEntry.css";

type FavouriteEntryProps = {
  apod: Apod;
  goToApodDetails(apod: Apod): void;
};

export default function HistoryEntry({
  apod,
  goToApodDetails,
}: FavouriteEntryProps) {
  return (
    <>
      <div className="history-entry">
        <div className="history-header" onClick={() => goToApodDetails(apod)}>
          <img className="history-img" src={apod.url} alt="" />
          <div className="history-info">
            <p className="history-data">{apod.title}</p>
            <p className="history-data">{apod.date}</p>
          </div>
          <p className="last-visited">
            Última visita:{" "}
            {apod.requestedAt
              ? new Date(apod.requestedAt).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Fecha desconocida"}
          </p>
        </div>
      </div>
    </>
  );
}
