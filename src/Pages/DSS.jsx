import React, { useState } from 'react';
import AppData from '../Data/AppData'
import './css/dss.css'

const getSchemeIcon = (schemeName) => {
  switch (schemeName) {
    case 'PM-KISAN':
      return 'ph-leaf';
    case 'Jal Jeevan Mission':
      return 'ph-drop';
    case 'MGNREGA':
      return 'ph-users-three';
    case 'DAJGUA':
      return 'ph-tree-structure';
    default:
      return 'ph-clipboard-text'; // A default icon
  }
};

export default function DSS() {
   // State to keep track of the selected village in the dropdown
  const [selectedVillage, setSelectedVillage] = useState('');
  // State to hold the schemes that match the selected village
  const [matchedSchemes, setMatchedSchemes] = useState([]);

  // This function replaces the vanilla JS event listener
  const handleMatchSchemes = () => {
    if (!selectedVillage) {
      setMatchedSchemes([]); // Clear results if no village is selected
      return;
    }

    // Find recommendations for the selected village to get eligible schemes
    const villageRec = AppData.dssRecommendations.find(
      rec => rec.village === selectedVillage
    );

    if (villageRec && villageRec.schemes) {
      // Filter the main schemes list to get full details of matched schemes
      const schemes = AppData.schemes.filter(scheme =>
        villageRec.schemes.includes(scheme.name)
      );
      setMatchedSchemes(schemes);
    } else {
      setMatchedSchemes([]); // No matching schemes found
    }
  };

  return (
    <div id="dss-page" className="page">
      <div className="page-header">
        <h2>Decision Support System</h2>
      </div>

      <div className="dss-content">
        <div className="recommendations-section">
          <h3>Priority Recommendations</h3>
          <div className="recommendation-list">
            {/* Loop through dssRecommendations from AppData to render cards */}
            {AppData.dssRecommendations.map((rec) => (
              <div
                key={rec.id}
                className={`recommendation-card priority-${rec.priority.toLowerCase()}`}
              >
                <div className="rec-header">
                  <h4>{rec.village} Village</h4>
                  <div className={`priority-badge ${rec.priority.toLowerCase()}`}>
                    {rec.priority} Priority
                  </div>
                  <div className="score">Score: {rec.score}</div>
                </div>
                <p>{rec.recommendation}</p>
                <div className="rec-schemes">
                  {rec.schemes.map((schemeName) => (
                    <span key={schemeName} className="scheme-tag">
                      {schemeName}
                    </span>
                  ))}
                </div>
                <button className="btn btn--primary btn--sm">View Details</button>
              </div>
            ))}
          </div>
        </div>

        <div className="scheme-matcher">
          <h3>Scheme Matcher</h3>
          <div className="matcher-form">
            <div className="form-group">
              <label className="form-label">Select Village</label>
              {/* This select is now controlled by React state */}
              <select
                id="village-select"
                className="form-control"
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
              >
                <option value="">Choose village</option>
                {/* Dynamically create options from the villages data */}
                {AppData.villages.map((village) => (
                  <option key={village.id} value={village.name}>
                    {village.name}
                  </option>
                ))}
              </select>
            </div>
            {/* The button's click event is handled by React */}
            <button
              className="btn btn--primary"
              id="match-schemes-btn"
              onClick={handleMatchSchemes}
            >
              Find Matching Schemes
            </button>
          </div>

          {/* This section is conditionally rendered based on matchedSchemes state */}
          <div
            className={`matched-schemes ${matchedSchemes.length > 0 ? 'active' : ''}`}
            id="matched-schemes"
          >
            <h4>Available Schemes for {selectedVillage}</h4>
            <div className="scheme-results">
              {matchedSchemes.length > 0 ? (
                matchedSchemes.map((scheme) => (
                  // --- MODIFIED PART START ---
                  <div key={scheme.id} className="scheme-result-item">
                    <div className="scheme-icon">
                      <i className={`ph ${getSchemeIcon(scheme.name)}`}></i>
                    </div>
                    <div className="scheme-details">
                      <h5>{scheme.name}</h5>
                      <p>{scheme.description}</p>
                    </div>
                  </div>
                  // --- MODIFIED PART END ---
                ))
              ) : (
                <p>No schemes found for the selected village.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
