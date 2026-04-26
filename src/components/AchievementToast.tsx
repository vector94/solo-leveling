import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function AchievementToast() {
  const { pendingAchievements, achievements, dismissAchievement } = useGameStore()
  const id = pendingAchievements[0]
  const achievement = id ? achievements.find(a => a.id === id) : null

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          key={id}
          className="sl-achieve-toast"
          style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200, maxWidth: 300 }}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 22 }}
        >
          <div className="achieve-toast" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>{achievement.icon}</span>
            <div>
              <div
                className="cinzel"
                style={{ fontSize: 9, letterSpacing: 2, color: '#fbbf24', textTransform: 'uppercase', marginBottom: 3 }}
              >
                Achievement Unlocked
              </div>
              <div className="cinzel" style={{ fontSize: 13, fontWeight: 700, color: '#e0eeff' }}>
                {achievement.title}
              </div>
              <div style={{ fontSize: 11, color: '#6a9abb', marginTop: 2 }}>
                {achievement.description}
              </div>
            </div>
            <button
              onClick={dismissAchievement}
              style={{
                position: 'absolute', top: 6, right: 6,
                background: 'none', border: 'none', color: '#2a4a6a',
                cursor: 'pointer', fontSize: 14, lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
