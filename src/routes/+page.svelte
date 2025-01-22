<script lang="ts">
	import {
		AppSettings,
		AppState,
		resetAllSettings,
		saveFileSysHandle,
		type foundFile
	} from '$lib/appState.svelte';
	import { doSelectionByDefault, scanImages } from '$lib/utils.svelte';
	import { get } from 'idb-keyval';
	import { onMount } from 'svelte';
	onMount(() => {
		if (AppSettings.v.v1DirPath !== '') {
			pickDirectory('v1', true);
		}
		if (AppSettings.v.v2DirPath !== '') {
			pickDirectory('v2', true);
		}
	});

	async function pickDirectory(version: string, skipPicker = false) {
		try {
			let handle: FileSystemDirectoryHandle;
			if (!skipPicker) {
				handle = await (window as any).showDirectoryPicker();
			} else {
				handle = await get(version === 'v1' ? 'v1' : 'v2').then(
					(h) => h as FileSystemDirectoryHandle
				);
			}
			const pathName = handle.name;

			if (version === 'v1') {
				AppSettings.v.v1DirPath = pathName;
				AppState.v1DirFileSysHandle = handle;
				saveFileSysHandle('v1', handle);
			} else {
				AppSettings.v.v2DirPath = pathName;
				AppState.v2DirFileSysHandle = handle;
				saveFileSysHandle('v2', handle);
			}
			scanImages();
		} catch (error) {
			console.log('Directory picker canceled');
		}
	}
</script>

<div class="card flex w-full justify-between gap-4 p-4">
	<h2 class="h2">Settings</h2>
	<button class="variant-outline-warning btn hover:variant-filled-error" onclick={resetAllSettings}>
		Reset All
	</button>
</div>

<div class="card flex flex-col gap-8 p-4">
	{#each ['v1', 'v2'] as version}
		<label class="label">
			<h3 class="h3">{version === 'v1' ? 'First Folder' : 'Second Folder'}</h3>
			<!-- default folder selector radio -->
			<div class="flex gap-4">
				<input
					class="input w-1/2"
					type="text"
					placeholder="Custom name?"
					bind:value={AppSettings.v[version + 'DirName']}
				/>
				<button class="variant-filled btn w-1/2" onclick={() => pickDirectory(version)}>
					{AppSettings.v[version + 'DirPath'] === ''
						? 'Choose a directory'
						: AppSettings.v[version + 'DirPath']}
				</button>
				<p class="w-1/6 text-sm text-gray-500">
					<span
						class="font-bold {AppState[version + 'Len'] < 1
							? 'text-error-500'
							: 'text-warning-500'}"
					>
						{AppState[version + 'Len']}
					</span> <br />
					images found
				</p>
			</div>
		</label>
	{/each}
</div>

<div class="card flex flex-col gap-4 p-4">
	<!-- overlaps information -->
	{#if AppSettings.v.dirsOk}
		<p class="text-center">
			<span class="h3 font-bold {AppState.overlaps === 0 ? 'text-error-500' : 'text-success-500'}"
				>{AppState.overlaps}</span
			> overlaps found!
		</p>

		<!-- number of heic images -->
		{#if AppState.heicCount > 0}
			<p class="text-center">
				but...
				<span class="h3 font-bold text-error-500">{AppState.heicCount}</span>
				HEIC images found! <br /> (HEIC images will be ignored for now, as they are not supported...
				yet)
				<br />
				(2 types of solutions: convert to jpg or use a library to read them)
				<br />
				so... effective overlaps:
				<span class="h3 font-bold text-success-500">{AppState.imagePairs.length}</span>
			</p>
		{/if}
	{:else if AppState.v1DirFileSysHandle && AppState.v2DirFileSysHandle}
		<p class="text-center opacity-50">Scanning directories...</p>
	{:else}
		<p class="text-center opacity-50">Choose directories to start comparing images.</p>
	{/if}
</div>

<div class="card flex items-center gap-4 p-4 {AppState.overlaps < 1 ? 'opacity-50' : ''}">
	<h3 class="h3 w-1/2">Default selection folder</h3>
	<select
		class="select w-1/2 overflow-hidden p-2"
		size="3"
		bind:value={AppSettings.v.defaultSelection}
		onchange={(event) => doSelectionByDefault(event.target.value)}
	>
		<option value="">None</option>
		<option value="v1">{AppSettings.v.v1DirName}</option>
		<option value="v2">{AppSettings.v.v2DirName}</option>
	</select>
</div>

<div class="card flex justify-center p-4">
	<a href="/selector" class="variant-filled btn w-1/2 {AppState.overlaps < 1 ? 'disabled' : ''}">
		Start Comparing
	</a>
</div>

<style>
	.disabled {
		opacity: 0.5;
		pointer-events: none;
		cursor: not-allowed;
	}
</style>
