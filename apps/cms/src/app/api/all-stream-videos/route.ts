/* eslint-disable turbo/no-undeclared-env-vars */
// @ts-ignore
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET() {
  const ctx = getRequestContext()

  const cfAccountId =
    process.env.CLOUDFLARE_ACCOUNT_ID || ctx.env.CLOUDFLARE_ACCOUNT_ID
  const cfCmsApiToken =
    process.env.CLOUDFLARE_CMS_API_TOKEN || ctx.env.CLOUDFLARE_CMS_API_TOKEN

  try {
    const data = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/stream`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cfCmsApiToken}`,
        },
      }
    ).then((res) => res.json())

    if (!data.success) {
      console.log(JSON.stringify(data))
      return new Response(null, { status: 404 })
    }

    return new Response(JSON.stringify(data.result), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    return new Response(null, { status: 500 })
  }
}
