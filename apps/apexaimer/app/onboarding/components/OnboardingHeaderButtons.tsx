import { RefObject } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { useRecoilValue } from 'recoil'
import { OnboardingScreens, currentOnboardingScreen } from '../store'

type EmitterRef = RefObject<EventEmitter>

interface Props {
  emitterRef: EmitterRef
}

const unseenBackButton = new Set([
  OnboardingScreens.TermsAndPrivacy,
  OnboardingScreens.Intro,
  OnboardingScreens.Platform,
  OnboardingScreens.Finish,
  OnboardingScreens.Paywall,
])

export function OnboardingHeaderBackButton({ emitterRef }: Props) {
  const screen = useRecoilValue(currentOnboardingScreen)
  const invisible = unseenBackButton.has(screen)

  const styles = useAppStyles(themedStyles)

  return (
    <TouchableOpacity
      onPress={() => {
        emitterRef.current.emit('fadeOut', 'back')
      }}
      style={[styles.backButtonPressable, { opacity: invisible ? 0 : 1 }]}
      disabled={invisible}
      activeOpacity={0.6}
    >
      <ChevronLeftIcon
        color={StyleSheet.flatten(styles.backButtonIcon).backgroundColor}
      />
    </TouchableOpacity>
  )
}

// eslint-disable-next-line react/display-name
export const onboardingHeaderLeft = (emitterRef: EmitterRef) => () =>
  <OnboardingHeaderBackButton emitterRef={emitterRef} />

const unseenSkipButton = new Set([
  OnboardingScreens.TermsAndPrivacy,
  OnboardingScreens.Intro,
  OnboardingScreens.StatsConfirmation,
  OnboardingScreens.Personalization,
  OnboardingScreens.Finish,
  OnboardingScreens.Paywall,
])

export function OnboardingHeaderSkipButton({ emitterRef }: Props) {
  const screen = useRecoilValue(currentOnboardingScreen)
  const invisible = unseenSkipButton.has(screen)

  const styles = useAppStyles(themedStyles)

  return (
    <TouchableOpacity
      onPress={() => {
        emitterRef.current.emit('fadeOut', 'skip')
      }}
      style={[styles.skipButton, { opacity: invisible ? 0 : 1 }]}
      disabled={invisible}
      activeOpacity={0.6}
    >
      <Text style={styles.skipButtonText}>Skip</Text>
    </TouchableOpacity>
  )
}

// eslint-disable-next-line react/display-name
export const onboardingHeaderRight = (emitterRef: EmitterRef) => () =>
  <OnboardingHeaderSkipButton emitterRef={emitterRef} />

const themedStyles = AppStyleSheet.create({
  backButtonPressable: {
    marginLeft: -15,
    paddingHorizontal: 5,
  },
  backButtonIcon: {
    backgroundColor: 'icon primary',
  },
  backButtonThemed: {
    backgroundColor: 'bg accent inverted',
  },
  skipButton: {
    marginRight: -5,
    paddingHorizontal: 5,
  },
  skipButtonText: {
    fontFamily: 'rubik 300',
    fontSize: 16,
    lineHeight: 22,
    color: 'text primary',
  },
})
