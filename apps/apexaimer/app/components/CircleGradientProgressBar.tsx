import React, { PropsWithChildren } from 'react'
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient as SVGLinearGradient,
  Stop,
} from 'react-native-svg'
import { colorWithOpacity, useThemeColors } from './ThemeProvider'
import Animated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface ICircleGradientProgressBar {
  size?: number
  borderWidth?: number
  steps: number
  backgroundOpacity?: number
  withBackground?: boolean
  step: SharedValue<number>
}

export const AnimatedCircleGradientProgressBar = ({
  size = 30,
  borderWidth = 3,
  step,
  steps = 100,
}: PropsWithChildren<ICircleGradientProgressBar>) => {
  const radius = size / 2 - borderWidth / 2
  const circumference = 2 * Math.PI * radius

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      ((100 - (step.value * 100) / steps) / 100) * circumference,
  }))

  const theme = useThemeColors()

  const inactiveBorderColor = colorWithOpacity(theme['line'] as string, 0.2)
  const activeBorderColors = theme['primary gradient']

  return (
    <Svg width={size} height={size}>
      <G rotation="-90" originX={size / 2} originY={size / 2}>
        <Defs>
          <SVGLinearGradient id="Gradient" x1="0" x2="0" y1="0" y2="1">
            <Stop
              offset="0"
              stopColor={activeBorderColors[0]}
              stopOpacity="1"
            />
            <Stop
              offset="1"
              stopColor={activeBorderColors[1]}
              stopOpacity="1"
            />
          </SVGLinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#Gradient)"
          strokeWidth={borderWidth}
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="white"
          strokeWidth={borderWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={inactiveBorderColor}
          strokeWidth={borderWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
        />
      </G>
    </Svg>
  )
}
