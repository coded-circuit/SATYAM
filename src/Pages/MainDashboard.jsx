import { Bell, CheckCircle, Clock, Files } from '@phosphor-icons/react';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import AppData from '../Data/AppData.js'; // Using default import
import './css/MainDashboard.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Reusable StatCard component with subtitle, trend lines, and icon component
const StatCard = ({ Icon, value, label, subtitle, trendPercent, trendDirection = 'up', trendText }) => (
  <div className="stat-card">
    <div className={`stat-icon ${label.toLowerCase().replace(' ', '-')}`}>
      {Icon && <Icon size={22} weight="duotone" />}
    </div>
    <div className="stat-info">
      <span className="stat-value">{value.toLocaleString()}</span>
      <span className="stat-label">{label}</span>
      {subtitle && <span className="stat-subtitle">{subtitle}</span>}
      {(trendPercent !== undefined) && (
        <span className={`stat-trend ${trendDirection}`}>
          {trendDirection === 'down' ? '↘' : '↗'}{trendPercent}%{trendText ? ` ${trendText}` : ''}
        </span>
      )}
    </div>
  </div>
);

export default function MainDashboard() {
  const [selectedState, setSelectedState] = useState('INDIA');
  const navigate = useNavigate();

  // Memoized calculations for performance
  const dashboardData = useMemo(() => {
    const notifications = AppData.notifications;
    const statesData = AppData.states;

    if (selectedState === 'INDIA') {
      // Calculate national totals by summing up all states
      const totalClaims = statesData.reduce((sum, s) => sum + s.totalClaims, 0);
      const approved = statesData.reduce((sum, s) => sum + s.approvedClaims, 0);
      const pending = statesData.reduce((sum, s) => sum + s.pendingClaims, 0);
      const rejected = statesData.reduce((sum, s) => sum + s.rejectedClaims, 0);
      const alerts = notifications.filter(n => !n.read).length;

      return {
        totalClaims,
        pending,
        approved,
        rejected,
        alerts,
        barChartData: [approved, pending, rejected]
      };
    }
    
    // Logic for a selected state
    const stateData = statesData.find(s => s.name.toUpperCase() === selectedState);
    if (!stateData) return { totalClaims: 0, pending: 0, approved: 0, rejected: 0, alerts: 0, barChartData: [0, 0, 0] };
    
    return {
      totalClaims: stateData.totalClaims,
      pending: stateData.pendingClaims,
      approved: stateData.approvedClaims,
      rejected: stateData.rejectedClaims,
      // Note: Alerts are kept national for this demo as user-state mapping isn't direct
      alerts: notifications.filter(n => !n.read).length,
      barChartData: [stateData.approvedClaims, stateData.pendingClaims, stateData.rejectedClaims]
    };
  }, [selectedState]);

  // Data for the Doughnut chart (breakdown for selected scope)
  const doughnutData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [{
      label: 'Claims',
      data: [dashboardData.approved, dashboardData.pending, dashboardData.rejected],
      backgroundColor: ['#4CAF50', '#FFC107', '#E57373'],
      borderColor: '#FFFFFF',
      borderWidth: 2,
    }],
  };
  
  // Derived metrics for the left panel
  const landCoveredPercent = useMemo(() => {
    const totalArea = AppData.claims.reduce((sum, c) => sum + (c.area || 0), 0);
    const approvedArea = AppData.claims.filter(c => c.status === 'Approved')
      .reduce((sum, c) => sum + (c.area || 0), 0);
    if (!totalArea) return 0;
    return Math.round((approvedArea / totalArea) * 100);
  }, []);

  const totalNGOs = 27; // Placeholder until NGO dataset is available

  const totalBeneficiaries = useMemo(() => {
    return AppData.schemes.reduce((sum, s) => sum + (s.beneficiaries || 0), 0);
  }, []);

  const approvalRate = useMemo(() => {
    const total = dashboardData.totalClaims || 0;
    if (!total) return 0;
    return Math.round((dashboardData.approved / total) * 100);
  }, [dashboardData.totalClaims, dashboardData.approved]);

  const states = ['MADHYA PRADESH', 'TRIPURA', 'INDIA', 'ODISHA', 'TELANGANA'];

  // Map center for thumbnail (use first village as an example focus)
  const mapCenter = useMemo(() => {
    const v = AppData.villages?.[0];
    return v ? [v.lat, v.lng] : [21.9058, 77.8986];
  }, []);

  return (
    <div className='main-dashboard'>
      <div className="content-area">
        <div className="content-container">
          <div className="state-tabs">
            {states.map((state) => (
              <button
                key={state}
                className={`state-btn ${selectedState === state ? 'active' : ''}`}
                onClick={() => setSelectedState(state)}
              >
                {state}
              </button>
            ))}
          </div>

          {/* --- Top Stat Cards --- */}
          <div className="stats-grid">
            <StatCard
              Icon={Files}
              value={dashboardData.totalClaims}
              label="Total Claims"
              subtitle="All FRA claims in system"
              trendPercent={12}
              trendDirection="up"
              trendText="from last month"
            />
            <StatCard
              Icon={CheckCircle}
              value={dashboardData.approved}
              label="Approved Claims"
              subtitle="Successfully processed"
              trendPercent={8}
              trendDirection="up"
              trendText="from last month"
            />
            <StatCard
              Icon={Clock}
              value={dashboardData.pending}
              label="Pending Claims"
              subtitle="Awaiting review"
              trendPercent={3.2}
              trendDirection="down"
              trendText="from last month"
            />
            <StatCard
              Icon={Bell}
              value={dashboardData.alerts}
              label="Alerts"
              subtitle="Unread notifications"
              trendPercent={45.2}
              trendDirection="down"
              trendText="from last month"
            />
          </div>

          {/* --- Two-column layout: Left details, Right chart --- */}
          <div className="dashboard-grid">
            <div className="dashboard-col-left">
              <div className="dashboard-card">
                <h3>Overview</h3>
                <div className="metrics-list">
                  <div className="metric-item"><span>% Land Covered</span><strong>{landCoveredPercent}%</strong></div>
                  <div className="metric-item"><span>Total NGOs</span><strong>{totalNGOs}</strong></div>
                  <div className="metric-item"><span>Total Beneficiaries</span><strong>{totalBeneficiaries.toLocaleString()}</strong></div>
                  <div className="metric-item"><span>Approval Rate</span><strong>{approvalRate}%</strong></div>
                </div>
              </div>

              <div
                className="dashboard-card map-thumb"
                role="button"
                tabIndex={0}
                onClick={() => navigate('/admin/maps')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/admin/maps'); }}
              >
                <h3>Quick Map</h3>
                <div className="map-thumb-inner">
                  <MapContainer
                    center={mapCenter}
                    zoom={8}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                    dragging={false}
                    attributionControl={false}
                    style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  </MapContainer>
                </div>
              </div>
            </div>

            <div className="dashboard-col-right">
              <div className="dashboard-card chart-card chart-card--sm">
                <h3>Claim Status Breakdown</h3>
                <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
              </div>
              <div className="dashboard-card activities-card">
                <h3>Recent Activities</h3>
                <div className="activities-list">
                  {AppData.notifications.slice(0, 5).map((n) => (
                    <div key={n.id} className={`activity-item ${n.type}`}>
                      <span className="activity-dot" />
                      <div className="activity-text">{n.message}</div>
                      <div className="activity-date">{n.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
