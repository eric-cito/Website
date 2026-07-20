import StimulationField from './StimulationField'
import SectionHeading from './SectionHeading'
import { LinkButton } from '../ui/Button'
import Tag from '../ui/Tag'
import { skillGroups } from '../../data/skills'

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100dvh-3.5rem)] sm:min-h-[calc(100dvh-4rem)] flex flex-col">
      <StimulationField />
      <div className="relative z-10 flex-1 flex flex-col justify-start lg:justify-center pt-72 lg:pt-10 pb-10 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <p className="font-mono text-signal text-xs sm:text-sm tracking-widest uppercase mb-3">
          Machine Learning · Health AI · Neurotechnology
        </p>
        <h1 className="font-heading font-semibold text-4xl sm:text-6xl text-ink mb-4 tracking-tight">
          Eric Cito
        </h1>
        <div className="max-w-xl mb-8">
          <p className="text-ink-soft text-base sm:text-lg leading-relaxed">
            Machine learning for health and neurotechnology
          </p>
          <p className="font-mono text-ink-faint text-xs sm:text-sm leading-relaxed mt-1">
            <span className="sm:whitespace-nowrap">
              Currently Research Associate at UCSF Neuromodulation Imaging Lab
            </span>{' '}
            <span className="sm:whitespace-nowrap">University of Califonia San Diego Computer Engineering B.S.</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <LinkButton to="/#experience">Experience</LinkButton>
          <LinkButton to="/#projects">Projects</LinkButton>
          <LinkButton to="/cv" variant="solid">View CV</LinkButton>
        </div>
      </div>
      <div className="relative z-10 px-4 sm:px-6 max-w-5xl mx-auto w-full pt-6 pb-8">
        <SectionHeading id="skills" title="Skills" />
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map(({ group, items }) => (
            <div key={group}>
              <h3 className="font-mono text-ink-faint text-[0.7rem] uppercase tracking-wider mb-2">
                {group}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
