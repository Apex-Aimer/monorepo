'use client'

import Link from 'next/link'

import LogoFullDark from './LogoFullDark'
import LogoFullLight from './LogoFullLight'

export function HeaderLogo() {
  return (
    <>
      <div className="hidden flex-1 items-center justify-between md:w-auto dark:flex">
        <Link href="/" className="flex-1">
          {/* @ts-ignore */}
          <LogoFullDark alt="ApexAimer Logo" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-between md:w-auto dark:hidden">
        <Link href="/" className="flex-1">
          <LogoFullLight alt="ApexAimer Logo" />
        </Link>
      </div>
    </>
  )
}
