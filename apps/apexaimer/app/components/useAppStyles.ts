import { ImageStyle, TextStyle, ViewStyle, useColorScheme } from 'react-native'
import {
  ColorsPalette,
  darkTheme,
  lightTheme,
  useAppColorScheme,
} from './ThemeProvider'
import { Fonts } from './FontsProvider'

interface AppViewStyle extends ViewStyle {
  backgroundColor?: keyof ColorsPalette
  borderColor?: keyof ColorsPalette
  shadowColor?: keyof ColorsPalette
}

interface AppTextStyle extends TextStyle {
  color?: keyof ColorsPalette
  fontFamily?: keyof typeof Fonts
}

type NamedStyles<T> = {
  [P in keyof T]: AppViewStyle | AppTextStyle | ImageStyle
}

const AppStyleSheetProcessor = {
  backgroundColor(value: string, colors: ColorsPalette) {
    return colors[value] ?? value
  },
  color(value: string, colors: ColorsPalette) {
    return colors[value] ?? value
  },
  borderColor(value: string, colors: ColorsPalette) {
    return colors[value] ?? value
  },
  shadowColor(value: string, colors: ColorsPalette) {
    return colors[value] ?? value
  },
  fontFamily(value: string) {
    return Fonts[value]
  },
}

function process<T extends NamedStyles<T> | NamedStyles<any>>(
  styles: T | NamedStyles<T>,
  theme: ColorsPalette
) {
  const str = JSON.stringify(styles)

  const processed = str.replace(processorRegExp, (_match, property, value) => {
    return `"${property}": "${
      AppStyleSheetProcessor[property]?.(value, theme) ?? value
    }"`
  })

  return JSON.parse(processed)
}

export const AppStyleSheet = {
  create<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>
  ): { light: T; dark: T } {
    let light = null
    let dark = null
    return {
      get light() {
        if (light == null) {
          light = process(styles, lightTheme)
        }
        return light
      },
      get dark() {
        if (dark == null) {
          dark = process(styles, darkTheme)
        }
        return dark
      },
    }
  },
}

const processorRegExp = new RegExp(
  `(?:'|")(${Object.keys(AppStyleSheetProcessor).join(
    '|'
  )})(?:'|"):\s*(?:'|")([^"]*)(?:'|")`,
  'ig'
)

export function useAppStyles<
  T extends NamedStyles<T> | NamedStyles<any>
>(styles: {
  light: T
  dark: T
}): {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle
} {
  const colorScheme = useAppColorScheme()

  return colorScheme === 'light' ? styles.light : styles.dark
}
