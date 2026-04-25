import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import LevelUpModal from './components/LevelUpModal'
import AchievementToast from './components/AchievementToast'
import ResetNotification from './components/ResetNotification'
import ParticleBackground from './components/ParticleBackground'
import SystemNotification from './components/SystemNotification'
import RankUpModal from './components/RankUpModal'
import Dashboard from './pages/Dashboard'
import Quests from './pages/Quests'
import Profile from './pages/Profile'
import Achievements from './pages/Achievements'
import Shadows from './pages/Shadows'
import { useGameStore } from './store/gameStore'

function useMidnightReset() {
  const performDailyReset = useGameStore((s) => s.performDailyReset)

  useEffect(() => {
    performDailyReset()

    function scheduleNext() {
      const now = new Date()
      const midnight = new Date(now)
      midnight.setHours(24, 0, 0, 0)
      const ms = midnight.getTime() - now.getTime()
      return setTimeout(() => { performDailyReset(); scheduleNext() }, ms)
    }

    const timer = scheduleNext()
    return () => clearTimeout(timer)
  }, [performDailyReset])
}

function AppInner() {
  useMidnightReset()

  return (
    <>
      <ParticleBackground />
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{ flex: 1, minWidth: 0, overflowX: 'hidden' }}>
          <Routes>
            <Route path="/"             element={<Dashboard />} />
            <Route path="/quests"       element={<Quests />} />
            <Route path="/profile"      element={<Profile />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/shadows"      element={<Shadows />} />
          </Routes>
        </main>
        <BottomNav />
        <LevelUpModal />
        <RankUpModal />
        <AchievementToast />
        <ResetNotification />
        <SystemNotification />
      </div>
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppInner />
    </HashRouter>
  )
}
