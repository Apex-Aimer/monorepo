import { MMKV } from 'react-native-mmkv'

export const createMockMMKV = (): MMKV => {
  const storage = new Map<string, string | boolean | number | Uint8Array>()

  return {
    clearAll: () => storage.clear(),
    delete: (key) => storage.delete(key),
    set: (key, value) => storage.set(key, value),
    getString: (key) => {
      const result = storage.get(key)
      return typeof result === 'string' ? result : undefined
    },
    getNumber: (key) => {
      const result = storage.get(key)
      return typeof result === 'number' ? result : undefined
    },
    getBoolean: (key) => {
      const result = storage.get(key)
      return typeof result === 'boolean' ? result : undefined
    },
    getBuffer: (key) => {
      const result = storage.get(key)
      return result instanceof Uint8Array ? result : undefined
    },
    getAllKeys: () => Array.from(storage.keys()),
    contains: (key) => storage.has(key),
    recrypt: () => {
      console.warn('Encryption is not supported in mocked MMKV instances!')
    },
  } as any
}
