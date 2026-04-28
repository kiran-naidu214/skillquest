import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Results.css'

export default function Results() {
  const { state } = useLocation()
  const navigate  = useNavigate()
  const { user }  = useAuth()

  if (!state) { navigate('/'); return null }

  const { score, total, results, category } = state
  const accuracy   = Math.round((score / total) * 100)
  const xpEarned   = score * 10
  const grade      = accuracy >= 80 ? 'Excellent' : accuracy >= 60 ? 'Good' : accuracy >= 40 ? 'Fair' : 'Needs Work'
  const gradeColor = accuracy >= 80 ? 'var(--green)' : accuracy >= 60 ? 'var(--blue)' : accuracy >= 40 ? 'var(--gold)' : 'var(--red)'

  const CAT_LABELS = { aptitude: 'Quantitative Aptitude', reasoning: 'Logical Reasoning', verbal: 'Verbal Ability' }

  return (
    <div className="results-page">
      <div className="results-topbar">
        <h1 className="results-title">Quiz Results</h1>
        <span className="results-cat">{CAT_LABELS[category] || category}</span>
      </div>

      <div className="results-content">

        {/* Score hero */}
        <div className="score-hero fade-up">
          <div className="score-circle">
            <div className="score-num">{score}<span>/{total}</span></div>
            <div className="score-label">Score</div>
          </div>
          <div className="score-meta">
            <div className="grade-badge" style={{ color: gradeColor, borderColor: gradeColor, background: `${gradeColor}18` }}>
              {grade}
            </div>
            <h2 className="score-headline">
              {accuracy >= 80 ? '🎉 Outstanding!' : accuracy >= 60 ? '👍 Well done!' : accuracy >= 40 ? '💪 Keep going!' : '📚 More practice needed'}
            </h2>
            <p className="score-sub">You answered {score} out of {total} questions correctly with {accuracy}% accuracy.</p>
            <div className="score-rewards">
              <div className="reward-item">
                <span className="reward-icon">⚡</span>
                <span className="reward-val">+{xpEarned} XP</span>
                <span className="reward-lbl">earned</span>
              </div>
              <div className="reward-item">
                <span className="reward-icon">🎯</span>
                <span className="reward-val">{accuracy}%</span>
                <span className="reward-lbl">accuracy</span>
              </div>
              <div className="reward-item">
                <span className="reward-icon">🏅</span>
                <span className="reward-val">Lv.{user?.level}</span>
                <span className="reward-lbl">current</span>
              </div>
            </div>
          </div>
        </div>

        {/* Question review */}
        <div className="fade-up fade-up-1">
          <h3 className="review-title">Question Review</h3>
          <div className="review-list">
            {results.map((r, i) => (
              <div key={i} className={`review-item ${r.correct ? 'review-correct' : 'review-wrong'}`}>
                <div className="review-header">
                  <span className="review-num">Q{i + 1}</span>
                  <span className="review-status">{r.correct ? '✓ Correct' : '✗ Incorrect'}</span>
                </div>
                <div className="review-q">{r.q}</div>
                {!r.correct && (
                  <div className="review-answers">
                    <span className="your-ans">Your answer: {r.selected !== null ? r.selected + 1 : 'Skipped (timeout)'}</span>
                    <span className="correct-ans">Correct: Option {r.answer + 1}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="results-actions fade-up fade-up-2">
          <button className="btn btn-primary" onClick={() => navigate(`/quiz/${category}`)}>
            🔄 Retry Same Category
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/')}>
            ◈ Back to Dashboard
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/leaderboard')}>
            ▲ View Leaderboard
          </button>
        </div>

      </div>
    </div>
  )
}
