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
}
