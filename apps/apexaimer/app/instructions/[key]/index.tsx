import { RefObject, Suspense, useCallback, useRef } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useRecoilValue } from 'recoil'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import Markdown from 'react-native-simple-markdown-updated-dependencies'
import { Portal } from '@gorhom/portal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { routineDrill } from '../../store'
import { CoverIcon } from '../../components/Drill/CoverIcon'
import { headerLeft } from '../../components/HeaderBackButton'
import { InstructionVideo } from '../../components/InstructionVideo'
import { Button } from '../../components/Button'
import { ModificationBadge } from '../../components/ModificationBadge'
import { DrillType } from '../../routines/processing'
import { RAMPStage } from '../../routines/types'

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

function Instructions({ id }: { id: string }) {
  const styles = useAppStyles(themedStyles)
  const { description, instructions, videoUri, thumbnail, modifications } =
    useRecoilValue(routineDrill(id))
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <InstructionVideo uri={videoUri} thumbnail={thumbnail} />
      <ScrollView contentContainerStyle={{ paddingBottom: bottom }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{description}</Text>
        </View>
        {modifications.length > 0 && (
          <View style={styles.modificationsContainer}>
            {modifications.map((mod) => (
              <TouchableOpacity key={mod}>
                <ModificationBadge size="mid" variation="solid">
                  {mod}
                </ModificationBadge>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.contentContainer}>
          <Markdown styles={styles}>{instructions}</Markdown>
        </View>
      </ScrollView>
    </View>
  )
}

function TypeButton({
  sheetRef,
  id,
}: {
  sheetRef: RefObject<BottomSheet>
  id: string
}) {
  const styles = useAppStyles(themedStyles)
  const { type } = useRecoilValue(routineDrill(id))
  return (
    <Button
      style={styles.drillTypeHeaderButton}
      onPress={() => {
        sheetRef.current?.expand()
      }}
      haptic="selection"
    >
      <CoverIcon type={type} size={30} />
    </Button>
  )
}

export default function InstructionsScreen() {
  const styles = useAppStyles(themedStyles)
  const { key: id, stage } = useLocalSearchParams<{
    key: string
    stage: RAMPStage
  }>()
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
            <Suspense fallback={null}>
              <TypeButton id={id} sheetRef={drillTypeSheetRef} />
            </Suspense>
          ),
          contentStyle: styles.bg,
          headerTintColor: styles.tint.backgroundColor as string,
        }}
      />
      <Suspense fallback={null}>
        <Instructions id={id} />
      </Suspense>
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
          handleIndicatorStyle={styles.sheetHandleIndicatorStyle}
        >
          {/* <View style={styles.sheetTitleContainer}>
            <CoverIcon type={type} size={40} />
            <Text style={styles.sheetTitleText}>
              {DRILL_TYPE_DESCRIPTION[type].title}
            </Text>
          </View>
          <View style={styles.sheetContentContainer}>
            <Text style={styles.sheetContentText}>
              {DRILL_TYPE_DESCRIPTION[type].description}
            </Text>
          </View> */}
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
    paddingTop: 20,
  },
  modificationsContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  title: {
    color: 'text primary',
    fontFamily: 'rubik 700',
    fontSize: 24,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  // --- markdown styles ---
  'heading 2': {
    color: 'text primary',
    fontFamily: 'rubik 500',
    fontSize: 18,
    lineHeight: 24,
    paddingTop: 10,
  },
  text: {
    color: 'text primary',
    fontFamily: 'rubik 400',
    fontSize: 16,
    lineHeight: 25,
  },
  paragraph: {
    paddingTop: 10,
  },
  br: {
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    color: 'text primary',
    paddingTop: 10,
  },
  listItemNumber: {
    fontWeight: 'bold',
    color: 'text primary',
    paddingTop: 3,
    paddingRight: 5,
  },
  listItemBullet: {
    fontWeight: 'bold',
    color: 'text primary',
    paddingTop: 2,
    paddingRight: 5,
  },
  listItemText: {
    color: 'text primary',
  },
  // --- end of markdown styles ---
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
  sheetHandleIndicatorStyle: {
    backgroundColor: 'line',
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
