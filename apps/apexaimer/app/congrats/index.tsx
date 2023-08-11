import { useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import { Stack, router } from 'expo-router'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { ArrowRightIcon } from 'react-native-heroicons/solid'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { Banner } from './Banner'
import { FadeInView } from '../components/FadeInView'
import { useRecoilValue } from 'recoil'
import { congratsMotivation } from '../store'
import { ScreenCTA } from '../components/ScreenCTA'
import Animated from 'react-native-reanimated'
import { Slider } from './Slider'

function Content() {
  const styles = useAppStyles(themedStyles)

  const motivation = useRecoilValue(congratsMotivation)

  const { width } = useWindowDimensions()

  return (
    <>
      <View style={styles.motivational}>
        <FadeInView>
          <Text style={styles.motivationalTitle}>{motivation.title}</Text>
        </FadeInView>
        <FadeInView delay={200}>
          <Text style={styles.motivationalSubtitle}>{motivation.subtitle}</Text>
        </FadeInView>
      </View>
      <Animated.ScrollView horizontal pagingEnabled>
        <View style={[styles.page1, { width }]}>
          <View style={styles.rateGeneralWrapper}>
            <Text>
              How was it? Rate to adjust the difficulty for the next time
            </Text>
          </View>
          <View style={styles.sliderContainer}>
            <Slider />
          </View>
        </View>
        <View style={{ width }}></View>
      </Animated.ScrollView>
    </>
  )
}

export default function RoutineScreen() {
  const styles = useAppStyles(themedStyles)

  const [readyToRate, setReadyToRate] = useState(false)

  return (
    <>
      <Stack.Screen
        options={{
          title: null,
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.replace('/')
              }}
            >
              <XMarkIcon
                color={StyleSheet.flatten(styles.closeIcon).backgroundColor}
              />
            </TouchableOpacity>
          ),
          headerTransparent: true,
        }}
      />
      <View style={styles.bg}>
        <Banner
          onEnd={() => {
            setReadyToRate(true)
          }}
        />
        {readyToRate && <Content />}
      </View>
      {readyToRate && (
        <FadeInView delay={400}>
          <ScreenCTA>
            <ArrowRightIcon
              size={20}
              color={StyleSheet.flatten(styles.ctaIcon).backgroundColor}
            />
          </ScreenCTA>
        </FadeInView>
      )}
    </>
  )
}

const themedStyles = AppStyleSheet.create({
  closeIcon: {
    backgroundColor: 'text primary',
  },
  bg: {
    backgroundColor: 'bg',
    flex: 1,
  },
  motivational: {
    backgroundColor: 'bg',
    paddingHorizontal: 30,
  },
  motivationalTitle: {
    color: 'text primary',
    fontFamily: 'rubik 600',
    fontSize: 20,
    textAlign: 'center',
  },
  motivationalSubtitle: {
    color: 'text primary',
    fontFamily: 'rubik 600',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  ctaIcon: {
    backgroundColor: 'icon primary',
  },
  page1: {
    justifyContent: 'center',
  },
  rateGeneralWrapper: {
    paddingHorizontal: 40,
  },
  rateGeneralText: {
    color: 'text primary',
    fontFamily: 'rubik 500',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  sliderContainer: {
    paddingHorizontal: 20,
  },
})
