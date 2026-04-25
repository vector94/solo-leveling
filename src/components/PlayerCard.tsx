import { useState } from 'react'
import { getRankForLevel } from '../lib/xp'
import { useGameStore } from '../store/gameStore'
import RankBadge from './RankBadge'
import XPBar from './XPBar'
import Panel from './Panel'

export default function PlayerCard() {
  const { playerName, level, currentXP, totalXP, dailyStreak, totalQuestsCompleted, setPlayerName } = useGameStore()
  const rank = getRankForLevel(level)
  const [editing, setEditing] = useState(false)
  const [nameInput, setNameInput] = useState(playerName)

  function saveName() {
    if (nameInput.trim()) setPlayerName(nameInput.trim())
    setEditing(false)
  }

  return (
    <Panel title="Player Status">
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'start' }}>
        <RankBadge rank={rank} size="lg" />

        <div>
          {/* Name */}
          <div style={{ marginBottom: 4 }}>
            {editing ? (
              <input
                autoFocus
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onBlur={saveName}
                onKeyDown={e => e.key === 'Enter' && saveName()}
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(74,158,221,0.6)',
                  borderRadius: 1,
                  padding: '4px 10px',
                  color: '#e0eeff',
                  fontFamily: 'Cinzel, serif',
                  fontSize: 18,
                  fontWeight: 700,
                  outline: 'none',
                  width: 200,
                }}
              />
            ) : (
              <span
                onClick={() => { setNameInput(playerName); setEditing(true) }}
                className="cinzel"
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#e0eeff',
                  cursor: 'pointer',
                  borderBottom: '1px dashed rgba(74,158,221,0.3)',
                }}
                title="Click to rename"
              >
                {playerName}
              </span>
            )}
          </div>

          {/* Level + rank label */}
          <div
            className="cinzel"
            style={{ fontSize: 12, color: '#4a9edd', letterSpacing: 1, marginBottom: 10 }}
          >
            Level {level} · {rank}-Rank Hunter
          </div>

          {/* XP Bar */}
          <XPBar currentXP={currentXP} level={level} />

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 11, flexWrap: 'wrap' }}>
            <div style={{ color: '#4a7a9b' }}>
              Total XP: <span style={{ color: '#4a9edd', fontWeight: 600 }}>{totalXP.toLocaleString()}</span>
            </div>
            <div style={{ color: '#4a7a9b' }}>
              Quests: <span style={{ color: '#4a9edd', fontWeight: 600 }}>{totalQuestsCompleted}</span>
            </div>
            <div style={{ color: '#4a7a9b' }}>
              Streak: <span style={{ color: '#fbbf24', fontWeight: 600 }}>{dailyStreak}d 🔥</span>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}
