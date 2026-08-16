async (page) => {
  await page.goto('http://127.0.0.1:8765/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => typeof updatePipePostSmash === 'function');

  const results = await page.evaluate(() => {
    const originalMoveVector = InputSystem.getMoveVector;
    const originalActionPressed = InputSystem.actionPressed;
    const checks = {};

    try {
      GameState.scene = 'pipe';
      initializePipeScene();
      GameState.pipe.smashSuccessCount = PIPE_SMASH_REQUIRED_COUNT;
      GameState.pipe.smashCompleted = true;
      GameState.pipe.playerX = PipeLayout.networkEntryZone.x +
        PipeLayout.networkEntryZone.w / 2 - GameState.pipe.playerW / 2;
      updatePipePostSmash(0);
      checks.openedPipeStartsDrop = GameState.scene === 'pipe' &&
        GameState.pipe.phase === 'drop';
      updatePipeDropToCrawl(1);
      checks.dropCompletesIntoCrawl = GameState.scene === 'pipe' &&
        GameState.pipe.phase === 'crawl';

      GameState.scene = 'pipe';
      initializePipeScene();
      completePipeDropToCrawl();
      GameState.pipe.playerX = PipeLayout.drownLine.x + 1;
      InputSystem.getMoveVector = () => ({ x: -1, y: 0 });
      updatePipeCrawl(0.1);
      checks.leftEndStartsDrowning = GameState.scene === 'pipe' &&
        GameState.pipe.phase === 'drown';

      GameState.scene = 'pipe';
      initializePipeScene();
      completePipeDropToCrawl();
      GameState.pipe.playerX = PipeLayout.imageWidth - GameState.pipe.playerW - 1;
      InputSystem.getMoveVector = () => ({ x: 1, y: 0 });
      updatePipeCrawl(0.1);
      checks.rightEndEntersNetwork = GameState.scene === 'pipeNetwork' &&
        GameState.pipe.victoryPhase === 'none';

      GameState.scene = 'pipe';
      initializePipeScene();
      delete AchievementSystem.unlocked.look_back;
      AchievementSystem.unlockedCount = Object.keys(AchievementSystem.unlocked).length;
      AchievementSystem.toast = null;
      AchievementSystem.toastTimer = 0;
      failPipeDrowned();
      checks.drowningUnlocksAchievementForTenSeconds =
        AchievementSystem.isUnlocked('look_back') &&
        AchievementSystem.toast &&
        AchievementSystem.toast.id === 'look_back' &&
        AchievementSystem.toastTimer === 10;
      const duplicateUnlockResult = AchievementSystem.unlock('look_back');
      checks.duplicateAchievementDoesNotRestartToast =
        duplicateUnlockResult === false && AchievementSystem.toastTimer === 10;
      InputSystem.actionPressed = (action) => action === 'interact';
      Scenes.fail.handleInput();
      checks.drownRetryReturnsToOpenedPipe = GameState.scene === 'pipe' &&
        GameState.pipe.smashCompleted &&
        GameState.currentQuest === 'quest_pipe_opened' &&
        GameState.pipe.playerX + GameState.pipe.playerW / 2 <
          PipeLayout.networkEntryZone.x;

      GameState.scene = 'pipe';
      initializePipeScene();
      failPipeNoiseByGuard();
      Scenes.fail.handleInput();
      checks.noiseFailureStillReturnsBeforeTunnel = GameState.scene === 'cell' &&
        GameState.currentQuest === 'quest_cell_final_dig_ready';
    } finally {
      InputSystem.getMoveVector = originalMoveVector;
      InputSystem.actionPressed = originalActionPressed;
    }

    return checks;
  });

  const failures = Object.entries(results)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);
  if (failures.length) {
    throw new Error(`Pipe crawl regression failed: ${failures.join(', ')}`);
  }
  return results;
}
