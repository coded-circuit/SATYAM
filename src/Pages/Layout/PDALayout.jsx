import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import AppData from '../../Data/AppData.js'
import '../css/MainDashboard.css'
import '../css/nav.css'

export default function PDALayout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/', { replace: true }) }
  const [open, setOpen] = useState(false)
  const unreadCount = useMemo(() => (AppData.notifications || []).filter(n => !n.read).length, [])

  return (
    <div className='main-dashboard'>             
      <div class="content-header">
        <div className="content-left" style={{display:'flex',gap:'34px',alignItems: 'center'}}>
          <div className="header-logo">
            <img src={require('../../assets/emblem.jpg')} alt="emblem" />
          </div>
          <div>
            <h1 class="content-title">SATYAM- Smart AI For Tribal
            Yojana & Atlas Monitoring</h1>
            Welcome,  ({user?.role})
          </div>
        </div>
        <div className="content-right">
          <div className="content-search">
            <input type="text" placeholder="Search..." />
            <img src={require('../../assets/search.png')} alt='search' />
          </div>
          <div className="notif-bell" onClick={() => setOpen(v => !v)}>
            <img  className="notif" src={require('../../assets/notif.png')} alt="notif" />
            {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
            {open && (
              <div className="notif-dropdown">
                {(AppData.notifications || []).map(n => (
                  <div key={n.id} className={`notif-item ${n.type}`}>
                    <span className="notif-dot" />
                    <div className="notif-text">{n.message}</div>
                    <div className="notif-date">{n.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="content-area">
        <div className='quick-nav'>
          <Link className="nav-logo" to="/pda"><img src={require('../../assets/dashboard.png')} alt="" /></Link>
          <Link className="nav-logo" to="/pda/maps"><img src={require('../../assets/maps.png')} alt="" /></Link>
          <Link className="nav-logo" to="/pda/profile"><img src={require('../../assets/profile.png')} alt="" /></Link>
          <button className="nav-logo" onClick={handleLogout} style={{background:'transparent', border:'none', padding:0, cursor:'pointer'}}>
            <img src={require('../../assets/logout.png')} alt="" />
          </button>
        </div>
        <div className="content-container">{children}</div>
      </div>
    </div>
  )
}
