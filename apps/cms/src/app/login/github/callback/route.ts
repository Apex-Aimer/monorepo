import { cookies } from 'next/headers'
import { OAuth2RequestError } from 'arctic'
import { Kysely } from 'kysely'
import { D1Dialect } from 'kysely-d1'
// @ts-ignore
import { getRequestContext } from '@cloudflare/next-on-pages'

import { DB } from '@db/types'
import { getGithubClient, initializeLucia } from '@lib/auth'

export const runtime = 'edge'

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = cookies().get('github_oauth_state')?.value ?? null

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    })
  }

  const ctx = getRequestContext()
  const db = new Kysely<DB>({
    dialect: new D1Dialect({ database: ctx.env.D1DATA }),
  })

  const lucia = initializeLucia()

  try {
    const github = getGithubClient()
    const tokens = await github.validateAuthorizationCode(code)
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    })
    const githubUser: GitHubUser = await githubUserResponse.json()

    // Replace this with your own DB client.
    const existingUser = await db
      .selectFrom('users')
      .where('githubId', '=', githubUser.login)
      .select(['id', 'role'])
      .executeTakeFirstOrThrow()

    const session = await lucia.createSession(existingUser.id, {
      role: existingUser.role,
    })
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    })
  } catch (e) {
    console.log(e.message)
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      })
    }
    return new Response(null, {
      status: 500,
    })
  }
}

interface GitHubUser {
  id: string
  login: string
}
