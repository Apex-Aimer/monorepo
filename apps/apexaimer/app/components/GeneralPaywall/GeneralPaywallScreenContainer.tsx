import { useEffect, useCallback } from 'react'
import { View, StyleSheet, TextStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { Portal } from '@gorhom/portal'

import { Button } from '../Button'
import { AppStyleSheet, useAppStyles } from '../useAppStyles'
import { isGeneralPaywallShown } from './store'
import { GeneralPaywallScreen } from './GeneralPaywallScreen'

function GeneralPaywallScreenContainer() {
  const { top } = useSafeAreaInsets()
  const styles = useAppStyles(themedStyles)
  const setIsPaywallShown = useSetRecoilState(isGeneralPaywallShown)

  const opacity = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const onClose = useCallback(() => {
    setIsPaywallShown(false)
  }, [setIsPaywallShown])

  const fadeOut = useCallback(() => {
    opacity.value = withSpring(0, { overshootClamping: true }, () => {
      runOnJS(onClose)()
    })
  }, [onClose, opacity])

  useEffect(() => {
    opacity.value = withSpring(1)
  }, [opacity])

  return (
    <Animated.View
      style={[styles.container, StyleSheet.absoluteFillObject, animatedStyle]}
    >
      <GeneralPaywallScreen close={fadeOut} />
      <View style={[styles.header, { top }]}>
        <Button
          style={styles.headerButton}
          activeOpacity={0.6}
          haptic="selection"
          onPress={fadeOut}
        >
          <XMarkIcon
            size={24}
            color={(StyleSheet.flatten(styles.headerText) as TextStyle).color}
          />
        </Button>
      </View>
    </Animated.View>
  )
}

export function GeneralPaywall() {
  const isPaywallShown = useRecoilValue(isGeneralPaywallShown)

  if (!isPaywallShown) {
    return null
  }

  return (
    <Portal>
      <GeneralPaywallScreenContainer />
    </Portal>
  )
}

const themedStyles = AppStyleSheet.create({
  container: {
    backgroundColor: 'bg',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    paddingHorizontal: 15,
    position: 'absolute',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    color: 'text light',
    fontFamily: 'rubik 500',
    fontSize: 16,
  },
})
