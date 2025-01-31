<script lang="ts">
	export const prerender = true;
	export const trailingSlash = 'always';

	import '../app.css';
	let { children } = $props();
	import { base } from '$app/paths';

	import { AppBar } from '@skeletonlabs/skeleton';
	import { AppSettings, AppState } from '$lib/appState.svelte';
	import { handleFileOperation } from '$lib/utils.svelte';

	// bottom bar
	import { page } from '$app/state';

	// popup things
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { initializeStores, Drawer } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	import { storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();

	const drawerStore = getDrawerStore();
</script>

<Drawer>
	{#if $drawerStore.id === 'exporterDrawer'}
		{@render exporter()}
	{:else}
		<!-- (fallback contents) -->
		<div class="flex h-full items-center justify-center">
			<p>Nothing to see here...</p>
		</div>
	{/if}
</Drawer>

<AppBar>
	<svelte:fragment slot="lead">
		{@render AppLogo()}
	</svelte:fragment>
	<a href="{base}/" class="btn btn-sm p-0">PhotoJudge</a>
	<svelte:fragment slot="trail">
		{#if AppSettings.v.dirsOk}
			<div class="variant-filled btn-group [&>*]:px-2">
				<div>{AppSettings.v.v1DirName}: {AppState.status.v1}</div>
				<div>{AppSettings.v.v2DirName}: {AppState.status.v2}</div>
			</div>

			<button
				class="btn btn-sm p-0"
				use:popup={{
					event: 'click',
					target: 'popupViewSettings',
					placement: 'bottom',
					closeQuery: '#will-close'
				} as PopupSettings}
			>
				{@render viewSettingsIcon()}
			</button>

			<button
				class="variant-filled-primary btn btn-sm m-0 py-0"
				onclick={() =>
					drawerStore.open({
						id: 'exporterDrawer'
					})}
			>
				<span> Export </span>
				<span>
					{@render exportIcon()}
				</span>
			</button>
		{:else}
			<a href="{base}/" class="btn btn-sm p-0">☠ Choose directories!!!</a>
		{/if}
	</svelte:fragment>
</AppBar>

{@render children()}

{#if AppState.bottomBar.show}
	<div
		class="bottom-bar fixed bottom-0 flex w-full justify-between bg-slate-800 px-2"
		bind:clientHeight={AppState.layout.bottomBar}
	>
		<p>
			{AppState.bottomBar.statusText}
		</p>
		{#if AppState.bottomBar.showId}
			<p>
				{AppState.imagePairs.findIndex((pair) => pair.baseName === AppState.currentPair?.baseName) +
					1}/{AppState.imagePairs?.length}
			</p>
		{/if}
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

<!-- POPUP DATA -->

<div class="card w-72 gap-2 p-4 shadow-xl" data-popup="popupViewSettings">
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

	<div class="flex items-center justify-between py-2">
		<p>
			Show name in bottom bar? <br /><span class="text-sm text-warning-600"
				>consumes more power</span
			>
		</p>
		<input class="checkbox" type="checkbox" bind:checked={AppSettings.v.showNameInInfoBar} />
	</div>

	<p>Thumbnail height</p>
	<input type="range" max="1000" bind:value={AppSettings.v.thumbnailSize} />
</div>

{#snippet AppLogo()}
	<svg class="btn m-0 h-6 w-6 fill-primary-200 p-0" viewBox="0 0 449.5 449.5">
		<path
			d="M385.3,145.8l-17.3-23c-0.7-0.9-1.7-1.5-2.8-1.6l-70.4-9.8l1.7-12.3l25.5,3.6c2.3,0.3,4.4-1.3,4.8-3.6l5.6-40.3
		c0.3-2.3-1.3-4.4-3.6-4.8l-25.5-3.6l2.2-15.5c0.3-2.3-1.3-4.4-3.6-4.8l-30.7-4.3c-2.3-0.3-4.4,1.3-4.8,3.6L264.2,45l-70.4-9.8
		c-1.1-0.2-2.2,0.1-3.1,0.8l-23,17.3c-0.9,0.7-1.5,1.7-1.6,2.8c-0.2,1.1,0.1,2.2,0.8,3.1l17.3,23c0.7,0.9,1.7,1.5,2.8,1.6l70.4,9.8
		l-1.7,12.3l-25.5-3.6c-2.3-0.3-4.4,1.3-4.8,3.6l-5.6,40.3c-0.3,2.3,1.3,4.4,3.6,4.8l25.5,3.6l-5.2,37.6c2.8,0.4,5.6,0.7,8.4,0.9
		l4.7-34l21.2,11.2l-3.1,22.6c2.9-0.1,5.7-0.3,8.6-0.5L288,160l70.4,9.8c1.1,0.2,2.2-0.1,3.1-0.8l23-17.3
		C386.3,150.3,386.7,147.6,385.3,145.8z M274.2,34.8l22.3,3.1l-1.6,11.3l-22.3-3.1L274.2,34.8z M190,75.7l-13.7-18.2l18.2-13.7
		l129,18L319,93.7L190,75.7z M286.6,108.9l-0.2,1.3l-22.3-3.1l1.3-9.4L286.6,108.9z M357.8,161.2l-129-18l4.4-31.9l129,18l13.7,18.2
		L357.8,161.2z"
		/>
		<path
			d="M344.3,193.7v-8.3c0-2.9-2.3-5.2-5.2-5.2H162.3c-2.9,0-5.2-2.3-5.2-5.2v-8.3c0-2.9-2.3-5.2-5.2-5.2H68.6
			c-2.9,0-5.2,2.3-5.2,5.2v251.8c0,2.9,2.3,5.2,5.2,5.2h289.2c2.9,0,5.2-2.3,5.2-5.2l0-214.3c0-2.9-2.3-5.2-5.2-5.2h-8.3
			C346.7,198.9,344.3,196.6,344.3,193.7z M337.6,404.9H88.9c-3.7,0-6.8-3-6.8-6.8V186.9c0-3.7,3-6.8,6.8-6.8h42.7
			c3.7,0,6.8,3,6.8,6.8v24c0,3.7,3,6.8,6.8,6.8h192.5c3.7,0,6.8,3,6.8,6.8v173.8C344.3,401.9,341.3,404.9,337.6,404.9z"
		/>
		<path
			d="M269.4,273.8h-18.7L232,255.1h-37.5l-18.7,18.7H157c0,0-18.7,0-18.7,18.7c0,10,0,44.1,0,56.2c0,18.7,18.7,18.7,18.7,18.7
			s99.7,0,112.4,0c18.7,0,18.7-18.7,18.7-18.7s0-37.5,0-56.2C288.1,273.8,269.4,273.8,269.4,273.8z M213.2,348.8
			c-15.5,0-28.1-12.6-28.1-28.1c0-15.5,12.6-28.1,28.1-28.1c15.5,0,28.1,12.6,28.1,28.1C241.3,336.2,228.7,348.8,213.2,348.8z"
		/>
	</svg>
{/snippet}

{#snippet viewSettingsIcon()}
	<svg class="btn m-0 h-5 w-5 fill-primary-200 p-0" viewBox="0 0 54 54">
		<path
			d="M51.22,21h-5.052c-0.812,0-1.481-0.447-1.792-1.197s-0.153-1.54,0.42-2.114l3.572-3.571
		c0.525-0.525,0.814-1.224,0.814-1.966c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.05-2.881-1.052-3.933,0l-3.571,3.571
		c-0.574,0.573-1.366,0.733-2.114,0.421C33.447,9.313,33,8.644,33,7.832V2.78C33,1.247,31.753,0,30.22,0H23.78
		C22.247,0,21,1.247,21,2.78v5.052c0,0.812-0.447,1.481-1.197,1.792c-0.748,0.313-1.54,0.152-2.114-0.421l-3.571-3.571
		c-1.052-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l3.572,3.571
		c0.573,0.574,0.73,1.364,0.42,2.114S8.644,21,7.832,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h5.052
		c0.812,0,1.481,0.447,1.792,1.197s0.153,1.54-0.42,2.114l-3.572,3.571c-0.525,0.525-0.814,1.224-0.814,1.966
		c0,0.743,0.289,1.441,0.814,1.967l4.553,4.553c1.051,1.051,2.881,1.053,3.933,0l3.571-3.572c0.574-0.573,1.363-0.731,2.114-0.42
		c0.75,0.311,1.197,0.98,1.197,1.792v5.052c0,1.533,1.247,2.78,2.78,2.78h6.439c1.533,0,2.78-1.247,2.78-2.78v-5.052
		c0-0.812,0.447-1.481,1.197-1.792c0.751-0.312,1.54-0.153,2.114,0.42l3.571,3.572c1.052,1.052,2.883,1.05,3.933,0l4.553-4.553
		c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-3.572-3.571c-0.573-0.574-0.73-1.364-0.42-2.114
		S45.356,33,46.168,33h5.052c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22
		C52,30.65,51.65,31,51.22,31h-5.052c-1.624,0-3.019,0.932-3.64,2.432c-0.622,1.5-0.295,3.146,0.854,4.294l3.572,3.571
		c0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-3.571-3.572c-1.149-1.149-2.794-1.474-4.294-0.854
		c-1.5,0.621-2.432,2.016-2.432,3.64v5.052C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-5.052
		c0-1.624-0.932-3.019-2.432-3.64c-0.503-0.209-1.021-0.311-1.533-0.311c-1.014,0-1.997,0.4-2.761,1.164l-3.571,3.572
		c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553c-0.305-0.305-0.305-0.8,0-1.104l3.572-3.571c1.148-1.148,1.476-2.794,0.854-4.294
		C10.851,31.932,9.456,31,7.832,31H2.78C2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h5.052
		c1.624,0,3.019-0.932,3.64-2.432c0.622-1.5,0.295-3.146-0.854-4.294l-3.572-3.571c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553
		c0.304-0.305,0.799-0.305,1.104,0l3.571,3.571c1.147,1.147,2.792,1.476,4.294,0.854C22.068,10.851,23,9.456,23,7.832V2.78
		C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v5.052c0,1.624,0.932,3.019,2.432,3.64
		c1.502,0.622,3.146,0.294,4.294-0.854l3.571-3.571c0.306-0.305,0.801-0.305,1.104,0l4.553,4.553c0.305,0.305,0.305,0.8,0,1.104
		l-3.572,3.571c-1.148,1.148-1.476,2.794-0.854,4.294c0.621,1.5,2.016,2.432,3.64,2.432h5.052C51.65,23,52,23.35,52,23.78V30.22z"
		/>
		<path
			d="M27,18c-4.963,0-9,4.037-9,9s4.037,9,9,9s9-4.037,9-9S31.963,18,27,18z M27,34c-3.859,0-7-3.141-7-7s3.141-7,7-7
		s7,3.141,7,7S30.859,34,27,34z"
		/>
	</svg>
{/snippet}

{#snippet exportIcon()}
	<svg class="btn m-0 h-5 w-5 fill-primary-200 p-0" viewBox="0 0 459.757 459.757">
		<path
			d="M424.156,47.703H131.007c-19.631,0-35.601,15.97-35.601,35.601v42.731h32.497V83.304c0-1.711,1.392-3.103,3.104-3.103
				 h293.149c1.712,0,3.104,1.392,3.104,3.103v293.15c0,1.711-1.392,3.103-3.104,3.103H131.007c-1.712,0-3.104-1.392-3.104-3.103
				 v-42.732H95.406v42.732c0,19.63,15.97,35.601,35.601,35.601h293.149c19.631,0,35.601-15.97,35.601-35.601V83.304
				 C459.758,63.674,443.787,47.703,424.156,47.703z"
		/>
		<path
			d="M206.866,317.786l64.929-64.929c12.714-12.715,12.673-33.281,0-45.958l-64.929-64.929
				 c-18.332-18.332-49.743-8.756-54.838,16.562H32.497C14.55,158.533,0,173.081,0,191.029v77.697
				 c0,17.948,14.55,32.497,32.497,32.497h119.531C157.125,326.549,188.52,336.133,206.866,317.786z M32.497,191.029h151.39v-26.081
				 l64.929,64.929l-64.929,64.929v-26.081H32.497V191.029z"
		/>
	</svg>
{/snippet}
