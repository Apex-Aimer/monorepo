import Link from 'next/link'
import { Fragment } from 'react'
import cx from 'clsx'

import { HeaderLogo } from './HeaderLogo'
import { HeaderMobileButton, HeaderMobileSection } from './HeaderMobile'

interface MenuItem {
  label: string
  href: string
  external?: boolean
  badge?: string
}

function MenuItem({
  index,
  href,
  label,
  external,
  badge,
}: MenuItem & { index: number }) {
  return (
    <Link
      href={href}
      key={`${label}${index}`}
      className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
      target={external ? '_blank' : ''}
      rel={external ? 'noopener' : ''}
    >
      <span>{label}</span>
      {badge && (
        <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-cyan-200 dark:text-blue-800 ">
          {badge}
        </span>
      )}
    </Link>
  )
}

const mapMenuItems = (item: MenuItem, index: number) => (
  <MenuItem {...item} index={index} />
)

interface NavbarProps {
  left?: MenuItem[]
  right?: MenuItem[]
  container?: React.ComponentType
}

export function Header({ left = [], right = [], container }: NavbarProps) {
  const Container = container || Fragment
  const all = [...left, ...right]

  return (
    <Container>
      <nav>
        <>
          <div
            className={cx('flex flex-nowrap justify-between', 'md:flex-wrap')}
          >
            <div className="flex shrink-0 grow-0 basis-[150px]">
              <HeaderLogo />
            </div>
            <div
              className={cx(
                'hidden w-auto flex-1 flex-row items-center justify-end',
                'md:flex md:w-full'
              )}
            >
              {all.map(mapMenuItems)}
            </div>
            <HeaderMobileButton />
          </div>
          <HeaderMobileSection>{all.map(mapMenuItems)}</HeaderMobileSection>
        </>
      </nav>
    </Container>
  )
}
