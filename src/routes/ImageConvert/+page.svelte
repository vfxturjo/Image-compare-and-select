<script lang="ts">
	import { AppSettings, AppState, type foundPair } from '$lib/appState.svelte';
	import { fileCopyMove, pickDirectory, Export_JPEG } from '$lib/utils.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	// import libheif from '$lib/libraries/libheif-js/libheif-wasm/libheif-bundle.mjs';
	// import libheif from 'libheif-js/libheif-wasm/libheif-bundle.mjs';
	// import heic2any from 'heic2any';

	let heic2any: any;

	let { data }: { data: PageData } = $props();

	let version = $state(AppState.whichFolderHeic ?? 'v1');

	let file;

	onMount(async () => {
		AppState.bottomBar.show = true;
		AppState.bottomBar.showId = false;
		AppState.bottomBar.statusText = 'waiting...';

		if (typeof window != undefined) {
			heic2any = (await import('heic2any')).default;
		}
		pickDirectory(AppState.whichFolderHeic, true, true);

		if (AppSettings.v.otherDirs.convOut !== '') {
			pickDirectory('convOut', true, true);
		}
	});
</script>

<div class="flex w-full justify-center p-4">
	<div class="container m-4 space-y-4">
		<h2 class="h2">Image Converter</h2>
		<hr class="my-4 !border-t-2" />
		<!-- Source and output directory settings -->
		<div class="flex gap-4 align-middle">
			<h3 class="h3 flex-grow">Source</h3>
			<button class="variant-filled btn w-1/2" onclick={() => pickDirectory(version, false, true)}>
				{AppSettings.v[version + 'DirPath'] === ''
					? 'Choose a directory'
					: AppSettings.v[version + 'DirPath']}
			</button>
			<p class="w-1/6 text-sm text-gray-500">
				<span
					class="font-bold {AppState[version + 'Len'] < 1 ? 'text-error-500' : 'text-warning-500'}"
				>
					{AppState.heicCount}
				</span> <br />
				images found
			</p>
		</div>

		<div class="flex gap-4 align-middle">
			<h3 class="h3 flex-grow">Output</h3>
			<button
				class="variant-filled btn w-1/2"
				onclick={() => pickDirectory('convOut', false, true)}
			>
				{AppSettings.v.otherDirs.convOut === ''
					? 'Choose a directory'
					: AppSettings.v.otherDirs.convOut}
			</button>
		</div>

		<!-- convert settings -->
		<div class="flex gap-4 bg-slate-800 align-middle">
			<h3 class="h3 flex-grow">JPEG Quality</h3>
			<input type="range" bind:value={AppState.converter.jpegQuality} class="w-1/2" />
			<span class="w-1/6 text-sm text-gray-500">
				{AppState.converter.jpegQuality}
			</span>
		</div>

		<!-- convert -->
		<div class="flex gap-4 align-middle">
			<button class="variant-filled-primary btn w-1/2" onclick={Export_JPEG}> Convert! </button>
		</div>

		<!-- copy/move others -->
		<div class="flex gap-4 align-middle">
			<button
				class="variant-filled-primary btn w-1/2"
				onclick={() => {
					// fileCopyMove(AppState, AppState.converter.inputDirFileSysHandle);
					alert('TODO!');
				}}
			>
				Copy!
			</button>
			<button
				class="variant-filled-primary btn w-1/2"
				onclick={() => {
					// fileCopyMove(AppState, AppState.converter.inputDirFileSysHandle);
					alert('TODO!');
				}}
			>
				Move!
			</button>
		</div>

		<div id="target"></div>
	</div>
</div>
