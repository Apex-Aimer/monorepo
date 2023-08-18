import { StyleSheet, TouchableOpacity } from 'react-native'
import { AppStyleSheet, useAppStyles } from './useAppStyles'
import { router } from 'expo-router'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'

type HeaderButtonProps = {
  /**
   * Tint color for the header.
   */
  tintColor?: string
  /**
   * Whether it's possible to navigate back in stack.
   */
  canGoBack: boolean
}

export type HeaderBackButtonProps = HeaderButtonProps & {
  /**
   * Label text for the button. Usually the title of the previous screen.
   * By default, this is only shown on iOS.
   */
  label?: string
}

export function HeaderBackButton({ tintColor }: HeaderBackButtonProps) {
  const styles = useAppStyles(themedStyles)

  return (
    <TouchableOpacity onPress={router.back} style={styles.backButtonPressable}>
      <ChevronLeftIcon
        color={
          tintColor || StyleSheet.flatten(styles.backButtonIcon).backgroundColor
        }
      />
    </TouchableOpacity>
  )
}

export const headerLeft = (props: HeaderBackButtonProps) => (
  <HeaderBackButton {...props} />
)

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
