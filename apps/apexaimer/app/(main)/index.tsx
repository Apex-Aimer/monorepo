import { Suspense, useState } from 'react'
import { FlatList, StyleSheet, Text, TextStyle, View } from 'react-native'
import { Link, Stack } from 'expo-router'
import { UserIcon } from 'react-native-heroicons/solid'
import { ArrowUturnDownIcon } from 'react-native-heroicons/outline'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRecoilState, useRecoilValue } from 'recoil'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { Drill } from '../components/Drill/Drill'
import { SCREEN_CTA_HEIGHT, ScreenCTA } from '../components/ScreenCTA'
import { routineIntensityLevel, routineOfTheDay } from '../store'

function Routine() {
  const [intensityLevel, setIntensityLevel] = useRecoilState(
    routineIntensityLevel
  )
  const routine = useRecoilValue(routineOfTheDay)

  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()

  return (
    <>
      <FlatList
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
            <Link href={`/instructions/${item}`} asChild>
              <Drill
                id={item}
                hasContinuation={index !== routine.data.length - 1}
                interactive
              />
            </Link>
          )
        }}
        // TODO: on real content there won't be a need for index
        keyExtractor={(item, index) => `${item}:${index}`}
        contentContainerStyle={{ paddingBottom: bottom + SCREEN_CTA_HEIGHT }}
      />
      <Link href="/routine" asChild>
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
          title: '',
          headerLeft: () => (
            <View style={styles.profileRow}>
              <View style={styles.profileIconBox}>
                <UserIcon
                  size={20}
                  color={StyleSheet.flatten(styles.profileIcon).backgroundColor}
                />
              </View>
              <Text style={styles.profileText}>Legend</Text>
            </View>
          ),
          headerRight: () => null,
          headerStyle: styles.header as unknown,
          contentStyle: styles.content,
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
})
