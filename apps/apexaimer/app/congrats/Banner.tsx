import { useEffect, useRef } from 'react'
import { Image, useWindowDimensions } from 'react-native'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import Rive, { Fit, RiveRef } from 'rive-react-native'

// @ts-ignore
import congrats from '../../assets/congrats.riv'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'

interface Props {
  onEnd(): void
}

export function Banner({ onEnd }: Props) {
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

  const styles = useAppStyles(themedStyles)

  return (
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
            withTiming(
              1,
              {
                duration: 500,
              },
              () => {
                runOnJS(onEnd)()
              }
            )
          )
        }}
      />
    </Animated.View>
  )
}

const themedStyles = AppStyleSheet.create({
  bannerWrapper: {
    backgroundColor: 'bg',
    zIndex: 100,
  },
  banner: {
    width: '100%',
    aspectRatio: 2,
  },
})
