import { PropsWithChildren } from 'react'
import cx from 'clsx'

import { CmsImage } from '../../components/CmsImage'

interface Props extends PropsWithChildren {
  className?: string
}

export function DottedBG({ className, children }: Props) {
  return (
    <div className="bg-bg-primary flex justify-center">
      <div
        className={cx(
          'relative flex flex-1 items-center justify-center',
          className
        )}
      >
        <CmsImage
          src="dots.png"
          alt="Dotted pattern"
          fill
          style={{ objectFit: 'contain' }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  )
}
