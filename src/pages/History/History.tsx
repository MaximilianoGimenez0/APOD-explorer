import "./History.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HistoryEntry from "../../components/HistoryEntry/HistoryEntry";
import type { Apod } from "../../models/Apod";
import { useNavigate } from "react-router";
import { cleanHistory } from "../../services/internalFunctions";
import { useState } from "react";
import { FaTrash, FaCompass, FaHistory } from "react-icons/fa";

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
    <div className="history-page">
      <Header />
      <main className="history-main">
        <div className="history-header-section">
          <div className="history-title-group">
            <h1>Archivo de Exploración</h1>
            <p>Un registro de todos tus descubrimientos y viajes a través del cosmos.</p>
          </div>
          
          {apods.length > 0 && (
            <button className="btn-clear-history" onClick={handleClearHistory}>
              <FaTrash /> Limpiar Archivo
            </button>
          )}
        </div>

        {apods.length === 0 ? (
          <div className="history-empty">
            <div className="empty-icon-container">
              <FaHistory className="empty-icon" />
            </div>
            <h2>Tu archivo está vacío</h2>
            <p>
              Aún no has explorado ninguna imagen astronómica. ¡El universo te espera!
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/discover")}>
              <FaCompass /> Iniciar Exploración
            </button>
          </div>
        ) : (
          <div className="history-timeline">
            {apods.map((apod, index) => (
              <HistoryEntry
                key={apod.date + apod.title + index}
                apod={apod}
                goToApodDetails={goToApodDetails}
                index={index}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function readApods(): Apod[] {
  const cachedHistory = localStorage.getItem("history");
  return cachedHistory ? JSON.parse(cachedHistory) : [];
}
