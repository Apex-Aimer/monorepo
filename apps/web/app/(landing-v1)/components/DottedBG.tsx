import { PropsWithChildren } from 'react'
import cx from 'clsx'

import { CloudflareImage } from '../../components/CloudflareImage'

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
        <CloudflareImage
          src="8f0eae94-752e-4fff-4f2a-1e4f71361800"
          alt="Dotted pattern"
          fill
          style={{ objectFit: 'contain' }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  )
}
