// @ts-ignore
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

interface Params {
  params: { name: string }
}

export async function GET(_req: Request, { params: { name } }: Params) {
  const r2storage = (getRequestContext().env as CloudflareEnv).R2STORAGE

  try {
    const object = await r2storage.get(name)

    if (object == null) {
      return new Response(null, { status: 404 })
    }

    const headers = new Headers()
    headers.set('etag', object.httpEtag)
    if (process.env.NODE_ENV) {
      headers.set('Access-Control-Allow-Origin', '*')
    }

    // @ts-ignore
    return new Response(object.body, {
      headers,
    })
  } catch (err) {
    console.error(err.message)
    return new Response(null, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params: { name } }: Params) {
  const r2storage = (getRequestContext().env as CloudflareEnv).R2STORAGE

  try {
    await r2storage.delete(name)

    return new Response(null, { status: 200 })
  } catch {
    return new Response(null, { status: 500 })
  }
}
