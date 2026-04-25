import { getRankForLevel, xpForLevel } from '../lib/xp'
import { useGameStore } from '../store/gameStore'
import { RANK_COLORS } from '../components/RankBadge'
import Panel from '../components/Panel'
import StatPanel from '../components/StatPanel'
import XPBar from '../components/XPBar'

const RANKS = ['E', 'D', 'C', 'B', 'A', 'S'] as const
const RANK_MIN_LEVELS = [1, 11, 21, 31, 41, 51]

export default function Profile() {
  const { playerName, level, currentXP, totalXP, totalQuestsCompleted, dailyStreak } = useGameStore()
  const rank = getRankForLevel(level)

  return (
    <div className="sl-page">
      <div style={{ textAlign: 'center', paddingBottom: 20 }}>
        <div className="sl-system-label">Hunter Record</div>
        <div className="sl-system-title">Player Profile</div>
      </div>

      {/* Identity */}
      <div style={{ marginBottom: 14 }}>
        <Panel title="Player Status">
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 18, alignItems: 'start' }}>
            {/* Rank badge large */}
            {(() => {
              const { color, glow } = RANK_COLORS[rank]
              return (
                <div
                  style={{
                    width: 76, height: 76,
                    border: `1px solid ${color}`,
                    borderRadius: 2,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.7)',
                    boxShadow: `0 0 24px ${glow}`,
                  }}
                >
                  <span className="cinzel" style={{ fontSize: 34, fontWeight: 900, color, textShadow: `0 0 16px ${color}` }}>
                    {rank}
                  </span>
                  <span style={{ fontSize: 9, color, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 1 }}>RANK</span>
                </div>
              )
            })()}

            <div>
              <div className="cinzel" style={{ fontSize: 20, fontWeight: 700, color: '#e0eeff', marginBottom: 3 }}>
                {playerName}
              </div>
              <div className="cinzel" style={{ fontSize: 12, color: '#4a9edd', letterSpacing: 1, marginBottom: 12 }}>
                Level {level} · {rank}-Rank Hunter
              </div>
              <XPBar currentXP={currentXP} level={level} />
              <div style={{ fontSize: 11, color: '#2a4a6a', marginTop: 5, textAlign: 'right', fontFamily: 'Cinzel, serif' }}>
                {(xpForLevel(level) - currentXP).toLocaleString()} XP to Level {level + 1}
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 16 }} className="sl-stats-grid-mobile">
            {[
              { label: 'Total XP',   value: totalXP.toLocaleString(), color: '#4a9edd' },
              { label: 'Quests Done', value: totalQuestsCompleted,    color: '#4ade80' },
              { label: 'Streak',      value: `${dailyStreak}d`,       color: '#fbbf24' },
              { label: 'Level',       value: level,                   color: '#c084fc' },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                style={{
                  textAlign: 'center', padding: '10px 8px',
                  background: 'rgba(0,5,20,0.6)',
                  border: '1px solid rgba(30,110,181,0.15)',
                  borderRadius: 1,
                }}
              >
                <div className="cinzel" style={{ fontSize: 8, letterSpacing: 2, color: '#1e6eb5', textTransform: 'uppercase', marginBottom: 4 }}>
                  {label}
                </div>
                <div className="cinzel" style={{ fontSize: 20, fontWeight: 700, color, textShadow: `0 0 10px ${color}55` }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Stats panel */}
      <div style={{ marginBottom: 14 }}>
        <StatPanel />
      </div>

      {/* Rank progression */}
      <Panel title="Rank Progression">
        <div className="sl-rank-row" style={{ display: 'flex', gap: 6 }}>
          {RANKS.map((r, i) => {
            const { color, glow } = RANK_COLORS[r]
            const isUnlocked = level >= RANK_MIN_LEVELS[i]
            const isCurrent = r === rank
            return (
              <div key={r} style={{ flex: 1, textAlign: 'center' }}>
                <div
                  style={{
                    padding: '10px 4px',
                    border: `1px solid ${isCurrent ? color : isUnlocked ? `${color}50` : 'rgba(30,110,181,0.1)'}`,
                    borderRadius: 1,
                    background: isCurrent ? `${color}15` : 'transparent',
                    boxShadow: isCurrent ? `0 0 16px ${glow}` : 'none',
                    transition: 'all 0.3s',
                  }}
                >
                  <div
                    className="cinzel"
                    style={{
                      fontSize: 18, fontWeight: 900,
                      color: isUnlocked ? color : 'rgba(30,110,181,0.2)',
                      textShadow: isCurrent ? `0 0 12px ${color}` : 'none',
                    }}
                  >
                    {r}
                  </div>
                </div>
                <div style={{ fontSize: 9, color: '#1e3a5a', marginTop: 4, fontFamily: 'Cinzel, serif' }}>
                  Lv.{RANK_MIN_LEVELS[i]}
                </div>
              </div>
            )
          })}
        </div>
      </Panel>
    </div>
  )
}
