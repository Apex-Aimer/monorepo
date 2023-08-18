import { memo } from 'react'

import { usePersistor } from '../../store'

function PersistorComp() {
  usePersistor()
  return null
}

export const Persistor = memo(PersistorComp)
