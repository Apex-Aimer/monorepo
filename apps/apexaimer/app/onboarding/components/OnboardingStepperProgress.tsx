import { StyleSheet, View, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { useThemeColors } from '../../components/ThemeProvider'
import { useEffect } from 'react'

interface OnboardingStepperProgressProps {
  step: number
  steps: number
}

function getStepperWidth(
  step: number,
  steps: number,
  styles: { rail: ViewStyle }
) {
  const initial = 0.1
  const progress = initial + (1 - initial) * (step / steps)

  const fullWidth = StyleSheet.flatten(styles.rail).width as number

  return progress * fullWidth
}

export function OnboardingStepperProgress({
  step,
  steps,
}: OnboardingStepperProgressProps) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)

  const width = useSharedValue(getStepperWidth(step, steps, styles))

  useEffect(() => {
    width.value = withSpring(getStepperWidth(step, steps, styles))
  }, [step, steps, styles, width])

  const barStyle = useAnimatedStyle(() => ({
    width: width.value,
  }))

  return (
    <LinearGradient
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      colors={theme['onboarding progress rail gradient'] as string[]}
      style={styles.rail}
    >
      <Animated.View style={[styles.bar, barStyle]} />
    </LinearGradient>
  )
}

const themedStyles = AppStyleSheet.create({
  rail: {
    width: 200,
    height: 6,
    borderRadius: 3,
  },
  bar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'bg inverted',
  },
})
