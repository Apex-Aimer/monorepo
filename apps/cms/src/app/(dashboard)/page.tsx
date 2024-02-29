import { redirect } from 'next/navigation'

import { validateRequest } from '@lib/auth'
import { Dashboard } from './Dashboard'

export const runtime = 'edge'

export default async function Home() {
  const { user } = await validateRequest()

  if (!user) {
    return redirect('/login')
  }

  return <Dashboard />
}
