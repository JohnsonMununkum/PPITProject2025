//importing styles 
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Map =() => {
    const LOCATION = [52.8450, -8.9850];
    return (
        <MapContainer
          center={LOCATION}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "400px", height: "300px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={LOCATION}>
            <Popup>
              Jay's Cuisine<br />Ennis, Ireland.
            </Popup>
          </Marker>
        </MapContainer>
      );
};

export default Map;