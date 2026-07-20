import { useId } from 'react'

const SPIKES = 3
const WIDTH = 1200
const BASELINE = 32

// Action potential phase widths (px along the trace)
const FOOT = 26 // slow depolarizing foot
const UPSTROKE = 10 // fast rise to peak
const DOWNSTROKE = 12 // fast fall through baseline into the trough
const RECOVERY = 34 // slow return from after-hyperpolarization
const SPIKE_WIDTH = FOOT + UPSTROKE + DOWNSTROKE + RECOVERY

const PEAK_Y = 4 // depolarization peak
const TROUGH_Y = 46 // after-hyperpolarization trough

/**
 * One neuron action potential in membrane-potential shape: slow depolarizing
 * foot, fast upstroke to peak, rapid downstroke past baseline into the
 * after-hyperpolarization trough, then slow recovery. SVG y grows downward,
 * so depolarization (up) is a smaller y.
 */
function actionPotential(x: number): { d: string; end: number } {
  let d = ` C ${x + FOOT * 0.6} ${BASELINE} ${x + FOOT * 0.8} ${BASELINE - 6} ${x + FOOT} ${BASELINE - 10}`
  x += FOOT
  d += ` C ${x + UPSTROKE * 0.3} ${BASELINE - 22} ${x + UPSTROKE * 0.6} ${PEAK_Y} ${x + UPSTROKE} ${PEAK_Y}`
  x += UPSTROKE
  d += ` C ${x + DOWNSTROKE * 0.4} ${PEAK_Y} ${x + DOWNSTROKE * 0.6} ${TROUGH_Y} ${x + DOWNSTROKE} ${TROUGH_Y}`
  x += DOWNSTROKE
  d += ` C ${x + RECOVERY * 0.4} ${TROUGH_Y} ${x + RECOVERY * 0.6} ${BASELINE} ${x + RECOVERY} ${BASELINE}`
  return { d, end: x + RECOVERY }
}

function buildSpikeTrain(): string {
  const gap = (WIDTH - SPIKES * SPIKE_WIDTH) / (SPIKES + 1)
  let x = 0
  let d = `M 0 ${BASELINE}`
  for (let i = 0; i < SPIKES; i++) {
    x += gap
    d += ` L ${x} ${BASELINE}`
    const spike = actionPotential(x)
    d += spike.d
    x = spike.end
  }
  return d + ` L ${WIDTH} ${BASELINE}`
}

const TRAIN_PATH = buildSpikeTrain()

/** Section divider: a train of neuron action potentials with a travelling spike. */
export default function PulseDivider() {
  const gradientId = useId()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10" aria-hidden>
      <svg
        viewBox={`0 0 ${WIDTH} 52`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-10 sm:h-12"
        style={{ filter: 'drop-shadow(0 0 6px rgba(14, 154, 167, 0.25))' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0E9AA7" stopOpacity="0" />
            <stop offset="0.15" stopColor="#0E9AA7" stopOpacity="0.6" />
            <stop offset="0.5" stopColor="#0E9AA7" stopOpacity="0.9" />
            <stop offset="0.85" stopColor="#0E9AA7" stopOpacity="0.6" />
            <stop offset="1" stopColor="#0E9AA7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={TRAIN_PATH}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={TRAIN_PATH}
          fill="none"
          stroke="#3DBFCB"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          strokeDasharray="6 94"
          className="opacity-0 motion-safe:opacity-70 motion-safe:animate-pulse-travel"
        />
      </svg>
    </div>
  )
}
