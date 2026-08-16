/*
 * Root-entry developer API. The developer UI and game now share one document,
 * so named debug operations are exposed through a direct in-page API.
 */
(function () {
  "use strict";

  const CHECKPOINTS = [
    "CP_START",
    "CP_AFTER_WHITE_LIGHT",
    "CP_CELL_WAKE",
    "CP_HAMMER_OBTAINED",
    "CP_BIBLE_OBTAINED",
    "CP_HAMMER_HIDDEN",
    "CP_HAMMER_CONFISCATED",
    "CP_SIDE_ROUTE_RETURN_CELL",
    "CP_POSTER_OBTAINED",
    "CP_INSPECTION_PASSED",
    "CP_FIRST_DIG",
    "CP_SOIL_DISPOSE",
    "CP_POST_MONTAGE_RED",
    "CP_MAP_OBTAINED",
    "CP_OFFICE_DIALOGUE_DONE",
    "CP_FINAL_DIG",
    "CP_PIPE_GAME",
    "CP_PIPE_NETWORK",
    "CP_ENDING_SELECT"
  ];

  function clearInput() {
    try {
      InputSystem.resetAllInput();
    } catch (error) {}
  }

  function clearDialogue() {
    try {
      DialogueSystem.active = false;
      DialogueSystem.lines = [];
      DialogueSystem.index = 0;
      DialogueSystem.justStarted = false;
      DialogueSystem.revealTimer = 0;
      DialogueSystem.displayMode = "auto";
    } catch (error) {}
    try { OverheadThoughtSystem.reset(); } catch (error) {}
  }

  function restartLoop() {
    try {
      if (typeof loopStopped !== "undefined" && loopStopped) {
        loopStopped = false;
        lastTimestamp = performance.now();
        requestAnimationFrame(safeGameLoop);
      }
    } catch (error) {}
  }

  function resetTransientState() {
    restartLoop();
    clearInput();
    clearDialogue();
    try { NarrativeCueSystem.reset(); } catch (error) {}
    try { TutorialSystem.resetActive(); } catch (error) {}
    try { MiniGameHost.close(); } catch (error) {}
    GameState.fatalError = null;
    GameState.failReason = "";
    GameState.failRecovery = null;
    GameState.failRecoveryTimer = 0;
    GameState.whiteLightTimer = 0;
    GameState.opening.phase = "idle";
    GameState.opening.timer = 0;
    GameState.opening.tvFrameIndex = 0;
    GameState.opening.gateEscapeAvailable = false;
    GameState.opening.gateApproachActive = false;
    GameState.opening.gateApproachTimer = 0;
    GameState.surgerySequence.timer = 0;
    GameState.twentyYearsMontage.phase = "idle";
    GameState.twentyYearsMontage.timer = 0;
    GameState.twentyYearsMontage.pageIndex = 0;
    GameState.redDialogueActive = false;
    GameState.redPosterDialogueActive = false;
    GameState.redHammerDeliveryDialogueActive = false;
    GameState.redPosterDeliveryDialogueActive = false;
    GameState.brooksDialogueActive = false;
    GameState.brooksDialogueKind = null;
    GameState.postMontageRedDialogueActive = false;
    if (GameState.sideRoute) {
      GameState.sideRoute.active = false;
      GameState.sideRoute.stage = "none";
    }
    if (GameState.sideTalk) {
      GameState.sideTalk.refreshRequired = false;
      GameState.sideTalk.available = false;
      GameState.sideTalk.activeNpcId = null;
      GameState.sideTalk.queuedNpcId = null;
      GameState.sideTalk.afterAction = null;
    }
    if (GameState.guardConversation) {
      GameState.guardConversation.selectedSource = null;
      GameState.guardConversation.activeSource = null;
      GameState.guardConversation.activeGuardIndex = null;
    }
    if (GameState.evidenceViewer) {
      GameState.evidenceViewer.activeEvidenceId = null;
    }
    try { resetAmbientConversationTransientState(); } catch (error) {}
    if (GameState.yardNavigationMap) {
      GameState.yardNavigationMap.expanded = false;
    }
    GameState.posterChoiceActive = false;
    GameState.posterPickupAnimation.active = false;
    GameState.posterPickupAnimation.posterId = null;
    GameState.posterPickupAnimation.elapsed = 0;
    GameState.radioRepairActive = false;
    GameState.radioRepairProgress = 0;
    GameState.radioGear = {
      track: "outer",
      angle: -Math.PI / 2,
      targets: [],
      collectedIds: [],
      status: "idle",
      completionTimer: 0
    };
    GameState.player.lyingInBed = false;
    GameState.player.vx = 0;
    GameState.player.vy = 0;
    GameState.player.isMoving = false;
    GameState.player.walkAnimTime = 0;
    GameState.wallHole.revealed = false;
    GameState.wallHole.introPending = false;
    GameState.wallHole.exitPending = false;
    GameState.wallHole.timer = 0;
    GameState.dig.isDigging = false;
    GameState.dig.digAnimTime = 0;
    GameState.dig.pipeEntryTimer = 0;
    GameState.pipe.isSmashing = false;
    GameState.pipe.smashAnimTime = 0;
    GameState.soilDump.progress = 0;
    GameState.soilDump.active = false;
    GameState.soilDump.animTime = 0;
    GameState.soilDump.guardAlerted = false;
    GameState.libraryTask.brooksInside = false;
    GameState.libraryTask.sortingActive = false;
    GameState.libraryTask.sortingProgress = 0;
    GameState.libraryTask.bookOrder = [];
    GameState.libraryTask.selectedBookIndex = null;
    GameState.libraryTask.sortMoves = 0;
    GameState.libraryTask.sortingStatus = "idle";
    GameState.libraryTask.sortingMessage = "";
    GameState.libraryTask.completionTimer = 0;
    try { resetHammerHidePuzzleState(); } catch (error) {}
    try { resetCellInspectionState(); } catch (error) {}
    try { resetOfficeSceneState(); } catch (error) {}
    try { resetYardGuardsForSoilRetry(); } catch (error) {}
    try { resetPipeSmashState(); } catch (error) {}
    try { resetSideRouteContinuationState(); } catch (error) {}
    try { resetCorridorTransientState(); } catch (error) {}
    try { resetRoamingNpcSystem(); } catch (error) {}
    GameState.yardPrisoners = [];
    if (GameState.redNpc) {
      GameState.redNpc.initialized = false;
      GameState.redNpc.mode = "patrol";
      GameState.redNpc.pendingDialogue = null;
      GameState.redNpc.isMoving = false;
      GameState.redNpc.walkAnimTime = 0;
    }
    if (GameState.brooksNpc) {
      GameState.brooksNpc.initialized = false;
      GameState.brooksNpc.mode = "patrol";
      GameState.brooksNpc.pendingDialogue = null;
      GameState.brooksNpc.isMoving = false;
      GameState.brooksNpc.walkAnimTime = 0;
      GameState.brooksNpc.entryPauseTimer = 0;
    }
  }

  function setProgress(flags) {
    const defaults = {
      hasHammer: false,
      hasBible: false,
      hasLedger: false,
      hasBrooksEvidence: false,
      hasFinancialEvidence: false,
      hasTommyEvidence: false,
      hasHaywoodEvidence: false,
      hasFloydEvidence: false,
      observedConversationEvidenceIds: [],
      hasSoilPile: false,
      bibleUsed: false,
      hammerHiddenInBible: false,
      ledgerFound: false,
      ledgerSwapped: false,
      finalDigUnlocked: false,
      inspectionPassed: false,
      hasAttributeC: false,
      hasAttributeD: false,
      wallDigPromptShown: false,
      hammerConfiscated: false,
      alternateEscapeRoute: false,
      posterType: null,
      posterHung: false,
      posterChoiceActive: false,
      twentyYearsPassed: false,
      postMontageRedSpoken: false,
      pipeMazeActive: false,
      mapRevealActive: false,
      mapDrawn: false,
      hasMap: false,
      wakeTutorialCompleted: true,
      mapTutorialCompleted: true,
      officeFirstWarningSeen: false,
      redHammerDelivered: false,
      redPosterDialogueActive: false,
      brooksBibleDelivered: false
    };
    resetTransientState();
    Object.keys(defaults).forEach(function (key) {
      GameState[key] = Object.prototype.hasOwnProperty.call(flags, key) ? flags[key] : defaults[key];
    });
    if (!Object.prototype.hasOwnProperty.call(flags, "hammerHiddenInBible") &&
      GameState.hasHammer &&
      GameState.hasBible &&
      GameState.inspectionPassed
    ) {
      GameState.hammerHiddenInBible = true;
    }
    if (typeof clearStoredPipeNavigationMapProgress === "function") {
      clearStoredPipeNavigationMapProgress();
    }
    if (Object.prototype.hasOwnProperty.call(flags, "pipeMap")) {
      if (typeof restorePipeNavigationMapProgress === "function") {
        restorePipeNavigationMapProgress(flags.pipeMap);
      }
    } else if (typeof resetPipeNavigationMapProgress === "function") {
      resetPipeNavigationMapProgress();
    }
    GameState.dig.digProgress = 0;
    GameState.soilDump.completedCount = 0;
    GameState.currentQuest = "quest_start";
  }

  function setCheckpoint(key) {
    if (CHECKPOINTS.indexOf(key) === -1) {
      throw new Error("Unknown checkpoint: " + key);
    }
    GameState.currentCheckpoint = key;
    if (typeof setRoamingGuardCheckpoint === "function") {
      setRoamingGuardCheckpoint(key, { force: true, immediate: true, reason: "developer" });
    }
    try { localStorage.setItem("shawshank_pixel_escape_checkpoint", key); } catch (error) {}
  }

  function enterScene(sceneName) {
    if (!Scenes[sceneName]) {
      throw new Error("Unknown scene: " + sceneName);
    }
    clearInput();
    clearDialogue();
    if (GameState.scene !== sceneName) {
      changeScene(sceneName);
      return;
    }
    if (Scenes[sceneName].enter) {
      Scenes[sceneName].enter();
    }
  }

  function enterOpeningYard() {
    GameState.opening.gateEscapeAvailable = true;
    GameState.scene = "whiteLight";
    enterScene("yard");
  }

  function sharedLateProgress() {
    return {
      hasHammer: true,
      hasLedger: true,
      bibleUsed: true,
      ledgerFound: true,
      ledgerSwapped: true,
      finalDigUnlocked: true,
      redHammerDelivered: true,
      brooksBibleDelivered: true,
      inspectionPassed: true,
      hasAttributeC: true,
      twentyYearsPassed: true,
      postMontageRedSpoken: true,
      mapDrawn: true,
      hasMap: true,
      pipeMap: typeof createDefaultPipeNavigationMapProgress === "function" ?
        createDefaultPipeNavigationMapProgress() : null
    };
  }

  const storyNodes = [
    {
      id: "menu",
      group: "开场",
      title: "开始界面",
      note: "全新状态，停在开始菜单。",
      run: function () { setProgress({ wakeTutorialCompleted: false, mapTutorialCompleted: false }); setCheckpoint("CP_START"); enterScene("menu"); }
    },
    {
      id: "living-room",
      group: "开场",
      title: "客厅观影",
      note: "电视循环阶段，点击画面或按空格键推进。",
      run: function () { setProgress({ wakeTutorialCompleted: false, mapTutorialCompleted: false }); setCheckpoint("CP_START"); enterScene("livingRoom"); GameState.opening.phase = "tvLoop"; GameState.opening.timer = 0; GameState.currentQuest = "quest_living_room_tv"; }
    },
    {
      id: "recap",
      group: "开场",
      title: "剧情回顾分镜",
      note: "漫画与字幕推进点。",
      run: function () { setProgress({ wakeTutorialCompleted: false, mapTutorialCompleted: false }); enterScene("recap"); GameState.opening.phase = "storyImage"; GameState.opening.timer = 0; GameState.currentQuest = "quest_recap"; }
    },
    {
      id: "white-light",
      group: "开场",
      title: "白光转场",
      note: "进入拘禁地世界前的过场。",
      run: function () { setProgress({ wakeTutorialCompleted: false, mapTutorialCompleted: false }); setCheckpoint("CP_AFTER_WHITE_LIGHT"); enterScene("whiteLight"); GameState.opening.phase = "inhale01"; GameState.opening.timer = 0; }
    },
    {
      id: "yard-awake",
      group: "前期",
      title: "庄园锁门前醒来",
      note: "无道具的首次到达院子状态；三段可移动、可跳过的头顶心理独白后进入移动与交互教学。",
      run: function () { setProgress({ wakeTutorialCompleted: false, mapTutorialCompleted: false }); setCheckpoint("CP_AFTER_WHITE_LIGHT"); enterOpeningYard(); }
    },
    {
      id: "cell-first-wake",
      group: "前期",
      title: "第一次床上醒来",
      note: "保存首次床上醒来的流程节点；两句心理描写显示在横躺安迪的头部上方。",
      run: function () { setProgress({ wakeTutorialCompleted: false, mapTutorialCompleted: false }); setCheckpoint("CP_CELL_WAKE"); GameState.scene = "operatingRoomBlackout"; enterScene("cell"); }
    },
    {
      id: "yard-map-tutorial",
      group: "前期",
      title: "首次地图教学",
      note: "从房间离开后先显示安迪的疑问；玩家移动后完成地图教学，再显示寻找瑞德的心理提示。",
      run: function () {
        setProgress({ wakeTutorialCompleted: true, mapTutorialCompleted: false });
        setCheckpoint("CP_CELL_WAKE");
        resetYardNavigationMapProgress({ preserveProgress: false });
        GameState.scene = "cell";
        enterScene("yard");
      }
    },
    {
      id: "corridor-from-cell",
      group: "牢房走廊",
      title: "从牢房进入走廊",
      note: "验证右下房门、底部院门和纵向镜头。",
      run: function () {
        setProgress({});
        setCheckpoint("CP_CELL_WAKE");
        GameState.scene = "cell";
        enterCellCorridor("cell", "free");
      }
    },
    {
      id: "corridor-locked-solitary",
      group: "牢房走廊",
      title: "普通状态试开小黑屋",
      note: "玩家位于右上门前，交互后只显示锁门反馈。",
      run: function () {
        setProgress({});
        setCheckpoint("CP_CELL_WAKE");
        GameState.scene = "yard";
        enterCellCorridor("yard", "free");
        setPlayerFootToCorridorImage(610, 382);
        GameState.player.facing = "right";
        updateCorridorCamera();
      }
    },
    {
      id: "corridor-escort-yard",
      group: "牢房走廊",
      title: "牢房到院子短程押送",
      note: "两名狱警夹行，从右下房门自动走到底部院门。",
      run: function () {
        setProgress({ hammerConfiscated: true });
        setCheckpoint("CP_HAMMER_CONFISCATED");
        GameState.sideRoute.active = true;
        GameState.sideRoute.stage = "corridorEscortToYard";
        GameState.scene = "cell";
        enterCellCorridor("cell", "escortToYard");
      }
    },
    {
      id: "corridor-escort-solitary",
      group: "牢房走廊",
      title: "院子到小黑屋长程押送",
      note: "从底部院门进入，自动穿过整条走廊并进入右上小黑屋。",
      run: function () {
        setProgress({ hammerConfiscated: true });
        setCheckpoint("CP_HAMMER_CONFISCATED");
        GameState.sideRoute.active = true;
        GameState.sideRoute.stage = "corridorEscortToSolitary";
        GameState.scene = "yard";
        enterCellCorridor("yard", "escortToSolitary");
      }
    },
    {
      id: "corridor-after-solitary",
      group: "牢房走廊",
      title: "小黑屋睡醒后自行离开",
      note: "右上门在身后落锁，头顶提示玩家自行走到底部院门去找老布。",
      run: function () {
        setProgress({ hasBible: false, hammerConfiscated: true });
        setCheckpoint("CP_HAMMER_CONFISCATED");
        GameState.sideRoute.active = true;
        GameState.sideRoute.stage = "corridorAfterSolitary";
        GameState.sideRoute.solitaryStoneRead = true;
        GameState.sideRoute.solitarySlept = true;
        GameState.scene = "solitary";
        enterCellCorridor("solitary", "postSolitary");
      }
    },
    {
      id: "yard-red",
      group: "前期",
      title: "首次找瑞德",
      note: "在劳作区找瑞德拿锤子。",
      run: function () { setProgress({}); setCheckpoint("CP_AFTER_WHITE_LIGHT"); enterScene("yard"); setPlayerFootToYardImage(620, 650); updateYardCamera(); GameState.currentQuest = "quest_yard_red"; }
    },
    {
      id: "hammer-obtained",
      group: "前期",
      title: "已获得锤子",
      note: "下一步到图书馆门口找老布。",
      run: function () { setProgress({ hasHammer: true, redHammerDelivered: true }); setCheckpoint("CP_HAMMER_OBTAINED"); enterScene("yard"); setPlayerFootToYardImage(165, 1132); updateYardCamera(); GameState.currentQuest = "quest_yard_library"; }
    },
    {
      id: "bible-obtained",
      group: "前期",
      title: "已获得圣经",
      note: "回房间桌边，把石锤藏进圣经。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, redHammerDelivered: true, brooksBibleDelivered: true }); setCheckpoint("CP_BIBLE_OBTAINED"); enterScene("cell"); setPlayerFootToCellImage(452, 700); GameState.currentQuest = "quest_cell_hide_hammer"; }
    },
    {
      id: "hammer-hidden",
      group: "前期",
      title: "已把石锤藏进圣经",
      note: "下一步到床边站好，等待典狱长检查房间。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, hammerHiddenInBible: true, wallDigPromptShown: true, redHammerDelivered: true, brooksBibleDelivered: true }); setCheckpoint("CP_HAMMER_HIDDEN"); enterScene("cell"); setPlayerFootToCellImage(620, 544); GameState.currentQuest = "quest_cell_wait_inspection"; }
    },
    {
      id: "inspection-fail",
      group: "失败分支",
      title: "检查房间失败",
      note: "直接进入检查房间失败情形。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, hammerHiddenInBible: true, wallDigPromptShown: true, redHammerDelivered: true, brooksBibleDelivered: true }); setCheckpoint("CP_HAMMER_HIDDEN"); enterScene("cell"); setPlayerFootToCellImage(620, 520); startCellInspection(); GameState.cellInspection.result = "fail"; }
    },
    {
      id: "hammer-only-inspection",
      group: "失败分支",
      title: "只拿石锤接受检查",
      note: "未取得圣经，验证没收石锤后的等速、避障押送。",
      run: function () { setProgress({ hasHammer: true, redHammerDelivered: true }); setCheckpoint("CP_HAMMER_OBTAINED"); enterScene("cell"); setPlayerFootToCellImage(620, 520); startCellInspection(); }
    },
    {
      id: "side-route-gate-caught",
      group: "失败分支",
      title: "大门脱困被抓",
      note: "显示失败提示，并在三秒后自动返回上一个安全节点。",
      run: function () {
        setProgress({ hasBible: true, brooksBibleDelivered: true, hammerConfiscated: true, alternateEscapeRoute: true });
        setCheckpoint("CP_SIDE_ROUTE_RETURN_CELL");
        GameState.sideRoute.active = true;
        GameState.sideRoute.stage = "morningGateCaught";
        GameState.failReason = "你刚靠近大门，几名狱警便冲过来把你围住。此路不通，先去左侧办公室寻找其他机会。";
        GameState.failRecovery = "sideRouteMorning";
        enterScene("fail");
      }
    },
    {
      id: "side-route-yard-crowd",
      group: "失败分支",
      title: "院子中心围观演出",
      note: "安迪已被押到中心，周围人物按正常步速松散围拢并交谈。",
      run: function () {
        setProgress({ hammerConfiscated: true });
        setCheckpoint("CP_HAMMER_CONFISCATED");
        GameState.sideRoute.active = true;
        GameState.sideRoute.stage = "yardEscortToCenter";
        enterScene("yard");
        setPlayerFootToYardImage(SideRouteYardLayout.playerFoot.x, SideRouteYardLayout.playerFoot.y);
        startSideRouteYardCrowdSequence();
        updateYardCamera();
      }
    },
    {
      id: "poster-choice",
      group: "中期",
      title: "海报选择前",
      note: "检查房间已通过，可找瑞德要海报。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, inspectionPassed: true, hasAttributeC: true, wallDigPromptShown: true, redHammerDelivered: true, brooksBibleDelivered: true }); setCheckpoint("CP_INSPECTION_PASSED"); enterScene("yard"); setPlayerFootToYardImage(620, 650); updateYardCamera(); GameState.currentQuest = "quest_cell_return_red_for_poster"; }
    },
    {
      id: "red-main-side-priority",
      group: "中期",
      title: "瑞德主支线对话排序",
      note: "二十年后的主线对话应先于瑞德的证据支线，并在之后自动衔接。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, inspectionPassed: true, hasAttributeC: true, wallDigPromptShown: true, posterType: "rita", posterHung: true, twentyYearsPassed: true, postMontageRedSpoken: false, redHammerDelivered: true, brooksBibleDelivered: true }); GameState.sideTalk.available = true; enterScene("yard"); setPlayerFootToYardImage(620, 650); initializeRedNpcState(); GameState.redNpc.x = 620; GameState.redNpc.y = 650; GameState.redNpc.targetX = 620; GameState.redNpc.targetY = 650; GameState.redNpc.pauseTimer = 999; updateYardCamera(); GameState.currentQuest = "quest_yard_find_red_after_montage"; }
    },
    {
      id: "brooks-main-side-priority",
      group: "中期",
      title: "老布主支线对话排序",
      note: "取得圣经前先播放邀请主线，再自动衔接老布的证据支线。",
      run: function () { setProgress({ hasHammer: true, redHammerDelivered: true }); GameState.sideTalk.available = true; enterScene("yard"); setPlayerFootToYardImage(165, 1132); initializeBrooksNpcState(); GameState.brooksNpc.x = 165; GameState.brooksNpc.y = 1132; GameState.brooksNpc.targetX = 165; GameState.brooksNpc.targetY = 1132; GameState.brooksNpc.waitTimer = 999; updateYardCamera(); GameState.currentQuest = "quest_yard_library"; }
    },
    {
      id: "poster-hang",
      group: "中期",
      title: "海报张贴前",
      note: "已取得海报，站在床头墙边；贴上海报后显示头顶行动提示。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, inspectionPassed: true, hasAttributeC: true, wallDigPromptShown: true, posterType: "rita", redHammerDelivered: true, brooksBibleDelivered: true }); setCheckpoint("CP_POSTER_OBTAINED"); enterScene("cell"); setPlayerFootToCellImage(CellLayout.pictureStandPoint.x, CellLayout.pictureStandPoint.y); GameState.currentQuest = "quest_cell_hang_poster"; }
    },
    {
      id: "first-dig",
      group: "中期",
      title: "第一次开凿通道",
      note: "海报已贴好，站在开凿通道区域。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, inspectionPassed: true, hasAttributeC: true, wallDigPromptShown: true, posterType: "rita", posterHung: true, redHammerDelivered: true, brooksBibleDelivered: true }); setCheckpoint("CP_POSTER_OBTAINED"); enterScene("dig"); GameState.dig.playerX = DigLayout.digZone.x + DigLayout.digZone.w / 2 - GameState.dig.playerW / 2; GameState.dig.playerY = DigLayout.walkRect.y + 2; GameState.dig.facing = "right"; GameState.currentQuest = "quest_dig_first"; }
    },
    {
      id: "soil-pile",
      group: "中期",
      title: "已挖出小土堆",
      note: "从土洞左侧出口回房间。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, hasSoilPile: true, redHammerDelivered: true, brooksBibleDelivered: true, inspectionPassed: true, hasAttributeC: true }); setCheckpoint("CP_FIRST_DIG"); enterScene("dig"); GameState.dig.digProgress = DIG_REQUIRED_SECONDS; placeDigPlayerAtSoilPileMoment(); }
    },
    {
      id: "soil-dump",
      group: "中期",
      title: "劳作区撒土",
      note: "持有土，站在撒土区。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, hasSoilPile: true, redHammerDelivered: true, brooksBibleDelivered: true, inspectionPassed: true, hasAttributeC: true }); setCheckpoint("CP_FIRST_DIG"); enterScene("yard"); setPlayerFootToYardImage(760, 610); updateYardCamera(); GameState.currentQuest = "quest_yard_soil"; }
    },
    {
      id: "soil-npc-block",
      group: "中期",
      title: "倒土区屏蔽人物对话",
      note: "瑞德与安迪同处泥地区域时，交互仍只执行倒土。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, hasSoilPile: true, redHammerDelivered: true, brooksBibleDelivered: true, inspectionPassed: true, hasAttributeC: true }); GameState.sideTalk.available = true; enterScene("yard"); setPlayerFootToYardImage(760, 610); initializeRedNpcState(); GameState.redNpc.x = 760; GameState.redNpc.y = 610; GameState.redNpc.targetX = 760; GameState.redNpc.targetY = 610; GameState.redNpc.pauseTimer = 999; updateYardCamera(); GameState.currentQuest = "quest_yard_soil"; }
    },
    {
      id: "soil-fail",
      group: "失败分支",
      title: "撒土失败",
      note: "直接进入被狱警发现后的失败状态。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, hasSoilPile: true, redHammerDelivered: true, brooksBibleDelivered: true, inspectionPassed: true, hasAttributeC: true }); setCheckpoint("CP_FIRST_DIG"); enterScene("yard"); setPlayerFootToYardImage(760, 610); updateYardCamera(); failSoilDumpByGuard(); }
    },
    {
      id: "soil-done",
      group: "中期",
      title: "撒土完成",
      note: "回房间后显示头顶休息提示，再睡觉触发多年蒙太奇。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, redHammerDelivered: true, brooksBibleDelivered: true, inspectionPassed: true, hasAttributeD: true }); GameState.soilDump.completedCount = SOIL_DUMP_REQUIRED_COUNT; setCheckpoint("CP_SOIL_DISPOSE"); enterScene("cell"); setPlayerFootToCellImage(CellLayout.bed.x + CellLayout.bed.w / 2, CellLayout.bed.y + CellLayout.bed.h - 18); GameState.currentQuest = "quest_cell_sleep_after_soil"; }
    },
    {
      id: "montage",
      group: "中期",
      title: "二十年蒙太奇",
      note: "直接播放长期计划段落。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, redHammerDelivered: true, brooksBibleDelivered: true, inspectionPassed: true, hasAttributeD: true }); enterScene("montage"); }
    },
    {
      id: "post-montage-red",
      group: "后期",
      title: "二十年后找瑞德",
      note: "房间醒来时的找瑞德提示改为头顶心理描写；此节点直接站到劳作区瑞德阶段，便于回归后续对话。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, redHammerDelivered: true, brooksBibleDelivered: true, inspectionPassed: true, twentyYearsPassed: true }); setCheckpoint("CP_SOIL_DISPOSE"); enterScene("yard"); setPlayerFootToYardImage(620, 650); updateYardCamera(); GameState.currentQuest = "quest_yard_find_red_after_montage"; }
    },
    {
      id: "draw-map",
      group: "后期",
      title: "画地图",
      note: "已与瑞德交谈，回房间桌前。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, redHammerDelivered: true, brooksBibleDelivered: true, inspectionPassed: true, twentyYearsPassed: true, postMontageRedSpoken: true }); enterScene("cell"); setPlayerFootToCellImage(620, 878); GameState.currentQuest = "quest_cell_draw_map"; }
    },
    {
      id: "map-obtained",
      group: "后期",
      title: "已取得地图",
      note: "收起地图后的办公室提示改为头顶心理描写；此节点保留已取得地图状态，可直接回归办公室入口。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, redHammerDelivered: true, brooksBibleDelivered: true, inspectionPassed: true, twentyYearsPassed: true, postMontageRedSpoken: true, mapDrawn: true, hasMap: true }); enterScene("yard"); setPlayerFootToYardImage(165, 545); updateYardCamera(); GameState.currentQuest = "quest_cell_map_obtained"; }
    },
    {
      id: "office-first-warning",
      group: "办公室随机查房",
      title: "首次擅闯警告",
      note: "未取得地图并首次进入办公室；典狱长警告后会把安迪赶回门外。",
      run: function () { setProgress({ officeFirstWarningSeen: false }); setCheckpoint("CP_AFTER_WHITE_LIGHT"); enterScene("office"); }
    },
    {
      id: "office-free-empty",
      group: "办公室随机查房",
      title: "空办公室安全探索",
      note: "跳过首次警告且本次不安排查房，可测试自由移动和从下方房门离开。",
      run: function () { setProgress({ officeFirstWarningSeen: true }); setCheckpoint("CP_AFTER_WHITE_LIGHT"); enterScene("office"); GameState.office.inspectionScheduled = false; GameState.office.inspectionTimer = 0; }
    },
    {
      id: "office-inspection-guard",
      group: "办公室随机查房",
      title: "躲避狱警查房",
      note: "安迪已藏到窗帘后，狱警正从门口进入并巡视。",
      run: function () { setProgress({ officeFirstWarningSeen: true }); setCheckpoint("CP_AFTER_WHITE_LIGHT"); enterScene("office"); startFreeOfficeInspectionCountdown(); hideInFreeOfficeCurtain(); GameState.office.inspectionVisitorKind = "guard"; }
    },
    {
      id: "office-inspection-warden",
      group: "办公室随机查房",
      title: "躲避典狱长查房",
      note: "安迪已藏到窗帘后，典狱长正从门口进入并巡视。",
      run: function () { setProgress({ officeFirstWarningSeen: true }); setCheckpoint("CP_AFTER_WHITE_LIGHT"); enterScene("office"); startFreeOfficeInspectionCountdown(); hideInFreeOfficeCurtain(); GameState.office.inspectionVisitorKind = "warden"; }
    },
    {
      id: "office-inspection-timeout",
      group: "办公室随机查房",
      title: "查房躲藏超时",
      note: "显示脚步倒计时，并在一秒内进入被抓失败页。",
      run: function () { setProgress({ officeFirstWarningSeen: true }); setCheckpoint("CP_AFTER_WHITE_LIGHT"); enterScene("office"); startFreeOfficeInspectionCountdown(); GameState.office.inspectionHideTimer = 1; }
    },
    {
      id: "side-route-office-final-search",
      group: "办公室节点回归",
      title: "备用分支办公室最终翻找",
      note: "站在书桌前完成备用分支最后一次翻找，用于验证返回主流程时不会残留错误节点。",
      run: function () {
        setProgress({ hasBible: true, brooksBibleDelivered: true, hammerConfiscated: true });
        setCheckpoint("CP_SIDE_ROUTE_RETURN_CELL");
        GameState.sideRoute.active = true;
        GameState.sideRoute.stage = "officeSearch";
        enterScene("office");
        GameState.sideRoute.officePhase = "searchAgain";
        GameState.sideRoute.officeEvidenceFound = true;
        setPlayerFootToOfficeImage(820, 748);
        GameState.currentQuest = "quest_side_route_office_search_again";
      }
    },
    {
      id: "office-reenter-current-progress",
      group: "办公室节点回归",
      title: "按当前进度再次进入办公室",
      note: "不重置任何剧情字段，直接按当前进度重新进入办公室，检查是否误触首次警告。",
      run: function () { enterScene("office"); }
    },
    {
      id: "physical-evidence-inventory",
      group: "后期",
      title: "物证栏检查",
      note: "显示老布与弗洛伊德交付的两件物证，可点击物证卡查看原件。",
      run: function () {
        setProgress({
          hasBrooksEvidence: true,
          hasFloydEvidence: true,
          twentyYearsPassed: true,
          postMontageRedSpoken: true
        });
        enterScene("yard");
        setPlayerFootToYardImage(620, 650);
        updateYardCamera();
        GameState.currentQuest = "quest_yard_free_time";
      }
    },
    {
      id: "office-warden",
      group: "后期",
      title: "办公室对话前",
      note: "站在典狱长身旁；对话结束且典狱长离开后，调包提示显示在安迪头顶。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, redHammerDelivered: true, brooksBibleDelivered: true, inspectionPassed: true, twentyYearsPassed: true, postMontageRedSpoken: true, mapDrawn: true, hasMap: true }); enterScene("office"); setPlayerFootToOfficeImage(760, 626); GameState.currentQuest = "quest_office_warden"; }
    },
    {
      id: "office-embroidery",
      group: "后期",
      title: "典狱长已离开",
      note: "检查刺绣，寻找账本。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, redHammerDelivered: true, brooksBibleDelivered: true, inspectionPassed: true, twentyYearsPassed: true, postMontageRedSpoken: true, mapDrawn: true, hasMap: true }); setCheckpoint("CP_OFFICE_DIALOGUE_DONE"); enterScene("office"); GameState.office.wardenPhase = "gone"; GameState.office.wardenX = OfficeLayout.wardenExit.x; GameState.office.wardenY = OfficeLayout.wardenExit.y; setPlayerFootToOfficeImage(166, 520); GameState.currentQuest = "quest_office_embroidery"; }
    },
    {
      id: "office-safe",
      group: "后期",
      title: "保险柜账本界面",
      note: "可点击账本完成调包。",
      run: function () { setProgress({ hasHammer: true, hasBible: true, redHammerDelivered: true, brooksBibleDelivered: true, inspectionPassed: true, twentyYearsPassed: true, postMontageRedSpoken: true, mapDrawn: true, hasMap: true, ledgerFound: true }); setCheckpoint("CP_OFFICE_DIALOGUE_DONE"); enterScene("office"); GameState.office.wardenPhase = "gone"; GameState.office.wardenX = OfficeLayout.wardenExit.x; GameState.office.wardenY = OfficeLayout.wardenExit.y; GameState.office.embroideryChecked = true; GameState.office.safeViewOpen = true; GameState.office.safeStage = "ledgerFound"; GameState.currentQuest = "quest_office_swap_ledger"; }
    },
    {
      id: "ledger-swapped",
      group: "后期",
      title: "已完成账本调包",
      note: "取得账本后的撤离提示改为头顶心理描写；此节点保留调包完成状态，便于回归最终土洞。",
      run: function () { setProgress(sharedLateProgress()); setCheckpoint("CP_FINAL_DIG"); enterScene("cell"); setPlayerFootToCellImage(CellLayout.pictureStandPoint.x, CellLayout.pictureStandPoint.y); GameState.currentQuest = "quest_cell_final_dig_ready"; }
    },
    {
      id: "final-tunnel",
      group: "终段",
      title: "最终土洞",
      note: "走到最右侧进入水管。",
      run: function () { setProgress(sharedLateProgress()); setCheckpoint("CP_FINAL_DIG"); enterScene("dig"); GameState.dig.mode = "finalTunnel"; GameState.dig.playerX = FinalDigLayout.entryZone.x + FinalDigLayout.entryZone.w / 2 - GameState.dig.playerW / 2; GameState.dig.playerY = FinalDigLayout.walkRect.y; GameState.currentQuest = "quest_final_tunnel"; }
    },
    {
      id: "pipe-smash",
      group: "终段",
      title: "水管砸击点",
      note: "站在黄色交互区。",
      run: function () { setProgress(sharedLateProgress()); setCheckpoint("CP_PIPE_GAME"); enterScene("pipe"); GameState.pipe.playerX = PipeLayout.smashZone.x + PipeLayout.smashZone.w / 2 - GameState.pipe.playerW / 2; GameState.pipe.playerY = PipeLayout.walkRect.y + 2; GameState.pipe.facing = "right"; GameState.currentQuest = "quest_pipe_tunnel"; }
    },
    {
      id: "pipe-window",
      group: "终段",
      title: "水管雷声窗口",
      note: "只差一次砸击，可检查高亮反馈。",
      run: function () { setProgress(sharedLateProgress()); setCheckpoint("CP_PIPE_GAME"); enterScene("pipe"); GameState.pipe.playerX = PipeLayout.smashZone.x + PipeLayout.smashZone.w / 2 - GameState.pipe.playerW / 2; GameState.pipe.playerY = PipeLayout.walkRect.y + 2; GameState.pipe.phase = "smash"; GameState.pipe.smashSuccessCount = PIPE_SMASH_REQUIRED_COUNT - 1; GameState.pipe.smashCompleted = false; GameState.pipe.cueVisible = true; GameState.pipe.cueLit = true; GameState.pipe.cueTimer = 0; GameState.pipe.nextCueDelay = 999; GameState.currentQuest = "quest_pipe_tunnel"; }
    },
    {
      id: "pipe-opened",
      group: "终段",
      title: "水管已砸开",
      note: "站在右侧开口，继续向右可进入大型管道场景。",
      run: function () { setProgress(sharedLateProgress()); setCheckpoint("CP_PIPE_GAME"); enterScene("pipe"); GameState.pipe.phase = "smash"; GameState.pipe.smashSuccessCount = PIPE_SMASH_REQUIRED_COUNT; GameState.pipe.smashCompleted = true; GameState.pipe.cueVisible = false; GameState.pipe.cueLit = false; GameState.pipe.playerX = PipeLayout.networkEntryZone.x - GameState.pipe.playerW - 14; GameState.pipe.playerY = PipeLayout.walkRect.y + 2; GameState.pipe.facing = "right"; GameState.currentQuest = "quest_pipe_opened"; }
    },
    {
      id: "pipe-network",
      group: "终段",
      title: "大型水管内部",
      note: "安迪保持庭院大小与四方向行走，中心沿路线移动；到右上角出口后才触发胜利。",
      run: function () { setProgress(sharedLateProgress()); setCheckpoint("CP_PIPE_NETWORK"); enterScene("pipeNetwork"); }
    },
    {
      id: "escape-victory",
      group: "结局",
      title: "摆脱控制胜利画面",
      note: "显示摆脱控制图片与标题，可按交互推进独白。",
      run: function () { setProgress(sharedLateProgress()); setCheckpoint("CP_PIPE_GAME"); enterScene("pipe"); startPipeVictorySequence(); GameState.pipe.victoryPhase = "imageTitle"; GameState.pipe.victoryTimer = PIPE_VICTORY_IMAGE_FADE_SECONDS + PIPE_VICTORY_TITLE_FADE_SECONDS; GameState.pipe.victoryImageTimer = 0; GameState.currentQuest = "quest_pipe_tunnel"; }
    },
    {
      id: "ending-select",
      group: "结局",
      title: "结局页面",
      note: "按当前证据状态打开已接入结局。",
      run: function () { setCheckpoint("CP_ENDING_SELECT"); openEndingSelectFile(); }
    }
  ];

  function runAmbientConversationTopic(topic) {
    const flags = {
      hasHammer: true,
      redHammerDelivered: true
    };
    let checkpoint = "CP_HAMMER_OBTAINED";
    if (topic.unlock === "inspection") {
      flags.hasBible = true;
      flags.brooksBibleDelivered = true;
      flags.hammerHiddenInBible = true;
      flags.inspectionPassed = true;
      flags.hasAttributeC = true;
      checkpoint = "CP_INSPECTION_PASSED";
    } else if (topic.unlock === "postMontageRed") {
      flags.hasBible = true;
      flags.brooksBibleDelivered = true;
      flags.hammerHiddenInBible = true;
      flags.inspectionPassed = true;
      flags.hasAttributeC = true;
      flags.posterType = "rita";
      flags.posterHung = true;
      flags.twentyYearsPassed = true;
      flags.postMontageRedSpoken = true;
      checkpoint = "CP_POST_MONTAGE_RED";
    }
    setProgress(flags);
    setCheckpoint(checkpoint);
    enterScene("yard");
    initializeAmbientConversationSystem();
    if (!forceAmbientConversationTopic(topic.id)) {
      throw new Error("无法触发环境交谈：" + topic.id);
    }
    const participantEntries = GameState.ambientConversation.participantKeys
      .map(function (key) { return getAmbientConversationActor(key); })
      .filter(Boolean);
    if (participantEntries.length === 2) {
      setPlayerFootToYardImage(
        (participantEntries[0].actor.x + participantEntries[1].actor.x) / 2,
        (participantEntries[0].actor.y + participantEntries[1].actor.y) / 2 + 24
      );
      updateYardCamera();
    }
  }

  const ambientConversationNodes = AmbientConversationTopics.map(function (topic) {
    return {
      id: "ambient-" + topic.id,
      group: topic.type === "evidence" ? "环境交谈·证据" : "环境交谈·闲聊",
      title: topic.evidenceLabel || topic.lines[0].text,
      note: topic.participants.join(" + ") + " ｜ 强制触发两句头顶交谈。",
      run: function () { runAmbientConversationTopic(topic); }
    };
  });

  function allNodes() {
    return storyNodes.concat(ambientConversationNodes);
  }

  function nodeList() {
    return allNodes().map(function (node) {
      return { id: node.id, group: node.group, title: node.title, note: node.note };
    });
  }

  function readState() {
    const activeInteraction = GameState.scene === "yard" ? getActiveYardInteraction() :
      (GameState.scene === "cellCorridor" ? getActiveCorridorInteraction() : null);
    const playerFoot = GameState.scene === "yard" ?
      yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y)) :
      (GameState.scene === "cellCorridor" ?
        corridorWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y)) : null);
    const roamingNpcs = typeof getRoamingNpcDebugStates === "function" ? getRoamingNpcDebugStates() : [];
    const roamingCounts = roamingNpcs.reduce(function (counts, npc) {
      counts[npc.scene] = (counts[npc.scene] || 0) + 1;
      return counts;
    }, {});
    return {
      scene: GameState.scene,
      quest: GameState.currentQuest,
      checkpoint: GameState.currentCheckpoint,
      dialogueActive: DialogueSystem.active,
      dialogueLine: DialogueSystem.active ? DialogueSystem.lines[DialogueSystem.index] : null,
      overheadThoughtActive: OverheadThoughtSystem.isActive(),
      overheadThoughtLine: OverheadThoughtSystem.getCurrentLine(),
      overheadThoughtIndex: OverheadThoughtSystem.index,
      overheadThoughtTimer: Math.round(OverheadThoughtSystem.lineTimer * 10) / 10,
      activeInteraction: activeInteraction ? activeInteraction.id : null,
      cellInspectionPhase: GameState.cellInspection.phase,
      cellInspectionResult: GameState.cellInspection.result,
      sideRouteStage: GameState.sideRoute.stage,
      office: GameState.office ? {
        mode: GameState.office.mode,
        curtainsClosed: GameState.office.curtainsClosed,
        firstWarningSeen: GameState.officeFirstWarningSeen,
        inspectionScheduled: GameState.office.inspectionScheduled,
        inspectionTimer: Math.round(GameState.office.inspectionTimer * 10) / 10,
        inspectionHideTimer: Math.round(GameState.office.inspectionHideTimer * 10) / 10,
        inspectionVisitTimer: Math.round(GameState.office.inspectionVisitTimer * 10) / 10,
        inspectionVisitorKind: GameState.office.inspectionVisitorKind
      } : null,
      corridor: GameState.corridor ? {
        entryPortal: GameState.corridor.entryPortal,
        originScene: GameState.corridor.originScene,
        lastExitPortal: GameState.corridor.lastExitPortal,
        mode: GameState.corridor.mode,
        cameraY: Math.round(GameState.corridor.cameraY),
        escortRouteIndex: GameState.corridor.escortRouteIndex
      } : null,
      sideTalkActiveNpcId: GameState.sideTalk.activeNpcId,
      sideTalkQueuedNpcId: GameState.sideTalk.queuedNpcId,
      ambientConversation: GameState.ambientConversation ? {
        activeTopicId: GameState.ambientConversation.activeTopicId,
        participantKeys: GameState.ambientConversation.participantKeys.slice(),
        lineIndex: GameState.ambientConversation.lineIndex,
        cooldown: Math.round(GameState.ambientConversation.cooldown * 10) / 10,
        observedEvidenceIds: GameState.observedConversationEvidenceIds.slice()
      } : null,
      roamingNpcs: {
        countsByScene: roamingCounts,
        activeTravelerId: GameState.roamingNpcSystem ? GameState.roamingNpcSystem.activeTravelerId : null,
        travelCooldown: GameState.roamingNpcSystem ?
          Math.round(GameState.roamingNpcSystem.travelCooldown * 10) / 10 : null,
        guardTargetCount: GameState.roamingNpcSystem ? GameState.roamingNpcSystem.guardTargetCount : null,
        guardActualCount: GameState.yardGuards ? GameState.yardGuards.length : 0,
        guardRollCheckpoint: GameState.roamingNpcSystem ? GameState.roamingNpcSystem.guardRollCheckpoint : null,
        guardRollReason: GameState.roamingNpcSystem ? GameState.roamingNpcSystem.guardRollReason : null,
        narrativeGuardIds: ["guard_1", "guard_2", "guard_3"],
        pendingRetireIds: GameState.roamingNpcSystem ?
          GameState.roamingNpcSystem.pendingRetireIds.slice() : []
      },
      yardNavigationMap: GameState.yardNavigationMap ? {
        unlocked: GameState.yardNavigationMap.unlocked,
        availableThisRun: GameState.yardNavigationMap.availableThisRun,
        expanded: GameState.yardNavigationMap.expanded,
        revealedCellCount: GameState.yardNavigationMap.revealedCells.length,
        discoveredLandmarks: GameState.yardNavigationMap.discoveredLandmarks.slice()
      } : null,
      pipeNavigationMap: typeof getPipeNavigationMapDebugState === "function" ?
        getPipeNavigationMapDebugState() : null,
      player: {
        x: Math.round(GameState.player.x),
        y: Math.round(GameState.player.y),
        facing: GameState.player.facing,
        yardFootX: playerFoot ? Math.round(playerFoot.x) : null,
        yardFootY: playerFoot ? Math.round(playerFoot.y) : null,
        yardWalkable: playerFoot ? (GameState.scene === "cellCorridor" ?
          isCorridorFootPointWalkable(playerFoot) : isYardFootPointWalkable(playerFoot)) : null
      }
    };
  }

  function jump(nodeId) {
    const node = allNodes().find(function (item) { return item.id === nodeId; });
    if (!node) {
      throw new Error("未找到调试节点：" + String(nodeId || ""));
    }
    node.run();
    restartLoop();
    return { nodeId: node.id, title: node.title, state: readState() };
  }

  window.BeyondWallsDebug = Object.freeze({
    getNodes: nodeList,
    getState: readState,
    jump: jump,
    getAmbientConversationTopics: function () {
      return AmbientConversationTopics.map(function (topic) {
        return {
          id: topic.id,
          type: topic.type,
          participants: topic.participants.slice(),
          evidenceLabel: topic.evidenceLabel || null
        };
      });
    },
    forceAmbientConversation: function (topicId) {
      return forceAmbientConversationTopic(topicId);
    },
    getRoamingNpcs: function () {
      return typeof getRoamingNpcDebugStates === "function" ? getRoamingNpcDebugStates() : [];
    },
    forceRoamingTransition: function (npcId, destinationScene) {
      return forceRoamingTransition(npcId, destinationScene);
    }
  });
  window.dispatchEvent(new CustomEvent("beyond-walls-debug-ready"));
})();
