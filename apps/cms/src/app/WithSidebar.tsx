'use client'

import type { PropsWithChildren } from 'react'
import { HeaderLogo } from 'ui'
import { Layout } from 'antd'
import Link from 'next/link'

export function WithSidebar({ children }: PropsWithChildren) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider className="!bg-bg-accent px-8 pt-4" width={260}>
        <HeaderLogo />
        <div className="flex flex-col gap-3 pt-8">
          <Link href="/" className="font-prime text-text-primary text-lg">
            Videos proxy
          </Link>
          <Link href="/media" className="font-prime text-text-primary text-lg">
            Media
          </Link>
        </div>
      </Layout.Sider>
      <Layout.Content style={{ display: 'flex' }}>
        <div className="bg-bg-primary flex flex-1">{children}</div>
      </Layout.Content>
    </Layout>
  )
}
