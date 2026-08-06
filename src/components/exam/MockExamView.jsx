import { useState, useEffect, useRef, useCallback } from 'react'
import { VOCAB_ALL, KANJI_DB, GRAMMAR_PATTERNS, READING_PASSAGES } from '../../data/content'
import { LISTENING_CONVERSATIONS } from '../../data/listeningConversations'
import { speakJapanese, speakConversation, stopSpeaking, isSpeechSupported, hasJapaneseVoice } from '../../lib/speech'
import styles from './MockExamView.module.css'

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

const VOCAB_N = 8
const KANJI_N = 8
const GRAMMAR_N = 5
const LISTENING_N = 5
const LISTENING_CONV_N = 4
const EXAM_SECONDS = 12 * 60

function hasConversations(level) {
  return LISTENING_CONVERSATIONS.some(c => c.level === level)
}

function buildVocabSection(level) {
  const pool = VOCAB_ALL.filter(v => v.level === level)
  const chosen = shuffle(pool).slice(0, Math.min(VOCAB_N, pool.length))
  return chosen.map(item => {
    const correct = firstMeaning(item.meaning)
    const distractors = shuffle(pool.filter(p => firstMeaning(p.meaning) !== correct)).slice(0, 3).map(p => firstMeaning(p.meaning))
    return { kind: 'vocab', jp: item.jp, kana: item.kana, correct, options: shuffle([correct, ...distractors]) }
  })
}

function buildKanjiSection(level) {
  const pool = KANJI_DB.filter(k => k.level === level)
  const chosen = shuffle(pool).slice(0, Math.min(KANJI_N, pool.length))
  return chosen.map(item => {
    const correct = cap(firstMeaning(item.meaning))
    const distractors = shuffle(pool.filter(p => cap(firstMeaning(p.meaning)) !== correct)).slice(0, 3).map(p => cap(firstMeaning(p.meaning)))
    return { kind: 'kanji', kanji: item.kanji, correct, options: shuffle([correct, ...distractors]) }
  })
}

function buildGrammarSection() {
  // Grammar pattern pool is small (a few per level), so distractors are
  // drawn from the full pattern list rather than scoped strictly by level —
  // still 100% accurate (every option is a real pattern), just not level-filtered.
  const withExample = GRAMMAR_PATTERNS.map(g => ({ pattern: g, example: g.examples[Math.floor(Math.random() * g.examples.length)] }))
  const chosen = shuffle(withExample).slice(0, Math.min(GRAMMAR_N, withExample.length))
  return chosen.map(({ pattern, example }) => {
    const distractors = shuffle(GRAMMAR_PATTERNS.filter(g => g.id !== pattern.id)).slice(0, 3).map(g => g.pattern)
    return { kind: 'grammar', jp: example.jp, en: example.en, correct: pattern.pattern, options: shuffle([pattern.pattern, ...distractors]) }
  })
}

function buildReadingSection(level) {
  const pool = READING_PASSAGES.filter(p => p.level === level)
  const passage = pool[Math.floor(Math.random() * pool.length)] || READING_PASSAGES[0]
  return passage.questions.map(q => ({
    kind: 'reading', passageTitle: passage.title, passageText: passage.text,
    q: q.q, options: q.options, correctIndex: q.answer,
  }))
}

function buildListeningSection(level) {
  const pool = VOCAB_ALL.filter(v => v.level === level)
  const chosen = shuffle(pool).slice(0, Math.min(LISTENING_N, pool.length))
  return chosen.map(item => {
    const correct = firstMeaning(item.meaning)
    const distractors = shuffle(pool.filter(p => firstMeaning(p.meaning) !== correct)).slice(0, 3).map(p => firstMeaning(p.meaning))
    return { kind: 'listening', kana: item.kana, jp: item.jp, correct, options: shuffle([correct, ...distractors]) }
  })
}

// Task/point-comprehension dialogues (only hand-authored for N5/N4) — a
// closer match to the real listening section than isolated-word
// recognition. Falls back to word-recognition where no dialogues exist yet.
function buildListeningConvSection(level) {
  const pool = LISTENING_CONVERSATIONS.filter(c => c.level === level)
  const chosen = shuffle(pool).slice(0, Math.min(LISTENING_CONV_N, pool.length))
  return chosen.map(item => {
    const picked = item.questions[Math.floor(Math.random() * item.questions.length)]
    return {
      kind: 'listeningConv', lines: item.lines, question: picked.q,
      options: picked.options, correctIndex: picked.answer,
    }
  })
}

function buildExam(level, includeListening) {
  const sections = [
    { id: 'vocab', label: 'Vocabulary', questions: buildVocabSection(level) },
    { id: 'kanji', label: 'Kanji', questions: buildKanjiSection(level) },
    { id: 'grammar', label: 'Grammar', questions: buildGrammarSection() },
    { id: 'reading', label: 'Reading', questions: buildReadingSection(level) },
  ]
  if (includeListening) {
    const questions = hasConversations(level) ? buildListeningConvSection(level) : buildListeningSection(level)
    sections.push({ id: 'listening', label: 'Listening', questions })
  }
  return sections.filter(s => s.questions.length > 0)
}

function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function MockExamView() {
  const [voiceOk, setVoiceOk] = useState(false)
  const [level, setLevel] = useState('N5')
  const [phase, setPhase] = useState('setup') // setup | running | results
  const [exam, setExam] = useState(null) // { sections, sIndex, qIndex, answered, picked, log }
  const [timeLeft, setTimeLeft] = useState(EXAM_SECONDS)
  const [speakingLine, setSpeakingLine] = useState(-1)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!isSpeechSupported()) return
    hasJapaneseVoice().then(setVoiceOk)
  }, [])

  useEffect(() => {
    if (phase !== 'running') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); finishExam(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const finishExam = useCallback(() => setPhase('results'), [])

  const start = () => {
    const sections = buildExam(level, voiceOk)
    setExam({ sections, sIndex: 0, qIndex: 0, answered: false, picked: null, log: [] })
    setTimeLeft(EXAM_SECONDS)
    setPhase('running')
  }

  const currentSection = exam?.sections[exam.sIndex]
  const currentQuestion = currentSection?.questions[exam.qIndex]

  useEffect(() => {
    setSpeakingLine(-1)
    if (phase !== 'running') return
    if (currentQuestion?.kind === 'listening') {
      const t = setTimeout(() => speakJapanese(currentQuestion.kana), 300)
      return () => { clearTimeout(t); stopSpeaking() }
    }
    if (currentQuestion?.kind === 'listeningConv') {
      const t = setTimeout(() => {
        speakConversation(currentQuestion.lines, { rate: 0.85, onLineStart: setSpeakingLine, onDone: () => setSpeakingLine(-1) })
      }, 300)
      return () => { clearTimeout(t); stopSpeaking() }
    }
  }, [phase, currentQuestion])

  const pick = (opt, isIndex) => {
    if (!exam || exam.answered) return
    const correct = isIndex ? opt === currentQuestion.correctIndex : opt === currentQuestion.correct
    setExam(s => ({
      ...s, answered: true, picked: opt,
      log: [...s.log, { section: currentSection.label, correct }],
    }))
  }

  const next = () => {
    setExam(s => {
      const section = s.sections[s.sIndex]
      const nq = s.qIndex + 1
      if (nq < section.questions.length) return { ...s, qIndex: nq, answered: false, picked: null }
      const ns = s.sIndex + 1
      if (ns < s.sections.length) return { ...s, sIndex: ns, qIndex: 0, answered: false, picked: null }
      setTimeout(finishExam, 0)
      return s
    })
  }

  if (phase === 'setup') {
    return (
      <div className="page">
        <h1 className="page-title">Mock Exam</h1>
        <p className="page-sub">A condensed, timed practice test mixing vocabulary, kanji, grammar, reading{voiceOk ? ', and listening' : ''} — not official JLPT timing or question counts, just a mixed-section gauge of where you stand.</p>
        <div className={styles.startCard}>
          <div className={styles.scopeRow}>
            {['N5', 'N4', 'N3', 'N2'].map(l => (
              <button key={l} className={`pill ${level === l ? 'active' : ''}`} onClick={() => setLevel(l)}>{l}</button>
            ))}
          </div>
          <p className={styles.startText}>
            {VOCAB_N} vocabulary + {KANJI_N} kanji + {GRAMMAR_N} grammar + 1 reading passage
            {voiceOk && (hasConversations(level) ? ` + ${LISTENING_CONV_N} listening conversations` : ` + ${LISTENING_N} listening`)} questions.
            {' '}Timer: {formatTime(EXAM_SECONDS)}.
          </p>
          <button className="btn-primary" onClick={start}>Start mock exam</button>
        </div>
      </div>
    )
  }

  if (phase === 'results') {
    const total = exam.log.length
    const correct = exam.log.filter(l => l.correct).length
    const bySection = {}
    for (const l of exam.log) {
      bySection[l.section] ??= { correct: 0, total: 0 }
      bySection[l.section].total++
      if (l.correct) bySection[l.section].correct++
    }
    return (
      <div className="page">
        <h1 className="page-title">Mock Exam Results</h1>
        <div className={styles.resultCard}>
          <div className={styles.resultScore}>{correct}/{total}</div>
          <div className={styles.resultPct}>{total ? Math.round((correct / total) * 100) : 0}%</div>
        </div>
        <div className={styles.sectionResults}>
          {Object.entries(bySection).map(([label, s]) => (
            <div key={label} className={styles.sectionRow}>
              <span>{label}</span>
              <span>{s.correct}/{s.total}</span>
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={() => setPhase('setup')}>Take another</button>
      </div>
    )
  }

  // running
  const sectionNum = exam.sIndex + 1
  const totalSections = exam.sections.length
  const q = currentQuestion

  return (
    <div className="page">
      <div className={styles.examTop}>
        <span className={styles.examSection}>{currentSection.label} · {exam.qIndex + 1}/{currentSection.questions.length} <span className={styles.examSectionCount}>(section {sectionNum}/{totalSections})</span></span>
        <span className={timeLeft < 60 ? styles.timerLow : styles.timer}>⏱ {formatTime(timeLeft)}</span>
      </div>

      {q.kind === 'vocab' && (
        <div className={styles.qCard}>
          <div className={`jp ${styles.qJp}`}>{q.jp}</div>
          <div className={`jp ${styles.qKana}`}>{q.kana}</div>
        </div>
      )}
      {q.kind === 'kanji' && (
        <div className={styles.qCard}>
          <div className={`jp ${styles.qKanji}`}>{q.kanji}</div>
        </div>
      )}
      {q.kind === 'grammar' && (
        <div className={styles.qCard}>
          <p className={styles.qPrompt}>Which grammar pattern is used in this sentence?</p>
          <div className={`jp ${styles.qSentence}`}>{q.jp}</div>
          <div className={styles.qSentenceEn}>{q.en}</div>
        </div>
      )}
      {q.kind === 'reading' && (
        <div className={styles.readingCard}>
          <div className={styles.readingText}>{q.passageText}</div>
          <p className={`jp ${styles.qSentence}`}>{q.q}</p>
        </div>
      )}
      {q.kind === 'listening' && (
        <div className={styles.qCard}>
          <button className={styles.replayBtn} onClick={() => speakJapanese(q.kana)}>🔊 Play again</button>
        </div>
      )}
      {q.kind === 'listeningConv' && (
        <div className={styles.qCard}>
          <button
            className={styles.replayBtn}
            onClick={() => speakConversation(q.lines, { rate: 0.85, onLineStart: setSpeakingLine, onDone: () => setSpeakingLine(-1) })}
          >🔊 Play again</button>
          <div className={styles.transcript} style={{ marginTop: 16 }}>
            {q.lines.map((l, i) => (
              <div key={i} className={styles.transcriptLine} style={i === speakingLine ? { opacity: 1, fontWeight: 600 } : { opacity: 0.55 }}>
                <span className={styles.transcriptSpeaker}>{l.speaker}</span>
                <span className="jp">{i === speakingLine ? l.jp : '…'}</span>
              </div>
            ))}
          </div>
          <p className={`jp ${styles.qSentence}`} style={{ marginTop: 16 }}>{q.question}</p>
        </div>
      )}

      <div className={(q.kind === 'reading' || q.kind === 'listeningConv') ? styles.optionCol : styles.optionGrid}>
        {q.options.map((opt, oi) => {
          const isIndexType = q.kind === 'reading' || q.kind === 'listeningConv'
          const value = isIndexType ? oi : opt
          const isCorrectOpt = isIndexType ? oi === q.correctIndex : opt === q.correct
          let cls = styles.option
          if (exam.answered && isCorrectOpt) cls += ` ${styles.correct}`
          else if (exam.answered && value === exam.picked) cls += ` ${styles.wrong}`
          return (
            <button key={oi} className={cls} disabled={exam.answered} onClick={() => pick(value, isIndexType)}>
              <span className={isIndexType ? 'jp' : ''}>{opt}</span>
            </button>
          )
        })}
      </div>

      {exam.answered && q.kind === 'listeningConv' && (
        <div className={styles.transcript}>
          <div className={styles.transcriptLabel}>Transcript</div>
          {q.lines.map((l, i) => (
            <div key={i} className={styles.transcriptLine}>
              <span className={styles.transcriptSpeaker}>{l.speaker}</span>
              <span className="jp">{l.jp}</span>
            </div>
          ))}
        </div>
      )}

      {exam.answered && (
        <button className="btn-primary" onClick={next}>
          {exam.sIndex === exam.sections.length - 1 && exam.qIndex === currentSection.questions.length - 1 ? 'See results' : 'Next'}
        </button>
      )}
    </div>
  )
}
