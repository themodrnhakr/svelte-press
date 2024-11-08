<script lang="ts">
	import type { T } from 'vitest/dist/chunks/environment.LoooBwUu.js';
	import Layout from '../+layout.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	let usersList = data.users;
	let searchString: string = $state('');
	let filteredUsers = $derived.by(() => {
		let list = usersList;
		list.sort((a: { id: string }, b: { id: string }) => {
			const propA = a.id.toLowerCase();
			const propB = b.id.toLowerCase();
			if (propA < propB) {
				return -1;
			}
			if (propA > propB) {
				return 1;
			}
			return 0;
		});
		list.sort((a: { sessions: Array<T> }, b: { sessions: Array<T> }) => {
			const propA = a.sessions.length;
			const propB = b.sessions.length;
			return propB - propA;
		});
		list.sort((a: { username: string }, b: { username: string }) => {
			const propA = a.username.toLowerCase();
			const propB = b.username.toLowerCase();
			if (propA < propB) {
				return -1;
			}
			if (propA > propB) {
				return 1;
			}
			return 0;
		});
		if (searchString === '') {
			return list;
		}
		list = list.filter(
			(item: { username: string; id: string }) =>
				item.username.includes(searchString) || item.id.includes(searchString)
		);
		return list;
	});
</script>

<div>
	<div>
		<label class="heading1" for="search">Search</label>
		<input bind:value={searchString} name="search" id="search" />
	</div>
	{usersList[0].username}
	<table>
		<thead>
			<tr>
				<th scope="col">User ID</th>
				<th scope="col">Username</th>
				<th scope="col">Github Auth</th>
				<th scope="col">Sessions</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredUsers as item}
				<tr>
					<td>{item.id}</td>
					<td>{item.username}</td>
					<td>{item.githubId ? 'true' : null}</td>
					<td>{item.sessions.length}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	{#if filteredUsers.length < 1}
		no users
	{/if}
</div>

<style>
	div:has(table) {
		width: 100%;
		display: flex;
		padding-inline: 10rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	input {
		width: fit-content;
	}
	table {
		width: 100%;
		max-width: 150rem;
		border-spacing: 0;
		border-collapse: separate;
		border-radius: 1rem;
		background: var(--primary-color);
		border: none;
		overflow: hidden;
		font-size: 0.9rem;
	}
	th,
	td {
		padding: 1rem;
	}

	th:not(:last-child),
	td:not(:last-child) {
		border-right: none;
	}

	th:not(:first-child),
	td:not(:first-child) {
		text-align: center;
	}

	thead > tr:not(:last-child) > th,
	thead > tr:not(:last-child) > td,
	tbody > tr:not(:last-child) > th,
	tbody > tr:not(:last-child) > td,
	tfoot > tr:not(:last-child) > th,
	tfoot > tr:not(:last-child) > td,
	tr:not(:last-child) > th,
	tr:not(:last-child) > td,
	thead:not(:last-child),
	tbody:not(:last-child),
	tfoot:not(:last-child) {
		border-bottom: 0.5px solid black;
	}
	tbody > tr:first-child > th,
	tbody > tr:first-child > td {
		border-top: 3px solid grey;
	}

	th {
		background: var(--secondary-color);
	}
</style>
