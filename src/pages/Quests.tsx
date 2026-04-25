import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import QuestCard from '../components/QuestCard'
import QuestModal from '../components/QuestModal'
import Panel from '../components/Panel'
import type { QuestType } from '../lib/types'

type Filter = 'all' | QuestType

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All',      value: 'all' },
  { label: 'Daily',    value: 'daily' },
  { label: 'One-Time', value: 'one-time' },
  { label: 'Boss',     value: 'boss' },
]

const STATUS_ORDER = { active: 0, failed: 1, completed: 2 }

export default function Quests() {
  const { quests } = useGameStore()
  const [filter, setFilter] = useState<Filter>('all')
  const [showModal, setShowModal] = useState(false)

  const filtered = quests
    .filter(q => filter === 'all' || q.type === filter)
    .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])

  return (
    <div className="sl-page">
      {/* Header */}
      <div style={{ textAlign: 'center', paddingBottom: 20 }}>
        <div className="sl-system-label">Quest Board</div>
        <div className="sl-system-title">Active Missions</div>
      </div>

      {/* Filter tabs */}
      <div className="sl-tabs" style={{ marginBottom: 14 }}>
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            className={`sl-tab${filter === value ? ' active' : ''}`}
            onClick={() => setFilter(value)}
          >
            {label}
            <span style={{ opacity: 0.5, marginLeft: 4 }}>
              {value === 'all' ? quests.length : quests.filter(q => q.type === value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Action */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button className="sl-btn sl-btn-primary" onClick={() => setShowModal(true)}>
          + New Quest
        </button>
      </div>

      {/* Quest list */}
      <Panel title={`${filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)} Quests (${filtered.length})`}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0', fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: 1, color: '#1e3a5a' }}>
            No quests registered.
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((q, i) => <QuestCard key={q.id} quest={q} index={i} />)}
          </AnimatePresence>
        )}
      </Panel>

      {showModal && <QuestModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
