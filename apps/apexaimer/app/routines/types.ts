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
