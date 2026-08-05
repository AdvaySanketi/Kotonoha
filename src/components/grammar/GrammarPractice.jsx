import { useState, useCallback } from 'react'
import { FILL_BLANK_POOL } from '../../data/grammarExercises'
import { SENTENCE_ORDER } from '../../data/sentenceOrder'
import styles from './GrammarPractice.module.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const ROUND_SIZE = 12

function buildFillQuestions(pool) {
  const chosen = shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length))
  return chosen.map(item => {
    const distractorPool = pool.filter(p => p.blank !== item.blank)
    const distractors = shuffle(distractorPool).slice(0, 3).map(p => p.blank)
    const options = shuffle([item.blank, ...distractors])
    return { ...item, correct: item.blank, options }
  })
}

function buildOrderQuestions(pool) {
  const chosen = shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length))
  return chosen.map(item => ({ ...item, correct: item.chunks[item.starIndex], options: shuffle(item.chunks) }))
}

export default function GrammarPractice() {
  const [mode, setMode] = useState('fill') // fill | order
  const [scope, setScope] = useState('N5')
  const [session, setSession] = useState(null)

  const pool = mode === 'fill' ? FILL_BLANK_POOL : SENTENCE_ORDER
  const scopedPool = pool.filter(p => p.level === scope)

  const start = useCallback(() => {
    const questions = mode === 'fill' ? buildFillQuestions(scopedPool) : buildOrderQuestions(scopedPool)
    if (questions.length < 1) return
    setSession({ questions, index: 0, score: 0, answered: false, picked: null })
  }, [mode, scopedPool])

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

  const switchMode = (m) => { setMode(m); setSession(null) }

  return (
    <div>
      <div className="pill-row">
        <button className={`pill ${mode === 'fill' ? 'active' : ''}`} onClick={() => switchMode('fill')}>Fill in the blank</button>
        <button className={`pill ${mode === 'order' ? 'active' : ''}`} onClick={() => switchMode('order')}>Sentence order</button>
      </div>

      {!session && (
        <div className={styles.startCard}>
          <p className={styles.startText}>
            {mode === 'fill'
              ? 'A sentence with a grammar point blanked out — pick which fragment fills the gap.'
              : 'A sentence split into 4 pieces — pick which piece goes in the ★ position, matching the real JLPT 文法整序 format.'}
          </p>
          <div className={styles.scopeRow}>
            {['N5', 'N4'].map(l => (
              <button key={l} className={`pill ${scope === l ? 'active' : ''}`} onClick={() => setScope(l)}>{l}</button>
            ))}
          </div>
          <p className={styles.poolNote}>{scopedPool.length} question{scopedPool.length === 1 ? '' : 's'} available at {scope}</p>
          <button className="btn-primary" onClick={start} disabled={scopedPool.length < 1}>Start</button>
        </div>
      )}

      {session && session.index >= session.questions.length && (
        <div className={styles.startCard}>
          <div className={styles.resultIcon}>{session.score === session.questions.length ? '🎉' : '文'}</div>
          <h2 className={styles.resultTitle}>{session.score}/{session.questions.length} correct</h2>
          <div className={styles.doneActions}>
            <button className="btn-ghost" onClick={() => setSession(null)}>Change level</button>
            <button className="btn-primary" onClick={start}>Practice again</button>
          </div>
        </div>
      )}

      {session && session.index < session.questions.length && mode === 'fill' && (() => {
        const q = session.questions[session.index]
        return (
          <div className={styles.quiz}>
            <div className={styles.quizTop}>
              <span>{session.index + 1} / {session.questions.length}</span>
              <span>Score: {session.score}</span>
            </div>
            <div className={styles.sentenceCard}>
              <div className={`jp ${styles.sentence}`}>
                {q.before}<span className={styles.gap}>{session.answered ? q.correct : '＿＿＿'}</span>{q.after}
              </div>
              <div className={styles.sentenceEn}>{q.en}</div>
            </div>
            <div className={styles.optionGrid}>
              {q.options.map(opt => {
                let cls = styles.option
                if (session.answered && opt === q.correct) cls += ` ${styles.correct}`
                else if (session.answered && opt === session.picked) cls += ` ${styles.wrong}`
                return (
                  <button key={opt} className={`jp ${cls}`} disabled={session.answered} onClick={() => pick(opt)}>{opt}</button>
                )
              })}
            </div>
            {session.answered && (
              <button className="btn-primary" onClick={next}>{session.index + 1 >= session.questions.length ? 'See results' : 'Next'}</button>
            )}
          </div>
        )
      })()}

      {session && session.index < session.questions.length && mode === 'order' && (() => {
        const q = session.questions[session.index]
        return (
          <div className={styles.quiz}>
            <div className={styles.quizTop}>
              <span>{session.index + 1} / {session.questions.length}</span>
              <span>Score: {session.score}</span>
            </div>
            <div className={styles.sentenceCard}>
              <div className={`jp ${styles.sentence}`}>
                {q.before}
                {q.chunks.map((c, i) => i === q.starIndex
                  ? <span key={i} className={styles.star}>{session.answered ? q.correct : '★'}</span>
                  : <span key={i} className={styles.slot}>{i + 1}</span>
                )}
                {q.after}
              </div>
              <div className={styles.sentenceEn}>{q.en}</div>
            </div>
            <p className={styles.orderHint}>Which fragment belongs at ★?</p>
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
