import { Link } from 'react-router-dom'
import { experienceNodes, type PortfolioNode } from '../../data/nodes'
import SectionHeading from './SectionHeading'
import Tag from '../ui/Tag'

const isCurrentRole = (node: PortfolioNode) => Boolean(node.detail.date?.includes('Present'))

/**
 * Marker on the trace: a small multipolar-neuron glyph (soma + radiating
 * dendrites, axon exiting the bottom). The active role fires continuously,
 * past roles fire on hover/focus.
 */
function Marker({ active }: { active: boolean }) {
  const color = active ? 'text-spike' : 'text-signal'
  return (
    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center" aria-hidden>
      <span
        className={`absolute h-3 w-3 rounded-full opacity-0 ${active ? 'bg-spike opacity-60 motion-safe:animate-stim-ping' : 'bg-signal group-hover:opacity-50 group-focus-visible:opacity-50 motion-safe:group-hover:animate-stim-ping motion-safe:group-focus-visible:animate-stim-ping'}`}
      />
      <svg viewBox="0 0 28 28" className={`relative h-7 w-7 ${color}`}>
        {/* dendrites, radiating from the soma */}
        <path
          d="M 14 11 L 14 2 M 14 11 L 6 5 M 14 11 L 22 5 M 14 11 L 4 13 M 14 11 L 24 13"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
          opacity={0.65}
        />
        {/* axon stub, continues into the connector below */}
        <path d="M 14 15 L 14 22" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" opacity={0.65} />
        {/* soma */}
        <circle cx="14" cy="13" r="3.4" fill={active ? 'currentColor' : 'var(--color-bg)'} stroke="currentColor" strokeWidth={1.6} />
      </svg>
    </span>
  )
}

/**
 * Connector between two markers: the axon stub below one soma runs down to
 * the next, its myelin sheaths beaded along the fiber like saltatory
 * conduction — the same signal-carrying trace, now the site's timeline spine.
 */
function Connector({ active }: { active: boolean }) {
  const color = active ? 'text-spike/70' : 'text-signal/55'
  return (
    <div className="relative flex-1 w-px min-h-[4rem] mx-auto" aria-hidden>
      <div className={`absolute inset-0 w-px mx-auto ${active ? 'bg-spike/30' : 'bg-line'}`} />
      <svg
        viewBox="0 0 12 64"
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-16 ${color}`}
      >
        {[2, 18, 34, 50].map((y) => (
          <rect key={y} x="3.5" y={y} width="5" height="12" rx="2.5" fill="currentColor" />
        ))}
      </svg>
    </div>
  )
}

export default function ExperienceSection() {
  return (
    <section className="px-4 sm:px-6 max-w-5xl mx-auto w-full">
      <SectionHeading id="experience" title="Experience" />
      <div className="flex flex-col max-w-3xl">
        {experienceNodes.map((node, i) => {
          const active = isCurrentRole(node)
          const skills = node.detail.skills ?? node.tags
          return (
            <div key={node.id} className="flex gap-4 sm:gap-5">
              <div className="flex flex-col items-center">
                <Marker active={active} />
                {i < experienceNodes.length - 1 && <Connector active={active} />}
              </div>
              <Link
                to={node.href}
                className="group flex-1 min-w-0 pb-8 sm:pb-10 pt-1 px-3 -mx-3 rounded-sm transition-colors hover:bg-signal/5 focus-visible:bg-signal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-body font-semibold text-ink text-lg group-hover:text-signal transition-colors">
                    {node.title}
                  </h3>
                  {node.detail.date && (
                    <span className={`font-mono text-xs ${active ? 'text-spike' : 'text-ink-faint'}`}>
                      {node.detail.date}
                    </span>
                  )}
                </div>
                <p className="text-ink-soft text-sm mt-1.5 leading-relaxed">{node.detail.description}</p>
                {node.detail.conferences && node.detail.conferences.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span className="font-mono font-bold text-[0.65rem] uppercase tracking-wider text-ink-faint mr-0.5">
                      Presented
                    </span>
                    {node.detail.conferences.map((conference) => (
                      <Tag key={conference}>{conference}</Tag>
                    ))}
                  </div>
                )}
                <div className={`flex flex-wrap items-center gap-1.5 ${node.detail.conferences?.length ? 'mt-2' : 'mt-3'}`}>
                  <span className="font-mono font-bold text-[0.65rem] uppercase tracking-wider text-ink-faint mr-0.5">
                    Skills
                  </span>
                  {skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
