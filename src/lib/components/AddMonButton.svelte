<script lang="ts">
  import { caughtMonsters } from "$lib/stores";
  import Modal from '$lib/components/Modal.svelte';
  import type { IndexMonster } from "../../routes/+page";
  import type { fullMonster } from "../../routes/mons/[monsterId]/+page";

  export let monster : IndexMonster | fullMonster

  let caught = false;
  let showModal = false;

  $: if ($caughtMonsters.some(mon => mon.name.toLowerCase() === monster.name.toLowerCase())){
    caught = true;
  } else {
    caught = false;
  };

  const catchMonster = () => {
    caughtMonsters.update((monsters) => {
      return [...monsters, monster]
    })
    showModal = true
  }
</script>

<button class="btn" disabled={caught} on:click={catchMonster}>Catch!</button>

<Modal bind:showModal>
  <h2 slot="header">
    Pokemon caught!
  </h2>
  <p class="cap-first">{monster.name} has been sent to your PC.</p>
</Modal>

<style lang="scss">
  button {
    width: var(--width);

    &:disabled {
      cursor: auto;
      color: gray;
      pointer-events: none;
    }
  }
</style>