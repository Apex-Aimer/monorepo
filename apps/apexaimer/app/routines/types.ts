import { ModificationT } from '../components/ModificationBadge'
import { Levels } from './levels'

export enum DrillType {
  Movement,
  Tracking,
  Recoil,
  Precision,
}

export const enum DrillCategory {
  BasicMovement = 'basic-movement',
  Bowl = 'bowl',
  DummyOneClip = 'dummy-one-clip',
  DummyOneClipSmoke = 'dummy-one-clip-smoke',
  DummyTrackingADS = 'dummy-tracking-ads',
  DummyTrackingNoADS = 'dummy-tracking-noads',
  DummyWalkArounds = 'dummy-walk-arounds',
  SingleBulletTargetsSwitching = 'single-bullet-targets-switching',
  SingleBulletFlicking = 'single-bullet-flicking',
  SingleBulletFlickingMicro = 'single-bullet-flicking-micro',
  LowBurstTargetsSwitching = 'low-burst-targets-switching',
  RecoilControlLadder = 'recoil-control-ladder',
  TargetsRecoil = 'targets-recoil',
  TargetsTracking = 'targets-tracking',
  TurnAroundTargetBurst = 'turn-around-target-burst',
  WholeMagDummy = 'whole-mag-dummy',
}

type MDContent = string

export interface RoutineDrill {
  key: string
  category: DrillCategory
  type: DrillType
  duration: number
  description: string
  modifications: ModificationT[]
  levels: Set<Levels>
  instructions: MDContent
  // uri
  videoUri: string
  thumbnail?: string
}

export const enum RAMPStage {
  Common = 'common',
  Raise = 'raise',
  Mobilize = 'mobilize',
  Potentiate = 'potentiate',
}

interface Buckets {
  [RAMPStage.Raise]: string[]
  [RAMPStage.Mobilize]: string[]
  [RAMPStage.Potentiate]: string[]
}

export interface Routine extends Buckets {
  duration: string
  [RAMPStage.Common]: string[]
}

export enum DurationLevels {
  Short = 'short',
  Medium = 'medium',
  Long = 'long',
}

export interface RoutinesOfTheDay extends Record<DurationLevels, Routine> {
  date: string
}

export type DrillsCategoriesMap = Record<DrillCategory, RoutineDrill[]>

export type DrillsMap = Record<string, RoutineDrill>
