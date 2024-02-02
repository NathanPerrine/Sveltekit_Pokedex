import { writable, type Writable } from "svelte/store";
import type { IndexMonster } from "../routes/+page";
import type { fullMonster } from "../routes/mons/[monsterId]/+page";

export const caughtMonsters: Writable<(fullMonster|IndexMonster)[]> = writable([]);