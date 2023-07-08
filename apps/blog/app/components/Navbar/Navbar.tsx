import Link from 'next/link'
// import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Container } from '../Container'
import { NavbarLogo } from './NavbarLogo'

interface MenuItem {
  label: string
  href: string
  external?: boolean
  badge?: string
}

interface Props {
  // TODO
  logo?: any
  // TODO
  logoalt?: any
}

const leftmenu: MenuItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

const rightmenu: MenuItem[] = [
  {
    label: 'Archive',
    href: '/archive',
  },
  {
    label: 'Pro Version',
    href: 'https://stablo-pro.web3templates.com/',
    external: true,
    badge: 'new',
  },
]

export default function Navbar({ logo, logoalt }: Props) {
  return (
    <Container>
      <nav>
        <>
          <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
            <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
              {leftmenu.map((item, index) => (
                <Link
                  href={item.href}
                  key={`${item.label}${index}`}
                  className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                  target={item.external ? '_blank' : ''}
                  rel={item.external ? 'noopener' : ''}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-cyan-200 dark:text-blue-800 ">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
            <div className="flex basis-[200px]">
              <NavbarLogo />
            </div>
            <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
              {rightmenu.map((item, index) => (
                <Link
                  href={item.href}
                  key={`${item.label}${index}`}
                  className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                  target={item.external ? '_blank' : ''}
                  rel={item.external ? 'noopener' : ''}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-cyan-200 dark:text-blue-800 ">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </>
      </nav>
    </Container>
  )
}
