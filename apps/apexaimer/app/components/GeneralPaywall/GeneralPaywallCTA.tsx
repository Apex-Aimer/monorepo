import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { ArrowRightIcon } from 'react-native-heroicons/solid'

import {
  ColorsPalette,
  colorWithOpacity,
  useThemeColors,
} from '../ThemeProvider'
import { AppStyleSheet, useAppStyles } from '../useAppStyles'
import { Button } from '../Button'

interface Props {
  onBack(): void
}

export function GeneralPaywallCTA({ onBack }: Props) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()

  return (
    <LinearGradient
      colors={[
        theme['bg'] as string,
        colorWithOpacity(theme['bg'] as string, 0.8),
        colorWithOpacity(theme['bg'] as string, 0),
      ]}
      locations={[0, 0.4, 1]}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      style={[styles.wrapper, { paddingBottom: Math.max(bottom, 30) }]}
      pointerEvents="box-none"
    >
      <LinearGradient
        colors={[
          theme['bg'] as string,
          colorWithOpacity(theme['bg'] as string, 0.8),
          colorWithOpacity(theme['bg'] as string, 0),
        ]}
        locations={[0, 0.3, 1]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.wrapper}
        pointerEvents="box-none"
      />
      <View style={styles.inner}>
        <Button onPress={() => {}} haptic="impactLight">
          <LinearGradient
            colors={theme['primary gradient'] as string[]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.buttonWrapper}
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonContinueLabel}>Continue</Text>
              <Text style={styles.buttonCancelLabel}>Cancel anytime</Text>
            </View>
          </LinearGradient>
        </Button>
        <Button style={styles.backButton} haptic="selection" onPress={onBack}>
          <ArrowRightIcon
            size={16}
            color={theme['line']}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
          <Text style={styles.backButtonLabel}>Back</Text>
        </Button>
      </View>
    </LinearGradient>
  )
}

const themedStyles = AppStyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 10,
    paddingTop: 60,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
  },
  buttonWrapper: {
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 150,
    alignItems: 'center',
  },
  buttonInner: {
    flexDirection: 'column',
    gap: 3,
    alignItems: 'center',
  },
  buttonContinueLabel: {
    fontFamily: 'rubik 600',
    fontSize: 18,
    color: 'text light',
  },
  buttonCancelLabel: {
    fontFamily: 'rubik 600',
    fontSize: 11,
    color: colorWithOpacity('#FFFFFF', 0.7) as keyof ColorsPalette,
  },
  backButton: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 6,
  },
  backButtonLabel: {
    fontFamily: 'rubik 600',
    fontSize: 14,
    color: 'line',
  },
})

export const GENERAL_PAYWALL_CTA_HEIGHT =
  themedStyles.light.wrapper.paddingTop +
  themedStyles.light.inner.gap +
  themedStyles.light.buttonWrapper.paddingVertical * 2 +
  themedStyles.light.buttonInner.gap +
  themedStyles.light.buttonCancelLabel.fontSize +
  themedStyles.light.buttonContinueLabel.fontSize
