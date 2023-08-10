import MaskedView from '@react-native-masked-view/masked-view'
import { AppStyleSheet, useAppStyles } from './useAppStyles'
import { StyleSheet, Text, TextStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { PropsWithChildren } from 'react'
import { useThemeColors } from './ThemeProvider'

interface Props extends PropsWithChildren {
  style?: TextStyle
}

export function PrimaryGradientText({ style, children }: Props) {
  const theme = useThemeColors()
  return (
    <MaskedView maskElement={<Text style={style}>{children}</Text>}>
      <Text style={style}>{children}</Text>
      <LinearGradient
        colors={theme['primary gradient'] as string[]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
    </MaskedView>
  )
}

const themedStyles = AppStyleSheet.create({})
