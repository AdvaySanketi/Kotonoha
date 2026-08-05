import { useState, useMemo } from 'react'
import { useStore } from '../../store/useStore'
import { READING_PASSAGES } from '../../data/content'
import SpeakButton from '../shared/SpeakButton'
import styles from './ReadingView.module.css'

const HAS_KANJI = /[一-龯]/

// Builds a word -> reading dictionary for furigana, sourced *only* from the
// passage's own hand-verified vocab glossary (the same data the hover
// tooltips use) — deliberately not the full JLPT word list.
//
// Tried a broader dictionary-lookup fallback first and it broke on real
// text: e.g. 一月 can mean "January" or "one month" depending on context,
// and a context-free lookup matched it inside 十一月 ("November"), which
// would show a misleading reading. Kanji readings are often genuinely
// context-dependent (single kanji especially, but even some compounds),
// and a dictionary with no grammar/context awareness can't disambiguate
// that safely. Scoping furigana to the curated glossary trades full-text
// coverage for guaranteed-correct readings.
function buildFuriganaDict(vocab) {
  const dict = new Map()
  for (const v of vocab) if (HAS_KANJI.test(v.word)) dict.set(v.word, v.reading)
  return dict
}

// Greedy longest-match tokenizer against the furigana dictionary, so e.g.
// "図書館" matches whole rather than stopping at "図書".
function FuriganaText({ text, dict }) {
  const words = useMemo(() => [...dict.keys()].sort((a, b) => b.length - a.length), [dict])
  const parts = []
  let remaining = text
  while (remaining.length > 0) {
    const match = words.find(w => remaining.startsWith(w))
    if (match) {
      parts.push({ kanji: match, reading: dict.get(match) })
      remaining = remaining.slice(match.length)
    } else {
      const last = parts[parts.length - 1]
      if (last && last.plain !== undefined) last.plain += remaining[0]
      else parts.push({ plain: remaining[0] })
      remaining = remaining.slice(1)
    }
  }
  return (
    <div className={styles.passageText}>
      {parts.map((p, i) => p.plain !== undefined
        ? <span key={i}>{p.plain}</span>
        : <ruby key={i}>{p.kanji}<rt>{p.reading}</rt></ruby>
      )}
    </div>
  )
}

function PassageText({ text, vocab }) {
  const [tooltip, setTooltip] = useState(null)
  // Highlight vocab words
  const vocabWords = vocab.map(v => v.word)

  // Simple inline renderer: highlight known vocab words
  const parts = []
  let remaining = text
  while (remaining.length > 0) {
    let found = false
    for (const v of vocab) {
      if (remaining.startsWith(v.word)) {
        parts.push({ type: 'vocab', text: v.word, data: v })
        remaining = remaining.slice(v.word.length)
        found = true; break
      }
    }
    if (!found) {
      if (parts.length > 0 && parts[parts.length-1].type === 'plain') {
        parts[parts.length-1].text += remaining[0]
      } else { parts.push({ type: 'plain', text: remaining[0] }) }
      remaining = remaining.slice(1)
    }
  }

  return (
    <div className={styles.passageText}>
      {parts.map((p, i) =>
        p.type === 'vocab' ? (
          <span key={i} className={styles.vocabWord}
            onMouseEnter={() => setTooltip(p.data)}
            onMouseLeave={() => setTooltip(null)}
          >
            {p.text}
            {tooltip?.word === p.data.word && (
              <span className={styles.tooltip}>
                <span className={`jp ${styles.tooltipReading}`}>{p.data.reading}</span>
                <span className={styles.tooltipMeaning}>{p.data.meaning}</span>
              </span>
            )}
          </span>
        ) : <span key={i}>{p.text}</span>
      )}
    </div>
  )
}

export default function ReadingView() {
  const { readingDone, markReadingDone } = useStore()
  const [filterLevel, setFilterLevel] = useState('all')
  const [activePassage, setActivePassage] = useState(null)
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState(false)
  const [furigana, setFurigana] = useState(false)
  const activePassageData = activePassage ? READING_PASSAGES.find(p => p.id === activePassage) : null
  const furiganaDict = useMemo(
    () => activePassageData ? buildFuriganaDict(activePassageData.vocab) : null,
    [activePassageData]
  )

  if (activePassage) {
    const passage = activePassageData
    const score = checked ? passage.questions.filter((q, i) => answers[i] === q.answer).length : 0

    return (
      <div className="page">
        <button className={styles.back} onClick={() => { setActivePassage(null); setAnswers({}); setChecked(false) }}>
          ← All passages
        </button>
        <div className={styles.passageHeader}>
          <div>
            <span className={`badge badge-${passage.level.toLowerCase()}`}>{passage.level}</span>{' '}
            <span className={styles.formatBadge}>{passage.format === 'notice' ? 'Notice' : 'Story'}</span>
            <h1 className={styles.passageTitle}>
              <span className="jp">{passage.title}</span>
              <span className={styles.passageTitleEn}>{passage.titleEn}</span>
            </h1>
          </div>
          <div className={styles.headerActions}>
            <SpeakButton text={passage.text} rate={0.85} />
            <button className={`pill ${furigana ? 'active' : ''}`} onClick={() => setFurigana(f => !f)}>
              振り仮名 Furigana
            </button>
          </div>
        </div>

        <div className={styles.passageCard}>
          {furigana
            ? <FuriganaText text={passage.text} dict={furiganaDict} />
            : <PassageText text={passage.text} vocab={passage.vocab} />}
          <div className={styles.vocabHint}>
            {furigana ? '💡 Turn furigana off to hover words for their meaning' : '💡 Hover highlighted words to see readings and meanings'}
          </div>
        </div>

        <div className={styles.vocabList}>
          <h3 className="section-label">Key vocabulary</h3>
          <div className={styles.vocabGrid}>
            {passage.vocab.map((v, i) => (
              <div key={i} className={styles.vocabItem}>
                <span className={`jp ${styles.vocabWord2}`}>{v.word}</span>
                <span className={`jp ${styles.vocabReading}`}>{v.reading}</span>
                <span className={styles.vocabMeaning2}>{v.meaning}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.questions}>
          <h3 className="section-label">Comprehension check</h3>
          {passage.questions.map((q, qi) => (
            <div key={qi} className={styles.qBlock}>
              <p className={`jp ${styles.qText}`}>{q.q}</p>
              <div className={styles.options}>
                {q.options.map((opt, oi) => {
                  let cls = styles.option
                  if (answers[qi] === oi) cls += ` ${styles.selected}`
                  if (checked && oi === q.answer) cls += ` ${styles.correct}`
                  if (checked && answers[qi] === oi && oi !== q.answer) cls += ` ${styles.wrong}`
                  return (
                    <button key={oi} className={cls} disabled={checked}
                      onClick={() => setAnswers(a => ({ ...a, [qi]: oi }))}>
                      <span className="jp">{opt}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
          {!checked ? (
            <button className="btn-primary" disabled={Object.keys(answers).length < passage.questions.length}
              onClick={() => { setChecked(true); markReadingDone(passage.id) }}>
              Check answers
            </button>
          ) : (
            <div className={styles.result}>
              {score === passage.questions.length ? '🎉' : '📖'} {score}/{passage.questions.length} correct
              {score === passage.questions.length && ' — Perfect!'}
            </div>
          )}
        </div>
      </div>
    )
  }

  const filtered = READING_PASSAGES.filter(p => filterLevel === 'all' || p.level === filterLevel)
  const done = READING_PASSAGES.filter(p => readingDone[p.id]).length

  return (
    <div className="page">
      <h1 className="page-title">Reading Practice</h1>
      <p className="page-sub">{done}/{READING_PASSAGES.length} passages completed · Graded texts with vocabulary support</p>
      <div className="pill-row">
        {['all','N5','N4','N3','N2'].map(l => (
          <button key={l} className={`pill ${filterLevel===l?'active':''}`} onClick={() => setFilterLevel(l)}>
            {l === 'all' ? 'All levels' : l}
          </button>
        ))}
      </div>
      <div className={styles.passageList}>
        {filtered.map(p => (
          <button key={p.id} className={`${styles.passageCard2} ${readingDone[p.id] ? styles.passageDone : ''}`}
            onClick={() => { setActivePassage(p.id); setAnswers({}); setChecked(false) }}>
            <div className={styles.passageCardTop}>
              <span className={`badge badge-${p.level.toLowerCase()}`}>{p.level}</span>
              <span className={styles.formatBadge}>{p.format === 'notice' ? 'Notice' : 'Story'}</span>
              {readingDone[p.id] && <span className={styles.doneTag}>✓ Completed</span>}
            </div>
            <div className={`jp ${styles.passageName}`}>{p.title}</div>
            <div className={styles.passageNameEn}>{p.titleEn}</div>
            <div className={styles.passageMeta}>{p.vocab.length} key words · {p.questions.length} questions</div>
          </button>
        ))}
      </div>
    </div>
  )
}
