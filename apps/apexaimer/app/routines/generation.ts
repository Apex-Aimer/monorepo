import random from 'lodash/random'
import intersection from 'lodash/intersection'
import uniq from 'lodash/uniq'
import shuffle from 'lodash/shuffle'
import without from 'lodash/without'
import sum from 'lodash/sum'
import identity from 'lodash/identity'

import {
  DrillCategory,
  DrillsCategoriesMap,
  DrillsMap,
  DurationLevels,
  Routine,
  RoutineDrill,
  RoutinesOfTheDay,
} from './types'
import { Levels, getNextLevel } from './levels'

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

export function getWeightedDrills(bucket: string[], weight: number) {
  return bucket.filter((key) => raiseDrillsWeighted[key] >= weight)
}

export function getBucketForRaiseDrills(
  prevCategories: DrillCategory[],
  applicableCategories: DrillCategory[]
): string[] {
  return shuffle(
    intersection(
      without(Object.keys(raiseDrillsWeighted), ...prevCategories),
      applicableCategories
    )
  )
}

export function getRaiseDrills(bucket: string[], cap: number) {
  let weight = 1
  const drills = []

  for (let i = cap; i > 0; i -= 1) {
    const [drill, ...rest] = getWeightedDrills(bucket, weight)

    // It's kinda not what I intended, but it seems to work
    // so it happens that there is only one drill with weight == 1 for now,
    // and for weight == 2 I want to choose only one at the time,
    // and only drills with weight === 3, can be on the same routine together
    //
    // Still it's kinda "hacky" right now,
    // and probably won't work if I add new drills
    const newWeight = raiseDrillsWeighted[drill]

    weight = Math.min(newWeight + 1, 3)

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
  DrillCategory.SingleBulletTargetsSwitching,
  DrillCategory.SingleBulletFlicking,
  DrillCategory.LowBurstTargetsSwitching,
])

const generalDrills = [
  DrillCategory.TurnAroundTargetBurst,
  DrillCategory.RecoilControlLadder,
  DrillCategory.TargetsRecoil,
  DrillCategory.WholeMagDummy,
  DrillCategory.Bowl,
  DrillCategory.SingleBulletFlickingMicro,
  ...singleBulletTargetsSwitchingDependentDrills.values(),
]

function splitBySet(bucket: DrillCategory[], splitter: Set<DrillCategory>) {
  return bucket.reduce(
    (acc, category) => {
      if (splitter.has(category)) {
        acc.inSet.push(category)
      } else {
        acc.regular.push(category)
      }
      return acc
    },
    {
      regular: [],
      inSet: [],
    }
  )
}

function splitToMobilizeAndPotentiate(drills: DrillCategory[]) {
  let mid = Math.ceil(drills.length / 2) - 1

  return {
    mobilize: drills.slice(0, mid).flatMap(identity),
    potentiate: drills.slice(mid).flatMap(identity),
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

  const { regular, inSet } = splitBySet(
    bucket.slice(0, singleBulletTargetsSwitchingDependentDrills.size + 2),
    singleBulletTargetsSwitchingDependentDrills
  )

  const long = shuffle([
    ...regular,
    inSet.length > 0
      ? uniq([DrillCategory.SingleBulletTargetsSwitching, ...inSet])
      : [],
  ])

  const short = long.slice(0, -2)
  const mid = long.slice(0, -1)

  return {
    short: splitToMobilizeAndPotentiate(short),
    mid: splitToMobilizeAndPotentiate(mid),
    long: splitToMobilizeAndPotentiate(long),
  }
}

export function getCategoriesForLevel(
  level: Levels,
  drillsCategoriesMap: DrillsCategoriesMap
) {
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

function getDrillsForLevel(
  level: Levels,
  drillsCategoriesMap: DrillsCategoriesMap
) {
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
  nextLevel: Levels,
  drillsCategoriesMap: DrillsCategoriesMap
): Routine {
  const getDrills = getDrillsForLevel(level, drillsCategoriesMap)
  const raise = raiseCategories.flatMap(getDrills)
  const mobilize = mobilizeCategories.flatMap(getDrills)
  const potentiate = potentiateCategories.flatMap(
    getDrillsForLevel(nextLevel, drillsCategoriesMap)
  )

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

export function getRoutinesOfTheDayGenerator(
  drillsCategoriesMap: DrillsCategoriesMap,
  drillsTable: DrillsMap
) {
  return function generateRoutines(
    level: Levels,
    prevRoutine: Routine,
    date: string
  ): RoutinesOfTheDay {
    const categoriesForLevel = getCategoriesForLevel(level, drillsCategoriesMap)
    const nextLevel = getNextLevel(level)

    const categoriesForNextLevel = getCategoriesForLevel(
      nextLevel,
      drillsCategoriesMap
    )

    const raise = getRaiseDrills(
      getBucketForRaiseDrills(
        uniq(prevRoutine.raise.map((key) => drillsTable[key].category)),
        categoriesForLevel
      ),
      // We want to have from 2 to 4 drills in raise stage
      2 + random(2)
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
        nextLevel,
        drillsCategoriesMap
      ),
      [DurationLevels.Medium]: getRoutine(
        common,
        raise,
        mid.mobilize,
        mid.potentiate,
        level,
        nextLevel,
        drillsCategoriesMap
      ),
      [DurationLevels.Long]: getRoutine(
        common,
        raise,
        long.mobilize,
        long.potentiate,
        level,
        nextLevel,
        drillsCategoriesMap
      ),
    }
  }
}
