"use strict";

// ======================================================
// 1. Global Config
// ======================================================
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const DEBUG_MODE = true;
const IMAGE_ROOT = "./images/";
const AUDIO_ROOT = "../音效/";
const LOCAL_AUDIO_ROOT = "./audio/";
const GAME_BGM_VOLUME = 0.5;
const GAME_BGM_RESUME_KEY = "shawshank_game_bgm_time";
const NEW_GAME_THUNDER_GAIN = 2;
const NEW_GAME_THUNDER_SECONDS = 10;
const PIPE_CUE_THUNDER_GAIN = 3;
const FOOTSTEP_AUDIO_RATE = 1.5;
const DIG_AUDIO_INTERVAL_SECONDS = 0.3;
const PIPE_HIT_AUDIO_INTERVAL_SECONDS = 0.4;
const PIPE_RAIN_VOLUME = 0.7;
const PLAYER_SPEED = 260;
const INTERACT_DISTANCE = 120;
const WHITE_LIGHT_DURATION = 2.2;
const INTRO_IMAGE_WIDTH = 1672;
const INTRO_IMAGE_HEIGHT = 941;
const MENU_CONFIRM_DURATION = 2;
const MENU_BLACK_DURATION = 0.4;
const TV_BACKGROUND_SWAP_SECONDS = 0.5;
const STORY_PRE_BLACK_DURATION = 5.8;
const STORY_QUOTE_DURATION = 2.8;
const STORY_POST_BLACK_DURATION = 5.8;
const INHALE_BLACK_DURATION = 1;
const INHALE_FRAME_DURATION = 0.5;
const FINAL_WHITE_DURATION = 0.45;
const SLEEP_FADE_OUT_SECONDS = 2;
const SLEEP_DARK_HOLD_SECONDS = 2;
const MONTAGE_PAGE_SECONDS = 3.2;
const MONTAGE_FINAL_PAGE_SECONDS = 5.2;
const MONTAGE_WAKE_DARK_SECONDS = 2;
const MONTAGE_WAKE_FADE_SECONDS = 2.4;
const YARD_WORLD_SCALE = 1.6;
const YARD_CHARACTER_HEIGHT = 124;
const YARD_CHARACTER_FALLBACK_WIDTH = 52;
const RED_WALK_FRAME_SECONDS = 0.18;
const PRISONER_WALK_FRAME_SECONDS = 0.14;
const YARD_RANDOM_PRISONER_COUNT = 3;
const YARD_RANDOM_PRISONER_MIN_SPEED = 44;
const YARD_RANDOM_PRISONER_MAX_SPEED = 76;
const YARD_RANDOM_PRISONER_MIN_TARGET_DISTANCE = 260;
const YARD_RANDOM_PRISONER_REST_MIN_SECONDS = 0.35;
const YARD_RANDOM_PRISONER_REST_MAX_SECONDS = 1.4;
const RED_TABLE_PATROL_SPEED = 52;
const BROOKS_WALK_FRAME_SECONDS = 0.18;
const BROOKS_LIBRARY_PATROL_SPEED = 44;
const BROOKS_DIALOGUE_APPROACH_SPEED = 78;
const BROOKS_REST_MIN_SECONDS = 0.45;
const BROOKS_REST_MAX_SECONDS = 1.35;
const BROOKS_MIN_TARGET_DISTANCE = 56;
const BROOKS_LIBRARY_PATROL_AREA = { x: 1138, y: 226, w: 236, h: 122 };
const YARD_GUARD_FAST_SPEED = 56;
const YARD_GUARD_SLOW_SPEED_MIN = 28;
const YARD_GUARD_SLOW_SPEED_MAX = 42;
const SOIL_DUMP_HOLD_SECONDS = 3;
const SOIL_DUMP_REQUIRED_COUNT = 3;
const YARD_GUARD_CATCH_DISTANCE = 56;
const DIG_PLAYER_SPEED = 360;
const DIG_REQUIRED_SECONDS = 10;
const ANDY_DIG_FRAME_SECONDS = 0.12;
const FINAL_TUNNEL_ENTRY_SECONDS = 0.3;
const PIPE_CUE_ACTIVE_SECONDS = 1.5;
const PIPE_CUE_MIN_INTERVAL_SECONDS = 2.1;
const PIPE_CUE_MAX_INTERVAL_SECONDS = 4.2;
const PIPE_CUE_SCREEN_BRIGHTNESS = 0.1;
const PIPE_CUE_LIGHTNING_WIDTH = 420;
const PIPE_CUE_LIGHTNING_HEIGHT = 315;
const PIPE_SMASH_HINT_SECONDS = 2;
const PIPE_SMASH_HOLD_SECONDS = 1;
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

// ======================================================
// 2. Asset Manifest
// ======================================================
const AssetManifest = {
  images: {
    andy: "andy.png",
    andy_crawl_01: "andy_crawl_01.png",
    andy_crawl_02: "andy_crawl_02.png",
    andy_crawl_03: "andy_crawl_03.png",
    andy_front_01: "andy_front_01.png",
    red: "red.png",
    red_idle_down: "red_idle_down.png",
    red_idle_up: "red_idle_up.png",
    red_idle_side: "red_idle_side.png",
    red_walk_down_01: "red_walk_down_01.png",
    red_walk_down_02: "red_walk_down_02.png",
    red_walk_up_01: "red_walk_up_01.png",
    red_walk_up_02: "red_walk_up_02.png",
    red_walk_side_01: "red_walk_side_01.png",
    red_walk_side_02: "red_walk_side_02.png",
    brooks: "brooks.png",
    brooks_idle_down: "brooks_idle_down.png",
    brooks_idle_up: "brooks_idle_up.png",
    brooks_idle_side: "brooks_idle_side.png",
    brooks_walk_down_01: "brooks_walk_down_01.png",
    brooks_walk_down_02: "brooks_walk_down_02.png",
    brooks_walk_down_03: "brooks_walk_down_03.png",
    brooks_walk_down_04: "brooks_walk_down_04.png",
    brooks_walk_up_01: "brooks_walk_up_01.png",
    brooks_walk_up_02: "brooks_walk_up_02.png",
    brooks_walk_up_03: "brooks_walk_up_03.png",
    brooks_walk_up_04: "brooks_walk_up_04.png",
    brooks_walk_side_01: "brooks_walk_side_01.png",
    brooks_walk_side_02: "brooks_walk_side_02.png",
    brooks_walk_side_03: "brooks_walk_side_03.png",
    brooks_walk_side_04: "brooks_walk_side_04.png",
    warden: "warden.png",
    guard: "guard.png",
    guard_idle_down: "guard_idle_down.png",
    guard_idle_up: "guard_idle_up.png",
    guard_idle_left: "guard_idle_left.png",
    guard_walk_down: "guard_walk_down.png",
    guard_walk_up: "guard_walk_up.png",
    guard_walk_left: "guard_walk_left.png",
    guard_walk_right: "guard_walk_right.png",
    warden_idle_down: "warden_idle_down.png",
    warden_idle_up: "warden_idle_up.png",
    warden_idle_side: "warden_idle_side.png",
    warden_walk_down_01: "warden_walk_down_01.png",
    warden_walk_down_02: "warden_walk_down_02.png",
    warden_walk_side_01: "warden_walk_side_01.png",
    warden_walk_side_02: "warden_walk_side_02.png",
    warden_walk_up: "warden_walk_up.png",
    prisoner_01: "prisoner_01.png",
    prisoner_02: "prisoner_02.png",
    prisoner_03: "prisoner_03.png",
    prisoner_01_walk_down_01: "prisoner_01_walk_down_01.png",
    prisoner_01_walk_down_02: "prisoner_01_walk_down_02.png",
    prisoner_01_walk_down_03: "prisoner_01_walk_down_03.png",
    prisoner_01_walk_down_04: "prisoner_01_walk_down_04.png",
    prisoner_01_walk_up_01: "prisoner_01_walk_up_01.png",
    prisoner_01_walk_up_02: "prisoner_01_walk_up_02.png",
    prisoner_01_walk_up_03: "prisoner_01_walk_up_03.png",
    prisoner_01_walk_up_04: "prisoner_01_walk_up_04.png",
    prisoner_01_walk_side_01: "prisoner_01_walk_side_01.png",
    prisoner_01_walk_side_02: "prisoner_01_walk_side_02.png",
    prisoner_01_walk_side_03: "prisoner_01_walk_side_03.png",
    prisoner_01_walk_side_04: "prisoner_01_walk_side_04.png",
    prisoner_02_walk_down_01: "prisoner_02_walk_down_01.png",
    prisoner_02_walk_down_02: "prisoner_02_walk_down_02.png",
    prisoner_02_walk_down_03: "prisoner_02_walk_down_03.png",
    prisoner_02_walk_down_04: "prisoner_02_walk_down_04.png",
    prisoner_02_walk_up_01: "prisoner_02_walk_up_01.png",
    prisoner_02_walk_up_02: "prisoner_02_walk_up_02.png",
    prisoner_02_walk_up_03: "prisoner_02_walk_up_03.png",
    prisoner_02_walk_up_04: "prisoner_02_walk_up_04.png",
    prisoner_02_walk_side_01: "prisoner_02_walk_side_01.png",
    prisoner_02_walk_side_02: "prisoner_02_walk_side_02.png",
    prisoner_02_walk_side_03: "prisoner_02_walk_side_03.png",
    prisoner_02_walk_side_04: "prisoner_02_walk_side_04.png",
    prisoner_03_walk_down_01: "prisoner_03_walk_down_01.png",
    prisoner_03_walk_down_02: "prisoner_03_walk_down_02.png",
    prisoner_03_walk_down_03: "prisoner_03_walk_down_03.png",
    prisoner_03_walk_down_04: "prisoner_03_walk_down_04.png",
    prisoner_03_walk_up_01: "prisoner_03_walk_up_01.png",
    prisoner_03_walk_up_02: "prisoner_03_walk_up_02.png",
    prisoner_03_walk_up_03: "prisoner_03_walk_up_03.png",
    prisoner_03_walk_up_04: "prisoner_03_walk_up_04.png",
    prisoner_03_walk_side_01: "prisoner_03_walk_side_01.png",
    prisoner_03_walk_side_02: "prisoner_03_walk_side_02.png",
    prisoner_03_walk_side_03: "prisoner_03_walk_side_03.png",
    prisoner_03_walk_side_04: "prisoner_03_walk_side_04.png",
    extra_prisoner_01_walk_down_01: "extra_prisoner_01_walk_down_01.png",
    extra_prisoner_01_walk_down_02: "extra_prisoner_01_walk_down_02.png",
    extra_prisoner_01_walk_down_03: "extra_prisoner_01_walk_down_03.png",
    extra_prisoner_01_walk_down_04: "extra_prisoner_01_walk_down_04.png",
    extra_prisoner_01_walk_down_05: "extra_prisoner_01_walk_down_05.png",
    extra_prisoner_01_walk_down_06: "extra_prisoner_01_walk_down_06.png",
    extra_prisoner_01_walk_up_01: "extra_prisoner_01_walk_up_01.png",
    extra_prisoner_01_walk_up_02: "extra_prisoner_01_walk_up_02.png",
    extra_prisoner_01_walk_up_03: "extra_prisoner_01_walk_up_03.png",
    extra_prisoner_01_walk_up_04: "extra_prisoner_01_walk_up_04.png",
    extra_prisoner_01_walk_up_05: "extra_prisoner_01_walk_up_05.png",
    extra_prisoner_01_walk_up_06: "extra_prisoner_01_walk_up_06.png",
    extra_prisoner_01_walk_side_01: "extra_prisoner_01_walk_side_01.png",
    extra_prisoner_01_walk_side_02: "extra_prisoner_01_walk_side_02.png",
    extra_prisoner_01_walk_side_03: "extra_prisoner_01_walk_side_03.png",
    extra_prisoner_01_walk_side_04: "extra_prisoner_01_walk_side_04.png",
    extra_prisoner_01_walk_side_05: "extra_prisoner_01_walk_side_05.png",
    extra_prisoner_01_walk_side_06: "extra_prisoner_01_walk_side_06.png",
    extra_prisoner_02_walk_down_01: "extra_prisoner_02_walk_down_01.png",
    extra_prisoner_02_walk_down_02: "extra_prisoner_02_walk_down_02.png",
    extra_prisoner_02_walk_down_03: "extra_prisoner_02_walk_down_03.png",
    extra_prisoner_02_walk_down_04: "extra_prisoner_02_walk_down_04.png",
    extra_prisoner_02_walk_down_05: "extra_prisoner_02_walk_down_05.png",
    extra_prisoner_02_walk_down_06: "extra_prisoner_02_walk_down_06.png",
    extra_prisoner_02_walk_up_01: "extra_prisoner_02_walk_up_01.png",
    extra_prisoner_02_walk_up_02: "extra_prisoner_02_walk_up_02.png",
    extra_prisoner_02_walk_up_03: "extra_prisoner_02_walk_up_03.png",
    extra_prisoner_02_walk_up_04: "extra_prisoner_02_walk_up_04.png",
    extra_prisoner_02_walk_up_05: "extra_prisoner_02_walk_up_05.png",
    extra_prisoner_02_walk_up_06: "extra_prisoner_02_walk_up_06.png",
    extra_prisoner_02_walk_side_01: "extra_prisoner_02_walk_side_01.png",
    extra_prisoner_02_walk_side_02: "extra_prisoner_02_walk_side_02.png",
    extra_prisoner_02_walk_side_03: "extra_prisoner_02_walk_side_03.png",
    extra_prisoner_02_walk_side_04: "extra_prisoner_02_walk_side_04.png",
    extra_prisoner_02_walk_side_05: "extra_prisoner_02_walk_side_05.png",
    extra_prisoner_02_walk_side_06: "extra_prisoner_02_walk_side_06.png",
    extra_prisoner_03_walk_down_01: "extra_prisoner_03_walk_down_01.png",
    extra_prisoner_03_walk_down_02: "extra_prisoner_03_walk_down_02.png",
    extra_prisoner_03_walk_down_03: "extra_prisoner_03_walk_down_03.png",
    extra_prisoner_03_walk_down_04: "extra_prisoner_03_walk_down_04.png",
    extra_prisoner_03_walk_down_05: "extra_prisoner_03_walk_down_05.png",
    extra_prisoner_03_walk_down_06: "extra_prisoner_03_walk_down_06.png",
    extra_prisoner_03_walk_up_01: "extra_prisoner_03_walk_up_01.png",
    extra_prisoner_03_walk_up_02: "extra_prisoner_03_walk_up_02.png",
    extra_prisoner_03_walk_up_03: "extra_prisoner_03_walk_up_03.png",
    extra_prisoner_03_walk_up_04: "extra_prisoner_03_walk_up_04.png",
    extra_prisoner_03_walk_up_05: "extra_prisoner_03_walk_up_05.png",
    extra_prisoner_03_walk_up_06: "extra_prisoner_03_walk_up_06.png",
    extra_prisoner_03_walk_side_01: "extra_prisoner_03_walk_side_01.png",
    extra_prisoner_03_walk_side_02: "extra_prisoner_03_walk_side_02.png",
    extra_prisoner_03_walk_side_03: "extra_prisoner_03_walk_side_03.png",
    extra_prisoner_03_walk_side_04: "extra_prisoner_03_walk_side_04.png",
    extra_prisoner_03_walk_side_05: "extra_prisoner_03_walk_side_05.png",
    extra_prisoner_03_walk_side_06: "extra_prisoner_03_walk_side_06.png",
    start_screen: "start_screen.png",
    start_screen_selected: "start_screen_selected.png",
    tv_watch_01: "tv_watch_01.png",
    tv_watch_02: "tv_watch_02.png",
    opening_story: "opening_story.png",
    inhale_01: "inhale_01.png",
    inhale_02: "inhale_02.png",
    inhale_03: "inhale_03.png",
    montage_twenty_years: "montage_twenty_years.png",
    living_room: "living_room.jpg",
    cell: "cell.png",
    library: "library.jpg",
    yard: "yard.png",
    office: "office.png",
    dig_tunnel: "dig_tunnel.png",
    dig_tunnel_20y: "dig_tunnel_20y.jpg",
    pipe_tunnel_01: "pipe_tunnel_01.png",
    pipe_tunnel_02: "pipe_tunnel_02.png",
    pipe_tunnel_03: "pipe_tunnel_03.jpg",
    pipe_lightning: "pipe_lightning.png",
    victory_screen: "victory.jpg",
    victory_escape_01: "victory_escape_01.png",
    victory_escape_02: "victory_escape_02.jpg",
    hole_photo: "hole_photo.png",
    safe: "safe.png",
    safe_swapped: "safe_swapped.png",
    tunnel: "tunnel.jpg",
    pipe_room: "pipe_room.jpg",
    ending_area: "ending_area.jpg",
    hammer: "hammer.png",
    bible: "bible.png",
    bill: "bill.png",
    soil_pile: "soil_pile.png",
    soil: "soil.png",
    ledger: "ledger.png",
    map: "map.png",
    tv: "tv.png",
    embroidery: "embroidery.png",
    opening_01: "opening_01.jpg",
    opening_02: "opening_02.jpg",
    andy_views: "andy_views_transparent.png",
    andy_walk_left: "andy_walk_left.png",
    andy_walk_right: "andy_walk_right.png",
    andy_walk_down_01: "andy_walk_down_01.png",
    andy_walk_down_02: "andy_walk_down_02.png",
    andy_walk_up_01: "andy_walk_up_01.png",
    andy_walk_up_02: "andy_walk_up_02.png",
    andy_dig_01: "andy_dig_01.png",
    andy_dig_02: "andy_dig_02.png",
    andy_dig_03: "andy_dig_03.png",
    dialogue_npc: "dialogue_npc.png",
    dialogue_andy: "dialogue_andy.png"
  },
  audio: {
    game_bgm: { root: LOCAL_AUDIO_ROOT, fileName: "end_title.mp3" },
    victory_birds_quote: { root: LOCAL_AUDIO_ROOT, fileName: "victory_birds_quote.mp3" },
    outdoor_footsteps: "户外快步走#210423_032.mp3",
    dig_soil: "挖土.mp3",
    cell_footsteps: "水泥地脚步声（牢房用）#140304_040806.mp3",
    shovel_dirt: "用铲子挖沙坑并翻土#140918_054958(1).mp3",
    pipe_hit: "砸水管.mp3",
    pipe_rain: "管道雨声.mp3",
    rain_thunder: "雨+雷.mp3",
    new_game_thunder: "雷鳴#2012_0818_MKH-416(1).mp3",
    thunder: "雷声.mp3"
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
const PipeCrawlFrames = [
  { assetKey: "andy_crawl_01", x: 245, y: 321, w: 959, h: 445 },
  { assetKey: "andy_crawl_02", x: 251, y: 320, w: 948, h: 447 },
  { assetKey: "andy_crawl_03", x: 297, y: 321, w: 855, h: 445 }
];
const PipeDrownFrame = { assetKey: "andy_front_01", x: 77, y: 64, w: 235, h: 547 };

const GUARD_WALK_FRAME_SECONDS = 0.26;
const WARDEN_WALK_FRAME_SECONDS = 0.2;
const GUARD_WALK_MIN_ANIM_SPEED = 0.72;
const GUARD_WALK_MAX_ANIM_SPEED = 1.28;
const GUARD_SIDE_TURN_SECONDS = 0.2;
const GuardIdleFrames = {
  down: { assetKey: "guard_idle_down" },
  up: { assetKey: "guard_idle_up" },
  left: { assetKey: "guard_idle_left" },
  right: { assetKey: "guard_idle_left", flip: true }
};

const GuardWalkFrames = {
  down: [
    { type: "base" },
    { assetKey: "guard_walk_down" },
    { type: "base" },
    { assetKey: "guard_walk_down", flip: true }
  ],
  up: [
    { type: "base" },
    { assetKey: "guard_walk_up" },
    { type: "base" },
    { assetKey: "guard_walk_up", flip: true }
  ],
  left: [
    { type: "base" },
    { assetKey: "guard_walk_left" },
    { type: "base" },
    { assetKey: "guard_walk_right", flip: true }
  ],
  right: [
    { type: "base" },
    { assetKey: "guard_walk_right" },
    { type: "base" },
    { assetKey: "guard_walk_left", flip: true }
  ]
};

const WardenIdleFrames = {
  down: { assetKey: "warden_idle_down" },
  up: { assetKey: "warden_idle_up" },
  left: { assetKey: "warden_idle_side", flip: true },
  right: { assetKey: "warden_idle_side" }
};

const WardenWalkFrames = {
  down: [
    { assetKey: "warden_walk_down_01" },
    { assetKey: "warden_idle_down" },
    { assetKey: "warden_walk_down_02" },
    { assetKey: "warden_idle_down" }
  ],
  up: [
    { assetKey: "warden_walk_up" },
    { assetKey: "warden_idle_up" }
  ],
  left: [
    { assetKey: "warden_walk_side_01", flip: true },
    { assetKey: "warden_idle_side", flip: true },
    { assetKey: "warden_walk_side_02", flip: true },
    { assetKey: "warden_idle_side", flip: true }
  ],
  right: [
    { assetKey: "warden_walk_side_01" },
    { assetKey: "warden_idle_side" },
    { assetKey: "warden_walk_side_02" },
    { assetKey: "warden_idle_side" }
  ]
};

const RedIdleFrames = {
  down: { assetKey: "red_idle_down" },
  up: { assetKey: "red_idle_up" },
  left: { assetKey: "red_idle_side", flip: true },
  right: { assetKey: "red_idle_side" }
};

const RedWalkFrames = {
  down: [
    { assetKey: "red_walk_down_01" },
    { assetKey: "red_idle_down" },
    { assetKey: "red_walk_down_02" },
    { assetKey: "red_idle_down" }
  ],
  up: [
    { assetKey: "red_walk_up_01" },
    { assetKey: "red_idle_up" },
    { assetKey: "red_walk_up_02" },
    { assetKey: "red_idle_up" }
  ],
  left: [
    { assetKey: "red_walk_side_01", flip: true },
    { assetKey: "red_idle_side", flip: true },
    { assetKey: "red_walk_side_02", flip: true },
    { assetKey: "red_idle_side", flip: true }
  ],
  right: [
    { assetKey: "red_walk_side_01" },
    { assetKey: "red_idle_side" },
    { assetKey: "red_walk_side_02" },
    { assetKey: "red_idle_side" }
  ]
};

const RedDrawSize = {
  down: { w: 54, h: YARD_CHARACTER_HEIGHT },
  up: { w: 52, h: YARD_CHARACTER_HEIGHT },
  left: { w: 52, h: YARD_CHARACTER_HEIGHT },
  right: { w: 52, h: YARD_CHARACTER_HEIGHT }
};

const BrooksIdleFrames = {
  down: { assetKey: "brooks_idle_down" },
  up: { assetKey: "brooks_idle_up" },
  left: { assetKey: "brooks_idle_side", flip: true },
  right: { assetKey: "brooks_idle_side" }
};

const BrooksWalkFrames = {
  down: [
    { assetKey: "brooks_walk_down_01" },
    { assetKey: "brooks_walk_down_02" },
    { assetKey: "brooks_walk_down_03" },
    { assetKey: "brooks_walk_down_04" }
  ],
  up: [
    { assetKey: "brooks_walk_up_01" },
    { assetKey: "brooks_walk_up_02" },
    { assetKey: "brooks_walk_up_03" },
    { assetKey: "brooks_walk_up_04" }
  ],
  left: [
    { assetKey: "brooks_walk_side_01", flip: true },
    { assetKey: "brooks_walk_side_02", flip: true },
    { assetKey: "brooks_walk_side_03", flip: true },
    { assetKey: "brooks_walk_side_04", flip: true }
  ],
  right: [
    { assetKey: "brooks_walk_side_01" },
    { assetKey: "brooks_walk_side_02" },
    { assetKey: "brooks_walk_side_03" },
    { assetKey: "brooks_walk_side_04" }
  ]
};

const BrooksDrawSize = {
  down: { w: 54, h: YARD_CHARACTER_HEIGHT },
  up: { w: 54, h: YARD_CHARACTER_HEIGHT },
  left: { w: 52, h: YARD_CHARACTER_HEIGHT },
  right: { w: 52, h: YARD_CHARACTER_HEIGHT }
};

const PrisonerWalkFrames = {
  prisoner_01: createPrisonerWalkFrames("prisoner_01"),
  prisoner_02: createPrisonerWalkFrames("prisoner_02"),
  prisoner_03: createPrisonerWalkFrames("prisoner_03"),
  extra_prisoner_01: createPrisonerWalkFrames("extra_prisoner_01", 6),
  extra_prisoner_02: createPrisonerWalkFrames("extra_prisoner_02", 6),
  extra_prisoner_03: createPrisonerWalkFrames("extra_prisoner_03", 6)
};

const YardRandomPrisonerConfigs = [
  { assetKey: "extra_prisoner_01", x: 520, y: 462, h: YARD_CHARACTER_HEIGHT },
  { assetKey: "extra_prisoner_02", x: 990, y: 522, h: YARD_CHARACTER_HEIGHT },
  { assetKey: "extra_prisoner_03", x: 1180, y: 820, h: YARD_CHARACTER_HEIGHT }
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
  start: "开始游戏",
  menuHint: "点击开始游戏，或按 E / 空格确认。",
  livingQuest: "躺在沙发上，观看电视里的故事。",
  tvPrompt: "按 E / 空格或点击屏幕开始观影。",
  recapHint: "点击或按空格推进分镜。",
  cellQuest: "你在牢房醒来。先熟悉移动。",
  openingPrelude: [
    {
      title: "前情提要（一）",
      body: "电视里的故事始于一场判决。银行家安迪被送进肖申克监狱，从此高墙、铁门、点名声和狱警的脚步，成了他每天醒来都要面对的世界。这里不只关住身体，也一点点磨掉人的名字、习惯和希望。"
    },
    {
      title: "前情提要（二）",
      body: "可安迪没有把余生交给牢笼。他会结识能弄到物件的瑞德，也会从老布那里得到一本圣经；一把石锤、一堆泥土、一本账本，都会在漫长岁月里变成逃亡计划的一部分。现在，屏幕的光正把你拉进这条路。"
    }
  ],
  openingQuote: "——各位陪审员，证据确凿，银行家安迪因涉嫌枪杀妻子及其情人，被判处无期徒刑，送往肖申克监狱。",
  pauseTitle: "暂停",
  pauseHint: "按 ESC / E / 点击继续",
  failTitle: "失败",
  failHint: "第 0 阶段预留失败界面"
};

const ComicPages = {
  recap: [
    {
      image: "opening_01",
      text: "电视里，冰冷的铁门在雨声中合上。一个关于希望的故事，正慢慢照进房间。"
    },
    {
      image: "opening_02",
      text: "屏幕越来越亮，光线越过沙发和地板，像一条通往电影世界的路。"
    }
  ]
};

const TwentyYearsMontagePages = [
  {
    crop: { x: 0, y: 0, w: 0.48, h: 0.5 },
    text: "第一年，墙面只留下细小划痕。"
  },
  {
    crop: { x: 0.48, y: 0, w: 0.52, h: 0.52 },
    text: "夜深时，他把每一次敲击都藏进呼吸里。"
  },
  {
    crop: { x: 0, y: 0.5, w: 0.5, h: 0.5 },
    text: "白天，他仍旧沉默地走进劳作区。"
  },
  {
    crop: { x: 0.5, y: 0.52, w: 0.5, h: 0.48 },
    text: "泥土混进尘土，像从未存在过。"
  },
  {
    crop: null,
    text: "二十年光阴，高墙依旧，他每天重复着挖洞，藏土，劳作的生活，没人发现海报背后，藏着一条通往自由的生路……",
    final: true
  }
];

const RedDialogueLines = [
  "安迪：我听说，在你那能弄到任何东西？",
  "瑞德：算是吧，偶尔能搞到一些零碎的物件。你想要什么？香烟，零食，还是些别的？",
  "安迪：一把小石锤，用来打磨石头，打发时间。",
  "瑞德：石锤？这种东西不值钱，也没人查，我可以帮你弄到，需要一点时间。",
  "瑞德：收好你的东西，在这里，任何不起眼的东西，都可能救你一命。"
];

const PostMontageRedDialogueLines = [
  "瑞德：二十年了，安迪。你看起来还是像在等一班不会来的车。",
  "安迪：有些路不会自己出现，但我可以把它画出来。",
  "瑞德：一张地图？在这里，地图比钥匙还危险。",
  "安迪：那就让它看起来只是一张普通的纸。今晚我回牢房，把路线画下来。"
];

const BrooksDialogueLines = [
  "老布：新来的朋友，需要看书打发狱中时光吗？书籍是这里唯一的救赎。",
  "安迪：我想要一本圣经。",
  "老布：我笃信两件事，纪律与圣经。在肖申克，你会同时拥有这两样。圣经能安定心神，愿你心怀敬畏。",
  "老布：好好保管，这是狱中最神圣的东西。"
];

const InspectionFailDialogueLines = [
  "典狱长：例行查房，所有人站到床边，不许乱动，不许藏匿违禁品！",
  "狱警：报告典狱长，该囚犯私藏石锤，涉嫌违规！",
  "典狱长：你个东西，无视监规，私藏违禁品，关入禁闭室！",
  "你的计划失败了！"
];

const InspectionPassDialogueLines = [
  "典狱长：例行查房，所有人站到床边，不许乱动，不许藏匿违禁品！",
  "狱警：报告典狱长，一本圣经，无违禁物品。",
  "典狱长：救赎之道，就在其中。",
  "典狱长：只要心怀虔诚，恪守规矩，高墙之内亦可赎罪。"
];

const IntroLayout = {
  imageWidth: INTRO_IMAGE_WIDTH,
  imageHeight: INTRO_IMAGE_HEIGHT,
  startButtonRect: { x: 54, y: 472, w: 488, h: 138 }
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
  recapIndex: 0,
  whiteLightTimer: 0,
  opening: {
    phase: "idle",
    timer: 0,
    tvFrameIndex: 0
  },
  twentyYearsMontage: {
    phase: "idle",
    timer: 0,
    pageIndex: 0
  },
  camera: {
    x: 0,
    y: 0
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
    { x: 790, y: 388, targetX: 0, targetY: 0, speed: 0, speedTimer: 0, fast: true, facing: "down", visualFacing: "down", turnTimer: 0, isMoving: false, walkAnimTime: 0 },
    { x: 968, y: 574, targetX: 0, targetY: 0, speed: 0, speedTimer: 0, fast: false, facing: "left", visualFacing: "left", turnTimer: 0, isMoving: false, walkAnimTime: 0 }
  ],
  yardPrisoners: [],
  redNpc: {
    initialized: false,
    mode: "patrol",
    x: 510,
    y: 712,
    facing: "left",
    isMoving: false,
    walkAnimTime: 0,
    pathDistance: 0,
    targetDistance: 0,
    pathDirection: 1,
    pauseTimer: 0,
    targetX: 510,
    targetY: 712,
    pendingDialogue: null
  },
  brooksNpc: {
    initialized: false,
    mode: "patrol",
    x: 1214,
    y: 236,
    facing: "right",
    isMoving: false,
    walkAnimTime: 0,
    targetX: 1214,
    targetY: 236,
    waitTimer: 0,
    pendingDialogue: null
  },
  cellInspection: {
    phase: "idle",
    result: null,
    warden: { x: 180, y: 620, targetX: 640, targetY: 720, facing: "right", isMoving: false, walkAnimTime: 0, patrolIndex: 0 },
    guard: { x: 180, y: 650, targetX: 486, targetY: 780, facing: "right", isMoving: false, walkAnimTime: 0 }
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
    active: false
  },
  office: {
    wardenPhase: "waiting",
    wardenX: 884,
    wardenY: 590,
    wardenFacing: "left",
    wardenMoving: false,
    wardenWalkAnimTime: 0,
    embroideryChecked: false,
    safeViewOpen: false,
    safeStage: "closed"
  },
  hasHammer: false,
  hasBible: false,
  hasLedger: false,
  hasSoilPile: false,
  bibleUsed: false,
  ledgerFound: false,
  ledgerSwapped: false,
  finalDigUnlocked: false,
  inspectionPassed: false,
  hasAttributeC: false,
  hasAttributeD: false,
  twentyYearsPassed: false,
  postMontageRedDialogueActive: false,
  postMontageRedSpoken: false,
  mapRevealActive: false,
  mapDrawn: false,
  hasMap: false,
  failReason: "",
  failRecovery: null,
  redDialogueActive: false,
  redHammerDelivered: false,
  brooksDialogueActive: false,
  brooksDialogueKind: null,
  brooksBibleDelivered: false,
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

const CellLayout = {
  imageWidth: 1254,
  imageHeight: 1254,
  walkPolygon: [
    { x: 184, y: 1106 },
    { x: 184, y: 402 },
    { x: 330, y: 402 },
    { x: 330, y: 290 },
    { x: 890, y: 290 },
    { x: 908, y: 402 },
    { x: 1085, y: 402 },
    { x: 1085, y: 1106 }
  ],
  bed: { x: 360, y: 292, w: 520, h: 196 },
  bedFrame: { x: 352, y: 284, w: 542, h: 214 },
  pictureFrame: { x: 606, y: 135, w: 194, h: 133 },
  pictureCoverFrame: { x: 560, y: 108, w: 292, h: 182 },
  pictureInteractZone: { x: 530, y: 390, w: 320, h: 246 },
  pictureStandPoint: { x: 688, y: 588 },
  doorZone: { x: 176, y: 506, w: 104, h: 236 },
  doorFrame: { x: 58, y: 506, w: 146, h: 236 },
  tableBlocks: [
    { x: 500, y: 598, w: 248, h: 242 },
    { x: 516, y: 810, w: 236, h: 86 }
  ],
  tableDrawZone: { x: 432, y: 548, w: 386, h: 398 }
};

const CellInspectionLayout = {
  entryWarden: { x: 176, y: 640 },
  entryGuard: { x: 176, y: 682 },
  wardenEntryTarget: { x: 360, y: 720 },
  guardTableTarget: { x: 488, y: 794 },
  exitWarden: { x: 168, y: 640 },
  exitGuard: { x: 168, y: 686 },
  wardenPatrol: [
    { x: 360, y: 720 },
    { x: 440, y: 720 },
    { x: 440, y: 940 },
    { x: 360, y: 940 }
  ]
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
  imageWidth: 1448,
  imageHeight: 1086,
  entryPoint: { x: 727, y: 800 },
  officeReturnPoint: { x: 210, y: 615 },
  walkPolygon: [
    { x: 43, y: 217 },
    { x: 1420, y: 209 },
    { x: 1423, y: 1001 },
    { x: 1089, y: 997 },
    { x: 1102, y: 918 },
    { x: 793, y: 918 },
    { x: 878, y: 758 },
    { x: 818, y: 704 },
    { x: 724, y: 824 },
    { x: 607, y: 701 },
    { x: 558, y: 753 },
    { x: 641, y: 918 },
    { x: 329, y: 918 },
    { x: 328, y: 999 },
    { x: 8, y: 994 },
    { x: 35, y: 688 },
    { x: 154, y: 684 },
    { x: 155, y: 374 },
    { x: 42, y: 383 }
  ],
  obstacleRects: [
    { x: 356, y: 662, w: 108, h: 92 },
    { x: 1118, y: 356, w: 74, h: 78 },
    { x: 1078, y: 538, w: 78, h: 64 },
    { x: 1356, y: 389, w: 58, h: 148 },
    { x: 1368, y: 607, w: 48, h: 72 }
  ],
  interactions: [
    { id: "cellDoor", label: "进入牢房", rect: { x: 694, y: 766, w: 70, h: 78 }, tint: "#b977ff" },
    { id: "wardenOffice", label: "典狱长办公室", rect: { x: 132, y: 540, w: 66, h: 150 }, tint: "#ff9bd8" },
    { id: "red", label: "与瑞德交谈", rect: { x: 270, y: 585, w: 330, h: 245 }, tint: "#39d378" },
    { id: "library", label: "图书馆 / 老布", rect: { x: 1132, y: 210, w: 272, h: 184 }, tint: "#ffffff" },
    { id: "soil", label: "撒土点", rect: { x: 690, y: 285, w: 360, h: 378 }, tint: "#4fc3ff" }
  ],
  npcs: [
    {
      id: "red",
      assetKey: "red",
      name: "瑞德",
      x: 510,
      y: 712,
      h: YARD_CHARACTER_HEIGHT,
      baseFacing: "left",
      patrolSpeed: RED_TABLE_PATROL_SPEED,
      patrolPhase: 0.38,
      patrolPath: [
        { x: 320, y: 632 },
        { x: 510, y: 632 },
        { x: 510, y: 792 },
        { x: 320, y: 792 }
      ]
    },
    { id: "brooks", assetKey: "brooks", name: "老布", x: 1214, y: 236, h: YARD_CHARACTER_HEIGHT, baseFacing: "right" }
  ],
  backgroundPrisoners: [
    {
      assetKey: "prisoner_01",
      h: YARD_CHARACTER_HEIGHT,
      speed: 0.075,
      phase: 0.05,
      path: [
        { x: 230, y: 310 },
        { x: 660, y: 310 },
        { x: 660, y: 350 },
        { x: 230, y: 350 }
      ]
    },
    {
      assetKey: "prisoner_02",
      h: YARD_CHARACTER_HEIGHT,
      speed: 0.095,
      phase: 0.38,
      path: [
        { x: 250, y: 308 },
        { x: 250, y: 830 },
        { x: 228, y: 830 },
        { x: 228, y: 308 }
      ]
    },
    {
      assetKey: "prisoner_03",
      h: YARD_CHARACTER_HEIGHT,
      speed: 0.065,
      phase: 0.72,
      path: [
        { x: 960, y: 760 },
        { x: 1410, y: 760 },
        { x: 1410, y: 815 },
        { x: 960, y: 815 }
      ]
    }
  ]
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
const InputSystem = {
  keys: Object.create(null),
  pressed: Object.create(null),
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
    window.addEventListener("keydown", (event) => {
      requestGameBgmStart();
      const key = normalizeKey(event.key);
      if (!this.keys[key]) {
        this.pressed[key] = true;
      }
      this.keys[key] = true;
      if (key === " " || key.indexOf("arrow") === 0) {
        event.preventDefault();
      }
    });

    window.addEventListener("keyup", (event) => {
      this.keys[normalizeKey(event.key)] = false;
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
      this.releasePointer(event.pointerId);
      event.preventDefault();
    });

    canvas.addEventListener("pointercancel", (event) => {
      this.releasePointer(event.pointerId);
      event.preventDefault();
    });

    canvas.addEventListener("mouseup", (event) => {
      this.releasePointer("mouse");
      event.preventDefault();
    });
  },

  handleCanvasPress(point, pointerId, targetCanvas) {
    this.pointerPressed = true;
    this.pointerJustPressed = true;
    this.pointerX = point.x;
    this.pointerY = point.y;
    GameState.debug.pointerX = point.x;
    GameState.debug.pointerY = point.y;

    if (distance(point.x, point.y, this.joystick.baseX, this.joystick.baseY) <= this.joystick.radius + 26) {
      this.joystick.active = true;
      this.joystick.pointerId = pointerId;
      this.updateJoystick(point.x, point.y);
    } else if (distance(point.x, point.y, this.actionButton.x, this.actionButton.y) <= this.actionButton.radius) {
      this.actionButton.held = true;
      this.actionButton.justPressed = true;
    }

    if (targetCanvas && pointerId !== null) {
      targetCanvas.setPointerCapture(pointerId);
    }
  },

  updateJoystick(x, y) {
    const stick = this.joystick;
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
  },

  releasePointer(pointerId) {
    this.pointerPressed = false;
    if (this.joystick.pointerId === pointerId) {
      this.joystick.active = false;
      this.joystick.pointerId = null;
      this.joystick.knobX = this.joystick.baseX;
      this.joystick.knobY = this.joystick.baseY;
      this.joystick.vectorX = 0;
      this.joystick.vectorY = 0;
    }
    this.actionButton.held = false;
  },

  endFrame() {
    this.pressed = Object.create(null);
    this.pointerJustPressed = false;
    this.actionButton.justPressed = false;
  },

  isDown(key) {
    return Boolean(this.keys[key]);
  },

  isPressed(key) {
    return Boolean(this.pressed[key]);
  },

  getMoveVector() {
    let x = 0;
    let y = 0;

    if (this.isDown("a") || this.isDown("arrowleft")) x -= 1;
    if (this.isDown("d") || this.isDown("arrowright")) x += 1;
    if (this.isDown("w") || this.isDown("arrowup")) y -= 1;
    if (this.isDown("s") || this.isDown("arrowdown")) y += 1;

    x += this.joystick.vectorX;
    y += this.joystick.vectorY;

    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }

    return { x, y };
  },

  actionPressed(name) {
    if (name === "pause") return this.isPressed("escape");
    if (name === "continueDialogue") return this.isPressed(" ") || this.pointerJustPressed || this.actionButton.justPressed;
    if (name === "interact") return this.isPressed("e") || this.actionButton.justPressed;
    if (name === "selectEnding") return this.pointerJustPressed || this.isPressed("e");
    return false;
  },

  actionDown(name) {
    if (name === "interact") return this.isDown("e") || this.actionButton.held;
    if (name === "continueDialogue") return this.isDown(" ") || this.actionButton.held;
    return false;
  },

  pointerInRect(rect) {
    return this.pointerX >= rect.x &&
      this.pointerX <= rect.x + rect.w &&
      this.pointerY >= rect.y &&
      this.pointerY <= rect.y + rect.h;
  }
};

function normalizeKey(key) {
  return key.length === 1 ? key.toLowerCase() : key.toLowerCase();
}

// ======================================================
// 6. Asset Loader
// ======================================================
const AssetStore = {
  images: Object.create(null),
  audio: Object.create(null)
};

function loadAssets() {
  Object.keys(AssetManifest.images).forEach((key) => {
    loadImageAsset(key, AssetManifest.images[key]);
  });

  Object.keys(AssetManifest.audio).forEach((key) => {
    loadAudioAsset(key, AssetManifest.audio[key]);
  });
}

function loadImageAsset(key, fileName) {
  const image = new Image();
  const record = {
    key,
    fileName,
    element: image,
    loaded: false,
    failed: false
  };

  image.onload = () => {
    record.loaded = true;
  };

  image.onerror = () => {
    record.failed = true;
  };

  image.src = IMAGE_ROOT + fileName;
  AssetStore.images[key] = record;
}

function loadAudioAsset(key, source) {
  const asset = normalizeAudioAssetSource(source);
  const audio = new Audio();
  const record = {
    key,
    root: asset.root,
    fileName: asset.fileName,
    element: audio,
    loaded: false,
    failed: false
  };

  const markLoaded = () => {
    record.loaded = true;
  };

  audio.preload = "auto";
  audio.addEventListener("loadeddata", markLoaded, { once: true });
  audio.addEventListener("canplaythrough", markLoaded, { once: true });
  audio.addEventListener("error", () => {
    record.failed = true;
  }, { once: true });
  audio.src = buildEncodedAssetPath(asset.root, asset.fileName);
  audio.load();
  AssetStore.audio[key] = record;
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
  repeatTimers: Object.create(null),

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

  playOneShotForDuration(key, gainMultiplier = 1, playbackRate = 1, durationSeconds = 1) {
    createAudioElements(key, gainMultiplier, playbackRate, false).forEach((audio) => {
      const removeAudio = () => {
        const index = this.oneShots.indexOf(audio);
        if (index >= 0) {
          this.oneShots.splice(index, 1);
        }
      };
      const stopTimer = setTimeout(() => {
        stopAudioElement(audio);
        removeAudio();
      }, durationSeconds * 1000);

      this.oneShots.push(audio);
      audio.addEventListener("ended", () => {
        clearTimeout(stopTimer);
        removeAudio();
      }, { once: true });
      safePlayAudio(audio);
    });
  },

  syncLoopGroup(slot, shouldPlay, key, gainMultiplier = 1, playbackRate = 1) {
    if (shouldPlay) {
      this.startLoopGroup(slot, key, gainMultiplier, playbackRate);
      return;
    }
    this.stopLoopGroup(slot);
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

  updateRepeatingOneShot(slot, shouldPlay, dt, key, interval, gainMultiplier = 1, playbackRate = 1) {
    if (!shouldPlay) {
      this.repeatTimers[slot] = 0;
      return;
    }

    let timer = this.repeatTimers[slot] || 0;
    timer -= dt;
    if (timer <= 0) {
      this.playOneShot(key, gainMultiplier, playbackRate);
      timer = interval;
    }
    this.repeatTimers[slot] = timer;
  }
};

function requestGameBgmStart() {
  if (GameState.gameBgmStopped) {
    return;
  }

  GameState.gameBgmStarted = true;
  AudioSystem.startLoopGroup("gameBgm", "game_bgm", GAME_BGM_VOLUME);
}

function stopGameBgm() {
  GameState.gameBgmStopped = true;
  AudioSystem.stopLoopGroup("gameBgm");
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
  const record = AssetStore.audio[key];
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

function updateAudioSystem(dt) {
  if (GameState.gameBgmStarted && !GameState.gameBgmStopped) {
    AudioSystem.startLoopGroup("gameBgm", "game_bgm", GAME_BGM_VOLUME);
  }

  const move = InputSystem.getMoveVector();
  const movementInputActive = Math.abs(move.x) > 0.05 || Math.abs(move.y) > 0.05;
  const mainPlayerMoving = movementInputActive && GameState.player.isMoving && !DialogueSystem.active;
  const cellFootstepsActive = GameState.scene === "cell" &&
    mainPlayerMoving &&
    !GameState.player.lyingInBed &&
    !isCellInspectionActive() &&
    !isWallHoleRevealTransitionActive();
  const yardFootstepsActive = GameState.scene === "yard" && mainPlayerMoving;

  AudioSystem.syncLoopGroup("cellFootsteps", cellFootstepsActive, "cell_footsteps", 1, FOOTSTEP_AUDIO_RATE);
  AudioSystem.syncLoopGroup("yardFootsteps", yardFootstepsActive, "outdoor_footsteps", 2, FOOTSTEP_AUDIO_RATE);
  AudioSystem.updateRepeatingOneShot(
    "digSoil",
    GameState.scene === "dig" && GameState.dig.isDigging,
    dt,
    "dig_soil",
    DIG_AUDIO_INTERVAL_SECONDS
  );
  AudioSystem.updateRepeatingOneShot(
    "pipeHit",
    GameState.scene === "pipe" && GameState.pipe.isSmashing,
    dt,
    "pipe_hit",
    PIPE_HIT_AUDIO_INTERVAL_SECONDS
  );
}

function getSourceWidth(source) {
  return source.naturalWidth || source.width || 1;
}

function getSourceHeight(source) {
  return source.naturalHeight || source.height || 1;
}

function drawAsset(ctx, assetKey, x, y, w, h) {
  const record = AssetStore.images[assetKey];
  if (record && record.loaded && !record.failed) {
    ctx.drawImage(record.element, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    return;
  }

  drawMissingAsset(ctx, assetKey, x, y, w, h);
}

function drawAssetContain(ctx, assetKey, fallbackWidth, fallbackHeight) {
  const rect = getAssetContainRect(assetKey, fallbackWidth, fallbackHeight);
  const record = AssetStore.images[assetKey];

  if (record && record.loaded && !record.failed) {
    ctx.drawImage(record.element, Math.round(rect.x), Math.round(rect.y), Math.round(rect.w), Math.round(rect.h));
  } else {
    drawMissingAsset(ctx, assetKey, rect.x, rect.y, rect.w, rect.h);
  }

  return rect;
}

function drawAssetCover(ctx, assetKey, fallbackWidth, fallbackHeight) {
  const record = AssetStore.images[assetKey];
  const sourceWidth = record && record.loaded && !record.failed ? getSourceWidth(record.element) : fallbackWidth;
  const sourceHeight = record && record.loaded && !record.failed ? getSourceHeight(record.element) : fallbackHeight;
  const scale = Math.max(CANVAS_WIDTH / sourceWidth, CANVAS_HEIGHT / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;
  const x = (CANVAS_WIDTH - width) / 2;
  const y = (CANVAS_HEIGHT - height) / 2;

  if (record && record.loaded && !record.failed) {
    ctx.drawImage(record.element, Math.round(x), Math.round(y), Math.round(width), Math.round(height));
  } else {
    drawMissingAsset(ctx, assetKey, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function drawAssetToRect(ctx, assetKey, rect) {
  drawAsset(ctx, assetKey, rect.x, rect.y, rect.w, rect.h);
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
    },

    handleInput() {
      const buttonClick = InputSystem.pointerJustPressed && InputSystem.pointerInRect(getIntroStartButtonRect());
      if (buttonClick || InputSystem.actionPressed("interact") || InputSystem.isPressed(" ")) {
        AudioSystem.playOneShotForDuration("new_game_thunder", NEW_GAME_THUNDER_GAIN, 1, NEW_GAME_THUNDER_SECONDS);
        changeScene("livingRoom");
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
        changeScene("cell");
      }
    },

    render(ctx) {
      renderWhiteLight(ctx);
    }
  }),

  cell: createBaseScene("cell", {
    enter() {
      const returningFromMontage = GameState.previousScene === "montage" && GameState.twentyYearsPassed;
      GameState.currentQuest = GameState.twentyYearsPassed ?
        getPostMontageCellQuest() :
        GameState.hasAttributeD && !GameState.hasSoilPile ?
        "quest_cell_sleep_after_soil" :
        GameState.hasSoilPile ?
        "quest_cell_soil_pile" :
        (GameState.hasAttributeC ? "quest_cell_wall_picture" : "quest_cell_wake");
      if (!returningFromMontage) {
        GameState.player.lyingInBed = false;
      }
      if (GameState.wallHole.revealed && !GameState.wallHole.introPending && !GameState.wallHole.exitPending) {
        resetWallHoleReveal();
      }
      if (!isCellInspectionActive()) {
        resetCellInspectionState();
      }
      if (returningFromMontage) {
        lieDownInBed();
      } else if (GameState.previousScene === "dig") {
        setPlayerFootToCellImage(CellLayout.pictureStandPoint.x, CellLayout.pictureStandPoint.y);
        GameState.player.facing = "down";
      } else if (GameState.previousScene === "yard") {
        setPlayerFootToCellImage(220, 620);
        GameState.player.facing = "right";
      } else {
        setPlayerPosition(610, 450);
      }
    },

    update(dt) {
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
      handlePauseInput();
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
          changeScene("yard");
        } else if (activeInteraction.id === "bed") {
          toggleBedRest();
        } else if (activeInteraction.id === "wallPicture") {
          handleWallPictureInteraction();
        } else if (activeInteraction.id === "drawMap") {
          startMapDrawing();
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
      GameState.currentQuest = GameState.twentyYearsPassed ? getPostMontageYardQuest() : "quest_yard_first_walk";
      GameState.player.lyingInBed = false;
      initializeRedNpcState();
      initializeBrooksNpcState();
      initializeYardPrisoners();
      const spawnPoint = GameState.previousScene === "office" ? YardLayout.officeReturnPoint : YardLayout.entryPoint;
      GameState.player.facing = GameState.previousScene === "office" ? "left" : "right";
      setPlayerFootToYardImage(spawnPoint.x, spawnPoint.y);
      updateYardCamera();
    },

    update(dt) {
      if (
        isRedDialogueApproachActive() ||
        isBrooksDialogueApproachActive() ||
        (GameState.redDialogueActive && DialogueSystem.active) ||
        (GameState.brooksDialogueActive && DialogueSystem.active)
      ) {
        stopPlayerForNpcDialogue();
      } else {
        updatePlayer(dt);
      }
      updateRedNpc(dt);
      updateBrooksNpc(dt);
      updateYardPrisoners(dt);
      updateYardGuards(dt);
      SoilSystem.update(dt);
      updateYardCamera();
    },

    handleInput() {
      handlePauseInput();
      if (DialogueSystem.active || isRedDialogueApproachActive() || isBrooksDialogueApproachActive()) {
        return;
      }

      const activeInteraction = getActiveYardInteraction();
      if (InputSystem.actionPressed("interact") && activeInteraction) {
        if (activeInteraction.id === "cellDoor") {
          changeScene("cell");
        } else if (activeInteraction.id === "wardenOffice") {
          if (hasOfficeAttributeA()) {
            changeScene("office");
          } else {
            denyOfficeEntry();
          }
        } else if (activeInteraction.id === "red") {
          if (GameState.twentyYearsPassed) {
            if (!GameState.postMontageRedSpoken) {
              requestRedDialogue("postMontage");
            } else {
              GameState.currentQuest = "quest_cell_draw_map_return";
            }
          } else if (GameState.hasHammer) {
            GameState.currentQuest = "quest_yard_library";
          } else {
            requestRedDialogue("hammer");
          }
        } else if (activeInteraction.id === "library") {
          if (!GameState.hasHammer) {
            requestBrooksDialogue("hint");
          } else if (!GameState.hasBible) {
            requestBrooksDialogue("bible");
          } else {
            GameState.currentQuest = "quest_yard_bible_obtained";
          }
        } else if (activeInteraction.id === "soil") {
          GameState.currentQuest = "quest_yard_soil";
        } else {
          GameState.currentQuest = "quest_yard_" + activeInteraction.id;
        }
      }
    },

    render(ctx) {
      renderYard(ctx);
    }
  }),

  montage: createBaseScene("montage", {
    enter() {
      GameState.currentQuest = "quest_montage_twenty_years";
      startTwentyYearsMontage();
    },

    update(dt) {
      updateTwentyYearsMontage(dt);
    },

    handleInput() {},

    render(ctx) {
      renderTwentyYearsMontage(ctx);
    }
  }),

  office: createBaseScene("office", {
    enter() {
      GameState.currentQuest = "quest_office_warden";
      GameState.player.lyingInBed = false;
      GameState.player.facing = "up";
      resetOfficeSceneState();
      if (GameState.ledgerSwapped) {
        GameState.office.wardenPhase = "gone";
        GameState.currentQuest = "quest_office_leave";
      }
      setPlayerFootToOfficeImage(OfficeLayout.spawnFoot.x, OfficeLayout.spawnFoot.y);
    },

    update(dt) {
      if (GameState.office.safeViewOpen) {
        updateOfficeSafeView();
        return;
      }
      updatePlayer(dt);
      updateOfficeWarden(dt);
    },

    handleInput() {
      handlePauseInput();
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
        }
      }
    },

    render(ctx) {
      renderOffice(ctx);
    }
  }),

  pause: createBaseScene("pause", {
    handleInput() {
      if (InputSystem.actionPressed("pause") || InputSystem.actionPressed("interact")) {
        changeScene(GameState.previousScene || "menu");
      }
    },

    render(ctx) {
      renderPause(ctx);
    }
  }),

  fail: createBaseScene("fail", {
    handleInput() {
      if (InputSystem.actionPressed("interact") || InputSystem.actionPressed("continueDialogue")) {
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

function handlePauseInput() {
  if (InputSystem.actionPressed("pause")) {
    changeScene("pause");
  }
}

// ======================================================
// 8. Dialogue System
// ======================================================
const DialogueBoxLayout = {
  sourceW: 1448,
  sourceH: 1086,
  canvasRect: { x: 190, y: 438, w: 900, h: 270 },
  textSourceRect: { x: 128, y: 334, w: 1192, h: 420 },
  nameSourceRects: {
    npc: { x: 99, y: 238, w: 249, h: 65 },
    andy: { x: 1042, y: 218, w: 279, h: 85 }
  }
};

const DialogueSystem = {
  active: false,
  lines: [],
  index: 0,
  justStarted: false,

  start(lines) {
    this.active = true;
    this.lines = lines.slice();
    this.index = 0;
    this.justStarted = true;
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
      }
    }
  },

  render(ctx) {
    if (!this.active) {
      return;
    }

    renderDialogueBox(ctx, this.lines[this.index] || "");
  }
};

function renderRedDialogueBox(ctx, line) {
  renderDialogueBox(ctx, line);
}

function renderDialogueBox(ctx, line) {
  const parsed = parseDialogueLine(line);
  const variant = parsed.speaker === "\u5b89\u8fea" ? "andy" : "npc";
  const assetKey = variant === "andy" ? "dialogue_andy" : "dialogue_npc";
  const box = DialogueBoxLayout.canvasRect;
  drawAsset(ctx, assetKey, box.x, box.y, box.w, box.h);

  renderDialogueSpeakerName(
    ctx,
    parsed.speaker,
    dialogueSourceRectToCanvas(DialogueBoxLayout.nameSourceRects[variant])
  );
  renderDialogueTextBlock(
    ctx,
    parsed.text,
    dialogueSourceRectToCanvas(DialogueBoxLayout.textSourceRect)
  );
}

function parseDialogueLine(line) {
  const value = String(line || "");
  const colonIndexes = [value.indexOf("\uff1a"), value.indexOf(":")]
    .filter((index) => index > 0);
  const colonIndex = colonIndexes.length ? Math.min.apply(null, colonIndexes) : -1;

  if (colonIndex > 0 && colonIndex <= 8) {
    return {
      speaker: value.slice(0, colonIndex).trim(),
      text: value.slice(colonIndex + 1).trim()
    };
  }

  return {
    speaker: "",
    text: value
  };
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
const InventorySystem = {
  items: [],

  render(ctx) {
    if (GameState.hasHammer || GameState.hasBible || GameState.hasSoilPile || GameState.hasLedger || GameState.hasMap) {
      renderFixedInventoryItems(ctx);
      return;
    }

    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.68)";
    ctx.fillRect(24, 24, 245, 48);
    ctx.fillStyle = "#f5df9d";
    ctx.font = "20px monospace";
    ctx.textAlign = "left";
    ctx.fillText("物品：无", 42, 55);
    ctx.restore();
  }
};

function renderFixedInventoryItems(ctx) {
  const items = [];
  if (GameState.hasHammer) {
    items.push({ assetKey: "hammer", label: "石锤" });
  }
  if (GameState.hasBible) {
    items.push({ assetKey: "bible", label: "圣经" });
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

  const boxW = 104;
  const boxH = 72;
  const gap = 10;
  const startX = CANVAS_WIDTH - boxW - 18;
  const startY = Math.round(CANVAS_HEIGHT / 4);
  const iconSize = 38;

  ctx.save();
  ctx.fillStyle = "#f5df9d";
  ctx.font = "15px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  items.forEach((item, index) => {
    const boxX = startX;
    const boxY = startY + index * (boxH + gap);
    const centerX = boxX + boxW / 2;
    const iconY = boxY + 7;
    const iconX = centerX - iconSize / 2;
    renderPanel(ctx, boxX, boxY, boxW, boxH);
    drawAsset(ctx, item.assetKey, iconX, iconY, iconSize, iconSize);
    ctx.fillText(fitTextToWidth(ctx, item.label, boxW - 12, ""), centerX, boxY + boxH - 10);
  });
  ctx.restore();
}

// ======================================================
// 10. Quest System
// ======================================================
const QuestSystem = {
  labels: {
    quest_start: "点击开始按钮进入游戏，从一次普通观影走进安迪的越狱计划。",
    quest_living_room_tv: "电视画面开始异常闪烁。按 E 键或空格键继续观影，跟住那道白光。",
    quest_recap: "剧情分镜正在展开。点击画面或按空格键逐页推进，先看清这座监狱的规则。",
    quest_white_light: "白光正在吞没客厅。稍等片刻，你会在电影世界里的牢房醒来。",
    quest_cell_wake: "你在牢房醒来。先熟悉移动，再观察牢门、床铺和床头墙上的画。",
    quest_cell_wall_picture: "床头那幅画遮住了什么。靠近它，把画移开看看墙后的秘密。",
    quest_cell_first_dig_ready: "墙后的洞口已经露出。进入土洞，开始这场漫长逃亡的第一铲。",
    quest_cell_inspection: "典狱长正在查房。保持镇定，点击画面或按空格键推进对话。",
    quest_cell_inspection_wait: "典狱长和狱警正在进门。站在床边别乱动，别让锤子暴露。",
    quest_cell_inspection_leave: "查房已经通过。等典狱长和狱警离开，再继续行动。",
    quest_cell_inspection_passed: "圣经藏住了锤子，检查已经混过去。靠近床头的画，准备第一次挖洞。",
    quest_cell_soil_pile: "你带出了第一小堆土。先离开牢房，到劳作区找机会把土处理掉。",
    quest_cell_sleep_after_soil: "小土堆已经处理干净。回到床上休息，让漫长的计划继续向前。",
    quest_cell_find_red_after_montage: "二十年过去了，墙后的路终于变长。起身去劳作区找瑞德确认下一步。",
    quest_cell_draw_map_return: "瑞德需要更明确的路线。回到牢房，在桌前画出通往办公室的地图。",
    quest_cell_draw_map: "站到牢房桌前作画。画好地图后，才能找到典狱长办公室的入口。",
    quest_cell_map_ready: "地图已经画好。点击放大的地图或按交互键收好它，准备去办公室。",
    quest_cell_map_obtained: "地图已经收好。回到劳作区，从左下角入口潜入典狱长办公室。",
    quest_montage_twenty_years: "二十年的重复正在流过：夜里挖洞，白天藏土，希望一点点扩大。",
    quest_dig_first: "土洞里只能左右移动。一直向右走到墙面尽头，长按挖洞键坚持 10 秒。",
    quest_dig_return: "土已经装在身上。别久留，从左侧洞口返回，再去劳作区处理小土堆。",
    quest_cell_final_dig_ready: "账本已经调包，最终逃亡可以开始。靠近床头的画，打开通往水管的土洞。",
    quest_final_tunnel: "二十年的土洞终于挖通。沿着狭窄通道向右移动，找到通往水管的入口。",
    quest_pipe_tunnel: "沿着水管向右前进。到水管敲击点后等雷声亮起，再按住交互键砸水管。",
    quest_yard_first_walk: "劳作区有几处关键地点：下方紫区回牢房，左侧绿区找瑞德，右上白区找老布。",
    quest_yard_cell_door: "这里通向牢房。靠近画面下方的牢房入口，按 E 键或右下按钮返回牢房。",
    quest_yard_warden_office: "这里是典狱长办公室入口。拿到地图后，账本调包会从这里开始。",
    quest_yard_red: "瑞德在左侧长椅附近等你。先取得石锤，逃亡计划才真正开始。",
    quest_yard_find_red_after_montage: "去左侧长椅附近找瑞德。二十年后的计划，需要他给出最后线索。",
    quest_yard_red_after_montage_done: "瑞德说清了路线。回到牢房桌前，画出进入办公室的地图。",
    quest_yard_library: "老布在右上方图书馆入口旁。拿到圣经，才能把石锤藏过查房。",
    quest_yard_bible_obtained: "圣经已经到手，石锤也藏好了。回牢房躺到床上，等待典狱长查房。",
    quest_yard_soil: "把小土堆倒在劳作区中间偏右的空地。每次长按 3 秒，共成功 3 次，狱警靠近就停手。",
    quest_yard_soil_partial: "已经处理掉一部分土。继续找空档在劳作区中间偏右的空地倒土，直到完成 3 次。",
    quest_yard_soil_done: "土已经处理干净。回到下方紫区进入牢房，躺到床上推进二十年计划。",
    quest_yard_reserved_interaction: "这里暂时没有新的线索。回到当前目标地点，继续推进逃亡计划。",
    quest_office_denied: "现在还不能进办公室。先找瑞德确认路线，再回牢房画出地图。",
    quest_office_warden: "先靠近书桌旁的典狱长并交谈。等他离开后，才有机会搜查办公室。",
    quest_office_warden_leaving: "典狱长正在离开。先别急着翻找，等他的脚步声远去。",
    quest_office_embroidery: "办公室可以搜查了。检查左侧墙上的刺绣画，账本可能就藏在后面。",
    quest_office_safe: "保险柜已经露出，账本就在里面。找到它后，立刻准备调包。",
    quest_office_swap_ledger: "点击账本或按 E 键，用圣经完成调包，把真正的账本带走。",
    quest_office_leave: "账本已经调包。走到下方门口，离开办公室，回牢房准备最后一次挖洞。"
  },

  getCurrentText() {
    return mergeGuideText(this.labels[GameState.currentQuest] || GameState.currentQuest, getContextGuideText());
  },

  render(ctx) {
    renderQuestText(ctx, this.getCurrentText());
  }
};

function getContextGuideText() {
  if (DialogueSystem.active) {
    return "";
  }

  if (GameState.scene === "cell") {
    return getCellContextGuideText();
  }
  if (GameState.scene === "dig") {
    return getDigContextGuideText();
  }
  if (GameState.scene === "pipe") {
    return getPipeContextGuideText();
  }
  if (GameState.scene === "yard") {
    return getYardContextGuideText();
  }
  if (GameState.scene === "office") {
    return getOfficeContextGuideText();
  }
  return "";
}

function getCellContextGuideText() {
  if (GameState.mapRevealActive) {
    return "地图线索已经完成；点击画面，或按 E 键 / 右下按钮把地图收好。";
  }
  if (isWallHoleRevealTransitionActive()) {
    return "墙后的洞口正在打开，先等动画结束。";
  }
  if (isCellInspectionActive()) {
    if (GameState.cellInspection.phase === "enteringWarden" || GameState.cellInspection.phase === "enteringGuard") {
      return "典狱长和狱警正在进门，站在床边保持镇定。";
    }
    if (GameState.cellInspection.phase === "leaving") {
      return "查房结束了，等他们完全离开后再行动。";
    }
    return "";
  }

  const activeInteraction = getActiveCellInteraction();
  if (activeInteraction && activeInteraction.id === "wallPicture") {
    return "按 E 键 / 右下按钮移开墙上的画。";
  }
  if (activeInteraction && activeInteraction.id === "drawMap") {
    return "按 E 键 / 右下按钮在桌上画地图。";
  }
  if (activeInteraction && activeInteraction.id === "cellDoor") {
    return "按 E 键 / 右下按钮走出牢房。";
  }
  if (activeInteraction && activeInteraction.id === "bed") {
    if (GameState.player.lyingInBed) {
      return "按 E 键 / 右下按钮从床上起身。";
    }
    if (GameState.hasAttributeD && !GameState.twentyYearsPassed) {
      return "按 E 键 / 右下按钮躺下休息，让时间继续流过。";
    }
    if (GameState.hasHammer && !GameState.inspectionPassed && !GameState.hasAttributeC) {
      return "按 E 键 / 右下按钮躺到床上，等待查房开始。";
    }
    return "按 E 键 / 右下按钮躺到床上。";
  }
  if (GameState.hasSoilPile) {
    return "带着土时别停留，向左侧牢门移动，先去劳作区处理小土堆。";
  }
  if (GameState.hasAttributeD && !GameState.twentyYearsPassed) {
    return "床在牢房中部，靠近床铺躺下，就能进入下一段计划。";
  }
  if (GameState.currentQuest === "quest_cell_map_obtained") {
    return "从左侧牢门出去，回劳作区寻找通往办公室的入口。";
  }
  if (GameState.currentQuest === "quest_cell_final_dig_ready") {
    return "目标在床头墙上的画后面，靠近那里打开最后的洞口。";
  }
  return "用 W、A、S、D / 方向键 / 虚拟摇杆移动；牢门、床、桌子和墙画都可能有用。";
}

function getDigContextGuideText() {
  const activeInteraction = getActiveDigInteraction();
  if (activeInteraction && activeInteraction.id === "dig") {
    return GameState.dig.isDigging ?
      "继续长按 E 键 / 右下按钮，进度满后会带出小土堆。" :
      "按住 E 键 / 右下按钮开始挖洞。";
  }
  if (activeInteraction && activeInteraction.id === "leave") {
    return "按 E 键 / 右下按钮从左侧洞口返回牢房。";
  }
  if (GameState.hasSoilPile) {
    return "土已经带在身上，从左侧洞口离开，再去劳作区处理。";
  }
  if (isFinalDigScene()) {
    return "最后的通道已经连通。向右走到尽头的入口，进入水管区域。";
  }
  return "这里空间很窄，只能左右移动；最右侧的墙面尽头就是挖掘点。";
}

function getPipeContextGuideText() {
  const activeInteraction = getActivePipeInteraction();
  if (activeInteraction && activeInteraction.id === "smashPipe") {
    return "等雷声和高亮出现时，按住 E 键 / 右下按钮砸水管；安静时出手会失败。";
  }
  if (GameState.pipe.smashCompleted) {
    return "水管已经砸开，继续向右移动，找到逃出去的落点。";
  }
  return "只能左右移动。先靠近水管敲击点，等雷声掩护后再砸水管。";
}

function getYardContextGuideText() {
  const activeInteraction = getActiveYardInteraction();
  if (!activeInteraction) {
    if (GameState.hasSoilPile) {
      return "向劳作区中间偏右的空地移动，确认狱警远离后再长按倒土。";
    }
    if (GameState.hasMap && !GameState.ledgerSwapped) {
      return "向左下角的办公室入口移动，进入典狱长办公室。";
    }
    if (GameState.hasAttributeD && !GameState.twentyYearsPassed) {
      return "向画面下方的牢房入口移动，回牢房躺下休息。";
    }
    if (GameState.twentyYearsPassed && !GameState.postMontageRedSpoken) {
      return "瑞德在左侧长椅附近，向长椅移动并靠近他。";
    }
    if (!GameState.hasHammer) {
      return "先去左侧长椅附近找瑞德，取得石锤。";
    }
    if (!GameState.hasBible) {
      return "石锤已经到手，去右上方图书馆入口找老布拿圣经。";
    }
    if (!GameState.inspectionPassed) {
      return "道具已经备齐，从画面下方的牢房入口回去，躺到床上等待查房。";
    }
    return "按可见地标找路：下方回牢房，左侧长椅找瑞德，右上图书馆找老布，左下门口进办公室。";
  }
  if (activeInteraction.id === "cellDoor") {
    return "按 E 键 / 右下按钮回到牢房。";
  }
  if (activeInteraction.id === "wardenOffice") {
    return "按 E 键 / 右下按钮进入典狱长办公室。";
  }
  if (activeInteraction.id === "red") {
    if (GameState.twentyYearsPassed) {
      return "按 E 键 / 右下按钮与瑞德交谈，确认办公室路线。";
    }
    return GameState.hasHammer ?
      "石锤已经收好，下一步去右上方找老布拿圣经。" :
      "按 E 键 / 右下按钮与瑞德交谈，取得石锤。";
  }
  if (activeInteraction.id === "library") {
    if (!GameState.hasHammer) {
      return "现在还缺石锤，先去左侧找瑞德。";
    }
    return GameState.hasBible ?
      "圣经已经收好，从画面下方的牢房入口回去准备查房。" :
      "按 E 键 / 右下按钮与老布交谈，取得圣经。";
  }
  if (activeInteraction.id === "soil") {
    return GameState.soilDump.active ?
      "继续长按倒土，盯住狱警位置；被碰到就会失败。" :
      "按住 E 键 / 右下按钮倒土，进度满才算成功。";
  }
  return "";
}

function getOfficeContextGuideText() {
  if (GameState.office.safeViewOpen) {
    if (GameState.office.safeStage === "ledgerFound") {
      return "点击账本或按 E 键，用圣经完成调包。";
    }
    return "";
  }

  const activeInteraction = getActiveOfficeInteraction();
  if (!activeInteraction) {
    if (GameState.office.wardenPhase === "waiting") {
      return "典狱长在书桌旁，先靠近他开始对话。";
    }
    if (GameState.office.wardenPhase === "leaving") {
      return "典狱长还没走远，先等待，不要急着搜查。";
    }
    if (GameState.office.wardenPhase === "gone" && !GameState.ledgerSwapped) {
      return "现在可以行动，向左侧墙上的刺绣画移动。";
    }
    if (GameState.ledgerSwapped) {
      return "调包已经完成，向下方门口移动并离开办公室。";
    }
    return "";
  }
  if (activeInteraction.id === "warden") {
    return "按 E 键 / 右下按钮与典狱长交谈。";
  }
  if (activeInteraction.id === "embroidery") {
    return "按 E 键 / 右下按钮打开左侧墙上的刺绣。";
  }
  if (activeInteraction.id === "door") {
    return "按 E 键 / 右下按钮离开办公室。";
  }
  return "";
}

function mergeGuideText(baseText, contextText) {
  if (!contextText || baseText.indexOf(contextText) >= 0) {
    return baseText;
  }
  return baseText + " " + contextText;
}

// ======================================================
// 11. Checkpoint System
// ======================================================
const CheckpointSystem = {
  save(checkpointKey) {
    GameState.currentCheckpoint = checkpointKey;
    try {
      localStorage.setItem("shawshank_pixel_escape_checkpoint", checkpointKey);
    } catch (error) {
      if (DEBUG_MODE) {
        console.warn(error);
      }
    }
  },

  restore() {
    try {
      return localStorage.getItem("shawshank_pixel_escape_checkpoint") || "CP_START";
    } catch (error) {
      if (DEBUG_MODE) {
        console.warn(error);
      }
      return "CP_START";
    }
  }
};

function saveCheckpoint(checkpointKey) {
  CheckpointSystem.save(checkpointKey);
}

function restoreCheckpoint() {
  return CheckpointSystem.restore();
}

// ======================================================
// 12. Gameplay Systems
// Digging / Soil / Guard / Office / Pipe
// ======================================================
const DiggingSystem = {
  update() {}
};

const SoilSystem = {
  update(dt) {
    updateSoilDumping(dt);
  }
};

const GuardSystem = {
  update() {}
};

const OfficeSystem = {
  update() {}
};

// @feature SoilDumpSystem
// @test 没有小土堆时撒土区不返回交互；持有小土堆时必须连续长按 3 秒才累计一次倒土。
// @acceptance 成功倒土 3 次后进入状态D，并指引玩家回牢房床上睡觉。
// @risk 倒土进行中与狱警触碰会失败，并回退到刚获得小土堆后的节点。
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
  GameState.currentQuest = "quest_yard_soil";

  // 玩家倒土时被狱警碰到，立即失败并回到刚获得小土堆后的节点。
  if (isYardGuardTouchingPlayer()) {
    failSoilDumpByGuard();
    return;
  }

  GameState.soilDump.progress = Math.min(
    SOIL_DUMP_HOLD_SECONDS,
    GameState.soilDump.progress + dt
  );

  if (GameState.soilDump.progress >= SOIL_DUMP_HOLD_SECONDS) {
    completeSoilDumpHold();
  }
}

function resetSoilDumpHold() {
  GameState.soilDump.active = false;
  GameState.soilDump.progress = 0;
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
  DialogueSystem.start([
    "你分三次把小土堆倒进劳作区，避开了狱警的视线。",
    "状态D达成：现在回到牢房，躺到床上睡觉。"
  ]);
}

function isYardGuardTouchingPlayer() {
  const playerFoot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  return GameState.yardGuards.some((guard) =>
    distance(playerFoot.x, playerFoot.y, guard.x, guard.y) <= YARD_GUARD_CATCH_DISTANCE
  );
}

function failSoilDumpByGuard() {
  GameState.failReason = "倒土时被狱警抓住了。";
  GameState.failRecovery = "soilDump";
  resetSoilDumpHold();
  changeScene("fail");
}

function restoreSoilFailureToPileCheckpoint() {
  DialogueSystem.active = false;
  DialogueSystem.lines = [];
  DialogueSystem.index = 0;
  DialogueSystem.justStarted = false;
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
    { x: 790, y: 388, fast: true, facing: "down", visualFacing: "down" },
    { x: 968, y: 574, fast: false, facing: "left", visualFacing: "left" }
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
    guard.facing = defaults.facing;
    guard.visualFacing = defaults.visualFacing;
    guard.turnTimer = 0;
    guard.isMoving = false;
    guard.walkAnimTime = 0;
  });
}

// @feature TwentyYearsMontage
// @test 状态D后躺到床上会淡出入睡，播放二十年蒙太奇，再淡入回到床上。
// @acceptance 蒙太奇结束后玩家仍躺在牢房床上，任务指引切换为去找瑞德。
function startTwentyYearsMontage() {
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
    setTwentyYearsMontagePhase("pages");
    return;
  }

  if (montage.phase === "pages") {
    const page = TwentyYearsMontagePages[montage.pageIndex] || TwentyYearsMontagePages[0];
    const duration = page && page.final ? MONTAGE_FINAL_PAGE_SECONDS : MONTAGE_PAGE_SECONDS;
    if (montage.timer >= duration) {
      if (montage.pageIndex < TwentyYearsMontagePages.length - 1) {
        montage.pageIndex += 1;
        montage.timer = 0;
      } else {
        setTwentyYearsMontagePhase("darkAfter");
      }
    }
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
  GameState.twentyYearsPassed = true;
  GameState.hasAttributeD = false;
  GameState.currentQuest = "quest_cell_find_red_after_montage";
  saveCheckpoint("CP_SOIL_DISPOSE");
  changeScene("cell");
}

// @feature CellInspectionSystem
// @test 持有石锤后回床睡觉会触发查房；无圣经失败并回退 CP_HAMMER_OBTAINED，有圣经通过并获得属性C。
// @checkpoint 查房失败保留石锤、移除圣经状态并回到找老布节点；查房成功保存 CP_INSPECTION_PASSED。
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
}

function isCellInspectionActive() {
  return GameState.cellInspection.phase !== "idle";
}

function startCellInspection() {
  resetCellInspectionState();
  standUpFromBed();
  GameState.cellInspection.phase = "enteringWarden";
  GameState.cellInspection.result = GameState.hasBible ? "pass" : "fail";
  GameState.currentQuest = "quest_cell_inspection_wait";
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
      DialogueSystem.start(inspection.result === "pass" ? InspectionPassDialogueLines : InspectionFailDialogueLines);
    }
    return;
  }

  if (inspection.phase === "dialogue") {
    patrolInspectionWarden(dt);
    if (!DialogueSystem.active) {
      if (inspection.result === "fail") {
        restoreInspectionFailureToHammerCheckpoint();
      } else {
        inspection.phase = "leaving";
        GameState.currentQuest = "quest_cell_inspection_leave";
      }
    }
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

function moveCellInspectionActor(actor, target, speed, dt) {
  const dx = target.x - actor.x;
  const dy = target.y - actor.y;
  const remaining = Math.hypot(dx, dy);
  if (remaining <= 4) {
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

function restoreInspectionFailureToHammerCheckpoint() {
  GameState.hasHammer = true;
  GameState.hasBible = false;
  GameState.inspectionPassed = false;
  GameState.hasAttributeC = false;
  GameState.redHammerDelivered = true;
  GameState.brooksBibleDelivered = false;
  GameState.brooksDialogueActive = false;
  GameState.brooksDialogueKind = null;
  GameState.brooksNpc.mode = "patrol";
  GameState.brooksNpc.pendingDialogue = null;
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
  GameState.currentQuest = "quest_cell_inspection_passed";
}

function getActiveCellInteraction() {
  if (GameState.scene !== "cell" || isCellInspectionActive() || isWallHoleRevealTransitionActive()) {
    return null;
  }

  if (canDrawMapAtTable() && isPlayerNearCellTable()) {
    return { id: "drawMap" };
  }

  if (canUseWallPicture() && isPlayerNearWallPicture()) {
    return { id: "wallPicture" };
  }

  if (GameState.player.lyingInBed || isPlayerOnBed()) {
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

function canUseWallPicture() {
  if (!GameState.hasAttributeC || GameState.hasSoilPile) {
    return false;
  }
  if (!GameState.twentyYearsPassed) {
    return !GameState.hasAttributeD;
  }
  return GameState.finalDigUnlocked && GameState.ledgerSwapped;
}

function isPlayerNearWallPicture() {
  const foot = canvasPointToCellImage(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  return Boolean(foot && pointInRect(foot, CellLayout.pictureInteractZone));
}

function canDrawMapAtTable() {
  return GameState.twentyYearsPassed &&
    GameState.postMontageRedSpoken &&
    !GameState.hasMap &&
    !GameState.mapRevealActive;
}

function isPlayerNearCellTable() {
  const foot = canvasPointToCellImage(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  return Boolean(foot && pointInRect(foot, CellLayout.tableDrawZone));
}

function startMapDrawing() {
  GameState.mapDrawn = true;
  GameState.mapRevealActive = true;
  GameState.currentQuest = "quest_cell_map_ready";
}

function deliverDrawnMap() {
  GameState.hasMap = true;
  GameState.mapRevealActive = false;
  GameState.currentQuest = "quest_cell_map_obtained";
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
  if (isFinalDigScene()) {
    AudioSystem.startLoopGroup("pipeRain", "pipe_rain", PIPE_RAIN_VOLUME);
  } else {
    AudioSystem.stopLoopGroup("pipeRain");
  }
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

  dig.playerX = clamp(dig.playerX + moveX * DIG_PLAYER_SPEED * dt, minX, maxX);
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
  DialogueSystem.start([
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
// @test The cue only lights while the player is in the smash zone; one successful smash requires holding interact for 1 second during a lit cue.
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
      pipe.cueLit = false;
      pipe.cueTimer = 0;
      pipe.nextCueDelay = getRandomPipeCueDelay();
      pipe.smashHoldTime = 0;
      pipe.smashHoldActive = false;
      pipe.smashWindowScored = false;
    }
    return;
  }

  if (pipe.cueTimer >= pipe.nextCueDelay) {
    pipe.cueLit = true;
    AudioSystem.playOneShot("thunder", PIPE_CUE_THUNDER_GAIN);
    pipe.cueTimer = 0;
    pipe.smashHoldTime = 0;
    pipe.smashHoldActive = false;
    pipe.smashWindowScored = false;
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
    AudioSystem.stopLoopGroup("pipeRain");
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
  saveGameBgmResumeTime();
  document.location.assign("../三个结局/ending.html");
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
  AudioSystem.stopLoopGroup("pipeRain");
  GameState.failReason = "狱警听到了声音，你要被抓了，越狱失败。";
  GameState.failRecovery = "pipeBeforeTunnel";
  resetPipeSmashState();
  changeScene("fail");
}

function failPipeDrowned() {
  AudioSystem.stopLoopGroup("pipeRain");
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
  return GameState.hasMap;
}

function denyOfficeEntry() {
  GameState.currentQuest = "quest_office_denied";
  DialogueSystem.start([
    "您未经允许，还无法进入办公室。"
  ]);
}

function resetOfficeSceneState() {
  GameState.office.wardenPhase = "waiting";
  GameState.office.wardenX = OfficeLayout.wardenStart.x;
  GameState.office.wardenY = OfficeLayout.wardenStart.y;
  GameState.office.wardenFacing = "left";
  GameState.office.wardenMoving = false;
  GameState.office.wardenWalkAnimTime = 0;
  GameState.office.embroideryChecked = false;
  GameState.office.safeViewOpen = false;
  GameState.office.safeStage = "closed";
}

function startOfficeWardenDialogue() {
  GameState.office.wardenPhase = "dialogue";
  GameState.office.wardenFacing = "left";
  GameState.office.wardenMoving = false;
  GameState.currentQuest = "quest_office_warden";
  DialogueSystem.start([
    "典狱长：安迪，找我有事？这些年你为监狱打理账务，做得还行啊。",
    "安迪：我只是来确认账目和文件，先生。",
    "典狱长：你给我好好干，我回去睡觉了。"
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
  DialogueSystem.start([
    "你打开墙上的刺绣，发现一个保险柜。",
    "所有人敬畏的典狱长，满口仁义道德，背后却藏着沾满罪恶的账本。"
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
  GameState.bibleUsed = true;
  GameState.ledgerSwapped = true;
  GameState.finalDigUnlocked = true;
  GameState.currentQuest = "quest_office_leave";
  saveCheckpoint("CP_FINAL_DIG");
  DialogueSystem.start([
    "你藏匿了罪恶的真相，也铺垫了属于自己的自由。"
  ]);
}

function leaveOfficeScene() {
  if (GameState.twentyYearsPassed && GameState.finalDigUnlocked) {
    GameState.hasAttributeC = true;
    GameState.currentQuest = "quest_cell_final_dig_ready";
  }
  changeScene("yard");
}

const PipeRhythmSystem = {
  update() {}
};

function initializeRedNpcState() {
  const npc = getRedNpcConfig();
  if (!npc || !npc.patrolPath) {
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
  red.pathDistance = getNearestLoopPathDistance(npc.patrolPath, { x: red.x, y: red.y });
  red.targetDistance = red.pathDistance;
  red.pauseTimer = randomRange(0.2, 0.8);
  red.pendingDialogue = null;
}

function getRedNpcConfig() {
  return YardLayout.npcs.find((npc) => npc.id === "red") || null;
}

function updateRedNpc(dt) {
  initializeRedNpcState();

  const red = GameState.redNpc;
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

  const step = Math.min(remaining, RED_TABLE_PATROL_SPEED * dt);
  red.x += dx / remaining * step;
  red.y += dy / remaining * step;
  red.facing = directionFromDelta(dx, dy);
  red.isMoving = true;
  red.walkAnimTime += dt;
}

function updateRedRandomPatrol(dt) {
  const npc = getRedNpcConfig();
  const red = GameState.redNpc;
  if (!npc || !npc.patrolPath) {
    return;
  }

  if (red.pauseTimer > 0) {
    red.pauseTimer = Math.max(0, red.pauseTimer - dt);
    red.isMoving = false;
    red.walkAnimTime = 0;
    if (red.pauseTimer <= 0) {
      chooseNextRedPatrolTarget(npc.patrolPath);
    }
    return;
  }

  const total = getLoopPathLength(npc.patrolPath);
  const remaining = getLoopDistanceRemaining(red.pathDistance, red.targetDistance, red.pathDirection, total);
  const step = Math.min(remaining, npc.patrolSpeed * dt);

  red.pathDistance = normalizeLoopDistance(red.pathDistance + red.pathDirection * step, total);
  const current = getLoopPathPositionAtDistance(npc.patrolPath, red.pathDistance);
  const next = getLoopPathPositionAtDistance(npc.patrolPath, red.pathDistance + red.pathDirection * 2);
  red.x = current.x;
  red.y = current.y;
  red.facing = directionFromDelta(next.x - current.x, next.y - current.y);
  red.isMoving = step > 0.01;
  if (red.isMoving) {
    red.walkAnimTime += dt;
  }

  if (remaining <= step + 0.01) {
    red.pathDistance = red.targetDistance;
    const target = getLoopPathPositionAtDistance(npc.patrolPath, red.pathDistance);
    red.x = target.x;
    red.y = target.y;
    red.isMoving = false;
    red.walkAnimTime = 0;
    red.pauseTimer = randomRange(0.25, 1.1);
  }
}

function chooseNextRedPatrolTarget(path) {
  const red = GameState.redNpc;
  const total = getLoopPathLength(path);
  const travel = randomRange(80, 260);
  red.pathDirection = Math.random() < 0.5 ? -1 : 1;
  red.targetDistance = normalizeLoopDistance(red.pathDistance + red.pathDirection * travel, total);
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
  GameState.currentQuest = kind === "postMontage" ? "quest_yard_find_red_after_montage" : "quest_yard_red";
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

  const step = Math.min(remaining, RED_TABLE_PATROL_SPEED * 1.45 * dt);
  red.x += dx / remaining * step;
  red.y += dy / remaining * step;
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
    if (!pointInPolygon(point, YardLayout.walkPolygon) || isPointInAnyRect(point, YardLayout.obstacleRects)) {
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
  } else {
    startRedDialogue();
  }
}

function releaseRedAfterDialogue() {
  const npc = getRedNpcConfig();
  const red = GameState.redNpc;
  if (!npc || !npc.patrolPath) {
    red.mode = "patrol";
    return;
  }

  red.mode = "returnPatrol";
  red.pathDistance = getNearestLoopPathDistance(npc.patrolPath, { x: red.x, y: red.y });
  red.targetDistance = red.pathDistance;
  const target = getLoopPathPositionAtDistance(npc.patrolPath, red.pathDistance);
  red.targetX = target.x;
  red.targetY = target.y;
  red.pauseTimer = 0;
  red.isMoving = false;
  red.walkAnimTime = 0;
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
  brooks.mode = "patrol";
  brooks.x = npc.x;
  brooks.y = npc.y;
  brooks.facing = npc.baseFacing || "down";
  brooks.isMoving = false;
  brooks.walkAnimTime = 0;
  brooks.targetX = npc.x;
  brooks.targetY = npc.y;
  brooks.waitTimer = randomRange(BROOKS_REST_MIN_SECONDS, BROOKS_REST_MAX_SECONDS);
  brooks.pendingDialogue = null;
}

function getBrooksNpcConfig() {
  return YardLayout.npcs.find((npc) => npc.id === "brooks") || null;
}

function updateBrooksNpc(dt) {
  initializeBrooksNpcState();

  const brooks = GameState.brooksNpc;
  if (GameState.twentyYearsPassed) {
    brooks.isMoving = false;
    brooks.walkAnimTime = 0;
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
    brooks.waitTimer = randomRange(BROOKS_REST_MIN_SECONDS, BROOKS_REST_MAX_SECONDS);
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
  return npc ? { x: npc.x, y: npc.y } : { x: 1214, y: 236 };
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
  brooks.x += dx / remaining * step;
  brooks.y += dy / remaining * step;
  brooks.facing = directionFromDelta(dx, dy);
  brooks.isMoving = true;
  brooks.walkAnimTime += dt;
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
  } else {
    startBrooksDialogue();
  }
}

function releaseBrooksAfterDialogue() {
  const brooks = GameState.brooksNpc;
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

function startPostMontageRedDialogue() {
  GameState.redDialogueActive = true;
  GameState.postMontageRedDialogueActive = true;
  GameState.currentQuest = "quest_yard_find_red_after_montage";
  DialogueSystem.start(PostMontageRedDialogueLines);
}

function updateRedDialogueReward() {
  if (GameState.postMontageRedDialogueActive) {
    if (!DialogueSystem.active) {
      GameState.postMontageRedDialogueActive = false;
      GameState.redDialogueActive = false;
      GameState.postMontageRedSpoken = true;
      GameState.currentQuest = "quest_yard_red_after_montage_done";
      releaseRedAfterDialogue();
    }
    return;
  }

  if (!GameState.redDialogueActive) {
    return;
  }

  if (DialogueSystem.active && DialogueSystem.index >= 4 && !GameState.redHammerDelivered) {
    deliverHammerFromRed();
  }

  if (!DialogueSystem.active) {
    if (!GameState.redHammerDelivered) {
      deliverHammerFromRed();
    }
    GameState.redDialogueActive = false;
    GameState.currentQuest = "quest_yard_library";
    releaseRedAfterDialogue();
  }
}

function deliverHammerFromRed() {
  GameState.hasHammer = true;
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

function startBrooksDialogue() {
  GameState.brooksDialogueActive = true;
  GameState.brooksDialogueKind = "bible";
  GameState.brooksBibleDelivered = false;
  GameState.currentQuest = "quest_yard_library";
  DialogueSystem.start(BrooksDialogueLines);
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

  if (DialogueSystem.active && DialogueSystem.index >= 3 && !GameState.brooksBibleDelivered) {
    deliverBibleFromBrooks();
  }

  if (!DialogueSystem.active) {
    if (!GameState.brooksBibleDelivered) {
      deliverBibleFromBrooks();
    }
    GameState.brooksDialogueActive = false;
    GameState.brooksDialogueKind = null;
    GameState.currentQuest = "quest_yard_bible_obtained";
    releaseBrooksAfterDialogue();
  }
}

function deliverBibleFromBrooks() {
  GameState.hasBible = true;
  GameState.brooksBibleDelivered = true;
  saveCheckpoint("CP_BIBLE_OBTAINED");
}

function updatePlayer(dt) {
  const move = InputSystem.getMoveVector();
  const player = GameState.player;
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

  const targetVx = move.x * player.speed;
  const targetVy = move.y * player.speed;
  const blend = 1 - Math.pow(0.001, dt);
  player.vx += (targetVx - player.vx) * blend;
  player.vy += (targetVy - player.vy) * blend;

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

  player.x = clamp(player.x, 36, CANVAS_WIDTH - player.w - 36);
  player.y = clamp(player.y, 60, CANVAS_HEIGHT - player.h - 42);

  if (GameState.scene === "cell" && !isCellPositionWalkable(player.x, player.y)) {
    movePlayerToNearestCellPoint();
  }

  if (GameState.scene === "office" && !isOfficePositionWalkable(player.x, player.y)) {
    movePlayerToNearestOfficePoint();
  }
}

function movePlayerBy(dx, dy) {
  if (dx === 0 && dy === 0) {
    return true;
  }

  const player = GameState.player;
  const nextX = player.x + dx;
  const nextY = player.y + dy;

  if (GameState.scene === "cell") {
    if (isCellPositionWalkable(nextX, nextY)) {
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

  if (!pointInPolygon(foot, CellLayout.walkPolygon)) {
    return false;
  }

  return !isPointInAnyRect(foot, CellLayout.tableBlocks);
}

function movePlayerToNearestCellPoint() {
  const player = GameState.player;
  const imagePoint = canvasPointToCellImage(getPlayerFootPoint(player.x, player.y)) || { x: 620, y: 920 };
  let bestPoint = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let y = 300; y <= 1104; y += 16) {
    for (let x = 184; x <= 1084; x += 16) {
      const point = { x, y };
      if (pointInPolygon(point, CellLayout.walkPolygon) && !isPointInAnyRect(point, CellLayout.tableBlocks)) {
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

function isPlayerOnBed() {
  const foot = canvasPointToCellImage(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  return Boolean(foot && pointInRect(foot, CellLayout.bed));
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

function getActiveOfficeInteraction() {
  if (GameState.scene !== "office" || GameState.office.safeViewOpen) {
    return null;
  }

  const foot = canvasPointToOfficeImage(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  if (!foot) {
    return null;
  }

  if (GameState.office.wardenPhase === "waiting" && distance(foot.x, foot.y, GameState.office.wardenX, GameState.office.wardenY) <= 130) {
    return { id: "warden" };
  }

  if (!GameState.ledgerSwapped && GameState.office.wardenPhase === "gone" && pointInRect(foot, OfficeLayout.embroideryZone)) {
    return { id: "embroidery" };
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
  } else if (GameState.hasAttributeD && !GameState.twentyYearsPassed) {
    lieDownInBed();
    changeScene("montage");
  } else if (GameState.hasHammer && !GameState.inspectionPassed && !GameState.hasAttributeC) {
    lieDownInBed();
    startCellInspection();
  } else {
    lieDownInBed();
  }
}

function lieDownInBed() {
  const player = GameState.player;
  const bedPoint = cellImageToCanvasPoint(CellLayout.bedFrame.x + 286, CellLayout.bedFrame.y + 92);
  player.lyingInBed = true;
  player.vx = 0;
  player.vy = 0;
  player.isMoving = false;
  player.walkAnimTime = 0;
  player.facing = "right";
  player.x = bedPoint.x - 92;
  player.y = bedPoint.y - 28;
}

function standUpFromBed() {
  const player = GameState.player;
  player.lyingInBed = false;
  player.vx = 0;
  player.vy = 0;
  player.isMoving = false;
  player.walkAnimTime = 0;
  player.facing = "down";
  setPlayerFootToCellImage(CellLayout.bed.x + CellLayout.bed.w / 2, CellLayout.bed.y + CellLayout.bed.h - 18);
}

function pointInRect(point, rect) {
  return point.x >= rect.x &&
    point.x <= rect.x + rect.w &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.h;
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

function getCellImageRect() {
  return getAssetContainRect("cell", CellLayout.imageWidth, CellLayout.imageHeight);
}

function getDigImageRect() {
  const layout = getCurrentDigLayout();
  return getAssetContainRect(getCurrentDigAssetKey(), layout.imageWidth, layout.imageHeight);
}

function getAssetContainRect(assetKey, fallbackWidth, fallbackHeight) {
  const record = AssetStore.images[assetKey];
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

function setPlayerFootToCellImage(x, y) {
  const foot = cellImageToCanvasPoint(x, y);
  GameState.player.x = foot.x - GameState.player.w / 2;
  GameState.player.y = foot.y - GameState.player.h + 8;
}

function getYardWorldSize() {
  return {
    w: YardLayout.imageWidth * YARD_WORLD_SCALE,
    h: YardLayout.imageHeight * YARD_WORLD_SCALE
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

function yardImageRectToScreen(rect) {
  const topLeft = yardImagePointToScreen(rect.x, rect.y);
  return {
    x: topLeft.x,
    y: topLeft.y,
    w: rect.w * YARD_WORLD_SCALE,
    h: rect.h * YARD_WORLD_SCALE
  };
}

function isYardPositionWalkable(x, y) {
  const foot = yardWorldToImagePoint(getPlayerFootPoint(x, y));
  if (!pointInPolygon(foot, YardLayout.walkPolygon)) {
    return false;
  }

  return !isPointInAnyRect(foot, YardLayout.obstacleRects);
}

function getActiveYardInteraction() {
  if (GameState.scene !== "yard") {
    return null;
  }

  const foot = yardWorldToImagePoint(getPlayerFootPoint(GameState.player.x, GameState.player.y));
  const interaction = YardLayout.interactions.find((item) => pointInRect(foot, item.rect)) || null;
  if (interaction && interaction.id === "soil" && !GameState.hasSoilPile) {
    return null;
  }
  if (interaction && interaction.id === "library" && GameState.twentyYearsPassed) {
    return null;
  }
  if (interaction && interaction.id === "wardenOffice" && !GameState.hasMap) {
    return null;
  }
  return interaction;
}

function getYardInteractionRect(interactionId) {
  const interaction = YardLayout.interactions.find((item) => item.id === interactionId);
  return interaction ? interaction.rect : null;
}

function movePlayerToNearestYardPoint() {
  const player = GameState.player;
  const imagePoint = yardWorldToImagePoint(getPlayerFootPoint(player.x, player.y));
  let bestPoint = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let y = 210; y <= 1000; y += 18) {
    for (let x = 8; x <= 1422; x += 18) {
      const point = { x, y };
      if (pointInPolygon(point, YardLayout.walkPolygon) && !isPointInAnyRect(point, YardLayout.obstacleRects)) {
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
  if (GameState.yardPrisoners.length === YARD_RANDOM_PRISONER_COUNT) {
    return;
  }

  GameState.yardPrisoners = [];
  for (let index = 0; index < YARD_RANDOM_PRISONER_COUNT; index += 1) {
    const config = YardRandomPrisonerConfigs[index] || YardRandomPrisonerConfigs[index % YardRandomPrisonerConfigs.length];
    const startPoint = { x: config.x, y: config.y };
    const point = isYardNpcPointWalkable(startPoint.x, startPoint.y) ? startPoint : getRandomYardWalkPoint();
    const prisoner = {
      assetKey: config.assetKey,
      x: point.x,
      y: point.y,
      targetX: point.x,
      targetY: point.y,
      h: config.h || YARD_CHARACTER_HEIGHT,
      speed: randomRange(YARD_RANDOM_PRISONER_MIN_SPEED, YARD_RANDOM_PRISONER_MAX_SPEED),
      waitTimer: randomRange(0, YARD_RANDOM_PRISONER_REST_MAX_SECONDS),
      facing: ["down", "right", "up", "left"][index % 4],
      isMoving: false,
      walkAnimTime: randomRange(0, PRISONER_WALK_FRAME_SECONDS * 4)
    };
    chooseYardPrisonerTarget(prisoner);
    GameState.yardPrisoners.push(prisoner);
  }
}

function updateYardPrisoners(dt) {
  initializeYardPrisoners();

  GameState.yardPrisoners.forEach((prisoner) => {
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
      prisoner.waitTimer = randomRange(YARD_RANDOM_PRISONER_REST_MIN_SECONDS, YARD_RANDOM_PRISONER_REST_MAX_SECONDS);
      chooseYardPrisonerTarget(prisoner);
      return;
    }

    const step = Math.min(remaining, prisoner.speed * dt);
    const nextX = prisoner.x + dx / remaining * step;
    const nextY = prisoner.y + dy / remaining * step;
    if (!isYardNpcPointWalkable(nextX, nextY)) {
      prisoner.isMoving = false;
      prisoner.waitTimer = randomRange(YARD_RANDOM_PRISONER_REST_MIN_SECONDS, YARD_RANDOM_PRISONER_REST_MAX_SECONDS);
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
  let target = { x: prisoner.x, y: prisoner.y };
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const point = getRandomYardWalkPoint();
    if (distance(prisoner.x, prisoner.y, point.x, point.y) >= YARD_RANDOM_PRISONER_MIN_TARGET_DISTANCE) {
      target = point;
      break;
    }
  }

  prisoner.targetX = target.x;
  prisoner.targetY = target.y;
}

function getRandomYardWalkPoint() {
  const bounds = getYardWalkBounds();
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
  const point = { x, y };
  return pointInPolygon(point, YardLayout.walkPolygon) && !isPointInAnyRect(point, YardLayout.obstacleRects);
}

function updateYardGuards(dt) {
  const soilRect = getYardInteractionRect("soil");
  if (!soilRect) {
    return;
  }

  GameState.yardGuards.forEach((guard, index) => {
    guard.turnTimer = Math.max(0, (guard.turnTimer || 0) - dt);

    if (!guard.targetX || !guard.targetY) {
      chooseYardGuardTarget(guard, soilRect, index);
      chooseYardGuardSpeed(guard, index);
    }

    guard.speedTimer -= dt;
    if (guard.speedTimer <= 0) {
      chooseYardGuardSpeed(guard, index);
    }

    const dx = guard.targetX - guard.x;
    const dy = guard.targetY - guard.y;
    const remaining = Math.hypot(dx, dy);
    if (remaining <= 8) {
      guard.isMoving = false;
      updateYardGuardVisualFacing(guard, guard.facing || guard.visualFacing || "down");
      chooseYardGuardTarget(guard, soilRect, index);
      return;
    }

    const step = Math.min(remaining, guard.speed * dt);
    guard.x += dx / remaining * step;
    guard.y += dy / remaining * step;
    updateYardGuardVisualFacing(guard, directionFromDelta(dx, dy));
    guard.isMoving = step > 0.01;
    guard.walkAnimTime = (guard.walkAnimTime || 0) + dt * clamp(
      guard.speed / YARD_GUARD_FAST_SPEED,
      GUARD_WALK_MIN_ANIM_SPEED,
      GUARD_WALK_MAX_ANIM_SPEED
    );
  });
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

function chooseYardGuardTarget(guard, soilRect, index) {
  const marginX = 46;
  const marginY = 54;
  const minTargetDistance = 190;
  let nextX = guard.x;
  let nextY = guard.y;

  for (let attempt = 0; attempt < 8; attempt += 1) {
    nextX = randomRange(soilRect.x + marginX, soilRect.x + soilRect.w - marginX);
    nextY = randomRange(soilRect.y + marginY, soilRect.y + soilRect.h - marginY);

    // Keep the two guards from constantly stacking on the same patrol point.
    if (index === 1) {
      nextX = soilRect.x + soilRect.w - (nextX - soilRect.x);
    }

    if (distance(guard.x, guard.y, nextX, nextY) >= minTargetDistance) {
      break;
    }
  }

  guard.targetX = nextX;
  guard.targetY = nextY;
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

function isPlayerNearTv() {
  const player = GameState.player;
  const tv = GameState.interactables.tv;
  const px = player.x + player.w / 2;
  const py = player.y + player.h / 2;
  const tx = tv.x + tv.w / 2;
  const ty = tv.y + tv.h / 2;
  return distance(px, py, tx, ty) <= INTERACT_DISTANCE;
}

function setOpeningPhase(phase) {
  GameState.opening.phase = phase;
  GameState.opening.timer = 0;
}

function getIntroImageRect() {
  return getAssetContainRect("start_screen", IntroLayout.imageWidth, IntroLayout.imageHeight);
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

// ======================================================
// 13. Rendering Helpers
// ======================================================
function clearCanvas(ctx) {
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderMenu(ctx) {
  renderIntroStill(ctx, "start_screen");
  renderMenuVolumeHint(ctx);
}

function renderMenuVolumeHint(ctx) {
  ctx.save();
  ctx.font = "24px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.78)";
  ctx.fillStyle = "#e8d8a6";
  ctx.shadowColor = "rgba(232, 205, 124, 0.34)";
  ctx.shadowBlur = 8;
  ctx.strokeText("建议将音量调到最大后开始游戏", 72, 682);
  ctx.fillText("建议将音量调到最大后开始游戏", 72, 682);
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

  ctx.fillStyle = "rgba(237, 230, 210, 0.72)";
  ctx.shadowBlur = 0;
  ctx.font = "21px 'Microsoft YaHei', 'SimHei', monospace";
  ctx.fillText("点击画面或按 E / 空格可继续", CANVAS_WIDTH / 2, 604);
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
  drawAssetContain(ctx, "cell", CellLayout.imageWidth, CellLayout.imageHeight);
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
  if (isCellInspectionActive()) {
    renderCellInspectionPrompt(ctx);
  }
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

  if (montage.phase === "pages") {
    renderTwentyYearsMontagePage(ctx);
    return;
  }

  if (montage.phase === "darkAfter") {
    renderMontageBlack(ctx, "二十年后，牢房仍旧安静。");
    return;
  }

  renderSleepingCellForMontage(ctx);
  renderBlackOverlay(ctx, clamp(1 - montage.timer / MONTAGE_WAKE_FADE_SECONDS, 0, 1));
}

function renderSleepingCellForMontage(ctx) {
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawAssetContain(ctx, "cell", CellLayout.imageWidth, CellLayout.imageHeight);
  renderCellWallHole(ctx);
  renderLyingPlayer(ctx);
}

function renderMontageBlack(ctx, text) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.save();
  ctx.fillStyle = "#d9d1bd";
  ctx.font = "24px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  renderWrappedText(ctx, text, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 980, 34);
  ctx.restore();
}

function renderTwentyYearsMontagePage(ctx) {
  const montage = GameState.twentyYearsMontage;
  const page = TwentyYearsMontagePages[montage.pageIndex] || TwentyYearsMontagePages[0];
  const duration = page.final ? MONTAGE_FINAL_PAGE_SECONDS : MONTAGE_PAGE_SECONDS;
  const fade = Math.min(
    clamp(montage.timer / 0.45, 0, 1),
    clamp((duration - montage.timer) / 0.45, 0, 1)
  );

  if (page.crop) {
    drawMontageCroppedImage(ctx, page.crop);
  } else {
    drawAssetCover(ctx, "montage_twenty_years", 1536, 1024);
  }

  renderFilmDust(ctx, 0.1);
  renderVignette(ctx, 0.36);
  renderMontageCaption(ctx, page.text, Boolean(page.final));
  renderBlackOverlay(ctx, 1 - fade);
}

function drawMontageCroppedImage(ctx, crop) {
  const record = AssetStore.images.montage_twenty_years;
  if (!record || !record.loaded || record.failed) {
    drawMissingAsset(ctx, "montage_twenty_years", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return;
  }

  const sourceWidth = getSourceWidth(record.element);
  const sourceHeight = getSourceHeight(record.element);
  ctx.drawImage(
    record.element,
    Math.round(crop.x * sourceWidth),
    Math.round(crop.y * sourceHeight),
    Math.round(crop.w * sourceWidth),
    Math.round(crop.h * sourceHeight),
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
}

function renderMontageCaption(ctx, text, large) {
  const panelH = large ? 142 : 74;
  renderPanel(ctx, 96, CANVAS_HEIGHT - panelH - 28, CANVAS_WIDTH - 192, panelH);
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.font = large ? "24px monospace" : "22px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  renderWrappedText(ctx, text, CANVAS_WIDTH / 2, CANVAS_HEIGHT - panelH + (large ? 20 : 8), CANVAS_WIDTH - 260, large ? 34 : 30);
  ctx.restore();
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
  renderYardBackgroundActors(ctx);
  renderYardSoilDumpZone(ctx);
  renderPlayer(ctx);
  QuestSystem.render(ctx);
  renderSoilDumpHud(ctx);
}

function renderYardSoilDumpZone(ctx) {
  if (!GameState.hasSoilPile) {
    return;
  }

  const soilRect = getYardInteractionRect("soil");
  const activeInteraction = getActiveYardInteraction();
  if (!soilRect) {
    return;
  }

  renderInteractionZone(
    ctx,
    yardImageRectToScreen(soilRect),
    activeInteraction && activeInteraction.id === "soil"
  );
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
  drawAssetContain(ctx, "office", OfficeLayout.imageWidth, OfficeLayout.imageHeight);
  renderOfficeInteractionHints(ctx);
  renderOfficeWarden(ctx);
  renderPlayer(ctx);
  QuestSystem.render(ctx);
  renderOfficePrompt(ctx);
}

function renderOfficeWarden(ctx) {
  if (GameState.office.wardenPhase === "gone") {
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
  if (GameState.office.wardenPhase === "gone" && !GameState.ledgerSwapped) {
    const embroidery = officeImageRectToCanvas(OfficeLayout.embroideryZone);
    renderInteractionZone(ctx, embroidery, activeInteraction && activeInteraction.id === "embroidery");
  }
  if (GameState.ledgerSwapped) {
    const door = officeImageRectToCanvas(OfficeLayout.doorZone);
    renderInteractionZone(ctx, door, activeInteraction && activeInteraction.id === "door");
  }
  ctx.restore();
}

function renderOfficePrompt(ctx) {
  void ctx;
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

function renderCellInspectionActors(ctx) {
  if (!isCellInspectionActive()) {
    return;
  }

  const inspection = GameState.cellInspection;
  renderCellWardenCharacter(ctx, inspection.warden);
  renderCellGuardCharacter(ctx, inspection.guard);
}

function renderCellWardenCharacter(ctx, actor) {
  const frame = getWardenAnimationFrame(actor.facing, actor.isMoving, actor.walkAnimTime);
  if (!frame) {
    const rect = renderCellTriptychCharacter(ctx, "warden", actor.x, actor.y, YARD_CHARACTER_HEIGHT, actor.facing);
    renderYardNameTag(ctx, "典狱长", rect.x + rect.w / 2, rect.y - 4);
    return;
  }

  const rect = renderCellSingleFrameCharacter(ctx, frame.assetKey, actor.x, actor.y, YARD_CHARACTER_HEIGHT, actor.facing, Boolean(frame.flip), "warden");
  renderYardNameTag(ctx, "典狱长", rect.x + rect.w / 2, rect.y - 4);
}

function renderCellGuardCharacter(ctx, actor) {
  const direction = GuardIdleFrames[actor.facing] ? actor.facing : "down";
  const frame = actor.isMoving ? getGuardWalkFrame(actor, direction) : null;
  const idleFrame = GuardIdleFrames[direction] || GuardIdleFrames.down;
  const drawFrame = !frame || frame.type === "base" ? idleFrame : frame;
  const rect = renderCellSingleFrameCharacter(
    ctx,
    drawFrame.assetKey,
    actor.x,
    actor.y,
    YARD_CHARACTER_HEIGHT,
    direction,
    Boolean(drawFrame.flip),
    "guard"
  );
  renderYardNameTag(ctx, "狱警", rect.x + rect.w / 2, rect.y - 4);
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

function renderCellSingleFrameCharacter(ctx, assetKey, imageX, imageY, h, fallbackFacing, flip, fallbackAssetKey) {
  const record = AssetStore.images[assetKey];
  if (!record || !record.loaded || record.failed) {
    return renderCellTriptychCharacter(ctx, fallbackAssetKey || "guard", imageX, imageY, h, fallbackFacing);
  }

  const crop = getSingleAssetVisibleCrop(assetKey, record.element);
  const foot = cellImageToCanvasPoint(imageX, imageY);
  const w = Math.max(1, Math.round(h * crop.w / Math.max(1, crop.h)));
  const x = foot.x - w / 2;
  const y = foot.y - h;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.fillRect(x + w * 0.18, y + h - 8, w * 0.64, 8);
  if (flip) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(record.element, crop.x, crop.y, crop.w, crop.h, 0, 0, w, h);
  } else {
    ctx.drawImage(record.element, crop.x, crop.y, crop.w, crop.h, x, y, w, h);
  }
  ctx.restore();

  return { x, y, w, h };
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
  const frame = getWardenAnimationFrame(facing, isMoving, walkAnimTime);
  if (!frame) {
    renderOfficeCharacter(ctx, "warden", imageX, imageY, h, facing);
    return;
  }

  renderOfficeSingleFrameCharacter(ctx, frame.assetKey, imageX, imageY, h, facing, Boolean(frame.flip), "warden");
}

function getWardenAnimationFrame(facing, isMoving, walkAnimTime) {
  const direction = WardenIdleFrames[facing] ? facing : "down";
  if (!isMoving) {
    return WardenIdleFrames[direction] || WardenIdleFrames.down;
  }

  const frames = WardenWalkFrames[direction] || WardenWalkFrames.down;
  if (!frames || frames.length === 0) {
    return WardenIdleFrames[direction] || WardenIdleFrames.down;
  }

  const frameIndex = Math.floor((walkAnimTime || 0) / WARDEN_WALK_FRAME_SECONDS) % frames.length;
  return frames[frameIndex] || WardenIdleFrames[direction] || WardenIdleFrames.down;
}

function renderOfficeSingleFrameCharacter(ctx, assetKey, imageX, imageY, h, fallbackFacing, flip, fallbackAssetKey) {
  const record = AssetStore.images[assetKey];
  if (!record || !record.loaded || record.failed) {
    renderOfficeCharacter(ctx, fallbackAssetKey || "warden", imageX, imageY, h, fallbackFacing);
    return;
  }

  const crop = getSingleAssetVisibleCrop(assetKey, record.element);
  const foot = officeImageToCanvasPoint(imageX, imageY);
  const w = Math.max(1, Math.round(h * crop.w / Math.max(1, crop.h)));
  const x = foot.x - w / 2;
  const y = foot.y - h;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.fillRect(x + w * 0.18, y + h - 8, w * 0.64, 8);
  if (flip) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(record.element, crop.x, crop.y, crop.w, crop.h, 0, 0, w, h);
  } else {
    ctx.drawImage(record.element, crop.x, crop.y, crop.w, crop.h, x, y, w, h);
  }
  ctx.restore();
}

function renderYardBackground(ctx) {
  const record = AssetStore.images.yard;
  if (!record || !record.loaded || record.failed) {
    drawAsset(ctx, "yard", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return;
  }

  const sourceX = GameState.camera.x / YARD_WORLD_SCALE;
  const sourceY = GameState.camera.y / YARD_WORLD_SCALE;
  const sourceW = CANVAS_WIDTH / YARD_WORLD_SCALE;
  const sourceH = CANVAS_HEIGHT / YARD_WORLD_SCALE;
  ctx.drawImage(record.element, sourceX, sourceY, sourceW, sourceH, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderYardBackgroundActors(ctx) {
  YardLayout.backgroundPrisoners.forEach((prisoner) => {
    const route = getLoopPathPosition(prisoner.path, GameState.playTime * prisoner.speed + prisoner.phase);
    renderYardPrisoner(ctx, prisoner, route);
  });

  GameState.yardPrisoners.forEach((prisoner) => {
    renderYardPrisoner(ctx, prisoner, {
      x: prisoner.x,
      y: prisoner.y,
      facing: prisoner.facing,
      isMoving: prisoner.isMoving,
      walkAnimTime: prisoner.walkAnimTime
    });
  });

  GameState.yardGuards.forEach((guard) => {
    renderYardGuard(ctx, guard);
  });

  YardLayout.npcs.forEach((npc, index) => {
    if (GameState.twentyYearsPassed && npc.id === "brooks") {
      return;
    }
    if (npc.id === "red" && npc.patrolPath) {
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

const TriptychCropCache = Object.create(null);
const SingleAssetCropCache = Object.create(null);

function renderYardGuard(ctx, guard) {
  const facing = guard.visualFacing || guard.facing || "down";
  const frame = getGuardWalkFrame(guard, facing);
  if (!frame || frame.type === "base") {
    return renderYardGuardIdle(ctx, guard.x, guard.y, YARD_CHARACTER_HEIGHT, facing);
  }

  return renderYardSingleFrameCharacter(ctx, frame.assetKey, guard.x, guard.y, YARD_CHARACTER_HEIGHT, facing, Boolean(frame.flip));
}

function renderYardPrisoner(ctx, prisoner, route) {
  const facing = route.facing || "down";
  const drawHeight = prisoner.h || YARD_CHARACTER_HEIGHT;
  const frameSet = PrisonerWalkFrames[prisoner.assetKey];
  const frames = frameSet ? frameSet[facing] || frameSet.down : null;
  if (!frames || frames.length === 0) {
    return renderYardCharacter(ctx, prisoner.assetKey, route.x, route.y, drawHeight, facing);
  }

  const moving = route.isMoving !== false;
  const frameTime = typeof route.walkAnimTime === "number" ? route.walkAnimTime : GameState.playTime + (prisoner.phase || 0);
  const frameIndex = moving ? Math.floor(frameTime / PRISONER_WALK_FRAME_SECONDS) % frames.length : 1;
  const frame = frames[frameIndex];
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
  const frame = getRedWalkFrame(facing, red.isMoving, red.walkAnimTime);
  if (!frame || frame.type === "base") {
    const idleFrame = RedIdleFrames[facing] || RedIdleFrames.down;
    return renderYardRedFrame(
      ctx,
      idleFrame.assetKey,
      red.x,
      red.y,
      npc.h,
      facing,
      Boolean(idleFrame.flip),
      npc.assetKey
    );
  }

  return renderYardRedFrame(
    ctx,
    frame.assetKey,
    red.x,
    red.y,
    npc.h,
    facing,
    Boolean(frame.flip),
    npc.assetKey
  );
}

function getRedWalkFrame(facing, moving, walkAnimTime) {
  if (!moving) {
    return RedIdleFrames[facing] || RedIdleFrames.down;
  }

  const frames = RedWalkFrames[facing] || RedWalkFrames.down;
  if (!frames || frames.length === 0) {
    return RedIdleFrames[facing] || RedIdleFrames.down;
  }

  const frameIndex = Math.floor(walkAnimTime / RED_WALK_FRAME_SECONDS) % frames.length;
  return frames[frameIndex] || RedIdleFrames[facing] || RedIdleFrames.down;
}

function renderYardBrooks(ctx, npc) {
  const brooks = GameState.brooksNpc;
  const facing = brooks.facing || npc.baseFacing || "down";
  const frame = getBrooksWalkFrame(facing, brooks.isMoving, brooks.walkAnimTime);
  return renderYardBrooksFrame(
    ctx,
    frame.assetKey,
    brooks.x,
    brooks.y,
    npc.h,
    facing,
    Boolean(frame.flip),
    npc.assetKey
  );
}

function getBrooksWalkFrame(facing, moving, walkAnimTime) {
  if (!moving) {
    return BrooksIdleFrames[facing] || BrooksIdleFrames.down;
  }

  const frames = BrooksWalkFrames[facing] || BrooksWalkFrames.down;
  if (!frames || frames.length === 0) {
    return BrooksIdleFrames[facing] || BrooksIdleFrames.down;
  }

  const frameIndex = Math.floor(walkAnimTime / BROOKS_WALK_FRAME_SECONDS) % frames.length;
  return frames[frameIndex] || BrooksIdleFrames[facing] || BrooksIdleFrames.down;
}

function getGuardWalkFrame(guard, facing) {
  const frames = GuardWalkFrames[facing] || GuardWalkFrames.down;
  if ((guard.turnTimer || 0) > 0 || !guard.isMoving || !frames || frames.length === 0) {
    return { type: "base" };
  }

  const frameIndex = Math.floor((guard.walkAnimTime || 0) / GUARD_WALK_FRAME_SECONDS) % frames.length;
  return frames[frameIndex] || { type: "base" };
}

function renderYardGuardIdle(ctx, imageX, imageY, h, facing) {
  const frame = GuardIdleFrames[facing] || GuardIdleFrames.down;
  return renderYardSingleFrameCharacter(ctx, frame.assetKey, imageX, imageY, h, facing, Boolean(frame.flip));
}

function renderYardRedFrame(ctx, assetKey, imageX, imageY, h, facing, flip, fallbackAssetKey) {
  const record = AssetStore.images[assetKey];
  if (!record || !record.loaded || record.failed) {
    return renderYardCharacter(ctx, fallbackAssetKey || "red", imageX, imageY, h, facing);
  }

  const crop = getSingleAssetVisibleCrop(assetKey, record.element);
  const foot = yardImagePointToScreen(imageX, imageY);
  const drawSize = RedDrawSize[facing] || RedDrawSize.down;
  const w = drawSize.w;
  const fixedH = drawSize.h;
  const x = foot.x - w / 2;
  const y = foot.y - fixedH;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.fillRect(x + w * 0.18, y + fixedH - 8, w * 0.64, 8);
  if (flip) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(record.element, crop.x, crop.y, crop.w, crop.h, 0, 0, w, fixedH);
  } else {
    ctx.drawImage(record.element, crop.x, crop.y, crop.w, crop.h, x, y, w, fixedH);
  }
  ctx.restore();

  return { x, y, w, h: fixedH };
}

function renderYardBrooksFrame(ctx, assetKey, imageX, imageY, h, facing, flip, fallbackAssetKey) {
  const record = AssetStore.images[assetKey];
  if (!record || !record.loaded || record.failed) {
    return renderYardCharacter(ctx, fallbackAssetKey || "brooks", imageX, imageY, h, facing);
  }

  const crop = getSingleAssetVisibleCrop(assetKey, record.element);
  const foot = yardImagePointToScreen(imageX, imageY);
  const drawSize = BrooksDrawSize[facing] || BrooksDrawSize.down;
  const w = drawSize.w;
  const fixedH = drawSize.h;
  const x = foot.x - w / 2;
  const y = foot.y - fixedH;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.fillRect(x + w * 0.18, y + fixedH - 8, w * 0.64, 8);
  if (flip) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(record.element, crop.x, crop.y, crop.w, crop.h, 0, 0, w, fixedH);
  } else {
    ctx.drawImage(record.element, crop.x, crop.y, crop.w, crop.h, x, y, w, fixedH);
  }
  ctx.restore();

  return { x, y, w, h: fixedH };
}

function renderYardSingleFrameCharacter(ctx, assetKey, imageX, imageY, h, fallbackFacing, flip, fallbackAssetKey) {
  const record = AssetStore.images[assetKey];
  if (!record || !record.loaded || record.failed) {
    return renderYardCharacter(ctx, fallbackAssetKey || "guard", imageX, imageY, h, fallbackFacing);
  }

  const crop = getSingleAssetVisibleCrop(assetKey, record.element);
  const foot = yardImagePointToScreen(imageX, imageY);
  const w = Math.max(1, Math.round(h * crop.w / Math.max(1, crop.h)));
  const x = foot.x - w / 2;
  const y = foot.y - h;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.fillRect(x + w * 0.18, y + h - 8, w * 0.64, 8);
  if (flip) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(record.element, crop.x, crop.y, crop.w, crop.h, 0, 0, w, h);
  } else {
    ctx.drawImage(record.element, crop.x, crop.y, crop.w, crop.h, x, y, w, h);
  }
  ctx.restore();

  return { x, y, w, h };
}

function renderYardPrisonerFrame(ctx, assetKey, imageX, imageY, h, fallbackFacing, flip, fallbackAssetKey) {
  const record = AssetStore.images[assetKey];
  if (!record || !record.loaded || record.failed) {
    return renderYardCharacter(ctx, fallbackAssetKey || "prisoner_01", imageX, imageY, h, fallbackFacing);
  }

  const sourceW = Math.max(1, getSourceWidth(record.element));
  const sourceH = Math.max(1, getSourceHeight(record.element));
  const foot = yardImagePointToScreen(imageX, imageY);
  const w = Math.max(1, Math.round(h * sourceW / sourceH));
  const x = foot.x - w / 2;
  const y = foot.y - h;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.fillRect(x + w * 0.18, y + h - 8, w * 0.64, 8);
  if (flip) {
    ctx.translate(x + w, y);
    ctx.scale(-1, 1);
    ctx.drawImage(record.element, 0, 0, sourceW, sourceH, 0, 0, w, h);
  } else {
    ctx.drawImage(record.element, 0, 0, sourceW, sourceH, x, y, w, h);
  }
  ctx.restore();

  return { x, y, w, h };
}

function getSingleAssetVisibleCrop(assetKey, source) {
  if (SingleAssetCropCache[assetKey]) {
    return SingleAssetCropCache[assetKey];
  }

  const sourceW = Math.max(1, getSourceWidth(source));
  const sourceH = Math.max(1, getSourceHeight(source));
  const fallback = { x: 0, y: 0, w: sourceW, h: sourceH };

  try {
    const scanCanvas = document.createElement("canvas");
    scanCanvas.width = sourceW;
    scanCanvas.height = sourceH;
    const scanCtx = scanCanvas.getContext("2d");
    scanCtx.drawImage(source, 0, 0, sourceW, sourceH);
    const pixels = scanCtx.getImageData(0, 0, sourceW, sourceH).data;
    let minX = sourceW;
    let minY = sourceH;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < sourceH; y += 1) {
      for (let x = 0; x < sourceW; x += 1) {
        const alpha = pixels[(y * sourceW + x) * 4 + 3];
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
      SingleAssetCropCache[assetKey] = {
        x: Math.max(0, minX - padding),
        y: Math.max(0, minY - padding),
        w: Math.min(sourceW, maxX - minX + 1 + padding * 2),
        h: Math.min(sourceH, maxY - minY + 1 + padding * 2)
      };
      return SingleAssetCropCache[assetKey];
    }
  } catch (error) {
    if (DEBUG_MODE) {
      console.warn(error);
    }
  }

  SingleAssetCropCache[assetKey] = fallback;
  return fallback;
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
  if (!frame) {
    return { w: YARD_CHARACTER_FALLBACK_WIDTH, h: preferredHeight };
  }

  return {
    w: Math.max(1, Math.round(preferredHeight * frame.sw / Math.max(1, frame.sh))),
    h: preferredHeight
  };
}

function renderTriptychCharacter(ctx, assetKey, x, y, w, h, facing) {
  const frame = getTriptychFrameInfo(assetKey, facing);
  if (!frame) {
    drawAsset(ctx, assetKey, x, y, w, h);
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.fillRect(x + w * 0.18, y + h - 8, w * 0.64, 8);
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
  const record = AssetStore.images[assetKey];
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

function getLoopPathLength(path) {
  if (!path || path.length < 2) {
    return 1;
  }

  let total = 0;
  for (let i = 0; i < path.length; i += 1) {
    const a = path[i];
    const b = path[(i + 1) % path.length];
    total += distance(a.x, a.y, b.x, b.y);
  }
  return Math.max(1, total);
}

function getLoopPathPositionAtDistance(path, distanceValue) {
  if (!path || path.length === 0) {
    return { x: 0, y: 0 };
  }

  const total = getLoopPathLength(path);
  let target = normalizeLoopDistance(distanceValue, total);
  for (let i = 0; i < path.length; i += 1) {
    const a = path[i];
    const b = path[(i + 1) % path.length];
    const length = distance(a.x, a.y, b.x, b.y);
    if (target <= length) {
      const t = length === 0 ? 0 : target / length;
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t
      };
    }
    target -= length;
  }

  return { x: path[0].x, y: path[0].y };
}

function getNearestLoopPathDistance(path, point) {
  if (!path || path.length === 0) {
    return 0;
  }

  let bestDistanceOnPath = 0;
  let bestScore = Number.POSITIVE_INFINITY;
  let traveled = 0;
  for (let i = 0; i < path.length; i += 1) {
    const a = path[i];
    const b = path[(i + 1) % path.length];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const segmentLength = Math.hypot(dx, dy);
    const t = segmentLength === 0 ? 0 : clamp(((point.x - a.x) * dx + (point.y - a.y) * dy) / (segmentLength * segmentLength), 0, 1);
    const projected = { x: a.x + dx * t, y: a.y + dy * t };
    const score = distance(point.x, point.y, projected.x, projected.y);
    if (score < bestScore) {
      bestScore = score;
      bestDistanceOnPath = traveled + segmentLength * t;
    }
    traveled += segmentLength;
  }

  return normalizeLoopDistance(bestDistanceOnPath, getLoopPathLength(path));
}

function getLoopDistanceRemaining(currentDistance, targetDistance, direction, total) {
  if (direction >= 0) {
    return normalizeLoopDistance(targetDistance - currentDistance, total);
  }
  return normalizeLoopDistance(currentDistance - targetDistance, total);
}

function normalizeLoopDistance(distanceValue, total) {
  const length = Math.max(1, total || 1);
  return ((distanceValue % length) + length) % length;
}

function directionFromDelta(dx, dy) {
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx < 0 ? "left" : "right";
  }
  return dy < 0 ? "up" : "down";
}

function renderPause(ctx) {
  renderPixelRoomBackdrop(ctx);
  renderPanel(ctx, 410, 250, 460, 180);
  ctx.fillStyle = "#f5df9d";
  ctx.font = "38px monospace";
  ctx.textAlign = "center";
  ctx.fillText(TextData.pauseTitle, CANVAS_WIDTH / 2, 320);
  ctx.fillStyle = "#ffffff";
  ctx.font = "22px monospace";
  ctx.fillText(TextData.pauseHint, CANVAS_WIDTH / 2, 374);
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
  ctx.fillText(GameState.failReason || TextData.failHint, CANVAS_WIDTH / 2, 374);
  if (GameState.failRecovery === "soilDump") {
    ctx.font = "18px monospace";
    ctx.fillText("按 E / 空格 / 右下按钮：回到刚获得小土堆后", CANVAS_WIDTH / 2, 410);
  } else if (GameState.failRecovery === "pipeBeforeTunnel") {
    ctx.font = "18px monospace";
    ctx.fillText("按 E / 空格 / 右下按钮：回到进入洞口之前", CANVAS_WIDTH / 2, 410);
  }
}

function renderPlaceholderScene(ctx, sceneName) {
  renderPixelRoomBackdrop(ctx);
  renderCenteredText(ctx, sceneName, "");
}

function renderViewingRoom(ctx) {
  const wallGradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  wallGradient.addColorStop(0, "#090b12");
  wallGradient.addColorStop(0.58, "#151319");
  wallGradient.addColorStop(1, "#252127");
  ctx.fillStyle = wallGradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = "#1d1b22";
  for (let y = 82; y < 500; y += 54) {
    ctx.fillRect(0, y, CANVAS_WIDTH, 2);
  }

  const floorGradient = ctx.createLinearGradient(0, 500, 0, CANVAS_HEIGHT);
  floorGradient.addColorStop(0, "#27202a");
  floorGradient.addColorStop(1, "#161318");
  ctx.fillStyle = floorGradient;
  ctx.fillRect(0, 500, CANVAS_WIDTH, 220);

  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  for (let x = -80; x < CANVAS_WIDTH; x += 140) {
    ctx.fillRect(x, 532, 92, 3);
    ctx.fillRect(x + 44, 604, 92, 3);
  }

  const tvGlow = ctx.createRadialGradient(640, 240, 40, 640, 290, 520);
  tvGlow.addColorStop(0, "rgba(210, 238, 255, 0.45)");
  tvGlow.addColorStop(0.52, "rgba(83, 139, 178, 0.18)");
  tvGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = tvGlow;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderTelevision(ctx, x, y, w, h, options) {
  const config = options || {};
  const glow = config.glow || 0.5;

  const halo = ctx.createRadialGradient(x + w / 2, y + h / 2, 20, x + w / 2, y + h / 2, w * 0.9);
  halo.addColorStop(0, "rgba(220, 245, 255, " + (0.36 * glow) + ")");
  halo.addColorStop(0.7, "rgba(92, 150, 185, " + (0.18 * glow) + ")");
  halo.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(x - w * 0.45, y - h * 0.45, w * 1.9, h * 1.9);

  ctx.fillStyle = "#0a0b0c";
  ctx.fillRect(x - 24, y - 24, w + 48, h + 52);
  ctx.fillStyle = "#24262b";
  ctx.fillRect(x - 14, y - 14, w + 28, h + 30);
  ctx.fillStyle = "#0d1721";
  ctx.fillRect(x, y, w, h);

  const screen = ctx.createLinearGradient(x, y, x + w, y + h);
  screen.addColorStop(0, "#dff6ff");
  screen.addColorStop(0.42, "#93b9d1");
  screen.addColorStop(1, "#23394c");
  ctx.fillStyle = screen;
  ctx.fillRect(x + 8, y + 8, w - 16, h - 16);

  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  for (let lineY = y + 18; lineY < y + h - 16; lineY += 12) {
    ctx.fillRect(x + 12, lineY, w - 24, 2);
  }

  ctx.fillStyle = "#111111";
  ctx.fillRect(x + w * 0.2, y + h + 28, w * 0.6, 12);
  ctx.fillRect(x + w * 0.32, y + h + 40, w * 0.36, 18);

  ctx.fillStyle = "rgba(6, 12, 20, 0.62)";
  ctx.fillRect(x + 28, y + h * 0.6, w - 56, 58);
  ctx.fillStyle = "#f5fbff";
  ctx.font = Math.max(18, Math.floor(w / 15)) + "px monospace";
  ctx.textAlign = "center";
  ctx.fillText(config.text || "", x + w / 2, y + h * 0.6 + 24);
  ctx.fillStyle = "#d6ecf8";
  ctx.font = Math.max(14, Math.floor(w / 23)) + "px monospace";
  ctx.fillText(config.subtitle || "", x + w / 2, y + h * 0.6 + 48);
}

function renderSofaViewer(ctx) {
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
  ctx.fillRect(292, 604, 686, 30);

  ctx.fillStyle = "#47323c";
  ctx.fillRect(300, 506, 680, 92);
  ctx.fillStyle = "#5a3d48";
  ctx.fillRect(336, 468, 608, 74);
  ctx.fillStyle = "#6b4a55";
  ctx.fillRect(286, 486, 86, 112);
  ctx.fillRect(908, 486, 86, 112);
  ctx.fillStyle = "#34242c";
  ctx.fillRect(350, 538, 580, 12);

  // 玩家躺在沙发上，客厅幕不再需要走动。
  ctx.fillStyle = "#16191f";
  ctx.fillRect(470, 492, 250, 28);
  ctx.fillStyle = "#2f5f82";
  ctx.fillRect(568, 466, 128, 34);
  ctx.fillStyle = "#f0d0a0";
  ctx.fillRect(704, 458, 34, 34);
  ctx.fillStyle = "#20242b";
  ctx.fillRect(452, 500, 70, 18);
  ctx.fillStyle = "#d7d7d7";
  ctx.fillRect(742, 470, 54, 14);

  const bodyGlow = ctx.createRadialGradient(650, 500, 20, 650, 500, 260);
  bodyGlow.addColorStop(0, "rgba(170, 220, 255, 0.16)");
  bodyGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = bodyGlow;
  ctx.fillRect(360, 360, 560, 260);
  ctx.restore();
}

function renderTvStoryPanel(ctx, page, index) {
  const panelX = 326;
  const panelY = 116;
  const panelW = 628;
  const panelH = 322;
  const base = index === 0 ? "#1b2634" : "#f3f8ff";
  ctx.fillStyle = base;
  ctx.fillRect(panelX, panelY, panelW, panelH);

  if (index === 0) {
    ctx.fillStyle = "#0b1018";
    ctx.fillRect(panelX, panelY + 220, panelW, 102);
    ctx.fillStyle = "#465466";
    for (let x = panelX + 64; x < panelX + panelW; x += 70) {
      ctx.fillRect(x, panelY + 48, 12, 242);
    }
    ctx.fillStyle = "#8ea1b0";
    ctx.fillRect(panelX + 88, panelY + 92, 452, 18);
    ctx.fillRect(panelX + 88, panelY + 226, 452, 16);
    ctx.fillStyle = "#d5bf7b";
    ctx.fillRect(panelX + 280, panelY + 166, 76, 110);
  } else {
    const light = ctx.createRadialGradient(panelX + panelW / 2, panelY + panelH / 2, 20, panelX + panelW / 2, panelY + panelH / 2, 360);
    light.addColorStop(0, "#ffffff");
    light.addColorStop(0.42, "#d8f2ff");
    light.addColorStop(1, "#5a7e9b");
    ctx.fillStyle = light;
    ctx.fillRect(panelX, panelY, panelW, panelH);
    ctx.fillStyle = "rgba(14, 25, 40, 0.28)";
    ctx.fillRect(panelX + 82, panelY + 236, 464, 54);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(panelX + 278, panelY + 42, 72, 250);
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  for (let y = panelY + 12; y < panelY + panelH; y += 14) {
    ctx.fillRect(panelX + 12, y, panelW - 24, 2);
  }

  ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
  ctx.lineWidth = 4;
  ctx.strokeRect(panelX + 2, panelY + 2, panelW - 4, panelH - 4);
  ctx.fillStyle = "rgba(0, 0, 0, 0.54)";
  ctx.fillRect(panelX + 34, panelY + 34, 220, 52);
  ctx.fillStyle = "#f5fbff";
  ctx.font = "22px monospace";
  ctx.textAlign = "left";
  ctx.fillText(page.text.slice(0, 10), panelX + 52, panelY + 68);
}

function renderWhiteLightRays(ctx, t) {
  const centerX = CANVAS_WIDTH / 2;
  const centerY = 236;
  ctx.save();
  for (let i = 0; i < 18; i += 1) {
    const angle = -Math.PI * 0.9 + i * Math.PI * 1.8 / 17;
    const length = 320 + t * 760;
    const width = 18 + t * 70;
    const x2 = centerX + Math.cos(angle) * length;
    const y2 = centerY + Math.sin(angle) * length;
    ctx.strokeStyle = "rgba(255, 255, 255, " + (0.08 + t * 0.22) + ")";
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  ctx.restore();
}

function renderFilmDust(ctx, alpha) {
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
  for (let i = 0; i < 38; i += 1) {
    const x = (i * 97 + Math.floor(GameState.playTime * 12) * 11) % CANVAS_WIDTH;
    const y = (i * 53 + Math.floor(GameState.playTime * 8) * 7) % 470;
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.restore();
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

  drawAssetToRect(ctx, "hole_photo", cellImageRectToCanvas(CellLayout.pictureCoverFrame));
}

function renderCellInteractionHints(ctx) {
  if (isWallHoleRevealTransitionActive()) {
    return;
  }

  const activeInteraction = getActiveCellInteraction();
  ctx.save();
  if (isPlayerNearCellDoor() && !GameState.player.lyingInBed) {
    const door = cellImageRectToCanvas(CellLayout.doorFrame);
    ctx.strokeStyle = "#f5df9d";
    ctx.lineWidth = 4;
    ctx.strokeRect(door.x, door.y, door.w, door.h);
    ctx.fillStyle = "rgba(245, 223, 157, 0.12)";
    ctx.fillRect(door.x, door.y, door.w, door.h);
  }
  if (GameState.player.lyingInBed || isPlayerOnBed()) {
    const bed = cellImageRectToCanvas(CellLayout.bedFrame);
    ctx.strokeStyle = "#f5df9d";
    ctx.lineWidth = 4;
    ctx.strokeRect(bed.x, bed.y, bed.w, bed.h);
    ctx.fillStyle = "rgba(245, 223, 157, 0.12)";
    ctx.fillRect(bed.x, bed.y, bed.w, bed.h);
  }
  if (activeInteraction && activeInteraction.id === "wallPicture") {
    const picture = cellImageRectToCanvas(CellLayout.pictureCoverFrame);
    ctx.strokeStyle = "#f5df9d";
    ctx.lineWidth = 4;
    ctx.strokeRect(picture.x, picture.y, picture.w, picture.h);
    ctx.fillStyle = "rgba(245, 223, 157, 0.12)";
    ctx.fillRect(picture.x, picture.y, picture.w, picture.h);
  }
  if (activeInteraction && activeInteraction.id === "drawMap") {
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
  renderPipeVictoryGlowText(ctx, "你成功的逃出了肖申克", CANVAS_WIDTH / 2, 86, 34, alpha);
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
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.fillRect(screen.x + 8, screen.y + player.h - 6, player.w - 16, 8);
  ctx.restore();

  renderAndyWalkCycle(ctx, player, screen.x, screen.y);
}

function renderDigPlayer(ctx) {
  const dig = GameState.dig;
  const playerY = isFinalDigScene() ? getTunnelPlayerY(FinalDigLayout, dig.playerH) : dig.playerY;
  const point = digImageToCanvasPoint(dig.playerX, playerY);
  const player = {
    w: dig.playerW,
    h: dig.playerH,
    facing: dig.facing,
    isMoving: dig.isMoving,
    walkAnimTime: dig.walkAnimTime
  };

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.fillRect(point.x + 10, point.y + dig.playerH - 8, Math.max(0, dig.playerW - 20), 8);
  ctx.restore();
  if (dig.isDigging) {
    renderAndyDigCycle(ctx, dig, point.x, point.y);
  } else {
    renderAndyWalkCycle(ctx, player, point.x, point.y);
  }
  renderDigProgressBar(ctx, point.x, point.y, dig.playerW, dig.playerH);
}

function renderPipePlayer(ctx) {
  const pipe = GameState.pipe;
  const point = pipeImageToCanvasPoint(pipe.playerX, pipe.playerY);

  if (pipe.phase === "crawl" || pipe.phase === "victory") {
    renderPipeCrawlPlayer(ctx, pipe, point.x, point.y);
    return;
  }

  if (pipe.phase === "drown") {
    renderPipeDrownPlayer(ctx, pipe, point.x, point.y);
    return;
  }

  const player = {
    w: pipe.playerW,
    h: pipe.playerH,
    facing: pipe.facing,
    isMoving: pipe.isMoving,
    walkAnimTime: pipe.walkAnimTime
  };

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.fillRect(point.x + 10, point.y + pipe.playerH - 8, Math.max(0, pipe.playerW - 20), 8);
  ctx.restore();
  if (pipe.isSmashing) {
    renderAndyDigCycle(ctx, pipe, point.x, point.y);
  } else {
    renderAndyWalkCycle(ctx, player, point.x, point.y);
  }
}

function renderPipeSmashHint(ctx) {
  const pipe = GameState.pipe;
  if (pipe.smashHintTimer <= 0 || pipe.phase !== "smash" || pipe.smashCompleted) {
    return;
  }

  const point = pipeImageToCanvasPoint(pipe.playerX, pipe.playerY);
  const boxW = 378;
  const boxH = 78;
  const x = Math.min(CANVAS_WIDTH - boxW - 18, point.x + pipe.playerW + 14);
  const y = clamp(point.y + 4, 18, CANVAS_HEIGHT - boxH - 18);

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
  ctx.fillRect(x, y, boxW, boxH);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 1, y + 1, boxW - 2, boxH - 2);
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("趁着打雷的时候再砸管道！", x + 18, y + 28);
  ctx.fillText("不然会被狱警发现！", x + 18, y + 54);
  ctx.restore();
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
  const record = AssetStore.images[frame.assetKey];
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
  const record = AssetStore.images[frame.assetKey];
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

function getPlayerScreenPosition(x, y) {
  if (GameState.scene === "yard") {
    return {
      x: x - GameState.camera.x,
      y: y - GameState.camera.y
    };
  }

  return { x, y };
}

function renderAndySprite(ctx, x, y, w, h, facing) {
  const record = AssetStore.images.andy_views;
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

  const record = AssetStore.images[frame.assetKey];
  if (!record || !record.loaded || record.failed) {
    renderAndySprite(ctx, x, y, w, h, facing);
    return;
  }

  const drawW = Math.max(w + 4, Math.round(h * frame.w / frame.h) + 6);
  const drawX = x + (w - drawW) / 2;
  ctx.drawImage(record.element, frame.x, frame.y, frame.w, frame.h, drawX, y, drawW, h);
}

function renderAndySpriteRotated(ctx, x, y, w, h, facing, angle) {
  const record = AssetStore.images.andy_views;
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
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
  ctx.fillRect(player.x - 8, player.y + 42, 182, 14);
  ctx.restore();
  renderAndySpriteRotated(ctx, player.x, player.y, 164, 62, "right", Math.PI / 2);
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

function renderMapIcon(ctx, x, y, w, h) {
  drawAsset(ctx, "map", x, y, w, h);
}

function renderPrompt(ctx, text) {
  void ctx;
  void text;
}

function renderQuestText(ctx, text) {
  const guideX = 286;
  const guideW = 954;
  ctx.save();
  renderPanel(ctx, guideX, 14, guideW, 92);
  ctx.fillStyle = "#ffffff";
  ctx.font = "17px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  renderWrappedText(ctx, text, guideX + guideW / 2, 28, guideW - 60, 22);
  ctx.restore();
}

function renderTitle(ctx, text, y) {
  ctx.save();
  ctx.fillStyle = "#f5d477";
  ctx.font = "50px monospace";
  ctx.textAlign = "center";
  ctx.fillText(text, CANVAS_WIDTH / 2, y);
  ctx.restore();
}

function renderButton(ctx, rect, label, active) {
  ctx.save();
  ctx.fillStyle = active ? "#c4a25a" : "#8e7641";
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.strokeStyle = "#f5df9d";
  ctx.lineWidth = 4;
  ctx.strokeRect(rect.x + 2, rect.y + 2, rect.w - 4, rect.h - 4);
  ctx.fillStyle = "#111111";
  ctx.font = "30px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2);
  ctx.restore();
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

function renderDebug(ctx) {
  if (!DEBUG_MODE) {
    return;
  }

  if (isCinematicScene()) {
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(20, 92, 320, 132);
  ctx.fillStyle = "#79ff9b";
  ctx.font = "16px monospace";
  ctx.textAlign = "left";
  ctx.fillText("DEBUG_MODE: true", 38, 122);
  ctx.fillText("scene: " + GameState.scene, 38, 148);
  ctx.fillText("quest: " + GameState.currentQuest, 38, 174);
  ctx.fillText("player: " + Math.round(GameState.player.x) + ", " + Math.round(GameState.player.y), 38, 200);
  ctx.restore();
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

function isCinematicScene() {
  return GameState.scene === "menu" ||
    GameState.scene === "livingRoom" ||
    GameState.scene === "recap" ||
    GameState.scene === "whiteLight";
}

function shouldRenderInventory() {
  if (GameState.scene === "pipe" && isPipeVictorySequenceActive()) {
    return false;
  }

  const hasVisibleItems = GameState.hasHammer || GameState.hasBible || GameState.hasSoilPile || GameState.hasLedger || GameState.hasMap;
  return GameState.scene === "cell" ||
    GameState.scene === "dig" ||
    GameState.scene === "pipe" ||
    (hasVisibleItems && (GameState.scene === "yard" || (GameState.scene === "office" && !GameState.office.safeViewOpen)));
}

// ======================================================
// 14. UI / Mobile Controls
// ======================================================
const MobileControls = {
  render(ctx) {
    if (GameState.scene === "pipe" && isPipeVictorySequenceActive()) {
      return;
    }

    if (GameState.scene === "whiteLight" || GameState.scene === "montage") {
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
  ctx.save();
  ctx.globalAlpha = 0.78;
  ctx.strokeStyle = "#bca567";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(stick.baseX, stick.baseY, stick.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(188, 165, 103, 0.22)";
  ctx.fill();

  ctx.fillStyle = "rgba(245, 223, 157, 0.74)";
  ctx.beginPath();
  ctx.arc(stick.knobX, stick.knobY, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function renderActionButton(ctx) {
  const button = InputSystem.actionButton;
  const yardInteractionReady = GameState.scene === "yard" && Boolean(getActiveYardInteraction());
  const officeInteractionReady = GameState.scene === "office" && Boolean(getActiveOfficeInteraction());
  const pipeInteractionReady = GameState.scene === "pipe" && Boolean(getActivePipeInteraction());
  const interactionReady = yardInteractionReady || officeInteractionReady || pipeInteractionReady;
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
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#151515";
  ctx.font = "22px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getContextActionLabel(), button.x, button.y);
  ctx.restore();
}

function getContextActionLabel() {
  if (DialogueSystem.active) return "继续";
  if (GameState.scene === "menu") return "开始";
  if (GameState.scene === "recap") return "继续";
  if (GameState.scene === "whiteLight") return "等待";
  if (GameState.scene === "pause") return "继续";
  if (GameState.scene === "fail") return "重试";
  if (GameState.scene === "livingRoom") return "观看";
  if (GameState.scene === "cell" && isWallHoleRevealTransitionActive()) return "等待";
  if (GameState.scene === "cell") {
    const activeCellInteraction = getActiveCellInteraction();
    if (activeCellInteraction && activeCellInteraction.id === "wallPicture") {
      return "查看";
    }
  }
  if (GameState.scene === "cell" && isCellInspectionActive()) return "等待";
  if (GameState.scene === "dig") {
    const activeDigInteraction = getActiveDigInteraction();
    if (activeDigInteraction && activeDigInteraction.id === "dig") return "挖";
    if (activeDigInteraction && activeDigInteraction.id === "leave") return "出";
    return "走";
  }
  if (GameState.scene === "pipe") {
    const activePipeInteraction = getActivePipeInteraction();
    if (activePipeInteraction && activePipeInteraction.id === "smashPipe") return "砸";
    return "走";
  }
  if (GameState.scene === "yard") {
    const activeYardInteraction = getActiveYardInteraction();
    if (activeYardInteraction && activeYardInteraction.id === "soil") return "倒土";
  }
  if (GameState.scene === "office" && GameState.office.safeViewOpen) {
    return GameState.office.safeStage === "swapped" ? "离开" : "账本";
  }
  if (GameState.scene === "office") {
    const activeInteraction = getActiveOfficeInteraction();
    if (activeInteraction && activeInteraction.id === "warden") return "对话";
    if (activeInteraction && activeInteraction.id === "embroidery") return "打开";
    if (activeInteraction && activeInteraction.id === "door") return "离开";
  }
  return "交互";
}

// ======================================================
// 15. Main Loop
// ======================================================
let canvas = null;
let ctx = null;
let lastTimestamp = 0;
let loopStopped = false;

function initGame() {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  InputSystem.init(canvas);
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
  GameState.playTime += dt;

  ctx.imageSmoothingEnabled = false;
  let scene = Scenes[GameState.scene];

  scene.handleInput();
  scene = Scenes[GameState.scene];
  scene.update(dt);
  DialogueSystem.update(dt);
  updateRedDialogueReward();
  updateBrooksDialogueReward();
  updateAudioSystem(dt);

  clearCanvas(ctx);
  scene = Scenes[GameState.scene];
  scene.render(ctx);
  DialogueSystem.render(ctx);
  if (shouldRenderInventory()) {
    InventorySystem.render(ctx);
  }
  MobileControls.render(ctx);
  renderDebug(ctx);

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
