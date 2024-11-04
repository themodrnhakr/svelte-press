<script lang='ts'>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment'

	let primary = $state("black");
	let secondary = $state("orange");
	let theme = $state({
		primary: "#AF584F",
		secondary: "#578265"
	})

	let sheetContent = $derived(`
		:root {
			--primary-theme-color: ${theme.primary};
			--secondary-theme-color: ${theme.secondary};
		}
	`)

	onMount(() => {
		let themeElement = document.createElement("style");
		themeElement.id = "theme"
		themeElement.appendChild(document.createTextNode(sheetContent))
		document.head.appendChild(themeElement)
		let sheets = document.styleSheets
	})
	$effect(() => {
		let item = document.getElementById("theme")
		item.textContent = sheetContent
	})


	function onclick() {
		let sheets = document.styleSheets
		let sheetsArray = Object.values(sheets)
		const theme = sheetsArray.find((item) => item.ownerNode.id === "theme")
		console.log(theme)
		theme.cssRules[0].cssText = "div { background: green }"
		console.log(theme)
	}

</script>

<div id="one"></div>
<div id="two"></div>
<div id="three"></div>
<div id="four"></div>

<button {onclick}>Click</button>

<input bind:value={theme.primary} type="text"/>
<input bind:value={theme.secondary} type="text"/>
<input bind:value={theme.primary} type="color"/>
<input bind:value={theme.secondary} type="color"/>

<p><code><br><br>{sheetContent}</code></p>

<style>
	div {
		width: 4rem;
		height: 4rem;
		border: solid;
		background: var(--primary-theme-color);
	}

	#three {
		background: var(--secondary-theme-color);
	}
</style>
