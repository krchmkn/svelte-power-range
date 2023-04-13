<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import debounce from 'lodash/debounce';

	export let value = 0;
	$: volume = value;
	const markers = [0, 25, 50, 75, 100];

	const dispatch = createEventDispatcher<ComponentEvent>();
	const handleChange = debounce(() => {
		dispatch('change', { payload: volume });
	}, 300);
</script>

<section in:fade class="range">
	<label for="volume" class="range__label">
		Мощность: <span class="range__volume">{volume}%</span>
	</label>

	<input
		type="range"
		class="range__input"
		list="markers"
		min="0"
		max="100"
		bind:value={volume}
		on:change={handleChange}
	/>

	<datalist id="markers">
		{#each markers as marker}
			<option value={marker} />
		{/each}
	</datalist>
</section>

<style>
	.range,
	.range__label {
		display: grid;
		place-content: center;
		place-items: center;
		gap: 0.5rem;
	}

	.range {
		padding: 2rem;
		border-radius: 1rem;
		color: var(--dark);
		background: var(--light);
		min-width: 250px;
	}

	.range__label {
		font-size: 2rem;
	}

	.range__volume {
		font-size: 4rem;
		white-space: nowrap;
	}

	/* TODO .range__input::-webkit-scrollbar {
    width: 4px;
  }

  .range__input::-webkit-scrollbar-thumb {
    background: red;
    border-radius: 4px;
  }

  .range__input::-webkit-scrollbar-thumb:hover {
    background: red;
  } */
</style>
