import { useCallback, useMemo, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useRecoilValue } from 'recoil'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { routineDrill } from '../../store'
import { CoverIcon } from '../../components/Drill/CoverIcon'
import { DrillType } from '../../routines/routines'
import { headerLeft } from '../../components/HeaderBackButton'
import { InstructionVideo } from '../../components/InstructionVideo'
import { Portal } from '@gorhom/portal'

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
  const { description, instructions, type, videoUri } = useRecoilValue(
    routineDrill(id)
  )
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
          headerLeft,
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
          contentStyle: styles.bg,
          headerTintColor: styles.tint.backgroundColor as string,
        }}
      />
      <View style={styles.container}>
        <InstructionVideo uri={videoUri} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{description}</Text>
        </View>
        {/* TODO: process markdown  */}
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{instructions.raw}</Text>
        </View>
      </View>
      <Portal>
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
      </Portal>
    </>
  )
}

const themedStyles = AppStyleSheet.create({
  bg: {
    backgroundColor: 'bg',
  },
  container: {
    flex: 1,
  },
  tint: {
    backgroundColor: 'icon primary',
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
    backgroundColor: 'black',
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
