// @ts-ignore
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

interface Params {
  params: { slug: string }
}

export async function GET(_request: Request, { params: { slug } }: Params) {
  try {
    const kv = (getRequestContext().env as CloudflareEnv).KVDATA

    const { metadata } = await kv.getWithMetadata<{ hls: string }>(
      slug as string
    )

    if (metadata == null) {
      return new Response('Not Found', { status: 404 })
    }

    return Response.redirect(metadata.hls, 302)
  } catch {
    return new Response(null, { status: 500 })
  }
}
