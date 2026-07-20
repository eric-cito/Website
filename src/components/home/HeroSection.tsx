import { Link } from 'react-router-dom'
import StimulationField from './StimulationField'
import { skillGroups } from '../../data/skills'

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100dvh-3.5rem)] sm:min-h-[calc(100dvh-4rem)] flex flex-col">
      <StimulationField />
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 max-w-5xl mx-auto w-full py-10">
        <p className="text-accent text-sm sm:text-base font-medium tracking-wide uppercase mb-3">
          Machine Learning · Health AI · Neurotechnology
        </p>
        <h1 className="font-heading font-bold text-4xl sm:text-6xl text-slate-900 mb-4">
          Eric Cito
        </h1>
        <div className="relative max-w-xl pl-6 mb-8">
          <span className="absolute left-0 top-0 text-accent" aria-hidden>
            ❯
          </span>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
            Machine learning for health and neurotechnology
          </p>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            <span className="sm:whitespace-nowrap">
              Currently Research Associate at UCSF Neuromodulation Imaging Lab
            </span>{' '}
            <span className="whitespace-nowrap">University of Califonia San Diego Computer Engineering B.S.</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/#experience"
            className="inline-flex items-center px-5 py-3 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-medium min-h-[48px] touch-manipulation"
          >
            Experience
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
      <div
        id="skills"
        className="relative z-10 scroll-mt-20 px-4 sm:px-6 max-w-5xl mx-auto w-full border-t border-slate-200/70 pt-6 pb-8"
      >
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map(({ group, items }) => (
            <div key={group}>
              <h2 className="text-slate-400 text-[0.7rem] font-medium uppercase tracking-wider mb-2">
                {group}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
