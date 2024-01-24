<script lang="ts">
  import  type { PageData } from "./$types";
  import type { IndexMonster } from "./+page"
  import { generations } from "./generations"

  export let data : PageData

  let monsterId : string;
  $: monster = data.monsters.find((monster) => monster.id === monsterId);
  const monsterClick = (monster: IndexMonster) => {
    monsterId = monster.id;
  };

</script>

<h1>{monsterId}</h1>
<h1>{monster?.name}</h1>

<div class="generations">
  {#each generations as generation (generation.id)}
    <div class="generation">
      {generation.main_region}
    </div>
  {/each}
</div>

<div class="monsters">
  {#each data.monsters as monster (monster.id)}

  <button class="monster" on:click={() => monsterClick(monster)}>
    <div class="monster-content">
      <img src={monster.image} alt={monster.name} />
      {monster.name}
    </div>
    <div class="monster-id">
      {monster.id}
    </div>
  </button>
  {/each}
</div>

<style lang="scss">
  .generations {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .generation {
    margin: 5px;
    padding: 5px 10px;
    border: 1px solid black;
    background-color: #f9f9f9;
    color: #333;

    &:hover {
      background-color: #eee;
    }
  }

  .monsters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .monster {
    width: 100px;
    margin: 10px;
    padding: 10px;
    position: relative;
    background-color: #eee;
    border: none;

    &:hover {
      background-color: #ddd;
    }
  }

  .monster-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .monster-id {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 0.8em;
    color: #aaa;
  }
</style>