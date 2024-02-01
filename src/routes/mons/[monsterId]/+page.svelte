<script lang="ts">
	import type { PageData } from './$types';
  import { caughtMonsters } from "$lib/stores";
  import Modal from '$lib/components/Modal.svelte';

  export let data: PageData;
  let showModal = false;

  type statObj = {
    [key: string]: string;
  }
  const stats: statObj = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk.',
    'special-defense': 'Sp. Def.',
    'speed': 'Speed'
  }

  let dexCount = 0;
  let shiny = false;
  let caught = false;

  $: if ($caughtMonsters.some(mon => mon.name === data.monster.name)){
    caught = true;
  } else {
    caught = false;
  };

  const catchMonster = () => {
    caughtMonsters.update((monsters) => {
      return [...monsters, data.monster]
    })
    showModal = true
  }

</script>

<section id="mon-info" class="center">
  <div class="mon-header">
    <div class="img-container">
      <img src={shiny ? data.monster.sprites.front_shiny : data.monster.sprites.front_default} alt={data.monster.name} width="150" height="150"/>
      <div class="shiny">
        <label>
          <input type="checkbox" bind:checked={shiny} />
          <span>
            {#if !shiny}
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2m0 13a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15m0-8a3 3 0 1 0 0 6a3 3 0 0 0 0-6m5.657-1.596a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06zm-9.193 9.192a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06zM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10M5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10m9.596 5.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06zM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06z"/></svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="#FFAC33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2z"/><circle cx="18" cy="18" r="10" fill="#FFAC33"/></svg>
            {/if}
          </span>
        </label>
      </div>
    </div>

    <div class="mon-info">
      <div class="info-block text">
        <h2 class="info-name name">{data.monster.name}</h2>
        <div class="info-container">
          <p class="info-name text">ID: </p>
          <p class="info-data text">{data.monster.id}</p>
        </div>
        <div class="info-container">
          <p class="info-name text">Height: </p>
          <p class="info-data text">{data.monster.height}</p>
        </div>
        <div class="info-container">
          <p class="info-name text">Weight: </p>
          <p class="info-data text">{data.monster.weight}</p>
        </div>
      </div>
      <div class="type-container">
        {#each data.monster.types as types}
        <div class={"pkm-type " + types.type.name}><span>{types.type.name}</span></div>
        {/each}
      </div>
    </div>
  </div>
</section>

<section class="center">
  <div class="addMonster">
    <button disabled={caught} on:click={catchMonster}>Catch!</button>
  </div>

  <Modal bind:showModal>
    <h2 slot="header">
      Pokemon caught!
    </h2>
    <p class="cap-first">{data.monster.name} has been sent to your PC.</p>
  </Modal>
</section>

<section id="pokedex" class="center">
  <div class="pokedex">
    <div class="dex-entry text">
      <!-- have to replace \u000c unicode character coming from the api -->
      {(data.species.flavor_text_entries[dexCount].flavor_text).replace('\u000c', ' ')}
    </div>
    <div class="scroll-area">
      <div class="dex-game">

        <label>
          <div>
            Game:
          </div>
          <select bind:value={dexCount} name="games">
            {#each data.species.flavor_text_entries as dex, i}
              <option selected value={i}>
                {dex.version.name} | {dex.language.name}
              </option>
            {/each}
          </select>
        </label>
      </div>

      <div class="scroll-buttons">
        <button on:click={() => (dexCount > 0) ? dexCount-- : null}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M328 112L184 256l144 144"/></svg>
        </button>
        <button on:click={() => (dexCount < data.species.flavor_text_entries.length -1) ? dexCount++ : null}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="m184 112l144 144l-144 144"/></svg>
        </button>
      </div>
    </div>
    </div>
  </section>

<section id="stats" class="center">
  <div class="stat-block text">
    {#each data.monster.stats as stat}
    <div class="stat-container">
      <div class="stat-name">{stats[stat.stat.name] || stat.stat.name} &nbsp; </div>
      <div class="stat">
        {stat.base_stat}
      </div>
      <div class="stat-bar" style="--width-fill: calc(({stat.base_stat}% / 255) * 100)"
      class:very-bad={29 >= stat.base_stat && stat.base_stat >= 1}
      class:bad={59 >= stat.base_stat && stat.base_stat >= 30}
      class:mediocre={89 >= stat.base_stat && stat.base_stat >= 60}
      class:good={119 >= stat.base_stat && stat.base_stat >= 90}
      class:very-good={149 >= stat.base_stat && stat.base_stat >= 120}
      class:phenomenal={255 >= stat.base_stat && stat.base_stat >= 150}
      ></div>
    </div>
    {/each}
  </div>
</section>

<style lang="scss">

  select {
    max-width: 90%;
  }

  .cap-first::first-letter {
    text-transform: uppercase;
  }

  button {
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    background-color: white;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
    border: 1px solid #cbd5e0;
    line-height: 26px;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);
  }

  .addMonster {
    button {
      background: rgb(28, 184, 65);
      color: white;
      padding: 8px 16px;

      &:disabled {
        background-color: var(--background);
        color: gray;
      }
    }
  }


  .center {
    display: flex;
    justify-content: center;
  }

  .pokedex {
    border: 3px solid black;
    border-radius: 5px;
    background-color: var(--secondary);

    margin: 10px 0px;
    padding: 10px 0px;
    height: 150px;
    width: 500px;

    display: flex;

    .dex-entry {
      padding: 10px;
      width: 50%;
      overflow-y: auto;

      font-weight: bold;
    }

    .scroll-area {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .dex-game {
        font-weight: bold;
        text-align: center;
      }

      .scroll-buttons {
        display: flex;
        justify-content: space-around;
        align-items: center;

        padding: 10px;

        button {
          margin: 3px;
          height: 45px;
          width: 45px;
        }
      }
    }
  }

  .mon-header {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    width: 500px;

    padding: 10px 0px;
    margin: 10px 0px;

    border: 3px solid black;
    border-radius: 5px;

    .img-container{
      display: flex;
      align-items: center;
      margin-right: 10px;

      position: relative;

      .shiny {
        position: absolute;
        top: 5%;
        right: 5%;

        input[type=checkbox]{
          display: none;
        }
      }


      img {
        background-color: var(--secondary);
        border-radius: 10px;
      }
    }
  }

  .mon-info {
    display: flex;
    flex-direction: column;
    font-weight: bold;

    .name {
      text-align: center;
      text-decoration: underline;
      color: var(--headline);
      max-width: 125px;

      &::first-letter {
        text-transform: uppercase;
      }
    }

    .info-block {
      margin-bottom: 10px;
    }

    .info-container {
      display: flex;
      justify-content: center;

      text-align: right;

      p {
        margin: 0px;
      }

      .info-name {
        width: 50px;
      }
      .info-data {
        width: 30px;
      }
    }
  }

  .type-container {
    width: 125px;
    max-width: 125px;
    display: flex;
    justify-content: space-between;

  }

  .stat-block {
    display: flex;
    flex-direction: column;

    width: 500px;

    border: 3px solid black;
    border-radius: 5px;

    padding-bottom: 10px;
    background-color: var(--secondary);

    .stat-container {
    display: flex;
    margin-top: 10px;
    width: 100%;

    .stat-name {
      width: 70px;
      text-align: right;
      font-weight: bold;
    }
  }

    .stat {
      width: 30px;
      font-weight: bold;
    }

    .stat-bar{
      max-width: min(400px, 70%);
      width: var(--width-fill);

      &.very-bad {
        background-color: red;
      }
      &.bad {
        background-color: orange;
      }
      &.mediocre {
        background-color: #ffd803;
      }
      &.good {
        background-color: green;
      }
      &.very-good {
        background-color: darkgreen;
      }
      &.phenomenal {
        background-color: blue;
      }
    }
  }

  // type colors
  $normal: #a8a878;
  $fire: #F08030;
  $water: #6890F0;
  $grass: #78C850;
  $electric: #F8D030;
  $ice: #98D8D8;
  $fighting: #C03028;
  $poison: #A040A0;
  $ground: #E0C068;
  $flying: #A890F0;
  $psychic: #F85888;
  $bug: #A8B820;
  $rock: #B8A038;
  $ghost: #705898;
  $dragon: #7038F8;
  $dark: #705848;
  $steel: #B8B8D0;
  $fairy: #EE99AC;
  $stellar: #7CC7B2;

	.pkm-type {
		font-size: 15px;

		font-family: 'Trebuchet MS';
		font-weight: bold;
    width: 50px;
		text-align: center;
		display: inline-block;
		border: 0.1em solid transparent;
		padding: 0.1em 0.2em 0.2em;
		border-radius: 0.4em;
		span {
			text-transform: uppercase;
			font-size: 0.8em;
			color: white;
			text-shadow: 0em 0em 0.2em black;
		}

		&.normal {
			background-color: $normal;
			border-top-color: lighten($normal, 15%);
			border-bottom-color: darken($normal, 15%);
		}
		&.fire {
			background-color: $fire;
			border-top-color: lighten($fire, 15%);
			border-bottom-color: darken($fire, 15%);
		}
    &.water {
			background-color: $water;
			border-top-color: lighten($water, 15%);
			border-bottom-color: darken($water, 15%);
		}
		&.grass {
			background-color: $grass;
			border-top-color: lighten($grass, 15%);
			border-bottom-color: darken($grass, 15%);
		}
		&.electric {
			background-color: $electric;
			border-top-color: lighten($electric, 15%);
			border-bottom-color: darken($electric, 15%);
		}
		&.ice {
			background-color: $ice;
			border-top-color: lighten($ice, 15%);
			border-bottom-color: darken($ice, 15%);
		}
		&.fighting {
			background-color: $fighting;
			border-top-color: lighten($fighting, 15%);
			border-bottom-color: darken($fighting, 15%);
		}
		&.poison {
			background-color: $poison;
			border-top-color: lighten($poison, 15%);
			border-bottom-color: darken($poison, 15%);
		}
		&.ground {
			background-color: $ground;
			border-top-color: lighten($ground, 15%);
			border-bottom-color: darken($ground, 15%);
		}
		&.flying {
			background-color: $flying;
			border-top-color: lighten($flying, 15%);
			border-bottom-color: darken($flying, 15%);
		}
		&.psychic {
			background-color: $psychic;
			border-top-color: lighten($psychic, 15%);
			border-bottom-color: darken($psychic, 15%);
		}
		&.bug {
			background-color: $bug;
			border-top-color: lighten($bug, 15%);
			border-bottom-color: darken($bug, 15%);
		}
		&.rock {
			background-color: $rock;
			border-top-color: lighten($rock, 15%);
			border-bottom-color: darken($rock, 15%);
		}
		&.ghost {
			background-color: $ghost;
			border-top-color: lighten($ghost, 15%);
			border-bottom-color: darken($ghost, 15%);
		}
		&.dragon {
			background-color: $dragon;
			border-top-color: lighten($dragon, 15%);
			border-bottom-color: darken($dragon, 15%);
		}
		&.dark {
			background-color: $dark;
			border-top-color: lighten($dark, 15%);
			border-bottom-color: darken($dark, 15%);
		}
		&.steel {
			background-color: $steel;
			border-top-color: lighten($steel, 15%);
			border-bottom-color: darken($steel, 15%);
		}
		&.fairy {
			background-color: $fairy;
			border-top-color: lighten($fairy, 15%);
			border-bottom-color: darken($fairy, 15%);
		}
		&.stellar {
			background-color: $stellar;
			border-top-color: lighten($stellar, 15%);
			border-bottom-color: darken($stellar, 15%);
		}
	}


</style>
