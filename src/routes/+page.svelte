<script lang="ts">
  import  type { PageData } from "./$types";
  import { page } from "$app/stores";
  import { generations } from "./generations"
  import { goto } from "$app/navigation"
	import MonsterCard from "./MonsterCard.svelte";


  export let data : PageData

  let form = {
    searchString: ''
  }

  let searchString = ''
  $: selectedMonsters = data.monsters.filter((monster) => {
    return monster.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
  })

  $: monsterId = $page.url.searchParams.get("monsterId") || '';
  $: monster = data.monsters.find((monster) => monster.id === monsterId);
  $: monsterId2 = $page.url.searchParams.get("monsterId2") || '';
  $: monster2 = data.monsters.find((monster) => monster.id === monsterId2);

  $: selectedGenerationId = $page.url.searchParams.get('generation_id') || '';

  const updateSearchParams = (key: string, value: string) => {
    const searchParams = new URLSearchParams($page.url.searchParams);
    searchParams.set(key, value);
    goto(`?${searchParams.toString()}`);
  };

  const submitSearch = (e: Event) => {
    searchString = form.searchString
  }

</script>

{#if monster}
  <MonsterCard monster={monster} updateSearchParams={updateSearchParams}/>
{/if}
{#if monster2}
  <MonsterCard monster={monster2} updateSearchParams={updateSearchParams}/>
{/if}

<h1>{monsterId}</h1>
<h1>{monster?.name}</h1>
<h1>{monsterId2}</h1>
<h1>{monster2?.name}</h1>

<div class="generations">
  <button class="generation"
    class:active={selectedGenerationId == 'all'}
    on:click={() => updateSearchParams('generation_id', 'all')}
  >
    All
  </button>
  {#each generations as generation (generation.id)}
    <button on:click={() => updateSearchParams('generation_id', generation.id.toString())}  class="generation"
    class:active={selectedGenerationId === generation.id.toString()}
    >
      {generation.main_region}
    </button>
  {/each}
</div>

<form class="search-form" on:submit|preventDefault={submitSearch}>
  <input class="search-field" type="text" bind:value={form.searchString} placeholder="Pokemon Name"/>
  <input type="submit" value="Search" />
</form>

<div class="monsters">
  {#each selectedMonsters as monster (monster.id)}
    <MonsterCard monster={monster} updateSearchParams={updateSearchParams} isInteractive={true}/>
  {/each}
</div>

<style lang="scss">
  .generations {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .generation {
    margin: 5px;
    padding: 5px 10px;
    border: 1px solid black;
    background-color: #f9f9f9;
    color: #333;
    cursor: pointer;
    width: 60px;

    &:hover {
      background-color: #eee;
    }

    &.active {
      background-color: #333;
      color: #fff;

      &:hover {
        background-color: #444;
      }
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

    input[type="text"] {
      padding: 5px 10px;
      border: 1px solid #333;
      border-radius: 5px;
      width: 200px;
    }

    input[type="submit"] {
      padding: 5px 10px;
      border: 1px solid #333;
      border-radius: 5px;
      margin-left: 10px;
      background-color: #333;
      color: #fff;
    }
  }

  .searchField {
    padding: 5px 10px;
    border: 1px solid #333;
    border-radius: 5px;
    width: 200px;
  }
</style>