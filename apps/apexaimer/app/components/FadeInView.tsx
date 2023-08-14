import { useEffect } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

interface Props {
  delay?: number
  onAnimationEnd?(): void
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
}

export function FadeInView({
  delay = 0,
  onAnimationEnd = () => {},
  style,
  children,
}: Props) {
  const fadeInProgress = useSharedValue(0)

  useEffect(() => {
    fadeInProgress.value = withDelay(
      delay,
      withTiming(1, {}, () => {
        runOnJS(onAnimationEnd)()
      })
    )
    // do not include onAnimationEnd since it breaks the flow
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, fadeInProgress])

  const fadeInStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInProgress.value,
      transform: [
        {
          translateY: interpolate(fadeInProgress.value, [0, 1], [10, 0]),
        },
      ],
    }
  })

  return <Animated.View style={[style, fadeInStyle]}>{children}</Animated.View>
}
