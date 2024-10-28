<script lang='ts'>
	import type { PageServerData } from './$types'

	let { data }: { data: PageServerData } = $props()
	$inspect(data)
	$inspect(data.data)
</script>

{#each data.data as item}
	<a href={"/blog/" + item.slug}><h1 class="heading">{item.title}</h1></a>
{/each}
