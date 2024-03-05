import { Suspense, useEffect, useRef } from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native'
import { Link, SplashScreen, Stack, router, useRouter } from 'expo-router'
import { ArrowUturnDownIcon } from 'react-native-heroicons/outline'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Settings as FBSDKSettings } from 'react-native-fbsdk-next'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as Haptics from 'expo-haptics'
import { IronSource, InitializationEvents } from 'ironsource-mediation'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { Drill } from '../components/Drill/Drill'
import { SCREEN_CTA_HEIGHT, ScreenCTA } from '../components/ScreenCTA'
import {
  isRoutineOfTheDayCompleted,
  level as levelAtom,
  routineIntensityLevel,
  routineOfTheDay,
  useUserName,
} from '../store'
import { PrimaryGradientText } from '../components/PrimaryGradientText'
import { FadeInView } from '../components/FadeInView'
import { Carousel } from './Carousel'
import { DrillInfoCard } from './DrillInfoCard'
import { useAppColorScheme } from '../components/ThemeProvider'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { DurationLevels } from '../routines/types'
import { DifficultyLevelIcon } from '../components/DifficultyLevelIcon'
import { OnboardingScreens, currentOnboardingScreen } from '../onboarding/store'
import { iapHasPremium } from '../createIapStore'

async function preloadAd() {
  try {
    /**
     * Load the first ad
     */
    await IronSource.loadInterstitial()
  } catch {
    // no-op
  }
}

function Routine() {
  const [intensityLevel, setIntensityLevel] = useRecoilState(
    routineIntensityLevel
  )
  const routine = useRecoilValue(routineOfTheDay)
  const isRoutineCompleted = useRecoilValue(isRoutineOfTheDayCompleted)
  const hasPremium = useRef(useRecoilValue(iapHasPremium)).current

  useEffect(() => {
    preloadAd()
  }, [hasPremium])

  const appColorScheme = useAppColorScheme()
  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()

  if (isRoutineCompleted) {
    return (
      <ScrollView>
        <View style={styles.completedRoutineTitleContainer}>
          <Text style={styles.completedRoutineTitle}>
            You’re all set for today!
          </Text>
        </View>
        <View style={styles.completedRoutineCaptionContainer}>
          <Text style={styles.completedRoutineCaption}>
            It’s time to jump into the game and have some fun. There’s no better
            way to improve rather than play the game.
          </Text>
        </View>
        <View style={styles.lastCompletedRoutineSectionTitleContainer}>
          <Text style={styles.lastCompletedRoutineSectionTitle}>
            Drills from the last warm-up
          </Text>
        </View>
        <Carousel
          data={routine.data}
          renderItem={(item) => (
            <Link href={`/instructions/${item.drillKey}/`} asChild>
              <DrillInfoCard id={item.drillKey} />
            </Link>
          )}
          // TODO: on real content there won't be a need for index
          keyExtractor={(item, index) => `${item.drillKey}:${index}`}
          onMorePress={() => {
            // TODO
            router.push(`/routine-details/`)
          }}
        />
      </ScrollView>
    )
  }

  const intensitySelectedControlData = {
    [DurationLevels.Short]: 0,
    [DurationLevels.Medium]: 1,
    [DurationLevels.Long]: 2,
  }

  return (
    <>
      <FlatList
        key={routine.duration}
        ListHeaderComponent={
          <>
            <View style={styles.greetingWrapper}>
              <Text style={styles.greeting}>
                Level Up Your Fun, Warm Up and Excel in Style!
              </Text>
            </View>
            <View style={styles.durationSelectWrapper}>
              <SegmentedControl
                values={['Short', 'Medium', 'Long']}
                selectedIndex={intensitySelectedControlData[intensityLevel]}
                appearance={appColorScheme}
                onChange={(event) => {
                  Haptics.selectionAsync()
                  switch (event.nativeEvent.selectedSegmentIndex) {
                    case 0:
                      setIntensityLevel(DurationLevels.Short)
                      break
                    case 1:
                      setIntensityLevel(DurationLevels.Medium)
                      break
                    case 2:
                      setIntensityLevel(DurationLevels.Long)
                      break
                  }
                }}
              />
            </View>
            <View style={styles.durationWrapper}>
              <View style={styles.routineStartArrow}>
                <ArrowUturnDownIcon
                  size={24}
                  color={
                    (StyleSheet.flatten(styles.durationText) as TextStyle).color
                  }
                />
              </View>
              <Text style={styles.durationText}>{routine.duration}</Text>
            </View>
          </>
        }
        data={routine.data}
        extraData={routine.duration}
        renderItem={({ item, index }) => {
          return (
            <FadeInView delay={index * 200}>
              <Link
                href={{
                  pathname: `/instructions/${item.drillKey}/`,
                  params: { stage: item.stage },
                }}
                asChild
              >
                <Drill
                  id={item.drillKey}
                  hasContinuation={index !== routine.data.length - 1}
                  interactive
                >
                  <PrimaryGradientText style={styles.descriptionCtaText}>
                    What to do {'>'}
                  </PrimaryGradientText>
                </Drill>
              </Link>
            </FadeInView>
          )
        }}
        // TODO: on real content there won't be a need for index
        keyExtractor={(item, index) => `${item.drillKey}:${index}`}
        contentContainerStyle={{ paddingBottom: bottom + SCREEN_CTA_HEIGHT }}
      />
      <Link href="/routine/" asChild>
        <ScreenCTA>START</ScreenCTA>
      </Link>
    </>
  )
}

function ProfileButton() {
  const styles = useAppStyles(themedStyles)
  const name = useUserName()

  return (
    <Link href="/profile/" asChild>
      <Button style={styles.profileRow} activeOpacity={0.6} haptic="selection">
        <Avatar size={24} />
        <Text style={styles.profileText}>{name}</Text>
      </Button>
    </Link>
  )
}

function LevelButton() {
  const styles = useAppStyles(themedStyles)
  const level = useRecoilValue(levelAtom)

  return (
    <Link href="/choose-level/" asChild>
      <Button style={styles.profileRow} activeOpacity={0.6} haptic="selection">
        <DifficultyLevelIcon size={30} level={level} />
      </Button>
    </Link>
  )
}

SplashScreen.preventAutoHideAsync()

async function initIronSource() {
  const isDev = process.env.NODE_ENV === 'development'
  try {
    if (isDev) {
      await IronSource.validateIntegration()

      await IronSource.setAdaptersDebug(true)
      await IronSource.shouldTrackNetworkState(true)

      await IronSource.setMetaData('is_test_suite', ['enable'])
    }

    await IronSource.setMetaData('is_child_directed', ['false'])
    // await IronSource.setUserId()

    await IronSource.init(process.env.EXPO_PUBLIC_IRONSRC_APP_KEY, [
      'REWARDED_VIDEO',
      'INTERSTITIAL',
    ])
  } catch (err) {
    if (err instanceof Error && isDev) {
      console.error(err.message)
    }
  }
}

export default function MainScreen() {
  const styles = useAppStyles(themedStyles)
  const onboardingScreen = useRecoilValue(currentOnboardingScreen)
  const firstOnboardingScreen = useRef(onboardingScreen).current
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      if (firstOnboardingScreen !== OnboardingScreens.TermsAndPrivacy) {
        FBSDKSettings.initializeSDK()
      }

      if (firstOnboardingScreen !== OnboardingScreens.Paywall) {
        router.push('/onboarding/')

        return
      }

      if (process.env.NODE_ENV === 'development') {
        InitializationEvents.onInitializationComplete.setListener(() => {
          console.log('IronSource is successfuly init')
        })
      }

      SplashScreen.hideAsync()
    })

    initIronSource()

    return () => {
      InitializationEvents.removeAllListeners()
    }
  }, [firstOnboardingScreen, router])

  return (
    <>
      <Stack.Screen
        options={{
          title: null,
          headerLeft: () => <ProfileButton />,
          headerRight: () => <LevelButton />,
          headerStyle: styles.header as unknown,
          contentStyle: styles.content,
          headerShadowVisible: false,
          gestureEnabled: false,
        }}
      />
      {/* TODO: loading state for the routine */}
      <Suspense fallback={null}>
        <Routine />
      </Suspense>
    </>
  )
}

const themedStyles = AppStyleSheet.create({
  header: {
    backgroundColor: 'bg',
  },
  content: {
    backgroundColor: 'bg',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileText: {
    color: 'text primary',
    fontFamily: 'rubik 500',
    fontSize: 16,
  },
  greetingWrapper: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  greeting: {
    fontFamily: 'rubik 600',
    fontSize: 18,
    color: 'text primary',
  },
  durationSelectWrapper: {
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  durationWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  durationText: {
    color: 'line',
    fontFamily: 'rubik 400',
    fontSize: 13,
    lineHeight: 18,
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
  descriptionCtaText: {
    fontFamily: 'rubik 700',
    fontSize: 16,
  },
  completedRoutineTitleContainer: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  completedRoutineTitle: {
    color: 'text primary',
    fontFamily: 'rubik 600',
    fontSize: 20,
  },
  completedRoutineCaptionContainer: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  completedRoutineCaption: {
    color: 'text primary',
    fontFamily: 'rubik 400',
    fontSize: 14,
  },
  lastCompletedRoutineSectionTitleContainer: {
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  lastCompletedRoutineSectionTitle: {
    color: 'text primary',
    fontFamily: 'rubik 600',
    fontSize: 16,
  },
})
