import { ColorValue, TextStyle, View, ViewStyle } from 'react-native'
import { AppStyleSheet, useAppStyles } from './useAppStyles'
import { Text } from 'react-native'

const ranges = new Set([
  'Close range',
  'Mid range',
  'Long range',
  'Mixed range',
])
const dummyMovements = new Set([
  'Dummy still',
  'Dummy constant strafe',
  'Dummy random strafe',
])
const ads = new Set(['ADS', 'NoADS'])
const playerMovements = new Set(['Player still', 'Player strafing'])
const criticals = new Set(['No critical hit', 'Critical hit'])

type BadgeSize = 'small' | 'mid'
type BadgeVariations = 'solid' | 'outline' | 'disabled'

interface WithVariations {
  size?: BadgeSize
  variation?: BadgeVariations
}

interface ModificationBadgeContentProps extends WithVariations {
  color: ColorValue
  children: string
}

function ModificationBadgeContent({
  color,
  children,
  size = 'small',
  variation = 'outline',
}: ModificationBadgeContentProps) {
  const styles = useAppStyles(themedStyles)
  const wrapperSizeStyle = (
    {
      small: styles.wrapperSmall,
      mid: styles.wrapperMid,
    } as Record<BadgeSize, ViewStyle>
  )[size]
  const textSizeStyle = (
    {
      small: styles.textSmall,
      mid: styles.textMid,
    } as Record<BadgeSize, TextStyle>
  )[size]
  const wrapperVariationStyle = (
    {
      outline: {
        borderColor: color,
        borderWidth: 1,
      },
      disabled: styles.wrapperDisabled,
      solid: {
        borderColor: color,
        borderWidth: 1,
        backgroundColor: color,
      },
    } as Record<BadgeVariations, TextStyle>
  )[variation]
  const textVariationStyle = (
    {
      outline: {
        color,
      },
      disabled: styles.textDisabled,
      solid: styles.textSolid,
    } as Record<BadgeVariations, TextStyle>
  )[variation]

  return (
    <View style={[wrapperSizeStyle, wrapperVariationStyle]}>
      <Text style={[textSizeStyle, textVariationStyle]} numberOfLines={1}>
        {children}
      </Text>
    </View>
  )
}

interface Props extends WithVariations {
  children: string
}

export function ModificationBadge({ children, size, variation }: Props) {
  if (ranges.has(children)) {
    return (
      <ModificationBadgeContent
        color="#F5E7D2"
        size={size}
        variation={variation}
      >
        {children}
      </ModificationBadgeContent>
    )
  }
  if (dummyMovements.has(children)) {
    return (
      <ModificationBadgeContent
        color="#E0E9D9"
        size={size}
        variation={variation}
      >
        {children}
      </ModificationBadgeContent>
    )
  }
  if (ads.has(children)) {
    return (
      <ModificationBadgeContent
        color="#FBF2D4"
        size={size}
        variation={variation}
      >
        {children}
      </ModificationBadgeContent>
    )
  }
  if (playerMovements.has(children)) {
    return (
      <ModificationBadgeContent
        color="#D6D2E3"
        size={size}
        variation={variation}
      >
        {children}
      </ModificationBadgeContent>
    )
  }
  if (criticals.has(children)) {
    return (
      <ModificationBadgeContent
        color="#FFFFFF"
        size={size}
        variation={variation}
      >
        {children}
      </ModificationBadgeContent>
    )
  }
  return null
}

const themedStyles = AppStyleSheet.create({
  wrapperSmall: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
  },
  wrapperMid: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  wrapperDisabled: {
    borderColor: 'line disabled',
    borderWidth: 1,
  },
  textSolid: {
    color: 'text dark',
  },
  textDisabled: {
    color: 'line disabled',
  },
  textSmall: {
    fontSize: 9,
    fontFamily: 'rubik 500',
  },
  textMid: {
    color: 'text dark',
    fontSize: 13,
    fontFamily: 'rubik 500',
  },
})
