import "./Contaxt.css";
import SurveyForm from "../../components/SurveyForm/SurveyForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Map from "../../components/Map/Map";
import "leaflet/dist/leaflet.css";
import { FaReact, FaSpaceShuttle, FaMapMarkerAlt, FaCode } from "react-icons/fa";
import { SiVite, SiTypescript } from "react-icons/si";

export default function Contact() {
  return (
    <div className="about-page">
      <Header />
      <main className="about-main">
        {/* Presentation Header */}
        <section className="about-header-section">
          <h1>Sobre el Proyecto</h1>
          <p>Descubriendo el universo, una línea de código a la vez.</p>
        </section>

        <div className="about-content-grid">
          {/* Main Description */}
          <section className="about-card col-span-2">
            <div className="about-card-header">
              <FaSpaceShuttle className="about-icon text-accent" />
              <h2>¿Qué es APOD-explorer?</h2>
            </div>
            <p className="about-text">
              Soy <strong>Maximiliano Giménez</strong>, estudiante de Ingeniería en Informática en la UNAJ. 
              Esta aplicación tiene como objetivo facilitar la exploración del universo acercando el conocimiento 
              científico a través de la interfaz oficial <em>Astronomy Picture of the Day (APOD)</em> de la NASA.
            </p>
            <p className="about-text">
              El proyecto te permite explorar un vasto archivo de imágenes y videos diarios del cosmos, 
              con características como filtros por fecha, sistema de favoritos, historial de exploración y 
              un diseño moderno inspirado en plataformas editoriales premium.
            </p>
          </section>

          {/* Technology Stack */}
          <section className="about-card col-span-1">
            <div className="about-card-header">
              <FaCode className="about-icon text-accent-secondary" />
              <h2>Tecnología</h2>
            </div>
            <p className="about-text mb-lg">
              Construido con tecnologías modernas para ofrecer un rendimiento óptimo y una experiencia fluida.
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
              <h2>¿Dónde me podés encontrar?</h2>
            </div>
            <div className="about-map-layout">
              <div className="about-map-text">
                <p className="about-text">
                  En la <strong>Universidad Nacional Arturo Jauretche (UNAJ)</strong>. 
                  Este espacio se convirtió en mi segundo hogar desde que comencé la carrera. 
                  Es acá donde nacen muchas de mis ideas y proyectos, donde enfrento desafíos que 
                  me impulsan a mejorar cada día, y donde me rodeo de personas que buscan crecer 
                  y aportar al mundo de la tecnología y la ciencia.
                </p>
              </div>
              <div className="about-map-container">
                <Map />
              </div>
            </div>
          </section>

          {/* Survey Form */}
          <section className="about-card col-span-1">
            <div className="about-card-header">
              <h2>Dejá tu opinión</h2>
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
