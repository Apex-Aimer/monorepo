import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter'

const FadeInOutContext = createContext<{
  emitter: EventEmitter
  onMount(): void
  onFadeOut(): void
}>({
  emitter: null,
  onMount() {},
  onFadeOut() {},
})

interface OnboardingFadeInOutViewContainerProps extends PropsWithChildren {
  onChildrenFadedOut(): void
}

export function OnboardingFadeInOutViewContainer({
  onChildrenFadedOut,
  children,
}: OnboardingFadeInOutViewContainerProps) {
  const onChildrenFadedOutRef = useRef(onChildrenFadedOut)

  if (onChildrenFadedOut !== onChildrenFadedOutRef.current) {
    onChildrenFadedOutRef.current = onChildrenFadedOut
  }

  const emitter = useRef(new EventEmitter())

  const countRef = useRef(0)

  const onMount = useCallback(() => {
    countRef.current += 1
  }, [])

  const onFadeOut = useCallback(() => {
    countRef.current -= 1

    if (countRef.current === 0) {
      onChildrenFadedOutRef.current?.()
    }
  }, [])

  return (
    <FadeInOutContext.Provider
      value={{
        emitter: emitter.current,
        onMount,
        onFadeOut,
      }}
    >
      {children}
    </FadeInOutContext.Provider>
  )
}

export function useOnboardingFadeOut() {
  const { emitter } = useContext(FadeInOutContext)

  return useCallback(() => {
    emitter.emit('fadeOut')
  }, [emitter])
}

function useFadeOut(fadeProgress: SharedValue<number>, delay: number) {
  const { emitter, onMount, onFadeOut } = useContext(FadeInOutContext)

  useEffect(() => {
    onMount()
    const sub = emitter.addListener('fadeOut', () => {
      fadeProgress.value = withDelay(
        delay,
        withTiming(0, {}, () => {
          runOnJS(onFadeOut)()
        })
      )
    })

    return () => {
      sub.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

interface FadeInOutViewProps {
  delay?: number
  fadeInDelay?: number
  fadeOutDelay?: number
  onFadeIn?(): void
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
}

export function OnboardingFadeInOutView({
  delay = 0,
  fadeInDelay,
  fadeOutDelay,
  onFadeIn = () => {},
  style,
  children,
}: FadeInOutViewProps) {
  const fadeProgress = useSharedValue(0)

  useEffect(() => {
    fadeProgress.value = withDelay(
      fadeInDelay || delay,
      withTiming(1, {}, () => {
        runOnJS(onFadeIn)()
      })
    )
    // do not include onFadeIn since it breaks the flow
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fadeInDelay, delay, fadeProgress])

  useFadeOut(fadeProgress, fadeOutDelay || delay)

  const fadeInStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeProgress.value,
      transform: [
        {
          translateY: interpolate(fadeProgress.value, [0, 1], [10, 0]),
        },
      ],
    }
  })

  return <Animated.View style={[style, fadeInStyle]}>{children}</Animated.View>
}
