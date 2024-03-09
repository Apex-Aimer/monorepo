import { ActivityIndicator, StyleSheet, Text, View, Alert } from 'react-native'
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
import { InAppSubscriptionsService } from '../InAppSubscriptions/InAppSubscriptionsService'
import { useRecoilState } from 'recoil'
import { busyPaying } from './store'
import { noop } from 'lodash'

interface Props {
  currentProductId: string
  onBack(): void
}

export function GeneralPaywallCTA({ currentProductId, onBack }: Props) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()
  const [isBusyPaying, setBusyPaying] = useRecoilState(busyPaying)

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
        <Button
          disabled={isBusyPaying}
          onPress={async () => {
            try {
              setBusyPaying(true)

              if (
                await InAppSubscriptionsService.sharedInstance.buyPremium(
                  currentProductId
                )
              ) {
                /**
                 * Wait a bit for event listener in `InAppSubscriptionsComp.tsx` to handle a purchase
                 */
                await new Promise((r) => setTimeout(r, 200))
                onBack()
              }
            } catch {
              // no-op
              Alert.alert(
                'Purchase is unavailable',
                'Sorry, the purchase is unavailable for an unknown reason - Please try again later'
              )
            } finally {
              setBusyPaying(false)
            }
          }}
          haptic="impactLight"
        >
          <LinearGradient
            colors={theme['primary gradient'] as string[]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.buttonWrapper}
          >
            <View
              style={[
                styles.buttonInner,
                isBusyPaying && styles.buttonInnerBusy,
              ]}
            >
              <Text style={styles.buttonContinueLabel}>Continue</Text>
              <Text style={styles.buttonCancelLabel}>Cancel anytime</Text>
            </View>
            {isBusyPaying && (
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  styles.buttonInnerIndicatorWrapper,
                ]}
              >
                <ActivityIndicator
                  color={styles.buttonInnerIndicator.backgroundColor}
                />
              </View>
            )}
          </LinearGradient>
        </Button>
        <Button
          style={[styles.backButton, isBusyPaying && styles.backButtonBusy]}
          disabled={isBusyPaying}
          haptic="selection"
          onPress={isBusyPaying ? noop : onBack}
        >
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
  buttonInnerBusy: {
    opacity: 0,
  },
  buttonInnerIndicatorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInnerIndicator: {
    backgroundColor: 'text light',
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
  backButtonBusy: {
    opacity: 0.5,
  },
})

export const GENERAL_PAYWALL_CTA_HEIGHT =
  themedStyles.light.wrapper.paddingTop +
  themedStyles.light.inner.gap +
  themedStyles.light.buttonWrapper.paddingVertical * 2 +
  themedStyles.light.buttonInner.gap +
  themedStyles.light.buttonCancelLabel.fontSize +
  themedStyles.light.buttonContinueLabel.fontSize
