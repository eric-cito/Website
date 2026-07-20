import type { PortfolioNode } from '../../data/nodes'
import { withBase } from '../../utils/baseUrl'
import Tag from '../ui/Tag'

interface ProjectDetailProps {
  node: PortfolioNode
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
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24">
      <button
        type="button"
        onClick={onBack}
        className="font-mono text-signal hover:underline text-sm mb-6 sm:mb-8 inline-flex items-center gap-2 min-h-[44px] items-center touch-manipulation"
        aria-label="Back to home"
      >
        ← Back
      </button>
      {(detail.image || pdfLink) && (
        <figure className="mb-6 sm:mb-8 -mx-4 sm:-mx-6 sm:mx-0 rounded-sm overflow-hidden bg-surface ring-1 ring-line">
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
                      <p className="p-4 text-ink-faint text-sm">
                        PDF cannot be displayed in this browser.{' '}
                        <a href={pdfSrc} target="_blank" rel="noopener noreferrer" className="text-signal underline">
                          Open {pdfLink.label}
                        </a>
                      </p>
                    </object>
                    <a
                      href={pdfSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-signal hover:underline"
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
        <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
          {type === 'experience' ? 'Experience' : 'Project'}
        </span>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-ink mt-1">
          {title}
        </h1>
        {detail.date && (
          <p className="font-mono text-ink-faint text-sm mt-2">{detail.date}</p>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </header>
      <div className="max-w-none">
        <p className="text-ink-soft leading-relaxed">
          {detail.longDescription ?? detail.description}
        </p>
        {detail.skills && detail.skills.length > 0 && (
          <p className="font-mono text-ink-faint text-sm mt-4">
            <span className="text-ink-soft">Skills:</span>{' '}
            {detail.skills.join(', ')}
          </p>
        )}
        {detail.links && detail.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
            {detail.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-signal hover:underline py-2 min-h-[44px] sm:min-h-0 flex items-center touch-manipulation"
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
