import { useRef, useState } from 'react'
import { useStore, isDue } from '../../store/useStore'
import { VOCAB_DECKS, VOCAB_ALL, KANJI_DECKS, GRAMMAR_PATTERNS, READING_PASSAGES } from '../../data/content'
import { HIRAGANA_GROUPS, KATAKANA_GROUPS } from '../../data/kana'
import styles from './Dashboard.module.css'

const LEVELS = ['N5', 'N4', 'N3', 'N2']
const ALL_KANA = [...HIRAGANA_GROUPS, ...KATAKANA_GROUPS].flatMap(g => g.chars)

export default function Dashboard() {
  const { progress, readingDone, grammarStudied, kanaKnown, kanjiKnown, listeningKnown, srs, setView, importState } = useStore()
  const fileInputRef = useRef(null)
  const [importMsg, setImportMsg] = useState(null)

  const totalKana = ALL_KANA.length
  const doneKana = ALL_KANA.filter(c => kanaKnown[c.id]).length

  const totalVocab = Object.values(VOCAB_DECKS).reduce((s, d) => s + d.cards.length, 0)
  const goodVocab = Object.values(VOCAB_DECKS).reduce((s, d) =>
    s + d.cards.filter(c => progress[c.id] === 'good').length, 0)
  const n5VocabDeck = VOCAB_DECKS.n5vocab
  const goodN5Vocab = n5VocabDeck?.cards.filter(c => progress[c.id] === 'good').length ?? 0

  const totalKanji = Object.values(KANJI_DECKS).reduce((s, d) => s + d.cards.length, 0)
  const goodKanji = Object.values(KANJI_DECKS).reduce((s, d) =>
    s + d.cards.filter(c => progress[c.id] === 'good').length, 0)

  const dueVocab = Object.values(VOCAB_DECKS).flatMap(d => d.cards).filter(c => srs[c.id] && isDue(srs, c.id)).length
  const dueKanji = Object.values(KANJI_DECKS).flatMap(d => d.cards).filter(c => srs[c.id] && isDue(srs, c.id)).length
  const totalDue = dueVocab + dueKanji

  const totalGrammar = GRAMMAR_PATTERNS.length
  const doneGrammar = GRAMMAR_PATTERNS.filter(g => grammarStudied[g.id]).length
  const n5Grammar = GRAMMAR_PATTERNS.filter(g => g.level === 'N5')
  const doneN5Grammar = n5Grammar.filter(g => grammarStudied[g.id]).length

  const totalReading = READING_PASSAGES.length
  const doneReading = READING_PASSAGES.filter(r => readingDone[r.id]).length

  const totalListening = VOCAB_ALL.length
  const doneListening = Object.keys(listeningKnown).length

  const overallPct = Math.round(
    ((doneKana + goodVocab + goodKanji + doneGrammar + doneReading + doneListening) /
    (totalKana + totalVocab + totalKanji + totalGrammar + totalReading + totalListening)) * 100
  )

  const modules = [
    { label: 'Hiragana / Katakana', icon: 'あ', done: doneKana, total: totalKana, view: 'kana', color: 'accent' },
    { label: 'Vocabulary', icon: '📝', done: goodVocab, total: totalVocab, view: 'flashcards', color: 'green' },
    { label: 'Kanji', icon: '漢', done: goodKanji, total: totalKanji, view: 'kanji-study', color: 'blue' },
    { label: 'Grammar', icon: '文', done: doneGrammar, total: totalGrammar, view: 'grammar', color: 'gold' },
    { label: 'Reading', icon: '📖', done: doneReading, total: totalReading, view: 'reading', color: 'accent' },
    { label: 'Listening', icon: '🎧', done: doneListening, total: totalListening, view: 'listening', color: 'purple' },
  ]

  const exportProgress = () => {
    const data = { progress, readingDone, grammarStudied, kanaKnown, kanjiKnown, listeningKnown, srs, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `jp-study-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportFile = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result)
        importState(data)
        setImportMsg({ ok: true, text: 'Progress imported.' })
      } catch {
        setImportMsg({ ok: false, text: 'That file could not be read as a progress export.' })
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className={styles.dash}>
      <div className={styles.hero}>
        <div>
          <h1 className={styles.heroTitle}>言の葉 Study Hub</h1>
          <p className={styles.heroSub}>Your Japanese reading preparation dashboard</p>
        </div>
        <div className={styles.heroRing}>
          <svg viewBox="0 0 80 80" className={styles.ringsvg}>
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="7"/>
            <circle cx="40" cy="40" r="34" fill="none" stroke="white" strokeWidth="7"
              strokeDasharray={`${2 * Math.PI * 34 * overallPct / 100} 999`}
              strokeLinecap="round" transform="rotate(-90 40 40)"/>
          </svg>
          <div className={styles.ringLabel}>
            <span className={styles.ringPct}>{overallPct}%</span>
            <span className={styles.ringText}>done</span>
          </div>
        </div>
      </div>

      {totalDue > 0 && (
        <div className={styles.dueBanner}>
          <span className={styles.dueBannerIcon}>⏰</span>
          <span><strong>{totalDue} card{totalDue === 1 ? '' : 's'}</strong> due for spaced-repetition review — {dueVocab} vocabulary, {dueKanji} kanji.</span>
          <button className="btn-primary" onClick={() => setView(dueVocab >= dueKanji ? 'flashcards' : 'kanji-study')}>Review now</button>
        </div>
      )}

      <div className={styles.moduleGrid}>
        {modules.map(m => {
          const pct = m.total ? Math.round((m.done / m.total) * 100) : 0
          return (
            <button key={m.label} className={`${styles.moduleCard} ${styles[`color-${m.color}`]}`} onClick={() => setView(m.view)}>
              <div className={styles.moduleIcon}>{m.icon}</div>
              <div className={styles.moduleInfo}>
                <div className={styles.moduleName}>{m.label}</div>
                <div className={styles.moduleStat}>{m.done} / {m.total}</div>
                <div className={styles.moduleBar}>
                  <div className={styles.moduleFill} style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className={styles.modulePct}>{pct}%</div>
            </button>
          )
        })}
      </div>

      <h2 className={`section-label ${styles.sectionGap}`}>Progress by JLPT level</h2>
      <div className={styles.levelGrid}>
        {LEVELS.map(lvl => {
          const vCards = Object.values(VOCAB_DECKS).filter(d => d.level === lvl).flatMap(d => d.cards)
          const kCards = Object.values(KANJI_DECKS).filter(d => d.level === lvl).flatMap(d => d.cards)
          const gItems = GRAMMAR_PATTERNS.filter(g => g.level === lvl)
          const rItems = READING_PASSAGES.filter(r => r.level === lvl)
          const total = vCards.length + kCards.length + gItems.length + rItems.length
          const done = vCards.filter(c => progress[c.id] === 'good').length
            + kCards.filter(c => progress[c.id] === 'good').length
            + gItems.filter(g => grammarStudied[g.id]).length
            + rItems.filter(r => readingDone[r.id]).length
          const pct = total ? Math.round((done / total) * 100) : 0
          return (
            <div key={lvl} className={styles.levelCard}>
              <span className={`badge badge-${lvl.toLowerCase()}`}>{lvl}</span>
              <div className={styles.levelPct}>{pct}%</div>
              <div className={styles.levelBar}>
                <div className={styles.levelFill} style={{ width: `${pct}%`, background: lvl === 'N5' ? 'var(--green)' : lvl === 'N4' ? 'var(--blue)' : lvl === 'N3' ? 'var(--gold)' : 'var(--accent)' }} />
              </div>
              <div className={styles.levelStat}>{done}/{total} items</div>
            </div>
          )
        })}
      </div>

      <div className={styles.roadmap}>
        <h2 className="section-label">Recommended study order</h2>
        {[
          { step: 1, label: 'Learn Hiragana & Katakana', note: 'Foundation for everything — target 2–3 weeks', done: doneKana > totalKana * 0.7 },
          { step: 2, label: 'N5 Vocabulary + Kanji', note: 'Core 800 words and 100 kanji', done: n5VocabDeck && goodN5Vocab > n5VocabDeck.cards.length * 0.5 },
          { step: 3, label: 'N5 Grammar patterns', note: 'Basic sentence structures', done: n5Grammar.length > 0 && doneN5Grammar > n5Grammar.length * 0.5 },
          { step: 4, label: 'N4 Vocabulary + Kanji', note: 'Expand to ~1500 words', done: false },
          { step: 5, label: 'N3–N2 Vocabulary + Grammar', note: 'Push toward N2-level reading fluency', done: false },
          { step: 6, label: 'Graded reading practice', note: 'Apply everything in context', done: doneReading > 0 },
        ].map(s => (
          <div key={s.step} className={`${styles.roadmapItem} ${s.done ? styles.roadmapDone : ''}`}>
            <div className={styles.roadmapStep}>{s.done ? '✓' : s.step}</div>
            <div>
              <div className={styles.roadmapLabel}>{s.label}</div>
              <div className={styles.roadmapNote}>{s.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.backup}>
        <div>
          <h2 className="section-label" style={{ marginBottom: 4 }}>Backup progress</h2>
          <p className={styles.backupNote}>All progress lives only in this browser. Export a backup occasionally, or before clearing browser data.</p>
        </div>
        <div className={styles.backupActions}>
          <button className="btn-ghost" onClick={exportProgress}>Export</button>
          <button className="btn-ghost" onClick={() => fileInputRef.current?.click()}>Import</button>
          <input ref={fileInputRef} type="file" accept="application/json" hidden onChange={handleImportFile} />
        </div>
      </div>
      {importMsg && (
        <div className={importMsg.ok ? styles.importOk : styles.importErr}>{importMsg.text}</div>
      )}
    </div>
  )
}
