'use client'

import { useEffect, useState } from 'react'
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import { DragDrop } from '@uppy/react'
import { useRouter } from 'next/navigation'

// Uppy styles
import '@uppy/core/dist/style.min.css'
import '@uppy/drag-drop/dist/style.min.css'

export function Uploader() {
  const [uppy] = useState(() => {
    const uppy = new Uppy({
      autoProceed: true,
      restrictions: {
        maxNumberOfFiles: 1,
      },
    }).use(XHRUpload, { endpoint: '/api/media/upload' })
    return uppy
  })

  useEffect(() => {
    const onComplete = () => {
      location.reload()
    }
    uppy.on('complete', onComplete)

    return () => {
      uppy.off('complete', onComplete)
    }
  }, [uppy])

  return (
    <div className="flex w-full flex-row justify-center">
      <div className="w-full max-w-md">
        {/* @ts-ignore */}
        <DragDrop uppy={uppy} />
      </div>
    </div>
  )
}
