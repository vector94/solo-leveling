import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { RANK_COLORS } from './RankBadge'
import type { Rank } from '../lib/types'

const RANK_LABELS: Record<Rank, string> = {
  E: 'E-Rank Hunter',
  D: 'D-Rank Hunter',
  C: 'C-Rank Hunter',
  B: 'B-Rank Hunter',
  A: 'A-Rank Hunter',
  S: 'Shadow Monarch',
}

export default function RankUpModal() {
  const { rankUpQueue, levelUpQueue, dismissRankUp } = useGameStore()

  // Only show after all level-up modals are cleared
  const rank = levelUpQueue.length === 0 ? (rankUpQueue[0] as Rank | undefined) : undefined
  if (!rank) return null

  const { color, glow } = RANK_COLORS[rank]

  return (
    <AnimatePresence>
      <motion.div
        key={rank}
        style={{
          position: 'fixed', inset: 0, zIndex: 110,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(8px)',
          padding: 20,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Full-screen rank color pulse */}
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at center, ${color}18 0%, transparent 65%)`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 20px' }}
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 180, delay: 0.1 }}
        >
          <motion.div
            className="cinzel"
            style={{ fontSize: 11, letterSpacing: 6, color: '#6a9abb', marginBottom: 12 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            RANK HAS INCREASED
          </motion.div>

          {/* Giant rank letter */}
          <motion.div
            style={{
              fontSize: 'clamp(80px, 20vw, 140px)',
              fontFamily: 'Cinzel, serif',
              fontWeight: 900,
              color,
              lineHeight: 1,
              textShadow: `0 0 40px ${color}, 0 0 80px ${glow}, 0 0 120px ${glow}`,
              marginBottom: 16,
            }}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 150, delay: 0.2 }}
          >
            {rank}
          </motion.div>

          <motion.div
            className="cinzel"
            style={{ fontSize: 18, fontWeight: 700, color, letterSpacing: 3, marginBottom: 6, textShadow: `0 0 16px ${color}` }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {RANK_LABELS[rank]}
          </motion.div>

          <motion.div
            className="cinzel"
            style={{ fontSize: 10, letterSpacing: 3, color: '#4a8aaa', marginBottom: 32 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            THE SYSTEM HAS ACKNOWLEDGED YOUR GROWTH
          </motion.div>

          <motion.button
            className="sl-btn sl-btn-primary"
            style={{ letterSpacing: 4, fontSize: 11, padding: '12px 32px', borderColor: color, color }}
            onClick={dismissRankUp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Arise
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
