import { useStore } from './store/useStore'
import { NAV } from './nav'
import logo from './assets/logo-icon.png'
import Dashboard from './components/dashboard/Dashboard'
import KanaView from './components/kana/KanaView'
import FlashcardView from './components/flashcards/FlashcardView'
import GrammarView from './components/grammar/GrammarView'
import ReadingView from './components/reading/ReadingView'
import KanjiLookup from './components/kanji/KanjiLookup'
import ListeningView from './components/listening/ListeningView'
import MockExamView from './components/exam/MockExamView'
import './styles/global.css'

export default function App() {
  const { view, setView } = useStore()

  return (
    <div className="app-shell">
      <nav className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="" className="sidebar-logo-icon" />
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-jp">言の葉</span>
            <span className="sidebar-logo-sub">Kotonoha</span>
          </div>
        </div>
        {NAV.map(n => (
          <button
            key={n.id}
            className={`nav-item ${view === n.id ? 'active' : ''}`}
            onClick={() => setView(n.id)}
          >
            <span className="nav-icon">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>
      <main className="main-content">
        {view === 'dashboard'    && <Dashboard />}
        {view === 'kana'         && <KanaView />}
        {view === 'flashcards'   && <FlashcardView mode="vocab" />}
        {view === 'kanji-study'  && <FlashcardView mode="kanji" />}
        {view === 'kanji-lookup' && <KanjiLookup />}
        {view === 'grammar'      && <GrammarView />}
        {view === 'reading'      && <ReadingView />}
        {view === 'listening'    && <ListeningView />}
        {view === 'mock-exam'    && <MockExamView />}
      </main>
    </div>
  )
}
