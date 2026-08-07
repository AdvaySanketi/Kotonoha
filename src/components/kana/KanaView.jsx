import { useState, useMemo, useCallback, useEffect } from 'react'
import { useStore } from '../../store/useStore'
import { HIRAGANA_GROUPS, KATAKANA_GROUPS } from '../../data/kana'
import SpeakButton from '../shared/SpeakButton'
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

  // ── Flashcards ──────────────────────────────────────────────────
  // { queue, index, flipped, pendingAdvance } — pendingAdvance holds the
  // next queue/index until the flip-back CSS animation finishes, so the
  // next card's back face never flashes mid-rotation (same fix as the
  // vocab/kanji flashcard flow).
  const [flash, setFlash] = useState(null)
  const [flashOrder, setFlashOrder] = useState('shuffled') // shuffled | chart

  const startFlash = useCallback((scopeId, order) => {
    const scopeDef = SCOPES.find(s => s.id === scopeId) || SCOPES[0]
    const scriptLabel = script === 'hiragana' ? 'Hiragana' : 'Katakana'
    const pool = GROUPS.filter(scopeDef.filter).flatMap(g => g.chars.map(c => ({ ...c, meaning: `${scriptLabel} · ${g.title}` })))
    if (pool.length < 1) return
    setFlash({ queue: order === 'chart' ? pool : shuffle(pool), index: 0, flipped: false, pendingAdvance: null })
  }, [GROUPS, script])

  const flipFlash = () => setFlash(f => (f ? { ...f, flipped: !f.flipped } : f))

  const gradeFlash = (grade) => {
    if (!flash) return
    const card = flash.queue[flash.index]
    if (!card) return
    // markKanaKnown triggers a Zustand store update — it must run outside
    // the setFlash updater, since updater functions run during React's
    // render phase and must be pure (calling another store's setState from
    // inside one produces a "cannot update a component while rendering
    // a different component" warning).
    if (grade === 'good') markKanaKnown(card.id)
    const newQueue = [...flash.queue]
    if (grade === 'hard') newQueue.splice(Math.min(flash.index + 3, newQueue.length), 0, card)
    const next = flash.index + 1
    setFlash(f => ({ ...f, flipped: false, pendingAdvance: { queue: newQueue, index: next } }))
  }

  const commitFlashAdvance = () => {
    setFlash(f => {
      if (!f || !f.pendingAdvance) return f
      return { ...f, queue: f.pendingAdvance.queue, index: f.pendingAdvance.index, pendingAdvance: null }
    })
  }

  const flashInSession = mode === 'flashcards' && flash && flash.index < flash.queue.length

  const handleFlashKey = useCallback((e) => {
    if (!flashInSession) return
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipFlash() }
    if (e.key === 'ArrowLeft' && flash.flipped) gradeFlash('hard')
    if (e.key === 'ArrowRight' && flash.flipped) gradeFlash('good')
  }, [flashInSession, flash])

  useEffect(() => {
    window.addEventListener('keydown', handleFlashKey)
    return () => window.removeEventListener('keydown', handleFlashKey)
  }, [handleFlashKey])

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
          <button className={`pill ${mode === 'practice' ? 'active' : ''}`} onClick={() => { setMode('practice'); setFlash(null) }}>Practice quiz</button>
          <button className={`pill ${mode === 'flashcards' ? 'active' : ''}`} onClick={() => { setMode('flashcards'); setSession(null) }}>Flashcards</button>
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

      {mode === 'flashcards' && !flash && (
        <div className={styles.startCard}>
          <p className={styles.startText}>Flip through each character, then grade yourself — same flip-and-grade flow as the vocab/kanji flashcards. Getting a character right marks it as mastered.</p>
          <div className={styles.scopeRow}>
            {SCOPES.map(s => (
              <button key={s.id} className={`pill ${scope === s.id ? 'active' : ''}`} onClick={() => setScope(s.id)}>{s.label}</button>
            ))}
          </div>
          <div className={styles.scopeRow}>
            <button className={`pill ${flashOrder === 'shuffled' ? 'active' : ''}`} onClick={() => setFlashOrder('shuffled')}>Shuffled</button>
            <button className={`pill ${flashOrder === 'chart' ? 'active' : ''}`} onClick={() => setFlashOrder('chart')}>Chart order</button>
          </div>
          <button className="btn-primary" onClick={() => startFlash(scope, flashOrder)}>Start flashcards</button>
        </div>
      )}

      {mode === 'flashcards' && flash && flash.index >= flash.queue.length && (
        <div className={styles.startCard}>
          <div className={styles.resultIcon}>🎌</div>
          <h2 className={styles.resultTitle}>Session complete!</h2>
          <div className={styles.doneActions}>
            <button className="btn-ghost" onClick={() => setFlash(null)}>Change scope</button>
            <button className="btn-primary" onClick={() => startFlash(scope, flashOrder)}>Practice again</button>
          </div>
        </div>
      )}

      {flashInSession && (() => {
        const card = flash.queue[flash.index]
        return (
          <div className={styles.flashWrap}>
            <div className={styles.flashTop}>
              <span className={styles.quizCounter}>{flash.index + 1} / {flash.queue.length}</span>
            </div>
            <div className={`${styles.flashCardWrap} ${flash.flipped ? '' : styles.clickable}`} onClick={!flash.flipped ? flipFlash : undefined}>
              <div className={`${styles.flashCardInner} ${flash.flipped ? styles.flashFlipped : ''}`} onTransitionEnd={(e) => { if (e.propertyName === 'transform' && flash.pendingAdvance) commitFlashAdvance() }}>
                <div className={styles.flashFront}>
                  <div className={styles.frontTag}>tap to reveal</div>
                  <SpeakButton text={card.kana} className={styles.flashSpeak} />
                  <div className={`jp ${styles.flashKana}`}>{card.kana}</div>
                </div>
                <div className={styles.flashBack}>
                  <div className={styles.flashRomaji}>{card.romaji}</div>
                  <div className={styles.flashGroup}>{card.meaning}</div>
                </div>
              </div>
            </div>
            {flash.flipped ? (
              <div className={styles.gradeRow}>
                <button className={styles.btnHard} onClick={() => gradeFlash('hard')}>✕ Hard <span className={styles.hint}>←</span></button>
                <button className={styles.btnFlip} onClick={flipFlash}>flip back</button>
                <button className={styles.btnGood} onClick={() => gradeFlash('good')}>✓ Got it <span className={styles.hint}>→</span></button>
              </div>
            ) : (
              <div className={styles.revealRow}>
                <button className="btn-primary" style={{ padding: '12px 40px', fontSize: '15px' }} onClick={flipFlash}>Reveal <span className={styles.hint}>Space</span></button>
              </div>
            )}
            <p className={styles.keyHint}>Keyboard: Space to flip · ← Hard · → Got it</p>
          </div>
        )
      })()}
    </div>
  )
}
