/* eslint-disable turbo/no-undeclared-env-vars */
import { Lucia, Session, User } from 'lucia'
import { D1Adapter } from '@lucia-auth/adapter-sqlite'
import { GitHub } from 'arctic'
import { cache } from 'react'
import { cookies } from 'next/headers'
// @ts-ignore
import { getRequestContext } from '@cloudflare/next-on-pages'

import { UserRoles, UsersTable } from '@db/types'

export function initializeLucia() {
  const ctx = getRequestContext()

  const adapter = new D1Adapter(ctx.env.D1DATA, {
    user: 'users',
    session: 'userSessions',
  })

  return new Lucia(adapter, {
    sessionCookie: {
      expires: false,
      attributes:
        process.env.NODE_ENV === 'production'
          ? {
              secure: true,
              sameSite: 'strict',
              domain: process.env.NEXT_PUBLIC_CMS_DOMAIN,
            }
          : {
              secure: false,
            },
    },
    getUserAttributes: (attributes) => {
      return {
        githubId: attributes.githubId,
        username: attributes.username,
      }
    },
  })
}

declare module 'lucia' {
  interface Register {
    Lucia: ReturnType<typeof initializeLucia>
    DatabaseSessionAttributes: {
      role: UserRoles
    }
    DatabaseUserAttributes: UsersTable
  }
}

export function getGithubClient() {
  const ctx = getRequestContext()

  return new GitHub(
    process.env.GITHUB_CLIENT_ID || ctx.env.GITHUB_CLIENT_ID,
    process.env.GITHUB_CLIENT_SECRET || ctx.env.GITHUB_CLIENT_SECRET
  )
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    // @ts-ignore
    const lucia = initializeLucia()

    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
    if (!sessionId) {
      return {
        user: null,
        session: null,
      }
    }

    const result = await lucia.validateSession(sessionId)
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id)
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        )
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie()
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        )
      }
    } catch {}
    return result
  }
)
