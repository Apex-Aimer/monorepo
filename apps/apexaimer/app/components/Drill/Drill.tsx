import { PropsWithChildren, forwardRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRecoilValue } from 'recoil'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { AppStyleSheet, useAppStyles } from '../useAppStyles'
import { useThemeColors } from '../ThemeProvider'
import { routineDrill } from '../../store'
import { CoverIcon } from './CoverIcon'
import { Button } from '../Button'
import { ModificationBadge } from '../ModificationBadge'
import { Image, ImageStyle } from 'expo-image'

interface DrillProps extends PropsWithChildren {
  id: string
  /**
   * UI prop, it's about connection line between rows
   */
  hasContinuation?: boolean
  /**
   * Made for routine exercise, to highligh active one
   * On the main screen, all are active by default
   */
  active?: boolean
  /**
   * Whether a drill row is pressable or not
   * When it's `false` `onPress` handle won't have any effect
   */
  interactive?: boolean
  onPress?(): void
}

function DrillInner({
  id,
  hasContinuation = true,
  active = true,
  children,
}: DrillProps) {
  const styles = useAppStyles(themedStyles)
  const theme = useThemeColors()
  const { type, description, modifications, thumbnail } = useRecoilValue(
    routineDrill(id)
  )

  return (
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
      />
      <View style={styles.coverContainer}>
        <View style={styles.cover}>
          <Image
            style={styles.coverImage as ImageStyle}
            source={{ uri: thumbnail }}
            alt={description}
          />
          {!active && <View style={styles.coverInactive} />}
        </View>
        <CoverIcon type={type} active={active} absolute />
        {hasContinuation && (
          <View style={styles.connectionLineWrapper}>
            <View style={styles.connectionLine} />
          </View>
        )}
      </View>
      <View style={styles.descriptionWrapper}>
        <Text
          style={[styles.description, !active && styles.descriptionInactive]}
          numberOfLines={1}
        >
          {description}
        </Text>
        <View style={styles.descriptionModifications}>
          {modifications.map((mod) => (
            <ModificationBadge
              key={mod}
              variation={active ? 'outline' : 'disabled'}
            >
              {mod}
            </ModificationBadge>
          ))}
        </View>
        <View style={styles.descriptionChildren}>{children}</View>
      </View>
    </View>
  )
}

export const Drill = forwardRef<TouchableOpacity, DrillProps>(
  function DrillComp(props, ref) {
    const styles = useAppStyles(themedStyles)
    const { interactive = false, onPress } = props

    if (!interactive) {
      return (
        <View style={styles.row}>
          <DrillInner {...props} />
        </View>
      )
    }

    return (
      <Button
        ref={ref}
        style={styles.row}
        onPress={onPress}
        activeOpacity={0.6}
        haptic="selection"
      >
        <DrillInner {...props} />
      </Button>
    )
  }
)

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
    overflow: 'hidden',
  },
  coverImage: {
    flex: 1,
  },
  coverInactive: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'backdrop',
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
    gap: 10,
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
  descriptionModifications: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: 7,
  },
  descriptionChildren: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
})
