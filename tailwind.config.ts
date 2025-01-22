import { join } from 'path';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { myCustomTheme } from './my-custom-theme';
import forms from '@tailwindcss/forms';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// '../node_modules/@skeletonlabs/skeleton/**/*.{html,js,svelte,ts}'
		// '../node_modules/@skeletonlabs/tw-plugin/**/*.{html,js,svelte,ts}'
		// '../node_modules/@skeletonlabs/../**/*.{html,js,svelte,ts}'
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],

	theme: {
		extend: {}
	},

	plugins: [
		typography,
		forms,
		skeleton({
			themes: {
				custom: [myCustomTheme],
				preset: [
					{
						name: 'vintage',
						enhancements: true
					}
				]
			}
		})
	]
} satisfies Config;
