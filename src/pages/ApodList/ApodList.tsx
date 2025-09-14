import { useEffect, useState } from "react";
import {
  getFilteredApodImages,
  getRandomApodImages,
} from "../../services/apodService";
import type { Apod } from "../../models/Apod";
import ApodCard from "../../components/ApodCard/ApodCard";
import Filters from "../../components/Filters/Filters";
import "./ApodList.css";
import { useNavigate } from "react-router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
export default function () {
  const navigate = useNavigate();
  const [images, setImages] = useState<Apod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedApods = localStorage.getItem("cachedApods");
    if (cachedApods) {
      const results: Apod[] = JSON.parse(cachedApods);
      setImages(results);
      setLoading(false);
    } else {
      fetchRandomImages();
    }
  }, []);

  return (
    <>
      <Header></Header>
      <div className="main">
        <div className="filters">
          <Filters
            onRandom={fetchRandomImages}
            onFiltered={fetchFilteredImages}
          ></Filters>
        </div>
        <div className="result-list">
          <div className="apod-container">
            <h2 className="apod-title">Imágenes del espacio 🚀</h2>
            <hr />
            {loading ? (
              <div
                className="apod-spinner"
                role="status"
                aria-label="Cargando imágenes"
              ></div>
            ) : (
              <div className="apod-grid">
                {images.map((apod) => (
                  <div
                    onClick={() => goToApodDetail(apod)}
                    className="apod-card-wrapper"
                    key={apod.date + apod.title}
                  >
                    <ApodCard apod={apod} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );

  function loadCache(apod: Apod[]) {
    const toCache = JSON.stringify(apod);

    localStorage.setItem("cachedApods", toCache);
  }

  async function fetchFilteredImages(year: number, month: number) {
    try {
      setLoading(true);
      const imgs = await getFilteredApodImages(year, month);
      setImages(imgs);

      loadCache(imgs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRandomImages() {
    try {
      setLoading(true);
      const imgs = await getRandomApodImages();
      setImages(imgs);

      loadCache(imgs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function goToApodDetail(apod: Apod) {
    navigate("/detail", { state: apod });
  }
}
