import { useState } from 'react'
import { Stack } from 'expo-router'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { moveAsync, documentDirectory, deleteAsync } from 'expo-file-system'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { AppStyleSheet, useAppStyles } from '../../components/useAppStyles'
import { headerLeft } from '../../components/HeaderBackButton'
import { PrimaryGradientText } from '../../components/PrimaryGradientText'
import { SettingsSection } from '../SettingsSection'
import { name as nameSelector, avatar as avatarSelector } from '../../store'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'

async function pickImage() {
  const pickResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    aspect: [1, 1],
    quality: 0.2,
    allowsEditing: true,
  })

  if (pickResult.canceled) {
    return null
  }

  if (pickResult.assets.length === 0) {
    return null
  }

  const pickedImage = pickResult.assets[0]

  const fileType = pickedImage.uri.replace(/.*(\.[a-z]+)$/, '$1')

  const uriInDocuments = `${documentDirectory}avatar${fileType}`

  try {
    await deleteAsync(uriInDocuments)
  } catch {
    // no-op
  }

  try {
    await moveAsync({
      from: pickedImage.uri,
      to: uriInDocuments,
    })
  } catch (e) {
    return null
  }

  return uriInDocuments
}

function AvatarSelect() {
  const styles = useAppStyles(themedStyles)
  const [busy, setBusy] = useState(false)
  const setAvatar = useSetRecoilState(avatarSelector)

  return (
    <View style={styles.profileDetails}>
      <Avatar size={80} loading={busy} />
      <Button
        onPress={async () => {
          setBusy(true)
          const imageUri = await pickImage()

          if (imageUri != null) {
            setAvatar({ uri: imageUri, cacheKey: Date.now().toString() })
          }

          setBusy(false)
        }}
        haptic="impactLight"
      >
        <PrimaryGradientText style={styles.profileText}>
          Edit photo
        </PrimaryGradientText>
      </Button>
    </View>
  )
}

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
      <AvatarSelect />
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
    paddingRight: 20,
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
