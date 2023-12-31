import React from 'react';
import 'leaflet/dist/leaflet.css';
import popup from "../Icons/popup.png"
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, useMapEvents } from 'react-leaflet';

const Map = () => {
  var L = window.L;
  const center = [22.005565, 79.057514];

  const customIcon = new L.Icon({
    iconUrl: popup,
    iconSize: [40, 40], 
    iconAnchor: [20, 40], 
  });

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        L.marker([lat, lng], {icon:customIcon}).addTo(map);
        console.log(lat, lng);
      }
    });
  }

  return (
    <MapContainer center={center} zoom={5} style={{height:'100vh', width:'vh'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      <MyComponent />

    </MapContainer>
  )
}

export default Map
