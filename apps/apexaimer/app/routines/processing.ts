import { Image } from 'react-native'
import findIndex from 'lodash/findIndex'

// @ts-expect-error
import stub from '../../assets/simple_movement.mp4'

type MDContent = string
interface MDDrillMetadata {
  type: string
  duration: number
  description: string
  modifications: string[]
  levels: string
  videoCloudflareID?: string
}

export enum DrillType {
  Movement,
  Tracking,
  Recoil,
  Precision,
}

export const enum Levels {
  Rookie = 'rookie',
  Iron = 'iron',
  Bronze = 'bronze',
  Silver = 'silver',
  Gold = 'gold',
  Platinum = 'platinum',
  Diamond = 'diamond',
  Ascendant = 'ascendant',
  Master = 'master',
  Predator = 'predator',
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

export interface RoutineDrill {
  key: string
  category: DrillCategory
  type: DrillType
  duration: number
  description: string
  modifications: string[]
  levels: Set<Levels>
  instructions: MDContent
  // uri
  videoUri: string
  thumbnail?: string
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

function getLevelFromMetadata(level: string) {
  switch (level.toLowerCase()) {
    case 'rookie':
      return Levels.Rookie
    case 'iron':
      return Levels.Iron
    case 'bronze':
      return Levels.Bronze
    case 'silver':
      return Levels.Silver
    case 'gold':
      return Levels.Gold
    case 'platinum':
      return Levels.Platinum
    case 'diamond':
      return Levels.Diamond
    case 'ascendant':
      return Levels.Ascendant
    case 'master':
      return Levels.Master
    case 'predator':
      return Levels.Predator
  }
}

export const levelsArray = [
  Levels.Rookie,
  Levels.Iron,
  Levels.Bronze,
  Levels.Silver,
  Levels.Gold,
  Levels.Platinum,
  Levels.Diamond,
  Levels.Ascendant,
  Levels.Master,
  Levels.Predator,
]

function getLevelsFromMetadata(metadata: MDDrillMetadata, filename: string) {
  if (metadata.levels == null) {
    throw `Incorrect levels metadata for drill - ${filename}`
  }

  const [start, end] = metadata.levels.split('-').map((rawLevel) => {
    const level = getLevelFromMetadata(rawLevel)

    if (level == null) {
      throw `Incorrect level for drill - ${filename}`
    }

    return level
  })

  if (end == null) {
    return new Set([start])
  }

  return new Set(
    levelsArray.slice(
      findIndex(levelsArray, (i) => i === start),
      findIndex(levelsArray, (i) => i === end) + 1
    )
  )
}

interface RawDrill {
  default: MDContent
  metadata: MDDrillMetadata
  filename: string
}

function processCloudflareVideo(videoId?: string) {
  if (videoId == null) {
    // TODO
    return Image.resolveAssetSource(stub).uri
  }

  return `https://customer-xzvhmwg826li9fy3.cloudflarestream.com/${videoId}/downloads/default.mp4`
}

function processCloudflareVideoThumbnail(videoId?: string) {
  if (videoId == null) {
    // TODO
    return undefined
  }

  return `https://customer-xzvhmwg826li9fy3.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg`
}

function processDrill(
  category: DrillCategory,
  { default: content, metadata, filename }: RawDrill
): RoutineDrill {
  return {
    key: filename,
    category,
    type: getTypeFromMetadata(metadata),
    description: metadata.description,
    modifications: (metadata.modifications ?? []).sort(
      (a, b) => a.length - b.length
    ),
    levels: getLevelsFromMetadata(metadata, filename),
    duration: metadata.duration,
    instructions: content,
    videoUri: processCloudflareVideo(metadata.videoCloudflareID),
    thumbnail: processCloudflareVideoThumbnail(metadata.videoCloudflareID),
  }
}

export function processDrills(category: DrillCategory, ...files: RawDrill[]) {
  return files.map<RoutineDrill>(processDrill.bind(null, category))
}
