import 'chart.js/auto'
import React, { useMemo, useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import AppData from '../Data/AppData.js'
import './css/FRDDashboard.css'

export default function FRDDashboard() {
  const [selectedState, setSelectedState] = useState('INDIA')
  const [selectedVillage, setSelectedVillage] = useState('ALL')
  const [landVillage, setLandVillage] = useState('ALL')
  const metrics = useMemo(() => {
    const totalArea = (AppData.claims || []).reduce((sum, c) => sum + (Number(c.area) || 0), 0)
    const approvedArea = (AppData.claims || []).filter(c => c.status === 'Approved').reduce((s, c) => s + (Number(c.area) || 0), 0)
    const landCovered = totalArea ? Math.round((approvedArea / totalArea) * 100) : 0
    const forestAreaCovered = Math.min(100, landCovered + 12)
    const digitization = 92
    const totalFRA = (AppData.claims || []).length
    return { landCovered, forestAreaCovered, digitization, totalFRA }
  }, [])

  const states = ['MADHYA PRADESH', 'TRIPURA', 'ODISHA', 'TELANGANA']
  const villages = useMemo(() => {
    const unique = Array.from(new Set((AppData.waterResources || []).map(w => w.village)))
    return ['ALL'].concat(unique)
  }, [])

  const landUseForState = useMemo(() => {
    const base = (AppData.landUse || [])
    const computeAvg = (list) => {
      const agg = { forest: 0, agricultural: 0, waterBodies: 0, settlement: 0, wasteLand: 0, other: 0 }
      list.forEach(l => {
        agg.forest += l.forest; agg.agricultural += l.agricultural; agg.waterBodies += l.waterBodies; agg.settlement += l.settlement; agg.wasteLand += l.wasteLand; agg.other += l.other
      })
      const n = list.length || 1
      return {
        forest: Math.round(agg.forest/n),
        agricultural: Math.round(agg.agricultural/n),
        waterBodies: Math.round(agg.waterBodies/n),
        settlement: Math.round(agg.settlement/n),
        wasteLand: Math.round(agg.wasteLand/n),
        other: Math.round(agg.other/n)
      }
    }

    if (selectedState === 'INDIA') return computeAvg(base)
    return computeAvg(base.filter(l => l.state === selectedState))
  }, [selectedState])

  const doughnutData = {
    labels: ['Forest', 'Agricultural', 'Water Bodies', 'Settlement', 'Waste Land', 'Other'],
    datasets: [{
      data: [landUseForState.forest, landUseForState.agricultural, landUseForState.waterBodies, landUseForState.settlement, landUseForState.wasteLand, landUseForState.other],
      backgroundColor: ['#5A6E55', '#A98A78', '#4FC3F7', '#90A4AE', '#BDBDBD', '#CFD8DC'],
      borderColor: '#FFFFFF',
      borderWidth: 2,
    }]
  }

  const alertsCount = selectedState === 'INDIA' ? (AppData.alertsByState || {}).INDIA : (AppData.alertsByState || {})[selectedState]

  const waterForVillage = useMemo(() => {
    const list = (AppData.waterResources || [])
    const filtered = selectedVillage === 'ALL' ? list : list.filter(w => w.village === selectedVillage)
    const total = filtered.length || 1
    const agg = filtered.reduce((acc, w) => ({
      groundwater: (acc.groundwater || 0) + w.groundwaterLevelM,
      fisheries: (acc.fisheries || 0) + w.fisheriesAreaHa,
      ponds: (acc.ponds || 0) + w.pondsAreaHa,
      rivers: (acc.rivers || 0) + w.riversLengthKm,
    }), {})
    return {
      groundwater: +(agg.groundwater/total).toFixed(1),
      fisheries: +(agg.fisheries).toFixed(1),
      ponds: +(agg.ponds).toFixed(1),
      rivers: +(agg.rivers).toFixed(1)
    }
  }, [selectedVillage])

  const waterBarData = {
    labels: ['Groundwater (m)', 'Fisheries (Ha)', 'Ponds (Ha)', 'Rivers (Km)'],
    datasets: [{
      data: [waterForVillage.groundwater, waterForVillage.fisheries, waterForVillage.ponds, waterForVillage.rivers],
      backgroundColor: ['#4FC3F7', '#81C784', '#AED581', '#64B5F6'],
      borderRadius: 4
    }]
  }

  return (
    <div className="frd-page">
      {/* State Tabs */}
      <div className="state-tabs" style={{ marginTop: 0 }}>
        <button className={`state-btn ${selectedState === 'INDIA' ? 'active' : ''}`} onClick={() => setSelectedState('INDIA')}>INDIA</button>
        {states.map(st => (
          <button key={st} className={`state-btn ${selectedState === st ? 'active' : ''}`} onClick={() => setSelectedState(st)}>{st}</button>
        ))}
        <div className="notif-inline">Alerts: {alertsCount}</div>
      </div>

      <div className="frd-stats">
        <div className="frd-card">
          <div className="frd-kpi">
            <div className="kpi-value">{metrics.landCovered}%</div>
            <div className="kpi-label">% Land Covered</div>
          </div>
          <div className="trend up">↗ 3% from last month</div>
        </div>
        <div className="frd-card">
          <div className="frd-kpi">
            <div className="kpi-value">{metrics.forestAreaCovered}%</div>
            <div className="kpi-label">% Forest Area Covered</div>
          </div>
          <div className="trend up">↗ 1.2% from last month</div>
        </div>
        <div className="frd-card">
          <div className="frd-kpi">
            <div className="kpi-value">{metrics.digitization}%</div>
            <div className="kpi-label">Digitization</div>
          </div>
          <div className="trend up">↗ 4% data onboarded</div>
        </div>
        <div className="frd-card">
          <div className="frd-kpi">
            <div className="kpi-value">{metrics.totalFRA}</div>
            <div className="kpi-label">Total FRA Claims</div>
          </div>
          <div className="trend down">↘ 0.6% new inflow</div>
        </div>
      </div>

      {/* Land Use Donut + Water Bar */}
      <div className="frd-stats">
        <div className="frd-card" style={{ height: 360 }}>
          <h3>Land Use Composition</h3>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
            <label className="text-muted" style={{ fontSize: 14 }}>Village</label>
            <select className="select-field" value={landVillage} onChange={(e) => setLandVillage(e.target.value)}>
              {villages.map(v => (<option key={v} value={v}>{v}</option>))}
            </select>
          </div>
          <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
        </div>
        <div className="frd-card" style={{ height: 360 }}>
          <h3>Water & Resources</h3>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
            <label className="text-muted" style={{ fontSize: 14 }}>Village</label>
            <select className="select-field" value={selectedVillage} onChange={(e) => setSelectedVillage(e.target.value)}>
              {villages.map(v => (<option key={v} value={v}>{v}</option>))}
            </select>
          </div>
          <Bar data={waterBarData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
        </div>
      </div>

      <div className="frd-stats">
        <div className="frd-card">
          <h3>Monitoring & Alerts System</h3>
          <div className="alerts-list">
            {(AppData.insightsAlerts || []).map(a => (
              <div key={a.id} className="alert-item">
                <div className="alert-head">
                  <div className="alert-title">{a.title}</div>
                  <div className="alert-meta">
                    <span className={`severity ${a.severity}`}>{a.severity.toUpperCase()}</span>
                    <span className="alert-date">{a.date}</span>
                  </div>
                </div>
                <div className="remark-text">{a.summary}</div>
                 <div className="alert-actions">
                   <button className="btn btn-outline" onClick={() => window.location.href = '/frd/maps'}>View</button>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className="frd-card">
          <h3>Remarks</h3>
          <div className="remarks">
          <div className="remark-item">
            <div className="remark-title">Strong Progress</div>
            <div className="remark-text">High digitization and steady coverage growth across districts.</div>
          </div>
          <div className="remark-item negative">
            <div className="remark-title">Backlog Attention</div>
            <div className="remark-text">Pending verifications in remote villages are slowing approvals.</div>
          </div>
          <div className="remark-item">
            <div className="remark-title">Data Quality</div>
            <div className="remark-text">Photo evidence quality improved after new field guidelines.</div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
