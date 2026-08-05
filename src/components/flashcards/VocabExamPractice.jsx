import { useState, useCallback, useMemo } from 'react'
import { VOCAB_ALL } from '../../data/content'
import styles from './VocabExamPractice.module.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const HAS_KANJI = /[一-龯]/
const ROUND_SIZE = 12

// Mirrors the real JLPT 文字・語彙 question shapes: given a reading, pick
// the correct kanji spelling; given a kanji word, pick the correct reading.
// Only words that actually contain kanji are eligible — a pure-kana or
// katakana word doesn't make for a meaningful "spelling" question.
function buildQuestions(pool, direction) {
  const chosen = shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length))
  return chosen.map(item => {
    const correct = direction === 'toKanji' ? item.jp : item.kana
    const key = direction === 'toKanji' ? 'jp' : 'kana'
    const distractorPool = pool.filter(p => p[key] !== correct)
    const distractors = shuffle(distractorPool).slice(0, 3).map(p => p[key])
    const options = shuffle([correct, ...distractors])
    return { ...item, direction, correct, options }
  })
}

export default function VocabExamPractice() {
  const [direction, setDirection] = useState('toKanji') // toKanji | toReading
  const [scope, setScope] = useState('N5')
  const [session, setSession] = useState(null)

  const pool = useMemo(
    () => VOCAB_ALL.filter(v => v.level === scope && HAS_KANJI.test(v.jp) && v.jp !== v.kana),
    [scope]
  )

  const start = useCallback(() => {
    if (pool.length < 4) return
    setSession({ questions: buildQuestions(pool, direction), index: 0, score: 0, answered: false, picked: null })
  }, [pool, direction])

  const pick = (opt) => {
    if (!session || session.answered) return
    const q = session.questions[session.index]
    const correct = opt === q.correct
    setSession(s => ({ ...s, answered: true, picked: opt, score: s.score + (correct ? 1 : 0) }))
  }

  const next = () => {
    setSession(s => {
      const ni = s.index + 1
      if (ni >= s.questions.length) return { ...s, index: ni }
      return { ...s, index: ni, answered: false, picked: null }
    })
  }

  const switchDirection = (d) => { setDirection(d); setSession(null) }

  return (
    <div>
      <div className="pill-row">
        <button className={`pill ${direction === 'toKanji' ? 'active' : ''}`} onClick={() => switchDirection('toKanji')}>Reading → Kanji</button>
        <button className={`pill ${direction === 'toReading' ? 'active' : ''}`} onClick={() => switchDirection('toReading')}>Kanji → Reading</button>
      </div>

      {!session && (
        <div className={styles.startCard}>
          <p className={styles.startText}>
            {direction === 'toKanji'
              ? "You'll see a word's reading in kana — pick the correct kanji spelling."
              : "You'll see a word written in kanji — pick the correct reading."}
            {' '}Mirrors the real 文字・語彙 question format.
          </p>
          <div className={styles.scopeRow}>
            {['N5', 'N4', 'N3', 'N2'].map(l => (
              <button key={l} className={`pill ${scope === l ? 'active' : ''}`} onClick={() => setScope(l)}>{l}</button>
            ))}
          </div>
          <p className={styles.poolNote}>{pool.length} eligible words at {scope}</p>
          <button className="btn-primary" onClick={start} disabled={pool.length < 4}>Start</button>
        </div>
      )}

      {session && session.index >= session.questions.length && (
        <div className={styles.startCard}>
          <div className={styles.resultIcon}>{session.score === session.questions.length ? '🎉' : '語'}</div>
          <h2 className={styles.resultTitle}>{session.score}/{session.questions.length} correct</h2>
          <div className={styles.doneActions}>
            <button className="btn-ghost" onClick={() => setSession(null)}>Change level</button>
            <button className="btn-primary" onClick={start}>Practice again</button>
          </div>
        </div>
      )}

      {session && session.index < session.questions.length && (() => {
        const q = session.questions[session.index]
        const prompt = direction === 'toKanji' ? q.kana : q.jp
        return (
          <div className={styles.quiz}>
            <div className={styles.quizTop}>
              <span>{session.index + 1} / {session.questions.length}</span>
              <span>Score: {session.score}</span>
            </div>
            <div className={styles.promptCard}>
              <div className={`jp ${styles.promptText}`}>{prompt}</div>
              {session.answered && <div className={styles.meaning}>{q.meaning}</div>}
            </div>
            <div className={styles.optionGrid}>
              {q.options.map((opt, i) => {
                let cls = styles.option
                if (session.answered && opt === q.correct) cls += ` ${styles.correct}`
                else if (session.answered && opt === session.picked) cls += ` ${styles.wrong}`
                return (
                  <button key={i} className={`jp ${cls}`} disabled={session.answered} onClick={() => pick(opt)}>{opt}</button>
                )
              })}
            </div>
            {session.answered && (
              <button className="btn-primary" onClick={next}>{session.index + 1 >= session.questions.length ? 'See results' : 'Next'}</button>
            )}
          </div>
        )
      })()}
    </div>
  )
}
