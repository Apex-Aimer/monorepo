import { generateState } from 'arctic'
import { cookies } from 'next/headers'

import { getGithubClient } from '@lib/auth'

export const runtime = 'edge'

export async function GET(): Promise<Response> {
  const state = generateState()
  const github = getGithubClient()
  const url = await github.createAuthorizationURL(state)

  cookies().set('github_oauth_state', state, {
    path: '/',
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  return Response.redirect(url)
}
