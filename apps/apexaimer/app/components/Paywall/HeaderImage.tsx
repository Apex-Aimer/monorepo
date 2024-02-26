import { useMemo } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  Canvas,
  useImage,
  Image as SkiaImage,
  Rect,
  RadialGradient,
  vec,
  LinearGradient,
} from '@shopify/react-native-skia'

import { useThemeColors } from '../ThemeProvider'

export function HeaderImage() {
  const theme = useThemeColors()

  const { width } = useWindowDimensions()
  const height = useMemo(() => width / 1.483, [width])

  const image = useImage(require('../../../assets/paywall-header-image.jpg'))

  return (
    <Canvas style={{ width, height, position: 'absolute', top: 0 }}>
      <SkiaImage
        image={image}
        fit="cover"
        x={0}
        y={0}
        width={width}
        height={height}
      />
      <Rect x={0} y={0} width={width} height={height}>
        <RadialGradient
          c={vec(width / 2, height / 2)}
          r={width}
          colors={theme['paywall header cover gradient'] as string[]}
        />
      </Rect>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(width / 2, height * 0.6)}
          end={vec(width / 2, height)}
          positions={[0.3, 1]}
          colors={theme['paywall bg gradient'] as string[]}
        />
      </Rect>
    </Canvas>
  )
}

export function HeaderImageGradient() {
  const theme = useThemeColors()

  const { width } = useWindowDimensions()
  const height = useMemo(() => width / 1.483, [width])

  return (
    <Canvas style={{ width, height }}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(width / 2, height * 0.6)}
          end={vec(width / 2, height)}
          positions={[0.3, 1]}
          colors={theme['paywall bg gradient'] as string[]}
        />
      </Rect>
    </Canvas>
  )
}
