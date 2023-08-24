import { Suspense, useState } from 'react'
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Stack, router } from 'expo-router'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { ArrowRightIcon } from 'react-native-heroicons/solid'

import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { Banner } from './Banner'
import { FadeInView } from '../components/FadeInView'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  congratsMotivation,
  isRoutineOfTheDayCompleted,
  routineOfTheDay,
} from '../store'
import { Slider } from './Slider'
import { PagerView } from './PagerView'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PrimaryButton } from '../components/PrimaryButton'
import { DrillRateItem } from './DrillRateItem'

function PrimaryRate({ style }: { style?: StyleProp<ViewStyle> }) {
  const styles = useAppStyles(themedStyles)
  const motivation = useRecoilValue(congratsMotivation)

  return (
    <View style={style}>
      <View style={styles.motivational}>
        <FadeInView>
          <Text style={styles.motivationalTitle}>{motivation.title}</Text>
        </FadeInView>
        <FadeInView delay={200}>
          <Text style={styles.motivationalSubtitle}>{motivation.subtitle}</Text>
        </FadeInView>
      </View>
      <FadeInView delay={400} style={styles.primaryRateWrapper}>
        <View style={styles.rateGeneralWrapper}>
          <Text style={styles.rateGeneralText}>
            How was it? Rate to adjust the difficulty for the next time
          </Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider initialIndex={2} />
        </View>
        <View style={styles.swipeForMoreWrapper}>
          <Text style={styles.swipeForMore}>
            Swipe left to rate every drill separately for even more precise
            adjustments {'>'}
          </Text>
        </View>
      </FadeInView>
    </View>
  )
}

function DetailedRate({ style }: { style?: StyleProp<ViewStyle> }) {
  const routine = useRecoilValue(routineOfTheDay)
  const styles = useAppStyles(themedStyles)

  return (
    <FlatList
      data={routine.data}
      renderItem={({ item }) => (
        <Suspense>
          <DrillRateItem id={item.drillKey} />
        </Suspense>
      )}
      ItemSeparatorComponent={() => (
        <View style={styles.detailedRatesSeparator} />
      )}
      contentContainerStyle={styles.detailedRatesContentContainer}
      style={style}
    />
  )
}

function Content() {
  return (
    <Suspense>
      <PagerView dotsDelay={600}>
        <PrimaryRate />
        <DetailedRate />
      </PagerView>
    </Suspense>
  )
}

export default function RoutineScreen() {
  const setRoutineOfTheDayCompleted = useSetRecoilState(
    isRoutineOfTheDayCompleted
  )
  const [readyToRate, setReadyToRate] = useState(false)

  const styles = useAppStyles(themedStyles)

  const { bottom } = useSafeAreaInsets()

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
                setRoutineOfTheDayCompleted(true)
              }}
            >
              <XMarkIcon
                color={StyleSheet.flatten(styles.closeIcon).backgroundColor}
              />
            </TouchableOpacity>
          ),
          headerTransparent: true,
          contentStyle: styles.bg,
        }}
      />
      <Banner
        onEnd={() => {
          setReadyToRate(true)
        }}
      />
      {readyToRate && <Content />}
      {readyToRate && (
        <FadeInView delay={600} style={[{ paddingBottom: bottom }, styles.cta]}>
          <PrimaryButton
            onPress={() => {
              router.replace('/')
              setRoutineOfTheDayCompleted(true)
            }}
          >
            <ArrowRightIcon
              size={20}
              color={StyleSheet.flatten(styles.ctaIcon).backgroundColor}
            />
          </PrimaryButton>
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
  primaryRateWrapper: {
    flex: 1,
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
    paddingTop: 30,
  },
  cta: {
    alignItems: 'center',
    backgroundColor: 'bg',
    paddingTop: 20,
  },
  swipeForMoreWrapper: {
    paddingTop: 40,
    paddingHorizontal: 40,
  },
  swipeForMore: {
    color: 'line disabled',
    fontFamily: 'rubik 500',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  detailedRatesSeparator: {
    borderColor: 'line disabled',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  detailedRatesContentContainer: {
    paddingBottom: 20,
  },
})
