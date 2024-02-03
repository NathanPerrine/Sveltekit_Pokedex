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

<button disabled={caught} on:click={catchMonster}>Catch!</button>

<Modal bind:showModal>
  <h2 slot="header">
    Pokemon caught!
  </h2>
  <p class="cap-first">{monster.name} has been sent to your PC.</p>
</Modal>

<style lang="scss">
  button {
    background: rgb(63, 202, 96);

    padding: 4px 8px;
    outline: 0;
    border: 0;
    cursor: pointer;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    border: 1px solid #cbd5e0;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);

    z-index: 10;

    &:disabled {
      background-color: var(--background);
      color: gray;
    }
  }
</style>