import { atom, selector, selectorFamily, useRecoilValue } from 'recoil'
import { ColorSchemeName } from 'react-native'

import { RoutineService } from './routines/RoutineService'
import {
  createPersistor,
  getPersistedStore,
} from './components/Persistor/createPersistor'
import { emptyRoutines } from './routines/routines'
import { DurationLevels, RAMPStage } from './routines/types'
import { Levels } from './routines/levels'

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

// --- Routines ---

export const routineIntensityLevel = atom({
  key: 'routineIntensityLevel',
  default: DurationLevels.Medium,
})

let updateRoutinesOfTheDay: (level: Levels) => void

export const routinesOfTheDay = atom({
  key: 'routinesOfTheDay',
  default: emptyRoutines,
  effects: [
    ({ setSelf, node }) => {
      updateRoutinesOfTheDay = (level: Levels) => {
        function update() {
          return RoutineService.sharedInstance.getRoutinesOfTheDay(level)
        }

        update().then(setSelf)
      }

      async function init() {
        const store = (await getPersistedStore()) ?? {}

        return await RoutineService.sharedInstance.getRoutinesOfTheDay(
          store['level'] ?? Levels.Iron,
          store[node.key]
        )
      }

      setSelf(init())
    },
  ],
})

export const level = atom<Levels>({
  key: 'level',
  default: Levels.Iron,
  effects: [
    ({ onSet }) => {
      onSet((newLevel) => {
        if (!isPersistorReady.current) {
          return
        }
        updateRoutinesOfTheDay(newLevel)
      })
    },
  ],
})

export const isRoutineOfTheDayCompleted = atom({
  key: 'isRoutineOfTheDayCompleted',
  default: false,
})

interface RoutinePresentation {
  duration: string
  data: { stage: RAMPStage; drillKey: string }[]
}

export const routineOfTheDay = selector<RoutinePresentation>({
  key: 'routineOfTheDay',
  get: ({ get }) => {
    const intensity = get(routineIntensityLevel)
    const routine = get(routinesOfTheDay)[intensity]

    return {
      duration: routine.duration,
      data: [
        ...routine.common.map((drillKey) => ({
          stage: RAMPStage.Common,
          drillKey,
        })),
        ...routine.raise.map((drillKey) => ({
          stage: RAMPStage.Raise,
          drillKey,
        })),
        ...routine.mobilize.map((drillKey) => ({
          stage: RAMPStage.Mobilize,
          drillKey,
        })),
        ...routine.potentiate.map((drillKey) => ({
          stage: RAMPStage.Potentiate,
          drillKey,
        })),
      ],
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
    const routine = await get(routineOfTheDay)
    const drills = await Promise.all(
      routine.data.map(async (it) => await get(routineDrill(it.drillKey)))
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

export const { usePersistor, useIsInitialStateReady, isPersistorReady } =
  createPersistor(
    name,
    avatar,
    preferredAppColorScheme,
    routineIntensityLevel,
    level,
    routinesOfTheDay
  )
