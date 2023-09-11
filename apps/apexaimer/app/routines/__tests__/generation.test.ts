import {
  getBucketForRaiseDrills,
  getCategoriesForLevel,
  getRaiseDrills,
  getWeightedDrills,
} from '../generation'
import { Levels, levelsArray } from '../levels'
import { DrillCategory, DrillsCategoriesMap, RoutineDrill } from '../types'

describe('getCategoriesForLevel', () => {
  function getDrillsCategoriesWith(content: any): DrillsCategoriesMap {
    return {
      [DrillCategory.BasicMovement]: content,
      [DrillCategory.Bowl]: content,
      [DrillCategory.DummyOneClip]: content,
      [DrillCategory.DummyOneClipSmoke]: content,
      [DrillCategory.DummyTrackingADS]: content,
      [DrillCategory.DummyTrackingNoADS]: content,
      [DrillCategory.DummyWalkArounds]: content,
      [DrillCategory.LowBurstTargetsSwitching]: content,
      [DrillCategory.RecoilControlLadder]: content,
      [DrillCategory.SingleBulletFlicking]: content,
      [DrillCategory.SingleBulletFlickingMicro]: content,
      [DrillCategory.SingleBulletTargetsSwitching]: content,
      [DrillCategory.TargetsRecoil]: content,
      [DrillCategory.TargetsTracking]: content,
      [DrillCategory.TurnAroundTargetBurst]: content,
      [DrillCategory.WholeMagDummy]: content,
    }
  }

  const emptyTestDrillsCategoriesMap = getDrillsCategoriesWith([])

  it.each(levelsArray.map((level) => ({ level })))(
    'should correctly get categories for a only one item with $level',
    ({ level }) => {
      const categories = getCategoriesForLevel(level, {
        ...emptyTestDrillsCategoriesMap,
        [DrillCategory.BasicMovement]: [
          { levels: new Set([level]) } as unknown as RoutineDrill,
        ],
      })

      expect(categories).toEqual([DrillCategory.BasicMovement])
    }
  )

  it.each(levelsArray.map((level) => ({ level })))(
    'should get no categories for $level',
    ({ level }) => {
      const categories = getCategoriesForLevel(
        level,
        getDrillsCategoriesWith([
          { levels: new Set(levelsArray.filter((it) => it !== level)) },
        ])
      )

      expect(categories).toEqual([])
    }
  )
})

describe('getWeightedDrills', () => {
  const bucket = [
    DrillCategory.DummyWalkArounds,
    DrillCategory.TargetsTracking,
    DrillCategory.DummyTrackingADS,
    DrillCategory.TargetsRecoil,
    DrillCategory.DummyOneClip,
  ]
  it('should return only properly weighted drills for weight 1', () => {
    const drills = getWeightedDrills(bucket, 1)

    expect(drills).toEqual(bucket)
  })

  it('should return only properly weighted drills for weight 2', () => {
    const drills = getWeightedDrills(bucket, 2)

    expect(drills).toEqual([
      DrillCategory.TargetsTracking,
      DrillCategory.DummyTrackingADS,
      DrillCategory.TargetsRecoil,
      DrillCategory.DummyOneClip,
    ])
  })

  it('should return only properly weighted drills for weight 3', () => {
    const drills = getWeightedDrills(bucket, 3)

    expect(drills).toEqual([
      DrillCategory.TargetsRecoil,
      DrillCategory.DummyOneClip,
    ])
  })
})

describe('getBucketForRaiseDrills', () => {
  const allRaiseCategories = [
    DrillCategory.DummyWalkArounds,
    DrillCategory.TargetsTracking,
    DrillCategory.DummyTrackingNoADS,
    DrillCategory.DummyTrackingADS,
    DrillCategory.TargetsRecoil,
    DrillCategory.RecoilControlLadder,
    DrillCategory.DummyOneClip,
    DrillCategory.DummyOneClipSmoke,
  ]

  it.each(Array.from({ length: 8 }).map((_, count) => ({ count })))(
    'should remove $count entries from a bucket with previous categories',
    ({ count }) => {
      const bucket = getBucketForRaiseDrills(
        allRaiseCategories.slice(0, count),
        allRaiseCategories
      )

      expect(bucket).toHaveLength(allRaiseCategories.length - count)
    }
  )

  it.each(Array.from({ length: 8 }).map((_, count) => ({ count })))(
    'should get $count entries from a bucket with applicable categories',
    ({ count }) => {
      const bucket = getBucketForRaiseDrills(
        [],
        allRaiseCategories.slice(0, count)
      )

      expect(bucket).toHaveLength(count)
    }
  )

  it('should just work', () => {
    const bucket = getBucketForRaiseDrills(
      [DrillCategory.TargetsTracking, DrillCategory.DummyTrackingNoADS],
      [
        DrillCategory.DummyWalkArounds,
        DrillCategory.TargetsTracking,
        DrillCategory.DummyTrackingNoADS,
        DrillCategory.DummyTrackingADS,
      ]
    )

    expect(bucket).toHaveLength(2)
  })
})

describe('getRaiseDrills', () => {
  it('should return the same drills', () => {
    const categories = getRaiseDrills(
      [
        DrillCategory.TargetsRecoil,
        DrillCategory.RecoilControlLadder,
        DrillCategory.DummyOneClip,
        DrillCategory.DummyOneClipSmoke,
      ],
      4
    )

    expect(categories).toHaveLength(4)
  })

  it('should have only one drill with weight 2', () => {
    const categories = getRaiseDrills(
      [
        DrillCategory.TargetsTracking,
        DrillCategory.DummyTrackingNoADS,
        DrillCategory.DummyTrackingADS,
        DrillCategory.TargetsRecoil,
      ],
      Infinity
    )

    expect(categories).toHaveLength(2)
    expect(categories).toEqual([
      DrillCategory.TargetsTracking,
      DrillCategory.TargetsRecoil,
    ])
  })

  it('should have only one drill with weight 1', () => {
    const categories = getRaiseDrills(
      [
        DrillCategory.DummyWalkArounds,
        DrillCategory.TargetsTracking,
        DrillCategory.DummyTrackingNoADS,
        DrillCategory.DummyTrackingADS,
        DrillCategory.TargetsRecoil,
      ],
      Infinity
    )

    expect(categories).toHaveLength(3)
    expect(categories).toEqual([
      DrillCategory.DummyWalkArounds,
      DrillCategory.TargetsTracking,
      DrillCategory.TargetsRecoil,
    ])
  })

  it('should have drills with weight no less than first drill (weight 2)', () => {
    const categories = getRaiseDrills(
      [
        DrillCategory.TargetsTracking,
        DrillCategory.DummyWalkArounds,
        DrillCategory.DummyTrackingNoADS,
        DrillCategory.DummyTrackingADS,
        DrillCategory.TargetsRecoil,
      ],
      Infinity
    )

    expect(categories).toHaveLength(2)
    expect(categories).toEqual([
      DrillCategory.TargetsTracking,
      DrillCategory.TargetsRecoil,
    ])
  })

  it('should have drills with weight no less than first drill (weight 3)', () => {
    const categories = getRaiseDrills(
      [
        DrillCategory.TargetsRecoil,
        DrillCategory.TargetsTracking,
        DrillCategory.DummyWalkArounds,
        DrillCategory.DummyTrackingNoADS,
        DrillCategory.DummyTrackingADS,
        DrillCategory.DummyOneClip,
      ],
      Infinity
    )

    expect(categories).toHaveLength(2)
    expect(categories).toEqual([
      DrillCategory.TargetsRecoil,
      DrillCategory.DummyOneClip,
    ])
  })
})
