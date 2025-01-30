<script lang="ts">
	import { AppSettings, AppState, type foundPair } from '$lib/appState.svelte';
	import { fileCopyMove, pickDirectory } from '$lib/utils.svelte';
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

	async function Export_JPEG() {
		const total = AppState.imagePairsHeic.length;
		AppState.converter.startTime = Date.now();
		let current = 0;
		let skipped = 0;

		for (const item of AppState.imagePairsHeic) {
			await fetch(item[version]?.url)
				.then((res) => res.blob())
				.then((blob) =>
					heic2any({
						blob,
						toType: 'image/jpeg',
						quality: AppState.converter.jpegQuality
					})
				)
				.then(async (conversionResult) => {
					var url = URL.createObjectURL(conversionResult);

					// save the image to the output folder
					const fileName = (item as foundPair)[version]?.name.replace(/\.[^/.]+$/, '.jpg');

					await fetch(url)
						.then((res) => res.blob())
						.then(async (blob) => {
							const file = new File([blob], fileName, { type: 'image/jpeg' });

							// Use the File System Access API to save the file directly to the output folder
							if (!AppState.converter.outputDirFileSysHandle) {
								AppState.converter.outputDirFileSysHandle = await window.showDirectoryPicker();
							}
							const fileHandle = await AppState.converter.outputDirFileSysHandle?.getFileHandle(
								fileName,
								{ create: true }
							);
							const writable = await fileHandle?.createWritable();
							await writable?.write(file);
							await writable?.close();

							URL.revokeObjectURL(url);

							current += 1;
						})
						.catch((e) => {
							handleErrorHere(e);
						});
				})
				.catch((e) => {
					handleErrorHere(e);
				});
			AppState.converter.progress = Math.round((current / total) * 100);

			// calculate estimated time
			const remaining = total - current;
			const elapsedTime = Date.now() - AppState.converter.startTime;
			let speed = current / (elapsedTime / 1000);

			const estimatedTime = (remaining / speed) * 1000;
			const minutes = Math.floor(estimatedTime / 60000);
			const seconds = Math.floor((estimatedTime % 60000) / 1000);

			// update the status text
			AppState.bottomBar.statusText = `Progress: ${AppState.converter.progress}%... Converting ${current} of ${total} images... Skipped: ${skipped}; (Speed: ${speed.toFixed(2)} images/sec, Estimated time: ${minutes}min ${seconds}sec)`;

			if (current === total) {
				AppState.bottomBar.statusText = 'Conversion completed!';
			}
		}
		function handleErrorHere(e: any) {
			console.log(e);
			skipped += 1;
		}

		AppState.converter.progress = 100;
		AppState.bottomBar.statusText = 'Conversion completed!';
	}
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
