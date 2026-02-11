const CV_PDF_PATH = '/Eric_Cito_CV.pdf'

export default function CVPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-heading font-bold text-2xl text-white mb-6">
        CV
      </h1>
      <div className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-800">
        <iframe
          src={CV_PDF_PATH}
          title="Eric Cito CV"
          className="w-full aspect-[8.5/11] min-h-[70vh]"
        />
      </div>
      <div className="mt-8 text-center">
        <a
          href={CV_PDF_PATH}
          download="Eric_Cito_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors font-medium"
        >
          Download CV (PDF)
        </a>
      </div>
    </div>
  )
}
