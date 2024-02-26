import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useDerivedValue, useSharedValue } from 'react-native-reanimated'
import { getAvailablePurchases, getProducts } from 'react-native-iap'
import {
  Canvas,
  LinearGradient,
  Rect,
  RoundedRect,
  vec,
} from '@shopify/react-native-skia'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import { memo, useCallback } from 'react'
import { noop } from 'lodash'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { iapHasPremium, iapRootToken } from '../../createIapStore'
import { useThemeColors } from '../../components/ThemeProvider'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Button } from '../../components/Button'
import { useGeneralPaywallScreen } from '../../components/GeneralPaywall'
import {
  InAppPremiumProducts,
  InAppSubscriptionsService,
} from '../../components/InAppSubscriptions/InAppSubscriptionsService'

const busyRestore = atom({
  key: 'goPremiumBusyRestore',
  default: false,
})

const Underlay = memo(function UnderlayDecoration() {
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
})

export function GoPremium() {
  const styles = useAppStyles(themedStyles)
  const [hasPremium, setHasPremium] = useRecoilState(iapHasPremium)
  const { openPaywall } = useGeneralPaywallScreen()
  const setRootToken = useSetRecoilState(iapRootToken)

  const [isBusy, setBusy] = useRecoilState(busyRestore)

  const onRestore = useCallback(async () => {
    try {
      setBusy(true)

      const isConnected = await InAppSubscriptionsService.sharedInstance
        .connection

      if (!isConnected) {
        return
      }

      await getProducts({
        skus: [
          InAppPremiumProducts.Yearly,
          InAppPremiumProducts.Monthly,
          InAppPremiumProducts.Weekly,
        ],
      })

      const availablePurchases = await getAvailablePurchases({
        onlyIncludeActiveItems: true,
        alsoPublishToEventListener: false,
      })

      if (!availablePurchases.length) {
        Alert.alert(
          'Restore Unsuccessful',
          `We couldn't find any previous purchases`
        )
        return
      }

      const [purchase] = availablePurchases

      const rootToken = Platform.select({
        ios: purchase.originalTransactionIdentifierIOS,
        android: purchase.purchaseToken,
      })

      const hasAccess =
        await InAppSubscriptionsService.sharedInstance.checkServerAccess(
          rootToken
        )

      if (!hasAccess) {
        Alert.alert('Restore Unsuccessful', `Your subscription has expired`)
        return
      }

      setRootToken(rootToken)
      setHasPremium(true)

      Alert.alert('Restore Successful', 'You successfully restored purchase')
    } catch {
      // no-op
    } finally {
      setBusy(false)
    }
  }, [setBusy, setHasPremium, setRootToken])

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
        <PrimaryButton onPress={isBusy ? noop : openPaywall}>
          <View
            style={[
              styles.buttonLabelWrapper,
              isBusy && styles.buttonLabelWrapperBusy,
            ]}
          >
            <Text style={styles.buttonLabel}>Upgrade</Text>
          </View>
          {isBusy && (
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
        </PrimaryButton>
        <View style={styles.textsContainer}>
          <Button
            style={[styles.restoreButton, isBusy && styles.restoreButtonBusy]}
            onPress={onRestore}
            disabled={isBusy}
          >
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
  buttonLabelWrapperBusy: {
    opacity: 0,
  },
  buttonLabel: {
    fontFamily: 'rubik 500',
    fontSize: 18,
    color: 'text light',
  },
  buttonInnerIndicatorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInnerIndicator: {
    backgroundColor: 'text light',
  },
  restoreButton: {
    paddingHorizontal: 20,
  },
  restoreButtonBusy: {
    opacity: 0.5,
  },
  restoreButtonLabel: {
    fontFamily: 'rubik 600',
    fontSize: 14,
    lineHeight: 22,
    color: 'profile paywall restore',
  },
})
