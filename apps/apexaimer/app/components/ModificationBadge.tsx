import {
  ColorValue,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { AppStyleSheet, useAppStyles } from './useAppStyles'
import { Text } from 'react-native'

const ranges = new Set(['Close range', 'Mid range', 'Long range'])
const dummyMovement = new Set([
  'Dummy still',
  'Dummy constant strafe',
  'Dummy random strafe',
])
const playerMovement = new Set(['Player still', 'Player strafing'])
const criticals = new Set([
  // 'No critical hit',
  'Critical hit',
])

export type ModificationT =
  | 'ranges'
  | 'dummyMovement'
  | 'playerMovement'
  | 'criticals'

export function getModificationByType<U extends unknown>(
  map: Record<ModificationT, U>
) {
  return (mod: ModificationT) => {
    return map[mod]
  }
}

export function getModificationByLabel(label: string): ModificationT | null {
  if (ranges.has(label)) {
    return 'ranges'
  }
  if (dummyMovement.has(label)) {
    return 'dummyMovement'
  }
  if (playerMovement.has(label)) {
    return 'playerMovement'
  }
  if (criticals.has(label)) {
    return 'criticals'
  }
  return null
}

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
  const styles = useAppStyles(themedStyles)

  if (ranges.has(children)) {
    const { backgroundColor: color } = StyleSheet.flatten(styles.range)
    return (
      <ModificationBadgeContent color={color} size={size} variation={variation}>
        {children}
      </ModificationBadgeContent>
    )
  }
  if (dummyMovement.has(children)) {
    const { backgroundColor: color } = StyleSheet.flatten(styles.dummyMovement)
    return (
      <ModificationBadgeContent color={color} size={size} variation={variation}>
        {children}
      </ModificationBadgeContent>
    )
  }
  if (playerMovement.has(children)) {
    const { backgroundColor: color } = StyleSheet.flatten(styles.playerMovement)
    return (
      <ModificationBadgeContent color={color} size={size} variation={variation}>
        {children}
      </ModificationBadgeContent>
    )
  }
  if (criticals.has(children)) {
    const { backgroundColor: color } = StyleSheet.flatten(styles.criticalHit)
    return (
      <ModificationBadgeContent color={color} size={size} variation={variation}>
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
    color: 'text primary inverted',
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
  range: {
    backgroundColor: 'range badge',
  },
  playerMovement: {
    backgroundColor: 'player movement badge',
  },
  dummyMovement: {
    backgroundColor: 'dummy movement badge',
  },
  criticalHit: {
    backgroundColor: 'critical hit badge',
  },
})
