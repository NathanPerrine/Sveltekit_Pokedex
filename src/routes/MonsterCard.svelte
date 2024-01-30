<script lang="ts">
	import type { IndexMonster } from "./+page";
  import { caughtMonsters } from "$lib/stores";

  export let monster : IndexMonster;

  const catchMonster = () => {
    caughtMonsters.update((monsters) => {
      return [...monsters, monster]
    })
    console.log("caught monster: " + monster)
  }
</script>

<div class="monster">
  <!-- <button on:click={catchMonster}> -->
  <a href={`/mons/${monster.name}`}>
    <div class="monster-content">
      <img loading="lazy" src={monster.image} alt={monster.name} />
      {monster.name}
    </div>
    <div class="monster-id">
      {monster.id}
    </div>
  <!-- </button> -->
  </a>
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
      max-width: 100px;
    }
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