import { Container } from './Container'

interface Props {
  copyright: string
}

export function Footer({ copyright }: Props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-center text-sm">
        Copyright © {new Date().getFullYear()} {copyright}. All rights reserved.
      </div>
    </Container>
  )
}
