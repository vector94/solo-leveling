import type { Achievement, Quest, Stats } from './types'

interface GameSnapshot {
  level: number
  totalQuestsCompleted: number
  dailyStreak: number
  quests: Quest[]
  stats: Stats
  unallocatedPoints: number
}

interface AchievementDef {
  id: string
  title: string
  description: string
  icon: string
  check: (snap: GameSnapshot) => boolean
}

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    id: 'first_quest',
    title: 'First Blood',
    description: 'Complete your first quest.',
    icon: '⚔️',
    check: s => s.totalQuestsCompleted >= 1,
  },
  {
    id: 'ten_quests',
    title: 'On the Hunt',
    description: 'Complete 10 quests.',
    icon: '🗡️',
    check: s => s.totalQuestsCompleted >= 10,
  },
  {
    id: 'fifty_quests',
    title: 'Seasoned Hunter',
    description: 'Complete 50 quests.',
    icon: '🏹',
    check: s => s.totalQuestsCompleted >= 50,
  },
  {
    id: 'hundred_quests',
    title: 'Hundred Victories',
    description: 'Complete 100 quests.',
    icon: '💯',
    check: s => s.totalQuestsCompleted >= 100,
  },
  {
    id: 'level_5',
    title: 'Awakened',
    description: 'Reach level 5.',
    icon: '✨',
    check: s => s.level >= 5,
  },
  {
    id: 'level_10',
    title: 'E-Rank Cleared',
    description: 'Reach level 10.',
    icon: '🔓',
    check: s => s.level >= 10,
  },
  {
    id: 'level_20',
    title: 'D-Rank Cleared',
    description: 'Reach level 20.',
    icon: '🌿',
    check: s => s.level >= 20,
  },
  {
    id: 'level_30',
    title: 'C-Rank Cleared',
    description: 'Reach level 30.',
    icon: '💠',
    check: s => s.level >= 30,
  },
  {
    id: 'level_50',
    title: 'A-Rank Hunter',
    description: 'Reach level 50.',
    icon: '🔥',
    check: s => s.level >= 50,
  },
  {
    id: 'level_51',
    title: 'Shadow Monarch',
    description: 'Reach S-Rank.',
    icon: '👑',
    check: s => s.level >= 51,
  },
  {
    id: 'streak_3',
    title: 'Consistent',
    description: 'Maintain a 3-day streak.',
    icon: '🔥',
    check: s => s.dailyStreak >= 3,
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak.',
    icon: '📆',
    check: s => s.dailyStreak >= 7,
  },
  {
    id: 'streak_30',
    title: 'Disciplined',
    description: 'Maintain a 30-day streak.',
    icon: '🏆',
    check: s => s.dailyStreak >= 30,
  },
  {
    id: 'boss_first',
    title: 'Boss Slayer',
    description: 'Complete your first boss quest.',
    icon: '💀',
    check: s => s.quests.some(q => q.type === 'boss' && q.status === 'completed'),
  },
  {
    id: 'stat_builder',
    title: 'Growing Stronger',
    description: 'Allocate 25 stat points.',
    icon: '📈',
    check: s => {
      const allocated = Object.values(s.stats).reduce((a, b) => a + b, 0) - 5 * 5
      return allocated >= 25
    },
  },
]

export function getInitialAchievements(): Achievement[] {
  return ACHIEVEMENT_DEFS.map(def => ({
    id: def.id,
    title: def.title,
    description: def.description,
    icon: def.icon,
  }))
}

export function checkNewAchievements(
  achievements: Achievement[],
  snap: GameSnapshot
): string[] {
  const newlyUnlocked: string[] = []
  for (const def of ACHIEVEMENT_DEFS) {
    const existing = achievements.find(a => a.id === def.id)
    if (!existing?.unlockedAt && def.check(snap)) {
      newlyUnlocked.push(def.id)
    }
  }
  return newlyUnlocked
}
