<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import { AppBar } from '@skeletonlabs/skeleton';
	import { AppSettings, AppState } from '$lib/appState.svelte';
	import { handleFileOperation } from '$lib/utils.svelte';

	// popup things
	import { initializeStores, Drawer } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	initializeStores();

	const drawerStore = getDrawerStore();
</script>

<AppBar>
	<svelte:fragment slot="lead">(icon)</svelte:fragment>
	<h1>PhotoJudge</h1>
	<svelte:fragment slot="trail">
		{#if AppSettings.v.dirsOk}
			<div class="variant-filled btn-group [&>*]:px-2">
				<div>{AppSettings.v.v1DirName}: {AppState.status.v1}</div>
				<div>{AppSettings.v.v2DirName}: {AppState.status.v2}</div>
			</div>

			<button
				class="btn btn-sm p-0"
				onclick={() =>
					drawerStore.open({
						id: 'viewSettingsDrawer'
					})}
			>
				(View Settings)
			</button>
			<button
				class="btn btn-sm p-0"
				onclick={() =>
					drawerStore.open({
						id: 'exporterDrawer'
					})}
			>
				(Export)
			</button>
		{:else}
			<a href="/" class="btn btn-sm p-0">☠ Choose directories!!!</a>
		{/if}
	</svelte:fragment>
</AppBar>

<Drawer>
	{#if $drawerStore.id === 'viewSettingsDrawer'}
		{@render viewSettings()}
	{:else if $drawerStore.id === 'exporterDrawer'}
		{@render exporter()}
	{:else}
		<!-- (fallback contents) -->
		<div class="flex h-full items-center justify-center">
			<p>Nothing to see here...</p>
		</div>
	{/if}
</Drawer>

{@render children()}

{#snippet exporter()}
	<!-- TODO: MAKE THEM POLISHED -->
	<p>Export Selection</p>
	<div class="variant-filled-primary m-2 flex flex-col gap-2">
		<button class="btn btn-sm p-0" onclick={() => handleFileOperation(true)}>(Move)</button>
		<button class="btn btn-sm p-0" onclick={() => handleFileOperation(false)}>(Copy)</button>
	</div>
{/snippet}

{#snippet viewSettings()}
	<!-- TODO: MAKE THEM POLISHED -->
	<p>View Settings</p>
	<div class="variant-filled-primary m-2 flex flex-col gap-2">
		<select bind:value={AppSettings.v.itemsPerPage}>
			<option value={20}>20 per page</option>
			<option value={50}>50 per page</option>
			<option value={100}>100 per page</option>
			<option value={200}>200 per page</option>
		</select>
		<select bind:value={AppSettings.v.pairsPerRow}>
			<option value={1}>1 pair</option>
			<option value={2}>2 pairs</option>
			<option value={3}>3 pairs</option>
		</select>
	</div>
{/snippet}
