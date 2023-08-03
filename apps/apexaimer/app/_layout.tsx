import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

import { Slot, Stack } from 'expo-router'
import { ThemeProvider, useThemeColors } from '../src/components/ThemeProvider'
import { FontsProvider } from '../src/components/FontsProvider'
import { PropsWithChildren } from 'react'

function BG({ children }: PropsWithChildren) {
  const theme = useThemeColors()
  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>{children}</View>
  )
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <FontsProvider>
        <ThemeProvider>
          <BG>
            <Stack />
          </BG>
        </ThemeProvider>
      </FontsProvider>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
