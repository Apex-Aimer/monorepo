import { format } from 'date-fns'

import { drillsCategoriesMap, drillsTable, emptyRoutines } from './routines'
import { DurationLevels } from './types'
import { getRoutinesOfTheDayGenerator } from './generation'
import { Levels } from './levels'

export const generateRoutines = getRoutinesOfTheDayGenerator(
  drillsCategoriesMap,
  drillsTable
)

export class RoutineService {
  private static __instance: RoutineService
  static get sharedInstance() {
    if (this.__instance == null) {
      this.__instance = new RoutineService()
    }

    return this.__instance
  }

  getRoutineOfTheDayDate() {
    return format(new Date(), 'yyyy-MM-dd')
  }

  async getRoutinesOfTheDay(level: Levels, prevRoutines = emptyRoutines) {
    const date = this.getRoutineOfTheDayDate()

    if (date === prevRoutines.date) {
      return prevRoutines
    }

    return generateRoutines(level, prevRoutines[DurationLevels.Short], date)
  }

  async getRoutineDrillById(id: string) {
    return drillsTable[id]
  }
}
