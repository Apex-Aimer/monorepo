import { useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Stack } from 'expo-router'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheet,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { headerLeft } from '../../components/HeaderBackButton'
import { SettingsSection } from '../SettingsSection'
import { Select } from '../Select'
import { useRecoilState } from 'recoil'
import { preferredAppColorScheme } from '../../components/ThemeProvider'
import { PrimaryButton } from '../../components/PrimaryButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Portal } from '@gorhom/portal'

function AppearanceBottomSheetContent() {
  const styles = useAppStyles(themedStyles)
  const [appColorScheme, setAppColorScheme] = useRecoilState(
    preferredAppColorScheme
  )

  const { bottom } = useSafeAreaInsets()

  const { close } = useBottomSheet()

  return (
    <View style={styles.appearanceSelectContainer}>
      <Select
        items={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'system', label: 'System' },
        ]}
        initialItem={appColorScheme}
        onChange={setAppColorScheme}
      />
      <View
        style={[styles.appearanceDoneButtonWrapper, { paddingBottom: bottom }]}
      >
        <PrimaryButton onPress={close}>Done</PrimaryButton>
      </View>
    </View>
  )
}

export default function ProfileDetailsScreen() {
  const styles = useAppStyles(themedStyles)

  const drillTypeSheetRef = useRef<BottomSheetModal>(null)

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
          title: 'Settings',
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
              label: 'Appearance',
              icon: { external: false },
              onPress() {
                drillTypeSheetRef.current?.expand()
              },
            },
          ]}
        />
      </View>
      <Portal>
        <BottomSheet
          ref={drillTypeSheetRef}
          index={-1}
          snapPoints={['40%']}
          enablePanDownToClose
          onClose={() => {
            drillTypeSheetRef.current?.close()
          }}
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.sheet}
          handleIndicatorStyle={styles.sheetHandleIndicatorStyle}
        >
          <AppearanceBottomSheetContent />
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
