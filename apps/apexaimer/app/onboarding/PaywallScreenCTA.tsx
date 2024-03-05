import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { useRecoilState } from 'recoil'
import {
  requestTrackingPermissionsAsync,
  PermissionStatus,
} from 'expo-tracking-transparency'
import { Settings as FBSDKSettings } from 'react-native-fbsdk-next'

import {
  ColorsPalette,
  colorWithOpacity,
  useThemeColors,
} from '../components/ThemeProvider'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { busyPaying } from '../components/GeneralPaywall/store'
import { Button } from '../components/Button'
import { InAppSubscriptionsService } from '../components/InAppSubscriptions/InAppSubscriptionsService'
import { useCallback } from 'react'
import { useRouter } from 'expo-router'

interface Props {
  isFree: boolean
  currentProductId: string
}

export function PaywallScreenCTA({ isFree, currentProductId }: Props) {
  const theme = useThemeColors()
  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()
  const [isBusyPaying, setBusyPaying] = useRecoilState(busyPaying)

  const router = useRouter()

  const pay = useCallback(async () => {
    try {
      setBusyPaying(true)
      await InAppSubscriptionsService.sharedInstance.buyPremium(
        currentProductId
      )

      router.replace('/')
    } catch {
      // no-op
    } finally {
      setBusyPaying(false)
    }
  }, [currentProductId, router, setBusyPaying])

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
      <Button
        disabled={isBusyPaying}
        onPress={async () => {
          if (isFree) {
            const { status } = await requestTrackingPermissionsAsync()

            if (
              status === PermissionStatus.GRANTED ||
              status === PermissionStatus.UNDETERMINED
            ) {
              await FBSDKSettings.setAdvertiserTrackingEnabled(true)
              // await FBSDKSettings.setAdvertiserIDCollectionEnabled(true)
            }

            router.replace('/')

            return
          }

          pay()
        }}
        haptic="impactLight"
        style={styles.button}
      >
        <LinearGradient
          colors={theme['primary gradient'] as string[]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.buttonWrapper}
        >
          {isFree ? (
            <Text style={styles.buttonFreeLabel}>Begin</Text>
          ) : (
            <View
              style={[
                styles.buttonInner,
                isBusyPaying && styles.buttonInnerBusy,
              ]}
            >
              <Text style={styles.buttonContinueLabel}>Subscribe & Begin</Text>
              <Text style={styles.buttonCancelLabel}>Cancel anytime</Text>
            </View>
          )}
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
  buttonWrapper: {
    borderRadius: 20,
    minWidth: 256,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { alignItems: 'center' },
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
    fontSize: 16,
    color: 'text light',
  },
  buttonCancelLabel: {
    fontFamily: 'rubik 600',
    fontSize: 11,
    color: colorWithOpacity('#FFFFFF', 0.7) as keyof ColorsPalette,
  },
  buttonFreeLabel: {
    fontFamily: 'rubik mono one',
    fontSize: 16,
    letterSpacing: 0.8,
    color: 'icon primary',
  },
})

export const PAYWALL_CTA_HEIGHT =
  themedStyles.light.wrapper.paddingTop +
  themedStyles.light.buttonWrapper.height
