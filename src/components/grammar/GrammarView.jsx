import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { GRAMMAR_PATTERNS } from '../../data/content'
import GrammarPractice from './GrammarPractice'
import styles from './GrammarView.module.css'

export default function GrammarView() {
  const { grammarStudied, markGrammarStudied } = useStore()
  const [tab, setTab] = useState('reference') // reference | practice
  const [filterLevel, setFilterLevel] = useState('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  const filtered = GRAMMAR_PATTERNS.filter(g => {
    const matchLevel = filterLevel === 'all' || g.level === filterLevel
    const matchSearch = !search || g.pattern.includes(search) || g.meaning.toLowerCase().includes(search.toLowerCase())
    return matchLevel && matchSearch
  })

  const studied = GRAMMAR_PATTERNS.filter(g => grammarStudied[g.id]).length

  return (
    <div className="page">
      <h1 className="page-title">Grammar Reference</h1>
      <p className="page-sub">{studied}/{GRAMMAR_PATTERNS.length} patterns studied · Key structures for reading comprehension</p>

      <div className="pill-row">
        <button className={`pill ${tab === 'reference' ? 'active' : ''}`} onClick={() => setTab('reference')}>Reference</button>
        <button className={`pill ${tab === 'practice' ? 'active' : ''}`} onClick={() => setTab('practice')}>Practice</button>
      </div>

      {tab === 'practice' ? <GrammarPractice /> : <>
      <div className={styles.controls}>
        <div className="pill-row" style={{marginBottom:0}}>
          {['all','N5','N4','N3','N2','N1'].map(l => (
            <button key={l} className={`pill ${filterLevel===l?'active':''}`} onClick={() => setFilterLevel(l)}>
              {l === 'all' ? 'All' : l}
            </button>
          ))}
        </div>
        <input
          className={styles.search} placeholder="Search patterns..."
          value={search} onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.list}>
        {filtered.map(g => {
          const isOpen = expanded === g.id
          const done = !!grammarStudied[g.id]
          return (
            <div key={g.id} className={`${styles.item} ${done ? styles.done : ''}`}>
              <button className={styles.itemHeader} onClick={() => setExpanded(isOpen ? null : g.id)}>
                <div className={styles.itemLeft}>
                  <span className={`badge badge-${g.level.toLowerCase()}`}>{g.level}</span>
                  <span className={`jp ${styles.pattern}`}>{g.pattern}</span>
                  <span className={styles.meaning}>{g.meaning}</span>
                  {g.verified === false && (
                    <span className={styles.unverified} title="Sourced from an AI-generated database and not yet individually fact-checked — double-check against another source before trusting it fully.">
                      ⚠ unverified
                    </span>
                  )}
                </div>
                <div className={styles.itemRight}>
                  {done && <span className={styles.checkmark}>✓</span>}
                  <span className={styles.chevron}>{isOpen ? '▲' : '▼'}</span>
                </div>
              </button>
              {isOpen && (
                <div className={styles.detail}>
                  <p className={styles.explanation}>{g.explanation}</p>
                  {g.formation && (
                    <div className={styles.formation}>
                      <span className={styles.formationLabel}>Formation</span>
                      <span className={styles.formationText}>{g.formation}</span>
                    </div>
                  )}
                  <div className={styles.examples}>
                    {g.examples.map((ex, i) => (
                      <div key={i} className={styles.example}>
                        <div className={`jp ${styles.exJp}`}>{ex.jp}</div>
                        <div className={styles.exEn}>{ex.en}</div>
                      </div>
                    ))}
                  </div>
                  {!done && (
                    <button className={styles.markBtn} onClick={() => markGrammarStudied(g.id)}>
                      Mark as studied ✓
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className={styles.empty}>No patterns match your search.</div>
        )}
      </div>
      </>}
    </div>
  )
}
