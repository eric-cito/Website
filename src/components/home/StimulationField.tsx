import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const ACCENT = '14, 154, 167'
const OUTLINE = '11, 18, 32'
const RIPPLE_SPEED = 30 // px/s
const BURST_SIZE = 4
const BURST_SPACING_MS = 180
const QUIESCENCE_MS = 1600
const MAX_RIPPLES = 12
const BRAIN_ASPECT = 0.9 // height/width of the brain bounding box

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

// Mid-sagittal brain in normalized coords (frontal pole left, brainstem below).
// Outline segments: [c1x, c1y, c2x, c2y, x, y] for bezierCurveTo from the previous point.
const BRAIN_START: [number, number] = [0.03, 0.44]
const BRAIN_OUTLINE: number[][] = [
  [0.03, 0.26, 0.14, 0.09, 0.31, 0.06], // frontal lobe up to the superior margin
  [0.45, 0.02, 0.63, 0.03, 0.76, 0.12], // vertex / crown
  [0.88, 0.2, 0.95, 0.31, 0.95, 0.43], // parietal into occipital
  [0.95, 0.5, 0.94, 0.54, 0.92, 0.57], // occipital pole
  [0.96, 0.62, 0.95, 0.71, 0.86, 0.75], // cerebellum, posterior-inferior
  [0.78, 0.79, 0.68, 0.78, 0.63, 0.74], // cerebellum to brainstem junction
  [0.6, 0.82, 0.585, 0.9, 0.575, 0.98], // brainstem, posterior edge
  [0.555, 0.99, 0.532, 0.99, 0.515, 0.98], // medulla
  [0.513, 0.88, 0.508, 0.8, 0.5, 0.72], // brainstem, anterior edge
  [0.45, 0.69, 0.37, 0.67, 0.3, 0.64], // inferior surface, forward
  [0.2, 0.62, 0.1, 0.56, 0.06, 0.5], // orbital surface
  [0.04, 0.48, 0.03, 0.46, 0.03, 0.44], // close at the frontal pole
]
// Open strokes: [startX, startY, then one bezier segment]
const BRAIN_SULCI: number[][] = [
  [0.3, 0.4, 0.34, 0.24, 0.5, 0.18, 0.66, 0.26], // cingulate sulcus
  [0.5, 0.06, 0.52, 0.16, 0.49, 0.22, 0.46, 0.3], // central sulcus
  [0.82, 0.16, 0.79, 0.26, 0.75, 0.32, 0.7, 0.38], // parieto-occipital sulcus
  [0.14, 0.3, 0.2, 0.28, 0.24, 0.32, 0.26, 0.38], // superior frontal sulcus
  [0.93, 0.56, 0.85, 0.585, 0.75, 0.6, 0.66, 0.63], // tentorium, over the cerebellum
]
// Arbor vitae: the branching white matter inside the cerebellum.
const CEREBELLAR_ARBOR: number[][] = [
  [0.7, 0.655, 0.76, 0.63, 0.81, 0.625, 0.86, 0.635],
  [0.7, 0.655, 0.76, 0.665, 0.81, 0.675, 0.87, 0.685],
  [0.7, 0.655, 0.745, 0.7, 0.78, 0.72, 0.83, 0.735],
]

interface BrainBox {
  x0: number
  y0: number
  s: number
}

interface Geometry {
  brain: BrainBox
  leadP0: Point
  leadC: Point
  leadP1: Point
  contacts: Point[]
  maxRadius: number
}

const CONTACT_TS = [0.72, 0.81, 0.9, 0.99]

function computeGeometry(w: number, h: number): Geometry {
  const narrow = w < 1024
  const s = Math.max(
    180,
    narrow ? Math.min(w * 0.7, h * 0.34) : Math.min(w * 0.5, h * 0.62, 560)
  )
  const cx = narrow ? w * 0.6 : w * 0.74
  // On narrow screens the brain sits above the copy instead of behind it
  const cy = narrow ? h * 0.15 : h * 0.44
  const brain: BrainBox = { x0: cx - s / 2, y0: cy - (s * BRAIN_ASPECT) / 2, s }

  const bx = (nx: number) => brain.x0 + nx * s
  const by = (ny: number) => brain.y0 + ny * s * BRAIN_ASPECT

  // Lead enters through a burr hole just above the skull line and curves down
  // to the thalamic target.
  const leadP0 = { x: bx(0.36), y: by(-0.03) }
  const leadC = { x: bx(0.43), y: by(0.14) }
  const leadP1 = { x: bx(0.53), y: by(0.52) }
  const contacts = CONTACT_TS.map((t) => quadPoint(leadP0, leadC, leadP1, t))

  return { brain, leadP0, leadC, leadP1, contacts, maxRadius: s * 0.24 }
}

function traceBrainPath(ctx: CanvasRenderingContext2D, brain: BrainBox, segments: number[][], start?: [number, number]) {
  const bx = (nx: number) => brain.x0 + nx * brain.s
  const by = (ny: number) => brain.y0 + ny * brain.s * BRAIN_ASPECT
  ctx.beginPath()
  if (start) {
    ctx.moveTo(bx(start[0]), by(start[1]))
    for (const [c1x, c1y, c2x, c2y, x, y] of segments) {
      ctx.bezierCurveTo(bx(c1x), by(c1y), bx(c2x), by(c2y), bx(x), by(y))
    }
  } else {
    for (const [sx, sy, c1x, c1y, c2x, c2y, x, y] of segments) {
      ctx.moveTo(bx(sx), by(sy))
      ctx.bezierCurveTo(bx(c1x), by(c1y), bx(c2x), by(c2y), bx(x), by(y))
    }
  }
}

function drawScene(ctx: CanvasRenderingContext2D, geo: Geometry) {
  const { brain } = geo
  ctx.lineCap = 'round'

  // Cortex + brainstem silhouette
  traceBrainPath(ctx, brain, BRAIN_OUTLINE, BRAIN_START)
  ctx.closePath()
  ctx.fillStyle = `rgba(${ACCENT}, 0.05)`
  ctx.fill()
  ctx.strokeStyle = `rgba(${OUTLINE}, 0.6)`
  ctx.lineWidth = 1.75
  ctx.stroke()

  // Sulci and cerebellar arbor vitae
  ctx.strokeStyle = `rgba(${OUTLINE}, 0.28)`
  ctx.lineWidth = 1.2
  traceBrainPath(ctx, brain, BRAIN_SULCI)
  ctx.stroke()
  traceBrainPath(ctx, brain, CEREBELLAR_ARBOR)
  ctx.stroke()

  // Lead
  ctx.strokeStyle = `rgba(${OUTLINE}, 0.6)`
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(geo.leadP0.x, geo.leadP0.y)
  ctx.quadraticCurveTo(geo.leadC.x, geo.leadC.y, geo.leadP1.x, geo.leadP1.y)
  ctx.stroke()

  // Contacts
  ctx.strokeStyle = `rgba(${ACCENT}, 0.95)`
  ctx.lineWidth = 4.5
  geo.contacts.forEach((pt, i) => {
    const dir = quadTangent(geo.leadP0, geo.leadC, geo.leadP1, CONTACT_TS[i])
    ctx.beginPath()
    ctx.moveTo(pt.x - dir.x * 4, pt.y - dir.y * 4)
    ctx.lineTo(pt.x + dir.x * 4, pt.y + dir.y * 4)
    ctx.stroke()
  })
}

function drawRipple(ctx: CanvasRenderingContext2D, ripple: Ripple, maxRadius: number) {
  const alpha = 0.45 * (1 - ripple.r / maxRadius)
  if (alpha <= 0) return
  ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2)
  ctx.stroke()
}

/**
 * Hero background: a stylized brain with an implanted DBS lead emitting ripple
 * rings from its contacts in stimulation bursts. Static single frame under
 * prefers-reduced-motion.
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
    let geo = computeGeometry(1, 1)

    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, width, height)
      drawScene(ctx, geo)
      const contact = geo.contacts[1]
      for (const f of [0.35, 0.6, 0.85]) {
        drawRipple(ctx, { x: contact.x, y: contact.y, r: geo.maxRadius * f }, geo.maxRadius)
      }
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      geo = computeGeometry(width, height)
    }
    resize()
    const observer = new ResizeObserver(() => {
      resize()
      if (reducedMotion) drawStaticFrame()
    })
    observer.observe(canvas)

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
    let burstContactIndex = 0

    const frame = (time: number) => {
      if (!running) return
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0
      lastTime = time

      if (time >= nextSpawnAt) {
        if (burstRemaining > 0) {
          if (ripples.length < MAX_RIPPLES) {
            const contact = geo.contacts[burstContactIndex]
            ripples.push({ x: contact.x, y: contact.y, r: 2 })
          }
          burstRemaining--
          nextSpawnAt = time + BURST_SPACING_MS
        } else {
          burstRemaining = BURST_SIZE
          burstContactIndex = Math.floor(Math.random() * geo.contacts.length)
          nextSpawnAt = time + QUIESCENCE_MS
        }
      }

      ripples.forEach((ripple) => {
        ripple.r += RIPPLE_SPEED * dt
      })
      ripples = ripples.filter((ripple) => ripple.r < geo.maxRadius)

      ctx.clearRect(0, 0, width, height)
      drawScene(ctx, geo)
      ripples.forEach((ripple) => drawRipple(ctx, ripple, geo.maxRadius))
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
      {/* Soft white veil so hero text stays legible over the canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse at 30% 45%, rgba(247, 249, 249, 0.92) 0%, rgba(247, 249, 249, 0.4) 55%, rgba(247, 249, 249, 0.05) 100%)',
        }}
      />
    </>
  )
}
