import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface AutoplayVideoProps {
  src: string
  poster?: string
  className?: string
  /** Show native playback controls (not for use inside a link) */
  controls?: boolean
  /** Accessible name; omit when the video is decorative */
  label?: string
}

/**
 * Muted looping video that only downloads and plays while on screen. Under
 * reduced motion it stays paused on its poster.
 */
export default function AutoplayVideo({ src, poster, className, controls = false, label }: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Set as a property: React doesn't reliably apply the muted attribute, and
    // browsers refuse to autoplay unmuted video.
    el.muted = true
    if (reducedMotion) {
      el.pause()
      return
    }

    // Scrolling back only resumes if the viewer hadn't paused it themselves.
    let started = false
    let shouldResume = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (shouldResume) el.play().catch(() => {})
          started = true
        } else if (started) {
          shouldResume = !el.paused
          el.pause()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className={className}
      controls={controls}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      muted
      loop
      playsInline
      preload="none"
    />
  )
}
