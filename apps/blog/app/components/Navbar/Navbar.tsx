import Link from 'next/link'
import { Container } from '../Container'
import { NavbarLogo } from './NavbarLogo'

interface MenuItem {
  label: string
  href: string
  external?: boolean
  badge?: string
}

const leftmenu: MenuItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  // {
  //   label: 'About',
  //   href: '/about',
  // },
]

const rightmenu: MenuItem[] = [
  // {
  //   label: 'Archive',
  //   href: '/archive',
  // },
  {
    label: 'About',
    href: '/about',
  },
]

const mobilemenu: MenuItem[] = [...leftmenu, ...rightmenu]

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

const mapMenuItems = (item, index) => <MenuItem {...item} index={index} />

export default function Navbar() {
  return (
    <Container>
      <nav>
        <>
          <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
            <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
              {leftmenu.map(mapMenuItems)}
            </div>
            <div className="flex shrink-0 grow-0 basis-[200px]">
              <NavbarLogo />
            </div>
            <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
              {rightmenu.map(mapMenuItems)}
            </div>
            <div className="flex flex-row items-center md:hidden">
              {mobilemenu.map(mapMenuItems)}
            </div>
          </div>
        </>
      </nav>
    </Container>
  )
}
