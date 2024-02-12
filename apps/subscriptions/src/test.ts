/* eslint-disable turbo/no-undeclared-env-vars */
import 'dotenv/config';

import { decodeNotificationPayload } from './decoding';
import { cancelled, didRenew, initialBuy } from './appstoreNotifications';

async function main() {
	console.log('initial');
	console.log(await decodeNotificationPayload(initialBuy.data.signedTransactionInfo));
	console.log(await decodeNotificationPayload(initialBuy.data.signedRenewalInfo));
	console.log('renewal');
	console.log(await decodeNotificationPayload(didRenew.data.signedTransactionInfo));
	console.log(await decodeNotificationPayload(didRenew.data.signedRenewalInfo));
	console.log('cancelled');
	console.log(await decodeNotificationPayload(cancelled.data.signedTransactionInfo));
	console.log(await decodeNotificationPayload(cancelled.data.signedRenewalInfo));
}
main();
