import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useScrollManager } from '../../hooks/useScrollManager'

const navLinks = [
  { label: 'Experience', to: '/#experience' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Skills', to: '/#skills' },
  { label: 'CV', to: '/cv' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  useScrollManager()
  return (
    <div className="h-full min-h-0 max-w-full max-h-full overflow-hidden bg-[var(--color-bg)] text-slate-700 flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-[var(--color-bg)]/90 backdrop-blur-sm border-b border-slate-200 safe-area-inset-top">
        <Link to="/" className="font-heading font-bold text-xl sm:text-2xl text-slate-900 hover:text-accent transition-colors" onClick={() => setMenuOpen(false)}>
          Eric Cito
        </Link>
        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
          {navLinks.map((l) => (
            <Link key={l.label} to={l.to} className="text-sm sm:text-base text-slate-400 hover:text-accent transition-colors">
              {l.label}
            </Link>
          ))}
          <a href="mailto:eric.cito@ucsf.edu" className="text-sm sm:text-base text-slate-400 hover:text-accent transition-colors">
            Email
          </a>
          <a href="https://www.linkedin.com/in/eric-cito-4709b919a" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-slate-400 hover:text-accent transition-colors">
            LinkedIn
          </a>
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden p-2 -mr-2 text-slate-400 hover:text-accent transition-colors touch-manipulation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <span className="text-xl font-bold" aria-hidden>×</span>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" aria-hidden>
          <button type="button" className="absolute inset-0 bg-slate-900/30" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
          <nav className="absolute top-14 left-0 right-0 mx-4 bg-white border border-slate-200 rounded-lg shadow-xl py-3 safe-area-inset-top">
            {navLinks.map((l) => (
              <Link key={l.label} to={l.to} className="block px-4 py-3 text-slate-700 hover:text-accent hover:bg-slate-100 transition-colors" onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
            <a href="mailto:eric.cito@ucsf.edu" className="block px-4 py-3 text-slate-700 hover:text-accent hover:bg-slate-100 transition-colors" onClick={() => setMenuOpen(false)}>Email</a>
            <a href="https://www.linkedin.com/in/eric-cito-4709b919a" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-slate-700 hover:text-accent hover:bg-slate-100 transition-colors" onClick={() => setMenuOpen(false)}>LinkedIn</a>
          </nav>
        </div>
      )}
      <main id="main-scroll" className="flex-1 min-h-0 pt-14 sm:pt-16 min-w-0 overflow-auto">
        <Outlet />
        <footer className="px-4 sm:px-6 py-4 sm:py-6 border-t border-slate-200 flex flex-row flex-wrap items-center justify-between gap-3 sm:gap-6 text-sm text-slate-500 safe-area-inset-bottom">
          <span>© {new Date().getFullYear()} Eric Cito</span>
          <div className="flex flex-row flex-wrap gap-3 sm:gap-6">
            <a href="mailto:eric.cito@ucsf.edu" className="hover:text-accent transition-colors py-1 min-h-[44px] sm:min-h-0 flex items-center touch-manipulation">
              eric.cito@ucsf.edu
            </a>
            <a href="tel:8586032994" className="hover:text-accent transition-colors py-1 min-h-[44px] sm:min-h-0 flex items-center touch-manipulation">
              858.603.2994
            </a>
            <a href="https://www.linkedin.com/in/eric-cito-4709b919a" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors py-1 min-h-[44px] sm:min-h-0 flex items-center touch-manipulation">
              LinkedIn
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
