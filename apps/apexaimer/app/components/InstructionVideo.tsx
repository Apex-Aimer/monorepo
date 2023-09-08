import { forwardRef, memo, useMemo } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { ResizeMode, Video, VideoProps } from 'expo-av'
import {
  downloadAsync,
  documentDirectory,
  getInfoAsync,
} from 'expo-file-system'
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

  getEntry(uri: string) {
    const cacheEntry = this.entries[uri]

    if (cacheEntry != null) {
      return cacheEntry
    }

    if (!uri.startsWith('http')) {
      return uri
    }

    return uri
  }

  downloadIfNeeded(uri: string) {
    const cacheEntry = this.entries[uri]

    if (cacheEntry != null) {
      return
    }

    if (!uri.startsWith('http')) {
      return
    }

    this.setTask(uri)
  }

  private async init() {
    try {
      const json = await AsyncStorage.getItem(Cache.STORAGE_KEY)
      const entries = JSON.parse(json)

      const checkedEntries = await Promise.all(
        Object.keys(entries).map(async (key) => {
          const file = entries[key]

          try {
            const { exists, uri } = await getInfoAsync(file)

            if (exists) {
              return { [key]: uri }
            }
            return null
          } catch {
            return null
          }
        })
      )

      this.entries = Object.assign({}, ...checkedEntries)
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

  private setTask(uri: string) {
    if (this.tasks[uri] != null) {
      return
    }

    const task = this.download(uri)

    this.tasks[uri] = this.initTask.then(() => task)

    return
  }
}

interface CachedVideoProps extends VideoProps {
  uri: string
}

interface Props {
  uri: string
  thumbnail: string
}

export const CachedVideo = forwardRef<Video, CachedVideoProps>(
  function CachedVideoComp({ uri, ...rest }, _ref) {
    const cachedUri = Cache.sharedInstance.getEntry(uri)

    return (
      <Video
        ref={_ref}
        source={{ uri: cachedUri }}
        onLoad={() => {
          Cache.sharedInstance.downloadIfNeeded(uri)
        }}
        {...rest}
      />
    )
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

    return (
      <CachedVideo
        ref={_ref}
        style={[styles.video, { height: videoHeight }]}
        uri={uri}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        posterSource={{ uri: thumbnail }}
        posterStyle={{ width, height: videoHeight }}
        onError={(err) => {
          console.log(err)
        }}
      />
    )
  })
)

const styles = StyleSheet.create({
  video: {
    backgroundColor: 'black',
  },
})
