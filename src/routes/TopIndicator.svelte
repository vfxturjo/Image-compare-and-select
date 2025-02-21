<script lang="ts">
	import { fade } from 'svelte/transition';
	let topIndicator: HTMLDivElement;
	// import { TopIndicatorStore } from '$lib/appState.svelte';

	// const topIndicatorStore = new TopIndicatorStore();

	let { inside_HTML = '', anchorElement = null, timeout = 200 } = $props();

	// make this $effect in future
	$effect(() => {
		if (anchorElement != null) {
			const boundingBox = anchorElement.getBoundingClientRect();
			if (topIndicator != null) {
				topIndicator.style.top = `${boundingBox.top}px`;
				topIndicator.style.left = `${boundingBox.left}px`;
				topIndicator.style.width = `${boundingBox.width}px`;
				topIndicator.style.height = `${boundingBox.height}px`;
			}
		} else {
			topIndicator.style.top = '0px';
			topIndicator.style.left = '0px';
			topIndicator.style.width = '100%';
			topIndicator.style.height = '100%';
		}
	});

	let timeOutHandle: ReturnType<typeof setTimeout>;

	$effect(() => {
		if (timeOutHandle != null) {
			clearTimeout(timeOutHandle);
		}

		if ('' == inside_HTML.toString()) {
			return;
		}

		timeOutHandle = setTimeout(() => {
			inside_HTML = '';
			anchorElement = null;
		}, timeout);
	});
</script>

<div class="centerThings pointer-events-none fixed z-50" bind:this={topIndicator}>
	{#if inside_HTML.toString() != ''}
		<div class="centerThings h-full w-full bg-gray-500 bg-opacity-15" out:fade>
			{@html inside_HTML}
		</div>
	{/if}
</div>
