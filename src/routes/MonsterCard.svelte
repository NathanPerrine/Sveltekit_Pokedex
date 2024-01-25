<script lang="ts">
	import type { IndexMonster } from "./+page";

  export let monster : IndexMonster;
  export let updateSearchParams : (key: string, value: string) => void;
  export let isInteractive : boolean = false;

</script>

<div class="monster">
  <button on:click={() => isInteractive ? updateSearchParams('monsterId', monster.id) : () => {}}>
    <div class="monster-content">
      <img src={monster.image} alt={monster.name} />
      {monster.name}
    </div>
    <div class="monster-id">
      {monster.id}
    </div>
  </button>
  {#if isInteractive}
  <button class="add2" on:click={() => updateSearchParams('monsterId2', monster.id)}>
    Add Monster 2
  </button>
  {/if}
</div>

<style lang="scss">
  .monster {
    width: 100px;
    margin: 10px;
    padding: 10px;
    position: relative;
    background-color: #eee;
    border: none;

    &:hover {
      background-color: #ddd;
    }

    button {
      border: none;
      background-color: inherit;
    }
  }

  .add2:hover {
    color: blue;
  }

  .monster-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: none;
  }

  .monster-id {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 0.8em;
    color: #aaa;
  }
</style>