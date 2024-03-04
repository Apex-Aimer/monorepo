import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Stack, useNavigation } from 'expo-router'
import { View } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'
import { SplashScreen } from 'expo-router'
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter'

import { OnboardingFadeInOutViewContainer } from './components/OnboardingFadeInOutView'
import { OnboardingStepperProgress } from './components/OnboardingStepperProgress'
import { IntroScreen } from './IntroScreen'
import { PlatformScreen, platform } from './PlatformScreen'
import { UsernameScreen, stats } from './UsernameScreen'
import { StatsConfirmationScreen } from './StatsConfirmationScreen'
import { HowManyTimeYouPlayScreenScreen } from './HowManyTimeYouPlayScreen'
import { GameModeScreen } from './GameModeScreen'
import { SoloQueueScreen } from './SoloQueueScreen'
import { FinishScreen } from './FinishScreen'
import { PersonalizationScreen } from './PersonalizationScreen'
import { PaywallScreen } from './PaywallScreen'
import { TermsAndPrivacyScreen } from './TermsAndPrivacyScreen'
import {
  onboardingHeaderLeft,
  onboardingHeaderRight,
} from './components/OnboardingHeaderButtons'
import { OnboardingScreens, currentOnboardingScreen } from './store'
import { OnboardingLoading } from './components/OnboardingLoading'

const screens = {
  [OnboardingScreens.TermsAndPrivacy]: 1,
  [OnboardingScreens.Intro]: 1,
  [OnboardingScreens.Platform]: 2,
  [OnboardingScreens.Username]: 3,
  [OnboardingScreens.StatsConfirmation]: 4,
  [OnboardingScreens.Personalization]: 4,
  [OnboardingScreens.HowManyTimeYouPlay]: 5,
  [OnboardingScreens.GameMode]: 6,
  [OnboardingScreens.SoloQueue]: 7,
  [OnboardingScreens.Finish]: 7,
  [OnboardingScreens.Paywall]: 7,
}

const unseenProgress = new Set([
  OnboardingScreens.TermsAndPrivacy,
  OnboardingScreens.Personalization,
  OnboardingScreens.Finish,
  OnboardingScreens.Paywall,
])

function OnboardingScreenHeader() {
  const screen = useRecoilValue(currentOnboardingScreen)
  const steps = useMemo(() => new Set(Object.values(screens)).size, [])

  return (
    <View style={{ opacity: unseenProgress.has(screen) ? 0 : 1 }}>
      <OnboardingStepperProgress step={screens[screen]} steps={steps} />
    </View>
  )
}

export default function OnboardingScreen() {
  const [screen, setScreen] = useRecoilState(currentOnboardingScreen)
  const hasPlatform = useRecoilValue(platform) != null
  const hasStats = useRecoilValue(stats) != null

  const emitter = useRef(new EventEmitter())

  const navigation = useNavigation()
  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionEnd' as any, () => {
      SplashScreen.hideAsync()
    })

    return () => {
      unsubscribe()
    }
  }, [navigation, setScreen])

  return (
    <>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerLeft: onboardingHeaderLeft(emitter),
          headerTitle: () => <OnboardingScreenHeader />,
          headerRight: onboardingHeaderRight(emitter),
          headerTransparent: true,
          gestureEnabled: false,
          headerShadowVisible: false,
        }}
      />
      {screen === OnboardingScreens.TermsAndPrivacy && (
        <OnboardingFadeInOutViewContainer
          emitter={emitter.current}
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.Intro)
          }}
        >
          <TermsAndPrivacyScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.Intro && (
        <OnboardingFadeInOutViewContainer
          emitter={emitter.current}
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.Platform)
          }}
        >
          <IntroScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.Platform && (
        <OnboardingFadeInOutViewContainer
          emitter={emitter.current}
          onChildrenFadedOut={(action) => {
            if (action === 'skip') {
              setScreen(OnboardingScreens.HowManyTimeYouPlay)
              return
            }
            setScreen(OnboardingScreens.Username)
          }}
        >
          <PlatformScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.Username && (
        <OnboardingFadeInOutViewContainer
          emitter={emitter.current}
          onChildrenFadedOut={(action) => {
            if (action === 'back') {
              setScreen(OnboardingScreens.Platform)
              return
            }
            if (action === 'skip') {
              setScreen(OnboardingScreens.HowManyTimeYouPlay)
              return
            }
            setScreen(OnboardingScreens.StatsConfirmation)
          }}
        >
          <UsernameScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.StatsConfirmation && (
        <OnboardingFadeInOutViewContainer
          emitter={emitter.current}
          onChildrenFadedOut={(action) => {
            if (action === 'back') {
              setScreen(OnboardingScreens.Username)
              return
            }
            if (action === 'skip') {
              setScreen(OnboardingScreens.HowManyTimeYouPlay)
              return
            }
            setScreen(OnboardingScreens.Personalization)
          }}
        >
          <StatsConfirmationScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.Personalization && (
        <OnboardingFadeInOutViewContainer
          emitter={emitter.current}
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.HowManyTimeYouPlay)
          }}
        >
          <PersonalizationScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.HowManyTimeYouPlay && (
        <OnboardingFadeInOutViewContainer
          emitter={emitter.current}
          onChildrenFadedOut={(action) => {
            if (action === 'back') {
              /**
               * We are "skipping" onboarding to "how many time you play"
               * from both platform and username screens.
               * Hence, when a user goes back from here
               * to follow the users flow we should either go to
               * the platform screen or to the username
               *
               * PS. Assume that no complicated flows are made, ie
               *     Platform -> Username -> Stats -> back -> back -> skip
               */
              // If no stats then a user hasn't been on stats confirmation screen
              if (!hasStats) {
                /**
                 * If doesn't have stats but have a platform,
                 * then she skipped on username screen
                 */
                if (hasPlatform) {
                  setScreen(OnboardingScreens.Username)
                  return
                }
                /**
                 * If no platform either, then it was skipped on platform page
                 */
                setScreen(OnboardingScreens.Platform)
                return
              }
              // Regular flow
              setScreen(OnboardingScreens.StatsConfirmation)
              return
            }
            if (action === 'skip') {
              setScreen(OnboardingScreens.GameMode)
              return
            }
            setScreen(OnboardingScreens.GameMode)
          }}
        >
          <HowManyTimeYouPlayScreenScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.GameMode && (
        <OnboardingFadeInOutViewContainer
          emitter={emitter.current}
          onChildrenFadedOut={(action) => {
            if (action === 'back') {
              setScreen(OnboardingScreens.HowManyTimeYouPlay)
              return
            }
            if (action === 'skip') {
              setScreen(OnboardingScreens.SoloQueue)
              return
            }
            setScreen(OnboardingScreens.SoloQueue)
          }}
        >
          <GameModeScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.SoloQueue && (
        <OnboardingFadeInOutViewContainer
          emitter={emitter.current}
          onChildrenFadedOut={(action) => {
            if (action === 'back') {
              setScreen(OnboardingScreens.GameMode)
              return
            }
            if (action === 'skip') {
              setScreen(OnboardingScreens.Finish)
              return
            }
            setScreen(OnboardingScreens.Finish)
          }}
        >
          <SoloQueueScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.Finish && (
        <OnboardingFadeInOutViewContainer
          emitter={emitter.current}
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.Paywall)
          }}
        >
          <FinishScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.Paywall && (
        <OnboardingFadeInOutViewContainer
          emitter={emitter.current}
          onChildrenFadedOut={() => {}}
        >
          <Suspense fallback={<OnboardingLoading />}>
            <PaywallScreen />
          </Suspense>
        </OnboardingFadeInOutViewContainer>
      )}
    </>
  )
}
