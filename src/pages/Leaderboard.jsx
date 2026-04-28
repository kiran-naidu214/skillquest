import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Leaderboard.css'

const ALL_PLAYERS = [
  { rank: 1,  name: 'Priya Rajan',     xp: 6240, streak: 21, accuracy: 92, avatar: 'PR', badge: '🏆' },
  { rank: 2,  name: 'Vikram Sharma',   xp: 5810, streak: 18, accuracy: 88, avatar: 'VS', badge: '🥈' },
  { rank: 3,  name: 'Ananya Nair',     xp: 5490, streak: 15, accuracy: 85, avatar: 'AN', badge: '🥉' },
  { rank: 4,  name: 'Rahul Kumar',     xp: 5110, streak: 12, accuracy: 82, avatar: 'RK', badge: null },
  { rank: 5,  name: 'Sneha Patel',     xp: 4990, streak: 10, accuracy: 80, avatar: 'SP', badge: null },
  { rank: 6,  name: 'Arjun Das',       xp: 4870, streak: 9,  accuracy: 79, avatar: 'AD', badge: null },
  { rank: 7,  name: 'Kavya Reddy',     xp: 4750, streak: 8,  accuracy: 77, avatar: 'KR', badge: null },
  { rank: 8,  name: 'Rohit Mehta',     xp: 4630, streak: 7,  accuracy: 75, avatar: 'RM', badge: null },
  { rank: 9,  name: 'Divya Singh',     xp: 4510, streak: 6,  accuracy: 74, avatar: 'DS', badge: null },
  { rank: 10, name: 'Kiran Rao',       xp: 4380, streak: 5,  accuracy: 72, avatar: 'KR', badge: null },
  { rank: 11, name: 'Meena Gupta',     xp: 4260, streak: 4,  accuracy: 71, avatar: 'MG', badge: null },
  { rank: 12, name: 'Aditya Verma',    xp: 4140, streak: 3,  accuracy: 70, avatar: 'AV', badge: null },
  { rank: 47, name: 'You',             xp: 4820, streak: 14, accuracy: 78, avatar: 'AK', badge: null, isMe: true },
]

const RANK_COLORS = { 1: '#F5C842', 2: '#A0AEC0', 3: '#CD853F' }
const AVATAR_COLORS = ['#4F9EF5', '#9B7FFF', '#3DDC84', '#F5C842', '#FF5C5C', '#FF9F43', '#5F27CD', '#00D2D3']

export default function Leaderboard() {
  const { user } = useAuth()
  const [filter, setFilter] = useState('global')

  const top3   = ALL_PLAYERS.filter(p => p.rank <= 3)
  const others = ALL_PLAYERS.filter(p => p.rank > 3)

  return (
    <div className="lb-page">
      <div className="lb-topbar">
        <div>
          <h1 className="lb-title">Leaderboard</h1>
          <p className="lb-sub">Compete with the best. Rise to the top.</p>
        </div>
        <div className="lb-filters">
          {['global', 'weekly', 'friends'].map(f => (
            <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="lb-content">

        {/* Your rank card */}
        <div className="your-rank-card fade-up">
          <div className="your-rank-left">
            <div className="your-rank-num"># {user?.rank || 47}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Your Ranking</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>↑ 12 places this week · {user?.xp?.toLocaleString()} XP</div>
            </div>
          </div>
          <div className="your-rank-right">
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
              {(ALL_PLAYERS.find(p=>p.rank===6)?.xp || 4870) - (user?.xp || 4820)} XP to rank #6
            </div>
            <div className="progress-track" style={{ width: 200 }}>
              <div className="progress-fill" style={{ width: '82%', background: 'var(--gold)' }} />
            </div>
          </div>
        </div>

        {/* Podium - Top 3 */}
        <div className="podium fade-up fade-up-1">
          {/* 2nd */}
          <div className="podium-item second">
            <div className="pod-avatar" style={{ background: '#A0AEC022', color: '#A0AEC0', border: '2px solid #A0AEC0' }}>
              {top3[1]?.avatar}
            </div>
            <div className="pod-badge">🥈</div>
            <div className="pod-name">{top3[1]?.name}</div>
            <div className="pod-xp">{top3[1]?.xp.toLocaleString()} XP</div>
            <div className="pod-plinth second-plinth">2</div>
          </div>
          {/* 1st */}
          <div className="podium-item first">
            <div className="pod-crown">👑</div>
            <div className="pod-avatar" style={{ background: '#F5C84222', color: '#F5C842', border: '2px solid #F5C842' }}>
              {top3[0]?.avatar}
            </div>
            <div className="pod-name">{top3[0]?.name}</div>
            <div className="pod-xp">{top3[0]?.xp.toLocaleString()} XP</div>
            <div className="pod-plinth first-plinth">1</div>
          </div>
          {/* 3rd */}
          <div className="podium-item third">
            <div className="pod-avatar" style={{ background: '#CD853F22', color: '#CD853F', border: '2px solid #CD853F' }}>
              {top3[2]?.avatar}
            </div>
            <div className="pod-badge">🥉</div>
            <div className="pod-name">{top3[2]?.name}</div>
            <div className="pod-xp">{top3[2]?.xp.toLocaleString()} XP</div>
            <div className="pod-plinth third-plinth">3</div>
          </div>
        </div>

        {/* Full table */}
        <div className="lb-table-card fade-up fade-up-2">
          <table className="lb-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>XP</th>
                <th>Accuracy</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {others.map((p, i) => {
                const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length]
                const isMe = p.isMe
                return (
                  <tr key={p.rank} className={isMe ? 'row-me' : ''}>
                    <td>
                      <span className="table-rank" style={{ color: RANK_COLORS[p.rank] || 'var(--muted)' }}>
                        #{p.rank}
                      </span>
                    </td>
                    <td>
                      <div className="table-player">
                        <div className="table-avatar" style={{ background: `${avatarColor}22`, color: avatarColor }}>
                          {p.avatar}
                        </div>
                        <span className="table-name" style={isMe ? { color: 'var(--gold)', fontWeight: 600 } : {}}>
                          {isMe ? `${user?.name || p.name} (You)` : p.name}
                        </span>
                      </div>
                    </td>
                    <td><span className="table-xp">{p.xp.toLocaleString()}</span></td>
                    <td>
                      <div className="table-acc">
                        <div className="progress-track" style={{ width: 80 }}>
                          <div className="progress-fill" style={{
                            width: `${p.accuracy}%`,
                            background: p.accuracy >= 80 ? 'var(--green)' : p.accuracy >= 60 ? 'var(--blue)' : 'var(--gold)'
                          }} />
                        </div>
                        <span>{p.accuracy}%</span>
                      </div>
                    </td>
                    <td>
                      <span className="table-streak">🔥 {p.streak}d</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
