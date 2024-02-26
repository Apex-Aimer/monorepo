/* eslint-disable turbo/no-undeclared-env-vars */
require('dotenv').config();

const { AppStoreServerAPI, Environment } = require('app-store-server-api');

const api = new AppStoreServerAPI(
	process.env.IN_APP_PURCHASE_KEY as string,
	process.env.IN_APP_PURCHASE_KEY_ID as string,
	process.env.IN_APP_PURCHASE_ISSUER_ID as string,
	'com.apexaimer',
	Environment.Sandbox
);

async function main() {
	const response = await api.requestTestNotification();

	console.log(response);
}
main();
