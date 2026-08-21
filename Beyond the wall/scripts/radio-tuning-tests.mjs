import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(projectRoot, "齿轮校准互动空间", "source.js");
const source = fs.readFileSync(sourcePath, "utf8");

function extract(startText, endText) {
  const start = source.indexOf(startText);
  const end = source.indexOf(endText, start);
  assert.notEqual(start, -1, `Missing test seam: ${startText}`);
  assert.notEqual(end, -1, `Missing test seam terminator: ${endText}`);
  return source.slice(start, end);
}

const tuningSource = extract("\tconst TUNING_CONTROLS =", "\n\tfunction distance");
const tuning = vm.runInNewContext(
  `${tuningSource}\n({ TUNING_CONTROLS, TUNING_QUALITY, TUNING_LOCK, calculateTuningQuality, isTuningLockReady });`,
  { Math }
);

function testReducedRotationDistance() {
  const coarseRotation = (.68 - .28) / tuning.TUNING_CONTROLS.coarse.valuePerRadian;
  const fineRotation = .035 / tuning.TUNING_CONTROLS.fine.valuePerRadian;
  assert.ok(coarseRotation <= Math.PI * 1.5, "main tuning reaches the target within three quarters of a turn");
  assert.ok(fineRotation <= Math.PI / 2, "fine tuning reaches the target within a quarter turn");
}

function testForgivingLockWindow() {
  const targetCoarse = .68;
  const targetFine = .035;
  const nearCoarse = targetCoarse + .079;
  const nearFine = targetFine + .029;
  const nearQuality = tuning.calculateTuningQuality(nearCoarse, nearFine, targetCoarse, targetFine);
  assert.equal(nearQuality, tuning.TUNING_LOCK.maximumQuality, "the wider tolerance range reaches maximum signal");
  assert.equal(
    tuning.isTuningLockReady(nearQuality),
    true,
    "maximum signal wins immediately"
  );

  const farCoarse = targetCoarse + .081;
  const farQuality = tuning.calculateTuningQuality(farCoarse, targetFine, targetCoarse, targetFine);
  assert.ok(farQuality < tuning.TUNING_LOCK.maximumQuality, "outside the tolerance platform is below maximum signal");
  assert.equal(
    tuning.isTuningLockReady(farQuality),
    false,
    "below-maximum signal cannot win"
  );
}

function testImmediateMaximumSignalWin() {
  assert.equal(tuning.TUNING_LOCK.coarseTolerance, .08, "main tuning has the wider maximum-signal range");
  assert.equal(tuning.TUNING_LOCK.fineTolerance, .03, "fine tuning has the wider maximum-signal range");
  assert.ok(!source.includes("stableFor"), "tuning no longer accumulates lock time");
  assert.ok(
    source.includes("if (isTuningLockReady(state.targetQuality)) lockSignal();"),
    "targeting maximum signal triggers an immediate win"
  );
}

function testRuntimeVersion() {
  assert.ok(source.includes('version: "2.3.2"'), "radio repair runtime version is 2.3.2");
}

testReducedRotationDistance();
testForgivingLockWindow();
testImmediateMaximumSignalWin();
testRuntimeVersion();
console.log("Radio tuning regression tests passed.");
