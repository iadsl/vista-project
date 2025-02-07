import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ChicagoMap = () => {
  const [communityAreas, setCommunityAreas] = useState(null);
  const chicagoCenter = [41.8781, -87.6298];
  
  useEffect(() => {
    fetch('/src/data/chicago-community-areas.geojson')
      .then(response => response.json())
      .then(data => setCommunityAreas(data));
  }, []);

  const areaStyle = {
    fillColor: '#3388ff',
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.3
  };

  const onEachArea = (feature, layer) => {
    if (feature.properties && feature.properties.community) {
      layer.bindPopup(feature.properties.community);
    }
  };
  
  return (
    <MapContainer 
      center={chicagoCenter}
      zoom={11}
      style={{ height: '90vh', width: '90%', margin: '0 auto' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {communityAreas && (
        <GeoJSON 
          data={communityAreas}
          style={areaStyle}
          onEachFeature={onEachArea}
        />
      )}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};

export default ChicagoMap;