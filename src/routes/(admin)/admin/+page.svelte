<script lang="ts">
	import Dashboard from "$lib/components/Dashboard/Dashboard.svelte"
	import Widget from "$lib/components/Widget/Widget.svelte"
	import WidgetsReference from "$lib/components/Widget/WidgetsReference.svelte"
	import Modal from "$lib/components/Modal/Modal.svelte"

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
					size: 1,
					style: "simple number",
				}
		},
		{ 
			name: "article-count-published",
			properties: {
					size: 1
				}
		},
		{ 
			name: "article-count-draft",
			properties: {
					size: 1
				}
		},
		{ 
			name: "article-count-all",
			properties: {
					size: 2
				}
		},
		{ 
			name: "article-list",
			properties: {
					size: 4
				}
		},
		{ 
			name: "user-count",
			properties: {
					size: 1
				}
		},
		{ 
			name: "user-count-active",
			properties: {
					size: 1
				}
		},
		{ 
			name: "user-list",
			properties: {
					size: 4
				}
		},
		{ 
			name: "article-views",
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
			name: "apple",
			properties: {
					size: 2
				}
		},
	]
</script>

<Dashboard name={firstName} {widgets}>
	<Widget />

	{#snippet head()}

		<Modal title="Widget Reference" description="false">
			<WidgetsReference {widgets} />
		</Modal>

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
	<Widget />
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
