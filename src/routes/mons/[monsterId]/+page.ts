import type { PageLoad } from './$types';

type sprites = {
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

type stats = {
  base_stat: number,
  stat: {
    name: string,
  }
}

export type fullMonster = {
  id: number,
  name: string,
  height: number,
  weight: number,
  sprites: sprites
  types: types[]
  stats: stats[]
}

export const load = (async ({ fetch, params }) => {
  let mon = params.monsterId.toLowerCase()

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${mon}`)
  const json = await response.json()
  const monster: fullMonster = json

  return {
    monster
  };
}) satisfies PageLoad;