import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * The app shell is overflow-hidden and <main id="main-scroll"> is the only
 * scroll container, so react-router resets nothing and #hash fragments don't
 * jump natively. This hook handles both on every navigation, before paint so
 * the new page never flashes at the old scroll position. Hash navigations
 * animate unless they pass `state: { instantScroll: true }`.
 */
export function useScrollManager() {
  const location = useLocation()
  const reducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const hash = location.hash.replace(/^#/, '')
    if (hash) {
      const target = document.getElementById(hash)
      if (target) {
        const instant = reducedMotion || location.state?.instantScroll
        target.scrollIntoView({ behavior: instant ? 'auto' : 'smooth' })
        return
      }
    }
    document.getElementById('main-scroll')?.scrollTo({ top: 0 })
  }, [location, reducedMotion])
}
