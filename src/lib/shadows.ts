export interface Shadow {
  id: string
  name: string
  type: string
  grade: string
  levelRequired: number
  description: string
  icon: string
}

export const SHADOWS: Shadow[] = [
  {
    id: 'iron',
    name: 'Iron',
    type: 'Knight',
    grade: 'E',
    levelRequired: 5,
    description: 'The first shadow soldier. A loyal knight who never falters in battle.',
    icon: '⚔️',
  },
  {
    id: 'tusk',
    name: 'Tusk',
    type: 'Beast',
    grade: 'D',
    levelRequired: 10,
    description: 'A massive beast shadow with raw destructive power and unbreakable will.',
    icon: '🦷',
  },
  {
    id: 'tank',
    name: 'Tank',
    type: 'Knight',
    grade: 'D',
    levelRequired: 15,
    description: 'A heavily armored shadow built to shield the monarch from any assault.',
    icon: '🛡️',
  },
  {
    id: 'igris',
    name: 'Igris',
    type: 'Commander',
    grade: 'C',
    levelRequired: 20,
    description: 'The Blood Red Commander. A proud knight of immense power and honor.',
    icon: '🔴',
  },
  {
    id: 'greed',
    name: 'Greed',
    type: 'Mage',
    grade: 'C',
    levelRequired: 25,
    description: 'A cunning shadow mage capable of devastating arcane strikes.',
    icon: '💜',
  },
  {
    id: 'kaisel',
    name: 'Kaisel',
    type: 'Dragon',
    grade: 'B',
    levelRequired: 30,
    description: 'A fearsome dragon shadow. The Shadow Monarch rides upon his back.',
    icon: '🐉',
  },
  {
    id: 'beru',
    name: 'Beru',
    type: 'Ant King',
    grade: 'A',
    levelRequired: 40,
    description: 'The Ant King. The most powerful and loyal shadow in the entire army.',
    icon: '🐜',
  },
  {
    id: 'bellion',
    name: 'Bellion',
    type: 'Grand Marshal',
    grade: 'S',
    levelRequired: 51,
    description: 'The Grand Marshal of all shadows. Commander of the entire shadow army.',
    icon: '👑',
  },
]
