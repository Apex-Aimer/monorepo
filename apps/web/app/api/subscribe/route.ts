interface MailchimpFetchCommand {
  method: 'POST' | 'GET' | 'PATCH'
  path: string
  body?: string
}

class MailchimpListsCommands {
  addListMember({
    audienceId,
    address,
    status = 'subscribed',
  }: {
    audienceId: string
    address: string
    status?:
      | 'subscribed'
      | 'unsubscribed'
      | 'cleaned'
      | 'pending'
      | 'transactional'
  }): MailchimpFetchCommand {
    return {
      method: 'POST',
      path: `/lists/${audienceId}`,
      body: JSON.stringify({
        members: [
          {
            email_address: address,
            status,
          },
        ],
      }),
    }
  }
}

class MailchimpCommands {
  private static _instance: MailchimpCommands
  static get instance() {
    if (this._instance == null) {
      this._instance = new MailchimpCommands()
    }
    return this._instance
  }

  lists = new MailchimpListsCommands()

  ping(): MailchimpFetchCommand {
    return {
      method: 'GET',
      path: '/ping',
    }
  }
}

function fetchMailchimp({ path, method, body }: MailchimpFetchCommand) {
  return fetch(
    `https://${process.env.MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0${path}`,
    {
      method,
      body,
      headers: {
        authorization: `Basic ${btoa(
          `anystring:${process.env.MAILCHIMP_API_KEY}`
        )}`,
      },
    }
  )
}

export const runtime = 'edge'

export async function POST(request: Request) {
  let address = ''

  try {
    const { address: addr } = await request.json()

    address = addr
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 500,
    })
  }

  try {
    const res = await (
      await fetchMailchimp(
        MailchimpCommands.instance.lists.addListMember({
          audienceId: process.env.MAILCHIMP_AUDIENCE_ID,
          address,
        })
      )
    ).json()

    console.log({
      address,
      errors: res.errors,
    })

    if ('errors' in res && res.errors?.length) {
      const { error, field_message } = res.errors[0]

      if (field_message) {
        throw new Error(field_message)
      }

      throw new Error(error)
    }

    return new Response(res, {
      status: 200,
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    })
  }
}
