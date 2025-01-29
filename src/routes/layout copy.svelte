<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import { AppBar } from '@skeletonlabs/skeleton';
	import { AppSettings, AppState } from '$lib/appState.svelte';
	import { handleFileOperation } from '$lib/utils.svelte';

	// bottom bar
	import { page } from '$app/stores';
	// let showBottomBar = false;
	let showBottomBar = true;

	// popup things
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { initializeStores, Drawer } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();

	const drawerStore = getDrawerStore();
</script>

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

<AppBar class="sticky top-0 z-50">
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
						id: 'viewSettingsDrawer',
						bgBackdrop: 'bg-transparent',
						width: 'w-1/2',
						position: 'right'
					})}
			>
				(View Settings drawer)
			</button>

			<button
				class="btn btn-sm p-0"
				use:popup={{
					event: 'click',
					target: 'popupViewSettings',
					placement: 'bottom',
					closeQuery: '#will-close'
				} as PopupSettings}
			>
				(View Settings popup)
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

{@render children()}

{#if showBottomBar}
	<!-- sticky bottom bar like a status bar -->
	<div class="bottom-bar fixed bottom-0 flex w-full justify-between bg-slate-800">
		<p>Bottom Bar Content</p>
	</div>
{/if}

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
	<!-- align middle vertically -->
	<div class="m-4 flex min-h-[600px] flex-col justify-center gap-2">
		<h2 class="h2">View Settings</h2>
		<h4 class="h4">Items per page</h4>
		<select class="select" bind:value={AppSettings.v.itemsPerPage}>
			<option value={20}>20</option>
			<option value={50}>50</option>
			<option value={100}>100</option>
			<option value={200}>200</option>
		</select>

		<h4 class="h4">Image Pairs per row</h4>
		<select class="select" bind:value={AppSettings.v.pairsPerRow}>
			<option value={1}>1 pair</option>
			<option value={2}>2 pairs</option>
			<option value={3}>3 pairs</option>
		</select>
	</div>
{/snippet}

<!-- POPUP DATA -->

<div class="card w-72 p-4 shadow-xl" data-popup="popupViewSettings">
	<div class="flex justify-between">
		<h3 class="h3">View Settings</h3>
		<button class="variant-outline btn btn-sm" id="will-close">✕</button>
	</div>
	<hr class="my-2" />
	<p>Items per page</p>
	<select class="select" bind:value={AppSettings.v.itemsPerPage}>
		<option value={20}>20</option>
		<option value={50}>50</option>
		<option value={100}>100</option>
		<option value={200}>200</option>
	</select>

	<p>Image Pairs per row</p>
	<select class="select" bind:value={AppSettings.v.pairsPerRow}>
		<option value={1}>1 pair</option>
		<option value={2}>2 pairs</option>
		<option value={3}>3 pairs</option>
	</select>

	<p>Image Height</p>
	<input type="range" max="1000" bind:value={AppSettings.v.imageHeight} />
	<p>Image Fullscreen View</p>
	<input type="checkbox" bind:checked={AppSettings.v.imageFullscreenView} />

	<p>Thumbnail height</p>
	<input type="range" max="1000" bind:value={AppSettings.v.thumbnailSize} />
</div>

<style>
	/* .bottom-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #f8f9fa;
		padding: 1rem;
		box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
		text-align: center;
	} */
</style>
