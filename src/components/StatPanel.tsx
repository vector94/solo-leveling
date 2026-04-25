import { useGameStore } from '../store/gameStore'
import type { Stats } from '../lib/types'
import Panel from './Panel'

const STAT_INFO: Record<keyof Stats, { label: string; icon: string; color: string }> = {
  STR: { label: 'Strength',      icon: '⚔',  color: '#f87171' },
  AGI: { label: 'Agility',       icon: '💨', color: '#4ade80' },
  INT: { label: 'Intelligence',  icon: '✦',  color: '#c084fc' },
  SEN: { label: 'Sense',         icon: '👁', color: '#38bdf8' },
  VIT: { label: 'Vitality',      icon: '❤', color: '#fb923c' },
}

const STAT_ORDER: (keyof Stats)[] = ['STR', 'AGI', 'INT', 'SEN', 'VIT']

export default function StatPanel() {
  const { stats, unallocatedPoints, allocateStat } = useGameStore()
  const maxStat = Math.max(...Object.values(stats), 20)

  return (
    <Panel
      title="Ability Stats"
      titleRight={
        unallocatedPoints > 0
          ? <span className="cinzel" style={{ fontSize: 11, color: '#fbbf24', letterSpacing: 1 }}>
              {unallocatedPoints} pts available
            </span>
          : undefined
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
        {STAT_ORDER.map(key => {
          const { label, icon, color } = STAT_INFO[key]
          const val = stats[key]
          const pct = (val / maxStat) * 100

          return (
            <div
              key={key}
              className="stat-card"
              style={{ '--stat-color': color } as React.CSSProperties}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
              <div className="cinzel" style={{ fontSize: 9, letterSpacing: 2, color: '#1e6eb5', textTransform: 'uppercase', marginBottom: 5 }}>
                {label}
              </div>
              <div
                className="cinzel"
                style={{ fontSize: 30, fontWeight: 700, color, lineHeight: 1, textShadow: `0 0 14px ${color}` }}
              >
                {val}
              </div>
              <div style={{ fontSize: 10, color: '#2a4a6a', marginTop: 4, marginBottom: 8 }}>{key}</div>

              {/* mini bar */}
              <div style={{ height: 3, background: 'rgba(0,0,0,0.6)', borderRadius: 1, overflow: 'hidden' }}>
                <div
                  style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 1, transition: 'width 0.5s ease' }}
                />
              </div>

              {unallocatedPoints > 0 && (
                <button
                  onClick={() => allocateStat(key)}
                  style={{
                    marginTop: 8,
                    width: '100%',
                    padding: '5px 0',
                    background: `${color}14`,
                    border: `1px solid ${color}40`,
                    borderRadius: 1,
                    color,
                    fontFamily: 'Cinzel, serif',
                    fontSize: 10,
                    cursor: 'pointer',
                    letterSpacing: 1,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${color}28`)}
                  onMouseLeave={e => (e.currentTarget.style.background = `${color}14`)}
                >
                  + {key}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
