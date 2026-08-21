import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mainPath = path.join(projectRoot, "game", "js", "main.js");
const main = fs.readFileSync(mainPath, "utf8");

function extract(startText, endText) {
  const start = main.indexOf(startText);
  const end = main.indexOf(endText, start);
  assert.notEqual(start, -1, `Missing test seam: ${startText}`);
  assert.notEqual(end, -1, `Missing test seam terminator: ${endText}`);
  return main.slice(start, end);
}

function testNewRunClearsEndingStoryState() {
  const source = extract(
    "function resetGameStateForNewRun()",
    "function resetCheckpointTransientState()"
  );
  const GameState = {
    currentCheckpoint: "CP_ENDING_SELECT",
    playTime: 1234,
    fatalError: new Error("old run"),
    gameBgmStarted: true,
    gameBgmStopped: true,
    whiteLightTimer: 9,
    opening: {
      gateEscapeAvailable: true,
      gateApproachActive: true,
      gateApproachTimer: 4
    },
    surgerySequence: {
      timer: 2.5,
      horrorPlayed: true
    },
    libraryTask: {
      brooksInside: true,
      sortingActive: true,
      sortingProgress: 1,
      bookOrder: [3, 2, 1],
      selectedBookIndex: 2,
      sortMoves: 4,
      sortingStatus: "completed",
      sortingMessage: "old run",
      completionTimer: 3
    },
    guardConversation: {
      selectedSource: "yard",
      activeSource: "yard",
      activeGuardIndex: 2
    },
    redNpc: {
      initialized: true,
      mode: "dialogueApproach",
      x: 999,
      y: 888,
      facing: "left",
      isMoving: true,
      walkAnimTime: 7,
      pathDistance: 100,
      targetDistance: 200,
      pathDirection: -1,
      pauseTimer: 5,
      targetX: 777,
      targetY: 666,
      ambientRestTarget: true,
      pendingDialogue: "poster"
    }
  };
  const context = {
    GameState,
    applyCheckpointProgress() {},
    resetCheckpointTransientState() {},
    getRedNpcConfig() {
      return { x: 620, y: 650, baseFacing: "down" };
    }
  };

  vm.runInNewContext(source, context);
  context.resetGameStateForNewRun();

  assert.equal(GameState.surgerySequence.horrorPlayed, false, "surgery horror audio can play in a new run");
  assert.equal(GameState.surgerySequence.timer, 0, "surgery sequence timer is reset");
  assert.equal(GameState.libraryTask.brooksInside, false, "Brooks returns to the yard in a new run");
  assert.equal(GameState.libraryTask.sortingActive, false, "old library interaction is closed");
  assert.equal(GameState.libraryTask.bookOrder.length, 0, "old library puzzle order is discarded");
  assert.equal(GameState.guardConversation.selectedSource, null, "guard hidden dialogue can be selected again");
  assert.equal(GameState.guardConversation.activeSource, null, "old guard dialogue is inactive");
  assert.equal(GameState.guardConversation.activeGuardIndex, null, "old guard target is cleared");
  assert.equal(GameState.redNpc.initialized, false, "Red must initialize for the new run");
  assert.equal(GameState.redNpc.x, 620, "Red returns to his initial X coordinate");
  assert.equal(GameState.redNpc.y, 650, "Red returns to his initial Y coordinate");
  assert.equal(GameState.redNpc.targetX, 620, "Red's old target X coordinate is cleared");
  assert.equal(GameState.redNpc.targetY, 650, "Red's old target Y coordinate is cleared");
}

testNewRunClearsEndingStoryState();
console.log("New-run reset tests passed.");
