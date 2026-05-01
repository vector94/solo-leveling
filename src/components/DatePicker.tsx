import { useState, useRef, useEffect } from 'react'
import { Calendar } from 'lucide-react'

interface Props {
  value: string
  onChange: (date: string) => void
  placeholder?: string
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

export default function DatePicker({ value, onChange, placeholder = 'Select date...' }: Props) {
  const today = new Date()
  const initial = value ? new Date(value + 'T00:00:00') : today

  const [open, setOpen] = useState(false)
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function prevMonth() {
    setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 })
  }

  function nextMonth() {
    setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 })
  }

  function selectDay(day: number) {
    const d = new Date(view.year, view.month, day)
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    onChange(iso)
    setOpen(false)
  }

  function clearDate() {
    onChange('')
    setOpen(false)
  }

  const firstDay = new Date(view.year, view.month, 1).getDay()
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const displayValue = value
    ? new Date(value + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : ''

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="sl-input"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', textAlign: 'left',
          color: displayValue ? '#c8d6e5' : '#2a5070',
        }}
      >
        <span>{displayValue || placeholder}</span>
        <Calendar size={14} color="#1e6eb5" />
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 200,
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1a2e 100%)',
          border: '1px solid rgba(74,158,221,0.3)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          padding: '12px',
        }}>
          {/* Month navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <button type="button" onClick={prevMonth} style={navBtn}>‹</button>
            <span className="cinzel" style={{ fontSize: 12, color: '#4a9edd', letterSpacing: 1 }}>
              {MONTHS[view.month]} {view.year}
            </span>
            <button type="button" onClick={nextMonth} style={navBtn}>›</button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 9, color: '#2a5070', fontFamily: 'Cinzel, serif', letterSpacing: 1, padding: '2px 0' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const iso = `${view.year}-${String(view.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const isSelected = iso === value
              const isToday = iso === todayStr
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => selectDay(day)}
                  style={{
                    padding: '5px 0',
                    fontSize: 12,
                    borderRadius: 2,
                    border: isToday && !isSelected ? '1px solid rgba(74,158,221,0.3)' : '1px solid transparent',
                    background: isSelected ? 'linear-gradient(135deg, #1e4a7a, #1a6eb5)' : 'transparent',
                    color: isSelected ? '#e0eeff' : '#6a9abb',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    fontFamily: 'Rajdhani, sans-serif',
                    boxShadow: isSelected ? '0 0 8px rgba(74,158,221,0.4)' : 'none',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(74,158,221,0.1)' }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {/* Clear */}
          {value && (
            <button
              type="button"
              onClick={clearDate}
              style={{
                marginTop: 10, width: '100%', padding: '5px 0',
                background: 'transparent', border: '1px solid rgba(248,113,113,0.2)',
                borderRadius: 2, color: 'rgba(248,113,113,0.5)',
                fontSize: 10, fontFamily: 'Cinzel, serif', letterSpacing: 2,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(248,113,113,0.5)'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.2)' }}
            >
              CLEAR DATE
            </button>
          )}
        </div>
      )}
    </div>
  )
}

const navBtn: React.CSSProperties = {
  background: 'none', border: 'none', color: '#4a9edd',
  cursor: 'pointer', fontSize: 18, padding: '0 8px', lineHeight: 1,
}
