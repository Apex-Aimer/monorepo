/* eslint-disable jsx-a11y/alt-text */
import { Image, ImageProps, ImageSource } from 'expo-image'
import { Image as RNImage } from 'react-native'

import { Levels } from '../routines/levels'
import { useAppColorScheme } from './ThemeProvider'
import { useMemo } from 'react'

type Theme = ReturnType<typeof useAppColorScheme>

const iconsMap: Record<Levels, Record<Theme, ImageSource>> = {
  [Levels.Rookie]: {
    light: require('../../assets/badges/Rookie_badge_light.png'),
    dark: require('../../assets/badges/Rookie_badge_dark.png'),
  },
  [Levels.Iron]: {
    light: require('../../assets/badges/Iron_badge_light.png'),
    dark: require('../../assets/badges/Iron_badge_dark.png'),
  },
  [Levels.Bronze]: {
    light: require('../../assets/badges/Bronze_badge_light.png'),
    dark: require('../../assets/badges/Bronze_badge_dark.png'),
  },
  [Levels.Silver]: {
    light: require('../../assets/badges/Silver_badge_light.png'),
    dark: require('../../assets/badges/Silver_badge_dark.png'),
  },
  [Levels.Gold]: {
    light: require('../../assets/badges/Gold_badge_light.png'),
    dark: require('../../assets/badges/Gold_badge_dark.png'),
  },
  [Levels.Platinum]: {
    light: require('../../assets/badges/Platinum_badge_light.png'),
    dark: require('../../assets/badges/Platinum_badge_dark.png'),
  },
  [Levels.Diamond]: {
    light: require('../../assets/badges/Diamond_badge_light.png'),
    dark: require('../../assets/badges/Diamond_badge_dark.png'),
  },
  [Levels.Ascendant]: {
    light: require('../../assets/badges/Ascendant_badge_light.png'),
    dark: require('../../assets/badges/Ascendant_badge_dark.png'),
  },
  [Levels.Master]: {
    light: require('../../assets/badges/Master_badge_light.png'),
    dark: require('../../assets/badges/Master_badge_dark.png'),
  },
  [Levels.Predator]: {
    light: require('../../assets/badges/Predator_badge_light.png'),
    dark: require('../../assets/badges/Predator_badge_dark.png'),
  },
}

interface Props extends Omit<ImageProps, 'source'> {
  size: number
  level: Levels
}

export function DifficultyLevelIcon({ size, level, style, ...rest }: Props) {
  const theme = useAppColorScheme()

  const src = useMemo(() => {
    return iconsMap[level][theme]
  }, [level, theme])

  const aspectRatio = useMemo(() => {
    const { width, height } = RNImage.resolveAssetSource(src)

    return width / height
  }, [src])

  return (
    <Image
      source={src}
      style={[style, { height: size, aspectRatio }]}
      contentFit="cover"
      {...rest}
    />
  )
}
