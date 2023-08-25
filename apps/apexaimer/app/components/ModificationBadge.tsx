import { View, ViewStyle } from 'react-native'
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

export enum ModificationBadgeSize {
  Small,
  Mid,
}

interface WithSize {
  size?: ModificationBadgeSize
}

interface ModificationBadgeContentProps extends WithSize {
  style: ViewStyle
  children: string
}

function ModificationBadgeContent({
  style,
  children,
  size,
}: ModificationBadgeContentProps) {
  const styles = useAppStyles(themedStyles)
  const wrapperStyle = {
    [ModificationBadgeSize.Small]: styles.wrapperSmall,
    [ModificationBadgeSize.Mid]: styles.wrapperMid,
  }[size]
  const textStyle = {
    [ModificationBadgeSize.Small]: styles.textSmall,
    [ModificationBadgeSize.Mid]: styles.textMid,
  }[size]

  return (
    <View style={[wrapperStyle, style]}>
      <Text style={textStyle}>{children}</Text>
    </View>
  )
}

interface Props extends WithSize {
  children: string
}

export function ModificationBadge({
  children,
  size = ModificationBadgeSize.Small,
}: Props) {
  const styles = useAppStyles(themedStyles)

  if (ranges.has(children)) {
    return (
      <ModificationBadgeContent style={styles.range} size={size}>
        {children}
      </ModificationBadgeContent>
    )
  }
  if (dummyMovements.has(children)) {
    return (
      <ModificationBadgeContent style={styles.dummyMovement} size={size}>
        {children}
      </ModificationBadgeContent>
    )
  }
  if (ads.has(children)) {
    return (
      <ModificationBadgeContent style={styles.ads} size={size}>
        {children}
      </ModificationBadgeContent>
    )
  }
  if (playerMovements.has(children)) {
    return (
      <ModificationBadgeContent style={styles.playerMovement} size={size}>
        {children}
      </ModificationBadgeContent>
    )
  }
  if (criticals.has(children)) {
    return (
      <ModificationBadgeContent style={styles.criticalHit} size={size}>
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
    borderRadius: 5,
  },
  textSmall: {
    color: 'text dark',
    fontSize: 10,
    fontFamily: 'rubik 500',
  },
  textMid: {
    color: 'text dark',
    fontSize: 13,
    fontFamily: 'rubik 500',
  },
  range: {
    backgroundColor: '#F5E7D2',
  },
  ads: {
    backgroundColor: '#FBF2D4',
  },
  dummyMovement: {
    backgroundColor: '#E0E9D9',
  },
  playerMovement: {
    backgroundColor: '#D6D2E3',
  },
  criticalHit: {
    backgroundColor: '#FFFFFF',
  },
})
