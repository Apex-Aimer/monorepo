import { PropsWithChildren, useCallback } from 'react'
import { Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import * as Haptics from 'expo-haptics'

import { useThemeColors } from '../ThemeProvider'
import { useAppStyles } from '../useAppStyles'
import { PlanDecorations } from './PlanDecorations'
import { themedStyles } from './PaywallPlan.styles'

function PlanBadge({
  active,
  children,
}: { active: boolean } & PropsWithChildren) {
  const styles = useAppStyles(themedStyles)
  const theme = useThemeColors()

  const label = (
    <Text style={active ? styles.planBadgeLabelActive : styles.planBadgeLabel}>
      {children}
    </Text>
  )

  if (active) {
    return (
      <ExpoLinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={theme['paywall plan active badge gradient'] as string[]}
        style={[styles.planBadgeContainer, styles.planBadge]}
      >
        {label}
      </ExpoLinearGradient>
    )
  }

  return (
    <View style={styles.planBadgeContainer}>
      <View style={styles.planBadge}>{label}</View>
    </View>
  )
}

interface PlanProps extends PropsWithChildren {
  /**
   * Active is to choose which plan is chosen right now
   */
  active: boolean
  /**
   * Disabled is when an option can be chosen
   * i.e. couldn't fetch info
   */
  disabled?: boolean
  busy: boolean
  onChange(): void
  badge?: string
}

export function PaywallPlan({
  active,
  disabled,
  busy,
  badge,
  onChange,
  children,
}: PlanProps) {
  const styles = useAppStyles(themedStyles)
  const scale = useSharedValue(1)

  const onStartHaptic = useCallback(() => {
    Haptics.selectionAsync()
  }, [])

  const tapGesture = Gesture.Tap()
    .enabled(!active && !busy)
    .shouldCancelWhenOutside(true)
    .onBegin(() => {
      runOnJS(onStartHaptic)()
      scale.value = withSpring(0.98)
    })
    .onEnd(() => {
      runOnJS(onChange)()
    })
    .onFinalize(() => {
      scale.value = withSpring(1)
    })

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        style={[
          styles.plan,
          busy && styles.planBusy,
          { opacity: disabled ? 0.4 : 1 },
          style,
        ]}
      >
        <PlanDecorations active={active} />
        <View style={styles.planContent}>{children}</View>
        {badge && <PlanBadge active={active}>{badge}</PlanBadge>}
      </Animated.View>
    </GestureDetector>
  )
}
