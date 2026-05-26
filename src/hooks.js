import { useEffect, useRef, useState } from 'react'

// One observer for the whole page: any element with the `.reveal` class
// gets `.visible` when it scrolls into view. Re-scans on dependency change
// (e.g. language switch re-renders fresh nodes).
export function useRevealOnScroll(deps = []) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal:not(.visible)').forEach((n) => io.observe(n))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

// Counts up to `target` when the element enters the viewport.
export function useCountUp(target, duration = 1800) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - p, 3)
              setValue(Math.round(eased * target))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])

  return [ref, value]
}
