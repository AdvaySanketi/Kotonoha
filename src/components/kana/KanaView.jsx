import { useState, useMemo, useCallback } from 'react'
import { useStore } from '../../store/useStore'
import { HIRAGANA_GROUPS, KATAKANA_GROUPS } from '../../data/kana'
import styles from './KanaView.module.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const SCOPES = [
  { id: 'basic', label: 'Basic (46)', filter: g => !['Dakuten (゛)', 'Handakuten (゜)', 'Yōon (combinations)'].includes(g.title) },
  { id: 'dakuten', label: 'Dakuten / Handakuten', filter: g => g.title === 'Dakuten (゛)' || g.title === 'Handakuten (゜)' },
  { id: 'yoon', label: 'Combinations', filter: g => g.title === 'Yōon (combinations)' },
  { id: 'all', label: 'All', filter: () => true },
]

const ROUND_SIZE = 15

function buildQuestions(pool) {
  const chosen = shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length))
  return chosen.map(item => {
    const distractors = shuffle(pool.filter(p => p.romaji !== item.romaji)).slice(0, 3).map(p => p.romaji)
    const options = shuffle([item.romaji, ...distractors])
    return { ...item, options }
  })
}

export default function KanaView() {
  const { kanaKnown, markKanaKnown } = useStore()
  const [script, setScript] = useState('hiragana')
  const [mode, setMode] = useState('chart')
  const [scope, setScope] = useState('basic')

  const GROUPS = script === 'hiragana' ? HIRAGANA_GROUPS : KATAKANA_GROUPS
  const allChars = useMemo(() => GROUPS.flatMap(g => g.chars), [GROUPS])

  const [session, setSession] = useState(null) // { questions, index, score, answered, picked }

  const startPractice = useCallback((scopeId) => {
    const scopeDef = SCOPES.find(s => s.id === scopeId) || SCOPES[0]
    const pool = GROUPS.filter(scopeDef.filter).flatMap(g => g.chars)
    if (pool.length < 4) return
    setSession({ questions: buildQuestions(pool), index: 0, score: 0, answered: false, picked: null })
  }, [GROUPS])

  const pick = (opt) => {
    if (!session || session.answered) return
    const q = session.questions[session.index]
    const correct = opt === q.romaji
    if (correct) markKanaKnown(q.id)
    setSession(s => ({ ...s, answered: true, picked: opt, score: s.score + (correct ? 1 : 0) }))
  }

  const next = () => {
    setSession(s => {
      const ni = s.index + 1
      if (ni >= s.questions.length) return { ...s, index: ni, answered: false }
      return { ...s, index: ni, answered: false, picked: null }
    })
  }

  const knownCount = allChars.filter(c => kanaKnown[c.id]).length

  return (
    <div className="page-wide">
      <h1 className="page-title">Hiragana &amp; Katakana</h1>
      <p className="page-sub">{knownCount}/{allChars.length} {script} mastered · The foundation for all Japanese reading</p>

      <div className={styles.tabs}>
        <div className="pill-row" style={{ marginBottom: 0 }}>
          <button className={`pill ${script === 'hiragana' ? 'active' : ''}`} onClick={() => { setScript('hiragana'); setSession(null) }}>ひらがな Hiragana</button>
          <button className={`pill ${script === 'katakana' ? 'active' : ''}`} onClick={() => { setScript('katakana'); setSession(null) }}>カタカナ Katakana</button>
        </div>
        <div className="pill-row" style={{ marginBottom: 0 }}>
          <button className={`pill ${mode === 'chart' ? 'active' : ''}`} onClick={() => { setMode('chart'); setSession(null) }}>Chart</button>
          <button className={`pill ${mode === 'practice' ? 'active' : ''}`} onClick={() => setMode('practice')}>Practice quiz</button>
        </div>
      </div>

      {mode === 'chart' && (
        <div className={styles.chart}>
          {GROUPS.map(g => (
            <div key={g.title} className={styles.groupBlock}>
              <div className={styles.groupTitle}>{g.title}</div>
              <div className={styles.grid}>
                {g.chars.map(c => (
                  <div key={c.id} className={`${styles.tile} ${kanaKnown[c.id] ? styles.tileKnown : ''}`}>
                    <div className={`jp ${styles.tileKana}`}>{c.kana}</div>
                    <div className={styles.tileRomaji}>{c.romaji}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {mode === 'practice' && !session && (
        <div className={styles.startCard}>
          <p className={styles.startText}>Choose a scope to quiz yourself on. Each round is {ROUND_SIZE} questions (or fewer if the scope is smaller). Getting a character right marks it as mastered.</p>
          <div className={styles.scopeRow}>
            {SCOPES.map(s => (
              <button key={s.id} className={`pill ${scope === s.id ? 'active' : ''}`} onClick={() => setScope(s.id)}>{s.label}</button>
            ))}
          </div>
          <button className="btn-primary" onClick={() => startPractice(scope)}>Start quiz</button>
        </div>
      )}

      {mode === 'practice' && session && session.index >= session.questions.length && (
        <div className={styles.startCard}>
          <div className={styles.resultIcon}>{session.score === session.questions.length ? '🎉' : '🎌'}</div>
          <h2 className={styles.resultTitle}>{session.score}/{session.questions.length} correct</h2>
          <div className={styles.doneActions}>
            <button className="btn-ghost" onClick={() => setSession(null)}>Change scope</button>
            <button className="btn-primary" onClick={() => startPractice(scope)}>Practice again</button>
          </div>
        </div>
      )}

      {mode === 'practice' && session && session.index < session.questions.length && (
        <div className={styles.quiz}>
          <div className={styles.quizTop}>
            <span className={styles.quizCounter}>{session.index + 1} / {session.questions.length}</span>
            <span className={styles.quizScore}>Score: {session.score}</span>
          </div>
          <div className={styles.quizCard}>
            <div className={`jp ${styles.quizKana}`}>{session.questions[session.index].kana}</div>
          </div>
          <div className={styles.optionGrid}>
            {session.questions[session.index].options.map(opt => {
              const q = session.questions[session.index]
              let cls = styles.option
              if (session.answered && opt === q.romaji) cls += ` ${styles.correct}`
              else if (session.answered && opt === session.picked) cls += ` ${styles.wrong}`
              return (
                <button key={opt} className={cls} disabled={session.answered} onClick={() => pick(opt)}>
                  {opt}
                </button>
              )
            })}
          </div>
          {session.answered && (
            <button className="btn-primary" onClick={next}>
              {session.index + 1 >= session.questions.length ? 'See results' : 'Next'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
