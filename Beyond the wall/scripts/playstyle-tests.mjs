import assert from "node:assert/strict";

await import("../shared/playstyle.js");

const Playstyle = globalThis.BeyondWallsPlaystyle;
assert.ok(Playstyle, "playstyle module is available");

function createState(options) {
  return Playstyle.createState(options);
}

function calculate(state, snapshot) {
  return Playstyle.calculateResult(state, Object.assign({
    directEvidenceCount: 0,
    observedEvidenceCount: 0,
    landmarkCount: 0,
    alternateRouteCompleted: false,
    standardRoutePlanCompleted: false,
    cleanStageCount: 0
  }, snapshot || {}));
}

function testInsightProfile() {
  const result = calculate(createState(), {
    directEvidenceCount: 5,
    observedEvidenceCount: 3
  });
  assert.equal(result.id, "insight", "complete evidence behavior resolves to Insight");
}

function testActionProfile() {
  const state = createState();
  Playstyle.recordOutsidePlanEscape(state);
  ["soilDump", "pipeOpened", "pipeBeforeTunnel"].forEach((id) => {
    Playstyle.recordFailureRecovery(state, id);
  });
  const result = calculate(state, { alternateRouteCompleted: true });
  assert.equal(result.id, "action", "adaptation and recovery behavior resolves to Action");
}

function testIntuitionProfile() {
  const state = createState();
  for (let index = 0; index < 4; index += 1) Playstyle.recordMapOpen(state, "yard");
  for (let index = 0; index < 2; index += 1) Playstyle.recordMapOpen(state, "pipe");
  Playstyle.recordEvidenceBeforeStoryOffice(state, 6);
  const result = calculate(state, {
    directEvidenceCount: 4,
    observedEvidenceCount: 2,
    landmarkCount: 5,
    standardRoutePlanCompleted: true,
    cleanStageCount: 2
  });
  assert.equal(result.id, "intuition", "map and preparation behavior resolves to Intuition");
}

function testPerceptionProfile() {
  const state = createState();
  ["wallVoice", "doorMemory", "bookshelfSecret", "officeSecret"].forEach((id) => {
    Playstyle.recordDiscovery(state, id);
  });
  const result = calculate(state, { cleanStageCount: 4 });
  assert.equal(result.id, "perception", "clean execution and discoveries resolve to Perception");
}

function testCapsAndUniqueEvents() {
  const state = createState();
  for (let index = 0; index < 20; index += 1) {
    Playstyle.recordMapOpen(state, "yard");
    Playstyle.recordMapOpen(state, "pipe");
    Playstyle.recordFailureRecovery(state, "soilDump");
  }
  assert.deepEqual(state.recoveredFailureIds, ["soilDump"], "a recovered failure is counted once");
  const result = calculate(state, { landmarkCount: 99 });
  Object.values(result.scores).forEach((score) => {
    assert.ok(score >= 0 && score <= 100, "all normalized scores stay within 0-100");
  });
}

function testTiePriority() {
  const state = createState();
  for (let index = 0; index < 4; index += 1) Playstyle.recordMapOpen(state, "yard");
  for (let index = 0; index < 2; index += 1) Playstyle.recordMapOpen(state, "pipe");
  Playstyle.recordEvidenceBeforeStoryOffice(state, 8);
  ["menuSecret", "wallVoice", "doorMemory", "bookshelfSecret"].forEach((id) => {
    Playstyle.recordDiscovery(state, id);
  });
  const result = calculate(state, {
    directEvidenceCount: 5,
    observedEvidenceCount: 3,
    landmarkCount: 5,
    standardRoutePlanCompleted: true,
    cleanStageCount: 4
  });
  assert.equal(result.scores.insight, 100);
  assert.equal(result.scores.intuition, 100);
  assert.equal(result.scores.perception, 100);
  assert.equal(result.id, "intuition", "an exact top-score tie resolves to Intuition");
}

function testLegacyAndLockedResults() {
  const legacyState = createState({ legacyFallback: true });
  const legacyResult = Playstyle.lockResult(legacyState, {});
  assert.equal(legacyResult.id, "intuition", "legacy saves resolve to Intuition");
  assert.equal(legacyResult.legacy, true);

  const state = createState();
  const first = Playstyle.lockResult(state, {
    directEvidenceCount: 5,
    observedEvidenceCount: 3
  });
  Playstyle.recordOutsidePlanEscape(state);
  const second = Playstyle.lockResult(state, {
    alternateRouteCompleted: true,
    cleanStageCount: 0
  });
  assert.deepEqual(second, first, "a locked result remains unchanged on replay");

  const restored = Playstyle.restoreState(Playstyle.captureState(state));
  assert.deepEqual(restored.lockedResult, first, "a locked result survives save restoration");
}

testInsightProfile();
testActionProfile();
testIntuitionProfile();
testPerceptionProfile();
testCapsAndUniqueEvents();
testTiePriority();
testLegacyAndLockedResults();
console.log("Playstyle scoring regression tests passed.");
