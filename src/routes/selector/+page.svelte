<script lang="ts">
	import { AppSettings, AppState, getFileSysHandles } from '$lib/appState.svelte';
	import { leftArrow } from '$lib/components/Paginator/icons';
	import { doSelectionByDefault, scanImages, updateSelectionCount } from '$lib/utils.svelte';
	import { onMount } from 'svelte';

	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { autoPlacement } from '@floating-ui/dom';

	let pg = $state({
		page: 0,
		limit: 20,
		size: AppState.imagePairs.length,
		amounts: [20, 50, 100],
		total: Math.ceil(AppState.imagePairs.length / AppSettings.v.itemsPerPage),
		noRight: false,
		noLeft: false
	});

	$effect(() => {
		pg.noRight = pg.page === pg.total;
		pg.noLeft = pg.page === 0;
	});

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
		// const start = (AppState.currentPage - 1) * AppSettings.v.itemsPerPage;
		// const end = start + AppSettings.v.itemsPerPage;
		return AppState.imagePairs.slice(pg.page * pg.limit, pg.page * pg.limit + pg.limit);
	}
</script>

<div class="image-grid" style="--pairs-per-row: {AppSettings.v.pairsPerRow}">
	{#each getPaginatedPairs() as pair}
		<div class="image-pair">
			{#each ['v1', 'v2'] as version}
				<div
					class="card w-72 p-4 shadow-xl"
					data-popup="popupImgInfo-{pair[version].name + version}"
				>
					<div><p>Demo Content</p></div>
					<div class="bg-surface-100-800-token arrow"></div>
				</div>
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="image-container {AppState.selections.get(pair.baseName) === version
						? 'outline outline-2 outline-offset-2 outline-cyan-500'
						: ''} {version === 'v1' ? 'float-right' : 'float-left'}"
					style="height: {AppSettings.v.imageHeight}px;"
					onclick={() => toggleSelection(pair.baseName, version)}
				>
					{#if pair[version]}
						<img
							src={pair[version].url}
							alt={pair[version].name}
							class={version === 'v1' ? 'float-right' : 'float-left'}
							style="height: {AppSettings.v.imageHeight}px; width: auto;"
							use:popup={{
								// Represents the type of event that opens/closed the popup
								event: 'hover',
								// Matches the data-popup value on your popup element
								target: 'popupImgInfo-' + pair[version].name + version
								// Defines which side of your trigger the popup will appear
								// placement: version == 'v1' ? 'right' : 'left'
							}}
						/>
					{:else}
						<div>Missing {version.toUpperCase()}</div>
					{/if}
				</div>
			{/each}
			<p class="col-span-2 w-full text-center">{pair.baseName}</p>
		</div>
	{:else}
		<p>Select V1 and V2 folders.</p>
	{/each}
</div>

<div class="bottom-bar flex w-full justify-between bg-slate-800">
	<!-- pairs per row -->
	<label class="flex items-center gap-2">
		<span>Pairsrow:</span>
		<select class="select" bind:value={AppSettings.v.pairsPerRow}>
			{#each [1, 2, 3] as pairs}
				<option value={pairs}>{pairs}</option>
			{/each}
		</select>
	</label>

	<!-- image height -->
	<label class="flex items-center gap-2">
		<span>Image height:</span>
		<select class="select" bind:value={AppSettings.v.imageHeight}>
			{#each [100, 200, 300, 400, 500] as height}
				<option value={height}>{height}</option>
			{/each}
		</select>
	</label>

	<!-- Amount per page -->
	<label class="flex items-center gap-2">
		<span>Items/page:</span>
		<select
			class="select"
			bind:value={pg.limit}
			onchange={() => {
				pg.page = 0;
				pg.total = Math.ceil(pg.size / pg.limit);
			}}
		>
			{#each pg.amounts as amount}
				<option value={amount}>{amount}</option>
			{/each}
		</select>
	</label>

	<!-- Paginator -->
	<!-- TODO: BUTTON COLORS FIX -->
	<div class="flex items-center gap-2 p-2 align-middle [&>button>img]:h-10 [&>button>img]:w-10">
		<button onclick={() => (pg.page = 0)} disabled={pg.noLeft}>
			<img src="/icons/left-edge-svgrepo-com.svg" alt="First" />
		</button>
		<button onclick={() => pg.page--} disabled={pg.noLeft}>
			<img src="/icons/chevron-left-svgrepo-com.svg" alt="Previous" />
		</button>

		<span>{pg.page + 1} / {pg.total}</span>

		<button onclick={() => pg.page++} disabled={pg.noRight}>
			<img src="/icons/chevron-right-svgrepo-com.svg" alt="Next" />
		</button>
		<button onclick={() => (pg.page = pg.limit)} disabled={pg.noRight}>
			<img src="/icons/right-edge-svgrepo-com.svg" alt="Last" />
		</button>
	</div>
</div>

<style>
	.image-grid {
		display: grid;
		/* grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); */
		grid-template-columns: repeat(var(--pairs-per-row), 1fr);
		gap: 20px;
		padding: 20px;
		/* max-height: calc(100vh - 120px); */
		overflow-y: auto;
	}
	.image-pair {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		row-gap: 5px;
		border: 1px solid #ddd;
		padding: 5px;
	}
	.image-container {
		object-fit: contain;
		cursor: pointer;
	}
</style>
