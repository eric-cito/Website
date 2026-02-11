/**
 * Base path for the app (e.g. "" at root, "Website" on GitHub Pages project site).
 * Uses Vite's BASE_URL at build time, with runtime fallback only on GitHub Pages.
 */
function getBasePath(): string {
  const fromEnv = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '')
  if (fromEnv && fromEnv !== '/') return fromEnv
  // Runtime fallback only on GitHub Pages: first path segment is repo name
  if (typeof window === 'undefined') return ''
  if (!window.location.hostname.endsWith('.github.io')) return ''
  const match = window.location.pathname.match(/^\/([^/]+)/)
  return match ? match[1] : ''
}

/** Full absolute URL for an asset so it loads on GitHub Pages (e.g. /Website/images/foo.jpg) */
export function withBase(assetPath: string): string {
  const base = getBasePath()
  const p = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath
  return base ? `/${base}/${p}` : `/${p}`
}
