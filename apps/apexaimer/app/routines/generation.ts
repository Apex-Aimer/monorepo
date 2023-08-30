import random from 'lodash/random'
import intersection from 'lodash/intersection'
import uniq from 'lodash/uniq'
import shuffle from 'lodash/shuffle'
import without from 'lodash/without'
import findIndex from 'lodash/findIndex'
import sum from 'lodash/sum'

import { DrillCategory, Levels, RoutineDrill, levelsArray } from './processing'
import { DurationLevels, Routine, RoutinesOfTheDay } from './types'
import { drillsCategoriesMap, drillsTable } from './routines'

/**
 * Weights are made to compose drills better,
 * ie - if we randomly got `dummy one clip`
 *      as a first drill, it doesn't make sense
 *      to do `dummy tracking` after that
 */
const raiseDrillsWeighted = {
  [DrillCategory.DummyWalkArounds]: 1,
  [DrillCategory.TargetsTracking]: 2,
  [DrillCategory.DummyTrackingNoADS]: 2,
  [DrillCategory.DummyTrackingADS]: 2,
  [DrillCategory.TargetsRecoil]: 3,
  [DrillCategory.RecoilControlLadder]: 3,
  [DrillCategory.DummyOneClip]: 3,
  [DrillCategory.DummyOneClipSmoke]: 3, // TODO
}

function getRaiseDrills(
  prevCategories: DrillCategory[],
  applicableCategories: DrillCategory[]
) {
  let weight = 1

  /**
   * TODO: remove not applicable for the current level drills
   */

  let bucket = shuffle(
    intersection(
      without(Object.keys(raiseDrillsWeighted), ...prevCategories),
      applicableCategories
    )
  )

  // We want to have from 2 to 4 drills in raise stage
  let cap = 2 + random(2)

  const drills = []

  while (cap > 0) {
    const [drill, ...rest] = bucket.filter(
      (key) => raiseDrillsWeighted[key] >= weight
    )

    // It's kinda not what I intended, but it seems to work
    // so it happens that there is only one drill with weight == 1 for now,
    // and for weight == 2 I want to choose only one at the time,
    // and only drills with weight === 3, can be on the same routine together
    //
    // Still it's kinda "hacky" right now,
    // and probably won't work if I add new drills
    const newWeight = raiseDrillsWeighted[drill]
    if (newWeight < 3) {
      weight = newWeight + 1
    }

    drills.push(drill)

    // If we doesn't have more weighted drills then we're done
    if (rest.length === 0) {
      return drills
    }

    // Extract the selected drill from the bucket
    bucket = without(bucket, drill)

    cap -= 1
  }

  return drills
}

const singleBulletTargetsSwitchingDependentDrills = new Set([
  DrillCategory.SingleBulletFlicking,
  DrillCategory.LowBurstTargetsSwitching,
])

const generalDrills = [
  DrillCategory.TurnAroundTargetBurst,
  DrillCategory.RecoilControlLadder,
  DrillCategory.TargetsRecoil,
  DrillCategory.WholeMagDummy,
  DrillCategory.SingleBulletTargetsSwitching,
  DrillCategory.Bowl,
  DrillCategory.SingleBulletFlickingMicro,
  ...singleBulletTargetsSwitchingDependentDrills.values(),
]

function addTargetsSwitchingIfNecessary(drills: DrillCategory[]) {
  if (
    intersection(drills, [
      ...singleBulletTargetsSwitchingDependentDrills.values(),
    ]).length === 0
  ) {
    return drills
  }

  return uniq(
    drills.flatMap((drill) => {
      if (singleBulletTargetsSwitchingDependentDrills.has(drill)) {
        return [DrillCategory.SingleBulletTargetsSwitching, drill]
      }
      return [drill]
    })
  )
}

function splitToMobilizeAndPotentiate(drills: DrillCategory[]) {
  let mid = Math.ceil(drills.length / 2) - 1

  // Do not split targets switching pair
  if (
    drills[mid] === DrillCategory.SingleBulletTargetsSwitching &&
    singleBulletTargetsSwitchingDependentDrills.has(drills[mid + 1])
  ) {
    mid = mid + 1
  }

  return {
    mobilize: drills.slice(0, mid),
    potentiate: drills.slice(mid),
  }
}

function processGeneralDrills(
  raiseDrills: DrillCategory[],
  prevMobilize: DrillCategory[],
  prevPotentiate: DrillCategory[],
  applicableCategories: DrillCategory[]
) {
  const bucket = shuffle(
    without(
      intersection(generalDrills, applicableCategories),
      ...raiseDrills,
      ...prevMobilize,
      ...prevPotentiate
    )
  )

  const { regular, withTargetsSwitching } = bucket.slice(0, 4).reduce(
    (acc, category) => {
      if (singleBulletTargetsSwitchingDependentDrills.has(category)) {
        acc.withTargetsSwitching.push(category)
      } else {
        acc.regular.push(category)
      }
      return acc
    },
    {
      regular: [],
      withTargetsSwitching: [],
    }
  )

  const long = addTargetsSwitchingIfNecessary(
    shuffle([...regular, withTargetsSwitching]).flatMap((it) =>
      Array.isArray(it) ? it : [it]
    )
  )

  const short = long.slice(0, 2)
  const mid = long.slice(0, 3)

  return {
    short: splitToMobilizeAndPotentiate(short),
    mid: splitToMobilizeAndPotentiate(mid),
    long: splitToMobilizeAndPotentiate(long),
  }
}

function getCategoriesForLevel(level: Levels) {
  return Object.keys(drillsCategoriesMap).reduce<DrillCategory[]>(
    (acc, category: DrillCategory) => {
      const drills = drillsCategoriesMap[category]

      const applicableForLevel = drills.reduce((acc, drill) => {
        if (acc) return acc

        return drill.levels.has(level)
      }, false)

      if (!applicableForLevel) {
        return acc
      }

      acc.push(category)

      return acc
    },
    []
  )
}

function getDrillsForLevel(level: Levels) {
  return (category: DrillCategory) => {
    return drillsCategoriesMap[category].filter((drill) => {
      return drill.levels.has(level)
    })
  }
}

function getDrillKey(drill: RoutineDrill) {
  return drill.key
}

function getRoutine(
  common: RoutineDrill[],
  raiseCategories: DrillCategory[],
  mobilizeCategories: DrillCategory[],
  potentiateCategories: DrillCategory[],
  level: Levels,
  nextLevel: Levels
): Routine {
  const getDrills = getDrillsForLevel(level)
  const raise = raiseCategories.flatMap(getDrills)
  const mobilize = mobilizeCategories.flatMap(getDrills)
  const potentiate = potentiateCategories.flatMap(getDrillsForLevel(nextLevel))

  const totalDuration = sum(
    [...common, ...raise, ...mobilize, ...potentiate].map(
      (drill) => drill.duration
    )
  )

  return {
    duration: `~ ${Math.round(totalDuration / 60)} min`,
    common: common.map(getDrillKey),
    raise: raise.map(getDrillKey),
    mobilize: mobilize.map(getDrillKey),
    potentiate: potentiate.map(getDrillKey),
  }
}

export function generateRoutines(
  level: Levels,
  prevRoutine: Routine,
  date: string
): RoutinesOfTheDay {
  const categoriesForLevel = getCategoriesForLevel(level)
  const nextLevel =
    levelsArray[findIndex(levelsArray, (it) => it === level) + 1]
  const categoriesForNextLevel = getCategoriesForLevel(nextLevel)

  const raise = getRaiseDrills(
    uniq(prevRoutine.raise.map((key) => drillsTable[key].category)),
    categoriesForLevel
  )

  const { short, mid, long } = processGeneralDrills(
    raise,
    uniq(prevRoutine.mobilize.map((key) => drillsTable[key].category)),
    uniq(prevRoutine.potentiate.map((key) => drillsTable[key].category)),
    intersection(categoriesForLevel, categoriesForNextLevel)
  )

  const common = drillsCategoriesMap[DrillCategory.BasicMovement]

  return {
    date,
    [DurationLevels.Short]: getRoutine(
      common,
      raise,
      short.mobilize,
      short.potentiate,
      level,
      nextLevel
    ),
    [DurationLevels.Medium]: getRoutine(
      common,
      raise,
      mid.mobilize,
      mid.potentiate,
      level,
      nextLevel
    ),
    [DurationLevels.Long]: getRoutine(
      common,
      raise,
      long.mobilize,
      long.potentiate,
      level,
      nextLevel
    ),
  }
}
