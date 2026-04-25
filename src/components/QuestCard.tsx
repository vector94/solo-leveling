import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import type { Quest } from '../lib/types'

const DIFF_COLORS: Record<string, string> = {
  E: '#9ca3af',
  D: '#4ade80',
  C: '#38bdf8',
  B: '#c084fc',
  A: '#f87171',
}

const BOSS_COLOR = '#ff4444'

const CATEGORY_ICONS: Record<string, string> = {
  Physical: '💪',
  Mental: '🧠',
  Study: '📚',
  Work: '💼',
  Habit: '⚡',
}

interface Props {
  quest: Quest
  index?: number
}

export default function QuestCard({ quest, index = 0 }: Props) {
  const { completeQuest, failQuest, deleteQuest } = useGameStore()
  const [burst, setBurst] = useState(false)
  const color = quest.type === 'boss' ? BOSS_COLOR : (DIFF_COLORS[quest.difficulty] ?? '#9ca3af')
  const isDone = quest.status === 'completed'
  const isFailed = quest.status === 'failed'
  const isBoss = quest.type === 'boss'

  function handleComplete() {
    setBurst(true)
    completeQuest(quest.id)
    setTimeout(() => setBurst(false), 700)
  }

  const BURST_COUNT = isBoss ? 18 : 12

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: isDone || isFailed ? 0.45 : 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className={`quest-item${isDone || isFailed ? ' done' : ''}`}
      style={{ '--diff-color': color, overflow: 'visible' } as React.CSSProperties}
    >
      {/* Colored left strip */}
      <div
        className="quest-item-strip"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />

      {/* Burst particles */}
      <AnimatePresence>
        {burst && (
          <div style={{ position: 'absolute', top: '50%', left: 40, pointerEvents: 'none', zIndex: 10 }}>
            {Array.from({ length: BURST_COUNT }, (_, i) => {
              const angle = (i / BURST_COUNT) * Math.PI * 2
              const dist = isBoss ? 55 : 38
              return (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: isBoss ? 5 : 4,
                    height: isBoss ? 5 : 4,
                    borderRadius: '50%',
                    background: i % 3 === 0 ? '#fbbf24' : color,
                    boxShadow: `0 0 6px ${i % 3 === 0 ? '#fbbf24' : color}`,
                    marginLeft: -2, marginTop: -2,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist * 0.55, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Complete button */}
      {!isDone && !isFailed && (
        <button
          className="quest-complete-btn"
          style={{ borderColor: color, color }}
          onClick={handleComplete}
          title="Complete"
        >
          ✓
        </button>
      )}

      {isDone && (
        <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: 16 }}>
          ✓
        </div>
      )}

      {isFailed && (
        <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', fontSize: 16 }}>
          ✕
        </div>
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: isDone ? '#4a6a8a' : '#c8d6e5',
            textDecoration: isDone ? 'line-through' : 'none',
            letterSpacing: '0.2px',
            marginBottom: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>{CATEGORY_ICONS[quest.category]}</span>
          {isBoss && (
            <span
              className="cinzel"
              style={{
                fontSize: 9,
                padding: '1px 6px',
                border: `1px solid ${BOSS_COLOR}`,
                color: BOSS_COLOR,
                letterSpacing: 1,
                borderRadius: 1,
              }}
            >
              BOSS
            </span>
          )}
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {quest.title}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
          {quest.recurring && (
            <span style={{ color: '#1e6eb5', letterSpacing: 1, textTransform: 'uppercase', fontSize: 9, fontFamily: 'Cinzel, serif' }}>
              ↺ Daily
            </span>
          )}
        </div>
      </div>

      {/* Right: diff badge + xp */}
      <div
        className="quest-diff-badge"
        style={{ borderColor: color, color }}
      >
        {quest.difficulty}
      </div>

      <div
        className="cinzel"
        style={{ fontSize: 12, color: '#fbbf24', fontWeight: 600, letterSpacing: '0.5px', flexShrink: 0 }}
      >
        +{quest.xpReward}
      </div>

      {/* Fail button (active only) */}
      {quest.status === 'active' && (
        <button
          onClick={() => failQuest(quest.id)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(248,113,113,0.3)',
            cursor: 'pointer',
            fontSize: 13,
            padding: '2px 4px',
            transition: 'color 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(248,113,113,0.9)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,113,113,0.3)')}
          title="Fail quest"
        >
          ✕
        </button>
      )}

      {/* Delete */}
      <button
        onClick={() => deleteQuest(quest.id)}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(248,113,113,0.2)',
          cursor: 'pointer',
          fontSize: 15,
          padding: '2px 4px',
          transition: 'color 0.2s',
          flexShrink: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'rgba(248,113,113,0.7)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,113,113,0.2)')}
        title="Delete"
      >
        ×
      </button>
    </motion.div>
  )
}
