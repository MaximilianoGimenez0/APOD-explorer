import { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getRandomApodImages } from "../../services/apodService";
import type { Apod } from "../../models/Apod";
import { useNavigate } from "react-router";
import { FaPlay, FaArrowRight, FaCompass } from "react-icons/fa";
import { useTranslation } from "../../i18n";

export default function Home() {
  const [featured, setFeatured] = useState<Apod | null>(null);
  const [discoveries, setDiscoveries] = useState<Apod[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        // Fetch 4 random images: 1 for hero, 3 for discovery section
        const imgs = await getRandomApodImages(4);
        if (imgs && imgs.length > 0) {
          setFeatured(imgs[0]);
          setDiscoveries(imgs.slice(1, 4));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  const goToDetail = (apod: Apod) => {
    navigate("/detail", { state: apod });
  };

  return (
    <>
      <Header />
      <main className="main-content">
        {/* HERO SECTION */}
        <section className="hero-section">
          {loading ? (
            <div className="hero-skeleton">
              <div className="skeleton-pulse"></div>
            </div>
          ) : featured ? (
            <div className="hero-content">
              <div className="hero-background">
                {featured.media_type === "image" ? (
                  <img src={featured.url} alt={featured.title} className="hero-image" />
                ) : (
                  <img src={featured.thumbnail_url || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564"} alt={featured.title} className="hero-image" />
                )}
                <div className="hero-overlay"></div>
              </div>

              <div className="hero-text-content">
                <div className="hero-badge">{t('pages.home.discoveryOfDay')}</div>
                <h1 className="hero-title">{featured.title}</h1>
                <p className="hero-date">{featured.date}</p>
                <p className="hero-description">
                  {featured.explanation.substring(0, 180)}...
                </p>
                <div className="hero-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => goToDetail(featured)}
                  >
                    {t('pages.home.exploreButton')} <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ) : (
             <div className="hero-empty">
                <h1>{t('pages.home.emptyHero')}</h1>
             </div>
          )}
        </section>

        {/* DAILY DISCOVERY SECTION */}
        <section className="discovery-section">
          <div className="section-header">
            <h2>{t('pages.home.exploreCosmos')}</h2>
            <button className="btn-link" onClick={() => navigate("/discover")}>
              {t('pages.home.viewMore')} <FaArrowRight />
            </button>
          </div>

          <div className="discovery-grid">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="discovery-card skeleton-card"></div>
              ))
            ) : (
              discoveries.map((apod, index) => (
                <div 
                  key={`${apod.date}-${index}`} 
                  className="discovery-card"
                  onClick={() => goToDetail(apod)}
                >
                  <div className="card-image-wrapper">
                    {apod.media_type === "image" ? (
                      <img src={apod.url} alt={apod.title} loading="lazy" />
                    ) : (
                      <div className="video-placeholder">
                        <FaPlay className="video-icon" />
                      </div>
                    )}
                    <div className="card-overlay"></div>
                  </div>
                  <div className="card-content">
                    <span className="card-date">{apod.date}</span>
                    <h3 className="card-title">{apod.title}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* FEATURES PRESENTATION */}
        <section className="features-section">
          <div className="feature-item">
            <div className="feature-icon"><FaCompass /></div>
            <h3>{t('pages.home.features.infinite.title')}</h3>
            <p>{t('pages.home.features.infinite.desc')}</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">❤️</div>
            <h3>{t('pages.home.features.collection.title')}</h3>
            <p>{t('pages.home.features.collection.desc')}</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📚</div>
            <h3>{t('pages.home.features.history.title')}</h3>
            <p>{t('pages.home.features.history.desc')}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
