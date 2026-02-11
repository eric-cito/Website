/**
 * Base path segment for the app (e.g. "" at root, "Website" on GitHub Pages).
 * On *.github.io we always derive from pathname so assets load reliably.
 */
function getBasePath(): string {
  if (typeof window === 'undefined') {
    return (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '').replace(/^\//, '') || ''
  }
  // On GitHub Pages project site, first path segment is the repo name
  if (window.location.hostname.endsWith('.github.io')) {
    const match = window.location.pathname.match(/^\/([^/]+)/)
    if (match && match[1] && match[1] !== '404.html') return match[1]
  }
  return (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '').replace(/^\//, '') || ''
}

/**
 * Full URL for a public asset (images, PDFs). Uses origin + base + path so it
 * always loads on GitHub Pages project sites (e.g. /Website/images/foo.jpg).
 */
export function withBase(assetPath: string): string {
  const base = getBasePath()
  const p = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath
  const path = base ? `/${base}/${p}` : `/${p}`
  // Use full URL so browser resolves correctly from any page
  if (typeof window !== 'undefined') {
    return new URL(path, window.location.origin).href
  }
  return path
}
