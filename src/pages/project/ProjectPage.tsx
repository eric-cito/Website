import { useParams, useNavigate } from 'react-router-dom'
import { getNodeById } from '../../data/nodes'
import ProjectDetail from '../../components/project/ProjectDetail'

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const node = id ? getNodeById(id) : undefined

  if (!node) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-slate-400 mb-6">Project not found.</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-accent hover:underline"
        >
          Back to brain
        </button>
      </div>
    )
  }

  return <ProjectDetail node={node} onBack={() => navigate('/')} />
}
