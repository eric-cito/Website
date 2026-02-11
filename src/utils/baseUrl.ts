/** Prefix path with Vite base URL so assets load on GitHub Pages (e.g. /Website/) */
export function withBase(path: string): string {
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '')
  const p = path.startsWith('/') ? path.slice(1) : path
  return base ? `${base}/${p}` : `/${p}`
}
