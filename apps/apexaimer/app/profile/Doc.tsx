import { ScrollView, View } from 'react-native'
import Markdown from 'react-native-simple-markdown-updated-dependencies'
import { Stack } from 'expo-router'

import { headerLeft } from '../components/HeaderBackButton'
import { AppStyleSheet, useAppStyles } from '../components/useAppStyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function Doc({ children }: { children: string }) {
  const styles = useAppStyles(themedStyles)
  const { bottom } = useSafeAreaInsets()

  return (
    <ScrollView
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: bottom },
      ]}
    >
      <Markdown styles={styles}>{children}</Markdown>
    </ScrollView>
  )
}

export function withDocScreen({
  default: content,
  metadata,
}: {
  default: string
  metadata: { title: string }
}) {
  return function DocScreen() {
    const styles = useAppStyles(themedStyles)

    return (
      <>
        <Stack.Screen
          options={{
            headerTitle: metadata.title,
            headerLeft,
            headerStyle: styles.header as unknown,
            contentStyle: styles.content,
            headerShadowVisible: false,
            headerTintColor: styles.tint.backgroundColor as string,
          }}
        />
        <Doc>{content}</Doc>
      </>
    )
  }
}

const themedStyles = AppStyleSheet.create({
  header: {
    backgroundColor: 'bg',
  },
  content: {
    backgroundColor: 'bg',
  },
  tint: {
    backgroundColor: 'icon primary',
  },
  title: {
    color: 'text primary',
    fontFamily: 'rubik 700',
    fontSize: 24,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  // --- markdown styles ---
  'heading 2': {
    color: 'text primary',
    fontFamily: 'rubik 500',
    fontSize: 18,
    lineHeight: 24,
    paddingTop: 10,
  },
  text: {
    color: 'text primary',
    fontFamily: 'rubik 400',
    fontSize: 16,
    lineHeight: 25,
  },
  paragraph: {
    paddingTop: 10,
  },
  br: {
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    color: 'text primary',
    paddingTop: 10,
    paddingRight: 15,
  },
  listItemNumber: {
    fontWeight: 'bold',
    color: 'text primary',
    paddingTop: 3,
    paddingRight: 5,
  },
  listItemBullet: {
    fontWeight: 'bold',
    color: 'text primary',
    paddingTop: 2,
    paddingRight: 5,
  },
  listItemText: {
    color: 'text primary',
  },
  image: {
    marginTop: 20,
    borderRadius: 5,
  },
  strong: {
    fontFamily: 'rubik 600',
  },
})
