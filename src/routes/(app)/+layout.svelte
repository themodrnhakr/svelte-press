<script>
	import { dev } from '$app/environment';
	import '/src/app.css';
</script>

<nav>
	<h2><a href="/">Home</a></h2>
	<h2><a href="/blog">Blog</a></h2>
	<h2><a href="/posts-test">Test-Post</a></h2>
	{#if dev}
	<h2><a href="/admin/theme/playground">Theme Playground</a></h2>
	{/if}
</nav>

{#if dev}
	<div class="dev"><span>devmode</span></div>
{/if}

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

	.dev {
		content: '';
		position: absolute;
		display: flex;
		justify-content: center;
		left: 0;
		right: 0;
		background: red;
		opacity: 0.25;
		pointer-events: none;
	}

	.dev > span {
		text-align: center;
		color: white;
	}
</style>
