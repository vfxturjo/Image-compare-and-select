<script lang="ts">
	import { topIndicatorStore } from '$lib/appState.svelte';
	import { fade } from 'svelte/transition';

	$effect(() => {
		console.log(topIndicatorStore.getLength());
	});
</script>

{#if topIndicatorStore.getLength() > 0}
	{#each topIndicatorStore.getTopIndicators() as topIndicatorObject}
		<div
			class="centerThings pointer-events-none absolute z-50 bg-gray-500 bg-opacity-20"
			out:fade|global={{ duration: topIndicatorObject.fadeDuration }}
			style={`top: ${topIndicatorObject.top}px; 
				   left: ${topIndicatorObject.left}px; 
				   width: ${topIndicatorObject.width}px; 
				   height: ${topIndicatorObject.height}px;`}
		>
			<!-- {#if topIndicatorObject.innerHTML.toString() != ''}
				<div class="centerThings h-full w-full bg-gray-500 bg-opacity-15" out:fade> -->
			{@html topIndicatorObject.innerHTML}
			<!-- </div>
			{/if} -->
		</div>
	{/each}
{/if}
