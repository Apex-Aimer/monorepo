import { memo, useMemo, useRef } from 'react'
import { I18nManager, StyleSheet, View } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'

const DOTS_COUNT = 3
const DOT_SIZE = 9

function rotateDots(slots: number[], activeIndex: number, direction: number) {
  'worklet'

  const tempDots = [...slots]
  let index = activeIndex

  if (direction < 0) {
    index -= 1
    if (index < 1) {
      index = 1
      const last = tempDots.pop()
      tempDots.unshift(last as number)
    }
  } else {
    index += direction
    if (index > tempDots.length - 2) {
      index = tempDots.length - 2
      const first = tempDots.shift()
      tempDots.push(first as number)
    }
  }

  return {
    slots: tempDots,
    activeIndex: index,
  }
}

type DotsContext = {
  slots: number[]
  activeIndex: number
}

function Dot({
  id,
  activeDotId,
  dotProgress,
  dotsContext,
  initialPlacement,
  dotsTranslations,
}: {
  id: number
  activeDotId: SharedValue<number>
  dotProgress: SharedValue<number>
  dotsContext: SharedValue<DotsContext>
  initialPlacement: SharedValue<number[]>
  dotsTranslations: SharedValue<number[]>
}) {
  const styles = useAppStyles(themedStyles)

  const { backgroundColor: activeColor } = StyleSheet.flatten(styles.dotActive)
  const { backgroundColor: nonActiveColor } = StyleSheet.flatten(
    styles.dotInactive
  )

  const wrapperStyle = useAnimatedStyle(() => {
    const placement = dotsContext.value.slots.findIndex((it) => it === id) + 1

    return {
      transform: [
        {
          translateX: interpolate(
            placement - dotProgress.value,
            initialPlacement.value,
            dotsTranslations.value,
            Extrapolate.CLAMP
          ),
        },
      ],
    }
  })
  const dotStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: activeDotId.value === id ? activeColor : nonActiveColor,
    }
  })

  const dotWrapperOffset = useMemo(() => {
    return I18nManager.getConstants().isRTL
      ? styles.dotWrapperOffsetRTL
      : styles.dotWrapperOffset
  }, [styles.dotWrapperOffset, styles.dotWrapperOffsetRTL])

  return (
    <Animated.View style={[styles.dotWrapper, dotWrapperOffset, wrapperStyle]}>
      <Animated.View style={[styles.dot, dotStyle]} />
    </Animated.View>
  )
}

function useInitialPlacement() {
  const tPlacement = useRef<number[]>()
  const tTranslations = useRef<number[]>()
  const tScale = useRef<number[]>()

  // Since it's static use refs
  // to not create array on re-renders
  if (
    tPlacement.current == null ||
    tTranslations.current == null ||
    tScale.current == null
  ) {
    // We use two additional dots for sliding animation
    tPlacement.current = new Array(DOTS_COUNT + 2)
      .fill(null)
      .map((_, i) => i + 1)
    // the first item going to be 1
    // and we want the first dot to be hidden to the left
    // (as it's for animation)
    tTranslations.current = tPlacement.current.map(
      (it) => (it - 2) * 2 * DOT_SIZE
    )
    if (I18nManager.getConstants().isRTL) {
      tTranslations.current = tTranslations.current.reverse()
    }
    tScale.current = tPlacement.current.map((it) => {
      if (it === 2 || it === tPlacement.current.length - 1) {
        return 0.6
      }
      return 1
    })
  }

  return {
    initialPlacement: useSharedValue(tPlacement.current),
    dotsTranslations: useSharedValue(tTranslations.current),
  }
}

export const Dots = memo(function Dots({
  currentGravityPosition,
  currentProgress,
}: {
  currentGravityPosition: SharedValue<number>
  currentProgress: SharedValue<number>
}) {
  const styles = useAppStyles(themedStyles)

  const { initialPlacement, dotsTranslations } = useInitialPlacement()
  const rightEdgeDotIndex = useDerivedValue(() => {
    // 1 is for last index (array.length - 1)
    // and 1 more to get the item before last
    return initialPlacement.value.length - 2
  })
  const dotsContext = useSharedValue({
    slots: initialPlacement.value,
    activeIndex: 1,
  })
  const dotProgress = useDerivedValue(() => {
    let progress = 0

    // left edge index is always 1
    if (dotsContext.value.activeIndex === 1 && currentProgress.value < 0) {
      progress = currentProgress.value
    }
    if (
      dotsContext.value.activeIndex === rightEdgeDotIndex.value &&
      currentProgress.value > 0
    ) {
      progress = currentProgress.value
    }

    return progress
  })

  useAnimatedReaction(
    () => currentGravityPosition.value,
    (cur, prev) => {
      if (cur === prev || prev == null) {
        return
      }
      const direction = cur - prev
      const newDotsContext = rotateDots(
        dotsContext.value.slots,
        dotsContext.value.activeIndex,
        direction
      )
      dotsContext.value = newDotsContext
    }
  )

  const activeDotId = useDerivedValue(() => {
    return dotsContext.value.slots[dotsContext.value.activeIndex]
  })

  return (
    <View style={styles.container}>
      {initialPlacement.value.map((it) => (
        <Dot
          key={it}
          id={it}
          activeDotId={activeDotId}
          dotProgress={dotProgress}
          dotsContext={dotsContext}
          initialPlacement={initialPlacement}
          dotsTranslations={dotsTranslations}
        />
      ))}
    </View>
  )
})

const themedStyles = AppStyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'row',
    width:
      2 * DOT_SIZE * DOTS_COUNT +
      // 2 because it's from both left and right side
      0 * 2,
    height: DOT_SIZE,
  },
  dotWrapper: {
    width: 2 * DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  dotWrapperOffset: {
    left: 0,
  },
  dotWrapperOffsetRTL: {
    right: 0,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  dotActive: {
    backgroundColor: 'bg accent inverted',
  },
  dotInactive: {
    backgroundColor: 'line disabled',
  },
})
