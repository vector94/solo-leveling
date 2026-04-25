import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import Panel from '../components/Panel'

export default function Achievements() {
  const { achievements } = useGameStore()
  const unlocked = achievements.filter(a => a.unlockedAt)
  const locked   = achievements.filter(a => !a.unlockedAt)
  const pct = (unlocked.length / achievements.length) * 100

  return (
    <div className="sl-page">
      <div style={{ textAlign: 'center', paddingBottom: 20 }}>
        <div className="sl-system-label">System Records</div>
        <div className="sl-system-title">Achievements</div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: 2,
            color: '#4a7a9b', marginBottom: 6,
          }}
        >
          <span>Progress</span>
          <span style={{ color: '#fbbf24' }}>{unlocked.length} / {achievements.length}</span>
        </div>
        <div className="xp-bar-wrap" style={{ height: 8 }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #92733a, #fbbf24)', transition: 'width 0.7s ease' }} />
        </div>
      </div>

      {/* Unlocked */}
      {unlocked.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <Panel title={`Unlocked (${unlocked.length})`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {unlocked.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '12px 14px',
                    background: 'rgba(0,5,20,0.55)',
                    border: '1px solid rgba(251,191,36,0.18)',
                    borderRadius: 1,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Gold left strip */}
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: '#fbbf24', boxShadow: '0 0 8px rgba(251,191,36,0.6)' }} />
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div className="cinzel" style={{ fontSize: 13, fontWeight: 700, color: '#e0eeff', marginBottom: 2 }}>
                      {a.title}
                    </div>
                    <div style={{ fontSize: 11, color: '#4a7a9b' }}>{a.description}</div>
                  </div>
                  {a.unlockedAt && (
                    <div style={{ fontSize: 10, color: '#2a4a6a', fontFamily: 'Cinzel, serif', flexShrink: 0 }}>
                      {new Date(a.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <Panel title={`Locked (${locked.length})`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {locked.map((a) => (
              <div
                key={a.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 14px',
                  background: 'rgba(0,5,20,0.3)',
                  border: '1px solid rgba(30,110,181,0.1)',
                  borderRadius: 1,
                  opacity: 0.35,
                }}
              >
                <span style={{ fontSize: 26, flexShrink: 0, filter: 'grayscale(1)' }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <div className="cinzel" style={{ fontSize: 13, fontWeight: 700, color: '#c8d6e5', marginBottom: 2 }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize: 11, color: '#2a4a6a' }}>{a.description}</div>
                </div>
                <span style={{ fontSize: 18, color: '#1e3a5a' }}>🔒</span>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </div>
  )
}
