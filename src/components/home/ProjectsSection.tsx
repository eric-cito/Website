import { projectNodes } from '../../data/nodes'
import NodeCard from './NodeCard'
import SectionHeading from './SectionHeading'

export default function ProjectsSection() {
  return (
    <section className="px-4 sm:px-6 max-w-5xl mx-auto w-full">
      <SectionHeading id="projects" title="Projects" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projectNodes.map((node) => (
          <NodeCard key={node.id} node={node} />
        ))}
      </div>
    </section>
  )
}
