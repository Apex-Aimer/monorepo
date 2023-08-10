import { ResizeMode, Video, VideoProps } from 'expo-av'
import { forwardRef, useMemo } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'

interface Props {
  uri: string
}

export const InstructionVideo = forwardRef<Video, Props>(
  function InstructionVideoComp({ uri }, _ref) {
    const { width } = useWindowDimensions()

    const videoHeight = useMemo(() => {
      return Math.floor((width / 4) * 3)
    }, [width])

    return (
      <Video
        ref={_ref}
        style={[styles.video, { height: videoHeight }]}
        source={{ uri }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
      />
    )
  }
)

const styles = StyleSheet.create({
  video: {
    backgroundColor: 'black',
  },
})
