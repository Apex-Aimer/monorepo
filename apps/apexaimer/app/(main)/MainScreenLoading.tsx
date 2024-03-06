import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'

export function MainScreenLoading() {
  const styles = useAppStyles(themedStyles)

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="small"
        color={StyleSheet.flatten(styles.activityIndicator).backgroundColor}
      />
    </View>
  )
}

const themedStyles = AppStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'bg',
  },
  activityIndicator: {
    backgroundColor: 'text primary',
  },
})
