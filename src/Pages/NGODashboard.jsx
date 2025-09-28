import { CheckCircle, Files, MapTrifold, Percent } from '@phosphor-icons/react'
import React, { useMemo, useState } from 'react'
import AppData from '../Data/AppData.js'
import './css/NGODashboard.css'

export default function NGODashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [villageFilter, setVillageFilter] = useState('ALL')
  const [stApproved, setStApproved] = useState(false)
  const [stPending, setStPending] = useState(false)
  const [stRejected, setStRejected] = useState(false)

  const claims = useMemo(() => (AppData.claims || []).map(c => ({
    name: c.holderName,
    village: c.village,
    district: c.district,
    area: Math.min(Number(c.area || 0), 4),
    type: c.claimType,
    status: c.status,
    updated: c.dateProcessed || c.dateApplied
  })), [])

  const metrics = useMemo(() => {
    const activeDistricts = new Set((AppData.districts || []).map(d => d.name)).size
    const uploaded = claims.length
    const approved = claims.filter(c => c.status === 'Approved').length
    const approvalRate = uploaded ? Math.round((approved / uploaded) * 100) : 0
    return { activeDistricts, uploaded, approved, approvalRate }
  }, [claims])

  const villages = useMemo(() => ['ALL', ...new Set((AppData.villages || []).map(v => v.name))], [])

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase()
    const statusFilter = []
    if (stApproved) statusFilter.push('Approved')
    if (stPending) statusFilter.push('Pending')
    if (stRejected) statusFilter.push('Rejected')
    return claims.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(term) || r.village.toLowerCase().includes(term)
      const matchesVillage = villageFilter === 'ALL' || r.village === villageFilter
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(r.status)
      return matchesSearch && matchesVillage && matchesStatus
    })
  }, [claims, searchTerm, villageFilter, stApproved, stPending, stRejected])

  return (
    <div className="ngo-page">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon"><MapTrifold size={22} /></div>
          <div className="stat-info"><span className="stat-value">{metrics.activeDistricts}</span><span className="stat-label">No. of Active Districts</span></div>
        </div>
        <div className="stat-card"><div className="stat-icon"><Files size={22} /></div>
          <div className="stat-info"><span className="stat-value">{metrics.uploaded}</span><span className="stat-label">Claims Uploaded</span></div>
        </div>
        <div className="stat-card"><div className="stat-icon"><CheckCircle size={22} /></div>
          <div className="stat-info"><span className="stat-value">{metrics.approved}</span><span className="stat-label">Claims Approved</span></div>
        </div>
        <div className="stat-card"><div className="stat-icon"><Percent size={22} /></div>
          <div className="stat-info"><span className="stat-value">{metrics.approvalRate}%</span><span className="stat-label">% Approval</span></div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title"><h3>Recent Uploads</h3></div></div>
        <div className="card-content filters-row">
          <div className="input-wrapper">
            <input className="input-field" placeholder="Search by name or village" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
          </div>
          <div className="select-wrapper">
            <select className="select-field" value={villageFilter} onChange={(e)=>setVillageFilter(e.target.value)}>
              {villages.map(v => (<option key={v} value={v}>{v}</option>))}
            </select>
          </div>
          <label className="chk"><input type="checkbox" checked={stApproved} onChange={(e)=>setStApproved(e.target.checked)} /> Approved</label>
          <label className="chk"><input type="checkbox" checked={stPending} onChange={(e)=>setStPending(e.target.checked)} /> Pending</label>
          <label className="chk"><input type="checkbox" checked={stRejected} onChange={(e)=>setStRejected(e.target.checked)} /> Rejected</label>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Village</th>
                  <th>Land Area</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date Updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, idx) => (
                  <tr key={idx}>
                    <td className="font-medium">{r.name}</td>
                    <td>{r.village}</td>
                    <td>{Number(r.area || 0).toFixed(1)}</td>
                    <td><span className={`badge type-${String(r.type||'').toLowerCase()}`}>{r.type}</span></td>
                    <td><span className={`badge status-${String(r.status||'').toLowerCase().replace(' ','-')}`}>{r.status}</span></td>
                    <td className="text-muted">{r.updated}</td>
                    <td><button className="btn btn-outline btn-sm">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
