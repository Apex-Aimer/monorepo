import { Levels } from '../routines/levels'

export enum Platforms {
  PC = 'PC',
  Xbox = 'X1',
  Playstation = 'PS4',
}

export enum ALStatsErrors {
  PlayerNotFound,
  Unknown,
}

export class ALStatsError extends Error {
  private code: ALStatsErrors

  constructor(code: ALStatsErrors) {
    super()

    this.code = code
  }

  match(matchers: Record<ALStatsErrors, () => void>) {
    matchers[this.code]()
  }
}

interface ALStatsServerJSON {
  global: {
    level: number
    rank: {
      rankName: string
      rankDiv: number
    }
  }
}

export interface ALStats {
  username: string
  avatar?: string
  level: number
  rank: string
  kdRatio: string
  kills: string
}

function arabicToRoman(digit: number) {
  return {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
  }[digit]
}

export class ALStatsService {
  private static __instance: ALStatsService
  static get sharedInstance() {
    if (this.__instance == null) {
      this.__instance = new ALStatsService()
    }

    return this.__instance
  }

  private static HOST = 'https://api.mozambiquehe.re'

  async getStats(platform: Platforms, username: string): Promise<ALStats> {
    const params = new URLSearchParams({
      player: username,
      platform,
      version: '5',
      skipRank: 'true',
      merge: 'true',
      removeMerged: 'true',
    })
    const res = await fetch(
      `${ALStatsService.HOST}/bridge?${params.toString()}`,
      {
        method: 'GET',
        headers: new Headers({
          // eslint-disable-next-line turbo/no-undeclared-env-vars
          Authorization: process.env.EXPO_PUBLIC_APEX_LEGENDS_API_KEY,
        }),
      }
    )

    const json = await res.json()

    if ('Error' in json) {
      if (json.Error === 'Player not found.') {
        throw new ALStatsError(ALStatsErrors.PlayerNotFound)
      }

      throw new ALStatsError(ALStatsErrors.Unknown)
    }

    if (!('global' in json)) {
      throw new ALStatsError(ALStatsErrors.Unknown)
    }

    const {
      level,
      rank: { rankName, rankDiv },
    } = (json as ALStatsServerJSON).global
    const roman = arabicToRoman(rankDiv)
    const rank = `${rankName}${roman ? ` ${roman}` : ''}`

    const kdRatio = this.findKDRatio(json)
    const kills = this.findKills(json)

    return {
      username,
      ...(json.global.avatar == null ? null : { avatar: json.global.avatar }),
      level,
      rank,
      kdRatio,
      kills,
    }
  }

  findKDRatio(json: any) {
    if ('total' in json) {
      if ('kd' in json.total) {
        if ('value' in json.total.kd) {
          const kd = json.total.kd.value

          if (kd > 0) {
            return kd
          }
        }
      }
    }
    return '-'
  }

  findKills(json: any) {
    if ('total' in json) {
      if ('kills' in json.total) {
        if ('value' in json.total.kills) {
          const kills = json.total.kills.value

          return kills
        }
      }
      if ('career_kills' in json.total) {
        if ('value' in json.total.career_kills) {
          const kills = json.total.career_kills.value

          return kills
        }
      }
    }
    return '-'
  }

  private normalizeUserLevel(level: number) {
    return Math.min(Math.floor(level / 50), 9)
  }

  private normalizeRank(rank: string) {
    return {
      'Rookie IV': 0,
      'Rookie III': 0,
      'Rookie II': 1,
      'Rookie I': 1,
      'Bronze IV': 2,
      'Bronze III': 2,
      'Bronze II': 2,
      'Bronze I': 2,
      'Silver IV': 3,
      'Silver III': 3,
      'Silver II': 4,
      'Silver I': 4,
      'Gold IV': 5,
      'Gold III': 5,
      'Gold II': 6,
      'Gold I': 6,
      'Platinum IV': 7,
      'Platinum III': 7,
      'Platinum II': 7,
      'Platinum I': 7,
      'Diamond IV': 8,
      'Diamond III': 8,
      'Diamond II': 8,
      'Diamond I': 8,
      Master: 9,
      'Apex Predator': 9,
    }[rank]
  }

  private normalizeKDRatio(kdRatio: string) {
    const kd = +kdRatio

    if (isNaN(kd)) {
      return 0
    }

    if (kd < 0.5) {
      return 1
    }

    if (kd > 3) {
      return 9
    }

    return Math.min(Math.floor((kd - 0.5) / 0.3125), 8)
  }

  private normalizeKills(kills: string) {
    const k = +kills

    if (isNaN(k)) {
      return 0
    }

    if (k < 100) {
      return 1
    }

    if (k > 10000) {
      return 9
    }

    return Math.min(Math.floor(k / 1000), 8)
  }

  private allWeights = [0.4, 0.3, 0.15, 0.15]
  private weightsWithoutKDorKills = [0.5, 0.3, 0.2]
  private weightsOnlyLevelAndRank = [0.6, 0.4]

  private getWeights(hasKDRatio: boolean, hasKills: boolean) {
    if (hasKDRatio && hasKills) {
      return this.allWeights
    }
    if (hasKDRatio || hasKills) {
      return this.weightsWithoutKDorKills
    }
    return this.weightsOnlyLevelAndRank
  }

  calculateDifficultyLevel(stats: ALStats): Levels {
    const hasKD = stats.kdRatio !== '-' && !Number.isNaN(+stats.kdRatio)
    const hasKills = stats.kills !== '-' && !Number.isNaN(+stats.kills)

    const weights = this.getWeights(hasKD, hasKills)

    const level =
      this.normalizeUserLevel(stats.level) * weights[0] +
      this.normalizeRank(stats.rank) * weights[1] +
      (hasKD ? this.normalizeKDRatio(stats.kdRatio) * this.allWeights[2] : 0) +
      (hasKills ? this.normalizeKills(stats.kills) * this.allWeights[2] : 0)

    return {
      0: Levels.Rookie,
      1: Levels.Iron,
      2: Levels.Bronze,
      3: Levels.Silver,
      4: Levels.Gold,
      5: Levels.Platinum,
      6: Levels.Diamond,
      7: Levels.Ascendant,
      8: Levels.Master,
      9: Levels.Predator,
    }[Math.round(level)]
  }
}
