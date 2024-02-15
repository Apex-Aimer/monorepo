import { Text, View } from 'react-native'
import { Product } from 'react-native-iap'

import { AppStyleSheet, useAppStyles } from '../useAppStyles'
import { usePaywallPrice } from './PaywallSubPrice'

interface Props extends Product {
  suffix?: string
  calculateDiscount?(price: number): number
}

export function PaywallDiscountSubPrice({
  currency,
  price: productPrice,
  suffix,
  calculateDiscount,
}: Props) {
  const styles = useAppStyles(themedStyles)
  const priceNumber = +productPrice
  const { sign, price } = usePaywallPrice({
    currency,
    price: calculateDiscount?.(priceNumber) ?? priceNumber,
  })

  return (
    <View style={styles.wrapper}>
      {sign != null && <Text style={styles.sign}>{sign}</Text>}
      <Text style={styles.digits}>
        {price}
        {suffix ? suffix : ''}
      </Text>
      <View style={styles.crossline} />
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 2,
  },
  sign: {
    fontFamily: 'rubik 400',
    fontSize: 10,
    lineHeight: 13,
    color: 'line',
  },
  digits: {
    fontFamily: 'rubik 400',
    fontSize: 16,
    lineHeight: 16,
    color: 'line',
  },
  crossline: {
    height: 1,
    backgroundColor: 'line',
    position: 'absolute',
    top: '46%',
    left: -3,
    right: -1,
  },
})
