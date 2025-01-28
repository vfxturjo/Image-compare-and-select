<script lang="ts">
	import { createEventDispatcher, type Snippet } from 'svelte';

	import { leftAngles, leftArrow, rightAngles, rightArrow } from './icons.js';
	const dispatch = createEventDispatcher();
	let {
		settings = { page: 0, limit: 5, size: 0, amounts: [1, 2, 5, 10] },
		disabled = false,
		showPreviousNextButtons = true,
		showFirstLastButtons = false,
		showNumerals = false,
		maxNumerals = 1,
		justify = 'justify-between',
		select = 'select min-w-[150px]',
		amountText = 'Items',
		regionControl = 'btn-group',
		controlVariant = 'variant-filled',
		controlSeparator = '',
		active = 'variant-filled-primary',
		buttonClasses = '!px-3 !py-1.5 fill-current',
		buttonTextPrevious = leftArrow,
		buttonTextNext = rightArrow,
		buttonTextFirst = leftAngles,
		buttonTextLast = rightAngles,
		separatorText = 'of',
		labelFirst = 'First page',
		labelPrevious = 'Previous page',
		labelNext = 'Next page',
		leftContent = null as null | Snippet,
		midContent = null as null | Snippet,
		rightContent = null as null | Snippet
	} = $props();
	const cBase = 'flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4';
	const cLabel = 'w-full md:w-auto';
	let lastPage = Math.max(0, Math.ceil(settings.size / settings.limit - 1));
	let controlPages = getNumerals();
	function onChangeLength() {
		dispatch('amount', settings.limit);
		lastPage = Math.max(0, Math.ceil(settings.size / settings.limit - 1));
		if (settings.page > lastPage) {
			settings.page = lastPage;
		}
		controlPages = getNumerals();
	}
	function gotoPage(page) {
		if (page < 0) return;
		settings.page = page;
		dispatch('page', settings.page);
		controlPages = getNumerals();
	}
	function getFullNumerals() {
		const pages = [];
		for (let index = 0; index <= lastPage; index++) {
			pages.push(index);
		}
		return pages;
	}
	function getNumerals() {
		const pages = [];
		const isWithinLeftSection = settings.page < maxNumerals + 2;
		const isWithinRightSection = settings.page > lastPage - (maxNumerals + 2);
		if (lastPage <= maxNumerals * 2 + 1) return getFullNumerals();
		pages.push(0);
		if (!isWithinLeftSection) pages.push(-1);
		if (isWithinLeftSection || isWithinRightSection) {
			const sectionStart = isWithinLeftSection ? 1 : lastPage - (maxNumerals + 2);
			const sectionEnd = isWithinRightSection ? lastPage - 1 : maxNumerals + 2;
			for (let i = sectionStart; i <= sectionEnd; i++) {
				pages.push(i);
			}
		} else {
			for (let i = settings.page - maxNumerals; i <= settings.page + maxNumerals; i++) {
				pages.push(i);
			}
		}
		if (!isWithinRightSection) pages.push(-1);
		pages.push(lastPage);
		return pages;
	}
	function updateSize(size) {
		lastPage = Math.max(0, Math.ceil(size / settings.limit - 1));
		controlPages = getNumerals();
	}

	$effect(() => updateSize(settings.size));
	let classesLabel = $state(`${cLabel}`);
	let classesSelect = $state(`${select}`);
	let classesControls = $state(`${regionControl} ${controlVariant} ${controlSeparator}`);
	let classesBase = $state(`${cBase} ${justify}`);

	$effect(() => {
		classesLabel = `${cLabel}`;
	});
	$effect(() => {
		classesSelect = `${select}`;
	});
	$effect(() => {
		classesControls = `${regionControl} ${controlVariant} ${controlSeparator}`;
	});
	$effect(() => {
		classesBase = `${cBase} ${justify}`;
	});
</script>

<div class="paginator {classesBase}" data-testid="paginator">
	{#if leftContent}
		{@render leftContent()}
	{/if}
	<!-- Select Amount -->
	{#if settings.amounts.length}
		<label class="paginator-label {classesLabel}">
			<select
				bind:value={settings.limit}
				onchange={onChangeLength}
				class="paginator-select {classesSelect}"
				{disabled}
				aria-label="Select Amount"
			>
				{#each settings.amounts as amount}<option value={amount}>{amount} {amountText}</option
					>{/each}
			</select>
		</label>
	{/if}

	{#if midContent}
		{@render midContent()}
	{/if}
	<!-- Controls -->
	<div class="paginator-controls {classesControls}">
		<!-- Button: First -->
		{#if showFirstLastButtons}
			<button
				type="button"
				aria-label={labelFirst}
				class={buttonClasses}
				onclick={() => {
					gotoPage(0);
				}}
				disabled={disabled || settings.page === 0}
			>
				{@html buttonTextFirst}
			</button>
		{/if}
		<!-- Button: Back -->
		{#if showPreviousNextButtons}
			<button
				type="button"
				aria-label={labelPrevious}
				class={buttonClasses}
				onclick={() => {
					gotoPage(settings.page - 1);
				}}
				disabled={disabled || settings.page === 0}
			>
				{@html buttonTextPrevious}
			</button>
		{/if}
		<!-- Center -->
		{#if showNumerals === false}
			<!-- Details -->
			<button type="button" class="{buttonClasses} pointer-events-none !text-sm">
				{settings.page * settings.limit + 1}-{Math.min(
					settings.page * settings.limit + settings.limit,
					settings.size
				)}&nbsp;<span class="opacity-50">{separatorText} {settings.size}</span>
			</button>
		{:else}
			<!-- Numeric Row -->
			{#each controlPages as page}
				<button type="button" {disabled} class="{buttonClasses} " onclick={() => gotoPage(page)}>
					{page >= 0 ? page + 1 : '...'}
				</button>
			{/each}
		{/if}
		<!-- Button: Next -->
		{#if showPreviousNextButtons}
			<button
				type="button"
				aria-label={labelNext}
				class={buttonClasses}
				onclick={() => {
					gotoPage(settings.page + 1);
				}}
				disabled={disabled || (settings.page + 1) * settings.limit >= settings.size}
			>
				{@html buttonTextNext}
			</button>
		{/if}
		<!-- Button: last -->
		{#if showFirstLastButtons}
			<button
				type="button"
				aria-label={labelLast}
				class={buttonClasses}
				onclick={() => {
					gotoPage(lastPage);
				}}
				disabled={disabled || (settings.page + 1) * settings.limit >= settings.size}
			>
				{@html buttonTextLast}
			</button>
		{/if}
	</div>
	{#if rightContent}
		{@render rightContent()}
	{/if}
</div>
