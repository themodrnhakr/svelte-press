<script>
	import '/src/app.css'
</script>

<nav>
	<h2><a href="/posts-test">Posts</a></h2>
</nav>

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
