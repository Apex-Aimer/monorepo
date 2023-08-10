type MDContent = Record<string, string>
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

export interface Routine {
  duration: string
  data: string[]
}

export interface RoutineDrill {
  type: DrillType
  duration: number
  description: string
  instructions: MDContent
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
  }
}

export const drillsTable: Record<string, RoutineDrill> = {
  ['basic-movement']: processDrill(require('./drills/basic-movement.md')),
  ['strafing-dummy-tracking']: processDrill(
    require('./drills/strafing-dummy-tracking.md')
  ),
  ['dummy-recoil-ladder']: processDrill(
    require('./drills/dummy-recoil-ladder.md')
  ),
  ['single-bullet-targets-switching']: processDrill(
    require('./drills/single-bullet-targets-switching.md')
  ),
}

export const routinesTable: Record<string, Routine> = {
  defaultShort: {
    duration: '~ 5 min',
    data: [
      'basic-movement',
      'strafing-dummy-tracking',
      'dummy-recoil-ladder',
      'single-bullet-targets-switching',
    ],
  },
  defaultMedium: {
    duration: '5-10 min',
    data: [
      'basic-movement',
      'basic-movement',
      'strafing-dummy-tracking',
      'strafing-dummy-tracking',
      'dummy-recoil-ladder',
      'dummy-recoil-ladder',
      'single-bullet-targets-switching',
    ],
  },
  defaultLong: {
    duration: '10-15 min',
    data: [
      'basic-movement',
      'basic-movement',
      'basic-movement',
      'strafing-dummy-tracking',
      'strafing-dummy-tracking',
      'strafing-dummy-tracking',
      'dummy-recoil-ladder',
      'dummy-recoil-ladder',
      'single-bullet-targets-switching',
      'single-bullet-targets-switching',
    ],
  },
}
