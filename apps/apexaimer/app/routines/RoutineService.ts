import AsyncStorage from '@react-native-async-storage/async-storage'

import { drillsTable, emptyRoutines } from './routines'
import { DurationLevels } from './types'
import { Levels } from './processing'
import { generateRoutines } from './generation'

export class RoutineService {
  private static __instance: RoutineService
  static get sharedInstance() {
    if (this.__instance == null) {
      this.__instance = new RoutineService()
    }

    return this.__instance
  }

  async getRoutinesOfTheDay(duration: DurationLevels, level: Levels) {
    let prevRoutines = emptyRoutines

    const prevLevel = (await AsyncStorage.getItem('level')) ?? Levels.Iron

    if (level === prevLevel) {
      try {
        const savedRoutines = JSON.parse(
          await AsyncStorage.getItem('routineOfTheDay')
        )

        if (savedRoutines != null) {
          prevRoutines = savedRoutines
        }
      } catch {
        // no-op
      }
    }

    let routines = emptyRoutines

    try {
      // TODO
      routines = generateRoutines(level, emptyRoutines[DurationLevels.Short])
      // routines = generateRoutines(level, prevRoutines[duration])

      await AsyncStorage.setItem('routineOfTheDay', JSON.stringify(routines))
    } catch (e) {
      console.error(e)
      // no-op
    }

    return routines
  }

  async getRoutineDrillById(id: string) {
    return drillsTable[id]
  }
}
