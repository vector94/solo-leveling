export type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S'
export type Difficulty = 'E' | 'D' | 'C' | 'B' | 'A'
export type QuestType = 'daily' | 'one-time' | 'boss'
export type QuestCategory = 'Physical' | 'Mental' | 'Study' | 'Work' | 'Habit'
export type QuestStatus = 'active' | 'completed' | 'failed'

export interface Stats {
  STR: number
  AGI: number
  INT: number
  SEN: number
  VIT: number
}

export interface Quest {
  id: string
  title: string
  difficulty: Difficulty
  type: QuestType
  category: QuestCategory
  status: QuestStatus
  recurring: boolean
  xpReward: number
  dueDate?: string
  completedAt?: string
  failedAt?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
}

export interface ResetNotification {
  failedCount: number
  xpLost: number
}
