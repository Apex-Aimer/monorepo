import { Image } from 'react-native'
import shuffle from 'lodash/shuffle'
import without from 'lodash/without'
import { format } from 'date-fns'

// @ts-expect-error
import stub from '../../assets/simple_movement_720p.m4v'

type MDContent = string
interface MDDrillMetadata {
  type: string
  duration: number
  description: string
}

export enum DrillType {
  Movement,
  Tracking,
  Recoil,
  Precision,
}

export const enum RAMPStage {
  Common = 'common',
  Raise = 'raise',
  Activate = 'activate',
  Mobilize = 'mobilize',
  Potentiate = 'potentiate',
}

interface Buckets {
  [RAMPStage.Raise]: string[]
  [RAMPStage.Activate]: string[]
  [RAMPStage.Mobilize]: string[]
  [RAMPStage.Potentiate]: string[]
}

export interface Routine extends Buckets {
  duration: string
  [RAMPStage.Common]: string[]
}

export interface RoutineDrill {
  type: DrillType
  duration: number
  description: string
  instructions: MDContent
  // uri
  videoUri: string
}

function getTypeFromMetadata(metadata: MDDrillMetadata) {
  switch (metadata.type.toLowerCase()) {
    case 'movement':
      return DrillType.Movement
    case 'tracking':
      return DrillType.Tracking
    case 'precision':
      return DrillType.Precision
    case 'recoil':
      return DrillType.Recoil
    default:
      DrillType.Movement
  }
}

function processDrill({
  default: content,
  metadata,
}: {
  default: MDContent
  metadata: MDDrillMetadata
}): RoutineDrill {
  return {
    type: getTypeFromMetadata(metadata),
    description: metadata.description,
    duration: metadata.duration,
    instructions: content,
    videoUri: Image.resolveAssetSource(stub).uri,
  }
}

const levelsInAllDrills = [
  // common
  1,
  // easiest
  10,
  // easy
  7,
  // medium-easy
  8,
  // medium-m1
  13,
  // medium-m2
  13,
  // medium-hard1
  9,
  // medium-hard2
  8,
  // hard-easy
  11,
  // hard-medium
  8,
  // hardest
  6,
]

export enum Levels {
  Common,
  Easiest,
  Easy,
  MediumEasy, // user lowest
  MediumM1,
  MediumM2,
  MediumHard1,
  MediumHard2,
  HardEasy,
  HardMedium, // user highest
  Hardest,
}

const allDrillsPaths = [
  // common
  require('./drills/basic-movement.md'),
  // easiest
  require('./drills/single-bullet-targets-switching/easiest-1.md'),
  require('./drills/single-bullet-targets-switching/easiest-2.md'),
  require('./drills/whole-mag-dummy/easiest-1.md'),
  require('./drills/dummy-walk-arounds/easiest-1.md'),
  require('./drills/dummy-walk-arounds/easiest-3.md'),
  require('./drills/dummy-walk-arounds/easiest-2.md'),
  require('./drills/recoil-control-ladder/easiest.md'),
  require('./drills/single-bullet-flicking/easiest.md'),
  require('./drills/low-burst-targets-switching/easiest-1.md'),
  require('./drills/low-burst-targets-switching/easiest-2.md'),
  // easy
  require('./drills/targets-recoil/easy.md'),
  require('./drills/dummy-walk-arounds/easy-1.md'),
  require('./drills/dummy-walk-arounds/easy-2.md'),
  require('./drills/dummy-one-clip/easy.md'),
  require('./drills/recoil-control-ladder/easy.md'),
  require('./drills/single-bullet-flicking/easy-1.md'),
  require('./drills/single-bullet-flicking/easy-2.md'),
  // medium-easy
  require('./drills/single-bullet-targets-switching/medium-easy-2.md'),
  require('./drills/single-bullet-targets-switching/medium-easy-1.md'),
  require('./drills/whole-mag-dummy/medium-easy.md'),
  require('./drills/dummy-walk-arounds/medium-easy.md'),
  require('./drills/dummy-tracking/medium-easy.md'),
  require('./drills/dummy-one-clip/medium-easy.md'),
  require('./drills/low-burst-targets-switching/medium-easy-2.md'),
  require('./drills/low-burst-targets-switching/medium-easy-1.md'),
  // medium-m1
  require('./drills/single-bullet-targets-switching/medium-m1.md'),
  require('./drills/whole-mag-dummy/medium-m1.md'),
  require('./drills/targets-recoil/medium-m1.md'),
  require('./drills/dummy-walk-arounds/medium-m1.md'),
  require('./drills/dummy-tracking/medium-m1.md'),
  require('./drills/dummy-one-clip/medium-m1.md'),
  require('./drills/recoil-control-ladder/medium-m1-2.md'),
  require('./drills/recoil-control-ladder/medium-m1-1.md'),
  require('./drills/single-bullet-flicking/medium-m1-2.md'),
  require('./drills/single-bullet-flicking/medium-m1-3.md'),
  require('./drills/single-bullet-flicking/medium-m1-1.md'),
  require('./drills/turn-around-target-burst/medium-m1.md'),
  require('./drills/low-burst-targets-switching/medium-m1.md'),
  // medium-m2
  require('./drills/single-bullet-targets-switching/medium-m2-1.md'),
  require('./drills/single-bullet-targets-switching/medium-m2-2.md'),
  require('./drills/whole-mag-dummy/medium-m2.md'),
  require('./drills/dummy-walk-arounds/medium-m2.md'),
  require('./drills/dummy-tracking/medium-m2.md'),
  require('./drills/recoil-control-ladder/medium-m2.md'),
  require('./drills/single-bullet-flicking/medium-m2-1.md'),
  require('./drills/single-bullet-flicking/medium-m2-3.md'),
  require('./drills/single-bullet-flicking/medium-m2-2.md'),
  require('./drills/bowl/medium-m2.md'),
  require('./drills/turn-around-target-burst/medium-m2.md'),
  require('./drills/low-burst-targets-switching/medium-m2-1.md'),
  require('./drills/low-burst-targets-switching/medium-m2-2.md'),
  // medium-hard1
  require('./drills/single-bullet-targets-switching/medium-hard1-2.md'),
  require('./drills/single-bullet-targets-switching/medium-hard1-1.md'),
  require('./drills/whole-mag-dummy/medium-hard1.md'),
  require('./drills/dummy-tracking/medium-hard1.md'),
  require('./drills/single-bullet-flicking-micro/medium-hard1.md'),
  require('./drills/bowl/medium-hard1.md'),
  require('./drills/turn-around-target-burst/medium-hard1.md'),
  require('./drills/low-burst-targets-switching/medium-hard1-2.md'),
  require('./drills/low-burst-targets-switching/medium-hard1-1.md'),
  // medium-hard2
  require('./drills/single-bullet-targets-switching/medium-hard2-1.md'),
  require('./drills/single-bullet-targets-switching/medium-hard2-2.md'),
  require('./drills/whole-mag-dummy/medium-hard2.md'),
  require('./drills/single-bullet-flicking-micro/medium-hard2-1.md'),
  require('./drills/single-bullet-flicking-micro/medium-hard2-2.md'),
  require('./drills/turn-around-target-burst/medium-hard2.md'),
  require('./drills/low-burst-targets-switching/medium-hard2-1.md'),
  require('./drills/low-burst-targets-switching/medium-hard2-2.md'),
  // hard-easy
  require('./drills/single-bullet-targets-switching/hard-easy-2.md'),
  require('./drills/single-bullet-targets-switching/hard-easy-1.md'),
  require('./drills/whole-mag-dummy/hard-easy.md'),
  require('./drills/targets-recoil/hard-easy.md'),
  require('./drills/recoil-control-ladder/hard-easy.md'),
  require('./drills/single-bullet-flicking/hard-easy.md'),
  require('./drills/bowl/hard-easy-2.md'),
  require('./drills/bowl/hard-easy-1.md'),
  require('./drills/turn-around-target-burst/hard-easy.md'),
  require('./drills/low-burst-targets-switching/hard-easy-2.md'),
  require('./drills/low-burst-targets-switching/hard-easy-1.md'),
  // hard-medium
  require('./drills/single-bullet-targets-switching/hard-medium-2.md'),
  require('./drills/single-bullet-targets-switching/hard-medium-1.md'),
  require('./drills/whole-mag-dummy/hard-medium-2.md'),
  require('./drills/whole-mag-dummy/hard-medium-1.md'),
  require('./drills/bowl/hard-medium.md'),
  require('./drills/turn-around-target-burst/hard-medium.md'),
  require('./drills/low-burst-targets-switching/hard-medium-2.md'),
  require('./drills/low-burst-targets-switching/hard-medium-1.md'),
  // hardest
  require('./drills/whole-mag-dummy/hardest.md'),
  require('./drills/targets-recoil/hardest.md'),
  require('./drills/single-bullet-flicking-micro/hardest.md'),
  require('./drills/single-bullet-flicking/hardest-2.md'),
  require('./drills/single-bullet-flicking/hardest-1.md'),
  require('./drills/bowl/hardest.md'),
]

const bucketsIndeces = levelsInAllDrills.reduce((acc, count, index) => {
  const start = acc[index - 1]?.[0] ?? 0
  acc.push([start, start + count])
  return acc
}, [])

export const drillsTable: Record<string, RoutineDrill> = allDrillsPaths.reduce(
  (acc, drill) => {
    const processedDrill = processDrill(drill)
    acc[drill.filename] = processedDrill

    return acc
  },
  {}
)

function getBucketForLevel(level: Levels): string[] {
  const [start, end] = bucketsIndeces[level]
  const bucket = allDrillsPaths.slice(start, end)

  return bucket.map((it) => it.filename)
}

function findDrillThatFits(bucket: string[], timeBudget: number) {
  const index = bucket.findIndex(
    (it) => timeBudget - drillsTable[it].duration >= 0
  )

  if (index === -1) {
    return {
      drill: null,
      restBucket: [],
    }
  }

  return {
    drill: bucket[index],
    restBucket: bucket.filter((_, i) => i !== index),
  }
}

function findMinimalDrill(bucket: string[]) {
  const [drill] = bucket.sort(
    (a, b) => drillsTable[a].duration - drillsTable[b].duration
  )

  return drill
}

function generateRoutine(buckets: Buckets, timeBudget: number) {
  const [raiseRequiredDrill, ...raiseBucket] = buckets.raise
  const [activateRequiredDrill, ...activateBucket] = buckets.activate
  const [mobilizeRequiredDrill, ...mobilizeBucket] = buckets.mobilize
  const [potentiateRequiredDrill, ...potentiateBucket] = buckets.potentiate

  let timeBudgetLeft =
    timeBudget -
    drillsTable[raiseRequiredDrill].duration -
    drillsTable[activateRequiredDrill].duration -
    drillsTable[mobilizeRequiredDrill].duration -
    drillsTable[potentiateRequiredDrill].duration

  const localBuckets = {
    raise: raiseBucket,
    activate: activateBucket,
    mobilize: mobilizeBucket,
    potentiate: potentiateBucket,
  }

  const drills = {
    raise: [raiseRequiredDrill],
    activate: [activateRequiredDrill],
    mobilize: [mobilizeRequiredDrill],
    potentiate: [potentiateRequiredDrill],
  }

  const drillsRotation: (keyof typeof drills)[] = Object.keys(drills).filter(
    (it) => it !== 'common'
  ) as any
  let rotationIndex = 0
  let availableStages = new Set(drillsRotation)

  while (timeBudgetLeft > 0) {
    const stage = drillsRotation[rotationIndex]

    rotationIndex += 1
    if (rotationIndex > drillsRotation.length - 1) {
      rotationIndex = 0
    }

    // Means no more drills that fits into the timeBudget
    if (availableStages.size === 0) {
      break
    }

    const { drill, restBucket } = findDrillThatFits(
      localBuckets[stage],
      timeBudgetLeft
    )

    // means we can't find any drill for this stage anymore
    if (drill == null) {
      availableStages.delete(stage)
      continue
    }

    drills[stage].push(drill)
    localBuckets[stage] = restBucket
    timeBudgetLeft = timeBudgetLeft - drillsTable[drill].duration
  }

  if (timeBudgetLeft > 0) {
    const stage = drillsRotation[rotationIndex]
    const drill = findMinimalDrill(localBuckets[stage])

    const left = timeBudget - timeBudgetLeft
    const right = timeBudgetLeft - drillsTable[drill].duration

    if (right > 0) {
      drills[stage].push(drill)

      return drills
    }

    if (Math.abs(right) < left) {
      drills[stage].push(drill)

      return drills
    }
  }

  return drills
}

export enum DurationLevels {
  Short = 'short',
  Medium = 'medium',
  Long = 'long',
}

interface RoutinesOfTheDay extends Record<DurationLevels, Routine> {
  date: string
}

export const emptyRoutines: RoutinesOfTheDay = {
  date: '',
  [DurationLevels.Short]: {
    duration: '~ 5 min',
    common: [],
    raise: [],
    activate: [],
    mobilize: [],
    potentiate: [],
  },
  [DurationLevels.Medium]: {
    duration: '~ 10 min',
    common: [],
    raise: [],
    activate: [],
    mobilize: [],
    potentiate: [],
  },
  [DurationLevels.Long]: {
    duration: '~ 15 min',
    common: [],
    raise: [],
    activate: [],
    mobilize: [],
    potentiate: [],
  },
}

export function generateRoutines(
  level: Levels,
  prevRoutine: Routine
): RoutinesOfTheDay {
  const shortBudget = 5 * 60
  const mediumBudget = 10 * 60
  const longBudget = 15 * 60

  const [commonDrill] = shuffle(getBucketForLevel(Levels.Common))

  const initialBuckets: Buckets = {
    raise: without(shuffle(getBucketForLevel(level - 2)), ...prevRoutine.raise),
    activate: without(
      shuffle(getBucketForLevel(level - 1)),
      ...prevRoutine.activate
    ),
    mobilize: without(
      shuffle(getBucketForLevel(level)),
      ...prevRoutine.mobilize
    ),
    potentiate: without(
      shuffle(getBucketForLevel(level + 1)),
      ...prevRoutine.potentiate
    ),
  }

  const longestRoutine = generateRoutine(
    initialBuckets,
    longBudget - drillsTable[commonDrill].duration
  )
  const mediumRoutine = generateRoutine(
    longestRoutine,
    mediumBudget - drillsTable[commonDrill].duration
  )
  const shortRoutine = generateRoutine(
    mediumRoutine,
    shortBudget - drillsTable[commonDrill].duration
  )

  return {
    date: format(new Date(), 'yyyy-mm-dd'),
    [DurationLevels.Short]: {
      duration: '~ 5 min',
      common: [commonDrill],
      ...shortRoutine,
    },
    [DurationLevels.Medium]: {
      duration: '~ 10 min',
      common: [commonDrill],
      ...mediumRoutine,
    },
    [DurationLevels.Long]: {
      duration: '~ 15 min',
      common: [commonDrill],
      ...longestRoutine,
    },
  }
}
