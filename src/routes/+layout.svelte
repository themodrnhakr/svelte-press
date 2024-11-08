<script lang="ts">
	import { onMount } from 'svelte';
	import { startTheme } from '$lib/theme/init.svelte';
	import craftTheme from '$lib/theme/crafter.svelte';
	import { theme } from '$lib/theme/bucket/default/index.svelte';

	onMount(() => {
		console.log('worked');
		startTheme(craftTheme(theme));
	});
</script>

<slot />

<style>
	:root {
		background: var(--background-color);
	}
</style>
