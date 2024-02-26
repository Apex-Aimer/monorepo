import { useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowRightIcon } from 'react-native-heroicons/solid'
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { noop } from 'lodash'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import {
  OnboardingFadeInOutView,
  useOnboardingFadeOut,
} from './components/OnboardingFadeInOutView'
import { PrimaryButton } from '../components/PrimaryButton'
import {
  ALStats,
  ALStatsError,
  ALStatsErrors,
  ALStatsService,
} from './ALStatsService'
import { platform as platformAtom } from './PlatformScreen'
import { persistAtom } from '../persistAtom'

interface CTAProps {
  loading: boolean
  disabled: boolean
  onPress(): void
}

function CTA({ loading, disabled, onPress }: CTAProps) {
  const styles = useAppStyles(themedStyles)

  const { bottom } = useSafeAreaInsets()

  const keyboard = useAnimatedKeyboard()
  const translateStyle = useAnimatedStyle(() => {
    const bottomConstraint = Math.max(bottom, 30)
    return {
      transform: [
        {
          translateY:
            -1 * Math.max(keyboard.height.value + 10, bottomConstraint),
        },
      ],
    }
  })

  return (
    <Animated.View style={[styles.cta, translateStyle]}>
      <OnboardingFadeInOutView fadeInDelay={400}>
        <View style={{ opacity: disabled ? 0.5 : 1 }}>
          <PrimaryButton
            onPress={disabled ? noop : onPress}
            disabled={disabled}
          >
            <View style={{ opacity: loading ? 0 : 1 }}>
              <ArrowRightIcon
                size={20}
                color={StyleSheet.flatten(styles.ctaIcon).backgroundColor}
              />
            </View>
            {loading && (
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  styles.buttonInnerIndicatorWrapper,
                ]}
              >
                <ActivityIndicator
                  color={styles.buttonInnerIndicator.backgroundColor}
                />
              </View>
            )}
          </PrimaryButton>
        </View>
      </OnboardingFadeInOutView>
    </Animated.View>
  )
}

export const stats = atom<ALStats>({
  key: 'onboardingStats',
  default: null,
  effects: [persistAtom],
})

export function UsernameScreen() {
  const styles = useAppStyles(themedStyles)
  const headerHeight = useHeaderHeight()
  const fadeOut = useOnboardingFadeOut()

  const platform = useRecoilValue(platformAtom)
  const setStats = useSetRecoilState(stats)

  const usernameRef = useRef('')
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View
        style={[
          styles.container,
          {
            paddingTop: headerHeight + PADDING_VERTICAL,
          },
        ]}
      >
        <OnboardingFadeInOutView>
          <Text style={styles.title}>
            What’s username{'\n'}you are playing with?
          </Text>
        </OnboardingFadeInOutView>
        <OnboardingFadeInOutView style={styles.content} fadeInDelay={200}>
          <TextInput
            autoFocus
            placeholder="Username"
            placeholderTextColor={
              StyleSheet.flatten(styles.inputPlaceholder).backgroundColor
            }
            onChangeText={(value) => {
              usernameRef.current = value

              if (value.length && buttonDisabled) {
                setButtonDisabled(false)
                return
              }
              if (!value.length && !buttonDisabled) {
                setButtonDisabled(true)
                return
              }
            }}
            style={styles.input}
          />
        </OnboardingFadeInOutView>
        <CTA
          loading={loading}
          disabled={buttonDisabled}
          onPress={async () => {
            try {
              setLoading(true)

              const stats = await ALStatsService.sharedInstance.getStats(
                platform,
                usernameRef.current
              )

              setStats(stats)

              fadeOut()
            } catch (err) {
              if (err instanceof ALStatsError) {
                err.match({
                  [ALStatsErrors.PlayerNotFound]() {
                    Alert.alert(
                      `Player not found`,
                      `We couldn't find player with the name ${usernameRef.current}. Please check that you enter username correctly.`,
                      [
                        {
                          text: 'Try again',
                          onPress() {},
                        },
                        {
                          text: 'Skip',
                          onPress() {
                            // TODO
                          },
                        },
                      ]
                    )
                  },
                  [ALStatsErrors.Unknown]() {
                    Alert.alert(
                      `Error`,
                      `We couldn't find data associated with data you entered. Would you like to try again or you want to skip this? If you skip we'll set default difficulty level. You can change it manually later.`,
                      [
                        {
                          text: 'Try again',
                          onPress() {},
                        },
                        {
                          text: 'Skip',
                          onPress() {
                            // TODO
                          },
                        },
                      ]
                    )
                  },
                })
              }
            } finally {
              setLoading(false)
            }
          }}
        />
      </View>
    </TouchableWithoutFeedback>
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
    paddingTop: 90,
    alignItems: 'center',
    gap: 18,
  },
  input: {
    fontFamily: 'rubik 500',
    fontSize: 30,
    lineHeight: 34,
    color: 'text primary',
  },
  inputPlaceholder: {
    backgroundColor: 'line',
  },
  cta: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  ctaIcon: {
    backgroundColor: 'icon primary',
  },
  buttonInnerIndicatorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInnerIndicator: {
    backgroundColor: 'text light',
  },
})
