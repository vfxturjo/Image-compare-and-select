<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import {
		AppSettings,
		AppState,
		resetAllSettings,
		saveFileSysHandle,
		type foundFile
	} from '$lib/appState.svelte';
	import { doSelectionByDefault, pickDirectory, scanImages } from '$lib/utils.svelte';
	import { get } from 'idb-keyval';
	import { onMount } from 'svelte';

	AppState.bottomBar.show = false;

	onMount(() => {
		if (AppSettings.v.v1DirPath !== '') {
			pickDirectory('v1', true);
		}
		if (AppSettings.v.v2DirPath !== '') {
			pickDirectory('v2', true);
		}
	});
</script>

<div class="card flex w-full justify-between gap-4 p-4">
	<h2 class="h2">Select Folders</h2>
	<button class="variant-outline-warning btn hover:variant-filled-error" onclick={resetAllSettings}>
		Reset All
	</button>
</div>

<div class="card flex flex-col gap-4 p-4" id="folder-selector">
	{#each ['v1', 'v2'] as version}
		<label class="label">
			<h4 class="h4">{version === 'v1' ? 'First Folder' : 'Second Folder'}</h4>
			<!-- default folder selector radio -->
			<div class="flex gap-4">
				<input
					class="input w-1/2"
					type="text"
					placeholder="Custom name?"
					bind:value={AppSettings.v[`${version}DirName` as 'v1DirName' | 'v2DirName']}
				/>
				<button class="variant-filled btn w-1/2" onclick={() => pickDirectory(version)}>
					{AppSettings.v[`${version}DirPath` as 'v1DirPath' | 'v2DirPath'] === ''
						? 'Choose a directory'
						: AppSettings.v[`${version}DirPath` as 'v1DirPath' | 'v2DirPath']}
				</button>
				<p class="w-1/6 text-sm text-gray-500">
					<span
						class="font-bold {AppState[`${version}Len` as 'v1Len' | 'v2Len'] < 1
							? 'text-error-500'
							: 'text-warning-500'}"
					>
						{AppState[`${version}Len` as 'v1Len' | 'v2Len']}
					</span> <br />
					images found
				</p>
			</div>
		</label>
	{/each}
</div>

<div class="flex">
	<div class="card flex grow-[2] basis-32 flex-col gap-4 p-4">
		<!-- overlaps information -->
		{#if AppSettings.v.dirsOk}
			<p class="text-center">
				<span class="h3 font-bold {AppState.overlaps === 0 ? 'text-error-500' : 'text-success-500'}"
					>{AppState.overlaps}</span
				>
				overlaps found!
				{#if AppState.heicCount > 0}
					Effective overlaps:
					<span class="h3 font-bold text-success-500">{AppState.imagePairs.length}</span>
				{/if}
			</p>

			<!-- number of heic images -->
			{#if AppState.heicCount > 0}
				<p class="text-center">
					because...
					<span class="h3 font-bold text-error-500">{AppState.heicCount}</span>
					HEIC images found! <br /> (HEIC images will be ignored for now, as they are not supported...
					yet... convert to jpg to read them)
				</p>
			{/if}
		{:else if AppState.v1DirFileSysHandle && AppState.v2DirFileSysHandle}
			<p class="text-center opacity-50">Scanning directories...</p>
		{:else}
			<p class="text-center opacity-50">Choose directories to start comparing images.</p>
		{/if}
	</div>
	{#if AppState.heicCount > 0}
		<div class="flex grow-[1] basis-1 items-center justify-center">
			<button class="variant-filled-primary btn btn-lg" onclick={() => goto(`${base}/ImageConvert`)}
				>Convert them!</button
			>
		</div>
	{/if}
	<div></div>
</div>

<div class="card flex items-center gap-4 p-4 {AppState.overlaps < 1 ? 'opacity-50' : ''}">
	<h3 class="h3 w-1/2">Default selection folder</h3>
	<select
		class="select w-1/2 overflow-hidden p-2"
		size="3"
		bind:value={AppSettings.v.defaultSelection}
		onchange={(event) => doSelectionByDefault((event.target as HTMLSelectElement).value)}
	>
		<option value="">None</option>
		<option value="v1">{AppSettings.v.v1DirName}</option>
		<option value="v2">{AppSettings.v.v2DirName}</option>
	</select>
</div>

<div class="card flex justify-center p-4">
	<a
		href="{base}/selector"
		class="variant-filled btn w-1/2 {AppState.overlaps < 1 ? 'disabled' : ''}"
	>
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
