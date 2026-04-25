import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/',             label: 'Home',    icon: '◈' },
  { to: '/quests',       label: 'Quests',  icon: '⚔' },
  { to: '/profile',      label: 'Profile', icon: '◉' },
  { to: '/achievements', label: 'Awards',  icon: '◆' },
  { to: '/shadows',      label: 'Shadows', icon: '👻' },
]

export default function BottomNav() {
  return (
    <nav className="sl-bottom-nav">
      {NAV.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => `sl-bottom-nav-item${isActive ? ' active' : ''}`}
        >
          <span className="sl-bottom-nav-icon">{icon}</span>
          <span className="sl-bottom-nav-label cinzel">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
