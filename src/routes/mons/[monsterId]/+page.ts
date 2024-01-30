import type { PageLoad } from './$types';

type Sprites = {
  back_default: string | null,
  back_female: string | null,
  back_shiny: string | null,
  back_shiny_female: string | null,
  front_default: string | null,
  front_female: string | null,
  front_shiny: string | null,
  front_shiny__female: string | null,
}

type types = {
  type: {
    name: string
  }
}

export type FullMonster = {
  name: string,
  sprites: Sprites
  types: types[]
}

export const load = (async ({ fetch, params }) => {
  let mon = params.monsterId.toLowerCase()

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${mon}`)
  const json = await response.json()
  console.log(json)
  const monster: FullMonster = json

  return {
    monster
  };
}) satisfies PageLoad;