import { PropsWithChildren } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Path, Svg } from 'react-native-svg'
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
import { Platforms } from './ALStatsService'

interface IconProps {
  size: number
  color: string
}

function PCLogo({ size, color }: IconProps) {
  return (
    <Svg
      width={size}
      height={Math.round(0.97 * size)}
      viewBox="0 0 30 29"
      fill="none"
    >
      <Path
        d="M7.49978 4.19589H1.87473C0.838485 4.19589 0 5.03613 0 6.07061V26.6961C0 27.7323 0.838485 28.5708 1.87473 28.5708H7.49978C8.53602 28.5708 9.37451 27.7323 9.37451 26.6961V6.07061C9.37451 5.03613 8.53602 4.19589 7.49978 4.19589ZM2.81253 22.9458C2.29397 22.9458 1.87473 22.5265 1.87473 22.008C1.87473 21.4894 2.29397 21.0702 2.81253 21.0702C3.33109 21.0702 3.75033 21.4894 3.75033 22.008C3.75033 22.5265 3.33109 22.9458 2.81253 22.9458ZM7.49978 11.6957H1.87473V9.82094H7.49978V11.6957ZM7.49978 7.94534H1.87473V6.07061H7.49978V7.94534ZM19.6877 24.8205V22.9458H14.0626V24.8205C13.0264 24.8205 12.1879 25.659 12.1879 26.6952H21.5633C21.5633 25.659 20.7239 24.8205 19.6877 24.8205ZM28.1253 0.445557H5.62505C4.58881 0.445557 3.75033 1.2858 3.75033 2.32028H28.1253V17.3207H11.2501V21.0711H28.1253C29.1615 21.0711 30 20.2326 30 19.1963V2.32116C30 1.28668 29.1615 0.446436 28.1253 0.446436V0.445557ZM16.8752 20.1332C16.3566 20.1332 15.9374 19.714 15.9374 19.1954C15.9374 18.6769 16.3566 18.2576 16.8752 18.2576C17.3937 18.2576 17.813 18.6769 17.813 19.1954C17.813 19.714 17.3937 20.1332 16.8752 20.1332Z"
        fill={color}
      />
    </Svg>
  )
}

function XboxLogo({ size, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 31 31" fill="none">
      <Path
        d="M14.0042 30.4465C11.6933 30.2251 9.35369 29.3952 7.34387 28.084C5.65971 26.9851 5.27939 26.5334 5.27939 25.632C5.27939 23.8213 7.27031 20.6498 10.6767 17.0344C12.6112 14.9811 15.306 12.5743 15.5974 12.6394C16.1638 12.7661 20.6932 17.1842 22.3888 19.264C25.0701 22.5528 26.3027 25.2456 25.6765 26.4461C25.2005 27.3587 22.2466 29.1424 20.0766 29.8276C18.288 30.3924 15.9391 30.6318 14.0042 30.4465ZM3.00473 23.7493C1.60522 21.6023 0.898145 19.4886 0.556764 16.4314C0.444039 15.4219 0.484434 14.8445 0.812733 12.7725C1.22191 10.1901 2.69257 7.20254 4.4597 5.36394C5.21233 4.58086 5.27955 4.56178 6.19696 4.87084C7.31105 5.24615 8.50081 6.06784 10.346 7.73628L11.4225 8.70974L10.8346 9.43195C8.10568 12.7845 5.22489 17.5366 4.1392 20.4766C3.54898 22.0749 3.31092 23.6793 3.56488 24.3473C3.73634 24.7982 3.57885 24.6301 3.00473 23.7493ZM27.5704 24.1145C27.7086 23.4396 27.5338 22.2001 27.1239 20.9499C26.2364 18.2424 23.2697 13.2056 20.5455 9.78107L19.688 8.70303L20.6157 7.85113C21.8272 6.73879 22.6682 6.07274 23.5757 5.50712C24.2919 5.06077 25.3152 4.66565 25.7551 4.66565C26.0263 4.66565 26.9811 5.6565 27.7519 6.73784C28.9456 8.41261 29.8238 10.4428 30.2688 12.5562C30.5563 13.9218 30.5802 16.8448 30.3151 18.2071C30.0975 19.325 29.6381 20.7751 29.1899 21.7585C28.8541 22.4954 28.0189 23.9266 27.6529 24.3923C27.4647 24.6317 27.4645 24.6312 27.5704 24.1145ZM14.2516 4.15439C12.9947 3.51609 11.0556 2.83093 9.98445 2.64659C9.60894 2.58196 8.96836 2.54592 8.56096 2.5665C7.67718 2.61113 7.71666 2.56491 9.13441 1.89509C10.3131 1.33822 11.2963 1.01075 12.631 0.730501C14.1324 0.415242 16.9546 0.411542 18.4321 0.722896C20.028 1.05918 21.9071 1.75849 22.966 2.41013L23.2807 2.6038L22.5587 2.56734C21.1238 2.49488 19.0327 3.07457 16.7875 4.16716C16.1104 4.49672 15.5212 4.75992 15.4784 4.75207C15.4355 4.74421 14.8834 4.47525 14.2516 4.15439Z"
        fill={color}
      />
    </Svg>
  )
}

function PSLogo({ size, color }: IconProps) {
  return (
    <Svg
      width={size}
      height={Math.round(0.8 * size)}
      viewBox="0 0 31 25"
      fill="none"
    >
      <Path
        d="M11.7294 0.73751V22.6709L16.6222 24.2468V5.8496C16.6222 4.98431 17.0037 4.40869 17.6187 4.60838C18.4099 4.83806 18.5665 5.6293 18.5665 6.49366V13.837C21.6189 15.3266 24.0198 13.8323 24.0198 9.89672C24.0198 5.8496 22.6136 4.05151 18.4737 2.61154C16.8378 2.04905 13.8097 1.12657 11.7351 0.736572L11.7294 0.73751ZM17.5503 21.0396L25.4214 18.1925C26.3139 17.871 26.4517 17.4125 25.7289 17.1725C24.9967 16.9335 23.6823 16.9963 22.7786 17.3235L17.525 19.1984V16.2144L17.8221 16.1122C17.8221 16.1122 19.3259 15.5863 21.4643 15.3407C23.5839 15.1166 26.1967 15.3791 28.262 16.1657C30.5719 16.9185 30.8157 18.0069 30.2297 18.7597C29.6485 19.5059 28.2038 20.0534 28.2038 20.0534L17.525 23.9346V21.0631L17.5503 21.0396ZM2.76054 20.7425C0.382145 20.059 -0.00784838 18.6575 1.07026 17.8363C2.07149 17.1088 3.76552 16.5238 3.76552 16.5238L10.7863 14.0085V16.8988L5.75767 18.74C4.87363 19.0775 4.72738 19.5312 5.46049 19.7703C6.19266 20.015 7.50514 19.9615 8.38544 19.624L10.807 18.74V21.3321C10.6607 21.3668 10.4891 21.3856 10.3185 21.4249C7.89701 21.8365 5.3283 21.6696 2.7746 20.825L2.76054 20.7425Z"
        fill={color}
      />
    </Svg>
  )
}

interface OptionProps extends PropsWithChildren {
  onPress?(): void
}

function Option({ onPress, children }: OptionProps) {
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
        {children}
      </LinearGradient>
    </Button>
  )
}

export const platform = atom<Platforms>({
  key: 'onboardingPlatform',
  default: null,
})

export function PlatformScreen() {
  const styles = useAppStyles(themedStyles)
  const fadeOut = useOnboardingFadeOut()
  const { bottom } = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()
  const setPlatform = useSetRecoilState(platform)

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: bottom, paddingTop: headerHeight + PADDING_VERTICAL },
      ]}
    >
      <OnboardingFadeInOutView>
        <Text style={styles.title}>
          On what platform{'\n'}do you play the game?
        </Text>
      </OnboardingFadeInOutView>
      <View style={styles.content}>
        <OnboardingFadeInOutView fadeInDelay={200}>
          <Option
            onPress={() => {
              setPlatform(Platforms.Playstation)
              fadeOut()
            }}
          >
            <PSLogo
              size={31}
              color={
                StyleSheet.flatten(styles.optionIcon).backgroundColor as string
              }
            />
            <Text style={styles.optionText}>PS4/5</Text>
          </Option>
        </OnboardingFadeInOutView>
        <OnboardingFadeInOutView fadeInDelay={250}>
          <Option
            onPress={() => {
              setPlatform(Platforms.Xbox)
              fadeOut()
            }}
          >
            <XboxLogo
              size={31}
              color={
                StyleSheet.flatten(styles.optionIcon).backgroundColor as string
              }
            />
            <Text style={styles.optionText}>Xbox</Text>
          </Option>
        </OnboardingFadeInOutView>
        <OnboardingFadeInOutView fadeInDelay={300}>
          <Option
            onPress={() => {
              setPlatform(Platforms.PC)
              fadeOut()
            }}
          >
            <PCLogo
              size={30}
              color={
                StyleSheet.flatten(styles.optionIcon).backgroundColor as string
              }
            />
            <Text style={styles.optionText}>PC</Text>
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
    paddingVertical: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  optionIcon: {
    backgroundColor: 'text primary',
  },
  optionText: {
    fontFamily: 'rubik 600',
    fontSize: 30,
    lineHeight: 30,
    color: 'text primary',
  },
})
