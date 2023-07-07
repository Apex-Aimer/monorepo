import cx from 'clsx'

interface Props {
  alt?: string
  className?: string
  children: React.ReactNode
}

export function Container({ alt, className, children }: Props) {
  return (
    <div
      className={cx(
        'container mx-auto px-8 xl:px-5',
        'max-w-screen-md',
        !alt && 'py-5 lg:py-8',
        className
      )}
    >
      {children}
    </div>
  )
}
