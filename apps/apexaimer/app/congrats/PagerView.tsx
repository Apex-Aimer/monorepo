import { StyleSheet, View, useWindowDimensions } from 'react-native'
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { Children, PropsWithChildren, cloneElement } from 'react'
import { FadeInView } from '../components/FadeInView'

interface DotProps {
  index: number
  position: SharedValue<number>
}

function Dot({ index, position }: DotProps) {
  const styles = useAppStyles(themedStyles)

  const { backgroundColor: activeDotBackgroundColor } = StyleSheet.flatten(
    styles.activeDot
  )
  const { backgroundColor: inactiveDotBackgroundColor } = StyleSheet.flatten(
    styles.inactiveDot
  )

  const style = useAnimatedStyle(() => ({
    backgroundColor:
      position.value === index
        ? activeDotBackgroundColor
        : inactiveDotBackgroundColor,
  }))

  return <Animated.View style={[styles.dot, style]} />
}

interface Props extends PropsWithChildren {
  dotsDelay: number
}

export function PagerView({ children, dotsDelay }: Props) {
  const styles = useAppStyles(themedStyles)

  const { width } = useWindowDimensions()

  const position = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll(event) {
      position.value = ~~(event.contentOffset.x / width)
    },
  })

  return (
    <View style={styles.wrapper}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollEnd={scrollHandler}
      >
        {Children.map(children, (child) =>
          // @ts-ignore
          cloneElement(child, { style: [child.props.style, { width }] })
        )}
      </Animated.ScrollView>
      <FadeInView delay={dotsDelay} style={styles.dots}>
        {Children.toArray(children)
          .slice(0, 5)
          .map((_, index) => (
            <Dot key={index} index={index} position={position} />
          ))}
      </FadeInView>
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  wrapper: {
    flex: 1,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'line',
  },
  inactiveDot: {
    backgroundColor: 'line disabled',
  },
  activeDot: {
    backgroundColor: 'bg accent inverted',
  },
})
