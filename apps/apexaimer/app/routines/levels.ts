import findIndex from 'lodash/findIndex'

export const enum Levels {
  Rookie = 'rookie',
  Iron = 'iron',
  Bronze = 'bronze',
  Silver = 'silver',
  Gold = 'gold',
  Platinum = 'platinum',
  Diamond = 'diamond',
  Ascendant = 'ascendant',
  Master = 'master',
  Predator = 'predator',
}

export const levelsArray = [
  Levels.Rookie,
  Levels.Iron,
  Levels.Bronze,
  Levels.Silver,
  Levels.Gold,
  Levels.Platinum,
  Levels.Diamond,
  Levels.Ascendant,
  Levels.Master,
  Levels.Predator,
]

export function getAllSuitableLevels(start: Levels, end: Levels) {
  return levelsArray.slice(
    findIndex(levelsArray, (i) => i === start),
    findIndex(levelsArray, (i) => i === end) + 1
  )
}

export function getNextLevel(level: Levels) {
  return levelsArray[findIndex(levelsArray, (it) => it === level) + 1]
}
