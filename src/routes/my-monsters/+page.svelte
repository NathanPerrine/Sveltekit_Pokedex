<script lang="ts">
  import { caughtMonsters } from "$lib/stores";
  import MonsterCard from "../MonsterCard.svelte";
  import { flip } from 'svelte/animate';
  import { crossfade, fly } from 'svelte/transition';
  import { cubicOut, cubicInOut } from 'svelte/easing';

  const DEFAULT_DURATION = 500;
  const [send, receive] = crossfade({duration: DEFAULT_DURATION, easing: cubicOut});

  const release = (i: number) => {
    caughtMonsters.update((monsters) => {
      return [...monsters.slice(0, i), ...monsters.slice(i + 1)]
    })
  }
</script>

<div class="monsters">
  {#each $caughtMonsters as monster, i (monster.name)}
    <div
      in:receive="{{key:monster.name}}"
      out:send="{{key: monster.name}}"
      animate:flip="{{duration: DEFAULT_DURATION}}"
    >
    <div
      in:fly|global={{duration: 1000, delay:150*i, y:200, easing:cubicInOut}}
      class="mon-container"
    >
      <MonsterCard catchable={false} {monster} />
      <button on:click={() => release(i)}>Release!</button>
    </div>
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