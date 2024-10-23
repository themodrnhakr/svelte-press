<script lang="ts">
	import Dashboard from "$lib/components/Dashboard/Dashboard.svelte"
	import Widget from "$lib/components/Widget/Widget.svelte"
	import WidgetsReference from "$lib/components/Widget/WidgetsReference.svelte"

	let modalVisible = false;
	let modalInfo = {}
	const firstName = "Eric"

	function modalToggle(item) {
		if (item.name === modalInfo.name)
			return;
		modalInfo = item;
		modalVisible = true;
	}

	const widgets = [
		{ 
			name: "article-count",
			properties: {
					size: 1
				}
		},
		{ 
			name: "published-article-count",
			properties: {
					size: 1
				}
		},
		{ 
			name: "draft-article-count",
			properties: {
					size: 3
				}
		},
		{ 
			name: "",
			properties: {
					size: 2
				}
		},
		{ 
			name: "",
			properties: {
					size: 1
				}
		},
		{ 
			name: "",
			properties: {
					size: 3
				}
		},
		{ 
			name: "",
			properties: {
					size: 1
				}
		},
		{ 
			name: "",
			properties: {
					size: 4
				}
		},
		{ 
			name: "",
			properties: {
					size: 1
				}
		},
		{ 
			name: "",
			properties: {
					size: 2
				}
		},
		{ 
			name: "",
			properties: {
					size: 2
				}
		},
	]
</script>

<Dashboard name={firstName} {widgets}>
	<Widget />

	{#snippet head()}
	{/snippet}

	{#snippet widget(items)}
		{#each items as item}
			<button class="widget size{item.properties.size}" onclick={() => modalToggle(item)}></button>
		{/each}
	{/snippet}

	{#snippet foot()}
		<WidgetsReference {widgets} />
	{/snippet}
</Dashboard>

{#snippet modal(item)}
	<dialog open class="modal-open">
	<Widget />
	{item}
	</dialog>
{/snippet}

{#if modalVisible}
	{@render modal(modalInfo)}
{/if}

<style>
	dialog::backdrop {
		backdrop-filter: blur(5px);
		background: red;
	}
</style>
