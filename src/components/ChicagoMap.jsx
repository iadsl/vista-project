
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ChicagoMap = () => {
  const chicagoCenter = [41.8781, -87.6298];
  
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
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};

export default ChicagoMap;