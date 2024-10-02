<script lang="ts">
	const content = {
		title: "Salty Catholic"
		}
</script>

<!-- HERO -->

<div id="hero">
	<h1 id="title">{content.title}</h1>
</div>

<style>
	* {
		border: 2px dotted;
		border-image: radial-gradient(rgba(255,175,59,.25), rgba(255,255,255,.25), rgba(0,0,0,1)) 1;
	}

	#hero {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		background: black;
	}
	
	#title {
		font-family: "Verdana";
		font-weight: 900;
		color: white;
		text-transform: uppercase;
	}
</style>
