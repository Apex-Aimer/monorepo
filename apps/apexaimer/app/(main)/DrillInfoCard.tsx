import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { CoverIcon } from '../components/Drill/CoverIcon'
import { useRecoilValue } from 'recoil'
import { routineDrill } from '../store'
import { LinearGradient } from 'expo-linear-gradient'
import { useThemeColors } from '../components/ThemeProvider'
import { Button } from '../components/Button'
import { ModificationBadge } from '../components/ModificationBadge'
import { forwardRef } from 'react'

interface Props {
  id: string
  onPress?(): void
}

export const DrillInfoCard = forwardRef<TouchableOpacity, Props>(
  function DrillInfoCardComp({ id, onPress }, ref) {
    const theme = useThemeColors()
    const styles = useAppStyles(themedStyles)
    const { type, description, modifications } = useRecoilValue(
      routineDrill(id)
    )

    return (
      <Button
        ref={ref}
        style={styles.drillInfo}
        onPress={onPress}
        haptic="selection"
      >
        <LinearGradient
          colors={theme['exercise card gradient'] as string[]}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 0, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.coverContainer}>
          <View style={styles.cover} />
          <CoverIcon type={type} size={40} active absolute />
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText} numberOfLines={2}>
            {description}
          </Text>
          <View style={styles.descriptionModifications}>
            {modifications.map((mod) => (
              <ModificationBadge key={mod}>{mod}</ModificationBadge>
            ))}
          </View>
        </View>
      </Button>
    )
  }
)

const themedStyles = AppStyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    paddingVertical: 15,
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
    borderRadius: 8,
  },
  description: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 15,
    gap: 10,
  },
  descriptionText: {
    color: 'text primary',
    fontFamily: 'rubik 700',
    fontSize: 14,
    textAlign: 'right',
  },
  drillInfo: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'bg',
    padding: 10,
  },
  descriptionModifications: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: 5,
  },
})
