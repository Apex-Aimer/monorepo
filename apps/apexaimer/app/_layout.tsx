import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

import { Stack } from 'expo-router'
import { ThemeProvider, useThemeColors } from './components/ThemeProvider'
import { FontsProvider } from './components/FontsProvider'
import { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'

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
            <RecoilRoot>
              <Stack />
            </RecoilRoot>
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
