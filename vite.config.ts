import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5199
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
