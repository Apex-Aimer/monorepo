import cx from 'clsx'

interface Props {
  copyright: string
  hasBorder?: boolean
  container?: React.ComponentType
}

export function Footer({ copyright, container, hasBorder = false }: Props) {
  const Container = container || 'div'
  return (
    <Container
      className={cx(
        'bg-bg-primary pt-10',
        hasBorder && 'border-t border-gray-100 dark:border-gray-800'
      )}
    >
      <div className="text-text-primary text-center text-sm">
        Copyright © {new Date().getFullYear()} {copyright}. All rights reserved.
      </div>
    </Container>
  )
}
