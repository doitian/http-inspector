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
		const log_key = `${new Date().toISOString()}-${request.cf?.asn}`;
		const body = await request.text();
		const log_value: { method: string; url: string; body: string; headers: Record<string, string> } = {
			method: request.method,
			url: request.url,
			body: body,
			headers: {},
		};
		for (const pair of request.headers.entries()) {
			log_value.headers[pair[0]] = pair[1];
		}
		ctx.waitUntil(env.LOGS.put(log_key, JSON.stringify(log_value)));
		return new Response('OK');
	},
} satisfies ExportedHandler<Env>;
