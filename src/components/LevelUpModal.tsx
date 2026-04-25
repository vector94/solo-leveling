import { motion, AnimatePresence } from 'framer-motion'
import { getRankForLevel } from '../lib/xp'
import { useGameStore } from '../store/gameStore'
import { RANK_COLORS } from './RankBadge'

const STAT_ICONS: Record<string, string> = {
  STR: '⚔', AGI: '💨', INT: '✦', SEN: '👁', VIT: '❤',
}

export default function LevelUpModal() {
  const { levelUpQueue, dismissLevelUp, stats, unallocatedPoints, allocateStat } = useGameStore()
  const newLevel = levelUpQueue[0]
  if (!newLevel) return null

  const rank = getRankForLevel(newLevel)
  const { color, glow } = RANK_COLORS[rank]
  const allAllocated = unallocatedPoints === 0

  return (
    <AnimatePresence>
      <motion.div
        key={newLevel}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(6px)',
          padding: 20,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="sl-modal-box sl-levelup-modal"
          style={{ width: '100%', maxWidth: 460, padding: 28, boxShadow: `0 0 50px rgba(251,191,36,0.18)` }}
          initial={{ scale: 0.88, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 200 }}
        >
          {/* Corner brackets (gold) */}
          {['tl','tr','bl','br'].map(c => (
            <div key={c} className={`sl-corner ${c}`} style={{ borderColor: '#fbbf24' }} />
          ))}

          {/* Title */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            style={{ textAlign: 'center', marginBottom: 4 }}
          >
            <div
              className="cinzel"
              style={{ fontSize: 26, fontWeight: 900, color: '#fbbf24', letterSpacing: 3, textShadow: `0 0 24px ${glow}` }}
            >
              LEVEL UP
            </div>
            <div className="cinzel" style={{ fontSize: 11, letterSpacing: 3, color: '#92733a', marginTop: 4 }}>
              You have risen · Level {newLevel}
            </div>
          </motion.div>

          {/* Rank badge */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, type: 'spring', damping: 12 }}
            style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}
          >
            <div
              style={{
                width: 72, height: 72, border: `1px solid ${color}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                borderRadius: 2, background: 'rgba(0,0,0,0.7)',
                boxShadow: `0 0 28px ${glow}`,
              }}
            >
              <span className="cinzel" style={{ fontSize: 32, fontWeight: 900, color, textShadow: `0 0 16px ${color}` }}>
                {rank}
              </span>
            </div>
          </motion.div>

          {/* Stat points */}
          {unallocatedPoints > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <div
                style={{
                  textAlign: 'center', padding: '8px 12px', marginBottom: 14,
                  border: '1px solid rgba(251,191,36,0.22)',
                  background: 'rgba(251,191,36,0.04)',
                  borderRadius: 1,
                }}
              >
                <span className="cinzel" style={{ fontSize: 12, letterSpacing: 2, color: '#fbbf24' }}>
                  {unallocatedPoints} Stat Point{unallocatedPoints !== 1 ? 's' : ''} Available
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {Object.entries(stats).map(([stat, val]) => (
                  <button
                    key={stat}
                    onClick={() => allocateStat(stat as keyof typeof stats)}
                    style={{
                      padding: '11px 12px',
                      background: 'rgba(0,5,20,0.8)',
                      border: '1px solid rgba(30,110,181,0.3)',
                      borderRadius: 1,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.18s',
                      color: '#c8d6e5',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(74,158,221,0.6)'
                      e.currentTarget.style.background = 'rgba(30,110,181,0.2)'
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(74,158,221,0.2)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(30,110,181,0.3)'
                      e.currentTarget.style.background = 'rgba(0,5,20,0.8)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{STAT_ICONS[stat]}</span>
                      <div>
                        <div className="cinzel" style={{ fontSize: 9, letterSpacing: 1, color: '#4a9edd' }}>{stat}</div>
                        <div className="cinzel" style={{ fontSize: 15, fontWeight: 700, color: '#e0eeff' }}>{val}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 20, color: '#fbbf24', fontWeight: 700 }}>+</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Continue (after allocating all) */}
          {allAllocated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', marginTop: 16 }}
            >
              <div className="cinzel" style={{ color: '#fbbf24', marginBottom: 14, fontSize: 13 }}>
                Stats upgraded — Arise.
              </div>
              <button className="sl-btn sl-btn-gold" onClick={dismissLevelUp} style={{ letterSpacing: 3 }}>
                Continue
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
