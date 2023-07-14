import { PropsWithChildren } from 'react'

export function HeaderContainer({ children }: PropsWithChildren<{}>) {
  return (
    <div className="mx-auto max-w-screen-xl px-8 py-5 lg:py-8 xl:px-5">
      {children}
    </div>
  )
}
