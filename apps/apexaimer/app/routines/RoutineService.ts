import { drillsTable, routinesTable } from './routines'

export class RoutineService {
  private static __instance: RoutineService
  static get sharedInstance() {
    if (this.__instance == null) {
      this.__instance = new RoutineService()
    }

    return this.__instance
  }

  async getById(id: string) {
    return routinesTable[id]
  }

  async getRoutineDrillById(id: string) {
    return drillsTable[id]
  }
}
