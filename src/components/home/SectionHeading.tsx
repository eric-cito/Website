interface SectionHeadingProps {
  id: string
  title: string
}

/** Single biphasic pulse glyph marking each section heading. */
function PulseGlyph() {
  return (
    <svg viewBox="0 0 36 18" className="w-7 h-4 text-signal shrink-0" aria-hidden>
      <path
        d="M 0 9 L 9 9 C 11 9 12 8 13 7 C 14 4 15 1 16 1 C 17 1 18 6 19 15 C 20 17 21 12 23 9 L 36 9"
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
      className="scroll-mt-20 font-body font-semibold text-2xl sm:text-3xl text-ink flex items-center gap-3 mb-6 sm:mb-8"
    >
      <PulseGlyph />
      {title}
    </h2>
  )
}
