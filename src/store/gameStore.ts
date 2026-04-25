import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Quest, Achievement, Stats, ResetNotification } from '../lib/types'
import { xpForLevel, getRankForLevel, XP_PENALTY_RATIO } from '../lib/xp'
import { getInitialAchievements, checkNewAchievements } from '../lib/achievements'

interface GameState {
  // Player
  playerName: string
  level: number
  currentXP: number
  totalXP: number
  stats: Stats
  unallocatedPoints: number
  totalQuestsCompleted: number
  dailyStreak: number
  lastActiveDate: string
  lastResetDate: string

  // UI queues
  levelUpQueue: number[]
  pendingAchievements: string[]
  resetNotification: ResetNotification | null

  // Quests
  quests: Quest[]

  // Achievements
  achievements: Achievement[]

  // Actions
  setPlayerName: (name: string) => void
  gainXP: (amount: number) => void
  loseXP: (amount: number) => void
  allocateStat: (stat: keyof Stats) => void
  dismissLevelUp: () => void
  dismissAchievement: () => void
  dismissResetNotification: () => void

  addQuest: (quest: Omit<Quest, 'id' | 'status'>) => void
  editQuest: (id: string, updates: Partial<Omit<Quest, 'id'>>) => void
  deleteQuest: (id: string) => void
  completeQuest: (id: string) => void
  failQuest: (id: string) => void

  performDailyReset: () => void
  updateStreak: () => void
  checkAchievements: () => void
}

const INITIAL_STATS: Stats = { STR: 5, AGI: 5, INT: 5, SEN: 5, VIT: 5 }

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      playerName: 'Hunter',
      level: 1,
      currentXP: 0,
      totalXP: 0,
      stats: INITIAL_STATS,
      unallocatedPoints: 0,
      totalQuestsCompleted: 0,
      dailyStreak: 0,
      lastActiveDate: '',
      lastResetDate: new Date().toDateString(),
      levelUpQueue: [],
      pendingAchievements: [],
      resetNotification: null,
      quests: [],
      achievements: getInitialAchievements(),

      setPlayerName: (name) => set({ playerName: name }),

      gainXP: (amount) => {
        set((state) => {
          let currentXP = state.currentXP + amount
          let level = state.level
          let unallocatedPoints = state.unallocatedPoints
          const levelUpQueue = [...state.levelUpQueue]

          let threshold = xpForLevel(level)
          while (currentXP >= threshold) {
            currentXP -= threshold
            level++
            unallocatedPoints += 5
            levelUpQueue.push(level)
            threshold = xpForLevel(level)
          }

          return {
            currentXP,
            totalXP: state.totalXP + amount,
            level,
            unallocatedPoints,
            levelUpQueue,
          }
        })
      },

      loseXP: (amount) => {
        set((state) => ({
          currentXP: Math.max(0, state.currentXP - amount),
        }))
      },

      allocateStat: (stat) => {
        set((state) => {
          if (state.unallocatedPoints <= 0) return state
          return {
            stats: { ...state.stats, [stat]: state.stats[stat] + 1 },
            unallocatedPoints: state.unallocatedPoints - 1,
          }
        })
      },

      dismissLevelUp: () => {
        set((state) => ({ levelUpQueue: state.levelUpQueue.slice(1) }))
      },

      dismissAchievement: () => {
        set((state) => ({ pendingAchievements: state.pendingAchievements.slice(1) }))
      },

      dismissResetNotification: () => set({ resetNotification: null }),

      addQuest: (questData) => {
        const quest: Quest = {
          ...questData,
          id: crypto.randomUUID(),
          status: 'active',
        }
        set((state) => ({ quests: [...state.quests, quest] }))
      },

      editQuest: (id, updates) => {
        set((state) => ({
          quests: state.quests.map((q) => (q.id === id ? { ...q, ...updates } : q)),
        }))
      },

      deleteQuest: (id) => {
        set((state) => ({ quests: state.quests.filter((q) => q.id !== id) }))
      },

      completeQuest: (id) => {
        const quest = get().quests.find((q) => q.id === id)
        if (!quest || quest.status === 'completed') return

        set((state) => ({
          quests: state.quests.map((q) =>
            q.id === id
              ? { ...q, status: 'completed', completedAt: new Date().toISOString() }
              : q
          ),
          totalQuestsCompleted: state.totalQuestsCompleted + 1,
        }))

        get().gainXP(quest.xpReward)
        get().updateStreak()
        get().checkAchievements()
      },

      failQuest: (id) => {
        const quest = get().quests.find((q) => q.id === id)
        if (!quest || quest.status !== 'active') return

        const penalty = Math.floor(quest.xpReward * XP_PENALTY_RATIO)

        set((state) => ({
          quests: state.quests.map((q) =>
            q.id === id
              ? { ...q, status: 'failed', failedAt: new Date().toISOString() }
              : q
          ),
        }))

        get().loseXP(penalty)
      },

      performDailyReset: () => {
        const today = new Date().toDateString()
        const state = get()
        if (state.lastResetDate === today) return

        const failedQuests = state.quests.filter(
          (q) => q.recurring && q.status === 'active'
        )

        const xpLost = failedQuests.reduce(
          (sum, q) => sum + Math.floor(q.xpReward * XP_PENALTY_RATIO),
          0
        )

        set((s) => ({
          quests: s.quests.map((q) =>
            q.recurring ? { ...q, status: 'active', completedAt: undefined, failedAt: undefined } : q
          ),
          lastResetDate: today,
          resetNotification:
            failedQuests.length > 0 ? { failedCount: failedQuests.length, xpLost } : null,
        }))

        if (xpLost > 0) get().loseXP(xpLost)

        // Update streak — if they had no completed quests yesterday, streak breaks
        const hadCompletedYesterday = state.quests.some(
          (q) => q.status === 'completed' && q.recurring
        )
        if (!hadCompletedYesterday) {
          set({ dailyStreak: 0 })
        }
      },

      updateStreak: () => {
        const today = new Date().toDateString()
        set((state) => {
          if (state.lastActiveDate === today) return state

          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const wasYesterday = state.lastActiveDate === yesterday.toDateString()

          return {
            dailyStreak: wasYesterday ? state.dailyStreak + 1 : 1,
            lastActiveDate: today,
          }
        })
      },

      checkAchievements: () => {
        const state = get()
        const snap = {
          level: state.level,
          totalQuestsCompleted: state.totalQuestsCompleted,
          dailyStreak: state.dailyStreak,
          quests: state.quests,
          stats: state.stats,
          unallocatedPoints: state.unallocatedPoints,
        }

        const newIds = checkNewAchievements(state.achievements, snap)
        if (newIds.length === 0) return

        const now = new Date().toISOString()
        set((s) => ({
          achievements: s.achievements.map((a) =>
            newIds.includes(a.id) ? { ...a, unlockedAt: now } : a
          ),
          pendingAchievements: [...s.pendingAchievements, ...newIds],
        }))
      },
    }),
    {
      name: 'solo-leveling-game',
    }
  )
)

export function getRank(level: number) {
  return getRankForLevel(level)
}
