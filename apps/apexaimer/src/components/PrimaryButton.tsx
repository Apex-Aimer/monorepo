import { PropsWithChildren } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AppStyleSheet, useAppStyles } from './useAppStyles'
import { useThemeColors } from './ThemeProvider'

interface Props extends PropsWithChildren {
  onPress?(): void
}

export function PrimaryButton({ children, onPress }: Props) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={theme['primary gradient'] as string[]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.wrapper}
      >
        {typeof children === 'string' ? (
          <Text style={styles.label}>{children}</Text>
        ) : (
          children
        )}
      </LinearGradient>
    </TouchableOpacity>
  )
}

const themedStyles = AppStyleSheet.create({
  wrapper: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 15,
  },
  label: {
    fontFamily: 'rubik mono one',
    fontSize: 16,
    letterSpacing: 0.8,
    color: 'icon primary',
  },
})

export const PRIMARY_BUTTON_HEIGHT =
  themedStyles.light.wrapper.paddingVertical * 2 +
  themedStyles.light.label.fontSize
