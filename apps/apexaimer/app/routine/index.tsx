import { Suspense, memo, useEffect, useRef, useState } from 'react'
import { Stack, router } from 'expo-router'
import {
  FlatList,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native'
import { useRecoilValue } from 'recoil'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ArrowUturnDownIcon } from 'react-native-heroicons/outline'
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Tts from 'react-native-tts'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from 'react-native-heroicons/solid'
import noop from 'lodash/noop'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { headerLeft } from '../components/HeaderBackButton'
import { routineDrill, routineOfTheDayRunData } from '../store'
import { InstructionVideo } from '../components/InstructionVideo'
import { Drill } from '../components/Drill/Drill'
import { SCREEN_CTA_HEIGHT } from '../components/ScreenCTA'
import { AnimatedCircleGradientProgressBar } from '../components/CircleGradientProgressBar'
import { RoutinCTAWithTimer } from '../components/RoutinCTAWithTimer'
import { FadeInView } from '../components/FadeInView'
import { drillsVoiceOverTable } from '../routines/routines'
import { iapHasPremium } from '../createIapStore'
import { RoutineAd } from './ad'

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

  return (
    <AnimatedCircleGradientProgressBar
      step={step}
      steps={duration}
      size={23}
      borderWidth={2}
    />
  )
})

function DrillInstructionVideo({ id }: { id: string }) {
  const activeDrill = useRecoilValue(routineDrill(id))

  return (
    <InstructionVideo
      thumbnail={activeDrill.thumbnail}
      uri={activeDrill.videoUri}
    />
  )
}

Tts.setDefaultLanguage('en-US')
Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact')
Tts.setDefaultRate(0.53)
// @ts-ignore
Tts.setIgnoreSilentSwitch('ignore')
Tts.setDucking(true)
Tts.addEventListener('tts-start', noop)
Tts.addEventListener('tts-progress', noop)
Tts.addEventListener('tts-finish', noop)
Tts.addEventListener('tts-cancel', noop)

function useDrillVoiceOver(id: string, hasVoiceOver: boolean) {
  useEffect(() => {
    if (!hasVoiceOver) {
      return
    }

    const voiceOverContent = drillsVoiceOverTable[id]

    Tts.getInitStatus().then(() => {
      Tts.speak(voiceOverContent)
    })

    return () => {
      Tts.stop()
    }
  }, [id, hasVoiceOver])
}

const RoutineList = memo(function RoutineListComp({
  activeDrillIndex,
  setActiveDrillIndex,
}: {
  activeDrillIndex: number
  setActiveDrillIndex: (i: number) => void
}) {
  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()

  const { routine } = useRecoilValue(routineOfTheDayRunData)

  const listRef = useRef<FlatList<(typeof routine.data)[number]>>(null)

  return (
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
        const hasContinuation = index !== routine.data.length - 1
        return (
          <FadeInView delay={index * 200}>
            <Drill
              id={item.drillKey}
              hasContinuation={hasContinuation}
              active={active}
            >
              {active && (
                <DrillTimer
                  id={item.drillKey}
                  onEnd={() => {
                    if (!hasContinuation) {
                      return
                    }

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
      keyExtractor={(item, index) => `${item.drillKey}:${index}`}
      contentContainerStyle={{ paddingBottom: bottom + SCREEN_CTA_HEIGHT }}
    />
  )
})

function Routine({ hasVoiceOver }: { hasVoiceOver: boolean }) {
  const styles = useAppStyles(themedStyles)
  const { routine, duration } = useRecoilValue(routineOfTheDayRunData)

  const [activeDrillIndex, setActiveDrillIndex] = useState(0)

  const id = routine.data[activeDrillIndex].drillKey

  useDrillVoiceOver(id, hasVoiceOver)

  return (
    <>
      <View style={styles.wrapper}>
        {/* TODO: loading fallback */}
        <Suspense fallback={null}>
          <DrillInstructionVideo id={id} />
        </Suspense>
        <RoutineList
          activeDrillIndex={activeDrillIndex}
          setActiveDrillIndex={setActiveDrillIndex}
        />
      </View>
      <RoutinCTAWithTimer
        duration={duration}
        onPress={() => {
          router.replace('/congrats/')
        }}
      />
    </>
  )
}

export default function RoutineScreen() {
  const styles = useAppStyles(themedStyles)
  const [hasVoiceOver, setHasVoiceOver] = useState(false)

  const hasPremium = useRecoilValue(iapHasPremium)
  const [showAd, setShowAd] = useState(!hasPremium)

  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          title: null,
          headerLeft,
          headerRight: () => {
            if (hasVoiceOver) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setHasVoiceOver(false)
                  }}
                >
                  <SpeakerWaveIcon
                    color={
                      StyleSheet.flatten(styles.voiceOverActive).backgroundColor
                    }
                  />
                </TouchableOpacity>
              )
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  setHasVoiceOver(true)
                }}
              >
                <SpeakerXMarkIcon
                  color={
                    StyleSheet.flatten(styles.voiceOverInactive).backgroundColor
                  }
                />
              </TouchableOpacity>
            )
          },
          headerTransparent: true,
          contentStyle: styles.bg,
          headerTintColor: styles.tint.backgroundColor as string,
        }}
      />
      {!showAd && (
        <Suspense fallback={null}>
          <Routine hasVoiceOver={hasVoiceOver} />
        </Suspense>
      )}
      {showAd && (
        <RoutineAd
          onShown={() => {
            setShowAd(false)
          }}
        />
      )}
    </>
  )
}

const themedStyles = AppStyleSheet.create({
  bg: {
    backgroundColor: 'bg',
  },
  tint: {
    backgroundColor: 'icon primary',
  },
  voiceOverActive: {
    backgroundColor: 'icon primary',
  },
  voiceOverInactive: {
    backgroundColor: 'line',
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
