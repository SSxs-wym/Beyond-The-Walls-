async (page) => {
  await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => typeof completePipeDropToCrawl === 'function');

  await page.evaluate(() => {
    OpeningNoticeSystem.active = false;
    OpeningNoticeSystem.hide();
    DialogueSystem.active = false;
    InputSystem.resetAllInput();
    GameState.scene = 'pipe';
    initializePipeScene();
    GameState.pipe.smashSuccessCount = PIPE_SMASH_REQUIRED_COUNT;
    GameState.pipe.smashCompleted = true;
    completePipeDropToCrawl();
    GameState.pipe.playerX = PipeLayout.drownLine.x + 12;
    delete AchievementSystem.unlocked.look_back;
    AchievementSystem.unlockedCount = Object.keys(AchievementSystem.unlocked).length;
    AchievementSystem.toast = null;
    AchievementSystem.toastTimer = 0;
  });

  await page.keyboard.down('a');
  await page.waitForTimeout(300);
  await page.keyboard.up('a');
  await page.waitForFunction(() => GameState.scene === 'fail', null, { timeout: 4000 });
  const leftResult = await page.evaluate(() => ({
    scene: GameState.scene,
    recovery: GameState.failRecovery,
    unlocked: AchievementSystem.isUnlocked('look_back'),
    toastVisible: Boolean(AchievementSystem.toast)
  }));

  await page.keyboard.press('Space');
  await page.waitForFunction(() => GameState.scene === 'pipe' && GameState.pipe.smashCompleted);
  const retryResult = await page.evaluate(() => ({
    scene: GameState.scene,
    smashCompleted: GameState.pipe.smashCompleted,
    quest: GameState.currentQuest
  }));

  await page.evaluate(() => {
    completePipeDropToCrawl();
    GameState.pipe.playerX = PipeLayout.imageWidth - GameState.pipe.playerW - 12;
    InputSystem.resetAllInput();
  });
  await page.keyboard.down('d');
  await page.waitForTimeout(300);
  await page.keyboard.up('d');
  await page.waitForFunction(() => GameState.scene === 'pipeNetwork');
  const rightResult = await page.evaluate(() => ({
    scene: GameState.scene,
    quest: GameState.currentQuest,
    checkpoint: GameState.currentCheckpoint
  }));

  if (
    leftResult.scene !== 'fail' ||
    leftResult.recovery !== 'pipeOpened' ||
    !leftResult.unlocked ||
    !leftResult.toastVisible ||
    retryResult.scene !== 'pipe' ||
    !retryResult.smashCompleted ||
    retryResult.quest !== 'quest_pipe_opened' ||
    rightResult.scene !== 'pipeNetwork' ||
    rightResult.quest !== 'quest_pipe_network'
  ) {
    throw new Error(JSON.stringify({ leftResult, retryResult, rightResult }));
  }

  return { leftResult, retryResult, rightResult };
}
