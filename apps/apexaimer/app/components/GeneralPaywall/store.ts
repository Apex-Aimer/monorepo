import { useCallback } from 'react'
import { atom, useSetRecoilState, useRecoilValue } from 'recoil'

export const isGeneralPaywallShown = atom({
  key: 'isGeneralPaywallShown',
  // default: false,
  default: true
})

export function useGeneralPaywallScreen() {
  const setIsGeneralPaywallShown = useSetRecoilState(isGeneralPaywallShown)

  return {
    openPaywall: useCallback(() => {
      setIsGeneralPaywallShown(true)
    }, [setIsGeneralPaywallShown]),
  }
}
