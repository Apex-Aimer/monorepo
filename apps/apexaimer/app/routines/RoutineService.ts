import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  DurationLevels,
  Levels,
  drillsTable,
  emptyRoutines,
  generateRoutines,
} from './routines'

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

    const prevLevel = (await AsyncStorage.getItem('level')) ?? Levels.MediumEasy

    if (level === prevLevel) {
      try {
        prevRoutines = JSON.parse(await AsyncStorage.getItem('routineOfTheDay'))
      } catch {
        // no-op
      }
    }

    const routines = generateRoutines(level, prevRoutines[duration])

    try {
      await AsyncStorage.setItem('routineOfTheDay', JSON.stringify(routines))
    } catch {
      // no-op
    }

    return routines
  }

  async getRoutineDrillById(id: string) {
    return drillsTable[id]
  }
}
