import { MMKV } from 'react-native-mmkv'
import { AtomEffect, DefaultValue } from 'recoil'

// export const defaultStorage = createMockMMKV()
export const defaultStorage = new MMKV()

export function getPersistedStorageData(key: string) {
  let data = defaultStorage.getString(key)
  if (data != null) {
    return JSON.parse(data)
  }
  return undefined
}

export const persistAtom: AtomEffect<any> = ({ setSelf, onSet, node }) => {
  setSelf(() => {
    const data = getPersistedStorageData(node.key)
    if (data != null) {
      return data
    } else {
      return new DefaultValue()
    }
  })

  onSet((newValue, _, isReset) => {
    if (isReset) {
      defaultStorage.delete(node.key)
    } else {
      defaultStorage.set(node.key, JSON.stringify(newValue))
    }
  })
}
