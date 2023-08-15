import { StatusBar } from 'expo-status-bar'
import { useAppColorScheme } from './ThemeProvider'

export function ThemedStatusBar() {
  const colorScheme = useAppColorScheme()

  return <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
}
