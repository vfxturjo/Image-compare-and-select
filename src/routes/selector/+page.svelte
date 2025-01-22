<script lang="ts">
	import { AppSettings, AppState, getFileSysHandles } from '$lib/appState.svelte';
	import { doSelectionByDefault, scanImages, updateSelectionCount } from '$lib/utils.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		let handles = await getFileSysHandles();
		if (handles) {
			AppState.v1DirFileSysHandle = handles.v1;
			AppState.v2DirFileSysHandle = handles.v2;
		} else {
			console.log('No handles found');
		}

		scanImages();
	});

	function toggleSelection(baseName: string, version: string) {
		// console.log('Toggling selection:', baseName, version);

		AppState.selections.set(
			baseName,
			AppState.selections.get(baseName) === version ? 'v1' : version
		);

		// console.log('Selections:', AppState.selections.get(baseName));

		updateSelectionCount();
	}

	function getPaginatedPairs() {
		const start = (AppState.currentPage - 1) * AppSettings.v.itemsPerPage;
		const end = start + AppSettings.v.itemsPerPage;
		return AppState.imagePairs.slice(start, end);
	}
</script>

<div class="top-bar"></div>

<div class="image-grid">
	{#each getPaginatedPairs() as pair}
		<div class="image-pair">
			{#each ['v1', 'v2'] as version}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="image-container {AppState.selections.get(pair.baseName) === version
						? 'selected'
						: ''}"
					onclick={() => toggleSelection(pair.baseName, version)}
				>
					{#if pair[version]}
						<img src={pair[version].url} alt={pair[version].name} />
					{:else}
						<div>Missing {version.toUpperCase()}</div>
					{/if}
				</div>
			{/each}
		</div>
		<p class="w-full text-center">{pair.baseName}</p>
	{:else}
		<p>Select V1 and V2 folders.</p>
	{/each}
</div>

<div class="bottom-bar">
	<div>
		Page {AppState.currentPage} of {Math.ceil(
			AppState.imagePairs.length / AppSettings.v.itemsPerPage
		)}
	</div>
	<div>Selected: V1 - {AppState.status.v1}, V2 - {AppState.status.v2}</div>
	<div class="pagination">
		<button onclick={() => AppState.currentPage--} disabled={AppState.currentPage === 1}
			>Previous</button
		>
		<button
			onclick={() => AppState.currentPage++}
			disabled={AppState.currentPage * AppSettings.v.itemsPerPage >= AppState.imagePairs.length}
		>
			Next
		</button>
	</div>
</div>

<style>
	.top-bar,
	.bottom-bar {
		background: #333;
		color: white;
		padding: 10px;
		display: flex;
		gap: 10px;
		align-items: center;
	}
	.pairs-container {
		display: grid;
		grid-template-columns: repeat(var(--pairs-per-row), 1fr);
	}
	button {
		padding: 8px 16px;
		cursor: pointer;
		background: #444;
		color: white;
		border: none;
		border-radius: 4px;
	}
	button:hover {
		background: #555;
	}
	.image-grid {
		display: grid;
		/* grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); */
		grid-template-columns: repeat(var(--pairs-per-row), 1fr);
		gap: 20px;
		padding: 20px;
		max-height: calc(100vh - 120px);
		overflow-y: auto;
	}
	.image-pair {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		border: 1px solid #ddd;
		padding: 5px;
	}
	.image-container {
		position: relative;
		cursor: pointer;
	}
	.image-container img {
		width: 100%;
		height: 200px;
		object-fit: contain;
		background: #f0f0f0;
	}
	.selected {
		box-shadow: 0 0 0 3px blue;
	}
	.pagination {
		display: flex;
		gap: 10px;
		padding: 10px 20px;
	}
</style>
