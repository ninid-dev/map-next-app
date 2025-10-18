"use client";

import "leaflet/dist/leaflet.css";

import { icon } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const ICON = icon({
  iconUrl: "assets/marker.png",
  iconSize: [32, 32],
})

export default function Map(props) {
  const { position = [51.505, -0.09], zoom = 11 } = props
    // [51.505, -0.09]
  return (
    <MapContainer
      preferCanvas={true}
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={ICON} position={position}>
        <Popup>
          This Marker icon is displayed correctly with{" "}
          <i>leaflet-defaulticon-compatibility</i>.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
