# AGENTS.md

# 项目全局规则：纯离线 HTML5 Canvas 像素剧情冒险游戏

## 1. 项目核心目标

本项目是一款纯离线运行的 HTML5 Canvas 像素剧情冒险游戏。

第一目标不是体积极限压缩，也不是规则保守，而是：

```txt
让游戏好玩、完整、能通关、有剧情情绪、有互动紧张感。
```

游戏需要在纯离线环境中运行，玩家可以直接打开 `index.html` 开始体验。作品横屏优先，支持 PC 和手机浏览器。

游戏主线围绕《肖申克的救赎》主题改编展开，允许在项目中使用：

```txt
《肖申克的救赎》
安迪
瑞德
老布
典狱长
狱警
牢房
锤子
圣经
账本
挖洞
撒土
雷雨夜逃脱
三结局
```

默认目标是完成一个**完整可玩的离线互动 Demo**，让玩家在短时间内体验“从现实观影进入电影世界，并亲自完成逃脱计划”的完整过程。

---

## 2.评判标准

```txt
1. 游戏是否更好玩
2. 主流程是否完整可通关
3. 玩家是否知道下一步做什么
4. 失败后是否愿意继续尝试
5. PC 和手机是否都能顺畅操作
6. 画面和剧情是否有情绪
7. 代码是否稳定、可维护
8. 是否完全离线运行
```

---

## 3. 最终交付形态

项目采用多文件结构。

项目根目录必须包含：

```txt
index.html
js/
  main.js
images/
  ...
audio/
  ...
README.md
AGENTS.md
```

要求：

* `index.html` 是唯一入口。
* `index.html` 通过相对路径引用本地脚本。
* 主脚本必须为：

```html
<script src="./js/main.js"></script>
```

* 图片资源必须位于 `./images/`。
* 音频资源必须位于 `./audio/`。
* 所有资源本地存放。
* 游戏断网后仍然可以运行。
* 不需要 npm、构建工具、服务器或外部依赖。

---

## 4. 技术硬约束

### 4.1 必须使用

```txt
HTML5
CSS
原生 JavaScript
Canvas 2D API
localStorage，可用于本地保存进度或设置
```

### 4.2 禁止使用

为了保证纯离线和交付稳定，禁止使用：

```txt
Phaser
PixiJS
Three.js
jQuery
React
Vue
npm 包
CDN
外部字体
外部图片
外部音频
后端服务
数据库
登录系统
网络请求
```

### 4.3 禁止出现

代码中不得出现：

```txt
fetch
XMLHttpRequest
axios
WebSocket
http://
https://
window.location
location.href
target="_blank"
<a href=
```

除非是在注释或文档中作为“禁止项”出现。

### 4.4 离线要求

必须满足：

```txt
断网可运行
双击 index.html 可运行
不依赖本地服务器
不加载远程资源
不请求远程配置
不上传任何用户数据
```

---

## 5. 不再限制的事项

本项目当前阶段以游戏体验为第一目标，因此以下内容不作为硬性限制：

```txt
不限制 zip 必须小于 8MB
不要求原创化替换影视 IP 名称
不要求删除《肖申克的救赎》、安迪、瑞德、老布等名称
不因为体积原因删除关键剧情、音效或美术表现
```

但仍需注意：

```txt
不要直接大段复制电影原台词。
不要依赖外部未下载资源。
不要为了还原而牺牲玩法清晰度。
```

---

## 6. 游戏体验目标

玩家体验关键词：

```txt
像素电影感
沉浸剧情
从观众进入电影
压抑监狱生活
长期隐忍
秘密计划
轻解谜
轻潜行
雷雨夜紧张逃脱
自由与希望
三结局回味
```

一次完整体验建议时长：

```txt
5 到 12 分钟
```

如果内容充足，可以超过 8 分钟，但不得拖沓。

每一幕都应该让玩家有明确目标：

```txt
我要去哪
我要找谁
我要拿什么
我要躲什么
我要等什么时机
失败后我该怎么再试
```

---

## 7. 项目文件结构规范

推荐结构：

```txt
project-root/
  index.html
  README.md
  AGENTS.md

  js/
    main.js

  images/
    andy.png
    red.png
    brooks.png
    warden.png
    guard.png
    prisoner_01.png
    prisoner_02.png
    prisoner_03.png

    living_room.jpg
    cell.jpg
    library.jpg
    yard.jpg
    office.jpg
    tunnel.jpg
    pipe_room.jpg
    ending_area.jpg

    hammer.png
    bible.png
    soil.png
    ledger.png
    tv.png
    embroidery.png

    opening_01.jpg
    opening_02.jpg
    opening_03.jpg
    ending_01.jpg
    ending_02.jpg

  audio/
    click.mp3
    dialogue.mp3
    white_light.mp3
    cell_ambience.mp3
    dig.mp3
    scatter.mp3
    guard_alert.mp3
    thunder.mp3
    knock.mp3
    pipe_break.mp3
    escape.mp3
    ending.mp3
```

### 7.1 文件命名建议

优先使用英文小写和下划线：

```txt
andy.png
warden_office.jpg
opening_01.jpg
```

如果已经有中文文件名素材，也可以在开发阶段使用，但最终建议统一重命名，避免路径兼容问题。

---

## 8. main.js 结构规范

`js/main.js` 可以包含全部游戏逻辑，但必须分区清晰。

必须按以下结构组织：

```js
// ======================================================
// 1. Global Config
// ======================================================

// ======================================================
// 2. Asset Manifest
// ======================================================

// ======================================================
// 3. Text Data / Dialogue Data
// ======================================================

// ======================================================
// 4. Game State
// ======================================================

// ======================================================
// 5. Input System
// ======================================================

// ======================================================
// 6. Asset Loader
// ======================================================

// ======================================================
// 7. Scene System
// ======================================================

// ======================================================
// 8. Dialogue System
// ======================================================

// ======================================================
// 9. Inventory System
// ======================================================

// ======================================================
// 10. Quest System
// ======================================================

// ======================================================
// 11. Checkpoint System
// ======================================================

// ======================================================
// 12. Gameplay Systems
// Digging / Soil / Guard / Office / Pipe
// ======================================================

// ======================================================
// 13. Rendering Helpers
// ======================================================

// ======================================================
// 14. UI / Mobile Controls
// ======================================================

// ======================================================
// 15. Main Loop
// ======================================================

// ======================================================
// 16. Error Handling
// ======================================================
```

---

## 9. 编码规范

### 9.1 命名规范

函数使用小驼峰：

```js
loadAssets()
changeScene()
updatePlayer()
renderDialogueBox()
restoreCheckpoint()
```

常量使用大写蛇形：

```js
CANVAS_WIDTH
CANVAS_HEIGHT
DEBUG_MODE
PIPE_REQUIRED_HITS
MAX_SOIL_CAPACITY
```

系统对象使用明确名称：

```js
InputSystem
DialogueSystem
QuestSystem
InventorySystem
CheckpointSystem
GuardSystem
PipeRhythmSystem
```

### 9.2 状态修改规范

所有全局状态集中在 `GameState` 中。

禁止散落大量独立变量：

```js
let hasHammer = false;
let hasBible = false;
let currentQuest = "...";
```

推荐：

```js
const GameState = {
  hasHammer: false,
  hasBible: false,
  currentQuest: "quest_start"
};
```

### 9.3 场景切换规范

所有场景切换必须通过：

```js
changeScene("cell");
```

禁止直接：

```js
GameState.scene = "cell";
```

### 9.4 输入规范

业务逻辑不得直接判断键盘。

禁止：

```js
if (event.key === "e") {
  dig();
}
```

必须通过统一输入：

```js
if (InputSystem.isPressed("dig")) {
  DiggingSystem.update(dt);
}
```

### 9.5 注释规范

核心玩法逻辑必须写简短注释。

推荐：

```js
// 玩家在狱警发现范围内撒土，立即失败并回到劳作区检查点。
failAndRestore("CP_SOIL_DISPOSE");
```

禁止无意义注释：

```js
// i + 1
i++;
```

---

## 10. Canvas 渲染规范

### 10.1 基础设置

Canvas 推荐逻辑尺寸：

```txt
1280 x 720
```

横屏优先。

必须设置像素风渲染：

```js
ctx.imageSmoothingEnabled = false;
```

### 10.2 自适应缩放

Canvas 必须适配不同屏幕尺寸：

```txt
桌面浏览器
手机横屏浏览器
平板横屏浏览器
```

要求：

```txt
不出现横向滚动条
不出现页面滚动
Canvas 保持完整显示
UI 不遮挡核心玩法
```

### 10.3 渲染顺序

每帧按照以下顺序：

```txt
清屏
背景
场景装饰
交互物
NPC
玩家
特效
任务 UI
对话框
手机控制按钮
暂停层
失败层
错误层
```

### 10.4 图片缺失处理

图片加载失败时，不得白屏。

必须使用安全绘制函数：

```js
drawAsset(ctx, assetKey, x, y, w, h);
```

如果素材缺失，绘制占位图：

```txt
灰色底
边框
Missing Asset
素材 key
```

---

## 11. 游戏状态机规范

必须使用状态机组织完整流程。

状态列表：

```txt
menu
livingRoom
recap
whiteLight
cell
library
inspection
dig
yard
montage
office
tunnel
pipe
escape
endingSelect
endingA
endingB
endingC
fail
pause
```

每个场景至少包含：

```txt
enter
update
render
handleInput
exit
```

建议结构：

```js
const Scenes = {
  menu: {
    enter() {},
    update(dt) {},
    render(ctx) {},
    handleInput() {},
    exit() {}
  }
};
```

---

## 12. PRD 主流程硬约束

以下主流程必须完整实现，不得删除：

```txt
开始界面
↓
客厅观影
↓
点击电视
↓
剧情回顾 / 漫画分镜
↓
白光转场
↓
牢房醒来
↓
离开牢房
↓
前往图书馆
↓
找到瑞德
↓
获得锤子
↓
找到老布
↓
获得圣经
↓
回到牢房
↓
典狱长查房
↓
通过检查
↓
第一次挖洞
↓
获得土
↓
前往劳作区
↓
避开狱警撒土
↓
二十年重复蒙太奇
↓
找到典狱长办公室
↓
与典狱长对话
↓
典狱长离开
↓
检查刺绣
↓
找到账本
↓
用圣经完成调包
↓
回牢房最后一次挖洞
↓
进入地道
↓
到达水管连接口
↓
雷雨夜敲水管
↓
逃出监狱
↓
三结局选择
```

---

## 13. 核心玩法设计要求

### 13.1 道具系统

必须实现：

```txt
hammer：锤子
bible：圣经
soil：泥土
ledger：账本
```

规则：

```txt
锤子用于挖洞
圣经用于隐藏锤子和办公室调包
泥土是数量型任务道具
账本是调包后的关键道具
关键道具不可丢弃
```

### 13.2 瑞德交付锤子

流程：

```txt
玩家进入图书馆
靠近瑞德
触发对话
瑞德交付锤子
GameState.hasHammer = true
保存 CP_HAMMER_OBTAINED
任务切换到寻找老布
```

### 13.3 老布交付圣经

流程：

```txt
玩家靠近老布
触发对话
老布交付圣经
GameState.hasBible = true
保存 CP_BIBLE_OBTAINED
任务切换到回牢房接受查房
```

### 13.4 查房玩法

触发：

```txt
玩家获得锤子后回到牢房
```

成功条件：

```js
GameState.hasHammer === true && GameState.hasBible === true
```

失败条件：

```js
GameState.hasHammer === true && GameState.hasBible === false
```

成功结果：

```txt
通过典狱长检查
GameState.inspectionPassed = true
保存 CP_INSPECTION_PASSED
解锁挖洞
```

失败结果：

```txt
显示失败提示
返回 CP_HAMMER_OBTAINED
保留锤子
提示去找老布拿圣经
```

### 13.5 挖洞玩法

触发条件：

```txt
hasHammer = true
hasBible = true
inspectionPassed = true
玩家靠近 wallHole
```

操作：

```txt
PC：长按 E
手机：长按挖洞按钮
```

玩法反馈：

```txt
显示挖洞进度条
播放挖洞音效
墙洞画面轻微震动
进度满后 soilCount + 1
任务切换到撒土
```

为了更好玩，挖洞不是单纯等进度条，可以加入：

```txt
偶尔出现脚步声提示，玩家需要松开按键
如果脚步声中继续挖，触发轻微警告
正式版可加入失败，但第一版可只做提示
```

### 13.6 撒土玩法

触发条件：

```txt
soilCount > 0
玩家在劳作区
玩家靠近撒土区域
```

狱警机制：

```txt
狱警沿固定路线巡逻
狱警有预警范围
狱警有发现范围
预警范围内提示“狱警靠近了”
发现范围内撒土则失败
```

成功：

```txt
soilCount - 1
土处理完毕
进入二十年蒙太奇
```

失败：

```txt
进入 fail 状态
返回 CP_SOIL_DISPOSE
保留土数量
重置狱警位置
```

为了更好玩，撒土玩法建议加入：

```txt
狱警视野用半透明扇形或圆形显示
撒土需要 1 到 2 秒持续动作
玩家可以中途松开取消
警戒提示音逐渐变强
```

### 13.7 二十年蒙太奇

必须表现长期计划，不要让玩家机械重复二十次。

包含：

```txt
牢房挖洞
白天撒土
墙洞扩大
安迪动作变熟练
瑞德旁白
字幕“很多年过去了”
字幕“二十年的墙，一点点松动”
```

建议时长：

```txt
30 到 60 秒
```

允许点击跳过，但默认完整播放。

### 13.8 典狱长办公室调包

流程：

```txt
玩家找到典狱长办公室
进入办公室
自动触发典狱长对话
典狱长离开
玩家获得短暂行动时间
玩家检查办公室物品
找到刺绣
刺绣后发现账本
使用圣经完成调包
```

成功结果：

```js
GameState.ledgerFound = true;
GameState.ledgerSwapped = true;
GameState.hasLedger = true;
GameState.finalDigUnlocked = true;
```

失败条件：

```txt
超时
离开办公室前未完成
连续检查太多错误物品
```

为了更好玩，办公室玩法建议加入：

```txt
60 秒倒计时
3 到 5 个可检查物体
错误检查会消耗时间
刺绣需要检查两次
调包时显示短动画
门外脚步声逐渐靠近
```

### 13.9 地道探索

地道必须有压迫感。

包含：

```txt
狭窄通道
黑暗背景
水声或回声
简单方向指引
到达水管连接口
```

可以加入：

```txt
手电/微光范围
慢速移动
镜头轻微晃动
```

### 13.10 雷雨夜水管节奏玩法

触发条件：

```txt
finalDigUnlocked = true
tunnelUnlocked = true
玩家到达水管连接口
hasHammer = true
```

核心规则：

```txt
雷声随机出现
雷声期间 thunderActive = true
只有 thunderActive = true 时敲击才成功
没有雷声时敲击立即失败
连续正确敲击 10 次后成功
```

推荐数值：

```txt
PIPE_REQUIRED_HITS = 10
普通雷声窗口：800ms - 1400ms
前 2 次教学窗口：1600ms
雷声间隔：1500ms - 3000ms
```

为了更好玩，必须加入清晰反馈：

```txt
雷声来临前轻微闪烁
雷声时屏幕强闪白
按钮高亮
水管震动
正确敲击显示 +1
错误敲击立即失败
成功次数显示 0/10
```

---

## 14. 三结局设计要求

逃出监狱后进入结局选择界面。

必须有三个结局：

```txt
自由之路
回到现实
重逢之路
```

### 14.1 结局 A：自由之路

类型：

```txt
纯剧情结局
```

表现：

```txt
雨夜结束
天色变亮
主角走向远方
字幕表达自由与希望
```

### 14.2 结局 B：回到现实

类型：

```txt
反转剧情结局
```

表现：

```txt
玩家回到开头客厅
电视仍在播放
桌上出现来自监狱世界的小物件
暗示经历可能不是梦
```

### 14.3 结局 C：重逢之路

类型：

```txt
可操作结局
```

玩法：

```txt
玩家在逃出后的开放区域移动
根据线索寻找瑞德
找到瑞德后触发最终动画
进入制作人员名单
```

---

## 15. 剧情展示系统规范

必须预留可扩展的漫画/幕间分镜系统。

用于：

```txt
开局剧情回顾
白光转场
二十年蒙太奇
结局展示
后续补充更多剧情页
```

功能要求：

```txt
支持多张图片
支持文字说明
支持点击推进
支持淡入淡出
支持跳过
支持自动播放
```

建议数据结构：

```js
const ComicPages = {
  opening: [
    {
      image: "opening_01",
      text: "电视里的光忽然变得刺眼。"
    },
    {
      image: "opening_02",
      text: "等他再次醒来，四周只剩冰冷的铁栏。"
    }
  ]
};
```

---

## 16. 检查点系统规范

必须实现检查点。

检查点列表：

```txt
CP_START
CP_AFTER_WHITE_LIGHT
CP_HAMMER_OBTAINED
CP_BIBLE_OBTAINED
CP_INSPECTION_PASSED
CP_FIRST_DIG
CP_SOIL_DISPOSE
CP_OFFICE_DIALOGUE_DONE
CP_FINAL_DIG
CP_PIPE_GAME
CP_ENDING_SELECT
```

保存检查点：

```js
saveCheckpoint("CP_FIRST_DIG");
```

恢复检查点：

```js
restoreCheckpoint("CP_FIRST_DIG");
```

失败恢复规则：

```txt
查房失败 → CP_HAMMER_OBTAINED
撒土失败 → CP_SOIL_DISPOSE
办公室失败 → CP_OFFICE_DIALOGUE_DONE
水管失败 → CP_PIPE_GAME
结局重开 → CP_ENDING_SELECT 或 CP_START
```

失败后不得从头开始，除非玩家主动选择重新开始。

---

## 17. 输入系统规范

### 17.1 统一行为

所有输入都映射为行为：

```txt
move
interact
continueDialogue
dig
scatterSoil
inspect
swapLedger
hitPipe
pause
selectEnding
```

### 17.2 PC 操作

```txt
WASD / 方向键：移动
E：交互 / 检查 / 撒土
长按 E：挖洞
空格：继续对话 / 敲击水管
鼠标点击：按钮、漫画、结局卡片
ESC：暂停
```

### 17.3 手机操作

```txt
左下角虚拟摇杆：移动
右下角动态按钮：交互 / 继续 / 挖洞 / 撒土 / 检查 / 调包 / 敲击
点击屏幕：推进漫画分镜
长按按钮：挖洞
点击结局卡片：选择结局
```

手机按钮必须随场景变化：

```txt
探索：交互
对话：继续
挖洞：挖洞
撒土：撒土
办公室：检查 / 调包
水管：敲击
结局：选择
```

---

## 18. GameState 数据结构规范

必须集中管理游戏状态。

建议：

```js
const GameState = {
  scene: "menu",
  previousScene: null,

  currentQuest: "quest_start",
  currentCheckpoint: "CP_START",

  hasHammer: false,
  hasBible: false,
  hasLedger: false,
  bibleUsed: false,

  inspectionPassed: false,

  digProgress: 0,
  soilCount: 0,
  soilCapacity: 3,

  ledgerFound: false,
  ledgerSwapped: false,
  finalDigUnlocked: false,
  tunnelUnlocked: false,

  pipeHitCount: 0,
  pipeRequiredHits: 10,

  endingUnlocked: {
    endingA: false,
    endingB: false,
    endingC: false
  },

  failCount: 0,
  playTime: 0
};
```

---

## 19. 错误处理规范

### 19.1 严重错误

出现严重脚本错误时，显示：

```txt
哎呀，出错了，请重启试试吧~
```

必须设置：

```js
window.addEventListener("error", handleFatalError);
window.addEventListener("unhandledrejection", handleFatalError);
```

主循环必须安全：

```js
function safeGameLoop(timestamp) {
  try {
    gameLoop(timestamp);
    requestAnimationFrame(safeGameLoop);
  } catch (error) {
    handleFatalError(error);
  }
}
```

### 19.2 图片加载失败

图片加载失败不得中断游戏。

必须：

```txt
标记 failed
继续运行
绘制 Missing Asset 占位图
```

---

## 20. Debug 规范

### 20.1 Debug 开关

开发阶段：

```js
const DEBUG_MODE = true;
```

交付阶段：

```js
const DEBUG_MODE = false;
```

### 20.2 Debug 快捷跳转

开发阶段支持：

```txt
1：menu
2：livingRoom
3：cell
4：library
5：inspection
6：dig
7：yard
8：office
9：pipe
0：endingSelect
```

### 20.3 Debug 显示

开发阶段可显示：

```txt
当前 scene
当前 quest
当前 checkpoint
玩家坐标
hasHammer
hasBible
soilCount
digProgress
ledgerSwapped
pipeHitCount
```

---

## 21. 测试标注规范

关键功能必须写测试标注注释。

标注类型：

```txt
@feature
@test
@acceptance
@risk
@todo
@mobile
@checkpoint
@fun
```

示例：

```js
// @feature PipeRhythmSystem
// @test 雷声窗口内敲击成功，非雷声窗口敲击失败。
// @acceptance 连续正确敲击 10 次后进入逃脱剧情。
// @fun 必须有闪白、震动、音效和计数反馈。
function updatePipeRhythm(dt) {
  ...
}
```

```js
// @feature SoilSystem
// @test 狱警发现范围内撒土会失败。
// @checkpoint 失败后回到 CP_SOIL_DISPOSE，土数量保留。
// @fun 狱警视野需要清晰可见，玩家能理解风险。
function scatterSoil() {
  ...
}
```

---

## 22. 测试清单

### 22.1 主流程测试

必须完整测试：

```txt
开始界面
客厅观影
点击电视
漫画剧情
白光转场
牢房醒来
去图书馆
找瑞德
获得锤子
找老布
获得圣经
回牢房
典狱长查房
挖洞
获得泥土
劳作区撒土
多年蒙太奇
进入典狱长办公室
办公室对话
检查刺绣
发现账本
圣经调包
最后挖洞
进入地道
水管节奏玩法
逃脱
三结局选择
```

### 22.2 失败分支测试

必须测试：

```txt
只有锤子没有圣经 → 查房失败
撒土时狱警发现 → 撒土失败
办公室超时未调包 → 办公室失败
水管无雷声时敲击 → 水管失败
失败后点击重试 → 回到正确检查点
```

### 22.3 好玩度测试

必须人工体验并检查：

```txt
玩家是否知道下一步去哪
任务提示是否清楚
失败原因是否明确
挖洞是否有反馈
撒土是否有紧张感
办公室调包是否有倒计时压力
水管敲击是否刺激
结局是否有情绪
完整流程是否拖沓
```

### 22.4 移动端测试

必须测试：

```txt
手机横屏可完整显示
无横向滚动条
虚拟摇杆可移动
交互按钮可对话
长按挖洞按钮可挖洞
撒土按钮可触发撒土
水管按钮可敲击
结局卡片可点击
按钮不遮挡关键 UI
```

### 22.5 离线测试

必须测试：

```txt
断网
直接打开 index.html
完整进入游戏
至少完成到牢房醒来
最好完整通关一次
```

### 22.6 图片缺失测试

人为改错一个图片路径，确认：

```txt
游戏不白屏
Canvas 显示 Missing Asset
主流程仍可继续
```

### 22.7 错误处理测试

人为抛出错误：

```js
throw new Error("test error");
```

确认显示：

```txt
哎呀，出错了，请重启试试吧~
```

---

## 23. 验收标准

### 23.1 最小可验收版本

必须满足：

```txt
index.html 可打开
可以从开始界面进入游戏
可以完成主线到逃脱
至少能进入一个结局
PC 可操作
手机横屏可操作
断网可运行
失败后可从检查点重试
```

### 23.2 完整可验收版本

必须满足：

```txt
完整主线可通关
三个结局均可进入
结局 C 可操作
所有失败分支能正确回退
挖洞有进度和反馈
撒土有狱警压力
办公室调包有倒计时和搜索感
水管玩法有节奏感和紧张感
剧情分镜可点击推进
手机端完整可玩
图片缺失不白屏
错误处理可用
Debug 模式关闭
```

### 23.3 好玩版本验收

如果要达到“好玩优先”，还必须满足：

```txt
开场 30 秒内有吸引力
每一幕都有明确目标
玩家不会长时间不知道去哪
每个核心玩法都有反馈
失败不会让人烦躁
水管玩法有紧张感
三结局有选择欲
完整通关后有情绪记忆点
```

---

## 24. Codex 工作方式要求

Codex 每次修改代码必须遵守：

```txt
不要引入外部库
不要添加网络请求
不要破坏离线运行
不要删除主流程
不要删除检查点
不要删除手机端控制
不要删除错误处理
不要让一个功能完成但主流程断掉
不要为了代码简洁删除玩法反馈
不要为了节省体积删除关键剧情
```

每次完成一个阶段后，必须给出：

```txt
完成了什么
修改了哪些文件
如何测试
当前还缺什么
下一步建议做什么
```

---

## 25. 推荐开发顺序

必须按以下顺序推进：

```txt
1. index.html + Canvas 初始化
2. main.js 基础结构
3. 输入系统
4. 图片加载与缺失占位
5. 状态机
6. 开始界面
7. 客厅观影
8. 漫画剧情系统
9. 白光转场
10. 牢房醒来
11. 图书馆与瑞德
12. 老布与圣经
13. 道具系统
14. 查房系统
15. 挖洞系统
16. 劳作区撒土
17. 狱警巡逻与视野
18. 二十年蒙太奇
19. 典狱长办公室
20. 刺绣与账本
21. 圣经调包
22. 最后挖洞
23. 地道
24. 水管节奏玩法
25. 逃脱剧情
26. 三结局
27. 结局 C 可操作
28. 手机端适配
29. 音效与反馈增强
30. 完整通关测试
31. 好玩度调优
```

---

## 26. 禁止删除的核心体验

以下内容不得删减：

```txt
现实观影
电视白光
进入电影世界
牢房醒来
找瑞德拿锤子
找老布拿圣经
典狱长查房
只有锤子无圣经会失败
通过查房后才能挖洞
夜晚挖洞
白天撒土
狱警巡逻压力
多年蒙太奇
进入典狱长办公室
刺绣后找到账本
用圣经调包
最后挖洞
进入地道
雷雨夜敲水管
连续正确 10 次
逃出监狱
三结局选择
```

---

## 27. 最终体验判断标准

最终游戏不是“代码能跑”就算完成，而是要达到：

```txt
玩家愿意继续玩
玩家知道下一步做什么
玩家失败后愿意再试
玩家能感受到时间推进
玩家能感受到逃脱计划逐步完成
玩家在雷雨夜水管玩法中感到紧张
玩家逃出后有情绪释放
玩家会想看看另外两个结局
```

如果某个功能技术上完成了，但玩起来无聊，就继续优化。

如果某个场景不影响主线但能增强情绪，可以保留。

如果某个玩法太难或太不清楚，优先改提示、反馈和节奏，而不是简单删除。

---

## 28. 一句话总原则

```txt
先让它完整，再让它清楚，最后让它好玩。
但一旦主流程打通，所有优化都以“更好玩”为第一目标。
```
