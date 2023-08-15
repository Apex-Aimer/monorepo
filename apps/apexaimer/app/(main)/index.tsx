import { Suspense } from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  TouchableOpacity,
} from 'react-native'
import { Link, Stack, router } from 'expo-router'
import { UserIcon } from 'react-native-heroicons/solid'
import { ArrowUturnDownIcon } from 'react-native-heroicons/outline'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRecoilState, useRecoilValue } from 'recoil'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { Drill } from '../components/Drill/Drill'
import { SCREEN_CTA_HEIGHT, ScreenCTA } from '../components/ScreenCTA'
import {
  isRoutineOfTheDayCompleted,
  routineIntensityLevel,
  routineOfTheDay,
} from '../store'
import { PrimaryGradientText } from '../components/PrimaryGradientText'
import { FadeInView } from '../components/FadeInView'
import { Carousel } from './Carousel'
import { DrillInfoCard } from './DrillInfoCard'
import { useAppColorScheme } from '../components/ThemeProvider'

function Routine() {
  const [intensityLevel, setIntensityLevel] = useRecoilState(
    routineIntensityLevel
  )
  const routine = useRecoilValue(routineOfTheDay)
  const isRoutineCompleted = useRecoilValue(isRoutineOfTheDayCompleted)

  const appColorScheme = useAppColorScheme()
  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()

  if (isRoutineCompleted) {
    return (
      <ScrollView>
        <View style={styles.completedRoutineTitleContainer}>
          <Text style={styles.completedRoutineTitle}>
            You’re all set for today!
          </Text>
        </View>
        <View style={styles.completedRoutineCaptionContainer}>
          <Text style={styles.completedRoutineCaption}>
            It’s time to jump into the game and have some fun. There’s no better
            way to improve rather than play the game.
          </Text>
        </View>
        <View style={styles.lastCompletedRoutineSectionTitleContainer}>
          <Text style={styles.lastCompletedRoutineSectionTitle}>
            Drills from the last warm-up
          </Text>
        </View>
        <Carousel
          data={routine.data}
          renderItem={(item) => (
            <Link href={`/instructions/${item}/`} asChild>
              <DrillInfoCard id={item} />
            </Link>
          )}
          // TODO: on real content there won't be a need for index
          keyExtractor={(item, index) => `${item}:${index}`}
          onMorePress={() => {
            // TODO
            router.push(`/routine-details/${'defaultMedium'}/`)
          }}
        />
      </ScrollView>
    )
  }

  return (
    <>
      <FlatList
        key={routine.data.length}
        ListHeaderComponent={
          <>
            <View style={styles.greetingWrapper}>
              <Text style={styles.greeting}>
                Level Up Your Fun, Warm Up and Excel in Style!
              </Text>
            </View>
            <View style={styles.durationSelectWrapper}>
              <SegmentedControl
                values={['Short', 'Medium', 'Long']}
                selectedIndex={intensityLevel}
                appearance={appColorScheme}
                onChange={(event) => {
                  setIntensityLevel(event.nativeEvent.selectedSegmentIndex)
                }}
              />
            </View>
            <View style={styles.durationWrapper}>
              <View style={styles.routineStartArrow}>
                <ArrowUturnDownIcon
                  size={24}
                  color={
                    (StyleSheet.flatten(styles.durationText) as TextStyle).color
                  }
                />
              </View>
              <Text style={styles.durationText}>{routine.duration}</Text>
            </View>
          </>
        }
        data={routine.data}
        renderItem={({ item, index }) => {
          return (
            <FadeInView delay={index * 200}>
              <Link href={`/instructions/${item}/`} asChild>
                <Drill
                  id={item}
                  hasContinuation={index !== routine.data.length - 1}
                  interactive
                >
                  <PrimaryGradientText style={styles.descriptionCtaText}>
                    What to do {'>'}
                  </PrimaryGradientText>
                </Drill>
              </Link>
            </FadeInView>
          )
        }}
        // TODO: on real content there won't be a need for index
        keyExtractor={(item, index) => `${item}:${index}`}
        contentContainerStyle={{ paddingBottom: bottom + SCREEN_CTA_HEIGHT }}
      />
      <Link href="/routine/" asChild>
        <ScreenCTA>START</ScreenCTA>
      </Link>
    </>
  )
}

export default function MainScreen() {
  const styles = useAppStyles(themedStyles)

  return (
    <>
      <Stack.Screen
        options={{
          title: null,
          headerLeft: () => (
            <Link href="/profile/" asChild>
              <TouchableOpacity style={styles.profileRow} activeOpacity={0.6}>
                <View style={styles.profileIconBox}>
                  <UserIcon
                    size={20}
                    color={
                      StyleSheet.flatten(styles.profileIcon).backgroundColor
                    }
                  />
                </View>
                <Text style={styles.profileText}>Legend</Text>
              </TouchableOpacity>
            </Link>
          ),
          headerRight: () => null,
          headerStyle: styles.header as unknown,
          contentStyle: styles.content,
          headerShadowVisible: false,
        }}
      />
      {/* TODO: loading state for the routine */}
      <Suspense fallback={null}>
        <Routine />
      </Suspense>
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
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileIconBox: {
    backgroundColor: 'text primary',
    padding: 3,
    borderRadius: 5,
  },
  profileIcon: {
    backgroundColor: 'text primary inverted',
  },
  profileText: {
    color: 'text primary',
    fontFamily: 'rubik 500',
    fontSize: 16,
  },
  greetingWrapper: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  greeting: {
    fontFamily: 'rubik 600',
    fontSize: 18,
    color: 'text primary',
  },
  durationSelectWrapper: {
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  durationWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  durationText: {
    color: 'line',
    fontFamily: 'rubik 400',
    fontSize: 13,
    lineHeight: 18,
  },
  routineStartArrow: {
    position: 'absolute',
    left: 30,
    bottom: -16,
    transform: [
      {
        rotateY: '180deg',
      },
    ],
  },
  descriptionCtaText: {
    fontFamily: 'rubik 700',
    fontSize: 16,
  },
  completedRoutineTitleContainer: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  completedRoutineTitle: {
    color: 'text primary',
    fontFamily: 'rubik 600',
    fontSize: 20,
  },
  completedRoutineCaptionContainer: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  completedRoutineCaption: {
    color: 'text primary',
    fontFamily: 'rubik 400',
    fontSize: 14,
  },
  lastCompletedRoutineSectionTitleContainer: {
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  lastCompletedRoutineSectionTitle: {
    color: 'text primary',
    fontFamily: 'rubik 600',
    fontSize: 16,
  },
})
