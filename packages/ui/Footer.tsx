interface Props {
  copyright: string
  container?: React.ComponentType
}

export function Footer({ copyright, container }: Props) {
  const Container = container || 'div'
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-center text-sm">
        Copyright © {new Date().getFullYear()} {copyright}. All rights reserved.
      </div>
    </Container>
  )
}
