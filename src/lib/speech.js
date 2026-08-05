// Thin wrapper around the browser's built-in speech synthesis (Web Speech
// API) for Japanese text-to-speech. No audio files, no API keys — just
// whatever Japanese voice the browser/OS already has installed. Quality and
// availability vary a lot by browser/OS, and — critically — voice lists
// often load asynchronously and late (sometimes 1-2+ seconds after page
// load, sometimes only after the first getVoices() call "wakes up" the
// browser's voice engine). A short one-shot timeout is not reliable; this
// polls for several seconds and exposes a manual recheck for callers whose
// UI wants a retry button instead of just failing once.

function getVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return []
  return window.speechSynthesis.getVoices()
}

function isJapaneseVoice(v) {
  // Prefer the lang tag, but some voices (particularly some OS-provided
  // ones) misreport or omit it — fall back to checking the voice name.
  if (v.lang?.toLowerCase().startsWith('ja')) return true
  return /japan|日本/i.test(v.name || '')
}

function getJapaneseVoice() {
  return getVoices().find(isJapaneseVoice) || null
}

export function isSpeechSupported() {
  return typeof window !== 'undefined' && !!window.speechSynthesis
}

// All voices currently known to the browser, for diagnostics (e.g. showing
// the user what's actually installed instead of a canned "not found").
export function listVoices() {
  return getVoices().map(v => ({ name: v.name, lang: v.lang }))
}

// Resolves true once a Japanese voice is found, or false if none turns up
// within the polling window. Polls repeatedly (not just once on a timer)
// because voice lists frequently arrive late, and also listens for the
// voiceschanged event as a fast path.
export function hasJapaneseVoice({ timeoutMs = 6000, intervalMs = 250 } = {}) {
  return new Promise(resolve => {
    if (!isSpeechSupported()) return resolve(false)
    if (getJapaneseVoice()) return resolve(true)

    let settled = false
    const finish = (val) => {
      if (settled) return
      settled = true
      clearInterval(poll)
      clearTimeout(stop)
      window.speechSynthesis.removeEventListener('voiceschanged', onChange)
      resolve(val)
    }
    const onChange = () => { if (getJapaneseVoice()) finish(true) }

    window.speechSynthesis.addEventListener('voiceschanged', onChange)
    // Chrome in particular sometimes needs an explicit nudge to start
    // populating the (possibly network-backed) voice list.
    getVoices()
    const poll = setInterval(() => { if (getJapaneseVoice()) finish(true) }, intervalMs)
    const stop = setTimeout(() => finish(!!getJapaneseVoice()), timeoutMs)
  })
}

export function speakJapanese(text, { rate = 0.9 } = {}) {
  if (!isSpeechSupported() || !text) return
  const synth = window.speechSynthesis
  synth.cancel() // stop anything currently speaking
  const utterance = new SpeechSynthesisUtterance(text)
  const voice = getJapaneseVoice()
  if (voice) utterance.voice = voice
  utterance.lang = voice?.lang || 'ja-JP'
  utterance.rate = rate
  synth.speak(utterance)
}
