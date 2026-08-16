async (page) => {
  await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => typeof completePipeDropToCrawl === 'function');

  await page.evaluate(() => {
    GameState.scene = 'pipe';
    initializePipeScene();
    GameState.pipe.smashSuccessCount = PIPE_SMASH_REQUIRED_COUNT;
    GameState.pipe.smashCompleted = true;
    completePipeDropToCrawl();
    GameState.pipe.playerX = 760;
    GameState.pipe.facing = 'right';
    GameState.currentQuest = 'quest_pipe_opened';
  });
  await page.waitForTimeout(250);
  await page.locator('#game').screenshot({
    path: 'D:/高墙之外/output/playwright/pipe-crawl-flow.png'
  });

  await page.evaluate(() => {
    delete AchievementSystem.unlocked.look_back;
    AchievementSystem.unlockedCount = Object.keys(AchievementSystem.unlocked).length;
    AchievementSystem.toast = null;
    AchievementSystem.toastTimer = 0;
    failPipeDrowned();
  });
  await page.waitForTimeout(150);
  await page.locator('#game').screenshot({
    path: 'D:/高墙之外/output/playwright/pipe-drown-achievement.png'
  });

  return {
    scene: await page.evaluate(() => GameState.scene),
    recovery: await page.evaluate(() => GameState.failRecovery),
    toastSeconds: await page.evaluate(() => AchievementSystem.toastTimer)
  };
}
