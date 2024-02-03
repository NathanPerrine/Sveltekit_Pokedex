import { writable, type Writable } from "svelte/store";
import type { IndexMonster } from "../routes/+page";
import type { fullMonster } from "../routes/mons/[monsterId]/+page";
import { browser } from "$app/environment";

const check = browser ? window.localStorage.getItem('caughtMonsters') : null;
let initialValue = []

if (typeof check === 'string') {
  initialValue = JSON.parse(check)
}

export const caughtMonsters: Writable<(fullMonster|IndexMonster)[]> = writable(initialValue);

caughtMonsters.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('caughtMonsters', JSON.stringify(value))
  }
})