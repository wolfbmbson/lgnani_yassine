import { useMemo } from 'react'

// Animated gradient blobs + rising particle field behind the whole page.
export default function Background() {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, () => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 10 + Math.random() * 16,
        delay: -Math.random() * 20,
        opacity: 0.2 + Math.random() * 0.4,
      })),
    []
  )

  return (
    <div className="bg-fx" aria-hidden="true">
      <span className="bg-blob b1" />
      <span className="bg-blob b2" />
      <span className="bg-blob b3" />
      <div className="particles">
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
