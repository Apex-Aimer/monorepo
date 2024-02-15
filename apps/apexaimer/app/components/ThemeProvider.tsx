import { createContext, useContext } from 'react'
import { ColorValue, useColorScheme } from 'react-native'
import { atom, useRecoilValue } from 'recoil'
import { preferredAppColorScheme } from '../store'

const toFixed = (valueArg: string | number, digits: number = 1): string => {
  let value = valueArg
  value = value.toString()
  while (value.length < digits) value = `0${value}`
  return value
}

export const colorWithOpacity = (color: string, opacity = 1) =>
  color.slice(0, 7) + toFixed(Math.round(opacity * 0xff).toString(16), 2)

interface ThemedColorsPalette {
  bg: ColorValue
  'bg inverted': ColorValue
  'bg accent': ColorValue
  'bg accent inverted': ColorValue
  backdrop: ColorValue
  line: ColorValue
  'line disabled': ColorValue
  'text primary': ColorValue
  'text primary inverted': ColorValue
  movement: ColorValue
  tracking: ColorValue
  recoil: ColorValue
  precision: ColorValue
  'neutral drill': ColorValue
  'exercise item gradient': [ColorValue, ColorValue]
  'exercise item gradient inactive': [ColorValue, ColorValue]
  'exercise card gradient': [ColorValue, ColorValue]
  'paywall plan active accent gradient': [ColorValue, ColorValue]
  'paywall plan active gradient': [ColorValue, ColorValue]
  'paywall plan not-active gradient': [ColorValue, ColorValue]
  'paywall plan not-active stroke gradient': [ColorValue, ColorValue]
  'paywall plan active badge gradient': [ColorValue, ColorValue]
  'paywall plan not-active badge': ColorValue
  'paywall bg gradient': [ColorValue, ColorValue]
  'paywall header cover gradient': [ColorValue, ColorValue]
  'profile paywall stroke gradient': [ColorValue, ColorValue]
  'profile paywall bg gradient': [ColorValue, ColorValue]
  'profile paywall bg': ColorValue
  'profile paywall restore': ColorValue
  'range badge': ColorValue
  'player movement badge': ColorValue
  'dummy movement badge': ColorValue
  'critical hit badge': ColorValue
}

interface StaticColorsPalette {
  'primary gradient': [ColorValue, ColorValue]
  'accent primary': ColorValue
  'accent secondary': ColorValue
  'icon primary': ColorValue
  'icon shadow': ColorValue
  'paywall plan shadow': ColorValue
  'line accent': ColorValue
  'line accent disabled': ColorValue
  'text light': ColorValue
  'text dark': ColorValue
  'paywall accent-primary-circle gradient': [ColorValue, ColorValue]
  'paywall accent-secondary-circle gradient': [ColorValue, ColorValue]
}

export interface ColorsPalette
  extends ThemedColorsPalette,
    StaticColorsPalette {}

const lightColors: ThemedColorsPalette = {
  bg: '#F4F5EF',
  'bg inverted': '#282624',
  'bg accent': '#FFFFFF',
  'bg accent inverted': '#424242',
  'paywall bg gradient': [`rgba(244,245,239,0)`, `rgba(244,245,239,1)`],
  'paywall header cover gradient': [
    `rgba(244,245,239,0)`,
    `rgba(244,245,239,0.2)`,
  ],
  line: '#828282',
  'line disabled': colorWithOpacity('#828282', 0.5),
  'text primary': '#282624',
  'text primary inverted': '#FFFFFF',
  movement: '#D2A8FD',
  tracking: '#A8CAFD',
  recoil: '#FDD6A8',
  precision: '#FFA3A9',
  'neutral drill': colorWithOpacity('#F4F5EF', 0.8),
  'exercise item gradient': ['#FFFFFF', colorWithOpacity('#FFFFFF', 0)],
  'exercise item gradient inactive': [
    colorWithOpacity('#FFFFFF', 0.3),
    colorWithOpacity('#FFFFFF', 0),
  ],
  'exercise card gradient': ['#FFFFFF', colorWithOpacity('#FFFFFF', 0.5)],
  backdrop: colorWithOpacity('#282624', 0.4),
  'range badge': '#E4BE83',
  'player movement badge': '#AD9EDE',
  'dummy movement badge': '#ADCF93',
  'critical hit badge': '#979797',
  'paywall plan active accent gradient': [
    `rgba(255,189,112,0.2)`,
    `rgba(255,189,112,0.1)`,
  ],
  'paywall plan active gradient': [
    `rgba(255,255,255,0.7)`,
    `rgba(255,255,255,0.5)`,
  ],
  'paywall plan not-active gradient': [
    `rgba(255,255,255,0.85)`,
    `rgba(255,255,255,0.65)`,
  ],
  'paywall plan not-active stroke gradient': [
    `rgba(255,255,255,1)`,
    `rgba(255,255,255,0.7)`,
  ],
  'paywall plan active badge gradient': ['#FF810D', '#FF9204'],
  'paywall plan not-active badge': colorWithOpacity('#FDD6A8', 0.6),
  'profile paywall stroke gradient': ['#FF5722', '#FF9800'],
  'profile paywall bg gradient': [
    `rgba(255,255,255,0.7)`,
    `rgba(255,255,255,0.5)`,
  ],
  'profile paywall bg': `rgba(253,214,168,0.3)`,
  'profile paywall restore': '#FF9800',
}

const darkColors: ThemedColorsPalette = {
  bg: '#282624',
  'bg inverted': '#F4F5EF',
  'bg accent': '#424242',
  'bg accent inverted': '#FFFFFF',
  'paywall bg gradient': [`rgba(40,38,36,0)`, `rgba(40,38,36,1)`],
  'paywall header cover gradient': [`rgba(40,38,36,0)`, `rgba(40,38,36,1)`],
  line: '#D0C9C9',
  'line disabled': colorWithOpacity('#D0C9C9', 0.5),
  'text primary': '#FFFFFF',
  'text primary inverted': '#282624',
  movement: '#B670FF',
  tracking: '#75ACFF',
  recoil: '#FFBD70',
  precision: '#FF737C',
  'neutral drill': colorWithOpacity('#282624', 0.8),
  'exercise item gradient': ['#424242', colorWithOpacity('#424242', 0)],
  'exercise item gradient inactive': [
    colorWithOpacity('#424242', 0.3),
    colorWithOpacity('#424242', 0),
  ],
  'exercise card gradient': ['#424242', colorWithOpacity('#424242', 0.5)],
  backdrop: colorWithOpacity('#000000', 0.4),
  'range badge': '#F5E7D2',
  'player movement badge': '#D6D2E3',
  'dummy movement badge': '#E0E9D9',
  'critical hit badge': '#FFFFFF',
  'paywall plan active accent gradient': [
    `rgba(255,189,112,0.5)`,
    `rgba(255,189,112,0.2)`,
  ],
  'paywall plan active gradient': [
    `rgba(255,255,255,0)`,
    `rgba(255,255,255,0)`,
  ],
  'paywall plan not-active gradient': [
    `rgba(244,245,239,0.25)`,
    `rgba(244,245,239,0.15)`,
  ],
  'paywall plan not-active stroke gradient': [
    `rgba(255,255,255,0)`,
    `rgba(255,255,255,0)`,
  ],
  'paywall plan active badge gradient': ['#FF810D', '#FF9204'],
  'paywall plan not-active badge': colorWithOpacity('#FFBD70', 0.7),
  'profile paywall stroke gradient': ['#FFBD70', '#FFBD70'],
  'profile paywall bg gradient': [`rgba(255,255,255,0)`, `rgba(255,255,255,0)`],
  'profile paywall bg': `rgba(255,255,255,0)`,
  'profile paywall restore': '#D0C9C9',
}

const staticColors: StaticColorsPalette = {
  'primary gradient': ['#FF5722', '#FF9800'],
  'accent primary': '#FF5722',
  'accent secondary': '#FF9800',
  'icon primary': '#FFFFFF',
  'icon shadow': colorWithOpacity('#000000', 0.05),
  'paywall plan shadow': colorWithOpacity('#000000', 0.2),
  'line accent': '#FF5722',
  'line accent disabled': colorWithOpacity('#FF5722', 0.5),
  'text light': '#FFFFFF',
  'text dark': '#282624',
  'paywall accent-primary-circle gradient': [
    `rgba(255,87,34,0.6)`,
    `rgba(255,87,34,0)`,
  ],
  'paywall accent-secondary-circle gradient': [
    `rgba(255,152,0,0.6)`,
    `rgba(255,152,0,0)`,
  ],
}

const defaultColors: ColorsPalette = {
  ...lightColors,
  ...staticColors,
}

export const lightTheme = {
  ...lightColors,
  ...staticColors,
}

export const darkTheme = {
  ...darkColors,
  ...staticColors,
}

export function useAppColorScheme() {
  const appColorScheme = useRecoilValue(preferredAppColorScheme)
  const systemColorScheme = useColorScheme()

  return appColorScheme === 'system' ? systemColorScheme : appColorScheme
}

const ThemeContext = createContext<ColorsPalette>(defaultColors)

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const colorScheme = useAppColorScheme()

  return (
    <ThemeContext.Provider
      value={colorScheme === 'light' ? lightTheme : darkTheme}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeColors() {
  return useContext(ThemeContext)
}

export function hexToRGB(hex: string): { r: number; g: number; b: number } {
  if (!hex.startsWith('#')) {
    throw new Error('Incorrect hex color')
  }
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '')

  // Parse the hex string according to its length
  let r: number, g: number, b: number
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  } else {
    throw new Error('Incorrect hex color')
  }

  return { r, g, b }
}
