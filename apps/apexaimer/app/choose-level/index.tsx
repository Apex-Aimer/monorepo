import { useMemo } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { Link, Stack, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Canvas,
  LinearGradient,
  Rect,
  RoundedRect,
  vec,
} from '@shopify/react-native-skia'
import { useRecoilState } from 'recoil'

import { headerLeft } from '../components/HeaderBackButton'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { Button } from '../components/Button'
import { Levels } from '../routines/levels'
import { level as levelAtom } from '../store'
import { DifficultyLevelIcon } from '../components/DifficultyLevelIcon'
import { useThemeColors } from '../components/ThemeProvider'

function OnboardingButton() {
  const styles = useAppStyles(themedStyles)

  return (
    <Link href="/onboarding/" asChild>
      <Button activeOpacity={0.6} haptic="selection">
        <Text style={[styles.title, { fontSize: 12 }]}>Onboarding</Text>
      </Button>
    </Link>
  )
}

interface OptionProps {
  children: string
  level: Levels
}

function Option({ children: label, level }: OptionProps) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)
  const [activeLevel, setLevel] = useRecoilState(levelAtom)
  const { width: screenWidth } = useWindowDimensions()

  const width = useMemo(() => {
    return (
      screenWidth -
      (StyleSheet.flatten(styles.levelsContainer).paddingHorizontal as number) *
        2
    )
  }, [screenWidth, styles.levelsContainer])
  const height = useMemo(() => {
    return StyleSheet.flatten(styles.option).height as number
  }, [styles.option])

  const router = useRouter()

  return (
    <Button
      onPress={() => {
        setLevel(level)
        router.replace('/')
      }}
      haptic="impactLight"
      style={styles.option}
    >
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width, height }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={theme['exercise item gradient'] as string[]}
          />
        </Rect>
        {activeLevel === level && (
          <>
            <Rect
              x={0}
              y={0}
              width={width}
              height={height}
              color={theme['level option'] as string}
            ></Rect>
            <RoundedRect
              x={0}
              y={0}
              width={width}
              height={height}
              style="stroke"
              strokeWidth={4}
              r={15}
            >
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width, height)}
                colors={theme['primary gradient'] as string[]}
              />
            </RoundedRect>
          </>
        )}
      </Canvas>
      <Text style={styles.optionLabel}>{label}</Text>
      <DifficultyLevelIcon size={50} level={level} />
    </Button>
  )
}

export default function ChooseLevelScreen() {
  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()

  return (
    <>
      <Stack.Screen
        options={{
          title: null,
          headerLeft,
          headerRight: () => <OnboardingButton />,
          headerStyle: styles.header as unknown,
          contentStyle: styles.content,
          headerShadowVisible: false,
          headerTintColor: styles.tint.backgroundColor as string,
        }}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottom },
        ]}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Choose the level of difficulty</Text>
          <Text style={styles.description}>
            Difficulty level doesn’t represent your skill level.{'\n'}It should
            challenge you enough to stimulate improvement.
          </Text>
        </View>
        <View style={styles.levelsContainer}>
          <Option level={Levels.Rookie}>Rookie</Option>
          <Option level={Levels.Iron}>Iron</Option>
          <Option level={Levels.Bronze}>Bronze</Option>
          <Option level={Levels.Silver}>Silver</Option>
          <Option level={Levels.Gold}>Gold</Option>
          <Option level={Levels.Platinum}>Platinum</Option>
          <Option level={Levels.Diamond}>Diamond</Option>
          <Option level={Levels.Ascendant}>Ascendant</Option>
          <Option level={Levels.Master}>Master</Option>
          <Option level={Levels.Predator}>Predator</Option>
        </View>
      </ScrollView>
    </>
  )
}

const themedStyles = AppStyleSheet.create({
  header: {
    backgroundColor: 'bg',
  },
  content: {
    backgroundColor: 'bg',
  },
  tint: {
    backgroundColor: 'text primary',
  },
  scrollContent: {
    gap: 15,
  },
  titleWrapper: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 15,
    gap: 15,
  },
  title: {
    fontFamily: 'rubik 600',
    fontSize: 20,
    color: 'text primary',
  },
  description: {
    fontFamily: 'rubik 400',
    fontSize: 14,
    lineHeight: 20,
    color: 'text primary',
  },
  levelsContainer: {
    paddingHorizontal: 15,
    gap: 12,
  },
  option: {
    borderRadius: 15,
    height: 80,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  optionLabel: {
    fontFamily: 'rubik 600',
    fontSize: 22,
    lineHeight: 30,
    color: 'text primary',
  },
})
