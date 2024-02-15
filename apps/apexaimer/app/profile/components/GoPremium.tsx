import { StyleSheet, Text, View } from 'react-native'
import { useDerivedValue, useSharedValue } from 'react-native-reanimated'
import {
  Canvas,
  LinearGradient,
  Rect,
  RoundedRect,
  vec,
} from '@shopify/react-native-skia'
import { useRecoilValue } from 'recoil'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { iapHasPremium } from '../../createIapStore'
import { useThemeColors } from '../../components/ThemeProvider'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Button } from '../../components/Button'
import { useGeneralPaywallScreen } from '../../components/GeneralPaywall'

function Underlay() {
  const theme = useThemeColors()
  const width = useSharedValue(0)
  const height = useSharedValue(0)

  const gradientEnd = useDerivedValue(() => vec(width.value, height.value))

  return (
    <Canvas
      style={[
        StyleSheet.absoluteFillObject,
        { borderRadius: 20, overflow: 'hidden' },
      ]}
      onLayout={({
        nativeEvent: {
          layout: { width: w, height: h },
        },
      }) => {
        width.value = Math.max(w, 0)
        height.value = Math.max(h, 0)
      }}
    >
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={gradientEnd}
          colors={theme['profile paywall bg gradient'] as string[]}
        />
      </Rect>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={gradientEnd}
          colors={
            [
              theme['profile paywall bg'],
              theme['profile paywall bg'],
            ] as string[]
          }
        />
      </Rect>
      <RoundedRect
        x={0}
        y={0}
        width={width}
        height={height}
        r={20}
        style="stroke"
        strokeWidth={4}
      >
        <LinearGradient
          start={vec(0, 0)}
          end={gradientEnd}
          colors={theme['profile paywall stroke gradient'] as string[]}
        />
      </RoundedRect>
    </Canvas>
  )
}

export function GoPremium() {
  const styles = useAppStyles(themedStyles)
  const hasPremium = useRecoilValue(iapHasPremium)
  const { openPaywall } = useGeneralPaywallScreen()

  if (hasPremium) {
    return null
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Underlay />
        <View style={styles.textsContainer}>
          <Text style={styles.title}>Go Premium</Text>
          <Text style={styles.description}>Enjoy ads-less experience</Text>
        </View>
        <PrimaryButton onPress={openPaywall}>
          <View style={styles.buttonLabelWrapper}>
            <Text style={styles.buttonLabel}>Upgrade</Text>
          </View>
        </PrimaryButton>
        <View style={styles.textsContainer}>
          <Button>
            <Text style={styles.restoreButtonLabel}>Restore purchase</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  wrapper: {
    paddingTop: 30,
    paddingHorizontal: 15,
  },
  container: {
    padding: 20,
    flexDirection: 'column',
    gap: 16,
  },
  textsContainer: {
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontFamily: 'rubik 500',
    fontSize: 22,
    lineHeight: 22,
    color: 'text primary',
  },
  description: {
    fontFamily: 'rubik 300',
    fontSize: 16,
    lineHeight: 22,
    color: 'text primary',
  },
  buttonLabelWrapper: {
    paddingVertical: 6,
  },
  buttonLabel: {
    fontFamily: 'rubik 500',
    fontSize: 18,
    color: 'text light',
  },
  restoreButtonLabel: {
    fontFamily: 'rubik 600',
    fontSize: 14,
    lineHeight: 22,
    color: 'profile paywall restore',
  },
})
