import { forwardRef, memo, useMemo } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { ResizeMode, Video } from 'expo-av'

interface Props {
  uri: string
  thumbnail: string
}

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
      <Video
        ref={_ref}
        style={[styles.video, { height: videoHeight }]}
        source={{
          uri: 'https://cms.apexaimer.com/api/content/hls/whole-mag-long-strafing',
        }}
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
