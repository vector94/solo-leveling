import { useState } from 'react'
import { useGameStore } from '../store/gameStore'

interface Props {
  open?: boolean
  onClose?: () => void
}

export default function NameModal({ open, onClose }: Props = {}) {
  const { playerName, setPlayerName } = useGameStore()
  const isEditMode = open !== undefined

  const visible = isEditMode ? open : !playerName
  const [input, setInput] = useState(isEditMode ? playerName : '')

  if (!visible) return null

  function handleSubmit() {
    const trimmed = input.trim()
    if (!trimmed) return
    setPlayerName(trimmed)
    onClose?.()
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={isEditMode ? onClose : undefined}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1a2e 100%)',
          border: '1px solid rgba(74,158,221,0.4)',
          borderRadius: 8,
          padding: '40px 48px',
          maxWidth: 420,
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 0 60px rgba(30,110,181,0.2), inset 0 1px 0 rgba(74,158,221,0.1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: 11, fontFamily: 'Cinzel, serif', letterSpacing: 4, color: '#4a9edd', marginBottom: 8 }}>
          {isEditMode ? 'SYSTEM UPDATE' : 'SYSTEM ONLINE'}
        </div>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, fontWeight: 700, color: '#e0eeff', margin: '0 0 6px' }}>
          {isEditMode ? 'Change Name' : 'Hunter Registration'}
        </h2>
        <p style={{ color: '#4a8aaa', fontSize: 13, marginBottom: 28 }}>
          {isEditMode ? 'Enter a new hunter name.' : 'Enter your name to begin your ascent.'}
        </p>

        <input
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSubmit()
            if (e.key === 'Escape' && isEditMode) onClose?.()
          }}
          placeholder="Your name..."
          maxLength={24}
          style={{
            width: '100%',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(74,158,221,0.5)',
            borderRadius: 4,
            padding: '10px 14px',
            color: '#e0eeff',
            fontFamily: 'Cinzel, serif',
            fontSize: 16,
            outline: 'none',
            textAlign: 'center',
            boxSizing: 'border-box',
            marginBottom: 16,
          }}
        />

        <div style={{ display: 'flex', gap: 8 }}>
          {isEditMode && (
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '10px 0',
                background: 'transparent',
                border: '1px solid rgba(74,158,221,0.2)',
                borderRadius: 4,
                color: '#4a8aaa',
                fontFamily: 'Cinzel, serif',
                fontSize: 13,
                letterSpacing: 2,
                cursor: 'pointer',
              }}
            >
              CANCEL
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            style={{
              flex: 1,
              padding: '10px 0',
              background: input.trim() ? 'linear-gradient(135deg, #1e4a7a, #1a6eb5)' : 'rgba(30,74,122,0.3)',
              border: '1px solid rgba(74,158,221,0.4)',
              borderRadius: 4,
              color: input.trim() ? '#e0eeff' : '#4a6a8a',
              fontFamily: 'Cinzel, serif',
              fontSize: 13,
              letterSpacing: 2,
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  )
}
