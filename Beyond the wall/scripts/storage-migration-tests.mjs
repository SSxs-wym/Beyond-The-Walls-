import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const main = fs.readFileSync(path.join(projectRoot, "game", "js", "main.js"), "utf8");
const start = main.indexOf("const GAME_BGM_RESUME_KEY");
const end = main.indexOf("// 复杂玩法使用任务牌", start);
assert.notEqual(start, -1, "storage constants must remain testable");
assert.notEqual(end, -1, "storage migration test seam must remain available");
const migrationSource = main.slice(start, end);

const keyPairs = [
  ["beyond_walls_game_bgm_time_v1", "shawshank_game_bgm_time"],
  ["beyond_walls_checkpoint_v1", "shawshank_pixel_escape_checkpoint"],
  ["beyond_walls_save_v2", "shawshank_pixel_escape_save_v2"],
  ["beyond_walls_yard_navigation_map_v1", "shawshank_yard_navigation_map_v1"],
  ["beyond_walls_pipe_navigation_map_v1", "shawshank_pipe_navigation_map_v1"]
];

function createStorage(initialEntries) {
  const values = new Map(initialEntries);
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); }
  };
}

function runMigration(initialEntries) {
  const localStorage = createStorage(initialEntries);
  const context = vm.createContext({ localStorage, console });
  vm.runInContext(migrationSource, context);
  return { localStorage, context };
}

const legacyEntries = keyPairs.map(([, legacyKey], index) => [legacyKey, `legacy-${index}`]);
const migrated = runMigration(legacyEntries);
keyPairs.forEach(([currentKey, legacyKey], index) => {
  assert.equal(migrated.localStorage.getItem(currentKey), `legacy-${index}`, `${legacyKey} migrates forward`);
  assert.equal(migrated.localStorage.getItem(legacyKey), `legacy-${index}`, "migration preserves the legacy value");
});

const precedenceEntries = keyPairs.flatMap(([currentKey, legacyKey], index) => [
  [currentKey, `current-${index}`],
  [legacyKey, `legacy-${index}`]
]);
const precedence = runMigration(precedenceEntries);
keyPairs.forEach(([currentKey], index) => {
  assert.equal(precedence.localStorage.getItem(currentKey), `current-${index}`, "current saves take precedence");
});

const [currentCheckpointKey, legacyCheckpointKey] = keyPairs[1];
precedence.context.removeStorageKeysIncludingLegacy(currentCheckpointKey);
assert.equal(precedence.localStorage.getItem(currentCheckpointKey), null, "current key is removed");
assert.equal(precedence.localStorage.getItem(legacyCheckpointKey), null, "legacy key is removed with current key");

console.log("Storage migration regression tests passed.");
