import {
  Suspense,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { Stack, router } from 'expo-router'
import { FlatList, StyleSheet, TextStyle, View } from 'react-native'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { headerLeft } from '../components/HeaderBackButton'
import {
  routineDrill,
  routineOfTheDay,
  routineOfTheDayDuration,
} from '../store'
import { InstructionVideo } from '../components/InstructionVideo'
import { Drill } from '../components/Drill/Drill'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SCREEN_CTA_HEIGHT, ScreenCTA } from '../components/ScreenCTA'
import { StatusBar } from 'expo-status-bar'
import { ArrowUturnDownIcon } from 'react-native-heroicons/outline'
import { AnimatedCircleGradientProgressBar } from '../components/CircleGradientProgressBar'
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { RoutinCTAWithTimer } from '../components/RoutinCTAWithTimer'
import { FadeInView } from '../components/FadeInView'

const DrillTimer = memo(function DrillTimerComp({
  id,
  onEnd,
}: {
  id: string
  onEnd(): void
}) {
  const { duration } = useRecoilValue(routineDrill(id))
  const step = useSharedValue(0)

  useEffect(() => {
    step.value = withTiming(
      duration,
      {
        duration: duration * 1000,
        easing: Easing.linear,
      },
      () => {
        runOnJS(onEnd)()
      }
    )
  }, [duration, onEnd, step])

  return <AnimatedCircleGradientProgressBar step={step} steps={duration} />
})

function Routine() {
  const styles = useAppStyles(themedStyles)
  const routine = useRecoilValue(routineOfTheDay)
  const duration = useRecoilValue(routineOfTheDayDuration)

  const [activeDrillIndex, setActiveDrillIndex] = useState(0)
  const activeDrill = useRecoilValue(
    routineDrill(routine.data[activeDrillIndex])
  )

  const { bottom } = useSafeAreaInsets()

  const listRef = useRef<FlatList>(null)

  return (
    <>
      <View style={styles.wrapper}>
        <InstructionVideo uri={activeDrill.videoUri} />
        <FlatList
          ref={listRef}
          ListHeaderComponent={
            <View style={styles.durationWrapper}>
              <View style={styles.routineStartArrow}>
                <ArrowUturnDownIcon
                  size={24}
                  color={
                    (StyleSheet.flatten(styles.durationText) as TextStyle).color
                  }
                />
              </View>
            </View>
          }
          data={routine.data}
          renderItem={({ item, index }) => {
            const active = index === activeDrillIndex
            return (
              <FadeInView delay={index * 200}>
                <Drill
                  id={item}
                  hasContinuation={index !== routine.data.length - 1}
                  active={active}
                >
                  {active && (
                    <DrillTimer
                      id={item}
                      onEnd={() => {
                        listRef.current?.scrollToIndex({
                          index: activeDrillIndex,
                          animated: true,
                        })
                        setActiveDrillIndex(activeDrillIndex + 1)
                      }}
                    />
                  )}
                </Drill>
              </FadeInView>
            )
          }}
          // TODO: on real content there won't be a need for index
          keyExtractor={(item, index) => `${item}:${index}`}
          contentContainerStyle={{ paddingBottom: bottom + SCREEN_CTA_HEIGHT }}
        />
      </View>
      <RoutinCTAWithTimer
        duration={duration}
        onEnd={() => {
          router.replace('/congrats/')
        }}
      />
    </>
  )
}

export default function RoutineScreen() {
  const styles = useAppStyles(themedStyles)

  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          title: null,
          headerLeft,
          headerTransparent: true,
          contentStyle: styles.bg,
        }}
      />
      <Suspense fallback={null}>
        <Routine />
      </Suspense>
    </>
  )
}

const themedStyles = AppStyleSheet.create({
  bg: {
    backgroundColor: 'bg',
  },
  wrapper: {
    flex: 1,
  },
  durationWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  routineStartArrow: {
    position: 'absolute',
    left: 30,
    bottom: -16,
    transform: [
      {
        rotateY: '180deg',
      },
    ],
  },
  durationText: {
    color: 'line',
  },
})
