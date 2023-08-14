import { StyleSheet, TouchableOpacity } from 'react-native'
import { AppStyleSheet, useAppStyles } from './useAppStyles'
import { router } from 'expo-router'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'

export function HeaderBackButton() {
  const styles = useAppStyles(themedStyles)

  return (
    <TouchableOpacity onPress={router.back} style={styles.backButtonPressable}>
      <ChevronLeftIcon
        color={StyleSheet.flatten(styles.backButtonIcon).backgroundColor}
      />
    </TouchableOpacity>
  )
}

export function HeaderBackButtonThemed() {
  const styles = useAppStyles(themedStyles)

  return (
    <TouchableOpacity onPress={router.back} style={styles.backButtonPressable}>
      <ChevronLeftIcon
        color={StyleSheet.flatten(styles.backButtonThemed).backgroundColor}
      />
    </TouchableOpacity>
  )
}

export const headerLeft = () => <HeaderBackButton />
export const headerLeftThemed = () => <HeaderBackButtonThemed />

const themedStyles = AppStyleSheet.create({
  backButtonPressable: {
    marginLeft: -15,
    paddingHorizontal: 5,
  },
  backButtonIcon: {
    backgroundColor: 'icon primary',
  },
  backButtonThemed: {
    backgroundColor: 'bg accent inverted',
  },
})
