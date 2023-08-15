import { atom, selector, selectorFamily, useRecoilValue } from 'recoil'
import { RoutineService } from './routines/RoutineService'
import { ImageSourcePropType, ImageURISource } from 'react-native'

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

export const isRoutineOfTheDayCompleted = atom({
  key: 'isRoutineOfTheDayCompleted',
  default: false,
})

export const routineOfTheDay = selector({
  key: 'routineOfTheDay',
  get: async ({ get }) => {
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

export const routineOfTheDayDuration = selector({
  key: 'routineOfTheDayDuration',
  get: async ({ get }) => {
    const routine = get(routineOfTheDay)
    const drills = await Promise.all(
      routine.data.map(async (it) => await get(routineDrill(it)))
    )
    return drills.reduce((acc, { duration }) => acc + duration, 0)
  },
})

export const routineOfTheDayRunData = selector({
  key: 'routineOfTheDayRunData',
  get: async ({ get }) => ({
    routine: await get(routineOfTheDay),
    duration: await get(routineOfTheDayDuration),
  }),
})

export const congratsMotivation = atom({
  key: 'congratsMotivationalTitle',
  default: {
    title: 'Warmed up and set to conquer!',
    subtitle: ' Embrace the fun in the game today.',
  },
})

// --- User ---

export const name = atom({
  key: 'name',
  default: 'Legend',
})

interface Avatar {
  uri: string
  cacheKey: string
}

export const avatar = atom<Avatar | null>({
  key: 'avatar',
  default: null,
})

export function useUserName() {
  return useRecoilValue(name)
}
