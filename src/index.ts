/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const body = await request.text();
		console.log(`${request.method} ${request.url}`);
		for (const pair of request.headers.entries()) {
			console.log(`${pair[0]}: ${pair[1]}`);
		}
		console.log(`\n${body}`);
		return new Response('OK');
	},
} satisfies ExportedHandler<Env>;
