<script lang="ts">
  import { caughtMonsters } from "$lib/stores";
  import MonsterCard from "../MonsterCard.svelte";
</script>

<div class="monsters">
  {#each $caughtMonsters as monster}
    <MonsterCard {monster} />
  {/each}
</div>

<style lang="scss">
    .monsters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>