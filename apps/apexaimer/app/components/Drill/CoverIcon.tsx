import { StyleSheet, View, ViewStyle } from 'react-native'

import { AppStyleSheet, useAppStyles } from '../useAppStyles'
import RecoilIcon from './RecoilIcon'
import TrackingIcon from './TrackingIcon'
import PrecisionIcon from './PrecisionIcon'
import MovementIcon from './MovementIcon'
import { DrillType } from '../../routines/types'

interface CoverIconProps {
  type: DrillType
  active?: boolean
  size?: number
  style?: ViewStyle
  absolute?: boolean
}

export function CoverIcon({
  type,
  active = true,
  size = 40,
  absolute = false,
}: CoverIconProps) {
  const styles = useAppStyles(themedStyles)
  const { backgroundColor: regularFill } = StyleSheet.flatten(
    styles.coverIconRegular
  )
  const { backgroundColor: inactiveFill } = StyleSheet.flatten(
    styles.coverIconInactive
  )

  const borderRadius = Math.round(0.25 * size)

  switch (type) {
    case DrillType.Movement:
      return (
        <View
          style={[
            styles.coverIcon,
            { width: size, borderRadius },
            absolute && styles.coverIconAbsolute,
          ]}
        >
          <View
            style={[
              active ? styles.movement : styles.coverIconInactiveBg,
              StyleSheet.absoluteFill,
              { borderRadius },
            ]}
          />
          <MovementIcon
            fill={active ? regularFill : inactiveFill}
            width={Math.floor(0.75 * size)}
            height={Math.floor(0.55 * size)}
          />
        </View>
      )
    case DrillType.Precision:
      return (
        <View
          style={[
            styles.coverIcon,
            { width: size, borderRadius },
            absolute && styles.coverIconAbsolute,
          ]}
        >
          <View
            style={[
              active ? styles.precision : styles.coverIconInactiveBg,
              StyleSheet.absoluteFill,
              { borderRadius },
            ]}
          />
          <PrecisionIcon
            fill={active ? regularFill : inactiveFill}
            width={Math.floor(0.65 * size)}
            height={Math.floor(0.65 * size)}
          />
        </View>
      )
    case DrillType.Tracking:
      return (
        <View
          style={[
            styles.coverIcon,
            { width: size, borderRadius },
            absolute && styles.coverIconAbsolute,
          ]}
        >
          <View
            style={[
              active ? styles.tracking : styles.coverIconInactiveBg,
              StyleSheet.absoluteFill,
              { borderRadius },
            ]}
          />
          <TrackingIcon
            fill={active ? regularFill : inactiveFill}
            width={Math.floor(0.775 * size)}
            height={Math.floor(0.5 * size)}
          />
        </View>
      )
    case DrillType.Recoil:
      return (
        <View
          style={[
            styles.coverIcon,
            { width: size, borderRadius },
            absolute && styles.coverIconAbsolute,
          ]}
        >
          <View
            style={[
              active ? styles.recoil : styles.coverIconInactiveBg,
              StyleSheet.absoluteFill,
              { borderRadius },
            ]}
          />
          <RecoilIcon
            fill={active ? regularFill : inactiveFill}
            width={Math.floor(0.85 * size)}
            height={Math.floor(0.55 * size)}
          />
        </View>
      )
    default:
      return null
  }
}

const themedStyles = AppStyleSheet.create({
  coverIconAbsolute: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  coverIcon: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'icon primary',
    shadowColor: 'icon shadow',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  coverIconRegular: {
    backgroundColor: 'icon primary',
  },
  coverIconInactive: {
    backgroundColor: 'line',
  },
  coverIconInactiveBg: {
    backgroundColor: 'neutral drill',
  },
  movement: {
    backgroundColor: 'movement',
  },
  precision: {
    backgroundColor: 'precision',
  },
  recoil: {
    backgroundColor: 'recoil',
  },
  tracking: {
    backgroundColor: 'tracking',
  },
})
