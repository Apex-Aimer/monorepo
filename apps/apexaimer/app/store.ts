import { atom, selector, selectorFamily } from 'recoil'
import { RoutineService } from './routines/RoutineService'

export enum DurationLevels {
  Short,
  Medium,
  Long,
}

const shortRoutineOfTheDay = atom({
  key: 'shortRoutineOfTheDay',
  default: 'defaultShort',
})

const mediumRoutineOfTheDay = atom({
  key: 'mediumRoutineOfTheDay',
  default: 'defaultMedium',
})

const longRoutineOfTheDay = atom({
  key: 'longRoutineOfTheDay',
  default: 'defaultLong',
})

export const routine = selectorFamily({
  key: 'routine',
  get: (id: string) => async () => {
    return RoutineService.sharedInstance.getById(id)
  },
})

export const routineIntensityLevel = atom({
  key: 'routineIntensityLevel',
  default: DurationLevels.Medium,
})

export const routineOfTheDay = selector({
  key: 'routineOfTheDay',
  get: ({ get }) => {
    switch (get(routineIntensityLevel)) {
      case DurationLevels.Short: {
        const shortKey = get(shortRoutineOfTheDay)
        return {
          key: shortKey,
          ...get(routine(shortKey)),
        }
      }
      case DurationLevels.Medium: {
        const mediumKey = get(mediumRoutineOfTheDay)
        return {
          key: mediumKey,
          ...get(routine(mediumKey)),
        }
      }
      case DurationLevels.Long: {
        const longKey = get(longRoutineOfTheDay)
        return {
          key: longKey,
          ...get(routine(longKey)),
        }
      }
    }
  },
})

export const routineDrill = selectorFamily({
  key: 'routineDrill',
  get: (id: string) => async () => {
    return RoutineService.sharedInstance.getRoutineDrillById(id)
  },
})
