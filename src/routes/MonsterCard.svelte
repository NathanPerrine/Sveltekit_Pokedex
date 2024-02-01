<script lang="ts">
	import type { IndexMonster } from "./+page";
  import type { fullMonster } from "./mons/[monsterId]/+page";

  export let monster : IndexMonster | fullMonster;

  let image: string | null

  $: if ('image' in monster) {
    image = monster.image;
  } else {
    image = monster.sprites.front_default
  }
</script>

<div class="monster">
  <a href={`/mons/${monster.name}`}>
    <div class="monster-content">
      <img loading="lazy" src={image} alt={monster.name} width="100px" height="100px" />
      <span class="mon-name">
        {monster.name}
      </span>
    </div>
    <div class="monster-id">
      {monster.id}
    </div>
  </a>
</div>

<style lang="scss">
  .monster {
    width: 100px;
    margin: 10px;
    padding: 10px;

    position: relative;

    background-color: var(--secondary);

    border: 3px solid var(--text);
    border-radius: 10px;

    &:hover {
      background-color: #ddd;
    }

    a {
      border: none;
      background-color: inherit;
      max-width: 100px;

      font-weight: bold;
      color: var(--text);
    }
  }

  .monster-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: none;

    .mon-name {
      text-align: center;

      &::first-letter {
          text-transform: uppercase;
      }
    }
  }

  .monster-id {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 0.8em;
    color: var(--text-highlight);
  }
</style>