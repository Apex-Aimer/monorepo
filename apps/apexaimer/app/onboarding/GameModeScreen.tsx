import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { atom, useSetRecoilState } from 'recoil'
import { useHeaderHeight } from '@react-navigation/elements'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import {
  OnboardingFadeInOutView,
  useOnboardingFadeOut,
} from './components/OnboardingFadeInOutView'
import { useThemeColors } from '../components/ThemeProvider'
import { Button } from '../components/Button'

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

enum GameModes {
  Pubs,
  Ranked,
  Mixtape,
}

export const gameMode = atom<GameModes>({
  key: 'onboardingGameMode',
  default: null,
})

export function GameModeScreen() {
  const styles = useAppStyles(themedStyles)
  const fadeOut = useOnboardingFadeOut()
  const { bottom } = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()
  const setGameMode = useSetRecoilState(gameMode)

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: bottom, paddingTop: headerHeight + PADDING_VERTICAL },
      ]}
    >
      <OnboardingFadeInOutView>
        <Text style={styles.title}>
          What game mode{'\n'}do you play the most?
        </Text>
      </OnboardingFadeInOutView>
      <View style={styles.content}>
        <OnboardingFadeInOutView fadeInDelay={200}>
          <Option
            onPress={() => {
              setGameMode(GameModes.Pubs)
              fadeOut()
            }}
          >
            Pubs
          </Option>
        </OnboardingFadeInOutView>
        <OnboardingFadeInOutView fadeInDelay={250}>
          <Option
            onPress={() => {
              setGameMode(GameModes.Ranked)
              fadeOut()
            }}
          >
            Ranked
          </Option>
        </OnboardingFadeInOutView>
        <OnboardingFadeInOutView fadeInDelay={300}>
          <Option
            onPress={() => {
              setGameMode(GameModes.Mixtape)
              fadeOut()
            }}
          >
            Mixtape
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
