import { checkPasswordStrength } from './lib/pw';
import { I_CheckPasswordReqestBody } from './types';

// Function to generate CORS headers
function getCommonHeaders() {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Cache-Control': 'no-store',
		'Content-Type': 'application/json',
	};
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Handle CORS preflight request
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: getCommonHeaders(),
			});
		}

		// Allow only POST requests
		if (request.method !== 'POST') {
			return new Response(null, { status: 405, headers: getCommonHeaders() });
		}

		try {
			// Parse the request body
			const body = (await request.json()) as I_CheckPasswordReqestBody;
			const { password } = body;

			// Check if the password field is missing or empty
			if (!password) {
				return new Response(JSON.stringify({ error: 'Password is required' }), {
					status: 400,
					headers: {
						...getCommonHeaders(),
					},
				});
			}

			// Check the password strength
			const result = checkPasswordStrength(password);

			return new Response(JSON.stringify(result), {
				headers: {
					...getCommonHeaders(),
				},
			});
		} catch (error) {
			return new Response(JSON.stringify({ error: 'Invalid request' }), {
				status: 400,
				headers: {
					...getCommonHeaders(),
				},
			});
		}
	},
} satisfies ExportedHandler<Env>;
