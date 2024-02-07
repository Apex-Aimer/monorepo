import { decodeNotificationPayload, isDecodedNotificationDataPayload, isDecodedNotificationSummaryPayload } from 'app-store-server-api';
import { Hono } from 'hono';

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

app.post('/subscriptions/handle', async (c) => {
	const payload = await decodeNotificationPayload(await c.req.text());

	if (payload.data?.bundleId !== APP_BUNDLE_ID) {
		// Pass the notification
		return new Response(null, { status: 200 });
	}

	// Notifications can contain either a data field or a summary field but never both.
	// Use the provided type guards to determine which is present.
	if (isDecodedNotificationDataPayload(payload)) {
		// payload is of type DecodedNotificationDataPayload
		console.log(payload);
	}

	if (isDecodedNotificationSummaryPayload(payload)) {
		// payload is of type DecodedNotificationSummaryPayload
		console.log(payload);
	}

	return new Response(null, { status: 200 });
});

export default app;
