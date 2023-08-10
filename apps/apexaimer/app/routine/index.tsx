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
import { Stack } from 'expo-router'
import { FlatList, StyleSheet, TextStyle, View } from 'react-native'
import { useRecoilValue } from 'recoil'
import { headerLeft } from '../components/HeaderBackButton'
import { routineDrill, routineOfTheDay } from '../store'
import { InstructionVideo } from '../components/InstructionVideo'
import { Drill } from '../components/Drill/Drill'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SCREEN_CTA_HEIGHT, ScreenCTA } from '../components/ScreenCTA'
import { StatusBar } from 'expo-status-bar'
import { ArrowUturnDownIcon } from 'react-native-heroicons/outline'
import CircleGradientProgressBar from '../components/CircleGradientProgressBar'

const DrillTimer = memo(function DrillTimerComp({
  id,
  onEnd,
}: {
  id: string
  onEnd(): void
}) {
  const { duration } = useRecoilValue(routineDrill(id))

  const [step, setStep] = useState(0)
  const stepRef = useRef(0)

  const increment = useCallback(() => {
    setStep(stepRef.current + 1)
    stepRef.current += 1

    if (stepRef.current < duration) {
      return true
    }

    return false
  }, [duration])

  useEffect(() => {
    let then = Date.now()
    function timer() {
      setTimeout(() => {
        const diff = Date.now() - then
        if (diff < 1000) {
          timer()
          return
        }
        then = then + 1000

        if (!increment()) {
          return
        }

        timer()
      }, 100)
    }
    timer()
  }, [increment])

  return <CircleGradientProgressBar step={step} steps={duration} />
})

function Routine() {
  const styles = useAppStyles(themedStyles)
  const routine = useRecoilValue(routineOfTheDay)

  const [activeDrillIndex, setActiveDrillIndex] = useState(0)
  const activeDrill = useRecoilValue(
    routineDrill(routine.data[activeDrillIndex])
  )

  const { bottom } = useSafeAreaInsets()

  return (
    <View style={styles.wrapper}>
      <InstructionVideo uri={activeDrill.videoUri} />
      <FlatList
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
            <Drill
              id={item}
              hasContinuation={index !== routine.data.length - 1}
              active={active}
            >
              {active && (
                <DrillTimer
                  id={item}
                  onEnd={() => {
                    setActiveDrillIndex(activeDrillIndex + 1)
                  }}
                />
              )}
            </Drill>
          )
        }}
        // TODO: on real content there won't be a need for index
        keyExtractor={(item, index) => `${item}:${index}`}
        contentContainerStyle={{ paddingBottom: bottom + SCREEN_CTA_HEIGHT }}
      />
    </View>
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
      <ScreenCTA>FINISH</ScreenCTA>
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
