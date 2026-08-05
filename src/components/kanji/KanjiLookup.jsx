import { useState, useCallback } from 'react'
import { useStore } from '../../store/useStore'
import { KANJI_DB } from '../../data/content'
import styles from './KanjiLookup.module.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const firstMeaning = (m) => m.split(',')[0].trim()
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const ROUND_SIZE = 15

function buildQuestions(pool) {
  const chosen = shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length))
  return chosen.map(item => {
    const correct = firstMeaning(item.meaning)
    const distractorPool = pool.filter(p => firstMeaning(p.meaning) !== correct)
    const distractors = shuffle(distractorPool).slice(0, 3).map(p => firstMeaning(p.meaning))
    const options = shuffle([correct, ...distractors]).map(cap)
    return { ...item, correct: cap(correct), options }
  })
}

export default function KanjiLookup() {
  const { kanjiKnown, markKanjiKnown } = useStore()
  const [tab, setTab] = useState('lookup')
  const [search, setSearch] = useState('')
  const [filterLevel, setFilterLevel] = useState('all')
  const [scope, setScope] = useState('N5')
  const [session, setSession] = useState(null)

  const filtered = KANJI_DB.filter(k => {
    const matchLevel = filterLevel === 'all' || k.level === filterLevel
    const q = search.trim()
    const matchSearch = !q || k.kanji.includes(q) || k.meaning.toLowerCase().includes(q.toLowerCase()) || k.on.includes(q) || k.kun.includes(q)
    return matchLevel && matchSearch
  })

  const startPractice = useCallback((scopeLevel) => {
    const pool = scopeLevel === 'all' ? KANJI_DB : KANJI_DB.filter(k => k.level === scopeLevel)
    if (pool.length < 4) return
    setSession({ questions: buildQuestions(pool), index: 0, score: 0, answered: false, picked: null })
  }, [])

  const pick = (opt) => {
    if (!session || session.answered) return
    const q = session.questions[session.index]
    const correct = opt === q.correct
    if (correct) markKanjiKnown(q.kanji)
    setSession(s => ({ ...s, answered: true, picked: opt, score: s.score + (correct ? 1 : 0) }))
  }

  const next = () => {
    setSession(s => {
      const ni = s.index + 1
      if (ni >= s.questions.length) return { ...s, index: ni, answered: false }
      return { ...s, index: ni, answered: false, picked: null }
    })
  }

  const knownCount = KANJI_DB.filter(k => kanjiKnown[k.kanji]).length

  return (
    <div className="page-wide">
      <h1 className="page-title">Kanji</h1>
      <p className="page-sub">{tab === 'lookup' ? `Search ${KANJI_DB.length} kanji by character, meaning, or reading` : `${knownCount}/${KANJI_DB.length} kanji mastered in the meaning quiz`}</p>

      <div className="pill-row">
        <button className={`pill ${tab === 'lookup' ? 'active' : ''}`} onClick={() => setTab('lookup')}>Lookup</button>
        <button className={`pill ${tab === 'practice' ? 'active' : ''}`} onClick={() => { setTab('practice'); setSession(null) }}>Practice quiz</button>
      </div>

      {tab === 'lookup' && (
        <>
          <div className={styles.controls}>
            <input
              className={styles.search} value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search kanji, meaning, or reading…"
            />
            <div className="pill-row" style={{marginBottom:0}}>
              {['all','N5','N4','N3','N2'].map(l => (
                <button key={l} className={`pill ${filterLevel===l?'active':''}`} onClick={() => setFilterLevel(l)}>
                  {l === 'all' ? 'All' : l}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.grid}>
            {filtered.map((k, i) => (
              <div key={i} className={`${styles.kanjiCard} ${kanjiKnown[k.kanji] ? styles.kanjiCardKnown : ''}`}>
                <div className={`jp ${styles.kanji}`}>{k.kanji}</div>
                <div className={`badge badge-${k.level.toLowerCase()} ${styles.lvl}`}>{k.level}</div>
                <div className={styles.meaning}>{k.meaning}</div>
                <div className={styles.readings}>
                  {k.on && <div className={styles.reading}><span className={styles.readingLabel}>音</span><span className="jp">{k.on}</span></div>}
                  {k.kun && <div className={styles.reading}><span className={styles.readingLabel}>訓</span><span className="jp">{k.kun}</span></div>}
                </div>
                <div className={styles.meta}>
                  {k.strokes && <span className={styles.metaItem}>{k.strokes} strokes</span>}
                  {k.freq && <span className={styles.metaItem}>freq #{k.freq}</span>}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className={styles.empty}>No kanji match your search.</div>
            )}
          </div>
        </>
      )}

      {tab === 'practice' && !session && (
        <div className={styles.startCard}>
          <p className={styles.startText}>Multiple-choice meaning recall. Each round is {ROUND_SIZE} kanji (or fewer for smaller scopes). Answering correctly marks a kanji mastered.</p>
          <div className={styles.scopeRow}>
            {['N5','N4','N3','N2','all'].map(l => (
              <button key={l} className={`pill ${scope === l ? 'active' : ''}`} onClick={() => setScope(l)}>{l === 'all' ? 'All levels' : l}</button>
            ))}
          </div>
          <button className="btn-primary" onClick={() => startPractice(scope)}>Start quiz</button>
        </div>
      )}

      {tab === 'practice' && session && session.index >= session.questions.length && (
        <div className={styles.startCard}>
          <div className={styles.resultIcon}>{session.score === session.questions.length ? '🎉' : '漢'}</div>
          <h2 className={styles.resultTitle}>{session.score}/{session.questions.length} correct</h2>
          <div className={styles.doneActions}>
            <button className="btn-ghost" onClick={() => setSession(null)}>Change scope</button>
            <button className="btn-primary" onClick={() => startPractice(scope)}>Practice again</button>
          </div>
        </div>
      )}

      {tab === 'practice' && session && session.index < session.questions.length && (
        <div className={styles.quiz}>
          <div className={styles.quizTop}>
            <span>{session.index + 1} / {session.questions.length}</span>
            <span>Score: {session.score}</span>
          </div>
          <div className={styles.quizCard}>
            <div className={`jp ${styles.quizKanji}`}>{session.questions[session.index].kanji}</div>
          </div>
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
            <button className="btn-primary" onClick={next}>
              {session.index + 1 >= session.questions.length ? 'See results' : 'Next'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
