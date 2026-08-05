// Single source of truth for the app's top-level views, shared between the
// sidebar (App.jsx) and the URL-hash routing (store/useStore.js) so the two
// never drift out of sync.
export const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'kana', label: 'Hiragana / Katakana', icon: 'あ' },
  { id: 'flashcards', label: 'Vocabulary', icon: '📝' },
  { id: 'kanji-study', label: 'Kanji Cards', icon: '漢' },
  { id: 'kanji-lookup', label: 'Kanji Lookup', icon: '🔍' },
  { id: 'grammar', label: 'Grammar', icon: '文' },
  { id: 'reading', label: 'Reading', icon: '📖' },
  { id: 'listening', label: 'Listening', icon: '🎧' },
  { id: 'mock-exam', label: 'Mock Exam', icon: '📋' },
]

export const VIEW_IDS = NAV.map(n => n.id)
export const DEFAULT_VIEW = 'dashboard'
