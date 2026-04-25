import { NavLink } from 'react-router-dom'
import { getRankForLevel } from '../lib/xp'
import { useGameStore } from '../store/gameStore'
import { RANK_COLORS } from './RankBadge'

const NAV = [
  { to: '/',             label: 'Dashboard',     icon: '◈' },
  { to: '/quests',       label: 'Quests',         icon: '⚔' },
  { to: '/profile',      label: 'Profile',        icon: '◉' },
  { to: '/achievements', label: 'Achievements',   icon: '◆' },
]

export default function Sidebar() {
  const { playerName, level } = useGameStore()
  const rank = getRankForLevel(level)
  const { color, glow } = RANK_COLORS[rank]

  return (
    <aside className="sl-sidebar">
      {/* Header */}
      <div style={{ padding: '22px 16px 16px', borderBottom: '1px solid rgba(30,110,181,0.18)' }}>
        <div className="sl-system-label" style={{ marginBottom: 4 }}>System Interface</div>
        <div className="sl-system-title" style={{ fontSize: 16 }}>Hunter's Daily System</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {NAV.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `sl-nav-link${isActive ? ' active' : ''}`}
          >
            <span style={{ fontSize: 14, fontFamily: 'monospace' }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Player mini status */}
      <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(30,110,181,0.18)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 40, height: 40,
              border: `1px solid ${color}`,
              borderRadius: 2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.7)',
              boxShadow: `0 0 14px ${glow}`,
              flexShrink: 0,
            }}
          >
            <span className="cinzel" style={{ fontSize: 18, fontWeight: 900, color, textShadow: `0 0 10px ${color}` }}>
              {rank}
            </span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="cinzel" style={{ fontSize: 13, fontWeight: 700, color: '#e0eeff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {playerName}
            </div>
            <div className="cinzel" style={{ fontSize: 9, color, letterSpacing: 1 }}>
              Lv.{level} {rank}-Rank
            </div>
          </div>
        </div>
      </div>

      {/* Flavour */}
      <div style={{ padding: '8px 16px 16px', textAlign: 'center' }}>
        <span className="cinzel" style={{ fontSize: 9, letterSpacing: 3, color: '#0d2a45', textTransform: 'uppercase' }}>
          "Arise." — Sung Jin-Woo
        </span>
      </div>
    </aside>
  )
}
