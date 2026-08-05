import { useEffect, useState } from 'react'
import { hasJapaneseVoice, speakJapanese } from '../../lib/speech'
import styles from './SpeakButton.module.css'

export default function SpeakButton({ text, className = '', rate }) {
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    let cancelled = false
    hasJapaneseVoice().then(ok => { if (!cancelled) setAvailable(ok) })
    return () => { cancelled = true }
  }, [])

  if (!available) return null

  return (
    <button
      type="button"
      className={`${styles.speak} ${className}`}
      title="Listen"
      aria-label="Listen"
      onClick={(e) => { e.stopPropagation(); speakJapanese(text, rate ? { rate } : undefined) }}
    >
      🔊
    </button>
  )
}
