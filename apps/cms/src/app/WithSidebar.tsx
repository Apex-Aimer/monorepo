'use client'

import type { PropsWithChildren } from 'react'
import { HeaderLogo } from 'ui'
import { Layout } from 'antd'

export function WithSidebar({ children }: PropsWithChildren) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider className="!bg-bg-accent px-8 pt-4" width={260}>
        <HeaderLogo />
        {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
      </Layout.Sider>
      <Layout.Content style={{ display: 'flex' }}>
        <div className="bg-bg-primary flex flex-1">{children}</div>
      </Layout.Content>
    </Layout>
  )
}
