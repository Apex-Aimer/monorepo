import { StyleSheet, View, Text } from 'react-native'
import { atom, useSetRecoilState } from 'recoil'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { useHeaderHeight } from '@react-navigation/elements'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowRightIcon } from 'react-native-heroicons/solid'

import {
  OnboardingFadeInOutView,
  useOnboardingFadeOut,
} from './components/OnboardingFadeInOutView'
import { OnboardingScreenCTA } from './components/OnboardingScreenCTA'

export const username = atom<string>({
  key: 'onboardingUsername',
  default: '',
})

export function UsernameScreen() {
  const styles = useAppStyles(themedStyles)
  const fadeOut = useOnboardingFadeOut()
  const { bottom } = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()
  const setUsername = useSetRecoilState(username)

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: bottom, paddingTop: headerHeight + PADDING_VERTICAL },
      ]}
    >
      <OnboardingFadeInOutView>
        <Text style={styles.title}>
          What’s username{'\n'}you are playing with?
        </Text>
      </OnboardingFadeInOutView>
      <View style={styles.content}></View>
      <OnboardingScreenCTA
        fadeInDelay={200}
        onPress={() => {
          fadeOut()
        }}
      >
        <ArrowRightIcon
          size={20}
          color={StyleSheet.flatten(styles.ctaIcon).backgroundColor}
        />
      </OnboardingScreenCTA>
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
  ctaIcon: {
    backgroundColor: 'icon primary',
  },
})
