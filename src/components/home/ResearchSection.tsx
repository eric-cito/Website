import { researchNodes } from '../../data/nodes'
import NodeCard from './NodeCard'
import SectionHeading from './SectionHeading'

export default function ResearchSection() {
  return (
    <section className="px-4 sm:px-6 max-w-3xl mx-auto w-full">
      <SectionHeading id="research" title="Research" />
      <div className="flex flex-col gap-4 sm:border-l sm:border-accent/20 sm:pl-6">
        {researchNodes.map((node) => (
          <NodeCard key={node.id} node={node} variant="research" />
        ))}
      </div>
    </section>
  )
}
