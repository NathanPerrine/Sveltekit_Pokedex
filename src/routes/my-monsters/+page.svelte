<script lang="ts">
  import { caughtMonsters } from "$lib/stores";
  import MonsterCard from "../MonsterCard.svelte";
  import type { fullMonster } from "../mons/[monsterId]/+page";

  const release = (i: number) => {
    caughtMonsters.update((monsters) => {
      return [...monsters.slice(0, i), ...monsters.slice(i + 1)]
    })
  }
</script>

<div class="monsters">
  {#each $caughtMonsters as monster, i (i)}
    <div class="mon-container">
      <MonsterCard {monster} />
      <button on:click={() => release(i)}>Release!</button>
    </div>
  {/each}
</div>

<style lang="scss">
    .monsters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    .mon-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      button {
        width: 50%;
        background-color: rgb(223, 117, 20);
        color: white;
        border: 1px solid black;
        border-radius: 5px;
      }
    }
  }
</style>