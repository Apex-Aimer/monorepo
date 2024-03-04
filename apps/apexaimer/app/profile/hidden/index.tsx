import { useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheet,
} from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Portal } from '@gorhom/portal'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { headerLeft } from '../../components/HeaderBackButton'
import { SettingsSection } from '../SettingsSection'
import { Select } from '../Select'
import { useRecoilState } from 'recoil'
import { PrimaryButton } from '../../components/PrimaryButton'
import { level as levelSelector } from '../../store'
import { Levels } from '../../routines/levels'

function LevelSelectorBottomSheetContent() {
  const styles = useAppStyles(themedStyles)
  const [level, setLevel] = useRecoilState(levelSelector)

  const { bottom } = useSafeAreaInsets()

  const { close } = useBottomSheet()

  return (
    <View style={styles.appearanceSelectContainer}>
      <Select
        items={[
          { value: Levels.Rookie, label: 'Rookie' },
          { value: Levels.Iron, label: 'Iron' },
          { value: Levels.Bronze, label: 'Bronze' },
          { value: Levels.Silver, label: 'Silver' },
          { value: Levels.Gold, label: 'Gold' },
          { value: Levels.Platinum, label: 'Platinum' },
          { value: Levels.Diamond, label: 'Diamond' },
          { value: Levels.Ascendant, label: 'Ascendant' },
          { value: Levels.Master, label: 'Master' },
          { value: Levels.Predator, label: 'Predator' },
        ]}
        initialItem={level}
        onChange={setLevel}
      />
      <View
        style={[styles.appearanceDoneButtonWrapper, { paddingBottom: bottom }]}
      >
        <PrimaryButton onPress={close}>Done</PrimaryButton>
      </View>
    </View>
  )
}

export default function HiddenSettingsScreen() {
  const styles = useAppStyles(themedStyles)
  const router = useRouter()

  const sheetRef = useRef<BottomSheetModal>(null)

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
      <Stack.Screen
        options={{
          title: 'Advanced',
          headerLeft,
          headerStyle: styles.header as unknown,
          contentStyle: styles.content,
          headerShadowVisible: false,
          headerTintColor: styles.tint.backgroundColor as string,
        }}
      />
      <View style={styles.sectionContainer}>
        <SettingsSection
          rows={[
            {
              label: 'Difficulty level',
              icon: { external: false },
              onPress() {
                sheetRef.current?.expand()
              },
            },
            // eslint-disable-next-line turbo/no-undeclared-env-vars
            process.env.NODE_ENV === 'development' && {
              label: 'Onboarding',
              icon: { external: false },
              onPress() {
                router.push('/onboarding/')
              },
            },
          ]}
        />
      </View>
      <Portal>
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={['40%', '80%']}
          enablePanDownToClose
          onClose={() => {
            sheetRef.current?.close()
          }}
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.sheet}
          handleIndicatorStyle={styles.sheetHandleIndicatorStyle}
        >
          <LevelSelectorBottomSheetContent />
        </BottomSheet>
      </Portal>
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
  sectionContainer: {
    paddingTop: 30,
    paddingHorizontal: 15,
    gap: 10,
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
  appearanceSelectContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  appearanceDoneButtonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})
