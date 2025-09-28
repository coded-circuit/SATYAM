import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import './css/login.css'

export default function Login() {
  const { login, authError, user } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    login(username, password)
  }

  useEffect(() => {
    if (user) {
      const roleToPath = {
        admin: '/admin',
        officer: '/officer',
        frd: '/frd',
        pda: '/pda',
        ngo: '/ngo',
      }
      const target = roleToPath[user.role] || '/'
      navigate(target, { replace: true })
    }
  }, [user, navigate])

  return (
    <div id="login-page" className="login-container">
      <div className="login-image">
        <img src={require('../assets/login.png')} alt="Login" />
      </div>
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">SATYAM</h1>
          <p className="login-subtitle">Smart AI For Tribal Yojana & Atlas Monitoring</p>
        </div>

        <form id="login-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {authError && (
            <div style={{ color: 'var(--color-error)', marginTop: 'var(--space-2)' }}>
              {authError}
            </div>
          )}

          {user && (
            <div style={{ color: 'var(--color-success)', marginTop: 'var(--space-2)' }}>
              Logged in as {user.username} ({user.role})
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-lg" style={{width: "100%", marginTop: "var(--space-4)"}}>
            Login
          </button>
        </form>

        <div style={{marginTop: 'var(--space-6)', paddingTop: 'var(--space-6)', border: '1px solid var(--color-border-dark)', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: 'var(--space-4)'}}>
          <p style={{fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: 'var(--space-3)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',fontWeight:'500'}}>Demo Credentials:</p>
          <div style={{fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.8,display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',justifyContent: 'space-between'}}>
            <div><strong>Admin:</strong> admin / admin123</div>
            <div><strong>DAJGUA :</strong> officer / field123</div>
            <div><strong>Forest & Revenue Department:</strong> frd01 / frd123</div>
            <div><strong>Planning & Development Authorities:</strong> pda01 / pda123</div>
            <div><strong>NGOs Working with Tribal Communities:</strong> ngo01 / ngo123</div>
          </div>
        </div>
      </div>
    </div>
  )
}
