<script lang="ts">
	const content = {
		title: 'Salty Catholic'
	};
</script>

<!-- HERO -->

<div id="hero">
	<div id="logo"></div>
	<h1 id="title">{content.title}</h1>
</div>

<style>
	t {
		border: 2px dotted;
		border-image: radial-gradient(
				rgba(255, 175, 59, 0.25),
				rgba(255, 255, 255, 1),
				rgba(0, 0, 0, 1)
			)
			1;
	}

	#hero {
		display: flex;
		flex-direction: column;
		justify-content: end;
		align-items: center;
		height: 100vh;
		width: 100vw;
		padding: 10rem;
		background:
			no-repeat top/70%
				url('/pngtree-man-with-a-straight-beard-and-mustache-picture-image_3122808.jpg'),
			black;
	}

	#title {
		font-family: 'Gobold CUTS';
		font-size: 4rem;
		color: white;
		text-transform: uppercase;
	}

	#logo {
		height: 12rem;
		width: 12rem;
		background: no-repeat center/100% url('/circle-white.png');
	}
</style>
