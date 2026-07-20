import { Link } from 'react-router-dom'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'outline' | 'solid'

const base =
  'inline-flex items-center justify-center gap-2 px-2.5 sm:px-5 py-3 rounded-sm font-mono text-xs sm:text-sm tracking-wide transition-colors min-h-[48px] touch-manipulation'

const variants: Record<Variant, string> = {
  outline: 'border border-line text-ink hover:border-signal hover:text-signal',
  solid: 'border border-ink bg-ink text-paper hover:border-signal-dim hover:bg-signal-dim',
}

function classes(variant: Variant, className: string) {
  return `${base} ${variants[variant]} ${className}`.trim()
}

interface LinkButtonProps {
  to: string
  variant?: Variant
  className?: string
  children: ReactNode
}

/** Bracket-style CTA for internal routes: mono label, hairline border, no fill except the reserved solid variant. */
export function LinkButton({ to, variant = 'outline', className = '', children }: LinkButtonProps) {
  return (
    <Link to={to} className={classes(variant, className)}>
      {children}
    </Link>
  )
}

interface AnchorButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  children: ReactNode
}

/** Same bracket-style CTA for plain anchors (mailto:, external links, downloads). */
export function AnchorButton({ variant = 'outline', className = '', children, ...rest }: AnchorButtonProps) {
  return (
    <a className={classes(variant, className)} {...rest}>
      {children}
    </a>
  )
}
