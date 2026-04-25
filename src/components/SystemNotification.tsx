import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export default function SystemNotification() {
  const { systemNotifications, dismissSystemNotif } = useGameStore()
  const notif = systemNotifications[0]

  useEffect(() => {
    if (!notif) return
    const t = setTimeout(dismissSystemNotif, 2800)
    return () => clearTimeout(t)
  }, [notif?.id])

  const isBoss = notif?.title === 'BOSS CLEARED'

  return (
    <AnimatePresence>
      {notif && (
        <motion.div
          key={notif.id}
          style={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 250,
            minWidth: 280,
            maxWidth: 400,
            pointerEvents: 'none',
          }}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        >
          <div
            style={{
              background: 'rgba(2,8,22,0.97)',
              border: `1px solid ${isBoss ? 'rgba(248,113,113,0.6)' : 'rgba(30,110,181,0.6)'}`,
              borderTop: 'none',
              padding: '12px 20px 14px',
              position: 'relative',
            }}
          >
            {/* Bottom glow line */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg, transparent, ${isBoss ? 'rgba(248,113,113,0.8)' : 'rgba(74,158,221,0.8)'}, transparent)`,
            }} />
            {/* Side glow lines */}
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 1, background: `linear-gradient(180deg, ${isBoss ? 'rgba(248,113,113,0.6)' : 'rgba(74,158,221,0.6)'}, transparent)` }} />
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 1, background: `linear-gradient(180deg, ${isBoss ? 'rgba(248,113,113,0.6)' : 'rgba(74,158,221,0.6)'}, transparent)` }} />

            <div style={{ textAlign: 'center' }}>
              <div
                className="cinzel"
                style={{
                  fontSize: 10,
                  letterSpacing: 4,
                  color: isBoss ? '#f87171' : '#4a9edd',
                  marginBottom: 4,
                }}
              >
                ✦ {notif.title} ✦
              </div>
              <div style={{ fontSize: 14, color: '#c8d6e5', fontWeight: 600, marginBottom: 4 }}>
                {notif.subtitle}
              </div>
              {notif.xp && (
                <div className="cinzel" style={{ fontSize: 16, fontWeight: 700, color: '#fbbf24' }}>
                  +{notif.xp} XP
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
