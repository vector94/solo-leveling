import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import PlayerCard from '../components/PlayerCard'
import QuestCard from '../components/QuestCard'
import QuestModal from '../components/QuestModal'
import Panel from '../components/Panel'

export default function Dashboard() {
  const { quests, dailyStreak, totalQuestsCompleted, performDailyReset } = useGameStore()
  const [showModal, setShowModal] = useState(false)
  const [notif, setNotif] = useState<string | null>(null)
  const notifRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dailyQuests = quests.filter(q => q.type === 'daily')
  const bossQuests  = quests.filter(q => q.type === 'boss' && q.status === 'active')
  const active      = dailyQuests.filter(q => q.status === 'active')
  const completed   = dailyQuests.filter(q => q.status === 'completed')

  function resetAndNotify() {
    performDailyReset()
    setNotif('Daily quests reset!')
    if (notifRef.current) clearTimeout(notifRef.current)
    notifRef.current = setTimeout(() => setNotif(null), 2500)
  }

  return (
    <div className="sl-page" style={{ position: 'relative' }}>

      {/* XP gain notification */}
      <AnimatePresence>
        {notif && (
          <motion.div
            className="sl-notif"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {notif}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ textAlign: 'center', paddingBottom: 20, marginBottom: 4 }}>
        <div className="sl-system-label">System Interface</div>
        <div className="sl-system-title">Hunter's Daily System</div>
      </div>

      {/* Player card */}
      <div style={{ marginBottom: 14 }}>
        <PlayerCard />
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }} className="sl-stats-grid-mobile">
        {[
          { label: 'Streak', value: `${dailyStreak}d`, color: '#fbbf24' },
          { label: 'Today', value: `${completed.length}/${dailyQuests.length}`, color: '#4a9edd' },
          { label: 'Total Cleared', value: totalQuestsCompleted, color: '#4ade80' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="sl-panel"
            style={{ padding: '14px 10px', textAlign: 'center' }}
          >
            <div className="sl-corner tl" /><div className="sl-corner tr" />
            <div className="sl-corner bl" /><div className="sl-corner br" />
            <div className="cinzel" style={{ fontSize: 9, letterSpacing: 2, color: '#1e6eb5', textTransform: 'uppercase', marginBottom: 6 }}>
              {label}
            </div>
            <div className="cinzel" style={{ fontSize: 26, fontWeight: 900, color, textShadow: `0 0 12px ${color}55` }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginBottom: 12 }}>
        <button className="sl-btn sl-btn-ghost" onClick={resetAndNotify}>↺ Reset Daily</button>
        <button className="sl-btn sl-btn-primary" onClick={() => setShowModal(true)}>+ New Quest</button>
      </div>

      {/* Boss quests */}
      {bossQuests.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <Panel title={`Boss Quests (${bossQuests.length})`}>
            <AnimatePresence>
              {bossQuests.map((q, i) => <QuestCard key={q.id} quest={q} index={i} />)}
            </AnimatePresence>
          </Panel>
        </div>
      )}

      {/* Active daily quests */}
      <div style={{ marginBottom: 10 }}>
        <Panel title={`Active Quests (${active.length})`}>
          {active.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0', fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: 1, color: '#1e3a5a' }}>
              All quests cleared for today.
            </div>
          ) : (
            <AnimatePresence>
              {active.map((q, i) => <QuestCard key={q.id} quest={q} index={i} />)}
            </AnimatePresence>
          )}
        </Panel>
      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <Panel title={`Completed (${completed.length})`}>
          <AnimatePresence>
            {completed.map((q, i) => <QuestCard key={q.id} quest={q} index={i} />)}
          </AnimatePresence>
        </Panel>
      )}

      {showModal && <QuestModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
