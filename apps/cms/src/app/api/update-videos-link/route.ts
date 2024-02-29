import { NextRequest } from 'next/server'
// @ts-ignore
import { getRequestContext } from '@cloudflare/next-on-pages'

import { CloudflareEnv } from '../../../../env'

export const runtime = 'edge'

interface DataToUpdate {
  cfId: string
  slug: string
  metadata: {
    thumbnail: string
    hls: string
  }
}

export async function POST(req: NextRequest) {
  try {
    const { cfId, slug, metadata }: DataToUpdate = await req.json()

    const kv = (getRequestContext().env as CloudflareEnv).KVDATA

    await kv.put(slug, cfId, { metadata })

    return new Response(null, {
      status: 200,
    })
  } catch {
    return new Response(null, { status: 500 })
  }
}
