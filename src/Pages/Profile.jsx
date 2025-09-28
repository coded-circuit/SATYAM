"use client"

import { Download, Edit, Eye, FileText, MapPin, Plus, Search, Upload } from "lucide-react"
import React, { useMemo, useState } from "react"
import AppData from "../Data/AppData.js"
import "./css/profile.css"

// The Add/Edit Claim Modal Component
const ClaimModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="card modal">
        <div className="card-header">
          <h2 className="card-title">Add New FRA Claim</h2>
        </div>
        <div className="card-content">
          <form className="modal-form" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full name</label>
                <input type="text" className="form-control" placeholder="Enter full name" required />
              </div>
              <div className="form-group">
                <label className="form-label">Village</label>
                <input type="text" className="form-control" placeholder="Enter village" required />
              </div>
              <div className="form-group">
                <label className="form-label">District</label>
                <input type="text" className="form-control" placeholder="Enter district" required />
              </div>
              <div className="form-group">
                <label className="form-label">Land area (Ha)</label>
                <input type="number" min="0" step="0.1" className="form-control" placeholder="e.g., 2.5" required />
              </div>
              <div className="form-group">
                <label className="form-label">Land type</label>
                <select className="form-control" required>
                  <option value="">Select type</option>
                  <option value="IFR">IFR</option>
                  <option value="CFR">CFR</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Patta document</label>
                <input type="file" className="form-control" accept="application/pdf,image/*" required />
              </div>
              <div className="form-group">
                <label className="form-label">Identity proof</label>
                <input type="file" className="form-control" accept="application/pdf,image/*" required />
              </div>
              <div className="form-group">
                <label className="form-label">Evidence 1</label>
                <input type="file" className="form-control" accept="application/pdf,image/*" required />
              </div>
              <div className="form-group">
                <label className="form-label">Evidence 2</label>
                <input type="file" className="form-control" accept="application/pdf,image/*" required />
              </div>
            </div>
            <div className="header-actions end">
              <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Submit Claim</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


// Main Profile Page Component
const Profile = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all-status")
  const [typeFilter, setTypeFilter] = useState("all-types")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const claims = useMemo(() => {
    return (AppData.claims || []).map((c) => ({
      id: c.id,
      holderName: c.holderName,
      village: c.village,
      district: c.district,
      state: c.state,
      type: c.claimType, // IFR | CFR | CR
      area: Math.min(Number(c.area || 0), 4),
      status: c.status,
      dateSubmitted: c.dateApplied,
      dateProcessed: c.dateProcessed,
      coordinates: Array.isArray(c.coordinates)
        ? { lat: c.coordinates[0], lng: c.coordinates[1] }
        : c.coordinates,
      documents: c.documents || [],
    }));
  }, []);

  const summary = useMemo(() => {
    const total = claims.length;
    const approved = claims.filter(c => c.status === 'Approved').length;
    const pending = claims.filter(c => c.status === 'Pending').length;
    const rejected = claims.filter(c => c.status === 'Rejected').length;
    const totalArea = claims.reduce((sum, c) => sum + (c.area || 0), 0);
    return { total, approved, pending, rejected, totalArea: totalArea.toFixed(1) };
  }, [claims]);

  const filteredClaims = claims.filter((claim) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      claim.holderName.toLowerCase().includes(searchLower) ||
      claim.village.toLowerCase().includes(searchLower) ||
      claim.id.toLowerCase().includes(searchLower)
    const matchesStatus = statusFilter === "all-status" || claim.status === statusFilter
    const matchesType = typeFilter === "all-types" || claim.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved": return "badge status-approved";
      case "Pending": return "badge status-pending";
      case "Under Review": return "badge status-review";
      case "Rejected": return "badge status-rejected";
      default: return "badge";
    }
  }

  const getTypeClass = (type) => {
    switch (type) {
      case "IFR": return "badge type-ifr";
      case "CFR": return "badge type-cfr";
      case "CR": return "badge type-cr";
      default: return "badge";
    }
  }

  return (
    <>
      <div className="page-container">
        <ClaimModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        {/* Header */}
        <div className="page-header">
          <div className="header-title">
            <h1>FRA Legacy Records</h1>
            <p>Curate, verify, and manage Forest Rights Act claims</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline">
              <Upload width={16} height={16} />
              <span>Import CSV</span>
            </button>
            <button className="btn btn-outline">
              <Download width={16} height={16} />
              <span>Export Data</span>
            </button>
            <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
              <Plus width={16} height={16} />
              <span>Add New Claim</span>
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="card">
          <div className="card-content summary-stats">
            <div className="summary-item">
              <div className="summary-label">Total Claims</div>
              <div className="summary-value">{summary.total}</div>
            </div>
            <div className="summary-item positive">
              <div className="summary-label">Approved</div>
              <div className="summary-value">{summary.approved}</div>
            </div>
            <div className="summary-item warning">
              <div className="summary-label">Pending</div>
              <div className="summary-value">{summary.pending}</div>
            </div>
            <div className="summary-item negative">
              <div className="summary-label">Rejected</div>
              <div className="summary-value">{summary.rejected}</div>
            </div>
            <div className="summary-item neutral">
              <div className="summary-label">Total Area (Ha)</div>
              <div className="summary-value">{summary.totalArea}</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="card-content filters-row">
            <div className="input-wrapper">
              <Search className="input-icon" />
              <input
                type="text"
                placeholder="Search by name, village, or claim ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="select-wrapper">
              <select className="select-field" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all-status">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="select-wrapper">
              <select className="select-field" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="all-types">All Types</option>
                <option value="IFR">Individual Forest Rights</option>
                <option value="CFR">Community Forest Resource</option>
                <option value="CR">Community Rights</option>
              </select>
            </div>
            <button
              className="btn btn-outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all-status")
                setTypeFilter("all-types")
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Claims Table */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <h2>{`Claims Data (${filteredClaims.length} records)`}</h2>
              <div className="total-area">
                <FileText width={16} height={16} />
                <span>Total Area: {filteredClaims.reduce((sum, claim) => sum + claim.area, 0).toFixed(1)} Ha</span>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Claim ID</th>
                    <th>Patta Holder</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Area (Ha)</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClaims.map((claim) => (
                    <tr key={claim.id}>
                      <td className="font-medium">{claim.id}</td>
                      <td>{claim.holderName}</td>
                      <td>
                        <div>
                          <div className="font-medium">{claim.village}</div>
                          <div className="text-muted text-xs">
                            {claim.district}, {claim.state}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={getTypeClass(claim.type)}>{claim.type}</span>
                      </td>
                      <td>{claim.area.toFixed(1)}</td>
                      <td>
                        <span className={getStatusClass(claim.status)}>{claim.status}</span>
                      </td>
                      <td className="text-muted">{claim.dateSubmitted}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn btn-ghost"><Eye width={16} height={16} /></button>
                          <button className="btn btn-ghost"><Edit width={16} height={16} /></button>
                          <button className="btn btn-ghost"><MapPin width={16} height={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile

