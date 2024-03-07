// @ts-ignore
import { getRequestContext } from '@cloudflare/next-on-pages'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const r2storage = (getRequestContext().env as CloudflareEnv).R2STORAGE

  try {
    const data = await req.formData()

    const name = data.get('name')
    const file = data.get('file') as File

    if (typeof name !== 'string' || !file) {
      return NextResponse.json(
        { message: 'FormData is not valid.' },
        { status: 500 }
      )
    }

    await r2storage.put(name, await file.arrayBuffer(), {
      httpMetadata: {
        contentType: file.type,
      },
    })

    return new Response(null, { status: 200 })
  } catch {
    return new Response(null, { status: 500 })
  }
}
