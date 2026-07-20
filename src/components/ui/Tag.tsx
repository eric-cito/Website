import type { ReactNode } from 'react'

/** Bordered mono data chip — used for tags, skills, and channel-style labels. */
export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono px-1.5 py-1 rounded-sm border border-line text-ink-soft text-xs leading-5">
      {children}
    </span>
  )
}
