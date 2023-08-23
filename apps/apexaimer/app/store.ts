import { atom, selector, selectorFamily, useRecoilValue } from 'recoil'
import { ColorSchemeName } from 'react-native'

import { RoutineService } from './routines/RoutineService'
import {
  createPersistor,
  getPersistedStore,
} from './components/Persistor/createPersistor'
import {
  DurationLevels,
  Levels,
  Routine,
  emptyRoutines,
} from './routines/routines'

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

const level = atom<Levels>({
  key: 'level',
  default: Levels.MediumEasy,
})

export function useUserName() {
  return useRecoilValue(name)
}

// --- Routines ---

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

export const routineIntensityLevel = atom({
  key: 'routineIntensityLevel',
  default: DurationLevels.Medium,
})

export const routinesOfTheDay = atom({
  key: 'routinesOfTheDay',
  default: emptyRoutines,
  effects: [
    ({ setSelf }) => {
      async function init() {
        const store = (await getPersistedStore()) ?? {}

        return await RoutineService.sharedInstance.getRoutinesOfTheDay(
          store[routineIntensityLevel.key] ?? DurationLevels.Medium,
          store[level.key] ?? Levels.MediumEasy
        )
      }

      setSelf(init())
    },
  ],
})

export const isRoutineOfTheDayCompleted = atom({
  key: 'isRoutineOfTheDayCompleted',
  default: false,
})

export const routineOfTheDay = selector({
  key: 'routineOfTheDay',
  get: async ({ get }) => {
    const intensity = get(routineIntensityLevel)
    return get(routinesOfTheDay[intensity]) as Routine
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
      [
        ...routine.common,
        ...routine.raise,
        ...routine.activate,
        ...routine.mobilize,
        ...routine.potentiate,
      ].map(async (it) => await get(routineDrill(it)))
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

// -- Preferences --

export type AppColorSchemeName = ColorSchemeName | 'system'

export const preferredAppColorScheme = atom<AppColorSchemeName>({
  key: 'appColorScheme',
  default: 'dark',
})

// Persistence

export const { usePersistor, useIsInitialStateReady } = createPersistor(
  name,
  avatar,
  preferredAppColorScheme,
  routineIntensityLevel,
  level
)
