<script lang="ts">
	import type { PageData } from './$types';

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

	export let data: PageData;
</script>

<section class="center">
  <div class="mon-header">
    <div class="img-container">
      <img src={data.monster.sprites.front_default} alt={data.monster.name} width="150" height="150"/>
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

  .center {
    display: flex;
    justify-content: center;
  }

  .mon-header {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    width: 500px;
    max-width: 500px;

    padding: 10px 0px;
    margin: 10px 0px;

    border: 3px solid black;
    border-radius: 5px;

    .img-container{
      display: flex;
      align-items: center;
      margin-right: 10px;

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
      color: var(--text);

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
    max-width: 500px;
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
