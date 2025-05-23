import { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import { PortalProvider } from '@gorhom/portal'
import { Stack } from 'expo-router'
import { RecoilRoot } from 'recoil'

import { ThemeProvider, useThemeColors } from './components/ThemeProvider'
import { FontsProvider } from './components/FontsProvider'
import { ThemedStatusBar } from './components/ThemedStatusBar'
import { InAppSubscriptions } from './components/InAppSubscriptions/InAppSubscriptions'
import { GeneralPaywall } from './components/GeneralPaywall/GeneralPaywallScreenContainer'

function BG({ children }: PropsWithChildren) {
  const theme = useThemeColors()
  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>{children}</View>
  )
}

export default function RootLayout() {
  return (
    <>
      <FontsProvider>
        <RecoilRoot>
          <ThemedStatusBar />
          <ThemeProvider>
            <PortalProvider>
              <BG>
                <Stack />
              </BG>
              <GeneralPaywall />
            </PortalProvider>
          </ThemeProvider>
          <InAppSubscriptions />
        </RecoilRoot>
      </FontsProvider>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
