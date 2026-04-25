import { useEffect, useRef, useState } from 'react'
import { xpForLevel } from '../lib/xp'

interface Props {
  currentXP: number
  level: number
  prevXP?: number
}

export default function XPBar({ currentXP, level, prevXP }: Props) {
  const needed = xpForLevel(level)
  const pct = Math.min((currentXP / needed) * 100, 100)
  const [flash, setFlash] = useState(false)
  const prevRef = useRef(prevXP ?? currentXP)

  useEffect(() => {
    if (currentXP > prevRef.current) {
      setFlash(true)
      const t = setTimeout(() => setFlash(false), 650)
      prevRef.current = currentXP
      return () => clearTimeout(t)
    }
    prevRef.current = currentXP
  }, [currentXP])

  return (
    <div>
      <div className="xp-bar-wrap">
        <div
          className={`xp-bar-fill${flash ? ' flash' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          color: '#4a9edd',
          marginTop: 4,
          letterSpacing: '0.5px',
          fontFamily: 'Cinzel, serif',
        }}
      >
        <span>{currentXP.toLocaleString()} / {needed.toLocaleString()} XP</span>
        <span>{Math.round(pct)}%</span>
      </div>
    </div>
  )
}
