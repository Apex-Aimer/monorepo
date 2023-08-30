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
  'line accent': ColorValue
  'line accent disabled': ColorValue
  'text dark': ColorValue
}

export interface ColorsPalette
  extends ThemedColorsPalette,
    StaticColorsPalette {}

const lightColors: ThemedColorsPalette = {
  bg: '#F4F5EF',
  'bg accent': '#FFFFFF',
  'bg accent inverted': '#424242',
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
}

const darkColors: ThemedColorsPalette = {
  bg: '#282624',
  'bg accent': '#424242',
  'bg accent inverted': '#FFFFFF',
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
}

const staticColors: StaticColorsPalette = {
  'primary gradient': ['#FF5722', '#FF9800'],
  'accent primary': '#FF5722',
  'accent secondary': '#FF9800',
  'icon primary': '#FFFFFF',
  'icon shadow': colorWithOpacity('#000000', 0.05),
  'line accent': '#FF5722',
  'line accent disabled': colorWithOpacity('#FF5722', 0.5),
  'text dark': '#282624',
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
