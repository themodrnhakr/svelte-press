<script lang="ts">
	let { children, widgets, head, foot, widget, name } = $props()
</script>

<div class="wrapper">
	<div class="dashboard">
		<h1 class="title custom-title">Welcome, {name}</h1>

		{@render head()}

		{@render children()}

		<div class="grid-wrapper">
			{@render widget(widgets)}
		</div>

		{@render foot()}
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		padding: 3rem;
	}

	
	.dashboard {
		margin: auto;
		border: dotted;
		max-width: 2000px
	
	}

	.grid-wrapper {
		--grid-size: calc(9.5rem + var(--vpx)/0.5);
		--widget-color: linear-gradient(145deg, #f9f9f9, #ffffff);
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(var(--grid-size), 1fr));
		grid-auto-rows: var(--grid-size);
		grid-auto-flow: dense;
	}

	.grid-wrapper > :global(.widget) {
		position: relative;
		z-index: 1;
		border: none;
		border-radius: 1.75rem;
		box-shadow:  5px 5px 10px #ebebeb,
			     -5px -5px 10px #ffffff;
		transition: all 0.3s;
	}

	.grid-wrapper > :global(.widget:hover) {
		scale: 1.01;
	}

	.grid-wrapper > :global(.widget::before) {
	  position: absolute;
	  content: "";
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  border-radius: 1.75rem;
		background: linear-gradient(145deg, #f4f4f4, #ffffff);
		box-shadow:  5px 5px 10px #ebebeb,
		     -5px -5px 10px #ffffff;
		     -5px -5px 10px #ffffff;
		     -16px -16px 32px #ffffff;

	  z-index: -1;
	  transition: opacity 0.3s linear;
	  opacity: 0;
	}
	.grid-wrapper > :global(.widget:hover::before) {
	  opacity: 1;
	}

	.grid-wrapper > :global(.widget.size1) {
		grid-column: span 1;
		background: var(--widget-color), linear-gradient(125deg, rgba( 185, 70, 67, 50%), rgba( 185, 70, 67, 50%))
	}

	.grid-wrapper > :global(.widget.size2) {
		grid-column: span 2;
	}

	.grid-wrapper > :global(.widget.size3) {
		grid-column: span 2;
		grid-row: span 2;
	}

	.grid-wrapper > :global(.widget.size4) {
		grid-column: span 2;
		grid-row: span 4;
	}

	@media (min-width: 700px) {

		.grid-wrapper > :global(.widget.size4) {
			grid-column: span 4;
			grid-row: span 4;
		}
	}
	

	.custom-title {
		text-transform: none;
	}
</style>
