import { useCallback } from 'react'
import { atom, useSetRecoilState, useRecoilValue } from 'recoil'

export const isGeneralPaywallShown = atom({
  key: 'isGeneralPaywallShown',
  default: false,
})

export function useGeneralPaywallScreen() {
  const setIsGeneralPaywallShown = useSetRecoilState(isGeneralPaywallShown)

  return {
    openPaywall: useCallback(() => {
      setIsGeneralPaywallShown(true)
    }, [setIsGeneralPaywallShown]),
  }
}

export const busyPaying = atom({
  key: 'generalPaywallBusyPaying',
  default: false,
})
