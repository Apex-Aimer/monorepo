import clsx from 'clsx'
import { PropsWithChildren } from 'react'

export function HeaderContainer({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        'mx-auto max-w-screen-xl py-5 md:px-8 lg:py-8 xl:px-5',
        className
      )}
    >
      {children}
    </div>
  )
}
