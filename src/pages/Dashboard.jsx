import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import XPBar from '../components/XPBar'
import CategoryCard from '../components/CategoryCard'
import BadgeCard from '../components/BadgeCard'
import './Dashboard.css'

const LEADERBOARD_PREVIEW = [
  { rank: 1,  name: 'Priya R.',   xp: 6240, avatar: 'PR', color: '#F5C842' },
  { rank: 2,  name: 'Vikram S.',  xp: 5810, avatar: 'VS', color: '#A0AEC0' },
  { rank: 3,  name: 'Ananya N.',  xp: 5490, avatar: 'AN', color: '#CD853F' },
]

const QUICK_MODES = [
  { icon: '⚡', label: 'Quick 10',  desc: '~5 minutes',   category: 'aptitude'  },
  { icon: '📋', label: 'Full Test', desc: '60 questions',  category: 'reasoning' },
  { icon: '🎯', label: 'Weak Areas',desc: 'Verbal focus',  category: 'verbal'    },
]

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  if (!user) return null

  return (
    <div className="dashboard">
      {/* Top bar */}
      <div className="dash-topbar">
        <div>
          <h1 className="dash-title">Dashboard</h1>
        </div>
        <div className="dash-xp-pill">
          <div className="xp-dot" />
          {user.xp.toLocaleString()} XP total
        </div>
      </div>

      <div className="dash-content">

        {/* Welcome banner */}
        <div className="welcome-banner fade-up">
          <div>
            <h2>Welcome back, {user.name.split(' ')[0]}! 👋</h2>
            <p>You're on a roll — keep the streak going and unlock your next badge!</p>
          </div>
          <div className="streak-badge">
            <div className="streak-num">🔥 {user.streak}</div>
            <div className="streak-label">Day Streak</div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="fade-up fade-up-1">
          <XPBar xp={user.xp} level={user.level} levelName={user.levelName} />
        </div>

        {/* Stats row */}
        <div className="stats-row fade-up fade-up-2">
          {[
            { label: 'Accuracy',  value: `${user.accuracy}%`,     color: 'var(--green)',  sub: '↑ 6% this week' },
            { label: 'Solved',    value: user.totalSolved,         color: 'var(--text)',   sub: 'questions total' },
            { label: 'Global Rank', value: `#${user.rank}`,        color: 'var(--gold)',   sub: '↑ 12 places' },
            { label: 'Badges',    value: user.badges.filter(b=>b.earned).length, color: 'var(--purple)', sub: '2 new unlocked' },
          ].map(s => (
            <div key={s.label} className="stat-card card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-val" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Quick practice */}
        <div className="card fade-up fade-up-3">
          <div className="section-header">
            <h3>Quick Practice</h3>
            <span className="section-hint">jump right in</span>
          </div>
          <div className="quick-grid">
            {QUICK_MODES.map(m => (
              <button key={m.label} className="quick-btn" onClick={() => navigate(`/quiz/${m.category}`)}>
                <span className="quick-icon">{m.icon}</span>
                <span className="quick-label">{m.label}</span>
                <span className="quick-desc">{m.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="two-col">
          {/* Categories */}
          <div>
            <div className="section-header" style={{ marginBottom: 14 }}>
              <h3>Categories</h3>
            </div>
            <div className="categories-grid">
              {Object.entries(user.categoryStats).map(([cat, stats]) => (
                <CategoryCard key={cat} category={cat} stats={stats} />
              ))}
            </div>
          </div>

          {/* Leaderboard + Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card">
              <div className="section-header">
                <h3>Top Players</h3>
                <button className="btn-ghost" onClick={() => navigate('/leaderboard')} style={{ fontSize: 12 }}>View all</button>
              </div>
              <div className="lb-list">
                {LEADERBOARD_PREVIEW.map(p => (
                  <div key={p.rank} className="lb-row">
                    <span className="lb-rank" style={{ color: p.color }}>{p.rank}</span>
                    <div className="lb-avatar" style={{ background: `${p.color}22`, color: p.color }}>{p.avatar}</div>
                    <span className="lb-name">{p.name}</span>
                    <span className="lb-xp">{p.xp.toLocaleString()} XP</span>
                  </div>
                ))}
                <div className="lb-row lb-me">
                  <span className="lb-rank" style={{ color: 'var(--gold)' }}>{user.rank}</span>
                  <div className="lb-avatar" style={{ background: 'var(--gold-bg)', color: 'var(--gold)' }}>
                    {user.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <span className="lb-name" style={{ color: 'var(--gold)' }}>You</span>
                  <span className="lb-xp">{user.xp.toLocaleString()} XP</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="section-header" style={{ marginBottom: 14 }}>
                <h3>Badges</h3>
              </div>
              <div className="badges-grid">
                {user.badges.map(b => <BadgeCard key={b.id} badge={b} />)}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
