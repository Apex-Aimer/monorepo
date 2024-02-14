import { PropsWithChildren } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AppStyleSheet, useAppStyles } from '../useAppStyles'
import { PAYWALL_HORIZONTAL_PADDING } from './PaywallPlan.styles'
import { HeaderImage, HeaderImageGradient } from './HeaderImage'

interface Props extends PropsWithChildren {
  bottomInset: number
}

export function PaywallContainer({ bottomInset, children }: Props) {
  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <HeaderImage />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: bottom + bottomInset }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderImageGradient />
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    backgroundColor: 'bg',
    flexDirection: 'column',
    gap: 32,
    paddingTop: 30,
    paddingHorizontal: PAYWALL_HORIZONTAL_PADDING,
  },
})
