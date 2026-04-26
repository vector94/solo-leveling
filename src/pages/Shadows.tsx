import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { SHADOWS } from '../lib/shadows'
import Panel from '../components/Panel'

const GRADE_COLORS: Record<string, { color: string; glow: string }> = {
  E: { color: '#9ca3af', glow: 'rgba(156,163,175,0.3)' },
  D: { color: '#4ade80', glow: 'rgba(74,222,128,0.3)' },
  C: { color: '#38bdf8', glow: 'rgba(56,189,248,0.3)' },
  B: { color: '#c084fc', glow: 'rgba(192,132,252,0.3)' },
  A: { color: '#f87171', glow: 'rgba(248,113,113,0.3)' },
  S: { color: '#fbbf24', glow: 'rgba(251,191,36,0.4)' },
}

export default function Shadows() {
  const { level } = useGameStore()
  const unlocked = SHADOWS.filter(s => level >= s.levelRequired)
  const locked = SHADOWS.filter(s => level < s.levelRequired)

  return (
    <div className="sl-page">
      <div style={{ textAlign: 'center', paddingBottom: 20 }}>
        <div className="sl-system-label">Shadow Monarch</div>
        <div className="sl-system-title">Shadow Army</div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: 2, color: '#6a9abb', marginBottom: 6 }}>
          <span>Soldiers Risen</span>
          <span style={{ color: '#4a9edd' }}>{unlocked.length} / {SHADOWS.length}</span>
        </div>
        <div className="xp-bar-wrap" style={{ height: 8 }}>
          <div style={{ height: '100%', width: `${(unlocked.length / SHADOWS.length) * 100}%`, background: 'linear-gradient(90deg, #1e3a5a, #4a9edd)', transition: 'width 0.7s ease' }} />
        </div>
      </div>

      {/* Unlocked shadows */}
      {unlocked.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <Panel title={`Risen (${unlocked.length})`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {unlocked.map((shadow, i) => {
                const { color, glow } = GRADE_COLORS[shadow.grade]
                return (
                  <motion.div
                    key={shadow.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 16px',
                      background: 'rgba(0,5,20,0.6)',
                      border: `1px solid ${color}30`,
                      borderLeft: `3px solid ${color}`,
                      borderRadius: 2,
                      position: 'relative',
                      boxShadow: `inset 0 0 20px ${glow}`,
                    }}
                  >
                    <span style={{ fontSize: 32, flexShrink: 0 }}>{shadow.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                        <span className="cinzel" style={{ fontSize: 15, fontWeight: 700, color: '#e0eeff' }}>
                          {shadow.name}
                        </span>
                        <span
                          className="cinzel"
                          style={{
                            fontSize: 9, padding: '1px 6px', border: `1px solid ${color}`,
                            color, letterSpacing: 1, borderRadius: 1,
                          }}
                        >
                          {shadow.grade}
                        </span>
                        <span style={{ fontSize: 10, color: '#4a8aaa', letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Cinzel, serif' }}>
                          {shadow.type}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: '#6a9abb', lineHeight: 1.5 }}>
                        {shadow.description}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <div className="cinzel" style={{ fontSize: 8, letterSpacing: 1, color: '#3a6080', marginBottom: 2 }}>UNLOCKED</div>
                      <div className="cinzel" style={{ fontSize: 10, color: '#4a8aaa' }}>Lv.{shadow.levelRequired}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Panel>
        </div>
      )}

      {/* Locked shadows */}
      {locked.length > 0 && (
        <Panel title={`Sealed (${locked.length})`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {locked.map((shadow) => {
              const { color } = GRADE_COLORS[shadow.grade]
              return (
                <div
                  key={shadow.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 16px',
                    background: 'rgba(0,5,20,0.3)',
                    border: '1px solid rgba(30,110,181,0.1)',
                    borderLeft: '3px solid rgba(30,110,181,0.15)',
                    borderRadius: 2,
                    opacity: 0.4,
                    filter: 'grayscale(0.6)',
                  }}
                >
                  <span style={{ fontSize: 32, flexShrink: 0 }}>{shadow.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span className="cinzel" style={{ fontSize: 15, fontWeight: 700, color: '#4a6a8a' }}>
                        {shadow.name}
                      </span>
                      <span className="cinzel" style={{ fontSize: 9, padding: '1px 6px', border: `1px solid ${color}50`, color: `${color}80`, letterSpacing: 1, borderRadius: 1 }}>
                        {shadow.grade}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: '#3a6080' }}>{shadow.description}</div>
                  </div>
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: 18, marginBottom: 2 }}>🔒</div>
                    <div className="cinzel" style={{ fontSize: 10, color: '#3a6080' }}>Lv.{shadow.levelRequired}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </Panel>
      )}

      {unlocked.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: 2, color: '#3a6080', lineHeight: 2 }}>
          No shadows have risen yet.<br />
          Reach Level 5 to summon your first soldier.
        </div>
      )}
    </div>
  )
}
