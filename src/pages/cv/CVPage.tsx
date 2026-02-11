import { withBase } from '../../utils/baseUrl'

const CV_PDF_PATH = '/Eric_Cito_CV.pdf'

export default function CVPage() {
  const cvUrl = withBase(CV_PDF_PATH)
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24">
      <h1 className="font-heading font-bold text-xl sm:text-2xl text-white mb-4 sm:mb-6">
        CV
      </h1>
      <div className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-800">
        <iframe
          src={cvUrl}
          title="Eric Cito CV"
          className="w-full aspect-[8.5/11] min-h-[60vh] sm:min-h-[70vh]"
        />
      </div>
      <div className="mt-6 sm:mt-8 text-center">
        <a
          href={cvUrl}
          download="Eric_Cito_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors font-medium min-h-[48px] items-center justify-center touch-manipulation"
        >
          Download CV (PDF)
        </a>
      </div>
    </div>
  )
}
