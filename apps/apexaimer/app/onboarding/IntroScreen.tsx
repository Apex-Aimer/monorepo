import { View, Text } from 'react-native'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import {
  OnboardingFadeInOutView,
  useOnboardingFadeOut,
} from './components/OnboardingFadeInOutView'
import { OnboardingScreenCTA } from './components/OnboardingScreenCTA'

export function IntroScreen() {
  const styles = useAppStyles(themedStyles)
  const fadeOut = useOnboardingFadeOut()

  return (
    <View style={styles.container}>
      <OnboardingFadeInOutView>
        <Text style={styles.title}>
          Let’s <Text style={styles.textAccent}>personalize</Text>
          {'\n'}your experience
        </Text>
      </OnboardingFadeInOutView>
      <OnboardingFadeInOutView fadeInDelay={200}>
        <Text style={styles.description}>
          We’ll try to extract{'\n'}your game data to assign{'\n'}better
          difficulty level
        </Text>
      </OnboardingFadeInOutView>
      <OnboardingScreenCTA fadeInDelay={400} onPress={fadeOut}>
        OK
      </OnboardingScreenCTA>
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'bg',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  title: {
    fontFamily: 'rubik 600',
    fontSize: 24,
    lineHeight: 36,
    color: 'text primary',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'rubik 400',
    fontSize: 16,
    lineHeight: 24,
    color: 'text primary',
    textAlign: 'center',
  },
  textAccent: {
    color: 'text accent',
  },
})
