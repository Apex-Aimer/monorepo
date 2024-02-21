import { useCallback, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { ArrowRightIcon } from 'react-native-heroicons/solid'
import Rive, { Fit, LoopMode, RiveRef } from 'rive-react-native'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { useThemeColors } from '../components/ThemeProvider'
import { OnboardingScreenCTA } from './components/OnboardingScreenCTA'
import { useOnboardingFadeOut } from './components/OnboardingFadeInOutView'
// @ts-ignore
import GeneratingPersonalizationAnimation from '../../assets/generatingpersonalization.riv'

interface LoaderProgressProps {
  onEnd(): void
}

function LoaderProgress({ onEnd }: LoaderProgressProps) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)

  const width = useSharedValue(0)

  useEffect(() => {
    Easing.ease
    width.value = withTiming(
      StyleSheet.flatten(styles.rail).width as number,
      {
        duration: 4000 + Math.round(Math.random() * 1000),
        easing: Easing.inOut(Easing.quad),
      },
      () => {
        runOnJS(onEnd)()
      }
    )
  }, [onEnd, styles, width])

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

export function PersonalizationScreen() {
  const styles = useAppStyles(themedStyles)
  const headerHeight = useHeaderHeight()
  const fadeOut = useOnboardingFadeOut()
  const [isLoaded, setLoaded] = useState(false)

  const onEnd = useCallback(() => {
    setLoaded(true)
  }, [])

  const riveRef = useRef<RiveRef>(null)

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <View style={styles.inner}>
        <View style={styles.loadingAnimation}>
          <Rive
            ref={riveRef}
            url={
              Image.resolveAssetSource(GeneratingPersonalizationAnimation).uri
            }
            artboardName="banner"
            style={styles.loadingAnimation}
            autoplay={true}
            onPause={() => {
              riveRef.current?.play()
            }}
            fit={Fit.Cover}
            // onPause={() => {
            //   bannerPlacement.value = withDelay(
            //     200,
            //     withTiming(
            //       1,
            //       {
            //         duration: 500,
            //       },
            //       () => {
            //         runOnJS(onEnd)()
            //       }
            //     )
            //   )
            // }}
          />
        </View>
        {isLoaded ? (
          <Text style={styles.description}>
            Difficulty level doesn’t represent your skill level,{'\n'}it should
            challenge you enough to stimulate improvement.{'\n'}You can adjust
            it later.
          </Text>
        ) : (
          <View style={styles.loadingContainer}>
            <LoaderProgress onEnd={onEnd} />
            <Text style={styles.description}>
              We’re identifying a difficulty level for you...
            </Text>
          </View>
        )}
      </View>
      {isLoaded && (
        <OnboardingScreenCTA onPress={fadeOut}>
          <ArrowRightIcon
            size={20}
            color={StyleSheet.flatten(styles.ctaIcon).backgroundColor}
          />
        </OnboardingScreenCTA>
      )}
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'bg',
  },
  inner: {
    flex: 1,
    paddingVertical: 36,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  rail: {
    width: 220,
    height: 6,
    borderRadius: 3,
  },
  bar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'bg inverted',
  },
  loadingContainer: {
    minHeight: 24 * 3,
    gap: 6,
  },
  description: {
    fontFamily: 'rubik 400',
    fontSize: 11,
    lineHeight: 24,
    color: 'text primary',
    textAlign: 'center',
  },
  ctaIcon: {
    backgroundColor: 'icon primary',
  },
  loadingAnimation: {
    width: '100%',
    aspectRatio: 2,
  },
})
