import type { GraphNode } from '../../data/nodes'
import { withBase } from '../../utils/baseUrl'

interface ProjectDetailProps {
  node: GraphNode
  onBack: () => void
}

function isPdfUrl(url: string): boolean {
  try {
    const path = new URL(url, window.location.origin).pathname
    return path.toLowerCase().endsWith('.pdf')
  } catch {
    return url.toLowerCase().endsWith('.pdf')
  }
}

export default function ProjectDetail({ node, onBack }: ProjectDetailProps) {
  const { title, type, tags, detail } = node
  const pdfLink = detail.links?.find((l) => isPdfUrl(l.url))

  return (
    <article className="max-w-2xl mx-auto px-6 py-12">
      <button
        type="button"
        onClick={onBack}
        className="text-accent hover:underline text-sm mb-8 inline-flex items-center gap-2"
        aria-label="Back to brain graph"
      >
        ← Back to brain
      </button>
      {(detail.image || pdfLink) && (
        <figure className="mb-8 -mx-6 sm:mx-0 rounded-lg overflow-hidden bg-slate-800/50 ring-1 ring-slate-700/50">
          {detail.image ? (
            <img
              src={withBase(detail.image)}
              alt=""
              className="w-full aspect-video object-cover"
              loading="lazy"
            />
          ) : pdfLink ? (
            <>
              {(() => {
                const pdfSrc = pdfLink.url.startsWith('/') ? withBase(pdfLink.url) : pdfLink.url
                const pdfUrl = `${pdfSrc}#view=FitH`
                return (
                  <>
                    <object
                      data={pdfUrl}
                      type="application/pdf"
                      title={pdfLink.label}
                      className="w-full aspect-video border-0 min-h-[20rem]"
                    >
                      <p className="p-4 text-slate-400 text-sm">
                        PDF cannot be displayed in this browser.{' '}
                        <a href={pdfSrc} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                          Open {pdfLink.label}
                        </a>
                      </p>
                    </object>
                    <a
                      href={pdfSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-accent hover:underline"
                    >
                      Open PDF in new tab →
                    </a>
                  </>
                )
              })()}
            </>
          ) : null}
        </figure>
      )}
      <header className="mb-8">
        <span className="text-xs uppercase tracking-wider text-slate-500">
          {type === 'experience' ? 'Experience' : 'Project'}
        </span>
        <h1 className="font-heading font-bold text-3xl text-white mt-1">
          {title}
        </h1>
        {detail.date && (
          <p className="text-slate-500 text-sm mt-2">{detail.date}</p>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose prose-invert prose-slate max-w-none">
        <p className="text-slate-300 leading-relaxed">
          {detail.longDescription ?? detail.description}
        </p>
        {detail.skills && detail.skills.length > 0 && (
          <p className="text-slate-500 text-sm mt-4">
            <span className="font-medium text-slate-400">Skills:</span>{' '}
            {detail.skills.join(', ')}
          </p>
        )}
        {detail.links && detail.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            {detail.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
