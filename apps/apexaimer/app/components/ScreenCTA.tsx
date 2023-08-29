import { PropsWithChildren, forwardRef } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AppStyleSheet, useAppStyles } from './useAppStyles'
import { colorWithOpacity, useThemeColors } from './ThemeProvider'
import { PRIMARY_BUTTON_HEIGHT, PrimaryButton } from './PrimaryButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props extends PropsWithChildren {
  onPress?(): void
}

export const ScreenCTA = forwardRef<TouchableOpacity, Props>(function ScreenCTA(
  props,
  ref
) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()

  return (
    <LinearGradient
      colors={[
        theme['bg'] as string,
        colorWithOpacity(theme['bg'] as string, 0.8),
        colorWithOpacity(theme['bg'] as string, 0),
      ]}
      locations={[0, 0.4, 1]}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      style={[styles.wrapper, { paddingBottom: Math.max(bottom, 30) }]}
      pointerEvents="box-none"
    >
      <LinearGradient
        colors={[
          theme['bg'] as string,
          colorWithOpacity(theme['bg'] as string, 0.8),
          colorWithOpacity(theme['bg'] as string, 0),
        ]}
        locations={[0, 0.4, 1]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.wrapper}
        pointerEvents="box-none"
      />
      <View style={styles.inner}>
        <PrimaryButton ref={ref} {...props} />
      </View>
    </LinearGradient>
  )
})

const themedStyles = AppStyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 10,
    paddingTop: 60,
  },
  inner: {
    alignItems: 'center',
  },
})

export const SCREEN_CTA_HEIGHT =
  themedStyles.light.wrapper.paddingTop + PRIMARY_BUTTON_HEIGHT
