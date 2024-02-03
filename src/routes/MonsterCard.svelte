<script lang="ts">
	import AddMonButton from "$lib/components/AddMonButton.svelte";
  import { page } from "$app/stores";
  import { caughtMonsters } from "$lib/stores";
  import type { IndexMonster } from "./+page";
  import type { fullMonster } from "./mons/[monsterId]/+page";

  export let monster : IndexMonster | fullMonster;
  export let catchable : boolean = false;

  let image: string | null

  $: if ('image' in monster) {
    image = monster.image;
  } else {
    image = monster.sprites.front_default
  }

  let caught = false;

  $: if ($page.url.pathname == '/' && $caughtMonsters.some(mon => mon.name.toLowerCase() === monster.name.toLowerCase())){
    caught = true;
  } else {
    caught = false;
  };
</script>

<div class="monster" class:caught={caught}>
  <a href={`/mons/${monster.name}`}>
    <div class="monster-content">
      <img loading="lazy" src={image} alt={monster.name} width="100px" height="100px" />
      <span class="mon-name">
        {monster.name}
      </span>
    </div>
    <div class="monster-id">
      {monster.id}
    </div>
  </a>
  {#if catchable}
    {#if !caught}
    <div class="center catch-btn">
      <AddMonButton monster={monster} />
    </div>
    {:else}
        <a class="view-btn" href={`/mons/${monster.name}`}>View</a>
    {/if}
  {/if}
</div>

<style lang="scss">
  .center {
    display: flex;
    justify-content: center;
  }

  .catch-btn {
    padding-top: 10px;
    position: relative;
    bottom: 5px;
  }

  .view-btn {
    display: block;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 11px;
    text-align: center;
  }

  .monster {
    width: 100px;
    margin: 10px;
    padding: 10px;

    position: relative;

    background-color: var(--secondary);

    border: 3px solid var(--text);
    border-radius: 10px;

    &:hover {
      background-color: #ddd;
    }
  }

  .caught {
      background-color: goldenrod;
    }

  a {
      border: none;
      background-color: inherit;

      font-weight: bold;
      color: var(--text);
    }

  .monster-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: none;

    .mon-name {
      text-align: center;

      &::first-letter {
          text-transform: uppercase;
      }
    }
  }

  .monster-id {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 0.8em;
    color: var(--text-highlight);
  }
</style>