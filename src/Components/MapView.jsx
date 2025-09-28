import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet if you are using custom icons
import 'leaflet/dist/leaflet.css'; // Don't forget to import Leaflet's CSS

// You'll need to get your AppData from your props or state management
// This is just a placeholder to make the component runnable
const AppData = {
  states: [
    { name: 'Madhya Pradesh', code: 'MP' },
    { name: 'Tripura', code: 'TR' },
    { name: 'Odisha', code: 'OD' },
  ],
  districts: [{ id: 1, name: 'Betul' }, { id: 2, name: 'Gomati' }],
  claims: [
    { id: 1, claimType: 'IFR', holderName: 'Ram Singh', village: 'Bhilgaon', area: 2.5, status: 'Approved', dateApplied: '2022-03-15', coordinates: [21.90, 77.89] },
    { id: 2, claimType: 'CR', holderName: 'Village Committee', village: 'Jampui', area: 45.8, status: 'Pending', dateApplied: '2023-05-10', coordinates: [24.08, 92.34] },
    { id: 3, claimType: 'CFR', holderName: 'Forest Committee', village: 'Belghar', area: 123.4, status: 'Approved', dateApplied: '2022-11-05', coordinates: [20.17, 84.23] }
  ],
  villages: [
    { id: 1, lat: 21.87, lng: 78.12, name: 'Patalkot', district: 'Betul', population: 876, tribalPopulation: 765, ifrClaims: 32, approvedClaims: 28 }
  ]
};

// Fix for default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export default function FraAtlasPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  
  // Dummy state variables - replace with your actual state logic
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedClaimType, setSelectedClaimType] = useState('');
  const availableDistricts = AppData.districts;
  const filteredClaims = AppData.claims;

  const claimColors = {
    IFR: '#5A6E55',
    CR: '#A98A78',
    CFR: '#E57373',
  };

  return (
    <div className="atlas-container">
      {/* Map Display - This is the base layer */}
      <div className="map-display">
        <MapContainer center={[21.0, 78.0]} zoom={5} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {/* Claims Markers */}
          {filteredClaims.map((claim) => (
            <CircleMarker
              key={claim.id}
              center={claim.coordinates}
              pathOptions={{
                color: claimColors[claim.claimType] || "#666",
                fillColor: claimColors[claim.claimType] || "#666",
                fillOpacity: 0.7,
              }}
              radius={8}
            >
              <Popup>
                <h4>{claim.claimType} Claim</h4>
                <p><strong>Holder:</strong> {claim.holderName}</p>
                <p><strong>Village:</strong> {claim.village}</p>
                <p><strong>Area:</strong> {claim.area} acres</p>
                <p><strong>Status:</strong> {claim.status}</p>
                <p><strong>Applied:</strong> {claim.dateApplied}</p>
              </Popup>
            </CircleMarker>
          ))}

          {/* Villages Markers */}
          {AppData.villages.map((v) => (
            <Marker key={v.id} position={[v.lat, v.lng]}>
              <Popup>
                <h4>{v.name}</h4>
                <p><strong>District:</strong> {v.district}</p>
                <p><strong>Population:</strong> {v.population}</p>
                <p><strong>Tribal Pop:</strong> {v.tribalPopulation}</p>
                <p><strong>IFR Claims:</strong> {v.ifrClaims}</p>
                <p><strong>Approved:</strong> {v.approvedClaims}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Floating Controls Panel (Top Left) */}
      <div className="floating-panel floating-panel-top-right">
        <div className="panel-header">
          <h4>Filters & Layers</h4>
          <button className="panel-toggle-btn" onClick={() => setIsPanelOpen(!isPanelOpen)}>
            <i className={`ph-caret-up ${!isPanelOpen ? 'collapsed' : ''}`}></i>
          </button>
        </div>
        <div className={`panel-content ${!isPanelOpen ? 'collapsed' : ''}`}>
          {/* Filters */}
          <div className="filter-section">
            <div className="form-group">
              <label className="form-label">State</label>
              <select className="form-control" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                <option value="">All States</option>
                {AppData.states.map((s) => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">District</label>
              <select className="form-control" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
                <option value="">All Districts</option>
                {availableDistricts.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Claim Type</label>
              <select className="form-control" value={selectedClaimType} onChange={(e) => setSelectedClaimType(e.target.value)}>
                <option value="">All Types</option>
                <option value="IFR">IFR</option>
                <option value="CR">Community Rights</option>
                <option value="CFR">Community Forest Rights</option>
              </select>
            </div>
          </div>
          {/* Layers */}
          <div className="layer-controls">
            <div className="layer-item">
              <input type="checkbox" id="ifr-layer" defaultChecked />
              <label htmlFor="ifr-layer">IFR Claims</label>
            </div>
            <div className="layer-item">
              <input type="checkbox" id="cr-layer" defaultChecked />
              <label htmlFor="cr-layer">Community Rights</label>
            </div>
            <div className="layer-item">
              <input type="checkbox" id="cfr-layer" defaultChecked />
              <label htmlFor="cfr-layer">Community Forest Rights</label>
            </div>
            <div className="layer-item">
              <input type="checkbox" id="village-layer" defaultChecked />
              <label htmlFor="village-layer">Village Boundaries</label>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Legend Panel (Bottom Right) */}
      <div className="floating-panel floating-panel-bottom-left">
        <div className="panel-header"><h4>Legend</h4></div>
        <div className="panel-content">
          <div className="legend-item">
            <div className="legend-color ifr-color"></div>
            <span>IFR Claims</span>
          </div>
          <div className="legend-item">
            <div className="legend-color cr-color"></div>
            <span>Community Rights</span>
          </div>
          <div className="legend-item">
            <div className="legend-color cfr-color"></div>
            <span>Community Forest Rights</span>
          </div>
          <div className="legend-item">
             <img src={require('leaflet/dist/images/marker-icon.png')} alt="village icon" style={{height: '25px'}}/>
            <span>Villages</span>
          </div>
        </div>
      </div>
    </div>
  );
}