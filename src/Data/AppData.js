const AppData = {
    states: [
      {"id": 1, "name": "Madhya Pradesh", "code": "MP", "districts": 55, "totalClaims": 245000, "approvedClaims": 147000, "pendingClaims": 98000, "rejectedClaims": 35000},
      {"id": 2, "name": "Tripura", "code": "TR", "districts": 8, "totalClaims": 125000, "approvedClaims": 89000, "pendingClaims": 36000, "rejectedClaims": 18000},
      {"id": 3, "name": "Odisha", "code": "OD", "districts": 30, "totalClaims": 186000, "approvedClaims": 112000, "pendingClaims": 74000, "rejectedClaims": 28000},
      {"id": 4, "name": "Telangana", "code": "TG", "districts": 33, "totalClaims": 189649, "approvedClaims": 98000, "pendingClaims": 91649, "rejectedClaims": 24000}
    ],
    districts: [
      {"id": 1, "name": "Betul", "state": "Madhya Pradesh", "villages": 1245, "claims": 15600, "approved": 8900, "pending": 6700},
      {"id": 2, "name": "Dindori", "state": "Madhya Pradesh", "villages": 987, "claims": 12400, "approved": 7200, "pending": 5200},
      {"id": 3, "name": "Gomati", "state": "Tripura", "villages": 234, "claims": 8900, "approved": 5600, "pending": 3300},
      {"id": 4, "name": "Khowai", "state": "Tripura", "villages": 189, "claims": 6700, "approved": 4100, "pending": 2600},
      {"id": 5, "name": "Kandhamal", "state": "Odisha", "villages": 1456, "claims": 18900, "approved": 11200, "pending": 7700},
      {"id": 6, "name": "Koraput", "state": "Odisha", "villages": 1678, "claims": 21300, "approved": 13100, "pending": 8200},
      {"id": 7, "name": "Adilabad", "state": "Telangana", "villages": 1123, "claims": 16800, "approved": 8900, "pending": 7900},
      {"id": 8, "name": "Bhadradri", "state": "Telangana", "villages": 890, "claims": 13400, "approved": 7200, "pending": 6200}
    ],
    villages: [
      {"id": 1, "name": "Bhilgaon", "district": "Betul", "state": "MP", "lat": 21.9058, "lng": 77.8986, "population": 1245, "tribalPopulation": 987, "ifrClaims": 45, "crClaims": 12, "cfrClaims": 8, "approvedClaims": 38, "pendingClaims": 27},
      {"id": 2, "name": "Patalkot", "district": "Betul", "state": "MP", "lat": 21.8765, "lng": 78.1234, "population": 876, "tribalPopulation": 765, "ifrClaims": 32, "crClaims": 8, "cfrClaims": 5, "approvedClaims": 28, "pendingClaims": 17},
      {"id": 3, "name": "Jampui Hills", "district": "Gomati", "state": "TR", "lat": 24.0896, "lng": 92.3456, "population": 654, "tribalPopulation": 612, "ifrClaims": 28, "crClaims": 6, "cfrClaims": 4, "approvedClaims": 22, "pendingClaims": 16},
      {"id": 4, "name": "Belghar", "district": "Kandhamal", "state": "OD", "lat": 20.1789, "lng": 84.2345, "population": 1567, "tribalPopulation": 1234, "ifrClaims": 67, "crClaims": 15, "cfrClaims": 9, "approvedClaims": 54, "pendingClaims": 37},
      {"id": 5, "name": "Utnoor", "district": "Adilabad", "state": "TG", "lat": 19.4567, "lng": 79.8901, "population": 2134, "tribalPopulation": 1876, "ifrClaims": 89, "crClaims": 18, "cfrClaims": 12, "approvedClaims": 72, "pendingClaims": 47}
    ],
   // Add or replace the 'claims' array in your AppData.js with this one.
claims: [
  {
    id: "FRA001",
    holderName: "Ramesh Kumar",
    village: "Khargone",
    district: "Khargone",
    state: "Madhya Pradesh",
    type: "IFR",
    area: 2.5,
    status: "Approved",
    dateSubmitted: "2025-01-15",
    dateProcessed: "2025-02-20",
    coordinates: { lat: 21.826, lng: 75.611 },
    documents: ["patta_FRA001.pdf"]
  },
  {
    id: "FRA002",
    holderName: "Bastar Tribal Committee",
    village: "Jagdalpur",
    district: "Bastar",
    state: "Chhattisgarh",
    type: "CFR",
    area: 45.2,
    status: "Pending",
    dateSubmitted: "2025-01-14",
    dateProcessed: null,
    coordinates: { lat: 19.0822, lng: 82.0174 },
    documents: ["community_claim_FRA002.pdf"]
  },
  {
    id: "FRA003",
    holderName: "Sunita Devi",
    village: "Aurangabad",
    district: "Aurangabad",
    state: "Maharashtra",
    type: "CR",
    area: 12.8,
    status: "Under Review",
    dateSubmitted: "2025-01-13",
    dateProcessed: null,
    coordinates: { lat: 19.8762, lng: 75.3433 },
    documents: []
  },
  {
    id: "FRA004",
    holderName: "Mohan Singh",
    village: "Guwahati",
    district: "Kamrup",
    state: "Assam",
    type: "IFR",
    area: 3.1,
    status: "Approved",
    dateSubmitted: "2025-01-12",
    dateProcessed: "2025-02-18",
    coordinates: { lat: 26.1445, lng: 91.7362 },
    documents: ["patta_FRA004.pdf", "survey_FRA004.pdf"]
  },
  {
    id: "FRA005",
    holderName: "Kamla Community",
    village: "Raipur",
    district: "Raipur",
    state: "Chhattisgarh",
    type: "CFR",
    area: 78.5,
    status: "Rejected",
    dateSubmitted: "2025-01-10",
    dateProcessed: "2025-02-15",  
    coordinates: { lat: 21.2514, lng: 81.6296 },
    documents: ["rejection_letter_FRA005.pdf"]
  },
  {
    id: "FRA006",
    holderName: "Ram Singh Bhil",
    village: "Bhilgaon",
    district: "Betul",
    state: "Madhya Pradesh",
    type: "IFR",
    area: 2.5,
    status: "Approved",
    dateSubmitted: "2025-03-15",
    dateProcessed: "2025-01-20",
    coordinates: { lat: 21.9058, lng: 77.8986 },
    documents: ["patta_001.pdf", "survey_001.pdf"]
  },
  {
    id: "FRA007",
    holderName: "Bhilgaon Village Committee",
    village: "Bhilgaon",
    district: "Betul",
    state: "Madhya Pradesh",
    type: "CR",
    area: 45.8,
    status: "Pending",
    dateSubmitted: "2025-05-10",
    dateProcessed: null,
    coordinates: { lat: 21.9058, lng: 77.8986 },
    documents: ["community_claim_001.pdf"]
  },
  {
    id: "FRA008",
    holderName: "Sita Devi Gond",
    village: "Patalkot",
    district: "Betul",
    state: "Madhya Pradesh",
    type: "IFR",
    area: 1.8,
    status: "Approved",
    dateSubmitted: "2025-08-22",
    dateProcessed: "2025-03-18",
    coordinates: { lat: 21.8765, lng: 78.1234 },
    documents: ["patta_002.pdf"]
  },
  {
    id: "FRA009",
    holderName: "Jampui Hills Forest Committee",
    village: "Jampui Hills",
    district: "Gomati",
    state: "Tripura",
    type: "CFR",
    area: 123.4,
    status: "Approved",
    dateSubmitted: "2025-11-05",
    dateProcessed: "2025-06-12",
    coordinates: { lat: 24.0896, lng: 92.3456 },
    documents: ["cfr_001.pdf", "forest_survey_001.pdf"]
  },
  {
    id: "FRA010",
    holderName: "Mohan Pradhan",
    village: "Belghar",
    district: "Kandhamal",
    state: "Odisha",
    type: "IFR",
    area: 3.2,
    status: "Rejected",
    dateSubmitted: "2025-01-15",
    dateProcessed: "2025-08-20",
    coordinates: { lat: 20.1789, lng: 84.2345 },
    documents: ["application_003.pdf"]
  }
],

    schemes: [
      {"id": 1, "name": "PM-KISAN", "description": "Direct income support to farmers", "eligibility": "Land holding farmers", "benefit": "₹6000/year", "ministry": "Agriculture", "beneficiaries": 125000},
      {"id": 2, "name": "Jal Jeevan Mission", "description": "Piped water supply to households", "eligibility": "Rural households without tap connection", "benefit": "Tap water connection", "ministry": "Jal Shakti", "beneficiaries": 89000},
      {"id": 3, "name": "MGNREGA", "description": "Employment guarantee scheme", "eligibility": "Rural households", "benefit": "100 days guaranteed work", "ministry": "Rural Development", "beneficiaries": 156000},
      {"id": 4, "name": "DAJGUA", "description": "Tribal area development scheme", "eligibility": "Tribal communities", "benefit": "Infrastructure development", "ministry": "Tribal Affairs", "beneficiaries": 67000}
    ],
    notifications: [
        {"id": 1, "userId": 4, "message": "Your IFR claim has been approved", "type": "success", "date": "2025-01-20", "read": false},
      {"id": 2, "userId": 2, "message": "New village assignment: Bhilgaon verification pending", "type": "info", "date": "2025-01-18", "read": false},
      {"id": 3, "userId": 3, "message": "Monthly DSS report is ready for review", "type": "info", "date": "2025-01-15", "read": true}
    ],
    users: [
    {"id": 1, "name": "Admin User", "email": "admin@vanjyoti.gov.in", "role": "Admin", "state": "All", "district": "All", "phone": "+91-9876543210"},
    {"id": 2, "name": "Rajesh Kumar", "email": "rajesh.fo@mp.gov.in", "role": "Field Officer", "state": "Madhya Pradesh", "district": "Betul", "phone": "+91-9876543211"},
    {"id": 3, "name": "Dr. Priya Sharma", "email": "priya.analyst@mota.gov.in", "role": "Policy Analyst", "state": "All", "district": "All", "phone": "+91-9876543212"},
    {"id": 4, "name": "Ram Singh Bhil", "email": "ram.bhil@gmail.com", "role": "Patta Holder", "state": "Madhya Pradesh", "district": "Betul", "phone": "+91-9876543213"}
  ],
  // Land use composition per state (percentages should sum to ~100)
  landUse: [
    { state: 'MADHYA PRADESH', forest: 41, agricultural: 42, waterBodies: 4, settlement: 6, wasteLand: 3, other: 4 },
    { state: 'TRIPURA', forest: 57, agricultural: 28, waterBodies: 5, settlement: 6, wasteLand: 2, other: 2 },
    { state: 'ODISHA', forest: 38, agricultural: 44, waterBodies: 4, settlement: 7, wasteLand: 3, other: 4 },
    { state: 'TELANGANA', forest: 24, agricultural: 56, waterBodies: 5, settlement: 8, wasteLand: 3, other: 4 }
  ],
  alertsByState: {
    'INDIA': 31,
    'MADHYA PRADESH': 12,
    'TRIPURA': 6,
    'ODISHA': 9,
    'TELANGANA': 4
  },
  insightsAlerts: [
    { id: 1, title: 'Forest cover in Bhilgaon decreased by 2.4%', severity: 'high', date: '2025-01-28', summary: 'Satellite comparison indicates a minor reduction at the southern fringe. Verify on-ground and update compartment boundaries if needed.' },
    { id: 2, title: 'Soil fertility declined in Patalkot cluster', severity: 'medium', date: '2025-02-02', summary: 'Recent soil tests show NPK imbalance. Consider organic manure drive and micro-nutrient advisory.' },
    { id: 3, title: 'Groundwater level increased in Jampui Hills', severity: 'low', date: '2025-01-22', summary: 'Aquifer recharge observed after recent rains; review drinking water coverage expansion.' },
    { id: 4, title: 'Encroachment risk near Belghar CFR boundary', severity: 'critical', date: '2025-02-05', summary: 'New structures detected close to reserve boundary. Immediate field verification recommended.' }
  ],
  // Water and related resources per village
  waterResources: [
    { village: 'Bhilgaon', stateCode: 'MP', groundwaterLevelM: 12.4, fisheriesAreaHa: 14.2, pondsAreaHa: 6.1, riversLengthKm: 8.3 },
    { village: 'Patalkot', stateCode: 'MP', groundwaterLevelM: 18.6, fisheriesAreaHa: 9.5, pondsAreaHa: 4.2, riversLengthKm: 5.1 },
    { village: 'Jampui Hills', stateCode: 'TR', groundwaterLevelM: 9.3, fisheriesAreaHa: 6.4, pondsAreaHa: 2.8, riversLengthKm: 3.9 },
    { village: 'Belghar', stateCode: 'OD', groundwaterLevelM: 15.1, fisheriesAreaHa: 12.0, pondsAreaHa: 5.6, riversLengthKm: 6.7 },
    { village: 'Utnoor', stateCode: 'TG', groundwaterLevelM: 22.5, fisheriesAreaHa: 7.3, pondsAreaHa: 3.1, riversLengthKm: 2.4 }
  ],
    dssRecommendations: [
      {"id": 1, "village": "Bhilgaon", "recommendation": "Priority for Jal Jeevan Mission - Low water table detected", "priority": "High", "schemes": ["Jal Jeevan Mission"], "score": 87},
      {"id": 2, "village": "Patalkot", "recommendation": "MGNREGA focus for forest conservation works", "priority": "Medium", "schemes": ["MGNREGA", "DAJGUA"], "score": 72},
      {"id": 3, "village": "Belghar", "recommendation": "PM-KISAN enrollment for newly approved IFR holders", "priority": "High", "schemes": ["PM-KISAN"], "score": 91}
    ]
  };
  
export default AppData;