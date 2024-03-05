import { useEffect, useRef } from 'react'
import {
  InterstitialEvents,
  IronSource,
  IronSourceError,
} from 'ironsource-mediation'

interface Props {
  onShown(): void
}

export function RoutineAd({ onShown }: Props) {
  const onShownRef = useRef(onShown)
  if (onShownRef.current !== onShown) {
    onShownRef.current = onShown
  }

  useEffect(() => {
    async function showInterstitialIfPossible() {
      if (!(await IronSource.isInterstitialReady())) {
        /**
         * As I understood the docs
         * https://developers.is.com/ironsource-mobile/react-native/interstitial-integration-react-native/#step-2
         * the ad isn't available at this point (unfortunatelly).
         *
         * Just pass ad overlay then.
         */
        onShownRef.current()
        return
      }

      IronSource.showInterstitial('DefaultInterstitial')
    }

    InterstitialEvents.onInterstitialAdClosed.setListener(() => {
      onShownRef.current()
      /**
       * Load the next add in advance
       */
      IronSource.loadInterstitial()
    })
    InterstitialEvents.onInterstitialAdShowFailed.setListener(
      (error: IronSourceError) => {
        /**
         * I'm not sure if that's correct (I mean I don't know when this fire)
         * and we going to catch anything this way,
         * but did it just in case.
         */
        onShownRef.current()
        if (process.env.NODE_ENV === 'development') {
          console.error(JSON.stringify(error))
        }
      }
    )

    showInterstitialIfPossible()

    return () => {
      InterstitialEvents.removeAllListeners()
    }
  }, [])

  return null
}
