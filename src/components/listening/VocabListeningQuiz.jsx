import { useState, useCallback } from 'react'
import { useStore } from '../../store/useStore'
import { VOCAB_ALL } from '../../data/content'
import { speakJapanese } from '../../lib/speech'
import styles from './ListeningView.module.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const firstMeaning = (m) => m.split(',')[0].trim()
const ROUND_SIZE = 10

function buildQuestions(pool) {
  const chosen = shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length))
  return chosen.map(item => {
    const correct = firstMeaning(item.meaning)
    const distractorPool = pool.filter(p => firstMeaning(p.meaning) !== correct)
    const distractors = shuffle(distractorPool).slice(0, 3).map(p => firstMeaning(p.meaning))
    const options = shuffle([correct, ...distractors])
    return { ...item, correct, options }
  })
}

export default function VocabListeningQuiz() {
  const markListeningKnown = useStore(s => s.markListeningKnown)
  const listeningKnown = useStore(s => s.listeningKnown)
  const knownCount = Object.keys(listeningKnown).length
  const [scope, setScope] = useState('N5')
  const [session, setSession] = useState(null)

  const startPractice = useCallback((level) => {
    const pool = VOCAB_ALL.filter(v => v.level === level)
    if (pool.length < 4) return
    const questions = buildQuestions(pool)
    setSession({ questions, index: 0, score: 0, answered: false, picked: null })
    setTimeout(() => speakJapanese(questions[0].kana), 200)
  }, [])

  const replay = () => {
    if (!session) return
    speakJapanese(session.questions[session.index].kana)
  }

  const pick = (opt) => {
    if (!session || session.answered) return
    const q = session.questions[session.index]
    const correct = opt === q.correct
    if (correct) markListeningKnown(q.id)
    setSession(s => ({ ...s, answered: true, picked: opt, score: s.score + (correct ? 1 : 0) }))
  }

  const next = () => {
    setSession(s => {
      const ni = s.index + 1
      if (ni < s.questions.length) setTimeout(() => speakJapanese(s.questions[ni].kana), 200)
      return { ...s, index: ni, answered: false, picked: null }
    })
  }

  return (
    <div>
      <p className="page-sub">{knownCount}/{VOCAB_ALL.length} words identified by ear · Your device speaks a word — pick the meaning you heard.</p>

      {!session && (
        <div className={styles.startCard}>
          <p className={styles.startText}>Each round is {ROUND_SIZE} words from the level you choose. Replay audio as many times as you like before answering.</p>
          <div className={styles.scopeRow}>
            {['N5', 'N4', 'N3', 'N2'].map(l => (
              <button key={l} className={`pill ${scope === l ? 'active' : ''}`} onClick={() => setScope(l)}>{l}</button>
            ))}
          </div>
          <button className="btn-primary" onClick={() => startPractice(scope)}>Start listening quiz</button>
        </div>
      )}

      {session && session.index >= session.questions.length && (
        <div className={styles.startCard}>
          <div className={styles.resultIcon}>{session.score === session.questions.length ? '🎉' : '👂'}</div>
          <h2 className={styles.resultTitle}>{session.score}/{session.questions.length} correct</h2>
          <div className={styles.doneActions}>
            <button className="btn-ghost" onClick={() => setSession(null)}>Change level</button>
            <button className="btn-primary" onClick={() => startPractice(scope)}>Practice again</button>
          </div>
        </div>
      )}

      {session && session.index < session.questions.length && (
        <div className={styles.quiz}>
          <div className={styles.quizTop}>
            <span>{session.index + 1} / {session.questions.length}</span>
            <span>Score: {session.score}</span>
          </div>
          <button className={styles.replayBtn} onClick={replay}>🔊 Play again</button>
          <div className={styles.optionGrid}>
            {session.questions[session.index].options.map(opt => {
              const q = session.questions[session.index]
              let cls = styles.option
              if (session.answered && opt === q.correct) cls += ` ${styles.correct}`
              else if (session.answered && opt === session.picked) cls += ` ${styles.wrong}`
              return (
                <button key={opt} className={cls} disabled={session.answered} onClick={() => pick(opt)}>
                  {opt}
                </button>
              )
            })}
          </div>
          {session.answered && (
            <div className={styles.revealRow}>
              <div className={`jp ${styles.revealWord}`}>{session.questions[session.index].jp}</div>
              <div className={styles.revealKana}>{session.questions[session.index].kana}</div>
              <button className="btn-primary" onClick={next}>
                {session.index + 1 >= session.questions.length ? 'See results' : 'Next'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
