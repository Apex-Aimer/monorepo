/* eslint-disable turbo/no-undeclared-env-vars */

import { ExpoConfig } from 'expo/config'
import 'dotenv/config'

const config: ExpoConfig = {
  name: 'ApexAimer',
  slug: 'ApexAimer',
  version: '0.0.3',
  scheme: 'apexaimer',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#282624',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.apexaimer',
    googleServicesFile: './configs/GoogleService-Info.plist',
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      NSAppTransportSecurity: {
        NSExceptionDomains: {
          'apexaimer.com': {
            NSIncludesSubdomains: true,
          },
          'cloudflarestream.com': {
            NSIncludesSubdomains: true,
          },
          localhost: {
            NSIncludesSubdomains: true,
            NSExceptionAllowsInsecureHTTPLoads: true,
          },
        },
      },
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#282624',
    },
    googleServicesFile: './configs/google-services.json',
    package: 'com.apexaimer',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '15.0',
          useFrameworks: 'static',
        },
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission:
          'The app accesses your photos to personalize your experience (i.e. choose an avatar).',
      },
    ],
    '@react-native-firebase/app',
    '@react-native-firebase/crashlytics',
    'react-native-iap',
    'expo-localization',
    [
      'react-native-fbsdk-next',
      {
        appID: process.env.FB_APP_ID,
        clientToken: process.env.FB_APP_CLIENT_TOKEN,
        displayName: 'ApexAimer Mobile',
        scheme: process.env.FB_APP_SCHEME,
        // https://github.com/thebergamo/react-native-fbsdk-next?tab=readme-ov-file#enabling-auto-app-installs-in-expo
        advertiserIDCollectionEnabled: true,
        autoLogAppEventsEnabled: true,
        isAutoInitEnabled: false,
        iosUserTrackingPermission:
          'This identifier will be used to deliver personalized ads to you.',
      },
    ],
    'react-native-fbads',
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: '9042a6e2-e3fe-42bf-944c-2a5a1d9085a5',
    },
  },
  owner: 'apexaimer',
}

export default config
