import { Stack } from 'expo-router'
import { UserIcon } from 'react-native-heroicons/solid'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { headerLeft } from '../../components/HeaderBackButton'
import { PrimaryGradientText } from '../../components/PrimaryGradientText'
import { SettingsSection } from '../SettingsSection'
import { useRecoilState } from 'recoil'
import { name as nameSelector } from '../../store'

function NameInput() {
  const styles = useAppStyles(themedStyles)
  const [name, setName] = useRecoilState(nameSelector)

  return (
    <View style={styles.profileNameContainer}>
      <TextInput
        style={styles.profileNameInput}
        defaultValue={name}
        onChange={({ nativeEvent: { text } }) => {
          setName(text)
        }}
        selectionColor={
          StyleSheet.flatten(styles.profileNameInputSelection).backgroundColor
        }
      />
    </View>
  )
}

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
              icon: NameInput,
            },
            // {
            //   label: 'Sex',
            //   icon: { external: false },
            //   // TODO
            //   href: 'https://google.com',
            // },
            // {
            //   label: 'Age',
            //   icon: { external: false },
            //   // TODO
            //   href: 'https://google.com',
            // },
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
  profileNameContainer: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 20,
    height: 20,
  },
  profileNameInput: {
    flex: 1,
    color: 'text primary',
    textAlign: 'right',
    fontFamily: 'rubik 500',
    fontSize: 16,
  },
  profileNameInputSelection: {
    backgroundColor: 'accent primary',
  },
})
