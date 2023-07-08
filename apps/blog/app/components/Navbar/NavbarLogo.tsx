'use client'

import Link from 'next/link'

import LogoFullDark from './LogoFullDark'
import LogoFullLight from './LogoFullLight'

export function NavbarLogo() {
  return (
    <>
      <div className="hidden flex-1 items-center justify-between dark:flex md:w-auto">
        <Link href="/" className="flex-1">
          <LogoFullDark alt="ApexAimer Logo" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-between dark:hidden md:w-auto">
        <Link href="/" className="flex-1">
          <LogoFullLight alt="ApexAimer Logo" />
        </Link>
      </div>
    </>
  )
}
