<script>
	import '/src/app.css';
</script>

<nav></nav>

<slot />

<style>
	nav {
		position: fixed;
		right: 0;
		margin: 5px;
		background: white;
		border-radius: 10px;
		padding: 0 5px;
	}

	a {
		color: black;
	}
</style>
