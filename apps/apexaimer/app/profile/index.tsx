import { Stack } from 'expo-router'
import { headerLeft } from '../components/HeaderBackButton'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { StarIcon, UserGroupIcon, UserIcon } from 'react-native-heroicons/solid'
import { SettingsSection } from './SettingsSection'
import { InstagramIcon } from './icons/Instagram'
import { TwitterIcon } from './icons/Twitter'
import { RedditIcon } from './icons/Reddit'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { EnvelopeIcon } from 'react-native-heroicons/outline'
import { ApexAimerThemedLogo } from './logo/ApexAimerThemedLogo'
import { nativeApplicationVersion } from 'expo-application'

export default function ProfileScreen() {
  const styles = useAppStyles(themedStyles)

  const { bottom } = useSafeAreaInsets()

  return (
    <>
      <Stack.Screen
        options={{
          title: null,
          headerLeft,
          headerStyle: styles.header as unknown,
          contentStyle: styles.content,
          headerShadowVisible: false,
          headerTintColor: styles.tint.backgroundColor as string,
        }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: bottom }}>
        <View style={styles.profileDetails}>
          <View style={styles.profileIconBox}>
            <UserIcon
              size={50}
              color={StyleSheet.flatten(styles.profileIcon).backgroundColor}
            />
          </View>
          <Text style={styles.profileText}>Legend</Text>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>PERSONALIZE</Text>
          </View>
          <SettingsSection
            rows={[
              {
                label: 'Personal Details',
                icon: { external: false },
                href: '/profile/details/',
              },
              {
                label: 'Settings',
                icon: { external: false },
                href: '/profile/settings/',
              },
            ]}
          />
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>NEED HELP?</Text>
          </View>
          <SettingsSection
            rows={[
              {
                label: 'Contact Us',
                labelIcon: EnvelopeIcon,
                icon: { external: false },
                href: 'https://google.com',
              },
            ]}
          />
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>GET INVOLVED</Text>
          </View>
          <SettingsSection
            rows={[
              {
                label: 'Instagram',
                labelIcon: InstagramIcon,
                icon: { external: true },
                href: 'https://instagram.com',
              },
              {
                label: 'Twitter',
                labelIcon: TwitterIcon,
                icon: { external: true },
                href: 'https://twitter.com',
              },
              {
                label: 'Reddit',
                labelIcon: RedditIcon,
                icon: { external: true },
                href: 'https://reddit.com',
              },
            ]}
          />
          <SettingsSection
            rows={[
              {
                label: 'Write a Review',
                labelIcon: StarIcon,
                icon: { external: true },
                href: 'https://google.com',
              },
              {
                label: 'Recommend ApexAimer',
                labelIcon: UserGroupIcon,
                icon: { external: false },
                // TODO: call share
                href: 'https://google.com',
              },
            ]}
          />
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>LEGAL</Text>
          </View>
          <SettingsSection
            rows={[
              {
                label: 'Terms of Use',
                icon: { external: false },
                href: '/profile/terms-of-use/',
              },
              {
                label: 'Privacy Policy',
                icon: { external: false },
                href: '/profile/privacy-policy/',
              },
            ]}
          />
        </View>
        <View style={styles.footer}>
          <ApexAimerThemedLogo width={200} />
          <Text style={styles.footerVersion}>{nativeApplicationVersion}</Text>
          <Text style={styles.footerCaption}>
            © {new Date().getFullYear()} ApexAimer. All Rights Reserved.
          </Text>
        </View>
      </ScrollView>
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
    color: 'text primary',
    fontFamily: 'rubik 500',
    fontSize: 20,
  },
  sectionContainer: {
    paddingTop: 30,
    paddingHorizontal: 15,
    gap: 10,
  },
  sectionTitleContainer: {
    paddingLeft: 10,
  },
  sectionTitle: {
    color: 'text primary',
    fontFamily: 'rubik 500',
    fontSize: 14,
  },
  footer: {
    paddingTop: 60,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 10,
  },
  footerVersion: {
    color: 'text primary',
    fontFamily: 'rubik 300',
    fontSize: 12,
  },
  footerCaption: {
    color: 'text primary',
    fontFamily: 'rubik 300',
    fontSize: 12,
  },
})
