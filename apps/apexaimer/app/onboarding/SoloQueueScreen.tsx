import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { useHeaderHeight } from '@react-navigation/elements'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import {
  OnboardingFadeInOutView,
  useOnboardingFadeOut,
} from './components/OnboardingFadeInOutView'
import { useThemeColors } from '../components/ThemeProvider'
import { Button } from '../components/Button'
import { persistAtom } from '../persistAtom'
import { useCallback } from 'react'
import {
  HowManyTimeYouPlay,
  howManyTimeYouPlay,
} from './HowManyTimeYouPlayScreen'
import { GameModes, gameMode } from './GameModeScreen'
import { DurationLevels } from '../routines/types'
import { routineIntensityLevel } from '../store'

interface OptionProps {
  children: string
  onPress(): void
}

function Option({ children: label, onPress }: OptionProps) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)

  return (
    <Button onPress={onPress} haptic="impactLight">
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={theme['onboarding option gradient'] as string[]}
        style={styles.option}
      >
        <Text style={styles.optionText}>{label}</Text>
      </LinearGradient>
    </Button>
  )
}

export const isSoloQueue = atom<boolean>({
  key: 'onboardingIsSoloQueue',
  default: null,
  effects: [persistAtom],
})

export function SoloQueueScreen() {
  const styles = useAppStyles(themedStyles)
  const fadeOut = useOnboardingFadeOut()
  const { bottom } = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()
  const setIsSoloQueue = useSetRecoilState(isSoloQueue)
  const setRoutineIntensityLevel = useSetRecoilState(routineIntensityLevel)

  const howManyTimePlays = useRecoilValue(howManyTimeYouPlay)
  const gameModePlays = useRecoilValue(gameMode)

  const calculateIntensity = useCallback(
    (isSoloQueue: boolean) => {
      const timePlaysModificator = {
        [HowManyTimeYouPlay.lessHour]: 0,
        [HowManyTimeYouPlay.twoToThree]: 1.5,
        [HowManyTimeYouPlay.moreThanThree]: 3,
      }[howManyTimePlays]

      const gameModeModificator = {
        [GameModes.Mixtape]: 0,
        [GameModes.Pubs]: 1.5,
        [GameModes.Ranked]: 3,
      }[gameModePlays]

      const aloneModificator = isSoloQueue ? 3 : 1.5

      const intensity =
        (timePlaysModificator + gameModeModificator + aloneModificator) / 3

      if (intensity < 1) {
        return DurationLevels.Short
      }
      if (intensity < 2) {
        return DurationLevels.Medium
      }
      return DurationLevels.Long
    },
    [gameModePlays, howManyTimePlays]
  )

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: bottom, paddingTop: headerHeight + PADDING_VERTICAL },
      ]}
    >
      <OnboardingFadeInOutView>
        <Text style={styles.title}>
          Are you playing{'\n'}alone or with friends?
        </Text>
      </OnboardingFadeInOutView>
      <View style={styles.content}>
        <OnboardingFadeInOutView fadeInDelay={200}>
          <Option
            onPress={() => {
              fadeOut()
              setIsSoloQueue(true)
              setRoutineIntensityLevel(calculateIntensity(true))
            }}
          >
            Alone
          </Option>
        </OnboardingFadeInOutView>
        <OnboardingFadeInOutView fadeInDelay={250}>
          <Option
            onPress={() => {
              fadeOut()
              setIsSoloQueue(false)
              setRoutineIntensityLevel(calculateIntensity(false))
            }}
          >
            With friends
          </Option>
        </OnboardingFadeInOutView>
      </View>
    </View>
  )
}

const PADDING_VERTICAL = 36
const TITLE_LINE_HEIGHT = 36

const themedStyles = AppStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'bg',
    paddingVertical: PADDING_VERTICAL,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: 'rubik 600',
    fontSize: 24,
    lineHeight: TITLE_LINE_HEIGHT,
    color: 'text primary',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingBottom: TITLE_LINE_HEIGHT * 2,
    justifyContent: 'center',
    gap: 18,
  },
  option: {
    paddingHorizontal: 36,
    paddingVertical: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
  },
  optionText: {
    fontFamily: 'rubik 500',
    fontSize: 20,
    lineHeight: 30,
    color: 'text primary',
  },
})
