import "./Contaxt.css";
import SurveyForm from "../../components/SurveyForm/SurveyForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Map from "../../components/Map/Map";
import "leaflet/dist/leaflet.css";

export default function () {
  return (
    <>
      <Header />
      <div className="main">
        <div className="presentation-container">
          <div className="contact-description-container">
            <h2 className="contact-title">¿Qué es descubri-2?</h2>
            <p className="contact-text">
              Soy Maximiliano Giménez, estudiante de Ingeniería en Informática
              en la UNAJ. Esta página tiene como objetivo facilitar el
              descubrimiento de contenido relacionado con el espacio y la
              ciencia. Gracias a React y la API APOD de la NASA, permite
              explorar imágenes y videos diarios del cosmos. Cuenta con búsqueda
              y filtros, validaciones en los formularios, un sistema de
              favoritos y un historial, para que puedas guardar y volver a
              descubrir lo que más te interese. Acá vas a poder aprender sobre
              nuevos planetas, cometas y eventos fascinantes como eclipses y
              lanzamientos espaciales.
            </p>
          </div>
          <div className="map-container">
            <p className="map-title">¿Dónde me podes encontrar?</p>
            <div id="map">
              <Map></Map>
            </div>
            <div className="map-description">
              <p>
                Podés encontrarme en la Universidad Nacional Arturo Jauretche,
                un espacio que se convirtió en mi segundo hogar desde que
                comencé la carrera. Es acá donde nacen muchas de mis ideas y
                proyectos, donde enfrento desafíos que me impulsan a mejorar
                cada día, y donde me rodeo de personas que, al igual que yo,
                buscan crecer y aportar al mundo de la tecnología y la ciencia.
                Estar en este lugar significa más que estudiar: significa
                descubrir, compartir y construir el futuro paso a paso.
              </p>
            </div>
          </div>
          <div className="survey-container">
            <SurveyForm></SurveyForm>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
