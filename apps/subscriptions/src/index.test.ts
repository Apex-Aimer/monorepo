import type { UnstableDevWorker } from 'wrangler';
import { unstable_dev } from 'wrangler';

describe('Blog API', () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev('src/api.ts', {
			experimental: { disableExperimentalWarning: true },
			kv: [
				{
					binding: 'BLOG_EXAMPLE',
					id: 'blog-example',
				},
			],
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	test('GET /posts/:id', async () => {
		const res = await worker.fetch(`/subscriptions/test/has-access`);
		expect(res.status).toBe(200);
	});
});
