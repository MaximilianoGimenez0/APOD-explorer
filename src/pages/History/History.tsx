import "./History.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HistoryEntry from "../../components/HistoryEntry/HistoryEntry";
import type { Apod } from "../../models/Apod";
import { useNavigate } from "react-router";
import { cleanHistory } from "../../services/internalFunctions";
import { useState } from "react";
import { FaTrash, FaCompass, FaHistory } from "react-icons/fa";
import { useTranslation } from "../../i18n";

export default function History() {
  const [apods, setApods] = useState<Apod[]>(readApods());
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            <h1>{t('pages.history.title')}</h1>
            <p>{t('pages.history.subtitle')}</p>
          </div>
          
          {apods.length > 0 && (
            <button className="btn-clear-history" onClick={handleClearHistory}>
              <FaTrash /> {t('pages.history.clearHistory')}
            </button>
          )}
        </div>

        {apods.length === 0 ? (
          <div className="history-empty">
            <div className="empty-icon-container">
              <FaHistory className="empty-icon" />
            </div>
            <h2>{t('pages.history.emptyTitle')}</h2>
            <p>
              {t('pages.history.emptyDesc')}
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/discover")}>
              <FaCompass /> {t('pages.history.startExploring')}
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
