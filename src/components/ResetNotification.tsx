import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function ResetNotification() {
  const { resetNotification, dismissResetNotification } = useGameStore()

  return (
    <AnimatePresence>
      {resetNotification && (
        <motion.div
          style={{
            position: 'fixed', inset: 0, zIndex: 150,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)',
            padding: 20,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="sl-panel"
            style={{ width: '100%', maxWidth: 380, padding: 28, textAlign: 'center', borderColor: 'rgba(248,113,113,0.4)' }}
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 18 }}
          >
            <div className="sl-corner tl" style={{ borderColor: '#f87171' }} />
            <div className="sl-corner tr" style={{ borderColor: '#f87171' }} />
            <div className="sl-corner bl" style={{ borderColor: '#f87171' }} />
            <div className="sl-corner br" style={{ borderColor: '#f87171' }} />

            <div style={{ fontSize: 28, marginBottom: 10 }}>⚠</div>

            <div
              className="cinzel"
              style={{ fontSize: 14, fontWeight: 700, color: '#f87171', letterSpacing: 2, marginBottom: 6 }}
            >
              Daily Reset
            </div>

            <div style={{ fontSize: 13, color: '#6a9abb', marginBottom: 14, lineHeight: 1.6 }}>
              You failed{' '}
              <span style={{ color: '#f87171', fontWeight: 600 }}>{resetNotification.failedCount}</span>{' '}
              {resetNotification.failedCount === 1 ? 'quest' : 'quests'} yesterday.
            </div>

            <div
              className="cinzel"
              style={{ fontSize: 28, fontWeight: 900, color: '#f87171', marginBottom: 16, textShadow: '0 0 20px rgba(248,113,113,0.4)' }}
            >
              -{resetNotification.xpLost} XP
            </div>

            <button className="sl-btn sl-btn-primary" onClick={dismissResetNotification} style={{ letterSpacing: 3 }}>
              Acknowledged
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
