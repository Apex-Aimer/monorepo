import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
  Rubik_900Black,
} from '@expo-google-fonts/rubik'
import { RubikMonoOne_400Regular } from '@expo-google-fonts/rubik-mono-one'
import { PropsWithChildren } from 'react'

export const Fonts = {
  'rubik 300': 'Rubik_300Light',
  'rubik 400': 'Rubik_400Regular',
  'rubik 500': 'Rubik_500Medium',
  'rubik 600': 'Rubik_600SemiBold',
  'rubik 700': 'Rubik_700Bold',
  'rubik 800': 'Rubik_800ExtraBold',
  'rubik 900': 'Rubik_900Black',
  'rubik mono one': 'RubikMonoOne_400Regular',
}

export function FontsProvider({ children }: PropsWithChildren) {
  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
    Rubik_900Black,
    RubikMonoOne_400Regular,
  })

  if (!fontsLoaded) {
    return null
  }

  return children
}
