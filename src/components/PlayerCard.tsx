import { useState } from 'react'
import { getRankForLevel } from '../lib/xp'
import { useGameStore } from '../store/gameStore'
import RankBadge from './RankBadge'
import XPBar from './XPBar'
import Panel from './Panel'

function MiniBar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'Cinzel, serif', letterSpacing: 1, marginBottom: 3 }}>
        <span style={{ color: '#2a5a7a' }}>{label}</span>
        <span style={{ color }}>{value.toLocaleString()} / {max.toLocaleString()}</span>
      </div>
      <div style={{ height: 6, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(30,110,181,0.2)', borderRadius: 1, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(value / max) * 100}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  )
}

export default function PlayerCard() {
  const { playerName, level, currentXP, totalXP, dailyStreak, totalQuestsCompleted, setPlayerName, stats } = useGameStore()
  const rank = getRankForLevel(level)
  const [editing, setEditing] = useState(false)
  const [nameInput, setNameInput] = useState(playerName)

  const maxHP = 100 + level * 10 + stats.VIT * 5
  const maxMP = 50 + level * 5 + stats.INT * 3

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
                style={{ fontSize: 20, fontWeight: 700, color: '#e0eeff', cursor: 'pointer', borderBottom: '1px dashed rgba(74,158,221,0.3)' }}
                title="Click to rename"
              >
                {playerName}
              </span>
            )}
          </div>

          <div className="cinzel" style={{ fontSize: 12, color: '#4a9edd', letterSpacing: 1, marginBottom: 10 }}>
            Level {level} · {rank}-Rank Hunter
          </div>

          {/* XP Bar */}
          <XPBar currentXP={currentXP} level={level} />

          {/* HP / MP bars */}
          <MiniBar value={maxHP} max={maxHP} color="#ef4444" label="HP" />
          <MiniBar value={maxMP} max={maxMP} color="#3b82f6" label="MP" />

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
