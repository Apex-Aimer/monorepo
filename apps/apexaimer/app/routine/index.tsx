import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import Rive, { Fit, RiveRef } from 'rive-react-native'
import { Stack, router } from 'expo-router'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useEffect, useRef } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
  withDelay,
} from 'react-native-reanimated'

// @ts-ignore
import congrats from '../../assets/congrats.riv'
import { AppStyleSheet, useAppStyles } from '../../src/components/useAppStyles'

export default function RoutineScreen() {
  const styles = useAppStyles(themedStyles)

  const riveRef = useRef<RiveRef>(null)

  useEffect(() => {
    setTimeout(() => {
      riveRef.current?.play()
    }, 300)
  }, [])

  const { width, height } = useWindowDimensions()

  function getCenterDisplacement() {
    'worklet'

    const h = width / 2

    return (height - h) / 2
  }

  const bannerPlacement = useSharedValue(0)

  const bannerDisplacementStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            bannerPlacement.value,
            [0, 1],
            [getCenterDisplacement(), 0]
          ),
        },
        {
          scale: interpolate(bannerPlacement.value, [0, 1], [1, 0.8]),
        },
      ],
    }
  })

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.replace('/')
              }}
            >
              <XMarkIcon
                color={StyleSheet.flatten(styles.closeIcon).backgroundColor}
              />
            </TouchableOpacity>
          ),
          headerTransparent: true,
        }}
      />
      <View style={styles.bg}>
        <Animated.View style={[styles.bannerWrapper, bannerDisplacementStyles]}>
          <Rive
            ref={riveRef}
            url={Image.resolveAssetSource(congrats).uri}
            artboardName="banner"
            style={styles.banner}
            autoplay={false}
            fit={Fit.FitWidth}
            onPause={() => {
              bannerPlacement.value = withDelay(
                200,
                withTiming(1, {
                  duration: 500,
                })
              )
            }}
          />
        </Animated.View>
        <View style={styles.test}></View>
      </View>
    </>
  )
}

const themedStyles = AppStyleSheet.create({
  closeIcon: {
    backgroundColor: 'text primary',
  },
  bg: {
    backgroundColor: 'bg',
    flex: 1,
  },
  bannerWrapper: {
    backgroundColor: 'bg',
    zIndex: 100,
  },
  banner: {
    width: '100%',
    aspectRatio: 2,
  },
  test: {
    backgroundColor: 'red',
    height: 300,
  },
})
