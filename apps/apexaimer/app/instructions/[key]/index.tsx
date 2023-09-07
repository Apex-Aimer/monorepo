import { RefObject, Suspense, useCallback, useMemo, useRef } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useRecoilValue } from 'recoil'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import Markdown from 'react-native-simple-markdown-updated-dependencies'
import { Portal } from '@gorhom/portal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { routineDrill } from '../../store'
import { CoverIcon } from '../../components/Drill/CoverIcon'
import { headerLeft } from '../../components/HeaderBackButton'
import { InstructionVideo } from '../../components/InstructionVideo'
import { Button } from '../../components/Button'
import {
  ModificationBadge,
  ModificationT,
  getModificationByLabel,
  getModificationByType,
} from '../../components/ModificationBadge'
import { DrillType } from '../../routines/processing'
import { RAMPStage } from '../../routines/types'

const DRILL_TYPE_DESCRIPTION = {
  [DrillType.Movement]: {
    title: 'Movement',
    description: require('./content/movement.md').default,
  },
  [DrillType.Precision]: {
    title: 'Precision',
    description: require('./content/precision.md').default,
  },
  [DrillType.Recoil]: {
    title: 'Recoil',
    description: require('./content/recoil.md').default,
  },
  [DrillType.Tracking]: {
    title: 'Tracking',
    description: require('./content/tracking.md').default,
  },
}

const MODIFICATIONS_ASSETS = {
  'close-range.jpg': require('./mods-assets/close-range.jpg'),
  'customize-range-tab.jpg': require('./mods-assets/customize-range-tab.jpg'),
  'dummy-settings-still.jpg': require('./mods-assets/dummy-settings-still.jpg'),
  'dummy-settings-strafe-constant.jpg': require('./mods-assets/dummy-settings-strafe-constant.jpg'),
  'dummy-settings-strafe-random.jpg': require('./mods-assets/dummy-settings-strafe-random.jpg'),
  'long-range-1.jpg': require('./mods-assets/long-range-1.jpg'),
  'long-range-2.jpg': require('./mods-assets/long-range-2.jpg'),
  'mid-range.jpg': require('./mods-assets/mid-range.jpg'),
  'player-still.jpg': require('./mods-assets/player-still.jpg'),
  'player-strafing.jpg': require('./mods-assets/player-strafing.jpg'),
  'targets-critical-hits.jpg': require('./mods-assets/targets-critical-hits.jpg'),
  'dummy-critical-hits.jpg': require('./mods-assets/dummy-critical-hits.jpg'),
}

const MODIFICATIONS_CONTENT: Record<ModificationT, ImageSourcePropType> = {
  ranges: require('./content/ranges.md').default,
  dummyMovement: require('./content/dummy-movement.md').default,
  playerMovement: require('./content/player-movement.md').default,
  criticals: require('./content/critical-hits.md').default,
}

const getModificationContentByType = getModificationByType(
  MODIFICATIONS_CONTENT
)

function ModsSheetContent({ mod }: { mod: ModificationT }) {
  const styles = useAppStyles(themedStyles)
  const { width } = useWindowDimensions()
  const { bottom } = useSafeAreaInsets()

  const imageCommonStyle = useMemo(
    () => ({
      width:
        width -
        Number(
          StyleSheet.flatten(styles.sheetContentContainer).paddingHorizontal
        ) *
          2,
    }),
    [styles.sheetContentContainer, width]
  )

  return (
    <BottomSheetScrollView
      contentContainerStyle={[
        styles.sheetContentContainer,
        { paddingBottom: bottom },
      ]}
    >
      <Markdown
        styles={styles}
        rules={{
          image: {
            react: (node, output, state) => {
              const { height, width } = Image.resolveAssetSource(
                MODIFICATIONS_ASSETS[node.target]
              )

              return (
                <View key={state.key}>
                  <Image
                    style={[
                      imageCommonStyle,
                      { height: (height / width) * imageCommonStyle.width },
                      styles.image as ImageStyle,
                    ]}
                    alt={node.alt}
                    source={MODIFICATIONS_ASSETS[node.target]}
                    resizeMode="contain"
                  />
                </View>
              )
            },
          },
        }}
      >
        {getModificationContentByType(mod)}
      </Markdown>
    </BottomSheetScrollView>
  )
}

function Instructions({ id }: { id: string }) {
  const styles = useAppStyles(themedStyles)
  const { description, instructions, videoUri, thumbnail, modifications } =
    useRecoilValue(routineDrill(id))
  const { bottom } = useSafeAreaInsets()

  const rangesSheetRef = useRef<BottomSheet>(null)
  const dummyMovementSheetRef = useRef<BottomSheet>(null)
  const playerMovementSheetRef = useRef<BottomSheet>(null)
  const criticalsSheetRef = useRef<BottomSheet>(null)

  const modsSheets: Record<ModificationT, RefObject<BottomSheet>> = {
    ranges: rangesSheetRef,
    dummyMovement: dummyMovementSheetRef,
    playerMovement: playerMovementSheetRef,
    criticals: criticalsSheetRef,
  }

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
      <View style={styles.container}>
        <InstructionVideo uri={videoUri} thumbnail={thumbnail} />
        <ScrollView contentContainerStyle={{ paddingBottom: bottom }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{description}</Text>
          </View>
          {modifications.length > 0 && (
            <View style={styles.modificationsContainer}>
              {modifications.map((modLabel) => (
                <TouchableOpacity
                  key={modLabel}
                  onPress={() => {
                    const mod = getModificationByLabel(modLabel)
                    modsSheets[mod]?.current?.expand()
                  }}
                >
                  <ModificationBadge size="mid" variation="solid">
                    {modLabel}
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
      {modifications.length > 0 &&
        modifications.map((modLabel) => {
          const mod = getModificationByLabel(modLabel)
          return (
            <Portal key={mod}>
              <BottomSheet
                ref={modsSheets[mod]}
                index={-1}
                snapPoints={['50%', '90%']}
                enablePanDownToClose
                onClose={() => {
                  modsSheets[mod]?.current?.close()
                }}
                backdropComponent={renderBackdrop}
                backgroundStyle={styles.sheet}
                handleIndicatorStyle={styles.sheetHandleIndicatorStyle}
              >
                <ModsSheetContent mod={mod} />
              </BottomSheet>
            </Portal>
          )
        })}
    </>
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

function TypeSheetContent({ id }: { id: string }) {
  const styles = useAppStyles(themedStyles)
  const { type } = useRecoilValue(routineDrill(id))

  return (
    <>
      <View style={styles.sheetTitleContainer}>
        <CoverIcon type={type} size={40} />
        <Text style={styles.sheetTitleText}>
          {DRILL_TYPE_DESCRIPTION[type].title}
        </Text>
      </View>
      <View style={styles.sheetContentContainer}>
        <Markdown styles={styles}>
          {DRILL_TYPE_DESCRIPTION[type].description}
        </Markdown>
      </View>
    </>
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
          <TypeSheetContent id={id} />
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
    paddingRight: 15,
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
  image: {
    marginTop: 20,
    borderRadius: 5,
  },
  strong: {
    fontFamily: 'rubik 600',
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
