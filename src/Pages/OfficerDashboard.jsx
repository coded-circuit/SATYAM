import { CheckCircle, Clock, Files, MapPin, Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppData from '../Data/AppData.js'
import './css/OfficeDashboard.css'

export default function OfficerDashboard() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [villageFilter, setVillageFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusApproved, setStatusApproved] = useState(false)
  const [statusPending, setStatusPending] = useState(false)
  const [statusRejected, setStatusRejected] = useState(false)

  const claims = useMemo(() => {
    const base = (AppData.claims || []).map((c) => ({
      id: c.id,
      holderName: c.holderName,
      village: c.village,
      district: c.district,
      state: c.state,
      type: c.claimType,
      area: c.area,
      status: c.status,
      dateSubmitted: c.dateApplied,
      coordinates: Array.isArray(c.coordinates)
        ? { lat: c.coordinates[0], lng: c.coordinates[1] }
        : c.coordinates,
    }))
      .sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime())
      .slice(0, 3)
      .map((c, idx) => {
        const now = Date.now();
        const offsets = [10 * 60 * 1000, 2 * 60 * 60 * 1000, 24 * 60 * 60 * 1000];
        return { ...c, dateSubmitted: new Date(now - offsets[idx]).toISOString() };
      });
    return base;
  }, [])

  const villages = useMemo(() => (AppData.villages || []).map(v => v.name), [])

  const stats = useMemo(() => {
    const totalClaims = claims.length
    const approved = claims.filter(c => c.status === 'Approved').length
    const pending = claims.filter(c => c.status === 'Pending').length
    const numVillages = (AppData.villages || []).length
    return { totalClaims, approved, pending, numVillages }
  }, [claims])

  const filteredClaims = useMemo(() => {
    const term = searchTerm.toLowerCase()
    const allowedStatuses = []
    if (statusApproved) allowedStatuses.push('Approved')
    if (statusPending) allowedStatuses.push('Pending')
    if (statusRejected) allowedStatuses.push('Rejected')

    return claims.filter(c => {
      const matchesSearch =
        c.holderName.toLowerCase().includes(term) ||
        c.village.toLowerCase().includes(term) ||
        String(c.id).toLowerCase().includes(term)

      const matchesVillage = villageFilter === 'all' || c.village === villageFilter

      const mapType = typeFilter === 'Forest Area' ? 'CFR' : typeFilter
      const matchesType = typeFilter === 'all' || c.type === mapType

      const matchesStatus = allowedStatuses.length === 0 || allowedStatuses.includes(c.status)

      return matchesSearch && matchesVillage && matchesType && matchesStatus
    })
  }, [claims, searchTerm, villageFilter, typeFilter, statusApproved, statusPending, statusRejected])

  const formatTimeSince = (dateStr) => {
    const d = new Date(dateStr)
    const diffMs = Date.now() - d.getTime()
    const mins = Math.floor(diffMs / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    if (days < 30) return `${days}d ago`
    const months = Math.floor(days / 30)
    return `${months}mo ago`
  }

  return (
    <div className="page-container">
      {/* KPI Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><Files size={22} /></div>
          <div className="stat-info">
            <span className="stat-value">{stats.numVillages}</span>
            <span className="stat-label">No of villages assigned</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Files size={22} /></div>
          <div className="stat-info">
            <span className="stat-value">{stats.totalClaims}</span>
            <span className="stat-label">Total Claims</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><CheckCircle size={22} /></div>
          <div className="stat-info">
            <span className="stat-value">{stats.approved}</span>
            <span className="stat-label">Claim Approved</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Clock size={22} /></div>
          <div className="stat-info">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Claim Pending</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="card-content filters-row">
          <div className="input-wrapper">
            <Search className="input-icon" />
            <input className="input-field" placeholder="Search by holder, village or claim ID" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <div className="select-wrapper">
            <select className="select-field" value={villageFilter} onChange={(e) => setVillageFilter(e.target.value)}>
              <option value="all">All Villages</option>
              {villages.map(v => (<option key={v} value={v}>{v}</option>))}
            </select>
          </div>

          <div className="select-wrapper">
            <select className="select-field" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All Types</option>
              <option value="IFR">IFR</option>
              <option value="CFR">CFR</option>
              <option value="Forest Area">Forest Area</option>
              <option value="CR">CR</option>
            </select>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={statusApproved} onChange={(e) => setStatusApproved(e.target.checked)} /> Approved
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={statusPending} onChange={(e) => setStatusPending(e.target.checked)} /> Pending
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={statusRejected} onChange={(e) => setStatusRejected(e.target.checked)} /> Rejected
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="card compact-table" id="assigned-claims">
        <div className="card-header">
          <div className="card-title">
            <h2>Assigned Claims</h2>
          </div>
        </div>
        <div className="card-content">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>Patta Holder</th>
                  <th>Village</th>
                  <th>Type</th>
                  <th>Area (Ha)</th>
                  <th>Status</th>
                  <th>Time of upload</th>
                  <th>Coordinates</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map(c => (
                  <tr key={c.id}>
                    <td className="font-medium">{c.id}</td>
                    <td>{c.holderName}</td>
                    <td>{c.village}</td>
                    <td><span className={`badge type-${String(c.type || '').toLowerCase()}`}>{c.type}</span></td>
                    <td>{Number(c.area || 0).toFixed(1)}</td>
                    <td><span className={`badge status-${String(c.status || '').toLowerCase().replace(' ', '-')}`}>{c.status}</span></td>
                    <td className="text-muted">{formatTimeSince(c.dateSubmitted)}</td>
                    <td className="text-xs"><MapPin size={14} /> {c.coordinates ? `${Number(c.coordinates.lat).toFixed(4)}, ${Number(c.coordinates.lng).toFixed(4)}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Field Officer Features */}
      <div className="field-assignments">
        <h3>Village Assignments</h3>
        <div className="assignment-list">
          <div className="assignment-card">
            <h4>Bhilgaon Village</h4>
            <p><strong>District:</strong> Betul, MP</p>
            <p><strong>Pending Tasks:</strong> 5 verifications</p>
            <p><strong>Due Date:</strong> Jan 25, 2025</p>
            <button className="btn btn-primary btn-sm">Start Verification</button>
          </div>
          <div className="assignment-card">
            <h4>Patalkot Village</h4>
            <p><strong>District:</strong> Betul, MP</p>
            <p><strong>Pending Tasks:</strong> 2 verifications</p>
            <p><strong>Due Date:</strong> Jan 28, 2025</p>
            <button className="btn btn-primary btn-sm">Start Verification</button>
          </div>
          <div className="assignment-card">
            <h4>Bhimpur Village</h4>
            <p><strong>District:</strong> Betul, MP</p>
            <p><strong>Pending Tasks:</strong> 3 document checks</p>
            <p><strong>Due Date:</strong> Feb 02, 2025</p>
            <button className="btn btn-primary btn-sm">Start Verification</button>
          </div>
        </div>
      </div>

      <div className="field-tools">
        <h3>Field Tools</h3>
        <div className="tools-grid">
          <button className="tool-card" id="gps-tool">
            <div className="tool-icon">📍</div>
            <div className="tool-title">GeoTag Tracker</div>
            <div className="tool-desc">Record precise GPS points during site surveys</div>
          </button>
          <button className="tool-card" id="photo-tool">
            <div className="tool-icon">📷</div>
            <div className="tool-title">Capture & Upload</div>
            <div className="tool-desc">Attach geo-tagged photos as claim evidence</div>
          </button>
          <button className="tool-card" id="offline-sync">
            <div className="tool-icon">🔄</div>
            <div className="tool-title">Offline Sync</div>
            <div className="tool-desc">Sync stored records when connectivity returns</div>
          </button>
          <button className="tool-card" id="browse-claims" onClick={() => navigate('/officer/profile')}>
            <div className="tool-icon">🗂️</div>
            <div className="tool-title">Browse Claims</div>
            <div className="tool-desc">Go to your claims manager view</div>
          </button>
          <button className="tool-card" id="recent-alerts" onClick={() => {
            const el = document.getElementById('assigned-claims');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>
            <div className="tool-icon">🔔</div>
            <div className="tool-title">Recent Alerts</div>
            <div className="tool-desc">Jump to latest assigned claims</div>
          </button>
        </div>
      </div>
    </div>
  )
}
