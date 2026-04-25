import type { Rank } from '../lib/types'

const RANK_COLORS: Record<Rank, { color: string; glow: string }> = {
  E: { color: '#9ca3af', glow: 'rgba(156,163,175,0.4)' },
  D: { color: '#4ade80', glow: 'rgba(74,222,128,0.4)' },
  C: { color: '#38bdf8', glow: 'rgba(56,189,248,0.4)' },
  B: { color: '#c084fc', glow: 'rgba(192,132,252,0.4)' },
  A: { color: '#f87171', glow: 'rgba(248,113,113,0.4)' },
  S: { color: '#fbbf24', glow: 'rgba(251,191,36,0.6)' },
}

interface Props {
  rank: Rank
  size?: 'sm' | 'md' | 'lg'
}

export default function RankBadge({ rank, size = 'md' }: Props) {
  const { color, glow } = RANK_COLORS[rank]

  const dims = { sm: 40, md: 56, lg: 76 }
  const fontSize = { sm: 18, md: 24, lg: 34 }
  const d = dims[size]
  const fs = fontSize[size]

  return (
    <div
      className="rank-badge"
      style={{
        width: d,
        height: d,
        borderColor: color,
        background: 'rgba(0,0,0,0.65)',
        boxShadow: `0 0 20px ${glow}, inset 0 0 18px rgba(0,0,0,0.5)`,
      }}
    >
      <span
        className="cinzel"
        style={{
          fontSize: fs,
          fontWeight: 900,
          color,
          textShadow: `0 0 14px ${color}`,
          lineHeight: 1,
        }}
      >
        {rank}
      </span>
      {size === 'lg' && (
        <span style={{ fontSize: 9, letterSpacing: 1, color, opacity: 0.8, textTransform: 'uppercase', marginTop: 2 }}>
          RANK
        </span>
      )}
    </div>
  )
}

export { RANK_COLORS }
