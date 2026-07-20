import { Link } from 'react-router-dom'
import type { PortfolioNode } from '../../data/nodes'
import { withBase } from '../../utils/baseUrl'

interface NodeCardProps {
  node: PortfolioNode
  variant: 'research' | 'project'
}

/** Small "contact" dot that fires a stimulation ping on hover/focus. */
function ContactDot() {
  return (
    <span className="absolute top-3 right-3 flex h-2 w-2" aria-hidden>
      <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:group-hover:animate-stim-ping motion-safe:group-focus-visible:animate-stim-ping" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent/40 group-hover:bg-accent group-focus-visible:bg-accent transition-colors" />
    </span>
  )
}

function TagChips({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((tag) => (
        <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs">
          {tag}
        </span>
      ))}
    </div>
  )
}

/** Fallback thumbnail when a project has no image: gradient with a pulse glyph. */
function ThumbFallback() {
  return (
    <div className="w-full aspect-video bg-gradient-to-br from-surface-light to-surface flex items-center justify-center" aria-hidden>
      <svg viewBox="0 0 36 18" className="w-14 h-7 text-accent/40">
        <path
          d="M 0 9 L 9 9 C 11 9 12 8 13 7 C 14 4 15 1 16 1 C 17 1 18 6 19 15 C 20 17 21 12 23 9 L 36 9"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </svg>
    </div>
  )
}

export default function NodeCard({ node, variant }: NodeCardProps) {
  const { title, shortDescription, tags, detail } = node
  return (
    <Link
      to={node.href}
      className="group relative block bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_24px_-6px_rgba(8,145,178,0.35)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent/50 touch-manipulation"
    >
      <ContactDot />
      {variant === 'project' &&
        (detail.image ? (
          <img
            src={withBase(detail.image)}
            alt=""
            className="w-full aspect-video object-cover"
            loading="lazy"
          />
        ) : (
          <ThumbFallback />
        ))}
      <div className="p-4 sm:p-5">
        {detail.date && (
          <p className="text-slate-500 text-xs mb-1">{detail.date}</p>
        )}
        <h3 className="font-heading font-bold text-slate-900 text-lg group-hover:text-accent transition-colors pr-6">
          {title}
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          {variant === 'research' ? detail.description : shortDescription}
        </p>
        <TagChips tags={variant === 'research' ? (detail.skills ?? tags) : tags} />
      </div>
    </Link>
  )
}
