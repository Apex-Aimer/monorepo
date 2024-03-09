/* eslint-disable jsx-a11y/alt-text */
import { useMemo, useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextStyle,
  View,
  useWindowDimensions,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import {
  Canvas,
  useImage,
  Image,
  Rect,
  RadialGradient,
  vec,
} from '@shopify/react-native-skia'
import { CheckIcon } from 'react-native-heroicons/solid'
import { Link } from 'expo-router'
import { useRecoilState } from 'recoil'
import { Settings as FBSDKSettings } from 'react-native-fbsdk-next'
import { IronSource } from 'ironsource-mediation'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import {
  OnboardingFadeInOutView,
  useOnboardingFadeOut,
} from './components/OnboardingFadeInOutView'
import { hexToRGB } from '../components/ThemeProvider'
import { OnboardingScreenCTA } from './components/OnboardingScreenCTA'
import { Button } from '../components/Button'
import { hasAgreedToTermsAndPrivacy } from '../store'

function FiringRangeImage() {
  const styles = useAppStyles(themedStyles)
  const headerHeight = useHeaderHeight()

  const img = useImage(require('../../assets/firing-range.jpg'))

  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const imgHeight = useMemo(() => {
    const { paddingTop, paddingBottom } = StyleSheet.flatten(
      styles.titleContainer
    )
    const { lineHeight } = StyleSheet.flatten<TextStyle>(styles.title)

    return (
      screenHeight -
      headerHeight -
      (paddingTop as number) -
      (paddingBottom as number) -
      lineHeight
    )
  }, [headerHeight, screenHeight, styles.title, styles.titleContainer])

  const imgGradient = useMemo(() => {
    const { r, g, b } = hexToRGB(
      StyleSheet.flatten(styles.gradient).backgroundColor as string
    )

    return [`rgba(${r}, ${g}, ${b}, 0)`, `rgba(${r}, ${g}, ${b}, 1)`]
  }, [styles.gradient])

  return (
    <View style={styles.decoration}>
      <Canvas style={styles.image}>
        <Image
          image={img}
          fit="cover"
          x={0}
          y={0}
          width={screenWidth}
          height={imgHeight}
        />
        <Rect x={0} y={0} width={screenWidth} height={imgHeight}>
          <RadialGradient
            c={vec(screenWidth / 2, imgHeight)}
            r={imgHeight}
            colors={imgGradient}
          />
        </Rect>
      </Canvas>
    </View>
  )
}

interface CheckboxProps {
  isActive: boolean
}

function Checkbox({ isActive }: CheckboxProps) {
  const styles = useAppStyles(themedStyles)

  return (
    <View style={[styles.checkbox, isActive && styles.checkboxActive]}>
      {isActive && <CheckIcon color="white" size={16} />}
    </View>
  )
}

export function TermsAndPrivacyScreen() {
  const styles = useAppStyles(themedStyles)
  const headerHeight = useHeaderHeight()
  const fadeOut = useOnboardingFadeOut()
  const [hasNoted, setHasNoted] = useState(false)
  const [hasAgreed, setAgree] = useRecoilState(hasAgreedToTermsAndPrivacy)

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <OnboardingFadeInOutView style={styles.titleContainer} fadeInDelay={200}>
        <Text style={styles.title}>
          Be <Text style={styles.titleAccent}>ready</Text> for a fight
        </Text>
      </OnboardingFadeInOutView>
      <OnboardingFadeInOutView style={styles.decoration}>
        <FiringRangeImage />
      </OnboardingFadeInOutView>
      <OnboardingScreenCTA
        fadeInDelay={450}
        preButton={
          <View style={styles.checkboxesContainer}>
            <OnboardingFadeInOutView fadeInDelay={300}>
              <Button
                onPress={() => {
                  setHasNoted(!hasNoted)
                }}
                style={styles.checkboxWrapper}
              >
                <Checkbox isActive={hasNoted} />
                <Text style={styles.checkboxLabel}>
                  I understand that this app {'\n'}is not sponsored, affiliated
                  with, {'\n'}or endorsed by{' '}
                  <Link
                    href="https://ea.com/"
                    style={styles.checkboxLabelAccent}
                  >
                    Electronic Arts Inc. (EA)
                  </Link>
                  {'\n'}or{' '}
                  <Link
                    href="https://www.respawn.com/"
                    style={styles.checkboxLabelAccent}
                  >
                    Respawn Entertainment
                  </Link>
                </Text>
              </Button>
            </OnboardingFadeInOutView>
            <OnboardingFadeInOutView fadeInDelay={350}>
              <Button
                onPress={() => {
                  setAgree(!hasAgreed)
                }}
                style={styles.checkboxWrapper}
              >
                <Checkbox isActive={hasAgreed} />
                <Text style={styles.checkboxLabel}>
                  I agree to{' '}
                  <Link
                    href="/profile/terms-of-use"
                    style={styles.checkboxLabelAccent}
                  >
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/profile/privacy-policy"
                    style={styles.checkboxLabelAccent}
                  >
                    Privacy Policy
                  </Link>
                </Text>
              </Button>
            </OnboardingFadeInOutView>
          </View>
        }
        onPress={async () => {
          async function proceed() {
            setAgree(true)
            FBSDKSettings.initializeSDK()
            await IronSource.setConsent(true)

            fadeOut()
          }
          if (!hasNoted) {
            Alert.alert(
              'Unofficial firing range guide',
              'Please note that EA and Respawn Entertainment have not endorsed nor are they responsible for the content of this application.',
              [
                {
                  text: 'I understand',
                  onPress: () => {
                    setHasNoted(true)

                    if (!hasAgreed) {
                      return
                    }

                    proceed()
                  },
                },
              ]
            )
            return
          }
          if (!hasAgreed) {
            Alert.alert(
              'You must agree to Terms first',
              'Please read Terms and Privacy Policy and accept to continue.'
            )
            return
          }

          await proceed()
        }}
        postButton={
          <OnboardingFadeInOutView fadeInDelay={500}>
            <Text style={styles.footnote}>
              All images, icons, trademarks, and game assets used or referenced{' '}
              {'\n'}herein are the property of their respective owners. {'\n'}
              <Link
                href="https://www.ea.com/en-gb/games/apex-legends"
                style={styles.checkboxLabelAccent}
              >
                &quot;Apex Legends&quot;
              </Link>{' '}
              is a registered trademark of{' '}
              <Link href="https://ea.com/" style={styles.checkboxLabelAccent}>
                Electronic Arts Inc.
              </Link>
            </Text>
          </OnboardingFadeInOutView>
        }
      >
        Start
      </OnboardingScreenCTA>
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'bg',
  },
  titleContainer: {
    paddingTop: 80,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'rubik 700',
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: -1,
    color: 'text primary',
  },
  titleAccent: {
    color: 'text accent',
  },
  decoration: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  gradient: {
    backgroundColor: 'bg',
  },
  checkboxesContainer: {
    flexDirection: 'column',
    gap: 15,
  },
  checkboxWrapper: {
    width: 300,
    flexDirection: 'row',
    gap: 14,
    paddingBottom: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    backgroundColor: 'bg',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'text accent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: 'text accent',
  },
  checkboxLabel: {
    fontFamily: 'rubik 400',
    fontSize: 14,
    lineHeight: 24,
    color: 'text primary',
  },
  checkboxLabelAccent: {
    color: 'text accent',
    textDecorationLine: 'underline',
  },
  footnote: {
    fontFamily: 'rubik 400',
    fontSize: 9,
    color: 'line',
    textAlign: 'center',
  },
})
