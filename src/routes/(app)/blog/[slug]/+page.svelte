<script lang='ts'>
	import type { PageServerLoad } from "./$types"

	let { data }: { data: PageServerLoad } = $props()
</script>

{#snippet blog(data)}
	<div class="top">
		<h1 class="title">{data.post[0].title}</h1>
		{#if data.post[0].subtitle}
			<h2 class="subtitle">{data.post[0].subtitle}</h2>
		{/if}
		{#if data.post[0].author}
			<h2 class="author">{data.post[0].author}</h2>
		{/if}
	</div>
	{@html data.post[0].body}
{/snippet}

{@render blog(data)}

<style>
	.top {
		padding-bottom: 1rem;
	}
</style>
