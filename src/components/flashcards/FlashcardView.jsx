import { useState, useEffect, useCallback, useMemo } from 'react'
import { useStore, isDue } from '../../store/useStore'
import { VOCAB_DECKS, KANJI_DECKS } from '../../data/content'
import SpeakButton from '../shared/SpeakButton'
import VocabExamPractice from './VocabExamPractice'
import styles from './FlashcardView.module.css'

export default function FlashcardView({ mode = 'vocab' }) {
  const DECKS = mode === 'vocab' ? VOCAB_DECKS : KANJI_DECKS
  const { sessions, srs, startDeck, startReview, flipCard, gradeCard, progress, exitSession } = useStore()
  const session = sessions[mode]
  const { activeDeckId, reviewLabel, reviewTotal, queue, queueIndex, flipped, sessionDone } = session
  const [filterLevel, setFilterLevel] = useState('all')
  const [deckTab, setDeckTab] = useState('decks') // decks | exam (vocab mode only)

  const inSession = (activeDeckId || reviewLabel) && !sessionDone && queue.length > 0

  const dueCards = useMemo(
    () => Object.values(DECKS).flatMap(d => d.cards).filter(c => srs[c.id] && isDue(srs, c.id)),
    [DECKS, srs]
  )

  const handleKey = useCallback((e) => {
    if (!inSession) return
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(mode) }
    if (e.key === 'ArrowLeft' && flipped) gradeCard(mode, 'hard')
    if (e.key === 'ArrowRight' && flipped) gradeCard(mode, 'good')
  }, [inSession, flipped, flipCard, gradeCard, mode])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  // Deck selection screen
  if (!inSession) {
    const levels = ['all', 'N5', 'N4', 'N3', 'N2']
    const filtered = Object.values(DECKS).filter(d => filterLevel === 'all' || d.level === filterLevel)
    return (
      <div className="page">
        <h1 className="page-title">{mode === 'vocab' ? 'Vocabulary' : 'Kanji'} Flashcards</h1>
        <p className="page-sub">{deckTab === 'exam' ? 'Exam-format practice — real JLPT 文字・語彙 question shapes' : 'Choose a deck to study'}</p>

        {mode === 'vocab' && (
          <div className="pill-row">
            <button className={`pill ${deckTab === 'decks' ? 'active' : ''}`} onClick={() => setDeckTab('decks')}>Decks</button>
            <button className={`pill ${deckTab === 'exam' ? 'active' : ''}`} onClick={() => setDeckTab('exam')}>Exam Practice</button>
          </div>
        )}

        {deckTab === 'exam' && mode === 'vocab' ? <VocabExamPractice /> : <>

        {dueCards.length > 0 && (
          <button className={styles.reviewBanner} onClick={() => startReview(mode, dueCards, `${mode === 'vocab' ? 'Vocabulary' : 'Kanji'} review`)}>
            <span className={styles.reviewBannerIcon}>⏰</span>
            <span>
              <strong>{dueCards.length} card{dueCards.length === 1 ? '' : 's'}</strong> due for spaced-repetition review
            </span>
            <span className={styles.reviewBannerGo}>Start →</span>
          </button>
        )}

        <div className="pill-row">
          {levels.map(l => (
            <button key={l} className={`pill ${filterLevel === l ? 'active' : ''}`} onClick={() => setFilterLevel(l)}>
              {l === 'all' ? 'All levels' : l}
            </button>
          ))}
        </div>
        <div className={styles.deckGrid}>
          {filtered.map(deck => {
            const good = deck.cards.filter(c => progress[c.id] === 'good').length
            const hard = deck.cards.filter(c => progress[c.id] === 'hard').length
            const pct = Math.round((good / deck.cards.length) * 100)
            return (
              <button key={deck.id} className={styles.deckCard} onClick={() => startDeck(mode, deck.id, deck.cards)}>
                <div className={styles.deckTop}>
                  <span className={`badge badge-${deck.level.toLowerCase()}`}>{deck.level}</span>
                  {hard > 0 && <span className={styles.hardBadge}>{hard} to review</span>}
                </div>
                <div className={styles.deckName}>{deck.label}</div>
                <div className={styles.deckCount}>{deck.cards.length} cards</div>
                <div className={styles.deckBar}>
                  <div className={styles.deckFill} style={{ width: `${pct}%` }} />
                </div>
                <div className={styles.deckStat}>{good}/{deck.cards.length} mastered</div>
              </button>
            )
          })}
        </div>
        {sessionDone && (
          <div className={styles.doneMsg}>
            <span>🎉</span> Session complete! Pick another deck or review hard cards.
          </div>
        )}
        </>}
      </div>
    )
  }

  const card = queue[queueIndex]
  const deck = activeDeckId ? DECKS[activeDeckId] : null
  const deckLabel = deck?.label || reviewLabel
  const totalInDeck = deck?.cards.length || reviewTotal
  const seen = Math.min(queueIndex, totalInDeck)
  const pct = totalInDeck ? Math.round((seen / totalInDeck) * 100) : 0
  if (sessionDone) {
    const good = queue.filter(c => progress[c.id] === 'good').length
    return (
      <div className="page">
        <div className={styles.done}>
          <div className={styles.doneIcon}>🎌</div>
          <h2 className={styles.doneTitle}>{deck ? 'Deck complete!' : 'Review complete!'}</h2>
          <p className={styles.doneSub}>{good} of {totalInDeck} cards mastered</p>
          <div className={styles.doneActions}>
            <button className="btn-ghost" onClick={() => exitSession(mode)}>Back to decks</button>
            {deck && <button className="btn-primary" onClick={() => startDeck(mode, activeDeckId, deck.cards)}>Study again</button>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className={styles.topBar}>
        <button className={styles.back} onClick={() => exitSession(mode)}>
          ← {deckLabel}
        </button>
        <span className={styles.counter}>{seen} / {totalInDeck}</span>
      </div>
      <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: `${pct}%` }} /></div>

      <div className={`${styles.cardWrap} ${flipped ? '' : styles.clickable}`} onClick={!flipped ? () => flipCard(mode) : undefined}>
        <div className={`${styles.cardInner} ${flipped ? styles.flipped : ''}`}>
          <div className={styles.cardFront}>
            <div className={styles.frontTag}>{deckLabel} · tap to reveal</div>
            {card?.jp && <SpeakButton text={card.kana && !card.kana.includes('・') ? card.kana : card.jp} className={styles.cardSpeak} />}
            <div className={`jp ${styles.cardJp}`}>{card?.jp}</div>
            {card?.kana && card.kana !== card.jp && (
              <div className={`jp ${styles.cardKana}`}>{card.kana}</div>
            )}
          </div>
          <div className={styles.cardBack}>
            <div className={`jp ${styles.backJp}`}>{card?.jp}</div>
            <div className={styles.backRomaji}>{card?.romaji}</div>
            <div className={styles.backMeaning}>{card?.meaning}</div>
            {card?.example && (
              <div className={styles.example}>
                <div className={`jp ${styles.exampleJp}`}>{card.example}</div>
                <div className={styles.exampleEn}>{card.exampleEn}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {flipped ? (
        <div className={styles.gradeRow}>
          <button className={styles.btnHard} onClick={() => gradeCard(mode, 'hard')}>✕ Hard <span className={styles.hint}>←</span></button>
          <button className={styles.btnFlip} onClick={() => flipCard(mode)}>flip back</button>
          <button className={styles.btnGood} onClick={() => gradeCard(mode, 'good')}>✓ Got it <span className={styles.hint}>→</span></button>
        </div>
      ) : (
        <div className={styles.revealRow}>
          <button className="btn-primary" style={{padding:'12px 40px',fontSize:'15px'}} onClick={() => flipCard(mode)}>Reveal <span className={styles.hint}>Space</span></button>
        </div>
      )}
      <p className={styles.keyHint}>Keyboard: Space to flip · ← Hard · → Got it</p>
    </div>
  )
}
