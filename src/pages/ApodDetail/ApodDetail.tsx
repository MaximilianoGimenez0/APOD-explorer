import { useLocation } from "react-router";
import "./ApodDetail.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ApodControls from "../../components/ApodControls/ApodControls";
import type { Apod } from "../../models/Apod";

export default () => {
  const location = useLocation();
  const apod = location.state;
  console.log(apod);

  return (
    <>
      <Header></Header>
      <div className="main">
        <div className="detail-container">
          <div className="apod-media">
            <h1 className="apod-title">{apod.title}</h1>
            {apod.thumbnail_url && (
              <p className="apod-thumbnail">
                <strong>Thumbnail:</strong>{" "}
                <a
                  href={apod.thumbnail_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {apod.thumbnail_url}
                </a>
              </p>
            )}
            {apod.media_type === "image" ? (
              <img
                src={apod.hdurl || apod.url}
                alt={apod.title}
                className="apod-image"
              />
            ) : (
              <iframe
                src={apod.url}
                title={apod.title}
                className="apod-video"
                allowFullScreen
              />
            )}{" "}
          </div>
          <ApodControls
            apod={apod}
            addFavourite={addFavourite}
            share={share}
          ></ApodControls>
          <div className="apod-date">
            <p>
              <strong>Fecha:</strong> {apod.date}
            </p>
          </div>
          <div className="apod-explanation">
            <p>{apod.explanation}</p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

function addFavourite(apod: Apod) {
  const apodKey = apod.date + apod.title;

  if (localStorage.getItem(apodKey)) {
    localStorage.removeItem(apodKey);
    return;
  }

  localStorage.setItem(apodKey, JSON.stringify(apod));
}

function share(apod: Apod) {
  const email = "";
  const subject = `Mirá este APOD: ${apod.title}`;

  let body = `Hola!\n\nQuería compartirte este APOD que encontré:\n\n`;
  body += `Título: ${apod.title}\n\n`;
  body += `Fecha: ${apod.date}\n\n`;
  body += `Mirá la imagen/video acá: ${apod.url}\n\n`;

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.open(mailtoLink);
}
