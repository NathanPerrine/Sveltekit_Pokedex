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
    background-color: #333;
    color: #fff;
    padding: 10px;

    a {
      color: #fff;
      text-decoration: none;
      padding: 10px;

      &:hover {
        color: #CCC;
      }

      &.active {
        border: 1px solid #CCC;
        border-radius: 4px;
      }

    }
  }

  :global(body) {
    margin: 0;
  }

  .container {
    max-width: 90%;
    margin: 0 auto;
    width: 1200px;
  }

</style>