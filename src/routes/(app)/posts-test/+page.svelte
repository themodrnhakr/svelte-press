<script lang="ts">
	import Modal from '$lib/components/Modal/Modal.svelte';
	import type { PageServerData } from './$types';
	let { data }: PageServerData = $props();
	$inspect(data);
	const content = {
		title: 'the title goes here',
		author: 'Eric Rumsey',
		body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.',
		heading: 'This Is a Heading',
		footnotes: ['tlskjetlksjetlksjet', 'kejshtkjshetksjhet', 'skjehtksjhtskjehtsekh']
	};
</script>

<div id="article">
	<h1 class="title">{content.title}</h1>

	<h2 class="author">{content.author}</h2>

	{@html data.posts[0].body}

	<div id="test"></div>

	<p contenteditable="true" class="text">test</p>
</div>

<Modal />

<style>
	#article {
		padding: 0 3rem;
	}

	#test {
		height: 1rem;
		width: 1rem;
		background: black;
	}
</style>
