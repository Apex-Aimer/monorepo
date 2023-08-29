import { Suspense } from 'react'
import { FlatList, View } from 'react-native'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { useRecoilValue } from 'recoil'

import { headerLeft } from '../components/HeaderBackButton'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { routineOfTheDay } from '../store'
import { Drill } from '../components/Drill/Drill'
import { PrimaryGradientText } from '../components/PrimaryGradientText'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function Content({ id }: { id: string }) {
  const routine = useRecoilValue(routineOfTheDay)

  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()

  return (
    <FlatList
      data={routine.data}
      renderItem={({ item }) => (
        <Link href={`/instructions/${item}/`} asChild>
          <Drill id={item.drillKey} hasContinuation={false} interactive>
            <PrimaryGradientText style={styles.descriptionCtaText}>
              Details {'>'}
            </PrimaryGradientText>
          </Drill>
        </Link>
      )}
      // TODO: on real content there won't be a need for index
      keyExtractor={(item, index) => `${item}:${index}`}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: bottom },
      ]}
    />
  )
}

export default function RoutineDetailsScreen() {
  const { key: id } = useLocalSearchParams<{ key: string }>()
  const styles = useAppStyles(themedStyles)

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerLeft,
          headerRight: () => null,
          headerStyle: styles.header as unknown,
          contentStyle: styles.content,
          headerTintColor: styles.tint.backgroundColor as string,
        }}
      />
      <Suspense fallback={null}>
        <Content id={id} />
      </Suspense>
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
  descriptionCtaText: {
    fontFamily: 'rubik 700',
    fontSize: 16,
  },
  contentContainer: {
    paddingTop: 20,
  },
})
