import { useLocales } from 'expo-localization'
import { Text, View } from 'react-native'
import { Product } from 'react-native-iap'
import { AppStyleSheet, useAppStyles } from '../useAppStyles'

interface PriceProps {
  currency: string
  price: number
}

const leftSignedPrice = /^([^\d\s]+)\s?(\d+[,.]\d+(?:[.]\d+)?)$/
const rightSignedPrice = /^(\d+[,.]\d+(?:\.\d+)?)\s?([^\d\s]+)$/

export function usePaywallPrice({ currency, price }: PriceProps) {
  const [{ languageTag }] = useLocales()

  const formattedPrice = new Intl.NumberFormat(languageTag, {
    style: 'currency',
    currency,
  }).format(price)

  if (leftSignedPrice.test(formattedPrice)) {
    const [, sign, price] = formattedPrice.match(leftSignedPrice)

    return { sign, price }
  }
  if (rightSignedPrice.test(formattedPrice)) {
    const [, price, sign] = formattedPrice.match(rightSignedPrice)

    return { sign, price }
  }

  return { sign: null, price }
}

interface Props extends Product {
  suffix?: string
}

export function PaywallSubPrice({
  currency,
  price: productPrice,
  suffix,
}: Props) {
  const styles = useAppStyles(themedStyles)
  const priceNumber = +productPrice
  const { sign, price } = usePaywallPrice({
    currency,
    price: Math.ceil(priceNumber * 100) / 100,
  })

  return (
    <View style={styles.wrapper}>
      {sign != null && <Text style={styles.sign}>{sign}</Text>}
      <Text style={styles.digits}>
        {price}
        {suffix ? suffix : ''}
      </Text>
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
    fontSize: 12,
    lineHeight: 20,
    color: 'text primary',
  },
  digits: {
    fontFamily: 'rubik 400',
    fontSize: 18,
    lineHeight: 22,
    color: 'text primary',
  },
})
