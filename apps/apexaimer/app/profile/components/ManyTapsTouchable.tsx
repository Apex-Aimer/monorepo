import { PropsWithChildren, useCallback, useRef } from 'react'
import { TouchableOpacity } from 'react-native'

interface Props extends PropsWithChildren {
  onPress(): void
}

export function ManyTapsTouchable({ children, onPress: onPressProp }: Props) {
  const resetTimeoutRef = useRef<NodeJS.Timeout>(-1 as any)
  const numberOfTouches = useRef(0)

  const onPress = useCallback(() => {
    clearTimeout(resetTimeoutRef.current)

    resetTimeoutRef.current = setTimeout(() => {
      numberOfTouches.current = 0
    }, 300)

    if (numberOfTouches.current > 5) {
      onPressProp()
      return
    }

    numberOfTouches.current += 1
  }, [onPressProp])

  return (
    <TouchableOpacity
      onPress={() => {
        onPress()
      }}
      activeOpacity={0.9}
    >
      {children}
    </TouchableOpacity>
  )
}
