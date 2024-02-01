import { writable, type Writable } from "svelte/store";
import type { fullMonster } from "../routes/mons/[monsterId]/+page";

export const caughtMonsters: Writable<fullMonster[]> = writable([]);