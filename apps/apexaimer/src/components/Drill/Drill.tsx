import { LinearGradient } from 'expo-linear-gradient'
import { AppStyleSheet, useAppStyles } from '../useAppStyles'
import { useThemeColors } from '../ThemeProvider'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { PrimaryGradientText } from '../PrimaryGradientText'
import MovementIcon from './MovementIcon'
import PrecisionIcon from './PrecisionIcon'
import TrackingIcon from './TrackingIcon'
import RecoilIcon from './RecoilIcon'

export enum DrillType {
  Movement,
  Tracking,
  Recoil,
  Precision,
}

export interface RoutineDrill {
  type: DrillType
  description: string
}

interface CoverIconProps {
  type: DrillType
  active?: boolean
  style?: ViewStyle
}

function CoverIcon({ type, active = true }: CoverIconProps) {
  const styles = useAppStyles(themedStyles)
  const { backgroundColor: regularFill } = StyleSheet.flatten(
    styles.coverIconRegular
  )
  const { backgroundColor: inactiveFill } = StyleSheet.flatten(
    styles.coverIconInactive
  )
  switch (type) {
    case DrillType.Movement:
      return (
        <View style={[styles.coverIcon]}>
          <View
            style={[
              active ? styles.movement : styles.coverIconInactiveBg,
              StyleSheet.absoluteFill,
            ]}
          />
          <MovementIcon fill={active ? regularFill : inactiveFill} />
        </View>
      )
    case DrillType.Precision:
      return (
        <View style={[styles.coverIcon]}>
          <View
            style={[
              active ? styles.precision : styles.coverIconInactiveBg,
              StyleSheet.absoluteFill,
            ]}
          />
          <PrecisionIcon fill={active ? regularFill : inactiveFill} />
        </View>
      )
    case DrillType.Tracking:
      return (
        <View style={[styles.coverIcon]}>
          <View
            style={[
              active ? styles.tracking : styles.coverIconInactiveBg,
              StyleSheet.absoluteFill,
            ]}
          />
          <TrackingIcon fill={active ? regularFill : inactiveFill} />
        </View>
      )
    case DrillType.Recoil:
      return (
        <View style={[styles.coverIcon]}>
          <View
            style={[
              active ? styles.recoil : styles.coverIconInactiveBg,
              StyleSheet.absoluteFill,
            ]}
          />
          <RecoilIcon fill={active ? regularFill : inactiveFill} />
        </View>
      )
    default:
      return null
  }
}

interface DrillProps extends RoutineDrill {
  /**
   * UI prop, it's about connection line between rows
   */
  hasContinuation?: boolean
  /**
   * Made for routine exercise, to highligh active one
   * On the main screen, all are active by default
   */
  active?: boolean
}

export function Drill({
  type,
  description,
  hasContinuation = true,
  active = true,
}: DrillProps) {
  const styles = useAppStyles(themedStyles)
  const theme = useThemeColors()

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.container,
          hasContinuation && styles.containerWithContinuation,
        ]}
      >
        <LinearGradient
          colors={
            active
              ? (theme['exercise item gradient'] as string[])
              : (theme['exercise item gradient inactive'] as string[])
          }
          start={{ x: 1, y: 0.5 }}
          end={{ x: 0, y: 0.5 }}
          style={styles.containerBg}
        ></LinearGradient>
        <View style={styles.coverContainer}>
          <View style={styles.cover} />
          <CoverIcon type={type} active={active} />
          {hasContinuation && (
            <View style={styles.connectionLineWrapper}>
              <View style={styles.connectionLine} />
            </View>
          )}
        </View>
        <View style={styles.descriptionWrapper}>
          <Text
            style={[styles.description, !active && styles.descriptionInactive]}
          >
            {description}
          </Text>
          <View style={styles.descriptionCtaWrapper}>
            <PrimaryGradientText style={styles.descriptionCtaText}>
              What to do {'>'}
            </PrimaryGradientText>
          </View>
        </View>
      </View>
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  row: {
    paddingHorizontal: 15,
  },
  container: {
    paddingVertical: 15,
    paddingRight: 15,
    flexDirection: 'row',
    gap: 15,
    overflow: 'visible',
  },
  containerWithContinuation: {
    marginBottom: 10,
  },
  containerBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    overflow: 'hidden',
  },
  coverContainer: {
    position: 'relative',
    paddingRight: 20,
    paddingBottom: 20,
  },
  cover: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: 'accent primary',
    borderRadius: 10,
  },
  coverIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    aspectRatio: 1,
    borderRadius: 10,
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
    borderRadius: 10,
    backgroundColor: 'neutral drill',
  },
  movement: {
    borderRadius: 10,
    backgroundColor: 'movement',
  },
  precision: {
    borderRadius: 10,
    backgroundColor: 'precision',
  },
  recoil: {
    borderRadius: 10,
    backgroundColor: 'recoil',
  },
  tracking: {
    borderRadius: 10,
    backgroundColor: 'tracking',
  },
  connectionLineWrapper: {
    position: 'absolute',
    left: 30,
    bottom: -39,
    overflow: 'hidden',
    height: 60,
    width: 2,
  },
  connectionLine: {
    flex: 1,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: 'line',
    width: 5,
    borderRadius: 0,
    marginLeft: -3,
  },
  descriptionWrapper: {
    flex: 1,
  },
  description: {
    fontFamily: 'rubik 700',
    textAlign: 'right',
    fontSize: 16,
    color: 'text primary',
  },
  descriptionInactive: {
    color: 'line disabled',
  },
  descriptionCtaWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  descriptionCtaText: {
    fontFamily: 'rubik 700',
    fontSize: 16,
  },
})
