import { Hono } from 'hono';
import { Kysely } from 'kysely';
import { D1Dialect } from 'kysely-d1';

import { decodeNotificationPayload } from './decoding';
import { SubscriptionNotification, SubscriptionSignedTransactionInfo } from './types';

type Bindings = {
	DB: D1Database;
};

interface Subscriptions {
	id: string;
	created_at: number;
	starts_at: number;
	ends_at: number;
	product: string;
}

interface Database {
	Subscriptions: Subscriptions;
}

const app = new Hono<{ Bindings: Bindings }>();

app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.get('/subscriptions/:root-token/has-access', async (c) => {
	const db = new Kysely<Database>({
		dialect: new D1Dialect({ database: c.env.DB }),
	});

	try {
		const rootToken = c.req.param('root-token');

		const result = await db.selectFrom('Subscriptions').selectAll().where('id', '=', rootToken).executeTakeFirst();

		if (result == null) {
			return c.json({ message: 'Subscription Not Found', ok: false }, 404);
		}

		if (Date.now() > result.ends_at) {
			return c.json({ message: 'Subscription Not Found', ok: false }, 404);
		}
		return c.json({ message: 'Subscription Found', ok: true }, 200);
	} catch (err) {
		if (err instanceof Error) {
			return c.json({ message: 'Error', details: err.message, ok: false }, 500);
		}
	}
});

const APP_BUNDLE_ID = 'com.apexaimer';

app.post('/subscriptions/apple/handle', async (c) => {
	const db = new Kysely<Database>({
		dialect: new D1Dialect({ database: c.env.DB }),
	});

	const { signedPayload } = await c.req.json<{ signedPayload: string }>();

	try {
		const payload = await decodeNotificationPayload<SubscriptionNotification>(signedPayload);

		if (payload.data?.bundleId !== APP_BUNDLE_ID) {
			// Pass the notification
			return new Response(null, { status: 200 });
		}

		const transactionInfo = await decodeNotificationPayload<SubscriptionSignedTransactionInfo>(payload.data.signedTransactionInfo);

		const record = await db
			.selectFrom('Subscriptions')
			.selectAll()
			.where('id', '=', transactionInfo.originalTransactionId)
			.executeTakeFirst();

		if (
			transactionInfo.originalTransactionId == null ||
			transactionInfo.purchaseDate == null ||
			transactionInfo.expiresDate == null ||
			transactionInfo.productId == null
		) {
			// TODO: the event is unexpected
			return new Response(null, { status: 200 });
		}

		if (payload.data.environment === 'Sandbox') {
			console.log({
				notificationType: payload.notificationType,
				notificationSubtype: 'subtype' in payload ? payload.subtype : 'no subtype',
				originalTransactionId: transactionInfo.originalTransactionId,
				purchaseDate: new Date(transactionInfo.purchaseDate).toString(),
				expiresDate: new Date(transactionInfo.expiresDate).toString(),
				productId: transactionInfo.productId,
			});
		}

		if (record == null) {
			await db
				.insertInto('Subscriptions')
				.values([
					{
						id: transactionInfo.originalTransactionId,
						created_at: Date.now(),
						starts_at: transactionInfo.purchaseDate,
						ends_at: transactionInfo.expiresDate,
						product: transactionInfo.productId,
					},
				])
				.execute();
		} else {
			await db
				.updateTable('Subscriptions')
				.set({ ends_at: transactionInfo.expiresDate, product: transactionInfo.productId })
				.where('id', '=', transactionInfo.originalTransactionId)
				.execute();
		}

		/**
		 * In case we need to handle specific notifications in some way
		 */
		// if (payload.notificationType === 'SUBSCRIBED') {
		// 	return new Response(null, { status: 200 });
		// }
	} catch {
		// no-op
		return new Response(null, { status: 500 });
	}

	return new Response(null, { status: 200 });
});

app.post('/subscriptions/android/handle', async (c) => {
	return new Response(null, { status: 200 });
});

export default app;
