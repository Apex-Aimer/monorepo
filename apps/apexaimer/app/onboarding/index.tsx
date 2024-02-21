import { useEffect, useMemo } from 'react'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { atom, useRecoilState, useRecoilValue } from 'recoil'

import { OnboardingFadeInOutViewContainer } from './components/OnboardingFadeInOutView'
import { OnboardingStepperProgress } from './components/OnboardingStepperProgress'
import { IntroScreen } from './IntroScreen'
import { PlatformScreen } from './PlatformScreen'
import { UsernameScreen } from './UsernameScreen'
import { StatsConfirmationScreen } from './StatsConfirmationScreen'
import { HowManyTimeYouPlayScreenScreen } from './HowManyTimeYouPlayScreen'
import { GameModeScreen } from './GameModeScreen'
import { SoloQueueScreen } from './SoloQueueScreen'
import { FinishScreen } from './FinishScreen'
import { PersonalizationScreen } from './PersonalizationScreen'
import { PaywallScreen } from './PaywallScreen'

enum OnboardingScreens {
  Intro,
  Platform,
  Username,
  StatsConfirmation,
  Personalization,
  HowManyTimeYouPlay,
  GameMode,
  SoloQueue,
  Finish,
  Paywall,
}

const currentScreen = atom({
  key: 'onboardingStep',
  default: OnboardingScreens.Intro,
})

const screens = {
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

const unseen = new Set([
  OnboardingScreens.Personalization,
  OnboardingScreens.Finish,
  OnboardingScreens.Paywall,
])

function OnboardingScreenHeader() {
  const screen = useRecoilValue(currentScreen)
  const steps = useMemo(() => new Set(Object.values(screens)).size, [])

  return (
    <View style={{ opacity: unseen.has(screen) ? 0 : 1 }}>
      <OnboardingStepperProgress step={screens[screen]} steps={steps} />
    </View>
  )
}

export default function OnboardingScreen() {
  const [screen, setScreen] = useRecoilState(currentScreen)

  useEffect(
    () => () => {
      setScreen(OnboardingScreens.Intro)
    },
    [setScreen]
  )

  return (
    <>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerTitle: () => <OnboardingScreenHeader />,
          headerTransparent: true,
        }}
      />
      {screen === OnboardingScreens.Intro && (
        <OnboardingFadeInOutViewContainer
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.Platform)
          }}
        >
          <IntroScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.Platform && (
        <OnboardingFadeInOutViewContainer
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.Username)
          }}
        >
          <PlatformScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.Username && (
        <OnboardingFadeInOutViewContainer
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.StatsConfirmation)
          }}
        >
          <UsernameScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.StatsConfirmation && (
        <OnboardingFadeInOutViewContainer
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.Personalization)
          }}
        >
          <StatsConfirmationScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.Personalization && (
        <OnboardingFadeInOutViewContainer
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.HowManyTimeYouPlay)
          }}
        >
          <PersonalizationScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.HowManyTimeYouPlay && (
        <OnboardingFadeInOutViewContainer
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.GameMode)
          }}
        >
          <HowManyTimeYouPlayScreenScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.GameMode && (
        <OnboardingFadeInOutViewContainer
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.SoloQueue)
          }}
        >
          <GameModeScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.SoloQueue && (
        <OnboardingFadeInOutViewContainer
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.Finish)
          }}
        >
          <SoloQueueScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.Finish && (
        <OnboardingFadeInOutViewContainer
          onChildrenFadedOut={() => {
            setScreen(OnboardingScreens.Paywall)
          }}
        >
          <FinishScreen />
        </OnboardingFadeInOutViewContainer>
      )}
      {screen === OnboardingScreens.Paywall && (
        <OnboardingFadeInOutViewContainer onChildrenFadedOut={() => {}}>
          <PaywallScreen />
        </OnboardingFadeInOutViewContainer>
      )}
    </>
  )
}
