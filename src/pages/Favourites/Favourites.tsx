import "./Favourites.css";
import FavouriteEntry from "../../components/FavouriteEntry/FavouriteEntry";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import type { Apod } from "../../models/Apod";
import { useNavigate } from "react-router";
import { FaHeart, FaCompass } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Favourites() {
  const [apods, setApods] = useState<Apod[]>([]);
  const navigate = useNavigate();

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
      <Header />
      <main className="favourites-main">
        <div className="favourites-header">
          <h1>Tu Colección Estelar</h1>
          <p>Tus descubrimientos astronómicos favoritos guardados para siempre.</p>
        </div>

        {apods.length === 0 ? (
          <div className="favourites-empty">
            <div className="empty-icon-container">
              <FaHeart className="empty-icon" />
            </div>
            <h2>Aún no hay descubrimientos guardados</h2>
            <p>
              Explora nuestra galería astronómica y guarda tus imágenes favoritas para crear tu propia colección personal del cosmos.
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/discover")}>
              <FaCompass /> Iniciar Exploración
            </button>
          </div>
        ) : (
          <div className="favourites-gallery">
            {apods.map((apod) => (
              <FavouriteEntry
                key={apod.date + apod.title}
                goToApodDetails={goToApodDetails}
                apod={apod}
                onLikeChange={handleLikeChange}
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
  const cachedFavourites = localStorage.getItem("favourites");
  return cachedFavourites ? JSON.parse(cachedFavourites) : [];
}
