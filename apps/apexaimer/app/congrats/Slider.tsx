import { View } from 'react-native'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

export function Slider() {
  const styles = useAppStyles(themedStyles)

  const width = useSharedValue(0)
  const disposition = useSharedValue(0)

  const snapInterval = useDerivedValue(() => width.value / 4, [width])

  const dispositionStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: disposition.value - 7,
      },
    ],
  }))

  const panGesture = Gesture.Pan().onUpdate((evt) => {
    if (snapInterval.value === 0) {
      return
    }

    const snapPoint = Math.round(evt.x / snapInterval.value)
    disposition.value = snapPoint * snapInterval.value
  })

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <View
          style={styles.trunkWrapper}
          onLayout={({
            nativeEvent: {
              layout: { width: w },
            },
          }) => {
            width.value = w - 6
          }}
        >
          <View style={styles.trunk} />
          <View style={[styles.dot, styles.dot1]}>
            <View style={[styles.dotInner, styles.dotInner1]} />
          </View>
          <View style={[styles.dot, styles.dot2]}>
            <View style={[styles.dotInner, styles.dotInner1]} />
          </View>
          <View style={[styles.dot, styles.dot3]}>
            <View style={[styles.dotInner, styles.dotInner1]} />
          </View>
          <View style={[styles.dot, styles.dot4]}>
            <View style={[styles.dotInner, styles.dotInner1]} />
          </View>
          <View style={[styles.dot, styles.dot5]}>
            <View style={[styles.dotInner, styles.dotInner1]} />
          </View>
          <Animated.View style={[styles.mainDot, dispositionStyle]}>
            <View style={styles.mainDotInner} />
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 6,
  },
  trunkWrapper: {
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  trunk: {
    width: '100%',
    height: 6,
    backgroundColor: 'line',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'line',
    position: 'absolute',
    top: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dot1: {
    left: 0,
  },
  dotInner1: {
    backgroundColor: 'accent primary',
  },
  dot2: {
    left: '25%',
  },
  dot3: {
    left: '50%',
  },
  dot4: {
    left: '75%',
  },
  dot5: {
    left: '100%',
  },
  mainDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'line',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainDotInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'accent primary',
  },
})
