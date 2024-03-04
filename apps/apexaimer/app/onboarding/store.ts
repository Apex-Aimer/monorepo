import { atom } from 'recoil'

import { persistAtom } from '../persistAtom'

export enum OnboardingScreens {
  TermsAndPrivacy,
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

export const currentOnboardingScreen = atom({
  key: 'onboardingStep',
  default: OnboardingScreens.TermsAndPrivacy,
  effects: [persistAtom],
})
