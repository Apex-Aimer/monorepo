import { format } from 'date-fns'

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
