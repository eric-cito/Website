import { Outlet } from 'react-router-dom'
import { useVisitedNodes } from '../../context/VisitedNodesContext'

export default function Layout() {
  const { clearMemory } = useVisitedNodes()
  return (
    <div className="h-full min-h-0 max-w-full max-h-full overflow-hidden bg-[var(--color-bg)] text-slate-200 flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-[var(--color-bg)]/80 backdrop-blur-sm border-b border-slate-800/50">
        <a href="/" className="font-heading font-bold text-2xl text-white hover:text-accent transition-colors">
          Eric Cito
        </a>
        <nav className="flex items-center gap-6">
          <a href="/" className="text-base text-slate-400 hover:text-accent transition-colors">
            Home
          </a>
          <a
            href="mailto:eric.cito@ucsf.edu"
            className="text-base text-slate-400 hover:text-accent transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/eric-cito-4709b919a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-slate-400 hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="/cv"
            className="text-base text-slate-400 hover:text-accent transition-colors"
          >
            CV
          </a>
        </nav>
      </header>
      <main className="flex-1 min-h-0 pt-16 min-w-0 overflow-hidden">
        <Outlet />
      </main>
      <footer className="px-6 py-6 border-t border-slate-800/50 flex flex-wrap items-center justify-between gap-6 text-sm text-slate-500">
        <button
          type="button"
          onClick={clearMemory}
          className="hover:text-accent transition-colors"
        >
          Clear memory
        </button>
        <div className="flex gap-6">
          <a href="mailto:eric.cito@ucsf.edu" className="hover:text-accent transition-colors">
            eric.cito@ucsf.edu
          </a>
          <a href="tel:8586032994" className="hover:text-accent transition-colors">
            858.603.2994
          </a>
          <a
            href="https://www.linkedin.com/in/eric-cito-4709b919a"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  )
}
