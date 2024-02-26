import { useMemo } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'

import { useThemeColors } from '../ThemeProvider'
import { useAppStyles } from '../useAppStyles'
import {
  BackdropBlur,
  Canvas,
  Circle,
  LinearGradient,
  RadialGradient,
  Rect,
  RoundedRect,
  vec,
} from '@shopify/react-native-skia'
import { PAYWALL_HORIZONTAL_PADDING, themedStyles } from './PaywallPlan.styles'

export function PlanDecorations({ active }: { active: boolean }) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)
  const { width: screenWidth } = useWindowDimensions()

  const width = useMemo(
    () => screenWidth - PAYWALL_HORIZONTAL_PADDING * 2,
    [screenWidth]
  )

  const height = useMemo(
    () => StyleSheet.flatten(styles.plan).height as number,
    [styles.plan]
  )
  const circleR = (1.25 * height) / 2

  return (
    <Canvas
      style={[
        StyleSheet.absoluteFillObject,
        { borderRadius: 20, overflow: 'hidden' },
      ]}
    >
      <Circle
        cx={width * 0.3}
        cy={height * 0.47}
        r={circleR}
        transform={[{ scaleX: 2.08 }, { translateX: -circleR }]}
        opacity={0.5}
      >
        <RadialGradient
          c={vec(width * 0.3, height * 0.47)}
          r={circleR}
          colors={theme['paywall accent-primary-circle gradient'] as string[]}
        />
      </Circle>
      <Circle
        cx={width * 0.47}
        cy={height * 0.55}
        r={circleR}
        transform={[{ scaleX: 2.08 }, { translateX: -circleR }]}
        opacity={0.5}
      >
        <RadialGradient
          c={vec(width * 0.47, height * 0.55)}
          r={circleR}
          colors={theme['paywall accent-secondary-circle gradient'] as string[]}
        />
      </Circle>
      {!active && (
        <BackdropBlur blur={40} clip={{ x: 0, y: 0, width, height }}>
          <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, height)}
              colors={theme['paywall plan not-active gradient'] as string[]}
            />
          </Rect>
        </BackdropBlur>
      )}
      {active && (
        <BackdropBlur blur={40} clip={{ x: 0, y: 0, width, height }}>
          <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, height)}
              colors={theme['paywall plan active gradient'] as string[]}
            />
          </Rect>
          <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, height)}
              colors={theme['paywall plan active accent gradient'] as string[]}
            />
          </Rect>
        </BackdropBlur>
      )}
      {active && (
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          style="stroke"
          strokeWidth={4}
          r={20}
        >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={theme['primary gradient'] as string[]}
          />
        </RoundedRect>
      )}
      {!active && (
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          style="stroke"
          strokeWidth={2}
          r={20}
        >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={
              theme['paywall plan not-active stroke gradient'] as string[]
            }
          />
        </RoundedRect>
      )}
    </Canvas>
  )
}
