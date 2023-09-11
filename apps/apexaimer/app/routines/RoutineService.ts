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

  async getRoutinesOfTheDay(level: Levels, prevRoutines = emptyRoutines) {
    const date = format(new Date(), 'yyyy-mm-dd')

    if (date === prevRoutines.date) {
      return prevRoutines
    }

    return generateRoutines(level, prevRoutines[DurationLevels.Short], date)
  }

  async getRoutineDrillById(id: string) {
    return drillsTable[id]
  }
}
