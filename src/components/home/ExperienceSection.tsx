import { experienceNodes } from '../../data/nodes'
import NodeCard from './NodeCard'
import SectionHeading from './SectionHeading'

export default function ExperienceSection() {
  return (
    <section className="px-4 sm:px-6 max-w-3xl mx-auto w-full">
      <SectionHeading id="experience" title="Experience" />
      <div className="flex flex-col gap-4 sm:border-l sm:border-accent/20 sm:pl-6">
        {experienceNodes.map((node) => (
          <NodeCard key={node.id} node={node} variant="experience" />
        ))}
      </div>
    </section>
  )
}
