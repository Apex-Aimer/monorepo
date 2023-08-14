import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { CoverIcon } from '../components/Drill/CoverIcon'
import { useRecoilValue } from 'recoil'
import { routineDrill } from '../store'
import { LinearGradient } from 'expo-linear-gradient'
import { useThemeColors } from '../components/ThemeProvider'
import { PrimaryGradientText } from '../components/PrimaryGradientText'

interface Props {
  id: string
  onPress?(): void
}

export function DrillInfoCard({ id, onPress }: Props) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)
  const { type, description } = useRecoilValue(routineDrill(id))

  return (
    <TouchableOpacity style={styles.drillInfo} onPress={onPress}>
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
        <Text style={styles.descriptionText} numberOfLines={3}>
          {description}
        </Text>
        <View style={styles.descriptionCta}>
          <PrimaryGradientText style={styles.descriptionCtaText}>
            Details {'>'}
          </PrimaryGradientText>
        </View>
      </View>
    </TouchableOpacity>
  )
}

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
  },
  descriptionText: {
    color: 'text primary',
    fontFamily: 'rubik 700',
    fontSize: 14,
    textAlign: 'right',
  },
  drillInfo: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    backgroundColor: 'bg',
    padding: 10,
  },
  descriptionCta: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  descriptionCtaText: {
    fontFamily: 'rubik 700',
    fontSize: 14,
  },
})
