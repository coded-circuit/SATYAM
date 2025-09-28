import React from 'react'
import { useAuth } from '../Context/AuthContext'
import './css/users.css'
export default function Users() {
  const { users } = useAuth()
  return (
    <div className='user'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{fontSize: '28px'}}>User Management</h2>
        <button className="btn btn-primary">Create User</button>
      </div>
      <div style={{ marginTop: 16 }} className='users-grid'>
        {users.map((u) => (
          <div key={u.username} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--color-border-dark)', borderRadius: 8, marginBottom: 8 }} className='user-card'>
            <div>
              <div style={{fontSize: '24px'}}><strong>{u.role}</strong></div>
              <div style={{ color: 'var(--color-text-secondary)' }}>{u.username}</div>
            </div>
            <div style={{gap: '10px', display : 'flex'}}>
              <button  style={{ marginRight: 8 , border : 'none', background : 'none ',}}> <img src={require('../assets/edit-user.png')} alt="" /></button>
              <button style={{ marginRight: 8 , border : 'none', background : 'none ',}} > <img src={require('../assets/remove-user.png')} alt="" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
