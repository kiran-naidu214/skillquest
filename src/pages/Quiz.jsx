import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Quiz.css'

// Mock questions bank
const QUESTIONS = {
  aptitude: [
    { id: 1, q: 'A train travels 360 km in 4 hours. What is its speed in m/s?', options: ['25 m/s', '90 m/s', '100 m/s', '36 m/s'], answer: 0 },
    { id: 2, q: 'If 15 workers can build a wall in 48 hours, how many workers are needed to build it in 30 hours?', options: ['20', '24', '18', '22'], answer: 1 },
    { id: 3, q: 'A shopkeeper sells an article at 20% profit. If the cost price is ₹500, what is the selling price?', options: ['₹550', '₹580', '₹600', '₹620'], answer: 2 },
    { id: 4, q: 'The ratio of two numbers is 3:5. If their sum is 96, find the larger number.', options: ['36', '60', '48', '54'], answer: 1 },
    { id: 5, q: 'Simple interest on ₹2000 at 5% per annum for 3 years is?', options: ['₹250', '₹300', '₹350', '₹200'], answer: 1 },
  ],
  reasoning: [
    { id: 1, q: 'If all roses are flowers and some flowers fade quickly, which conclusion is definitely true?', options: ['All roses fade quickly', 'Some roses may fade quickly', 'No roses fade quickly', 'All flowers are roses'], answer: 1 },
    { id: 2, q: 'Complete the series: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '36'], answer: 1 },
    { id: 3, q: 'A is B\'s sister. C is B\'s mother. D is C\'s father. E is D\'s mother. How is A related to D?', options: ['Granddaughter', 'Grandmother', 'Daughter', 'Niece'], answer: 0 },
    { id: 4, q: 'Find the odd one out: 121, 144, 169, 196, 214', options: ['121', '196', '214', '169'], answer: 2 },
    { id: 5, q: 'If COLD is coded as DPME, how is HEAT coded?', options: ['IFBU', 'GDZA', 'HEAT', 'IFAT'], answer: 0 },
  ],
  verbal: [
    { id: 1, q: 'Choose the word most similar in meaning to "EPHEMERAL":', options: ['Eternal', 'Transient', 'Permanent', 'Ancient'], answer: 1 },
    { id: 2, q: 'Select the correctly spelled word:', options: ['Accomodate', 'Accommodate', 'Acomodate', 'Acommodate'], answer: 1 },
    { id: 3, q: '"She was over the moon." This phrase means she was:', options: ['Confused', 'Very happy', 'Very sad', 'Surprised'], answer: 1 },
    { id: 4, q: 'Choose the antonym of "VERBOSE":', options: ['Talkative', 'Loquacious', 'Concise', 'Eloquent'], answer: 2 },
    { id: 5, q: 'Fill in the blank: The committee decided to _____ the meeting to next week.', options: ['Cancel', 'Postpone', 'Abandon', 'Reject'], answer: 1 },
  ]
}

const TIMER_SECONDS = 20

export default function Quiz() {
  const { category }  = useParams()
  const navigate      = useNavigate()
  const { addXP }     = useAuth()

  const questions     = QUESTIONS[category] || QUESTIONS.aptitude
  const [qIndex, setQIndex]       = useState(0)
  const [selected, setSelected]   = useState(null)
  const [answered, setAnswered]   = useState(false)
  const [timeLeft, setTimeLeft]   = useState(TIMER_SECONDS)
  const [score, setScore]         = useState(0)
  const [results, setResults]     = useState([])

  const currentQ = questions[qIndex]
  const isLast   = qIndex === questions.length - 1

  const handleNext = useCallback(() => {
    const isCorrect = selected === currentQ.answer
    const newResults = [...results, { q: currentQ.q, selected, answer: currentQ.answer, correct: isCorrect }]
    setResults(newResults)
    if (isCorrect) { setScore(s => s + 1); addXP(10) }

    if (isLast) {
      navigate('/results', { state: { score: isCorrect ? score + 1 : score, total: questions.length, results: newResults, category } })
    } else {
      setQIndex(i => i + 1)
      setSelected(null)
      setAnswered(false)
      setTimeLeft(TIMER_SECONDS)
    }
  }, [selected, currentQ, isLast, score, results, navigate, category, questions.length, addXP])

  // Timer
  useEffect(() => {
    if (answered) return
    if (timeLeft === 0) { setAnswered(true); return }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, answered])

  const handleSelect = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
  }

  const timerPct = (timeLeft / TIMER_SECONDS) * 100
  const timerColor = timeLeft > 10 ? 'var(--green)' : timeLeft > 5 ? 'var(--gold)' : 'var(--red)'

  const CAT_LABELS = { aptitude: 'Quantitative Aptitude', reasoning: 'Logical Reasoning', verbal: 'Verbal Ability' }

  return (
    <div className="quiz-page">
      <div className="quiz-topbar">
        <div>
          <div className="quiz-cat">{CAT_LABELS[category] || category}</div>
          <div className="quiz-progress-text">Question {qIndex + 1} of {questions.length}</div>
        </div>
        <div className="quiz-timer" style={{ color: timerColor, borderColor: timerColor }}>
          <span className="timer-num">{timeLeft}</span>
          <span className="timer-label">sec</span>
        </div>
      </div>

      {/* Progress */}
      <div className="quiz-prog-track">
        <div className="quiz-prog-fill" style={{ width: `${((qIndex) / questions.length) * 100}%` }} />
      </div>

      <div className="quiz-content">
        <div className="quiz-card fade-up">
          {/* Timer bar */}
          <div className="progress-track timer-bar">
            <div className="progress-fill" style={{ width: `${timerPct}%`, background: timerColor, transition: 'width 1s linear, background 0.3s' }} />
          </div>

          <div className="quiz-q-num">Q{qIndex + 1}</div>
          <h2 className="quiz-question">{currentQ.q}</h2>

          <div className="options-grid">
            {currentQ.options.map((opt, idx) => {
              let cls = 'option-btn'
              if (answered) {
                if (idx === currentQ.answer)          cls += ' correct'
                else if (idx === selected)             cls += ' wrong'
                else                                   cls += ' dimmed'
              } else if (idx === selected) {
                cls += ' selected'
              }
              return (
                <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={answered}>
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{opt}</span>
                  {answered && idx === currentQ.answer && <span className="option-check">✓</span>}
                  {answered && idx === selected && idx !== currentQ.answer && <span className="option-x">✗</span>}
                </button>
              )
            })}
          </div>

          {answered && (
            <div className="quiz-feedback fade-up">
              {selected === currentQ.answer
                ? <div className="feedback-correct">🎉 Correct! +10 XP earned</div>
                : <div className="feedback-wrong">❌ Incorrect. The answer was <strong>{currentQ.options[currentQ.answer]}</strong></div>
              }
              <button className="btn btn-primary" onClick={handleNext}>
                {isLast ? 'See Results →' : 'Next Question →'}
              </button>
            </div>
          )}
        </div>

        {/* Score tracker */}
        <div className="quiz-score-track">
          <div className="quiz-score-label">Score</div>
          <div className="quiz-score-num">{score}<span>/{qIndex + (answered ? 1 : 0)}</span></div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
            {qIndex + (answered ? 1 : 0) > 0 ? Math.round((score / (qIndex + (answered ? 1 : 0))) * 100) : 0}% accuracy
          </div>
        </div>
      </div>
    </div>
  )
}
