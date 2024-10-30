<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';

	let {
		children,
		title: modalTitle = '{title here}',
		description: modalDescription = '{description here}'
	} = $props();

	const {
		elements: { trigger, portalled, overlay, content, title, description, close },
		states: { open }
	} = createDialog();
</script>

<button use:melt={$trigger}>Open Dialog</button>

{#if $open}
	<div use:melt={$portalled}>
		<div use:melt={$overlay} class="overlay blur"></div>
		<div use:melt={$content} class="content card">
			{#if title !== false}
				<h1 use:melt={$title} class="heading">{modalTitle}</h1>
			{/if}
			{#if description !== false}
				<p use:melt={$description} class="text">{modalDescription}</p>
			{/if}
			{@render children()}
			<button use:melt={$close}>Close</button>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 40;
	}

	.overlay.blur {
		backdrop-filter: blur(3px);
	}

	.content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 50;
	}

	.content.card {
		padding: 1rem;
		background: white;
		border-radius: 0.5rem;
		box-shadow:
			0px 0px 2.2px -2px rgba(0, 0, 0, 0.031),
			0px 0px 5.3px -2px rgba(0, 0, 0, 0.043),
			0px 0px 10px -2px rgba(0, 0, 0, 0.052),
			0px 0px 17.9px -2px rgba(0, 0, 0, 0.061),
			0px 0px 33.4px -2px rgba(0, 0, 0, 0.075),
			0px 0px 80px -2px rgba(0, 0, 0, 0.11);
	}
</style>
