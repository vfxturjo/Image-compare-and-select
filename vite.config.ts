import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	// server: {
	// 	https: true
	// },
	build: {
		commonjsOptions: {
			transformMixedEsModules: true
		}
	},
	plugins: [sveltekit(), mkcert()]
});
