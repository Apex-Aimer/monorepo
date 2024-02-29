export const runtime = 'edge'

export async function GET() {
  const data = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CLOUDFLARE_CMS_API_TOKEN}`,
      },
    }
  ).then((res) => res.json())

  if (!data.success) {
    return new Response(null, { status: 404 })
  }

  return new Response(JSON.stringify(data.result), {
    headers: { 'Content-Type': 'application/json' },
  })
}
