import { useState, useEffect, useCallback } from 'react'
import { isSpeechSupported, hasJapaneseVoice, listVoices } from '../../lib/speech'
import VocabListeningQuiz from './VocabListeningQuiz'
import ConversationListening from './ConversationListening'
import styles from './ListeningView.module.css'

export default function ListeningView() {
  const [voiceState, setVoiceState] = useState('checking') // checking | ready | unavailable
  const [mode, setMode] = useState('vocab') // vocab | conversations
  const [showVoices, setShowVoices] = useState(false)
  const [detectedVoices, setDetectedVoices] = useState([])

  const check = useCallback(() => {
    if (!isSpeechSupported()) { setVoiceState('unavailable'); setDetectedVoices([]); return }
    setVoiceState('checking')
    hasJapaneseVoice().then(ok => {
      setVoiceState(ok ? 'ready' : 'unavailable')
      setDetectedVoices(listVoices())
    })
  }, [])

  useEffect(() => { check() }, [check])

  if (voiceState !== 'ready') {
    return (
      <div className="page">
        <h1 className="page-title">Listening Practice</h1>
        <p className="page-sub">Uses your browser's built-in Japanese text-to-speech — no audio files needed.</p>
        <div className={styles.unavailable}>
          {voiceState === 'checking' ? (
            'Checking for a Japanese voice on this device…'
          ) : (
            <>
              <p>No Japanese voice was found among the {detectedVoices.length} voice{detectedVoices.length === 1 ? '' : 's'} this browser currently reports. This varies a lot by browser and OS setup — it's not guaranteed to be available:</p>
              <ul className={styles.voiceTips}>
                <li><strong>Chrome or Edge</strong> usually have the best luck (both can use online voices beyond whatever's installed locally) — try one of those if you're on something else.</li>
                <li><strong>Windows:</strong> Settings → Time &amp; Language → Speech → Manage voices → Add voices → 日本語, then reload this page.</li>
                <li><strong>macOS:</strong> System Settings → Accessibility → Spoken Content → System Voice → Manage Voices, add a Japanese voice, then reload.</li>
                <li>If you just installed a voice or switched browsers, hit Recheck below — a full page reload isn't always necessary.</li>
              </ul>
              <div className={styles.voiceActions}>
                <button className="btn-primary" onClick={check}>Recheck</button>
                <button className="btn-ghost" onClick={() => setShowVoices(v => !v)}>
                  {showVoices ? 'Hide' : 'Show'} detected voices ({detectedVoices.length})
                </button>
              </div>
              {showVoices && (
                <div className={styles.voiceList}>
                  {detectedVoices.length === 0
                    ? <p>No voices reported at all — this browser may not support speech synthesis, or hasn't loaded any voice list yet.</p>
                    : detectedVoices.map((v, i) => <div key={i} className={styles.voiceItem}>{v.name} <span className={styles.voiceLang}>{v.lang || '(no lang tag)'}</span></div>)
                  }
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">Listening Practice</h1>
      <div className="pill-row">
        <button className={`pill ${mode === 'vocab' ? 'active' : ''}`} onClick={() => setMode('vocab')}>Vocabulary</button>
        <button className={`pill ${mode === 'conversations' ? 'active' : ''}`} onClick={() => setMode('conversations')}>Conversations</button>
      </div>
      {mode === 'vocab' ? <VocabListeningQuiz /> : <ConversationListening />}
    </div>
  )
}
