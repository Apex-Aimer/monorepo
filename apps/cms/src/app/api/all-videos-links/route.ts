// @ts-ignore
import { getRequestContext } from '@cloudflare/next-on-pages'

import { CloudflareEnv } from '../../../../env'

export const runtime = 'edge'

export async function GET() {
  try {
    const kv = (getRequestContext().env as CloudflareEnv).KVDATA

    const { keys } = await kv.list({ limit: 1000 })

    const pairs = await Promise.all(
      keys.map(async ({ name }) => {
        const { value, metadata } = await kv.getWithMetadata(name)

        return { slug: name, cfId: value, metadata }
      }, {})
    )

    const map = pairs.reduce((acc, { slug, cfId, metadata }) => {
      acc[cfId] = { slug, metadata }

      return acc
    }, {})

    return new Response(JSON.stringify(map), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(null, { status: 500 })
  }
}
