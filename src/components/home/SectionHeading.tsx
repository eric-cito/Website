interface SectionHeadingProps {
  id: string
  title: string
}

/** Single biphasic pulse glyph marking each section heading. */
function PulseGlyph() {
  return (
    <svg viewBox="0 0 36 18" className="w-7 h-4 text-accent shrink-0" aria-hidden>
      <path
        d="M 0 9 h 8 v 6 h 3 v -6 h 3 v -3 h 6 v 3 h 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </svg>
  )
}

export default function SectionHeading({ id, title }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="scroll-mt-20 font-heading font-bold text-2xl sm:text-3xl text-white flex items-center gap-3 mb-6 sm:mb-8"
    >
      <PulseGlyph />
      {title}
    </h2>
  )
}
