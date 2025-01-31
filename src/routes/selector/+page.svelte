<script lang="ts">
	import {
		AppSettings,
		AppState,
		getFileSysHandles,
		handleKeyboardEvent,
		mouseMoveHandler
	} from '$lib/appState.svelte';
	import {
		scanImages,
		setSelectionState,
		getPaginatedPairs,
		throttle,
		updateSelectionCount,
		loadSavedSelections
	} from '$lib/utils.svelte';
	import { onMount } from 'svelte';

	AppState.bottomBar.show = true;

	let thumbnailScroll: HTMLDivElement;

	onMount(async () => {
		AppState.layout.bodyArea =
			AppState.layout.svelteInnerHeight - (AppState.layout.topBar + AppState.layout.bottomBar);

		let handles = await getFileSysHandles();
		if (handles) {
			AppState.v1DirFileSysHandle = handles.v1;
			AppState.v2DirFileSysHandle = handles.v2;
		} else {
			console.log('No handles found');
		}

		await scanImages();

		AppState.currentPair = getPaginatedPairs()[0];

		await loadSavedSelections();
	});

	$effect(() => {
		let targetElement = document.querySelector(
			'button[data-ScrollID="' + AppState.currentPair?.baseName + '"]'
		);

		if (!targetElement) return;

		targetElement.scrollIntoView({
			behavior: 'instant'
		});

		thumbnailScroll.scrollLeft +=
			targetElement!.getBoundingClientRect().left - window?.innerWidth / 2.5;
	});
</script>

<svelte:window
	bind:innerHeight={AppState.layout.svelteInnerHeight}
	onkeypress={(e: KeyboardEvent) => {
		handleKeyboardEvent(e.code);
	}}
	onmousemove={AppSettings.v.showNameInInfoBar
		? (e) => {
				throttle(mouseMoveHandler, 100)(e);
			}
		: null}
/>

<div
	class="flex w-full flex-col gap-1 overflow-hidden p-1"
	style="height: {AppState.layout.bodyArea}px;"
>
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
	<div
		bind:this={thumbnailScroll}
		class="flex shrink-0 gap-1 overflow-x-auto"
		id="thumbnail-scroll"
		onwheel={(e) => {
			e.preventDefault();
			thumbnailScroll.scrollLeft += e.deltaY;
		}}
	>
		{#each getPaginatedPairs() as pair}
			<button
				data-infoBar={pair.baseName}
				data-ScrollID={pair.baseName}
				class="min-w-fit border {pair == AppState.currentPair
					? 'brightness-125'
					: 'border-gray-600 brightness-75'}"
				onclick={() => {
					AppState.bottomBar.statusText = 'loading...';
					AppState.currentPair = pair;
					setTimeout(() => {
						AppState.bottomBar.statusText = '';
					}, 1200);
				}}
			>
				{#each ['v1', 'v2'] as version}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					{#if pair[version]}
						<img
							class="inline border-b-4 {AppState.selections.get(pair.baseName) === version
								? // ? ''
									'border-warning-200'
								: // : 'brightness-50'}"
									'border-warning-900'}"
							src={pair[version].url}
							alt={pair[version].name}
							style="height: {AppSettings.v.thumbnailSize}px; width: auto;"
						/>
						<!-- {:else}
	<div>Missing {version.toUpperCase()}</div> -->
					{/if}
				{/each}
			</button>
			<span class="divider-vertical h-full"></span>
		{:else}
			<p>Select V1 and V2 folders.</p>
		{/each}
	</div>

	<!-- Main view -->
	<div
		class="flex w-full grow gap-1 overflow-hidden"
		bind:clientHeight={AppState.layout.largeViewImgHeight}
	>
		{#each ['v1', 'v2'] as version}
			{#if AppState.currentPair}
				<button
					class="w-full"
					onclick={() => {
						setSelectionState(
							AppState.currentPair!.baseName as unknown as string,
							version as 'v1' | 'v2' | 'none' | 'both' | 'mix'
						);
					}}
				>
					<img
						data-infoBar="{version} - {AppState.currentPair!.baseName}"
						class="h-full w-full grow border-4 object-contain {version === 'v1'
							? 'object-right'
							: 'object-left'} {AppState.selections.get(AppState.currentPair!.baseName) === version
							? 'border-yellow-300'
							: 'border-gray-400'}"
						src={AppState.currentPair![version].url}
						alt={AppState.currentPair![version].name}
					/>
				</button>
			{/if}
			{#if version == 'v1'}
				<span class="divider-vertical h-full"></span>
			{/if}
		{/each}
	</div>
</div>

<!-- Thumbnail printing -->
