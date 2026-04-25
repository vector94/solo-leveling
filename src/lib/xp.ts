import type { Difficulty, Rank, QuestType } from './types'

export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5))
}

export function getRankForLevel(level: number): Rank {
  if (level <= 10) return 'E'
  if (level <= 20) return 'D'
  if (level <= 30) return 'C'
  if (level <= 40) return 'B'
  if (level <= 50) return 'A'
  return 'S'
}

export const QUEST_XP: Record<Difficulty, number> = {
  E: 20,
  D: 50,
  C: 100,
  B: 200,
  A: 500,
}

export const BOSS_XP = 1000

export function getXPReward(difficulty: Difficulty, type: QuestType): number {
  if (type === 'boss') return BOSS_XP
  return QUEST_XP[difficulty]
}

export const XP_PENALTY_RATIO = 0.5

export const RANK_COLORS: Record<Rank, { text: string; bg: string; border: string }> = {
  E: { text: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/40' },
  D: { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/40' },
  C: { text: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/40' },
  B: { text: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/40' },
  A: { text: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/40' },
  S: { text: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/40' },
}

export const DIFF_COLORS: Record<Difficulty, { text: string; bg: string; border: string }> = {
  E: { text: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/40' },
  D: { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/40' },
  C: { text: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/40' },
  B: { text: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/40' },
  A: { text: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/40' },
}

export const CATEGORY_STAT: Record<string, string> = {
  Physical: 'STR',
  Mental: 'INT',
  Study: 'INT',
  Work: 'AGI',
  Habit: 'VIT',
}
