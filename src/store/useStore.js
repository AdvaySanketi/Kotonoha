import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { VIEW_IDS, DEFAULT_VIEW } from '../nav'

// URL-hash routing: the current view lives in `location.hash` (e.g.
// "#/kanji-lookup") so reloading, sharing a link, or using browser
// back/forward keeps you on the same screen instead of bouncing to the
// dashboard.
function viewFromHash() {
  if (typeof window === 'undefined') return DEFAULT_VIEW
  const id = window.location.hash.replace(/^#\/?/, '')
  return VIEW_IDS.includes(id) ? id : DEFAULT_VIEW
}

function syncHash(view) {
  if (typeof window === 'undefined') return
  const target = `#/${view}`
  if (window.location.hash !== target) window.location.hash = target
}

const viewForMode = (mode) => mode === 'kanji' ? 'kanji-study' : 'flashcards'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Leitner-box spaced repetition: 5 boxes, each with a longer review interval.
// A "good" grade advances a card to the next box; a "hard" grade resets it
// to box 1. This is intentionally simple (no per-card ease factors like
// SM-2) but it's a real due-date schedule, not just in-session reshuffling.
const BOX_INTERVAL_DAYS = [1, 1, 2, 4, 8, 16]
const DAY_MS = 24 * 60 * 60 * 1000

function nextSrsEntry(prevEntry, grade) {
  const box = grade === 'good' ? Math.min((prevEntry?.box ?? 0) + 1, 5) : 1
  return { box, due: Date.now() + BOX_INTERVAL_DAYS[box] * DAY_MS }
}

export function isDue(srs, cardId) {
  const entry = srs[cardId]
  return !entry || entry.due <= Date.now()
}

const emptySession = () => ({
  activeDeckId: null,
  reviewLabel: null, // set instead of activeDeckId for cross-deck due-review sessions
  reviewTotal: 0,
  queue: [], queueIndex: 0, flipped: false, sessionDone: false,
  pendingAdvance: null,
})

export const useStore = create(
  persist(
    (set, get) => ({
      view: viewFromHash(),
      // Flashcard session state, kept separate per mode (vocab vs kanji) so
      // switching between them via nav doesn't bleed one deck's queue into
      // the other's screen — each mode remembers its own in-progress session.
      sessions: { vocab: emptySession(), kanji: emptySession() },
      // progress: cardId -> 'good' | 'hard' (last grade, drives in-app "mastered" stats)
      progress: {},
      // spaced repetition: cardId -> { box, due }
      srs: {},
      // reading: passageId -> bool (completed)
      readingDone: {},
      // grammar: patternId -> bool (studied)
      grammarStudied: {},
      // kana: "char-romaji" -> bool (mastered in quiz)
      kanaKnown: {},
      // kanji: kanji character -> bool (mastered in the meaning-recall quiz)
      kanjiKnown: {},
      // vocab word id -> bool (correctly identified by ear in listening practice)
      listeningKnown: {},

      setView: (view) => {
        syncHash(view)
        set({ view })
      },

      // Leaves the current deck/review session and returns to that mode's
      // deck-select screen. Distinct from just navigating away (which keeps
      // the session alive so switching back resumes where you left off) —
      // this is an explicit "I'm done with this deck" action.
      exitSession: (mode) => set(s => ({ sessions: { ...s.sessions, [mode]: emptySession() } })),

      markKanaKnown: (id) => set(s => ({ kanaKnown: { ...s.kanaKnown, [id]: true } })),
      markKanjiKnown: (id) => set(s => ({ kanjiKnown: { ...s.kanjiKnown, [id]: true } })),
      markListeningKnown: (id) => set(s => ({ listeningKnown: { ...s.listeningKnown, [id]: true } })),

      startDeck: (mode, deckId, cards) => {
        const { progress } = get()
        const sorted = shuffle([...cards]).sort((a, b) => {
          const o = { hard: 0, undefined: 1, good: 2 }
          return (o[progress[a.id]] ?? 1) - (o[progress[b.id]] ?? 1)
        })
        const view = viewForMode(mode)
        syncHash(view)
        set(s => ({
          sessions: { ...s.sessions, [mode]: { activeDeckId: deckId, reviewLabel: null, reviewTotal: 0, queue: sorted, queueIndex: 0, flipped: false, sessionDone: false, pendingAdvance: null } },
          view,
        }))
      },

      // Cross-deck session made of cards whose SRS due date has passed.
      startReview: (mode, cards, label) => {
        const view = viewForMode(mode)
        syncHash(view)
        set(s => ({
          sessions: { ...s.sessions, [mode]: { activeDeckId: null, reviewLabel: label, reviewTotal: cards.length, queue: shuffle(cards), queueIndex: 0, flipped: false, sessionDone: false, pendingAdvance: null } },
          view,
        }))
      },

      flipCard: (mode) => set(s => ({
        sessions: { ...s.sessions, [mode]: { ...s.sessions[mode], flipped: !s.sessions[mode].flipped } },
      })),

      // Grading flips the card back to its front immediately (so the exit
      // animation plays), but defers actually advancing to the next card
      // until that flip-back finishes — otherwise the next card's content
      // swaps in mid-rotation and its back face is briefly visible before
      // crossing the backface-visibility threshold. The component commits
      // the advance via commitAdvance() on the flip transition's end.
      gradeCard: (mode, grade) => {
        const { sessions, progress, srs } = get()
        const session = sessions[mode]
        const card = session.queue[session.queueIndex]
        if (!card) return
        const newProgress = { ...progress, [card.id]: grade }
        const newSrs = { ...srs, [card.id]: nextSrsEntry(srs[card.id], grade) }
        const newQueue = [...session.queue]
        if (grade === 'hard') newQueue.splice(Math.min(session.queueIndex + 3, newQueue.length), 0, { ...card })
        const next = session.queueIndex + 1
        set(s => ({
          progress: newProgress, srs: newSrs,
          sessions: {
            ...s.sessions,
            [mode]: { ...session, flipped: false, pendingAdvance: { queue: newQueue, queueIndex: next, sessionDone: next >= newQueue.length } },
          },
        }))
      },

      commitAdvance: (mode) => set(s => {
        const session = s.sessions[mode]
        if (!session.pendingAdvance) return {}
        const { queue, queueIndex, sessionDone } = session.pendingAdvance
        return { sessions: { ...s.sessions, [mode]: { ...session, queue, queueIndex, sessionDone, pendingAdvance: null } } }
      }),

      markReadingDone: (id) => set(s => ({ readingDone: { ...s.readingDone, [id]: true } })),
      markGrammarStudied: (id) => set(s => ({ grammarStudied: { ...s.grammarStudied, [id]: true } })),

      resetProgress: () => set({ progress: {}, readingDone: {}, grammarStudied: {}, kanaKnown: {}, kanjiKnown: {}, listeningKnown: {}, srs: {} }),

      importState: (data) => set({
        progress: data.progress ?? {},
        readingDone: data.readingDone ?? {},
        grammarStudied: data.grammarStudied ?? {},
        kanaKnown: data.kanaKnown ?? {},
        kanjiKnown: data.kanjiKnown ?? {},
        listeningKnown: data.listeningKnown ?? {},
        srs: data.srs ?? {},
      }),
    }),
    { name: 'jp-study-v1', partialize: s => ({ progress: s.progress, readingDone: s.readingDone, grammarStudied: s.grammarStudied, kanaKnown: s.kanaKnown, kanjiKnown: s.kanjiKnown, listeningKnown: s.listeningKnown, srs: s.srs }) }
  )
)

// Keep the store in sync when the hash changes from outside setView —
// browser back/forward, or the user editing the URL directly.
if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    const next = viewFromHash()
    if (useStore.getState().view !== next) useStore.setState({ view: next })
  })
}
