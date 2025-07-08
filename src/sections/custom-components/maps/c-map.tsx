import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'src/sections/custom-components/maps/mapChart.css'; // Import the CSS file

type MapChartProps = {
  postalCode: string; // Pass postal code dynamically if needed
};

export function MapChart({ postalCode }: MapChartProps) {
  const center: LatLngExpression = [48.137, 11.575]; // Example center for Munich
  const zoom = 13;

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default MapChart;
