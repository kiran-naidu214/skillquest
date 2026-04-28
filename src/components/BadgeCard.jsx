import './BadgeCard.css'

export default function BadgeCard({ badge }) {
  return (
    <div className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}>
      <div className="badge-icon">{badge.icon}</div>
      <div className="badge-name">{badge.name}</div>
      <div className="badge-desc">{badge.desc}</div>
      {!badge.earned && <div className="badge-lock">🔒</div>}
    </div>
  )
}
