import flatMap from 'lodash/flatMap'

import { processDrills } from './processing'
import {
  DurationLevels,
  RoutinesOfTheDay,
  DrillsCategoriesMap,
  DrillCategory,
  DrillsMap,
} from './types'

export const drillsCategoriesMap: DrillsCategoriesMap = {
  [DrillCategory.BasicMovement]: processDrills(
    DrillCategory.BasicMovement,
    require('./drills/basic-movement.md')
  ),
  [DrillCategory.Bowl]: processDrills(
    DrillCategory.Bowl,
    require('./drills/bowl/1.md'),
    require('./drills/bowl/2.md'),
    require('./drills/bowl/3.md'),
    require('./drills/bowl/4.md'),
    require('./drills/bowl/5.md'),
    require('./drills/bowl/6.md')
  ),
  [DrillCategory.DummyOneClip]: processDrills(
    DrillCategory.DummyOneClip,
    require('./drills/dummy-one-clip/1.md'),
    require('./drills/dummy-one-clip/2.md'),
    require('./drills/dummy-one-clip/3.md')
  ),
  [DrillCategory.DummyOneClipSmoke]: processDrills(
    DrillCategory.DummyOneClipSmoke,
    require('./drills/dummy-one-clip-smoke/1.md'),
    require('./drills/dummy-one-clip-smoke/2.md')
  ),
  [DrillCategory.DummyTrackingADS]: processDrills(
    DrillCategory.DummyTrackingADS,
    require('./drills/dummy-tracking-ads/1.md'),
    require('./drills/dummy-tracking-ads/2.md'),
    require('./drills/dummy-tracking-ads/3.md'),
    require('./drills/dummy-tracking-ads/4.md')
  ),
  [DrillCategory.DummyTrackingNoADS]: processDrills(
    DrillCategory.DummyTrackingNoADS,
    require('./drills/dummy-tracking-noads/1.md')
  ),
  [DrillCategory.DummyWalkArounds]: processDrills(
    DrillCategory.DummyWalkArounds,
    require('./drills/dummy-walk-arounds/1.md')
  ),
  [DrillCategory.LowBurstTargetsSwitching]: processDrills(
    DrillCategory.LowBurstTargetsSwitching,
    require('./drills/low-burst-targets-switching/1.md'),
    require('./drills/low-burst-targets-switching/2.md'),
    require('./drills/low-burst-targets-switching/3.md'),
    require('./drills/low-burst-targets-switching/4.md'),
    require('./drills/low-burst-targets-switching/5.md'),
    require('./drills/low-burst-targets-switching/6.md'),
    require('./drills/low-burst-targets-switching/7.md')
  ),
  [DrillCategory.RecoilControlLadder]: processDrills(
    DrillCategory.RecoilControlLadder,
    require('./drills/recoil-control-ladder/1.md'),
    require('./drills/recoil-control-ladder/2.md'),
    require('./drills/recoil-control-ladder/3.md'),
    require('./drills/recoil-control-ladder/4.md'),
    require('./drills/recoil-control-ladder/5.md'),
    require('./drills/recoil-control-ladder/6.md')
  ),
  [DrillCategory.SingleBulletFlicking]: processDrills(
    DrillCategory.SingleBulletFlicking,
    require('./drills/single-bullet-flicking/1.md'),
    require('./drills/single-bullet-flicking/2.md'),
    require('./drills/single-bullet-flicking/3.md'),
    require('./drills/single-bullet-flicking/4.md'),
    require('./drills/single-bullet-flicking/5.md'),
    require('./drills/single-bullet-flicking/6.md'),
    require('./drills/single-bullet-flicking/7.md')
  ),
  [DrillCategory.SingleBulletFlickingMicro]: processDrills(
    DrillCategory.SingleBulletFlickingMicro,
    require('./drills/single-bullet-flicking-micro/1.md'),
    require('./drills/single-bullet-flicking-micro/2.md'),
    require('./drills/single-bullet-flicking-micro/3.md'),
    require('./drills/single-bullet-flicking-micro/4.md')
  ),
  [DrillCategory.SingleBulletTargetsSwitching]: processDrills(
    DrillCategory.SingleBulletTargetsSwitching,
    require('./drills/single-bullet-targets-switching/1.md'),
    require('./drills/single-bullet-targets-switching/2.md'),
    require('./drills/single-bullet-targets-switching/3.md'),
    require('./drills/single-bullet-targets-switching/4.md'),
    require('./drills/single-bullet-targets-switching/5.md'),
    require('./drills/single-bullet-targets-switching/6.md'),
    require('./drills/single-bullet-targets-switching/7.md')
  ),
  [DrillCategory.TargetsRecoil]: processDrills(
    DrillCategory.TargetsRecoil,
    require('./drills/targets-recoil/1.md'),
    require('./drills/targets-recoil/2.md'),
    require('./drills/targets-recoil/3.md'),
    require('./drills/targets-recoil/4.md')
  ),
  [DrillCategory.TargetsTracking]: processDrills(
    DrillCategory.TargetsTracking,
    require('./drills/targets-tracking/1.md'),
    require('./drills/targets-tracking/2.md'),
    require('./drills/targets-tracking/3.md'),
    require('./drills/targets-tracking/4.md'),
    require('./drills/targets-tracking/5.md')
  ),
  [DrillCategory.TurnAroundTargetBurst]: processDrills(
    DrillCategory.TurnAroundTargetBurst,
    require('./drills/turn-around-target-burst/1.md'),
    require('./drills/turn-around-target-burst/2.md'),
    require('./drills/turn-around-target-burst/3.md'),
    require('./drills/turn-around-target-burst/4.md'),
    require('./drills/turn-around-target-burst/5.md'),
    require('./drills/turn-around-target-burst/6.md')
  ),
  [DrillCategory.WholeMagDummy]: processDrills(
    DrillCategory.WholeMagDummy,
    require('./drills/whole-mag-dummy/1.md'),
    require('./drills/whole-mag-dummy/2.md'),
    require('./drills/whole-mag-dummy/3.md'),
    require('./drills/whole-mag-dummy/4.md'),
    require('./drills/whole-mag-dummy/5.md'),
    require('./drills/whole-mag-dummy/6.md'),
    require('./drills/whole-mag-dummy/7.md'),
    require('./drills/whole-mag-dummy/8.md'),
    require('./drills/whole-mag-dummy/9.md'),
    require('./drills/whole-mag-dummy/10.md')
  ),
}

export const drillsTable: DrillsMap = flatMap(drillsCategoriesMap).reduce(
  (acc, drill) => {
    acc[drill.key] = drill
    return acc
  },
  {}
)

export const drillsVoiceOverTable = [
  // Basic movememnt
  [
    require('./drills/basic-movement.md'),
    require('./drills/basic-movement.ssml'),
  ],
  // Bowl
  [require('./drills/bowl/1.md'), require('./drills/bowl/1.ssml')],
  [require('./drills/bowl/2.md'), require('./drills/bowl/2.ssml')],
  [require('./drills/bowl/3.md'), require('./drills/bowl/3.ssml')],
  [require('./drills/bowl/4.md'), require('./drills/bowl/4.ssml')],
  [require('./drills/bowl/5.md'), require('./drills/bowl/5.ssml')],
  [require('./drills/bowl/6.md'), require('./drills/bowl/6.ssml')],
  // Dummy one clip
  [
    require('./drills/dummy-one-clip/1.md'),
    require('./drills/dummy-one-clip/1.ssml'),
  ],
  [
    require('./drills/dummy-one-clip/2.md'),
    require('./drills/dummy-one-clip/2.ssml'),
  ],
  [
    require('./drills/dummy-one-clip/3.md'),
    require('./drills/dummy-one-clip/3.ssml'),
  ],
  // Dummy one clip smoke
  [
    require('./drills/dummy-one-clip-smoke/1.md'),
    require('./drills/dummy-one-clip-smoke/1.ssml'),
  ],
  [
    require('./drills/dummy-one-clip-smoke/2.md'),
    require('./drills/dummy-one-clip-smoke/2.ssml'),
  ],
  // Dummy tracking ads
  [
    require('./drills/dummy-tracking-ads/1.md'),
    require('./drills/dummy-tracking-ads/1.ssml'),
  ],
  [
    require('./drills/dummy-tracking-ads/2.md'),
    require('./drills/dummy-tracking-ads/2.ssml'),
  ],
  [
    require('./drills/dummy-tracking-ads/3.md'),
    require('./drills/dummy-tracking-ads/3.ssml'),
  ],
  [
    require('./drills/dummy-tracking-ads/4.md'),
    require('./drills/dummy-tracking-ads/4.ssml'),
  ],
  // Dummy tracking no-ads
  [
    require('./drills/dummy-tracking-noads/1.md'),
    require('./drills/dummy-tracking-noads/1.ssml'),
  ],
  // Dummy walk arounds
  [
    require('./drills/dummy-walk-arounds/1.md'),
    require('./drills/dummy-walk-arounds/1.ssml'),
  ],
  // Low burst targets switching
  [
    require('./drills/low-burst-targets-switching/1.md'),
    require('./drills/low-burst-targets-switching/1.ssml'),
  ],
  [
    require('./drills/low-burst-targets-switching/2.md'),
    require('./drills/low-burst-targets-switching/2.ssml'),
  ],
  [
    require('./drills/low-burst-targets-switching/3.md'),
    require('./drills/low-burst-targets-switching/3.ssml'),
  ],
  [
    require('./drills/low-burst-targets-switching/4.md'),
    require('./drills/low-burst-targets-switching/4.ssml'),
  ],
  [
    require('./drills/low-burst-targets-switching/5.md'),
    require('./drills/low-burst-targets-switching/5.ssml'),
  ],
  [
    require('./drills/low-burst-targets-switching/6.md'),
    require('./drills/low-burst-targets-switching/6.ssml'),
  ],
  [
    require('./drills/low-burst-targets-switching/7.md'),
    require('./drills/low-burst-targets-switching/7.ssml'),
  ],
  // Recoil control ladder
  [
    require('./drills/recoil-control-ladder/1.md'),
    require('./drills/recoil-control-ladder/1.ssml'),
  ],
  [
    require('./drills/recoil-control-ladder/2.md'),
    require('./drills/recoil-control-ladder/2.ssml'),
  ],
  [
    require('./drills/recoil-control-ladder/3.md'),
    require('./drills/recoil-control-ladder/3.ssml'),
  ],
  [
    require('./drills/recoil-control-ladder/4.md'),
    require('./drills/recoil-control-ladder/4.ssml'),
  ],
  [
    require('./drills/recoil-control-ladder/5.md'),
    require('./drills/recoil-control-ladder/5.ssml'),
  ],
  [
    require('./drills/recoil-control-ladder/6.md'),
    require('./drills/recoil-control-ladder/6.ssml'),
  ],
  // Single bullet flicking
  [
    require('./drills/single-bullet-flicking/1.md'),
    require('./drills/single-bullet-flicking/1.ssml'),
  ],
  [
    require('./drills/single-bullet-flicking/2.md'),
    require('./drills/single-bullet-flicking/2.ssml'),
  ],
  [
    require('./drills/single-bullet-flicking/3.md'),
    require('./drills/single-bullet-flicking/3.ssml'),
  ],
  [
    require('./drills/single-bullet-flicking/4.md'),
    require('./drills/single-bullet-flicking/4.ssml'),
  ],
  [
    require('./drills/single-bullet-flicking/5.md'),
    require('./drills/single-bullet-flicking/5.ssml'),
  ],
  [
    require('./drills/single-bullet-flicking/6.md'),
    require('./drills/single-bullet-flicking/6.ssml'),
  ],
  [
    require('./drills/single-bullet-flicking/7.md'),
    require('./drills/single-bullet-flicking/7.ssml'),
  ],
  // Single bullet flicking micro
  [
    require('./drills/single-bullet-flicking-micro/1.md'),
    require('./drills/single-bullet-flicking-micro/1.ssml'),
  ],
  [
    require('./drills/single-bullet-flicking-micro/2.md'),
    require('./drills/single-bullet-flicking-micro/2.ssml'),
  ],
  [
    require('./drills/single-bullet-flicking-micro/3.md'),
    require('./drills/single-bullet-flicking-micro/3.ssml'),
  ],
  [
    require('./drills/single-bullet-flicking-micro/4.md'),
    require('./drills/single-bullet-flicking-micro/4.ssml'),
  ],
  // Single bullet targets switching
  [
    require('./drills/single-bullet-targets-switching/1.md'),
    require('./drills/single-bullet-targets-switching/1.ssml'),
  ],
  [
    require('./drills/single-bullet-targets-switching/2.md'),
    require('./drills/single-bullet-targets-switching/2.ssml'),
  ],
  [
    require('./drills/single-bullet-targets-switching/3.md'),
    require('./drills/single-bullet-targets-switching/3.ssml'),
  ],
  [
    require('./drills/single-bullet-targets-switching/4.md'),
    require('./drills/single-bullet-targets-switching/4.ssml'),
  ],
  [
    require('./drills/single-bullet-targets-switching/5.md'),
    require('./drills/single-bullet-targets-switching/5.ssml'),
  ],
  [
    require('./drills/single-bullet-targets-switching/6.md'),
    require('./drills/single-bullet-targets-switching/6.ssml'),
  ],
  [
    require('./drills/single-bullet-targets-switching/7.md'),
    require('./drills/single-bullet-targets-switching/7.ssml'),
  ],
  // Targets recoil
  [
    require('./drills/targets-recoil/1.md'),
    require('./drills/targets-recoil/1.ssml'),
  ],
  [
    require('./drills/targets-recoil/2.md'),
    require('./drills/targets-recoil/2.ssml'),
  ],
  [
    require('./drills/targets-recoil/3.md'),
    require('./drills/targets-recoil/3.ssml'),
  ],
  [
    require('./drills/targets-recoil/4.md'),
    require('./drills/targets-recoil/4.ssml'),
  ],
  // Targets tracking
  [
    require('./drills/targets-tracking/1.md'),
    require('./drills/targets-tracking/1.ssml'),
  ],
  [
    require('./drills/targets-tracking/2.md'),
    require('./drills/targets-tracking/2.ssml'),
  ],
  [
    require('./drills/targets-tracking/3.md'),
    require('./drills/targets-tracking/3.ssml'),
  ],
  [
    require('./drills/targets-tracking/4.md'),
    require('./drills/targets-tracking/4.ssml'),
  ],
  [
    require('./drills/targets-tracking/5.md'),
    require('./drills/targets-tracking/5.ssml'),
  ],
  // Turn around target burst
  [
    require('./drills/turn-around-target-burst/1.md'),
    require('./drills/turn-around-target-burst/1.ssml'),
  ],
  [
    require('./drills/turn-around-target-burst/2.md'),
    require('./drills/turn-around-target-burst/2.ssml'),
  ],
  [
    require('./drills/turn-around-target-burst/3.md'),
    require('./drills/turn-around-target-burst/3.ssml'),
  ],
  [
    require('./drills/turn-around-target-burst/4.md'),
    require('./drills/turn-around-target-burst/4.ssml'),
  ],
  [
    require('./drills/turn-around-target-burst/5.md'),
    require('./drills/turn-around-target-burst/5.ssml'),
  ],
  [
    require('./drills/turn-around-target-burst/6.md'),
    require('./drills/turn-around-target-burst/6.ssml'),
  ],
  // Whole mag dummy
  [
    require('./drills/whole-mag-dummy/1.md'),
    require('./drills/whole-mag-dummy/1.ssml'),
  ],
  [
    require('./drills/whole-mag-dummy/2.md'),
    require('./drills/whole-mag-dummy/2.ssml'),
  ],
  [
    require('./drills/whole-mag-dummy/3.md'),
    require('./drills/whole-mag-dummy/3.ssml'),
  ],
  [
    require('./drills/whole-mag-dummy/4.md'),
    require('./drills/whole-mag-dummy/4.ssml'),
  ],
  [
    require('./drills/whole-mag-dummy/5.md'),
    require('./drills/whole-mag-dummy/5.ssml'),
  ],
  [
    require('./drills/whole-mag-dummy/6.md'),
    require('./drills/whole-mag-dummy/6.ssml'),
  ],
  [
    require('./drills/whole-mag-dummy/7.md'),
    require('./drills/whole-mag-dummy/7.ssml'),
  ],
  [
    require('./drills/whole-mag-dummy/8.md'),
    require('./drills/whole-mag-dummy/8.ssml'),
  ],
  [
    require('./drills/whole-mag-dummy/9.md'),
    require('./drills/whole-mag-dummy/9.ssml'),
  ],
  [
    require('./drills/whole-mag-dummy/10.md'),
    require('./drills/whole-mag-dummy/10.ssml'),
  ],
].reduce((acc, [{ filename }, { default: content }]) => {
  acc[filename] = content
  return acc
}, {})

export const emptyRoutines: RoutinesOfTheDay = {
  date: '',
  [DurationLevels.Short]: {
    duration: '~ 5 min',
    common: [],
    raise: [],
    mobilize: [],
    potentiate: [],
  },
  [DurationLevels.Medium]: {
    duration: '~ 10 min',
    common: [],
    raise: [],
    mobilize: [],
    potentiate: [],
  },
  [DurationLevels.Long]: {
    duration: '~ 15 min',
    common: [],
    raise: [],
    mobilize: [],
    potentiate: [],
  },
}
