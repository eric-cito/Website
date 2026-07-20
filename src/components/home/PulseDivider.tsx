import { useId } from 'react'

const PULSES = 3
const WIDTH = 1200
const BASELINE = 32

/**
 * Charge-balanced biphasic pulse: narrow deep cathodic phase, interphase gap,
 * then a wider shallow anodic phase (8×20 vs 20×8 keeps the "charge" equal).
 */
function buildPulseTrain(): string {
  const cathodic = { w: 8, d: 20 }
  const anodic = { w: 20, d: 8 }
  const gap = 8
  const pulseWidth = cathodic.w + gap + anodic.w
  const run = (WIDTH - PULSES * pulseWidth) / (PULSES + 1)
  let d = `M 0 ${BASELINE}`
  for (let i = 0; i < PULSES; i++) {
    d += ` h ${run} v ${cathodic.d} h ${cathodic.w} v ${-cathodic.d} h ${gap} v ${-anodic.d} h ${anodic.w} v ${anodic.d}`
  }
  return d + ` h ${run}`
}

const TRAIN_PATH = buildPulseTrain()

/** Section divider: a DBS stimulation pulse train with a travelling stimulus. */
export default function PulseDivider() {
  const gradientId = useId()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10" aria-hidden>
      <svg
        viewBox={`0 0 ${WIDTH} 64`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-10 sm:h-12"
        style={{ filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.3))' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="0.15" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="0.5" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="0.85" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={TRAIN_PATH}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={1.5}
          strokeLinejoin="miter"
        />
        <path
          d={TRAIN_PATH}
          fill="none"
          stroke="#a5f3fc"
          strokeWidth={2}
          strokeLinejoin="miter"
          pathLength={100}
          strokeDasharray="6 94"
          className="opacity-0 motion-safe:opacity-70 motion-safe:animate-pulse-travel"
        />
      </svg>
    </div>
  )
}
