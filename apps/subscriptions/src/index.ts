import { Hono } from 'hono';
import { decodeNotificationPayload } from './decoding';

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.get('/subscriptions/:transaction/has-access', async (c) => {
	// const resp = await obj.fetch(c.req.url)

	// if (resp.status === 404) {
	//   return c.text('404 Not Found', 404)
	// }

	// const count = parseInt(await resp.text())
	const originalTransactionId = c.req.param('transaction');

	if (false) {
		return c.json({ message: 'Subscription Found', ok: true }, 200);
	}
	return c.json({ message: 'Subscription Not Found', ok: false }, 404);
});

const APP_BUNDLE_ID = 'com.apexaimer';

app.post('/subscriptions/apple/handle', async (c) => {
	const { signedPayload } = await c.req.json<{ signedPayload: string }>();

	try {
		const payload = await decodeNotificationPayload(signedPayload);

		console.log(payload);

		if (payload.data?.bundleId !== APP_BUNDLE_ID) {
			// Pass the notification
			return new Response(null, { status: 200 });
		}
	} catch {
		// no-op
	}

	return new Response(null, { status: 200 });
});

app.post('/subscriptions/android/handle', async (c) => {
	return new Response(null, { status: 200 });
});

export default app;
