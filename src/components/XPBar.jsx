import './XPBar.css'

export default function XPBar({ xp, level, levelName, nextLevelXP = 5000, prevLevelXP = 4000 }) {
  const progress = Math.min(((xp - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100, 100)

  return (
    <div className="xpbar">
      <div className="xpbar-top">
        <div className="xpbar-level">
          <span className="xpbar-lvl-num">Lv.{level}</span>
          <span className="xpbar-lvl-name">{levelName}</span>
        </div>
        <span className="xpbar-xp">{xp.toLocaleString()} XP</span>
      </div>
      <div className="progress-track xpbar-track">
        <div className="progress-fill xpbar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="xpbar-bottom">
        <span>{nextLevelXP - xp} XP to Level {level + 1}</span>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  )
}
