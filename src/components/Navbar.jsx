import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const NAV = [
  { to: '/',            icon: '◈', label: 'Dashboard' },
  { to: '/quiz/aptitude',  icon: '🔢', label: 'Aptitude' },
  { to: '/quiz/reasoning', icon: '🧩', label: 'Reasoning' },
  { to: '/quiz/verbal',    icon: '📖', label: 'Verbal' },
  { to: '/leaderboard',    icon: '▲', label: 'Leaderboard' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
  const xpToNext = 5000 - (user?.xp || 0)

  return (
    <aside className="navbar">
      <div className="navbar-logo">Skill<span>Quest</span></div>

      <nav className="navbar-nav">
        <span className="nav-section">Menu</span>
        {NAV.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar-bottom">
        {user && (
          <div className="navbar-user-xp">
            <div className="user-xp-label">
              <span>Level {user.level} · {user.levelName}</span>
              <span className="text-gold">{user.xp} XP</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${((user.xp - 4000) / 1000) * 100}%`, background: 'var(--gold)' }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>{xpToNext > 0 ? `${xpToNext} XP to next level` : 'Level up ready!'}</div>
          </div>
        )}

        <div className="navbar-user-card">
          <div className="nav-avatar">{initials}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Rank #{user?.rank}</div>
          </div>
          <button className="btn-ghost" onClick={handleLogout} style={{ marginLeft: 'auto', fontSize: 18, padding: 6 }} title="Logout">⇥</button>
        </div>
      </div>
    </aside>
  )
}
