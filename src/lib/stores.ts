import { writable, type Writable } from "svelte/store";
import type { IndexMonster } from "../routes/+page";
import type { fullMonster } from "../routes/mons/[monsterId]/+page";
import { browser } from "$app/environment";

const initialValue = browser ? JSON.parse(window.localStorage.getItem('caughtMonsters') || '') ?? [] : [];

export const caughtMonsters: Writable<(fullMonster|IndexMonster)[]> = writable(initialValue);

caughtMonsters.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('caughtMonsters', JSON.stringify(value))
  }
})