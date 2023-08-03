import { FlatList, StyleSheet, Text, TextStyle, View } from 'react-native'
import { AppStyleSheet, useAppStyles } from '../../src/components/useAppStyles'
import { Link, Stack } from 'expo-router'
import { UserIcon } from 'react-native-heroicons/solid'
import { ArrowUturnDownIcon } from 'react-native-heroicons/outline'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { useState } from 'react'
import { Drill, DrillType } from '../../src/components/Drill/Drill'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SCREEN_CTA_HEIGHT, ScreenCTA } from '../../src/components/ScreenCTA'

enum DurationLevels {
  Short,
  Medium,
  Long,
}

const routines = {
  [DurationLevels.Short]: {
    duration: '~ 5 min',
    data: [
      {
        type: DrillType.Movement,
        description: 'Slide jumps, Turns 90 deg, Turns around',
      },
      {
        type: DrillType.Tracking,
        description: 'Strafing dummy tracking (with strafing)',
      },
      {
        type: DrillType.Recoil,
        description:
          'Still dummy (or strafing dummy) recoil ladder (with strafing)',
      },
      {
        type: DrillType.Precision,
        description:
          'Single bullet targets switching close range (with strafing)',
      },
    ],
  },
  [DurationLevels.Medium]: {
    duration: '5-10 min',
    data: [
      {
        type: DrillType.Movement,
        description: 'Slide jumps, Turns 90 deg, Turns around',
      },
      {
        type: DrillType.Movement,
        description: 'Slide jumps, Turns 90 deg, Turns around',
      },
      {
        type: DrillType.Tracking,
        description: 'Strafing dummy tracking (with strafing)',
      },
      {
        type: DrillType.Tracking,
        description: 'Strafing dummy tracking (with strafing)',
      },
      {
        type: DrillType.Recoil,
        description:
          'Still dummy (or strafing dummy) recoil ladder (with strafing)',
      },
      {
        type: DrillType.Recoil,
        description:
          'Still dummy (or strafing dummy) recoil ladder (with strafing)',
      },
      {
        type: DrillType.Precision,
        description:
          'Single bullet targets switching close range (with strafing)',
      },
    ],
  },
  [DurationLevels.Long]: {
    duration: '10-15 min',
    data: [
      {
        type: DrillType.Movement,
        description: 'Slide jumps, Turns 90 deg, Turns around',
      },
      {
        type: DrillType.Movement,
        description: 'Slide jumps, Turns 90 deg, Turns around',
      },
      {
        type: DrillType.Movement,
        description: 'Slide jumps, Turns 90 deg, Turns around',
      },
      {
        type: DrillType.Tracking,
        description: 'Strafing dummy tracking (with strafing)',
      },
      {
        type: DrillType.Tracking,
        description: 'Strafing dummy tracking (with strafing)',
      },
      {
        type: DrillType.Tracking,
        description: 'Strafing dummy tracking (with strafing)',
      },
      {
        type: DrillType.Recoil,
        description:
          'Still dummy (or strafing dummy) recoil ladder (with strafing)',
      },
      {
        type: DrillType.Recoil,
        description:
          'Still dummy (or strafing dummy) recoil ladder (with strafing)',
      },
      {
        type: DrillType.Precision,
        description:
          'Single bullet targets switching close range (with strafing)',
      },
      {
        type: DrillType.Precision,
        description:
          'Single bullet targets switching close range (with strafing)',
      },
    ],
  },
}

export default function MainScreen() {
  const styles = useAppStyles(themedStyles)
  const [durationLevel, setDurationLevel] = useState(DurationLevels.Medium)
  const { bottom } = useSafeAreaInsets()

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: '',
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
                selectedIndex={durationLevel}
                onChange={(event) => {
                  setDurationLevel(event.nativeEvent.selectedSegmentIndex)
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
              <Text style={styles.durationText}>
                {routines[durationLevel].duration}
              </Text>
            </View>
          </>
        }
        data={routines[durationLevel].data}
        renderItem={({ item, index }) => {
          return (
            <Link href="/instructions" asChild>
              <Drill
                {...item}
                hasContinuation={
                  index !== routines[durationLevel].data.length - 1
                }
                interactive
              />
            </Link>
          )
        }}
        contentContainerStyle={{ paddingBottom: bottom + SCREEN_CTA_HEIGHT }}
      />
      <Link href="/routine" asChild>
        <ScreenCTA>START</ScreenCTA>
      </Link>
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
