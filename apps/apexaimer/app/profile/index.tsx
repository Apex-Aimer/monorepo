import { useEffect, useState } from 'react'
import { Link, Stack } from 'expo-router'
import { ScrollView, Text, View, Share, TouchableOpacity } from 'react-native'
import { StarIcon, UserGroupIcon } from 'react-native-heroicons/solid'
import { nativeApplicationVersion } from 'expo-application'
import {
  CurrencyDollarIcon,
  EnvelopeIcon,
} from 'react-native-heroicons/outline'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as MailComposer from 'expo-mail-composer'
import * as Linking from 'expo-linking'
import * as Device from 'expo-device'
import * as StoreReview from 'expo-store-review'
import * as Sharing from 'expo-sharing'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { headerLeft } from '../components/HeaderBackButton'
import { SettingsSection } from './SettingsSection'
import { InstagramIcon } from './icons/Instagram'
import { TwitterIcon } from './icons/Twitter'
import { RedditIcon } from './icons/Reddit'
import { ApexAimerThemedLogo } from './logo/ApexAimerThemedLogo'
import { useUserName } from '../store'
import { Avatar } from '../components/Avatar'
import { ManyTapsTouchable } from './components/ManyTapsTouchable'
import { GoPremium } from './components/GoPremium'
import { useRecoilValue } from 'recoil'
import { iapHasPremium } from '../createIapStore'

async function sendUsMail() {
  const supportMail = 'support@apexaimer.com'

  if (!(await MailComposer.isAvailableAsync())) {
    Linking.openURL(`mailto:${supportMail}`)
  }

  try {
    await MailComposer.composeAsync({
      recipients: [supportMail],
      subject: 'Feedback on ApexAimer',
      body: `




The following information may help us solve issues faster
ApexAimer ${nativeApplicationVersion} - ${Device.osName} - ${Device.osVersion} - ${Device.modelName}
`,
    })
  } catch {
    // no-op
  }
}

async function reviewUs() {
  if (!(await StoreReview.hasAction())) {
    return
  }

  try {
    await StoreReview.requestReview()
  } catch {
    // no-op
  }
}

function useCanRequestReview() {
  const [canRate, setCanRate] = useState(true)

  useEffect(() => {
    ;(async () => {
      const possible = await StoreReview.hasAction()

      if (possible) {
        return
      }

      setCanRate(false)
    })()
  }, [])

  return canRate
}

async function shareUs() {
  if (!(await Sharing.isAvailableAsync())) {
    return
  }

  // iOS: https://apps.apple.com/us/app/gentler-streak-health-fitness/id1576857102
  // TODO: Android link
  const appLink = 'TODO'

  try {
    // TODO: create an image to share
    Share.share({
      message: `${appLink}
Hey! I’ve found an incredible app called ApexAimer. It’s the most motivating app I’ve ever tried. You should give it a go! Let me know what you think!`,
    })
  } catch {
    // no-op
  }
}

function useCanShare() {
  const [canShare, setCanShare] = useState(true)

  useEffect(() => {
    ;(async () => {
      const possible = await Sharing.isAvailableAsync()

      if (possible) {
        return
      }

      setCanShare(false)
    })()
  }, [])

  return canShare
}

export default function ProfileScreen() {
  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()

  const name = useUserName()
  const canRequestReview = useCanRequestReview()
  const canShare = useCanShare()
  const hasPremium = useRecoilValue(iapHasPremium)

  const [showHidden, setShowHidden] = useState(false)

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
          <Avatar size={80} />
          <Text style={styles.profileText}>{name}</Text>
        </View>
        <GoPremium />
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
                onPress: sendUsMail,
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
              canRequestReview
                ? {
                    label: 'Write a Review',
                    labelIcon: StarIcon,
                    icon: { external: true },
                    onPress: reviewUs,
                  }
                : null,
              canShare
                ? {
                    label: 'Recommend ApexAimer',
                    labelIcon: UserGroupIcon,
                    icon: { external: false },
                    onPress: shareUs,
                  }
                : null,
            ]}
          />
        </View>
        {hasPremium && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>SUBSCRIPTION</Text>
            </View>
            <SettingsSection
              rows={[
                {
                  label: 'How to cancel a subscription',
                  labelIcon: CurrencyDollarIcon,
                  icon: { external: false },
                  href: '/profile/unsubscribe-instructions',
                },
              ]}
            />
          </View>
        )}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>LEGAL</Text>
          </View>
          <SettingsSection
            rows={[
              {
                label: 'Terms of Use',
                icon: { external: false },
                href: '/profile/terms-of-use',
              },
              {
                label: 'Privacy Policy',
                icon: { external: false },
                href: '/profile/privacy-policy',
              },
            ]}
          />
        </View>
        {showHidden && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>ADDITIONAL</Text>
            </View>
            <SettingsSection
              rows={[
                {
                  label: 'Advanced',
                  icon: { external: false },
                  href: '/profile/hidden/',
                },
              ]}
            />
          </View>
        )}
        <View style={styles.footer}>
          <ManyTapsTouchable onPress={() => setShowHidden(true)}>
            <ApexAimerThemedLogo width={200} />
          </ManyTapsTouchable>
          <Text style={styles.footerVersion}>{nativeApplicationVersion}</Text>
          <Text style={styles.footerCaption}>
            © {new Date().getFullYear()} ApexAimer. All Rights Reserved.
          </Text>
          <Text style={styles.footerCaption}>
            This app is not affiliated with or sponsored by Electronic Arts Inc.
            or its licensors.
          </Text>
          <Text style={styles.footerCaption}>
            Game content and materials are trademarks and copyrights of{' '}
            <Link href="https://ea.com/" style={styles.footerLink}>
              Electronic Arts Inc.
            </Link>{' '}
            or{' '}
            <Link href="https://www.respawn.com/" style={styles.footerLink}>
              Respawn
            </Link>
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
    fontSize: 15,
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
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  footerLink: {
    color: 'accent primary',
  },
})
