import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon, Marker as LeafletMarker } from "leaflet";
import { useEffect, useRef } from "react";
import "./Map.css";

function OpenPopup({
  markerRef,
}: {
  markerRef: React.RefObject<LeafletMarker | null>;
}) {
  const map = useMap();

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [map, markerRef]);

  return null;
}

export default function Map() {
  const markerRef = useRef<LeafletMarker | null>(null);

  const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div id="map">
      <MapContainer
        center={[-34.774546338694144, -58.2676079624403]}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[-34.774546338694144, -58.2676079624403]}
          icon={customIcon}
          ref={markerRef}
        >
          <Popup>Universidad Nacional Arturo Jauretche</Popup>
        </Marker>

        <OpenPopup markerRef={markerRef} />
      </MapContainer>
    </div>
  );
}
