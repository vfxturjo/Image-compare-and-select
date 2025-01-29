<script lang="ts">
	import { AppSettings, AppState, getFileSysHandles } from '$lib/appState.svelte';
	import {
		doSelectionByDefault,
		scanImages,
		toggleSelection,
		getPaginatedPairs,
		pg
	} from '$lib/utils.svelte';
	import { onMount } from 'svelte';

	let thumbnailScroll: HTMLDivElement;

	onMount(async () => {
		let handles = await getFileSysHandles();
		if (handles) {
			AppState.v1DirFileSysHandle = handles.v1;
			AppState.v2DirFileSysHandle = handles.v2;
		} else {
			console.log('No handles found');
		}

		scanImages();

		// set page size, scroll, selected element
		pg.noRight = pg.page === pg.total;
		pg.noLeft = pg.page === 0;
		AppState.currentPair = getPaginatedPairs()[0];
	});
</script>

<div class="flex h-full w-full flex-col gap-2.5 overflow-hidden p-1">
	<!-- Top buttons -->
	<div class="[&>*]:my-0 [&>*]:py-0">
		<button class="btn btn-sm">TOP TOOLBAR</button>
		<button class="btn btn-sm">n</button>
		<button class="btn btn-sm">Things</button>
		<span class="divider-vertical"></span>
		<button class="btn btn-sm">1</button>
		<button class="btn btn-sm">2</button>
	</div>

	<!-- Thumbnails -->
	<!-- scroll horizontally -->
	<div
		bind:this={thumbnailScroll}
		class="flex gap-1 overflow-x-auto bg-red-500"
		id="thumbnail-scroll"
		onwheel={(e) => {
			e.preventDefault();
			console.log(e);
			thumbnailScroll.scrollLeft += e.deltaY;
		}}
	>
		{#each getPaginatedPairs() as pair}
			<div class="min-w-fit border border-gray-600">
				{#each ['v1', 'v2'] as version}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					{#if pair[version]}
						<img
							class="inline"
							src={pair[version].url}
							alt={pair[version].name}
							style="height: {AppSettings.v.thumbnailSize}px; width: auto;"
						/>
						<!-- {:else}
	<div>Missing {version.toUpperCase()}</div> -->
					{/if}
				{/each}
			</div>
			<span class="divider-vertical h-full"></span>
		{:else}
			<p>Select V1 and V2 folders.</p>
		{/each}
	</div>

	<!-- Main view -->
	<div class="flex h-screen gap-1 bg-[#a05e5e]">
		{#each ['v1', 'v2'] as version}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			{#if AppState.currentPair}
				<img
					class="{version === 'v1' ? 'float-right' : 'float-left'} object-cover"
					src={AppState.currentPair![version].url}
					alt={AppState.currentPair![version].name}
				/>
				<!-- {:else}
	<div>Missing {version.toUpperCase()}</div> -->
			{/if}
		{/each}
		<!-- <div class="w-px self-stretch bg-[#b7bdd0] p-2.5"></div>

		<div class="shrink grow basis-0 self-stretch bg-[#d9d9d9]"></div>
		<div class="shrink grow basis-0 self-stretch bg-[#d9d9d9]"></div> -->
	</div>
</div>

<!-- Thumbnail printing -->
