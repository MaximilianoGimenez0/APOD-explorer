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

export default function ApodList() {
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
    <div className="discover-page-wrapper">
      <Header />
      <main className="discover-main">
        <div className="discover-layout">
          
          <aside className="discover-sidebar">
            <Filters
              onRandom={fetchRandomImages}
              onFiltered={fetchFilteredImages}
            />
          </aside>

          <section className="discover-content">
            <div className="discover-header">
              <h1 className="discover-title">Exploración Cósmica</h1>
              <p className="discover-subtitle">Descubrí las maravillas del universo a través del archivo de la NASA</p>
            </div>

            {loading ? (
              <div className="gallery-grid">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="gallery-skeleton"></div>
                ))}
              </div>
            ) : (
              <div className="gallery-grid">
                {images.map((apod, index) => (
                  <div
                    onClick={() => goToApodDetail(apod)}
                    className="gallery-item"
                    key={`${apod.date}-${apod.title}-${index}`}
                  >
                    <ApodCard apod={apod} />
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
      <Footer />
    </div>
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
      const imgs = await getRandomApodImages(12); // Fetch 12 images for a good gallery size
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
