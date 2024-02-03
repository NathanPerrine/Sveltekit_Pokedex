<script lang="ts">
    import type { LayoutData } from './$types';
    import { page } from '$app/stores';
    import { caughtMonsters } from '$lib/stores';

    export let data: LayoutData;
</script>

<div class="navbar">
  <a href="/" class:active={$page.url.pathname == '/'}>Home</a>
  <a href="/my-monsters" class:active={$page.url.pathname == '/my-monsters'}>
    My Monsters ({$caughtMonsters.length})
  </a>
</div>

<div class="container">
  <slot />
</div>

<style lang="scss">
  .navbar {
    display: flex;
    justify-content: space-between;

    background-color: var(--secondary);
    color: var(--text);

    padding: 10px;

    border-bottom: 3px solid black;

    position: sticky;
    top: 0;
    z-index: 1;

    a {
      color: var(--text);
      text-decoration: none;
      padding: 10px;

      &:hover {
        color: var(--text-highlight);
        background-color: #ddd;
      }

      &.active {
        border: 1px solid var(--headline);
        border-radius: 4px;
      }

    }
  }

  :global(body) {
    margin: 0;
    background-color: var(--background);
  }

  :global(.text) {
    color: var(--text);
  }

  :global(:root) {
    --background: #eff0f3;
    --headline: #232946;
    --text: #2a2a2a;
    --text-highlight: #444444;
    --highlight: #ff8e3c;
    --secondary: #fffffe;
  }

  .container {
    max-width: 90%;
    margin: 0 auto;
    width: 1200px;
  }

</style>