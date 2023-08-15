import { Stack } from 'expo-router'
import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { headerLeft } from '../../components/HeaderBackButton'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { UserIcon } from 'react-native-heroicons/solid'
import { PrimaryGradientText } from '../../components/PrimaryGradientText'
import { SettingsSection } from '../SettingsSection'

export default function ProfileDetailsScreen() {
  const styles = useAppStyles(themedStyles)
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Personal Details',
          headerLeft,
          headerStyle: styles.header as unknown,
          contentStyle: styles.content,
          headerShadowVisible: false,
          headerTintColor: styles.tint.backgroundColor as string,
        }}
      />
      <View style={styles.profileDetails}>
        <View style={styles.profileIconBox}>
          <UserIcon
            size={50}
            color={StyleSheet.flatten(styles.profileIcon).backgroundColor}
          />
        </View>
        <TouchableOpacity>
          <PrimaryGradientText style={styles.profileText}>
            Edit photo
          </PrimaryGradientText>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionContainer}>
        <SettingsSection
          rows={[
            {
              label: 'Name',
              icon: { external: false },
              // TODO
              href: 'https://google.com',
            },
            {
              label: 'Sex',
              icon: { external: false },
              // TODO
              href: 'https://google.com',
            },
            {
              label: 'Age',
              icon: { external: false },
              // TODO
              href: 'https://google.com',
            },
          ]}
        />
      </View>
    </>
  )
}

const themedStyles = AppStyleSheet.create({
  header: {
    backgroundColor: 'bg',
  },
  content: {
    backgroundColor: 'bg',
  },
  tint: {
    backgroundColor: 'text primary',
  },
  profileDetails: {
    paddingTop: 20,
    alignItems: 'center',
    gap: 15,
  },
  profileIconBox: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: 'text primary',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    backgroundColor: 'text primary inverted',
  },
  profileText: {
    fontFamily: 'rubik 500',
    fontSize: 16,
  },
  sectionContainer: {
    paddingTop: 30,
    paddingHorizontal: 15,
    gap: 10,
  },
})
