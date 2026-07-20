import { skillGroups } from '../../data/skills'
import SectionHeading from './SectionHeading'

export default function SkillsSection() {
  return (
    <section className="px-4 sm:px-6 max-w-5xl mx-auto w-full pb-16">
      <SectionHeading id="skills" title="Skills" />
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map(({ group, items }) => (
          <div key={group}>
            <h3 className="text-slate-900 font-medium text-sm mb-2">{group}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
