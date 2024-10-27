<script lang="ts">
	import { createScrollArea, melt } from "@melt-ui/svelte"


	let { widgets } = $props()
	const widgetsSorted = widgets.sort((a, b) => a.name.localeCompare(b.name))
	const {
		elements: { root, content, viewport, corner, scrollbarY, thumbY },
	} = createScrollArea({
		type: 'scroll',
		dir: 'ltr',
	});

	const test = Object.keys(widgets[0].properties)
	$inspect(test)
</script>

{#snippet referenceItem(item)}
	<div use:melt={$root}>
		<div use:melt={$content}>
			<h2 class="heading">{item.name}</h2>
			{#each Object.keys(item.properties) as property}
				<p><b>{property.charAt(0).toUpperCase() + property.substring(1) + ": "}</b>{item.properties[property]}</p>
			{/each}
		</div>
	</div>
{/snippet}

{#each widgetsSorted as widget}
	{@render referenceItem(widget)}
{/each}
