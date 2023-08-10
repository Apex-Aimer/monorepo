import { useCallback, useMemo, useRef } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ResizeMode, Video } from 'expo-av'
import { useRecoilValue } from 'recoil'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { routineDrill } from '../../store'
import stub from '../../../assets/simple_movement_720p.m4v'
import { CoverIcon } from '../../components/Drill/CoverIcon'
import { DrillType } from '../../routines/routines'

function InstructionVideo() {
  const { width } = useWindowDimensions()

  const videoHeight = useMemo(() => {
    return Math.floor((width / 4) * 3)
  }, [width])

  const styles = useAppStyles(themedStyles)

  return (
    <Video
      style={[styles.video, { height: videoHeight }]}
      source={stub}
      useNativeControls
      resizeMode={ResizeMode.COVER}
      isLooping
      shouldPlay
      // onPlaybackStatusUpdate={status => setStatus(() => status)}
    />
  )
}

const DRILL_TYPE_DESCRIPTION = {
  [DrillType.Movement]: {
    title: 'Movement',
    description: 'Movement drills description...',
  },
  [DrillType.Precision]: {
    title: 'Precision',
    description: 'Precision drills description...',
  },
  [DrillType.Recoil]: {
    title: 'Recoil',
    description: 'Recoil drills description...',
  },
  [DrillType.Tracking]: {
    title: 'Tracking',
    description: 'Tracking drills description...',
  },
}

export default function InstructionsScreen() {
  const styles = useAppStyles(themedStyles)
  const { key: id } = useLocalSearchParams<{ key: string }>()
  const { description, instructions, type } = useRecoilValue(routineDrill(id))
  const drillTypeSheetRef = useRef<BottomSheet>(null)

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        style={styles.sheetBackdrop}
        opacity={1}
      />
    ),
    [styles]
  )

  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={router.back}
              style={styles.backButtonPressable}
            >
              <ChevronLeftIcon
                color={
                  StyleSheet.flatten(styles.backButtonIcon).backgroundColor
                }
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.drillTypeHeaderButton}
              onPress={() => {
                drillTypeSheetRef.current?.expand()
              }}
            >
              <CoverIcon type={type} size={30} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.bg}>
        <InstructionVideo />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{description}</Text>
        </View>
        {/* TODO: process markdown  */}
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{instructions.raw}</Text>
        </View>
      </View>
      <BottomSheet
        ref={drillTypeSheetRef}
        index={-1}
        snapPoints={['50%']}
        enablePanDownToClose
        onClose={() => {
          drillTypeSheetRef.current?.close()
        }}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.sheet}
      >
        <View style={styles.sheetTitleContainer}>
          <CoverIcon type={type} size={40} />
          <Text style={styles.sheetTitleText}>
            {DRILL_TYPE_DESCRIPTION[type].title}
          </Text>
        </View>
        <View style={styles.sheetContentContainer}>
          <Text style={styles.sheetContentText}>
            {DRILL_TYPE_DESCRIPTION[type].description}
          </Text>
        </View>
      </BottomSheet>
    </>
  )
}

const themedStyles = AppStyleSheet.create({
  bg: {
    backgroundColor: 'bg',
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  title: {
    color: 'text primary',
    fontFamily: 'rubik 700',
    fontSize: 24,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  content: {
    backgroundColor: 'bg',
    color: 'text primary',
    fontFamily: 'rubik 400',
    fontSize: 16,
    lineHeight: 22,
  },
  video: {
    backgroundColor: 'text primary',
  },
  backButtonPressable: {
    marginLeft: -15,
    paddingHorizontal: 5,
  },
  backButtonIcon: {
    backgroundColor: 'icon primary',
  },
  drillTypeHeaderButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -15,
    paddingHorizontal: 5,
  },
  sheet: {
    backgroundColor: 'bg',
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'backdrop',
  },
  sheetTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  sheetTitleText: {
    color: 'text primary',
    fontSize: 20,
    fontFamily: 'rubik 700',
    marginLeft: 15,
  },
  sheetContentContainer: {
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  sheetContentText: {
    color: 'text primary',
    fontSize: 16,
    fontFamily: 'rubik 500',
  },
})
