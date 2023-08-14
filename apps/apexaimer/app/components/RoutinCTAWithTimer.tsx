import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AppStyleSheet, useAppStyles } from './useAppStyles'
import { colorWithOpacity, useThemeColors } from './ThemeProvider'
import { PRIMARY_BUTTON_HEIGHT } from './PrimaryButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props extends PropsWithChildren {
  duration: number
  onEnd?(): void
}
import AnimateableText from 'react-native-animateable-text'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import MaskedView from '@react-native-masked-view/masked-view'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

function Timer({ initialDuration }: { initialDuration: number }) {
  const duration = useSharedValue(initialDuration)

  const animatedText = useDerivedValue(() => {
    const minutes = ~~(duration.value / 60)
    const seconds = Math.floor(duration.value - minutes * 60)

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  })

  const animatedProps = useAnimatedProps(() => {
    return {
      text: animatedText.value,
    }
  })

  const styles = useAppStyles(themedStyles)

  useEffect(() => {
    duration.value = withTiming(0, {
      duration: initialDuration * 1000,
      easing: Easing.linear,
    })
  }, [duration, initialDuration])

  return <AnimateableText animatedProps={animatedProps} style={styles.label} />
}

const AnimatedMaskedView = Animated.createAnimatedComponent(MaskedView)
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

const WIDTH = 160

export function RoutinCTAWithTimer({ duration, onEnd }: Props) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()

  const position = useSharedValue(0)
  const scale = useSharedValue(1)

  const [active, setActive] = useState(true)

  const disable = useCallback(() => {
    setActive(false)
    onEnd()
  }, [onEnd])

  const tapGesture = Gesture.Tap()
    .enabled(active)
    .maxDuration(1000)
    .onBegin(() => {
      position.value = 0
      position.value = withTiming(WIDTH, { duration: 1000 }, (finished) => {
        if (!finished) {
          return
        }
        scale.value = withTiming(1.2, { duration: 100 }, () => {
          scale.value = withTiming(1, { duration: 100 }, () => {
            runOnJS(disable)()
          })
        })
      })
    })
    .onEnd(() => {
      if (position.value <= WIDTH) {
        position.value = withTiming(0, { duration: 50 })
      }
    })

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const overlayInnerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }))

  const overlayInnerTimerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -position.value + 1 }],
  }))

  return (
    <LinearGradient
      colors={[
        theme['bg'] as string,
        colorWithOpacity(theme['bg'] as string, 0),
      ]}
      locations={[0.6, 1]}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      style={[styles.wrapper, { paddingBottom: Math.max(bottom, 30) }]}
    >
      <View style={styles.inner}>
        <GestureDetector gesture={tapGesture}>
          <AnimatedLinearGradient
            colors={theme['primary gradient'] as string[]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.button, buttonStyle]}
          >
            {!active && <Text style={styles.label}>FINISHED</Text>}
            {active && <Timer initialDuration={duration} />}
            {active && (
              <View style={styles.overlay}>
                <Animated.View style={[styles.overlayInner, overlayInnerStyle]}>
                  <AnimatedMaskedView
                    maskElement={<Timer initialDuration={duration} />}
                    style={[styles.overlayInnerTimer, overlayInnerTimerStyle]}
                  >
                    <Timer initialDuration={duration} />
                    <LinearGradient
                      colors={theme['primary gradient'] as string[]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={[StyleSheet.absoluteFill, styles.button]}
                    />
                  </AnimatedMaskedView>
                </Animated.View>
              </View>
            )}
          </AnimatedLinearGradient>
        </GestureDetector>
      </View>
    </LinearGradient>
  )
}

const themedStyles = AppStyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 10,
    paddingTop: 60,
  },
  inner: {
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 15,
    minWidth: WIDTH,
    alignItems: 'center',
  },
  label: {
    fontFamily: 'rubik mono one',
    fontSize: 16,
    letterSpacing: 0.8,
    color: 'icon primary',
  },
  overlay: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    borderRadius: 13,
    overflow: 'hidden',
  },
  overlayInner: {
    backgroundColor: 'bg',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  overlayInnerTimer: {},
})

export const SCREEN_CTA_HEIGHT =
  themedStyles.light.wrapper.paddingTop + PRIMARY_BUTTON_HEIGHT
