import "./Contaxt.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function () {
  const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <>
      <Header></Header>
      <div className="main">
        {" "}
        <div className="map-container">
          <div id="map">
            <MapContainer
              center={[-34.6037, -58.3816]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[-34.6037, -58.3816]} icon={customIcon}>
                <Popup>¡Hola! Estoy en Buenos Aires 🚀</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
