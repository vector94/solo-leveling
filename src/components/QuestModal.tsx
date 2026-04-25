import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { getXPReward } from '../lib/xp'
import type { Difficulty, QuestType, QuestCategory } from '../lib/types'

interface Props {
  onClose: () => void
}

const DIFFICULTIES: Difficulty[] = ['E', 'D', 'C', 'B', 'A']
const TYPES: QuestType[] = ['daily', 'one-time', 'boss']
const CATEGORIES: QuestCategory[] = ['Physical', 'Mental', 'Study', 'Work', 'Habit']

const DIFF_COLORS: Record<string, string> = {
  E: '#9ca3af', D: '#4ade80', C: '#38bdf8', B: '#c084fc', A: '#f87171',
}

export default function QuestModal({ onClose }: Props) {
  const { addQuest } = useGameStore()
  const [title, setTitle] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>('D')
  const [type, setType] = useState<QuestType>('daily')
  const [category, setCategory] = useState<QuestCategory>('Physical')
  const [dueDate, setDueDate] = useState('')

  const xpPreview = getXPReward(difficulty, type)
  const isRecurring = type === 'daily'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    addQuest({
      title: title.trim(),
      difficulty,
      type,
      category,
      recurring: isRecurring,
      xpReward: xpPreview,
      dueDate: dueDate || undefined,
    })
    onClose()
  }

  const label = (text: string) => (
    <div
      className="cinzel"
      style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#1e6eb5', marginBottom: 7 }}
    >
      {text}
    </div>
  )

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="sl-panel sl-modal-sheet"
          style={{ width: '100%', maxWidth: 440, marginBottom: 0 }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="sl-corner tl" /><div className="sl-corner tr" />
          <div className="sl-corner bl" /><div className="sl-corner br" />
          <div className="sl-panel-header">
            <span className="sl-panel-title">Register New Quest</span>
            <button
              onClick={onClose}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#4a7a9b', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: 16 }}>
            {/* Title */}
            <div style={{ marginBottom: 14 }}>
              {label('Quest Title')}
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter quest name..."
                className="sl-input"
                autoFocus
              />
            </div>

            {/* Type */}
            <div style={{ marginBottom: 14 }}>
              {label('Quest Type')}
              <div style={{ display: 'flex', gap: 6 }}>
                {TYPES.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`sl-btn ${type === t ? (t === 'boss' ? 'sl-btn-danger' : 'sl-btn-primary') : 'sl-btn-ghost'}`}
                    style={{ flex: 1, textTransform: 'capitalize' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div style={{ marginBottom: 14 }}>
              {label('Difficulty')}
              <div style={{ display: 'flex', gap: 6 }}>
                {DIFFICULTIES.map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className="sl-btn"
                    style={{
                      flex: 1,
                      borderColor: difficulty === d ? DIFF_COLORS[d] : 'rgba(30,110,181,0.22)',
                      color: difficulty === d ? DIFF_COLORS[d] : '#4a7a9b',
                      background: difficulty === d ? `${DIFF_COLORS[d]}18` : 'transparent',
                      boxShadow: difficulty === d ? `0 0 10px ${DIFF_COLORS[d]}40` : 'none',
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: 14 }}>
              {label('Category')}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`sl-btn ${category === c ? 'sl-btn-primary' : 'sl-btn-ghost'}`}
                    style={{ flex: '1 0 auto', fontSize: 9, letterSpacing: 1 }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Due date */}
            {!isRecurring && (
              <div style={{ marginBottom: 14 }}>
                {label('Due Date (optional)')}
                <input
                  type="date"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="sl-input"
                />
              </div>
            )}

            {/* XP preview */}
            <div
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 14px',
                background: 'rgba(251,191,36,0.05)',
                border: '1px solid rgba(251,191,36,0.2)',
                borderRadius: 1,
                marginBottom: 14,
              }}
            >
              <span className="cinzel" style={{ fontSize: 10, letterSpacing: 2, color: '#92733a' }}>XP REWARD</span>
              <span className="cinzel" style={{ fontSize: 20, fontWeight: 700, color: '#fbbf24' }}>+{xpPreview}</span>
            </div>

            <button
              type="submit"
              disabled={!title.trim()}
              className="sl-btn sl-btn-primary"
              style={{ width: '100%', fontSize: 11, letterSpacing: 3, padding: '11px 0', opacity: title.trim() ? 1 : 0.4 }}
            >
              Confirm Quest
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
