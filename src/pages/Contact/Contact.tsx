import "./Contaxt.css";
import SurveyForm from "../../components/SurveyForm/SurveyForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Map from "../../components/Map/Map";
import "leaflet/dist/leaflet.css";
import { FaReact, FaSpaceShuttle, FaMapMarkerAlt, FaCode } from "react-icons/fa";
import { SiVite, SiTypescript } from "react-icons/si";
import { useTranslation } from "../../i18n";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <Header />
      <main className="about-main">
        {/* Presentation Header */}
        <section className="about-header-section">
          <h1>{t('pages.about.title')}</h1>
          <p>{t('pages.about.subtitle')}</p>
        </section>

        <div className="about-content-grid">
          {/* Main Description */}
          <section className="about-card col-span-2">
            <div className="about-card-header">
              <FaSpaceShuttle className="about-icon text-accent" />
              <h2>{t('pages.about.whatIs.title')}</h2>
            </div>
            <p className="about-text" dangerouslySetInnerHTML={{ __html: t('pages.about.whatIs.p1').replace('Maximiliano Giménez', '<strong>Maximiliano Giménez</strong>').replace('Astronomy Picture of the Day (APOD)', '<em>Astronomy Picture of the Day (APOD)</em>') }} />
            <p className="about-text">
              {t('pages.about.whatIs.p2')}
            </p>
          </section>

          {/* Technology Stack */}
          <section className="about-card col-span-1">
            <div className="about-card-header">
              <FaCode className="about-icon text-accent-secondary" />
              <h2>{t('pages.about.tech.title')}</h2>
            </div>
            <p className="about-text mb-lg">
              {t('pages.about.tech.desc')}
            </p>
            <div className="tech-stack-list">
              <div className="tech-item">
                <FaReact className="tech-icon react-color" />
                <span>React 18</span>
              </div>
              <div className="tech-item">
                <SiTypescript className="tech-icon ts-color" />
                <span>TypeScript</span>
              </div>
              <div className="tech-item">
                <SiVite className="tech-icon vite-color" />
                <span>Vite</span>
              </div>
            </div>
          </section>

          {/* Location / Map */}
          <section className="about-card col-span-2">
            <div className="about-card-header">
              <FaMapMarkerAlt className="about-icon text-accent-tertiary" />
              <h2>{t('pages.about.location.title')}</h2>
            </div>
            <div className="about-map-layout">
              <div className="about-map-text">
                <p className="about-text" dangerouslySetInnerHTML={{ __html: t('pages.about.location.desc').replace('Universidad Nacional Arturo Jauretche (UNAJ)', '<strong>Universidad Nacional Arturo Jauretche (UNAJ)</strong>') }} />
              </div>
              <div className="about-map-container">
                <Map />
              </div>
            </div>
          </section>

          {/* Survey Form */}
          <section className="about-card col-span-1">
            <div className="about-card-header">
              <h2>{t('pages.about.survey.title')}</h2>
            </div>
            <div className="survey-wrapper">
              <SurveyForm />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
