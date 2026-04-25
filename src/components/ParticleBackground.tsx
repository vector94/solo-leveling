import { useMemo } from 'react'

export default function ParticleBackground() {
  const particles = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 0.8,
      left: Math.random() * 100,
      duration: Math.random() * 22 + 18,
      delay: -(Math.random() * 40),
      opacity: Math.random() * 0.5 + 0.15,
      drift: (Math.random() - 0.5) * 80,
    })), []
  )

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: '#4a9edd',
            boxShadow: `0 0 ${p.size * 3}px rgba(74,158,221,0.9)`,
            opacity: p.opacity,
            animation: `particleFloat ${p.duration}s ${p.delay}s linear infinite`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
