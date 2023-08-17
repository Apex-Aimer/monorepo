import { Text, View } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useCallback } from 'react'
import * as Haptics from 'expo-haptics'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'

interface Props {
  initialIndex?: number
}

export function Slider({ initialIndex = 0 }: Props) {
  const styles = useAppStyles(themedStyles)

  const width = useSharedValue(0)
  const disposition = useSharedValue(0)

  const onChangeHaptic = useCallback(() => {
    Haptics.selectionAsync()
  }, [])

  useAnimatedReaction(
    () => disposition.value,
    (cur, prev) => {
      if (cur !== prev) {
        runOnJS(onChangeHaptic)()
      }
    }
  )

  const snapInterval = useDerivedValue(() => width.value / 4, [width])

  const dispositionStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: disposition.value - 7,
      },
    ],
  }))

  const calculateDisposition = useCallback(
    (x: number) => {
      'worklet'

      if (snapInterval.value === 0) {
        return
      }

      const snapPoint = Math.round(x / snapInterval.value)
      disposition.value = snapPoint * snapInterval.value
    },
    [disposition, snapInterval.value]
  )

  const panGesture = Gesture.Pan().onUpdate((evt) => {
    calculateDisposition(evt.x)
  })

  const tapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onStart((evt) => {
      calculateDisposition(evt.x)
    })

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={styles.label}>Too hard</Text>
        <Text style={styles.label}>Perfect</Text>
        <Text style={styles.label}>Too easy</Text>
      </View>
      <GestureDetector gesture={Gesture.Simultaneous(panGesture, tapGesture)}>
        <View
          style={styles.trunkWrapper}
          onLayout={({
            nativeEvent: {
              layout: { width: w },
            },
          }) => {
            const shouldCalculateInitial = width.value === 0
            width.value = w - 6

            if (!shouldCalculateInitial) {
              return
            }

            setTimeout(() => {
              calculateDisposition(initialIndex * 0.25 * width.value)
            }, 50)
          }}
        >
          <View style={styles.trunk} />
          <View style={[styles.dot, styles.dot1]}>
            <View style={[styles.dotInner, styles.dotInner1]} />
          </View>
          <View style={[styles.dot, styles.dot2]}>
            <View style={[styles.dotInner, styles.dotInner2]} />
          </View>
          <View style={[styles.dot, styles.dot3]}>
            <View style={[styles.dotInner, styles.dotInner3]} />
          </View>
          <View style={[styles.dot, styles.dot4]}>
            <View style={[styles.dotInner, styles.dotInner4]} />
          </View>
          <View style={[styles.dot, styles.dot5]}>
            <View style={[styles.dotInner, styles.dotInner5]} />
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
    backgroundColor: 'bg accent',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'bg accent',
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
    backgroundColor: '#FFA5A9',
  },
  dot2: {
    left: '25%',
  },
  dotInner2: {
    backgroundColor: '#F2B7A7',
  },
  dot3: {
    left: '50%',
  },
  dotInner3: {
    backgroundColor: '#E6C9A5',
  },
  dot4: {
    left: '75%',
  },
  dotInner4: {
    backgroundColor: '#DADAA2',
  },
  dot5: {
    left: '100%',
  },
  dotInner5: {
    backgroundColor: '#CDEDA0',
  },
  mainDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'bg accent',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  mainDotInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'accent primary',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  label: {
    fontFamily: 'rubik 500',
    fontSize: 16,
    color: 'text primary',
  },
})
