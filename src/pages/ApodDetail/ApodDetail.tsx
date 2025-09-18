import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { share, addHistory } from "../../services/internalFunctions";
import "./ApodDetail.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ApodControls from "../../components/ApodControls/ApodControls";

export default () => {
  const location = useLocation();
  const apod = location.state;
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    addHistory(apod);
  }, [apod]);

  return (
    <>
      <Header />
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
              <div className="image-wrapper">
                {loadingImage && <div className="loader"></div>}
                <img
                  src={apod.hdurl || apod.url}
                  alt={apod.title}
                  className="apod-image"
                  style={{ display: loadingImage ? "none" : "block" }}
                  onLoad={() => setLoadingImage(false)}
                />
              </div>
            ) : (
              <iframe
                src={apod.url}
                title={apod.title}
                className="apod-video"
                allowFullScreen
              />
            )}
          </div>

          <ApodControls apod={apod} share={share} />
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
      <Footer />
    </>
  );
};
