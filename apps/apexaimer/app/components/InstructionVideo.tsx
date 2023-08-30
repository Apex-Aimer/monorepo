import { Suspense, forwardRef, memo, useMemo } from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import { ResizeMode, Video, VideoProps } from 'expo-av'
import { downloadAsync, documentDirectory } from 'expo-file-system'
import { selectorFamily, useRecoilValue } from 'recoil'
import { Image } from 'expo-image'
import AsyncStorage from '@react-native-async-storage/async-storage'

class Cache {
  private static STORAGE_KEY = 'INSTRUCTIONS_VIDEOS_CACHE'

  private static __instance: Cache
  static get sharedInstance() {
    if (this.__instance == null) {
      this.__instance = new Cache()
    }

    return this.__instance
  }

  private entries: Record<string, string> = {}
  private tasks: Record<string, Promise<string>> = {}

  async getEntry(uri: string) {
    const cacheEntry = this.entries[uri]

    // TODO: check that cache entry is valid
    // if (cacheEntry != null) {
    //   return cacheEntry
    // }

    if (!uri.startsWith('http')) {
      return uri
    }

    const localUri = await this.getTask(uri)

    return localUri
  }

  private async init() {
    try {
      const json = await AsyncStorage.getItem(Cache.STORAGE_KEY)
      const entries = JSON.parse(json)

      this.entries = entries
    } catch {
      // no-op
    }
  }
  private initTask = this.init()

  private async download(uri: string) {
    let localUri = uri

    const uniqPath = uri
      .replace(/^https?:\/\/[^\/]*\/([^\?]*)(?:\??.*)$/, '$1')
      .replaceAll('/', '-')

    try {
      const result = await downloadAsync(uri, `${documentDirectory}${uniqPath}`)
      localUri = result.uri

      console.log('downloaded video: ', result.uri)

      setTimeout(() => {
        this.entries = {
          ...this.entries,
          [uri]: result.uri,
        }
        AsyncStorage.setItem(Cache.STORAGE_KEY, JSON.stringify(this.entries))
      })
    } catch (e) {
      // no luck, trying to use network video
      console.error("Can't fetch the video! ", e)
      this.tasks[uri] = null
    }

    return localUri
  }

  private getTask(uri: string) {
    if (this.tasks[uri] != null) {
      return this.tasks[uri]
    }

    const task = this.download(uri)

    this.tasks[uri] = this.initTask.then(() => task)

    return task
  }
}

const videosCacheEntry = selectorFamily({
  key: 'instructionsVideosCacheEntry',
  get: (uri: string) => async () => {
    const entry = await Cache.sharedInstance.getEntry(uri)
    console.log({ entry })
    return entry
  },
})

interface CachedVideoProps extends VideoProps {
  uri: string
}

interface Props {
  uri: string
  thumbnail: string
}

export const CachedVideo = forwardRef<Video, CachedVideoProps>(
  function CachedVideoComp({ uri, ...rest }, _ref) {
    const cachedUri = useRecoilValue(videosCacheEntry(uri))

    console.log({ cachedUri })

    return <Video ref={_ref} source={{ uri: cachedUri }} {...rest} />
  }
)

// eslint-disable-next-line react/display-name
export const InstructionVideo = memo(
  forwardRef<Video, Props>(function InstructionVideoComp(
    { uri, thumbnail },
    _ref
  ) {
    const { width } = useWindowDimensions()

    const videoHeight = useMemo(() => {
      return Math.floor((width / 4) * 3)
    }, [width])

    // const fallback = (
    //   <Image
    //     style={[styles.video, { height: videoHeight }]}
    //     source={{ uri: thumbnail }}
    //   />
    // )

    const fallback = (
      <View
        style={[
          styles.video,
          { height: videoHeight },
          { backgroundColor: 'red' },
        ]}
      ></View>
    )

    return (
      <Suspense fallback={fallback}>
        <CachedVideo
          ref={_ref}
          style={[styles.video, { height: videoHeight }]}
          uri={uri}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
        />
      </Suspense>
    )
  })
)

const styles = StyleSheet.create({
  video: {
    backgroundColor: 'black',
  },
})
