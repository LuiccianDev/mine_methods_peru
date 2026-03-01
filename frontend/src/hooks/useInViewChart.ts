import { RefObject, useEffect, useRef } from 'react'

/**
 * Defers ECharts initialization until the chart container enters the viewport.
 * Fires once (one-shot IntersectionObserver), then disconnects.
 * On unmount, disconnects the observer and runs the chart cleanup (dispose + resize listener).
 *
 * @param ref - RefObject pointing to the chart container div
 * @param buildChart - callback that initializes the chart and returns a cleanup function
 */
export function useInViewChart(
  ref: RefObject<HTMLDivElement | null>,
  buildChart: () => (() => void) | void,
) {
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect()
          const cleanup = buildChart()
          if (cleanup) cleanupRef.current = cleanup
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      cleanupRef.current?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
