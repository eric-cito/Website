/** Prefix path with Vite base URL so assets load on GitHub Pages (e.g. /Website/) */
export function withBase(assetPath: string): string {
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '')
  const p = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath
  // Always return absolute path from origin so it works from any route
  return base ? `/${base}/${p}` : `/${p}`
}
