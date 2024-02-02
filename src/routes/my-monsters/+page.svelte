<script lang="ts">
  import { caughtMonsters } from "$lib/stores";
	import { fade, fly } from "svelte/transition";
  import MonsterCard from "../MonsterCard.svelte";

  const release = (i: number) => {
    caughtMonsters.update((monsters) => {
      return [...monsters.slice(0, i), ...monsters.slice(i + 1)]
    })
  }


  import { flip } from 'svelte/animate';
	import { bounceInOut, expoInOut, quartInOut } from "svelte/easing";
</script>

<div class="monsters">
  {#each $caughtMonsters as monster, i (monster.name)}
    <div
    in:fly|global={{duration: 1000, delay:150*i, y:200, easing:quartInOut}}
    out:fly={{ duration: 1000, y:200}}
    class="mon-container">
      <MonsterCard catchable={false} {monster} />
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