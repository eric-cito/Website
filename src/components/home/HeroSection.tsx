import { Link } from 'react-router-dom'
import StimulationField from './StimulationField'

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100dvh-3.5rem)] sm:min-h-[calc(100dvh-4rem)] flex flex-col">
      <StimulationField />
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <p className="text-accent text-sm sm:text-base font-medium tracking-wide uppercase mb-3">
          Neuroimaging · Deep Brain Stimulation · Machine Learning
        </p>
        <h1 className="font-heading font-bold text-4xl sm:text-6xl text-slate-900 mb-4">
          Eric Cito
        </h1>
        <p className="text-slate-700 text-base sm:text-lg max-w-xl leading-relaxed mb-2">
          Research Associate at the UCSF Neuromodulation Imaging Lab — Computer Engineering B.S.
        </p>
        <p className="text-slate-500 text-sm sm:text-base max-w-xl leading-relaxed mb-8">
          Building imaging pipelines and deep learning tools that help make brain
          stimulation therapies more precise.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/#research"
            className="inline-flex items-center px-5 py-3 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-medium min-h-[48px] touch-manipulation"
          >
            Research
          </Link>
          <Link
            to="/#projects"
            className="inline-flex items-center px-5 py-3 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-medium min-h-[48px] touch-manipulation"
          >
            Projects
          </Link>
          <Link
            to="/cv"
            className="inline-flex items-center px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:border-accent/50 hover:text-accent transition-colors font-medium min-h-[48px] touch-manipulation"
          >
            View CV
          </Link>
        </div>
      </div>
      <div className="relative z-10 flex justify-center pb-6" aria-hidden>
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-slate-400 motion-safe:animate-fade-bob"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
