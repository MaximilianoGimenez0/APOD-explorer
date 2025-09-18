import "./History.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HistoryEntry from "../../components/HistoryEntry/HistoryEntry";
import type { Apod } from "../../models/Apod";
import { useNavigate } from "react-router";
import { cleanHistory } from "../../services/internalFunctions";
import { useState } from "react";

export default function History() {
  const [apods, setApods] = useState<Apod[]>(readApods());

  const navigate = useNavigate();

  function goToApodDetails(apod: Apod) {
    navigate("/detail", { state: apod });
  }

  function handleClearHistory() {
    cleanHistory();
    setApods([]);
  }

  return (
    <>
      <Header />
      <main className="main">
        <div className="title-controls">
          <h1 className="history-title">Visitados anteriormente</h1>
          <button className="clear-history-button" onClick={handleClearHistory}>
            Borrar historial
          </button>
        </div>
        <div className="history-entries">
          {apods.map((apod) => (
            <HistoryEntry
              key={apod.date + apod.title}
              apod={apod}
              goToApodDetails={goToApodDetails}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

function readApods(): Apod[] {
  const cachedFavourites = localStorage.getItem("history");
  return cachedFavourites ? JSON.parse(cachedFavourites) : [];
}
