<script lang="ts">
    import type { LayoutData } from './$types';
    import { page } from '$app/stores';
    import { caughtMonsters } from '$lib/stores';

    export let data: LayoutData;
</script>

<div class="navbar">
  <a class="btn" href="/" class:active={$page.url.pathname == '/'}>Home</a>
  <a class="btn" href="/my-monsters" class:active={$page.url.pathname == '/my-monsters'}>
    My Monsters ({$caughtMonsters.length})
  </a>
</div>

<div class="container">
  <slot />
</div>

<style lang="scss">
  .navbar {
    background-color: var(--dark-shade);

    display: flex;
    justify-content: space-between;
    color: var(--light-shade);

    padding: 10px;

    border-bottom: 3px solid var(--dark-accent);

    position: sticky;
    top: 0;
    z-index: 1;

    a {
      text-decoration: none;
      padding: 5px;
    }
  }

  :global(body) {
    height: 100vh;
    margin: 0;
    background-color: var(--dark-shade);
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='50' height='50' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'%3E%3Crect width='100%25' height='100%25' fill='rgba(30, 48, 97,1)'/%3E%3Ccircle cx='0' cy='20' r='3' fill='%234a5568'/%3E%3Ccircle cx='40' cy='20' r='3' fill='%234a5568'/%3E%3Cpath d='m 18 17 h4 v6 h-4z' fill='%231a202c'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")
  }

  :global(.center) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(.btn) {
    background-color: var(--dark-shade);
    color: var(--light-shade);

    border-left: 3px solid var(--light-shade);
    border-top: 3px solid var(--light-shade);
    border-right: 3px solid var(--light-accent);
    border-bottom: 3px solid var(--light-accent);
    border-radius: 10px;

    padding: 5px;

    cursor: pointer;

    &:hover {
      background-color: var(--light-accent);
      color: var(--dark-shade);
      border-color: var(--dark-accent);
    }
  }

  :global(.active) {
    background-color: var(--main-color);
      color: var(--light-shade);

      &:hover {
        background-color: var(--light-accent);
        color: var(--dark-shade);
      }
  }

  :global(:root) {
    --light-shade: #E1D5CB;
    --light-accent: #6DA9AD;
    --main-color: #14253D;
    --dark-accent: #7682A7;
    --dark-shade: #1E3061;

    --success: #56985B;
    --warning: #D38823;
    --danger: #f44336;
  }

  .container {
    max-width: 90%;
    margin: 0 auto;
    width: 1200px;
  }
</style>