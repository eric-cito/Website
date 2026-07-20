import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const ACCENT = '34, 211, 238'
const MAX_RADIUS = 180
const RIPPLE_SPEED = 30 // px/s
const BURST_SIZE = 4
const BURST_SPACING_MS = 180
const QUIESCENCE_MS = 1600
const MAX_RIPPLES = 12

interface Ripple {
  x: number
  y: number
  r: number
}

interface Point {
  x: number
  y: number
}

/** Point at parameter t on a quadratic bezier. */
function quadPoint(p0: Point, c: Point, p1: Point, t: number): Point {
  const u = 1 - t
  return {
    x: u * u * p0.x + 2 * u * t * c.x + t * t * p1.x,
    y: u * u * p0.y + 2 * u * t * c.y + t * t * p1.y,
  }
}

/** Tangent direction at parameter t on a quadratic bezier, normalized. */
function quadTangent(p0: Point, c: Point, p1: Point, t: number): Point {
  const dx = 2 * (1 - t) * (c.x - p0.x) + 2 * t * (p1.x - c.x)
  const dy = 2 * (1 - t) * (c.y - p0.y) + 2 * t * (p1.y - c.y)
  const len = Math.hypot(dx, dy) || 1
  return { x: dx / len, y: dy / len }
}

interface LeadGeometry {
  p0: Point
  c: Point
  p1: Point
  contacts: Point[]
}

/** Stylized DBS lead: a thin curve entering from the top with 4 contacts near the tip. */
function leadGeometry(w: number, h: number): LeadGeometry {
  const p0 = { x: w * 0.66, y: -10 }
  const c = { x: w * 0.73, y: h * 0.3 }
  const p1 = { x: w * 0.6, y: h * 0.58 }
  const contacts = [0.78, 0.85, 0.92, 0.99].map((t) => quadPoint(p0, c, p1, t))
  return { p0, c, p1, contacts }
}

function drawLead(ctx: CanvasRenderingContext2D, lead: LeadGeometry) {
  const { p0, c, p1 } = lead
  ctx.strokeStyle = 'rgba(100, 116, 139, 0.25)'
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(p0.x, p0.y)
  ctx.quadraticCurveTo(c.x, c.y, p1.x, p1.y)
  ctx.stroke()

  // Contact segments along the curve tangent
  ctx.strokeStyle = `rgba(${ACCENT}, 0.7)`
  ctx.lineWidth = 4
  const ts = [0.78, 0.85, 0.92, 0.99]
  lead.contacts.forEach((pt, i) => {
    const dir = quadTangent(p0, c, p1, ts[i])
    ctx.beginPath()
    ctx.moveTo(pt.x - dir.x * 4, pt.y - dir.y * 4)
    ctx.lineTo(pt.x + dir.x * 4, pt.y + dir.y * 4)
    ctx.stroke()
  })
}

function drawRipple(ctx: CanvasRenderingContext2D, ripple: Ripple) {
  const alpha = 0.35 * (1 - ripple.r / MAX_RADIUS)
  if (alpha <= 0) return
  ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2)
  ctx.stroke()
}

/**
 * Hero background: a DBS lead emitting ripple rings from its contacts in
 * stimulation bursts. Static single frame under prefers-reduced-motion.
 */
export default function StimulationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let lead = leadGeometry(0, 0)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      lead = leadGeometry(width, height)
    }
    resize()
    const observer = new ResizeObserver(() => {
      resize()
      if (reducedMotion) drawStaticFrame()
    })
    observer.observe(canvas)

    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, width, height)
      drawLead(ctx, lead)
      const contact = lead.contacts[1]
      for (const r of [40, 80, 120]) {
        drawRipple(ctx, { x: contact.x, y: contact.y, r })
      }
    }

    if (reducedMotion) {
      drawStaticFrame()
      return () => observer.disconnect()
    }

    let ripples: Ripple[] = []
    let rafId = 0
    let running = false
    let visible = true
    let lastTime = 0
    // Burst state: fire BURST_SIZE ripples spaced BURST_SPACING_MS, then rest
    let nextSpawnAt = 0
    let burstRemaining = BURST_SIZE
    let burstContact = lead.contacts[0]

    const frame = (time: number) => {
      if (!running) return
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0
      lastTime = time

      if (time >= nextSpawnAt) {
        if (burstRemaining > 0) {
          if (ripples.length < MAX_RIPPLES) {
            ripples.push({ x: burstContact.x, y: burstContact.y, r: 2 })
          }
          burstRemaining--
          nextSpawnAt = time + BURST_SPACING_MS
        } else {
          burstRemaining = BURST_SIZE
          burstContact = lead.contacts[Math.floor(Math.random() * lead.contacts.length)]
          nextSpawnAt = time + QUIESCENCE_MS
        }
      }

      ripples.forEach((ripple) => {
        ripple.r += RIPPLE_SPEED * dt
      })
      ripples = ripples.filter((ripple) => ripple.r < MAX_RADIUS)

      ctx.clearRect(0, 0, width, height)
      drawLead(ctx, lead)
      ripples.forEach((ripple) => drawRipple(ctx, ripple))
      rafId = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running || !visible || document.hidden) return
      running = true
      lastTime = 0
      rafId = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(rafId)
    }

    const onVisibilityChange = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibilityChange)

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    intersection.observe(canvas)

    start()
    return () => {
      stop()
      observer.disconnect()
      intersection.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [reducedMotion])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />
      {/* Vignette so hero text stays legible over the canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse at 35% 45%, rgba(10, 10, 15, 0.85) 0%, rgba(10, 10, 15, 0.35) 55%, rgba(10, 10, 15, 0.1) 100%)',
        }}
      />
    </>
  )
}
