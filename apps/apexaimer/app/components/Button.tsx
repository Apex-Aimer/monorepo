import { useCallback } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import * as Haptics from 'expo-haptics'

type HapticStyle =
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy'
  | 'selection'
  | 'notificationSuccess'
  | 'notificationWarning'
  | 'notificationError'

interface Props extends TouchableOpacityProps {
  haptic?: HapticStyle
}

async function doHaptic(haptic: HapticStyle) {
  if (haptic == null) {
    return
  }
  if (haptic === 'impactLight') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    return
  }
  if (haptic === 'impactMedium') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    return
  }
  if (haptic === 'impactHeavy') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    return
  }
  if (haptic === 'selection') {
    await Haptics.selectionAsync()
    return
  }
  if (haptic === 'notificationWarning') {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    return
  }
  if (haptic === 'notificationSuccess') {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    return
  }
  if (haptic === 'notificationError') {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    return
  }
  return
}

export function Button({ haptic, onPress: onPressProp, ...rest }: Props) {
  const onPress = useCallback(
    (evt) => {
      doHaptic(haptic)
      onPressProp(evt)
    },
    [onPressProp, haptic]
  )

  return <TouchableOpacity {...rest} onPress={onPress} />
}
