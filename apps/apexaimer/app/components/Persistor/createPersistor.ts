import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useRef, useState } from 'react'
import {
  RecoilState,
  selector,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

const PERSISTED_STORE_KEY = '__state__'

async function getPersistedStore() {
  try {
    const serializedStore = await AsyncStorage.getItem(PERSISTED_STORE_KEY)

    return JSON.parse(serializedStore)
  } catch {
    return null
  }
}

export function createPersistor(...atoms: RecoilState<any>[]) {
  const persistanceSelector = selector({
    key: 'persistor',
    get: ({ get }) =>
      atoms.reduce(
        (acc, atom) => Object.assign(acc, { [atom.key]: get(atom) }),
        {} as Record<string, string>
      ),
  })

  function usePersistor() {
    const persistedStore = useRecoilValue(persistanceSelector)

    useEffect(() => {
      console.log({ persistedStore })
      AsyncStorage.setItem(PERSISTED_STORE_KEY, JSON.stringify(persistedStore))
    }, [persistedStore])
  }

  function useIsInitialStateReady() {
    const [isReady, setIsReady] = useState(false)
    const setters = useRef({})

    for (let i = 0; i < atoms.length; i += 1) {
      const atom = atoms[i]
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const setInitialValue = useSetRecoilState(atom)

      setters.current[atom.key] = setInitialValue
    }

    useEffect(() => {
      ;(async () => {
        const savedStore = await getPersistedStore()

        console.log({ savedStore })

        if (savedStore == null) {
          setIsReady(true)
          return
        }

        atoms.forEach((atom) => {
          if (savedStore[atom.key] == null) {
            return
          }

          setters.current[atom.key]?.(savedStore[atom.key])
        })

        setIsReady(true)
      })()
    }, [setters])

    return isReady
  }

  return {
    usePersistor,
    useIsInitialStateReady,
  }
}
