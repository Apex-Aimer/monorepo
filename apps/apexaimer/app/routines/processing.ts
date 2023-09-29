import { Image } from 'react-native'

// @ts-expect-error
import stub from '../../assets/simple_movement.mp4'

import { DrillCategory, DrillType, RoutineDrill } from './types'
import { ModificationT } from '../components/ModificationBadge'
import { Levels, getAllSuitableLevels } from './levels'

type MDContent = string
interface MDDrillMetadata {
  type: string
  duration: number
  description: string
  modifications: string[]
  levels: string
  videoCloudflareID?: string
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

  return new Set(getAllSuitableLevels(start, end))
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
    modifications: ((metadata.modifications ?? []) as ModificationT[]).sort(
      (a, b) => a.length - b.length
    ),
    levels: getLevelsFromMetadata(metadata, filename),
    duration: metadata.duration,
    instructions: content,
    videoUri: processCloudflareVideo(metadata.videoCloudflareID),
    thumbnail: processCloudflareVideoThumbnail(metadata.videoCloudflareID),
  }
}

export function processDrills(
  category: DrillCategory,
  ...files: [RawDrill, string][]
) {
  return files.map<RoutineDrill>(processDrill.bind(null, category))
}
