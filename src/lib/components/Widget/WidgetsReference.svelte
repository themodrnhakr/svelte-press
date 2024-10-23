<script lang="ts">
	let { widgets } = $props()
</script>

{#snippet referenceItem(item)}
	<h1 class="heading">{item.name}</h1>
	<p><b>Size:</b>{" " + item.properties.size}</p>
{/snippet}

{#each widgets as widget}
	{@render referenceItem(widget)}
{/each}
