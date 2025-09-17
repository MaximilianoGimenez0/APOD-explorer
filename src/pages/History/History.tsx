import "./History.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HistoryEntry from "../../components/HistoryEntry/HistoryEntry";
import type { Apod } from "../../models/Apod";
import { useNavigate } from "react-router";

export default function History() {
  const apods = readApods();
  const navigate = useNavigate();

  function goToApodDetails(apod: Apod) {
    navigate("/detail", { state: apod });
  }

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="history-title">Visitados anteriormente</h1>

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
