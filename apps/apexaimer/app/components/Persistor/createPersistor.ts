import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useRef, useState } from 'react'
import {
  RecoilState,
  selector,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

const PERSISTED_STORE_KEY = '__state__'

export async function getPersistedStore() {
  try {
    const serializedStore = await AsyncStorage.getItem(PERSISTED_STORE_KEY)

    return JSON.parse(serializedStore)
  } catch {
    return null
  }
}

export function createPersistor(
  ...atoms: (RecoilState<any> | { atom: RecoilState<any>; readonly: boolean })[]
) {
  const persistanceSelector = selector({
    key: 'persistor',
    get: ({ get }) =>
      atoms.reduce((acc, atomLike) => {
        let atom: RecoilState<any> =
          'atom' in atomLike ? atomLike.atom : atomLike
        return Object.assign(acc, { [atom.key]: get(atom) })
      }, {} as Record<string, string>),
  })

  function usePersistor() {
    const persistedStore = useRecoilValue(persistanceSelector)

    useEffect(() => {
      AsyncStorage.setItem(PERSISTED_STORE_KEY, JSON.stringify(persistedStore))
    }, [persistedStore])
  }

  const persistedStore = getPersistedStore()
  let resolvePersistorReady: (store: Record<string, any>) => void
  const isPersistorReady = {
    current: false,
    promise: new Promise((res) => {
      resolvePersistorReady = res
    }),
  }

  function useIsInitialStateReady() {
    const [isReady, setIsReady] = useState(false)
    const setters = useRef({})

    for (let i = 0; i < atoms.length; i += 1) {
      const atom = atoms[i]

      if ('readonly' in atom) {
        continue
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const setInitialValue = useSetRecoilState(atom)

      setters.current[atom.key] = setInitialValue
    }

    useEffect(() => {
      ;(async () => {
        const savedStore = await persistedStore

        if (savedStore == null) {
          setIsReady(true)
          return
        }

        atoms.forEach((atomLike) => {
          let atom: RecoilState<any> =
            'atom' in atomLike ? atomLike.atom : atomLike
          if (savedStore[atom.key] == null) {
            return
          }

          setters.current[atom.key]?.(savedStore[atom.key])
        })

        setIsReady(true)
        isPersistorReady.current = true
        resolvePersistorReady(savedStore)
      })()
    }, [setters])

    return isReady
  }

  return {
    usePersistor,
    useIsInitialStateReady,
    isPersistorReady,
  }
}
