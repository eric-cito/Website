import { Link } from 'react-router-dom'
import type { PortfolioNode } from '../../data/nodes'
import { withBase } from '../../utils/baseUrl'
import Tag from '../ui/Tag'

interface NodeCardProps {
  node: PortfolioNode
}

/** Small "contact" dot that fires a stimulation ping on hover/focus. */
function ContactDot() {
  return (
    <span className="absolute top-3 right-3 flex h-2 w-2" aria-hidden>
      <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:group-hover:animate-stim-ping motion-safe:group-focus-visible:animate-stim-ping" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-signal/40 group-hover:bg-signal group-focus-visible:bg-signal transition-colors" />
    </span>
  )
}

/** Fallback thumbnail when a project has no image: gradient with a pulse glyph. */
function ThumbFallback() {
  return (
    <div className="w-full aspect-video bg-gradient-to-br from-surface-light to-surface flex items-center justify-center" aria-hidden>
      <svg viewBox="0 0 36 18" className="w-14 h-7 text-signal/40">
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

export default function NodeCard({ node }: NodeCardProps) {
  const { title, shortDescription, tags, detail } = node
  return (
    <Link
      to={node.href}
      className="group relative block bg-paper border border-line rounded-sm overflow-hidden transition-colors duration-300 hover:border-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal touch-manipulation"
    >
      <ContactDot />
      {detail.image ? (
        <img
          src={withBase(detail.image)}
          alt=""
          className="w-full aspect-video object-contain bg-surface"
          loading="lazy"
        />
      ) : (
        <ThumbFallback />
      )}
      <div className="p-4 sm:p-5">
        {detail.date && (
          <p className="font-mono text-ink-faint text-xs mb-1">{detail.date}</p>
        )}
        <h3 className="font-body font-semibold text-ink text-lg group-hover:text-signal transition-colors pr-6">
          {title}
        </h3>
        <p className="text-ink-soft text-sm mt-1">{shortDescription}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  )
}
