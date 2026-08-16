"use strict";

// ======================================================
// 1. Global Config
// ======================================================
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const DEBUG_MODE = false;
// Image and audio URLs resolve against shawshank_pixel_escape/index.html, not this script file.
const IMAGE_ROOT = "../assets/main/images/";
const AUDIO_ROOT = "../assets/main/audio/";
const LOCAL_AUDIO_ROOT = AUDIO_ROOT;
const SOUND_EFFECT_ROOT = "../音效/";
const GAME_BGM_VOLUME = 0.5;
const FOOTSTEP_VOLUME = 0.55;
const RAIN_VOLUME = 0.45;
const THUNDER_VOLUME = 0.9;
const HORROR_VOLUME = 0.85;
const GAME_BGM_RESUME_KEY = "shawshank_game_bgm_time";
const CHECKPOINT_STORAGE_KEY = "shawshank_pixel_escape_checkpoint";
const SAVE_DATA_STORAGE_KEY = "shawshank_pixel_escape_save_v2";
const YARD_NAVIGATION_MAP_STORAGE_KEY = "shawshank_yard_navigation_map_v1";
const PIPE_MAZE_BLUEPRINT_STORAGE_KEY = "pipe-maze-blueprint";
// 任务目标是剧情玩法的一部分：始终显示在画面底部，给出下一步行动。
const SHOW_GAMEPLAY_TEXT_HINTS = true;
const PLAYER_SPEED = 260;
const INTRO_IMAGE_WIDTH = 1672;
const INTRO_IMAGE_HEIGHT = 941;
const MENU_FRAME_DURATION = 0.35;
const MENU_FRAME_SEQUENCE = ["menu_frame_01", "menu_frame_02"];
const MENU_CONFIRM_DURATION = 2;
const MENU_BLACK_DURATION = 0.4;
const TV_BACKGROUND_SWAP_SECONDS = 0.5;
const STORY_PRE_BLACK_DURATION = 5.8;
const STORY_QUOTE_DURATION = 2.8;
const STORY_POST_BLACK_DURATION = 5.8;
const INHALE_BLACK_DURATION = 1;
const INHALE_FRAME_DURATION = 0.5;
const FINAL_WHITE_DURATION = 0.45;
const GATE_BLACKOUT_MESSAGE = "你真的脱离控制了吗？";
const GATE_BLACKOUT_TYPEWRITER_CHAR_SECONDS = 0.18;
const OPERATING_ROOM_DISPLAY_SECONDS = 0.5;
const OPERATING_ROOM_BLACKOUT_MESSAGE = "发生了什么？我明明在尝试离开，被抓后却被送上了手术台…难道这座拘禁地还藏着不为人知的用途？";
const OPERATING_ROOM_BLACKOUT_TYPEWRITER_CHAR_SECONDS = 0.045;
const OPERATING_ROOM_BLACKOUT_HOLD_SECONDS = 1.2;
const SLEEP_FADE_OUT_SECONDS = 2;
const SLEEP_DARK_HOLD_SECONDS = 2;
const TWENTY_YEARS_COMIC_SHOT_SECONDS = 3;
const MONTAGE_WAKE_DARK_SECONDS = 2;
const MONTAGE_WAKE_FADE_SECONDS = 2.4;
// 在原先保留 70% 视野的基础上扩大 10%，当前保留原始视野的 77%。
const YARD_VIEW_EXPANSION = 1.1;
const YARD_WORLD_SCALE = 1.9 / (0.7 * YARD_VIEW_EXPANSION);
// 与背景同步缩小院子人物，保持人物与场景的视觉比例。
const YARD_CHARACTER_RENDER_SCALE = 1.6 / YARD_VIEW_EXPANSION;
const YARD_CHARACTER_HEIGHT = 124;
const YARD_CHARACTER_FALLBACK_WIDTH = 52;
const RED_WALK_FRAME_SECONDS = 0.17;
const RED_SPRITE_FRAME_COUNT = 4;
const PRISONER_WALK_FRAME_SECONDS = 0.14;
const YARD_RANDOM_PRISONER_MIN_SPEED = 44;
const YARD_RANDOM_PRISONER_MAX_SPEED = 76;
const YARD_RANDOM_PRISONER_MIN_TARGET_DISTANCE = 260;
const YARD_RANDOM_PRISONER_REST_MIN_SECONDS = 0.35;
const YARD_RANDOM_PRISONER_REST_MAX_SECONDS = 1.4;
const RED_PATROL_SPEED = 52;
const YARD_FOOT_EDGE_TOLERANCE = 2.5;
const YARD_MAP_GRID_COLUMNS = 28;
const YARD_MAP_GRID_ROWS = 29;
const YARD_MAP_REVEAL_RADIUS = 112;
const YARD_MAP_PERSIST_INTERVAL_SECONDS = 0.75;
const NPC_SPRITE_SHEET_FRAME_COUNT = 4;
const NPC_SPRITE_SHEET_FRAME_SECONDS = 0.17;
const BROOKS_LIBRARY_PATROL_SPEED = 44;
const BROOKS_DIALOGUE_APPROACH_SPEED = 78;
const BROOKS_REST_MIN_SECONDS = 0.45;
const BROOKS_REST_MAX_SECONDS = 1.35;
const BROOKS_MIN_TARGET_DISTANCE = 56;
const BROOKS_LIBRARY_PATROL_AREA = { x: 70, y: 1102, w: 190, h: 58 };
const BROOKS_LIBRARY_ENTRY_SPEED = 78;
const BROOKS_LIBRARY_ENTRY_PAUSE_SECONDS = 0.5;
const LIBRARY_SORT_MAX_MOVES = 4;
const AMBIENT_CHAT_INITIAL_MIN_SECONDS = 8;
const AMBIENT_CHAT_INITIAL_MAX_SECONDS = 14;
const AMBIENT_CHAT_INTERVAL_MIN_SECONDS = 18;
const AMBIENT_CHAT_INTERVAL_MAX_SECONDS = 28;
const AMBIENT_CHAT_RETRY_MIN_SECONDS = 4;
const AMBIENT_CHAT_RETRY_MAX_SECONDS = 7;
const AMBIENT_CHAT_LINE_SECONDS = 2.8;
const AMBIENT_CHAT_PAIR_DISTANCE = 120;
const AMBIENT_CHAT_OBSERVE_DISTANCE = 140;
const AMBIENT_CHAT_OBSERVE_SECONDS = 0.8;
const AMBIENT_EVIDENCE_NOTICE_SECONDS = 4;
const AMBIENT_CHAT_EVIDENCE_CHANCE = 0.2;
const AMBIENT_CHAT_EVIDENCE_PITY_COUNT = 5;
const AMBIENT_SOCIAL_TARGET_CHANCE = 0.2;
const AMBIENT_SOCIAL_REST_MIN_SECONDS = 3;
const AMBIENT_SOCIAL_REST_MAX_SECONDS = 5;
// 剧情护送以玩家的画布移动速度为准；进入具体场景后再换算成图片坐标速度。
const CELL_ESCORT_CANVAS_SPEED = PLAYER_SPEED;
const SIDE_ROUTE_ESCORT_CANVAS_SPEED = PLAYER_SPEED;
const CORRIDOR_WORLD_SCALE = 720 / 750;
const CORRIDOR_ESCORT_CANVAS_SPEED = PLAYER_SPEED;
const CORRIDOR_CAMERA_LOOK_AHEAD = 72;
const CELL_NARRATIVE_ROUTE_SAMPLE_DISTANCE = 2;
const YARD_NARRATIVE_ROUTE_SAMPLE_DISTANCE = 6;
const SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS = 0.22;
const SIDE_ROUTE_CROWD_REMARK_DISPLAY_SECONDS = 2.8;
const SIDE_ROUTE_WARNING_COOLDOWN = 1.1;
const SIDE_ROUTE_TRIAL_LINE_SECONDS = [2.8, 3.2, 3.4, 3.1, 2.6];
const SIDE_ROUTE_CROWD_CHATTER_INTERVALS = [2.4, 3.7, 2.9, 4.1];
const SOLITARY_SLEEP_FADE_SECONDS = 0.6;
const SOLITARY_SLEEP_BLACK_SECONDS = 2;
const SIDE_ROUTE_CELL_SLEEP_FADE_SECONDS = 0.6;
const SIDE_ROUTE_CELL_SLEEP_BLACK_SECONDS = 2;
const SIDE_ROUTE_MORNING_GUARD_SPEED = 72;
const SIDE_ROUTE_GATE_CAPTURE_SECONDS = 1.25;
const SIDE_ROUTE_GATE_FAILURE_RETURN_SECONDS = 3;
const SIDE_ROUTE_OFFICE_HIDE_SECONDS = 10;
const SIDE_ROUTE_OFFICE_EXIT_SPEED = 188;
const OFFICE_INSPECTION_CHANCE = 0.4;
const OFFICE_INSPECTION_DELAY_MIN_SECONDS = 8;
const OFFICE_INSPECTION_DELAY_MAX_SECONDS = 15;
const OFFICE_INSPECTION_HIDE_SECONDS = 5;
const OFFICE_INSPECTION_VISIT_SECONDS = 5;
const OFFICE_INSPECTION_ACTOR_SPEED = 188;
const YARD_GUARD_FAST_SPEED = 56;
const YARD_GUARD_SLOW_SPEED_MIN = 28;
const YARD_GUARD_SLOW_SPEED_MAX = 42;
const YARD_GUARD_SOIL_INVESTIGATE_SPEED = 24;
const SOIL_DUMP_HOLD_SECONDS = 5;
const SOIL_DUMP_GUARD_ALERT_SECONDS = 3;
const SOIL_DUMP_REQUIRED_COUNT = 3;
const ANDY_SOIL_DUMP_FRAME_SECONDS = 0.24;
const YARD_GUARD_CATCH_DISTANCE = 56;
const DIG_PLAYER_SPEED = 360;
const FIRST_DIG_PLAYER_SPEED = DIG_PLAYER_SPEED * 1.5;
const DIG_REQUIRED_SECONDS = 5;
const ANDY_DIG_FRAME_SECONDS = 0.12;
const FINAL_TUNNEL_ENTRY_SECONDS = 0.3;
const PIPE_CUE_ACTIVE_SECONDS = 1.5;
const PIPE_CUE_MIN_INTERVAL_SECONDS = 2.1;
const PIPE_CUE_MAX_INTERVAL_SECONDS = 4.2;
const PIPE_CUE_SCREEN_BRIGHTNESS = 0.1;
const PIPE_CUE_LIGHTNING_WIDTH = 420;
const PIPE_CUE_LIGHTNING_HEIGHT = 315;
const PIPE_CUE_PROGRESS_BAR_WIDTH = 96;
const PIPE_CUE_PROGRESS_BAR_HEIGHT = 12;
const PIPE_CUE_PROGRESS_BAR_GAP = 12;
const PIPE_SMASH_HINT_SECONDS = 2;
const PIPE_SMASH_HOLD_SECONDS = 0.7;
const PIPE_SMASH_STAGE_TWO_COUNT = 3;
const PIPE_SMASH_REQUIRED_COUNT = 5;
const PIPE_DROP_SPEED = 720;
const PIPE_CRAWL_FRAME_SECONDS = 0.16;
const PIPE_CRAWL_PLAYER_SCALE = 0.75;
const PIPE_CRAWL_SPEED = 190;
const PIPE_DROWN_AREA_SCALE = 2.3;
const PIPE_DROWN_FALL_SECONDS = 2.2;
const PIPE_DROWN_FALL_SPEED = 120;
const PIPE_VICTORY_BLACK_HOLD_SECONDS = 0.8;
const PIPE_VICTORY_IMAGE_FADE_SECONDS = 1.6;
const PIPE_VICTORY_TITLE_FADE_SECONDS = 1.4;
const PIPE_VICTORY_QUOTE_FADE_SECONDS = 1.25;
const PIPE_VICTORY_QUOTE_AUDIO_DELAY_SECONDS = 1;
const PIPE_VICTORY_QUOTE_MIN_SECONDS = 8;
const PIPE_VICTORY_FADE_OUT_SECONDS = 1.6;
const PIPE_VICTORY_FINAL_TEXT_FADE_SECONDS = 1.1;
const PIPE_VICTORY_FRAME_SECONDS = 0.82;
const PIPE_VICTORY_FRAME_CROSSFADE_SECONDS = 0.18;
const TUNNEL_PLAYER_FOOT_MARGIN = 18;
const WALL_HOLE_REVEAL_SECONDS = 2;
const WALL_HOLE_EXIT_SECONDS = 1;
const BED_LYING_PLAYER_WIDTH = 164;
const BED_LYING_PLAYER_HEIGHT = 62;
const POSTER_PICKUP_HOLD_SECONDS = 0.28;
const POSTER_PICKUP_TRAVEL_SECONDS = 0.72;

// ======================================================
// 2. Asset Manifest
// ======================================================
const AssetManifest = {
  images: {
    andy: "andy.webp",
    andy_crawl_01: "andy_crawl_01.webp",
    andy_crawl_02: "andy_crawl_02.webp",
    andy_crawl_03: "andy_crawl_03.webp",
    andy_front_01: "andy_front_01.webp",
    red: "red.webp",
    red_walk_down_sheet: "red_walk_down_sheet.webp",
    red_walk_up_sheet: "red_walk_up_sheet.webp",
    red_walk_side_sheet: "red_walk_side_sheet.webp",
    // These fallback keys are used only when a directional sprite cannot render.
    // Reuse the bundled sheets instead of referencing absent standalone images.
    brooks: "npc-sheets/brooks_side_walk_sheet.webp",
    brooks_front_walk_sheet: "npc-sheets/brooks_front_walk_sheet.webp",
    brooks_back_walk_sheet: "npc-sheets/brooks_back_walk_sheet.webp",
    brooks_side_walk_sheet: "npc-sheets/brooks_side_walk_sheet.webp",
    warden: "warden_walk_side_sheet.webp",
    guard: "npc-sheets/guard_side_walk_sheet.webp",
    guard_front_walk_sheet: "npc-sheets/guard_front_walk_sheet.webp",
    guard_back_walk_sheet: "npc-sheets/guard_back_walk_sheet.webp",
    guard_side_walk_sheet: "npc-sheets/guard_side_walk_sheet.webp",
    floyd_front_walk_sheet: "npc-sheets/floyd_front_walk_sheet.webp",
    floyd_back_walk_sheet: "npc-sheets/floyd_back_walk_sheet.webp",
    floyd_side_walk_sheet: "npc-sheets/floyd_side_walk_sheet.webp",
    warden_walk_down_sheet: "warden_walk_down_sheet.webp",
    warden_walk_up_sheet: "warden_walk_up_sheet.webp",
    warden_walk_side_sheet: "warden_walk_side_sheet.webp",
    prisoner_01: "prisoner_01.webp",
    prisoner_02: "prisoner_02.webp",
    prisoner_03: "prisoner_03.webp",
    haywood_walk_down_01: "haywood_walk_down_01.webp",
    haywood_walk_down_02: "haywood_walk_down_02.webp",
    haywood_walk_down_03: "haywood_walk_down_03.webp",
    haywood_walk_down_04: "haywood_walk_down_04.webp",
    haywood_walk_up_01: "haywood_walk_up_01.webp",
    haywood_walk_up_02: "haywood_walk_up_02.webp",
    haywood_walk_up_03: "haywood_walk_up_03.webp",
    haywood_walk_up_04: "haywood_walk_up_04.webp",
    haywood_walk_side_01: "haywood_walk_side_01.webp",
    haywood_walk_side_02: "haywood_walk_side_02.webp",
    haywood_walk_side_03: "haywood_walk_side_03.webp",
    haywood_walk_side_04: "haywood_walk_side_04.webp",
    prisoner_01_walk_down_01: "prisoner_01_walk_down_01.webp",
    prisoner_01_walk_down_02: "prisoner_01_walk_down_02.webp",
    prisoner_01_walk_down_03: "prisoner_01_walk_down_03.webp",
    prisoner_01_walk_down_04: "prisoner_01_walk_down_04.webp",
    prisoner_01_walk_up_01: "prisoner_01_walk_up_01.webp",
    prisoner_01_walk_up_02: "prisoner_01_walk_up_02.webp",
    prisoner_01_walk_up_03: "prisoner_01_walk_up_03.webp",
    prisoner_01_walk_up_04: "prisoner_01_walk_up_04.webp",
    prisoner_01_walk_side_01: "prisoner_01_walk_side_01.webp",
    prisoner_01_walk_side_02: "prisoner_01_walk_side_02.webp",
    prisoner_01_walk_side_03: "prisoner_01_walk_side_03.webp",
    prisoner_01_walk_side_04: "prisoner_01_walk_side_04.webp",
    prisoner_02_walk_down_01: "prisoner_02_walk_down_01.webp",
    prisoner_02_walk_down_02: "prisoner_02_walk_down_02.webp",
    prisoner_02_walk_down_03: "prisoner_02_walk_down_03.webp",
    prisoner_02_walk_down_04: "prisoner_02_walk_down_04.webp",
    prisoner_02_walk_up_01: "prisoner_02_walk_up_01.webp",
    prisoner_02_walk_up_02: "prisoner_02_walk_up_02.webp",
    prisoner_02_walk_up_03: "prisoner_02_walk_up_03.webp",
    prisoner_02_walk_up_04: "prisoner_02_walk_up_04.webp",
    prisoner_02_walk_side_01: "prisoner_02_walk_side_01.webp",
    prisoner_02_walk_side_02: "prisoner_02_walk_side_02.webp",
    prisoner_02_walk_side_03: "prisoner_02_walk_side_03.webp",
    prisoner_02_walk_side_04: "prisoner_02_walk_side_04.webp",
    prisoner_03_walk_down_01: "prisoner_03_walk_down_01.webp",
    prisoner_03_walk_down_02: "prisoner_03_walk_down_02.webp",
    prisoner_03_walk_down_03: "prisoner_03_walk_down_03.webp",
    prisoner_03_walk_down_04: "prisoner_03_walk_down_04.webp",
    prisoner_03_walk_up_01: "prisoner_03_walk_up_01.webp",
    prisoner_03_walk_up_02: "prisoner_03_walk_up_02.webp",
    prisoner_03_walk_up_03: "prisoner_03_walk_up_03.webp",
    prisoner_03_walk_up_04: "prisoner_03_walk_up_04.webp",
    prisoner_03_walk_side_01: "prisoner_03_walk_side_01.webp",
    prisoner_03_walk_side_02: "prisoner_03_walk_side_02.webp",
    prisoner_03_walk_side_03: "prisoner_03_walk_side_03.webp",
    prisoner_03_walk_side_04: "prisoner_03_walk_side_04.webp",
    tommy_walk_down_01: "tommy_walk_down_01.webp",
    tommy_walk_down_02: "tommy_walk_down_02.webp",
    tommy_walk_down_03: "tommy_walk_down_01.webp",
    tommy_walk_down_04: "tommy_walk_down_04.webp",
    tommy_walk_up_01: "tommy_walk_up_01.webp",
    tommy_walk_up_02: "tommy_walk_up_02.webp",
    tommy_walk_up_03: "tommy_walk_up_03.webp",
    tommy_walk_up_04: "tommy_walk_up_04.webp",
    tommy_walk_side_01: "tommy_walk_side_01.webp",
    tommy_walk_side_02: "tommy_walk_side_02.webp",
    tommy_walk_side_03: "tommy_walk_side_03.webp",
    tommy_walk_side_04: "tommy_walk_side_04.webp",
    menu_frame_01: "1.webp",
    menu_frame_02: "2.webp",
    start_screen_selected: "start_screen_selected.webp",
    tv_watch_01: "tv.webp",
    tv_watch_02: "tv_watch_02.webp",
    opening_story: "opening_story.webp",
    inhale_01: "inhale_01.webp",
    inhale_02: "inhale_02.webp",
    inhale_03: "inhale_03.webp",
    cell: "cell.webp",
    cell_corridor: "cell_corridor.jpg",
    cell_poster: "cell_poster.webp",
    cell_other_poster: "cell_other_poster.webp",
    poster_female: "poster_female.webp",
    poster_other: "poster_other.webp",
    poster_choice_card: "poster_choice_card.webp",
    poster_choice_panel_frame: "poster_choice_panel_frame.webp",
    operating_room_1: "operating_room_1.webp",
    operating_room: "operating_room.webp",
    yard: "yard.webp",
    yard_map_thumbnail: "yard_map_thumbnail.webp",
    yard_opening: "yard_opening.webp",
    yard_opening_fog: "yard_opening_fog.webp",
    door_sign: "门牌.webp",
    library: "library.jpg",
    office: "office.webp",
    office_curtain_closed: "office_curtain_closed.webp",
    solitary_room: "solitary_room.webp",
    dig_tunnel: "dig_tunnel.webp",
    dig_tunnel_20y: "dig_tunnel_20y.jpg",
    pipe_tunnel_01: "pipe_tunnel_01.webp",
    pipe_tunnel_02: "pipe_tunnel_02.webp",
    pipe_tunnel_03: "pipe_tunnel_03.jpg",
    pipe_lightning: "pipe_lightning.webp",
    victory_escape_01: "victory_escape_01.webp",
    victory_escape_02: "victory_escape_02.webp",
    hole_photo: "hole_photo.webp",
    safe: "safe.webp",
    safe_swapped: "safe_swapped.webp",
    hammer: "hammer.webp",
    bible: "bible.webp",
    bill: "bill.webp",
    soil_pile: "soil_pile.webp",
    soil: "soil_pile.webp",
    map: "map.webp",
    tv: "tv.webp",
    joystick_base: "joystick_base.webp",
    joystick_knob: "joystick_knob.webp",
    andy_views: "andy_views_transparent.webp",
    andy_walk_left: "andy_walk_left.webp",
    andy_walk_right: "andy_walk_right.webp",
    andy_walk_down_01: "andy_front_01.webp",
    andy_walk_down_02: "andy_walk_down_02.webp",
    andy_walk_up_01: "andy_walk_up_01.webp",
    andy_walk_up_02: "andy_walk_up_02.webp",
    andy_soil_dump_01: "andy_soil_dump_01.webp",
    andy_soil_dump_02: "andy_soil_dump_02.webp",
    andy_dig_01: "andy_dig_01.webp",
    andy_dig_02: "andy_dig_02.webp",
    andy_dig_03: "andy_dig_03.webp",
    dialogue_npc: "dialogue_npc_v2.webp",
    dialogue_andy: "dialogue_andy_v2.webp",
    portrait_warden: "dialogue-portraits/warden.webp",
    portrait_andy: "dialogue-portraits/andy.webp",
    portrait_floyd: "dialogue-portraits/floyd.webp",
    portrait_tommy: "dialogue-portraits/tommy.webp",
    portrait_haywood: "dialogue-portraits/haywood.webp",
    portrait_guard: "dialogue-portraits/guard.webp",
    portrait_red: "dialogue-portraits/red.webp",
    portrait_brooks: "dialogue-portraits/brooks.webp",
    portrait_store_manager: "dialogue-portraits/store_manager.webp",
    narrative_frame: "narrative_frame.webp",
    prop_interaction_frame: "prop_interaction_frame.webp"
  },
  audio: {
    game_bgm: { root: LOCAL_AUDIO_ROOT, fileName: "end_title.m4a" },
    victory_birds_quote: { root: LOCAL_AUDIO_ROOT, fileName: "victory_birds_quote.m4a" },
    footsteps_soil: { root: SOUND_EFFECT_ROOT, fileName: "2秒沙土脚步.opus" },
    footsteps_concrete: { root: SOUND_EFFECT_ROOT, fileName: "两秒混凝土脚步.opus" },
    rain: { root: SOUND_EFFECT_ROOT, fileName: "四秒雨声.opus" },
    thunder: { root: SOUND_EFFECT_ROOT, fileName: "四秒雷声.opus" },
    horror: { root: SOUND_EFFECT_ROOT, fileName: "恐怖音效4秒(1).mp3" }
  }
};

const AndySpriteFrames = {
  down: { x: 479, y: 47, w: 283, h: 640, flip: false },
  up: { x: 974, y: 47, w: 275, h: 641, flip: false },
  right: { x: 1433, y: 55, w: 266, h: 632, flip: false },
  left: { x: 1433, y: 55, w: 266, h: 632, flip: true }
};

const ANDY_WALK_FRAME_SECONDS = 0.14;
const ANDY_MOVING_THRESHOLD = 8;
const AndyDigFrames = [
  { assetKey: "andy_dig_02", x: 312, y: 82, w: 637, h: 1029, anchorX: 535, anchorY: 1110 },
  { assetKey: "andy_dig_01", x: 382, y: 104, w: 535, h: 1001, anchorX: 585, anchorY: 1104 },
  { assetKey: "andy_dig_03", x: 380, y: 180, w: 599, h: 813, anchorX: 570, anchorY: 992 },
  { assetKey: "andy_dig_01", x: 382, y: 104, w: 535, h: 1001, anchorX: 585, anchorY: 1104 }
];
const AndyWalkFrames = {
  left: [
    { type: "base" },
    { assetKey: "andy_walk_left", x: 371, y: 143, w: 465, h: 914 }
  ],
  right: [
    { type: "base" },
    { assetKey: "andy_walk_right", x: 404, y: 134, w: 461, h: 958 }
  ],
  down: [
    { assetKey: "andy_walk_down_01", x: 77, y: 64, w: 235, h: 547 },
    { type: "base" },
    { assetKey: "andy_walk_down_02", x: 61, y: 48, w: 232, h: 558 },
    { type: "base" }
  ],
  up: [
    { assetKey: "andy_walk_up_01", x: 30, y: 44, w: 277, h: 588 },
    { type: "base" },
    { assetKey: "andy_walk_up_02", x: 59, y: 47, w: 245, h: 588 },
    { type: "base" }
  ]
};
const AndySoilDumpFrames = [
  { assetKey: "andy_soil_dump_01", anchors: { down: 666, up: 667, right: 668 } },
  { assetKey: "andy_soil_dump_02", anchors: { down: 673, up: 673, right: 671 } }
];
const AndySoilDumpDirectionFrames = {
  down: { x: 420, y: 0, w: 400, h: 724, referenceHeight: 630 },
  up: { x: 930, y: 0, w: 400, h: 724, referenceHeight: 632 },
  right: { x: 1370, y: 0, w: 400, h: 724, referenceHeight: 628 }
};
const PipeCrawlFrames = [
  { assetKey: "andy_crawl_01", x: 245, y: 321, w: 959, h: 445 },
  { assetKey: "andy_crawl_02", x: 251, y: 320, w: 948, h: 447 },
  { assetKey: "andy_crawl_03", x: 297, y: 321, w: 855, h: 445 }
];
const PipeDrownFrame = { assetKey: "andy_front_01", x: 77, y: 64, w: 235, h: 547 };

const WARDEN_WALK_FRAME_SECONDS = 0.17;
const WARDEN_SPRITE_FRAME_COUNT = 4;
const GUARD_WALK_MIN_ANIM_SPEED = 0.72;
const GUARD_WALK_MAX_ANIM_SPEED = 1.28;
const GUARD_SIDE_TURN_SECONDS = 0.2;

const WardenSpriteSheets = {
  down: { assetKey: "warden_walk_down_sheet" },
  up: { assetKey: "warden_walk_up_sheet" },
  left: { assetKey: "warden_walk_side_sheet", flip: true },
  right: { assetKey: "warden_walk_side_sheet" }
};

const RedSpriteSheets = {
  down: { assetKey: "red_walk_down_sheet" },
  up: { assetKey: "red_walk_up_sheet" },
  left: { assetKey: "red_walk_side_sheet", flip: true },
  right: { assetKey: "red_walk_side_sheet" }
};

const RedDrawSize = {
  down: { w: 93, h: YARD_CHARACTER_HEIGHT },
  up: { w: 93, h: YARD_CHARACTER_HEIGHT },
  left: { w: 93, h: YARD_CHARACTER_HEIGHT },
  right: { w: 93, h: YARD_CHARACTER_HEIGHT }
};

// The supplied side sheets face right. Left-facing movement is always rendered
// by mirroring that same sheet, while front/back sheets cover vertical movement.
const DirectionalNpcSpriteSheets = {
  brooks: {
    down: { assetKey: "brooks_front_walk_sheet" },
    up: { assetKey: "brooks_back_walk_sheet" },
    right: { assetKey: "brooks_side_walk_sheet" },
    left: { assetKey: "brooks_side_walk_sheet", flip: true }
  },
  guard: {
    down: { assetKey: "guard_front_walk_sheet" },
    up: { assetKey: "guard_back_walk_sheet" },
    right: { assetKey: "guard_side_walk_sheet" },
    left: { assetKey: "guard_side_walk_sheet", flip: true }
  },
  floyd: {
    down: { assetKey: "floyd_front_walk_sheet" },
    up: { assetKey: "floyd_back_walk_sheet" },
    right: { assetKey: "floyd_side_walk_sheet" },
    left: { assetKey: "floyd_side_walk_sheet", flip: true }
  }
};

const PrisonerWalkFrames = {
  prisoner_01: createPrisonerWalkFrames("prisoner_01"),
  prisoner_02: createPrisonerWalkFrames("prisoner_02"),
  prisoner_03: createPrisonerWalkFrames("prisoner_03"),
  tommy: createTommyWalkFrames(),
  haywood: createHaywoodWalkFrames()
};

const YardRandomPrisonerConfigs = [
  {
    assetKey: "tommy",
    name: "汤米",
    x: 516,
    y: 960,
    h: YARD_CHARACTER_HEIGHT,
    patrolBounds: { minX: 348, minY: 824, maxX: 570, maxY: 1060 },
    minTargetDistance: 70,
    minSpeed: 54,
    maxSpeed: 60,
    walkFrameSeconds: 0.17,
    idleFrameIndex: 0,
    restMinSeconds: 0.5,
    restMaxSeconds: 1.15
  },
  {
    assetKey: "haywood",
    name: "海伍德",
    x: 918,
    y: 916,
    h: YARD_CHARACTER_HEIGHT,
    patrolBounds: { minX: 706, minY: 806, maxX: 950, maxY: 960 },
    minTargetDistance: 80,
    minSpeed: 52,
    maxSpeed: 58,
    walkFrameSeconds: 0.17,
    idleFrameIndex: 0,
    restMinSeconds: 0.4,
    restMaxSeconds: 0.9
  },
  {
    assetKey: "floyd",
    name: "弗洛伊德",
    x: 760,
    y: 540,
    h: YARD_CHARACTER_HEIGHT,
    patrolBounds: { minX: 560, minY: 400, maxX: 840, maxY: 720 },
    minTargetDistance: 78,
    minSpeed: 48,
    maxSpeed: 54,
    walkFrameSeconds: NPC_SPRITE_SHEET_FRAME_SECONDS,
    idleFrameIndex: 0,
    restMinSeconds: 0.55,
    restMaxSeconds: 1.25
  },
];

function createPrisonerWalkFrames(baseKey, frameCount) {
  const down = createPrisonerDirectionFrames(baseKey, "down", frameCount);
  const up = createPrisonerDirectionFrames(baseKey, "up", frameCount);
  const side = createPrisonerDirectionFrames(baseKey, "side", frameCount);

  return {
    down,
    up,
    right: side,
    left: side.map((frame) => ({ assetKey: frame.assetKey, flip: true }))
  };
}

function createTommyWalkFrames() {
  const down = createPrisonerDirectionFrames("tommy", "down");
  const up = createPrisonerDirectionFrames("tommy", "up");
  const side = createPrisonerDirectionFrames("tommy", "side");

  return {
    down,
    up,
    // Tommy's source side frames face left, unlike the generic prisoner set.
    left: side,
    right: side.map((frame) => ({ assetKey: frame.assetKey, flip: true }))
  };
}

function createHaywoodWalkFrames() {
  const down = createPrisonerDirectionFrames("haywood", "down");
  const up = createPrisonerDirectionFrames("haywood", "up");
  const side = createPrisonerDirectionFrames("haywood", "side");

  return {
    down,
    up,
    right: side,
    left: side.map((frame) => ({ assetKey: frame.assetKey, flip: true }))
  };
}

function createPrisonerDirectionFrames(baseKey, direction, frameCount) {
  const count = frameCount || 4;
  return Array.from({ length: count }, (_, index) => index + 1).map((index) => ({
    assetKey: baseKey + "_walk_" + direction + "_" + String(index).padStart(2, "0")
  }));
}

// ======================================================
// 3. Text Data / Dialogue Data
// ======================================================
const TextData = {
  title: "高墙之外",
  subtitle: "像素剧情冒险 · 个人离线版",
  start: "开始探索",
  continueGame: "继续游戏",
  newGame: "重新开始",
  deleteSave: "删除存档",
  deleteSaveTitle: "删除本地存档？",
  cancel: "取消",
  confirmDelete: "确认删除",
  saveDeleted: "存档已删除",
  saveDeleteFailed: "删除失败，请检查浏览器存储权限",
  menuHint: "点击开始探索，或按空格键确认。",
  livingQuest: "躺在沙发上，观看电视里的故事。",
  tvPrompt: "点击画面或按空格键开始观影。",
  recapHint: "点击画面或按空格键推进分镜。",
  cellQuest: "你在房间醒来。先熟悉移动。",
  openingPrelude: [
    {
      title: "前情提要（一）",
      body: "电视里的故事始于一次陷害。银行家安迪被坏人带进黑墙庄园，从此高墙、锁门、巡查声和看守的脚步，成了他每天醒来都要面对的世界。这里不仅限制行动，也一点点磨掉人的名字、习惯和希望。"
    },
    {
      title: "前情提要（二）",
      body: "可安迪没有把余生交给拘禁地。他会结识能弄到物件的瑞德，也会从老布那里得到一本圣经；一把石锤、一堆泥土、一本账本，都会在漫长岁月里变成脱困计划的一部分。现在，屏幕的光正把你拉进这条路。"
    }
  ],
  openingQuote: "——一场阴谋让银行家安迪失去自由，被坏人长期拘禁在黑墙庄园。",
  pauseTitle: "暂停",
  pauseHint: "按 Esc 或 P 继续游戏 · 点击下方查看成就",
  failTitle: "失败",
  failHint: "第 0 阶段预留失败界面"
};

const RedDialogueLines = [
  "瑞德：我记得你。当初新人进来那晚，我赌你第一个崩溃大哭，结果我输掉两包烟。你整晚一声不吭。",
  "瑞德：怎么，今天想来跟我聊聊天？还是，你想要买点什么东西？",
  "安迪（神色平静，没有多余情绪）：我听说，在这里，你能弄到外面带进来的物件。",
  "瑞德：消息传得倒是快。但生意有生意的规矩，风险越大，代价越高。先说，你想要什么？",
  "安迪：一把小石锤，雕刻石头用的那种。不大，用来打磨卵石。",
  "瑞德：石锤？金属物件。搜查很容易被盯上。你拿它做什么？",
  "安迪：房间地上到处是鹅卵石，我想打磨雕刻，打发时间。仅此而已。",
  "瑞德（上下打量安迪，沉默几秒）：我见过不少新人，嘴上说着消遣，转头就拿着利器惹事。我不想惹上麻烦。",
  "安迪：你可以打听我，我没有打架闹事的心思。我只是需要一点可以独处时做的事。",
  "瑞德：行。但是你要先帮我修理一下我的收音机。如果你帮我修好了，我会给你石锤。"
];

const OpeningYardThoughtLines = [
  "安迪（心理）：这是哪里！我要赶紧出去！"
];

const CellWakeThoughtLines = [
  "安迪（心理）：我穿越到电影里了？我要脱离控制！还要揭露这该死的黑墙庄园。",
  "安迪（心理）：我要先出去找找瑞德。"
];

const RedEvidenceDialogueLines = [
  "瑞德（压低声音）：收音机修好了，我欠你一份人情。不过我不会把纸留在身上——那种东西活不过一次搜身。",
  "瑞德：我替会计跑过三次腿。钱都打给了“东港建材”“哈德森修缮”和“格林运输”，可院里根本没有这些人干过活。",
  "瑞德：记住六月十二日、七月三日和七月十九日。每次拨款后的夜里，后门都会有车出去。",
  "安迪：没有单据，但公司名和结算日期足够和别的线索核对。",
  "瑞德：对。把它记在脑子里，别让我因为几张早该烧掉的纸送命。"
];

const TommyEvidenceDialogueLines = [
  "汤米（声音放得很低）：有件事我一直压在心里。以前我替档案室搬过一批写着“转移”的牛皮纸袋。",
  "汤米：每个袋子都贴着被困者编号，却没有接收黑墙庄园的盖章；看守只说“送去 D 区”，不许我问。",
  "汤米：我见过其中三个人。他们那晚被带走，之后一次点名也没有回来。",
  "安迪：这是你的亲眼所见。没有物件，也是一份能被追问的证言。",
  "汤米：我只能把我看见的告诉你。别让他们发现我们聊过这个。"
];

const HaywoodEvidenceDialogueLines = [
  "海伍德（看了眼远处的岗楼）：夜里总有一辆没有黑墙庄园标记的灰色卡车从后门出去，左后门少了一块漆。",
  "海伍德：我不敢记在纸上，但记得它出现过三次：六月十二日、七月三日、七月十九日。尾牌最后三位是 417。",
  "安迪：日期和瑞德说的结算日完全重合。",
  "海伍德：我只能给你这段口述。查得到那辆车，就能把钱和人连到一起。"
];

const BrooksEvidenceDialogueLines = [
  "老布（从《州立年鉴》的硬皮夹层抽出一页裁下的登记纸）：这是图书馆原册的第 47 页，页脚还有我的红色馆藏章。",
  "老布：第 17、22、31 号借阅证被同一个人划掉，旁边盖着“D 区转送”；可这三个人没有归还记录，也没有脱离拘禁记录。",
  "安迪：编号、日期和馆藏章都在。这不是传闻，是被留下的原始登记。",
  "老布（把登记页折好塞进安迪掌心）：把它收好。纸很薄，可比流言更难被抹掉。"
];

const FloydEvidenceDialogueLines = [
  "弗洛伊德（摊开掌心的一块铜质挂牌）：我在撒土区翻到这个。正面冲着“D-17”，背面是“后门·02:10”，孔边还挂着半截断麻绳。",
  "弗洛伊德：那晚的麻布袋都系着这种牌。夜班车一走，深色泥地就会被重新翻过；第二天，名册上又少几个没人敢问的名字。",
  "安迪：这块牌把 D 区、后门和那批“转送”直接连在一起了。",
  "弗洛伊德：拿走它，别让人看见我和你说过这些。"
];

// 只有能实际带走并保存的原件才进入物品栏；其余是可被后续核实的证言或情报。
const PhysicalEvidenceItems = [
  {
    npcId: "brooks",
    flag: "hasBrooksEvidence",
    id: "transferRegisterPage",
    label: "转送登记页",
    icon: "registerPage",
    title: "D 区转送登记页",
    subtitle: "图书馆借阅原册 · 第 47 页"
  },
  {
    npcId: "floyd",
    flag: "hasFloydEvidence",
    id: "d17TransferTag",
    label: "D-17 转送牌",
    icon: "transferTag",
    title: "D-17 铜质转送牌",
    subtitle: "后门夜间转送用挂牌"
  }
];

const YardGuardConversationLines = [
  "看守（压低声音）：别在那片深色泥地停太久。夜班的“转送”前，总要先把那边清出来。",
  "看守：名单上多一行少一行不归我管，可有些人走了，连个去处都没有。",
  "看守：上头只要数字对得上，谁还会问那些空出来的床位？"
];

const GateGuardConversationLines = [
  "看守（望着大门外）：上级来访还得装得像样一点。昨晚后门那辆没编号的车，又把值班表弄得一团糟。",
  "看守：有人说是正常转送，可门禁簿上连接收地点都没写。上面的人总爱让下面的人替他们对数字。",
  "看守：你最好当没听见。这里有些人一出门，名字就再也不会回到名册上。"
];

const AmbientConversationTopics = [
  {
    id: "casual_red_tommy_chess",
    type: "casual",
    participants: ["red", "tommy"],
    lines: [
      { speaker: "red", text: "那两根火柴，你还欠着。" },
      { speaker: "tommy", text: "晚饭后下盘棋，赢了就还你。" }
    ]
  },
  {
    id: "casual_red_haywood_radio",
    type: "casual",
    participants: ["red", "haywood"],
    lines: [
      { speaker: "red", text: "收音机今天又跑台了。" },
      { speaker: "haywood", text: "这里连杂音都比新闻准时。" }
    ]
  },
  {
    id: "casual_red_floyd_shoes",
    type: "casual",
    participants: ["red", "floyd"],
    lines: [
      { speaker: "red", text: "你的鞋底又开线了？" },
      { speaker: "floyd", text: "拿线缝一缝，还能撑一个星期。" }
    ]
  },
  {
    id: "casual_brooks_tommy_book",
    type: "casual",
    participants: ["brooks", "tommy"],
    lines: [
      { speaker: "brooks", text: "上次借你的那本书看完了吗？" },
      { speaker: "tommy", text: "还差两页，今晚就给您送回去。" }
    ]
  },
  {
    id: "casual_brooks_haywood_rain",
    type: "casual",
    participants: ["brooks", "haywood"],
    lines: [
      { speaker: "haywood", text: "今天图书馆还是那么空？" },
      { speaker: "brooks", text: "下雨的时候，大家才想得起书。" }
    ]
  },
  {
    id: "casual_brooks_floyd_bookmark",
    type: "casual",
    participants: ["brooks", "floyd"],
    lines: [
      { speaker: "brooks", text: "别再折书角了。" },
      { speaker: "floyd", text: "知道了，下回我用饭票夹着。" }
    ]
  },
  {
    id: "casual_tommy_haywood_dinner",
    type: "casual",
    participants: ["tommy", "haywood"],
    lines: [
      { speaker: "tommy", text: "今晚不会又是豆子吧？" },
      { speaker: "haywood", text: "至少比昨天多了一勺汤。" }
    ]
  },
  {
    id: "casual_tommy_floyd_snore",
    type: "casual",
    participants: ["tommy", "floyd"],
    lines: [
      { speaker: "tommy", text: "昨晚是谁一直打呼？" },
      { speaker: "floyd", text: "你隔壁那位，墙都快跟着响了。" }
    ]
  },
  {
    id: "casual_haywood_floyd_shoulder",
    type: "casual",
    participants: ["haywood", "floyd"],
    lines: [
      { speaker: "haywood", text: "你肩膀还疼吗？" },
      { speaker: "floyd", text: "搬完这批东西，再想办法热敷。" }
    ]
  },
  {
    id: "casual_guard_shift",
    type: "casual",
    participants: ["guard", "guard"],
    lines: [
      { speaker: "guard:first", text: "你几点换岗？" },
      { speaker: "guard:second", text: "钟响两次，我来接你。" }
    ]
  },
  {
    id: "evidence_night_truck_roll_call",
    type: "evidence",
    participants: ["tommy", "haywood"],
    evidenceId: "nightTruckRollCall",
    evidenceLabel: "夜车与失踪点名",
    unlock: "hammer",
    lines: [
      { speaker: "tommy", text: "昨晚后门那辆灰车又来了。" },
      { speaker: "haywood", text: "尾牌还是 417。车走以后，点名就少了人。", keyEvidence: true }
    ]
  },
  {
    id: "evidence_d17_number_link",
    type: "evidence",
    participants: ["floyd", "tommy"],
    evidenceId: "d17NumberLink",
    evidenceLabel: "D-17 编号对应关系",
    unlock: "inspection",
    lines: [
      { speaker: "floyd", text: "深色泥地里翻出的牌子写着 D-17，背面还有后门时刻。" },
      { speaker: "tommy", text: "我搬过的转送袋也是 D 区编号，可那些人没再回来。", keyEvidence: true }
    ]
  },
  {
    id: "evidence_shell_company_truck_dates",
    type: "evidence",
    participants: ["red", "haywood"],
    evidenceId: "shellCompanyTruckDates",
    evidenceLabel: "空壳结算与夜车日期吻合",
    unlock: "postMontageRed",
    lines: [
      { speaker: "red", text: "东港建材七月十九日结账，那晚后门也有车。" },
      { speaker: "haywood", text: "六月十二和七月三也是。三笔钱，三趟夜车。", keyEvidence: true }
    ]
  }
];

const AmbientSocialPoints = {
  libraryForecourt: { x: 330, y: 1050 },
  southLane: { x: 640, y: 1010 },
  centerWalk: { x: 650, y: 760 }
};

const AmbientSocialPointIdsByActor = {
  red: ["southLane", "centerWalk"],
  brooks: ["libraryForecourt"],
  tommy: ["libraryForecourt", "southLane"],
  haywood: ["southLane", "centerWalk"],
  floyd: ["libraryForecourt", "centerWalk"],
  guard: ["centerWalk"]
};

const InspectionAfterthoughtLines = [
  "安迪（心理）：该去找瑞德拿点东西遮住墙面，上次我帮过他，这次应该也能顺利获得。"
];

const PosterHungThoughtLines = [
  "安迪（心理）：海报不错！时间刚好，该干正事了。"
];

const SoilRestThoughtLines = [
  "安迪（心理）：好累，赶紧去床上休息一会吧…"
];

const PostMontageThoughtLines = [
  "安迪（心理）：挖了有一段时间了，该去和瑞德打听一下消息了。"
];

const AlternateRoutePostMontageThoughtLines = [
  "安迪（心理）：一觉醒来，竟然已经过去了二十年。",
  "安迪（心理）：老布已经脱离拘禁了。院子里再也看不到那个抱着书箱的身影。",
  "安迪（心理）：得去找瑞德，他或许能打听到排水通道的路线。"
];

const MapObtainedThoughtLines = [
  "安迪（心理）：是时候去帮幕后主使干活了…"
];

const AlternateRouteMapObtainedThoughtLines = [
  "安迪（心理）：排水路线已经画清楚了。现在只剩打开海报后的最后通道。"
];

const OfficeWardenGoneThoughtLines = [
  "安迪（心理）：该去调换他的罪证了！"
];

const WallDigPromptLines = [
  "墙上的裂缝暴露了计划。得找瑞德弄一张海报，把洞口遮住。"
];

const PosterChoices = [
  { id: "rita", name: "女明星海报", assetKey: "poster_female", color: "#8c714e", accent: "#ead8b7" },
  { id: "marilyn", name: "其他海报", assetKey: "poster_other", color: "#6c6b58", accent: "#d7d2bc" }
];

const RedPosterDialogueLines = [
  "安迪（站到瑞德身侧，声音压得很低）：瑞德。",
  "瑞德（抬眼看向安迪）：安迪？好久没找我做生意了。石锤用着还算顺手？",
  "安迪：很不错。这次我想再托你弄一样东西。",
  "瑞德：说说看。先说好，金属工具这类风险货，短时间我不想再折腾。",
  "安迪：不是工具。一张大海报。",
  "瑞德（眉头微挑，上下打量安迪）：大海报？体积不小。搜房的时候一眼就能看见。你想要哪种海报，女明星，还是其他的海报？"
];

const RedPosterDeliveryLines = [
  "瑞德环顾四周确认没有看守注视，悄悄从衣襟内拿出纸筒，快速塞到安迪手里。",
  "瑞德：拿好，卷紧藏好。别在露天打开。",
  "瑞德：这地方耳目多，别在这里多说。",
  "安迪：多谢。"
];

const RedHammerDeliveryLines = [
  "收音机重新响起微弱的电流声。",
  "瑞德：手艺不错。答应你的石锤，收好。",
  "瑞德：图书馆门口的老布我已经打过招呼了。想找书，就去找他。"
];

const PostMontageRedDialogueLines = [
  "瑞德：二十年了，安迪。你看起来还是像在等一班不会来的车。",
  "安迪：有些路不会自己出现，但我可以把它画出来。",
  "瑞德：一张地图？在这里，地图比钥匙还危险。",
  "安迪：那就让它看起来只是一张普通的纸。今晚我回房间，把路线画下来。"
];

const AlternateRoutePostMontageRedDialogueLines = [
  "安迪：瑞德，我需要知道黑墙庄园排水通道该怎么走。",
  "瑞德：二十年了，我从维修档案里记下了几个关键转弯。",
  "瑞德：我说，你记。回房间以后，把整条路线画下来。",
  "安迪：明白。地图画好，我就知道最后该往哪里走了。"
];

const BrooksLibraryOpeningLines = [
  "老布（低头整理书箱，慢悠悠开口）：新来的？瑞德跟我说你想来图书馆看看。"
];

const BrooksBibleDeliveryLines = [
  "—— 一段时间后，图书整理完毕 ——",
  "老布（双手递出一本圣经）：辛苦你了。",
  "老布：这本书归你了，私人所有，不用归还。",
  "老布：希望它能在黑暗里，给你一点安慰。",
  "安迪：谢谢您，布鲁克斯先生。"
];

// 老布的对话按剧情自动采用最贴合当前情境的原回答，玩家只需继续推进。
const BrooksLibraryReplies = {
  opening: "我喜欢看书，希望能常来图书馆。",
  bibleRequest: "我希望能有一本私人的经书，夜里可以读。",
  bibleReason: "黑墙庄园太压抑，我想靠经文稳住心态。",
  helpLibrary: "我愿意帮您整理。"
};

const InspectionConfiscationDialogueLines = [
  "幕后主使：例行检查房间，所有人站到床边，不许乱动，不许藏匿违禁品！",
  "看守：报告幕后主使，在该被困者的物品中发现一把石锤。",
  "幕后主使（盯着安迪）：一把石锤？你打算用它做什么？",
  "安迪：只是雕刻时用的工具。",
  "幕后主使：在黑墙庄园，被困者不需要这种工具。没收。",
  "幕后主使：把他拖出房间。我会亲自问清楚。",
  "看守：是，幕后主使。"
];

const SideRouteWardenAddressLines = [
  "看守：人已经带到了。从他的房间里搜出了这把违禁的石锤。",
  "幕后主使（面向围观的被困者）：都看清楚了。就在安迪的房间里，我发现了一把石锤。",
  "幕后主使：他心怀不轨，私藏违禁物，想把黑墙庄园的规矩当成摆设。",
  "幕后主使：任何人敢效仿他，都会知道后果。",
  "幕后主使：把他送进密闭房间。"
];

const SideRouteCrowdChatterLines = [
  "安迪怎么了？",
  "听说从他房间里搜出了东西。",
  "那是一把石锤吗？",
  "别挤，往后站一点。",
  "他要被带到哪里去？",
  "小声点，看守正盯着呢。",
  "今天这阵仗不太对劲。",
  "安迪这次摊上麻烦了。"
];

const SideRouteBrooksDialogueLines = [
  "老布（看着安迪手腕上的红痕，沉默了片刻）：要是当时你和我要一本圣经，把石锤藏在圣经里面，幕后主使应该不会发现你吧。",
  "老布：那样……你就不会被惩罚了。",
  "老布（从书箱最里面取出一本旧圣经，郑重递给安迪）：这本圣经给你。",
  "老布：希望这本圣经能够保佑你，不要再经历昨天的磨难。",
  "安迪：谢谢你，老布。",
  "老布：我明天就要脱离拘禁了。听说上级领导也会来黑墙庄园巡视，幕后主使会忙着把这里收拾得体面些。",
  "老布：到时候，院门、走廊和办公室都会比平时更忙；看守也会被临时调去应付来访的人。",
  "老布（声音很轻）：可别把这当成什么保证。高墙最擅长吞掉人的希望。",
  "安迪（心理）：上级来访时，黑墙庄园会开放，现场一定混乱，守备力量也会被调散。",
  "安迪（心理）：如果能撑到明天，也许能在混乱中找到另一条离开高墙的路。"
];

const SideRouteOfficeEvidenceLines = [
  "你翻开幕后主使桌上的文件夹，里面夹着一叠被反复涂改的转运记录。",
  "记录里有几名没有身份编号的“转运对象”，姓名与黑墙庄园名册完全对不上。",
  "安迪（心理）：这些不是正常的调动……幕后主使在利用黑墙庄园贩卖人口，还伪造了去向。",
  "门外响起了脚步声。有人来了！快躲起来！"
];

const SideRouteOfficeWardenLines = [
  "幕后主使：哈哈哈，这些领导真好糊弄。他们今天还夸我把黑墙庄园治理得井井有条。",
  "幕后主使：今天有一位领导差点走到房间内查人了；还好我聪明把他们引开了，没发现黑墙庄园人数与名单对不上的事情。",
  "看守：还得是幕后主使您英明。",
  "幕后主使：那是。",
  "幕后主使：哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈。"
];

const SideRouteOfficeSearchAgainLines = [
  "幕后主使和看守的脚步声渐远，办公室重新安静下来。",
  "安迪（心理）：趁他们离开，再把书桌翻一遍。"
];

const SideRouteOfficeFinalEvidenceLines = [
  "你继续翻找，在文件夹最底下找到了那把被没收的石锤。",
  "石锤旁压着完整的转运账目和伪造名单；这就是幕后主使贩卖人口的实锤。",
  "安迪获得了石锤。",
  "安迪（心理）：看来幕后主使真的在干一些见不得人的勾当。",
  "安迪（心理）：不行，我必须要脱离控制举报他。"
];

const SolitaryStoneDialogueLines = [
  "角落里有一块小石板，边缘沾着已经发黑的血迹。",
  "石板上的字：今天就是我脱离拘禁的日子。",
  "再往下看：本来我可以在今天脱离拘禁的，可是没想到……",
  "后面的字迹被血和潮气泡得斑驳不清，再也辨认不出来。",
  "安迪（心理）：这里关过太多人。有人等到了门开，也没能真正走出去。"
];

const CorridorLockedDoorLines = [
  "铁门从外侧锁死，门后没有一点光。"
];

const CorridorPostSolitaryLines = [
  "安迪（心理）：门终于开了。先穿过走廊，去图书馆前找老布。"
];

const InspectionPassDialogueLines = [
  "幕后主使：例行检查房间，所有人站到床边，不许乱动，不许藏匿违禁品！",
  "看守：报告幕后主使，一本圣经，无违禁物品。",
  "幕后主使：救赎之道，就在其中。",
  "幕后主使：只要心怀虔诚，恪守规矩，高墙之内亦可赎罪。"
];


const IntroLayout = {
  imageWidth: INTRO_IMAGE_WIDTH,
  imageHeight: INTRO_IMAGE_HEIGHT,
  personSecretRect: { x: 820, y: 0, w: 800, h: 650 },
  startButtonRect: { x: 82, y: 520, w: 390, h: 88 },
  newGameButtonRect: { x: 82, y: 618, w: 390, h: 88 },
  deleteSaveButtonRect: { x: 82, y: 716, w: 390, h: 88 },
  choiceCleanRect: { x: 72, y: 510, w: 430, h: 304 }
};

// ======================================================
// 4. Game State
// ======================================================
const GameState = {
  scene: "menu",
  previousScene: null,
  currentQuest: "quest_start",
  currentCheckpoint: "CP_START",
  playTime: 0,
  fatalError: null,
  gameBgmStarted: false,
  gameBgmStopped: false,
  whiteLightTimer: 0,
  opening: {
    phase: "idle",
    timer: 0,
    tvFrameIndex: 0,
    gateEscapeAvailable: false,
    menuSelection: "start",
    deleteConfirmOpen: false,
    deleteConfirmSelection: "cancel",
    menuNotice: "",
    menuNoticeTimer: 0
  },
  surgerySequence: {
    timer: 0,
    horrorPlayed: false
  },
  twentyYearsMontage: {
    phase: "idle",
    timer: 0,
    pageIndex: 0
  },
  tutorial: {
    active: null,
    wakeStep: null
  },
  wakeTutorialCompleted: false,
  mapTutorialCompleted: false,
  // 睡眠演出会暂时将角色摆到床／草席上；醒来时必须回到开始演出前的原位置。
  sleepReturnPosition: null,
  camera: {
    x: 0,
    y: 0
  },
  corridor: {
    entryPortal: null,
    originScene: null,
    lastExitPortal: null,
    mode: "free",
    initialized: false,
    initialCellExitSeen: false,
    cameraY: 0,
    escortRouteIndex: 0,
    remarkText: "",
    remarkStartedAt: -1,
    guards: [
      { x: 0, y: 0, facing: "down", visualFacing: "down", isMoving: false, walkAnimTime: 0 },
      { x: 0, y: 0, facing: "down", visualFacing: "down", isMoving: false, walkAnimTime: 0 }
    ]
  },
  yardNavigationMap: {
    unlocked: false,
    availableThisRun: false,
    expanded: false,
    revealedCells: [],
    revealedLookup: new Uint8Array(YARD_MAP_GRID_COLUMNS * YARD_MAP_GRID_ROWS),
    discoveredLandmarks: [],
    storageLoaded: false,
    dirty: false,
    persistTimer: 0
  },
  player: {
    x: 250,
    y: 440,
    w: 52,
    h: 108,
    speed: PLAYER_SPEED,
    vx: 0,
    vy: 0,
    lyingInBed: false,
    isMoving: false,
    walkAnimTime: 0,
    facing: "down"
  },
  yardGuards: [
    { x: 640, y: 470, targetX: 0, targetY: 0, speed: 0, speedTimer: 0, fast: true, investigatingSoilDump: false, facing: "down", visualFacing: "down", turnTimer: 0, isMoving: false, walkAnimTime: 0 },
    { x: 820, y: 660, targetX: 0, targetY: 0, speed: 0, speedTimer: 0, fast: false, investigatingSoilDump: false, facing: "left", visualFacing: "left", turnTimer: 0, isMoving: false, walkAnimTime: 0 },
    { x: 920, y: 810, targetX: 0, targetY: 0, speed: 0, speedTimer: 0, fast: true, investigatingSoilDump: false, facing: "up", visualFacing: "up", turnTimer: 0, isMoving: false, walkAnimTime: 0 }
  ],
  yardPrisoners: [],
  redNpc: {
    initialized: false,
    mode: "patrol",
    x: 620,
    y: 650,
    facing: "down",
    isMoving: false,
    walkAnimTime: 0,
    pathDistance: 0,
    targetDistance: 0,
    pathDirection: 1,
    pauseTimer: 0,
    targetX: 620,
    targetY: 650,
    pendingDialogue: null
  },
  brooksNpc: {
    initialized: false,
    mode: "patrol",
    x: 165,
    y: 1132,
    facing: "up",
    isMoving: false,
    walkAnimTime: 0,
    targetX: 165,
    targetY: 1132,
    waitTimer: 0,
    entryPauseTimer: 0,
    pendingDialogue: null
  },
  libraryTask: {
    brooksInside: false,
    sortingActive: false,
    sortingProgress: 0,
    bookOrder: [],
    selectedBookIndex: null,
    sortMoves: 0,
    sortingStatus: "idle",
    sortingMessage: "",
    completionTimer: 0
  },
  cellInspection: {
    phase: "idle",
    result: null,
    warden: { x: 180, y: 620, targetX: 640, targetY: 720, facing: "right", isMoving: false, walkAnimTime: 0, patrolIndex: 0 },
    guard: { x: 180, y: 650, targetX: 486, targetY: 780, facing: "right", isMoving: false, walkAnimTime: 0 },
    escortGuard: { x: 160, y: 710, targetX: 684, targetY: 544, facing: "right", isMoving: false, walkAnimTime: 0 },
    escortAssembleRouteIndex: 0,
    escortRouteIndex: 0
  },
  hammerHidePuzzle: {
    active: false,
    dragging: false,
    inputMode: null,
    dragX: 0,
    dragY: 0,
    dragOffsetX: 0,
    dragOffsetY: 0,
    statusMessage: ""
  },
  wallHole: {
    revealed: false,
    introPending: false,
    exitPending: false,
    timer: 0
  },
  dig: {
    mode: "firstDig",
    playerX: 0,
    playerY: 0,
    playerW: 0,
    playerH: 0,
    facing: "right",
    isMoving: false,
    walkAnimTime: 0,
    digProgress: 0,
    isDigging: false,
    digAnimTime: 0,
    pipeEntryTimer: 0
  },
  pipe: {
    playerX: 0,
    playerY: 0,
    playerW: 0,
    playerH: 0,
    facing: "right",
    isMoving: false,
    walkAnimTime: 0,
    isSmashing: false,
    smashAnimTime: 0,
    smashHoldTime: 0,
    smashHoldActive: false,
    smashSuccessCount: 0,
    smashCompleted: false,
    smashWindowScored: false,
    cueVisible: false,
    cueLit: false,
    cueTimer: 0,
    cueProgress: 0,
    nextCueDelay: 0,
    smashHintTimer: 0,
    wasInSmashZone: false,
    phase: "smash",
    crawlAnimTime: 0,
    drownTimer: 0,
    victory: false,
    victoryPhase: "none",
    victoryTimer: 0,
    victoryImageTimer: 0,
    victoryQuoteAudioPlayed: false,
    endingOpened: false
  },
  soilDump: {
    progress: 0,
    completedCount: 0,
    active: false,
    animTime: 0,
    guardAlerted: false
  },
  office: {
    mode: "story",
    wardenPhase: "waiting",
    wardenX: 884,
    wardenY: 590,
    wardenFacing: "left",
    wardenMoving: false,
    wardenWalkAnimTime: 0,
    embroideryChecked: false,
    safeViewOpen: false,
    safeStage: "closed",
    curtainsClosed: false,
    inspectionScheduled: false,
    inspectionTimer: 0,
    inspectionHideTimer: 0,
    inspectionVisitTimer: 0,
    inspectionVisitorKind: null,
    inspectionActor: {
      x: 632,
      y: 1124,
      facing: "up",
      visualFacing: "up",
      isMoving: false,
      walkAnimTime: 0,
      patrolIndex: 0
    }
  },
  officeFirstWarningSeen: false,
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
  sideRoute: {
    active: false,
    stage: "none",
    warningCooldown: 0,
    warningRemarkStartedAt: -1,
    yardTrialActive: false,
    yardTrialLineIndex: 0,
    yardTrialLineTimer: 0,
    warden: { x: 1042, y: 900, facing: "down", isMoving: false, walkAnimTime: 0 },
    guards: [
      { x: 1030, y: 970, facing: "right", visualFacing: "right", isMoving: false, walkAnimTime: 0 },
      { x: 1130, y: 970, facing: "left", visualFacing: "left", isMoving: false, walkAnimTime: 0 }
    ],
    backgroundCrowd: [],
    crowdFidgetTimer: 0,
    crowdChatterTimer: 0,
    crowdChatterIndex: 0,
    crowdRemarkStartedAt: -1,
    solitaryStoneRead: false,
    solitarySlept: false,
    solitarySleepPhase: "idle",
    solitarySleepTimer: 0,
    brooksDialogueStarted: false,
    cellSleepPhase: "idle",
    cellSleepTimer: 0,
    morningGuardPaths: [],
    morningGateCaptureTimer: 0,
    officePhase: "idle",
    officeEvidenceFound: false,
    officeHideTimer: 0,
    officeActors: {
      warden: { x: 884, y: 590, facing: "left", isMoving: false, walkAnimTime: 0 },
      guard: { x: 806, y: 650, facing: "left", visualFacing: "left", isMoving: false, walkAnimTime: 0 }
    }
  },
  posterType: null,
  posterHung: false,
  posterChoiceActive: false,
  posterPickupAnimation: {
    active: false,
    posterId: null,
    elapsed: 0
  },
  radioRepairActive: false,
  radioRepairProgress: 0,
  radioGear: {
    track: "outer",
    angle: -Math.PI / 2,
    targets: [],
    collectedIds: [],
    status: "idle",
    completionTimer: 0
  },
  twentyYearsPassed: false,
  postMontageRedDialogueActive: false,
  postMontageRedSpoken: false,
  pipeMazeActive: false,
  mapRevealActive: false,
  mapDrawn: false,
  hasMap: false,
  failReason: "",
  failRecovery: null,
  failRecoveryTimer: 0,
  redDialogueActive: false,
  redHammerDelivered: false,
  redPosterDialogueActive: false,
  redHammerDeliveryDialogueActive: false,
  redPosterDeliveryDialogueActive: false,
  brooksDialogueActive: false,
  brooksDialogueKind: null,
  brooksBibleDelivered: false,
  sideTalk: {
    refreshRequired: false,
    available: false,
    activeNpcId: null,
    queuedNpcId: null,
    afterAction: null
  },
  guardConversation: {
    selectedSource: null,
    activeSource: null,
    activeGuardIndex: null
  },
  ambientConversation: {
    initialized: false,
    cooldown: 0,
    activeTopicId: null,
    participantKeys: [],
    lineIndex: 0,
    lineTimer: 0,
    observeTimer: 0,
    evidenceQualified: false,
    consecutiveCasual: 0,
    casualBag: [],
    pendingNotice: null,
    noticeText: "",
    noticeTimer: 0
  },
  evidenceViewer: {
    activeEvidenceId: null
  },
  secrets: {
    menuClicks: 0,
    wallChecks: 0,
    montageWait: 0,
    yardCorners: {},
    officeSecretRead: false
  },
  achievementPanelOpen: false,
  interactables: {
    tv: {
      x: 900,
      y: 300,
      w: 190,
      h: 120
    }
  },
  debug: {
    pointerX: 0,
    pointerY: 0
  }
};

const AchievementDefinitions = [
  { id: "wall_creator", title: "墙后之人", description: "连续点击开场界面右侧的人物三次。", icon: "wall_creator.webp" },
  { id: "wall_voice", title: "墙后的声音", description: "获得海报前调查牢房墙面三次。", icon: "wall_voice.webp" },
  { id: "radio_signal", title: "来自墙外的信号", description: "在旧收音机中捕捉到隐藏信号。", icon: "radio_signal.webp" },
  { id: "wait_together", title: "陪他等一会", description: "陪安迪安静地等待二十年。", icon: "wait_together.webp" },
  { id: "beyond_evidence", title: "证据之外", description: "调包账本后调查幕后主使的办公桌。", icon: "beyond_evidence.webp" },
  { id: "look_back", title: "回头看了一眼", description: "在水管爬行阶段被淹死。", icon: "look_back.webp" },
  { id: "map_edge", title: "地图之外", description: "接触院子最下方的墙壁。", icon: "map_edge.webp" },
  { id: "every_story", title: "每个人都有故事", description: "收集到五份证据。", icon: "every_story.webp" },
  { id: "bookshelf_secret", title: "书架背面", description: "抵达图书馆上方三分之一的区域。", icon: "bookshelf_secret.webp" },
  { id: "four_corners", title: "高墙的四个角", description: "踏遍监狱院子的四个角落。", icon: "four_corners.webp" }
];

const AchievementDefinitionsById = Object.fromEntries(
  AchievementDefinitions.map((definition) => [definition.id, definition])
);

const AchievementPanelButtonRect = { x: 500, y: 386, w: 280, h: 62 };

const AchievementSystem = {
  storageKey: "beyond_walls_achievements_v1",
  unlocked: Object.create(null),
  unlockedCount: 0,
  images: Object.create(null),
  toast: null,
  toastTimer: 0,

  init() {
    try {
      const stored = JSON.parse(window.localStorage.getItem(this.storageKey) || "{}") || {};
      this.unlocked = Object.create(null);
      AchievementDefinitions.forEach((definition) => {
        if (stored[definition.id]) {
          this.unlocked[definition.id] = stored[definition.id];
        }
      });
    } catch (error) {
      this.unlocked = Object.create(null);
    }
    this.unlockedCount = Object.keys(this.unlocked).length;

    AchievementDefinitions.forEach((definition) => {
      const image = new Image();
      image.decoding = "async";
      image.src = "../assets/main/images/achievements/" + definition.icon;
      this.images[definition.id] = image;
    });
  },

  unlock(id) {
    if (this.unlocked[id]) {
      return false;
    }
    const definition = AchievementDefinitionsById[id];
    if (!definition) {
      return false;
    }

    this.unlocked[id] = { unlockedAt: Date.now() };
    this.unlockedCount += 1;
    try {
      window.localStorage.setItem(this.storageKey, JSON.stringify(this.unlocked));
    } catch (error) {
      if (DEBUG_MODE) {
        console.warn(error);
      }
    }
    this.toast = definition;
    this.toastTimer = 10;
    return true;
  },

  update(dt) {
    if (this.toastTimer <= 0) {
      return;
    }
    this.toastTimer = Math.max(0, this.toastTimer - dt);
    if (this.toastTimer === 0) {
      this.toast = null;
    }
  },

  getUnlockedCount() {
    return this.unlockedCount;
  },

  renderToast(ctx) {
    if (!this.toast) {
      return;
    }
    const x = 820;
    const y = 24;
    const w = 430;
    const h = 94;
    ctx.save();
    ctx.fillStyle = "rgba(8, 8, 8, 0.94)";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "#b3914d";
    ctx.lineWidth = 4;
    ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
    const image = this.images[this.toast.id];
    if (image && image.complete && image.naturalWidth > 0) {
      ctx.drawImage(image, x + 12, y + 12, 70, 70);
    }
    ctx.fillStyle = "#c6a55e";
    ctx.font = "16px 'Microsoft YaHei', monospace";
    ctx.textAlign = "left";
    ctx.fillText("成就已解锁", x + 96, y + 28);
    ctx.fillStyle = "#fff1c8";
    ctx.font = "bold 25px 'Microsoft YaHei', monospace";
    ctx.fillText(this.toast.title, x + 96, y + 61);
    ctx.restore();
  },

  renderPanel(ctx) {
    ctx.save();
    ctx.fillStyle = "rgba(5, 5, 5, 0.97)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#f5df9d";
    ctx.font = "bold 34px 'Microsoft YaHei', monospace";
    ctx.textAlign = "center";
    ctx.fillText("成就 " + this.getUnlockedCount() + " / " + AchievementDefinitions.length, CANVAS_WIDTH / 2, 54);

    AchievementDefinitions.forEach((definition, index) => {
      const col = index % 5;
      const row = Math.floor(index / 5);
      const x = 42 + col * 246;
      const y = 82 + row * 275;
      const unlocked = Boolean(this.unlocked[definition.id]);
      ctx.fillStyle = unlocked ? "#17140e" : "#0d0d0d";
      ctx.fillRect(x, y, 212, 246);
      ctx.strokeStyle = unlocked ? "#92763d" : "#343434";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, 212, 246);
      const image = this.images[definition.id];
      if (unlocked && image && image.complete && image.naturalWidth > 0) {
        ctx.drawImage(image, x + 18, y + 16, 176, 176);
      } else {
        ctx.fillStyle = "#050505";
        ctx.fillRect(x + 18, y + 16, 176, 176);
        ctx.fillStyle = "#555";
        ctx.font = "bold 46px monospace";
        ctx.fillText("?", x + 106, y + 122);
      }
      ctx.fillStyle = unlocked ? "#f3dfaa" : "#777";
      ctx.font = "bold 18px 'Microsoft YaHei', monospace";
      ctx.fillText(unlocked ? definition.title : "隐藏成就", x + 106, y + 218);
    });

    ctx.fillStyle = "#aaa18e";
    ctx.font = "18px 'Microsoft YaHei', monospace";
    ctx.fillText("点击画面、空格键或 Esc 返回暂停菜单", CANVAS_WIDTH / 2, 685);
    ctx.restore();
  }
};

const CellLayout = {
  imageWidth: 1254,
  imageHeight: 1254,
  walkPolygon: [
    { x: 184, y: 1106 },
    { x: 184, y: 402 },
    { x: 1085, y: 402 },
    { x: 1085, y: 1106 }
  ],
  bed: { x: 360, y: 292, w: 520, h: 196 },
  // 床前留出一小段地面作为交互位；角色不能再走到床面上。
  bedInteractZone: { x: 386, y: 496, w: 468, h: 90 },
  bedFrame: { x: 352, y: 284, w: 542, h: 214 },
  bedPillow: { x: 398, y: 350, w: 88, h: 110 },
  pictureFrame: { x: 606, y: 135, w: 194, h: 133 },
  pictureCoverFrame: { x: 560, y: 108, w: 292, h: 182 },
  // 站到墙画正前方才可操作，避免在房间中部误触发墙面剧情。
  pictureInteractZone: { x: 566, y: 494, w: 280, h: 98 },
  pictureStandPoint: { x: 688, y: 588 },
  // 检查房间时固定站在床尾与椅子之间的空位，不再先躺到床上。
  inspectionStandPoint: { x: 620, y: 544 },
  // 保持原有入口宽度，向下覆盖整扇锁门的下半段。
  doorZone: { x: 176, y: 506, w: 104, h: 284 },
  // 锁门的透视边缘：顶点收进铁栏门扇本体，避开两侧墙体与地面。
  doorFrame: [
    { x: 99, y: 555 },
    { x: 174, y: 625 },
    { x: 174, y: 790 },
    { x: 99, y: 720 }
  ],
  solidBlocks: [
    { x: 360, y: 292, w: 520, h: 196 },
    { x: 500, y: 598, w: 248, h: 242 },
    { x: 516, y: 810, w: 236, h: 86 },
    { x: 566, y: 840, w: 110, h: 138 },
    { x: 874, y: 334, w: 118, h: 174 },
    { x: 982, y: 344, w: 105, h: 138 }
  ],
  tableDrawZone: { x: 432, y: 548, w: 386, h: 398 }
};

const CorridorLayout = {
  imageWidth: 750,
  imageHeight: 1229,
  // 地面边界以玩家脚点判定；三个凹入区只用来靠近门，不允许穿过门框。
  walkPolygon: [
    { x: 145, y: 170 },
    { x: 640, y: 170 },
    { x: 640, y: 260 },
    { x: 675, y: 260 },
    { x: 675, y: 448 },
    { x: 640, y: 448 },
    { x: 640, y: 656 },
    { x: 675, y: 656 },
    { x: 675, y: 852 },
    { x: 640, y: 852 },
    { x: 640, y: 1162 },
    { x: 466, y: 1162 },
    { x: 466, y: 1210 },
    { x: 284, y: 1210 },
    { x: 284, y: 1162 },
    { x: 145, y: 1162 }
  ],
  portals: {
    solitary: { x: 606, y: 286, w: 68, h: 156 },
    cell: { x: 606, y: 674, w: 68, h: 166 },
    yard: { x: 292, y: 1138, w: 168, h: 70 }
  },
  spawns: {
    solitary: { x: 610, y: 382, facing: "left" },
    cell: { x: 610, y: 770, facing: "left" },
    yard: { x: 376, y: 1120, facing: "up" }
  },
  escortRoutes: {
    toYard: [
      {
        player: { x: 610, y: 770 },
        guards: [{ x: 552, y: 738 }, { x: 608, y: 686 }]
      },
      {
        player: { x: 530, y: 820 },
        guards: [{ x: 470, y: 820 }, { x: 590, y: 820 }]
      },
      {
        player: { x: 410, y: 1040 },
        guards: [{ x: 350, y: 1040 }, { x: 470, y: 1040 }]
      },
      {
        player: { x: 376, y: 1120 },
        guards: [{ x: 318, y: 1120 }, { x: 434, y: 1120 }]
      }
    ],
    toSolitary: [
      {
        player: { x: 376, y: 1120 },
        guards: [{ x: 318, y: 1120 }, { x: 434, y: 1120 }]
      },
      {
        player: { x: 450, y: 1000 },
        guards: [{ x: 390, y: 1000 }, { x: 510, y: 1000 }]
      },
      {
        player: { x: 480, y: 560 },
        guards: [{ x: 420, y: 560 }, { x: 540, y: 560 }]
      },
      {
        player: { x: 580, y: 382 },
        guards: [{ x: 520, y: 382 }, { x: 632, y: 330 }]
      }
    ]
  }
};

const HammerHidePuzzleLayout = {
  panel: { x: 150, y: 74, w: 980, h: 572 },
  bibleSlot: { x: 238, y: 214, w: 322, h: 300 },
  hammerSlot: { x: 720, y: 214, w: 322, h: 300 },
  bibleArt: { x: 284, y: 250, w: 230, h: 230 },
  hammerStart: { x: 776, y: 260 },
  hammerSize: 210
};

const CellInspectionLayout = {
  entryWarden: { x: 194, y: 640 },
  entryGuard: { x: 194, y: 682 },
  wardenEntryTarget: { x: 360, y: 720 },
  guardTableTarget: { x: 488, y: 794 },
  exitWarden: { x: 194, y: 640 },
  exitGuard: { x: 194, y: 686 },
  escortGuardWalkableEntry: { x: 194, y: 742 },
  wardenPatrol: [
    { x: 360, y: 720 },
    { x: 440, y: 720 },
    { x: 440, y: 940 },
    { x: 360, y: 940 }
  ],
  escortAssemble: {
    leftGuard: { x: 558, y: 544 },
    rightGuard: { x: 682, y: 544 }
  },
  escortAssembleRoute: [
    { leftGuard: { x: 450, y: 794 }, rightGuard: { x: 430, y: 794 } },
    { leftGuard: { x: 450, y: 560 }, rightGuard: { x: 430, y: 560 } },
    { leftGuard: { x: 558, y: 544 }, rightGuard: { x: 682, y: 544 } }
  ],
  escortRoute: [
    { player: { x: 620, y: 544 }, leftGuard: { x: 558, y: 544 }, rightGuard: { x: 682, y: 544 } },
    { player: { x: 540, y: 560 }, leftGuard: { x: 478, y: 560 }, rightGuard: { x: 602, y: 560 } },
    { player: { x: 454, y: 570 }, leftGuard: { x: 392, y: 570 }, rightGuard: { x: 516, y: 570 } },
    { player: { x: 420, y: 620 }, leftGuard: { x: 358, y: 620 }, rightGuard: { x: 482, y: 620 } },
    { player: { x: 248, y: 656 }, leftGuard: { x: 186, y: 656 }, rightGuard: { x: 310, y: 656 } }
  ]
};

const SideRouteYardLayout = {
  yardEntry: {
    player: { x: 1080, y: 966 },
    guards: [
      { x: 1025, y: 966 },
      { x: 1135, y: 966 }
    ]
  },
  playerFoot: { x: 622, y: 694 },
  warden: { x: 622, y: 476 },
  guards: [
    { x: 556, y: 694 },
    { x: 688, y: 694 }
  ],
  // 围观者使用固定站位、错开的起步时间和不同速度。
  // 演出看起来不整齐，但运行时不生成随机目标或巡游路径。
  crowdPlans: [
    { startX: 350, startY: 320, x: 506, y: 620, delay: 0.00, speed: 52 },
    { startX: 350, startY: 1060, x: 640, y: 592, delay: 0.55, speed: 68 },
    { startX: 950, startY: 800, x: 774, y: 632, delay: 1.20, speed: 56 },
    { startX: 516, startY: 960, x: 456, y: 704, delay: 0.25, speed: 72 },
    { startX: 918, startY: 916, x: 806, y: 738, delay: 0.90, speed: 50 },
    { startX: 760, startY: 540, x: 522, y: 776, delay: 1.55, speed: 64 },
    { startX: 420, startY: 760, x: 674, y: 804, delay: 0.70, speed: 58 },
    { startX: 165, startY: 1132, x: 742, y: 766, delay: 1.35, speed: 70 }
  ],
  escortExit: {
    player: { x: 1140, y: 970 },
    guards: [
      { x: 1084, y: 970 },
      { x: 1190, y: 970 }
    ]
  },
  brooksMeeting: { x: 192, y: 1124 }
};

const SideRouteMorningLayout = {
  guardPaths: [
    [
      { x: 516, y: 330 },
      { x: 638, y: 330 },
      { x: 690, y: 294 },
      { x: 568, y: 294 }
    ],
    [
      { x: 612, y: 354 },
      { x: 728, y: 354 },
      { x: 728, y: 280 },
      { x: 612, y: 280 }
    ],
    [
      { x: 482, y: 302 },
      { x: 550, y: 260 },
      { x: 670, y: 260 },
      { x: 738, y: 302 }
    ]
  ],
  captureOffsets: [
    { x: -58, y: 12 },
    { x: 58, y: 12 },
    { x: 0, y: -60 }
  ]
};

const SideRouteOfficeLayout = {
  deskZone: { x: 708, y: 612, w: 228, h: 190 },
  curtainZone: { x: 154, y: 320, w: 176, h: 274 },
  curtainHideFoot: { x: 230, y: 520 },
  actorsEntry: {
    warden: { x: 816, y: 820 },
    guard: { x: 720, y: 820 }
  },
  wardenPacePoints: [
    { x: 816, y: 820 },
    { x: 936, y: 820 }
  ]
};

const SolitaryLayout = {
  // 用户提供的方形小黑屋图会以 contain 方式居中显示在 1280×720 Canvas 内。
  // 坐标是对应显示后的 Canvas 坐标：左侧门、左上石板、右上草席（杂草）。
  imageWidth: 1254,
  imageHeight: 1254,
  // 仅允许在地面移动；顶部墙面、左门本体、右上草席均不可直接走入。
  walkBounds: { x: 350, y: 238, w: 580, h: 402 },
  walkPolygon: [
    { x: 350, y: 238 },
    { x: 606, y: 238 },
    { x: 606, y: 404 },
    { x: 930, y: 404 },
    { x: 930, y: 640 },
    { x: 350, y: 640 }
  ],
  // 三个交互点都放在物件前的地面边缘，玩家不会走到石板、门或草席内部。
  stoneZone: { x: 362, y: 226, w: 136, h: 70 },
  matZone: { x: 606, y: 344, w: 314, h: 58 },
  matInteractionZone: { x: 606, y: 404, w: 314, h: 48 },
  doorZone: { x: 344, y: 330, w: 76, h: 152 },
  spawnFoot: { x: 624, y: 520 },
  matSleepFoot: { x: 766, y: 374 }
};

const DigLayout = {
  imageWidth: 1672,
  imageHeight: 941,
  walkRect: { x: 94, y: 354, w: 1466, h: 223 },
  leftExitZone: { x: 97, y: 355, w: 122, h: 210 },
  digZone: { x: 1430, y: 358, w: 128, h: 206 }
};

const FinalDigLayout = {
  imageWidth: 1672,
  imageHeight: 941,
  walkRect: { x: 0, y: 332, w: 1672, h: 282 },
  entryZone: { x: 73, y: 352, w: 131, h: 251 },
  pipeEntryZone: { x: 1602, y: 336, w: 62, h: 270 }
};

const PipeLayout = {
  imageWidth: 1536,
  imageHeight: 1024,
  walkRect: { x: 35, y: 255, w: 981, h: 158 },
  entryZone: { x: 40, y: 265, w: 97, h: 135 },
  smashZone: { x: 889, y: 264, w: 134, h: 133 },
  dropZone: { x: 826, y: 360, w: 98, h: 80 },
  crawlBaselineY: 526,
  crawlStartX: 704,
  drownLine: { x: 630, y: 506, w: 76, h: 8 }
};

const YardLayout = {
  imageWidth: 1234,
  imageHeight: 1275,
  openingEntryPoint: { x: 620, y: 275 },
  entryPoint: { x: 1080, y: 965 },
  officeReturnPoint: { x: 165, y: 545 },
  libraryReturnPoint: { x: 165, y: 1132 },
  libraryEntryPoint: { x: 165, y: 1104 },
  walkPolygon: [
    { x: 295, y: 189 },
    { x: 367, y: 213 },
    { x: 440, y: 180 },
    { x: 447, y: 219 },
    { x: 493, y: 215 },
    { x: 750, y: 217 },
    { x: 790, y: 217 },
    { x: 790, y: 178 },
    { x: 879, y: 216 },
    { x: 936, y: 180 },
    { x: 1199, y: 180 },
    { x: 1199, y: 365 },
    { x: 1008, y: 360 },
    { x: 1008, y: 924 },
    { x: 1193, y: 924 },
    { x: 1194, y: 1190 },
    { x: 40, y: 1190 },
    { x: 40, y: 1094 },
    { x: 291, y: 1092 },
    { x: 294, y: 736 },
    { x: 43, y: 736 },
    { x: 43, y: 503 },
    { x: 298, y: 503 },
    { x: 295, y: 189 }
  ],
  obstacleRects: [
    { x: 886, y: 236, w: 149, h: 71 },
    { x: 369, y: 928, w: 82, h: 66 }
  ],
  obstacleCircles: [
    { x: 383, y: 576, r: 38 },
    { x: 472, y: 503, r: 31 }
  ],
  interactions: [
    { id: "prisonGate", label: "脱离黑墙庄园", rect: { x: 505, y: 218, w: 230, h: 82 }, tint: "#f2d26d" },
    { id: "cellDoor", label: "进入房间", rect: { x: 1032, y: 925, w: 125, h: 92 }, tint: "#b977ff" },
    { id: "wardenOffice", label: "幕后主使办公室", rect: { x: 96, y: 504, w: 130, h: 92 }, tint: "#ff9bd8" },
    { id: "library", label: "图书馆", rect: { x: 96, y: 1093, w: 134, h: 72 }, tint: "#e0b45d" },
    // 地图偏右侧深棕色泥地：椭圆区域既是撒土判定区，也是看守的巡逻范围。
    { id: "soil", label: "撒土区", shape: "ellipse", rect: { x: 600, y: 360, w: 380, h: 560 }, tint: "#4fc3ff" }
  ],
  npcs: [
    {
      id: "red",
      assetKey: "red",
      name: "瑞德",
      x: 620,
      y: 650,
      h: YARD_CHARACTER_HEIGHT,
      baseFacing: "down",
      patrolSpeed: RED_PATROL_SPEED
    },
    { id: "brooks", assetKey: "brooks", name: "老布", x: 165, y: 1132, h: YARD_CHARACTER_HEIGHT, baseFacing: "up" }
  ],
  backgroundPrisoners: [
    {
      assetKey: "prisoner_01",
      h: YARD_CHARACTER_HEIGHT,
      speed: 0.075,
      phase: 0.05,
      path: [
        { x: 350, y: 320 },
        { x: 720, y: 320 },
        { x: 720, y: 390 },
        { x: 350, y: 390 }
      ]
    },
    {
      assetKey: "prisoner_02",
      h: YARD_CHARACTER_HEIGHT,
      speed: 0.095,
      phase: 0.38,
      path: [
        { x: 350, y: 780 },
        { x: 350, y: 1060 },
        { x: 540, y: 1060 },
        { x: 540, y: 780 }
      ]
    },
    {
      assetKey: "prisoner_03",
      h: YARD_CHARACTER_HEIGHT,
      speed: 0.065,
      phase: 0.72,
      path: [
        { x: 700, y: 800 },
        { x: 950, y: 800 },
        { x: 950, y: 950 },
        { x: 700, y: 950 }
      ]
    }
  ]
};

const YardNavigationMapLayout = {
  compactFrame: { x: 52, y: 53, w: 148, h: 153 },
  compactPlot: { x: 52, y: 53, w: 148, h: 153 },
  expandedFrame: { x: 176, y: 36, w: 928, h: 648 },
  expandedPlot: { x: 366, y: 88, w: 548, h: 566 },
  expandedCloseButton: { x: 1030, y: 58, w: 46, h: 46 }
};

const YardNavigationMapLandmarks = [
  { id: "prisonGate", label: "大门", x: 620, y: 245 },
  { id: "wardenOffice", label: "办公室", x: 160, y: 550 },
  { id: "library", label: "图书馆", x: 160, y: 1125 },
  { id: "cellDoor", label: "房间", x: 1094, y: 972 },
  { id: "soil", label: "劳作区", x: 790, y: 640 }
];

const YardNavigationMapLegendItems = [
  { color: "#76d7ff", label: "安迪", shape: "circle" },
  { color: "#ffe36f", label: "当前主线方向", shape: "ring" },
  { color: "#292925", label: "尚未探索" }
];

const OpeningYardLayout = {
  imageWidth: 1254,
  imageHeight: 1254,
  entryPoint: { x: 626, y: 392 },
  gateZone: { x: 470, y: 184, w: 317, h: 78 },
  fogRect: { x: 0, y: 40, w: 1254, h: 836 },
  // 以大门为直径、向院子内部展开的近半圆减速区。
  movementCenter: { x: 626, y: 184 },
  movementRadius: 284,
  outwardSlowdownDistance: 132,
  minimumOutwardSpeed: 20
};

const LibraryLayout = {
  imageWidth: 1254,
  imageHeight: 1254,
  spawnFoot: { x: 626, y: 978 },
  walkPolygon: [
    { x: 166, y: 276 },
    { x: 1088, y: 276 },
    { x: 1088, y: 1086 },
    { x: 758, y: 1086 },
    { x: 758, y: 1040 },
    { x: 496, y: 1040 },
    { x: 496, y: 1086 },
    { x: 166, y: 1086 }
  ],
  obstacleRects: [
    { x: 292, y: 364, w: 672, h: 160 },
    { x: 462, y: 592, w: 258, h: 154 },
    { x: 734, y: 610, w: 92, h: 102 },
    { x: 292, y: 790, w: 672, h: 168 }
  ],
  brooks: { x: 626, y: 766, h: YARD_CHARACTER_HEIGHT, facing: "down" },
  exitZone: { x: 496, y: 996, w: 262, h: 44 }
};

const OfficeLayout = {
  imageWidth: 1254,
  imageHeight: 1254,
  spawnFoot: { x: 632, y: 1034 },
  walkPolygon: [
    { x: 154, y: 320 },
    { x: 1018, y: 320 },
    { x: 1032, y: 986 },
    { x: 728, y: 986 },
    { x: 728, y: 1072 },
    { x: 536, y: 1072 },
    { x: 536, y: 986 },
    { x: 154, y: 986 }
  ],
  obstacleRects: [
    { x: 410, y: 423, w: 446, h: 185 }
  ],
  embroideryZone: { x: 42, y: 392, w: 236, h: 236 },
  doorZone: { x: 536, y: 986, w: 192, h: 86 },
  safeLedgerClickRect: { x: 82, y: 116, w: 620, h: 258 },
  wardenStart: { x: 884, y: 590 },
  wardenExit: { x: 632, y: 1124 }
};

// ======================================================
// 5. Input System
// ======================================================
const MOVEMENT_KEYS = ["w", "a", "s", "d"];

const InputSystem = {
  keys: Object.create(null),
  externalKeys: Object.create(null),
  pressed: Object.create(null),
  movementSource: null,
  externalActionHeld: false,
  domControlsEnabled: false,
  pointerPressed: false,
  pointerJustPressed: false,
  pointerX: 0,
  pointerY: 0,
  joystick: {
    active: false,
    pointerId: null,
    baseX: 122,
    baseY: 598,
    knobX: 122,
    knobY: 598,
    radius: 72,
    vectorX: 0,
    vectorY: 0
  },
  actionButton: {
    x: 1154,
    y: 602,
    radius: 50,
    held: false,
    justPressed: false
  },
  startButton: {
    x: 490,
    y: 410,
    w: 300,
    h: 74
  },

  init(canvas) {
    this.domControlsEnabled = Boolean(window.BeyondWallsControls);
    window.addEventListener("keydown", (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const key = normalizeGameplayKey(event.key, event.code);
      if (!this.handleKeyboardEvent("keydown", event.key, event.code, event.repeat)) {
        return;
      }
      if (key === " " || key === "escape" || MOVEMENT_KEYS.includes(key)) {
        event.preventDefault();
      }
    });

    // 在捕获阶段先处理松键。弹层和嵌入互动空间可能会在后续阶段
    // 截断键盘事件，如果错过 keyup，就会遗留一个永远为 true 的移动键。
    window.addEventListener("keyup", (event) => {
      this.handleKeyboardEvent("keyup", event.key, event.code);
    }, true);

    const resetInterruptedInput = () => {
      this.resetAllInput();
    };

    // 浏览器失焦、切后台时不一定会把 keyup / pointerup 交给页面。
    // 统一清空输入，避免角色保留最后一次移动方向。
    window.addEventListener("blur", resetInterruptedInput);
    window.addEventListener("pagehide", resetInterruptedInput);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        resetInterruptedInput();
      }
    });

    canvas.addEventListener("pointerdown", (event) => {
      requestGameBgmStart();
      const point = getCanvasPoint(event.clientX, event.clientY);
      this.handleCanvasPress(point, event.pointerId, canvas);
      event.preventDefault();
    });

    canvas.addEventListener("mousedown", (event) => {
      requestGameBgmStart();
      if (this.pointerPressed) {
        return;
      }

      const point = getCanvasPoint(event.clientX, event.clientY);
      this.handleCanvasPress(point, "mouse", null);
      event.preventDefault();
    });

    canvas.addEventListener("pointermove", (event) => {
      const point = getCanvasPoint(event.clientX, event.clientY);
      this.pointerX = point.x;
      this.pointerY = point.y;
      GameState.debug.pointerX = point.x;
      GameState.debug.pointerY = point.y;

      if (this.joystick.active && this.joystick.pointerId === event.pointerId) {
        this.updateJoystick(point.x, point.y);
      }
      event.preventDefault();
    });

    canvas.addEventListener("pointerup", (event) => {
      const point = getCanvasPoint(event.clientX, event.clientY);
      this.pointerX = point.x;
      this.pointerY = point.y;
      GameState.debug.pointerX = point.x;
      GameState.debug.pointerY = point.y;
      this.releasePointer(event.pointerId);
      event.preventDefault();
    });

    canvas.addEventListener("pointercancel", (event) => {
      this.releasePointer(event.pointerId);
      event.preventDefault();
    });

    canvas.addEventListener("lostpointercapture", (event) => {
      this.releasePointer(event.pointerId);
    });

    canvas.addEventListener("mouseup", (event) => {
      const point = getCanvasPoint(event.clientX, event.clientY);
      this.pointerX = point.x;
      this.pointerY = point.y;
      GameState.debug.pointerX = point.x;
      GameState.debug.pointerY = point.y;
      this.releasePointer("mouse");
      event.preventDefault();
    });
  },

  handleKeyboardEvent(eventType, rawKey, rawCode, isRepeat) {
    const key = normalizeGameplayKey(rawKey, rawCode);
    if (!key || (eventType !== "keydown" && eventType !== "keyup")) {
      return false;
    }

    if (eventType === "keydown") {
      requestGameBgmStart();
      // 摇杆接管时会主动清掉旧 WASD。操作系统随后送来的按键重复
      // 不能把这个已取消的旧方向重新激活，必须松开后再按一次。
      if (MOVEMENT_KEYS.includes(key) && isRepeat && !this.keys[key]) {
        return true;
      }
      const wasDown = Boolean(this.keys[key]);
      if (!wasDown) {
        this.pressed[key] = true;
      }
      this.keys[key] = true;
      if (MOVEMENT_KEYS.includes(key) && !wasDown) {
        this.movementSource = "keyboard";
      }
    } else {
      this.keys[key] = false;
      if (MOVEMENT_KEYS.includes(key) &&
        this.movementSource === "keyboard" &&
        !this.hasKeyboardMovement()
      ) {
        // 不自动恢复另一个旧输入源，它可能正是丢失了释放事件的残留方向。
        this.movementSource = null;
      }
    }
    return true;
  },

  hasKeyboardMovement() {
    return MOVEMENT_KEYS.some((key) => Boolean(this.keys[key]));
  },

  clearKeyboardMovement() {
    MOVEMENT_KEYS.forEach((key) => {
      this.keys[key] = false;
      delete this.pressed[key];
    });
  },

  hasExternalJoystickMovement() {
    return MOVEMENT_KEYS.some((key) => Boolean(this.externalKeys[key]));
  },

  hasCanvasJoystickMovement() {
    return this.joystick.active &&
      Math.hypot(this.joystick.vectorX, this.joystick.vectorY) > 0.18;
  },

  hasJoystickMovement() {
    return this.hasExternalJoystickMovement() || this.hasCanvasJoystickMovement();
  },

  handleCanvasPress(point, pointerId, targetCanvas) {
    this.pointerPressed = true;
    this.pointerJustPressed = true;
    this.pointerX = point.x;
    this.pointerY = point.y;
    GameState.debug.pointerX = point.x;
    GameState.debug.pointerY = point.y;

    if (!this.domControlsEnabled && distance(point.x, point.y, this.joystick.baseX, this.joystick.baseY) <= this.joystick.radius + 26) {
      this.joystick.active = true;
      this.joystick.pointerId = pointerId;
      this.updateJoystick(point.x, point.y);
    } else if (!this.domControlsEnabled && distance(point.x, point.y, this.actionButton.x, this.actionButton.y) <= this.actionButton.radius) {
      this.actionButton.held = true;
      this.actionButton.justPressed = true;
    }

    if (targetCanvas && pointerId !== null) {
      targetCanvas.setPointerCapture(pointerId);
    }
  },

  updateJoystick(x, y) {
    const stick = this.joystick;
    const wasMoving = this.hasCanvasJoystickMovement();
    const dx = x - stick.baseX;
    const dy = y - stick.baseY;
    const len = Math.max(1, Math.hypot(dx, dy));
    const clamped = Math.min(stick.radius, len);
    stick.knobX = stick.baseX + dx / len * clamped;
    stick.knobY = stick.baseY + dy / len * clamped;
    stick.vectorX = dx / stick.radius;
    stick.vectorY = dy / stick.radius;

    const vectorLen = Math.hypot(stick.vectorX, stick.vectorY);
    if (vectorLen > 1) {
      stick.vectorX /= vectorLen;
      stick.vectorY /= vectorLen;
    }
    if (!wasMoving && this.hasCanvasJoystickMovement()) {
      this.clearKeyboardMovement();
      this.movementSource = "joystick";
    }
  },

  releasePointer(pointerId) {
    this.pointerPressed = false;
    if (this.joystick.pointerId === pointerId) {
      this.resetJoystick();
    }
    this.actionButton.held = false;
  },

  resetJoystick() {
    const wasActiveSource = this.movementSource === "joystick";
    this.joystick.active = false;
    this.joystick.pointerId = null;
    this.joystick.knobX = this.joystick.baseX;
    this.joystick.knobY = this.joystick.baseY;
    this.joystick.vectorX = 0;
    this.joystick.vectorY = 0;
    if (wasActiveSource && !this.hasExternalJoystickMovement()) {
      // 摇杆结束后必须停止，不回退到可能已经过期的 WASD 状态。
      this.movementSource = null;
    }
  },

  resetAllInput() {
    this.keys = Object.create(null);
    this.externalKeys = Object.create(null);
    this.pressed = Object.create(null);
    this.movementSource = null;
    this.externalActionHeld = false;
    this.pointerPressed = false;
    this.pointerJustPressed = false;
    this.resetJoystick();
    this.actionButton.held = false;
    this.actionButton.justPressed = false;
  },

  endFrame() {
    this.pressed = Object.create(null);
    this.pointerJustPressed = false;
    this.actionButton.justPressed = false;
  },

  isDown(key) {
    if (key === " ") {
      return Boolean(this.keys[key] || this.externalActionHeld);
    }
    if (MOVEMENT_KEYS.includes(key)) {
      if (this.movementSource === "keyboard") {
        return Boolean(this.keys[key]);
      }
      if (this.movementSource === "joystick") {
        return Boolean(this.externalKeys[key]);
      }
      return false;
    }
    return Boolean(this.keys[key] || this.externalKeys[key]);
  },

  isPressed(key) {
    return Boolean(this.pressed[key]);
  },

  setExternalMove(payload) {
    const nextKeys = payload && payload.keys ? payload.keys : {};
    const wasMoving = this.hasExternalJoystickMovement();
    MOVEMENT_KEYS.forEach((key) => {
      const nextDown = Boolean(nextKeys[key]);
      if (nextDown && !this.externalKeys[key] && !this.keys[key]) {
        this.pressed[key] = true;
      }
      this.externalKeys[key] = nextDown;
    });
    const isMoving = this.hasExternalJoystickMovement();
    if (!wasMoving && isMoving) {
      this.clearKeyboardMovement();
      this.movementSource = "joystick";
    } else if (wasMoving && !isMoving &&
      this.movementSource === "joystick" &&
      !this.hasCanvasJoystickMovement()
    ) {
      // 当前输入源释放后回到静止，不恢复任何旧方向。
      this.movementSource = null;
    }
  },

  setExternalAction(isDown) {
    const nextDown = Boolean(isDown);
    if (nextDown && !this.externalActionHeld && !this.keys[" "]) {
      this.pressed[" "] = true;
    }
    this.externalActionHeld = nextDown;
    if (nextDown) {
      requestGameBgmStart();
    }
  },

  getMoveVector() {
    let x = 0;
    let y = 0;

    if (this.movementSource === "joystick") {
      if (this.hasCanvasJoystickMovement()) {
        x = this.joystick.vectorX;
        y = this.joystick.vectorY;
      } else {
        if (this.externalKeys.a) x -= 1;
        if (this.externalKeys.d) x += 1;
        if (this.externalKeys.w) y -= 1;
        if (this.externalKeys.s) y += 1;
      }
    } else if (this.movementSource === "keyboard") {
      if (this.keys.a) x -= 1;
      if (this.keys.d) x += 1;
      if (this.keys.w) y -= 1;
      if (this.keys.s) y += 1;
    }

    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }

    return { x, y };
  },

  actionPressed(name) {
    if (name === "continueDialogue") return this.isPressed(" ") || this.pointerJustPressed || this.actionButton.justPressed;
    if (name === "interact") return this.isPressed(" ") || this.actionButton.justPressed;
    if (name === "selectEnding") return this.pointerJustPressed || this.isPressed(" ");
    if (name === "navigationMap") return this.isPressed("m");
    if (name === "pause") return this.isPressed("escape") || this.isPressed("p");
    return false;
  },

  actionDown(name) {
    if (name === "interact" || name === "continueDialogue") return this.isDown(" ") || this.actionButton.held;
    return false;
  },

  pointerInRect(rect) {
    return this.pointerX >= rect.x &&
      this.pointerX <= rect.x + rect.w &&
      this.pointerY >= rect.y &&
      this.pointerY <= rect.y + rect.h;
  }
};

function normalizeGameplayKey(key, code) {
  const codeKey = {
    KeyW: "w",
    KeyA: "a",
    KeyS: "s",
    KeyD: "d",
    KeyM: "m",
    KeyP: "p",
    Escape: "escape",
    Space: " "
  }[code];
  if (codeKey) {
    return codeKey;
  }
  if (typeof key !== "string" || key.length !== 1) {
    return "";
  }
  const normalized = key.toLowerCase();
  return normalized === "w" ||
    normalized === "a" ||
    normalized === "s" ||
    normalized === "d" ||
    normalized === "m" ||
    normalized === "p" ||
    normalized === "escape" ||
    normalized === " " ? normalized : "";
}

// ======================================================
// 5.5 Twenty Years Comic Overlay
// ======================================================
// 该演出保留在互动空间文档内，不再跳转到独立漫画页。最后一幕由访客点击画面
// 继续，随后才交还给蒙太奇场景处理“醒来”的淡入。
const TwentyYearsComic = {
  overlay: null,
  stage: null,
  shots: [],
  current: 0,
  timer: 0,
  active: false,
  finished: false,

  init() {
    if (this.overlay && this.stage && this.shots.length) {
      return true;
    }

    this.overlay = document.getElementById("twentyYearsComic");
    this.stage = document.getElementById("twentyYearsComicStage");
    this.shots = Array.from(document.querySelectorAll("#twentyYearsComic .comic-shot"));
    if (!this.overlay || !this.stage || !this.shots.length) {
      return false;
    }

    this.shots.forEach((shot) => this.preparePixelLayer(shot));
    this.stage.addEventListener("click", () => this.complete());
    this.stage.addEventListener("keydown", (event) => {
      if (!this.finished || event.key !== " ") {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      this.complete();
    });
    return true;
  },

  preparePixelLayer(shot) {
    const image = shot.querySelector(".comic-detail-layer");
    const pixelCanvas = shot.querySelector(".comic-pixel-layer");
    if (!image || !pixelCanvas) {
      return;
    }

    const pixelContext = pixelCanvas.getContext("2d");
    const draw = () => {
      if (!image.naturalWidth || !image.naturalHeight) {
        return;
      }

      const sourceAspect = image.naturalWidth / image.naturalHeight;
      const targetAspect = pixelCanvas.width / pixelCanvas.height;
      let sx = 0;
      let sy = 0;
      let sw = image.naturalWidth;
      let sh = image.naturalHeight;

      if (sourceAspect > targetAspect) {
        sw = image.naturalHeight * targetAspect;
        sx = (image.naturalWidth - sw) / 2;
      } else {
        sh = image.naturalWidth / targetAspect;
        sy = (image.naturalHeight - sh) / 2;
      }

      pixelContext.imageSmoothingEnabled = true;
      pixelContext.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
      pixelContext.drawImage(image, sx, sy, sw, sh, 0, 0, pixelCanvas.width, pixelCanvas.height);
    };

    if (image.complete && image.naturalWidth) {
      draw();
    } else {
      image.addEventListener("load", draw, { once: true });
    }
  },

  start() {
    if (!this.init()) {
      return false;
    }

    this.active = true;
    this.finished = false;
    this.current = 0;
    this.timer = 0;
    this.overlay.classList.add("is-open");
    this.overlay.classList.remove("is-finished");
    this.overlay.setAttribute("aria-hidden", "false");
    this.stage.setAttribute("aria-label", "二十年蒙太奇正在播放");
    this.shots.forEach((shot) => {
      shot.classList.remove("is-active", "is-leaving", "is-finished");
    });
    // 重新进入该剧情段时，强制浏览器重新开始首幕的淡入与推镜动画。
    void this.stage.offsetWidth;
    this.shots[0].classList.add("is-active");
    return true;
  },

  update(dt) {
    if (!this.active || this.finished) {
      return;
    }

    this.timer += dt;
    if (this.timer < TWENTY_YEARS_COMIC_SHOT_SECONDS) {
      return;
    }

    this.timer = 0;
    if (this.current < this.shots.length - 1) {
      this.showShot(this.current + 1);
    } else {
      this.finish();
    }
  },

  showShot(nextIndex) {
    const previous = this.shots[this.current];
    const next = this.shots[nextIndex];
    if (!previous || !next) {
      return;
    }

    previous.classList.remove("is-active", "is-finished");
    previous.classList.add("is-leaving");
    this.current = nextIndex;
    next.classList.remove("is-leaving", "is-finished");
    next.classList.add("is-active");
  },

  finish() {
    this.finished = true;
    const finalShot = this.shots[this.current];
    if (finalShot) {
      finalShot.classList.add("is-finished");
    }
    this.overlay.classList.add("is-finished");
    this.stage.setAttribute("aria-label", "二十年蒙太奇结束。点击画面，从床上醒来。");
  },

  complete() {
    if (!this.active || !this.finished) {
      return;
    }

    this.stop();
    setTwentyYearsMontagePhase("darkAfter");
  },

  stop() {
    if (!this.overlay) {
      return;
    }

    this.active = false;
    this.finished = false;
    this.timer = 0;
    this.overlay.classList.remove("is-open", "is-finished");
    this.overlay.setAttribute("aria-hidden", "true");
    this.stage.setAttribute("aria-label", "二十年蒙太奇正在播放");
    this.shots.forEach((shot) => shot.classList.remove("is-active", "is-leaving", "is-finished"));
  }
};

// ======================================================
// 6. Asset Loader
// ======================================================
const AssetStore = {
  images: Object.create(null),
  audio: Object.create(null)
};
const IMAGE_CACHE_BUDGET_BYTES = 160 * 1024 * 1024;
const INITIAL_IMAGE_KEYS = [
  "menu_frame_01",
  "menu_frame_02",
  "start_screen_selected"
];
let decodedImageCacheBytes = 0;

function loadAssets() {
  Object.keys(AssetManifest.images).forEach((key) => {
    loadImageAsset(key, AssetManifest.images[key]);
  });

  Object.keys(AssetManifest.audio).forEach((key) => {
    loadAudioAsset(key, AssetManifest.audio[key]);
  });

  INITIAL_IMAGE_KEYS.forEach((key) => {
    ensureImageAsset(key);
  });
}

function loadImageAsset(key, source) {
  const asset = normalizeImageAssetSource(source);
  const record = {
    key,
    root: asset.root,
    fileName: asset.fileName,
    element: null,
    loaded: false,
    loading: false,
    failed: false,
    decodedBytes: 0,
    lastUsedAt: 0
  };

  AssetStore.images[key] = record;
}

function ensureImageAsset(key) {
  const record = AssetStore.images[key];
  if (!record || record.loaded || record.loading || record.failed) {
    return record || null;
  }

  const image = new Image();
  record.element = image;
  record.loading = true;
  record.lastUsedAt = Date.now();
  image.decoding = "async";

  image.onload = () => {
    record.loading = false;
    record.loaded = true;
    record.decodedBytes = Math.max(1, image.naturalWidth) * Math.max(1, image.naturalHeight) * 4;
    decodedImageCacheBytes += record.decodedBytes;
    enforceImageCacheBudget(key);
  };

  image.onerror = () => {
    record.loading = false;
    record.failed = true;
  };

  image.src = buildEncodedAssetPath(record.root, record.fileName);
  return record;
}

function getImageAssetRecord(key) {
  const record = ensureImageAsset(key);
  if (record) {
    record.lastUsedAt = Date.now();
  }
  return record;
}

function releaseImageAsset(record) {
  if (!record || !record.loaded || !record.element) {
    return;
  }

  decodedImageCacheBytes = Math.max(0, decodedImageCacheBytes - record.decodedBytes);
  record.element.onload = null;
  record.element.onerror = null;
  record.element.removeAttribute("src");
  record.element = null;
  record.loaded = false;
  record.loading = false;
  record.decodedBytes = 0;
}

function enforceImageCacheBudget(protectedKey) {
  if (decodedImageCacheBytes <= IMAGE_CACHE_BUDGET_BYTES) {
    return;
  }

  const candidates = Object.keys(AssetStore.images)
    .filter((key) => key !== protectedKey)
    .map((key) => AssetStore.images[key])
    .filter((record) => record && record.loaded && !record.loading)
    .sort((a, b) => a.lastUsedAt - b.lastUsedAt);

  for (const record of candidates) {
    if (decodedImageCacheBytes <= IMAGE_CACHE_BUDGET_BYTES) {
      break;
    }
    releaseImageAsset(record);
  }
}

function normalizeImageAssetSource(source) {
  if (typeof source === "string") {
    return { root: IMAGE_ROOT, fileName: source };
  }

  return {
    root: source.root || IMAGE_ROOT,
    fileName: source.fileName
  };
}

function loadAudioAsset(key, source) {
  const asset = normalizeAudioAssetSource(source);
  const record = {
    key,
    root: asset.root,
    fileName: asset.fileName,
    element: null,
    loaded: false,
    failed: false
  };

  AssetStore.audio[key] = record;
}

function ensureAudioAsset(key) {
  const record = AssetStore.audio[key];
  if (!record || record.element || record.failed) {
    return record || null;
  }

  const audio = new Audio();
  record.element = audio;
  const markLoaded = () => {
    record.loaded = true;
  };

  audio.preload = "none";
  audio.addEventListener("loadeddata", markLoaded, { once: true });
  audio.addEventListener("canplaythrough", markLoaded, { once: true });
  audio.addEventListener("error", () => {
    record.failed = true;
  }, { once: true });
  audio.src = buildEncodedAssetPath(record.root, record.fileName);
  return record;
}

function normalizeAudioAssetSource(source) {
  if (typeof source === "string") {
    return { root: AUDIO_ROOT, fileName: source };
  }

  return {
    root: source.root || AUDIO_ROOT,
    fileName: source.fileName
  };
}

function buildEncodedAssetPath(root, fileName) {
  const encodedRoot = root.split("/").map((part) => encodeURIComponent(part)).join("/");
  const encodedFileName = fileName.split("/").map((part) => encodeURIComponent(part)).join("/");
  return encodedRoot + encodedFileName;
}

const AudioSystem = {
  oneShots: [],
  loopGroups: Object.create(null),

  playOneShot(key, gainMultiplier = 1, playbackRate = 1) {
    createAudioElements(key, gainMultiplier, playbackRate, false).forEach((audio) => {
      this.oneShots.push(audio);
      audio.addEventListener("ended", () => {
        const index = this.oneShots.indexOf(audio);
        if (index >= 0) {
          this.oneShots.splice(index, 1);
        }
      }, { once: true });
      safePlayAudio(audio);
    });
  },

  startLoopGroup(slot, key, gainMultiplier = 1, playbackRate = 1) {
    const current = this.loopGroups[slot];
    if (
      current &&
      current.key === key &&
      current.gainMultiplier === gainMultiplier &&
      current.playbackRate === playbackRate
    ) {
      return;
    }

    this.stopLoopGroup(slot);
    const elements = createAudioElements(key, gainMultiplier, playbackRate, true);
    if (!elements.length) {
      return;
    }

    this.loopGroups[slot] = {
      key,
      gainMultiplier,
      playbackRate,
      elements
    };
    elements.forEach((audio) => safePlayAudio(audio));
  },

  stopLoopGroup(slot) {
    const current = this.loopGroups[slot];
    if (!current) {
      return;
    }

    current.elements.forEach(stopAudioElement);
    delete this.loopGroups[slot];
  },

  resumeLoopGroups() {
    Object.keys(this.loopGroups).forEach((slot) => {
      const current = this.loopGroups[slot];
      current.elements.forEach((audio) => {
        if (audio.paused) {
          safePlayAudio(audio);
        }
      });
    });
  }
};

function requestGameBgmStart() {
  if (GameState.gameBgmStopped) {
    return;
  }

  GameState.gameBgmStarted = true;
  // The first accepted pointer event also retries ambience that autoplay policies
  // may have blocked while the start screen was waiting for input.
  AudioSystem.resumeLoopGroups();
  AudioSystem.startLoopGroup("gameBgm", "game_bgm", GAME_BGM_VOLUME);
}


function saveGameBgmResumeTime() {
  const loop = AudioSystem.loopGroups.gameBgm;
  const audio = loop && loop.elements && loop.elements[0];
  const currentTime = audio && Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
  try {
    localStorage.setItem(GAME_BGM_RESUME_KEY, String(currentTime));
  } catch (error) {
    // Local saves can be unavailable in private or restricted browser modes.
  }
}

function createAudioElements(key, gainMultiplier, playbackRate, loop) {
  const record = ensureAudioAsset(key);
  if (!record || record.failed) {
    return [];
  }

  return getAudioVolumes(gainMultiplier).map((volume) => {
    const audio = record.element.cloneNode(true);
    audio.volume = volume;
    audio.playbackRate = playbackRate;
    audio.loop = loop;
    try {
      audio.currentTime = 0;
    } catch (error) {
      // Some browsers disallow seeking before metadata is ready.
    }
    return audio;
  });
}

function getAudioVolumes(gainMultiplier) {
  const gain = Math.max(0, gainMultiplier);
  const volumes = [];
  const wholeCount = Math.floor(gain);
  const remainder = gain - wholeCount;

  for (let i = 0; i < wholeCount; i++) {
    volumes.push(1);
  }
  if (remainder > 0.001) {
    volumes.push(Math.min(1, remainder));
  }
  if (!volumes.length) {
    volumes.push(1);
  }

  return volumes;
}

function safePlayAudio(audio) {
  try {
    const result = audio.play();
    if (result && typeof result.catch === "function") {
      result.catch(() => {});
    }
  } catch (error) {
    // Keep audio failures from interrupting the offline game loop.
  }
}

function stopAudioElement(audio) {
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch (error) {
    // Some browsers disallow seeking before metadata is ready.
  }
}

function updateAudioSystem() {
  if (GameState.gameBgmStarted && !GameState.gameBgmStopped) {
    AudioSystem.startLoopGroup("gameBgm", "game_bgm", GAME_BGM_VOLUME);
  }

  if (shouldPlayRainLoop()) {
    AudioSystem.startLoopGroup("weather", "rain", RAIN_VOLUME);
  } else {
    AudioSystem.stopLoopGroup("weather");
  }

  const footstepKey = getFootstepAudioKey();
  if (footstepKey) {
    AudioSystem.startLoopGroup("footsteps", footstepKey, FOOTSTEP_VOLUME);
  } else {
    AudioSystem.stopLoopGroup("footsteps");
  }
}

function shouldPlayRainLoop() {
  return GameState.scene === "menu" ||
    (GameState.scene === "livingRoom" && GameState.opening.phase === "menuConfirm") ||
    GameState.scene === "pipe";
}

function getFootstepAudioKey() {
  if (isEvidenceViewerOpen()) {
    return null;
  }

  if (GameState.scene === "yard") {
    return GameState.player.isMoving ? "footsteps_soil" : null;
  }

  if (
    GameState.scene === "cell" ||
    GameState.scene === "cellCorridor" ||
    GameState.scene === "library" ||
    GameState.scene === "office" ||
    GameState.scene === "solitary"
  ) {
    return GameState.player.isMoving ? "footsteps_concrete" : null;
  }

  if (GameState.scene === "dig") {
    return GameState.dig.isMoving && !GameState.dig.isDigging ? "footsteps_concrete" : null;
  }

  if (GameState.scene === "pipe") {
    return GameState.pipe.phase === "smash" && GameState.pipe.isMoving && !GameState.pipe.isSmashing ?
      "footsteps_concrete" :
      null;
  }

  return null;
}

function getSourceWidth(source) {
  return source.naturalWidth || source.width || 1;
}

function getSourceHeight(source) {
  return source.naturalHeight || source.height || 1;
}

function drawAsset(ctx, assetKey, x, y, w, h) {
  const record = getImageAssetRecord(assetKey);
  if (record && record.loaded && !record.failed) {
    ctx.drawImage(record.element, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    return;
  }

  // Loading starts before the first animation frame. Keep the background clear
  // until an asset finishes loading instead of showing a false missing-image card.
  if (!record || record.failed) {
    drawMissingAsset(ctx, assetKey, x, y, w, h);
  }
}

function drawAssetCrop(ctx, assetKey, sourceRect, x, y, w, h) {
  const record = getImageAssetRecord(assetKey);
  if (record && record.loaded && !record.failed) {
    ctx.drawImage(
      record.element,
      Math.round(sourceRect.x),
      Math.round(sourceRect.y),
      Math.round(sourceRect.w),
      Math.round(sourceRect.h),
      Math.round(x),
      Math.round(y),
      Math.round(w),
      Math.round(h)
    );
    return;
  }

  if (!record || record.failed) {
    drawMissingAsset(ctx, assetKey, x, y, w, h);
  }
}

function drawAssetContain(ctx, assetKey, fallbackWidth, fallbackHeight) {
  const rect = getAssetContainRect(assetKey, fallbackWidth, fallbackHeight);
  const record = getImageAssetRecord(assetKey);

  if (record && record.loaded && !record.failed) {
    ctx.drawImage(record.element, Math.round(rect.x), Math.round(rect.y), Math.round(rect.w), Math.round(rect.h));
  } else if (!record || record.failed) {
    drawMissingAsset(ctx, assetKey, rect.x, rect.y, rect.w, rect.h);
  }

  return rect;
}

function getAssetContainRectInBounds(assetKey, bounds, fallbackWidth, fallbackHeight) {
  const record = getImageAssetRecord(assetKey);
  const sourceWidth = record && record.loaded && !record.failed ? getSourceWidth(record.element) : fallbackWidth;
  const sourceHeight = record && record.loaded && !record.failed ? getSourceHeight(record.element) : fallbackHeight;
  const scale = Math.min(bounds.w / sourceWidth, bounds.h / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;

  return {
    x: bounds.x + (bounds.w - width) / 2,
    y: bounds.y + (bounds.h - height) / 2,
    w: width,
    h: height
  };
}

function drawAssetContainInBounds(ctx, assetKey, bounds, fallbackWidth, fallbackHeight) {
  const rect = getAssetContainRectInBounds(assetKey, bounds, fallbackWidth, fallbackHeight);
  drawAsset(ctx, assetKey, rect.x, rect.y, rect.w, rect.h);
  return rect;
}

function drawAssetCover(ctx, assetKey, fallbackWidth, fallbackHeight) {
  const record = getImageAssetRecord(assetKey);
  const sourceWidth = record && record.loaded && !record.failed ? getSourceWidth(record.element) : fallbackWidth;
  const sourceHeight = record && record.loaded && !record.failed ? getSourceHeight(record.element) : fallbackHeight;
  const scale = Math.max(CANVAS_WIDTH / sourceWidth, CANVAS_HEIGHT / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;
  const x = (CANVAS_WIDTH - width) / 2;
  const y = (CANVAS_HEIGHT - height) / 2;

  if (record && record.loaded && !record.failed) {
    ctx.drawImage(record.element, Math.round(x), Math.round(y), Math.round(width), Math.round(height));
  } else if (!record || record.failed) {
    drawMissingAsset(ctx, assetKey, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}


function drawMissingAsset(ctx, assetKey, x, y, w, h) {
  ctx.save();
  ctx.fillStyle = "#333333";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#858585";
  ctx.lineWidth = 4;
  ctx.strokeRect(x + 2, y + 2, Math.max(0, w - 4), Math.max(0, h - 4));
  ctx.fillStyle = "#d8d8d8";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "22px monospace";
  ctx.fillText("Missing Asset", x + w / 2, y + h / 2 - 16);
  ctx.font = "18px monospace";
  ctx.fillText(assetKey, x + w / 2, y + h / 2 + 18);
  ctx.restore();
}

// ======================================================
// 7. Scene System
// ======================================================
function createBaseScene(name, config) {
  const sceneConfig = config || {};
  return {
    enter: sceneConfig.enter || function enterScene() {},
    update: sceneConfig.update || function updateScene() {},
    render: sceneConfig.render || function renderScene(ctx) {
      renderPlaceholderScene(ctx, name);
    },
    handleInput: sceneConfig.handleInput || function handleSceneInput() {
      handlePauseInput();
    },
    exit: sceneConfig.exit || function exitScene() {}
  };
}

const Scenes = {
  menu: createBaseScene("menu", {
    enter() {
      GameState.currentQuest = "quest_start";
      setOpeningPhase("menuIdle");
      GameState.opening.deleteConfirmOpen = false;
      GameState.opening.deleteConfirmSelection = "cancel";
      GameState.opening.menuNotice = "";
      GameState.opening.menuNoticeTimer = 0;
      GameState.opening.menuSelection = getAvailableMenuChoices()[0].id;
      // Start-screen rain is ambience, not a response to the Start button.
      // Browsers that permit audible autoplay begin it as soon as this scene loads.
      AudioSystem.startLoopGroup("weather", "rain", RAIN_VOLUME);
    },

    update(dt) {
      GameState.opening.timer += dt;
      if (GameState.opening.menuNoticeTimer > 0) {
        GameState.opening.menuNoticeTimer = Math.max(0, GameState.opening.menuNoticeTimer - dt);
        if (GameState.opening.menuNoticeTimer === 0) {
          GameState.opening.menuNotice = "";
        }
      }
    },

    handleInput() {
      if (DialogueSystem.active) {
        return;
      }
      if (GameState.opening.deleteConfirmOpen) {
        handleDeleteSaveConfirmationInput();
        return;
      }

      const secretClick = InputSystem.pointerJustPressed &&
        InputSystem.pointerInRect(getIntroPersonSecretRect());
      if (secretClick) {
        GameState.secrets.menuClicks += 1;
        if (GameState.secrets.menuClicks >= 3 && AchievementSystem.unlock("wall_creator")) {
          DialogueSystem.start([
            "开发者：谢谢你愿意停下来，看看高墙背后的世界。",
            "开发者：愿你也能找到属于自己的墙外。",
            "开发者：——《高墙之外》开发者"
          ]);
        }
        return;
      }

      const choices = getAvailableMenuChoices();
      const currentIndex = Math.max(0, choices.findIndex((choice) => choice.id === GameState.opening.menuSelection));
      if (InputSystem.isPressed("w")) {
        GameState.opening.menuSelection = choices[(currentIndex - 1 + choices.length) % choices.length].id;
      } else if (InputSystem.isPressed("s")) {
        GameState.opening.menuSelection = choices[(currentIndex + 1) % choices.length].id;
      }

      let selectedChoice = null;
      if (InputSystem.pointerJustPressed) {
        selectedChoice = choices.find((choice) => InputSystem.pointerInRect(choice.rect)) || null;
      }
      const confirmSelection = InputSystem.actionPressed("interact");
      if (confirmSelection) {
        selectedChoice = choices.find((choice) => choice.id === GameState.opening.menuSelection) || choices[0];
      }
      if (!selectedChoice) {
        return;
      }

      if (selectedChoice.id === "deleteSave") {
        GameState.opening.deleteConfirmOpen = true;
        GameState.opening.deleteConfirmSelection = "cancel";
        return;
      }
      if (selectedChoice.id === "newGame") {
        // A new run must rebuild the courtyard map through exploration instead
        // of inheriting the revealed cells and landmarks from the previous run.
        CheckpointSystem.clear({ preserveYardMap: false });
        AudioSystem.playOneShot("thunder", THUNDER_VOLUME);
        changeScene("livingRoom");
        return;
      }
      if (selectedChoice.id === "continue" || selectedChoice.id === "start") {
        const resumeAvailable = CheckpointSystem.hasResume();
        AudioSystem.playOneShot("thunder", THUNDER_VOLUME);
        if (selectedChoice.id === "start" || !resumeAvailable) {
          CheckpointSystem.clear({ preserveYardMap: false });
          changeScene("livingRoom");
        } else if (!CheckpointSystem.restore()) {
          CheckpointSystem.clear({ preserveYardMap: false });
          changeScene("livingRoom");
        }
      }
    },

    render(ctx) {
      renderMenu(ctx);
    }
  }),

  livingRoom: createBaseScene("livingRoom", {
    enter() {
      GameState.currentQuest = "quest_living_room_tv";
      GameState.opening.tvFrameIndex = 0;
      setOpeningPhase("menuConfirm");
    },

    update(dt) {
      GameState.opening.timer += dt;

      if (GameState.opening.phase === "menuConfirm" && GameState.opening.timer >= MENU_CONFIRM_DURATION) {
        setOpeningPhase("menuBlack");
        return;
      }

      if (GameState.opening.phase === "menuBlack" && GameState.opening.timer >= MENU_BLACK_DURATION) {
        GameState.opening.tvFrameIndex = 0;
        setOpeningPhase("tvLoop");
        return;
      }

      if (GameState.opening.phase === "tvLoop" && GameState.opening.timer >= TV_BACKGROUND_SWAP_SECONDS) {
        GameState.opening.timer -= TV_BACKGROUND_SWAP_SECONDS;
        GameState.opening.tvFrameIndex = (GameState.opening.tvFrameIndex + 1) % 2;
      }
    },

    handleInput() {
      handlePauseInput();
      if (
        GameState.opening.phase === "menuBlack" &&
        (InputSystem.actionPressed("interact") || InputSystem.actionPressed("continueDialogue"))
      ) {
        GameState.opening.tvFrameIndex = 0;
        setOpeningPhase("tvLoop");
        return;
      }

      if (
        GameState.opening.phase === "tvLoop" &&
        (InputSystem.actionPressed("interact") || InputSystem.actionPressed("continueDialogue"))
      ) {
        changeScene("recap");
      }
    },

    render(ctx) {
      renderLivingRoom(ctx);
    }
  }),

  recap: createBaseScene("recap", {
    enter() {
      GameState.currentQuest = "quest_recap";
      setOpeningPhase("storyBlack");
    },

    update(dt) {
      GameState.opening.timer += dt;

      if (GameState.opening.phase === "storyBlack" && GameState.opening.timer >= STORY_PRE_BLACK_DURATION) {
        setOpeningPhase("storyImage");
        return;
      }

      if (GameState.opening.phase === "storyQuote" && GameState.opening.timer >= STORY_QUOTE_DURATION) {
        setOpeningPhase("storyPostBlack");
        return;
      }

      if (GameState.opening.phase === "storyPostBlack" && GameState.opening.timer >= STORY_POST_BLACK_DURATION) {
        changeScene("whiteLight");
      }
    },

    handleInput() {
      if (
        GameState.opening.phase === "storyBlack" &&
        (InputSystem.actionPressed("continueDialogue") || InputSystem.actionPressed("interact"))
      ) {
        setOpeningPhase("storyImage");
        return;
      }

      if (
        GameState.opening.phase === "storyPostBlack" &&
        (InputSystem.actionPressed("continueDialogue") || InputSystem.actionPressed("interact"))
      ) {
        changeScene("whiteLight");
        return;
      }

      if (
        GameState.opening.phase === "storyImage" &&
        (InputSystem.actionPressed("continueDialogue") || InputSystem.actionPressed("interact"))
      ) {
        setOpeningPhase("storyQuote");
      }
    },

    render(ctx) {
      renderRecap(ctx);
    }
  }),

  whiteLight: createBaseScene("whiteLight", {
    enter() {
      GameState.currentQuest = "quest_white_light";
      setOpeningPhase("inhaleBlack");
    },

    update(dt) {
      GameState.opening.timer += dt;

      if (GameState.opening.phase === "inhaleBlack" && GameState.opening.timer >= INHALE_BLACK_DURATION) {
        setOpeningPhase("inhale01");
        return;
      }

      if (GameState.opening.phase === "inhale01" && GameState.opening.timer >= INHALE_FRAME_DURATION) {
        setOpeningPhase("inhale02");
        return;
      }

      if (GameState.opening.phase === "inhale02" && GameState.opening.timer >= INHALE_FRAME_DURATION) {
        setOpeningPhase("inhale03");
        return;
      }

      if (GameState.opening.phase === "inhale03" && GameState.opening.timer >= INHALE_FRAME_DURATION) {
        setOpeningPhase("pureWhite");
        return;
      }

      if (GameState.opening.phase === "pureWhite" && GameState.opening.timer >= FINAL_WHITE_DURATION) {
        saveCheckpoint("CP_AFTER_WHITE_LIGHT");
        changeScene("yard");
      }
    },

    render(ctx) {
      renderWhiteLight(ctx);
    }
  }),

  cellCorridor: createBaseScene("cellCorridor", {
    enter() {
      if (GameState.previousScene === "pause" && GameState.corridor.initialized) {
        updateCorridorCamera();
        return;
      }
      initializeCorridorScene();
    },

    update(dt) {
      updateCorridorScene(dt);
    },

    handleInput() {
      handlePauseInput();
      handleCorridorInput();
    },

    render(ctx) {
      renderCorridorScene(ctx);
    }
  }),

  cell: createBaseScene("cell", {
    enter() {
      if (isSideRouteCellReturn()) {
        enterSideRouteCellScene();
        return;
      }
      const returningFromMontage = GameState.previousScene === "montage" && GameState.twentyYearsPassed;
      const wakingFromOperatingRoom = GameState.previousScene === "operatingRoomBlackout";
      const returningFromCorridor = GameState.previousScene === "cellCorridor" &&
        GameState.corridor.lastExitPortal === "cell";
      const returningAfterSoilDump = (GameState.previousScene === "yard" ||
        (returningFromCorridor && GameState.corridor.originScene === "yard")) &&
        GameState.hasAttributeD &&
        !GameState.twentyYearsPassed;
      GameState.currentQuest = GameState.twentyYearsPassed ?
        getPostMontageCellQuest() :
        GameState.hasAttributeD && !GameState.hasSoilPile ?
        "quest_cell_sleep_after_soil" :
        GameState.hasSoilPile ?
        "quest_cell_soil_pile" :
        getEarlyCellQuest();
      if (!returningFromMontage && !wakingFromOperatingRoom) {
        GameState.player.lyingInBed = false;
      }
      if (GameState.wallHole.revealed && !GameState.wallHole.introPending && !GameState.wallHole.exitPending) {
        resetWallHoleReveal();
      }
      if (!isCellInspectionActive()) {
        resetCellInspectionState();
      }
      if (returningFromMontage || wakingFromOperatingRoom) {
        // 二十年演出结束后，回到进入睡眠前的房间位置；旧进度没有记录时保留原有床上兜底。
        if (!returningFromMontage || !restorePlayerPositionAfterSleep()) {
          lieDownInBed();
        }
      } else if (GameState.previousScene === "dig") {
        setPlayerFootToCellImage(CellLayout.pictureStandPoint.x, CellLayout.pictureStandPoint.y);
        GameState.player.facing = "down";
      } else if (GameState.previousScene === "yard" || returningFromCorridor) {
        setPlayerFootToCellImage(220, 620);
        GameState.player.facing = "right";
      } else {
        setPlayerPosition(610, 450);
      }

      if (wakingFromOperatingRoom) {
        saveCheckpoint("CP_CELL_WAKE");
        DialogueSystem.start(CellWakeThoughtLines);
      } else if (returningAfterSoilDump) {
        DialogueSystem.start(SoilRestThoughtLines);
      } else if (returningFromMontage) {
        DialogueSystem.start(
          GameState.alternateEscapeRoute ? AlternateRoutePostMontageThoughtLines : PostMontageThoughtLines
        );
      }
    },

    update(dt) {
      if (isSideRouteCellReturn()) {
        updateSideRouteCellScene(dt);
        return;
      }
      if (GameState.hammerHidePuzzle.active) {
        stopPlayerForNpcDialogue();
        return;
      }
      if (DialogueSystem.active) {
        stopPlayerForNpcDialogue();
        return;
      }
      if (GameState.pipeMazeActive) {
        stopPlayerForNpcDialogue();
        return;
      }
      if (isCellInspectionActive()) {
        updateCellInspection(dt);
        return;
      }
      if (updateWallHoleRevealTransition(dt)) {
        return;
      }
      updateWallHoleExitHold(dt);
      updatePlayer(dt);
    },

    handleInput() {
      if (GameState.hammerHidePuzzle.active) {
        handleHammerHidePuzzleInput();
        return;
      }
      handlePauseInput();
      if (isSideRouteCellReturn()) {
        handleSideRouteCellInput();
        return;
      }
      if (GameState.pipeMazeActive) {
        handlePipeMazeInput();
        return;
      }
      if (GameState.mapRevealActive) {
        if (InputSystem.actionPressed("interact") || InputSystem.actionPressed("continueDialogue")) {
          deliverDrawnMap();
        }
        return;
      }
      if (DialogueSystem.active || isCellInspectionActive() || isWallHoleRevealTransitionActive()) {
        return;
      }

      const activeInteraction = getActiveCellInteraction();
      const wantsWallPictureClick = activeInteraction &&
        activeInteraction.id === "wallPicture" &&
        InputSystem.actionPressed("continueDialogue");

      if ((InputSystem.actionPressed("interact") || wantsWallPictureClick) && activeInteraction) {
        if (activeInteraction.id === "cellDoor") {
          enterCellCorridor("cell", getCorridorModeFromCell());
        } else if (activeInteraction.id === "bed") {
          toggleBedRest();
        } else if (activeInteraction.id === "wallDigHint") {
          registerCellWallSecret();
          showWallDigPrompt();
        } else if (activeInteraction.id === "wallSecretCheck") {
          investigateCellWallSecret();
        } else if (activeInteraction.id === "hangPoster") {
          hangPosterAtWall();
        } else if (activeInteraction.id === "wallPicture") {
          handleWallPictureInteraction();
        } else if (activeInteraction.id === "drawMap") {
          startMapDrawing();
        } else if (activeInteraction.id === "hideHammer") {
          startHammerHidePuzzle();
        }
      }
    },

    render(ctx) {
      renderCell(ctx);
    }
  }),

  dig: createBaseScene("dig", {
    enter() {
      initializeDigScene();
    },

    update(dt) {
      updateDigScene(dt);
    },

    handleInput() {
      handlePauseInput();
      if (DialogueSystem.active) {
        return;
      }

      const activeInteraction = getActiveDigInteraction();
      if (InputSystem.actionPressed("interact") && activeInteraction && activeInteraction.id === "leave") {
        leaveDigScene();
      }
    },

    render(ctx) {
      renderDig(ctx);
    }
  }),

  pipe: createBaseScene("pipe", {
    enter() {
      initializePipeScene();
      saveCheckpoint("CP_PIPE_GAME");
    },

    update(dt) {
      updatePipeScene(dt);
    },

    handleInput() {
      handlePauseInput();
      handlePipeVictoryInput();
    },

    render(ctx) {
      renderPipe(ctx);
    }
  }),

  yard: createBaseScene("yard", {
    enter() {
      GameState.player.lyingInBed = false;
      const isOpeningArrival = GameState.previousScene === "whiteLight";
      const isSideRouteCustodyArrival = GameState.sideRoute.active &&
        GameState.sideRoute.stage === "yardEscortToCenter" &&
        (GameState.previousScene === "cell" || GameState.previousScene === "cellCorridor");
      const isSideRouteMorningArrival = GameState.sideRoute.active &&
        GameState.sideRoute.stage === "morningPatrol" &&
        (GameState.previousScene === "cell" || GameState.previousScene === "cellCorridor");
      GameState.currentQuest = isSideRouteCustodyArrival ?
        "quest_side_route_awaiting_continuation" :
        (isOpeningArrival ?
        "quest_yard_first_walk" :
        (GameState.twentyYearsPassed ? getPostMontageYardQuest() : getEarlyYardQuest()));
      if (isOpeningArrival) {
        GameState.opening.gateEscapeAvailable = true;
      } else {
        initializeRedNpcState();
        initializeBrooksNpcState();
        initializeYardPrisoners();
        refreshSideTalksOnYardEnter();
      }
      const spawnPoint = GameState.previousScene === "office" ?
        YardLayout.officeReturnPoint :
        (GameState.previousScene === "library" ? YardLayout.libraryReturnPoint :
        (isOpeningArrival ? OpeningYardLayout.entryPoint : YardLayout.entryPoint));
      GameState.player.facing = GameState.previousScene === "office" ? "left" :
        (GameState.previousScene === "library" ? "down" : (isOpeningArrival ? "down" : "right"));
      setPlayerFootToYardImage(spawnPoint.x, spawnPoint.y);
      updateYardCamera();
      YardNavigationMapSystem.enterYard();
      if (isOpeningArrival) {
        DialogueSystem.start(OpeningYardThoughtLines);
      } else if (isSideRouteCustodyArrival) {
        startSideRouteYardEscortToCenter();
      } else if (isSideRouteMorningArrival) {
        startSideRouteMorningPatrol();
      } else if (GameState.sideRoute.active &&
        GameState.sideRoute.stage === "libraryTalk" &&
        (GameState.previousScene === "solitary" || GameState.previousScene === "cellCorridor")) {
        prepareSideRouteLibraryMeeting();
      }
    },

    update(dt) {
      YardNavigationMapSystem.update(dt);
      if (isOpeningYardArrival()) {
        if (DialogueSystem.active) {
          stopPlayerForNpcDialogue();
          updateYardCamera();
          return;
        }
        updateOpeningYardPlayer(dt);
        updateYardCamera();
        return;
      }

      if (GameState.sideRoute.active) {
        updateSideRouteYardSequence(dt);
        updateYardCamera();
        return;
      }

      if (DialogueSystem.active ||
        GameState.posterChoiceActive ||
        isPosterPickupAnimationActive() ||
        GameState.radioRepairActive ||
        isRedDialogueApproachActive() ||
        isBrooksDialogueApproachActive()
      ) {
        stopPlayerForNpcDialogue();
      } else if (isPlayerDumpingSoil()) {
        stopPlayerForSoilDump();
      } else {
        updatePlayer(dt);
      }
      updateRedNpc(dt);
      updateBrooksNpc(dt);
      updateYardPrisoners(dt);
      updateYardGuards(dt);
      SoilSystem.update(dt);
      updateRadioRepair(dt);
      updatePosterPickupAnimation(dt);
      updateAmbientConversationSystem(dt);
      updateYardCamera();
      updateYardExplorationAchievements();
    },

    handleInput() {
      handlePauseInput();
      if (GameState.sideRoute.active) {
        handleSideRouteYardInput();
        return;
      }
      if (GameState.radioRepairActive) {
        handleRadioRepairInput();
        return;
      }
      if (GameState.posterChoiceActive) {
        handlePosterChoiceInput();
        return;
      }
      if (isPosterPickupAnimationActive()) {
        return;
      }
      if (DialogueSystem.active || isRedDialogueApproachActive() || isBrooksDialogueApproachActive()) {
        return;
      }

      const activeInteraction = getActiveYardInteraction();
      if (InputSystem.actionPressed("interact") && activeInteraction) {
        if (activeInteraction.id === "prisonGate") {
          startPrisonGateEscape();
        } else if (activeInteraction.id === "cellDoor") {
          enterCellCorridor("yard", "free");
        } else if (activeInteraction.id === "wardenOffice") {
          changeScene("office");
        } else if (activeInteraction.id === "red") {
          const mainDialogueKind = getPendingRedMainDialogueKind();
          if (mainDialogueKind) {
            queueSideTalkAfterMain("red");
            requestRedDialogue(mainDialogueKind);
          } else if (canStartSideTalk("red")) {
            requestRedDialogue("sideTalk");
          } else if (GameState.twentyYearsPassed) {
            GameState.currentQuest = getPostMontageYardQuest();
          } else if (!GameState.hasHammer) {
            requestRedDialogue("hammer");
          } else if (!GameState.hasBible) {
            GameState.currentQuest = "quest_yard_library";
          } else if (!GameState.inspectionPassed) {
            GameState.currentQuest = GameState.hammerHiddenInBible ?
              "quest_cell_wait_inspection" :
              "quest_cell_hide_hammer";
          } else if (!GameState.wallDigPromptShown) {
            GameState.currentQuest = "quest_cell_wall_prompt";
          } else if (!GameState.posterType) {
            requestRedDialogue("poster");
          } else if (!GameState.posterHung) {
            GameState.currentQuest = "quest_yard_return_cell_to_hang_poster";
          } else {
            GameState.currentQuest = "quest_cell_first_dig_ready";
          }
        } else if (activeInteraction.id === "brooks") {
          const mainDialogueKind = getPendingBrooksMainDialogueKind();
          if (mainDialogueKind) {
            queueSideTalkAfterMain("brooks");
            requestBrooksDialogue(mainDialogueKind);
          } else if (canStartSideTalk("brooks")) {
            startSideTalk("brooks");
          } else if (!GameState.hasHammer) {
            requestBrooksDialogue("hint");
          } else if (!GameState.hasBible) {
            GameState.currentQuest = "quest_yard_enter_library";
          }
        } else if (activeInteraction.id === "tommy" || activeInteraction.id === "haywood" || activeInteraction.id === "floyd") {
          startSideTalk(activeInteraction.id);
        } else if (activeInteraction.id === "yardGuard") {
          startGuardConversation("yard", activeInteraction.guardIndex);
        } else if (activeInteraction.id === "library") {
          changeScene("library");
        } else if (activeInteraction.id === "soil") {
          GameState.currentQuest = "quest_yard_soil";
        } else {
          GameState.currentQuest = "quest_yard_" + activeInteraction.id;
        }
      }
    },

    render(ctx) {
      renderYard(ctx);
    },

    exit() {
      cancelAmbientConversation();
      YardNavigationMapSystem.leaveYard();
    }
  }),

  gateEscape: createBaseScene("gateEscape", {
    enter() {
      GameState.currentQuest = "quest_gate_escape";
    },

    handleInput() {
      if (InputSystem.actionPressed("interact") || InputSystem.actionPressed("continueDialogue")) {
        changeScene("menu");
      }
    },

    render(ctx) {
      renderGateBlackout(ctx);
    }
  }),

  gateBlackout: createBaseScene("gateBlackout", {
    enter() {
      GameState.currentQuest = "quest_gate_blackout";
      GameState.surgerySequence.timer = 0;
    },

    update(dt) {
      GameState.surgerySequence.timer += dt;
    },

    handleInput() {
      if (!InputSystem.actionPressed("continueDialogue") && !InputSystem.actionPressed("interact")) {
        return;
      }

      if (!isGateBlackoutMessageComplete()) {
        GameState.surgerySequence.timer = getGateBlackoutMessageDuration();
        return;
      }

      changeScene("operatingRoom1");
    },

    render(ctx) {
      renderGateBlackout(ctx);
    }
  }),

  operatingRoom1: createBaseScene("operatingRoom1", {
    enter() {
      GameState.currentQuest = "quest_operating_room_1";
      GameState.surgerySequence.timer = 0;
    },

    update(dt) {
      GameState.surgerySequence.timer += dt;
      if (GameState.surgerySequence.timer >= OPERATING_ROOM_DISPLAY_SECONDS) {
        changeScene("operatingRoom");
      }
    },

    render(ctx) {
      renderOperatingRoomStill(ctx, "operating_room_1");
    }
  }),

  operatingRoom: createBaseScene("operatingRoom", {
    enter() {
      GameState.currentQuest = "quest_operating_room";
      GameState.surgerySequence.timer = 0;
      if (!GameState.surgerySequence.horrorPlayed) {
        GameState.surgerySequence.horrorPlayed = true;
        AudioSystem.playOneShot("horror", HORROR_VOLUME);
      }
    },

    update(dt) {
      GameState.surgerySequence.timer += dt;
      if (GameState.surgerySequence.timer >= OPERATING_ROOM_DISPLAY_SECONDS) {
        changeScene("operatingRoomBlackout");
      }
    },

    render(ctx) {
      renderOperatingRoomStill(ctx, "operating_room");
    }
  }),

  operatingRoomBlackout: createBaseScene("operatingRoomBlackout", {
    enter() {
      GameState.currentQuest = "quest_operating_room_blackout";
      GameState.surgerySequence.timer = 0;
    },

    update(dt) {
      GameState.surgerySequence.timer += dt;
      if (GameState.surgerySequence.timer >= getOperatingRoomBlackoutDuration()) {
        changeScene("cell");
      }
    },

    render(ctx) {
      renderOperatingRoomBlackout(ctx);
    }
  }),

  library: createBaseScene("library", {
    enter() {
      GameState.player.lyingInBed = false;
      GameState.player.facing = "up";
      GameState.currentQuest = !GameState.hasHammer ?
        "quest_library_empty" :
        (GameState.hasBible ?
          "quest_library_leave" :
          (isBrooksWaitingInLibrary() ? "quest_library_bible" : "quest_library_wait_brooks"));
      setPlayerFootToLibraryImage(LibraryLayout.spawnFoot.x, LibraryLayout.spawnFoot.y);
    },

    update(dt) {
      if (DialogueSystem.active ||
        GameState.libraryTask.sortingActive) {
        stopPlayerForNpcDialogue();
        updateLibrarySortingTask(dt);
        return;
      }
      updatePlayer(dt);
      updateLibraryExplorationAchievement();
    },

    handleInput() {
      handlePauseInput();
      if (GameState.libraryTask.sortingActive) {
        handleLibrarySortingInput();
        return;
      }
      if (DialogueSystem.active) {
        return;
      }

      const activeInteraction = getActiveLibraryInteraction();
      if (InputSystem.actionPressed("interact") && activeInteraction) {
        if (activeInteraction.id === "exit") {
          changeScene("yard");
        } else if (activeInteraction.id === "brooks") {
          if (canStartSideTalk("brooks")) {
            startSideTalk("brooks");
          } else if (!GameState.hasBible && isBrooksWaitingInLibrary()) {
            startBrooksDialogue();
          }
        }
      }
    },

    render(ctx) {
      renderLibrary(ctx);
    }
  }),

  solitary: createBaseScene("solitary", {
    enter() {
      enterSolitaryScene();
    },

    update(dt) {
      updateSolitaryScene(dt);
    },

    handleInput() {
      handlePauseInput();
      handleSolitaryInput();
    },

    render(ctx) {
      renderSolitaryScene(ctx);
    }
  }),

  montage: createBaseScene("montage", {
    enter() {
      GameState.currentQuest = "quest_montage_twenty_years";
      startTwentyYearsMontage();
    },

    exit() {
      TwentyYearsComic.stop();
    },

    update(dt) {
      GameState.secrets.montageWait += dt;
      if (GameState.secrets.montageWait >= 20) {
        AchievementSystem.unlock("wait_together");
      }
      updateTwentyYearsMontage(dt);
    },

    handleInput() {},

    render(ctx) {
      renderTwentyYearsMontage(ctx);
    }
  }),

  office: createBaseScene("office", {
    enter() {
      if (GameState.previousScene === "pause") {
        return;
      }
      if (GameState.sideRoute.active && GameState.sideRoute.stage === "officeSearch") {
        enterSideRouteOfficeScene();
        return;
      }
      if (!hasOfficeAttributeA() && !GameState.ledgerSwapped) {
        enterFreeOfficeScene();
        return;
      }
      GameState.currentQuest = "quest_office_warden";
      GameState.player.lyingInBed = false;
      GameState.player.facing = "up";
      resetOfficeSceneState();
      GameState.office.mode = "story";
      if (GameState.ledgerSwapped) {
        GameState.office.wardenPhase = "gone";
        GameState.currentQuest = "quest_office_leave";
      }
      setPlayerFootToOfficeImage(OfficeLayout.spawnFoot.x, OfficeLayout.spawnFoot.y);
    },

    update(dt) {
      if (isSideRouteOfficeActive()) {
        updateSideRouteOfficeScene(dt);
        return;
      }
      if (isFreeOfficeMode()) {
        updateFreeOfficeScene(dt);
        return;
      }
      if (DialogueSystem.active) {
        stopPlayerForNpcDialogue();
        return;
      }
      if (GameState.office.safeViewOpen) {
        updateOfficeSafeView();
        return;
      }
      updatePlayer(dt);
      updateOfficeWarden(dt);
    },

    handleInput() {
      handlePauseInput();
      if (isSideRouteOfficeActive()) {
        handleSideRouteOfficeInput();
        return;
      }
      if (isFreeOfficeMode()) {
        handleFreeOfficeInput();
        return;
      }
      if (DialogueSystem.active) {
        return;
      }

      if (GameState.office.safeViewOpen) {
        handleOfficeSafeInput();
        return;
      }

      const activeInteraction = getActiveOfficeInteraction();
      if (InputSystem.actionPressed("interact") && activeInteraction) {
        if (activeInteraction.id === "warden") {
          startOfficeWardenDialogue();
        } else if (activeInteraction.id === "embroidery") {
          inspectOfficeEmbroidery();
        } else if (activeInteraction.id === "door") {
          leaveOfficeScene();
        } else if (activeInteraction.id === "deskSecret") {
          GameState.secrets.officeSecretRead = true;
          AchievementSystem.unlock("beyond_evidence");
          DialogueSystem.start([
            "开发者：你找到的不是证据，是制作组藏在这里的一点私心。",
            "开发者：谢谢你没有只看任务指引。"
          ]);
        }
      }
    },

    render(ctx) {
      renderOffice(ctx);
    }
  }),

  pause: createBaseScene("pause", {
    handleInput() {
      if (GameState.achievementPanelOpen) {
        if (InputSystem.pointerJustPressed ||
          InputSystem.actionPressed("pause") ||
          InputSystem.actionPressed("interact")) {
          GameState.achievementPanelOpen = false;
        }
        return;
      }
      if (InputSystem.pointerJustPressed && InputSystem.pointerInRect(AchievementPanelButtonRect)) {
        GameState.achievementPanelOpen = true;
        return;
      }
      if (InputSystem.actionPressed("pause") || InputSystem.actionPressed("interact")) {
        changeScene(GameState.previousScene || "menu");
      }
    },

    render(ctx) {
      if (GameState.achievementPanelOpen) {
        AchievementSystem.renderPanel(ctx);
      } else {
        renderPause(ctx);
      }
    }
  }),

  fail: createBaseScene("fail", {
    enter() {
      GameState.failRecoveryTimer = 0;
    },

    update(dt) {
      if (GameState.failRecovery !== "sideRouteMorning") {
        return;
      }
      GameState.failRecoveryTimer += dt;
      if (GameState.failRecoveryTimer >= SIDE_ROUTE_GATE_FAILURE_RETURN_SECONDS) {
        restoreSideRouteMorningFailure();
      }
    },

    handleInput() {
      if (InputSystem.actionPressed("interact") || InputSystem.actionPressed("continueDialogue")) {
        if (GameState.failRecovery === "sideRouteMorning") {
          restoreSideRouteMorningFailure();
          return;
        }
        if (GameState.failRecovery === "sideRouteOffice") {
          restoreSideRouteOfficeFailure();
          return;
        }
        if (GameState.failRecovery === "officeInspection") {
          restoreFreeOfficeInspectionFailure();
          return;
        }
        if (GameState.failRecovery === "soilDump") {
          restoreSoilFailureToPileCheckpoint();
          return;
        }
        if (GameState.failRecovery === "pipeBeforeTunnel") {
          restorePipeFailureToFinalDigCheckpoint();
          return;
        }
        changeScene(GameState.previousScene || "menu");
      }
    },

    render(ctx) {
      renderFail(ctx);
    }
  })
};

function changeScene(sceneName) {
  if (!Scenes[sceneName]) {
    throw new Error("Unknown scene: " + sceneName);
  }

  const currentScene = Scenes[GameState.scene];
  if (currentScene && currentScene.exit) {
    currentScene.exit();
  }

  GameState.previousScene = GameState.scene;
  GameState.scene = sceneName;

  const nextScene = Scenes[GameState.scene];
  if (nextScene && nextScene.enter) {
    nextScene.enter();
  }
}

function enterCellCorridor(entryPortal, mode) {
  const corridor = GameState.corridor;
  corridor.entryPortal = entryPortal;
  corridor.originScene = GameState.scene;
  corridor.lastExitPortal = null;
  corridor.mode = mode || "free";
  corridor.initialized = false;
  corridor.escortRouteIndex = 0;
  corridor.remarkText = "";
  corridor.remarkStartedAt = -1;
  changeScene("cellCorridor");
}

function getCorridorModeFromCell() {
  return "free";
}

function initializeCorridorScene() {
  const corridor = GameState.corridor;
  const isInitialCellExit = corridor.entryPortal === "cell" &&
    GameState.currentCheckpoint === "CP_CELL_WAKE" &&
    !corridor.initialCellExitSeen;
  corridor.initialized = true;
  corridor.escortRouteIndex = 0;
  corridor.remarkStartedAt = -1;
  GameState.player.lyingInBed = false;

  if (isCorridorEscortActive()) {
    const route = getCurrentCorridorEscortRoute();
    const start = route[0];
    setPlayerFootToCorridorImage(start.player.x, start.player.y);
    start.guards.forEach((point, index) => {
      const guard = corridor.guards[index];
      guard.x = point.x;
      guard.y = point.y;
      guard.facing = corridor.mode === "escortToYard" ? "down" : "up";
      guard.visualFacing = guard.facing;
      guard.isMoving = true;
      guard.walkAnimTime = 0;
    });
    GameState.player.facing = corridor.mode === "escortToYard" ? "down" : "up";
    corridor.remarkText = corridor.mode === "escortToYard" ?
      "往下走，别磨蹭！" :
      "往上走！不许停下！";
    corridor.remarkStartedAt = GameState.playTime;
    GameState.currentQuest = corridor.mode === "escortToYard" ?
      "quest_corridor_escort_yard" :
      "quest_corridor_escort_solitary";
    updateCorridorCamera();
    return;
  }

  const spawn = CorridorLayout.spawns[corridor.entryPortal] || CorridorLayout.spawns.yard;
  setPlayerFootToCorridorImage(spawn.x, spawn.y);
  GameState.player.facing = spawn.facing;
  if (corridor.mode === "postSolitary") {
    GameState.currentQuest = "quest_corridor_leave_solitary";
    DialogueSystem.start(CorridorPostSolitaryLines);
  } else if (corridor.entryPortal === "cell") {
    corridor.initialCellExitSeen = true;
    GameState.currentQuest = isInitialCellExit ? "" :
      (GameState.sideRoute.active && GameState.sideRoute.stage === "morningPatrol" ?
        "quest_corridor_to_yard_morning" :
        "quest_corridor_to_yard");
  } else {
    GameState.currentQuest = "quest_corridor_to_cell";
  }
  updateCorridorCamera();
}

function updateCorridorScene(dt) {
  if (isCorridorEscortActive()) {
    updateCorridorEscort(dt);
    updateCorridorCamera();
    return;
  }
  if (DialogueSystem.active) {
    stopPlayerForNpcDialogue();
    updateCorridorCamera();
    return;
  }
  updatePlayer(dt);
  updateCorridorCamera();
}

function handleCorridorInput() {
  if (GameState.scene !== "cellCorridor" || DialogueSystem.active || isCorridorEscortActive()) {
    return;
  }
  const interaction = getActiveCorridorInteraction();
  if (!InputSystem.actionPressed("interact") || !interaction) {
    return;
  }

  const corridor = GameState.corridor;
  if (interaction.id === "solitaryDoor") {
    startPropInteraction(CorridorLockedDoorLines);
    return;
  }
  if (interaction.id === "cellDoor") {
    if (corridor.mode === "postSolitary") {
      startPropInteraction(["安迪（心理）：现在不能停下。先回院子，到图书馆前找老布。"]);
      return;
    }
    corridor.lastExitPortal = "cell";
    corridor.initialized = false;
    changeScene("cell");
    return;
  }
  if (interaction.id === "yardDoor") {
    corridor.lastExitPortal = "yard";
    corridor.initialized = false;
    if (corridor.mode === "postSolitary" || GameState.sideRoute.stage === "corridorAfterSolitary") {
      GameState.sideRoute.stage = "libraryTalk";
    }
    changeScene("yard");
  }
}

function getActiveCorridorInteraction() {
  if (GameState.scene !== "cellCorridor" || isCorridorEscortActive()) {
    return null;
  }
  const foot = corridorWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  if (pointInRect(foot, CorridorLayout.portals.solitary)) {
    return { id: "solitaryDoor" };
  }
  if (pointInRect(foot, CorridorLayout.portals.cell)) {
    return { id: "cellDoor" };
  }
  if (pointInRect(foot, CorridorLayout.portals.yard)) {
    return { id: "yardDoor" };
  }
  return null;
}

function isCorridorEscortActive() {
  return GameState.scene === "cellCorridor" &&
    (GameState.corridor.mode === "escortToYard" || GameState.corridor.mode === "escortToSolitary");
}

function getCurrentCorridorEscortRoute() {
  return GameState.corridor.mode === "escortToYard" ?
    CorridorLayout.escortRoutes.toYard :
    CorridorLayout.escortRoutes.toSolitary;
}

function updateCorridorEscort(dt) {
  const corridor = GameState.corridor;
  const route = getCurrentCorridorEscortRoute();
  const waypoint = route[corridor.escortRouteIndex];
  if (!waypoint) {
    finishCorridorEscort();
    return;
  }

  const speed = CORRIDOR_ESCORT_CANVAS_SPEED / CORRIDOR_WORLD_SCALE;
  const playerArrived = movePlayerForCorridorEscort(waypoint.player, speed, dt);
  let guardsArrived = true;
  corridor.guards.forEach((guard, index) => {
    guardsArrived = moveCorridorActorTo(guard, waypoint.guards[index], speed, dt) && guardsArrived;
  });

  if (playerArrived && guardsArrived) {
    corridor.escortRouteIndex += 1;
    if (corridor.escortRouteIndex >= route.length) {
      finishCorridorEscort();
    }
  }
}

function movePlayerForCorridorEscort(target, speed, dt) {
  const player = GameState.player;
  const foot = corridorWorldToImagePoint(getPlayerFootPoint(player.x, player.y));
  const dx = target.x - foot.x;
  const dy = target.y - foot.y;
  const remaining = Math.hypot(dx, dy);
  player.vx = 0;
  player.vy = 0;
  if (remaining <= 3) {
    setPlayerFootToCorridorImage(target.x, target.y);
    player.isMoving = false;
    player.walkAnimTime = 0;
    return true;
  }
  const step = Math.min(remaining, speed * dt);
  const next = { x: foot.x + dx / remaining * step, y: foot.y + dy / remaining * step };
  if (!isCorridorFootPointWalkable(next)) {
    player.isMoving = false;
    return false;
  }
  const world = corridorImageToWorldPoint(next.x, next.y);
  player.x = world.x - player.w / 2;
  player.y = world.y - player.h + 8;
  player.facing = directionFromDelta(dx, dy);
  player.isMoving = true;
  player.walkAnimTime += dt;
  return false;
}

function moveCorridorActorTo(actor, target, speed, dt) {
  if (!actor || !target) {
    return true;
  }
  const dx = target.x - actor.x;
  const dy = target.y - actor.y;
  const remaining = Math.hypot(dx, dy);
  if (remaining <= 3) {
    actor.x = target.x;
    actor.y = target.y;
    actor.isMoving = false;
    actor.walkAnimTime = 0;
    return true;
  }
  const step = Math.min(remaining, speed * dt);
  actor.x += dx / remaining * step;
  actor.y += dy / remaining * step;
  actor.facing = directionFromDelta(dx, dy);
  actor.visualFacing = actor.facing;
  actor.isMoving = true;
  actor.walkAnimTime += dt;
  return false;
}

function finishCorridorEscort() {
  const corridor = GameState.corridor;
  corridor.guards.forEach((guard) => {
    guard.isMoving = false;
    guard.walkAnimTime = 0;
  });
  if (corridor.mode === "escortToYard") {
    corridor.lastExitPortal = "yard";
    corridor.mode = "free";
    corridor.initialized = false;
    GameState.sideRoute.stage = "yardEscortToCenter";
    changeScene("yard");
    return;
  }
  corridor.lastExitPortal = "solitary";
  corridor.mode = "free";
  corridor.initialized = false;
  GameState.sideRoute.stage = "solitaryEntry";
  changeScene("solitary");
}

function getCorridorWorldSize() {
  return {
    w: CorridorLayout.imageWidth * CORRIDOR_WORLD_SCALE,
    h: CorridorLayout.imageHeight * CORRIDOR_WORLD_SCALE
  };
}

function corridorImageToWorldPoint(x, y) {
  return { x: x * CORRIDOR_WORLD_SCALE, y: y * CORRIDOR_WORLD_SCALE };
}

function corridorWorldToImagePoint(point) {
  return { x: point.x / CORRIDOR_WORLD_SCALE, y: point.y / CORRIDOR_WORLD_SCALE };
}

function corridorImagePointToScreen(x, y) {
  const world = corridorImageToWorldPoint(x, y);
  const size = getCorridorWorldSize();
  return {
    x: (CANVAS_WIDTH - size.w) / 2 + world.x,
    y: world.y - GameState.corridor.cameraY
  };
}

function corridorImageRectToScreen(rect) {
  const topLeft = corridorImagePointToScreen(rect.x, rect.y);
  return {
    x: topLeft.x,
    y: topLeft.y,
    w: rect.w * CORRIDOR_WORLD_SCALE,
    h: rect.h * CORRIDOR_WORLD_SCALE
  };
}

function setPlayerFootToCorridorImage(x, y) {
  const world = corridorImageToWorldPoint(x, y);
  const player = GameState.player;
  player.x = world.x - player.w / 2;
  player.y = world.y - player.h + 8;
  player.vx = 0;
  player.vy = 0;
  player.isMoving = false;
  player.walkAnimTime = 0;
}

function isCorridorFootPointWalkable(point) {
  return pointInPolygon(point, CorridorLayout.walkPolygon) &&
    !isPointOnPolygonEdge(point, CorridorLayout.walkPolygon, 2.5);
}

function isCorridorPositionWalkable(x, y) {
  return isCorridorFootPointWalkable(
    corridorWorldToImagePoint(getPlayerFootPoint(x, y))
  );
}

function movePlayerToNearestCorridorPoint() {
  const player = GameState.player;
  const foot = corridorWorldToImagePoint(getPlayerFootPoint(player.x, player.y));
  let bestPoint = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let y = 170; y <= 1208; y += 12) {
    for (let x = 145; x <= 674; x += 12) {
      const point = { x, y };
      if (!isCorridorFootPointWalkable(point)) {
        continue;
      }
      const pointDistance = distance(foot.x, foot.y, point.x, point.y);
      if (pointDistance < bestDistance) {
        bestDistance = pointDistance;
        bestPoint = point;
      }
    }
  }
  if (bestPoint) {
    setPlayerFootToCorridorImage(bestPoint.x, bestPoint.y);
  }
}

function updateCorridorCamera() {
  const size = getCorridorWorldSize();
  const foot = getPlayerFootPoint(GameState.player.x, GameState.player.y);
  const desiredY = foot.y - CANVAS_HEIGHT / 2 + CORRIDOR_CAMERA_LOOK_AHEAD;
  GameState.corridor.cameraY = clamp(desiredY, 0, Math.max(0, size.h - CANVAS_HEIGHT));
}

function handlePauseInput() {
  if (InputSystem.actionPressed("pause")) {
    changeScene("pause");
  }
}

function registerCellWallSecret() {
  if (GameState.posterType) {
    return false;
  }
  GameState.secrets.wallChecks += 1;
  const unlocked = GameState.secrets.wallChecks >= 3 && AchievementSystem.unlock("wall_voice");
  if (unlocked) {
    DialogueSystem.start([
      "安迪（贴近墙面）：有些墙是用锤子凿开的，有些墙只能靠时间。"
    ]);
  }
  return unlocked;
}

function investigateCellWallSecret() {
  if (!registerCellWallSecret()) {
    startPropInteraction([
      "墙面冰冷而坚硬，砖缝里积着一层细灰。"
    ]);
  }
}

function updateLibraryExplorationAchievement() {
  if (GameState.scene !== "library") {
    return;
  }
  const foot = canvasPointToLibraryImage(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  if (foot && foot.y <= LibraryLayout.imageHeight / 3) {
    AchievementSystem.unlock("bookshelf_secret");
  }
}

function updateYardExplorationAchievements() {
  if (GameState.scene !== "yard" || GameState.sideRoute.active || isOpeningYardArrival()) {
    return;
  }

  const foot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  if (foot.y >= 1170) {
    AchievementSystem.unlock("map_edge");
  }
  if (foot.x <= 340 && foot.y <= 250) {
    GameState.secrets.yardCorners.tl = true;
  }
  if (foot.x >= 1140 && foot.y <= 250) {
    GameState.secrets.yardCorners.tr = true;
  }
  if (foot.x <= 90 && foot.y >= 1135) {
    GameState.secrets.yardCorners.bl = true;
  }
  if (foot.x >= 1140 && foot.y >= 1135) {
    GameState.secrets.yardCorners.br = true;
  }
  if (Object.keys(GameState.secrets.yardCorners).length >= 4) {
    AchievementSystem.unlock("four_corners");
  }
}

// ======================================================
// 8. Dialogue System
// ======================================================
const DialogueBoxLayout = {
  sourceW: 840,
  sourceH: 303,
  canvasRect: { x: 190, y: 383, w: 900, h: 325 },
  textSourceRects: {
    npc: { x: 150, y: 70, w: 650, h: 190 },
    andy: { x: 35, y: 65, w: 665, h: 195 }
  },
  nameSourceRects: {
    npc: { x: 151, y: 19, w: 150, h: 45 },
    andy: { x: 558, y: 12, w: 150, h: 45 }
  },
  portraitSourceRects: {
    npc: { x: 19, y: 18, w: 99, h: 99 },
    andy: { x: 731, y: 18, w: 93, h: 94 }
  }
};

const DialoguePortraitAssetKeys = {
  "安迪": "portrait_andy",
  "瑞德": "portrait_red",
  "弗洛伊德": "portrait_floyd",
  "汤米": "portrait_tommy",
  "海伍德": "portrait_haywood",
  "看守": "portrait_guard",
  "狱警": "portrait_guard",
  "守卫": "portrait_guard",
  "幕后主使": "portrait_warden",
  "典狱长": "portrait_warden",
  "老布": "portrait_brooks",
  "布鲁克斯": "portrait_brooks",
  "布鲁克斯先生": "portrait_brooks",
  "超市经理": "portrait_store_manager"
};

const NarrativeBoxLayout = {
  // The supplied frame includes a black canvas around the metal panel. Only
  // this source region contains the actual frame, so it can scale cleanly.
  sourceRect: { x: 92, y: 228, w: 1352, h: 510 },
  // Keep all in-game narration and prompt text compact and centred at bottom.
  canvasRect: { x: 482, y: 586, w: 316, h: 118 },
  textSourceRect: { x: 86, y: 108, w: 1180, h: 304 }
};

const PropInteractionBoxLayout = {
  canvasRect: { x: 320, y: 558, w: 640, h: 155 },
  textRect: { x: 344, y: 584, w: 592, h: 99 }
};

const DialogueSystem = {
  active: false,
  lines: [],
  index: 0,
  justStarted: false,
  displayMode: "auto",

  start(lines, displayMode) {
    this.active = true;
    this.lines = lines.slice();
    this.index = 0;
    this.justStarted = true;
    this.displayMode = displayMode || "auto";
  },

  update() {
    if (!this.active) {
      return;
    }

    if (this.justStarted) {
      this.justStarted = false;
      return;
    }

    if (InputSystem.actionPressed("continueDialogue")) {
      this.index += 1;
      if (this.index >= this.lines.length) {
        this.active = false;
        this.lines = [];
        this.index = 0;
        this.justStarted = false;
        this.displayMode = "auto";
      }
    }
  },

  render(ctx) {
    if (!this.active) {
      return;
    }

    const line = this.lines[this.index] || "";
    if (this.displayMode === "prop") {
      renderPropInteractionBox(ctx, line);
      return;
    }
    if (this.displayMode === "narrative" || !isConversationLine(line)) {
      renderNarrativeBox(ctx, line);
      return;
    }
    renderDialogueBox(ctx, line);
  }
};

// 在获得关键信息后，先保留底部提示，等待玩家确认后再进入安迪的心理描写。
// 这样“获得证据”不会被对话框遮住，也不会在玩家移动时突然打断操作。
const NarrativeCueSystem = {
  pendingLines: null,
  nextQuest: null,

  schedule(lines, nextQuest) {
    this.pendingLines = Array.isArray(lines) ? lines.slice() : [];
    this.nextQuest = nextQuest || null;
  },

  isActive() {
    return Boolean(this.pendingLines) && !DialogueSystem.active;
  },

  handleInput() {
    if (!this.isActive() ||
      (!InputSystem.actionPressed("continueDialogue") && !InputSystem.actionPressed("interact"))) {
      return false;
    }

    const lines = this.pendingLines;
    const nextQuest = this.nextQuest;
    this.pendingLines = null;
    this.nextQuest = null;
    if (nextQuest) {
      GameState.currentQuest = nextQuest;
    }
    if (lines.length) {
      DialogueSystem.start(lines);
    }
    return true;
  },

  reset() {
    this.pendingLines = null;
    this.nextQuest = null;
  }
};


function renderNarrativeBox(ctx, text, box) {
  const frameBox = box || NarrativeBoxLayout.canvasRect;
  ctx.save();
  ctx.shadowBlur = 0;
  drawAssetCrop(
    ctx,
    "narrative_frame",
    NarrativeBoxLayout.sourceRect,
    frameBox.x,
    frameBox.y,
    frameBox.w,
    frameBox.h
  );
  renderNarrativeTextBlock(ctx, text, narrativeSourceRectToCanvas(frameBox, NarrativeBoxLayout.textSourceRect));
  ctx.restore();
}

function renderPropInteractionBox(ctx, text) {
  const layout = PropInteractionBoxLayout;
  const parsed = parseDialogueLine(text);
  ctx.save();
  ctx.shadowBlur = 0;
  drawAsset(
    ctx,
    "prop_interaction_frame",
    layout.canvasRect.x,
    layout.canvasRect.y,
    layout.canvasRect.w,
    layout.canvasRect.h
  );
  renderDialogueTextBlock(ctx, parsed.text || text, layout.textRect);
  ctx.restore();
}

function startPropInteraction(lines) {
  DialogueSystem.start(lines, "prop");
}

function narrativeSourceRectToCanvas(box, rect) {
  return {
    x: box.x + rect.x * box.w / NarrativeBoxLayout.sourceRect.w,
    y: box.y + rect.y * box.h / NarrativeBoxLayout.sourceRect.h,
    w: rect.w * box.w / NarrativeBoxLayout.sourceRect.w,
    h: rect.h * box.h / NarrativeBoxLayout.sourceRect.h
  };
}

function renderDialogueBox(ctx, line) {
  const parsed = parseDialogueLine(line);
  const variant = parsed.speaker === "\u5b89\u8fea" ? "andy" : "npc";
  const assetKey = variant === "andy" ? "dialogue_andy" : "dialogue_npc";
  const box = DialogueBoxLayout.canvasRect;
  drawAsset(ctx, assetKey, box.x, box.y, box.w, box.h);
  renderDialoguePortrait(ctx, parsed.speaker, variant);

  renderDialogueSpeakerName(
    ctx,
    parsed.speaker,
    dialogueSourceRectToCanvas(DialogueBoxLayout.nameSourceRects[variant])
  );
  renderDialogueTextBlock(
    ctx,
    parsed.text,
    dialogueSourceRectToCanvas(DialogueBoxLayout.textSourceRects[variant])
  );
}

function renderDialoguePortrait(ctx, speaker, variant) {
  const rect = dialogueSourceRectToCanvas(DialogueBoxLayout.portraitSourceRects[variant]);
  if (speaker === "开发者") {
    ctx.save();
    ctx.fillStyle = "#000000";
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.strokeStyle = "#3a2c1a";
    ctx.lineWidth = 4;
    ctx.strokeRect(rect.x + 2, rect.y + 2, rect.w - 4, rect.h - 4);
    ctx.restore();
    return;
  }

  const assetKey = DialoguePortraitAssetKeys[speaker];
  if (!assetKey) {
    return;
  }

  ctx.save();
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.w, rect.h);
  ctx.clip();
  drawAsset(ctx, assetKey, rect.x, rect.y, rect.w, rect.h);
  ctx.restore();
}

function parseDialogueLine(line) {
  const value = String(line || "");
  const colonIndexes = [value.indexOf("\uff1a"), value.indexOf(":")]
    .filter((index) => index > 0);
  const colonIndex = colonIndexes.length ? Math.min.apply(null, colonIndexes) : -1;

  if (colonIndex > 0) {
    const rawSpeaker = value.slice(0, colonIndex).trim();
    const stageDirections = rawSpeaker.match(/[（(][^）)]*[）)]/g) || [];
    const speaker = rawSpeaker.replace(/[（(][^）)]*[）)]/g, "").trim();
    if (speaker && speaker.length <= 8) {
      return {
        speaker,
        text: (stageDirections.length ? stageDirections.join("") + "\n" : "") + value.slice(colonIndex + 1).trim(),
        stageDirections
      };
    }
  }

  return {
    speaker: "",
    text: value,
    stageDirections: []
  };
}

function isConversationLine(line) {
  const parsed = parseDialogueLine(line);
  return Boolean(parsed.speaker) &&
    !/^(旁白|提示|系统|状态)/.test(parsed.speaker) &&
    !parsed.stageDirections.some((direction) => /心理|内心/.test(direction));
}

function dialogueSourceRectToCanvas(rect) {
  const box = DialogueBoxLayout.canvasRect;
  return {
    x: box.x + rect.x * box.w / DialogueBoxLayout.sourceW,
    y: box.y + rect.y * box.h / DialogueBoxLayout.sourceH,
    w: rect.w * box.w / DialogueBoxLayout.sourceW,
    h: rect.h * box.h / DialogueBoxLayout.sourceH
  };
}

function renderDialogueSpeakerName(ctx, speaker, rect) {
  if (!speaker) {
    return;
  }

  ctx.save();
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.w, rect.h);
  ctx.clip();
  const fontSize = Math.round(clamp(rect.h * 0.82, 12, 22));
  ctx.font = "bold " + fontSize + "px 'Microsoft YaHei', 'SimHei', monospace";
  const label = fitTextToWidth(ctx, speaker, rect.w - 8, "");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(35, 20, 10, 0.9)";
  ctx.fillStyle = "#f7e6bf";
  ctx.strokeText(label, rect.x + rect.w / 2, rect.y + rect.h / 2);
  ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2);
  ctx.restore();
}

function renderDialogueTextBlock(ctx, text, rect) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.w, rect.h);
  ctx.clip();
  ctx.fillStyle = "#241a10";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const maxTextWidth = Math.max(1, rect.w - 32);
  let fontSize = Math.round(clamp(rect.h * 0.24, 14, 22));
  let lineHeight = 34;
  let lines = [];
  while (fontSize >= 14) {
    ctx.font = fontSize + "px 'Microsoft YaHei', 'SimHei', monospace";
    lineHeight = Math.round(fontSize * 1.38);
    lines = buildWrappedLines(ctx, text, maxTextWidth);
    if (lines.length * lineHeight <= rect.h) {
      break;
    }
    fontSize -= 2;
  }

  const maxLines = Math.max(1, Math.floor(rect.h / lineHeight));
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    lines[lines.length - 1] = fitTextToWidth(ctx, lines[lines.length - 1], maxTextWidth, "...");
  }

  const totalH = lines.length * lineHeight;
  let y = rect.y + Math.max(0, (rect.h - totalH) / 2);
  lines.forEach((lineText) => {
    ctx.fillText(lineText, rect.x + rect.w / 2, y);
    y += lineHeight;
  });
  ctx.restore();
}

function renderNarrativeTextBlock(ctx, text, rect) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.w, rect.h);
  ctx.clip();
  ctx.fillStyle = "#f4dfad";
  ctx.shadowColor = "rgba(0, 0, 0, 0.88)";
  ctx.shadowBlur = 2;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const maxTextWidth = Math.max(1, rect.w - 28);
  let fontSize = Math.round(clamp(rect.h * 0.18, 16, 28));
  let lineHeight = 30;
  let lines = [];
  while (fontSize >= 16) {
    ctx.font = fontSize + "px 'Microsoft YaHei', 'SimHei', monospace";
    lineHeight = Math.round(fontSize * 1.4);
    lines = buildWrappedLines(ctx, text, maxTextWidth);
    if (lines.length * lineHeight <= rect.h) {
      break;
    }
    fontSize -= 2;
  }

  const maxLines = Math.max(1, Math.floor(rect.h / lineHeight));
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    lines[lines.length - 1] = fitTextToWidth(ctx, lines[lines.length - 1], maxTextWidth, "...");
  }

  const totalH = lines.length * lineHeight;
  let y = rect.y + Math.max(0, (rect.h - totalH) / 2);
  lines.forEach((lineText) => {
    ctx.fillText(lineText, rect.x + rect.w / 2, y);
    y += lineHeight;
  });
  ctx.restore();
}

function buildWrappedLines(ctx, text, maxWidth) {
  const paragraphs = String(text || "").split(/\n/);
  const lines = [];

  paragraphs.forEach((paragraph) => {
    const chars = paragraph.split("");
    let line = "";
    chars.forEach((char) => {
      const nextLine = line + char;
      if (line && ctx.measureText(nextLine).width > maxWidth) {
        lines.push(line);
        line = char;
      } else {
        line = nextLine;
      }
    });
    lines.push(line);
  });

  return lines.filter((lineText, index) => lineText || index === 0);
}

function fitTextToWidth(ctx, text, maxWidth, suffix) {
  let value = String(text || "");
  while (value && ctx.measureText(value + suffix).width > maxWidth) {
    value = value.slice(0, -1);
  }
  return value + suffix;
}

// ======================================================
// 9. Inventory System
// ======================================================
const InventoryLayout = {
  boxW: 104,
  boxH: 72,
  gap: 10,
  right: 18,
  startYRatio: 0.25,
  iconSize: 38
};

const InventorySystem = {
  items: [],

  render(ctx) {
    if (getFixedInventoryItems().length === 0) {
      return;
    }
    renderFixedInventoryItems(ctx);
  }
};

function getFixedInventoryItems() {
  const items = [];
  // 物证优先显示，避免玩家同时携带主线道具时看不到关键原件。
  getCollectedPhysicalEvidenceItems().forEach((evidence) => {
    items.push({ type: "evidence", evidence, label: evidence.label });
  });
  const hammerShownInsideBible = GameState.hasHammer &&
    GameState.hasBible &&
    GameState.hammerHiddenInBible;
  if (GameState.hasHammer && !hammerShownInsideBible) {
    items.push({ assetKey: "hammer", label: "石锤" });
  }
  if (GameState.hasBible) {
    items.push({
      assetKey: "bible",
      label: hammerShownInsideBible ? "圣经（藏锤）" : "圣经"
    });
  }
  const poster = getSelectedPoster();
  if (poster && !GameState.posterHung) {
    items.push({ type: "poster", poster, label: poster.name, pending: isPosterPickupAnimationActive() });
  }
  if (GameState.hasSoilPile) {
    items.push({ assetKey: "soil_pile", label: "小土堆" });
  }
  if (GameState.hasLedger || GameState.ledgerSwapped) {
    items.push({ assetKey: "bill", label: "账本" });
  }
  if (GameState.hasMap) {
    items.push({ assetKey: "map", label: "地图" });
  }
  return items;
}

function getInventoryItemBoxRect(index) {
  return {
    x: CANVAS_WIDTH - InventoryLayout.boxW - InventoryLayout.right,
    y: Math.round(CANVAS_HEIGHT * InventoryLayout.startYRatio) + index * (InventoryLayout.boxH + InventoryLayout.gap),
    w: InventoryLayout.boxW,
    h: InventoryLayout.boxH
  };
}

function getCollectedPhysicalEvidenceItems() {
  return PhysicalEvidenceItems.filter((evidence) => GameState[evidence.flag]);
}

function getPhysicalEvidenceForNpc(npcId) {
  return PhysicalEvidenceItems.find((evidence) => evidence.npcId === npcId) || null;
}

function getPhysicalEvidenceById(evidenceId) {
  return PhysicalEvidenceItems.find((evidence) => evidence.id === evidenceId) || null;
}

function getPhysicalEvidenceInventoryHit() {
  const items = getFixedInventoryItems();
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const box = getInventoryItemBoxRect(index);
    if (item.type === "evidence" && box.y + box.h <= CANVAS_HEIGHT && InputSystem.pointerInRect(box)) {
      return item.evidence;
    }
  }
  return null;
}

function isEvidenceViewerOpen() {
  return Boolean(GameState.evidenceViewer.activeEvidenceId);
}

function handleEvidenceViewerInput() {
  if (isEvidenceViewerOpen()) {
    if (InputSystem.pointerJustPressed ||
      InputSystem.actionPressed("interact") ||
      InputSystem.actionPressed("continueDialogue") ||
      InputSystem.actionPressed("pause")) {
      GameState.evidenceViewer.activeEvidenceId = null;
      InputSystem.resetJoystick();
      InputSystem.actionButton.held = false;
      return true;
    }
    return true;
  }

  if (DialogueSystem.active || NarrativeCueSystem.isActive() ||
    !shouldRenderInventory() || !InputSystem.pointerJustPressed ||
    GameState.posterChoiceActive || isPosterPickupAnimationActive() ||
    GameState.radioRepairActive || GameState.libraryTask.sortingActive ||
    GameState.pipeMazeActive || GameState.hammerHidePuzzle.active) {
    return false;
  }

  const evidence = getPhysicalEvidenceInventoryHit();
  if (!evidence) {
    return false;
  }
  GameState.evidenceViewer.activeEvidenceId = evidence.id;
  InputSystem.resetJoystick();
  InputSystem.actionButton.held = false;
  return true;
}

function renderFixedInventoryItems(ctx) {
  const items = getFixedInventoryItems();

  const boxW = InventoryLayout.boxW;
  const boxH = InventoryLayout.boxH;
  const iconSize = InventoryLayout.iconSize;

  ctx.save();
  ctx.fillStyle = "#f5df9d";
  ctx.font = "15px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  items.forEach((item, index) => {
    const box = getInventoryItemBoxRect(index);
    const boxX = box.x;
    const boxY = box.y;
    const centerX = boxX + boxW / 2;
    const iconY = boxY + 7;
    const iconX = centerX - iconSize / 2;
    renderPanel(ctx, boxX, boxY, boxW, boxH);
    if (item.type === "evidence") {
      const highlighted = InputSystem.pointerInRect(box);
      ctx.strokeStyle = highlighted ? "#f4d77c" : "#c19a50";
      ctx.lineWidth = highlighted ? 3 : 2;
      ctx.strokeRect(boxX + 5, boxY + 5, boxW - 10, boxH - 10);
      ctx.fillStyle = highlighted ? "#ffe5a3" : "#c5a56a";
      ctx.font = "10px 'Microsoft YaHei', 'SimHei', monospace";
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      ctx.fillText("查看", boxX + boxW - 8, boxY + 8);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#f5df9d";
      ctx.font = "15px monospace";
    }
    if (item.type === "poster") {
      if (!item.pending) {
        drawAssetContainInBounds(ctx, item.poster.assetKey, { x: iconX, y: iconY, w: iconSize, h: iconSize }, iconSize, iconSize);
      }
    } else if (item.type === "evidence") {
      renderPhysicalEvidenceInventoryIcon(ctx, item.evidence, iconX, iconY, iconSize, iconSize);
    } else {
      drawAsset(ctx, item.assetKey, iconX, iconY, iconSize, iconSize);
    }
    ctx.fillText(fitTextToWidth(ctx, item.label, boxW - 12, ""), centerX, boxY + boxH - 10);
  });
  ctx.restore();
}

function renderPhysicalEvidenceInventoryIcon(ctx, evidence, x, y, w, h) {
  ctx.save();
  if (evidence.icon === "registerPage") {
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(-0.08);
    ctx.fillStyle = "#e2d1a4";
    ctx.fillRect(-w * 0.4, -h * 0.47, w * 0.8, h * 0.94);
    ctx.strokeStyle = "#715b36";
    ctx.lineWidth = 2;
    ctx.strokeRect(-w * 0.4, -h * 0.47, w * 0.8, h * 0.94);
    ctx.strokeStyle = "#978361";
    ctx.lineWidth = 1;
    [-h * 0.22, -h * 0.04, h * 0.14].forEach((lineY) => {
      ctx.beginPath();
      ctx.moveTo(-w * 0.29, lineY);
      ctx.lineTo(w * 0.27, lineY);
      ctx.stroke();
    });
    ctx.strokeStyle = "#9a392d";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(w * 0.19, h * 0.25, w * 0.13, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#6f2a24";
    ctx.font = "bold 8px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("D", w * 0.19, h * 0.25 + 0.5);
  } else {
    const tagX = x + 2;
    const tagY = y + h * 0.16;
    const tagW = w - 4;
    const tagH = h * 0.68;
    roundedRectPath(ctx, tagX, tagY, tagW, tagH, 5);
    ctx.closePath();
    ctx.fillStyle = "#a77d3b";
    ctx.fill();
    ctx.strokeStyle = "#e1c173";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#322512";
    ctx.beginPath();
    ctx.arc(tagX + 7, tagY + tagH / 2, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2b2012";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("D-17", tagX + tagW * 0.6, tagY + tagH * 0.43);
    ctx.font = "6px monospace";
    ctx.fillText("02:10", tagX + tagW * 0.6, tagY + tagH * 0.69);
  }
  ctx.restore();
}

function renderEvidenceViewer(ctx) {
  const evidence = getPhysicalEvidenceById(GameState.evidenceViewer.activeEvidenceId);
  if (!evidence) {
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(3, 3, 3, 0.84)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  renderPanel(ctx, 194, 34, 892, 632);

  ctx.fillStyle = "#f1dca6";
  ctx.font = "bold 32px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(evidence.title, CANVAS_WIDTH / 2, 82);
  ctx.fillStyle = "#a99162";
  ctx.font = "17px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.fillText(evidence.subtitle, CANVAS_WIDTH / 2, 114);

  if (evidence.icon === "registerPage") {
    renderTransferRegisterEvidence(ctx);
  } else {
    renderTransferTagEvidence(ctx);
  }

  ctx.fillStyle = "#d9c99e";
  ctx.font = "18px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.textAlign = "center";
  ctx.fillText("点击画面或按空格键返回", CANVAS_WIDTH / 2, 626);
  ctx.restore();
}

function renderTransferRegisterEvidence(ctx) {
  const page = { x: 406, y: 142, w: 468, h: 402 };
  ctx.save();
  ctx.translate(page.x + page.w / 2, page.y + page.h / 2);
  ctx.rotate(-0.025);
  ctx.fillStyle = "#e5d4a6";
  ctx.fillRect(-page.w / 2, -page.h / 2, page.w, page.h);
  ctx.strokeStyle = "#80653b";
  ctx.lineWidth = 4;
  ctx.strokeRect(-page.w / 2 + 2, -page.h / 2 + 2, page.w - 4, page.h - 4);

  ctx.fillStyle = "#4a3b28";
  ctx.font = "bold 24px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("黑墙庄园图书馆 · 借阅登记", 0, -page.h / 2 + 42);
  ctx.font = "16px monospace";
  ctx.fillText("原册第 47 页 / 馆藏原件", 0, -page.h / 2 + 72);

  const tableX = -page.w / 2 + 44;
  const tableY = -page.h / 2 + 104;
  const tableW = page.w - 88;
  const rowH = 48;
  ctx.strokeStyle = "#897656";
  ctx.lineWidth = 2;
  ctx.strokeRect(tableX, tableY, tableW, rowH * 4);
  [1, 2, 3].forEach((row) => {
    ctx.beginPath();
    ctx.moveTo(tableX, tableY + row * rowH);
    ctx.lineTo(tableX + tableW, tableY + row * rowH);
    ctx.stroke();
  });
  [96, 232].forEach((offset) => {
    ctx.beginPath();
    ctx.moveTo(tableX + offset, tableY);
    ctx.lineTo(tableX + offset, tableY + rowH * 4);
    ctx.stroke();
  });

  ctx.fillStyle = "#4d3c28";
  ctx.font = "bold 16px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.fillText("借阅证", tableX + 48, tableY + 24);
  ctx.fillText("日期", tableX + 164, tableY + 24);
  ctx.fillText("备注", tableX + 304, tableY + 24);
  const rows = [
    ["17", "06 / 12", "D 区转送"],
    ["22", "07 / 03", "D 区转送"],
    ["31", "07 / 19", "D 区转送"]
  ];
  ctx.font = "18px monospace";
  rows.forEach((row, index) => {
    const y = tableY + rowH * (index + 1) + 24;
    ctx.fillText(row[0], tableX + 48, y);
    ctx.fillText(row[1], tableX + 164, y);
    ctx.fillText(row[2], tableX + 304, y);
  });

  ctx.strokeStyle = "#983c32";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(page.w / 2 - 70, page.h / 2 - 74, 42, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#80332c";
  ctx.font = "bold 14px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.fillText("馆藏章", page.w / 2 - 70, page.h / 2 - 79);
  ctx.font = "12px monospace";
  ctx.fillText("SHAWSHANK", page.w / 2 - 70, page.h / 2 - 59);
  ctx.restore();

  ctx.fillStyle = "#c9b88c";
  ctx.font = "18px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.textAlign = "center";
  ctx.fillText("可核对点：借阅证编号、三次日期、D 区转送标记与馆藏章。", CANVAS_WIDTH / 2, 578);
}

function renderTransferTagEvidence(ctx) {
  const tag = { x: 380, y: 178, w: 520, h: 270 };
  ctx.save();
  roundedRectPath(ctx, tag.x, tag.y, tag.w, tag.h, 22);
  ctx.closePath();
  ctx.fillStyle = "#a17b3e";
  ctx.fill();
  ctx.strokeStyle = "#e4c979";
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = "#392912";
  ctx.beginPath();
  ctx.arc(tag.x + 48, tag.y + tag.h / 2, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#c3a65d";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.strokeStyle = "#3c2d17";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(tag.x + 66, tag.y + tag.h / 2);
  ctx.lineTo(tag.x + 146, tag.y + tag.h / 2 + 56);
  ctx.stroke();

  ctx.fillStyle = "#30220f";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 76px monospace";
  ctx.fillText("D-17", tag.x + tag.w * 0.59, tag.y + 100);
  ctx.font = "bold 30px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.fillText("后门 · 02:10", tag.x + tag.w * 0.59, tag.y + 160);
  ctx.strokeStyle = "rgba(61, 42, 18, 0.72)";
  ctx.lineWidth = 3;
  [0, 1, 2].forEach((index) => {
    const scratchY = tag.y + 190 + index * 16;
    ctx.beginPath();
    ctx.moveTo(tag.x + 190 + index * 32, scratchY);
    ctx.lineTo(tag.x + tag.w - 48 - index * 24, scratchY - 6);
    ctx.stroke();
  });
  ctx.restore();

  ctx.fillStyle = "#c9b88c";
  ctx.font = "18px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.textAlign = "center";
  ctx.fillText("可核对点：D-17 编号、后门时刻、挂牌孔与断麻绳痕迹。", CANVAS_WIDTH / 2, 514);
  ctx.fillStyle = "#9f8d68";
  ctx.font = "16px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.fillText("弗洛伊德在深色泥地中发现；它与登记页的 D 区标记相互印证。", CANVAS_WIDTH / 2, 550);
}

function getSelectedPoster() {
  return PosterChoices.find((poster) => poster.id === GameState.posterType) || null;
}

function isPosterPickupAnimationActive() {
  return GameState.posterPickupAnimation.active;
}


function getPosterInventoryIconRect() {
  const items = getFixedInventoryItems();
  const posterSlotIndex = items.findIndex((item) => item.type === "poster");
  if (posterSlotIndex < 0) {
    return null;
  }

  const box = getInventoryItemBoxRect(posterSlotIndex);
  const iconBounds = {
    x: box.x + (InventoryLayout.boxW - InventoryLayout.iconSize) / 2,
    y: box.y + 7,
    w: InventoryLayout.iconSize,
    h: InventoryLayout.iconSize
  };
  const poster = items[posterSlotIndex].poster;
  return getAssetContainRectInBounds(poster.assetKey, iconBounds, InventoryLayout.iconSize, InventoryLayout.iconSize);
}

// 取证交流不属于主线任务。人物任务完成后，必须先离开并重新进入院子，
// 才会进入空闲交流时段；每位 NPC 只能进行一次取证交流。
function requireSideTalkRefresh() {
  GameState.sideTalk.refreshRequired = true;
  GameState.sideTalk.available = false;
}

function refreshSideTalksOnYardEnter() {
  if (!GameState.sideTalk.refreshRequired) {
    return;
  }
  const refreshedFromRoom = ["cell", "library", "office"].includes(GameState.previousScene) ||
    (GameState.previousScene === "cellCorridor" && GameState.corridor.originScene === "cell");
  if (refreshedFromRoom) {
    GameState.sideTalk.refreshRequired = false;
    GameState.sideTalk.available = true;
  }
}

function getEvidenceFlagForNpc(npcId) {
  if (npcId === "brooks") return "hasBrooksEvidence";
  if (npcId === "red") return "hasFinancialEvidence";
  if (npcId === "tommy") return "hasTommyEvidence";
  if (npcId === "haywood") return "hasHaywoodEvidence";
  if (npcId === "floyd") return "hasFloydEvidence";
  return null;
}

function isSideTalkEvidenceAvailable(npcId) {
  const evidenceFlag = getEvidenceFlagForNpc(npcId);
  if (!GameState.sideTalk.available || !evidenceFlag || GameState[evidenceFlag]) {
    return false;
  }
  if (npcId === "red" && !GameState.redHammerDelivered) {
    return false;
  }
  return true;
}

function canStartSideTalk(npcId) {
  if (!isSideTalkEvidenceAvailable(npcId)) {
    return false;
  }
  // 二十年后的瑞德谈话是主线，不能被支线闲聊覆盖。
  return !(npcId === "red" && GameState.twentyYearsPassed && !GameState.postMontageRedSpoken);
}

function getPendingRedMainDialogueKind() {
  if (GameState.twentyYearsPassed && !GameState.postMontageRedSpoken) {
    return "postMontage";
  }
  if (!GameState.hasHammer) {
    return "hammer";
  }
  if (GameState.inspectionPassed && GameState.wallDigPromptShown && !GameState.posterType) {
    return "poster";
  }
  return null;
}

function getPendingBrooksMainDialogueKind() {
  if (!GameState.hasHammer) {
    return "hint";
  }
  if (!GameState.hasBible && !GameState.libraryTask.brooksInside) {
    return "invite";
  }
  return null;
}

function queueSideTalkAfterMain(npcId) {
  GameState.sideTalk.queuedNpcId = isSideTalkEvidenceAvailable(npcId) ? npcId : null;
  GameState.sideTalk.afterAction = null;
}

function startQueuedSideTalk(npcId, afterAction) {
  if (GameState.sideTalk.queuedNpcId !== npcId) {
    return false;
  }
  GameState.sideTalk.queuedNpcId = null;
  if (!canStartSideTalk(npcId)) {
    GameState.sideTalk.afterAction = null;
    return false;
  }
  GameState.sideTalk.afterAction = afterAction || null;
  startSideTalk(npcId);
  return GameState.sideTalk.activeNpcId === npcId;
}

function getSideTalkLines(npcId) {
  if (npcId === "brooks") return BrooksEvidenceDialogueLines;
  if (npcId === "red") return RedEvidenceDialogueLines;
  if (npcId === "tommy") return TommyEvidenceDialogueLines;
  if (npcId === "haywood") return HaywoodEvidenceDialogueLines;
  if (npcId === "floyd") return FloydEvidenceDialogueLines;
  return [];
}

function getEvidenceLabelForNpc(npcId) {
  if (npcId === "brooks") return "D 区转送登记页";
  if (npcId === "red") return "空壳公司与结算日期";
  if (npcId === "tommy") return "失踪被困者的转移证言";
  if (npcId === "haywood") return "夜车车牌与日期口述";
  if (npcId === "floyd") return "D-17 铜质转送牌";
  return "线索";
}

function getEvidenceKindForNpc(npcId) {
  if (getPhysicalEvidenceForNpc(npcId)) return "物证";
  if (npcId === "tommy") return "证言";
  return "线索";
}

function startSideTalk(npcId) {
  if (!canStartSideTalk(npcId) || GameState.sideTalk.activeNpcId) {
    return;
  }
  const lines = getSideTalkLines(npcId);
  if (!lines.length) {
    return;
  }
  GameState.sideTalk.activeNpcId = npcId;
  DialogueSystem.start(lines);
}

function updateSideTalk() {
  const npcId = GameState.sideTalk.activeNpcId;
  if (!npcId || DialogueSystem.active) {
    return;
  }

  const evidenceFlag = getEvidenceFlagForNpc(npcId);
  if (evidenceFlag) {
    collectEvidence(evidenceFlag, getEvidenceLabelForNpc(npcId), getEvidenceKindForNpc(npcId), npcId);
  }

  const afterAction = GameState.sideTalk.afterAction;
  GameState.sideTalk.afterAction = null;
  if (npcId === "red") {
    releaseRedAfterDialogue();
  } else if (npcId === "brooks" && afterAction === "brooksLibraryEntry") {
    startBrooksLibraryEntry();
  } else if (npcId === "brooks") {
    releaseBrooksAfterDialogue();
  } else {
    const prisoner = GameState.yardPrisoners.find((item) => item.assetKey === npcId);
    if (prisoner) {
      prisoner.waitTimer = randomRange(prisoner.restMinSeconds, prisoner.restMaxSeconds);
      prisoner.isMoving = false;
      chooseYardPrisonerTarget(prisoner);
    }
  }
  GameState.sideTalk.activeNpcId = null;
}

function collectEvidence(flag, label, kind, npcId) {
  if (GameState[flag]) {
    return;
  }
  GameState[flag] = true;
  if (getCollectedEvidenceCount() >= 5) {
    AchievementSystem.unlock("every_story");
  }
  const physicalEvidence = getPhysicalEvidenceForNpc(npcId);
  const inventoryNotice = physicalEvidence ? "已放入物品栏。" : "已记录在案。";
  NarrativeCueSystem.schedule([
    "获得" + (kind || "线索") + "：“" + label + "”。" + inventoryNotice + "它不会阻碍脱困，但会影响最终结局。"
  ], GameState.currentQuest);
}

function getCollectedDirectEvidenceCount() {
  return [
    GameState.hasBrooksEvidence,
    GameState.hasFinancialEvidence,
    GameState.hasTommyEvidence,
    GameState.hasHaywoodEvidence,
    GameState.hasFloydEvidence
  ].filter(Boolean).length;
}

function getCollectedEvidenceCount() {
  return getCollectedDirectEvidenceCount() + getObservedConversationEvidenceCount();
}

function hasCompleteEvidence() {
  const directEvidenceCount = getCollectedDirectEvidenceCount();
  return directEvidenceCount === 5 ||
    (directEvidenceCount >= 4 && getObservedConversationEvidenceCount() >= 2);
}

function resolveEndingPath() {
  if (hasCompleteEvidence()) {
    return "../二结局/index.html";
  }
  if (GameState.hasFinancialEvidence) {
    return "../一结局/shawshank_storyboard_interactive.html";
  }
  return "../三结局/shawshank_no_reunion_interactive_bgm.html";
}

function canStartGuardConversation() {
  return GameState.sideTalk.available && !GameState.guardConversation.selectedSource;
}

function getGuardConversationLines(source) {
  return source === "gate" ? GateGuardConversationLines : YardGuardConversationLines;
}

function isGuardConversationTarget(source, guardIndex) {
  const conversation = GameState.guardConversation;
  return conversation.activeSource === source && conversation.activeGuardIndex === guardIndex;
}

function startGuardConversation(source, guardIndex) {
  if (!canStartGuardConversation() || GameState.guardConversation.activeSource) {
    return;
  }
  GameState.guardConversation.selectedSource = source;
  GameState.guardConversation.activeSource = source;
  GameState.guardConversation.activeGuardIndex = guardIndex;
  DialogueSystem.start(getGuardConversationLines(source));
}

function updateGuardConversation() {
  const conversation = GameState.guardConversation;
  if (!conversation.activeSource || DialogueSystem.active) {
    return;
  }
  conversation.activeSource = null;
  conversation.activeGuardIndex = null;
}

// ======================================================
// 9.4 Ambient courtyard conversations
// ======================================================
function initializeAmbientConversationSystem() {
  const state = GameState.ambientConversation;
  if (state.initialized) {
    return;
  }
  state.initialized = true;
  state.cooldown = randomRange(AMBIENT_CHAT_INITIAL_MIN_SECONDS, AMBIENT_CHAT_INITIAL_MAX_SECONDS);
  refillAmbientCasualBag();
}

function isAmbientConversationTopicUnlocked(topic) {
  if (!topic || topic.type !== "evidence") {
    return true;
  }
  if (topic.unlock === "hammer") {
    return GameState.hasHammer || GameState.redHammerDelivered;
  }
  if (topic.unlock === "inspection") {
    return GameState.inspectionPassed;
  }
  if (topic.unlock === "postMontageRed") {
    return GameState.twentyYearsPassed && GameState.postMontageRedSpoken;
  }
  return false;
}

function hasObservedConversationEvidence(evidenceId) {
  return Array.isArray(GameState.observedConversationEvidenceIds) &&
    GameState.observedConversationEvidenceIds.includes(evidenceId);
}

function normalizeObservedConversationEvidenceIds(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  const validIds = new Set(AmbientConversationTopics
    .filter((topic) => topic.type === "evidence")
    .map((topic) => topic.evidenceId));
  return Array.from(new Set(value.filter((id) => validIds.has(id))));
}

function getObservedConversationEvidenceCount() {
  return normalizeObservedConversationEvidenceIds(GameState.observedConversationEvidenceIds).length;
}

function isAmbientConversationSystemBlocked() {
  return GameState.scene !== "yard" ||
    isOpeningYardArrival() ||
    GameState.sideRoute.active ||
    DialogueSystem.active ||
    NarrativeCueSystem.isActive() ||
    GameState.posterChoiceActive ||
    isPosterPickupAnimationActive() ||
    GameState.radioRepairActive ||
    GameState.pipeMazeActive ||
    GameState.hasSoilPile ||
    GameState.soilDump.active ||
    GameState.yardNavigationMap.expanded ||
    isEvidenceViewerOpen() ||
    isRedDialogueApproachActive() ||
    isBrooksDialogueApproachActive() ||
    Boolean(GameState.sideTalk.activeNpcId) ||
    Boolean(GameState.guardConversation.activeSource) ||
    GameState.yardGuards.some((guard) => guard.investigatingSoilDump);
}

function getAmbientConversationActors() {
  const actors = [];
  const red = GameState.redNpc;
  if (red.initialized && red.mode === "patrol") {
    actors.push({ key: "red", characterId: "red", actor: red });
  }
  const brooks = GameState.brooksNpc;
  if (!GameState.twentyYearsPassed && !GameState.libraryTask.brooksInside &&
    brooks.initialized && brooks.mode === "patrol") {
    actors.push({ key: "brooks", characterId: "brooks", actor: brooks });
  }
  GameState.yardPrisoners.forEach((prisoner) => {
    if (["tommy", "haywood", "floyd"].includes(prisoner.assetKey)) {
      actors.push({ key: prisoner.assetKey, characterId: prisoner.assetKey, actor: prisoner });
    }
  });
  GameState.yardGuards.forEach((guard, index) => {
    actors.push({ key: "guard:" + index, characterId: "guard", actor: guard, guardIndex: index });
  });
  return actors;
}

function getAmbientConversationActor(actorKey) {
  return getAmbientConversationActors().find((entry) => entry.key === actorKey) || null;
}

function isAmbientActorIdle(entry) {
  if (!entry || !entry.actor || entry.actor.isMoving) {
    return false;
  }
  if (entry.characterId === "guard") {
    return !entry.actor.investigatingSoilDump &&
      !isGuardConversationTarget("yard", entry.guardIndex);
  }
  if (entry.characterId === "red") {
    return entry.actor.mode === "patrol" && entry.actor.pauseTimer > 0;
  }
  if (entry.characterId === "brooks") {
    return entry.actor.mode === "patrol" && entry.actor.waitTimer > 0;
  }
  return entry.actor.waitTimer > 0;
}

function doesAmbientActorMatchToken(entry, token) {
  return Boolean(entry) && (token === "guard" ? entry.characterId === "guard" : entry.characterId === token);
}

function orderAmbientPairForTopic(first, second, topic) {
  if (doesAmbientActorMatchToken(first, topic.participants[0]) &&
    doesAmbientActorMatchToken(second, topic.participants[1])) {
    return [first, second];
  }
  if (doesAmbientActorMatchToken(second, topic.participants[0]) &&
    doesAmbientActorMatchToken(first, topic.participants[1])) {
    return [second, first];
  }
  return null;
}

function getAmbientConversationOptions() {
  const idleActors = getAmbientConversationActors().filter(isAmbientActorIdle);
  const options = [];
  for (let firstIndex = 0; firstIndex < idleActors.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < idleActors.length; secondIndex += 1) {
      const first = idleActors[firstIndex];
      const second = idleActors[secondIndex];
      if (distance(first.actor.x, first.actor.y, second.actor.x, second.actor.y) > AMBIENT_CHAT_PAIR_DISTANCE) {
        continue;
      }
      AmbientConversationTopics.forEach((topic) => {
        if (!isAmbientConversationTopicUnlocked(topic) ||
          (topic.type === "evidence" && hasObservedConversationEvidence(topic.evidenceId))) {
          return;
        }
        const participants = orderAmbientPairForTopic(first, second, topic);
        if (participants) {
          options.push({ topic, participants });
        }
      });
    }
  }
  return options;
}

function refillAmbientCasualBag() {
  const ids = AmbientConversationTopics
    .filter((topic) => topic.type === "casual")
    .map((topic) => topic.id);
  for (let index = ids.length - 1; index > 0; index -= 1) {
    const otherIndex = Math.floor(randomRange(0, index + 1));
    const temporary = ids[index];
    ids[index] = ids[otherIndex];
    ids[otherIndex] = temporary;
  }
  GameState.ambientConversation.casualBag = ids;
}

function chooseAmbientConversationOption() {
  let options = getAmbientConversationOptions();
  if (options.length === 0) {
    return null;
  }
  const evidenceOptions = options.filter((option) => option.topic.type === "evidence");
  let casualOptions = options.filter((option) =>
    option.topic.type === "casual" && GameState.ambientConversation.casualBag.includes(option.topic.id));
  if (casualOptions.length === 0 && GameState.ambientConversation.casualBag.length === 0) {
    refillAmbientCasualBag();
    options = getAmbientConversationOptions();
    casualOptions = options.filter((option) =>
      option.topic.type === "casual" && GameState.ambientConversation.casualBag.includes(option.topic.id));
  }

  const state = GameState.ambientConversation;
  const chooseEvidence = evidenceOptions.length > 0 &&
    (casualOptions.length === 0 || state.consecutiveCasual >= AMBIENT_CHAT_EVIDENCE_PITY_COUNT ||
      Math.random() < AMBIENT_CHAT_EVIDENCE_CHANCE);
  const pool = chooseEvidence ? evidenceOptions : casualOptions;
  if (pool.length === 0) {
    return null;
  }
  return pool[Math.floor(randomRange(0, pool.length))];
}

function startAmbientConversation(option) {
  if (!option || GameState.ambientConversation.activeTopicId) {
    return false;
  }
  const state = GameState.ambientConversation;
  const topic = option.topic;
  state.activeTopicId = topic.id;
  state.participantKeys = option.participants.map((entry) => entry.key);
  state.lineIndex = 0;
  state.lineTimer = 0;
  state.observeTimer = 0;
  state.evidenceQualified = false;
  state.pendingNotice = null;

  const first = option.participants[0].actor;
  const second = option.participants[1].actor;
  first.isMoving = false;
  second.isMoving = false;
  first.walkAnimTime = 0;
  second.walkAnimTime = 0;
  first.facing = directionFromDelta(second.x - first.x, second.y - first.y);
  second.facing = directionFromDelta(first.x - second.x, first.y - second.y);
  if (Object.prototype.hasOwnProperty.call(first, "visualFacing")) first.visualFacing = first.facing;
  if (Object.prototype.hasOwnProperty.call(second, "visualFacing")) second.visualFacing = second.facing;

  if (topic.type === "casual") {
    state.consecutiveCasual += 1;
    state.casualBag = state.casualBag.filter((id) => id !== topic.id);
  } else {
    state.consecutiveCasual = 0;
  }
  return true;
}

function getActiveAmbientConversationTopic() {
  return AmbientConversationTopics.find((topic) =>
    topic.id === GameState.ambientConversation.activeTopicId) || null;
}

function getAmbientLineSpeakerKey(topic, line) {
  const keys = GameState.ambientConversation.participantKeys;
  if (!topic || !line || keys.length < 2) {
    return null;
  }
  if (line.speaker === "guard:first") return keys[0];
  if (line.speaker === "guard:second") return keys[1];
  const participantIndex = topic.participants.findIndex((id) => id === line.speaker);
  return participantIndex >= 0 ? keys[participantIndex] : null;
}

function updateAmbientEvidenceObservation(dt, topic, line) {
  const state = GameState.ambientConversation;
  if (!topic || topic.type !== "evidence" || !line || !line.keyEvidence ||
    state.evidenceQualified || hasObservedConversationEvidence(topic.evidenceId)) {
    return;
  }
  const first = getAmbientConversationActor(state.participantKeys[0]);
  const second = getAmbientConversationActor(state.participantKeys[1]);
  if (!first || !second) {
    state.observeTimer = 0;
    return;
  }
  const playerFoot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  const midpoint = {
    x: (first.actor.x + second.actor.x) / 2,
    y: (first.actor.y + second.actor.y) / 2
  };
  if (distance(playerFoot.x, playerFoot.y, midpoint.x, midpoint.y) > AMBIENT_CHAT_OBSERVE_DISTANCE) {
    state.observeTimer = 0;
    return;
  }
  state.observeTimer += dt;
  if (state.observeTimer >= AMBIENT_CHAT_OBSERVE_SECONDS) {
    collectAmbientConversationEvidence(topic);
  }
}

function collectAmbientConversationEvidence(topic) {
  if (!topic || !topic.evidenceId || hasObservedConversationEvidence(topic.evidenceId)) {
    return;
  }
  const state = GameState.ambientConversation;
  GameState.observedConversationEvidenceIds = normalizeObservedConversationEvidenceIds(
    GameState.observedConversationEvidenceIds.concat(topic.evidenceId)
  );
  state.evidenceQualified = true;
  state.pendingNotice = topic.evidenceLabel;
  if (getCollectedEvidenceCount() >= 5) {
    AchievementSystem.unlock("every_story");
  }
  CheckpointSystem.save(GameState.currentCheckpoint);
}

function releaseAmbientConversationParticipants() {
  GameState.ambientConversation.participantKeys.forEach((key) => {
    const entry = getAmbientConversationActor(key);
    if (!entry) return;
    const actor = entry.actor;
    actor.isMoving = false;
    actor.walkAnimTime = 0;
    if (entry.characterId === "red") {
      actor.pauseTimer = Math.max(actor.pauseTimer || 0, randomRange(0.8, 1.6));
    } else if (entry.characterId === "brooks") {
      actor.waitTimer = Math.max(actor.waitTimer || 0, randomRange(0.8, 1.6));
    } else if (entry.characterId === "guard") {
      actor.ambientRestTimer = Math.max(actor.ambientRestTimer || 0, randomRange(0.8, 1.6));
    } else {
      actor.waitTimer = Math.max(actor.waitTimer || 0, randomRange(0.8, 1.6));
    }
  });
}

function finishAmbientConversation(options) {
  const state = GameState.ambientConversation;
  const notice = state.pendingNotice;
  releaseAmbientConversationParticipants();
  state.activeTopicId = null;
  state.participantKeys = [];
  state.lineIndex = 0;
  state.lineTimer = 0;
  state.observeTimer = 0;
  state.evidenceQualified = false;
  state.pendingNotice = null;
  state.cooldown = options && options.retry ?
    randomRange(AMBIENT_CHAT_RETRY_MIN_SECONDS, AMBIENT_CHAT_RETRY_MAX_SECONDS) :
    randomRange(AMBIENT_CHAT_INTERVAL_MIN_SECONDS, AMBIENT_CHAT_INTERVAL_MAX_SECONDS);
  if (notice) {
    state.noticeText = "记录旁听证据：“" + notice + "”。已记录在案，可补强最终证据链。";
    state.noticeTimer = AMBIENT_EVIDENCE_NOTICE_SECONDS;
  }
}

function cancelAmbientConversation() {
  if (!GameState.ambientConversation.activeTopicId) {
    return;
  }
  finishAmbientConversation({ retry: true });
}

function resetAmbientConversationTransientState() {
  const state = GameState.ambientConversation;
  releaseAmbientConversationParticipants();
  state.initialized = false;
  state.cooldown = 0;
  state.activeTopicId = null;
  state.participantKeys = [];
  state.lineIndex = 0;
  state.lineTimer = 0;
  state.observeTimer = 0;
  state.evidenceQualified = false;
  state.consecutiveCasual = 0;
  state.casualBag = [];
  state.pendingNotice = null;
  state.noticeText = "";
  state.noticeTimer = 0;
}

function updateAmbientConversationSystem(dt) {
  initializeAmbientConversationSystem();
  const state = GameState.ambientConversation;
  state.noticeTimer = Math.max(0, state.noticeTimer - dt);
  if (state.noticeTimer <= 0) {
    state.noticeText = "";
  }
  if (isAmbientConversationSystemBlocked()) {
    cancelAmbientConversation();
    return;
  }

  const topic = getActiveAmbientConversationTopic();
  if (topic) {
    const line = topic.lines[state.lineIndex];
    if (!line || state.participantKeys.some((key) => !getAmbientConversationActor(key))) {
      finishAmbientConversation({ retry: true });
      return;
    }
    state.lineTimer += dt;
    updateAmbientEvidenceObservation(dt, topic, line);
    if (state.lineTimer >= AMBIENT_CHAT_LINE_SECONDS) {
      state.lineIndex += 1;
      state.lineTimer = 0;
      state.observeTimer = 0;
      if (state.lineIndex >= topic.lines.length) {
        finishAmbientConversation();
      }
    }
    return;
  }

  state.cooldown = Math.max(0, state.cooldown - dt);
  if (state.cooldown > 0) {
    return;
  }
  const option = chooseAmbientConversationOption();
  if (!startAmbientConversation(option)) {
    state.cooldown = randomRange(AMBIENT_CHAT_RETRY_MIN_SECONDS, AMBIENT_CHAT_RETRY_MAX_SECONDS);
  }
}

function isAmbientConversationParticipant(actorKey) {
  return GameState.ambientConversation.activeTopicId &&
    GameState.ambientConversation.participantKeys.includes(actorKey);
}

function getAmbientSocialTarget(actorId) {
  if (GameState.scene !== "yard" || isOpeningYardArrival() || GameState.sideRoute.active || GameState.hasSoilPile) {
    return null;
  }
  const pointIds = AmbientSocialPointIdsByActor[actorId] || [];
  if (pointIds.length === 0 || Math.random() >= AMBIENT_SOCIAL_TARGET_CHANCE) {
    return null;
  }
  const point = AmbientSocialPoints[pointIds[Math.floor(randomRange(0, pointIds.length))]];
  if (!point) {
    return null;
  }
  const target = {
    x: point.x + randomRange(-18, 18),
    y: point.y + randomRange(-14, 14)
  };
  return isYardNpcPointWalkable(target.x, target.y) ? target : { x: point.x, y: point.y };
}

function forceAmbientConversationTopic(topicId) {
  if (GameState.scene !== "yard" || isAmbientConversationSystemBlocked()) {
    return false;
  }
  initializeAmbientConversationSystem();
  cancelAmbientConversation();
  const topic = AmbientConversationTopics.find((item) => item.id === topicId);
  if (!topic) {
    return false;
  }
  const actors = getAmbientConversationActors();
  for (let firstIndex = 0; firstIndex < actors.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < actors.length; secondIndex += 1) {
      const participants = orderAmbientPairForTopic(actors[firstIndex], actors[secondIndex], topic);
      if (!participants) continue;
      const first = participants[0].actor;
      const second = participants[1].actor;
      const nearbyPoints = [
        { x: first.x + 64, y: first.y },
        { x: first.x - 64, y: first.y },
        { x: first.x, y: first.y + 64 },
        { x: first.x, y: first.y - 64 }
      ];
      const nearbyPoint = nearbyPoints.find((point) => isYardNpcPointWalkable(point.x, point.y));
      if (!nearbyPoint) continue;
      second.x = nearbyPoint.x;
      second.y = nearbyPoint.y;
      return startAmbientConversation({ topic, participants });
    }
  }
  return false;
}

// ======================================================
// 9.5 Courtyard Navigation Map
// ======================================================
const YardNavigationMapSystem = {
  enterYard() {
    loadYardNavigationMapProgress();
    const mapState = GameState.yardNavigationMap;
    if (!mapState.availableThisRun) {
      const leftCellAfterFirstWake = GameState.previousScene === "cell" ||
        (GameState.previousScene === "cellCorridor" && GameState.corridor.originScene === "cell");
      const resumedBeyondFirstCell = !["CP_START", "CP_AFTER_WHITE_LIGHT", "CP_CELL_WAKE"].includes(GameState.currentCheckpoint);
      if (!leftCellAfterFirstWake && !resumedBeyondFirstCell) {
        return;
      }
      mapState.availableThisRun = true;
    }
    if (!mapState.unlocked) {
      mapState.unlocked = true;
      mapState.dirty = true;
    }

    const previousLandmarks = {
      cell: "cellDoor",
      cellCorridor: "cellDoor",
      library: "library",
      office: "wardenOffice"
    };
    const previousLandmark = previousLandmarks[GameState.previousScene];
    if (previousLandmark) {
      markYardNavigationLandmark(previousLandmark);
    }
    revealYardNavigationMapAtPlayer();
    TutorialSystem.maybeStartMapTutorial();
  },

  leaveYard() {
    GameState.yardNavigationMap.expanded = false;
    persistYardNavigationMapProgress(true);
  },

  update(dt) {
    const mapState = GameState.yardNavigationMap;
    if (GameState.scene !== "yard" || !mapState.availableThisRun || !mapState.unlocked || mapState.expanded) {
      return;
    }

    revealYardNavigationMapAtPlayer();
    discoverCurrentYardNavigationLandmark();

    if (mapState.dirty) {
      mapState.persistTimer += dt;
      if (mapState.persistTimer >= YARD_MAP_PERSIST_INTERVAL_SECONDS) {
        persistYardNavigationMapProgress(false);
      }
    }
  },

  handleInput() {
    const mapState = GameState.yardNavigationMap;
    if (GameState.scene !== "yard" || !mapState.availableThisRun || !mapState.unlocked) {
      return false;
    }

    const mapKeyPressed = InputSystem.actionPressed("navigationMap");
    if (mapState.expanded) {
      const clickedClose = InputSystem.pointerJustPressed &&
        InputSystem.pointerInRect(YardNavigationMapLayout.expandedCloseButton);
      if (mapKeyPressed || clickedClose) {
        mapState.expanded = false;
      }
      return mapKeyPressed || InputSystem.pointerJustPressed;
    }

    const compactClicked = InputSystem.pointerJustPressed &&
      InputSystem.pointerInRect(YardNavigationMapLayout.compactFrame);
    const modalActive = DialogueSystem.active || NarrativeCueSystem.isActive() ||
      GameState.posterChoiceActive || GameState.radioRepairActive ||
      isPosterPickupAnimationActive() || isEvidenceViewerOpen();
    if ((mapKeyPressed || compactClicked) && !modalActive) {
      mapState.expanded = true;
      return true;
    }
    return compactClicked;
  },

  isWorldPaused() {
    return GameState.scene === "yard" && GameState.yardNavigationMap.expanded;
  },

  render(ctx) {
    const mapState = GameState.yardNavigationMap;
    if (GameState.scene !== "yard" || !mapState.availableThisRun || !mapState.unlocked ||
      GameState.posterChoiceActive || GameState.radioRepairActive || isEvidenceViewerOpen()) {
      return;
    }
    if (mapState.expanded) {
      renderExpandedYardNavigationMap(ctx);
      return;
    }
    renderCompactYardNavigationMap(ctx);
  }
};

// ======================================================
// 9.6 First-run Tutorial
// ======================================================
const TutorialSystem = {
  elements: null,

  init() {
    const root = document.getElementById("tutorialOverlay");
    if (!root) {
      return;
    }
    this.elements = {
      root,
      scrim: document.getElementById("tutorialScrimPath"),
      focuses: Array.from(root.querySelectorAll("[data-tutorial-focus]")),
      title: document.getElementById("tutorialTitle"),
      body: document.getElementById("tutorialBody"),
      hint: document.getElementById("tutorialHint"),
      continueButton: document.getElementById("tutorialContinueButton")
    };
    this.elements.continueButton.addEventListener("click", (event) => {
      // 按空格时由 InputSystem 推进；忽略按钮随后合成的键盘 click，
      // 避免同一次按键连续跳过“移动”和“交互”两步。
      if (event.detail === 0) {
        return;
      }
      if (this.isActive("wake")) {
        this.advanceWakeTutorial();
      }
    });
    window.addEventListener("resize", () => this.syncOverlay());
    window.addEventListener("orientationchange", () => this.syncOverlay());
    this.hideOverlay();
  },

  isActive(kind) {
    const active = GameState.tutorial && GameState.tutorial.active;
    return kind ? active === kind : Boolean(active);
  },

  update() {
    if (this.isActive() || GameState.wakeTutorialCompleted) {
      return;
    }
    const readyAfterFirstWake = GameState.scene === "cell" &&
      GameState.currentCheckpoint === "CP_CELL_WAKE" &&
      !DialogueSystem.active &&
      !NarrativeCueSystem.isActive() &&
      !GameState.hammerHidePuzzle.active;
    if (readyAfterFirstWake) {
      this.start("wake");
    }
  },

  maybeStartMapTutorial() {
    const mapState = GameState.yardNavigationMap;
    if (GameState.mapTutorialCompleted || this.isActive() ||
      GameState.scene !== "yard" || !mapState.availableThisRun || !mapState.unlocked) {
      return;
    }
    this.start("map");
  },

  start(kind) {
    if (kind !== "wake" && kind !== "map") {
      return;
    }
    GameState.tutorial.active = kind;
    GameState.tutorial.wakeStep = kind === "wake" ? "movement" : null;
    InputSystem.resetAllInput();
    this.syncOverlay();
    if (kind === "wake" && this.elements && this.elements.continueButton) {
      window.requestAnimationFrame(() => {
        if (this.isActive("wake")) {
          this.elements.continueButton.focus({ preventScroll: true });
        }
      });
    }
  },

  handleInput() {
    if (!this.isActive()) {
      return false;
    }
    if (this.isActive("wake")) {
      if (InputSystem.actionPressed("interact")) {
        this.advanceWakeTutorial();
      }
      return true;
    }

    const mapKeyPressed = InputSystem.actionPressed("navigationMap");
    const compactMapClicked = InputSystem.pointerJustPressed &&
      InputSystem.pointerInRect(YardNavigationMapLayout.compactFrame);
    if (mapKeyPressed || compactMapClicked) {
      this.completeMapTutorial();
    }
    return true;
  },

  advanceWakeTutorial() {
    if (!this.isActive("wake")) {
      return;
    }
    if (GameState.tutorial.wakeStep === "movement") {
      GameState.tutorial.wakeStep = "interaction";
      InputSystem.resetAllInput();
      this.syncOverlay();
      if (this.elements && this.elements.continueButton) {
        this.elements.continueButton.focus({ preventScroll: true });
      }
      return;
    }
    this.completeWakeTutorial();
  },

  completeWakeTutorial() {
    if (!this.isActive("wake")) {
      return;
    }
    GameState.wakeTutorialCompleted = true;
    GameState.tutorial.active = null;
    GameState.tutorial.wakeStep = null;
    InputSystem.resetAllInput();
    this.hideOverlay();
    saveCheckpoint(GameState.currentCheckpoint);
  },

  completeMapTutorial() {
    if (!this.isActive("map")) {
      return;
    }
    GameState.mapTutorialCompleted = true;
    GameState.tutorial.active = null;
    GameState.tutorial.wakeStep = null;
    GameState.yardNavigationMap.expanded = true;
    persistYardNavigationMapProgress(true);
    InputSystem.resetAllInput();
    this.hideOverlay();
    saveCheckpoint(GameState.currentCheckpoint);
  },

  resetActive() {
    if (GameState.tutorial) {
      GameState.tutorial.active = null;
      GameState.tutorial.wakeStep = null;
    }
    this.hideOverlay();
  },

  render() {
    this.syncOverlay();
  },

  syncOverlay() {
    if (!this.elements) {
      return;
    }
    if (!this.isActive()) {
      this.hideOverlay();
      return;
    }

    const kind = GameState.tutorial.active;
    const root = this.elements.root;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
    root.classList.toggle("is-wake", kind === "wake");
    root.classList.toggle("is-map", kind === "map");

    if (kind === "wake" && GameState.tutorial.wakeStep === "movement") {
      this.elements.title.textContent = "移动";
      this.elements.body.innerHTML =
        "<p>拖动<strong>左侧摇杆</strong>控制移动，键盘可使用 WASD。</p>";
      this.elements.hint.textContent = "点击下一步，或按空格键继续。";
      this.elements.continueButton.textContent = "下一步";
      this.elements.continueButton.hidden = false;
    } else if (kind === "wake") {
      this.elements.title.textContent = "交互";
      this.elements.body.innerHTML =
        "<p>靠近发光的人物、物品或门后，使用<strong>右侧交互键</strong>进行交谈、调查或开门；对白中也可继续。键盘可按空格。</p>";
      this.elements.hint.textContent = "准备好后，开始四处走动和探索吧。";
      this.elements.continueButton.textContent = "开始探索";
      this.elements.continueButton.hidden = false;
    } else {
      this.elements.title.textContent = "这是庭院地图";
      this.elements.body.innerHTML =
        "<p>你走过的区域会逐步显现，<strong>黄色标记</strong>指向当前目标。</p>";
      this.elements.hint.textContent = "点击左上角地图，或按 M 键查看全图。";
      this.elements.continueButton.hidden = true;
    }

    const targets = kind === "wake" ?
      [this.getWakeTarget(GameState.tutorial.wakeStep)] :
      [this.getMapTarget()];
    this.updateSpotlights(targets.filter(Boolean), kind);
  },

  getWakeTarget(step) {
    const joystickElement = document.querySelector(".bwc-joystick:not([hidden])");
    const actionElement = document.querySelector(".bwc-action:not([hidden])");
    if (step === "interaction" && actionElement) {
      return actionElement.getBoundingClientRect();
    }
    if (step === "movement" && joystickElement) {
      return joystickElement.getBoundingClientRect();
    }
    return step === "interaction" ?
      this.canvasCircleToClientRect(InputSystem.actionButton.x, InputSystem.actionButton.y, InputSystem.actionButton.radius) :
      this.canvasCircleToClientRect(InputSystem.joystick.baseX, InputSystem.joystick.baseY, InputSystem.joystick.radius);
  },

  getMapTarget() {
    return this.canvasRectToClientRect(YardNavigationMapLayout.compactFrame);
  },

  canvasCircleToClientRect(x, y, radius) {
    return this.canvasRectToClientRect({
      x: x - radius,
      y: y - radius,
      w: radius * 2,
      h: radius * 2
    });
  },

  canvasRectToClientRect(rect) {
    if (!canvas) {
      return null;
    }
    const bounds = canvas.getBoundingClientRect();
    return {
      left: bounds.left + rect.x / CANVAS_WIDTH * bounds.width,
      top: bounds.top + rect.y / CANVAS_HEIGHT * bounds.height,
      width: rect.w / CANVAS_WIDTH * bounds.width,
      height: rect.h / CANVAS_HEIGHT * bounds.height,
      right: bounds.left + (rect.x + rect.w) / CANVAS_WIDTH * bounds.width,
      bottom: bounds.top + (rect.y + rect.h) / CANVAS_HEIGHT * bounds.height
    };
  },

  updateSpotlights(rawTargets, kind) {
    const padding = kind === "map" ? 8 : 10;
    const targets = rawTargets.map((rect) => ({
      left: clamp(rect.left - padding, 0, window.innerWidth),
      top: clamp(rect.top - padding, 0, window.innerHeight),
      right: clamp(rect.right + padding, 0, window.innerWidth),
      bottom: clamp(rect.bottom + padding, 0, window.innerHeight)
    })).filter((rect) => rect.right > rect.left && rect.bottom > rect.top);

    this.elements.focuses.forEach((focus, index) => {
      const rect = targets[index];
      if (!rect) {
        focus.style.display = "none";
        return;
      }
      focus.style.display = "block";
      focus.style.left = rect.left + "px";
      focus.style.top = rect.top + "px";
      focus.style.width = (rect.right - rect.left) + "px";
      focus.style.height = (rect.bottom - rect.top) + "px";
      focus.classList.toggle("is-round", kind === "wake");
    });

    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    const holes = targets.map((rect) =>
      "M" + rect.left + " " + rect.top +
      "H" + rect.right + "V" + rect.bottom + "H" + rect.left + "Z"
    ).join(" ");
    this.elements.scrim.setAttribute("d", "M0 0H" + width + "V" + height + "H0Z " + holes);
    const svg = this.elements.scrim.ownerSVGElement;
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
  },

  hideOverlay() {
    if (!this.elements) {
      return;
    }
    this.elements.root.hidden = true;
    this.elements.root.setAttribute("aria-hidden", "true");
    this.elements.focuses.forEach((focus) => {
      focus.style.display = "none";
    });
  }
};

function resetYardNavigationMapProgress(options) {
  const preserveProgress = Boolean(options && options.preserveProgress);
  if (preserveProgress) {
    GameState.yardNavigationMap.availableThisRun = false;
    GameState.yardNavigationMap.expanded = false;
    return;
  }
  GameState.yardNavigationMap = {
    unlocked: false,
    availableThisRun: false,
    expanded: false,
    revealedCells: [],
    revealedLookup: new Uint8Array(YARD_MAP_GRID_COLUMNS * YARD_MAP_GRID_ROWS),
    discoveredLandmarks: [],
    storageLoaded: true,
    dirty: false,
    persistTimer: 0
  };
}

function loadYardNavigationMapProgress() {
  const mapState = GameState.yardNavigationMap;
  if (mapState.storageLoaded) {
    return;
  }
  mapState.storageLoaded = true;
  try {
    const serialized = localStorage.getItem(YARD_NAVIGATION_MAP_STORAGE_KEY);
    if (!serialized) {
      return;
    }
    const record = JSON.parse(serialized);
    if (!record || (record.version !== 1 && record.version !== 2)) {
      return;
    }
    mapState.unlocked = Boolean(record.unlocked);
    mapState.revealedCells = Array.isArray(record.revealedCells) ?
      Array.from(new Set(record.revealedCells.filter(isValidYardNavigationCellIndex))).sort((a, b) => a - b) : [];
    mapState.revealedLookup = createYardNavigationRevealLookup(mapState.revealedCells);
    mapState.discoveredLandmarks = Array.isArray(record.discoveredLandmarks) ?
      Array.from(new Set(record.discoveredLandmarks.filter((id) =>
        YardNavigationMapLandmarks.some((landmark) => landmark.id === id)))) : [];
  } catch (error) {
    if (DEBUG_MODE) {
      console.warn(error);
    }
  }
}

function persistYardNavigationMapProgress(force) {
  const mapState = GameState.yardNavigationMap;
  if (!mapState.storageLoaded || (!force && !mapState.dirty)) {
    return;
  }
  try {
    localStorage.setItem(YARD_NAVIGATION_MAP_STORAGE_KEY, JSON.stringify({
      version: 2,
      unlocked: mapState.unlocked,
      revealedCells: mapState.revealedCells,
      discoveredLandmarks: mapState.discoveredLandmarks
    }));
    mapState.dirty = false;
    mapState.persistTimer = 0;
  } catch (error) {
    if (DEBUG_MODE) {
      console.warn(error);
    }
  }
}

function captureYardNavigationMapProgress() {
  const mapState = GameState.yardNavigationMap;
  return {
    version: 2,
    unlocked: mapState.unlocked,
    revealedCells: mapState.revealedCells.slice(),
    discoveredLandmarks: mapState.discoveredLandmarks.slice()
  };
}

function restoreYardNavigationMapProgress(record) {
  if (!record || !Array.isArray(record.revealedCells) || !Array.isArray(record.discoveredLandmarks)) {
    return;
  }
  const mapState = GameState.yardNavigationMap;
  mapState.unlocked = Boolean(record.unlocked);
  mapState.availableThisRun = false;
  mapState.expanded = false;
  mapState.revealedCells = Array.from(new Set(record.revealedCells.filter(isValidYardNavigationCellIndex)))
    .sort((a, b) => a - b);
  mapState.revealedLookup = createYardNavigationRevealLookup(mapState.revealedCells);
  mapState.discoveredLandmarks = Array.from(new Set(record.discoveredLandmarks.filter((id) =>
    YardNavigationMapLandmarks.some((landmark) => landmark.id === id))));
  mapState.storageLoaded = true;
  mapState.dirty = true;
  mapState.persistTimer = 0;
}

function isValidYardNavigationCellIndex(index) {
  return Number.isInteger(index) && index >= 0 && index < YARD_MAP_GRID_COLUMNS * YARD_MAP_GRID_ROWS;
}

function createYardNavigationRevealLookup(indices) {
  const lookup = new Uint8Array(YARD_MAP_GRID_COLUMNS * YARD_MAP_GRID_ROWS);
  indices.forEach((index) => {
    if (isValidYardNavigationCellIndex(index)) {
      lookup[index] = 1;
    }
  });
  return lookup;
}

function getYardNavigationCellIndex(column, row) {
  return row * YARD_MAP_GRID_COLUMNS + column;
}

function getYardNavigationCellAtPoint(point) {
  const column = clamp(Math.floor(point.x / YardLayout.imageWidth * YARD_MAP_GRID_COLUMNS), 0, YARD_MAP_GRID_COLUMNS - 1);
  const row = clamp(Math.floor(point.y / YardLayout.imageHeight * YARD_MAP_GRID_ROWS), 0, YARD_MAP_GRID_ROWS - 1);
  return { column, row, index: getYardNavigationCellIndex(column, row) };
}

function revealYardNavigationMapAtPlayer() {
  const playerFoot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  revealYardNavigationMapAt(playerFoot, YARD_MAP_REVEAL_RADIUS);
}

function revealYardNavigationMapAt(point, radius) {
  const mapState = GameState.yardNavigationMap;
  const cellWidth = YardLayout.imageWidth / YARD_MAP_GRID_COLUMNS;
  const cellHeight = YardLayout.imageHeight / YARD_MAP_GRID_ROWS;
  const minColumn = clamp(Math.floor((point.x - radius) / cellWidth), 0, YARD_MAP_GRID_COLUMNS - 1);
  const maxColumn = clamp(Math.floor((point.x + radius) / cellWidth), 0, YARD_MAP_GRID_COLUMNS - 1);
  const minRow = clamp(Math.floor((point.y - radius) / cellHeight), 0, YARD_MAP_GRID_ROWS - 1);
  const maxRow = clamp(Math.floor((point.y + radius) / cellHeight), 0, YARD_MAP_GRID_ROWS - 1);
  const allowance = Math.hypot(cellWidth, cellHeight) / 2;
  let changed = false;

  for (let row = minRow; row <= maxRow; row += 1) {
    for (let column = minColumn; column <= maxColumn; column += 1) {
      const centerX = (column + 0.5) * cellWidth;
      const centerY = (row + 0.5) * cellHeight;
      if (distance(point.x, point.y, centerX, centerY) > radius + allowance) {
        continue;
      }
      const index = getYardNavigationCellIndex(column, row);
      if (!mapState.revealedLookup[index]) {
        mapState.revealedLookup[index] = 1;
        mapState.revealedCells.push(index);
        changed = true;
      }
    }
  }

  if (changed) {
    mapState.revealedCells.sort((a, b) => a - b);
    mapState.dirty = true;
  }
}

function isYardNavigationPointRevealed(point) {
  const cell = getYardNavigationCellAtPoint(point);
  return Boolean(GameState.yardNavigationMap.revealedLookup[cell.index]);
}

function markYardNavigationLandmark(id) {
  const mapState = GameState.yardNavigationMap;
  if (!mapState.discoveredLandmarks.includes(id)) {
    mapState.discoveredLandmarks.push(id);
    mapState.dirty = true;
  }
}

function discoverCurrentYardNavigationLandmark() {
  const foot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  YardLayout.interactions.forEach((interaction) => {
    if (isPointInYardInteraction(foot, interaction)) {
      markYardNavigationLandmark(interaction.id);
    }
  });
}

function getYardNavigationQuestTarget() {
  const quest = GameState.currentQuest || "";
  if (quest.includes("office")) {
    return getYardNavigationLandmark("wardenOffice");
  }
  if (quest.includes("library") || quest.includes("bible")) {
    return getYardNavigationLandmark("library");
  }
  if (quest.includes("soil")) {
    return getYardNavigationLandmark("soil");
  }
  if (quest.includes("gate") || quest === "quest_yard_first_walk") {
    return getYardNavigationLandmark("prisonGate");
  }
  if (quest.includes("red") || quest.includes("poster")) {
    return GameState.redNpc;
  }
  if (quest.includes("brooks")) {
    return GameState.brooksNpc;
  }
  if (quest.includes("cell") || quest.includes("wall") || quest.includes("dig")) {
    return getYardNavigationLandmark("cellDoor");
  }
  return null;
}

function getYardNavigationLandmark(id) {
  return YardNavigationMapLandmarks.find((landmark) => landmark.id === id) || null;
}

function mapYardImagePointToNavigationRect(point, rect) {
  return {
    x: rect.x + point.x / YardLayout.imageWidth * rect.w,
    y: rect.y + point.y / YardLayout.imageHeight * rect.h
  };
}

function renderCompactYardNavigationMap(ctx) {
  const plot = YardNavigationMapLayout.compactPlot;
  ctx.save();
  renderYardNavigationMapPlot(ctx, plot, false);
  ctx.restore();
}

function renderExpandedYardNavigationMap(ctx) {
  const frame = YardNavigationMapLayout.expandedFrame;
  const plot = YardNavigationMapLayout.expandedPlot;
  const closeButton = YardNavigationMapLayout.expandedCloseButton;
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#17140f";
  ctx.fillRect(frame.x, frame.y, frame.w, frame.h);
  ctx.strokeStyle = "#b89c5a";
  ctx.lineWidth = 4;
  ctx.strokeRect(frame.x + 2, frame.y + 2, frame.w - 4, frame.h - 4);
  ctx.fillStyle = "#f5df9d";
  ctx.font = "bold 30px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("地图", frame.x + 30, frame.y + 30);

  ctx.fillStyle = InputSystem.pointerInRect(closeButton) ? "#7f6a38" : "#403621";
  ctx.fillRect(closeButton.x, closeButton.y, closeButton.w, closeButton.h);
  ctx.strokeStyle = "#d9c27f";
  ctx.lineWidth = 2;
  ctx.strokeRect(closeButton.x + 1, closeButton.y + 1, closeButton.w - 2, closeButton.h - 2);
  ctx.strokeStyle = "#f5df9d";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(closeButton.x + 14, closeButton.y + 14);
  ctx.lineTo(closeButton.x + closeButton.w - 14, closeButton.y + closeButton.h - 14);
  ctx.moveTo(closeButton.x + closeButton.w - 14, closeButton.y + 14);
  ctx.lineTo(closeButton.x + 14, closeButton.y + closeButton.h - 14);
  ctx.stroke();

  renderYardNavigationMapPlot(ctx, plot, true);
  renderYardNavigationMapLegend(ctx, frame);
  ctx.restore();
}

function renderYardNavigationMapPlot(ctx, rect, expanded) {
  ctx.save();
  ctx.fillStyle = "#0e0e0d";
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.beginPath();
  GameState.yardNavigationMap.revealedCells.forEach((index) => {
    const column = index % YARD_MAP_GRID_COLUMNS;
    const row = Math.floor(index / YARD_MAP_GRID_COLUMNS);
    const x = rect.x + column / YARD_MAP_GRID_COLUMNS * rect.w;
    const y = rect.y + row / YARD_MAP_GRID_ROWS * rect.h;
    const w = rect.w / YARD_MAP_GRID_COLUMNS + 0.8;
    const h = rect.h / YARD_MAP_GRID_ROWS + 0.8;
    ctx.rect(x, y, w, h);
  });
  ctx.clip();
  renderYardNavigationMapGeometry(ctx, rect, expanded);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(218, 194, 127, 0.5)";
  ctx.lineWidth = expanded ? 3 : 2;
  ctx.strokeRect(rect.x + 1, rect.y + 1, rect.w - 2, rect.h - 2);
  renderYardNavigationLandmarkMarkers(ctx, rect, expanded);
  renderYardNavigationQuestMarker(ctx, rect, expanded);
  renderYardNavigationPlayerMarker(ctx, rect, expanded);
  ctx.restore();
}

function renderYardNavigationMapGeometry(ctx, rect, expanded) {
  void expanded;
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  drawAsset(ctx, "yard_map_thumbnail", rect.x, rect.y, rect.w, rect.h);
  ctx.fillStyle = "rgba(18, 12, 6, 0.12)";
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.restore();
}

function renderYardNavigationLandmarkMarkers(ctx, rect, expanded) {
  YardNavigationMapLandmarks.forEach((landmark) => {
    if (!GameState.yardNavigationMap.discoveredLandmarks.includes(landmark.id)) {
      return;
    }
    const point = mapYardImagePointToNavigationRect(landmark, rect);
    if (expanded) {
      ctx.fillStyle = "#f0e4c2";
      ctx.font = "bold 16px 'Microsoft YaHei', 'SimHei', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(landmark.label, point.x, point.y - 9);
    }
  });
}

function renderYardNavigationPlayerMarker(ctx, rect, expanded) {
  const foot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  const point = mapYardImagePointToNavigationRect(foot, rect);
  const radius = expanded ? 9 : 5;
  ctx.fillStyle = "#76d7ff";
  ctx.strokeStyle = "#e9fbff";
  ctx.lineWidth = expanded ? 3 : 2;
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function renderYardNavigationQuestMarker(ctx, rect, expanded) {
  const target = getYardNavigationQuestTarget();
  if (!target) {
    return;
  }
  if (isYardNavigationPointRevealed(target)) {
    const point = mapYardImagePointToNavigationRect(target, rect);
    const radius = expanded ? 13 : 7;
    ctx.strokeStyle = "#ffe36f";
    ctx.lineWidth = expanded ? 4 : 2;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.stroke();
    return;
  }

  const foot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  const angle = Math.atan2(target.y - foot.y, target.x - foot.x);
  const centerX = rect.x + rect.w / 2;
  const centerY = rect.y + rect.h / 2;
  const arrowX = centerX + Math.cos(angle) * rect.w * 0.42;
  const arrowY = centerY + Math.sin(angle) * rect.h * 0.42;
  const size = expanded ? 18 : 10;
  ctx.save();
  ctx.translate(clamp(arrowX, rect.x + size, rect.x + rect.w - size), clamp(arrowY, rect.y + size, rect.y + rect.h - size));
  ctx.rotate(angle + Math.PI / 2);
  ctx.fillStyle = "#ffe36f";
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.68, size * 0.7);
  ctx.lineTo(0, size * 0.38);
  ctx.lineTo(-size * 0.68, size * 0.7);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function renderYardNavigationMapLegend(ctx, frame) {
  const x = frame.x + 24;
  const y = frame.y + 112;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = "16px 'Microsoft YaHei', 'SimHei', sans-serif";
  YardNavigationMapLegendItems.forEach((item, index) => {
    const itemY = y + index * 38;
    ctx.fillStyle = item.color;
    if (item.shape === "circle") {
      ctx.beginPath();
      ctx.arc(x + 7, itemY, 7, 0, Math.PI * 2);
      ctx.fill();
    } else if (item.shape === "ring") {
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x + 7, itemY, 6, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.fillRect(x, itemY - 7, 14, 14);
    }
    ctx.fillStyle = "#ddd4be";
    ctx.fillText(item.label, x + 22, itemY);
  });
}

// ======================================================
// 10. Quest System
// ======================================================
const QuestSystem = {
  labels: {
    quest_start: "点击开始按钮，从一次普通观影走进安迪的脱困计划。",
    quest_living_room_tv: "电视画面开始异常闪烁。点击画面或按空格键继续观影，跟住那道白光。",
    quest_recap: "剧情分镜正在展开。点击画面或按空格键逐页推进，先看清这座黑墙庄园的规则。",
    quest_white_light: "白光正在吞没客厅。稍等片刻，你会在电影世界里黑墙庄园院子上方的锁门口醒来。",
    quest_yard_first_walk: "你在黑墙庄园大门前醒来。先观察周围，尝试靠近大门。",
    quest_gate_blackout: "穿过黑墙庄园大门后，眼前陷入黑暗。",
    quest_operating_room_1: "意识在冰冷的手术室里浮沉。",
    quest_operating_room: "痛觉与恐惧一同逼近。",
    quest_operating_room_blackout: "一切再度陷入黑暗。",
    quest_corridor_to_yard: "沿牢房走廊向下，从最下方的门回到院子。",
    quest_corridor_to_cell: "右下方是你的房间，靠近铁门后打开它。",
    quest_corridor_to_yard_morning: "穿过走廊回到院子，观察大门附近的看守。",
    quest_corridor_escort_yard: "两名看守正把你从房间押往院子，无法反抗。",
    quest_corridor_escort_solitary: "两名看守正把你押向走廊上方的小黑屋。",
    quest_corridor_leave_solitary: "小黑屋的门已在身后落锁。沿走廊向下，回院子找老布。",
    quest_cell_wake: "出门找到瑞德",
    quest_cell_hide_hammer: "幕后主使即将检查房间。靠近桌子，把石锤藏进圣经。",
    quest_cell_wait_inspection: "石锤已经藏好。到床边站好，等待幕后主使检查房间。",
    quest_cell_prepare_confiscation_inspection: "幕后主使要检查房间。石锤还在身上，保持镇定。",
    quest_cell_commotion: "外面传来一阵骚动…",
    quest_cell_wall_prompt: "靠近床头墙面，看看墙后的动静。",
    quest_cell_return_red_for_poster: "出门寻找瑞德",
    quest_cell_hang_poster: "靠近床头墙面，把海报贴好，遮住后面的挖掘痕迹。",
    quest_cell_wall_picture: "海报已经贴好。靠近墙面，进入洞口。",
    quest_cell_first_dig_ready: "墙后的洞口已经露出。进入土洞，开始这场漫长脱困的第一铲。",
    quest_cell_inspection: "幕后主使正在检查房间。保持镇定，点击画面或按空格键推进对话。",
    quest_cell_inspection_wait: "幕后主使和看守正在进门。站在床边别乱动，别让锤子暴露。",
    quest_cell_inspection_leave: "检查房间已经通过。等幕后主使和看守离开，再继续行动。",
    quest_cell_hammer_confiscated: "石锤已被没收。两名看守正把你拖出房间。",
    quest_cell_inspection_passed: "检查房间已经结束。出门寻找瑞德。",
    quest_cell_soil_pile: "你带出了第一小堆土。先离开房间，到劳作区找机会把土处理掉。",
    quest_cell_sleep_after_soil: "回到床上休息一会吧。",
    quest_cell_find_red_after_montage: "出门寻找瑞德。",
    quest_cell_draw_map_return: "回到房间桌子处画地图",
    quest_cell_draw_map: "回到房间桌子处画地图",
    quest_cell_pipe_maze: "沿地下水管找到正确通路。只有完成迷宫，才能画出并取得地图。",
    quest_cell_map_ready: "地图已经画好。点击放大的地图或按交互键收好它，继续下一步计划。",
    quest_cell_map_obtained: "幕后主使办公室在黑墙庄园左上方",
    quest_montage_twenty_years: "二十年的重复正在流过：夜里开凿通道，白天藏土，希望一点点扩大。",
    quest_dig_first: "走到土洞右侧的墙面前，长按交互键开始挖掘。",
    quest_dig_dig_here: "长按交互键挖土，直到进度条满",
    quest_dig_return: "土已经装在身上。别久留，从左侧洞口返回，再去劳作区处理小土堆。",
    quest_final_tunnel: "沿最终土洞向右前进，到尽头进入地下水管。",
    quest_cell_final_dig_ready: "靠近床头的画，打开通往水管的土洞。",
    quest_pipe_tunnel: "观察右上角，当闪电出现的时候长按交互键！",
    quest_pipe_opened: "管道被你凿开了！进入管道脱离生天吧！",
    quest_gate_escape: "你穿过了黑墙庄园大门。",
    quest_yard_cell_door: "这里通向房间。靠近右侧建筑的房间入口，点击右下按钮或按空格键返回房间。",
    quest_yard_free_time: "在院内自由活动，检查人物与物品，继续收集能够相互印证的线索。",
    quest_yard_warden_office: "这里是左上角的幕后主使办公室入口。拿到地图后，账本调包会从这里开始。",
    quest_yard_red: "找到瑞德",
    quest_yard_repair_radio: "瑞德把收音机递了过来。调好频率，完成约定。",
    quest_yard_find_red_after_montage: "在院内找到瑞德。二十年后的计划，需要他给出最后线索。",
    quest_yard_red_after_montage_done: "瑞德说清了路线。回到房间桌前，把排水路线画成地图。",
    quest_yard_library: "我现在有锤子了，是不是可以开凿通道了....",
    quest_yard_enter_library: "老布已经带路进馆。靠近图书馆入口，跟他进去。",
    quest_yard_wait_brooks_enter: "等老布走到图书馆门口，然后跟他进馆。",
    quest_yard_bible_obtained: "离开图书馆回到房间",
    quest_yard_choose_poster: "瑞德给出两个文字选项。选定一种海报后，再带回房间张贴。",
    quest_yard_return_cell_to_hang_poster: "回到房间，把海报贴在床头墙面。",
    quest_library_empty: "图书馆里空无一人。老布还在门口；先回院子找瑞德，取得石锤。",
    quest_library_wait_brooks: "老布还在图书馆门口。回院子与他交谈，让他带路进馆。",
    quest_library_bible: "靠近老布与他交谈，帮他整理图书后取得圣经。",
    quest_library_sorting: "整理老布堆积的图书。点击整理按钮完成 3 次。",
    quest_library_leave: "离开图书馆回到房间",
    quest_yard_soil: "在偏右侧椭圆深棕色土地中倒土。每次长按 5 秒；第 3 秒最近看守会靠近。",
    quest_yard_soil_partial: "继续在椭圆深棕色土地中倒土。每次长按到第 3 秒时，注意最近靠近的看守。",
    quest_yard_soil_done: "土已经处理干净。回到右侧房间入口，躺到床上推进二十年计划。",
    quest_side_route_crowd: "两名看守正把你押往院子中央。保持原地，不要反抗。",
    quest_side_route_warden_address: "幕后主使正在当众宣告对你的惩罚。",
    quest_side_route_solitary_stone: "小黑屋角落有一块带血的小石板，靠近后查看。",
    quest_side_route_solitary_sleep: "看过石板后，去右上角草席上睡一觉。",
    quest_side_route_solitary_wake: "天亮了。从左侧锁门离开密闭房间。",
    quest_side_route_find_brooks: "离开密闭房间后，去图书馆前找老布谈谈。",
    quest_side_route_escape_plan: "老布的消息让你看见了新机会：撑到明天的上级来访。",
    quest_side_route_return_cell: "回到右侧房间，在床上睡到明天领导来访。",
    quest_side_route_sleep_until_morning: "躺上床睡觉，等待明天的混乱。",
    quest_side_route_morning_patrol: "三名看守都守在大门附近。先别贸然离开，去左侧幕后主使办公室看看。",
    quest_side_route_gate_caught: "脱困被发现，看守正向你围来。",
    quest_side_route_office_search: "办公室没人。走到幕后主使书桌前，翻找可疑记录。",
    quest_side_route_office_hide: "有人要进来！十秒内躲到上方窗帘后面。",
    quest_side_route_office_listen: "躲在窗帘后，听幕后主使和看守交谈。",
    quest_side_route_office_search_again: "幕后主使和看守已经离开。回到书桌前继续翻找。",
    quest_side_route_office_leave: "他们离开后，必须带着证据设法脱离控制举报幕后主使。",
    quest_side_route_awaiting_continuation: "新的脱困路线已经有了线索，等待下一段剧情。",
    quest_yard_reserved_interaction: "这里暂时没有新的线索。回到当前目标地点，继续推进脱困计划。",
    quest_office_first_warning: "幕后主使发现了你。听完他的警告，立刻离开办公室。",
    quest_office_free_explore: "办公室暂时没人。保持警惕，随时可以从下方房门离开。",
    quest_office_inspection_hide: "门外传来脚步声！五秒内躲到左上方窗帘后面。",
    quest_office_inspection_wait: "保持安静，等查房的人离开办公室。",
    quest_office_warden: "与幕后主使交谈",
    quest_office_warden_leaving: "幕后主使正在离开办公室，等他走远后再搜寻。",
    quest_office_embroidery: "幕后主使已离开。去检查左侧的刺绣，寻找隐藏的保险柜。",
    quest_office_safe: "保险柜已经露出，账本就在里面。找到它后，立刻准备调包。",
    quest_office_swap_ledger: "点击账本，用圣经完成调包，把真正的账本带走。",
    quest_office_leave: "回到房间，准备摆脱控制"
  },

  getCurrentText() {
    return this.labels[GameState.currentQuest] || "";
  },

  render(ctx) {
    const text = this.getCurrentText();
    if (!SHOW_GAMEPLAY_TEXT_HINTS || DialogueSystem.active || !text) {
      return;
    }
    renderQuestText(ctx, text);
  }
};


// ======================================================
// 11. Checkpoint System
// ======================================================
const CheckpointSystem = {
  validCheckpoints: new Set([
    "CP_START",
    "CP_AFTER_WHITE_LIGHT",
    "CP_CELL_WAKE",
    "CP_HAMMER_OBTAINED",
    "CP_BIBLE_OBTAINED",
    "CP_HAMMER_HIDDEN",
    "CP_HAMMER_CONFISCATED",
    "CP_SIDE_ROUTE_RETURN_CELL",
    "CP_INSPECTION_PASSED",
    "CP_POSTER_OBTAINED",
    "CP_FIRST_DIG",
    "CP_SOIL_DISPOSE",
    "CP_POST_MONTAGE_RED",
    "CP_MAP_OBTAINED",
    "CP_OFFICE_DIALOGUE_DONE",
    "CP_FINAL_DIG",
    "CP_PIPE_GAME",
    "CP_ENDING_SELECT"
  ]),

  save(checkpointKey) {
    GameState.currentCheckpoint = checkpointKey;
    try {
      localStorage.setItem(CHECKPOINT_STORAGE_KEY, checkpointKey);
      localStorage.setItem(SAVE_DATA_STORAGE_KEY, JSON.stringify({
        version: 5,
        checkpoint: checkpointKey,
        progress: this.captureProgress()
      }));
    } catch (error) {
      if (DEBUG_MODE) {
        console.warn(error);
      }
    }
  },

  captureProgress() {
    const fields = [
      "hasHammer", "hasBible", "hasLedger", "hasBrooksEvidence",
      "hasFinancialEvidence", "hasTommyEvidence", "hasHaywoodEvidence",
      "hasFloydEvidence", "hasSoilPile", "bibleUsed", "hammerHiddenInBible",
      "ledgerFound", "ledgerSwapped", "finalDigUnlocked", "inspectionPassed",
      "hasAttributeC", "hasAttributeD", "wallDigPromptShown", "hammerConfiscated",
      "alternateEscapeRoute", "posterType", "posterHung", "twentyYearsPassed",
      "postMontageRedSpoken", "mapDrawn", "hasMap", "redHammerDelivered",
      "brooksBibleDelivered", "observedConversationEvidenceIds", "officeFirstWarningSeen",
      "wakeTutorialCompleted", "mapTutorialCompleted"
    ];
    const progress = {};
    fields.forEach((field) => {
      progress[field] = GameState[field];
    });
    progress.observedConversationEvidenceIds = normalizeObservedConversationEvidenceIds(
      GameState.observedConversationEvidenceIds
    );
    progress.soilDumpCompletedCount = GameState.soilDump.completedCount;
    progress.sideRouteActive = GameState.sideRoute.active;
    progress.sideRouteStage = GameState.sideRoute.stage;
    progress.yardMap = captureYardNavigationMapProgress();
    return progress;
  },

  load() {
    try {
      const legacyCheckpoint = localStorage.getItem(CHECKPOINT_STORAGE_KEY);
      if (!legacyCheckpoint || !this.validCheckpoints.has(legacyCheckpoint) || legacyCheckpoint === "CP_START") {
        return null;
      }
      const serialized = localStorage.getItem(SAVE_DATA_STORAGE_KEY);
      if (!serialized) {
        return { checkpoint: legacyCheckpoint, progress: null };
      }
      const record = JSON.parse(serialized);
      if (record && [2, 3, 4, 5].includes(record.version) && record.checkpoint === legacyCheckpoint) {
        return { checkpoint: legacyCheckpoint, progress: record.progress || null };
      }
      return { checkpoint: legacyCheckpoint, progress: null };
    } catch (error) {
      if (DEBUG_MODE) {
        console.warn(error);
      }
      return null;
    }
  },

  hasResume() {
    return Boolean(this.load());
  },

  hasStoredSave() {
    try {
      return localStorage.getItem(CHECKPOINT_STORAGE_KEY) !== null ||
        localStorage.getItem(SAVE_DATA_STORAGE_KEY) !== null;
    } catch (error) {
      if (DEBUG_MODE) {
        console.warn(error);
      }
      return false;
    }
  },

  deleteAllSaveData() {
    const keys = [
      YARD_NAVIGATION_MAP_STORAGE_KEY,
      GAME_BGM_RESUME_KEY,
      PIPE_MAZE_BLUEPRINT_STORAGE_KEY,
      SAVE_DATA_STORAGE_KEY,
      CHECKPOINT_STORAGE_KEY
    ];
    try {
      keys.forEach((key) => localStorage.removeItem(key));
      if (keys.some((key) => localStorage.getItem(key) !== null)) {
        return false;
      }
    } catch (error) {
      if (DEBUG_MODE) {
        console.warn(error);
      }
      return false;
    }

    this.clear({ preserveYardMap: false });
    return true;
  },

  clearCompletedRunOnEntry() {
    try {
      if (localStorage.getItem(CHECKPOINT_STORAGE_KEY) !== "CP_ENDING_SELECT") {
        return false;
      }
    } catch (error) {
      if (DEBUG_MODE) {
        console.warn(error);
      }
      return false;
    }

    this.clear({ preserveYardMap: false });
    try {
      localStorage.removeItem(GAME_BGM_RESUME_KEY);
    } catch (error) {
      if (DEBUG_MODE) {
        console.warn(error);
      }
    }
    return true;
  },

  clear(options) {
    const preserveYardMap = Boolean(options && options.preserveYardMap);
    try {
      localStorage.removeItem(CHECKPOINT_STORAGE_KEY);
      localStorage.removeItem(SAVE_DATA_STORAGE_KEY);
      if (!preserveYardMap) {
        localStorage.removeItem(YARD_NAVIGATION_MAP_STORAGE_KEY);
      }
    } catch (error) {
      if (DEBUG_MODE) {
        console.warn(error);
      }
    }
    GameState.currentCheckpoint = "CP_START";
    GameState.officeFirstWarningSeen = false;
    GameState.observedConversationEvidenceIds = [];
    GameState.wakeTutorialCompleted = false;
    GameState.mapTutorialCompleted = false;
    TutorialSystem.resetActive();
    resetAmbientConversationTransientState();
    resetCorridorTransientState();
    resetYardNavigationMapProgress({ preserveProgress: preserveYardMap });
  },

  restore() {
    const record = this.load();
    if (!record) {
      return false;
    }
    restoreCheckpointProgress(record.checkpoint, record.progress);
    return true;
  }
};

function saveCheckpoint(checkpointKey) {
  CheckpointSystem.save(checkpointKey);
}

function getCheckpointProgressDefaults(checkpointKey) {
  const earlyBase = { redHammerDelivered: true };
  const bibleBase = Object.assign({}, earlyBase, { hasHammer: true, hasBible: true, brooksBibleDelivered: true });
  const inspectedBase = Object.assign({}, bibleBase, {
    hammerHiddenInBible: true,
    inspectionPassed: true,
    hasAttributeC: true,
    wallDigPromptShown: true
  });
  const posterBase = Object.assign({}, inspectedBase, { posterType: "rita" });
  const lateBase = Object.assign({}, posterBase, {
    posterHung: true,
    twentyYearsPassed: true,
    postMontageRedSpoken: true
  });
  const defaultsByCheckpoint = {
    CP_AFTER_WHITE_LIGHT: {},
    CP_CELL_WAKE: {},
    CP_HAMMER_OBTAINED: Object.assign({}, earlyBase, { hasHammer: true }),
    CP_BIBLE_OBTAINED: bibleBase,
    CP_HAMMER_HIDDEN: Object.assign({}, bibleBase, { hammerHiddenInBible: true, wallDigPromptShown: true }),
    CP_HAMMER_CONFISCATED: { hammerConfiscated: true, sideRouteActive: true, sideRouteStage: "corridorEscortToYard" },
    CP_SIDE_ROUTE_RETURN_CELL: {
      hasBible: true,
      brooksBibleDelivered: true,
      hammerConfiscated: true,
      sideRouteActive: true,
      sideRouteStage: "returnToCellSleep"
    },
    CP_INSPECTION_PASSED: inspectedBase,
    CP_POSTER_OBTAINED: posterBase,
    CP_FIRST_DIG: Object.assign({}, posterBase, { posterHung: true, hasSoilPile: true }),
    CP_SOIL_DISPOSE: Object.assign({}, posterBase, { posterHung: true, hasAttributeC: false, hasAttributeD: true }),
    CP_POST_MONTAGE_RED: lateBase,
    CP_MAP_OBTAINED: Object.assign({}, lateBase, { mapDrawn: true, hasMap: true }),
    CP_OFFICE_DIALOGUE_DONE: Object.assign({}, lateBase, { mapDrawn: true, hasMap: true }),
    CP_FINAL_DIG: Object.assign({}, lateBase, {
      hasLedger: true,
      hasBible: false,
      bibleUsed: true,
      ledgerFound: true,
      ledgerSwapped: true,
      finalDigUnlocked: true,
      mapDrawn: true,
      hasMap: true
    }),
    CP_PIPE_GAME: Object.assign({}, lateBase, {
      hasLedger: true,
      hasBible: false,
      bibleUsed: true,
      ledgerFound: true,
      ledgerSwapped: true,
      finalDigUnlocked: true,
      mapDrawn: true,
      hasMap: true
    }),
    CP_ENDING_SELECT: Object.assign({}, lateBase, {
      hasLedger: true,
      hasBible: false,
      bibleUsed: true,
      ledgerFound: true,
      ledgerSwapped: true,
      finalDigUnlocked: true,
      mapDrawn: true,
      hasMap: true
    })
  };
  const defaults = defaultsByCheckpoint[checkpointKey] || {};
  if (checkpointKey !== "CP_AFTER_WHITE_LIGHT" && checkpointKey !== "CP_CELL_WAKE") {
    return Object.assign({
      wakeTutorialCompleted: true,
      mapTutorialCompleted: true
    }, defaults);
  }
  return defaults;
}

function applyCheckpointProgress(checkpointKey, storedProgress) {
  const persistentFields = CheckpointSystem.captureProgress();
  Object.keys(persistentFields).forEach((field) => {
    if (field === "soilDumpCompletedCount" || field === "sideRouteActive" ||
      field === "sideRouteStage" || field === "yardMap") {
      return;
    }
    const currentValue = GameState[field];
    GameState[field] = typeof currentValue === "boolean" ? false : null;
  });
  const combined = Object.assign({}, getCheckpointProgressDefaults(checkpointKey), storedProgress || {});
  Object.keys(combined).forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(GameState, field)) {
      GameState[field] = combined[field];
    }
  });
  GameState.observedConversationEvidenceIds = normalizeObservedConversationEvidenceIds(
    combined.observedConversationEvidenceIds
  );
  GameState.soilDump.completedCount = Number.isFinite(combined.soilDumpCompletedCount) ?
    combined.soilDumpCompletedCount : 0;
  GameState.sideRoute.active = Boolean(combined.sideRouteActive);
  GameState.sideRoute.stage = combined.sideRouteStage || "none";
  // 旧版备用路线完成存档没有记录办公室首次到访状态。
  // alternateEscapeRoute 只会在完成办公室翻找后设为 true，因此可安全补齐该标记。
  if (GameState.alternateEscapeRoute) {
    GameState.officeFirstWarningSeen = true;
  }
  if (combined.yardMap) {
    restoreYardNavigationMapProgress(combined.yardMap);
  }
}

function resetCheckpointTransientState() {
  DialogueSystem.active = false;
  DialogueSystem.lines = [];
  DialogueSystem.index = 0;
  DialogueSystem.justStarted = false;
  NarrativeCueSystem.reset();
  TutorialSystem.resetActive();
  GameState.failReason = "";
  GameState.failRecovery = null;
  GameState.failRecoveryTimer = 0;
  GameState.player.lyingInBed = false;
  GameState.player.vx = 0;
  GameState.player.vy = 0;
  GameState.player.isMoving = false;
  GameState.sideTalk.activeNpcId = null;
  GameState.sideTalk.queuedNpcId = null;
  GameState.sideTalk.afterAction = null;
  resetAmbientConversationTransientState();
  resetHammerHidePuzzleState();
  resetCellInspectionState();
  resetOfficeSceneState();
  resetWallHoleReveal();
  resetPipeSmashState();
  resetSoilDumpHold();
  resetSideRouteContinuationState();
  resetCorridorTransientState();
  InputSystem.resetAllInput();
}

function resetCorridorTransientState() {
  const corridor = GameState.corridor;
  corridor.entryPortal = null;
  corridor.originScene = null;
  corridor.lastExitPortal = null;
  corridor.mode = "free";
  corridor.initialized = false;
  corridor.initialCellExitSeen = false;
  corridor.cameraY = 0;
  corridor.escortRouteIndex = 0;
  corridor.remarkText = "";
  corridor.remarkStartedAt = -1;
  corridor.guards.forEach((guard) => {
    guard.x = 0;
    guard.y = 0;
    guard.facing = "down";
    guard.visualFacing = "down";
    guard.isMoving = false;
    guard.walkAnimTime = 0;
  });
}

function restoreCheckpointProgress(checkpointKey, storedProgress) {
  resetCheckpointTransientState();
  applyCheckpointProgress(checkpointKey, storedProgress);
  GameState.currentCheckpoint = checkpointKey;

  if (checkpointKey === "CP_AFTER_WHITE_LIGHT") {
    GameState.opening.gateEscapeAvailable = true;
    GameState.scene = "whiteLight";
    changeScene("yard");
    return;
  }
  if (checkpointKey === "CP_CELL_WAKE") {
    changeScene("cell");
    lieDownInBed();
    GameState.currentQuest = "quest_cell_wake";
    DialogueSystem.start(CellWakeThoughtLines);
    return;
  }
  if (checkpointKey === "CP_HAMMER_OBTAINED") {
    changeScene("yard");
    setPlayerFootToYardImage(165, 1132);
    GameState.currentQuest = "quest_yard_library";
    updateYardCamera();
    return;
  }
  if (checkpointKey === "CP_BIBLE_OBTAINED" || checkpointKey === "CP_HAMMER_HIDDEN") {
    changeScene("cell");
    const foot = checkpointKey === "CP_HAMMER_HIDDEN" ? { x: 620, y: 544 } : { x: 452, y: 700 };
    setPlayerFootToCellImage(foot.x, foot.y);
    GameState.currentQuest = checkpointKey === "CP_HAMMER_HIDDEN" ?
      "quest_cell_wait_inspection" : "quest_cell_hide_hammer";
    return;
  }
  if (checkpointKey === "CP_HAMMER_CONFISCATED") {
    GameState.sideRoute.active = true;
    GameState.sideRoute.stage = "corridorEscortToYard";
    GameState.scene = "cell";
    enterCellCorridor("cell", "escortToYard");
    return;
  }
  if (checkpointKey === "CP_SIDE_ROUTE_RETURN_CELL") {
    GameState.sideRoute.active = true;
    GameState.sideRoute.stage = "returnToCellSleep";
    changeScene("yard");
    GameState.currentQuest = "quest_side_route_return_cell";
    return;
  }
  if (checkpointKey === "CP_INSPECTION_PASSED") {
    changeScene("cell");
    setPlayerFootToCellImage(220, 620);
    GameState.currentQuest = "quest_cell_return_red_for_poster";
    return;
  }
  if (checkpointKey === "CP_POSTER_OBTAINED") {
    changeScene("cell");
    setPlayerFootToCellImage(CellLayout.pictureStandPoint.x, CellLayout.pictureStandPoint.y);
    GameState.currentQuest = GameState.posterHung ? "quest_cell_wall_picture" : "quest_cell_hang_poster";
    return;
  }
  if (checkpointKey === "CP_FIRST_DIG") {
    changeScene("dig");
    placeDigPlayerAtSoilPileMoment();
    GameState.currentQuest = "quest_dig_return";
    return;
  }
  if (checkpointKey === "CP_SOIL_DISPOSE") {
    changeScene("cell");
    setPlayerFootToCellImage(CellLayout.bed.x + CellLayout.bed.w / 2, CellLayout.bed.y + CellLayout.bed.h - 18);
    GameState.currentQuest = GameState.twentyYearsPassed ?
      "quest_cell_find_red_after_montage" : "quest_cell_sleep_after_soil";
    return;
  }
  if (checkpointKey === "CP_POST_MONTAGE_RED") {
    changeScene("cell");
    setPlayerFootToCellImage(620, 878);
    GameState.currentQuest = "quest_cell_draw_map";
    return;
  }
  if (checkpointKey === "CP_MAP_OBTAINED") {
    changeScene("yard");
    setPlayerFootToYardImage(165, 545);
    GameState.currentQuest = "quest_cell_map_obtained";
    updateYardCamera();
    return;
  }
  if (checkpointKey === "CP_OFFICE_DIALOGUE_DONE") {
    changeScene("office");
    GameState.office.wardenPhase = "gone";
    GameState.office.wardenX = OfficeLayout.wardenExit.x;
    GameState.office.wardenY = OfficeLayout.wardenExit.y;
    setPlayerFootToOfficeImage(166, 520);
    GameState.currentQuest = "quest_office_embroidery";
    return;
  }
  if (checkpointKey === "CP_FINAL_DIG") {
    changeScene("cell");
    setPlayerFootToCellImage(CellLayout.pictureStandPoint.x, CellLayout.pictureStandPoint.y);
    GameState.currentQuest = "quest_cell_final_dig_ready";
    return;
  }
  if (checkpointKey === "CP_PIPE_GAME" || checkpointKey === "CP_ENDING_SELECT") {
    changeScene("pipe");
    if (checkpointKey === "CP_ENDING_SELECT") {
      openEndingSelectFile();
    }
  }
}


// ======================================================
// 12. Gameplay Systems
// Digging / Soil / Guard / Office / Pipe
// ======================================================

const SoilSystem = {
  update(dt) {
    updateSoilDumping(dt);
  }
};


// @feature SoilDumpSystem
// @test 偏右侧椭圆深棕色泥地均可撒土；持有小土堆时必须连续长按 5 秒才累计一次倒土，倒土期间锁定移动并播放逐帧动作；第 3 秒最近看守会缓慢靠近，倒土结束即恢复随机巡逻。
// @acceptance 成功倒土 3 次后进入状态D，并指引玩家回房间床上睡觉。
// @risk 倒土进行中与看守触碰会失败，并回退到刚获得小土堆后的节点。
function updateSoilDumping(dt) {
  if (GameState.scene !== "yard" || DialogueSystem.active || !GameState.hasSoilPile) {
    resetSoilDumpHold();
    return;
  }

  const activeInteraction = getActiveYardInteraction();
  const canDump = activeInteraction && activeInteraction.id === "soil";
  const holdingInteract = canDump && InputSystem.actionDown("interact");

  if (!holdingInteract) {
    resetSoilDumpHold();
    if (canDump) {
      GameState.currentQuest = GameState.soilDump.completedCount > 0 ? "quest_yard_soil_partial" : "quest_yard_soil";
    }
    return;
  }

  GameState.soilDump.active = true;
  GameState.soilDump.animTime += dt;
  GameState.currentQuest = "quest_yard_soil";

  // 玩家倒土时被看守碰到，立即失败并回到刚获得小土堆后的节点。
  if (isYardGuardTouchingPlayer()) {
    failSoilDumpByGuard();
    return;
  }

  GameState.soilDump.progress = Math.min(
    SOIL_DUMP_HOLD_SECONDS,
    GameState.soilDump.progress + dt
  );

  if (!GameState.soilDump.guardAlerted && GameState.soilDump.progress >= SOIL_DUMP_GUARD_ALERT_SECONDS) {
    GameState.soilDump.guardAlerted = true;
    alertClosestYardGuardToSoilDump();
  }

  if (GameState.soilDump.progress >= SOIL_DUMP_HOLD_SECONDS) {
    completeSoilDumpHold();
  }
}

function resetSoilDumpHold() {
  GameState.soilDump.active = false;
  GameState.soilDump.progress = 0;
  GameState.soilDump.animTime = 0;
  GameState.soilDump.guardAlerted = false;
  releaseYardGuardsFromSoilInvestigation();
}

function completeSoilDumpHold() {
  GameState.soilDump.completedCount = Math.min(
    SOIL_DUMP_REQUIRED_COUNT,
    GameState.soilDump.completedCount + 1
  );
  resetSoilDumpHold();

  if (GameState.soilDump.completedCount >= SOIL_DUMP_REQUIRED_COUNT) {
    completeSoilDumping();
    return;
  }

  GameState.currentQuest = "quest_yard_soil_partial";
}

function completeSoilDumping() {
  GameState.hasSoilPile = false;
  GameState.hasAttributeC = false;
  GameState.hasAttributeD = true;
  resetWallHoleReveal();
  GameState.currentQuest = "quest_yard_soil_done";
  saveCheckpoint("CP_SOIL_DISPOSE");
  startPropInteraction([
    "你分三次把小土堆倒进劳作区，避开了看守的视线。",
    "状态D达成：现在回到房间，躺到床上睡觉。"
  ]);
}

function isYardGuardTouchingPlayer() {
  const playerFoot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  return GameState.yardGuards.some((guard) =>
    distance(playerFoot.x, playerFoot.y, guard.x, guard.y) <= YARD_GUARD_CATCH_DISTANCE
  );
}

function alertClosestYardGuardToSoilDump() {
  const soilInteraction = getYardInteraction("soil");
  const playerFoot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  if (!soilInteraction || !isPointInYardInteraction(playerFoot, soilInteraction) || GameState.yardGuards.length === 0) {
    return;
  }

  const closestGuard = GameState.yardGuards.reduce((closest, guard) =>
    distance(playerFoot.x, playerFoot.y, guard.x, guard.y) < distance(playerFoot.x, playerFoot.y, closest.x, closest.y) ?
      guard :
      closest
  );

  GameState.yardGuards.forEach((guard) => {
    guard.investigatingSoilDump = guard === closestGuard;
  });
  closestGuard.speed = YARD_GUARD_SOIL_INVESTIGATE_SPEED;
  closestGuard.speedTimer = 0;
  closestGuard.targetX = playerFoot.x;
  closestGuard.targetY = playerFoot.y;
}

function releaseYardGuardsFromSoilInvestigation() {
  GameState.yardGuards.forEach((guard) => {
    if (!guard.investigatingSoilDump) {
      return;
    }
    guard.investigatingSoilDump = false;
    guard.targetX = 0;
    guard.targetY = 0;
    guard.speed = 0;
    guard.speedTimer = 0;
    guard.isMoving = false;
    guard.walkAnimTime = 0;
  });
}

function failSoilDumpByGuard() {
  GameState.failReason = "倒土时被看守抓住了。";
  GameState.failRecovery = "soilDump";
  resetSoilDumpHold();
  changeScene("fail");
}

function restoreSoilFailureToPileCheckpoint() {
  DialogueSystem.active = false;
  DialogueSystem.lines = [];
  DialogueSystem.index = 0;
  DialogueSystem.justStarted = false;
  DialogueSystem.displayMode = "auto";
  GameState.hasSoilPile = true;
  GameState.hasAttributeD = false;
  GameState.soilDump.completedCount = 0;
  resetSoilDumpHold();
  GameState.dig.digProgress = DIG_REQUIRED_SECONDS;
  GameState.dig.isDigging = false;
  GameState.dig.digAnimTime = 0;
  GameState.failReason = "";
  GameState.failRecovery = null;
  resetYardGuardsForSoilRetry();
  saveCheckpoint("CP_FIRST_DIG");
  changeScene("dig");
  placeDigPlayerAtSoilPileMoment();
}

function placeDigPlayerAtSoilPileMoment() {
  const minX = DigLayout.walkRect.x;
  const maxX = DigLayout.walkRect.x + DigLayout.walkRect.w - GameState.dig.playerW;
  GameState.dig.playerX = clamp(
    DigLayout.digZone.x + DigLayout.digZone.w / 2 - GameState.dig.playerW / 2,
    minX,
    maxX
  );
  GameState.dig.playerY = DigLayout.walkRect.y + 2;
  GameState.dig.facing = "left";
  GameState.dig.isMoving = false;
  GameState.dig.walkAnimTime = 0;
  GameState.currentQuest = "quest_dig_return";
}

function resetYardGuardsForSoilRetry() {
  const defaultGuards = [
    { x: 640, y: 470, fast: true, facing: "down", visualFacing: "down" },
    { x: 820, y: 660, fast: false, facing: "left", visualFacing: "left" },
    { x: 920, y: 810, fast: true, facing: "up", visualFacing: "up" }
  ];

  GameState.yardGuards.forEach((guard, index) => {
    const defaults = defaultGuards[index] || defaultGuards[0];
    guard.x = defaults.x;
    guard.y = defaults.y;
    guard.targetX = 0;
    guard.targetY = 0;
    guard.speed = 0;
    guard.speedTimer = 0;
    guard.fast = defaults.fast;
    guard.investigatingSoilDump = false;
    guard.facing = defaults.facing;
    guard.visualFacing = defaults.visualFacing;
    guard.turnTimer = 0;
    guard.ambientRestTarget = false;
    guard.ambientRestTimer = 0;
    guard.isMoving = false;
    guard.walkAnimTime = 0;
  });
}

// @feature TwentyYearsMontage
// @test 状态D后躺到床上会淡出入睡，播放四幕漫画；末幕点击画面后再淡入回到床上。
// @acceptance 漫画结束后玩家仍躺在房间床上，任务指引切换为去找瑞德。
function startTwentyYearsMontage() {
  TwentyYearsComic.stop();
  GameState.twentyYearsMontage.phase = "fadeOut";
  GameState.twentyYearsMontage.timer = 0;
  GameState.twentyYearsMontage.pageIndex = 0;
  GameState.currentQuest = "quest_montage_twenty_years";
}

function updateTwentyYearsMontage(dt) {
  const montage = GameState.twentyYearsMontage;
  montage.timer += dt;

  if (montage.phase === "fadeOut" && montage.timer >= SLEEP_FADE_OUT_SECONDS) {
    setTwentyYearsMontagePhase("darkBefore");
    return;
  }

  if (montage.phase === "darkBefore" && montage.timer >= SLEEP_DARK_HOLD_SECONDS) {
    if (TwentyYearsComic.start()) {
      setTwentyYearsMontagePhase("comic");
    } else {
      // HTML 演出层异常时仍能回到主线，避免玩家被黑屏卡住。
      setTwentyYearsMontagePhase("darkAfter");
    }
    return;
  }

  if (montage.phase === "comic") {
    TwentyYearsComic.update(dt);
    return;
  }

  if (montage.phase === "darkAfter" && montage.timer >= MONTAGE_WAKE_DARK_SECONDS) {
    setTwentyYearsMontagePhase("wakeFade");
    return;
  }

  if (montage.phase === "wakeFade" && montage.timer >= MONTAGE_WAKE_FADE_SECONDS) {
    finishTwentyYearsMontage();
  }
}

function setTwentyYearsMontagePhase(phase) {
  GameState.twentyYearsMontage.phase = phase;
  GameState.twentyYearsMontage.timer = 0;
}

function finishTwentyYearsMontage() {
  TwentyYearsComic.stop();
  GameState.twentyYearsPassed = true;
  GameState.hasAttributeD = false;
  GameState.currentQuest = "quest_cell_find_red_after_montage";
  saveCheckpoint("CP_SOIL_DISPOSE");
  changeScene("cell");
}

// @feature HammerHidePuzzle
// @test 玩家同时持有石锤与圣经时，必须在桌边完成拖放，之后才能开始安全检查房间。
function canHideHammerInBible() {
  return GameState.scene === "cell" &&
    GameState.hasHammer &&
    GameState.hasBible &&
    !GameState.hammerHiddenInBible &&
    !GameState.inspectionPassed &&
    !GameState.sideRoute.active;
}

function resetHammerHidePuzzleState() {
  const puzzle = GameState.hammerHidePuzzle;
  puzzle.active = false;
  puzzle.dragging = false;
  puzzle.inputMode = null;
  puzzle.dragX = HammerHidePuzzleLayout.hammerStart.x;
  puzzle.dragY = HammerHidePuzzleLayout.hammerStart.y;
  puzzle.dragOffsetX = 0;
  puzzle.dragOffsetY = 0;
  puzzle.statusMessage = "";
}

function startHammerHidePuzzle() {
  if (!canHideHammerInBible()) {
    return;
  }
  resetHammerHidePuzzleState();
  GameState.hammerHidePuzzle.active = true;
  GameState.currentQuest = "quest_cell_hide_hammer";
  stopPlayerForNpcDialogue();
}


function getHammerHidePuzzleHammerRect() {
  const puzzle = GameState.hammerHidePuzzle;
  const size = HammerHidePuzzleLayout.hammerSize;
  return { x: puzzle.dragX, y: puzzle.dragY, w: size, h: size };
}

function isHammerOverBible() {
  const hammer = getHammerHidePuzzleHammerRect();
  return pointInRect(
    { x: hammer.x + hammer.w / 2, y: hammer.y + hammer.h / 2 },
    HammerHidePuzzleLayout.bibleSlot
  );
}

function moveHammerHidePuzzleItem(x, y) {
  const puzzle = GameState.hammerHidePuzzle;
  const panel = HammerHidePuzzleLayout.panel;
  const size = HammerHidePuzzleLayout.hammerSize;
  const margin = 20;
  puzzle.dragX = clamp(x, panel.x + margin, panel.x + panel.w - size - margin);
  puzzle.dragY = clamp(y, panel.y + 92, panel.y + panel.h - size - 54);
}

function resetHammerHidePuzzleItem(message) {
  const puzzle = GameState.hammerHidePuzzle;
  puzzle.dragging = false;
  puzzle.inputMode = null;
  puzzle.dragX = HammerHidePuzzleLayout.hammerStart.x;
  puzzle.dragY = HammerHidePuzzleLayout.hammerStart.y;
  puzzle.dragOffsetX = 0;
  puzzle.dragOffsetY = 0;
  puzzle.statusMessage = message || "";
}

function finishHammerHidePuzzleDrop() {
  if (isHammerOverBible()) {
    completeHammerHidePuzzle();
    return;
  }
  resetHammerHidePuzzleItem("还没有放进圣经，再拖近一些。");
}

function handleHammerHidePuzzleInput() {
  const puzzle = GameState.hammerHidePuzzle;
  if (!puzzle.active) {
    return;
  }

  if (InputSystem.pointerJustPressed && InputSystem.pointerInRect(getHammerHidePuzzleHammerRect())) {
    puzzle.dragging = true;
    puzzle.inputMode = "pointer";
    puzzle.dragOffsetX = InputSystem.pointerX - puzzle.dragX;
    puzzle.dragOffsetY = InputSystem.pointerY - puzzle.dragY;
    puzzle.statusMessage = "";
  }

  if (puzzle.dragging && puzzle.inputMode === "pointer") {
    if (InputSystem.pointerPressed) {
      moveHammerHidePuzzleItem(
        InputSystem.pointerX - puzzle.dragOffsetX,
        InputSystem.pointerY - puzzle.dragOffsetY
      );
    } else {
      finishHammerHidePuzzleDrop();
    }
    return;
  }

  if (InputSystem.isPressed(" ")) {
    if (!puzzle.dragging) {
      puzzle.dragging = true;
      puzzle.inputMode = "keyboard";
      puzzle.statusMessage = "已拿起石锤，用 WASD 移动，再按空格键放下。";
    } else if (puzzle.inputMode === "keyboard") {
      finishHammerHidePuzzleDrop();
      return;
    }
  }

  if (puzzle.dragging && puzzle.inputMode === "keyboard") {
    const keyboardStep = 16;
    const moveX = (InputSystem.isDown("d") ? 1 : 0) - (InputSystem.isDown("a") ? 1 : 0);
    const moveY = (InputSystem.isDown("s") ? 1 : 0) - (InputSystem.isDown("w") ? 1 : 0);
    if (moveX || moveY) {
      moveHammerHidePuzzleItem(
        puzzle.dragX + moveX * keyboardStep,
        puzzle.dragY + moveY * keyboardStep
      );
    }
  }
}

function completeHammerHidePuzzle() {
  if (!GameState.hammerHidePuzzle.active || !canHideHammerInBible()) {
    return;
  }
  GameState.hammerHiddenInBible = true;
  // 该既有进度位同时表示安迪已经为首次开凿做好准备；检查房间后仍沿用原主线。
  GameState.wallDigPromptShown = true;
  resetHammerHidePuzzleState();
  GameState.currentQuest = "quest_cell_wait_inspection";
  saveCheckpoint("CP_HAMMER_HIDDEN");
  startPropInteraction([
    "你已经把石锤藏在了圣经里。"
  ]);
}

// @feature CellInspectionSystem
// @test 桌边藏好石锤后，回到床前才会开始安全检查房间；检查房间通过后才会开放后续主线。
// @test 账本调包消耗圣经后，不得重新激活早期的“仅持石锤”查房或床边交互。
// @checkpoint 检查房间成功保存 CP_INSPECTION_PASSED；旧存档中的异常检查房间状态仍保留失败回退保护。
function resetCellInspectionState() {
  const inspection = GameState.cellInspection;
  inspection.phase = "idle";
  inspection.result = null;
  inspection.warden.x = CellInspectionLayout.entryWarden.x;
  inspection.warden.y = CellInspectionLayout.entryWarden.y;
  inspection.warden.targetX = CellInspectionLayout.wardenEntryTarget.x;
  inspection.warden.targetY = CellInspectionLayout.wardenEntryTarget.y;
  inspection.warden.facing = "right";
  inspection.warden.isMoving = false;
  inspection.warden.walkAnimTime = 0;
  inspection.warden.patrolIndex = 0;
  inspection.guard.x = CellInspectionLayout.entryGuard.x;
  inspection.guard.y = CellInspectionLayout.entryGuard.y;
  inspection.guard.targetX = CellInspectionLayout.guardTableTarget.x;
  inspection.guard.targetY = CellInspectionLayout.guardTableTarget.y;
  inspection.guard.facing = "right";
  inspection.guard.isMoving = false;
  inspection.guard.walkAnimTime = 0;
  inspection.escortGuard.x = CellInspectionLayout.entryGuard.x - 20;
  inspection.escortGuard.y = CellInspectionLayout.entryGuard.y + 60;
  inspection.escortGuard.targetX = CellInspectionLayout.escortAssemble.rightGuard.x;
  inspection.escortGuard.targetY = CellInspectionLayout.escortAssemble.rightGuard.y;
  inspection.escortGuard.facing = "right";
  inspection.escortGuard.isMoving = false;
  inspection.escortGuard.walkAnimTime = 0;
  inspection.escortAssembleRouteIndex = 0;
  inspection.escortRouteIndex = 0;
}

function isCellInspectionActive() {
  return GameState.cellInspection.phase !== "idle";
}

function startCellInspection() {
  if (!canStartInitialCellInspection()) {
    return;
  }
  resetCellInspectionState();
  placePlayerAtCellInspectionStandPoint();
  GameState.cellInspection.phase = "enteringWarden";
  GameState.cellInspection.result = isHammerOnlyInspectionEligible() ? "confiscate" : "pass";
  GameState.currentQuest = GameState.cellInspection.result === "confiscate" ?
    "quest_cell_prepare_confiscation_inspection" :
    "quest_cell_inspection_wait";
}

function updateCellInspection(dt) {
  const inspection = GameState.cellInspection;

  if (inspection.phase === "enteringWarden") {
    const wardenArrived = moveCellInspectionActor(inspection.warden, CellInspectionLayout.wardenEntryTarget, 118, dt);
    inspection.guard.isMoving = false;
    inspection.guard.walkAnimTime = 0;
    if (wardenArrived) {
      inspection.phase = "enteringGuard";
    }
    return;
  }

  if (inspection.phase === "enteringGuard") {
    patrolInspectionWarden(dt);
    const guardArrived = moveCellInspectionActor(inspection.guard, CellInspectionLayout.guardTableTarget, 78, dt);
    if (guardArrived) {
      inspection.phase = "dialogue";
      GameState.currentQuest = "quest_cell_inspection";
      DialogueSystem.start(inspection.result === "pass" ? InspectionPassDialogueLines : InspectionConfiscationDialogueLines);
    }
    return;
  }

  if (inspection.phase === "dialogue") {
    patrolInspectionWarden(dt);
    if (!DialogueSystem.active) {
      if (inspection.result === "confiscate") {
        startHammerConfiscationEscort();
      } else if (inspection.result === "fail") {
        restoreInspectionFailureToHammerCheckpoint();
      } else {
        inspection.phase = "leaving";
        GameState.currentQuest = "quest_cell_inspection_leave";
      }
    }
    return;
  }

  if (inspection.phase === "escortAssemble") {
    // 守卫与安迪统一使用安迪的最大画布步速，并沿房间正常可移动区域集合。
    const escortSpeed = getCellEscortImageSpeed();
    const assembleRoute = CellInspectionLayout.escortAssembleRoute;
    const assembleWaypoint = assembleRoute[inspection.escortAssembleRouteIndex] || assembleRoute[assembleRoute.length - 1];
    const wardenLeft = moveCellInspectionActor(
      inspection.warden,
      CellInspectionLayout.exitWarden,
      136,
      dt,
      true
    );
    const leftGuardReady = moveCellInspectionActor(
      inspection.guard,
      assembleWaypoint.leftGuard,
      escortSpeed,
      dt
    );
    const rightGuardReady = moveCellInspectionActor(
      inspection.escortGuard,
      assembleWaypoint.rightGuard,
      escortSpeed,
      dt
    );
    if (leftGuardReady && rightGuardReady) {
      inspection.escortAssembleRouteIndex += 1;
    }
    if (wardenLeft && inspection.escortAssembleRouteIndex >= assembleRoute.length) {
      inspection.phase = "escortOut";
      inspection.escortRouteIndex = 1;
    }
    return;
  }

  if (inspection.phase === "escortOut") {
    updateHammerConfiscationEscort(dt);
    return;
  }

  if (inspection.phase === "leaving") {
    const wardenLeft = moveCellInspectionActor(inspection.warden, CellInspectionLayout.exitWarden, 136, dt);
    const guardLeft = moveCellInspectionActor(inspection.guard, CellInspectionLayout.exitGuard, 146, dt);
    if (wardenLeft && guardLeft) {
      completeCellInspectionSuccess();
    }
  }
}

function moveCellInspectionActor(actor, target, speed, dt, ignoreCollision = false) {
  const dx = target.x - actor.x;
  const dy = target.y - actor.y;
  const remaining = Math.hypot(dx, dy);
  if (remaining <= 4) {
    if (!ignoreCollision && !isCellNarrativeWalkSegmentClear(actor, target)) {
      actor.isMoving = false;
      actor.walkAnimTime = 0;
      return false;
    }
    actor.x = target.x;
    actor.y = target.y;
    actor.isMoving = false;
    actor.walkAnimTime = 0;
    return true;
  }

  const step = Math.min(remaining, speed * dt);
  const nextX = actor.x + dx / remaining * step;
  const nextY = actor.y + dy / remaining * step;
  if (!ignoreCollision && !isCellNarrativeWalkSegmentClear(actor, { x: nextX, y: nextY })) {
    actor.isMoving = false;
    actor.walkAnimTime = 0;
    return false;
  }
  actor.x = nextX;
  actor.y = nextY;
  actor.facing = directionFromDelta(dx, dy);
  if (step >= remaining) {
    actor.x = target.x;
    actor.y = target.y;
    actor.isMoving = false;
    actor.walkAnimTime = 0;
    return true;
  }

  actor.isMoving = step > 0.01;
  if (actor.isMoving) {
    actor.walkAnimTime += dt;
  }
  return false;
}

function patrolInspectionWarden(dt) {
  const inspection = GameState.cellInspection;
  const actor = inspection.warden;
  const patrol = CellInspectionLayout.wardenPatrol;
  const target = patrol[actor.patrolIndex] || patrol[0];
  if (moveCellInspectionActor(actor, target, 54, dt)) {
    actor.patrolIndex = (actor.patrolIndex + 1) % patrol.length;
  }
}

function startHammerConfiscationEscort() {
  const inspection = GameState.cellInspection;
  GameState.hasHammer = false;
  GameState.hammerHiddenInBible = false;
  resetHammerHidePuzzleState();
  GameState.hammerConfiscated = true;
  GameState.posterChoiceActive = false;
  GameState.posterPickupAnimation.active = false;
  inspection.escortGuard.x = CellInspectionLayout.escortGuardWalkableEntry.x;
  inspection.escortGuard.y = CellInspectionLayout.escortGuardWalkableEntry.y;
  inspection.phase = "escortAssemble";
  inspection.escortAssembleRouteIndex = 0;
  inspection.escortRouteIndex = 0;
  GameState.currentQuest = "quest_cell_hammer_confiscated";
  stopPlayerForNpcDialogue();
}

function updateHammerConfiscationEscort(dt) {
  const inspection = GameState.cellInspection;
  const route = CellInspectionLayout.escortRoute;
  const waypoint = route[inspection.escortRouteIndex];
  if (!waypoint) {
    finishHammerConfiscationEscort();
    return;
  }

  const escortSpeed = getCellEscortImageSpeed();
  const playerArrived = movePlayerForCellEscort(waypoint.player, escortSpeed, dt);
  const leftGuardArrived = moveCellInspectionActor(
    inspection.guard,
    waypoint.leftGuard,
    escortSpeed,
    dt
  );
  const rightGuardArrived = moveCellInspectionActor(
    inspection.escortGuard,
    waypoint.rightGuard,
    escortSpeed,
    dt
  );

  if (playerArrived && leftGuardArrived && rightGuardArrived) {
    inspection.escortRouteIndex += 1;
    if (inspection.escortRouteIndex >= route.length) {
      finishHammerConfiscationEscort();
    }
  }
}

function getCellEscortImageSpeed() {
  const scale = Math.max(0.001, getCellImageRect().scale);
  return CELL_ESCORT_CANVAS_SPEED / scale;
}

function movePlayerForCellEscort(target, speed, dt) {
  const player = GameState.player;
  const foot = canvasPointToCellImage(getPlayerFootPoint(player.x, player.y));
  if (!foot) {
    player.isMoving = false;
    player.walkAnimTime = 0;
    return false;
  }

  const dx = target.x - foot.x;
  const dy = target.y - foot.y;
  const remaining = Math.hypot(dx, dy);
  player.vx = 0;
  player.vy = 0;
  player.lyingInBed = false;
  if (remaining <= 4) {
    const targetFoot = cellImageToCanvasPoint(target.x, target.y);
    const targetX = targetFoot.x - player.w / 2;
    const targetY = targetFoot.y - player.h + 8;
    if (!isCellNarrativeWalkSegmentClear(foot, target) ||
      !isCellPositionWalkable(targetX, targetY)) {
      player.isMoving = false;
      player.walkAnimTime = 0;
      return false;
    }
    setPlayerFootToCellImage(target.x, target.y);
    player.isMoving = false;
    player.walkAnimTime = 0;
    return true;
  }

  const step = Math.min(remaining, speed * dt);
  const nextImageFoot = {
    x: foot.x + dx / remaining * step,
    y: foot.y + dy / remaining * step
  };
  const nextFoot = cellImageToCanvasPoint(
    nextImageFoot.x,
    nextImageFoot.y
  );
  const nextX = nextFoot.x - player.w / 2;
  const nextY = nextFoot.y - player.h + 8;
  if (!isCellNarrativeWalkSegmentClear(foot, nextImageFoot) ||
    !isCellPositionWalkable(nextX, nextY)) {
    player.isMoving = false;
    player.walkAnimTime = 0;
    return false;
  }
  player.x = nextX;
  player.y = nextY;
  player.facing = directionFromDelta(dx, dy);
  player.isMoving = step > 0.01;
  if (player.isMoving) {
    player.walkAnimTime += dt;
  }
  return false;
}

function finishHammerConfiscationEscort() {
  GameState.sideRoute.active = true;
  GameState.alternateEscapeRoute = false;
  GameState.sideRoute.stage = "corridorEscortToYard";
  GameState.sideRoute.warningCooldown = 0;
  GameState.sideRoute.solitaryStoneRead = false;
  GameState.sideRoute.solitarySlept = false;
  GameState.sideRoute.solitarySleepPhase = "idle";
  GameState.sideRoute.solitarySleepTimer = 0;
  GameState.sideRoute.brooksDialogueStarted = false;
  resetSideRouteContinuationState();
  resetCellInspectionState();
  saveCheckpoint("CP_HAMMER_CONFISCATED");
  enterCellCorridor("cell", "escortToYard");
}

function startSideRouteYardCrowdSequence() {
  const sideRoute = GameState.sideRoute;
  sideRoute.stage = "crowdGathering";
  sideRoute.warningCooldown = 0;
  sideRoute.warningRemarkStartedAt = -1;
  sideRoute.crowdFidgetTimer = 0;
  sideRoute.crowdChatterTimer = 1.2;
  sideRoute.crowdChatterIndex = 0;
  sideRoute.crowdRemarkStartedAt = GameState.playTime;

  copyActorPosition(sideRoute.warden, SideRouteYardLayout.warden);
  sideRoute.warden.facing = "down";
  sideRoute.warden.isMoving = false;
  sideRoute.warden.walkAnimTime = 0;
  sideRoute.guards.forEach((guard, index) => {
    copyActorPosition(guard, SideRouteYardLayout.guards[index] || SideRouteYardLayout.guards[0]);
    guard.facing = index === 0 ? "right" : "left";
    guard.visualFacing = guard.facing;
    guard.isMoving = false;
    guard.walkAnimTime = 0;
  });

  prepareSideRouteYardCrowdActors();
  setSideRouteCrowdRemark(sideRoute.backgroundCrowd[0], "安迪怎么了？", 0.15);
  setSideRouteCrowdRemark(sideRoute.backgroundCrowd[2], "发生什么事儿了？", 0.65);
  setSideRouteCrowdRemark(GameState.yardPrisoners[1], "这是出什么事了？", 1.15);
  startSideRouteYardTrial();
  GameState.currentQuest = "quest_side_route_crowd";
}

function prepareSideRouteYardCrowdActors() {
  const sideRoute = GameState.sideRoute;
  sideRoute.backgroundCrowd = YardLayout.backgroundPrisoners.map((prisoner, index) => {
    const actor = {
      assetKey: prisoner.assetKey,
      h: prisoner.h,
      walkFrameSeconds: prisoner.walkFrameSeconds,
      idleFrameIndex: prisoner.idleFrameIndex,
      facing: "down",
      isMoving: false,
      walkAnimTime: 0
    };
    configureSideRouteCrowdActor(actor, index);
    return actor;
  });
  GameState.yardPrisoners.forEach((prisoner, index) => {
    configureSideRouteCrowdActor(prisoner, index + sideRoute.backgroundCrowd.length);
  });
  configureSideRouteCrowdActor(GameState.redNpc, 6);
  GameState.redNpc.mode = "sideRouteCrowd";
  configureSideRouteCrowdActor(GameState.brooksNpc, 7);
  GameState.brooksNpc.mode = "sideRouteCrowd";
}

function configureSideRouteCrowdActor(actor, targetIndex) {
  const plan = SideRouteYardLayout.crowdPlans[targetIndex] || SideRouteYardLayout.crowdPlans[0];
  actor.x = plan.startX;
  actor.y = plan.startY;
  actor.target = plan;
  actor.crowdSpeed = plan.speed;
  actor.crowdMoveDelay = plan.delay;
  actor.crowdRoamX = 0;
  actor.crowdRoamY = 0;
  actor.crowdFidgetTimer = 0;
  actor.fidgetTarget = null;
  actor.narrativeWalkRoute = null;
  actor.narrativeWalkRouteIndex = 0;
  actor.narrativeWalkTarget = null;
  actor.isMoving = false;
  actor.walkAnimTime = 0;
}

function startSideRouteYardTrial() {
  const sideRoute = GameState.sideRoute;
  sideRoute.yardTrialActive = true;
  sideRoute.yardTrialLineIndex = 0;
  sideRoute.yardTrialLineTimer = 0;
}

function updateSideRouteYardTrial(dt) {
  const sideRoute = GameState.sideRoute;
  if (!sideRoute.yardTrialActive) {
    return;
  }

  sideRoute.yardTrialLineTimer += dt;
  const lineDuration = SIDE_ROUTE_TRIAL_LINE_SECONDS[sideRoute.yardTrialLineIndex] || 3;
  if (sideRoute.yardTrialLineTimer < lineDuration) {
    return;
  }

  sideRoute.yardTrialLineTimer -= lineDuration;
  sideRoute.yardTrialLineIndex += 1;
  if (sideRoute.yardTrialLineIndex >= SideRouteWardenAddressLines.length) {
    sideRoute.yardTrialActive = false;
    sideRoute.yardTrialLineIndex = 0;
    sideRoute.yardTrialLineTimer = 0;
  }
}

function startSideRouteYardEscortToCenter() {
  const sideRoute = GameState.sideRoute;
  sideRoute.stage = "yardEscortToCenter";
  sideRoute.warningCooldown = 0;
  sideRoute.warningRemarkStartedAt = -1;
  sideRoute.yardTrialActive = false;
  sideRoute.yardTrialLineIndex = 0;
  sideRoute.yardTrialLineTimer = 0;
  sideRoute.backgroundCrowd = [];
  sideRoute.crowdFidgetTimer = 0;
  sideRoute.crowdChatterTimer = 0;
  sideRoute.crowdRemarkStartedAt = -1;
  setPlayerFootToYardImage(SideRouteYardLayout.yardEntry.player.x, SideRouteYardLayout.yardEntry.player.y);
  GameState.player.facing = "up";
  copyActorPosition(sideRoute.warden, SideRouteYardLayout.warden);
  sideRoute.warden.facing = "down";
  sideRoute.warden.isMoving = false;
  sideRoute.warden.walkAnimTime = 0;
  sideRoute.guards.forEach((guard, index) => {
    copyActorPosition(guard, SideRouteYardLayout.yardEntry.guards[index] || SideRouteYardLayout.yardEntry.guards[0]);
    guard.facing = index === 0 ? "right" : "left";
    guard.visualFacing = guard.facing;
    guard.isMoving = false;
    guard.walkAnimTime = 0;
  });
  prepareSideRouteYardCrowdActors();
  GameState.currentQuest = "quest_side_route_crowd";
}

function updateSideRouteYardSequence(dt) {
  const sideRoute = GameState.sideRoute;
  sideRoute.warningCooldown = Math.max(0, sideRoute.warningCooldown - dt);

  if (sideRoute.stage === "yardEscortToCenter") {
    updateSideRouteYardEscortToCenter(dt);
    return;
  }

  if (sideRoute.stage === "crowdGathering") {
    updateSideRouteCrowdGathering(dt);
    return;
  }

  if (sideRoute.stage === "wardenAddress") {
    stopPlayerForNpcDialogue();
    faceSideRouteCrowdAtPlayer();
    updateSideRouteCrowdChatter(dt);
    updateSideRouteYardTrial(dt);
    if (!sideRoute.yardTrialActive) {
      sideRoute.stage = "escortToSolitary";
      GameState.currentQuest = "quest_side_route_warden_address";
    }
    return;
  }

  if (sideRoute.stage === "escortToSolitary") {
    updateSideRouteYardEscort(dt);
    return;
  }

  if (sideRoute.stage === "libraryTalk" || sideRoute.stage === "returnToCellSleep") {
    if (DialogueSystem.active) {
      stopPlayerForNpcDialogue();
    } else {
      updatePlayer(dt);
    }
    updateSideRouteYardAmbientActors(dt);
    return;
  }

  if (sideRoute.stage === "brooksDialogue") {
    stopPlayerForNpcDialogue();
    updateSideRouteYardAmbientActors(dt);
    if (!DialogueSystem.active && sideRoute.brooksDialogueStarted) {
      GameState.hasBible = true;
      GameState.brooksBibleDelivered = true;
      sideRoute.stage = "returnToCellSleep";
      GameState.currentQuest = "quest_side_route_return_cell";
      saveCheckpoint("CP_SIDE_ROUTE_RETURN_CELL");
    }
    return;
  }

  if (sideRoute.stage === "morningPatrol") {
    if (DialogueSystem.active) {
      stopPlayerForNpcDialogue();
    } else {
      updatePlayer(dt);
    }
    updateSideRouteMorningGuards(dt);
    return;
  }

  if (sideRoute.stage === "morningGateCaught") {
    updateSideRouteGateCapture(dt);
  }
}

function handleSideRouteYardInput() {
  const sideRoute = GameState.sideRoute;
  if (isSideRouteYardLocked()) {
    const interactionAttempted = InputSystem.actionPressed("interact");
    if (sideRoute.warningCooldown <= 0 && (isPlayerTryingToMove() || interactionAttempted)) {
      sideRoute.warningCooldown = SIDE_ROUTE_WARNING_COOLDOWN;
      sideRoute.warningRemarkStartedAt = GameState.playTime;
      setSideRouteCrowdRemark(sideRoute.guards[0], "老实点！", 0, GameState.playTime);
    }
    return;
  }

  if (DialogueSystem.active) {
    return;
  }

  if (sideRoute.stage === "libraryTalk") {
    const interaction = getActiveYardInteraction();
    if (InputSystem.actionPressed("interact") && interaction && interaction.id === "sideRouteBrooks") {
      startSideRouteBrooksDialogue();
    }
    return;
  }

  if (sideRoute.stage === "returnToCellSleep") {
    const interaction = getActiveYardInteraction();
    if (InputSystem.actionPressed("interact") && interaction && interaction.id === "sideRouteCellDoor") {
      enterCellCorridor("yard", "free");
    }
    return;
  }

  if (sideRoute.stage === "morningPatrol") {
    const interaction = getActiveYardInteraction();
    if (!InputSystem.actionPressed("interact") || !interaction) {
      return;
    }
    if (interaction.id === "sideRouteGuard") {
      startGuardConversation("gate", interaction.guardIndex);
    } else if (interaction.id === "sideRouteGate") {
      startSideRouteGateCapture();
    } else if (interaction.id === "sideRouteOffice") {
      sideRoute.stage = "officeSearch";
      changeScene("office");
    }
  }
}

function isSideRouteYardLocked() {
  if (!GameState.sideRoute.active || GameState.scene !== "yard") {
    return false;
  }
  return GameState.sideRoute.stage === "crowdGathering" ||
    GameState.sideRoute.stage === "yardEscortToCenter" ||
    GameState.sideRoute.stage === "wardenAddress" ||
    GameState.sideRoute.stage === "escortToSolitary";
}

function isPlayerTryingToMove() {
  const move = InputSystem.getMoveVector();
  return Math.abs(move.x) > 0.05 || Math.abs(move.y) > 0.05;
}

function updateSideRouteCrowdGathering(dt) {
  const sideRoute = GameState.sideRoute;
  let everyoneArrived = true;
  sideRoute.backgroundCrowd.forEach((prisoner) => {
    const arrived = moveSideRouteCrowdActorToPlan(prisoner, dt);
    everyoneArrived = everyoneArrived && arrived;
  });
  GameState.yardPrisoners.forEach((prisoner) => {
    const arrived = moveSideRouteCrowdActorToPlan(prisoner, dt);
    everyoneArrived = everyoneArrived && arrived;
  });
  everyoneArrived = moveSideRouteCrowdActorToPlan(GameState.redNpc, dt) && everyoneArrived;
  everyoneArrived = moveSideRouteCrowdActorToPlan(GameState.brooksNpc, dt) && everyoneArrived;
  stopPlayerForNpcDialogue();
  updateSideRouteCrowdChatter(dt);
  updateSideRouteYardTrial(dt);

  if (everyoneArrived) {
    faceSideRouteCrowdAtPlayer();
    sideRoute.stage = "wardenAddress";
    GameState.currentQuest = "quest_side_route_warden_address";
  }
}

function moveSideRouteCrowdActorToPlan(actor, dt) {
  if (!actor) {
    return true;
  }
  actor.crowdMoveDelay = Math.max(0, (actor.crowdMoveDelay || 0) - dt);
  if (actor.crowdMoveDelay > 0) {
    actor.isMoving = false;
    return false;
  }
  return moveYardActorTo(actor, actor.target, getSideRouteCrowdActorSpeed(actor), dt);
}

function getSideRouteCrowdActorSpeed(actor) {
  return actor && Number.isFinite(actor.crowdSpeed) ?
    actor.crowdSpeed :
    (actor && Number.isFinite(actor.speed) ? actor.speed : RED_PATROL_SPEED);
}

function updateSideRouteYardEscortToCenter(dt) {
  const sideRoute = GameState.sideRoute;
  const escortSpeed = getYardEscortImageSpeed();
  const playerArrived = movePlayerForYardEscort(SideRouteYardLayout.playerFoot, escortSpeed, dt);
  const leftGuardArrived = moveYardActorTo(sideRoute.guards[0], SideRouteYardLayout.guards[0], escortSpeed, dt);
  const rightGuardArrived = moveYardActorTo(sideRoute.guards[1], SideRouteYardLayout.guards[1], escortSpeed, dt);
  if (playerArrived && leftGuardArrived && rightGuardArrived) {
    startSideRouteYardCrowdSequence();
  }
}

function updateSideRouteYardEscort(dt) {
  const sideRoute = GameState.sideRoute;
  const escortSpeed = getYardEscortImageSpeed();
  const playerArrived = movePlayerForYardEscort(SideRouteYardLayout.escortExit.player, escortSpeed, dt);
  const leftGuardArrived = moveYardActorTo(sideRoute.guards[0], SideRouteYardLayout.escortExit.guards[0], escortSpeed, dt);
  const rightGuardArrived = moveYardActorTo(sideRoute.guards[1], SideRouteYardLayout.escortExit.guards[1], escortSpeed, dt);
  faceSideRouteCrowdAtPlayer();
  updateSideRouteCrowdChatter(dt);
  if (playerArrived && leftGuardArrived && rightGuardArrived) {
    sideRoute.stage = "corridorEscortToSolitary";
    restoreSideRouteYardAmbientActors();
    enterCellCorridor("yard", "escortToSolitary");
  }
}

function getYardEscortImageSpeed() {
  return SIDE_ROUTE_ESCORT_CANVAS_SPEED / YARD_WORLD_SCALE;
}

function moveYardActorTo(actor, target, speed, dt) {
  if (!actor || !target) {
    return true;
  }

  const route = getYardNarrativeWalkRoute(actor, { x: actor.x, y: actor.y }, target);
  if (route.length === 0) {
    actor.isMoving = false;
    actor.walkAnimTime = 0;
    return false;
  }

  const routeIndex = Math.min(actor.narrativeWalkRouteIndex || 0, route.length - 1);
  const waypoint = route[routeIndex];
  const dx = waypoint.x - actor.x;
  const dy = waypoint.y - actor.y;
  const remaining = Math.hypot(dx, dy);
  if (remaining <= 4) {
    if (!isYardNarrativeWalkSegmentClear(actor, waypoint)) {
      actor.isMoving = false;
      actor.walkAnimTime = 0;
      return false;
    }
    actor.x = waypoint.x;
    actor.y = waypoint.y;
    return completeYardNarrativeWalkWaypoint(actor, route);
  }
  const step = Math.min(remaining, speed * dt);
  const nextX = actor.x + dx / remaining * step;
  const nextY = actor.y + dy / remaining * step;
  if (!isYardNarrativeWalkSegmentClear(actor, { x: nextX, y: nextY })) {
    actor.isMoving = false;
    actor.walkAnimTime = 0;
    return false;
  }
  actor.x = nextX;
  actor.y = nextY;
  actor.facing = directionFromDelta(dx, dy);
  if (Object.prototype.hasOwnProperty.call(actor, "visualFacing")) {
    actor.visualFacing = actor.facing;
  }
  actor.isMoving = step > 0.01;
  if (actor.isMoving) {
    actor.walkAnimTime = (actor.walkAnimTime || 0) + dt;
  }
  return false;
}

function movePlayerForYardEscort(target, speed, dt) {
  const player = GameState.player;
  const foot = yardWorldToImagePoint(getPlayerFootPoint(player.x, player.y));
  const route = getYardNarrativeWalkRoute(player, foot, target);
  if (route.length === 0) {
    player.isMoving = false;
    player.walkAnimTime = 0;
    return false;
  }

  const routeIndex = Math.min(player.narrativeWalkRouteIndex || 0, route.length - 1);
  const waypoint = route[routeIndex];
  const dx = waypoint.x - foot.x;
  const dy = waypoint.y - foot.y;
  const remaining = Math.hypot(dx, dy);
  player.vx = 0;
  player.vy = 0;
  if (remaining <= 4) {
    if (!isYardNarrativeWalkSegmentClear(foot, waypoint)) {
      player.isMoving = false;
      player.walkAnimTime = 0;
      return false;
    }
    const waypointWorld = yardImageToWorldPoint(waypoint.x, waypoint.y);
    player.x = waypointWorld.x - player.w / 2;
    player.y = waypointWorld.y - player.h + 8;
    updateYardCamera();
    return completeYardNarrativeWalkWaypoint(player, route);
  }
  const step = Math.min(remaining, speed * dt);
  const nextFoot = {
    x: foot.x + dx / remaining * step,
    y: foot.y + dy / remaining * step
  };
  const nextWorldFoot = yardImageToWorldPoint(nextFoot.x, nextFoot.y);
  const nextX = nextWorldFoot.x - player.w / 2;
  const nextY = nextWorldFoot.y - player.h + 8;
  if (!isYardNarrativeWalkSegmentClear(foot, nextFoot) ||
    !isYardPositionWalkable(nextX, nextY)) {
    player.isMoving = false;
    player.walkAnimTime = 0;
    return false;
  }
  player.x = nextX;
  player.y = nextY;
  updateYardCamera();
  player.facing = directionFromDelta(dx, dy);
  player.isMoving = true;
  player.walkAnimTime += dt;
  return false;
}

function getYardNarrativeWalkRoute(mover, from, target) {
  const plannedTarget = mover.narrativeWalkTarget;
  const hasCurrentRoute = plannedTarget &&
    plannedTarget.x === target.x &&
    plannedTarget.y === target.y &&
    Array.isArray(mover.narrativeWalkRoute);
  if (!hasCurrentRoute) {
    mover.narrativeWalkRoute = createYardNarrativeWalkRoute(from, target) || [];
    mover.narrativeWalkRouteIndex = 0;
    mover.narrativeWalkTarget = { x: target.x, y: target.y };
  }
  return mover.narrativeWalkRoute;
}

function createYardNarrativeWalkRoute(from, target) {
  if (!isYardNpcPointWalkable(from.x, from.y) || !isYardNpcPointWalkable(target.x, target.y)) {
    return null;
  }
  if (isYardNarrativeWalkSegmentClear(from, target)) {
    return [{ x: target.x, y: target.y }];
  }

  const junctions = [
    { x: 1008, y: 928 },
    { x: 448, y: 528 },
    { x: 368, y: 928 },
    { x: 344, y: 984 },
    { x: 456, y: 1000 },
    { x: 288, y: 1104 }
  ];
  let bestJunction = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  junctions.forEach((junction) => {
    if (!isYardNarrativeWalkSegmentClear(from, junction) ||
      !isYardNarrativeWalkSegmentClear(junction, target)) {
      return;
    }
    const routeDistance = distance(from.x, from.y, junction.x, junction.y) +
      distance(junction.x, junction.y, target.x, target.y);
    if (routeDistance < bestDistance) {
      bestDistance = routeDistance;
      bestJunction = junction;
    }
  });

  return bestJunction ?
    [{ x: bestJunction.x, y: bestJunction.y }, { x: target.x, y: target.y }] :
    null;
}

function isYardNarrativeWalkSegmentClear(from, target) {
  const segmentLength = distance(from.x, from.y, target.x, target.y);
  const steps = Math.max(1, Math.ceil(segmentLength / YARD_NARRATIVE_ROUTE_SAMPLE_DISTANCE));
  for (let index = 0; index <= steps; index += 1) {
    const progress = index / steps;
    const x = from.x + (target.x - from.x) * progress;
    const y = from.y + (target.y - from.y) * progress;
    if (!isYardNpcPointWalkable(x, y)) {
      return false;
    }
  }
  return true;
}

function completeYardNarrativeWalkWaypoint(mover, route) {
  const routeIndex = mover.narrativeWalkRouteIndex || 0;
  if (routeIndex < route.length - 1) {
    mover.narrativeWalkRouteIndex = routeIndex + 1;
    mover.isMoving = true;
    return false;
  }

  mover.narrativeWalkRoute = null;
  mover.narrativeWalkRouteIndex = 0;
  mover.narrativeWalkTarget = null;
  mover.isMoving = false;
  mover.walkAnimTime = 0;
  return true;
}

function faceSideRouteCrowdAtPlayer() {
  const playerFoot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  const actors = GameState.sideRoute.backgroundCrowd.concat(GameState.yardPrisoners, [GameState.redNpc, GameState.brooksNpc]);
  actors.forEach((actor) => {
    if (!actor) {
      return;
    }
    if (!actor.fidgetTarget) {
      actor.facing = directionFromDelta(playerFoot.x - actor.x, playerFoot.y - actor.y);
      actor.isMoving = false;
      actor.walkAnimTime = 0;
    }
  });
  GameState.sideRoute.warden.facing = directionFromDelta(playerFoot.x - GameState.sideRoute.warden.x, playerFoot.y - GameState.sideRoute.warden.y);
}

function updateSideRouteCrowdChatter(dt) {
  const sideRoute = GameState.sideRoute;
  sideRoute.crowdChatterTimer = Math.max(0, (sideRoute.crowdChatterTimer || 0) - dt);
  if (sideRoute.crowdChatterTimer > 0) {
    return;
  }

  const speakers = sideRoute.backgroundCrowd
    .concat(GameState.yardPrisoners)
    .filter((actor) => actor && !actor.isMoving);
  if (speakers.length === 0) {
    sideRoute.crowdChatterTimer = 0.8;
    return;
  }

  const chatterIndex = sideRoute.crowdChatterIndex || 0;
  const speaker = speakers[(chatterIndex * 3 + 1) % speakers.length];
  const line = SideRouteCrowdChatterLines[chatterIndex % SideRouteCrowdChatterLines.length];
  setSideRouteCrowdRemark(speaker, line, 0, GameState.playTime);
  sideRoute.crowdChatterIndex = chatterIndex + 1;
  sideRoute.crowdChatterTimer = SIDE_ROUTE_CROWD_CHATTER_INTERVALS[
    chatterIndex % SIDE_ROUTE_CROWD_CHATTER_INTERVALS.length
  ];
}

function updateSideRouteYardAmbientActors(dt) {
  updateRedNpc(dt);
  if (GameState.sideRoute.stage !== "libraryTalk" && GameState.sideRoute.stage !== "brooksDialogue") {
    updateBrooksNpc(dt);
  }
  updateYardPrisoners(dt);
  updateYardGuards(dt);
}

function restoreSideRouteYardAmbientActors() {
  const sideRoute = GameState.sideRoute;
  sideRoute.backgroundCrowd = [];
  sideRoute.crowdFidgetTimer = 0;
  sideRoute.crowdChatterTimer = 0;
  sideRoute.crowdChatterIndex = 0;
  sideRoute.crowdRemarkStartedAt = -1;
  sideRoute.warningRemarkStartedAt = -1;
  sideRoute.yardTrialActive = false;
  sideRoute.yardTrialLineIndex = 0;
  sideRoute.yardTrialLineTimer = 0;
  GameState.yardPrisoners = [];
  GameState.redNpc.initialized = false;
  GameState.redNpc.mode = "patrol";
  GameState.redNpc.pendingDialogue = null;
  GameState.brooksNpc.initialized = false;
  GameState.brooksNpc.mode = "patrol";
  GameState.brooksNpc.pendingDialogue = null;
  resetYardGuardsForSoilRetry();
  initializeRedNpcState();
  initializeBrooksNpcState();
  initializeYardPrisoners();
}

function copyActorPosition(actor, point) {
  actor.x = point.x;
  actor.y = point.y;
}

function setSideRouteCrowdRemark(actor, text, delay, startedAt) {
  if (!actor) {
    return;
  }
  actor.crowdRemark = {
    text,
    delay,
    startedAt: Number.isFinite(startedAt) ? startedAt : null
  };
}

function prepareSideRouteLibraryMeeting() {
  const sideRoute = GameState.sideRoute;
  restoreSideRouteYardAmbientActors();
  sideRoute.stage = "libraryTalk";
  sideRoute.brooksDialogueStarted = false;
  GameState.brooksNpc.x = SideRouteYardLayout.brooksMeeting.x;
  GameState.brooksNpc.y = SideRouteYardLayout.brooksMeeting.y;
  GameState.brooksNpc.target = { ...SideRouteYardLayout.brooksMeeting };
  GameState.brooksNpc.facing = "right";
  GameState.brooksNpc.isMoving = false;
  GameState.brooksNpc.walkAnimTime = 0;
  GameState.currentQuest = "quest_side_route_find_brooks";
}

function startSideRouteBrooksDialogue() {
  const sideRoute = GameState.sideRoute;
  if (sideRoute.stage !== "libraryTalk" || sideRoute.brooksDialogueStarted) {
    return;
  }
  sideRoute.stage = "brooksDialogue";
  sideRoute.brooksDialogueStarted = true;
  GameState.currentQuest = "quest_side_route_escape_plan";
  DialogueSystem.start(SideRouteBrooksDialogueLines);
}

function enterSolitaryScene() {
  const sideRoute = GameState.sideRoute;
  sideRoute.stage = "solitary";
  sideRoute.solitarySleepPhase = "idle";
  sideRoute.solitarySleepTimer = 0;
  setPlayerFootToSolitary(SolitaryLayout.spawnFoot.x, SolitaryLayout.spawnFoot.y);
  GameState.player.facing = "left";
  GameState.currentQuest = sideRoute.solitarySlept ?
    "quest_side_route_solitary_wake" :
    (sideRoute.solitaryStoneRead ? "quest_side_route_solitary_sleep" : "quest_side_route_solitary_stone");
}

function updateSolitaryScene(dt) {
  if (updateSolitarySleep(dt)) {
    return;
  }
  if (DialogueSystem.active) {
    stopPlayerForNpcDialogue();
    return;
  }
  updatePlayer(dt);
}

function handleSolitaryInput() {
  if (GameState.sideRoute.solitarySleepPhase !== "idle" || DialogueSystem.active) {
    return;
  }
  const interaction = getActiveSolitaryInteraction();
  if (!InputSystem.actionPressed("interact") || !interaction) {
    return;
  }
  if (interaction.id === "stone") {
    GameState.sideRoute.solitaryStoneRead = true;
    GameState.currentQuest = "quest_side_route_solitary_sleep";
    startPropInteraction(SolitaryStoneDialogueLines);
  } else if (interaction.id === "mat") {
    startSolitarySleep();
  } else if (interaction.id === "door") {
    leaveSolitaryForLibrary();
  }
}

function getActiveSolitaryInteraction() {
  if (GameState.scene !== "solitary" || GameState.sideRoute.solitarySleepPhase !== "idle") {
    return null;
  }
  const foot = getPlayerFootPoint(GameState.player.x, GameState.player.y);
  if (!GameState.sideRoute.solitaryStoneRead && pointInRect(foot, SolitaryLayout.stoneZone)) {
    return { id: "stone" };
  }
  if (GameState.sideRoute.solitaryStoneRead && !GameState.sideRoute.solitarySlept && pointInRect(foot, SolitaryLayout.matInteractionZone)) {
    return { id: "mat" };
  }
  if (GameState.sideRoute.solitarySlept && pointInRect(foot, SolitaryLayout.doorZone)) {
    return { id: "door" };
  }
  return null;
}

function startSolitarySleep() {
  const sideRoute = GameState.sideRoute;
  if (!sideRoute.solitaryStoneRead || sideRoute.solitarySlept) {
    return;
  }
  rememberPlayerPositionBeforeSleep();
  setPlayerFootToSolitary(SolitaryLayout.matSleepFoot.x, SolitaryLayout.matSleepFoot.y);
  sideRoute.solitarySleepPhase = "fadeOut";
  sideRoute.solitarySleepTimer = 0;
  GameState.currentQuest = "quest_side_route_solitary_sleep";
  stopPlayerForNpcDialogue();
}

function updateSolitarySleep(dt) {
  const sideRoute = GameState.sideRoute;
  if (sideRoute.solitarySleepPhase === "idle") {
    return false;
  }
  sideRoute.solitarySleepTimer += dt;
  stopPlayerForNpcDialogue();
  if (sideRoute.solitarySleepPhase === "fadeOut" && sideRoute.solitarySleepTimer >= SOLITARY_SLEEP_FADE_SECONDS) {
    sideRoute.solitarySleepPhase = "blackHold";
    sideRoute.solitarySleepTimer = 0;
    return true;
  }
  if (sideRoute.solitarySleepPhase === "blackHold" && sideRoute.solitarySleepTimer >= SOLITARY_SLEEP_BLACK_SECONDS) {
    sideRoute.solitarySleepPhase = "fadeIn";
    sideRoute.solitarySleepTimer = 0;
    return true;
  }
  if (sideRoute.solitarySleepPhase === "fadeIn" && sideRoute.solitarySleepTimer >= SOLITARY_SLEEP_FADE_SECONDS) {
    sideRoute.solitarySleepPhase = "idle";
    sideRoute.solitarySleepTimer = 0;
    sideRoute.solitarySlept = true;
    restorePlayerPositionAfterSleep();
    GameState.currentQuest = "quest_side_route_solitary_wake";
    return false;
  }
  return true;
}

function leaveSolitaryForLibrary() {
  if (!GameState.sideRoute.solitarySlept) {
    return;
  }
  GameState.sideRoute.stage = "corridorAfterSolitary";
  enterCellCorridor("solitary", "postSolitary");
}

function resetSideRouteContinuationState() {
  const sideRoute = GameState.sideRoute;
  sideRoute.cellSleepPhase = "idle";
  sideRoute.cellSleepTimer = 0;
  sideRoute.morningGuardPaths = [];
  sideRoute.morningGateCaptureTimer = 0;
  sideRoute.officePhase = "idle";
  sideRoute.officeEvidenceFound = false;
  sideRoute.officeHideTimer = 0;
  Object.assign(sideRoute.officeActors.warden, {
    x: OfficeLayout.wardenStart.x,
    y: OfficeLayout.wardenStart.y,
    facing: "left",
    isMoving: false,
    walkAnimTime: 0
  });
  Object.assign(sideRoute.officeActors.guard, {
    x: 806,
    y: 650,
    facing: "left",
    visualFacing: "left",
    isMoving: false,
    walkAnimTime: 0
  });
}

function isSideRouteCellReturn() {
  return GameState.sideRoute.active &&
    (GameState.sideRoute.stage === "returnToCellSleep" || GameState.sideRoute.cellSleepPhase !== "idle");
}

function enterSideRouteCellScene() {
  const sideRoute = GameState.sideRoute;
  sideRoute.cellSleepPhase = "idle";
  sideRoute.cellSleepTimer = 0;
  GameState.player.lyingInBed = false;
  setPlayerFootToCellImage(220, 620);
  GameState.player.facing = "right";
  GameState.currentQuest = "quest_side_route_sleep_until_morning";
}

function updateSideRouteCellScene(dt) {
  if (updateSideRouteCellSleep(dt)) {
    return;
  }
  if (DialogueSystem.active) {
    stopPlayerForNpcDialogue();
    return;
  }
  updatePlayer(dt);
}

function handleSideRouteCellInput() {
  const sideRoute = GameState.sideRoute;
  if (DialogueSystem.active || sideRoute.cellSleepPhase !== "idle") {
    return;
  }
  const interaction = getActiveCellInteraction();
  if (InputSystem.actionPressed("interact") && interaction) {
    if (interaction.id === "sideRouteBed") {
      startSideRouteCellSleep();
    } else if (interaction.id === "wallSecretCheck") {
      investigateCellWallSecret();
    }
  }
}

function startSideRouteCellSleep() {
  const sideRoute = GameState.sideRoute;
  if (sideRoute.stage !== "returnToCellSleep" || sideRoute.cellSleepPhase !== "idle") {
    return;
  }
  rememberPlayerPositionBeforeSleep();
  lieDownInBed();
  sideRoute.cellSleepPhase = "fadeOut";
  sideRoute.cellSleepTimer = 0;
  GameState.currentQuest = "quest_side_route_sleep_until_morning";
}

function updateSideRouteCellSleep(dt) {
  const sideRoute = GameState.sideRoute;
  if (sideRoute.cellSleepPhase === "idle") {
    return false;
  }
  sideRoute.cellSleepTimer += dt;
  stopPlayerForNpcDialogue();
  if (sideRoute.cellSleepPhase === "fadeOut" && sideRoute.cellSleepTimer >= SIDE_ROUTE_CELL_SLEEP_FADE_SECONDS) {
    sideRoute.cellSleepPhase = "blackHold";
    sideRoute.cellSleepTimer = 0;
    return true;
  }
  if (sideRoute.cellSleepPhase === "blackHold" && sideRoute.cellSleepTimer >= SIDE_ROUTE_CELL_SLEEP_BLACK_SECONDS) {
    sideRoute.cellSleepPhase = "fadeIn";
    sideRoute.cellSleepTimer = 0;
    return true;
  }
  if (sideRoute.cellSleepPhase === "fadeIn" && sideRoute.cellSleepTimer >= SIDE_ROUTE_CELL_SLEEP_FADE_SECONDS) {
    sideRoute.cellSleepPhase = "idle";
    sideRoute.cellSleepTimer = 0;
    sideRoute.stage = "morningPatrol";
    restorePlayerPositionAfterSleep();
    GameState.currentQuest = "quest_side_route_morning_patrol";
    return true;
  }
  return true;
}

function startSideRouteMorningPatrol() {
  const sideRoute = GameState.sideRoute;
  sideRoute.stage = "morningPatrol";
  sideRoute.morningGateCaptureTimer = 0;
  sideRoute.backgroundCrowd = [];
  sideRoute.morningGuardPaths = SideRouteMorningLayout.guardPaths.map((path) => path.map((point) => ({ ...point })));
  GameState.yardGuards.forEach((guard, index) => {
    const path = sideRoute.morningGuardPaths[index] || sideRoute.morningGuardPaths[0];
    const start = path[0];
    guard.x = start.x;
    guard.y = start.y;
    guard.pathIndex = 1 % path.length;
    guard.targetX = path[guard.pathIndex].x;
    guard.targetY = path[guard.pathIndex].y;
    guard.facing = directionFromDelta(guard.targetX - guard.x, guard.targetY - guard.y);
    guard.visualFacing = guard.facing;
    guard.isMoving = true;
    guard.walkAnimTime = 0;
  });
  GameState.currentQuest = "quest_side_route_morning_patrol";
}

function updateSideRouteMorningGuards(dt) {
  const paths = GameState.sideRoute.morningGuardPaths;
  GameState.yardGuards.forEach((guard, index) => {
    if (isGuardConversationTarget("gate", index)) {
      guard.isMoving = false;
      return;
    }
    const path = paths[index];
    if (!path || path.length === 0) {
      return;
    }
    const target = path[guard.pathIndex % path.length];
    if (moveYardActorTo(guard, target, SIDE_ROUTE_MORNING_GUARD_SPEED, dt)) {
      guard.pathIndex = (guard.pathIndex + 1) % path.length;
    }
  });
}

function startSideRouteGateCapture() {
  const sideRoute = GameState.sideRoute;
  if (sideRoute.stage !== "morningPatrol") {
    return;
  }
  const foot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  sideRoute.stage = "morningGateCaught";
  sideRoute.morningGateCaptureTimer = 0;
  GameState.currentQuest = "quest_side_route_gate_caught";
  GameState.yardGuards.forEach((guard, index) => {
    const offset = SideRouteMorningLayout.captureOffsets[index] || { x: 0, y: 0 };
    guard.captureTarget = { x: foot.x + offset.x, y: foot.y + offset.y };
  });
}

function updateSideRouteGateCapture(dt) {
  const sideRoute = GameState.sideRoute;
  stopPlayerForNpcDialogue();
  let everyoneArrived = true;
  GameState.yardGuards.forEach((guard) => {
    const arrived = moveYardActorTo(guard, guard.captureTarget, SIDE_ROUTE_MORNING_GUARD_SPEED * 2.4, dt);
    everyoneArrived = everyoneArrived && arrived;
  });
  if (!everyoneArrived) {
    return;
  }
  sideRoute.morningGateCaptureTimer += dt;
  if (sideRoute.morningGateCaptureTimer >= SIDE_ROUTE_GATE_CAPTURE_SECONDS) {
    GameState.failReason = "你刚靠近大门，几名看守便冲过来把你围住。此路不通，先去左侧办公室寻找其他机会。";
    GameState.failRecovery = "sideRouteMorning";
    changeScene("fail");
  }
}

function restoreSideRouteMorningFailure() {
  GameState.failReason = "";
  GameState.failRecovery = null;
  GameState.failRecoveryTimer = 0;
  GameState.sideRoute.stage = "morningPatrol";
  GameState.sideRoute.morningGateCaptureTimer = 0;
  GameState.yardGuards.forEach((guard) => {
    delete guard.captureTarget;
    guard.isMoving = false;
    guard.walkAnimTime = 0;
  });
  changeScene("yard");
  setPlayerFootToYardImage(YardLayout.entryPoint.x, YardLayout.entryPoint.y);
  GameState.player.facing = "right";
  startSideRouteMorningPatrol();
  updateYardCamera();
}

function isSideRouteOfficeActive() {
  return GameState.sideRoute.active &&
    GameState.sideRoute.stage === "officeSearch" &&
    GameState.scene === "office";
}

function enterSideRouteOfficeScene() {
  const sideRoute = GameState.sideRoute;
  // 备用路线已经是真实的办公室到访，之后不能再触发“首次擅闯”警告。
  GameState.officeFirstWarningSeen = true;
  resetOfficeSceneState();
  GameState.office.mode = "sideRoute";
  GameState.office.wardenPhase = "gone";
  GameState.player.lyingInBed = false;
  GameState.player.facing = "up";
  setPlayerFootToOfficeImage(OfficeLayout.spawnFoot.x, OfficeLayout.spawnFoot.y);
  sideRoute.officePhase = "search";
  sideRoute.officeEvidenceFound = false;
  sideRoute.officeHideTimer = 0;
  Object.assign(sideRoute.officeActors.warden, {
    x: SideRouteOfficeLayout.actorsEntry.warden.x,
    y: SideRouteOfficeLayout.actorsEntry.warden.y,
    facing: "up",
    isMoving: false,
    walkAnimTime: 0
  });
  Object.assign(sideRoute.officeActors.guard, {
    x: SideRouteOfficeLayout.actorsEntry.guard.x,
    y: SideRouteOfficeLayout.actorsEntry.guard.y,
    facing: "up",
    visualFacing: "up",
    isMoving: false,
    walkAnimTime: 0
  });
  GameState.currentQuest = "quest_side_route_office_search";
}

function updateSideRouteOfficeScene(dt) {
  const sideRoute = GameState.sideRoute;
  if (sideRoute.officePhase === "evidenceDialogue" && !DialogueSystem.active) {
    sideRoute.officePhase = "hideCountdown";
    sideRoute.officeHideTimer = SIDE_ROUTE_OFFICE_HIDE_SECONDS;
    GameState.currentQuest = "quest_side_route_office_hide";
  }
  if (sideRoute.officePhase === "wardenDialogue") {
    updateSideRouteOfficeWardenPacing(dt);
    if (!DialogueSystem.active) {
      sideRoute.officePhase = "wardenLeaving";
      GameState.currentQuest = "quest_side_route_office_listen";
    }
  }
  if (sideRoute.officePhase === "searchAgainDialogue" && !DialogueSystem.active) {
    sideRoute.officePhase = "searchAgain";
    GameState.currentQuest = "quest_side_route_office_search_again";
  }
  if (sideRoute.officePhase === "finalEvidenceDialogue" && !DialogueSystem.active) {
    returnSideRouteToPosterMainFlow();
    return;
  }

  if (DialogueSystem.active) {
    stopPlayerForNpcDialogue();
    return;
  }

  if (sideRoute.officePhase === "hideCountdown") {
    sideRoute.officeHideTimer = Math.max(0, sideRoute.officeHideTimer - dt);
    if (sideRoute.officeHideTimer <= 0) {
      failSideRouteOfficeHide();
      return;
    }
    updatePlayer(dt);
    return;
  }

  if (sideRoute.officePhase === "wardenLeaving") {
    updateSideRouteOfficeActorsLeaving(dt);
    return;
  }

  if (sideRoute.officePhase === "hidden" || sideRoute.officePhase === "wardenDialogue") {
    stopPlayerForNpcDialogue();
    return;
  }

  updatePlayer(dt);
}

function handleSideRouteOfficeInput() {
  const sideRoute = GameState.sideRoute;
  if (DialogueSystem.active || sideRoute.officePhase === "wardenLeaving" || sideRoute.officePhase === "hidden") {
    return;
  }
  const interaction = getActiveOfficeInteraction();
  if (!InputSystem.actionPressed("interact") || !interaction) {
    return;
  }
  if (interaction.id === "sideRouteDesk" && sideRoute.officePhase === "search") {
    sideRoute.officeEvidenceFound = true;
    sideRoute.officePhase = "evidenceDialogue";
    startPropInteraction(SideRouteOfficeEvidenceLines);
  } else if (interaction.id === "sideRouteDesk" && sideRoute.officePhase === "searchAgain") {
    sideRoute.officePhase = "finalEvidenceDialogue";
    startPropInteraction(SideRouteOfficeFinalEvidenceLines);
  } else if (interaction.id === "sideRouteCurtain") {
    hideInSideRouteOfficeCurtain();
  }
}

function hideInSideRouteOfficeCurtain() {
  const sideRoute = GameState.sideRoute;
  if (sideRoute.officePhase !== "hideCountdown") {
    return;
  }
  GameState.office.curtainsClosed = true;
  setPlayerFootToOfficeImage(
    SideRouteOfficeLayout.curtainHideFoot.x,
    SideRouteOfficeLayout.curtainHideFoot.y
  );
  GameState.player.facing = "up";
  Object.assign(sideRoute.officeActors.guard, {
    x: SideRouteOfficeLayout.actorsEntry.guard.x,
    y: SideRouteOfficeLayout.actorsEntry.guard.y,
    facing: "down",
    visualFacing: "down",
    isMoving: false,
    walkAnimTime: 0
  });
  Object.assign(sideRoute.officeActors.warden, {
    x: SideRouteOfficeLayout.wardenPacePoints[0].x,
    y: SideRouteOfficeLayout.wardenPacePoints[0].y,
    facing: "right",
    isMoving: true,
    walkAnimTime: 0,
    paceIndex: 1
  });
  sideRoute.officePhase = "wardenDialogue";
  GameState.currentQuest = "quest_side_route_office_listen";
  DialogueSystem.start(SideRouteOfficeWardenLines);
}

function updateSideRouteOfficeActorsLeaving(dt) {
  const sideRoute = GameState.sideRoute;
  const wardenArrived = moveSideRouteOfficeActor(
    sideRoute.officeActors.warden,
    OfficeLayout.wardenExit,
    SIDE_ROUTE_OFFICE_EXIT_SPEED,
    dt
  );
  const guardArrived = moveSideRouteOfficeActor(
    sideRoute.officeActors.guard,
    { x: OfficeLayout.wardenExit.x - 74, y: OfficeLayout.wardenExit.y + 16 },
    SIDE_ROUTE_OFFICE_EXIT_SPEED,
    dt
  );
  if (wardenArrived && guardArrived) {
    sideRoute.officePhase = "searchAgainDialogue";
    GameState.currentQuest = "quest_side_route_office_search_again";
    DialogueSystem.start(SideRouteOfficeSearchAgainLines);
  }
}

function updateSideRouteOfficeWardenPacing(dt) {
  const warden = GameState.sideRoute.officeActors.warden;
  const points = SideRouteOfficeLayout.wardenPacePoints;
  const target = points[warden.paceIndex % points.length];
  if (moveSideRouteOfficeActor(warden, target, 86, dt)) {
    warden.paceIndex = (warden.paceIndex + 1) % points.length;
  }
}

function moveSideRouteOfficeActor(actor, target, speed, dt) {
  const dx = target.x - actor.x;
  const dy = target.y - actor.y;
  const remaining = Math.hypot(dx, dy);
  if (remaining <= 6) {
    actor.x = target.x;
    actor.y = target.y;
    actor.isMoving = false;
    actor.walkAnimTime = 0;
    return true;
  }
  const step = Math.min(remaining, speed * dt);
  actor.x += dx / remaining * step;
  actor.y += dy / remaining * step;
  actor.facing = directionFromDelta(dx, dy);
  if (Object.prototype.hasOwnProperty.call(actor, "visualFacing")) {
    actor.visualFacing = actor.facing;
  }
  actor.isMoving = step > 0.01;
  actor.walkAnimTime = (actor.walkAnimTime || 0) + dt;
  return false;
}

function failSideRouteOfficeHide() {
  GameState.failReason = "门外的脚步声停在门口。你还没藏好，被看守抓住了。";
  GameState.failRecovery = "sideRouteOffice";
  changeScene("fail");
}

function restoreSideRouteOfficeFailure() {
  GameState.failReason = "";
  GameState.failRecovery = null;
  GameState.sideRoute.stage = "officeSearch";
  GameState.sideRoute.officePhase = "idle";
  GameState.sideRoute.officeEvidenceFound = false;
  GameState.sideRoute.officeHideTimer = 0;
  changeScene("office");
}

function returnSideRouteToPosterMainFlow() {
  GameState.hasHammer = true;
  GameState.hasBible = true;
  GameState.hammerConfiscated = false;
  GameState.inspectionPassed = true;
  GameState.hasAttributeC = true;
  GameState.brooksBibleDelivered = true;
  GameState.alternateEscapeRoute = true;
  GameState.officeFirstWarningSeen = true;
  GameState.sideRoute.active = false;
  GameState.sideRoute.stage = "none";
  resetSideRouteContinuationState();
  resetCellInspectionState();
  saveCheckpoint("CP_INSPECTION_PASSED");
  changeScene("yard");
}

function setPlayerFootToSolitary(x, y) {
  const player = GameState.player;
  player.x = x - player.w / 2;
  player.y = y - player.h + 8;
  player.vx = 0;
  player.vy = 0;
  player.isMoving = false;
  player.walkAnimTime = 0;
}

function isSolitaryPositionWalkable(x, y) {
  return pointInPolygon(getPlayerFootPoint(x, y), SolitaryLayout.walkPolygon);
}

function movePlayerToNearestSolitaryPoint() {
  const player = GameState.player;
  const foot = getPlayerFootPoint(player.x, player.y);
  const bounds = SolitaryLayout.walkBounds;
  let bestPoint = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let y = bounds.y; y <= bounds.y + bounds.h; y += 12) {
    for (let x = bounds.x; x <= bounds.x + bounds.w; x += 12) {
      const point = { x, y };
      if (!pointInPolygon(point, SolitaryLayout.walkPolygon)) {
        continue;
      }
      const pointDistance = distance(foot.x, foot.y, point.x, point.y);
      if (pointDistance < bestDistance) {
        bestDistance = pointDistance;
        bestPoint = point;
      }
    }
  }

  if (bestPoint) {
    setPlayerFootToSolitary(bestPoint.x, bestPoint.y);
  }
}

function restoreInspectionFailureToHammerCheckpoint() {
  GameState.hasHammer = true;
  GameState.hasBible = false;
  GameState.hammerHiddenInBible = false;
  GameState.inspectionPassed = false;
  GameState.hasAttributeC = false;
  GameState.wallDigPromptShown = false;
  GameState.redHammerDelivered = true;
  GameState.brooksBibleDelivered = false;
  GameState.brooksDialogueActive = false;
  GameState.brooksDialogueKind = null;
  GameState.libraryTask.brooksInside = false;
  GameState.libraryTask.sortingActive = false;
  GameState.libraryTask.sortingProgress = 0;
  GameState.libraryTask.bookOrder = [];
  GameState.libraryTask.selectedBookIndex = null;
  GameState.libraryTask.sortMoves = 0;
  GameState.libraryTask.sortingStatus = "idle";
  GameState.libraryTask.sortingMessage = "";
  GameState.libraryTask.completionTimer = 0;
  GameState.brooksNpc.mode = "patrol";
  GameState.brooksNpc.entryPauseTimer = 0;
  GameState.brooksNpc.pendingDialogue = null;
  resetHammerHidePuzzleState();
  resetCellInspectionState();
  saveCheckpoint("CP_HAMMER_OBTAINED");
  changeScene("yard");
  GameState.currentQuest = "quest_yard_library";
}

function completeCellInspectionSuccess() {
  GameState.inspectionPassed = true;
  GameState.hasAttributeC = true;
  resetCellInspectionState();
  saveCheckpoint("CP_INSPECTION_PASSED");
  GameState.currentQuest = "quest_cell_return_red_for_poster";
  DialogueSystem.start(InspectionAfterthoughtLines);
}

function canStartInitialCellInspection() {
  const canStartStandardInspection = GameState.hasHammer &&
    GameState.hasBible &&
    GameState.hammerHiddenInBible &&
    GameState.wallDigPromptShown &&
    !GameState.inspectionPassed &&
    !GameState.hasAttributeC;
  return canStartStandardInspection || isHammerOnlyInspectionEligible();
}

function isHammerOnlyInspectionEligible() {
  return GameState.hasHammer &&
    !GameState.hasBible &&
    !GameState.bibleUsed &&
    !GameState.inspectionPassed &&
    !GameState.twentyYearsPassed &&
    !GameState.hammerConfiscated &&
    !GameState.sideRoute.active;
}

function canRestAtCellBed() {
  const canStartMontage = GameState.hasAttributeD && !GameState.twentyYearsPassed;
  const canStartInspection = canStartInitialCellInspection();
  return canStartMontage || canStartInspection;
}

function getActiveCellInteraction() {
  if (GameState.scene !== "cell" ||
    GameState.hammerHidePuzzle.active ||
    isCellInspectionActive() ||
    isWallHoleRevealTransitionActive()
  ) {
    return null;
  }

  if (isSideRouteCellReturn()) {
    if (GameState.sideRoute.cellSleepPhase !== "idle") {
      return null;
    }
    if (!GameState.posterType && isPlayerNearWallPicture()) {
      return { id: "wallSecretCheck" };
    }
    return isPlayerNearCellBed() ? { id: "sideRouteBed" } : null;
  }

  if (canHideHammerInBible() && isPlayerNearCellTable()) {
    return { id: "hideHammer" };
  }

  if (canDrawMapAtTable() && isPlayerNearCellTable()) {
    return { id: "drawMap" };
  }

  const wallInteractionId = getWallInteractionId();
  if (wallInteractionId) {
    return { id: wallInteractionId };
  }

  if (GameState.player.lyingInBed || (canRestAtCellBed() && isPlayerNearCellBed())) {
    return { id: "bed" };
  }

  if (isPlayerNearCellDoor() && !GameState.player.lyingInBed) {
    return { id: "cellDoor" };
  }

  return null;
}

function getPostMontageCellQuest() {
  if (GameState.finalDigUnlocked && GameState.hasAttributeC) {
    return "quest_cell_final_dig_ready";
  }
  if (GameState.hasMap) {
    return "quest_cell_map_obtained";
  }
  if (GameState.pipeMazeActive) {
    return "quest_cell_pipe_maze";
  }
  if (GameState.mapRevealActive) {
    return "quest_cell_map_ready";
  }
  if (GameState.postMontageRedSpoken) {
    return "quest_cell_draw_map_return";
  }
  return "quest_cell_find_red_after_montage";
}

function getPostMontageYardQuest() {
  if (GameState.finalDigUnlocked && GameState.hasAttributeC) {
    return "quest_cell_final_dig_ready";
  }
  if (GameState.hasMap) {
    return "quest_cell_map_obtained";
  }
  if (GameState.postMontageRedSpoken) {
    return "quest_yard_red_after_montage_done";
  }
  return "quest_yard_find_red_after_montage";
}

function getEarlyCellQuest() {
  if (isHammerOnlyInspectionEligible()) {
    return "quest_cell_prepare_confiscation_inspection";
  }
  if (GameState.hasHammer && GameState.hasBible) {
    if (!GameState.hammerHiddenInBible && !GameState.inspectionPassed) {
      return "quest_cell_hide_hammer";
    }
    if (!GameState.inspectionPassed) {
      return "quest_cell_wait_inspection";
    }
    if (!GameState.wallDigPromptShown) {
      return "quest_cell_wall_prompt";
    }
    if (!GameState.posterType) {
      return "quest_cell_return_red_for_poster";
    }
    if (!GameState.posterHung) {
      return "quest_yard_return_cell_to_hang_poster";
    }
    return "quest_cell_wall_picture";
  }
  return GameState.hasAttributeC ? "quest_cell_wall_picture" : "quest_cell_wake";
}

function getEarlyYardQuest() {
  if (GameState.sideRoute.active) {
    if (GameState.sideRoute.stage === "libraryTalk") {
      return "quest_side_route_find_brooks";
    }
    if (GameState.sideRoute.stage === "returnToCellSleep") {
      return "quest_side_route_return_cell";
    }
    if (GameState.sideRoute.stage === "morningPatrol") {
      return "quest_side_route_morning_patrol";
    }
    if (GameState.sideRoute.stage === "officeSearch") {
      return "quest_side_route_office_search";
    }
    return "quest_side_route_awaiting_continuation";
  }
  if (GameState.hasSoilPile) {
    return "quest_yard_soil";
  }
  if (!GameState.hasHammer) {
    return "quest_yard_red";
  }
  if (!GameState.hasBible) {
    return "quest_yard_library";
  }
  if (!GameState.hammerHiddenInBible && !GameState.inspectionPassed) {
    return "quest_cell_hide_hammer";
  }
  if (!GameState.inspectionPassed) {
    return "quest_cell_wait_inspection";
  }
  if (!GameState.posterType) {
    return "quest_cell_return_red_for_poster";
  }
  if (!GameState.posterHung) {
    return "quest_yard_return_cell_to_hang_poster";
  }
  return "quest_cell_first_dig_ready";
}

function showWallDigPrompt() {
  if (!GameState.hasHammer || !GameState.hasBible || GameState.wallDigPromptShown) {
    return;
  }
  GameState.wallDigPromptShown = true;
  if (!GameState.inspectionPassed) {
  GameState.currentQuest = "quest_cell_commotion";
  NarrativeCueSystem.schedule([
    "安迪（心理）：该死！幕后主使来检查房间了，快在床边站好。"
  ], "quest_cell_commotion");
    return;
  }

  GameState.currentQuest = GameState.posterType ?
    "quest_yard_return_cell_to_hang_poster" :
    "quest_cell_return_red_for_poster";
  startPropInteraction(WallDigPromptLines);
}

function hangPosterAtWall() {
  if (!getSelectedPoster() || GameState.posterHung) {
    return;
  }
  GameState.posterHung = true;
  GameState.currentQuest = "quest_cell_wall_picture";
  startPropInteraction(PosterHungThoughtLines);
}

function getCellSceneAssetKey() {
  if (!GameState.posterHung) {
    return "cell";
  }
  return GameState.posterType === "marilyn" ? "cell_other_poster" : "cell_poster";
}

function canUseWallPicture() {
  if (!GameState.posterHung || GameState.hasSoilPile) {
    return false;
  }
  if (!GameState.twentyYearsPassed) {
    return isFirstDigUnlocked() && GameState.wallDigPromptShown && !GameState.hasAttributeD;
  }
  return GameState.finalDigUnlocked &&
    (GameState.ledgerSwapped || GameState.alternateEscapeRoute) &&
    GameState.hasAttributeC;
}

function isFirstDigUnlocked() {
  return GameState.hasHammer && GameState.hasBible && GameState.inspectionPassed;
}

function getWallInteractionId() {
  if (!isPlayerNearWallPicture()) {
    return null;
  }

  const canTriggerInspection = GameState.hasHammer &&
    GameState.hasBible &&
    GameState.hammerHiddenInBible &&
    !GameState.inspectionPassed &&
    !GameState.wallDigPromptShown;
  if (canTriggerInspection) {
    return "wallDigHint";
  }

  const canStartFirstDig = isFirstDigUnlocked() &&
    !GameState.twentyYearsPassed &&
    !GameState.hasSoilPile &&
    !GameState.hasAttributeD;

  if (canStartFirstDig && !GameState.wallDigPromptShown) {
    return "wallDigHint";
  }
  if (canStartFirstDig && GameState.posterType && !GameState.posterHung) {
    return "hangPoster";
  }
  if (!GameState.posterType) {
    return "wallSecretCheck";
  }
  return canUseWallPicture() ? "wallPicture" : null;
}

function isPlayerNearWallPicture() {
  const foot = canvasPointToCellImage(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  return Boolean(foot && pointInRect(foot, CellLayout.pictureInteractZone));
}

function canDrawMapAtTable() {
  return GameState.twentyYearsPassed &&
    GameState.postMontageRedSpoken &&
    !GameState.hasMap &&
    !GameState.pipeMazeActive &&
    !GameState.mapRevealActive;
}

function isPlayerNearCellTable() {
  const foot = canvasPointToCellImage(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  return Boolean(foot && pointInRect(foot, CellLayout.tableDrawZone));
}

function startMapDrawing() {
  if (!canDrawMapAtTable()) {
    return;
  }

  GameState.pipeMazeActive = true;
  GameState.mapDrawn = false;
  GameState.currentQuest = "quest_cell_pipe_maze";
  stopPlayerForNpcDialogue();
  MiniGameHost.open("pipeMaze");
}

function handlePipeMazeInput() {
  if (InputSystem.actionPressed("interact")) {
    MiniGameHost.requestPipeMazeAction(" ");
  }
  ["w", "a", "s", "d"].forEach((key) => {
    if (InputSystem.isPressed(key)) {
      MiniGameHost.requestPipeMazeAction(key);
    }
  });
}

function finishPipeMazeMap() {
  if (!GameState.pipeMazeActive) {
    return;
  }

  GameState.pipeMazeActive = false;
  GameState.mapDrawn = true;
  GameState.mapRevealActive = true;
  GameState.currentQuest = "quest_cell_map_ready";
}

function deliverDrawnMap() {
  if (!GameState.mapDrawn || GameState.pipeMazeActive) {
    return;
  }

  GameState.hasMap = true;
  GameState.mapRevealActive = false;

  if (GameState.alternateEscapeRoute) {
    GameState.finalDigUnlocked = true;
    GameState.hasAttributeC = true;
    GameState.currentQuest = "quest_cell_final_dig_ready";
    saveCheckpoint("CP_FINAL_DIG");
    startPropInteraction(AlternateRouteMapObtainedThoughtLines);
    return;
  }

  GameState.currentQuest = "quest_cell_map_obtained";
  saveCheckpoint("CP_MAP_OBTAINED");
  startPropInteraction(MapObtainedThoughtLines);
}

function handleWallPictureInteraction() {
  revealWallHole();
}

function revealWallHole() {
  GameState.wallHole.revealed = true;
  GameState.wallHole.introPending = true;
  GameState.wallHole.exitPending = false;
  GameState.wallHole.timer = 0;
  GameState.currentQuest = "quest_cell_first_dig_ready";
}

function isWallHoleRevealTransitionActive() {
  return GameState.wallHole.revealed && GameState.wallHole.introPending;
}

function updateWallHoleRevealTransition(dt) {
  if (!isWallHoleRevealTransitionActive()) {
    return false;
  }

  GameState.wallHole.timer += dt;
  if (GameState.wallHole.timer >= WALL_HOLE_REVEAL_SECONDS) {
    resetWallHoleReveal();
    changeScene("dig");
  }
  return true;
}

function startWallHoleExitHold() {
  GameState.wallHole.revealed = true;
  GameState.wallHole.introPending = false;
  GameState.wallHole.exitPending = true;
  GameState.wallHole.timer = 0;
}

function isWallHoleExitHoldActive() {
  return GameState.wallHole.revealed && GameState.wallHole.exitPending;
}

function updateWallHoleExitHold(dt) {
  if (!isWallHoleExitHoldActive()) {
    return;
  }

  GameState.wallHole.timer += dt;
  if (GameState.wallHole.timer >= WALL_HOLE_EXIT_SECONDS) {
    resetWallHoleReveal();
  }
}

function resetWallHoleReveal() {
  GameState.wallHole.revealed = false;
  GameState.wallHole.introPending = false;
  GameState.wallHole.exitPending = false;
  GameState.wallHole.timer = 0;
}

function initializeDigScene() {
  GameState.dig.mode = isFinalDigMode() ? "finalTunnel" : "firstDig";
  const layout = getCurrentDigLayout();
  const basePlayerH = isFinalDigScene() ? layout.walkRect.h : layout.walkRect.h - 4;
  const playerH = isFinalDigScene() ? Math.max(1, Math.round(basePlayerH / 2)) : basePlayerH;
  const playerW = Math.max(1, Math.round(playerH * 52 / 108));
  const playerY = isFinalDigScene() ?
    getTunnelPlayerY(layout, playerH) :
    layout.walkRect.y + 2;
  resetWallHoleReveal();
  GameState.dig.playerW = playerW;
  GameState.dig.playerH = playerH;
  if (isFinalDigScene()) {
    GameState.dig.playerX = FinalDigLayout.entryZone.x + FinalDigLayout.entryZone.w / 2 - playerW / 2;
  } else {
    GameState.dig.playerX = DigLayout.leftExitZone.x + 12;
  }
  GameState.dig.playerY = playerY;
  GameState.dig.facing = "right";
  GameState.dig.isMoving = false;
  GameState.dig.walkAnimTime = 0;
  GameState.dig.pipeEntryTimer = 0;
  resetDigHoldProgress();
  GameState.currentQuest = isFinalDigScene() ?
    "quest_final_tunnel" :
    (GameState.hasSoilPile ? "quest_dig_return" : "quest_dig_first");
}

function updateDigScene(dt) {
  if (DialogueSystem.active) {
    GameState.dig.isMoving = false;
    GameState.dig.walkAnimTime = 0;
    GameState.dig.isDigging = false;
    GameState.dig.digAnimTime = 0;
    return;
  }

  if (isFinalDigScene()) {
    updateDigPlayer(dt);
    updateFinalTunnelEntry(dt);
    return;
  }

  const activeInteraction = getActiveDigInteraction();
  if (!GameState.hasSoilPile) {
    GameState.currentQuest = activeInteraction && activeInteraction.id === "dig" ?
      "quest_dig_dig_here" :
      "quest_dig_first";
  }

  if (updateDigHold(dt)) {
    return;
  }
  updateDigPlayer(dt);
}

function isFinalDigMode() {
  return GameState.twentyYearsPassed && GameState.finalDigUnlocked;
}

function isFinalDigScene() {
  return GameState.dig.mode === "finalTunnel";
}

function getCurrentDigLayout() {
  return isFinalDigScene() ? FinalDigLayout : DigLayout;
}

function getCurrentDigAssetKey() {
  return isFinalDigScene() ? "dig_tunnel_20y" : "dig_tunnel";
}

function getCurrentPipeAssetKey() {
  if (GameState.pipe.smashSuccessCount >= PIPE_SMASH_REQUIRED_COUNT) {
    return "pipe_tunnel_03";
  }
  if (GameState.pipe.smashSuccessCount >= PIPE_SMASH_STAGE_TWO_COUNT) {
    return "pipe_tunnel_02";
  }
  return "pipe_tunnel_01";
}

function getTunnelPlayerY(layout, playerH) {
  const footY = layout.walkRect.y + layout.walkRect.h - TUNNEL_PLAYER_FOOT_MARGIN - Math.round(playerH / 2);
  return footY - playerH;
}

function updateFinalTunnelEntry(dt) {
  const probe = getDigPlayerProbe();
  if (!pointInRect(probe, FinalDigLayout.pipeEntryZone)) {
    GameState.dig.pipeEntryTimer = 0;
    return;
  }

  GameState.dig.pipeEntryTimer += dt;
  if (GameState.dig.pipeEntryTimer >= FINAL_TUNNEL_ENTRY_SECONDS) {
    changeScene("pipe");
  }
}

function updateDigHold(dt) {
  const activeInteraction = getActiveDigInteraction();
  const holdingDig = activeInteraction &&
    activeInteraction.id === "dig" &&
    InputSystem.actionDown("interact");

  if (!holdingDig) {
    resetDigHoldProgress();
    return false;
  }

  const dig = GameState.dig;
  dig.isDigging = true;
  dig.isMoving = false;
  dig.walkAnimTime = 0;
  dig.digAnimTime += dt;
  dig.facing = "right";
  dig.digProgress = Math.min(DIG_REQUIRED_SECONDS, dig.digProgress + dt);
  GameState.currentQuest = "quest_dig_first";

  if (dig.digProgress >= DIG_REQUIRED_SECONDS) {
    completeDigHold();
  }

  return true;
}

function resetDigHoldProgress() {
  GameState.dig.isDigging = false;
  GameState.dig.digAnimTime = 0;
  if (!GameState.hasSoilPile) {
    GameState.dig.digProgress = 0;
  }
}

function updateDigPlayer(dt) {
  const dig = GameState.dig;
  const moveX = InputSystem.getMoveVector().x;
  const threshold = 0.05;
  const layout = getCurrentDigLayout();
  const minX = layout.walkRect.x;
  const maxX = layout.walkRect.x + layout.walkRect.w - dig.playerW;

  if (Math.abs(moveX) <= threshold) {
    dig.isMoving = false;
    dig.walkAnimTime = 0;
    return;
  }

  const movementSpeed = dig.mode === "firstDig" ? FIRST_DIG_PLAYER_SPEED : DIG_PLAYER_SPEED;
  dig.playerX = clamp(dig.playerX + moveX * movementSpeed * dt, minX, maxX);
  dig.facing = moveX < 0 ? "left" : "right";
  dig.isMoving = true;
  dig.walkAnimTime += dt;
}

function getActiveDigInteraction() {
  if (GameState.scene !== "dig") {
    return null;
  }

  if (isFinalDigScene()) {
    return null;
  }

  const probe = getDigPlayerProbe();

  if (pointInRect(probe, DigLayout.leftExitZone)) {
    return { id: "leave" };
  }

  if (!GameState.hasSoilPile && pointInRect(probe, DigLayout.digZone)) {
    return { id: "dig" };
  }

  return null;
}

function getDigPlayerProbe() {
  const layout = getCurrentDigLayout();
  return {
    x: GameState.dig.playerX + GameState.dig.playerW / 2,
    y: layout.walkRect.y + layout.walkRect.h / 2
  };
}

function completeDigHold() {
  if (GameState.hasSoilPile) {
    return;
  }

  GameState.hasSoilPile = true;
  GameState.hasAttributeD = false;
  GameState.dig.isDigging = false;
  GameState.dig.digAnimTime = 0;
  GameState.dig.digProgress = DIG_REQUIRED_SECONDS;
  GameState.soilDump.completedCount = 0;
  resetSoilDumpHold();
  GameState.currentQuest = "quest_dig_return";
  saveCheckpoint("CP_FIRST_DIG");
  startPropInteraction([
    "你身上的土太多了，出去扔一些。"
  ]);
}

function leaveDigScene() {
  startWallHoleExitHold();
  changeScene("cell");
}

function initializePipeScene() {
  const basePlayerH = PipeLayout.walkRect.h - 4;
  const playerH = Math.max(1, Math.round(basePlayerH / 2));
  const playerW = Math.max(1, Math.round(playerH * 52 / 108));
  GameState.pipe.playerW = playerW;
  GameState.pipe.playerH = playerH;
  GameState.pipe.playerX = PipeLayout.entryZone.x + PipeLayout.entryZone.w / 2 - playerW / 2;
  GameState.pipe.playerY = getTunnelPlayerY(PipeLayout, playerH);
  GameState.pipe.facing = "right";
  GameState.pipe.isMoving = false;
  GameState.pipe.walkAnimTime = 0;
  GameState.pipe.isSmashing = false;
  GameState.pipe.smashAnimTime = 0;
  resetPipeSmashState();
  GameState.currentQuest = "quest_pipe_tunnel";
}

function updatePipeScene(dt) {
  const pipe = GameState.pipe;
  if (DialogueSystem.active) {
    pipe.isMoving = false;
    pipe.walkAnimTime = 0;
    pipe.isSmashing = false;
    pipe.smashHoldTime = 0;
    pipe.smashHoldActive = false;
    return;
  }

  if (pipe.phase === "drown") {
    updatePipeDrownFall(dt);
    return;
  }
  if (isPipeVictorySequenceActive()) {
    updatePipeVictorySequence(dt);
    return;
  }
  if (pipe.phase === "drop") {
    updatePipeDropToCrawl(dt);
    return;
  }
  if (pipe.phase === "crawl" || pipe.phase === "victory") {
    updatePipeCrawl(dt);
    return;
  }
  if (pipe.smashCompleted) {
    pipe.smashHintTimer = 0;
    pipe.wasInSmashZone = false;
    updatePipePostSmash(dt);
    return;
  }

  updatePipeSmashHint(dt);
  updatePipeCue(dt);
  if (updatePipeSmash(dt)) {
    return;
  }
  updatePipePlayer(dt);
}

function resetPipeSmashState() {
  GameState.pipe.smashHoldTime = 0;
  GameState.pipe.smashHoldActive = false;
  GameState.pipe.smashSuccessCount = 0;
  GameState.pipe.smashCompleted = false;
  GameState.pipe.smashWindowScored = false;
  GameState.pipe.cueVisible = false;
  GameState.pipe.cueLit = false;
  GameState.pipe.cueTimer = 0;
  GameState.pipe.cueProgress = 0;
  GameState.pipe.nextCueDelay = getRandomPipeCueDelay();
  GameState.pipe.smashHintTimer = 0;
  GameState.pipe.wasInSmashZone = false;
  GameState.pipe.phase = "smash";
  GameState.pipe.crawlAnimTime = 0;
  GameState.pipe.drownTimer = 0;
  GameState.pipe.victory = false;
  GameState.pipe.victoryPhase = "none";
  GameState.pipe.victoryTimer = 0;
  GameState.pipe.victoryImageTimer = 0;
  GameState.pipe.victoryQuoteAudioPlayed = false;
  GameState.pipe.endingOpened = false;
}

function getRandomPipeCueDelay() {
  return PIPE_CUE_MIN_INTERVAL_SECONDS +
    Math.random() * (PIPE_CUE_MAX_INTERVAL_SECONDS - PIPE_CUE_MIN_INTERVAL_SECONDS);
}

function updatePipeSmashHint(dt) {
  const pipe = GameState.pipe;
  const activeInteraction = getActivePipeInteraction();
  const inSmashZone = Boolean(activeInteraction &&
    activeInteraction.id === "smashPipe" &&
    !pipe.smashCompleted);

  if (inSmashZone && !pipe.wasInSmashZone) {
    pipe.smashHintTimer = PIPE_SMASH_HINT_SECONDS;
  }

  pipe.wasInSmashZone = inSmashZone;
  pipe.smashHintTimer = Math.max(0, pipe.smashHintTimer - dt);
}

// @feature PipeSmashWindowSystem
// @test The cue only lights while the player is in the smash zone; one successful smash requires holding interact for 0.7 seconds during a lit cue.
// @acceptance 3 successes switch to pipe_tunnel_02; 5 successes switch to pipe_tunnel_03 and stop additional smashing.
function updatePipeCue(dt) {
  const pipe = GameState.pipe;
  const activeInteraction = getActivePipeInteraction();
  const cueAllowed = activeInteraction &&
    activeInteraction.id === "smashPipe" &&
    !pipe.smashCompleted;

  if (!cueAllowed) {
    pipe.cueVisible = false;
    pipe.cueLit = false;
    pipe.cueTimer = 0;
    pipe.cueProgress = 0;
    pipe.nextCueDelay = getRandomPipeCueDelay();
    pipe.smashHoldTime = 0;
    pipe.smashHoldActive = false;
    pipe.smashWindowScored = false;
    return;
  }

  pipe.cueVisible = true;
  pipe.cueTimer += dt;

  if (pipe.cueLit) {
    if (pipe.cueTimer >= PIPE_CUE_ACTIVE_SECONDS) {
      pipe.cueProgress = 1;
      pipe.cueLit = false;
      pipe.cueTimer = 0;
      pipe.nextCueDelay = getRandomPipeCueDelay();
      pipe.smashHoldTime = 0;
      pipe.smashHoldActive = false;
      pipe.smashWindowScored = false;
    }
    return;
  }

  pipe.cueProgress = 0;
  if (pipe.cueTimer >= pipe.nextCueDelay) {
    pipe.cueLit = true;
    pipe.cueTimer = 0;
    pipe.smashHoldTime = 0;
    pipe.smashHoldActive = false;
    pipe.smashWindowScored = false;
    AudioSystem.playOneShot("thunder", THUNDER_VOLUME);
  }
}

function updatePipeSmash(dt) {
  const activeInteraction = getActivePipeInteraction();
  const pipe = GameState.pipe;
  const inSmashZone = activeInteraction &&
    activeInteraction.id === "smashPipe" &&
    !pipe.smashCompleted;

  if (inSmashZone && !pipe.cueLit && InputSystem.actionPressed("interact")) {
    failPipeNoiseByGuard();
    return true;
  }

  const canSmash = activeInteraction &&
    activeInteraction.id === "smashPipe" &&
    pipe.cueLit &&
    !pipe.smashCompleted &&
    !pipe.smashWindowScored;

  if (canSmash && !pipe.smashHoldActive && InputSystem.actionPressed("interact")) {
    pipe.smashHoldActive = true;
    pipe.smashHoldTime = 0;
  }

  const smashing = canSmash &&
    pipe.smashHoldActive &&
    InputSystem.actionDown("interact");

  if (!smashing) {
    pipe.isSmashing = false;
    pipe.smashAnimTime = 0;
    if (!InputSystem.actionDown("interact")) {
      pipe.smashHoldActive = false;
      pipe.smashHoldTime = 0;
    }
    return false;
  }

  pipe.isSmashing = true;
  pipe.isMoving = false;
  pipe.walkAnimTime = 0;
  pipe.smashAnimTime += dt;
  pipe.smashHoldTime = Math.min(PIPE_SMASH_HOLD_SECONDS, pipe.smashHoldTime + dt);
  pipe.facing = "right";

  if (pipe.smashHoldTime >= PIPE_SMASH_HOLD_SECONDS) {
    completePipeSmashHold();
  }

  return true;
}

function completePipeSmashHold() {
  const pipe = GameState.pipe;
  pipe.smashSuccessCount = Math.min(PIPE_SMASH_REQUIRED_COUNT, pipe.smashSuccessCount + 1);
  pipe.smashHoldTime = 0;
  pipe.smashHoldActive = false;
  pipe.smashWindowScored = true;
  pipe.isSmashing = false;
  pipe.smashAnimTime = 0;

  if (pipe.smashSuccessCount >= PIPE_SMASH_REQUIRED_COUNT) {
    pipe.smashCompleted = true;
    pipe.cueVisible = false;
    pipe.cueLit = false;
    pipe.cueTimer = 0;
    pipe.cueProgress = 0;
    GameState.currentQuest = "quest_pipe_opened";
  }
}

function updatePipePostSmash(dt) {
  updatePipePlayer(dt);
  if (isPipePlayerOverDropZone()) {
    startPipeDropToCrawl();
  }
}

function isPipePlayerOverDropZone() {
  const pipe = GameState.pipe;
  const centerX = pipe.playerX + pipe.playerW / 2;
  return centerX >= PipeLayout.dropZone.x &&
    centerX <= PipeLayout.dropZone.x + PipeLayout.dropZone.w;
}

function startPipeDropToCrawl() {
  const pipe = GameState.pipe;
  pipe.phase = "drop";
  pipe.isMoving = false;
  pipe.walkAnimTime = 0;
  pipe.isSmashing = false;
  pipe.smashAnimTime = 0;
  pipe.facing = "right";
}

function updatePipeDropToCrawl(dt) {
  const pipe = GameState.pipe;
  pipe.playerY += PIPE_DROP_SPEED * dt;
  if (pipe.playerY + pipe.playerH >= PipeLayout.crawlBaselineY) {
    completePipeDropToCrawl();
  }
}

function completePipeDropToCrawl() {
  const pipe = GameState.pipe;
  const centerX = pipe.playerX + pipe.playerW / 2;
  const crawlPlayerH = Math.max(1, Math.round(pipe.playerH * PIPE_CRAWL_PLAYER_SCALE));
  pipe.phase = "crawl";
  pipe.playerH = crawlPlayerH;
  pipe.playerW = getPipeCrawlPlayerW(crawlPlayerH);
  pipe.playerY = PipeLayout.crawlBaselineY - crawlPlayerH;
  pipe.playerX = clamp(centerX - pipe.playerW / 2, PipeLayout.crawlStartX, PipeLayout.imageWidth - pipe.playerW);
  pipe.isMoving = false;
  pipe.walkAnimTime = 0;
  pipe.crawlAnimTime = 0;
  pipe.facing = "right";
}

function updatePipeCrawl(dt) {
  const pipe = GameState.pipe;
  if (pipe.phase === "victory") {
    pipe.isMoving = false;
    return;
  }

  const moveX = InputSystem.getMoveVector().x;
  const threshold = 0.05;
  if (Math.abs(moveX) <= threshold) {
    pipe.isMoving = false;
    return;
  }

  pipe.playerX = clamp(pipe.playerX + moveX * PIPE_CRAWL_SPEED * dt, PipeLayout.drownLine.x, PipeLayout.imageWidth - pipe.playerW);
  pipe.facing = moveX < 0 ? "left" : "right";
  pipe.isMoving = true;
  pipe.crawlAnimTime += dt;

  if (isPipeCrawlHeadAtLeftEnd()) {
    startPipeDrownFall();
    return;
  }

  if (pipe.playerX + pipe.playerW >= PipeLayout.imageWidth - 2) {
    startPipeVictorySequence();
  }
}

function isPipeCrawlHeadAtLeftEnd() {
  const pipe = GameState.pipe;
  return pipe.facing === "left" && pipe.playerX <= PipeLayout.drownLine.x;
}

function startPipeVictorySequence() {
  const pipe = GameState.pipe;
  pipe.phase = "victory";
  pipe.victory = true;
  pipe.victoryPhase = "blackHold";
  pipe.victoryTimer = 0;
  pipe.victoryImageTimer = 0;
  pipe.victoryQuoteAudioPlayed = false;
  pipe.endingOpened = false;
  pipe.isMoving = false;
}

function isPipeVictorySequenceActive() {
  return GameState.pipe.victoryPhase !== "none";
}

function updatePipeVictorySequence(dt) {
  const pipe = GameState.pipe;
  pipe.isMoving = false;
  pipe.victoryTimer += dt;
  pipe.victoryImageTimer += dt;

  if (pipe.victoryPhase === "blackHold" && pipe.victoryTimer >= PIPE_VICTORY_BLACK_HOLD_SECONDS) {
    pipe.victoryPhase = "imageTitle";
    pipe.victoryTimer = 0;
    return;
  }

  if (
    pipe.victoryPhase === "quote" &&
    !pipe.victoryQuoteAudioPlayed &&
    pipe.victoryTimer >= PIPE_VICTORY_QUOTE_AUDIO_DELAY_SECONDS
  ) {
    pipe.victoryQuoteAudioPlayed = true;
    AudioSystem.playOneShot("victory_birds_quote");
  }

  if (pipe.victoryPhase === "fadeOut" && pipe.victoryTimer >= PIPE_VICTORY_FADE_OUT_SECONDS) {
    pipe.victoryPhase = "finalText";
    pipe.victoryTimer = 0;
  }
}

function handlePipeVictoryInput() {
  const pipe = GameState.pipe;
  const wantsContinue = InputSystem.actionPressed("continueDialogue") || InputSystem.actionPressed("interact");
  if (!wantsContinue) {
    return;
  }

  if (
    pipe.victoryPhase === "imageTitle" &&
    pipe.victoryTimer >= PIPE_VICTORY_IMAGE_FADE_SECONDS
  ) {
    pipe.victoryPhase = "quote";
    pipe.victoryTimer = 0;
    pipe.victoryQuoteAudioPlayed = false;
    return;
  }

  if (pipe.victoryPhase === "quote" && pipe.victoryTimer >= PIPE_VICTORY_QUOTE_MIN_SECONDS) {
    pipe.victoryPhase = "fadeOut";
    pipe.victoryTimer = 0;
    return;
  }

  if (pipe.victoryPhase === "finalText" && !pipe.endingOpened) {
    pipe.endingOpened = true;
    openEndingSelectFile();
  }
}

function openEndingSelectFile() {
  saveCheckpoint("CP_ENDING_SELECT");
  saveGameBgmResumeTime();
  const endingPath = resolveEndingPath();
  if (GlobalControls) {
    GlobalControls.releaseAll();
  }
  const endingFrame = document.getElementById("endingFrame");
  if (!endingFrame) {
    handleFatalError(new Error("Ending frame is unavailable."));
    return;
  }
  endingFrame.setAttribute("src", endingPath);
  endingFrame.hidden = false;
  endingFrame.focus();
}

function startPipeDrownFall() {
  const pipe = GameState.pipe;
  const centerX = pipe.playerX + pipe.playerW / 2;
  const drownPlayerH = getPipeDrownPlayerH(pipe.playerH);
  pipe.phase = "drown";
  pipe.playerH = drownPlayerH;
  pipe.playerW = getPipeDrownPlayerW(drownPlayerH);
  pipe.playerX = centerX - pipe.playerW / 2;
  pipe.playerY = PipeLayout.crawlBaselineY - pipe.playerH;
  pipe.drownTimer = 0;
  pipe.isMoving = false;
  pipe.crawlAnimTime = 0;
  pipe.facing = "down";
}

function updatePipeDrownFall(dt) {
  const pipe = GameState.pipe;
  pipe.drownTimer += dt;
  pipe.playerY += PIPE_DROWN_FALL_SPEED * dt;
  if (pipe.drownTimer >= PIPE_DROWN_FALL_SECONDS) {
    failPipeDrowned();
  }
}

function failPipeNoiseByGuard() {
  GameState.failReason = "看守听到了声音，你要被抓了，脱困失败。";
  GameState.failRecovery = "pipeBeforeTunnel";
  resetPipeSmashState();
  changeScene("fail");
}

function failPipeDrowned() {
  AchievementSystem.unlock("look_back");
  GameState.failReason = "很抱歉，你被淹死了。";
  GameState.failRecovery = "pipeBeforeTunnel";
  resetPipeSmashState();
  changeScene("fail");
}

function restorePipeFailureToFinalDigCheckpoint() {
  DialogueSystem.active = false;
  DialogueSystem.lines = [];
  DialogueSystem.index = 0;
  DialogueSystem.justStarted = false;
  DialogueSystem.displayMode = "auto";
  resetPipeSmashState();
  resetWallHoleReveal();
  GameState.dig.mode = "finalTunnel";
  GameState.dig.pipeEntryTimer = 0;
  GameState.player.lyingInBed = false;
  GameState.failReason = "";
  GameState.failRecovery = null;
  saveCheckpoint("CP_FINAL_DIG");
  changeScene("cell");
  setPlayerFootToCellImage(CellLayout.pictureStandPoint.x, CellLayout.pictureStandPoint.y);
  GameState.player.facing = "up";
  GameState.currentQuest = "quest_cell_final_dig_ready";
}

function updatePipePlayer(dt) {
  const pipe = GameState.pipe;
  const moveX = InputSystem.getMoveVector().x;
  const threshold = 0.05;
  const minX = PipeLayout.walkRect.x;
  const maxX = PipeLayout.walkRect.x + PipeLayout.walkRect.w - pipe.playerW;

  if (Math.abs(moveX) <= threshold) {
    pipe.isMoving = false;
    pipe.walkAnimTime = 0;
    return;
  }

  pipe.playerX = clamp(pipe.playerX + moveX * DIG_PLAYER_SPEED * dt, minX, maxX);
  pipe.facing = moveX < 0 ? "left" : "right";
  pipe.isMoving = true;
  pipe.walkAnimTime += dt;
}

function getActivePipeInteraction() {
  if (GameState.scene !== "pipe") {
    return null;
  }

  const probe = {
    x: GameState.pipe.playerX + GameState.pipe.playerW / 2,
    y: PipeLayout.walkRect.y + PipeLayout.walkRect.h / 2
  };

  if (!GameState.pipe.smashCompleted && pointInRect(probe, PipeLayout.smashZone)) {
    return { id: "smashPipe" };
  }

  return null;
}

function hasOfficeAttributeA() {
  return GameState.hasMap && !GameState.alternateEscapeRoute;
}

function resetOfficeSceneState() {
  GameState.office.mode = "story";
  GameState.office.wardenPhase = "waiting";
  GameState.office.wardenX = OfficeLayout.wardenStart.x;
  GameState.office.wardenY = OfficeLayout.wardenStart.y;
  GameState.office.wardenFacing = "left";
  GameState.office.wardenMoving = false;
  GameState.office.wardenWalkAnimTime = 0;
  GameState.office.embroideryChecked = false;
  GameState.office.safeViewOpen = false;
  GameState.office.safeStage = "closed";
  GameState.office.curtainsClosed = false;
  GameState.office.inspectionScheduled = false;
  GameState.office.inspectionTimer = 0;
  GameState.office.inspectionHideTimer = 0;
  GameState.office.inspectionVisitTimer = 0;
  GameState.office.inspectionVisitorKind = null;
  Object.assign(GameState.office.inspectionActor, {
    x: OfficeLayout.wardenExit.x,
    y: OfficeLayout.wardenExit.y,
    facing: "up",
    visualFacing: "up",
    isMoving: false,
    walkAnimTime: 0,
    patrolIndex: 0
  });
}

function isFreeOfficeMode() {
  return GameState.office.mode !== "story" && GameState.office.mode !== "sideRoute";
}

function enterFreeOfficeScene() {
  resetOfficeSceneState();
  GameState.player.lyingInBed = false;
  GameState.player.facing = "up";
  setPlayerFootToOfficeImage(OfficeLayout.spawnFoot.x, OfficeLayout.spawnFoot.y);

  if (!GameState.officeFirstWarningSeen) {
    GameState.officeFirstWarningSeen = true;
    GameState.office.mode = "firstWarning";
    GameState.currentQuest = "quest_office_first_warning";
    saveCheckpoint(GameState.currentCheckpoint);
    DialogueSystem.start([
      "幕后主使：谁允许你进来的？这里不是你该来的地方。",
      "幕后主使：马上出去。再让我看到你擅闯，就让看守把你关起来。"
    ]);
    return;
  }

  GameState.office.mode = "freeExplore";
  GameState.office.wardenPhase = "gone";
  GameState.office.inspectionScheduled = Math.random() < OFFICE_INSPECTION_CHANCE;
  GameState.office.inspectionTimer = GameState.office.inspectionScheduled ?
    randomRange(OFFICE_INSPECTION_DELAY_MIN_SECONDS, OFFICE_INSPECTION_DELAY_MAX_SECONDS) : 0;
  GameState.currentQuest = "quest_office_free_explore";
}

function updateFreeOfficeScene(dt) {
  const office = GameState.office;
  if (office.mode === "firstWarning") {
    if (DialogueSystem.active) {
      stopPlayerForNpcDialogue();
    } else {
      leaveOfficeScene();
    }
    return;
  }

  if (DialogueSystem.active) {
    stopPlayerForNpcDialogue();
    return;
  }

  if (office.mode === "freeExplore") {
    updatePlayer(dt);
    if (office.inspectionScheduled) {
      office.inspectionTimer = Math.max(0, office.inspectionTimer - dt);
      if (office.inspectionTimer <= 0) {
        startFreeOfficeInspectionCountdown();
      }
    }
    return;
  }

  if (office.mode === "inspectionCountdown") {
    office.inspectionHideTimer = Math.max(0, office.inspectionHideTimer - dt);
    if (office.inspectionHideTimer <= 0) {
      failFreeOfficeInspection();
      return;
    }
    updatePlayer(dt);
    return;
  }

  if (office.mode === "inspectionEntering" || office.mode === "inspectionVisit" ||
    office.mode === "inspectionLeaving") {
    stopPlayerForNpcDialogue();
    updateFreeOfficeInspectionVisitor(dt);
    return;
  }

  updatePlayer(dt);
}

function handleFreeOfficeInput() {
  handlePauseInput();
  if (GameState.scene !== "office" || DialogueSystem.active) {
    return;
  }
  const office = GameState.office;
  if (office.mode === "inspectionEntering" || office.mode === "inspectionVisit" ||
    office.mode === "inspectionLeaving" || office.mode === "firstWarning") {
    return;
  }
  const interaction = getActiveOfficeInteraction();
  if (!InputSystem.actionPressed("interact") || !interaction) {
    return;
  }
  if (interaction.id === "freeOfficeCurtain") {
    hideInFreeOfficeCurtain();
  } else if (interaction.id === "door") {
    leaveOfficeScene();
  }
}

function startFreeOfficeInspectionCountdown() {
  const office = GameState.office;
  office.mode = "inspectionCountdown";
  office.inspectionScheduled = false;
  office.inspectionHideTimer = OFFICE_INSPECTION_HIDE_SECONDS;
  GameState.currentQuest = "quest_office_inspection_hide";
  AudioSystem.playOneShot("footsteps_concrete");
}

function hideInFreeOfficeCurtain() {
  const office = GameState.office;
  if (office.mode !== "inspectionCountdown") {
    return;
  }
  setPlayerFootToOfficeImage(
    SideRouteOfficeLayout.curtainHideFoot.x,
    SideRouteOfficeLayout.curtainHideFoot.y
  );
  GameState.player.facing = "up";
  office.curtainsClosed = true;
  office.inspectionVisitorKind = Math.random() < 0.5 ? "guard" : "warden";
  Object.assign(office.inspectionActor, {
    x: OfficeLayout.wardenExit.x,
    y: OfficeLayout.wardenExit.y,
    facing: "up",
    visualFacing: "up",
    isMoving: true,
    walkAnimTime: 0,
    patrolIndex: 0
  });
  office.mode = "inspectionEntering";
  GameState.currentQuest = "quest_office_inspection_wait";
}

function updateFreeOfficeInspectionVisitor(dt) {
  const office = GameState.office;
  const actor = office.inspectionActor;
  const patrolPoints = SideRouteOfficeLayout.wardenPacePoints;

  if (office.mode === "inspectionEntering") {
    const entryTarget = office.inspectionVisitorKind === "guard" ?
      SideRouteOfficeLayout.actorsEntry.guard : patrolPoints[0];
    if (moveSideRouteOfficeActor(actor, entryTarget, OFFICE_INSPECTION_ACTOR_SPEED, dt)) {
      office.mode = "inspectionVisit";
      office.inspectionVisitTimer = OFFICE_INSPECTION_VISIT_SECONDS;
      actor.patrolIndex = office.inspectionVisitorKind === "guard" ? 0 : 1;
    }
    return;
  }

  if (office.mode === "inspectionVisit") {
    office.inspectionVisitTimer = Math.max(0, office.inspectionVisitTimer - dt);
    const target = patrolPoints[actor.patrolIndex % patrolPoints.length];
    if (moveSideRouteOfficeActor(actor, target, 86, dt)) {
      actor.patrolIndex = (actor.patrolIndex + 1) % patrolPoints.length;
    }
    if (office.inspectionVisitTimer <= 0) {
      office.mode = "inspectionLeaving";
    }
    return;
  }

  if (office.mode === "inspectionLeaving" &&
    moveSideRouteOfficeActor(actor, OfficeLayout.wardenExit, OFFICE_INSPECTION_ACTOR_SPEED, dt)) {
    office.mode = "inspectionComplete";
    office.inspectionVisitorKind = null;
    GameState.currentQuest = "quest_office_free_explore";
  }
}

function failFreeOfficeInspection() {
  GameState.failReason = "门外的脚步声停在门口。你还没藏好，被看守抓住了。";
  GameState.failRecovery = "officeInspection";
  changeScene("fail");
}

function restoreFreeOfficeInspectionFailure() {
  GameState.failReason = "";
  GameState.failRecovery = null;
  GameState.failRecoveryTimer = 0;
  changeScene("yard");
  setPlayerFootToYardImage(YardLayout.officeReturnPoint.x, YardLayout.officeReturnPoint.y);
  GameState.player.facing = "left";
  GameState.currentQuest = GameState.twentyYearsPassed ? getPostMontageYardQuest() : getEarlyYardQuest();
  updateYardCamera();
}

function startOfficeWardenDialogue() {
  GameState.office.wardenPhase = "dialogue";
  GameState.office.wardenFacing = "left";
  GameState.office.wardenMoving = false;
  GameState.currentQuest = "quest_office_warden";
  DialogueSystem.start([
    "幕后主使：安迪，找我有事？这些年你为黑墙庄园打理账务，做得还行啊。",
    "安迪：我只是来确认账目和文件，先生。",
    "幕后主使：你给我好好干，我回去睡觉了。"
  ]);
}

function updateOfficeWarden(dt) {
  const office = GameState.office;
  if (office.wardenPhase === "dialogue" && !DialogueSystem.active) {
    office.wardenPhase = "leaving";
    GameState.currentQuest = "quest_office_warden_leaving";
  }

  if (office.wardenPhase !== "leaving") {
    office.wardenMoving = false;
    return;
  }

  const dx = OfficeLayout.wardenExit.x - office.wardenX;
  const dy = OfficeLayout.wardenExit.y - office.wardenY;
  const remaining = Math.hypot(dx, dy);
  if (remaining <= 8) {
    office.wardenPhase = "gone";
    office.wardenX = OfficeLayout.wardenExit.x;
    office.wardenY = OfficeLayout.wardenExit.y;
    office.wardenMoving = false;
    office.wardenWalkAnimTime = 0;
    GameState.currentQuest = "quest_office_embroidery";
    saveCheckpoint("CP_OFFICE_DIALOGUE_DONE");
    DialogueSystem.start(OfficeWardenGoneThoughtLines);
    return;
  }

  const speed = 190;
  const step = Math.min(remaining, speed * dt);
  office.wardenX += dx / remaining * step;
  office.wardenY += dy / remaining * step;
  office.wardenFacing = directionFromDelta(dx, dy);
  office.wardenMoving = step > 0.01;
  if (office.wardenMoving) {
    office.wardenWalkAnimTime += dt;
  }
}

function inspectOfficeEmbroidery() {
  GameState.office.embroideryChecked = true;
  GameState.office.safeViewOpen = true;
  GameState.office.safeStage = "ledgerFound";
  GameState.ledgerFound = true;
  GameState.currentQuest = "quest_office_swap_ledger";
  startPropInteraction([
    "你打开墙上的刺绣，发现一个保险柜。",
    "所有人敬畏的幕后主使，满口仁义道德，背后却藏着沾满罪恶的账本。"
  ]);
}

function handleOfficeSafeInput() {
  if (GameState.office.safeStage !== "ledgerFound") {
    return;
  }

  const clickedLedger = InputSystem.pointerJustPressed &&
    InputSystem.pointerInRect(OfficeLayout.safeLedgerClickRect);
  if (InputSystem.actionPressed("interact") || clickedLedger) {
    swapOfficeLedger();
  }
}

function updateOfficeSafeView() {
  if (GameState.office.safeStage === "swapped" && !DialogueSystem.active) {
    GameState.office.safeViewOpen = false;
    GameState.office.safeStage = "closed";
    GameState.currentQuest = "quest_office_leave";
  }
}

// @feature OfficeSafeLedgerSwap
// @test 点击保险柜里的账本后，账本被调包并解锁离开办公室目标。
// @acceptance 调包后回到玩家操作界面，玩家必须走到门前交互离开。
function swapOfficeLedger() {
  GameState.office.safeStage = "swapped";
  GameState.hasLedger = true;
  GameState.hasBible = false;
  GameState.hammerHiddenInBible = false;
  GameState.bibleUsed = true;
  GameState.ledgerSwapped = true;
  GameState.finalDigUnlocked = true;
  GameState.currentQuest = "quest_office_leave";
  saveCheckpoint("CP_FINAL_DIG");
  startPropInteraction([
    "安迪（心理）：账本到手了。现在必须尽快离开办公室，回到房间完成最后的准备。"
  ]);
}

function leaveOfficeScene() {
  if (GameState.twentyYearsPassed && GameState.finalDigUnlocked) {
    GameState.hasAttributeC = true;
    GameState.currentQuest = "quest_cell_final_dig_ready";
  }
  changeScene("yard");
}


function initializeRedNpcState() {
  const npc = getRedNpcConfig();
  if (!npc) {
    return;
  }

  const red = GameState.redNpc;
  if (red.initialized) {
    return;
  }

  red.initialized = true;
  red.mode = "patrol";
  red.x = npc.x;
  red.y = npc.y;
  red.facing = npc.baseFacing || "down";
  red.isMoving = false;
  red.walkAnimTime = 0;
  red.targetX = npc.x;
  red.targetY = npc.y;
  red.pauseTimer = randomRange(0.8, 2.2);
  red.ambientRestTarget = false;
  red.pendingDialogue = null;
}

function getRedNpcConfig() {
  return YardLayout.npcs.find((npc) => npc.id === "red") || null;
}

function updateRedNpc(dt) {
  initializeRedNpcState();

  const red = GameState.redNpc;
  if (isAmbientConversationParticipant("red")) {
    red.isMoving = false;
    red.walkAnimTime = 0;
    return;
  }
  if (red.mode === "dialogueApproach") {
    updateRedDialogueApproach(dt);
    return;
  }
  if (red.mode === "returnPatrol") {
    updateRedReturnToPatrol(dt);
    return;
  }

  if (red.mode !== "patrol" || DialogueSystem.active) {
    red.isMoving = false;
    red.walkAnimTime = 0;
    return;
  }

  updateRedRandomPatrol(dt);
}

function updateRedReturnToPatrol(dt) {
  const red = GameState.redNpc;
  const dx = red.targetX - red.x;
  const dy = red.targetY - red.y;
  const remaining = Math.hypot(dx, dy);

  if (remaining <= 4) {
    red.x = red.targetX;
    red.y = red.targetY;
    red.mode = "patrol";
    red.isMoving = false;
    red.walkAnimTime = 0;
    red.pauseTimer = randomRange(0.25, 0.8);
    return;
  }

  const step = Math.min(remaining, RED_PATROL_SPEED * dt);
  const nextX = red.x + dx / remaining * step;
  const nextY = red.y + dy / remaining * step;
  if (!isYardNpcPointWalkable(nextX, nextY)) {
    red.mode = "patrol";
    red.pauseTimer = randomRange(1.4, 4.2);
    chooseNextRedPatrolTarget();
    return;
  }
  red.x = nextX;
  red.y = nextY;
  red.facing = directionFromDelta(dx, dy);
  red.isMoving = true;
  red.walkAnimTime += dt;
}

function updateRedRandomPatrol(dt) {
  const npc = getRedNpcConfig();
  const red = GameState.redNpc;
  if (!npc) {
    return;
  }

  if (red.pauseTimer > 0) {
    red.pauseTimer = Math.max(0, red.pauseTimer - dt);
    red.isMoving = false;
    red.walkAnimTime = 0;
    if (red.pauseTimer <= 0) {
      chooseNextRedPatrolTarget();
    }
    return;
  }

  const dx = red.targetX - red.x;
  const dy = red.targetY - red.y;
  const remaining = Math.hypot(dx, dy);
  if (remaining <= 6) {
    red.x = red.targetX;
    red.y = red.targetY;
    red.isMoving = false;
    red.walkAnimTime = 0;
    red.pauseTimer = red.ambientRestTarget ?
      randomRange(AMBIENT_SOCIAL_REST_MIN_SECONDS, AMBIENT_SOCIAL_REST_MAX_SECONDS) :
      randomRange(1.4, 4.2);
    red.ambientRestTarget = false;
    return;
  }

  const step = Math.min(remaining, npc.patrolSpeed * dt);
  const nextX = red.x + dx / remaining * step;
  const nextY = red.y + dy / remaining * step;
  if (!isYardNpcPointWalkable(nextX, nextY)) {
    chooseNextRedPatrolTarget();
    return;
  }

  red.x = nextX;
  red.y = nextY;
  red.facing = directionFromDelta(dx, dy);
  red.isMoving = step > 0.01;
  if (red.isMoving) {
    red.walkAnimTime += dt;
  }

  if (remaining <= step + 0.01) {
    red.x = red.targetX;
    red.y = red.targetY;
    red.isMoving = false;
    red.walkAnimTime = 0;
    red.pauseTimer = red.ambientRestTarget ?
      randomRange(AMBIENT_SOCIAL_REST_MIN_SECONDS, AMBIENT_SOCIAL_REST_MAX_SECONDS) :
      randomRange(1.4, 4.2);
    red.ambientRestTarget = false;
  }
}

function chooseNextRedPatrolTarget() {
  const red = GameState.redNpc;
  const socialTarget = getAmbientSocialTarget("red");
  if (socialTarget) {
    red.targetX = socialTarget.x;
    red.targetY = socialTarget.y;
    red.ambientRestTarget = true;
    return;
  }
  red.ambientRestTarget = false;
  let target = { x: red.x, y: red.y };
  for (let attempt = 0; attempt < 36; attempt += 1) {
    const point = getRandomYardWalkPoint();
    if (distance(red.x, red.y, point.x, point.y) >= 120) {
      target = point;
      break;
    }
  }
  red.targetX = target.x;
  red.targetY = target.y;
}

function requestRedDialogue(kind) {
  initializeRedNpcState();

  const red = GameState.redNpc;
  const target = getRedDialogueTargetNearPlayer();
  red.mode = "dialogueApproach";
  red.pendingDialogue = kind;
  red.targetX = target.x;
  red.targetY = target.y;
  red.isMoving = true;
  red.walkAnimTime = 0;
  if (kind !== "sideTalk") {
    GameState.currentQuest = kind === "postMontage" ?
      "quest_yard_find_red_after_montage" :
      (kind === "poster" ? "quest_yard_choose_poster" : "quest_yard_red");
  }
  stopPlayerForNpcDialogue();
}

function updateRedDialogueApproach(dt) {
  const red = GameState.redNpc;
  const dx = red.targetX - red.x;
  const dy = red.targetY - red.y;
  const remaining = Math.hypot(dx, dy);

  if (remaining <= 6) {
    red.x = red.targetX;
    red.y = red.targetY;
    red.mode = "talk";
    red.isMoving = false;
    red.walkAnimTime = 0;
    faceRedAndPlayerForDialogue();
    startPendingRedDialogue();
    return;
  }

  const step = Math.min(remaining, RED_PATROL_SPEED * 1.45 * dt);
  const nextX = red.x + dx / remaining * step;
  const nextY = red.y + dy / remaining * step;
  if (!isYardNpcPointWalkable(nextX, nextY)) {
    red.mode = "patrol";
    red.pauseTimer = randomRange(1.4, 4.2);
    chooseNextRedPatrolTarget();
    return;
  }
  red.x = nextX;
  red.y = nextY;
  red.facing = directionFromDelta(dx, dy);
  red.isMoving = true;
  red.walkAnimTime += dt;
}

function getRedDialogueTargetNearPlayer() {
  const playerFoot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  const red = GameState.redNpc;
  const candidates = [
    { x: playerFoot.x - 52, y: playerFoot.y },
    { x: playerFoot.x + 52, y: playerFoot.y },
    { x: playerFoot.x, y: playerFoot.y - 52 },
    { x: playerFoot.x, y: playerFoot.y + 52 },
    { x: playerFoot.x - 42, y: playerFoot.y - 34 },
    { x: playerFoot.x + 42, y: playerFoot.y - 34 }
  ];

  let best = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  candidates.forEach((point) => {
    if (!isYardNpcPointWalkable(point.x, point.y)) {
      return;
    }
    const score = distance(red.x, red.y, point.x, point.y);
    if (score < bestDistance) {
      best = point;
      bestDistance = score;
    }
  });

  return best || { x: playerFoot.x - 52, y: playerFoot.y };
}

function faceRedAndPlayerForDialogue() {
  const red = GameState.redNpc;
  const playerFoot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  red.facing = directionFromDelta(playerFoot.x - red.x, playerFoot.y - red.y);
  GameState.player.facing = directionFromDelta(red.x - playerFoot.x, red.y - playerFoot.y);
}

function startPendingRedDialogue() {
  const red = GameState.redNpc;
  const pendingDialogue = red.pendingDialogue;
  red.pendingDialogue = null;

  if (pendingDialogue === "postMontage") {
    startPostMontageRedDialogue();
  } else if (pendingDialogue === "poster") {
    startRedPosterDialogue();
  } else if (pendingDialogue === "sideTalk") {
    startSideTalk("red");
  } else {
    startRedDialogue();
  }
}

function releaseRedAfterDialogue() {
  const red = GameState.redNpc;
  red.mode = "patrol";
  red.targetX = red.x;
  red.targetY = red.y;
  red.pauseTimer = randomRange(1.4, 4.2);
  red.isMoving = false;
  red.walkAnimTime = 0;
}

const PosterChoiceLayout = {
  // Sized to retain the supplied large frame's proportions around both cards.
  panel: { x: 160, y: 20, w: 960, h: 680 },
  panelSourceRect: { x: 136, y: 124, w: 1180, h: 824 },
  // Crop away the transparent canvas surrounding the supplied question-mark card.
  cardSourceRect: { x: 468, y: 86, w: 600, h: 844 },
  rita: { x: 300, y: 224, w: 220, h: 318 },
  marilyn: { x: 760, y: 224, w: 220, h: 318 }
};

const RadioRepairLayout = {
  panel: { x: 80, y: 48, w: 1120, h: 624 },
  gearCenter: { x: 474, y: 370 },
  outerRadius: 162,
  innerRadius: 108,
  toggleButton: { x: 790, y: 292, w: 304, h: 94 },
  resetButton: { x: 790, y: 416, w: 304, h: 66 }
};

const LibrarySortingLayout = {
  panel: { x: 60, y: 64, w: 1160, h: 592 },
  shelf: { x: 150, y: 488, w: 980, h: 34 },
  resetButton: { x: 484, y: 560, w: 312, h: 58 }
};

const RadioGearTargets = [
  { id: "outer-0", track: "outer", angle: 0.34 },
  { id: "outer-1", track: "outer", angle: 1.62 },
  { id: "outer-2", track: "outer", angle: 2.76 },
  { id: "outer-3", track: "outer", angle: 4.05 },
  { id: "outer-4", track: "outer", angle: 5.46 },
  { id: "inner-0", track: "inner", angle: 0.96 },
  { id: "inner-1", track: "inner", angle: 2.18 },
  { id: "inner-2", track: "inner", angle: 3.46 },
  { id: "inner-3", track: "inner", angle: 4.72 },
  { id: "inner-4", track: "inner", angle: 5.82 }
];

const LibrarySortBooks = [
  { id: "obsidian", title: "黑曜秘典", shortTitle: "黑曜", height: 96, color: "#303441", accent: "#c9d6e8" },
  { id: "midnight", title: "午夜星录", shortTitle: "午夜", height: 89, color: "#3e4f7b", accent: "#e5cf80" },
  { id: "oak", title: "古橡卷册", shortTitle: "古橡", height: 82, color: "#7a5239", accent: "#edcf93" },
  { id: "moss", title: "苔痕手札", shortTitle: "苔痕", height: 75, color: "#567252", accent: "#d4d789" },
  { id: "crimson", title: "绯红炼金书", shortTitle: "绯红", height: 68, color: "#9b4141", accent: "#ffd3a1" },
  { id: "onyx", title: "夜幕法典", shortTitle: "夜幕", height: 61, color: "#25242c", accent: "#c9b7e0" },
  { id: "walnut", title: "胡桃语录", shortTitle: "胡桃", height: 54, color: "#8a6044", accent: "#ffe0a8" },
  { id: "slate", title: "石蓝门书", shortTitle: "石蓝", height: 47, color: "#4d6580", accent: "#b6def2" },
  { id: "fern", title: "蕨影小册", shortTitle: "蕨影", height: 40, color: "#55745c", accent: "#e7dda0" },
  { id: "ruby", title: "红晶便笺", shortTitle: "红晶", height: 34, color: "#a94950", accent: "#ffd3cf" }
];

const MiniGameHost = {
  type: null,
  overlay: null,
  shell: null,
  viewport: null,
  component: null,
  mountToken: 0,
  completionPending: false,
  gearStatus: null,
  gearActionQueued: false,
  pipeMazeStatus: null,
  pipeMazeStartQueued: false,
  pipeMazeQueuedDirection: null,

  init() {
    if (this.overlay && this.shell && this.viewport) {
      return true;
    }
    this.overlay = document.getElementById("miniGameOverlay");
    this.shell = document.getElementById("miniGameShell");
    this.viewport = document.getElementById("miniGameViewport");
    return Boolean(this.overlay && this.shell && this.viewport);
  },

  open(type) {
    if (!this.init()) {
      throw new Error("Mini-game overlay is unavailable.");
    }

    const configByType = {
      gear: {
        style: "../齿轮校准互动空间/component.css",
        seed: "red-radio"
      },
      bookshelf: {
        style: "../整理图书互动空间/component.css",
        seed: "brooks-library"
      },
      pipeMaze: {
        style: "../地下水管迷宫/component.css",
        seed: "andy-map"
      }
    };
    const config = configByType[type];
    if (!config) {
      throw new Error("Unknown mini-game: " + type);
    }

    this.close(false);
    this.type = type;
    this.completionPending = false;
    this.gearStatus = null;
    this.gearActionQueued = false;
    this.pipeMazeStatus = null;
    this.pipeMazeStartQueued = false;
    this.pipeMazeQueuedDirection = null;
    this.shell.classList.remove("is-full-page");
    this.shell.classList.toggle("is-fixed-ratio", type === "gear" || type === "bookshelf");
    this.overlay.classList.add("is-open");
    this.overlay.setAttribute("aria-hidden", "false");
    const token = ++this.mountToken;
    this.mountComponent(type, config, token).catch((error) => {
      if (token !== this.mountToken) return;
      this.close();
      handleFatalError(error);
    });
  },

  ensureScript(type) {
    const factory = window.BeyondWallsMiniGames && window.BeyondWallsMiniGames[type];
    if (!factory) {
      return Promise.reject(new Error("Mini-game component did not register: " + type));
    }
    return Promise.resolve(factory);
  },

  async mountComponent(type, config, token) {
    this.viewport.replaceChildren();
    const host = document.createElement("div");
    host.className = "mini-game-component-host";
    const shadow = host.attachShadow({ mode: "open" });
    const fontStyle = document.createElement("link");
    fontStyle.rel = "stylesheet";
    fontStyle.href = new URL("../shared/mini-games-font.css", document.baseURI).href;
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = new URL(config.style, document.baseURI).href;
    const root = document.createElement("div");
    root.id = "root";
    shadow.append(fontStyle, style, root);
    this.viewport.appendChild(host);

    const factory = await this.ensureScript(type);
    if (token !== this.mountToken || this.type !== type) {
      return;
    }
    this.component = factory.mount(root, {
      embedded: true,
      seed: config.seed,
      onEvent: (message) => this.handleComponentEvent(message)
    });
  },

  close(restoreFocus = true) {
    if (!this.overlay || !this.viewport) {
      return;
    }
    ++this.mountToken;
    if (this.component && typeof this.component.destroy === "function") {
      this.component.destroy();
    }
    this.component = null;
    this.viewport.replaceChildren();
    if (this.shell) {
      this.shell.classList.remove("is-fixed-ratio", "is-full-page");
    }
    this.overlay.classList.remove("is-open");
    this.overlay.setAttribute("aria-hidden", "true");
    this.type = null;
    this.completionPending = false;
    this.gearStatus = null;
    this.gearActionQueued = false;
    this.pipeMazeStatus = null;
    this.pipeMazeStartQueued = false;
    this.pipeMazeQueuedDirection = null;
    InputSystem.resetAllInput();
    if (GlobalControls) {
      GlobalControls.releaseAll();
    }
    if (restoreFocus && canvas) {
      try {
        canvas.focus({ preventScroll: true });
      } catch (_error) {
        canvas.focus();
      }
    }
  },

  getApi() {
    return this.component && this.component.api ? this.component.api : null;
  },

  callApi(method, ...args) {
    const api = this.getApi();
    if (!api || typeof api[method] !== "function") {
      return false;
    }
    api[method](...args);
    return true;
  },

  requestGearAction() {
    if (this.type !== "gear" || this.completionPending) {
      return false;
    }
    if (!this.gearStatus || this.gearStatus === "starting") {
      this.gearActionQueued = true;
      return true;
    }
    if (this.gearStatus === "ready") {
      const started = this.callApi("start");
      if (started) this.gearStatus = "starting";
      return started;
    }
    if (this.gearStatus === "playing") {
      return this.callApi("toggleTrack");
    }
    return false;
  },

  requestPipeMazeAction(key) {
    if (this.type !== "pipeMaze" || this.completionPending) {
      return false;
    }
    const directionByKey = { w: "up", d: "right", s: "down", a: "left" };
    const direction = directionByKey[key] || null;
    if (!direction && key !== " ") {
      return false;
    }
    if (!this.pipeMazeStatus) {
      this.pipeMazeStartQueued = true;
      if (direction) this.pipeMazeQueuedDirection = direction;
      return true;
    }
    if (this.pipeMazeStatus === "ready") {
      if (direction) this.pipeMazeQueuedDirection = direction;
      const started = this.callApi("start");
      if (started) this.pipeMazeStatus = "starting";
      return started;
    }
    if (this.pipeMazeStatus === "starting") {
      if (direction) this.pipeMazeQueuedDirection = direction;
      return true;
    }
    if (this.pipeMazeStatus === "playing" && direction) {
      return this.callApi("move", direction);
    }
    return false;
  },

  handleComponentEvent(message) {
    if (!message || !this.type) {
      return;
    }
    const isGearMessage = this.type === "gear" && message.source === "gear-calibration";
    if (isGearMessage && message.detail && typeof message.detail.status === "string") {
      this.gearStatus = message.detail.status;
      if (this.gearActionQueued && (this.gearStatus === "ready" || this.gearStatus === "playing")) {
        this.gearActionQueued = false;
        this.requestGearAction();
      }
    }
    const completedGear = isGearMessage && message.type === "GEAR_CALIBRATION_COMPLETE";
    const completedBookshelf = this.type === "bookshelf" &&
      message.source === "magic-bookshelf" && message.type === "BOOKSHELF_COMPLETE";
    if (completedGear) {
      AchievementSystem.unlock("radio_signal");
    }
    const isPipeMazeMessage = this.type === "pipeMaze" && message.source === "pipe-maze";
    if (isPipeMazeMessage && message.detail && typeof message.detail.status === "string") {
      this.pipeMazeStatus = message.detail.status;
      if (this.pipeMazeStatus === "ready" && this.pipeMazeStartQueued) {
        this.pipeMazeStartQueued = false;
        const keyByDirection = { up: "w", right: "d", down: "s", left: "a" };
        this.requestPipeMazeAction(keyByDirection[this.pipeMazeQueuedDirection] || " ");
      } else if (this.pipeMazeStatus === "playing" && this.pipeMazeQueuedDirection) {
        const direction = this.pipeMazeQueuedDirection;
        this.pipeMazeQueuedDirection = null;
        this.callApi("move", direction);
      }
    }
    const completedPipeMaze = isPipeMazeMessage && message.type === "PIPE_MAZE_COMPLETE";
    if ((!completedGear && !completedBookshelf && !completedPipeMaze) || this.completionPending) {
      return;
    }

    const completedType = this.type;
    this.completionPending = true;
    window.setTimeout(() => {
      this.close();
      if (completedType === "gear") {
        finishRadioRepair();
      } else if (completedType === "bookshelf") {
        finishLibrarySortingTask();
      } else {
        finishPipeMazeMap();
      }
    }, completedPipeMaze ? 1000 : 650);
  }
};

function startRadioRepair() {
  GameState.radioRepairActive = true;
  GameState.radioRepairProgress = 0;
  GameState.radioGear = null;
  GameState.currentQuest = "quest_yard_repair_radio";
  MiniGameHost.open("gear");
}

function handleRadioRepairInput() {
  if (InputSystem.actionPressed("interact")) {
    MiniGameHost.requestGearAction();
  }
}

function updateRadioRepair(dt) {
  void dt;
}


function finishRadioRepair() {
  if (!GameState.radioRepairActive) {
    return;
  }
  MiniGameHost.close();
  GameState.radioRepairActive = false;
  GameState.redHammerDeliveryDialogueActive = true;
  GameState.currentQuest = "quest_yard_red";
  deliverHammerFromRed();
  DialogueSystem.start(RedHammerDeliveryLines);
}

function handlePosterChoiceInput() {
  if (!GameState.posterChoiceActive) {
    return;
  }

  if (InputSystem.pointerJustPressed) {
    if (InputSystem.pointerInRect(PosterChoiceLayout.rita)) {
      choosePosterFromRed("rita");
      return;
    }
    if (InputSystem.pointerInRect(PosterChoiceLayout.marilyn)) {
      choosePosterFromRed("marilyn");
      return;
    }
  }
}

function choosePosterFromRed(posterId) {
  const poster = PosterChoices.find((item) => item.id === posterId);
  if (!poster || !GameState.posterChoiceActive) {
    return;
  }

  GameState.posterType = poster.id;
  GameState.posterChoiceActive = false;
  GameState.currentQuest = "quest_yard_choose_poster";
  startPosterPickupAnimation(poster);
}

function startPosterPickupAnimation(poster) {
  const animation = GameState.posterPickupAnimation;
  animation.active = true;
  animation.posterId = poster.id;
  animation.elapsed = 0;
}

function updatePosterPickupAnimation(dt) {
  const animation = GameState.posterPickupAnimation;
  if (!animation.active) {
    return;
  }

  animation.elapsed += dt;
  const totalDuration = POSTER_PICKUP_HOLD_SECONDS + POSTER_PICKUP_TRAVEL_SECONDS;
  if (animation.elapsed < totalDuration) {
    return;
  }

  const poster = PosterChoices.find((item) => item.id === animation.posterId);
  animation.active = false;
  animation.posterId = null;
  animation.elapsed = 0;
  if (!poster) {
    return;
  }

  GameState.redDialogueActive = true;
  GameState.redPosterDeliveryDialogueActive = true;
  DialogueSystem.start([
    "安迪：我选" + poster.name + "。",
    "瑞德：真没想到，天天埋头磨石头的人，居然想要这种海报。",
    "安迪（淡淡一笑）：长夜漫漫，总得留一点念想。",
    "瑞德：行吧。"
  ].concat(RedPosterDeliveryLines));
}

function isRedDialogueApproachActive() {
  return GameState.scene === "yard" && GameState.redNpc.mode === "dialogueApproach";
}

function initializeBrooksNpcState() {
  const npc = getBrooksNpcConfig();
  if (!npc) {
    return;
  }

  const brooks = GameState.brooksNpc;
  if (brooks.initialized) {
    return;
  }

  brooks.initialized = true;
  brooks.mode = GameState.libraryTask.brooksInside ? "inside" : "patrol";
  brooks.x = npc.x;
  brooks.y = npc.y;
  brooks.facing = npc.baseFacing || "down";
  brooks.isMoving = false;
  brooks.walkAnimTime = 0;
  brooks.targetX = npc.x;
  brooks.targetY = npc.y;
  brooks.waitTimer = randomRange(BROOKS_REST_MIN_SECONDS, BROOKS_REST_MAX_SECONDS);
  brooks.ambientRestTarget = false;
  brooks.entryPauseTimer = 0;
  brooks.pendingDialogue = null;
}

function getBrooksNpcConfig() {
  return YardLayout.npcs.find((npc) => npc.id === "brooks") || null;
}

function updateBrooksNpc(dt) {
  initializeBrooksNpcState();

  const brooks = GameState.brooksNpc;
  if (isAmbientConversationParticipant("brooks")) {
    brooks.isMoving = false;
    brooks.walkAnimTime = 0;
    return;
  }
  if (GameState.twentyYearsPassed || GameState.libraryTask.brooksInside) {
    brooks.isMoving = false;
    brooks.walkAnimTime = 0;
    return;
  }

  if (brooks.mode === "libraryEntry") {
    updateBrooksLibraryEntry(dt);
    return;
  }

  if (brooks.mode === "libraryEntrancePause") {
    updateBrooksLibraryEntrancePause(dt);
    return;
  }

  if (brooks.mode === "dialogueApproach") {
    updateBrooksDialogueApproach(dt);
    return;
  }

  if (brooks.mode !== "patrol" || DialogueSystem.active) {
    brooks.isMoving = false;
    brooks.walkAnimTime = 0;
    return;
  }

  updateBrooksRandomPatrol(dt);
}

function updateBrooksRandomPatrol(dt) {
  const brooks = GameState.brooksNpc;
  if (brooks.waitTimer > 0) {
    brooks.waitTimer = Math.max(0, brooks.waitTimer - dt);
    brooks.isMoving = false;
    brooks.walkAnimTime = 0;
    if (brooks.waitTimer <= 0) {
      chooseBrooksPatrolTarget();
    }
    return;
  }

  const dx = brooks.targetX - brooks.x;
  const dy = brooks.targetY - brooks.y;
  const remaining = Math.hypot(dx, dy);
  if (remaining <= 6) {
    brooks.isMoving = false;
    brooks.walkAnimTime = 0;
    brooks.waitTimer = brooks.ambientRestTarget ?
      randomRange(AMBIENT_SOCIAL_REST_MIN_SECONDS, AMBIENT_SOCIAL_REST_MAX_SECONDS) :
      randomRange(BROOKS_REST_MIN_SECONDS, BROOKS_REST_MAX_SECONDS);
    brooks.ambientRestTarget = false;
    return;
  }

  const step = Math.min(remaining, BROOKS_LIBRARY_PATROL_SPEED * dt);
  const nextX = brooks.x + dx / remaining * step;
  const nextY = brooks.y + dy / remaining * step;
  if (!isYardNpcPointWalkable(nextX, nextY)) {
    brooks.isMoving = false;
    brooks.walkAnimTime = 0;
    brooks.waitTimer = randomRange(BROOKS_REST_MIN_SECONDS, BROOKS_REST_MAX_SECONDS);
    return;
  }

  brooks.x = nextX;
  brooks.y = nextY;
  brooks.facing = directionFromDelta(dx, dy);
  brooks.isMoving = true;
  brooks.walkAnimTime += dt;
}

function chooseBrooksPatrolTarget() {
  const brooks = GameState.brooksNpc;
  const socialTarget = getAmbientSocialTarget("brooks");
  if (socialTarget) {
    brooks.targetX = socialTarget.x;
    brooks.targetY = socialTarget.y;
    brooks.ambientRestTarget = true;
    return;
  }
  brooks.ambientRestTarget = false;
  let target = { x: brooks.x, y: brooks.y };
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const point = getRandomBrooksPatrolPoint();
    if (distance(brooks.x, brooks.y, point.x, point.y) >= BROOKS_MIN_TARGET_DISTANCE) {
      target = point;
      break;
    }
  }

  brooks.targetX = target.x;
  brooks.targetY = target.y;
}

function getRandomBrooksPatrolPoint() {
  const area = BROOKS_LIBRARY_PATROL_AREA;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const point = {
      x: randomRange(area.x, area.x + area.w),
      y: randomRange(area.y, area.y + area.h)
    };
    if (isYardNpcPointWalkable(point.x, point.y)) {
      return point;
    }
  }

  const npc = getBrooksNpcConfig();
  return npc ? { x: npc.x, y: npc.y } : { x: 165, y: 1132 };
}

function requestBrooksDialogue(kind) {
  initializeBrooksNpcState();

  const brooks = GameState.brooksNpc;
  const target = getBrooksDialogueTargetNearPlayer();
  brooks.mode = "dialogueApproach";
  brooks.pendingDialogue = kind;
  brooks.targetX = target.x;
  brooks.targetY = target.y;
  brooks.isMoving = true;
  brooks.walkAnimTime = 0;
  GameState.currentQuest = kind === "hint" ? "quest_yard_red" : "quest_yard_library";
  stopPlayerForNpcDialogue();
}

function updateBrooksDialogueApproach(dt) {
  const brooks = GameState.brooksNpc;
  const dx = brooks.targetX - brooks.x;
  const dy = brooks.targetY - brooks.y;
  const remaining = Math.hypot(dx, dy);

  if (remaining <= 6) {
    brooks.x = brooks.targetX;
    brooks.y = brooks.targetY;
    brooks.mode = "talk";
    brooks.isMoving = false;
    brooks.walkAnimTime = 0;
    faceBrooksAndPlayerForDialogue();
    startPendingBrooksDialogue();
    return;
  }

  const step = Math.min(remaining, BROOKS_DIALOGUE_APPROACH_SPEED * dt);
  const nextX = brooks.x + dx / remaining * step;
  const nextY = brooks.y + dy / remaining * step;
  if (!isYardNpcPointWalkable(nextX, nextY)) {
    brooks.mode = "patrol";
    brooks.waitTimer = randomRange(BROOKS_REST_MIN_SECONDS, BROOKS_REST_MAX_SECONDS);
    chooseBrooksPatrolTarget();
    return;
  }
  brooks.x = nextX;
  brooks.y = nextY;
  brooks.facing = directionFromDelta(dx, dy);
  brooks.isMoving = true;
  brooks.walkAnimTime += dt;
}

function startBrooksLibraryEntry() {
  const brooks = GameState.brooksNpc;
  const entry = YardLayout.libraryEntryPoint;
  brooks.mode = "libraryEntry";
  brooks.pendingDialogue = null;
  brooks.targetX = entry.x;
  brooks.targetY = entry.y;
  brooks.entryPauseTimer = 0;
  brooks.isMoving = true;
  brooks.walkAnimTime = 0;
  GameState.currentQuest = "quest_yard_wait_brooks_enter";
}

function updateBrooksLibraryEntry(dt) {
  const brooks = GameState.brooksNpc;
  const dx = brooks.targetX - brooks.x;
  const dy = brooks.targetY - brooks.y;
  const remaining = Math.hypot(dx, dy);

  if (remaining <= 2) {
    brooks.x = brooks.targetX;
    brooks.y = brooks.targetY;
    brooks.mode = "libraryEntrancePause";
    brooks.facing = "up";
    brooks.isMoving = false;
    brooks.walkAnimTime = 0;
    brooks.entryPauseTimer = BROOKS_LIBRARY_ENTRY_PAUSE_SECONDS;
    return;
  }

  const step = Math.min(remaining, BROOKS_LIBRARY_ENTRY_SPEED * dt);
  brooks.x += dx / remaining * step;
  brooks.y += dy / remaining * step;
  brooks.facing = directionFromDelta(dx, dy);
  brooks.isMoving = true;
  brooks.walkAnimTime += dt;
}

function updateBrooksLibraryEntrancePause(dt) {
  const brooks = GameState.brooksNpc;
  brooks.facing = "up";
  brooks.isMoving = false;
  brooks.walkAnimTime = 0;
  brooks.entryPauseTimer = Math.max(0, brooks.entryPauseTimer - dt);
  if (brooks.entryPauseTimer <= 0) {
    moveBrooksIntoLibrary();
  }
}

function getBrooksDialogueTargetNearPlayer() {
  const playerFoot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  const brooks = GameState.brooksNpc;
  const candidates = [
    { x: playerFoot.x - 52, y: playerFoot.y },
    { x: playerFoot.x + 52, y: playerFoot.y },
    { x: playerFoot.x, y: playerFoot.y - 52 },
    { x: playerFoot.x, y: playerFoot.y + 52 },
    { x: playerFoot.x - 42, y: playerFoot.y - 34 },
    { x: playerFoot.x + 42, y: playerFoot.y - 34 }
  ];

  let best = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  candidates.forEach((point) => {
    if (!isYardNpcPointWalkable(point.x, point.y)) {
      return;
    }
    const score = distance(brooks.x, brooks.y, point.x, point.y);
    if (score < bestDistance) {
      best = point;
      bestDistance = score;
    }
  });

  return best || { x: playerFoot.x - 52, y: playerFoot.y };
}

function faceBrooksAndPlayerForDialogue() {
  const brooks = GameState.brooksNpc;
  const playerFoot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  brooks.facing = directionFromDelta(playerFoot.x - brooks.x, playerFoot.y - brooks.y);
  GameState.player.facing = directionFromDelta(brooks.x - playerFoot.x, brooks.y - playerFoot.y);
}

function startPendingBrooksDialogue() {
  const brooks = GameState.brooksNpc;
  const pendingDialogue = brooks.pendingDialogue;
  brooks.pendingDialogue = null;

  if (pendingDialogue === "hint") {
    startBrooksHintDialogue();
  } else if (pendingDialogue === "invite") {
    startBrooksInviteDialogue();
  } else {
    startBrooksDialogue();
  }
}

function releaseBrooksAfterDialogue() {
  const brooks = GameState.brooksNpc;
  if (GameState.libraryTask.brooksInside) {
    brooks.mode = "inside";
    brooks.pendingDialogue = null;
    brooks.isMoving = false;
    brooks.walkAnimTime = 0;
    return;
  }
  brooks.mode = "patrol";
  brooks.pendingDialogue = null;
  brooks.isMoving = false;
  brooks.walkAnimTime = 0;
  brooks.waitTimer = randomRange(BROOKS_REST_MIN_SECONDS, BROOKS_REST_MAX_SECONDS);
  chooseBrooksPatrolTarget();
}

function isBrooksDialogueApproachActive() {
  return GameState.scene === "yard" && GameState.brooksNpc.mode === "dialogueApproach";
}

function stopPlayerForNpcDialogue() {
  GameState.player.vx = 0;
  GameState.player.vy = 0;
  GameState.player.isMoving = false;
  GameState.player.walkAnimTime = 0;
}

function startRedDialogue() {
  GameState.redDialogueActive = true;
  GameState.redHammerDelivered = false;
  GameState.currentQuest = "quest_yard_red";
  DialogueSystem.start(RedDialogueLines);
}

function startRedPosterDialogue() {
  GameState.redDialogueActive = true;
  GameState.redPosterDialogueActive = true;
  GameState.currentQuest = "quest_yard_choose_poster";
  DialogueSystem.start(RedPosterDialogueLines);
}

function startPostMontageRedDialogue() {
  GameState.redDialogueActive = true;
  GameState.postMontageRedDialogueActive = true;
  GameState.currentQuest = "quest_yard_find_red_after_montage";
  DialogueSystem.start(
    GameState.alternateEscapeRoute ? AlternateRoutePostMontageRedDialogueLines : PostMontageRedDialogueLines
  );
}

function updateRedDialogueReward() {
  if (GameState.postMontageRedDialogueActive) {
    if (!DialogueSystem.active) {
      GameState.postMontageRedDialogueActive = false;
      GameState.redDialogueActive = false;
      GameState.postMontageRedSpoken = true;
      GameState.currentQuest = "quest_yard_red_after_montage_done";
      saveCheckpoint("CP_POST_MONTAGE_RED");
      if (!startQueuedSideTalk("red")) {
        releaseRedAfterDialogue();
      }
    }
    return;
  }

  if (GameState.redHammerDeliveryDialogueActive) {
    if (!DialogueSystem.active) {
      GameState.redHammerDeliveryDialogueActive = false;
      GameState.redDialogueActive = false;
      releaseRedAfterDialogue();
      GameState.currentQuest = "quest_yard_library";
      requireSideTalkRefresh();
    }
    return;
  }

  if (GameState.redPosterDeliveryDialogueActive) {
    if (!DialogueSystem.active) {
      GameState.redPosterDeliveryDialogueActive = false;
      GameState.redDialogueActive = false;
      saveCheckpoint("CP_POSTER_OBTAINED");
      GameState.currentQuest = "quest_yard_return_cell_to_hang_poster";
      if (!startQueuedSideTalk("red")) {
        releaseRedAfterDialogue();
      }
    }
    return;
  }

  if (GameState.redPosterDialogueActive) {
    if (!DialogueSystem.active) {
      GameState.redPosterDialogueActive = false;
      GameState.redDialogueActive = false;
      GameState.posterChoiceActive = true;
      GameState.currentQuest = "quest_yard_choose_poster";
    }
    return;
  }

  if (!GameState.redDialogueActive) {
    return;
  }

  if (!DialogueSystem.active && !GameState.radioRepairActive) {
    startRadioRepair();
  }
}

function deliverHammerFromRed() {
  GameState.hasHammer = true;
  GameState.hammerHiddenInBible = false;
  GameState.redHammerDelivered = true;
  saveCheckpoint("CP_HAMMER_OBTAINED");
}

function startBrooksHintDialogue() {
  GameState.brooksDialogueActive = true;
  GameState.brooksDialogueKind = "hint";
  GameState.currentQuest = "quest_yard_red";
  DialogueSystem.start([
    "老布：瑞德现在想见见你。"
  ]);
}

function startBrooksInviteDialogue() {
  GameState.brooksDialogueActive = true;
  GameState.brooksDialogueKind = "invite";
  GameState.currentQuest = "quest_yard_enter_library";
  DialogueSystem.start([
    "老布：来，跟着我进图书馆，我给你一件东西。"
  ]);
}

function startBrooksDialogue() {
  GameState.brooksDialogueActive = true;
  GameState.brooksDialogueKind = "libraryOpening";
  GameState.brooksBibleDelivered = false;
  GameState.currentQuest = "quest_library_bible";
  DialogueSystem.start(BrooksLibraryOpeningLines);
}

function updateBrooksDialogueReward() {
  if (!GameState.brooksDialogueActive) {
    return;
  }

  if (GameState.brooksDialogueKind === "hint") {
    if (!DialogueSystem.active) {
      GameState.brooksDialogueActive = false;
      GameState.brooksDialogueKind = null;
      releaseBrooksAfterDialogue();
    }
    return;
  }

  if (GameState.brooksDialogueKind === "invite") {
    if (!DialogueSystem.active) {
      GameState.brooksDialogueActive = false;
      GameState.brooksDialogueKind = null;
      if (!startQueuedSideTalk("brooks", "brooksLibraryEntry")) {
        startBrooksLibraryEntry();
      }
    }
    return;
  }

  if (GameState.brooksDialogueKind === "libraryOpening" && !DialogueSystem.active) {
    startBrooksLibraryReply("opening");
    return;
  }

  if (GameState.brooksDialogueKind === "libraryOpeningReply" && !DialogueSystem.active) {
    startBrooksLibraryReply("bibleRequest");
    return;
  }

  if (GameState.brooksDialogueKind === "libraryRequestReply" && !DialogueSystem.active) {
    startBrooksLibraryReply("bibleReason");
    return;
  }

  if (GameState.brooksDialogueKind === "libraryReasonReply" && !DialogueSystem.active) {
    startBrooksLibraryReply("helpLibrary");
    return;
  }

  if (GameState.brooksDialogueKind === "libraryHelpReply" && !DialogueSystem.active) {
    GameState.brooksDialogueActive = false;
    GameState.brooksDialogueKind = null;
    startLibrarySortingTask();
    return;
  }

  if (GameState.brooksDialogueKind === "libraryDelivery" && !DialogueSystem.active) {
    if (!GameState.brooksBibleDelivered) {
      deliverBibleFromBrooks();
    }
    GameState.brooksDialogueActive = false;
    GameState.brooksDialogueKind = null;
    GameState.currentQuest = "quest_library_leave";
    requireSideTalkRefresh();
  }
}

function moveBrooksIntoLibrary() {
  GameState.libraryTask.brooksInside = true;
  GameState.libraryTask.sortingActive = false;
  GameState.libraryTask.sortingProgress = 0;
  GameState.libraryTask.bookOrder = [];
  GameState.libraryTask.selectedBookIndex = null;
  GameState.libraryTask.sortMoves = 0;
  GameState.libraryTask.sortingStatus = "idle";
  GameState.libraryTask.sortingMessage = "";
  GameState.libraryTask.completionTimer = 0;
  const brooks = GameState.brooksNpc;
  brooks.mode = "inside";
  brooks.pendingDialogue = null;
  brooks.isMoving = false;
  brooks.walkAnimTime = 0;
  brooks.entryPauseTimer = 0;
  GameState.currentQuest = "quest_yard_enter_library";
}

function isBrooksEnteringLibrary() {
  const mode = GameState.brooksNpc.mode;
  return mode === "libraryEntry" || mode === "libraryEntrancePause";
}

function isBrooksWaitingInLibrary() {
  return GameState.libraryTask.brooksInside && !GameState.twentyYearsPassed;
}

function startBrooksLibraryReply(stage) {
  const selectedText = BrooksLibraryReplies[stage];
  if (!selectedText) {
    return;
  }

  if (stage === "opening") {
    startBrooksLibrarySequence("libraryOpeningReply", [
      "安迪：" + selectedText,
      "老布：这里安静，但也不随便收人。我管书，也管规矩。你找我，应该不只是为了看书吧？"
    ]);
    return;
  }

  if (stage === "bibleRequest") {
    startBrooksLibrarySequence("libraryRequestReply", [
      "安迪：" + selectedText,
      "老布（抬头看向安迪，眼神审视）：圣经？这可不是随便借阅的流通书。是私人物品，很珍贵。",
      "老布：黑墙庄园里很少有人会想要这种东西。你为什么需要它？"
    ]);
    return;
  }

  if (stage === "bibleReason") {
    startBrooksLibrarySequence("libraryReasonReply", [
      "安迪：" + selectedText,
      "老布（点点头，态度缓和）：我不轻易送人圣经。",
      "老布：不过……最近图书堆积杂乱，好久没人帮我整理。",
      "老布：你要是愿意帮我整理一下图书，我就送你一本私人圣经。"
    ]);
    return;
  }

  startBrooksLibrarySequence("libraryHelpReply", [
    "安迪：" + selectedText,
    "老布（露出难得的笑意）：很好。",
    "老布：踏实、安静、不惹事——这正是图书馆需要的人。",
    "老布：你做完工作，我把圣经交给你。"
  ]);
}

function startBrooksLibrarySequence(kind, lines) {
  GameState.brooksDialogueActive = true;
  GameState.brooksDialogueKind = kind;
  DialogueSystem.start(lines);
}

function startLibrarySortingTask() {
  const task = GameState.libraryTask;
  task.sortingActive = true;
  task.sortingProgress = 0;
  task.bookOrder = [];
  task.selectedBookIndex = null;
  task.sortMoves = 0;
  task.sortingStatus = "external";
  task.sortingMessage = "";
  task.completionTimer = 0;
  GameState.currentQuest = "quest_library_sorting";
  MiniGameHost.open("bookshelf");
}

function handleLibrarySortingInput() {
  // The supplied standalone game owns its input while the overlay is visible.
}

function updateLibrarySortingTask(dt) {
  void dt;
}

function finishLibrarySortingTask() {
  if (!GameState.libraryTask.sortingActive) {
    return;
  }

  MiniGameHost.close();
  GameState.libraryTask.sortingActive = false;
  GameState.libraryTask.sortingStatus = "complete";
  GameState.libraryTask.sortingMessage = "";
  startBrooksLibrarySequence("libraryDelivery", BrooksBibleDeliveryLines);
}


function getLibraryBookRects() {
  const task = GameState.libraryTask;
  const shelf = LibrarySortingLayout.shelf;
  const slotWidth = 93;
  const bookWidth = 78;
  const startX = shelf.x + 28;
  return task.bookOrder.map((bookId, index) => {
    const book = LibrarySortBooks.find((item) => item.id === bookId);
    const height = Math.round((book ? book.height : 34) * 2.18);
    const x = startX + index * slotWidth;
    return {
      index,
      book,
      x,
      y: shelf.y - height,
      w: bookWidth,
      h: height,
      hitRect: { x, y: shelf.y - 236, w: bookWidth, h: 242 }
    };
  });
}

function deliverBibleFromBrooks() {
  GameState.hasBible = true;
  GameState.hammerHiddenInBible = false;
  GameState.brooksBibleDelivered = true;
  saveCheckpoint("CP_BIBLE_OBTAINED");
}

function updatePlayer(dt) {
  let move = InputSystem.getMoveVector();
  if (isOpeningYardArrival()) {
    move = applyOpeningYardOutwardSlowdown(move);
  }
  const player = GameState.player;
  const movementSpeed = player.speed;
  updatePlayerFacing(move);

  if (player.lyingInBed) {
    if (Math.abs(move.x) > 0.05 || Math.abs(move.y) > 0.05) {
      standUpFromBed();
    } else {
      player.isMoving = false;
      player.walkAnimTime = 0;
      return;
    }
  }

  const targetVx = move.x * movementSpeed;
  const targetVy = move.y * movementSpeed;
  const hasMovementInput = Math.abs(move.x) > 0.05 || Math.abs(move.y) > 0.05;
  if (hasMovementInput) {
    const blend = 1 - Math.pow(0.001, dt);
    player.vx += (targetVx - player.vx) * blend;
    player.vy += (targetVy - player.vy) * blend;
  } else {
    // 移动是直接操控：一旦松开就立即停止，不保留上一帧的滑行速度。
    player.vx = 0;
    player.vy = 0;
  }

  if (Math.abs(player.vx) < 0.5) player.vx = 0;
  if (Math.abs(player.vy) < 0.5) player.vy = 0;

  if (!movePlayerBy(player.vx * dt, 0)) {
    player.vx = 0;
  }
  if (!movePlayerBy(0, player.vy * dt)) {
    player.vy = 0;
  }

  player.isMoving = Math.abs(player.vx) > ANDY_MOVING_THRESHOLD || Math.abs(player.vy) > ANDY_MOVING_THRESHOLD;
  if (player.isMoving) {
    player.walkAnimTime += dt;
  } else {
    player.walkAnimTime = 0;
  }
}

function isPlayerDumpingSoil() {
  if (
    GameState.scene !== "yard" ||
    DialogueSystem.active ||
    !GameState.hasSoilPile ||
    !InputSystem.actionDown("interact")
  ) {
    return false;
  }

  const activeInteraction = getActiveYardInteraction();
  return Boolean(activeInteraction && activeInteraction.id === "soil");
}

function stopPlayerForSoilDump() {
  const player = GameState.player;
  player.vx = 0;
  player.vy = 0;
  player.isMoving = false;
  player.walkAnimTime = 0;
}

function updateOpeningYardPlayer(dt) {
  updatePlayer(dt);
}

function applyOpeningYardOutwardSlowdown(move) {
  const foot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  const center = OpeningYardLayout.movementCenter;
  const dx = foot.x - center.x;
  const dy = foot.y - center.y;
  const distanceFromCenter = Math.hypot(dx, dy);
  if (distanceFromCenter <= OpeningYardLayout.movementRadius || distanceFromCenter === 0) {
    return move;
  }

  const radialX = dx / distanceFromCenter;
  const radialY = dy / distanceFromCenter;
  const outwardAmount = move.x * radialX + move.y * radialY;
  if (outwardAmount <= 0) {
    return move;
  }

  const overshoot = distanceFromCenter - OpeningYardLayout.movementRadius;
  const minimumOutwardSpeedScale = OpeningYardLayout.minimumOutwardSpeed / PLAYER_SPEED;
  const outwardSpeedScale = clamp(
    1 - overshoot / OpeningYardLayout.outwardSlowdownDistance,
    minimumOutwardSpeedScale,
    1
  );
  const removedOutwardAmount = outwardAmount * (1 - outwardSpeedScale);
  return {
    x: move.x - radialX * removedOutwardAmount,
    y: move.y - radialY * removedOutwardAmount
  };
}

function updatePlayerFacing(move) {
  if (Math.abs(move.x) < 0.05 && Math.abs(move.y) < 0.05) {
    return;
  }

  if (Math.abs(move.x) >= Math.abs(move.y)) {
    GameState.player.facing = move.x < 0 ? "left" : "right";
  } else {
    GameState.player.facing = move.y < 0 ? "up" : "down";
  }
}

function setPlayerPosition(x, y) {
  GameState.player.x = x;
  GameState.player.y = y;
  GameState.player.vx = 0;
  GameState.player.vy = 0;
  clampPlayerToWorld();
}

function clampPlayerToWorld() {
  const player = GameState.player;

  if (GameState.scene === "cellCorridor") {
    const size = getCorridorWorldSize();
    player.x = clamp(player.x, 0, size.w - player.w);
    player.y = clamp(player.y, 0, size.h - player.h);
    if (!isCorridorPositionWalkable(player.x, player.y)) {
      movePlayerToNearestCorridorPoint();
    }
    updateCorridorCamera();
    return;
  }

  if (GameState.scene === "yard") {
    const size = getYardWorldSize();
    player.x = clamp(player.x, 0, size.w - player.w);
    player.y = clamp(player.y, 0, size.h - player.h);
    if (!isYardPositionWalkable(player.x, player.y)) {
      movePlayerToNearestYardPoint();
    }
    updateYardCamera();
    return;
  }

  if (GameState.scene === "solitary") {
    const bounds = SolitaryLayout.walkBounds;
    player.x = clamp(
      player.x,
      bounds.x - player.w / 2,
      bounds.x + bounds.w - player.w / 2
    );
    player.y = clamp(
      player.y,
      bounds.y - player.h + 8,
      bounds.y + bounds.h - player.h + 8
    );
    if (!isSolitaryPositionWalkable(player.x, player.y)) {
      movePlayerToNearestSolitaryPoint();
    }
    return;
  }

  player.x = clamp(player.x, 36, CANVAS_WIDTH - player.w - 36);
  player.y = clamp(player.y, 60, CANVAS_HEIGHT - player.h - 42);

  if (GameState.scene === "cell" && !isCellPositionWalkable(player.x, player.y)) {
    movePlayerToNearestCellPoint();
  }

  if (GameState.scene === "office" && !isOfficePositionWalkable(player.x, player.y)) {
    movePlayerToNearestOfficePoint();
  }

  if (GameState.scene === "library" && !isLibraryPositionWalkable(player.x, player.y)) {
    movePlayerToNearestLibraryPoint();
  }
}

function movePlayerBy(dx, dy) {
  if (dx === 0 && dy === 0) {
    return true;
  }

  const player = GameState.player;
  const nextX = player.x + dx;
  const nextY = player.y + dy;

  if (GameState.scene === "cellCorridor") {
    if (isCorridorPositionWalkable(nextX, nextY)) {
      player.x = nextX;
      player.y = nextY;
      updateCorridorCamera();
      return true;
    }
    return false;
  }

  if (GameState.scene === "cell") {
    if (isCellPositionWalkable(nextX, nextY)) {
      player.x = nextX;
      player.y = nextY;
      return true;
    }
    return false;
  }

  if (GameState.scene === "solitary") {
    if (isSolitaryPositionWalkable(nextX, nextY)) {
      player.x = nextX;
      player.y = nextY;
      return true;
    }
    return false;
  }

  if (GameState.scene === "yard") {
    if (isYardPositionWalkable(nextX, nextY)) {
      player.x = nextX;
      player.y = nextY;
      updateYardCamera();
      return true;
    }
    return false;
  }

  if (GameState.scene === "office") {
    if (isOfficePositionWalkable(nextX, nextY)) {
      player.x = nextX;
      player.y = nextY;
      return true;
    }
    return false;
  }

  if (GameState.scene === "library") {
    if (isLibraryPositionWalkable(nextX, nextY)) {
      player.x = nextX;
      player.y = nextY;
      return true;
    }
    return false;
  }

  player.x = nextX;
  player.y = nextY;
  clampPlayerToWorld();
  return true;
}

function getPlayerFootPoint(x, y) {
  return {
    x: x + GameState.player.w / 2,
    y: y + GameState.player.h - 8
  };
}

function isCellPositionWalkable(x, y) {
  const foot = canvasPointToCellImage(getPlayerFootPoint(x, y));
  if (!foot) {
    return false;
  }

  return isCellNpcPointWalkable(foot.x, foot.y);
}

function isCellNpcPointWalkable(x, y) {
  const point = { x, y };
  return pointInPolygon(point, CellLayout.walkPolygon) &&
    !isPointInAnyRect(point, CellLayout.solidBlocks);
}

function isCellNarrativeWalkSegmentClear(from, target) {
  const segmentLength = distance(from.x, from.y, target.x, target.y);
  const steps = Math.max(1, Math.ceil(segmentLength / CELL_NARRATIVE_ROUTE_SAMPLE_DISTANCE));
  for (let index = 0; index <= steps; index += 1) {
    const progress = index / steps;
    const x = from.x + (target.x - from.x) * progress;
    const y = from.y + (target.y - from.y) * progress;
    if (!isCellNpcPointWalkable(x, y)) {
      return false;
    }
  }
  return true;
}

function movePlayerToNearestCellPoint() {
  const player = GameState.player;
  const imagePoint = canvasPointToCellImage(getPlayerFootPoint(player.x, player.y)) || { x: 620, y: 920 };
  let bestPoint = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let y = 300; y <= 1104; y += 16) {
    for (let x = 184; x <= 1084; x += 16) {
      const point = { x, y };
      if (pointInPolygon(point, CellLayout.walkPolygon) && !isPointInAnyRect(point, CellLayout.solidBlocks)) {
        const pointDistance = distance(imagePoint.x, imagePoint.y, point.x, point.y);
        if (pointDistance < bestDistance) {
          bestDistance = pointDistance;
          bestPoint = point;
        }
      }
    }
  }

  if (bestPoint) {
    setPlayerFootToCellImage(bestPoint.x, bestPoint.y);
  }
}

function isPlayerNearCellBed() {
  const foot = canvasPointToCellImage(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  return Boolean(foot && pointInRect(foot, CellLayout.bedInteractZone));
}

function isPlayerNearCellDoor() {
  const foot = canvasPointToCellImage(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  return Boolean(foot && pointInRect(foot, CellLayout.doorZone));
}

function isOfficePositionWalkable(x, y) {
  const foot = canvasPointToOfficeImage(getPlayerFootPoint(x, y));
  if (!foot) {
    return false;
  }

  if (!pointInPolygon(foot, OfficeLayout.walkPolygon)) {
    return false;
  }

  return !isPointInAnyRect(foot, OfficeLayout.obstacleRects);
}

function movePlayerToNearestOfficePoint() {
  const player = GameState.player;
  const imagePoint = canvasPointToOfficeImage(getPlayerFootPoint(player.x, player.y)) || OfficeLayout.spawnFoot;
  let bestPoint = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let y = 320; y <= 1072; y += 16) {
    for (let x = 154; x <= 1032; x += 16) {
      const point = { x, y };
      if (pointInPolygon(point, OfficeLayout.walkPolygon) && !isPointInAnyRect(point, OfficeLayout.obstacleRects)) {
        const pointDistance = distance(imagePoint.x, imagePoint.y, point.x, point.y);
        if (pointDistance < bestDistance) {
          bestDistance = pointDistance;
          bestPoint = point;
        }
      }
    }
  }

  if (bestPoint) {
    setPlayerFootToOfficeImage(bestPoint.x, bestPoint.y);
  }
}

function isLibraryPositionWalkable(x, y) {
  const foot = canvasPointToLibraryImage(getPlayerFootPoint(x, y));
  if (!foot) {
    return false;
  }

  return pointInPolygon(foot, LibraryLayout.walkPolygon) &&
    !isPointInAnyRect(foot, LibraryLayout.obstacleRects);
}

function movePlayerToNearestLibraryPoint() {
  const player = GameState.player;
  const imagePoint = canvasPointToLibraryImage(getPlayerFootPoint(player.x, player.y)) || LibraryLayout.spawnFoot;
  let bestPoint = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let y = 284; y <= 1084; y += 16) {
    for (let x = 168; x <= 1086; x += 16) {
      const point = { x, y };
      if (pointInPolygon(point, LibraryLayout.walkPolygon) && !isPointInAnyRect(point, LibraryLayout.obstacleRects)) {
        const pointDistance = distance(imagePoint.x, imagePoint.y, point.x, point.y);
        if (pointDistance < bestDistance) {
          bestDistance = pointDistance;
          bestPoint = point;
        }
      }
    }
  }

  if (bestPoint) {
    setPlayerFootToLibraryImage(bestPoint.x, bestPoint.y);
  }
}

function getActiveOfficeInteraction() {
  if (GameState.scene !== "office" || GameState.office.safeViewOpen) {
    return null;
  }

  const foot = canvasPointToOfficeImage(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  if (!foot) {
    return null;
  }

  if (isSideRouteOfficeActive()) {
    if ((GameState.sideRoute.officePhase === "search" || GameState.sideRoute.officePhase === "searchAgain") &&
      pointInRect(foot, SideRouteOfficeLayout.deskZone)) {
      return { id: "sideRouteDesk" };
    }
    if (GameState.sideRoute.officePhase === "hideCountdown" && pointInRect(foot, SideRouteOfficeLayout.curtainZone)) {
      return { id: "sideRouteCurtain" };
    }
    return null;
  }

  if (isFreeOfficeMode()) {
    if (GameState.office.mode === "inspectionCountdown" &&
      pointInRect(foot, SideRouteOfficeLayout.curtainZone)) {
      return { id: "freeOfficeCurtain" };
    }
    if ((GameState.office.mode === "freeExplore" || GameState.office.mode === "inspectionComplete") &&
      pointInRect(foot, OfficeLayout.doorZone)) {
      return { id: "door" };
    }
    return null;
  }

  if (GameState.office.wardenPhase === "waiting" && distance(foot.x, foot.y, GameState.office.wardenX, GameState.office.wardenY) <= 130) {
    return { id: "warden" };
  }

  if (!GameState.ledgerSwapped && GameState.office.wardenPhase === "gone" && pointInRect(foot, OfficeLayout.embroideryZone)) {
    return { id: "embroidery" };
  }

  if (GameState.ledgerSwapped &&
    !GameState.secrets.officeSecretRead &&
    pointInRect(foot, SideRouteOfficeLayout.deskZone)) {
    return { id: "deskSecret" };
  }

  if (GameState.ledgerSwapped && pointInRect(foot, OfficeLayout.doorZone)) {
    return { id: "door" };
  }

  return null;
}

function toggleBedRest() {
  const player = GameState.player;
  if (player.lyingInBed) {
    standUpFromBed();
    return;
  }

  if (!canRestAtCellBed()) {
    return;
  }

  if (GameState.hasAttributeD && !GameState.twentyYearsPassed) {
    rememberPlayerPositionBeforeSleep();
    lieDownInBed();
    changeScene("montage");
    return;
  }

  if (canStartInitialCellInspection()) {
    startCellInspection();
  }
}

function lieDownInBed() {
  const player = GameState.player;
  const pillow = cellImageRectToCanvas(CellLayout.bedPillow);
  player.lyingInBed = true;
  player.vx = 0;
  player.vy = 0;
  player.isMoving = false;
  player.walkAnimTime = 0;
  player.facing = "right";
  // 睡姿头部位于横向精灵的左端，贴合床头的枕头。
  player.x = pillow.x;
  player.y = pillow.y + pillow.h / 2 - BED_LYING_PLAYER_HEIGHT / 2;
}

function standUpFromBed() {
  const player = GameState.player;
  player.lyingInBed = false;
  player.vx = 0;
  player.vy = 0;
  player.isMoving = false;
  player.walkAnimTime = 0;
  player.facing = "down";
  setPlayerFootToCellImage(
    CellLayout.bedInteractZone.x + CellLayout.bedInteractZone.w / 2,
    CellLayout.bedInteractZone.y + CellLayout.bedInteractZone.h / 2
  );
}

function rememberPlayerPositionBeforeSleep() {
  const player = GameState.player;
  GameState.sleepReturnPosition = {
    scene: GameState.scene,
    x: player.x,
    y: player.y,
    facing: player.facing
  };
}

function restorePlayerPositionAfterSleep() {
  const savedPosition = GameState.sleepReturnPosition;
  GameState.sleepReturnPosition = null;
  if (!savedPosition || savedPosition.scene !== GameState.scene) {
    return false;
  }

  const player = GameState.player;
  player.x = savedPosition.x;
  player.y = savedPosition.y;
  player.vx = 0;
  player.vy = 0;
  player.lyingInBed = false;
  player.isMoving = false;
  player.walkAnimTime = 0;
  player.facing = savedPosition.facing;
  // 原位置本身可通行；仍做边界保护，避免旧进度或异常坐标让角色卡进障碍物。
  clampPlayerToWorld();
  return true;
}

function placePlayerAtCellInspectionStandPoint() {
  const player = GameState.player;
  player.lyingInBed = false;
  player.vx = 0;
  player.vy = 0;
  player.isMoving = false;
  player.walkAnimTime = 0;
  player.facing = "up";
  setPlayerFootToCellImage(
    CellLayout.inspectionStandPoint.x,
    CellLayout.inspectionStandPoint.y
  );
}

function pointInRect(point, rect) {
  return point.x >= rect.x &&
    point.x <= rect.x + rect.w &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.h;
}

function pointInEllipse(point, rect) {
  const radiusX = rect.w / 2;
  const radiusY = rect.h / 2;
  if (radiusX <= 0 || radiusY <= 0) {
    return false;
  }

  const normalizedX = (point.x - (rect.x + radiusX)) / radiusX;
  const normalizedY = (point.y - (rect.y + radiusY)) / radiusY;
  return normalizedX * normalizedX + normalizedY * normalizedY <= 1;
}

function isPointInAnyRect(point, rects) {
  return rects.some((rect) => pointInRect(point, rect));
}

function pointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const pi = polygon[i];
    const pj = polygon[j];
    const intersects = (pi.y > point.y) !== (pj.y > point.y) &&
      point.x < (pj.x - pi.x) * (point.y - pi.y) / (pj.y - pi.y) + pi.x;
    if (intersects) {
      inside = !inside;
    }
  }
  return inside;
}

function isPointOnPolygonEdge(point, polygon, tolerance) {
  const toleranceSquared = tolerance * tolerance;
  for (let index = 0; index < polygon.length; index += 1) {
    const start = polygon[index];
    const end = polygon[(index + 1) % polygon.length];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const lengthSquared = dx * dx + dy * dy;
    const ratio = lengthSquared === 0 ? 0 : clamp(
      ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared,
      0,
      1
    );
    const nearestX = start.x + dx * ratio;
    const nearestY = start.y + dy * ratio;
    const distanceSquared = (point.x - nearestX) ** 2 + (point.y - nearestY) ** 2;
    if (distanceSquared <= toleranceSquared) {
      return true;
    }
  }
  return false;
}

function getCellImageRect() {
  return getAssetContainRect("cell", CellLayout.imageWidth, CellLayout.imageHeight);
}

function getDigImageRect() {
  const layout = getCurrentDigLayout();
  return getAssetContainRect(getCurrentDigAssetKey(), layout.imageWidth, layout.imageHeight);
}

function getAssetContainRect(assetKey, fallbackWidth, fallbackHeight) {
  const record = getImageAssetRecord(assetKey);
  const sourceWidth = record && record.loaded && !record.failed ? getSourceWidth(record.element) : fallbackWidth;
  const sourceHeight = record && record.loaded && !record.failed ? getSourceHeight(record.element) : fallbackHeight;
  const scale = Math.min(CANVAS_WIDTH / sourceWidth, CANVAS_HEIGHT / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;

  return {
    x: (CANVAS_WIDTH - width) / 2,
    y: (CANVAS_HEIGHT - height) / 2,
    w: width,
    h: height,
    scale,
    sourceWidth,
    sourceHeight
  };
}

function canvasPointToCellImage(point) {
  const rect = getCellImageRect();
  if (point.x < rect.x || point.x > rect.x + rect.w || point.y < rect.y || point.y > rect.y + rect.h) {
    return null;
  }

  return {
    x: (point.x - rect.x) / rect.scale,
    y: (point.y - rect.y) / rect.scale
  };
}

function cellImageToCanvasPoint(x, y) {
  const rect = getCellImageRect();
  return {
    x: rect.x + x * rect.scale,
    y: rect.y + y * rect.scale
  };
}

function cellImageRectToCanvas(rect) {
  const topLeft = cellImageToCanvasPoint(rect.x, rect.y);
  const scale = getCellImageRect().scale;
  return {
    x: topLeft.x,
    y: topLeft.y,
    w: rect.w * scale,
    h: rect.h * scale
  };
}

function digImageToCanvasPoint(x, y) {
  const rect = getDigImageRect();
  return {
    x: rect.x + x * rect.scale,
    y: rect.y + y * rect.scale
  };
}

function digImageRectToCanvas(rect) {
  const topLeft = digImageToCanvasPoint(rect.x, rect.y);
  const scale = getDigImageRect().scale;
  return {
    x: topLeft.x,
    y: topLeft.y,
    w: rect.w * scale,
    h: rect.h * scale
  };
}

function getPipeImageRect() {
  return getAssetContainRect(getCurrentPipeAssetKey(), PipeLayout.imageWidth, PipeLayout.imageHeight);
}

function pipeImageToCanvasPoint(x, y) {
  const rect = getPipeImageRect();
  return {
    x: rect.x + x * rect.scale,
    y: rect.y + y * rect.scale
  };
}

function pipeImageRectToCanvas(rect) {
  const topLeft = pipeImageToCanvasPoint(rect.x, rect.y);
  const scale = getPipeImageRect().scale;
  return {
    x: topLeft.x,
    y: topLeft.y,
    w: rect.w * scale,
    h: rect.h * scale
  };
}

function getOfficeImageRect() {
  return getAssetContainRect("office", OfficeLayout.imageWidth, OfficeLayout.imageHeight);
}

function getLibraryImageRect() {
  return getAssetContainRect("library", LibraryLayout.imageWidth, LibraryLayout.imageHeight);
}

function canvasPointToLibraryImage(point) {
  const rect = getLibraryImageRect();
  if (point.x < rect.x || point.x > rect.x + rect.w || point.y < rect.y || point.y > rect.y + rect.h) {
    return null;
  }

  return {
    x: (point.x - rect.x) / rect.scale,
    y: (point.y - rect.y) / rect.scale
  };
}

function libraryImageToCanvasPoint(x, y) {
  const rect = getLibraryImageRect();
  return {
    x: rect.x + x * rect.scale,
    y: rect.y + y * rect.scale
  };
}

function libraryImageRectToCanvas(rect) {
  const topLeft = libraryImageToCanvasPoint(rect.x, rect.y);
  const scale = getLibraryImageRect().scale;
  return {
    x: topLeft.x,
    y: topLeft.y,
    w: rect.w * scale,
    h: rect.h * scale
  };
}

function canvasPointToOfficeImage(point) {
  const rect = getOfficeImageRect();
  if (point.x < rect.x || point.x > rect.x + rect.w || point.y < rect.y || point.y > rect.y + rect.h) {
    return null;
  }

  return {
    x: (point.x - rect.x) / rect.scale,
    y: (point.y - rect.y) / rect.scale
  };
}

function officeImageToCanvasPoint(x, y) {
  const rect = getOfficeImageRect();
  return {
    x: rect.x + x * rect.scale,
    y: rect.y + y * rect.scale
  };
}

function officeImageRectToCanvas(rect) {
  const topLeft = officeImageToCanvasPoint(rect.x, rect.y);
  const scale = getOfficeImageRect().scale;
  return {
    x: topLeft.x,
    y: topLeft.y,
    w: rect.w * scale,
    h: rect.h * scale
  };
}

function setPlayerFootToOfficeImage(x, y) {
  const foot = officeImageToCanvasPoint(x, y);
  GameState.player.x = foot.x - GameState.player.w / 2;
  GameState.player.y = foot.y - GameState.player.h + 8;
  GameState.player.vx = 0;
  GameState.player.vy = 0;
  GameState.player.isMoving = false;
  GameState.player.walkAnimTime = 0;
}

function setPlayerFootToLibraryImage(x, y) {
  const foot = libraryImageToCanvasPoint(x, y);
  GameState.player.x = foot.x - GameState.player.w / 2;
  GameState.player.y = foot.y - GameState.player.h + 8;
  GameState.player.vx = 0;
  GameState.player.vy = 0;
  GameState.player.isMoving = false;
  GameState.player.walkAnimTime = 0;
}

function setPlayerFootToCellImage(x, y) {
  const foot = cellImageToCanvasPoint(x, y);
  GameState.player.x = foot.x - GameState.player.w / 2;
  GameState.player.y = foot.y - GameState.player.h + 8;
}

function getYardWorldSize() {
  const layout = isOpeningYardArrival() ? OpeningYardLayout : YardLayout;
  return {
    w: layout.imageWidth * YARD_WORLD_SCALE,
    h: layout.imageHeight * YARD_WORLD_SCALE
  };
}

function yardWorldToImagePoint(point) {
  return {
    x: point.x / YARD_WORLD_SCALE,
    y: point.y / YARD_WORLD_SCALE
  };
}

function yardImageToWorldPoint(x, y) {
  return {
    x: x * YARD_WORLD_SCALE,
    y: y * YARD_WORLD_SCALE
  };
}

function setPlayerFootToYardImage(x, y) {
  const foot = yardImageToWorldPoint(x, y);
  GameState.player.x = foot.x - GameState.player.w / 2;
  GameState.player.y = foot.y - GameState.player.h + 8;
  GameState.player.vx = 0;
  GameState.player.vy = 0;
  GameState.player.isMoving = false;
  GameState.player.walkAnimTime = 0;
}

function yardImagePointToScreen(x, y) {
  const world = yardImageToWorldPoint(x, y);
  return {
    x: world.x - GameState.camera.x,
    y: world.y - GameState.camera.y
  };
}


function isYardPositionWalkable(x, y) {
  const foot = yardWorldToImagePoint(getPlayerFootPoint(x, y));
  return isYardFootPointWalkable(foot);
}

function isYardFootPointWalkable(point) {
  // 首次进入院子也复用完整院子的通行区域和障碍物，墙体、桌椅、水桶均不可穿过。
  if (isPointOnPolygonEdge(point, YardLayout.walkPolygon, YARD_FOOT_EDGE_TOLERANCE) ||
    !pointInPolygon(point, YardLayout.walkPolygon)) {
    return false;
  }

  return !isPointInAnyRect(point, YardLayout.obstacleRects) &&
    !YardLayout.obstacleCircles.some((circle) => distance(point.x, point.y, circle.x, circle.y) <= circle.r);
}

function getActiveYardInteraction() {
  if (GameState.scene !== "yard") {
    return null;
  }

  const foot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  if (GameState.sideRoute.active) {
    if (GameState.sideRoute.stage === "libraryTalk" &&
      distance(foot.x, foot.y, GameState.brooksNpc.x, GameState.brooksNpc.y) <= 126) {
      return { id: "sideRouteBrooks" };
    }
    if (GameState.sideRoute.stage === "returnToCellSleep" &&
      isPointInYardInteraction(foot, getYardInteraction("cellDoor"))) {
      return { id: "sideRouteCellDoor" };
    }
    if (GameState.sideRoute.stage === "morningPatrol") {
      const gateGuard = getNearbySideRouteGateGuardInteraction(foot);
      if (gateGuard) {
        return gateGuard;
      }
      if (isPointInYardInteraction(foot, getYardInteraction("prisonGate"))) {
        return { id: "sideRouteGate" };
      }
      if (isPointInYardInteraction(foot, getYardInteraction("wardenOffice"))) {
        return { id: "sideRouteOffice" };
      }
    }
    return null;
  }
  if (isOpeningYardArrival()) {
    return pointInRect(foot, OpeningYardLayout.gateZone) ? { id: "prisonGate", label: "离开" } : null;
  }

  // 倒土任务期间，泥地区域拥有最高交互优先级；站在区域内不会误触附近人物或看守对话。
  const soilInteraction = getYardInteraction("soil");
  if (GameState.hasSoilPile && soilInteraction && isPointInYardInteraction(foot, soilInteraction)) {
    return soilInteraction;
  }

  const npcInteraction = getNearbyYardNpcInteraction(foot);
  if (npcInteraction) {
    return npcInteraction;
  }

  const interaction = YardLayout.interactions.find((item) => isPointInYardInteraction(foot, item)) || null;
  if (interaction && interaction.id === "prisonGate" && !isPrisonGateEscapeAvailable()) {
    return null;
  }
  if (interaction && interaction.id === "soil" && !GameState.hasSoilPile) {
    return null;
  }
  if (interaction && interaction.id === "library" &&
    (GameState.twentyYearsPassed || isBrooksEnteringLibrary())) {
    return null;
  }
  return interaction;
}

function isPrisonGateEscapeAvailable() {
  return GameState.opening.gateEscapeAvailable &&
    !GameState.hasHammer &&
    !GameState.hasBible &&
    !GameState.redHammerDelivered &&
    !GameState.brooksBibleDelivered;
}

function isOpeningYardArrival() {
  return GameState.scene === "yard" &&
    GameState.previousScene === "whiteLight" &&
    GameState.opening.gateEscapeAvailable;
}

function startPrisonGateEscape() {
  GameState.opening.gateEscapeAvailable = false;
  changeScene("gateBlackout");
}

function getNearbyYardNpcInteraction(foot) {
  const candidates = [{ id: "red", label: "与瑞德交谈", npc: GameState.redNpc, range: 86 }];
  if (!GameState.twentyYearsPassed && !GameState.libraryTask.brooksInside &&
    GameState.brooksNpc.mode === "patrol") {
    candidates.push({ id: "brooks", label: "与老布交谈", npc: GameState.brooksNpc, range: 70 });
  }
  GameState.yardPrisoners.forEach((prisoner) => {
    if ((prisoner.assetKey === "tommy" || prisoner.assetKey === "haywood" || prisoner.assetKey === "floyd") &&
      canStartSideTalk(prisoner.assetKey)) {
      candidates.push({
        id: prisoner.assetKey,
        label: "与" + prisoner.name + "交谈",
        npc: prisoner,
        range: 74
      });
    }
  });
  const soilInteraction = getYardInteraction("soil");
  if (canStartGuardConversation() && soilInteraction) {
    GameState.yardGuards.forEach((guard, index) => {
      if (isPointInYardInteraction({ x: guard.x, y: guard.y }, soilInteraction)) {
        candidates.push({
          id: "yardGuard",
          label: "与巡逻看守交谈",
          npc: guard,
          range: 74,
          guardIndex: index
        });
      }
    });
  }
  const nearby = candidates
    .filter((item) => item.npc && distance(foot.x, foot.y, item.npc.x, item.npc.y) <= item.range)
    .sort((first, second) =>
      distance(foot.x, foot.y, first.npc.x, first.npc.y) -
      distance(foot.x, foot.y, second.npc.x, second.npc.y)
    )[0];
  return nearby ? { id: nearby.id, label: nearby.label, guardIndex: nearby.guardIndex } : null;
}

function getNearbySideRouteGateGuardInteraction(foot) {
  if (!canStartGuardConversation()) {
    return null;
  }
  const nearby = GameState.yardGuards
    .map((guard, index) => ({ guard, index }))
    .filter((item) => distance(foot.x, foot.y, item.guard.x, item.guard.y) <= 76)
    .sort((first, second) =>
      distance(foot.x, foot.y, first.guard.x, first.guard.y) -
      distance(foot.x, foot.y, second.guard.x, second.guard.y)
    )[0];
  return nearby ? { id: "sideRouteGuard", label: "与大门看守交谈", guardIndex: nearby.index } : null;
}

function getYardInteraction(interactionId) {
  return YardLayout.interactions.find((item) => item.id === interactionId) || null;
}

function isPointInYardInteraction(point, interaction) {
  if (interaction && interaction.shape === "ellipse") {
    return pointInEllipse(point, interaction.rect);
  }
  return Boolean(interaction && pointInRect(point, interaction.rect));
}

function getActiveLibraryInteraction() {
  if (GameState.scene !== "library") {
    return null;
  }

  const foot = canvasPointToLibraryImage(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  if (!foot) {
    return null;
  }

  if (pointInRect(foot, LibraryLayout.exitZone)) {
    return { id: "exit" };
  }

  if (isBrooksWaitingInLibrary() &&
    distance(foot.x, foot.y, LibraryLayout.brooks.x, LibraryLayout.brooks.y) <= 126) {
    return { id: "brooks" };
  }

  return null;
}

function movePlayerToNearestYardPoint() {
  const player = GameState.player;
  const imagePoint = yardWorldToImagePoint(getPlayerFootPoint(player.x, player.y));
  const bounds = getYardWalkBounds();
  let bestPoint = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let y = bounds.minY; y <= bounds.maxY; y += 18) {
    for (let x = bounds.minX; x <= bounds.maxX; x += 18) {
      const point = { x, y };
      if (isYardFootPointWalkable(point)) {
        const pointDistance = distance(imagePoint.x, imagePoint.y, point.x, point.y);
        if (pointDistance < bestDistance) {
          bestDistance = pointDistance;
          bestPoint = point;
        }
      }
    }
  }

  if (bestPoint) {
    setPlayerFootToYardImage(bestPoint.x, bestPoint.y);
  }
}

function initializeYardPrisoners() {
  const prisonerCount = YardRandomPrisonerConfigs.length;
  if (GameState.yardPrisoners.length === prisonerCount) {
    return;
  }

  GameState.yardPrisoners = [];
  YardRandomPrisonerConfigs.forEach((config, index) => {
    const startPoint = { x: config.x, y: config.y };
    const point = isYardNpcPointWalkable(startPoint.x, startPoint.y) ? startPoint : getRandomYardWalkPoint();
    const prisoner = {
      assetKey: config.assetKey,
      x: point.x,
      y: point.y,
      targetX: point.x,
      targetY: point.y,
      h: config.h || YARD_CHARACTER_HEIGHT,
      name: config.name || "",
      patrolBounds: config.patrolBounds || null,
      minTargetDistance: config.minTargetDistance || YARD_RANDOM_PRISONER_MIN_TARGET_DISTANCE,
      restMinSeconds: typeof config.restMinSeconds === "number" ? config.restMinSeconds : YARD_RANDOM_PRISONER_REST_MIN_SECONDS,
      restMaxSeconds: typeof config.restMaxSeconds === "number" ? config.restMaxSeconds : YARD_RANDOM_PRISONER_REST_MAX_SECONDS,
      walkFrameSeconds: config.walkFrameSeconds || PRISONER_WALK_FRAME_SECONDS,
      idleFrameIndex: typeof config.idleFrameIndex === "number" ? config.idleFrameIndex : 1,
      speed: randomRange(config.minSpeed || YARD_RANDOM_PRISONER_MIN_SPEED, config.maxSpeed || YARD_RANDOM_PRISONER_MAX_SPEED),
      waitTimer: randomRange(0, typeof config.restMaxSeconds === "number" ? config.restMaxSeconds : YARD_RANDOM_PRISONER_REST_MAX_SECONDS),
      facing: ["down", "right", "up", "left"][index % 4],
      isMoving: false,
      ambientRestTarget: false,
      walkAnimTime: randomRange(0, PRISONER_WALK_FRAME_SECONDS * 4)
    };
    chooseYardPrisonerTarget(prisoner);
    GameState.yardPrisoners.push(prisoner);
  });
}

function updateYardPrisoners(dt) {
  initializeYardPrisoners();

  GameState.yardPrisoners.forEach((prisoner) => {
    if (GameState.sideTalk.activeNpcId === prisoner.assetKey ||
      isAmbientConversationParticipant(prisoner.assetKey)) {
      prisoner.isMoving = false;
      return;
    }
    if (prisoner.waitTimer > 0) {
      prisoner.waitTimer = Math.max(0, prisoner.waitTimer - dt);
      prisoner.isMoving = false;
      return;
    }

    const dx = prisoner.targetX - prisoner.x;
    const dy = prisoner.targetY - prisoner.y;
    const remaining = Math.hypot(dx, dy);
    if (remaining <= 8) {
      prisoner.isMoving = false;
      prisoner.waitTimer = prisoner.ambientRestTarget ?
        randomRange(AMBIENT_SOCIAL_REST_MIN_SECONDS, AMBIENT_SOCIAL_REST_MAX_SECONDS) :
        randomRange(prisoner.restMinSeconds, prisoner.restMaxSeconds);
      prisoner.ambientRestTarget = false;
      chooseYardPrisonerTarget(prisoner);
      return;
    }

    const step = Math.min(remaining, prisoner.speed * dt);
    const nextX = prisoner.x + dx / remaining * step;
    const nextY = prisoner.y + dy / remaining * step;
    if (!isYardNpcPointWalkable(nextX, nextY)) {
      prisoner.isMoving = false;
      prisoner.waitTimer = randomRange(prisoner.restMinSeconds, prisoner.restMaxSeconds);
      chooseYardPrisonerTarget(prisoner);
      return;
    }

    prisoner.x = nextX;
    prisoner.y = nextY;
    prisoner.facing = directionFromDelta(dx, dy);
    prisoner.isMoving = true;
    prisoner.walkAnimTime += dt;
  });
}

function chooseYardPrisonerTarget(prisoner) {
  const socialTarget = getAmbientSocialTarget(prisoner.assetKey);
  if (socialTarget) {
    prisoner.targetX = socialTarget.x;
    prisoner.targetY = socialTarget.y;
    prisoner.ambientRestTarget = true;
    return;
  }
  prisoner.ambientRestTarget = false;
  let target = { x: prisoner.x, y: prisoner.y };
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const point = getRandomYardWalkPoint(prisoner.patrolBounds);
    if (distance(prisoner.x, prisoner.y, point.x, point.y) >= prisoner.minTargetDistance) {
      target = point;
      break;
    }
  }

  prisoner.targetX = target.x;
  prisoner.targetY = target.y;
}

function getRandomYardWalkPoint(boundsOverride) {
  const bounds = boundsOverride || getYardWalkBounds();
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const point = {
      x: randomRange(bounds.minX, bounds.maxX),
      y: randomRange(bounds.minY, bounds.maxY)
    };
    if (isYardNpcPointWalkable(point.x, point.y)) {
      return point;
    }
  }

  return { x: YardLayout.entryPoint.x, y: YardLayout.entryPoint.y };
}

function getYardWalkBounds() {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  YardLayout.walkPolygon.forEach((point) => {
    minX = Math.min(minX, point.x);
    minY = Math.min(minY, point.y);
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  });

  return { minX, minY, maxX, maxY };
}

function isYardNpcPointWalkable(x, y) {
  return isYardFootPointWalkable({ x, y });
}

function updateYardGuards(dt) {
  const soilInteraction = getYardInteraction("soil");
  if (!soilInteraction) {
    return;
  }
  const playerFoot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));

  GameState.yardGuards.forEach((guard, index) => {
    if (isGuardConversationTarget("yard", index) ||
      isAmbientConversationParticipant("guard:" + index)) {
      guard.isMoving = false;
      return;
    }
    if ((guard.ambientRestTimer || 0) > 0) {
      guard.ambientRestTimer = Math.max(0, guard.ambientRestTimer - dt);
      guard.isMoving = false;
      guard.walkAnimTime = 0;
      return;
    }
    guard.turnTimer = Math.max(0, (guard.turnTimer || 0) - dt);
    const investigatingSoilDump = updateYardGuardSoilInvestigation(guard, soilInteraction, playerFoot);

    if (investigatingSoilDump) {
      guard.targetX = playerFoot.x;
      guard.targetY = playerFoot.y;
      guard.speed = YARD_GUARD_SOIL_INVESTIGATE_SPEED;
      guard.speedTimer = 0;
    } else if (!guard.targetX || !guard.targetY) {
      chooseYardGuardTarget(guard, soilInteraction);
      chooseYardGuardSpeed(guard);
    }

    if (!investigatingSoilDump) {
      guard.speedTimer -= dt;
    }
    if (!investigatingSoilDump && guard.speedTimer <= 0) {
      chooseYardGuardSpeed(guard);
    }

    const dx = guard.targetX - guard.x;
    const dy = guard.targetY - guard.y;
    const remaining = Math.hypot(dx, dy);
    if (remaining <= 8) {
      guard.isMoving = false;
      updateYardGuardVisualFacing(guard, guard.facing || guard.visualFacing || "down");
      if (!investigatingSoilDump) {
        if (guard.ambientRestTarget) {
          guard.ambientRestTarget = false;
          guard.ambientRestTimer = randomRange(
            AMBIENT_SOCIAL_REST_MIN_SECONDS,
            AMBIENT_SOCIAL_REST_MAX_SECONDS
          );
        } else {
          chooseYardGuardTarget(guard, soilInteraction);
        }
      }
      return;
    }

    const step = Math.min(remaining, guard.speed * dt);
    const nextX = guard.x + dx / remaining * step;
    const nextY = guard.y + dy / remaining * step;
    if (!isYardNpcPointWalkable(nextX, nextY)) {
      guard.isMoving = false;
      guard.investigatingSoilDump = false;
      chooseYardGuardTarget(guard, soilInteraction);
      return;
    }
    guard.x = nextX;
    guard.y = nextY;
    updateYardGuardVisualFacing(guard, directionFromDelta(dx, dy));
    guard.isMoving = step > 0.01;
    guard.walkAnimTime = (guard.walkAnimTime || 0) + dt * clamp(
      guard.speed / YARD_GUARD_FAST_SPEED,
      GUARD_WALK_MIN_ANIM_SPEED,
      GUARD_WALK_MAX_ANIM_SPEED
    );
  });
}

function updateYardGuardSoilInvestigation(guard, soilInteraction, playerFoot) {
  const shouldInvestigate = guard.investigatingSoilDump &&
    GameState.soilDump.active &&
    GameState.hasSoilPile &&
    isPointInYardInteraction(playerFoot, soilInteraction);
  if (!shouldInvestigate) {
    guard.investigatingSoilDump = false;
  }
  return shouldInvestigate;
}

function updateYardGuardVisualFacing(guard, nextFacing) {
  const currentFacing = guard.facing || guard.visualFacing || "down";
  if (nextFacing && nextFacing !== currentFacing) {
    if (isSideFacingFlip(currentFacing, nextFacing)) {
      guard.visualFacing = "down";
      guard.turnTimer = GUARD_SIDE_TURN_SECONDS;
    } else if ((guard.turnTimer || 0) <= 0) {
      guard.visualFacing = nextFacing;
    }
    guard.facing = nextFacing;
  }

  if ((guard.turnTimer || 0) <= 0) {
    guard.visualFacing = guard.facing || nextFacing || guard.visualFacing || "down";
  }
}

function isSideFacingFlip(fromFacing, toFacing) {
  return (fromFacing === "left" && toFacing === "right") ||
    (fromFacing === "right" && toFacing === "left");
}

function chooseYardGuardTarget(guard, soilInteraction) {
  const socialTarget = getAmbientSocialTarget("guard");
  if (socialTarget && isPointInYardInteraction(socialTarget, soilInteraction)) {
    guard.targetX = socialTarget.x;
    guard.targetY = socialTarget.y;
    guard.ambientRestTarget = true;
    return;
  }
  guard.ambientRestTarget = false;
  const soilRect = soilInteraction.rect;
  const marginX = 46;
  const marginY = 54;
  const minTargetDistance = 150;
  const minGuardTargetSeparation = 120;
  let nextX = guard.x;
  let nextY = guard.y;

  for (let attempt = 0; attempt < 12; attempt += 1) {
    nextX = randomRange(soilRect.x + marginX, soilRect.x + soilRect.w - marginX);
    nextY = randomRange(soilRect.y + marginY, soilRect.y + soilRect.h - marginY);

    const farEnough = distance(guard.x, guard.y, nextX, nextY) >= minTargetDistance;
    const notCrowded = GameState.yardGuards.every((otherGuard) => {
      if (otherGuard === guard) {
        return true;
      }
      const otherX = otherGuard.targetX || otherGuard.x;
      const otherY = otherGuard.targetY || otherGuard.y;
      return distance(otherX, otherY, nextX, nextY) >= minGuardTargetSeparation;
    });

    if (farEnough && notCrowded &&
      isPointInYardInteraction({ x: nextX, y: nextY }, soilInteraction) &&
      isYardNpcPointWalkable(nextX, nextY)) {
      guard.targetX = nextX;
      guard.targetY = nextY;
      return;
    }
  }

  // 采样未找到合适落点时留在原地，下一帧会重新抽取目标。
  guard.targetX = guard.x;
  guard.targetY = guard.y;
}

function chooseYardGuardSpeed(guard) {
  guard.fast = !guard.fast;
  guard.speed = guard.fast ? YARD_GUARD_FAST_SPEED : randomRange(YARD_GUARD_SLOW_SPEED_MIN, YARD_GUARD_SLOW_SPEED_MAX);
  guard.speedTimer = guard.fast ? randomRange(3.2, 5.2) : randomRange(4.5, 7.2);
}

function updateYardCamera() {
  if (GameState.scene !== "yard") {
    return;
  }

  const size = getYardWorldSize();
  const player = GameState.player;
  const targetX = player.x + player.w / 2 - CANVAS_WIDTH / 2;
  const targetY = player.y + player.h / 2 - CANVAS_HEIGHT / 2;

  GameState.camera.x = clamp(targetX, 0, Math.max(0, size.w - CANVAS_WIDTH));
  GameState.camera.y = clamp(targetY, 0, Math.max(0, size.h - CANVAS_HEIGHT));
}


function setOpeningPhase(phase) {
  GameState.opening.phase = phase;
  GameState.opening.timer = 0;
}

function getIntroImageRect() {
  return getAssetContainRect("menu_frame_01", IntroLayout.imageWidth, IntroLayout.imageHeight);
}

function mapIntroRectToCanvas(sourceRect) {
  const rect = getIntroImageRect();
  return {
    x: rect.x + sourceRect.x * rect.scale,
    y: rect.y + sourceRect.y * rect.scale,
    w: sourceRect.w * rect.scale,
    h: sourceRect.h * rect.scale
  };
}

function getIntroStartButtonRect() {
  return mapIntroRectToCanvas(IntroLayout.startButtonRect);
}

function getIntroPersonSecretRect() {
  return mapIntroRectToCanvas(IntroLayout.personSecretRect);
}

function getIntroNewGameButtonRect() {
  return mapIntroRectToCanvas(IntroLayout.newGameButtonRect);
}

function getIntroDeleteSaveButtonRect() {
  return mapIntroRectToCanvas(IntroLayout.deleteSaveButtonRect);
}

function getAvailableMenuChoices() {
  const resumeAvailable = CheckpointSystem.hasResume();
  const storedSaveAvailable = CheckpointSystem.hasStoredSave();
  if (resumeAvailable) {
    return [
      { id: "continue", label: TextData.continueGame, rect: getIntroStartButtonRect() },
      { id: "newGame", label: TextData.newGame, rect: getIntroNewGameButtonRect() },
      { id: "deleteSave", label: TextData.deleteSave, rect: getIntroDeleteSaveButtonRect(), destructive: true }
    ];
  }
  if (storedSaveAvailable) {
    return [
      { id: "start", label: TextData.start, rect: getIntroStartButtonRect() },
      { id: "deleteSave", label: TextData.deleteSave, rect: getIntroNewGameButtonRect(), destructive: true }
    ];
  }
  return [{ id: "start", label: TextData.start, rect: getIntroStartButtonRect() }];
}

function getDeleteSaveConfirmLayout() {
  return {
    panel: { x: 330, y: 178, w: 620, h: 364 },
    cancel: { x: 407, y: 426, w: 200, h: 70 },
    confirm: { x: 673, y: 426, w: 200, h: 70 }
  };
}

function closeDeleteSaveConfirmation() {
  GameState.opening.deleteConfirmOpen = false;
  GameState.opening.deleteConfirmSelection = "cancel";
}

function confirmDeleteSave() {
  closeDeleteSaveConfirmation();
  if (CheckpointSystem.deleteAllSaveData()) {
    GameState.opening.menuSelection = "start";
    GameState.opening.menuNotice = TextData.saveDeleted;
    GameState.opening.menuNoticeTimer = 2.5;
    return;
  }
  GameState.opening.menuNotice = TextData.saveDeleteFailed;
  GameState.opening.menuNoticeTimer = 2.5;
}

function handleDeleteSaveConfirmationInput() {
  const layout = getDeleteSaveConfirmLayout();
  if (InputSystem.isPressed("escape")) {
    closeDeleteSaveConfirmation();
    return;
  }
  if (InputSystem.isPressed("w") || InputSystem.isPressed("s") ||
    InputSystem.isPressed("a") || InputSystem.isPressed("d")) {
    GameState.opening.deleteConfirmSelection =
      GameState.opening.deleteConfirmSelection === "cancel" ? "confirm" : "cancel";
  }
  if (InputSystem.pointerJustPressed) {
    if (InputSystem.pointerInRect(layout.cancel)) {
      closeDeleteSaveConfirmation();
    } else if (InputSystem.pointerInRect(layout.confirm)) {
      confirmDeleteSave();
    } else if (!InputSystem.pointerInRect(layout.panel)) {
      closeDeleteSaveConfirmation();
    }
    return;
  }
  if (InputSystem.actionPressed("interact")) {
    if (GameState.opening.deleteConfirmSelection === "confirm") {
      confirmDeleteSave();
    } else {
      closeDeleteSaveConfirmation();
    }
  }
}

// ======================================================
// 13. Rendering Helpers
// ======================================================
function clearCanvas(ctx) {
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderMenu(ctx) {
  const frameIndex = Math.floor(GameState.opening.timer / MENU_FRAME_DURATION) % MENU_FRAME_SEQUENCE.length;
  renderIntroStill(ctx, MENU_FRAME_SEQUENCE[frameIndex]);
  renderMenuStartLabel(ctx);
  renderMenuVolumeHint(ctx);
  renderMenuNotice(ctx);
  if (GameState.opening.deleteConfirmOpen) {
    renderDeleteSaveConfirmation(ctx);
  }
}

function renderMenuStartLabel(ctx) {
  const cleanFrame = getImageAssetRecord("start_screen_selected");
  if (!cleanFrame || !cleanFrame.loaded || cleanFrame.failed) {
    return;
  }

  const imageRect = getIntroImageRect();
  const sourceRect = IntroLayout.choiceCleanRect;
  const targetRect = mapIntroRectToCanvas(sourceRect);

  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    cleanFrame.element,
    sourceRect.x,
    sourceRect.y,
    sourceRect.w,
    sourceRect.h,
    targetRect.x,
    targetRect.y,
    targetRect.w,
    targetRect.h
  );
  getAvailableMenuChoices().forEach((choice) => {
    renderAnimatedMenuChoice(
      ctx,
      choice.label,
      choice.rect,
      imageRect.scale,
      GameState.opening.menuSelection === choice.id,
      choice.destructive
    );
  });
  ctx.restore();
}

function renderAnimatedMenuChoice(ctx, label, rect, scale, selected, destructive) {
  const hovered = InputSystem.pointerInRect(rect);
  const active = hovered || selected;
  const frameIndex = Math.floor(GameState.opening.timer / MENU_FRAME_DURATION) % MENU_FRAME_SEQUENCE.length;
  const arrowOffset = (hovered ? 6 : 0) + frameIndex * Math.max(1, Math.round(2 * scale));
  const arrowX = rect.x + 20 * scale + arrowOffset;
  const centerY = rect.y + rect.h / 2;
  const arrowSize = Math.max(8, 12 * scale);

  if (active) {
    ctx.fillStyle = destructive ? (hovered ? "#ff9b8f" : "#d96455") : (hovered ? "#ffe18a" : "#e6c35e");
    ctx.beginPath();
    ctx.moveTo(arrowX + arrowSize, centerY);
    ctx.lineTo(arrowX, centerY - arrowSize);
    ctx.lineTo(arrowX, centerY + arrowSize);
    ctx.closePath();
    ctx.fill();
  }

  ctx.font = Math.max(24, Math.round(39 * scale)) + "px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.lineWidth = Math.max(2, Math.round(3 * scale));
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillStyle = destructive ? (active ? "#ffd0c8" : "#e8a39a") : (active ? "#fff1bd" : "#f3f3ee");
  const textX = rect.x + 60 * scale;
  ctx.strokeText(label, textX, centerY);
  ctx.fillText(label, textX, centerY);
}

function renderMenuNotice(ctx) {
  if (!GameState.opening.menuNotice || GameState.opening.menuNoticeTimer <= 0) {
    return;
  }
  const isError = GameState.opening.menuNotice === TextData.saveDeleteFailed;
  const alpha = Math.min(1, GameState.opening.menuNoticeTimer / 0.35);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = "28px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const width = Math.min(640, ctx.measureText(GameState.opening.menuNotice).width + 70);
  ctx.fillStyle = "rgba(5, 5, 5, 0.86)";
  ctx.fillRect((CANVAS_WIDTH - width) / 2, 56, width, 58);
  ctx.strokeStyle = isError ? "#c75b50" : "#c9a94d";
  ctx.lineWidth = 2;
  ctx.strokeRect((CANVAS_WIDTH - width) / 2, 56, width, 58);
  ctx.fillStyle = isError ? "#ffb1a7" : "#ffe39a";
  ctx.fillText(GameState.opening.menuNotice, CANVAS_WIDTH / 2, 85);
  ctx.restore();
}

function renderDeleteSaveConfirmation(ctx) {
  const layout = getDeleteSaveConfirmLayout();
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = "rgba(17, 13, 10, 0.97)";
  ctx.strokeStyle = "#c75b50";
  ctx.lineWidth = 4;
  ctx.fillRect(layout.panel.x, layout.panel.y, layout.panel.w, layout.panel.h);
  ctx.strokeRect(layout.panel.x, layout.panel.y, layout.panel.w, layout.panel.h);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 40px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.fillStyle = "#ffd0c8";
  ctx.fillText(TextData.deleteSaveTitle, CANVAS_WIDTH / 2, 244);
  ctx.font = "25px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.fillStyle = "#e7ded5";
  ctx.fillText("所有游戏进度将被永久删除", CANVAS_WIDTH / 2, 318);
  ctx.fillStyle = "#e8a39a";
  ctx.fillText("此操作无法撤销", CANVAS_WIDTH / 2, 358);

  renderDeleteConfirmButton(ctx, TextData.cancel, layout.cancel, "cancel", false);
  renderDeleteConfirmButton(ctx, TextData.confirmDelete, layout.confirm, "confirm", true);
  ctx.restore();
}

function renderDeleteConfirmButton(ctx, label, rect, id, destructive) {
  const hovered = InputSystem.pointerInRect(rect);
  const selected = GameState.opening.deleteConfirmSelection === id;
  const active = hovered || selected;
  ctx.fillStyle = active ? (destructive ? "#7c2f29" : "#64522d") : "#25201b";
  ctx.strokeStyle = active ? (destructive ? "#ff9b8f" : "#e6c35e") : "#766c60";
  ctx.lineWidth = active ? 4 : 2;
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
  ctx.font = "28px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.fillStyle = active ? "#fff3d2" : "#d5cec5";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2);
}

function renderMenuVolumeHint(ctx) {
  if (!SHOW_GAMEPLAY_TEXT_HINTS) {
    return;
  }
  ctx.save();
  ctx.font = "24px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.78)";
  ctx.fillStyle = "#e8d8a6";
  ctx.shadowColor = "rgba(232, 205, 124, 0.34)";
  ctx.shadowBlur = 8;
  ctx.strokeText("建议将音量调到最大后开始探索", 72, 682);
  ctx.fillText("建议将音量调到最大后开始探索", 72, 682);
  ctx.restore();
}

function renderLivingRoom(ctx) {
  if (GameState.opening.phase === "menuConfirm") {
    renderIntroStill(ctx, "start_screen_selected");
    return;
  }

  if (GameState.opening.phase === "menuBlack") {
    renderSolidScreen(ctx, "#000000");
    return;
  }

  const tvAssetKey = GameState.opening.tvFrameIndex === 0 ? "tv_watch_01" : "tv_watch_02";
  renderIntroStill(ctx, tvAssetKey);
}

function renderRecap(ctx) {
  if (GameState.opening.phase === "storyBlack" || GameState.opening.phase === "storyPostBlack") {
    if (GameState.opening.phase === "storyBlack") {
      renderOpeningPrelude(ctx, TextData.openingPrelude[0], GameState.opening.timer, STORY_PRE_BLACK_DURATION);
      return;
    }
    renderOpeningPrelude(ctx, TextData.openingPrelude[1], GameState.opening.timer, STORY_POST_BLACK_DURATION);
    return;
  }

  renderIntroStill(ctx, "opening_story");

  if (GameState.opening.phase === "storyQuote") {
    renderOpeningQuote(ctx, GameState.opening.timer);
  }
}

function renderWhiteLight(ctx) {
  if (GameState.opening.phase === "inhaleBlack") {
    renderSolidScreen(ctx, "#000000");
    return;
  }

  if (GameState.opening.phase === "inhale01") {
    renderIntroStill(ctx, "inhale_01");
    return;
  }

  if (GameState.opening.phase === "inhale02") {
    renderIntroStill(ctx, "inhale_02");
    return;
  }

  if (GameState.opening.phase === "inhale03") {
    renderIntroStill(ctx, "inhale_03");
    return;
  }

  renderSolidScreen(ctx, "#ffffff");
}

function renderSolidScreen(ctx, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderOpeningPrelude(ctx, page, timer, duration) {
  renderSolidScreen(ctx, "#000000");

  const fadeIn = clamp(timer / 0.55, 0, 1);
  const fadeOut = clamp((duration - timer) / 0.55, 0, 1);
  const alpha = Math.min(fadeIn, fadeOut);
  const safePage = page || { title: "", body: "" };

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#c9b36d";
  ctx.shadowColor = "rgba(220, 198, 125, 0.34)";
  ctx.shadowBlur = 10;
  ctx.font = "36px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.fillText(safePage.title || "前情提要", CANVAS_WIDTH / 2, 132);

  ctx.fillStyle = "#ede6d2";
  ctx.shadowColor = "rgba(237, 230, 210, 0.28)";
  ctx.shadowBlur = 8;
  ctx.font = "31px 'Microsoft YaHei', 'SimHei', monospace";
  renderPreludeBodyText(ctx, safePage.body || "", CANVAS_WIDTH / 2, 246, 980, 48);

  if (SHOW_GAMEPLAY_TEXT_HINTS) {
    ctx.fillStyle = "rgba(237, 230, 210, 0.72)";
    ctx.shadowBlur = 0;
    ctx.font = "21px 'Microsoft YaHei', 'SimHei', monospace";
    ctx.fillText("点击画面或按空格键继续", CANVAS_WIDTH / 2, 604);
  }
  ctx.restore();
}

function renderPreludeBodyText(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = buildWrappedLines(ctx, text, maxWidth);
  ctx.textBaseline = "middle";
  let lineY = y;
  lines.forEach((line) => {
    ctx.fillText(line, x, lineY);
    lineY += lineHeight;
  });
}

function renderIntroStill(ctx, assetKey) {
  renderSolidScreen(ctx, "#000000");
  drawAssetContain(ctx, assetKey, IntroLayout.imageWidth, IntroLayout.imageHeight);
}

function renderOpeningQuote(ctx, timer) {
  const fadeIn = clamp(timer / 0.16, 0, 1);
  const fadeOut = clamp((STORY_QUOTE_DURATION - timer) / 0.44, 0, 1);
  const alpha = Math.min(fadeIn, fadeOut);
  const flash = clamp(1 - timer / 0.2, 0, 1);

  if (flash > 0) {
    ctx.fillStyle = "rgba(255, 255, 255, " + (flash * 0.32) + ")";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  const bandAlpha = 0.22 + alpha * 0.28;
  ctx.fillStyle = "rgba(0, 0, 0, " + bandAlpha + ")";
  ctx.fillRect(0, 532, CANVAS_WIDTH, 92);

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
  ctx.shadowColor = "rgba(255, 255, 255, " + (alpha * 0.78) + ")";
  ctx.shadowBlur = 18;
  ctx.font = "22px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  renderWrappedText(ctx, TextData.openingQuote, CANVAS_WIDTH / 2, 579, 1220, 30);
  ctx.restore();
}

function renderCell(ctx) {
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawAssetContain(ctx, getCellSceneAssetKey(), CellLayout.imageWidth, CellLayout.imageHeight);
  renderCellWallHole(ctx);
  renderCellInteractionHints(ctx);
  renderCellInspectionActors(ctx);
  renderPlayer(ctx);
  if (GameState.mapRevealActive) {
    renderMapReveal(ctx);
    QuestSystem.render(ctx);
    return;
  }
  QuestSystem.render(ctx);
  if (GameState.hammerHidePuzzle.active) {
    renderHammerHidePuzzle(ctx);
  }
  if (isCellInspectionActive()) {
    renderCellInspectionPrompt(ctx);
  }
  renderSideRouteCellSleepOverlay(ctx);
}

function renderCorridorScene(ctx) {
  renderCorridorBackground(ctx);
  renderCorridorInteractionHint(ctx);
  renderCorridorEntities(ctx);
  renderCorridorGuardRemark(ctx);
  QuestSystem.render(ctx);
}

function renderCorridorBackground(ctx) {
  const size = getCorridorWorldSize();
  const x = (CANVAS_WIDTH - size.w) / 2;
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawAsset(ctx, "cell_corridor", x, -GameState.corridor.cameraY, size.w, size.h);
}

function renderCorridorInteractionHint(ctx) {
  if (DialogueSystem.active || isCorridorEscortActive()) {
    return;
  }
  const interaction = getActiveCorridorInteraction();
  if (!interaction) {
    return;
  }
  const portal = interaction.id === "yardDoor" ? CorridorLayout.portals.yard :
    (interaction.id === "cellDoor" ? CorridorLayout.portals.cell : CorridorLayout.portals.solitary);
  renderInteractionZone(ctx, corridorImageRectToScreen(portal), true);
}

function renderCorridorEntities(ctx) {
  const entities = [{ type: "player", y: getPlayerFootPoint(GameState.player.x, GameState.player.y).y }];
  if (isCorridorEscortActive()) {
    GameState.corridor.guards.forEach((guard, index) => {
      entities.push({ type: "guard", index, y: guard.y * CORRIDOR_WORLD_SCALE });
    });
  }
  entities.sort((a, b) => a.y - b.y);
  entities.forEach((entity) => {
    if (entity.type === "player") {
      renderPlayer(ctx);
      return;
    }
    renderCorridorGuard(ctx, GameState.corridor.guards[entity.index]);
  });
}

function renderCorridorGuard(ctx, guard) {
  const facing = guard.visualFacing || guard.facing || "down";
  const rect = renderDirectionalNpcSprite(
    ctx,
    "guard",
    guard.x,
    guard.y,
    YARD_CHARACTER_HEIGHT,
    facing,
    guard.isMoving,
    guard.walkAnimTime,
    corridorImagePointToScreen
  );
  if (rect) {
    renderYardNameTag(ctx, "看守", rect.x + rect.w / 2, rect.y - 4);
  }
}

function renderCorridorGuardRemark(ctx) {
  const corridor = GameState.corridor;
  if (!isCorridorEscortActive() || !corridor.remarkText || corridor.remarkStartedAt < 0) {
    return;
  }
  const elapsed = GameState.playTime - corridor.remarkStartedAt;
  const totalSeconds = SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS * 2 +
    SIDE_ROUTE_CROWD_REMARK_DISPLAY_SECONDS;
  if (elapsed < 0 || elapsed > totalSeconds) {
    return;
  }
  let alpha = 1;
  if (elapsed < SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS) {
    alpha = elapsed / SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS;
  } else if (elapsed > SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS + SIDE_ROUTE_CROWD_REMARK_DISPLAY_SECONDS) {
    alpha = (totalSeconds - elapsed) / SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS;
  }
  const guard = corridor.guards[0];
  const foot = corridorImagePointToScreen(guard.x, guard.y);
  ctx.save();
  ctx.globalAlpha = clamp(alpha, 0, 1);
  ctx.fillStyle = "#f4f1e8";
  ctx.font = "18px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(corridor.remarkText, clamp(foot.x, 120, CANVAS_WIDTH - 120), Math.max(28, foot.y - YARD_CHARACTER_HEIGHT - 26));
  ctx.restore();
}

function renderSideRouteCellSleepOverlay(ctx) {
  if (!GameState.sideRoute.active || GameState.scene !== "cell") {
    return;
  }
  const sideRoute = GameState.sideRoute;
  let alpha = 0;
  if (sideRoute.cellSleepPhase === "fadeOut") {
    alpha = clamp(sideRoute.cellSleepTimer / SIDE_ROUTE_CELL_SLEEP_FADE_SECONDS, 0, 1);
  } else if (sideRoute.cellSleepPhase === "blackHold") {
    alpha = 1;
  } else if (sideRoute.cellSleepPhase === "fadeIn") {
    alpha = clamp(1 - sideRoute.cellSleepTimer / SIDE_ROUTE_CELL_SLEEP_FADE_SECONDS, 0, 1);
  }
  if (alpha <= 0) {
    return;
  }
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
}

function renderSolitaryScene(ctx) {
  renderSolitaryPlaceholderRoom(ctx);
  renderSolitaryInteractionHints(ctx);
  if (GameState.sideRoute.solitarySleepPhase === "idle") {
    renderPlayer(ctx);
  } else {
    renderSolitarySleepingPlayer(ctx);
  }
  QuestSystem.render(ctx);
  renderSolitarySleepOverlay(ctx);
}

function renderSolitaryPlaceholderRoom(ctx) {
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawAssetContain(ctx, "solitary_room", SolitaryLayout.imageWidth, SolitaryLayout.imageHeight);
}

function renderSolitaryInteractionHints(ctx) {
  if (DialogueSystem.active || GameState.sideRoute.solitarySleepPhase !== "idle") {
    return;
  }
  const active = getActiveSolitaryInteraction();
  if (!GameState.sideRoute.solitaryStoneRead) {
    renderInteractionZone(ctx, SolitaryLayout.stoneZone, active && active.id === "stone");
  }
  if (GameState.sideRoute.solitaryStoneRead && !GameState.sideRoute.solitarySlept) {
    renderInteractionZone(ctx, SolitaryLayout.matInteractionZone, active && active.id === "mat");
  }
  if (GameState.sideRoute.solitarySlept) {
    renderInteractionZone(ctx, SolitaryLayout.doorZone, active && active.id === "door");
  }
}

function renderSolitarySleepingPlayer(ctx) {
  const mat = SolitaryLayout.matZone;
  const sleepingWidth = BED_LYING_PLAYER_WIDTH;
  const sleepingHeight = BED_LYING_PLAYER_HEIGHT;
  const sleepingX = mat.x + mat.w / 2 - sleepingWidth / 2;
  const sleepingY = mat.y + mat.h / 2 - sleepingHeight / 2;
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.42)";
  ctx.beginPath();
  ctx.ellipse(mat.x + mat.w / 2, mat.y + mat.h / 2 + 14, 82, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  // 使用安迪的真实角色精灵横躺；原本面向右侧的头部逆时针旋转后朝向画面上方。
  renderAndySpriteRotated(ctx, sleepingX, sleepingY, sleepingWidth, sleepingHeight, "right", -Math.PI / 2);
}

function renderSolitarySleepOverlay(ctx) {
  const sideRoute = GameState.sideRoute;
  let alpha = 0;
  if (sideRoute.solitarySleepPhase === "fadeOut") {
    alpha = clamp(sideRoute.solitarySleepTimer / SOLITARY_SLEEP_FADE_SECONDS, 0, 1);
  } else if (sideRoute.solitarySleepPhase === "blackHold") {
    alpha = 1;
  } else if (sideRoute.solitarySleepPhase === "fadeIn") {
    alpha = clamp(1 - sideRoute.solitarySleepTimer / SOLITARY_SLEEP_FADE_SECONDS, 0, 1);
  }
  if (alpha <= 0) {
    return;
  }
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
}

function renderTwentyYearsMontage(ctx) {
  const montage = GameState.twentyYearsMontage;

  if (montage.phase === "fadeOut") {
    renderSleepingCellForMontage(ctx);
    renderBlackOverlay(ctx, clamp(montage.timer / SLEEP_FADE_OUT_SECONDS, 0, 1));
    return;
  }

  if (montage.phase === "darkBefore") {
    renderMontageBlack(ctx, "这一睡，墙外的季节开始无声更替。");
    return;
  }

  if (montage.phase === "comic") {
    ctx.fillStyle = "#050403";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return;
  }

  if (montage.phase === "darkAfter") {
    renderMontageBlack(ctx, "二十年后，房间仍旧安静。");
    return;
  }

  renderSleepingCellForMontage(ctx);
  renderBlackOverlay(ctx, clamp(1 - montage.timer / MONTAGE_WAKE_FADE_SECONDS, 0, 1));
}

function renderSleepingCellForMontage(ctx) {
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawAssetContain(ctx, getCellSceneAssetKey(), CellLayout.imageWidth, CellLayout.imageHeight);
  renderCellWallHole(ctx);
  renderLyingPlayer(ctx);
}

function renderMontageBlack(ctx, text) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  renderNarrativeBox(ctx, text);
}

function renderBlackOverlay(ctx, alpha) {
  if (alpha <= 0) {
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, " + clamp(alpha, 0, 1) + ")";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
}

function renderDig(ctx) {
  ctx.fillStyle = "#080604";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const layout = getCurrentDigLayout();
  drawAssetContain(ctx, getCurrentDigAssetKey(), layout.imageWidth, layout.imageHeight);
  renderDigInteractionHints(ctx);
  renderDigPlayer(ctx);
  QuestSystem.render(ctx);

  if (DialogueSystem.active) {
    return;
  }
}

function renderPipe(ctx) {
  ctx.fillStyle = "#080604";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawAssetContain(ctx, getCurrentPipeAssetKey(), PipeLayout.imageWidth, PipeLayout.imageHeight);
  renderPipeCueBrightness(ctx);
  renderPipeInteractionHints(ctx);
  renderPipeCue(ctx);
  renderPipePlayer(ctx);
  renderPipeSmashHint(ctx);
  QuestSystem.render(ctx);
  renderPipeVictory(ctx);
}

function renderYard(ctx) {
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  renderYardBackground(ctx);
  renderOpeningYardFog(ctx);
  renderYardBackgroundActors(ctx);
  renderYardLandmarks(ctx);
  renderPlayer(ctx);
  renderAmbientConversation(ctx);
  renderSideRouteYardCustody(ctx);
  renderSideRouteCrowdRemarks(ctx);
  renderSideRouteYardTrial(ctx);
  renderSideRouteGuardWarning(ctx);
  QuestSystem.render(ctx);
  renderAmbientEvidenceNotice(ctx);
  renderSoilDumpHud(ctx);
  renderRadioRepair(ctx);
  renderPosterChoice(ctx);
}

function renderRadioRepair(ctx) {
  void ctx;
  return;

  if (!GameState.radioRepairActive) {
    return;
  }

  const panel = RadioRepairLayout.panel;
  const gear = GameState.radioGear;
  const toggleButton = RadioRepairLayout.toggleButton;
  const resetButton = RadioRepairLayout.resetButton;
  const trackName = gear.track === "outer" ? "外圈" : "内圈";
  const hoveredToggle = InputSystem.pointerInRect(toggleButton);
  const hoveredReset = InputSystem.pointerInRect(resetButton);

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.74)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  renderPanel(ctx, panel.x, panel.y, panel.w, panel.h);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#f5df9d";
  ctx.font = "bold 34px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.fillText("齿轮校准 · 修理收音机", CANVAS_WIDTH / 2, panel.y + 54);
  ctx.fillStyle = "#ddd3bd";
  ctx.font = "20px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.fillText("让校准触点沿正确轨道转动，收集全部发光刻度。", CANVAS_WIDTH / 2, panel.y + 94);

  renderRadioGearCalibration(ctx, gear);

  ctx.fillStyle = "#d8cfbd";
  ctx.font = "21px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("当前轨道：" + trackName, toggleButton.x, toggleButton.y - 52);
  ctx.fillText("校准进度：" + gear.collectedIds.length + " / " + RadioGearTargets.length, toggleButton.x, toggleButton.y - 20);

  ctx.fillStyle = hoveredToggle ? "#d6b96f" : "#aa8b4d";
  ctx.fillRect(toggleButton.x, toggleButton.y, toggleButton.w, toggleButton.h);
  ctx.strokeStyle = "#fff0c0";
  ctx.lineWidth = hoveredToggle ? 5 : 3;
  ctx.strokeRect(toggleButton.x + 2, toggleButton.y + 2, toggleButton.w - 4, toggleButton.h - 4);
  ctx.fillStyle = "#241a10";
  ctx.font = "bold 25px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("切换到" + (gear.track === "outer" ? "内圈" : "外圈") + "轨道", toggleButton.x + toggleButton.w / 2, toggleButton.y + toggleButton.h / 2);

  ctx.fillStyle = hoveredReset ? "#7c6a50" : "#584b3a";
  ctx.fillRect(resetButton.x, resetButton.y, resetButton.w, resetButton.h);
  ctx.strokeStyle = "#d8cfbd";
  ctx.lineWidth = hoveredReset ? 4 : 2;
  ctx.strokeRect(resetButton.x + 2, resetButton.y + 2, resetButton.w - 4, resetButton.h - 4);
  ctx.fillStyle = "#f5df9d";
  ctx.font = "bold 20px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.fillText("重新校准", resetButton.x + resetButton.w / 2, resetButton.y + resetButton.h / 2);

  if (gear.status === "complete") {
    ctx.fillStyle = "rgba(10, 22, 14, 0.84)";
    ctx.fillRect(196, 538, 610, 72);
    ctx.strokeStyle = "#d6d67e";
    ctx.lineWidth = 3;
    ctx.strokeRect(198, 540, 606, 68);
    ctx.fillStyle = "#fff3ac";
    ctx.font = "bold 26px 'Microsoft YaHei', 'SimHei', sans-serif";
    ctx.fillText("校准完成，收音机重新有了声音。", 501, 574);
  }
  ctx.fillStyle = "#d8cfbd";
  ctx.font = "17px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.fillText("点击齿轮或按钮切换内外轨道，也可按空格键。", CANVAS_WIDTH / 2, panel.y + panel.h - 24);
  ctx.restore();
}

function renderRadioGearCalibration(ctx, gear) {
  const center = RadioRepairLayout.gearCenter;
  const outerRadius = RadioRepairLayout.outerRadius;
  const innerRadius = RadioRepairLayout.innerRadius;
  const collected = new Set(gear.collectedIds);
  ctx.save();
  ctx.fillStyle = "#211d1a";
  ctx.beginPath();
  ctx.arc(center.x, center.y, outerRadius + 44, 0, Math.PI * 2);
  ctx.fill();

  for (let tooth = 0; tooth < 18; tooth += 1) {
    const angle = tooth / 18 * Math.PI * 2 + gear.angle * 0.25;
    const x = center.x + Math.cos(angle) * (outerRadius + 18);
    const y = center.y + Math.sin(angle) * (outerRadius + 18);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = "#7d5f38";
    ctx.fillRect(-8, -13, 16, 26);
    ctx.restore();
  }

  [
    { radius: outerRadius, active: gear.track === "outer" },
    { radius: innerRadius, active: gear.track === "inner" }
  ].forEach((ring) => {
    ctx.strokeStyle = ring.active ? "#f0cf73" : "#785c38";
    ctx.lineWidth = ring.active ? 13 : 9;
    ctx.beginPath();
    ctx.arc(center.x, center.y, ring.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "#2c251c";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(center.x, center.y, ring.radius, 0, Math.PI * 2);
    ctx.stroke();
  });

  ctx.fillStyle = "#5b472e";
  ctx.beginPath();
  ctx.arc(center.x, center.y, 68, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#d1ad60";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = "#2f261d";
  ctx.beginPath();
  ctx.arc(center.x, center.y, 24, 0, Math.PI * 2);
  ctx.fill();
  for (let spoke = 0; spoke < 6; spoke += 1) {
    const angle = spoke / 6 * Math.PI * 2 + gear.angle * 0.6;
    ctx.strokeStyle = "#b68d4e";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(center.x + Math.cos(angle) * 28, center.y + Math.sin(angle) * 28);
    ctx.lineTo(center.x + Math.cos(angle) * 60, center.y + Math.sin(angle) * 60);
    ctx.stroke();
  }

  RadioGearTargets.forEach((target) => {
    const radius = target.track === "outer" ? outerRadius : innerRadius;
    const x = center.x + Math.cos(target.angle) * radius;
    const y = center.y + Math.sin(target.angle) * radius;
    const isCollected = collected.has(target.id);
    ctx.beginPath();
    ctx.arc(x, y, isCollected ? 6 : 10, 0, Math.PI * 2);
    ctx.fillStyle = isCollected ? "#4a4439" : "#ffe887";
    if (!isCollected) {
      ctx.shadowColor = "#ffe887";
      ctx.shadowBlur = 14;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  const contactRadius = gear.track === "outer" ? outerRadius : innerRadius;
  const contactX = center.x + Math.cos(gear.angle) * contactRadius;
  const contactY = center.y + Math.sin(gear.angle) * contactRadius;
  ctx.fillStyle = "#fff8cf";
  ctx.shadowColor = "#fff1a4";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(contactX, contactY, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();
}

function renderPosterChoice(ctx) {
  if (!GameState.posterChoiceActive) {
    return;
  }

  const panel = PosterChoiceLayout.panel;
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.64)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawAssetCrop(ctx, "poster_choice_panel_frame", PosterChoiceLayout.panelSourceRect, panel.x, panel.y, panel.w, panel.h);
  ctx.fillStyle = "#f5df9d";
  ctx.font = "bold 34px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("瑞德：你想要哪一种海报？", CANVAS_WIDTH / 2, panel.y + 145);
  ctx.font = "22px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.fillStyle = "#ddd3bd";
  ctx.fillText("选择后才能看到它的样子", CANVAS_WIDTH / 2, panel.y + 187);
  PosterChoices.forEach((poster) => {
    const rect = PosterChoiceLayout[poster.id];
    const hovered = InputSystem.pointerInRect(rect);
    ctx.fillStyle = hovered ? "rgba(238, 217, 172, 0.20)" : "rgba(255, 255, 255, 0.06)";
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    if (hovered) {
      ctx.shadowColor = "#fff3cb";
      ctx.shadowBlur = 14;
    }
    drawAssetCrop(ctx, "poster_choice_card", PosterChoiceLayout.cardSourceRect, rect.x, rect.y, rect.w, rect.h);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#2a1d0e";
    ctx.font = "bold 26px 'Microsoft YaHei', 'SimHei', sans-serif";
    ctx.fillText(poster.name, rect.x + rect.w / 2, rect.y + 265);
    ctx.fillStyle = "#4d3820";
    ctx.font = "18px 'Microsoft YaHei', 'SimHei', sans-serif";
    ctx.fillText("点击选择", rect.x + rect.w / 2, rect.y + 295);
  });
  ctx.font = "18px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.fillStyle = "#d8cfbd";
  ctx.fillText("键盘可按 1 / ← 选择左侧，2 / → 选择右侧", CANVAS_WIDTH / 2, panel.y + panel.h - 67);
  ctx.restore();
}

function renderPosterPickupAnimation(ctx) {
  const animation = GameState.posterPickupAnimation;
  if (!animation.active) {
    return;
  }

  const poster = PosterChoices.find((item) => item.id === animation.posterId);
  const targetRect = getPosterInventoryIconRect();
  if (!poster || !targetRect) {
    return;
  }

  const startRect = getAssetContainRectInBounds(
    poster.assetKey,
    { x: CANVAS_WIDTH / 2 - 160, y: CANVAS_HEIGHT / 2 - 200, w: 320, h: 400 },
    320,
    400
  );
  const travelProgress = clamp(
    (animation.elapsed - POSTER_PICKUP_HOLD_SECONDS) / POSTER_PICKUP_TRAVEL_SECONDS,
    0,
    1
  );
  const easedProgress = 1 - Math.pow(1 - travelProgress, 3);
  const rect = {
    x: startRect.x + (targetRect.x - startRect.x) * easedProgress,
    y: startRect.y + (targetRect.y - startRect.y) * easedProgress,
    w: startRect.w + (targetRect.w - startRect.w) * easedProgress,
    h: startRect.h + (targetRect.h - startRect.h) * easedProgress
  };

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, " + (0.18 * (1 - travelProgress * 0.5)) + ")";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.globalAlpha = clamp(animation.elapsed / 0.12, 0, 1);
  ctx.shadowColor = "rgba(245, 223, 157, 0.8)";
  ctx.shadowBlur = 20 * (1 - travelProgress);
  drawAsset(ctx, poster.assetKey, rect.x, rect.y, rect.w, rect.h);
  ctx.restore();
}

function renderYardLandmarks(ctx) {
  if (isOpeningYardArrival()) {
    return;
  }

  const landmarks = [
    { label: "办公室", x: 160, y: 399 },
    { label: "图书馆", x: 160, y: 1004 }
  ];

  landmarks.forEach((landmark) => {
    const position = yardImagePointToScreen(landmark.x, landmark.y);
    if (
      position.x < -100 || position.x > CANVAS_WIDTH + 100 ||
      position.y < -50 || position.y > CANVAS_HEIGHT + 50
    ) {
      return;
    }

    renderYardDoorSign(ctx, landmark.label, position);
  });
}

function renderYardDoorSign(ctx, label, position) {
  const signAsset = getImageAssetRecord("door_sign");
  const signWidth = 164;
  const signHeight = 123;
  const signX = position.x - signWidth / 2;
  const signY = position.y - 82;

  ctx.save();
  if (signAsset && signAsset.loaded) {
    // 裁去透明留白，让门牌本体以与门相称的比例挂在门楣上方。
    ctx.drawImage(signAsset.element, 184, 210, 656, 492, signX, signY, signWidth, signHeight);
  } else {
    ctx.fillStyle = "#9f501d";
    ctx.fillRect(signX + 12, signY + 47, signWidth - 24, 55);
  }

  ctx.fillStyle = "#45200c";
  ctx.strokeStyle = "rgba(255, 219, 132, 0.82)";
  ctx.lineWidth = 2;
  ctx.font = "bold 27px 'STKaiti', 'KaiTi', 'Microsoft YaHei', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeText(label, position.x, position.y);
  ctx.fillText(label, position.x, position.y);
  ctx.restore();
}

function renderSoilDumpHud(ctx) {
  if (!GameState.hasSoilPile) {
    return;
  }

  const activeInteraction = getActiveYardInteraction();
  if (!activeInteraction || activeInteraction.id !== "soil") {
    return;
  }

  const progress = clamp(GameState.soilDump.progress / SOIL_DUMP_HOLD_SECONDS, 0, 1);
  const count = GameState.soilDump.completedCount;
  const hudY = 116;

  ctx.save();
  renderPanel(ctx, 430, hudY, 420, 64);
  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  ctx.fillRect(460, hudY + 30, 300, 14);
  ctx.fillStyle = "#d8b85f";
  ctx.fillRect(460, hudY + 30, 300 * progress, 14);
  ctx.strokeStyle = "#f5df9d";
  ctx.lineWidth = 2;
  ctx.strokeRect(460, hudY + 30, 300, 14);
  ctx.fillStyle = "#ffffff";
  ctx.font = "18px monospace";
  ctx.textAlign = "right";
  ctx.fillText(count + "/" + SOIL_DUMP_REQUIRED_COUNT, 820, hudY + 43);
  ctx.restore();
}

function renderOffice(ctx) {
  if (GameState.office.safeViewOpen) {
    renderOfficeSafeView(ctx);
    QuestSystem.render(ctx);
    return;
  }

  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const officeBackgroundKey = GameState.office.curtainsClosed ? "office_curtain_closed" : "office";
  drawAssetContain(ctx, officeBackgroundKey, OfficeLayout.imageWidth, OfficeLayout.imageHeight);
  renderOfficeInteractionHints(ctx);
  renderOfficeWarden(ctx);
  renderSideRouteOfficeActors(ctx);
  renderFreeOfficeInspectionActor(ctx);
  if (!isOfficePlayerHidden()) {
    renderPlayer(ctx);
  }
  QuestSystem.render(ctx);
  renderOfficePrompt(ctx);
  renderSideRouteOfficeCountdown(ctx);
  renderFreeOfficeInspectionCountdown(ctx);
}

function renderLibrary(ctx) {
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawAssetContain(ctx, "library", LibraryLayout.imageWidth, LibraryLayout.imageHeight);
  renderLibraryBrooks(ctx);
  renderLibraryInteractionHints(ctx);
  renderPlayer(ctx);
  QuestSystem.render(ctx);
  renderLibrarySortingTask(ctx);
}

function renderLibraryBrooks(ctx) {
  if (!isBrooksWaitingInLibrary()) {
    return;
  }
  const brooks = LibraryLayout.brooks;
  let rect = renderDirectionalNpcSprite(
    ctx,
    "brooks",
    brooks.x,
    brooks.y,
    brooks.h,
    brooks.facing,
    false,
    0,
    libraryImageToCanvasPoint
  );
  if (!rect) {
    const size = getTriptychCharacterSize("brooks", brooks.h, brooks.facing);
    const foot = libraryImageToCanvasPoint(brooks.x, brooks.y);
    rect = { x: foot.x - size.w / 2, y: foot.y - size.h, w: size.w, h: size.h };
    renderTriptychCharacter(ctx, "brooks", rect.x, rect.y, rect.w, rect.h, brooks.facing);
  }
  renderYardNameTag(ctx, "老布", rect.x + rect.w / 2, rect.y - 4);
}

function renderLibraryInteractionHints(ctx) {
  const activeInteraction = getActiveLibraryInteraction();
  if (!activeInteraction) {
    return;
  }

  if (activeInteraction.id === "exit") {
    renderInteractionZone(ctx, libraryImageRectToCanvas(LibraryLayout.exitZone), true);
    return;
  }

  const brooks = LibraryLayout.brooks;
  renderInteractionZone(ctx, libraryImageRectToCanvas({
    x: brooks.x - 88,
    y: brooks.y - 154,
    w: 176,
    h: 184
  }), true);
}

function renderLibrarySortingTask(ctx) {
  void ctx;
  return;

  if (!GameState.libraryTask.sortingActive) {
    return;
  }

  const panel = LibrarySortingLayout.panel;
  const shelf = LibrarySortingLayout.shelf;
  const task = GameState.libraryTask;
  const resetButton = LibrarySortingLayout.resetButton;
  const hoveredReset = InputSystem.pointerInRect(resetButton);

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  renderPanel(ctx, panel.x, panel.y, panel.w, panel.h);
  ctx.fillStyle = "#f5df9d";
  ctx.font = "bold 34px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("整理图书 · 老布的书架", CANVAS_WIDTH / 2, panel.y + 52);
  ctx.fillStyle = "#ddd3bd";
  ctx.font = "20px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.fillText("选择两本书交换位置，让书脊从高到低排列。", CANVAS_WIDTH / 2, panel.y + 92);
  ctx.fillText("剩余交换次数：" + Math.max(0, LIBRARY_SORT_MAX_MOVES - task.sortMoves) + " / " + LIBRARY_SORT_MAX_MOVES, CANVAS_WIDTH / 2, panel.y + 124);

  ctx.fillStyle = "#4b2f22";
  ctx.fillRect(shelf.x - 18, shelf.y, shelf.w + 36, shelf.h);
  ctx.fillStyle = "#8c5a37";
  ctx.fillRect(shelf.x - 10, shelf.y + 7, shelf.w + 20, 16);
  ctx.strokeStyle = "#d2a66d";
  ctx.lineWidth = 3;
  ctx.strokeRect(shelf.x - 18, shelf.y, shelf.w + 36, shelf.h);

  getLibraryBookRects().forEach((rect) => {
    const book = rect.book;
    const selected = task.selectedBookIndex === rect.index;
    ctx.save();
    if (selected) {
      ctx.shadowColor = "#fff0a0";
      ctx.shadowBlur = 22;
    }
    ctx.fillStyle = book.color;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.strokeStyle = selected ? "#fff2ae" : book.accent;
    ctx.lineWidth = selected ? 5 : 3;
    ctx.strokeRect(rect.x + 2, rect.y + 2, rect.w - 4, rect.h - 4);
    ctx.shadowBlur = 0;
    ctx.fillStyle = book.accent;
    ctx.fillRect(rect.x + 10, rect.y + 18, rect.w - 20, 5);
    ctx.fillRect(rect.x + 10, rect.y + rect.h - 22, rect.w - 20, 5);
    ctx.fillStyle = "#fff2d2";
    ctx.font = "bold 15px 'Microsoft YaHei', 'SimHei', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(book.shortTitle, rect.x + rect.w / 2, rect.y + rect.h / 2 - 8);
    ctx.font = "13px monospace";
    ctx.fillText(String(book.height), rect.x + rect.w / 2, rect.y + rect.h / 2 + 16);
    ctx.restore();
  });

  ctx.fillStyle = hoveredReset ? "#7c6a50" : "#584b3a";
  ctx.fillRect(resetButton.x, resetButton.y, resetButton.w, resetButton.h);
  ctx.strokeStyle = "#f5df9d";
  ctx.lineWidth = hoveredReset ? 4 : 2;
  ctx.strokeRect(resetButton.x + 2, resetButton.y + 2, resetButton.w - 4, resetButton.h - 4);
  ctx.fillStyle = "#fff0c0";
  ctx.font = "bold 21px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.fillText("重新整理", resetButton.x + resetButton.w / 2, resetButton.y + resetButton.h / 2);

  if (task.sortingStatus === "complete") {
    ctx.fillStyle = "rgba(18, 41, 25, 0.88)";
    ctx.fillRect(334, 534, 612, 58);
    ctx.strokeStyle = "#d5d985";
    ctx.lineWidth = 3;
    ctx.strokeRect(336, 536, 608, 54);
    ctx.fillStyle = "#fff5ae";
    ctx.font = "bold 23px 'Microsoft YaHei', 'SimHei', sans-serif";
    ctx.fillText("书架整齐了，老布露出了笑容。", CANVAS_WIDTH / 2, 563);
  }

  ctx.fillStyle = "#d8cfbd";
  ctx.font = "18px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.fillText(task.sortingMessage, CANVAS_WIDTH / 2, panel.y + panel.h - 20);
  ctx.restore();
}

function renderOfficeWarden(ctx) {
  if (isSideRouteOfficeActive() || GameState.office.wardenPhase === "gone") {
    return;
  }

  renderWardenCharacter(
    ctx,
    GameState.office.wardenX,
    GameState.office.wardenY,
    YARD_CHARACTER_HEIGHT,
    GameState.office.wardenFacing,
    GameState.office.wardenMoving,
    GameState.office.wardenWalkAnimTime
  );
}

function renderOfficeInteractionHints(ctx) {
  const activeInteraction = getActiveOfficeInteraction();
  ctx.save();
  if (isSideRouteOfficeActive()) {
    if (GameState.sideRoute.officePhase === "search" || GameState.sideRoute.officePhase === "searchAgain") {
      const desk = officeImageRectToCanvas(SideRouteOfficeLayout.deskZone);
      renderInteractionZone(ctx, desk, activeInteraction && activeInteraction.id === "sideRouteDesk");
    }
    if (GameState.sideRoute.officePhase === "hideCountdown") {
      const curtain = officeImageRectToCanvas(SideRouteOfficeLayout.curtainZone);
      renderInteractionZone(ctx, curtain, activeInteraction && activeInteraction.id === "sideRouteCurtain");
    }
    ctx.restore();
    return;
  }
  if (isFreeOfficeMode()) {
    if (GameState.office.mode === "inspectionCountdown") {
      const curtain = officeImageRectToCanvas(SideRouteOfficeLayout.curtainZone);
      renderInteractionZone(ctx, curtain, activeInteraction && activeInteraction.id === "freeOfficeCurtain");
    } else if (GameState.office.mode === "freeExplore" || GameState.office.mode === "inspectionComplete") {
      const door = officeImageRectToCanvas(OfficeLayout.doorZone);
      renderInteractionZone(ctx, door, activeInteraction && activeInteraction.id === "door");
    }
    ctx.restore();
    return;
  }
  if (GameState.office.wardenPhase === "gone" && !GameState.ledgerSwapped) {
    const embroidery = officeImageRectToCanvas(OfficeLayout.embroideryZone);
    renderInteractionZone(ctx, embroidery, activeInteraction && activeInteraction.id === "embroidery");
  }
  if (GameState.ledgerSwapped) {
    if (!GameState.secrets.officeSecretRead) {
      const desk = officeImageRectToCanvas(SideRouteOfficeLayout.deskZone);
      renderInteractionZone(ctx, desk, activeInteraction && activeInteraction.id === "deskSecret");
    }
    const door = officeImageRectToCanvas(OfficeLayout.doorZone);
    renderInteractionZone(ctx, door, activeInteraction && activeInteraction.id === "door");
  }
  ctx.restore();
}

function renderOfficePrompt(ctx) {
  void ctx;
}

function renderSideRouteOfficeActors(ctx) {
  if (!isSideRouteOfficeActive()) {
    return;
  }
  const sideRoute = GameState.sideRoute;
  if (sideRoute.officePhase !== "wardenDialogue" && sideRoute.officePhase !== "wardenLeaving") {
    return;
  }
  const warden = sideRoute.officeActors.warden;
  const guard = sideRoute.officeActors.guard;
  renderWardenCharacter(
    ctx,
    warden.x,
    warden.y,
    YARD_CHARACTER_HEIGHT,
    warden.facing,
    warden.isMoving,
    warden.walkAnimTime
  );
  renderDirectionalNpcSprite(
    ctx,
    "guard",
    guard.x,
    guard.y,
    YARD_CHARACTER_HEIGHT,
    guard.visualFacing || guard.facing,
    guard.isMoving,
    guard.walkAnimTime,
    officeImageToCanvasPoint
  ) || renderOfficeCharacter(ctx, "guard", guard.x, guard.y, YARD_CHARACTER_HEIGHT, guard.facing);
}

function renderFreeOfficeInspectionActor(ctx) {
  const office = GameState.office;
  if (!isFreeOfficeMode() || !office.inspectionVisitorKind ||
    (office.mode !== "inspectionEntering" && office.mode !== "inspectionVisit" &&
      office.mode !== "inspectionLeaving")) {
    return;
  }
  const actor = office.inspectionActor;
  if (office.inspectionVisitorKind === "warden") {
    renderWardenCharacter(
      ctx,
      actor.x,
      actor.y,
      YARD_CHARACTER_HEIGHT,
      actor.facing,
      actor.isMoving,
      actor.walkAnimTime
    );
    return;
  }
  renderDirectionalNpcSprite(
    ctx,
    "guard",
    actor.x,
    actor.y,
    YARD_CHARACTER_HEIGHT,
    actor.visualFacing || actor.facing,
    actor.isMoving,
    actor.walkAnimTime,
    officeImageToCanvasPoint
  ) || renderOfficeCharacter(ctx, "guard", actor.x, actor.y, YARD_CHARACTER_HEIGHT, actor.facing);
}

function isOfficePlayerHidden() {
  if (isSideRouteOfficeHidden()) {
    return true;
  }
  if (!isFreeOfficeMode()) {
    return false;
  }
  const mode = GameState.office.mode;
  return mode === "inspectionEntering" || mode === "inspectionVisit" || mode === "inspectionLeaving";
}

function isSideRouteOfficeHidden() {
  if (!isSideRouteOfficeActive()) {
    return false;
  }
  const phase = GameState.sideRoute.officePhase;
  return phase === "wardenDialogue" || phase === "wardenLeaving" ||
    phase === "searchAgainDialogue" || phase === "hidden";
}

function renderSideRouteOfficeCountdown(ctx) {
  if (!isSideRouteOfficeActive() || GameState.sideRoute.officePhase !== "hideCountdown") {
    return;
  }
  const seconds = Math.max(0, Math.ceil(GameState.sideRoute.officeHideTimer));
  ctx.save();
  renderPanel(ctx, 436, 112, 408, 68);
  ctx.fillStyle = "#ffe6a2";
  ctx.font = "bold 23px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("有人来了！躲藏倒计时 " + seconds + " 秒", CANVAS_WIDTH / 2, 146);
  ctx.restore();
}

function renderFreeOfficeInspectionCountdown(ctx) {
  if (!isFreeOfficeMode() || GameState.office.mode !== "inspectionCountdown") {
    return;
  }
  const seconds = Math.max(0, Math.ceil(GameState.office.inspectionHideTimer));
  ctx.save();
  renderPanel(ctx, 376, 100, 528, 92);
  ctx.fillStyle = "#ffe6a2";
  ctx.font = "bold 22px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("门外传来脚步声！", CANVAS_WIDTH / 2, 130);
  ctx.fillText("躲到左上方窗帘后 · " + seconds + " 秒", CANVAS_WIDTH / 2, 163);
  ctx.restore();
}

function renderOfficeSafeView(ctx) {
  ctx.fillStyle = "#070707";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const safeAssetKey = GameState.office.safeStage === "swapped" ? "safe_swapped" : "safe";
  drawAssetCover(ctx, safeAssetKey, 1536, 1024);
  renderVignette(ctx, 0.42);

  if (GameState.office.safeStage === "ledgerFound" && !DialogueSystem.active) {
    const ledgerRect = OfficeLayout.safeLedgerClickRect;
    ctx.save();
    ctx.strokeStyle = "#f5df9d";
    ctx.lineWidth = 5;
    ctx.strokeRect(ledgerRect.x, ledgerRect.y, ledgerRect.w, ledgerRect.h);
    ctx.fillStyle = "rgba(245, 223, 157, 0.12)";
    ctx.fillRect(ledgerRect.x, ledgerRect.y, ledgerRect.w, ledgerRect.h);
    ctx.restore();
  }
}

function renderHammerHidePuzzle(ctx) {
  const puzzle = GameState.hammerHidePuzzle;
  if (!puzzle.active) {
    return;
  }

  const layout = HammerHidePuzzleLayout;
  const hammerRect = getHammerHidePuzzleHammerRect();
  const overBible = isHammerOverBible();

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.82)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  renderPanel(ctx, layout.panel.x, layout.panel.y, layout.panel.w, layout.panel.h);

  ctx.fillStyle = "#f5df9d";
  ctx.font = "bold 34px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("把石锤藏进圣经", CANVAS_WIDTH / 2, 120);

  ctx.fillStyle = "#e7dcc1";
  ctx.font = "22px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.fillText("按住右侧石锤，把它拖到左侧圣经上", CANVAS_WIDTH / 2, 166);

  [layout.bibleSlot, layout.hammerSlot].forEach((slot) => {
    ctx.fillStyle = "rgba(245, 223, 157, 0.06)";
    ctx.fillRect(slot.x, slot.y, slot.w, slot.h);
    ctx.strokeStyle = "rgba(245, 223, 157, 0.55)";
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 8]);
    ctx.strokeRect(slot.x, slot.y, slot.w, slot.h);
  });
  ctx.setLineDash([]);

  if (overBible && puzzle.dragging) {
    ctx.fillStyle = "rgba(242, 210, 109, 0.2)";
    ctx.fillRect(layout.bibleSlot.x, layout.bibleSlot.y, layout.bibleSlot.w, layout.bibleSlot.h);
    ctx.strokeStyle = "#f2d26d";
    ctx.lineWidth = 6;
    ctx.strokeRect(layout.bibleSlot.x, layout.bibleSlot.y, layout.bibleSlot.w, layout.bibleSlot.h);
  }

  drawAssetContainInBounds(ctx, "bible", layout.bibleArt, 1254, 1254);
  drawAssetContainInBounds(ctx, "hammer", hammerRect, 1254, 1254);

  ctx.fillStyle = "#f5df9d";
  ctx.font = "bold 25px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.fillText("圣经", layout.bibleSlot.x + layout.bibleSlot.w / 2, 548);
  ctx.fillText("石锤", layout.hammerSlot.x + layout.hammerSlot.w / 2, 548);

  ctx.fillStyle = overBible && puzzle.dragging ? "#f2d26d" : "#d9ceb5";
  ctx.font = "21px 'Microsoft YaHei', 'SimHei', sans-serif";
  const statusText = overBible && puzzle.dragging ?
    "位置正确，松手即可藏入。" :
    (puzzle.statusMessage || "触摸拖动；也可按空格键拿起，用 WASD 移动，再按空格键放下。");
  ctx.fillText(statusText, CANVAS_WIDTH / 2, 606);
  ctx.restore();
}

function renderCellInspectionActors(ctx) {
  if (!isCellInspectionActive()) {
    return;
  }

  const inspection = GameState.cellInspection;
  renderCellWardenCharacter(ctx, inspection.warden);
  renderCellGuardCharacter(ctx, inspection.guard);
  if (inspection.phase === "escortAssemble" || inspection.phase === "escortOut") {
    renderCellGuardCharacter(ctx, inspection.escortGuard);
  }
}

function renderCellWardenCharacter(ctx, actor) {
  const frame = getWardenSpriteFrame(actor.facing, actor.isMoving, actor.walkAnimTime);
  const rect = renderWardenSpriteFrame(
    ctx,
    frame.assetKey,
    actor.x,
    actor.y,
    YARD_CHARACTER_HEIGHT,
    Boolean(frame.flip),
    frame.index,
    cellImageToCanvasPoint
  ) || renderCellTriptychCharacter(ctx, "warden", actor.x, actor.y, YARD_CHARACTER_HEIGHT, actor.facing);
  renderYardNameTag(ctx, "幕后主使", rect.x + rect.w / 2, rect.y - 4);
}

function renderDirectionalNpcSprite(ctx, npcId, imageX, imageY, h, facing, isMoving, walkAnimTime, imagePointToCanvas) {
  const directions = DirectionalNpcSpriteSheets[npcId];
  const sprite = directions && (directions[facing] || directions.down);
  const record = sprite && getImageAssetRecord(sprite.assetKey);
  if (!record || !record.loaded || record.failed) {
    return null;
  }

  const sourceWidth = getSourceWidth(record.element);
  const sourceHeight = getSourceHeight(record.element);
  const frameWidth = sourceWidth / NPC_SPRITE_SHEET_FRAME_COUNT;
  const frameIndex = isMoving
    ? Math.floor((walkAnimTime || 0) / NPC_SPRITE_SHEET_FRAME_SECONDS) % NPC_SPRITE_SHEET_FRAME_COUNT
    : 0;
  const foot = imagePointToCanvas(imageX, imageY);
  const characterScale = getCurrentCharacterRenderScale();
  const drawHeight = characterScale === 1 ? h : Math.max(1, Math.round(h * characterScale));
  const w = Math.max(1, Math.round(drawHeight * frameWidth / sourceHeight));
  const x = foot.x - w / 2;
  const y = foot.y - drawHeight;

  ctx.save();
  if (sprite.flip) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(record.element, frameIndex * frameWidth, 0, frameWidth, sourceHeight, 0, 0, w, drawHeight);
  } else {
    ctx.drawImage(record.element, frameIndex * frameWidth, 0, frameWidth, sourceHeight, x, y, w, drawHeight);
  }
  ctx.restore();

  return { x, y, w, h: drawHeight };
}

function renderCellGuardCharacter(ctx, actor) {
  const direction = DirectionalNpcSpriteSheets.guard[actor.facing] ? actor.facing : "down";
  const rect = renderDirectionalNpcSprite(
    ctx,
    "guard",
    actor.x,
    actor.y,
    YARD_CHARACTER_HEIGHT,
    direction,
    actor.isMoving,
    actor.walkAnimTime,
    cellImageToCanvasPoint
  ) || renderCellTriptychCharacter(ctx, "guard", actor.x, actor.y, YARD_CHARACTER_HEIGHT, direction);
  renderYardNameTag(ctx, "看守", rect.x + rect.w / 2, rect.y - 4);
}

function renderCellTriptychCharacter(ctx, assetKey, imageX, imageY, h, facing) {
  const size = getTriptychCharacterSize(assetKey, h, facing);
  const foot = cellImageToCanvasPoint(imageX, imageY);
  const rect = {
    x: foot.x - size.w / 2,
    y: foot.y - size.h,
    w: size.w,
    h: size.h
  };
  renderTriptychCharacter(ctx, assetKey, rect.x, rect.y, rect.w, rect.h, facing);
  return rect;
}

function renderCellInspectionPrompt(ctx) {
  void ctx;
}

function renderOfficeCharacter(ctx, assetKey, imageX, imageY, h, facing) {
  const size = getTriptychCharacterSize(assetKey, h, facing);
  const foot = officeImageToCanvasPoint(imageX, imageY);
  renderTriptychCharacter(ctx, assetKey, foot.x - size.w / 2, foot.y - size.h, size.w, size.h, facing);
}

function renderWardenCharacter(ctx, imageX, imageY, h, facing, isMoving, walkAnimTime) {
  const frame = getWardenSpriteFrame(facing, isMoving, walkAnimTime);
  const rect = renderWardenSpriteFrame(
    ctx,
    frame.assetKey,
    imageX,
    imageY,
    h,
    Boolean(frame.flip),
    frame.index,
    officeImageToCanvasPoint
  );
  if (!rect) {
    renderOfficeCharacter(ctx, "warden", imageX, imageY, h, facing);
  }
}

function getWardenSpriteFrame(facing, isMoving, walkAnimTime) {
  const direction = WardenSpriteSheets[facing] ? facing : "down";
  const sprite = WardenSpriteSheets[direction] || WardenSpriteSheets.down;
  return {
    assetKey: sprite.assetKey,
    flip: Boolean(sprite.flip),
    index: isMoving
      ? Math.floor((walkAnimTime || 0) / WARDEN_WALK_FRAME_SECONDS) % WARDEN_SPRITE_FRAME_COUNT
      : 0
  };
}

function renderWardenSpriteFrame(ctx, assetKey, imageX, imageY, h, flip, frameIndex, imagePointToCanvas) {
  const record = getImageAssetRecord(assetKey);
  if (!record || !record.loaded || record.failed) {
    return null;
  }

  const sourceWidth = getSourceWidth(record.element);
  const sourceHeight = getSourceHeight(record.element);
  const frameWidth = sourceWidth / WARDEN_SPRITE_FRAME_COUNT;
  const frameX = (Math.floor(frameIndex) % WARDEN_SPRITE_FRAME_COUNT) * frameWidth;
  const foot = imagePointToCanvas(imageX, imageY);
  const characterScale = getCurrentCharacterRenderScale();
  const drawHeight = characterScale === 1 ? h : Math.max(1, Math.round(h * characterScale));
  const w = Math.max(1, Math.round(drawHeight * frameWidth / sourceHeight));
  const x = foot.x - w / 2;
  const y = foot.y - drawHeight;

  ctx.save();
  if (flip) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(record.element, frameX, 0, frameWidth, sourceHeight, 0, 0, w, drawHeight);
  } else {
    ctx.drawImage(record.element, frameX, 0, frameWidth, sourceHeight, x, y, w, drawHeight);
  }
  ctx.restore();

  return { x, y, w, h: drawHeight };
}

function renderYardBackground(ctx) {
  const assetKey = isOpeningYardArrival() ? "yard_opening" : "yard";
  const record = getImageAssetRecord(assetKey);
  if (!record || !record.loaded || record.failed) {
    drawAsset(ctx, assetKey, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return;
  }

  const sourceX = GameState.camera.x / YARD_WORLD_SCALE;
  const sourceY = GameState.camera.y / YARD_WORLD_SCALE;
  const sourceW = CANVAS_WIDTH / YARD_WORLD_SCALE;
  const sourceH = CANVAS_HEIGHT / YARD_WORLD_SCALE;
  ctx.drawImage(record.element, sourceX, sourceY, sourceW, sourceH, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderOpeningYardFog(ctx) {
  if (!isOpeningYardArrival()) {
    return;
  }

  const record = getImageAssetRecord("yard_opening_fog");
  if (!record || !record.loaded || record.failed) {
    return;
  }

  const fogRect = OpeningYardLayout.fogRect;
  const viewX = GameState.camera.x / YARD_WORLD_SCALE;
  const viewY = GameState.camera.y / YARD_WORLD_SCALE;
  const viewW = CANVAS_WIDTH / YARD_WORLD_SCALE;
  const viewH = CANVAS_HEIGHT / YARD_WORLD_SCALE;
  const left = Math.max(viewX, fogRect.x);
  const top = Math.max(viewY, fogRect.y);
  const right = Math.min(viewX + viewW, fogRect.x + fogRect.w);
  const bottom = Math.min(viewY + viewH, fogRect.y + fogRect.h);
  if (right <= left || bottom <= top) {
    return;
  }

  const sourceW = record.element.naturalWidth || record.element.width;
  const sourceH = record.element.naturalHeight || record.element.height;
  const cropX = (left - fogRect.x) / fogRect.w * sourceW;
  const cropY = (top - fogRect.y) / fogRect.h * sourceH;
  const cropW = (right - left) / fogRect.w * sourceW;
  const cropH = (bottom - top) / fogRect.h * sourceH;
  const destinationX = (left - viewX) * YARD_WORLD_SCALE;
  const destinationY = (top - viewY) * YARD_WORLD_SCALE;

  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.globalCompositeOperation = "multiply";
  ctx.filter = "grayscale(1)";
  ctx.drawImage(
    record.element,
    cropX,
    cropY,
    cropW,
    cropH,
    destinationX,
    destinationY,
    (right - left) * YARD_WORLD_SCALE,
    (bottom - top) * YARD_WORLD_SCALE
  );
  ctx.restore();
}

function renderYardBackgroundActors(ctx) {
  if (isOpeningYardArrival()) {
    return;
  }

  if (GameState.sideRoute.active && GameState.sideRoute.backgroundCrowd.length > 0) {
    GameState.sideRoute.backgroundCrowd.forEach((prisoner) => {
      renderYardPrisoner(ctx, prisoner, prisoner);
    });
  } else {
    YardLayout.backgroundPrisoners.forEach((prisoner) => {
      const route = getLoopPathPosition(prisoner.path, GameState.playTime * prisoner.speed + prisoner.phase);
      renderYardPrisoner(ctx, prisoner, route);
    });
  }

  GameState.yardPrisoners.forEach((prisoner) => {
    const rect = renderYardPrisoner(ctx, prisoner, {
      x: prisoner.x,
      y: prisoner.y,
      facing: prisoner.facing,
      isMoving: prisoner.isMoving,
      walkAnimTime: prisoner.walkAnimTime
    });
    if (prisoner.name) {
      renderYardNameTag(ctx, prisoner.name, rect.x + rect.w / 2, rect.y - 4);
    }
  });

  if (!GameState.sideRoute.active ||
    GameState.sideRoute.stage === "morningPatrol" ||
    GameState.sideRoute.stage === "morningGateCaught" ||
    GameState.sideRoute.stage === "libraryTalk" ||
    GameState.sideRoute.stage === "brooksDialogue" ||
    GameState.sideRoute.stage === "returnToCellSleep") {
    GameState.yardGuards.forEach((guard) => {
      renderYardGuard(ctx, guard);
    });
  }

  YardLayout.npcs.forEach((npc, index) => {
    if ((GameState.twentyYearsPassed || GameState.libraryTask.brooksInside) && npc.id === "brooks") {
      return;
    }
    if (npc.id === "red") {
      initializeRedNpcState();
      const rect = renderYardRed(ctx, npc);
      renderYardNameTag(ctx, npc.name, rect.x + rect.w / 2, rect.y - 4);
      return;
    }
    if (npc.id === "brooks") {
      initializeBrooksNpcState();
      const rect = renderYardBrooks(ctx, npc);
      renderYardNameTag(ctx, npc.name, rect.x + rect.w / 2, rect.y - 4);
      return;
    }
    const facing = getIdleTurnFacing(npc.baseFacing, index * 0.65);
    const rect = renderYardCharacter(ctx, npc.assetKey, npc.x, npc.y, npc.h, facing);
    renderYardNameTag(ctx, npc.name, rect.x + rect.w / 2, rect.y - 4);
  });
}

function renderSideRouteYardCustody(ctx) {
  if (!GameState.sideRoute.active || !isSideRouteYardLocked()) {
    return;
  }
  const sideRoute = GameState.sideRoute;
  const wardenRect = renderYardWardenCharacter(ctx, sideRoute.warden);
  renderYardNameTag(ctx, "幕后主使", wardenRect.x + wardenRect.w / 2, wardenRect.y - 4);
  sideRoute.guards.forEach((guard) => {
    const rect = renderYardGuard(ctx, guard);
    renderYardNameTag(ctx, "看守", rect.x + rect.w / 2, rect.y - 4);
  });
}

function renderAmbientConversation(ctx) {
  const topic = getActiveAmbientConversationTopic();
  const state = GameState.ambientConversation;
  if (!topic || isAmbientConversationSystemBlocked()) {
    return;
  }
  const line = topic.lines[state.lineIndex];
  const speakerKey = getAmbientLineSpeakerKey(topic, line);
  const speaker = getAmbientConversationActor(speakerKey);
  if (!line || !speaker) {
    return;
  }

  const fadeSeconds = SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS;
  let alpha = 1;
  if (state.lineTimer < fadeSeconds) {
    alpha = state.lineTimer / fadeSeconds;
  } else if (state.lineTimer > AMBIENT_CHAT_LINE_SECONDS - fadeSeconds) {
    alpha = (AMBIENT_CHAT_LINE_SECONDS - state.lineTimer) / fadeSeconds;
  }
  const foot = yardImagePointToScreen(speaker.actor.x, speaker.actor.y);
  const drawHeight = (speaker.actor.h || YARD_CHARACTER_HEIGHT) * getCurrentCharacterRenderScale();
  const screenY = foot.y - drawHeight - 26;
  ctx.save();
  ctx.globalAlpha = clamp(alpha, 0, 1);
  ctx.fillStyle = "#f4f1e8";
  ctx.font = "18px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  const halfWidth = ctx.measureText(line.text).width / 2;
  const screenX = clamp(foot.x, halfWidth + 12, CANVAS_WIDTH - halfWidth - 12);
  ctx.fillText(line.text, screenX, Math.max(24, screenY));
  ctx.restore();
}

function renderAmbientEvidenceNotice(ctx) {
  const state = GameState.ambientConversation;
  if (!state.noticeText || state.noticeTimer <= 0 || GameState.scene !== "yard") {
    return;
  }
  const fadeSeconds = 0.3;
  const alpha = state.noticeTimer < fadeSeconds ? state.noticeTimer / fadeSeconds : 1;
  const box = { x: 322, y: 22, w: 636, h: 54 };
  ctx.save();
  ctx.globalAlpha = clamp(alpha, 0, 1);
  ctx.fillStyle = "rgba(10, 10, 10, 0.82)";
  ctx.fillRect(box.x, box.y, box.w, box.h);
  ctx.strokeStyle = "#a88f55";
  ctx.lineWidth = 2;
  ctx.strokeRect(box.x + 1, box.y + 1, box.w - 2, box.h - 2);
  ctx.fillStyle = "#f4f1e8";
  ctx.font = "18px 'Microsoft YaHei', 'SimHei', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(state.noticeText, box.x + box.w / 2, box.y + box.h / 2);
  ctx.restore();
}

function renderSideRouteCrowdRemarks(ctx) {
  const sideRoute = GameState.sideRoute;
  if (!sideRoute.active ||
    !["crowdGathering", "wardenAddress", "escortToSolitary"].includes(sideRoute.stage) ||
    sideRoute.crowdRemarkStartedAt < 0) {
    return;
  }

  const actors = sideRoute.backgroundCrowd.concat(GameState.yardPrisoners);
  actors.forEach((actor) => {
    renderSideRouteCrowdRemark(ctx, actor, sideRoute.crowdRemarkStartedAt);
  });
}

function renderSideRouteYardTrial(ctx) {
  const sideRoute = GameState.sideRoute;
  if (!sideRoute.active || !sideRoute.yardTrialActive ||
    !["crowdGathering", "wardenAddress"].includes(sideRoute.stage)) {
    return;
  }
  renderDialogueBox(ctx, SideRouteWardenAddressLines[sideRoute.yardTrialLineIndex] || "");
}

function renderSideRouteGuardWarning(ctx) {
  const sideRoute = GameState.sideRoute;
  const warningStartedAt = sideRoute.warningRemarkStartedAt;
  const totalSeconds = SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS * 2 +
    SIDE_ROUTE_CROWD_REMARK_DISPLAY_SECONDS;
  if (!sideRoute.active || !isSideRouteYardLocked() || warningStartedAt < 0 ||
    GameState.playTime - warningStartedAt > totalSeconds) {
    return;
  }
  renderSideRouteCrowdRemark(ctx, sideRoute.guards[0], warningStartedAt, true);
}

function renderSideRouteCrowdRemark(ctx, actor, startedAt, showWhileMoving) {
  const remark = actor && actor.crowdRemark;
  if (!remark || (actor.isMoving && !showWhileMoving)) {
    return;
  }

  const remarkStartedAt = Number.isFinite(remark.startedAt) ? remark.startedAt : startedAt;
  const localTime = GameState.playTime - remarkStartedAt - remark.delay;
  const totalSeconds = SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS * 2 +
    SIDE_ROUTE_CROWD_REMARK_DISPLAY_SECONDS;
  if (localTime < 0 || localTime > totalSeconds) {
    return;
  }

  let alpha = 1;
  if (localTime < SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS) {
    alpha = localTime / SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS;
  } else if (localTime > SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS +
    SIDE_ROUTE_CROWD_REMARK_DISPLAY_SECONDS) {
    alpha = (totalSeconds - localTime) / SIDE_ROUTE_CROWD_REMARK_FADE_SECONDS;
  }

  const foot = yardImagePointToScreen(actor.x, actor.y);
  const drawHeight = (actor.h || YARD_CHARACTER_HEIGHT) * getCurrentCharacterRenderScale();
  const screenY = foot.y - drawHeight - 26;
  ctx.save();
  ctx.globalAlpha = clamp(alpha, 0, 1);
  ctx.fillStyle = "#f4f1e8";
  ctx.font = "18px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  const halfWidth = ctx.measureText(remark.text).width / 2;
  const screenX = clamp(foot.x, halfWidth + 12, CANVAS_WIDTH - halfWidth - 12);
  // 刻意只绘制文字，不添加描边、底色、边框或毛玻璃。
  ctx.fillText(remark.text, screenX, Math.max(24, screenY));
  ctx.restore();
}

function renderYardWardenCharacter(ctx, actor) {
  const frame = getWardenSpriteFrame(actor.facing, actor.isMoving, actor.walkAnimTime);
  return renderWardenSpriteFrame(
    ctx,
    frame.assetKey,
    actor.x,
    actor.y,
    YARD_CHARACTER_HEIGHT,
    Boolean(frame.flip),
    frame.index,
    yardImagePointToScreen
  ) || renderYardCharacter(ctx, "warden", actor.x, actor.y, YARD_CHARACTER_HEIGHT, actor.facing);
}

const TriptychCropCache = Object.create(null);

function renderYardGuard(ctx, guard) {
  const facing = guard.visualFacing || guard.facing || "down";
  return renderDirectionalNpcSprite(
    ctx,
    "guard",
    guard.x,
    guard.y,
    YARD_CHARACTER_HEIGHT,
    facing,
    guard.isMoving,
    guard.walkAnimTime,
    yardImagePointToScreen
  ) || renderYardCharacter(ctx, "guard", guard.x, guard.y, YARD_CHARACTER_HEIGHT, facing);
}

function renderYardPrisoner(ctx, prisoner, route) {
  const facing = route.facing || "down";
  const drawHeight = prisoner.h || YARD_CHARACTER_HEIGHT;
  if (DirectionalNpcSpriteSheets[prisoner.assetKey]) {
    return renderDirectionalNpcSprite(
      ctx,
      prisoner.assetKey,
      route.x,
      route.y,
      drawHeight,
      facing,
      route.isMoving !== false,
      typeof route.walkAnimTime === "number" ? route.walkAnimTime : GameState.playTime,
      yardImagePointToScreen
    ) || renderYardCharacter(ctx, prisoner.assetKey, route.x, route.y, drawHeight, facing);
  }
  const frameSet = PrisonerWalkFrames[prisoner.assetKey];
  const frames = frameSet ? frameSet[facing] || frameSet.down : null;
  if (!frames || frames.length === 0) {
    return renderYardCharacter(ctx, prisoner.assetKey, route.x, route.y, drawHeight, facing);
  }

  const moving = route.isMoving !== false;
  const frameTime = typeof route.walkAnimTime === "number" ? route.walkAnimTime : GameState.playTime + (prisoner.phase || 0);
  const frameDuration = prisoner.walkFrameSeconds || PRISONER_WALK_FRAME_SECONDS;
  const idleFrameIndex = typeof prisoner.idleFrameIndex === "number" ? prisoner.idleFrameIndex : 1;
  const frameIndex = moving ? Math.floor(frameTime / frameDuration) % frames.length : idleFrameIndex;
  const frame = frames[frameIndex] || frames[0];
  return renderYardPrisonerFrame(
    ctx,
    frame.assetKey,
    route.x,
    route.y,
    drawHeight,
    facing,
    Boolean(frame.flip),
    prisoner.assetKey
  );
}

function renderYardRed(ctx, npc) {
  const red = GameState.redNpc;
  const facing = red.facing || npc.baseFacing || "down";
  const sprite = RedSpriteSheets[facing] || RedSpriteSheets.down;
  const frameIndex = red.isMoving
    ? Math.floor(red.walkAnimTime / RED_WALK_FRAME_SECONDS) % RED_SPRITE_FRAME_COUNT
    : 0;

  return renderYardRedFrame(
    ctx,
    sprite.assetKey,
    red.x,
    red.y,
    npc.h,
    facing,
    Boolean(sprite.flip),
    frameIndex,
    npc.assetKey
  );
}

function renderYardBrooks(ctx, npc) {
  const brooks = GameState.brooksNpc;
  const facing = brooks.facing || npc.baseFacing || "down";
  return renderDirectionalNpcSprite(
    ctx,
    "brooks",
    brooks.x,
    brooks.y,
    npc.h,
    facing,
    brooks.isMoving,
    brooks.walkAnimTime,
    yardImagePointToScreen
  ) || renderYardCharacter(ctx, npc.assetKey, brooks.x, brooks.y, npc.h, facing);
}

function renderYardRedFrame(ctx, assetKey, imageX, imageY, h, facing, flip, frameIndex, fallbackAssetKey) {
  const record = getImageAssetRecord(assetKey);
  if (!record || !record.loaded || record.failed) {
    return renderYardCharacter(ctx, fallbackAssetKey || "red", imageX, imageY, h, facing);
  }

  const frameWidth = record.element.naturalWidth / RED_SPRITE_FRAME_COUNT;
  const frameX = (Math.floor(frameIndex) % RED_SPRITE_FRAME_COUNT) * frameWidth;
  const foot = yardImagePointToScreen(imageX, imageY);
  const drawSize = RedDrawSize[facing] || RedDrawSize.down;
  const characterScale = getCurrentCharacterRenderScale();
  const w = characterScale === 1 ? drawSize.w : Math.max(1, Math.round(drawSize.w * characterScale));
  const fixedH = characterScale === 1 ? drawSize.h : Math.max(1, Math.round(drawSize.h * characterScale));
  const x = foot.x - w / 2;
  const y = foot.y - fixedH;

  ctx.save();
  if (flip) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(record.element, frameX, 0, frameWidth, record.element.naturalHeight, 0, 0, w, fixedH);
  } else {
    ctx.drawImage(record.element, frameX, 0, frameWidth, record.element.naturalHeight, x, y, w, fixedH);
  }
  ctx.restore();

  return { x, y, w, h: fixedH };
}

function renderYardPrisonerFrame(ctx, assetKey, imageX, imageY, h, fallbackFacing, flip, fallbackAssetKey) {
  const record = getImageAssetRecord(assetKey);
  if (!record || !record.loaded || record.failed) {
    return renderYardCharacter(ctx, fallbackAssetKey || "prisoner_01", imageX, imageY, h, fallbackFacing);
  }

  const sourceW = Math.max(1, getSourceWidth(record.element));
  const sourceH = Math.max(1, getSourceHeight(record.element));
  const foot = yardImagePointToScreen(imageX, imageY);
  const characterScale = getCurrentCharacterRenderScale();
  const drawHeight = characterScale === 1 ? h : Math.max(1, Math.round(h * characterScale));
  const w = Math.max(1, Math.round(drawHeight * sourceW / sourceH));
  const x = foot.x - w / 2;
  const y = foot.y - drawHeight;

  ctx.save();
  if (flip) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(record.element, 0, 0, sourceW, sourceH, 0, 0, w, drawHeight);
  } else {
    ctx.drawImage(record.element, 0, 0, sourceW, sourceH, x, y, w, drawHeight);
  }
  ctx.restore();

  return { x, y, w, h: drawHeight };
}

function renderYardCharacter(ctx, assetKey, imageX, imageY, h, facing) {
  const rect = getYardCharacterDrawRect(assetKey, imageX, imageY, h, facing);
  renderTriptychCharacter(ctx, assetKey, rect.x, rect.y, rect.w, rect.h, facing);
  return rect;
}

function getYardCharacterDrawRect(assetKey, imageX, imageY, h, facing) {
  const size = getTriptychCharacterSize(assetKey, h, facing);
  const foot = yardImagePointToScreen(imageX, imageY);
  return {
    x: foot.x - size.w / 2,
    y: foot.y - size.h,
    w: size.w,
    h: size.h
  };
}

function getTriptychCharacterSize(assetKey, preferredHeight, facing) {
  const frame = getTriptychFrameInfo(assetKey, facing);
  const characterScale = getCurrentCharacterRenderScale();
  const h = characterScale === 1 ? preferredHeight : Math.max(1, Math.round(preferredHeight * characterScale));
  if (!frame) {
    const w = characterScale === 1 ? YARD_CHARACTER_FALLBACK_WIDTH :
      Math.max(1, Math.round(YARD_CHARACTER_FALLBACK_WIDTH * characterScale));
    return { w, h };
  }

  return {
    w: Math.max(1, Math.round(h * frame.sw / Math.max(1, frame.sh))),
    h
  };
}

function renderTriptychCharacter(ctx, assetKey, x, y, w, h, facing) {
  const frame = getTriptychFrameInfo(assetKey, facing);
  if (!frame) {
    drawAsset(ctx, assetKey, x, y, w, h);
    return;
  }

  ctx.save();
  if (frame.flip) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(frame.source, frame.sx, frame.sy, frame.sw, frame.sh, 0, 0, w, h);
  } else {
    ctx.drawImage(frame.source, frame.sx, frame.sy, frame.sw, frame.sh, x, y, w, h);
  }
  ctx.restore();
}

function getTriptychFrameInfo(assetKey, facing) {
  const record = getImageAssetRecord(assetKey);
  if (!record || !record.loaded || record.failed) {
    return null;
  }

  const source = record.element;
  const frameW = Math.max(1, Math.floor(getSourceWidth(source) / 3));
  const frameH = Math.max(1, getSourceHeight(source));
  let frameIndex = 0;
  let flip = false;

  if (facing === "up") {
    frameIndex = 1;
  } else if (facing === "right") {
    frameIndex = 2;
  } else if (facing === "left") {
    frameIndex = 2;
    flip = true;
  }

  const crop = getTriptychVisibleCrop(assetKey, source, frameIndex, frameW, frameH);
  return {
    source,
    sx: frameIndex * frameW + crop.x,
    sy: crop.y,
    sw: crop.w,
    sh: crop.h,
    flip
  };
}

function getTriptychVisibleCrop(assetKey, source, frameIndex, frameW, frameH) {
  const cacheKey = assetKey + ":" + frameIndex;
  if (TriptychCropCache[cacheKey]) {
    return TriptychCropCache[cacheKey];
  }

  const fallback = { x: 0, y: 0, w: frameW, h: frameH };
  try {
    const scanCanvas = document.createElement("canvas");
    scanCanvas.width = frameW;
    scanCanvas.height = frameH;
    const scanCtx = scanCanvas.getContext("2d");
    scanCtx.drawImage(source, frameIndex * frameW, 0, frameW, frameH, 0, 0, frameW, frameH);
    const pixels = scanCtx.getImageData(0, 0, frameW, frameH).data;
    let minX = frameW;
    let minY = frameH;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < frameH; y += 1) {
      for (let x = 0; x < frameW; x += 1) {
        const alpha = pixels[(y * frameW + x) * 4 + 3];
        if (alpha > 12) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }

    if (maxX >= minX && maxY >= minY) {
      const padding = 2;
      TriptychCropCache[cacheKey] = {
        x: Math.max(0, minX - padding),
        y: Math.max(0, minY - padding),
        w: Math.min(frameW, maxX - minX + 1 + padding * 2),
        h: Math.min(frameH, maxY - minY + 1 + padding * 2)
      };
      return TriptychCropCache[cacheKey];
    }
  } catch (error) {
    if (DEBUG_MODE) {
      console.warn(error);
    }
  }

  TriptychCropCache[cacheKey] = fallback;
  return fallback;
}

function renderYardNameTag(ctx, label, screenX, screenY) {
  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(10, 10, 10, 0.78)";
  ctx.fillStyle = "#f5df9d";
  ctx.font = "bold 17px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.strokeText(label, screenX, screenY);
  ctx.fillText(label, screenX, screenY + 2);
  ctx.restore();
}

function getIdleTurnFacing(baseFacing, offset) {
  const step = Math.floor((GameState.playTime + offset) / 1.2) % 7;
  if (step === 2) return baseFacing === "left" ? "right" : "left";
  if (step === 5) return baseFacing;
  return "down";
}

function getLoopPathPosition(path, progress) {
  if (!path || path.length === 0) {
    return { x: 0, y: 0, facing: "down" };
  }

  let total = 0;
  const segments = [];
  for (let i = 0; i < path.length; i += 1) {
    const a = path[i];
    const b = path[(i + 1) % path.length];
    const length = distance(a.x, a.y, b.x, b.y);
    total += length;
    segments.push({ a, b, length });
  }

  let target = ((progress % 1) + 1) % 1 * total;
  for (let i = 0; i < segments.length; i += 1) {
    const segment = segments[i];
    if (target <= segment.length) {
      const t = segment.length === 0 ? 0 : target / segment.length;
      const x = segment.a.x + (segment.b.x - segment.a.x) * t;
      const y = segment.a.y + (segment.b.y - segment.a.y) * t;
      return { x, y, facing: directionFromDelta(segment.b.x - segment.a.x, segment.b.y - segment.a.y) };
    }
    target -= segment.length;
  }

  const first = path[0];
  return { x: first.x, y: first.y, facing: "down" };
}


function directionFromDelta(dx, dy) {
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx < 0 ? "left" : "right";
  }
  return dy < 0 ? "up" : "down";
}

function renderPause(ctx) {
  renderPixelRoomBackdrop(ctx);
  renderPanel(ctx, 410, 220, 460, 250);
  ctx.fillStyle = "#f5df9d";
  ctx.font = "38px monospace";
  ctx.textAlign = "center";
  ctx.fillText(TextData.pauseTitle, CANVAS_WIDTH / 2, 292);
  ctx.fillStyle = "#ffffff";
  ctx.font = "22px monospace";
  ctx.fillText(TextData.pauseHint, CANVAS_WIDTH / 2, 346);
  ctx.fillStyle = "#2a2113";
  ctx.fillRect(
    AchievementPanelButtonRect.x,
    AchievementPanelButtonRect.y,
    AchievementPanelButtonRect.w,
    AchievementPanelButtonRect.h
  );
  ctx.strokeStyle = "#b3914d";
  ctx.lineWidth = 3;
  ctx.strokeRect(
    AchievementPanelButtonRect.x,
    AchievementPanelButtonRect.y,
    AchievementPanelButtonRect.w,
    AchievementPanelButtonRect.h
  );
  ctx.fillStyle = "#f5df9d";
  ctx.font = "bold 22px 'Microsoft YaHei', monospace";
  ctx.fillText(
    "查看成就  " + AchievementSystem.getUnlockedCount() + " / " + AchievementDefinitions.length,
    CANVAS_WIDTH / 2,
    426
  );
}

function renderFail(ctx) {
  ctx.fillStyle = "#160909";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  renderPanel(ctx, 370, 250, 540, 190);
  ctx.fillStyle = "#ffdddd";
  ctx.font = "38px monospace";
  ctx.textAlign = "center";
  ctx.fillText(TextData.failTitle, CANVAS_WIDTH / 2, 318);
  ctx.fillStyle = "#ffffff";
  ctx.font = "22px monospace";
  renderWrappedText(ctx, GameState.failReason || TextData.failHint, CANVAS_WIDTH / 2, 358, 490, 28);
  if (SHOW_GAMEPLAY_TEXT_HINTS && GameState.failRecovery === "soilDump") {
    ctx.font = "18px monospace";
    ctx.fillText("右下按钮 / 空格键：回到刚获得小土堆后", CANVAS_WIDTH / 2, 410);
  } else if (SHOW_GAMEPLAY_TEXT_HINTS && GameState.failRecovery === "pipeBeforeTunnel") {
    ctx.font = "18px monospace";
    ctx.fillText("右下按钮 / 空格键：回到进入洞口之前", CANVAS_WIDTH / 2, 410);
  } else if (SHOW_GAMEPLAY_TEXT_HINTS && GameState.failRecovery === "sideRouteMorning") {
    ctx.font = "18px monospace";
    const secondsLeft = Math.max(0, Math.ceil(
      SIDE_ROUTE_GATE_FAILURE_RETURN_SECONDS - GameState.failRecoveryTimer
    ));
    ctx.fillText("点击右下按钮或按空格键，返回上一节点", CANVAS_WIDTH / 2, 410);
    ctx.fillText(secondsLeft + " 秒后将自动返回", CANVAS_WIDTH / 2, 436);
  } else if (SHOW_GAMEPLAY_TEXT_HINTS && GameState.failRecovery === "sideRouteOffice") {
    ctx.font = "18px monospace";
    ctx.fillText("右下按钮 / 空格键：回到刚进入办公室时", CANVAS_WIDTH / 2, 426);
  } else if (SHOW_GAMEPLAY_TEXT_HINTS && GameState.failRecovery === "officeInspection") {
    ctx.font = "18px monospace";
    ctx.fillText("右下按钮 / 空格键：回到办公室门外", CANVAS_WIDTH / 2, 426);
  }
}

function renderGateBlackout(ctx) {
  renderSolidScreen(ctx, "#050505");
  ctx.save();
  ctx.fillStyle = "#f5df9d";
  ctx.font = "38px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getGateBlackoutVisibleMessage(), CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  ctx.restore();
}

function getGateBlackoutMessageDuration() {
  return GATE_BLACKOUT_MESSAGE.length * GATE_BLACKOUT_TYPEWRITER_CHAR_SECONDS;
}

function isGateBlackoutMessageComplete() {
  return GameState.surgerySequence.timer >= getGateBlackoutMessageDuration();
}

function getGateBlackoutVisibleMessage() {
  const visibleCharacters = Math.min(
    GATE_BLACKOUT_MESSAGE.length,
    Math.floor(GameState.surgerySequence.timer / GATE_BLACKOUT_TYPEWRITER_CHAR_SECONDS)
  );
  return GATE_BLACKOUT_MESSAGE.slice(0, visibleCharacters);
}

function renderOperatingRoomStill(ctx, assetKey) {
  renderSolidScreen(ctx, "#000000");
  drawAssetContain(ctx, assetKey, 1248, 1248);
}

function getOperatingRoomBlackoutTypewriterDuration() {
  return OPERATING_ROOM_BLACKOUT_MESSAGE.length * OPERATING_ROOM_BLACKOUT_TYPEWRITER_CHAR_SECONDS;
}

function getOperatingRoomBlackoutDuration() {
  return getOperatingRoomBlackoutTypewriterDuration() + OPERATING_ROOM_BLACKOUT_HOLD_SECONDS;
}

function getOperatingRoomBlackoutVisibleMessage() {
  const visibleCharacters = Math.min(
    OPERATING_ROOM_BLACKOUT_MESSAGE.length,
    Math.floor(GameState.surgerySequence.timer / OPERATING_ROOM_BLACKOUT_TYPEWRITER_CHAR_SECONDS)
  );
  return OPERATING_ROOM_BLACKOUT_MESSAGE.slice(0, visibleCharacters);
}

function renderOperatingRoomBlackout(ctx) {
  renderSolidScreen(ctx, "#000000");
  ctx.save();
  ctx.fillStyle = "#f1eee7";
  ctx.font = "40px 'Microsoft YaHei', 'PingFang SC', 'SimHei', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  renderWrappedText(
    ctx,
    getOperatingRoomBlackoutVisibleMessage(),
    CANVAS_WIDTH / 2,
    334,
    1050,
    52
  );
  ctx.restore();
}

function renderPlaceholderScene(ctx, sceneName) {
  renderPixelRoomBackdrop(ctx);
  renderCenteredText(ctx, sceneName, "");
}


function renderVignette(ctx, alpha) {
  const gradient = ctx.createRadialGradient(640, 320, 160, 640, 320, 720);
  gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
  gradient.addColorStop(1, "rgba(0, 0, 0, " + alpha + ")");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderPixelRoomBackdrop(ctx) {
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#171717";
  for (let y = 0; y < CANVAS_HEIGHT; y += 64) {
    ctx.fillRect(0, y, CANVAS_WIDTH, 32);
  }
  ctx.fillStyle = "#242424";
  ctx.fillRect(0, 520, CANVAS_WIDTH, 200);
}

function renderCellWallHole(ctx) {
  if (!GameState.wallHole.revealed) {
    return;
  }

  drawAssetContainInBounds(ctx, "hole_photo", cellImageRectToCanvas(CellLayout.pictureCoverFrame), 1530, 771);
}

function renderCellInteractionHints(ctx) {
  if (isWallHoleRevealTransitionActive()) {
    return;
  }

  const activeInteraction = getActiveCellInteraction();
  ctx.save();
  if (!isSideRouteCellReturn() && isPlayerNearCellDoor() && !GameState.player.lyingInBed) {
    ctx.strokeStyle = "#f5df9d";
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.beginPath();
    CellLayout.doorFrame.forEach((point, index) => {
      const canvasPoint = cellImageToCanvasPoint(point.x, point.y);
      if (index === 0) {
        ctx.moveTo(canvasPoint.x, canvasPoint.y);
      } else {
        ctx.lineTo(canvasPoint.x, canvasPoint.y);
      }
    });
    ctx.closePath();
    ctx.stroke();
  }
  if (GameState.player.lyingInBed || ((canRestAtCellBed() || isSideRouteCellReturn()) && isPlayerNearCellBed())) {
    const bed = cellImageRectToCanvas(
      GameState.player.lyingInBed ? CellLayout.bed : CellLayout.bedInteractZone
    );
    ctx.strokeStyle = "#f5df9d";
    ctx.lineWidth = 4;
    ctx.strokeRect(bed.x, bed.y, bed.w, bed.h);
    ctx.fillStyle = "rgba(245, 223, 157, 0.12)";
    ctx.fillRect(bed.x, bed.y, bed.w, bed.h);
  }
  if (activeInteraction && (
    activeInteraction.id === "wallDigHint" ||
    activeInteraction.id === "wallSecretCheck" ||
    activeInteraction.id === "hangPoster" ||
    activeInteraction.id === "wallPicture"
  )) {
    const picture = cellImageRectToCanvas(CellLayout.pictureCoverFrame);
    ctx.strokeStyle = "#f5df9d";
    ctx.lineWidth = 4;
    ctx.strokeRect(picture.x, picture.y, picture.w, picture.h);
    ctx.fillStyle = "rgba(245, 223, 157, 0.12)";
    ctx.fillRect(picture.x, picture.y, picture.w, picture.h);
  }
  if (activeInteraction && (
    activeInteraction.id === "drawMap" ||
    activeInteraction.id === "hideHammer"
  )) {
    const table = cellImageRectToCanvas(CellLayout.tableDrawZone);
    ctx.strokeStyle = "#f5df9d";
    ctx.lineWidth = 4;
    ctx.strokeRect(table.x, table.y, table.w, table.h);
    ctx.fillStyle = "rgba(245, 223, 157, 0.1)";
    ctx.fillRect(table.x, table.y, table.w, table.h);
  }
  ctx.restore();
}

function renderDigInteractionHints(ctx) {
  if (isFinalDigScene()) {
    ctx.save();
    ctx.strokeStyle = "#f5df9d";
    ctx.lineWidth = 4;
    ctx.fillStyle = "rgba(245, 223, 157, 0.1)";
    const rect = digImageRectToCanvas(FinalDigLayout.pipeEntryZone);
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.restore();
    return;
  }

  const activeInteraction = getActiveDigInteraction();
  if (!activeInteraction) {
    return;
  }

  ctx.save();
  ctx.strokeStyle = "#f5df9d";
  ctx.lineWidth = 4;
  ctx.fillStyle = "rgba(245, 223, 157, 0.1)";
  if (activeInteraction.id === "dig") {
    const rect = digImageRectToCanvas(DigLayout.digZone);
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  } else if (activeInteraction.id === "leave") {
    const zone = DigLayout.leftExitZone;
    const rect = digImageRectToCanvas(zone);
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  }
  ctx.restore();
}

function renderPipeInteractionHints(ctx) {
  const activeInteraction = getActivePipeInteraction();
  if (!activeInteraction || activeInteraction.id !== "smashPipe") {
    return;
  }

  const rect = pipeImageRectToCanvas(PipeLayout.smashZone);
  ctx.save();
  ctx.strokeStyle = "#f5df9d";
  ctx.lineWidth = 4;
  ctx.fillStyle = "rgba(245, 223, 157, 0.1)";
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.restore();
}

function renderPipeCue(ctx) {
  const pipe = GameState.pipe;
  if (!pipe.cueVisible) {
    return;
  }

  const x = CANVAS_WIDTH - 92;
  const y = 78;
  const radius = 8;

  ctx.save();
  renderPipeCueProgressBar(ctx, pipe, x, y, radius + 5);

  ctx.beginPath();
  ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.58)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (pipe.cueLit) {
    ctx.shadowColor = "rgba(255, 255, 255, 0.95)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = "#ffffff";
  } else {
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#30343a";
  }
  ctx.fill();
  ctx.restore();
}

function getPipeCueProgress(pipe) {
  if (!pipe || !pipe.cueVisible) {
    return 0;
  }
  if (pipe.cueLit) {
    return clamp(pipe.cueTimer / PIPE_CUE_ACTIVE_SECONDS, 0, 1);
  }
  return clamp(pipe.cueProgress || 0, 0, 1);
}

function getPipeCueProgressBarRect(cueX, cueY, cueOuterRadius) {
  const w = PIPE_CUE_PROGRESS_BAR_WIDTH;
  const h = PIPE_CUE_PROGRESS_BAR_HEIGHT;
  return {
    x: cueX - cueOuterRadius - PIPE_CUE_PROGRESS_BAR_GAP - w,
    y: cueY - h / 2,
    w,
    h,
    radius: h / 2
  };
}

function renderPipeCueProgressBar(ctx, pipe, cueX, cueY, cueOuterRadius) {
  const progress = getPipeCueProgress(pipe);
  const bar = getPipeCueProgressBarRect(cueX, cueY, cueOuterRadius);

  roundedRectPath(ctx, bar.x - 3, bar.y - 3, bar.w + 6, bar.h + 6, bar.radius + 3);
  ctx.fillStyle = "rgba(0, 0, 0, 0.58)";
  ctx.fill();

  roundedRectPath(ctx, bar.x, bar.y, bar.w, bar.h, bar.radius);
  ctx.fillStyle = "#30343a";
  ctx.fill();

  if (progress > 0) {
    ctx.save();
    roundedRectPath(ctx, bar.x, bar.y, bar.w, bar.h, bar.radius);
    ctx.clip();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(bar.x, bar.y, bar.w * progress, bar.h);
    ctx.restore();
  }

  roundedRectPath(ctx, bar.x, bar.y, bar.w, bar.h, bar.radius);
  ctx.strokeStyle = pipe.cueLit ? "rgba(255, 255, 255, 0.92)" : "rgba(255, 255, 255, 0.42)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function renderPipeCueBrightness(ctx) {
  if (!GameState.pipe.cueLit) {
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, " + PIPE_CUE_SCREEN_BRIGHTNESS + ")";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawAsset(
    ctx,
    "pipe_lightning",
    CANVAS_WIDTH - PIPE_CUE_LIGHTNING_WIDTH,
    0,
    PIPE_CUE_LIGHTNING_WIDTH,
    PIPE_CUE_LIGHTNING_HEIGHT
  );
  ctx.restore();
}

function renderPipeVictory(ctx) {
  const pipe = GameState.pipe;
  if (pipe.victoryPhase === "none") {
    return;
  }

  ctx.save();
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (pipe.victoryPhase === "imageTitle") {
    const imageAlpha = clamp(pipe.victoryTimer / PIPE_VICTORY_IMAGE_FADE_SECONDS, 0, 1);
    const titleAlpha = clamp(
      (pipe.victoryTimer - PIPE_VICTORY_IMAGE_FADE_SECONDS) / PIPE_VICTORY_TITLE_FADE_SECONDS,
      0,
      1
    );
    renderPipeVictoryAlternatingImages(ctx, imageAlpha);
    renderPipeVictoryTitle(ctx, titleAlpha);
  } else if (pipe.victoryPhase === "quote") {
    renderPipeVictoryAlternatingImages(ctx, 1);
    renderPipeVictoryQuote(ctx, clamp(pipe.victoryTimer / PIPE_VICTORY_QUOTE_FADE_SECONDS, 0, 1));
  } else if (pipe.victoryPhase === "fadeOut") {
    renderPipeVictoryAlternatingImages(ctx, 1);
    renderPipeVictoryQuote(ctx, 1);
    ctx.globalAlpha = clamp(pipe.victoryTimer / PIPE_VICTORY_FADE_OUT_SECONDS, 0, 1);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else if (pipe.victoryPhase === "finalText") {
    renderPipeVictoryFinalText(ctx);
  }

  ctx.restore();
}

function renderPipeVictoryAlternatingImages(ctx, alpha) {
  const safeAlpha = clamp(alpha, 0, 1);
  if (safeAlpha <= 0) {
    return;
  }

  const frameTime = GameState.pipe.victoryImageTimer;
  const frameIndex = Math.floor(frameTime / PIPE_VICTORY_FRAME_SECONDS) % 2;
  const localFrameTime = frameTime % PIPE_VICTORY_FRAME_SECONDS;
  const currentKey = frameIndex === 0 ? "victory_escape_01" : "victory_escape_02";
  const nextKey = frameIndex === 0 ? "victory_escape_02" : "victory_escape_01";
  const crossfadeStart = PIPE_VICTORY_FRAME_SECONDS - PIPE_VICTORY_FRAME_CROSSFADE_SECONDS;

  ctx.save();
  ctx.globalAlpha = safeAlpha;
  drawAssetCover(ctx, currentKey, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (localFrameTime >= crossfadeStart) {
    const crossfadeAlpha = clamp(
      (localFrameTime - crossfadeStart) / PIPE_VICTORY_FRAME_CROSSFADE_SECONDS,
      0,
      1
    );
    ctx.globalAlpha = safeAlpha * crossfadeAlpha;
    drawAssetCover(ctx, nextKey, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  ctx.restore();
}

function renderPipeVictoryTitle(ctx, alpha) {
  renderPipeVictoryGlowText(ctx, "你成功的脱离了黑墙庄园", CANVAS_WIDTH / 2, 86, 34, alpha);
}

function renderPipeVictoryQuote(ctx, alpha) {
  ctx.save();
  const safeAlpha = clamp(alpha, 0, 1);
  ctx.globalAlpha = safeAlpha;
  const panelGradient = ctx.createLinearGradient(0, 456, 0, 604);
  panelGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
  panelGradient.addColorStop(0.24, "rgba(0, 0, 0, 0.52)");
  panelGradient.addColorStop(0.76, "rgba(0, 0, 0, 0.52)");
  panelGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = panelGradient;
  ctx.fillRect(0, 446, CANVAS_WIDTH, 176);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 38px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.lineWidth = 7;
  ctx.strokeStyle = "rgba(8, 4, 1, 0.9)";
  ctx.fillStyle = "#fff5d6";
  ctx.shadowColor = "rgba(255, 214, 112, 0.62)";
  ctx.shadowBlur = 22;
  ctx.strokeText("有些鸟儿是注定无法被关在笼子里的，", CANVAS_WIDTH / 2, 502);
  ctx.fillText("有些鸟儿是注定无法被关在笼子里的，", CANVAS_WIDTH / 2, 502);
  ctx.strokeText("他们身上的每一片羽翼都闪耀着自由的光辉", CANVAS_WIDTH / 2, 558);
  ctx.fillText("他们身上的每一片羽翼都闪耀着自由的光辉", CANVAS_WIDTH / 2, 558);

  ctx.globalAlpha = safeAlpha * 0.72;
  ctx.strokeStyle = "rgba(255, 222, 142, 0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(302, 530);
  ctx.lineTo(978, 530);
  ctx.stroke();
  ctx.restore();
}

function renderPipeVictoryFinalText(ctx) {
  const fadeAlpha = clamp(GameState.pipe.victoryTimer / PIPE_VICTORY_FINAL_TEXT_FADE_SECONDS, 0, 1);
  const flickerAlpha = clamp(0.72 + Math.sin(GameState.playTime * 18) * 0.2 + Math.sin(GameState.playTime * 41) * 0.08, 0.45, 1);
  renderPipeVictoryGlowText(
    ctx,
    "你自由了，你现在会.....",
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    34,
    fadeAlpha * flickerAlpha
  );
}

function renderPipeVictoryGlowText(ctx, text, x, y, fontSize, alpha) {
  const safeAlpha = clamp(alpha, 0, 1);
  if (safeAlpha <= 0) {
    return;
  }

  ctx.save();
  ctx.globalAlpha = safeAlpha;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold " + fontSize + "px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(12, 6, 2, 0.86)";
  ctx.fillStyle = "#fff4cf";
  ctx.shadowColor = "rgba(255, 232, 164, 0.55)";
  ctx.shadowBlur = 18;
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  ctx.restore();
}

function renderPlayer(ctx) {
  const player = GameState.player;
  if (GameState.scene === "cell" && player.lyingInBed) {
    renderLyingPlayer(ctx);
    return;
  }

  const screen = getPlayerScreenPosition(player.x, player.y);
  const drawRect = getScaledCharacterDrawRect(screen.x, screen.y, player.w, player.h);
  if (GameState.scene === "yard" && GameState.soilDump.active) {
    renderAndySoilDumpCycle(ctx, { ...player, w: drawRect.w, h: drawRect.h }, drawRect.x, drawRect.y);
    return;
  }
  renderAndyWalkCycle(ctx, { ...player, w: drawRect.w, h: drawRect.h }, drawRect.x, drawRect.y);
}

function renderDigPlayer(ctx) {
  const dig = GameState.dig;
  const playerY = isFinalDigScene() ? getTunnelPlayerY(FinalDigLayout, dig.playerH) : dig.playerY;
  const point = digImageToCanvasPoint(dig.playerX, playerY);
  const drawRect = getScaledCharacterDrawRect(point.x, point.y, dig.playerW, dig.playerH);
  const player = {
    w: drawRect.w,
    h: drawRect.h,
    facing: dig.facing,
    isMoving: dig.isMoving,
    walkAnimTime: dig.walkAnimTime
  };

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.fillRect(drawRect.x + 10, drawRect.y + drawRect.h - 8, Math.max(0, drawRect.w - 20), 8);
  ctx.restore();
  if (dig.isDigging) {
    renderAndyDigCycle(ctx, { ...dig, playerW: drawRect.w, playerH: drawRect.h }, drawRect.x, drawRect.y);
  } else {
    renderAndyWalkCycle(ctx, player, drawRect.x, drawRect.y);
  }
  renderDigProgressBar(ctx, point.x, point.y, dig.playerW, dig.playerH);
}

function renderPipePlayer(ctx) {
  const pipe = GameState.pipe;
  const point = pipeImageToCanvasPoint(pipe.playerX, pipe.playerY);
  const drawRect = getScaledCharacterDrawRect(point.x, point.y, pipe.playerW, pipe.playerH);
  const drawPipe = { ...pipe, playerW: drawRect.w, playerH: drawRect.h };

  if (pipe.phase === "crawl" || pipe.phase === "victory") {
    renderPipeCrawlPlayer(ctx, drawPipe, drawRect.x, drawRect.y);
    return;
  }

  if (pipe.phase === "drown") {
    renderPipeDrownPlayer(ctx, drawPipe, drawRect.x, drawRect.y);
    return;
  }

  const player = {
    w: drawRect.w,
    h: drawRect.h,
    facing: pipe.facing,
    isMoving: pipe.isMoving,
    walkAnimTime: pipe.walkAnimTime
  };

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.fillRect(drawRect.x + 10, drawRect.y + drawRect.h - 8, Math.max(0, drawRect.w - 20), 8);
  ctx.restore();
  if (pipe.isSmashing) {
    renderAndyDigCycle(ctx, drawPipe, drawRect.x, drawRect.y);
  } else {
    renderAndyWalkCycle(ctx, player, drawRect.x, drawRect.y);
  }
}

function renderPipeSmashHint(ctx) {
  if (!SHOW_GAMEPLAY_TEXT_HINTS) {
    return;
  }
  const pipe = GameState.pipe;
  if (pipe.smashHintTimer <= 0 || pipe.phase !== "smash" || pipe.smashCompleted) {
    return;
  }

  renderNarrativeBox(ctx, "趁着打雷的时候再砸管道！\n不然会被看守发现！");
}

function getPipeFrameDrawW(frame, playerH) {
  return Math.round(frame.w * playerH / Math.max(1, frame.h));
}

function getPipeCrawlPlayerW(playerH) {
  return PipeCrawlFrames.reduce((maxWidth, frame) => Math.max(maxWidth, getPipeFrameDrawW(frame, playerH)), 1);
}

function getPipeDrownPlayerW(playerH) {
  return getPipeFrameDrawW(PipeDrownFrame, playerH);
}

function getPipeDrownPlayerH(playerH) {
  return Math.max(1, Math.round(playerH * Math.sqrt(PIPE_DROWN_AREA_SCALE)));
}

function renderPipeCrawlPlayer(ctx, pipe, x, y) {
  const frameIndex = pipe.isMoving ?
    Math.floor(pipe.crawlAnimTime / PIPE_CRAWL_FRAME_SECONDS) % PipeCrawlFrames.length :
    0;
  const frame = PipeCrawlFrames[frameIndex] || PipeCrawlFrames[0];
  const drawW = getPipeFrameDrawW(frame, pipe.playerH);
  const drawX = x + (pipe.playerW - drawW) / 2;
  drawPipeFrame(ctx, frame, drawX, y, drawW, pipe.playerH, pipe.facing === "left");
}

function renderPipeDrownPlayer(ctx, pipe, x, y) {
  drawPipeFrame(ctx, PipeDrownFrame, x, y, getPipeDrownPlayerW(pipe.playerH), pipe.playerH, false);
}

function drawPipeFrame(ctx, frame, x, y, w, h, flip) {
  const record = getImageAssetRecord(frame.assetKey);
  if (!record || !record.loaded || record.failed) {
    drawMissingAsset(ctx, frame.assetKey, x, y, w, h);
    return;
  }

  ctx.save();
  if (flip) {
    ctx.translate(Math.round(x + w), Math.round(y));
    ctx.scale(-1, 1);
    ctx.drawImage(record.element, frame.x, frame.y, frame.w, frame.h, 0, 0, Math.round(w), Math.round(h));
  } else {
    ctx.drawImage(record.element, frame.x, frame.y, frame.w, frame.h, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }
  ctx.restore();
}

function renderAndyDigCycle(ctx, dig, x, y) {
  const animTime = dig.digAnimTime || dig.smashAnimTime || 0;
  const frameIndex = Math.floor(animTime / ANDY_DIG_FRAME_SECONDS) % AndyDigFrames.length;
  const frame = AndyDigFrames[frameIndex] || AndyDigFrames[0];
  const record = getImageAssetRecord(frame.assetKey);
  if (!record || !record.loaded || record.failed) {
    renderAndySprite(ctx, x, y, dig.playerW, dig.playerH, "right");
    return;
  }

  const scale = dig.playerH / Math.max(1, frame.h);
  const drawW = Math.round(frame.w * scale);
  const drawH = Math.round(frame.h * scale);
  const footX = x + dig.playerW / 2;
  const footY = y + dig.playerH;
  const drawX = footX - (frame.anchorX - frame.x) * scale;
  const drawY = footY - (frame.anchorY - frame.y) * scale;
  ctx.drawImage(record.element, frame.x, frame.y, frame.w, frame.h, drawX, drawY, drawW, drawH);
}

// @feature AndySoilDumpAnimation
// @test 倒土长按期间角色不移动、不播放走路帧；保持原朝向，并在用户提供的两张倒土帧之间循环切换。
function renderAndySoilDumpCycle(ctx, player, x, y) {
  const frameIndex = Math.floor(GameState.soilDump.animTime / ANDY_SOIL_DUMP_FRAME_SECONDS) % AndySoilDumpFrames.length;
  const frame = AndySoilDumpFrames[frameIndex] || AndySoilDumpFrames[0];
  const directionKey = player.facing === "left" ? "right" : player.facing;
  const direction = AndySoilDumpDirectionFrames[directionKey] || AndySoilDumpDirectionFrames.right;
  const record = getImageAssetRecord(frame.assetKey);
  if (!record || !record.loaded || record.failed) {
    renderAndySprite(ctx, x, y, player.w, player.h, player.facing);
    return;
  }

  const source = record.element;
  const scale = player.h / direction.referenceHeight;
  const drawW = Math.round(direction.w * scale);
  const drawH = Math.round(direction.h * scale);
  const drawX = Math.round(x + (player.w - drawW) / 2);
  const drawY = Math.round(y + player.h - frame.anchors[directionKey] * scale);
  const flip = player.facing === "left";

  ctx.save();
  if (flip) {
    ctx.translate(drawX + drawW, drawY);
    ctx.scale(-1, 1);
    ctx.drawImage(
      source,
      direction.x,
      direction.y,
      direction.w,
      direction.h,
      0,
      0,
      drawW,
      drawH
    );
  } else {
    ctx.drawImage(
      source,
      direction.x,
      direction.y,
      direction.w,
      direction.h,
      drawX,
      drawY,
      drawW,
      drawH
    );
  }
  ctx.restore();
}

function renderDigProgressBar(ctx, x, y, w, h) {
  const progress = clamp(GameState.dig.digProgress / DIG_REQUIRED_SECONDS, 0, 1);
  if (progress <= 0 || GameState.hasSoilPile) {
    return;
  }

  const barW = 86;
  const barH = 8;
  const barX = x + w / 2 - barW / 2;
  const barY = y + h + 8;
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.62)";
  ctx.fillRect(barX - 2, barY - 2, barW + 4, barH + 4);
  ctx.fillStyle = "#3b2a1d";
  ctx.fillRect(barX, barY, barW, barH);
  ctx.fillStyle = "#d79b4a";
  ctx.fillRect(barX, barY, barW * progress, barH);
  ctx.strokeStyle = "#f5df9d";
  ctx.lineWidth = 2;
  ctx.strokeRect(barX, barY, barW, barH);
  ctx.restore();
}

// @feature AndyWalkAnimation
// @test 四方向移动时使用对应迈腿帧，停止后保持当前朝向站姿。
function renderAndyWalkCycle(ctx, player, x, y) {
  const frames = AndyWalkFrames[player.facing];
  if (!player.isMoving || !frames || frames.length === 0) {
    renderAndySprite(ctx, x, y, player.w, player.h, player.facing);
    return;
  }

  const frameIndex = Math.floor(player.walkAnimTime / ANDY_WALK_FRAME_SECONDS) % frames.length;
  const frame = frames[frameIndex];
  if (frame.type === "base") {
    renderAndySprite(ctx, x, y, player.w, player.h, player.facing);
  } else {
    renderAndyWalkSprite(ctx, x, y, player.w, player.h, player.facing, frame);
  }
}

function getScaledCharacterDrawRect(x, y, w, h) {
  const characterScale = getCurrentCharacterRenderScale();
  if (characterScale === 1) {
    return { x, y, w, h };
  }

  const scaledW = Math.max(1, Math.round(w * characterScale));
  const scaledH = Math.max(1, Math.round(h * characterScale));
  return {
    x: Math.round(x + (w - scaledW) / 2),
    y: Math.round(y + h - scaledH),
    w: scaledW,
    h: scaledH
  };
}

function getCurrentCharacterRenderScale() {
  return GameState.scene === "yard" ? YARD_CHARACTER_RENDER_SCALE : 1;
}

function getPlayerScreenPosition(x, y) {
  if (GameState.scene === "yard") {
    return {
      x: x - GameState.camera.x,
      y: y - GameState.camera.y
    };
  }

  if (GameState.scene === "cellCorridor") {
    const size = getCorridorWorldSize();
    return {
      x: (CANVAS_WIDTH - size.w) / 2 + x,
      y: y - GameState.corridor.cameraY
    };
  }

  return { x, y };
}

function renderAndySprite(ctx, x, y, w, h, facing) {
  const record = getImageAssetRecord("andy_views");
  const frame = AndySpriteFrames[facing] || AndySpriteFrames.down;

  if (!record || !record.loaded || record.failed) {
    drawAsset(ctx, "andy", x, y, w, h);
    return;
  }

  ctx.save();
  if (frame.flip) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(record.element, frame.x, frame.y, frame.w, frame.h, 0, 0, w, h);
  } else {
    ctx.drawImage(record.element, frame.x, frame.y, frame.w, frame.h, x, y, w, h);
  }
  ctx.restore();
}

function renderAndyWalkSprite(ctx, x, y, w, h, facing, frame) {
  if (!frame) {
    renderAndySprite(ctx, x, y, w, h, facing);
    return;
  }

  const record = getImageAssetRecord(frame.assetKey);
  if (!record || !record.loaded || record.failed) {
    renderAndySprite(ctx, x, y, w, h, facing);
    return;
  }

  const drawW = Math.max(w + 4, Math.round(h * frame.w / frame.h) + 6);
  const drawX = x + (w - drawW) / 2;
  ctx.drawImage(record.element, frame.x, frame.y, frame.w, frame.h, drawX, y, drawW, h);
}

function renderAndySpriteRotated(ctx, x, y, w, h, facing, angle) {
  const record = getImageAssetRecord("andy_views");
  const frame = AndySpriteFrames[facing] || AndySpriteFrames.right;

  if (!record || !record.loaded || record.failed) {
    renderAndySprite(ctx, x, y, w, h, facing);
    return;
  }

  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(angle);
  if (frame.flip) {
    ctx.scale(-1, 1);
  }
  ctx.drawImage(record.element, frame.x, frame.y, frame.w, frame.h, -h / 2, -w / 2, h, w);
  ctx.restore();
}

function renderLyingPlayer(ctx) {
  const player = GameState.player;
  const drawRect = getScaledCharacterDrawRect(player.x, player.y, BED_LYING_PLAYER_WIDTH, BED_LYING_PLAYER_HEIGHT);
  // 逆时针旋转，使睡觉时头部朝向画面左侧。
  renderAndySpriteRotated(ctx, drawRect.x, drawRect.y, drawRect.w, drawRect.h, "right", -Math.PI / 2);
}

function renderInteractionZone(ctx, rect, active) {
  ctx.save();
  ctx.strokeStyle = active ? "#f5df9d" : "rgba(245, 223, 157, 0.34)";
  ctx.lineWidth = active ? 4 : 2;
  ctx.strokeRect(rect.x - 10, rect.y - 10, rect.w + 20, rect.h + 20);
  ctx.restore();
}

function renderMapReveal(ctx) {
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.68)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  renderPanel(ctx, 352, 132, 576, 392);
  renderLargeMap(ctx, 418, 176, 444, 250);
  ctx.fillStyle = "#f5df9d";
  ctx.font = "28px monospace";
  ctx.textAlign = "center";
  ctx.fillText("作画完成", CANVAS_WIDTH / 2, 470);
  ctx.restore();
}

function renderLargeMap(ctx, x, y, w, h) {
  const size = Math.min(w, h);
  drawAsset(ctx, "map", x + (w - size) / 2, y + (h - size) / 2, size, size);
}


function renderQuestText(ctx, text) {
  renderNarrativeBox(ctx, text);
}


function renderCenteredText(ctx, title, hint) {
  renderPanel(ctx, 340, 260, 600, 160);
  ctx.fillStyle = "#f5df9d";
  ctx.font = "34px monospace";
  ctx.textAlign = "center";
  ctx.fillText(title, CANVAS_WIDTH / 2, 326);
  if (hint) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "22px monospace";
    ctx.fillText(hint, CANVAS_WIDTH / 2, 374);
  }
}

function renderPanel(ctx, x, y, w, h) {
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#a88f55";
  ctx.lineWidth = 3;
  ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
  ctx.restore();
}

function roundedRectPath(ctx, x, y, w, h, radius) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

function renderWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = text.split("");
  let line = "";
  let lineY = y;

  chars.forEach((char) => {
    const nextLine = line + char;
    if (ctx.measureText(nextLine).width > maxWidth && line) {
      ctx.fillText(line, x, lineY);
      line = char;
      lineY += lineHeight;
    } else {
      line = nextLine;
    }
  });

  if (line) {
    ctx.fillText(line, x, lineY);
  }
}

function getCanvasPoint(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left) * CANVAS_WIDTH / rect.width,
    y: (clientY - rect.top) * CANVAS_HEIGHT / rect.height
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}


function shouldRenderInventory() {
  if (GameState.hammerHidePuzzle.active) {
    return false;
  }
  if (GameState.scene === "pipe" && isPipeVictorySequenceActive()) {
    return false;
  }

  const hasVisibleItems = getFixedInventoryItems().length > 0;
  return GameState.scene === "cell" ||
    GameState.scene === "cellCorridor" ||
    GameState.scene === "library" ||
    GameState.scene === "dig" ||
    GameState.scene === "pipe" ||
    (hasVisibleItems && (GameState.scene === "yard" || (GameState.scene === "office" && !GameState.office.safeViewOpen)));
}

// ======================================================
// 14. UI / Mobile Controls
// ======================================================
let GlobalControls = null;

function getGlobalControlContext() {
  const hidden = {
    controlsVisible: true,
    joystickVisible: false,
    actionVisible: false,
    actionEnabled: false,
    actionLabel: "",
    actionHighlighted: false
  };

  if (GameState.scene === "pause" && GameState.achievementPanelOpen) {
    return hidden;
  }

  if (TutorialSystem.isActive("wake")) {
    return {
      controlsVisible: true,
      joystickVisible: true,
      actionVisible: true,
      actionEnabled: true,
      actionLabel: "交互",
      actionHighlighted: true
    };
  }
  if (TutorialSystem.isActive("map")) {
    return hidden;
  }

  if (YardNavigationMapSystem.isWorldPaused()) {
    return hidden;
  }

  if (GameState.radioRepairActive) {
    return Object.assign({}, hidden, {
      actionVisible: true,
      actionEnabled: MiniGameHost.gearStatus !== "starting" && !MiniGameHost.completionPending,
      actionLabel: MiniGameHost.gearStatus === "playing" ? "切换" : "开始",
      actionHighlighted: MiniGameHost.gearStatus === "ready" || MiniGameHost.gearStatus === "playing"
    });
  }
  if (GameState.libraryTask.sortingActive) {
    return hidden;
  }
  if (GameState.pipeMazeActive) {
    const pipeReady = !MiniGameHost.pipeMazeStatus || MiniGameHost.pipeMazeStatus === "ready";
    return Object.assign({}, hidden, {
      joystickVisible: true,
      actionVisible: pipeReady,
      actionEnabled: !MiniGameHost.completionPending,
      actionLabel: "开始",
      actionHighlighted: pipeReady
    });
  }
  if (GameState.hammerHidePuzzle.active ||
    isPosterPickupAnimationActive() ||
    isCorridorEscortActive() ||
    (GameState.scene === "pipe" && isPipeVictorySequenceActive()) ||
    GameState.scene === "whiteLight" ||
    GameState.scene === "montage" ||
    GameState.scene === "gateBlackout" ||
    GameState.scene === "operatingRoom1" ||
    GameState.scene === "operatingRoom" ||
    GameState.scene === "operatingRoomBlackout") {
    return hidden;
  }

  let joystickVisible = true;
  let actionVisible = true;
  if (GameState.scene === "gateEscape") {
    joystickVisible = false;
  } else if (GameState.scene === "menu" || GameState.scene === "livingRoom" || GameState.scene === "recap") {
    joystickVisible = false;
    actionVisible = false;
  } else if (GameState.scene === "office" && GameState.office.safeViewOpen) {
    joystickVisible = false;
  }

  const cellInteractionReady = GameState.scene === "cell" && Boolean(getActiveCellInteraction());
  const corridorInteractionReady = GameState.scene === "cellCorridor" && Boolean(getActiveCorridorInteraction());
  const solitaryInteractionReady = GameState.scene === "solitary" && Boolean(getActiveSolitaryInteraction());
  const yardInteractionReady = GameState.scene === "yard" && Boolean(getActiveYardInteraction());
  const libraryInteractionReady = GameState.scene === "library" && Boolean(getActiveLibraryInteraction());
  const officeInteractionReady = GameState.scene === "office" && Boolean(getActiveOfficeInteraction());
  const pipeInteractionReady = GameState.scene === "pipe" && Boolean(getActivePipeInteraction());
  const interactionReady = DialogueSystem.active || NarrativeCueSystem.isActive() ||
    cellInteractionReady || corridorInteractionReady || solitaryInteractionReady || yardInteractionReady ||
    libraryInteractionReady || officeInteractionReady || pipeInteractionReady;

  return {
    controlsVisible: true,
    joystickVisible,
    actionVisible,
    actionEnabled: true,
    actionLabel: getContextActionLabel(),
    actionHighlighted: interactionReady || InputSystem.externalActionHeld
  };
}

function initGlobalControls() {
  if (!window.BeyondWallsControls || GlobalControls) {
    return;
  }
  GlobalControls = window.BeyondWallsControls.mount({
    adapter: {
      onMove(payload) {
        requestGameBgmStart();
        InputSystem.setExternalMove(payload);
      },
      onActionDown() {
        InputSystem.setExternalAction(true);
      },
      onActionUp() {
        InputSystem.setExternalAction(false);
      }
    }
  });
  window.BeyondWallsMainControls = GlobalControls;
}

const MobileControls = {
  render(ctx) {
    if (GameState.scene === "pause" && GameState.achievementPanelOpen) {
      if (GlobalControls) {
        GlobalControls.setContext(getGlobalControlContext());
      }
      return;
    }
    if (TutorialSystem.isActive("map")) {
      if (GlobalControls) {
        GlobalControls.setContext(getGlobalControlContext());
      }
      return;
    }
    if (YardNavigationMapSystem.isWorldPaused()) {
      if (GlobalControls) {
        GlobalControls.setContext(getGlobalControlContext());
      }
      return;
    }
    if (GlobalControls) {
      GlobalControls.setContext(getGlobalControlContext());
      return;
    }
    if (GameState.hammerHidePuzzle.active ||
      GameState.radioRepairActive ||
      isPosterPickupAnimationActive() ||
      isCorridorEscortActive() ||
      GameState.libraryTask.sortingActive ||
      GameState.pipeMazeActive
    ) {
      return;
    }
    if (GameState.scene === "pipe" && isPipeVictorySequenceActive()) {
      return;
    }

    if (GameState.scene === "whiteLight" ||
      GameState.scene === "montage" ||
      GameState.scene === "gateBlackout" ||
      GameState.scene === "operatingRoom1" ||
      GameState.scene === "operatingRoom" ||
      GameState.scene === "operatingRoomBlackout") {
      return;
    }

    if (GameState.scene === "gateEscape") {
      renderActionButton(ctx);
      return;
    }

    if (GameState.scene === "cell") {
      renderJoystick(ctx);
      renderActionButton(ctx);
      return;
    }

    if (GameState.scene === "menu" || GameState.scene === "livingRoom" || GameState.scene === "recap") {
      return;
    }

    if (GameState.scene === "office" && GameState.office.safeViewOpen) {
      renderActionButton(ctx);
      return;
    }

    renderJoystick(ctx);
    renderActionButton(ctx);
  }
};

function renderJoystick(ctx) {
  const stick = InputSystem.joystick;
  const baseImage = getImageAssetRecord("joystick_base");
  const knobImage = getImageAssetRecord("joystick_knob");
  const baseSize = stick.radius * 2;
  const knobSize = 64;
  ctx.save();
  ctx.globalAlpha = 0.78;
  if (baseImage && baseImage.loaded) {
    ctx.drawImage(
      baseImage.element,
      stick.baseX - baseSize / 2,
      stick.baseY - baseSize / 2,
      baseSize,
      baseSize
    );
  } else {
    ctx.strokeStyle = "#bca567";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(stick.baseX, stick.baseY, stick.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(188, 165, 103, 0.22)";
    ctx.fill();
  }

  if (knobImage && knobImage.loaded) {
    ctx.drawImage(
      knobImage.element,
      stick.knobX - knobSize / 2,
      stick.knobY - knobSize / 2,
      knobSize,
      knobSize
    );
  } else {
    ctx.fillStyle = "rgba(245, 223, 157, 0.74)";
    ctx.beginPath();
    ctx.arc(stick.knobX, stick.knobY, 30, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function renderActionButton(ctx) {
  const button = InputSystem.actionButton;
  const cellInteractionReady = GameState.scene === "cell" && Boolean(getActiveCellInteraction());
  const corridorInteractionReady = GameState.scene === "cellCorridor" && Boolean(getActiveCorridorInteraction());
  const solitaryInteractionReady = GameState.scene === "solitary" && Boolean(getActiveSolitaryInteraction());
  const activeYardInteraction = GameState.scene === "yard" ? getActiveYardInteraction() : null;
  const yardInteractionReady = Boolean(activeYardInteraction);
  const libraryInteractionReady = GameState.scene === "library" &&
    (Boolean(getActiveLibraryInteraction()) || GameState.libraryTask.sortingActive);
  const officeInteractionReady = GameState.scene === "office" && Boolean(getActiveOfficeInteraction());
  const pipeInteractionReady = GameState.scene === "pipe" && Boolean(getActivePipeInteraction());
  const interactionReady = NarrativeCueSystem.isActive() ||
    cellInteractionReady ||
    corridorInteractionReady ||
    solitaryInteractionReady ||
    yardInteractionReady ||
    libraryInteractionReady ||
    officeInteractionReady ||
    pipeInteractionReady;
  const highlighted = button.held || interactionReady;
  ctx.save();
  ctx.globalAlpha = highlighted ? 1 : 0.76;
  ctx.fillStyle = interactionReady ? "#f2d26d" : "#bca567";
  if (interactionReady) {
    ctx.shadowColor = "rgba(242, 210, 109, 0.78)";
    ctx.shadowBlur = 18;
  }
  ctx.beginPath();
  ctx.arc(button.x, button.y, button.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#f5df9d";
  ctx.lineWidth = highlighted ? 5 : 4;
  ctx.stroke();
  const actionLabel = getContextActionLabel();
  if (SHOW_GAMEPLAY_TEXT_HINTS && actionLabel) {
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#151515";
    ctx.font = "22px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(actionLabel, button.x, button.y);
  }
  ctx.restore();
}

function getContextActionLabel() {
  if (TutorialSystem.isActive("wake")) return "交互";
  if (DialogueSystem.active) return "继续";
  if (NarrativeCueSystem.isActive()) return "继续";
  if (GameState.libraryTask.sortingActive) return "整理";
  if (GameState.scene === "menu") return "开始";
  if (GameState.scene === "recap") return "继续";
  if (GameState.scene === "whiteLight") return "等待";
  if (GameState.scene === "pause") return "继续";
  if (GameState.scene === "fail") return "重试";
  if (GameState.scene === "livingRoom") return "观看";
  if (GameState.scene === "gateEscape") return "返回";
  if (GameState.scene === "cell" && isWallHoleRevealTransitionActive()) return "等待";
  if (GameState.scene === "cell" && GameState.hammerHidePuzzle.active) return "拖动";
  if (GameState.scene === "cell" && isCellInspectionActive()) return "等待";
  if (GameState.scene === "cell") {
    const activeCellInteraction = getActiveCellInteraction();
    if (activeCellInteraction && activeCellInteraction.id === "sideRouteBed") {
      return "睡觉";
    }
    if (activeCellInteraction && activeCellInteraction.id === "bed") {
      if (GameState.player.lyingInBed) return "起身";
      return GameState.hasAttributeD && !GameState.twentyYearsPassed ? "睡觉" : "站好";
    }
    if (activeCellInteraction && activeCellInteraction.id === "wallDigHint") {
      return "开凿";
    }
    if (activeCellInteraction && activeCellInteraction.id === "wallSecretCheck") {
      return "调查";
    }
    if (activeCellInteraction && activeCellInteraction.id === "hangPoster") {
      return "贴上";
    }
    if (activeCellInteraction && activeCellInteraction.id === "wallPicture") {
      return "查看";
    }
    if (activeCellInteraction && activeCellInteraction.id === "hideHammer") {
      return "藏锤";
    }
    if (activeCellInteraction && activeCellInteraction.id === "drawMap") {
      return "画图";
    }
    if (activeCellInteraction && activeCellInteraction.id === "cellDoor") {
      return "开门";
    }
    return "";
  }
  if (GameState.scene === "cellCorridor") {
    if (isCorridorEscortActive()) return "等待";
    const interaction = getActiveCorridorInteraction();
    return interaction ? "开门" : "";
  }
  if (GameState.scene === "solitary") {
    if (GameState.sideRoute.solitarySleepPhase !== "idle") return "等待";
    const solitaryInteraction = getActiveSolitaryInteraction();
    if (solitaryInteraction && solitaryInteraction.id === "stone") return "查看";
    if (solitaryInteraction && solitaryInteraction.id === "mat") return "睡觉";
    if (solitaryInteraction && solitaryInteraction.id === "door") return "开门";
    return "";
  }
  if (GameState.scene === "dig") {
    const activeDigInteraction = getActiveDigInteraction();
    if (activeDigInteraction && activeDigInteraction.id === "dig") return "挖";
    if (activeDigInteraction && activeDigInteraction.id === "leave") return "返回";
    return "";
  }
  if (GameState.scene === "pipe") {
    const activePipeInteraction = getActivePipeInteraction();
    if (activePipeInteraction && activePipeInteraction.id === "smashPipe") return "砸";
    return "";
  }
  if (GameState.scene === "yard") {
    return getYardInteractionActionLabel(getActiveYardInteraction());
  }
  if (GameState.scene === "library") {
    const activeInteraction = getActiveLibraryInteraction();
    if (activeInteraction && activeInteraction.id === "exit") return "开门";
    if (activeInteraction && activeInteraction.id === "brooks") return "谈话";
    return "";
  }
  if (GameState.scene === "office" && GameState.office.safeViewOpen) {
    return GameState.office.safeStage === "swapped" ? "离开" : "账本";
  }
  if (GameState.scene === "office") {
    const activeInteraction = getActiveOfficeInteraction();
    if (activeInteraction && activeInteraction.id === "sideRouteDesk") return "翻找";
    if (activeInteraction && activeInteraction.id === "sideRouteCurtain") return "躲藏";
    if (activeInteraction && activeInteraction.id === "freeOfficeCurtain") return "躲藏";
    if (activeInteraction && activeInteraction.id === "warden") return "谈话";
    if (activeInteraction && activeInteraction.id === "embroidery") return "打开";
    if (activeInteraction && activeInteraction.id === "deskSecret") return "调查";
    if (activeInteraction && activeInteraction.id === "door") return "开门";
  }
  return "";
}

function getYardInteractionActionLabel(activeInteraction) {
  if (!activeInteraction) {
    return "";
  }

  const interactionId = activeInteraction.id;
  if (interactionId === "prisonGate" || interactionId === "sideRouteGate") {
    return "离开";
  }
  if (interactionId === "cellDoor" ||
    interactionId === "wardenOffice" ||
    interactionId === "library" ||
    interactionId === "sideRouteCellDoor" ||
    interactionId === "sideRouteOffice") {
    return "开门";
  }
  if (interactionId === "soil") {
    return "倒土";
  }
  if (interactionId === "sideRouteBrooks") {
    return "谈话";
  }
  if (interactionId === "yardGuard" || interactionId === "sideRouteGuard") {
    return "搭讪";
  }
  if (interactionId === "red" ||
    interactionId === "brooks" ||
    interactionId === "tommy" ||
    interactionId === "haywood" ||
    interactionId === "floyd") {
    return canStartSideTalk(interactionId) ? "搭讪" : "谈话";
  }
  return "";
}

// ======================================================
// 15. Main Loop
// ======================================================
let canvas = null;
let ctx = null;
let lastTimestamp = 0;
let loopStopped = false;

function initGame() {
  // CP_ENDING_SELECT means the previous run already reached an ending. Keep
  // that save alive during the ending itself, then discard it on the next
  // entry so the start screen behaves exactly like a first launch.
  CheckpointSystem.clearCompletedRunOnEntry();
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  InputSystem.init(canvas);
  AchievementSystem.init();
  initGlobalControls();
  TutorialSystem.init();
  loadAssets();
  Scenes[GameState.scene].enter();
  requestAnimationFrame(safeGameLoop);
}

function safeGameLoop(timestamp) {
  if (loopStopped) {
    return;
  }

  try {
    gameLoop(timestamp);
    requestAnimationFrame(safeGameLoop);
  } catch (error) {
    handleFatalError(error);
  }
}

function gameLoop(timestamp) {
  const dt = Math.min(0.05, (timestamp - lastTimestamp) / 1000 || 0);
  lastTimestamp = timestamp;

  ctx.imageSmoothingEnabled = false;
  let scene = Scenes[GameState.scene];

  const tutorialHandled = TutorialSystem.handleInput();
  const tutorialOpen = TutorialSystem.isActive();
  const tutorialBlocksWorld = tutorialHandled || tutorialOpen;
  const navigationMapHandled = !tutorialBlocksWorld && YardNavigationMapSystem.handleInput();
  const navigationMapOpen = YardNavigationMapSystem.isWorldPaused();
  const evidenceViewerHandled = !tutorialBlocksWorld && !navigationMapHandled &&
    !navigationMapOpen && handleEvidenceViewerInput();
  const evidenceViewerOpen = isEvidenceViewerOpen();
  if (!tutorialBlocksWorld && !evidenceViewerOpen && !navigationMapOpen) {
    GameState.playTime += dt;
  }

  const narrativeCueHandled = !tutorialBlocksWorld && !navigationMapHandled && !navigationMapOpen &&
    !evidenceViewerHandled && NarrativeCueSystem.handleInput();
  if (!tutorialBlocksWorld && !navigationMapHandled && !navigationMapOpen &&
    !evidenceViewerHandled && !narrativeCueHandled) {
    scene.handleInput();
  }
  scene = Scenes[GameState.scene];
  const tutorialBlocksUpdate = tutorialBlocksWorld || TutorialSystem.isActive();
  if (!tutorialBlocksUpdate && !isEvidenceViewerOpen() && !navigationMapOpen) {
    scene.update(dt);
    DialogueSystem.update(dt);
    updateRedDialogueReward();
    updateBrooksDialogueReward();
    updateSideTalk();
    updateGuardConversation();
  }
  TutorialSystem.update();
  updateAudioSystem();
  AchievementSystem.update(dt);

  clearCanvas(ctx);
  scene = Scenes[GameState.scene];
  scene.render(ctx);
  DialogueSystem.render(ctx);
  if (shouldRenderInventory()) {
    InventorySystem.render(ctx);
  }
  renderPosterPickupAnimation(ctx);
  MobileControls.render(ctx);
  YardNavigationMapSystem.render(ctx);
  renderEvidenceViewer(ctx);
  TutorialSystem.render();
  AchievementSystem.renderToast(ctx);
  InputSystem.endFrame();
}

// ======================================================
// 16. Error Handling
// ======================================================
function handleFatalError(error) {
  GameState.fatalError = error;
  loopStopped = true;

  if (ctx) {
    ctx.save();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("哎呀，出错了，请重启试试吧~", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    if (DEBUG_MODE) {
      ctx.font = "16px monospace";
      ctx.fillText(String(error && error.message ? error.message : error), CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 46);
    }
    ctx.restore();
  }
}

window.addEventListener("error", (event) => {
  if (event.target && event.target !== window) {
    return;
  }
  handleFatalError(event.error || event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  handleFatalError(event.reason);
});

initGame();
