import { useNavigate } from 'react-router-dom'
import './CategoryCard.css'

const META = {
  aptitude:  { icon: '🔢', color: 'var(--blue)',   bg: 'var(--blue-bg)',   label: 'Quantitative Aptitude' },
  reasoning: { icon: '🧩', color: 'var(--purple)', bg: 'var(--purple-bg)', label: 'Logical Reasoning' },
  verbal:    { icon: '📖', color: 'var(--green)',  bg: 'var(--green-bg)',  label: 'Verbal Ability' },
}

export default function CategoryCard({ category, stats }) {
  const navigate = useNavigate()
  const meta = META[category] || META.aptitude

  return (
    <div className="cat-card" onClick={() => navigate(`/quiz/${category}`)}>
      <div className="cat-card-top">
        <div className="cat-icon" style={{ background: meta.bg, color: meta.color }}>
          {meta.icon}
        </div>
        <span className="cat-badge" style={{ background: meta.bg, color: meta.color }}>
          {stats.accuracy}%
        </span>
      </div>
      <div className="cat-name">{meta.label}</div>
      <div className="cat-meta">Level {stats.level} · {stats.solved} solved</div>
      <div className="progress-track cat-progress">
        <div className="progress-fill" style={{ width: `${stats.accuracy}%`, background: meta.color }} />
      </div>
      <button className="cat-btn" style={{ color: meta.color, borderColor: meta.color }}>
        Practice Now →
      </button>
    </div>
  )
}
