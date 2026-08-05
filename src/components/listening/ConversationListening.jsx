import { useState, useCallback } from 'react'
import { LISTENING_CONVERSATIONS } from '../../data/listeningConversations'
import { speakJapanese } from '../../lib/speech'
import styles from './ConversationListening.module.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ConversationListening() {
  const [scope, setScope] = useState('N5')
  const [session, setSession] = useState(null)
  const [played, setPlayed] = useState(false)

  const pool = LISTENING_CONVERSATIONS.filter(c => c.level === scope)

  const start = useCallback(() => {
    if (pool.length < 1) return
    setSession({ items: shuffle(pool), index: 0, score: 0, answered: false, picked: null })
    setPlayed(false)
  }, [pool])

  const play = (item) => {
    setPlayed(true)
    speakJapanese(item.lines.map(l => l.jp).join(' '), { rate: 0.85 })
  }

  const pick = (opt) => {
    if (!session || session.answered) return
    const item = session.items[session.index]
    const correct = opt === item.answer
    setSession(s => ({ ...s, answered: true, picked: opt, score: s.score + (correct ? 1 : 0) }))
  }

  const next = () => {
    setPlayed(false)
    setSession(s => ({ ...s, index: s.index + 1, answered: false, picked: null }))
  }

  return (
    <div>
      <p className="page-sub">Short dialogues, read aloud by your device — listen, then answer a comprehension question. Same voice reads every part (browser TTS doesn't distinguish speakers); the transcript after answering has speaker labels.</p>

      {!session && (
        <div className={styles.startCard}>
          <p className={styles.startText}>Task/point-comprehension style, closer to the real listening section than single-word recognition. Replay as many times as you like before answering.</p>
          <div className={styles.scopeRow}>
            {['N5', 'N4'].map(l => (
              <button key={l} className={`pill ${scope === l ? 'active' : ''}`} onClick={() => setScope(l)}>{l}</button>
            ))}
          </div>
          <p className={styles.poolNote}>{pool.length} conversation{pool.length === 1 ? '' : 's'} at {scope}</p>
          <button className="btn-primary" onClick={start} disabled={pool.length < 1}>Start</button>
        </div>
      )}

      {session && session.index >= session.items.length && (
        <div className={styles.startCard}>
          <div className={styles.resultIcon}>{session.score === session.items.length ? '🎉' : '🎧'}</div>
          <h2 className={styles.resultTitle}>{session.score}/{session.items.length} correct</h2>
          <div className={styles.doneActions}>
            <button className="btn-ghost" onClick={() => setSession(null)}>Change level</button>
            <button className="btn-primary" onClick={start}>Practice again</button>
          </div>
        </div>
      )}

      {session && session.index < session.items.length && (() => {
        const item = session.items[session.index]
        return (
          <div className={styles.quiz}>
            <div className={styles.quizTop}>
              <span>{session.index + 1} / {session.items.length}</span>
              <span>Score: {session.score}</span>
            </div>
            <button className={styles.replayBtn} onClick={() => play(item)}>🔊 {played ? 'Play again' : 'Play conversation'}</button>

            {played && (
              <div className={styles.questionCard}>
                <p className={`jp ${styles.question}`}>{item.question}</p>
                <div className={styles.optionCol}>
                  {item.options.map((opt, i) => {
                    let cls = styles.option
                    if (session.answered && i === item.answer) cls += ` ${styles.correct}`
                    else if (session.answered && i === session.picked) cls += ` ${styles.wrong}`
                    return (
                      <button key={i} className={`jp ${cls}`} disabled={session.answered} onClick={() => pick(i)}>{opt}</button>
                    )
                  })}
                </div>
              </div>
            )}

            {session.answered && (
              <div className={styles.transcript}>
                <div className={styles.transcriptLabel}>Transcript</div>
                {item.lines.map((l, i) => (
                  <div key={i} className={styles.line}>
                    <span className={styles.speaker}>{l.speaker}</span>
                    <span className="jp">{l.jp}</span>
                  </div>
                ))}
                <div className={styles.en}>{item.en}</div>
                <button className="btn-primary" onClick={next}>
                  {session.index + 1 >= session.items.length ? 'See results' : 'Next'}
                </button>
              </div>
            )}
          </div>
        )
      })()}
    </div>
  )
}
