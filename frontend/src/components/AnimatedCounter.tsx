import { useEffect, useRef } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function AnimatedCounter({
  value,
  duration = 1800,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = spanRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          observer.disconnect()

          const start = performance.now()

          function tick(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const current = easeOutCubic(progress) * value

            el!.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`

            if (progress < 1) {
              requestAnimationFrame(tick)
            } else {
              el!.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`
            }
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [value, duration, decimals, prefix, suffix])

  return (
    <span ref={spanRef} className={className}>
      {`${prefix}${(0).toFixed(decimals)}${suffix}`}
    </span>
  )
}
