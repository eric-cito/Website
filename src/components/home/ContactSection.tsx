import { withBase } from '../../utils/baseUrl'
import SectionHeading from './SectionHeading'

export default function ContactSection() {
  return (
    <section className="px-4 sm:px-6 max-w-3xl mx-auto w-full pb-16">
      <SectionHeading id="contact" title="Contact" />
      <p className="text-slate-600 mb-6 max-w-xl">
        Open to roles in machine learning, health AI, neurotechnology, and biotech —
        or just happy to talk shop. Reach out.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="mailto:eric.cito@ucsf.edu"
          className="inline-flex items-center px-5 py-3 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-medium min-h-[48px] touch-manipulation"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/eric-cito-4709b919a"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-medium min-h-[48px] touch-manipulation"
        >
          LinkedIn
        </a>
        <a
          href={withBase('/Eric_Cito_CV.pdf')}
          download="Eric_Cito_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:border-accent/50 hover:text-accent transition-colors font-medium min-h-[48px] touch-manipulation"
        >
          Download CV
        </a>
      </div>
    </section>
  )
}
