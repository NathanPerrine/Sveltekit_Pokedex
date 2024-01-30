<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data.monster.types[0].type.name);
</script>

<p>Hello from {data.monster.name} coming soon</p>
<img src={data.monster.sprites.front_default} alt={data.monster.name} />
<p>{data.monster.types[0].type.name}</p>
<div class={"pkm-type " + data.monster.types[0].type.name}><span>Fire</span></div>

<style lang="scss">
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
		width: 6em;
		text-align: center;
		display: inline-block;
		border: 0.1em solid transparent;
		padding: 0.1em 0.2em 0.2em;
		margin: 0.1em 0.015em;
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
