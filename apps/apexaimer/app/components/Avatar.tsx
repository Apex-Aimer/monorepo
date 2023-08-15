import { useRecoilValue } from 'recoil'

import { avatar as avatarSelector } from '../store'
import { Image } from 'expo-image'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { UserIcon } from 'react-native-heroicons/solid'
import { AppStyleSheet, useAppStyles } from './useAppStyles'

export function Avatar({
  size,
  loading = false,
}: {
  size: number
  loading?: boolean
}) {
  const styles = useAppStyles(themedStyles)

  const avatar = useRecoilValue(avatarSelector)

  const load = loading && (
    <View style={styles.profileLoadingContainer}>
      <ActivityIndicator size="small" />
    </View>
  )

  const borderRadius = Math.floor((15 / 80) * size)

  if (avatar == null) {
    const iconSize = Math.max(Math.floor((50 / 80) * size), 16)
    return (
      <View style={[styles.profileIconBox, { width: size, borderRadius }]}>
        <UserIcon
          size={iconSize}
          color={StyleSheet.flatten(styles.profileIcon).backgroundColor}
        />
        {load}
      </View>
    )
  }

  return (
    <View style={[styles.profileIconBox, { width: size, borderRadius }]}>
      <Image
        alt="Legend avatar"
        source={avatar}
        style={styles.profileAvatar as unknown}
        contentFit="cover"
      />
      {load}
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  profileIconBox: {
    aspectRatio: 1,
    backgroundColor: 'text primary',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileIcon: {
    backgroundColor: 'text primary inverted',
  },
  profileAvatar: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
  },
  profileLoadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'backdrop',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
