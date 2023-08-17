import { ReactElement, useCallback, useEffect } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  I18nManager,
  LayoutChangeEvent,
} from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { Dots } from './Carousel/Dots'
import { normalizeScrollX } from './Carousel/RtlConverter'
import { usePositions } from './Carousel/usePositions'
import { Button } from '../components/Button'

interface Props<T> {
  data: T[]
  renderItem(item: T, index: number): ReactElement
  keyExtractor(item: T, index: number): string
  onMorePress?(): void
}

const ITEM_WIDTH = 250
const ITEMS_GAP = 10

export function Carousel<T extends unknown>({
  data,
  renderItem,
  keyExtractor,
  onMorePress,
}: Props<T>) {
  const styles = useAppStyles(themedStyles)

  const scrollViewWidthShared = useSharedValue(0)
  const scrollViewContentWidthShared = useSharedValue(0)

  const currentGravityPosition = useSharedValue(0)
  const currentProgress = useSharedValue(0)

  const isRtlShared = useSharedValue(I18nManager.getConstants().isRTL)

  const onScrollViewLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const {
        nativeEvent: {
          layout: { width },
        },
      } = event

      scrollViewWidthShared.value = width
    },
    [scrollViewWidthShared]
  )

  const onScrollViewSizeChange = useCallback(
    (w: number) => {
      scrollViewContentWidthShared.value = w
    },
    [scrollViewContentWidthShared]
  )

  const { calculateCurrentPosition, onItemLayout } = usePositions(
    data.length,
    scrollViewContentWidthShared,
    scrollViewWidthShared,
    isRtlShared
  )

  useEffect(() => {
    data.forEach((_, index) => {
      onItemLayout(index, index * (ITEM_WIDTH + ITEMS_GAP))
    })
  }, [data, onItemLayout])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll(evt) {
      /**
       * We invert x-coordinate for RTL mode to simplify calculations
       */
      const x = normalizeScrollX(
        evt.contentOffset.x,
        // isRtlShared.value,
        false,
        scrollViewWidthShared.value,
        scrollViewContentWidthShared.value
      )

      const { gravityPosition, progress } = calculateCurrentPosition(
        x,
        currentGravityPosition.value
      )
      currentGravityPosition.value = gravityPosition
      currentProgress.value = progress
    },
  })

  return (
    <View>
      <Animated.FlatList
        horizontal
        pagingEnabled
        data={data}
        snapToInterval={ITEM_WIDTH + ITEMS_GAP}
        snapToAlignment="start"
        decelerationRate="fast"
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.itemWrapper}>{renderItem(item, index)}</View>
          )
        }}
        keyExtractor={keyExtractor}
        onScrollEndDrag={scrollHandler}
        onLayout={onScrollViewLayout}
        onContentSizeChange={onScrollViewSizeChange}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <View style={styles.dotsWrapper}>
        <View style={styles.dotsRow}>
          <Dots
            currentProgress={currentProgress}
            currentGravityPosition={currentGravityPosition}
          />
        </View>
        <Button
          style={styles.moreAction}
          onPress={onMorePress}
          haptic="selection"
        >
          <Text style={styles.moreActionText}>See all {'>'}</Text>
        </Button>
      </View>
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 5,
  },
  itemWrapper: {
    width: ITEM_WIDTH,
    aspectRatio: 2,
    marginLeft: ITEMS_GAP,
    borderRadius: 15,
    overflow: 'hidden',
  },
  moreAction: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  moreActionText: {
    color: 'text primary',
    fontFamily: 'rubik 600',
    fontSize: 13,
  },
  dotsWrapper: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  dotsRow: {
    paddingLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
})
