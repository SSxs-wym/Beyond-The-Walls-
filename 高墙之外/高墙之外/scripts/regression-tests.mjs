import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mainPath = path.join(projectRoot, "shawshank_pixel_escape", "js", "main.js");
const main = fs.readFileSync(mainPath, "utf8");
const endingThreePath = path.join(projectRoot, "三结局", "shawshank_no_reunion_interactive_bgm.html");
const endingThree = fs.readFileSync(endingThreePath, "utf8");

function extract(startText, endText) {
  const start = main.indexOf(startText);
  const end = main.indexOf(endText, start);
  assert.notEqual(start, -1, `Missing test seam: ${startText}`);
  assert.notEqual(end, -1, `Missing test seam terminator: ${endText}`);
  return main.slice(start, end);
}

function testCompletionTimerIsolation() {
  const source = extract("const MiniGameHost = {", "\n\nfunction startRadioRepair")
    .replace("const MiniGameHost =", "globalThis.MiniGameHost =");
  let nextTimerId = 1;
  const timers = new Map();
  const completed = [];
  const classList = { add() {}, remove() {}, toggle() {} };
  const context = {
    window: {
      setTimeout(callback) {
        const id = nextTimerId++;
        timers.set(id, callback);
        return id;
      },
      clearTimeout(id) { timers.delete(id); }
    },
    document: { getElementById() { return null; } },
    InputSystem: { resetAllInput() {} },
    GlobalControls: null,
    canvas: null,
    AchievementSystem: { unlock() {} },
    setPipeNavigationMapRouteFromMazeCompletion() {},
    finishRadioRepair() { completed.push("gear"); },
    finishLibrarySortingTask() { completed.push("bookshelf"); },
    finishPipeMazeMap() { completed.push("pipeMaze"); },
    handleFatalError(error) { throw error; }
  };
  vm.runInNewContext(source, context);
  const host = context.MiniGameHost;
  host.overlay = { classList, setAttribute() {} };
  host.shell = { classList };
  host.viewport = { replaceChildren() {} };
  host.type = "gear";
  host.mountToken = 7;
  host.handleComponentEvent({ source: "gear-calibration", type: "GEAR_CALIBRATION_COMPLETE" });
  assert.equal(timers.size, 1, "completion schedules one timer");

  host.close(false);
  assert.equal(timers.size, 0, "closing cancels the pending completion timer");
  host.type = "bookshelf";
  host.mountToken += 1;
  for (const callback of timers.values()) callback();
  assert.deepEqual(completed, [], "an old completion cannot finish or close a new game");

  host.type = "gear";
  host.completionPending = false;
  host.handleComponentEvent({ source: "gear-calibration", type: "GEAR_CALIBRATION_COMPLETE" });
  const staleCallback = [...timers.values()][0];
  host.mountToken += 1;
  staleCallback();
  assert.deepEqual(completed, [], "mount generation check rejects a stale callback");
}

function testAssetRetryBackoff() {
  const source = extract("const ASSET_RETRY_BASE_DELAY_MS", "\n\nfunction loadAssets()")
    .replace("let decodedImageCacheBytes = 0;", "let decodedImageCacheBytes = 0;");
  let now = 10000;
  const context = { Date: { now: () => now }, Math };
  vm.runInNewContext(source, context);
  const record = { loading: true, loaded: false, failed: false, failureCount: 0, retryAt: 0, element: {} };
  context.markAssetLoadFailed(record);
  assert.equal(record.failed, true);
  assert.equal(record.element, null);
  assert.equal(context.prepareAssetRetry(record), false, "retry is throttled during backoff");
  now = record.retryAt;
  assert.equal(context.prepareAssetRetry(record), true, "retry becomes available in the same session");
  assert.equal(record.failed, false);
}

function testUnifiedReleaseVersion() {
  const html = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
  const versionMatch = html.match(/BeyondWallsAssetVersion\s*=\s*"([^"]+)"/);
  assert.ok(versionMatch, "index declares the release asset version");
  const version = versionMatch[1];
  const requiredAssets = [
    "../shared/react-runtime.js",
    "../齿轮校准互动空间/component.js",
    "../整理图书互动空间/component.js",
    "../地下水管迷宫/component.js"
  ];
  for (const asset of requiredAssets) {
    assert.ok(html.includes(`${asset}?v=${version}`), `${asset} uses the unified version`);
  }
  assert.ok(main.includes("BeyondWallsAssetVersion"), "dynamic styles read the unified version");
  assert.ok(main.includes('searchParams.set("v", MINI_GAME_ASSET_VERSION)'), "dynamic styles append the unified version");
}

function testEndingThreeCollectionAisle() {
  const upperShelf = endingThree.match(/\{x:67,y:76,w:130,h:(\d+)\}/);
  const lowerShelf = endingThree.match(/\{x:67,y:(\d+),w:130,h:(\d+)\}/g)?.[1]
    ?.match(/\{x:67,y:(\d+),w:130,h:(\d+)\}/);
  assert.ok(upperShelf && lowerShelf, "ending three exposes the collection shelf collision seam");
  const aisleHeight = Number(lowerShelf[1]) - (76 + Number(upperShelf[1]));
  assert.ok(aisleHeight >= 18, `collection aisle must be at least 18px high, received ${aisleHeight}px`);
}

function testEndingThreeCollectionGuidance() {
  assert.ok(endingThree.includes('actionLabel:controller.red.actionLabel()'), "the action button names the current action");
  assert.ok(endingThree.includes("货架之间的通道"), "collection guidance explains how to reach shelf items");
  assert.ok(endingThree.includes("靠近后按钮会亮起"), "collection guidance explains the proximity feedback");
}

testCompletionTimerIsolation();
testAssetRetryBackoff();
testUnifiedReleaseVersion();
testEndingThreeCollectionAisle();
testEndingThreeCollectionGuidance();
console.log("Regression tests passed.");
