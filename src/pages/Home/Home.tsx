import "./Home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="main">
        <div className="home-container">
          <section className="hero">
            <div className="hero-text">
              <h1>Descubrí el Universo 🌌</h1>
              <p>
                Bienvenido a <b>APOD-explorer</b>, tu espacio para explorar
                imágenes diarias del universo gracias a la API{" "}
                <b>APOD de la NASA</b>.
              </p>
            </div>
          </section>

          <section className="features">
            <div className="feature-card">
              <img
                src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80"
                alt="Nebulosa"
              />
              <h2>Explorá</h2>
              <p>
                Filtrá por fecha o descubrí imágenes aleatorias del espacio
                profundo.
              </p>
            </div>

            <div className="feature-card">
              <img
                src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80"
                alt="Galaxia"
              />
              <h2>Guardá</h2>
              <p>
                Agregá tus APOD favoritos a tu colección personal para volver a
                verlos cuando quieras.
              </p>
            </div>

            <div className="feature-card">
              <img
                src="https://images.unsplash.com/photo-1447433819943-74a20887a81e?auto=format&fit=crop&w=800&q=80"
                alt="Andrómeda"
              />
              <h2>Compartí</h2>
              <p>
                Mostrá a tus amigos las maravillas del universo compartiendo las
                mejores imágenes.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
