// @ts-ignore
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET() {
  const r2storage = (getRequestContext().env as CloudflareEnv).R2STORAGE

  const listing = await r2storage.list({ limit: 1000 })

  return new Response(JSON.stringify(listing), {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      ...(process.env.NODE_ENV === 'development'
        ? { 'Access-Control-Allow-Origin': '*' }
        : null),
    },
  })
}
