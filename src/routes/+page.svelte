<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { generations } from './generations';
	import { goto } from '$app/navigation';
	import MonsterCard from './MonsterCard.svelte';
	import { fade } from 'svelte/transition';

	export let data: PageData;

	let form = {
		searchString: ''
	};

	let searchString = '';
	$: selectedMonsters = data.monsters.filter((monster) => {
		return monster.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase());
	});

	$: selectedGenerationId = $page.url.searchParams.get('generation_id') || '';

	const updateSearchParams = (key: string, value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);
		goto(`?${searchParams.toString()}`);
	};

	const submitSearch = (e: Event) => {
		searchString = form.searchString;
	};
</script>

<section id="search">
	<div class="generations">
		<button
			class="btn generation"
			class:active={selectedGenerationId == 'all'}
			on:click={() => updateSearchParams('generation_id', 'all')}
		>
			All
		</button>
		{#each generations as generation (generation.id)}
			<button
				on:click={() => updateSearchParams('generation_id', generation.id.toString())}
				class="btn generation"
				class:active={selectedGenerationId === generation.id.toString() ||
					(selectedGenerationId === '' && generation.id === 1)}
			>
				{generation.main_region}
			</button>
		{/each}
	</div>

	<form class="search-form" on:submit|preventDefault={submitSearch}>
		<input
			class="search-field"
			type="text"
			bind:value={form.searchString}
			placeholder="Pokemon Name"
		/>
		<input type="submit" value="Search" class="btn" />
	</form>
</section>

<section class="monsters-container">
	<div class="monsters">
		{#each selectedMonsters as monster, i (monster.id)}
			<div in:fade={{ duration: 300, delay: 200 + 25 * i }} out:fade={{ duration: 200 }}>
				<MonsterCard catchable={true} {monster} />
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	.generations {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

	.generation {
		width: 60px;
		margin: 10px 5px 0;
	}

	.monsters-container {
		background-color: #111927;
		background-image: radial-gradient(at 47% 33%, hsl(223.88, 53%, 25%) 0, transparent 59%),
			radial-gradient(at 82% 65%, hsl(218, 39%, 11%) 0, transparent 55%);

		border: 3px solid var(--light-shade);
		border-radius: 5px;

		height: 65vh;
		overflow-y: auto;

		box-shadow: 1px 1px 5px var(--light-shade) inset;

		@media (min-width: 400px) {
			height: 70vh;
		}
		@media (min-width: 768px) {
			height: 75vh;
		}
    @media (min-width: 1000px){
      height: 85vh;
    }
	}

	.monsters {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

	.search-form {
		display: flex;
		justify-content: center;
		margin: 20px 0;

		input[type='text'] {
			padding: 5px 10px;
			border: 2px solid var(--light-accent);
			border-radius: 5px;
			width: 200px;
		}

		input[type='submit'] {
			margin-left: 10px;
		}
	}
</style>
