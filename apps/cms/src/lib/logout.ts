import { getRequestContext } from '@cloudflare/next-on-pages'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { DB } from '@/db/types'
import { initializeLucia, validateRequest } from './auth'

interface ActionResult {
  error: string | null
}

export async function logout(): Promise<ActionResult> {
  'use server'

  const lucia = initializeLucia()

  const { session } = await validateRequest()
  if (!session) {
    return {
      error: 'Unauthorized',
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  return redirect('/login')
}
