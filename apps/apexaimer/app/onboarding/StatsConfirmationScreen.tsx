import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useHeaderHeight } from '@react-navigation/elements'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import {
  OnboardingFadeInOutView,
  useOnboardingFadeOut,
} from './components/OnboardingFadeInOutView'
import { useThemeColors } from '../components/ThemeProvider'
import { Avatar } from '../components/Avatar'
import { OnboardingScreenCTA } from './components/OnboardingScreenCTA'
import { stats as statsAtom } from './UsernameScreen'
import { ALStatsService } from './ALStatsService'
import { avatar, level, name } from '../store'

interface StatProps {
  label: string
  value: string
}

function Stat({ label, value }: StatProps) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)

  return (
    <LinearGradient
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      colors={theme['onboarding option gradient'] as string[]}
      style={styles.stat}
    >
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </LinearGradient>
  )
}

export function StatsConfirmationScreen() {
  const styles = useAppStyles(themedStyles)
  const fadeOut = useOnboardingFadeOut()
  const { bottom } = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()
  const stats = useRecoilValue(statsAtom)

  const setLevel = useSetRecoilState(level)
  const setAvatar = useSetRecoilState(avatar)
  const setUsername = useSetRecoilState(name)

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: bottom, paddingTop: headerHeight + PADDING_VERTICAL },
      ]}
    >
      <OnboardingFadeInOutView>
        <Text style={styles.title}>Is data we{'\n'}extracted correct?</Text>
      </OnboardingFadeInOutView>
      <View style={styles.content}>
        <View style={styles.userDetails}>
          <OnboardingFadeInOutView fadeInDelay={200}>
            {/* TODO */}
            <Avatar size={80} />
          </OnboardingFadeInOutView>
          <OnboardingFadeInOutView fadeInDelay={250}>
            <Text style={styles.username}>{stats.username}</Text>
          </OnboardingFadeInOutView>
        </View>
        <View style={styles.contentRow}>
          <OnboardingFadeInOutView fadeInDelay={300}>
            <Stat label="Level" value={stats.level.toString()} />
          </OnboardingFadeInOutView>
          <OnboardingFadeInOutView fadeInDelay={350}>
            <Stat label="Rank" value={stats.rank} />
          </OnboardingFadeInOutView>
        </View>
        <View style={styles.contentRow}>
          <OnboardingFadeInOutView fadeInDelay={400}>
            <Stat label="KD ratio" value={stats.kdRatio} />
          </OnboardingFadeInOutView>
          <OnboardingFadeInOutView fadeInDelay={450}>
            <Stat label="Kills" value={stats.kills} />
          </OnboardingFadeInOutView>
        </View>
      </View>
      <OnboardingScreenCTA
        fadeInDelay={600}
        onPress={() => {
          setLevel(
            ALStatsService.sharedInstance.calculateDifficultyLevel(stats)
          )

          setUsername(stats.username)
          if (stats.avatar != null) {
            setAvatar({ uri: stats.avatar, cacheKey: stats.avatar })
          }

          fadeOut()
        }}
      >
        Next
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
    gap: 24,
    paddingTop: 48,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  userDetails: {
    gap: 15,
    alignItems: 'center',
  },
  username: {
    fontFamily: 'rubik 500',
    fontSize: 20,
    color: 'text primary',
  },
  stat: {
    width: 140,
    height: 140,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  statLabel: {
    fontFamily: 'rubik 600',
    fontSize: 25,
    lineHeight: 30,
    color: 'text primary',
  },
  statValue: {
    fontFamily: 'rubik 600',
    fontSize: 30,
    lineHeight: 30,
    color: 'text accent',
  },
})
