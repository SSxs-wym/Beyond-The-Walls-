/* Open-source baseline for the three locally bundled endings. Maintained in this repository. */
(function () {
  "use strict";
  window.BeyondWallsEndingDefinitions = Object.freeze({
    "one": Object.freeze({
      title: "第一结局 · 相逢的海滩",
      css: "\n    :host {\n      color-scheme: dark;\n      --paper: #f5ead4;\n      --paper-ink: #402d1d;\n      --veil: #000;\n      --gold: #d9ad6a;\n      --blue: #7fc7ff;\n      --white: #f3ead8;\n      --caption-bg: rgba(33, 24, 16, .64);\n      --caption-border: rgba(215, 174, 113, .34);\n      --ease: cubic-bezier(.2,.8,.2,1);\n      /* 所有结局统一使用横向 16:9 画幅，便于后续共用移动端适配规则。 */\n      --ending-aspect-ratio: 16 / 9;\n      --raw-width: 100vw;\n      --raw-height: 100vh;\n      --raw-height: 100dvh;\n      --app-width: 100vw;\n      --app-height: 100vh;\n      --app-height: 100dvh;\n      --app-landscape-width: 177.777vh;\n      --app-landscape-width: 177.777dvh;\n    }\n\n    * { box-sizing: border-box; }\n\n    :host,\n    .ending-body {\n      margin: 0;\n      width: var(--raw-width);\n      min-height: var(--raw-height);\n      height: var(--raw-height);\n      background: #030303;\n      font-family: \"Microsoft YaHei\", \"PingFang SC\", \"Noto Sans SC\", Arial, sans-serif;\n      color: var(--white);\n      overflow: hidden;\n      overscroll-behavior: none;\n    }\n\n    .ending-body {\n      display: grid;\n      place-items: center;\n      min-height: var(--raw-height);\n      padding: 0;\n    }\n\n    .ending-body.is-final-mode {\n      padding: 0;\n    }\n\n    #landscapeApp {\n      position: relative;\n      width: var(--app-width);\n      height: var(--app-height);\n      display: grid;\n      place-items: center;\n      overflow: hidden;\n      transform-origin: center;\n    }\n\n    .stage {\n      width: min(calc(var(--app-width) - 24px), calc((var(--app-height) - 24px) * 16 / 9), 1672px);\n      max-height: calc(var(--app-height) - 24px);\n      aspect-ratio: var(--ending-aspect-ratio);\n      position: relative;\n      background: #000;\n      cursor: pointer;\n      user-select: none;\n      overflow: hidden;\n      box-shadow: 0 18px 60px rgba(0, 0, 0, .62);\n      touch-action: manipulation;\n      -webkit-tap-highlight-color: transparent;\n    }\n\n    .stage.is-final {\n      box-shadow: none;\n    }\n\n    .stage:focus-visible {\n      outline: 1px solid rgba(217, 173, 106, .42);\n      outline-offset: 4px;\n    }\n\n    .panel {\n      position: absolute;\n      inset: 0;\n      overflow: hidden;\n      background: transparent;\n      transition: opacity 620ms var(--ease);\n    }\n\n    .panel::before {\n      content: \"\";\n      position: absolute;\n      inset: 0;\n      background-image: url(\"../assets/ending-one/ending1_storyboard.webp\");\n      background-size: 100% 100%;\n      background-repeat: no-repeat;\n    }\n\n    .panel-1 { clip-path: polygon(0 0, 39.1% 0, 38.5% 6.8%, 37.6% 18.5%, 36.5% 31.6%, 33.4% 47.1%, 0 52.1%); }\n    .panel-2 { clip-path: polygon(0 50.2%, 33.4% 47.1%, 36.2% 61.4%, 37.9% 76.5%, 38.8% 90.8%, 39.1% 100%, 0 100%); }\n    .panel-3 { clip-path: polygon(39.1% 0, 70.6% 0, 69.7% 11.2%, 69.1% 25.4%, 68.1% 40.3%, 67% 49.5%, 35.2% 47.2%, 36.6% 37.8%, 38.2% 25%, 39.1% 12.2%); }\n    .panel-4 { clip-path: polygon(35.2% 47.2%, 67% 49.5%, 66.1% 60.3%, 65% 74.6%, 64% 89.6%, 63.2% 100%, 39.1% 100%, 38.3% 88.9%, 37% 74.2%, 35.5% 60.3%); }\n    .panel-5 { clip-path: polygon(70.6% 0, 100% 0, 100% 47.7%, 67% 51%, 68.1% 39.7%, 69.1% 25.1%, 69.7% 11.2%); }\n    .panel-6 { clip-path: polygon(67% 51%, 100% 47.7%, 100% 100%, 63.2% 100%, 64% 89.3%, 65% 74.5%, 66.1% 60.2%); }\n\n    .veil {\n      position: absolute;\n      inset: 0;\n      display: grid;\n      place-items: center;\n      background: var(--veil);\n      opacity: 1;\n      transition: opacity 520ms var(--ease), transform 520ms var(--ease);\n      z-index: 5;\n    }\n\n    .panel.is-revealed .veil {\n      opacity: 0;\n      transform: scale(1.04);\n      pointer-events: none;\n    }\n\n    .lock {\n      display: none;\n    }\n\n    .caption {\n      position: absolute;\n      z-index: 7;\n      max-width: min(29vw, 440px);\n      padding: clamp(10px, .95vw, 15px) clamp(13px, 1.2vw, 20px);\n      border: 1px solid var(--caption-border);\n      border-top-color: rgba(234, 199, 143, .44);\n      border-radius: 4px;\n      background:\n        linear-gradient(180deg, rgba(221, 178, 112, .12), rgba(58, 37, 20, .08)),\n        var(--caption-bg);\n      backdrop-filter: blur(4px) saturate(.95);\n      -webkit-backdrop-filter: blur(4px) saturate(.95);\n      color: var(--white);\n      font-size: clamp(12px, 1vw, 18px);\n      line-height: 1.62;\n      letter-spacing: 0;\n      text-shadow: 0 2px 6px rgba(0,0,0,.78);\n      box-shadow: 0 10px 24px rgba(0,0,0,.28), inset 0 1px 0 rgba(255, 238, 204, .09);\n      opacity: 0;\n      transform: translateY(12px);\n      transition: opacity 420ms var(--ease), transform 420ms var(--ease);\n      transition-delay: 0ms;\n      pointer-events: none;\n    }\n\n    .panel-1 .caption { left: 5%; top: 31%; max-width: 28%; }\n    .panel-2 .caption { left: 6.2%; bottom: 7.8%; max-width: 24%; }\n    .panel-3 .caption { left: 43%; top: 11.5%; max-width: 20%; }\n    .panel-4 .caption { left: 42.2%; top: 53%; max-width: 20%; }\n    .panel-5 .caption { right: 5.4%; top: 9%; max-width: 23%; }\n    .panel-6 .caption { right: 6.2%; bottom: 8.8%; max-width: 22%; }\n\n    .panel.is-current .caption {\n      opacity: 1;\n      transform: translateY(0);\n      transition-delay: 620ms;\n    }\n\n    .panel.is-past .caption {\n      opacity: 1;\n      transform: translateY(0);\n    }\n\n    .note {\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      z-index: 20;\n      width: min(58%, 760px);\n      transform: translate(-50%, -50%) scale(.98);\n      padding: clamp(18px, 2.2vw, 34px);\n      background: var(--paper);\n      color: var(--paper-ink);\n      border-radius: 2px;\n      box-shadow: 0 26px 80px rgba(0,0,0,.58), inset 0 0 0 1px rgba(80,45,18,.18);\n      font-family: \"KaiTi\", \"STKaiti\", \"Microsoft YaHei\", serif;\n      font-size: clamp(17px, 2vw, 34px);\n      line-height: 1.7;\n      opacity: 0;\n      pointer-events: none;\n      transition: opacity 520ms var(--ease), transform 520ms var(--ease);\n      transition-delay: 0ms;\n    }\n\n    .stage[data-step=\"2\"] .note {\n      opacity: 1;\n      transform: translate(-50%, -50%) scale(1) rotate(-1deg);\n      transition-delay: 620ms;\n    }\n\n    .overlay-line {\n      position: absolute;\n      z-index: 21;\n      left: 50%;\n      bottom: clamp(22px, 4vw, 64px);\n      width: min(86%, 1100px);\n      transform: translateX(-50%) translateY(16px);\n      padding: clamp(12px, 1.5vw, 22px) clamp(16px, 2vw, 30px);\n      color: #fff;\n      font-size: clamp(16px, 2.3vw, 38px);\n      line-height: 1.45;\n      text-align: center;\n      text-shadow: 0 4px 14px rgba(0,0,0,.95);\n      background:\n        linear-gradient(90deg, rgba(0,0,0,.08), rgba(0,0,0,.62), rgba(0,0,0,.08));\n      opacity: 0;\n      pointer-events: none;\n      transition: opacity 520ms var(--ease), transform 520ms var(--ease);\n      transition-delay: 0ms;\n    }\n\n    .stage[data-step=\"4\"] .os,\n    .stage[data-step=\"6\"] .ending {\n      opacity: 1;\n      transform: translateX(-50%) translateY(0);\n      transition-delay: 1250ms;\n    }\n\n    .hint {\n      position: absolute;\n      z-index: 30;\n      right: clamp(10px, 1.4vw, 22px);\n      top: clamp(10px, 1.4vw, 22px);\n      padding: 7px 11px;\n      border: 1px solid rgba(255,255,255,.18);\n      background: rgba(0,0,0,.52);\n      color: rgba(255,255,255,.72);\n      font-size: clamp(11px, .9vw, 14px);\n      line-height: 1;\n      opacity: .9;\n    }\n\n    .stage.is-final .panel,\n    .stage.is-final .note,\n    .stage.is-final .overlay-line,\n    .stage.is-final .hint {\n      opacity: 0;\n      pointer-events: none;\n    }\n\n    .final-screen {\n      position: absolute;\n      inset: 0;\n      z-index: 60;\n      display: grid;\n      place-items: center;\n      padding: clamp(22px, 5vw, 72px);\n      background: #000;\n      opacity: 0;\n      pointer-events: none;\n      transition: opacity 720ms var(--ease);\n    }\n\n    .final-screen::before {\n      content: \"\";\n      position: absolute;\n      inset:\n        max(14px, env(safe-area-inset-top))\n        max(14px, env(safe-area-inset-right))\n        max(14px, env(safe-area-inset-bottom))\n        max(14px, env(safe-area-inset-left));\n      border: 1px solid rgba(192, 170, 126, .52);\n      box-shadow: inset 0 0 0 1px rgba(255,255,255,.025);\n      pointer-events: none;\n    }\n\n    .stage.is-final .final-screen {\n      opacity: 1;\n      pointer-events: auto;\n    }\n\n    .ending-title {\n      position: absolute;\n      right: max(7%, calc(env(safe-area-inset-right) + 34px));\n      top: max(11%, calc(env(safe-area-inset-top) + 30px));\n      color: #c9ae78;\n      font-family: \"KaiTi\", \"STKaiti\", \"Microsoft YaHei\", serif;\n      font-size: clamp(17px, 2vw, 30px);\n      line-height: 1.5;\n      letter-spacing: .08em;\n      text-shadow: 0 0 18px rgba(201, 174, 120, .16);\n      white-space: nowrap;\n    }\n\n    .typewriter {\n      width: min(72%, 980px);\n      min-height: 5.8em;\n      color: #f7f1e5;\n      font-family: \"KaiTi\", \"STKaiti\", \"Microsoft YaHei\", serif;\n      font-size: clamp(22px, 3.2vw, 46px);\n      line-height: 1.8;\n      text-align: center;\n      letter-spacing: 0;\n      text-shadow: 0 0 22px rgba(247, 241, 229, .24);\n      white-space: pre-wrap;\n    }\n\n    .final-replay {\n      position: absolute;\n      left: max(6%, calc(env(safe-area-inset-left) + 30px));\n      bottom: max(9%, calc(env(safe-area-inset-bottom) + 26px));\n      color: rgba(211, 196, 164, .66);\n      font-family: \"KaiTi\", \"STKaiti\", \"Microsoft YaHei\", serif;\n      font-size: clamp(13px, 1.35vw, 20px);\n      letter-spacing: .12em;\n    }\n\n    .typewriter::after {\n      content: \"\";\n      display: inline-block;\n      width: .08em;\n      height: 1.05em;\n      margin-left: .12em;\n      vertical-align: -.14em;\n      background: rgba(247, 241, 229, .9);\n      animation: caretBlink 840ms steps(1) infinite;\n    }\n\n    .typewriter.is-done::after {\n      opacity: 0;\n      animation: none;\n    }\n\n    .escape-style-reveal {\n      position: absolute;\n      inset: 0;\n      z-index: 5;\n      display: grid;\n      place-items: center;\n      padding:\n        max(12px, env(safe-area-inset-top))\n        max(12px, env(safe-area-inset-right))\n        max(12px, env(safe-area-inset-bottom))\n        max(12px, env(safe-area-inset-left));\n      overflow: hidden;\n      background: #000;\n      opacity: 0;\n      pointer-events: none;\n      transition: opacity 700ms ease;\n    }\n    .escape-style-reveal.show { opacity: 1; pointer-events: auto; }\n    .escape-style-reveal img {\n      display: block;\n      width: 100%;\n      height: 100%;\n      max-width: 760px;\n      min-width: 0;\n      min-height: 0;\n      object-fit: contain;\n      object-position: center;\n      filter: drop-shadow(0 12px 30px rgba(0,0,0,.58));\n    }\n\n    @keyframes caretBlink {\n      50% { opacity: 0; }\n    }\n\n    @media (max-width: 720px) {\n      .ending-body { padding: 8px; }\n      .stage { width: calc(100vw - 16px); }\n      .caption { padding: 7px 9px; font-size: 10px; border-radius: 4px; }\n      .note { width: 76%; }\n      .overlay-line { bottom: 12px; width: 92%; }\n      .typewriter { width: 92%; min-height: 7.2em; font-size: 22px; }\n      .hint { display: none; }\n    }\n\n    @media (max-height: 600px) {\n      .ending-body {\n        min-height: var(--app-height);\n        padding:\n          max(4px, env(safe-area-inset-top))\n          max(4px, env(safe-area-inset-right))\n          max(4px, env(safe-area-inset-bottom))\n          max(4px, env(safe-area-inset-left));\n      }\n\n      .stage {\n        width: min(calc(var(--app-width) - 8px), calc((var(--app-height) - 8px) * 16 / 9), 1672px);\n        max-height: calc(var(--app-height) - 8px);\n      }\n\n      .caption {\n        padding: 5px 7px;\n        font-size: clamp(9px, 2.3dvh, 13px);\n        line-height: 1.42;\n        backdrop-filter: none;\n        -webkit-backdrop-filter: none;\n      }\n\n      .note {\n        width: 70%;\n        padding: 12px 16px;\n        font-size: clamp(13px, 3.2dvh, 20px);\n        line-height: 1.48;\n      }\n\n      .overlay-line {\n        bottom: max(8px, env(safe-area-inset-bottom));\n        width: 84%;\n        padding: 7px 12px;\n        font-size: clamp(13px, 3.7dvh, 22px);\n      }\n\n      .hint {\n        right: max(6px, env(safe-area-inset-right));\n        top: max(6px, env(safe-area-inset-top));\n        padding: 4px 7px;\n        font-size: 10px;\n      }\n\n      .final-screen { padding: 18px 34px; }\n      .final-screen::before {\n        inset:\n          max(7px, env(safe-area-inset-top))\n          max(7px, env(safe-area-inset-right))\n          max(7px, env(safe-area-inset-bottom))\n          max(7px, env(safe-area-inset-left));\n      }\n      .ending-title {\n        right: max(6vw, calc(env(safe-area-inset-right) + 18px));\n        top: max(7vh, calc(env(safe-area-inset-top) + 12px));\n        font-size: clamp(14px, 4.1dvh, 22px);\n      }\n      .typewriter {\n        width: 70%;\n        min-height: 4.8em;\n        font-size: clamp(17px, 5.2dvh, 31px);\n        line-height: 1.65;\n      }\n      .final-replay {\n        left: max(5vw, calc(env(safe-area-inset-left) + 16px));\n        bottom: max(6vh, calc(env(safe-area-inset-bottom) + 10px));\n        font-size: clamp(11px, 3dvh, 16px);\n      }\n\n    }\n\n    .oak-game-overlay {\n      position: fixed;\n      inset: 0;\n      width: var(--app-width);\n      height: var(--app-height);\n      z-index: 100;\n      display: none;\n      place-items: center;\n      background: #030403;\n    }\n\n    .oak-game-overlay.is-active { display: grid; }\n\n    .oak-game-frame {\n      display: block;\n      width: min(var(--app-width), var(--app-landscape-width));\n      max-height: var(--app-height);\n      aspect-ratio: 16 / 9;\n      border: 0;\n      background: #050705;\n    }\n\n    @media (max-height: 600px) {\n      .oak-game-overlay {\n        height: var(--app-height);\n        padding:\n          env(safe-area-inset-top)\n          env(safe-area-inset-right)\n          env(safe-area-inset-bottom)\n          env(safe-area-inset-left);\n      }\n\n      .oak-game-frame {\n        width: min(var(--app-width), var(--app-landscape-width));\n        max-height: var(--app-height);\n      }\n    }\n  ",
      body: "<audio id=\"bgm\" src=\"../assets/ending-one/ending1_bgm.m4a\" preload=\"auto\" loop></audio>\n  <div id=\"landscapeApp\">\n  <div class=\"oak-game-overlay\" id=\"oakGameOverlay\" aria-hidden=\"true\">\n    <div class=\"oak-game-frame\" id=\"oakGameHost\" role=\"application\" aria-label=\"瑞德寻找橡树\"></div>\n  </div>\n  <div class=\"oak-game-overlay\" id=\"routeGameOverlay\" aria-hidden=\"true\">\n    <div class=\"oak-game-frame\" id=\"routeGameHost\" role=\"application\" aria-label=\"瑞德驾车前往边境\"></div>\n  </div>\n  <main class=\"stage\" id=\"stage\" data-step=\"1\" tabindex=\"0\" aria-label=\"点击推进瑞德与安迪的六幕分镜\">\n    <section class=\"panel panel-1\" data-scene=\"1\">\n      <div class=\"veil\"><div class=\"lock\">1</div></div>\n      <div class=\"caption\">瑞德循着安迪留下的指引，找到了那颗橡树。</div>\n    </section>\n    <section class=\"panel panel-2\" data-scene=\"2\">\n      <div class=\"veil\"><div class=\"lock\">2</div></div>\n      <div class=\"caption\">打开信纸。</div>\n    </section>\n    <section class=\"panel panel-3\" data-scene=\"3\">\n      <div class=\"veil\"><div class=\"lock\">3</div></div>\n      <div class=\"caption\">瑞德乘坐巴士驶离边境小镇，前方是安迪说的“没有记忆的温暖的地方。”</div>\n    </section>\n    <section class=\"panel panel-4\" data-scene=\"4\">\n      <div class=\"veil\"><div class=\"lock\">4</div></div>\n      <div class=\"caption\">瑞德望着倒退的树影——他终于违背了不得离开的约定，跨越边境去赴约……</div>\n    </section>\n    <section class=\"panel panel-5\" data-scene=\"5\">\n      <div class=\"veil\"><div class=\"lock\">5</div></div>\n      <div class=\"caption\">瑞德站在墨西哥的沙滩上，露出了前所未有的笑容——他终于只是瑞德，不再是拘禁地的30265号。</div>\n    </section>\n    <section class=\"panel panel-6\" data-scene=\"6\">\n      <div class=\"veil\"><div class=\"lock\">6</div></div>\n      <div class=\"caption\">在温暖的阳光下，在这片没有记忆的海滩，安迪等到了老友瑞德的到来……</div>\n    </section>\n\n    <div class=\"note\" aria-hidden=\"true\">安迪：“我需要一个好人帮我实现计划，希望是件好东西，也许是世界上最好的东西，好东西永远不会消逝。”</div>\n    <div class=\"overlay-line os\">希望太平洋的海水和我梦中的一样蓝……</div>\n    <div class=\"overlay-line ending\">二人在海边相遇，携手开启了新的自由……</div>\n    <div class=\"hint\">点击画面 / 空格键推进</div>\n    <div class=\"final-screen\" aria-hidden=\"true\">\n      <div class=\"ending-title\">第一结局 ·《相逢的海滩》</div>\n      <div class=\"typewriter\" id=\"typewriter\" data-text=\"你与瑞德在这片没有记忆的海滩享受着一切温馨美好，而你也将带着这份美好，去经营你自己的人生……\"></div>\n      <div class=\"final-replay\">点击画面重新播放</div>\n      <div class=\"escape-style-reveal\" id=\"escapeStyleReveal\" aria-hidden=\"true\">\n        <img id=\"escapeStyleImage\" alt=\"你的脱困风格\" />\n      </div>\n    </div>\n  </main>\n  </div>",
      mount(scope) {
        const document = scope.document;
        const window = scope.window;
        const endingContext = scope.endingContext;
        const stage = document.getElementById('stage');
            const bgm = document.getElementById('bgm');
            bgm.loop = true;
            const finalScreen = document.querySelector('.final-screen');
            const typewriter = document.getElementById('typewriter');
            const escapeStyleReveal = document.getElementById('escapeStyleReveal');
            const panels = Array.from(document.querySelectorAll('.panel'));
            const finalText = '接下来是你的脱困风格';
            const maxStep = 7;
            const stepParam = new URLSearchParams("").get('step');
            const requestedStep = stepParam === null ? 0 : Number(stepParam);
            let step = Number.isInteger(requestedStep) && requestedStep >= 0 && requestedStep <= 7 ? requestedStep : 0;
            const oakGameOverlay = document.getElementById('oakGameOverlay');
            const oakGameHost = document.getElementById('oakGameHost');
            const routeGameOverlay = document.getElementById('routeGameOverlay');
            const routeGameHost = document.getElementById('routeGameHost');
            let activeGame = null;
            let globalControls = null;
            let endingThanks = null;
            let typingTimer = 0;
            let hasStartedAudio = false;
            let endingPhase = 'idle';
            let styleShownAt = 0;
        
        
            function syncViewport() {
              const viewport = window.visualViewport;
              const rawWidth = Math.round(viewport?.width || window.innerWidth || document.documentElement.clientWidth);
              const rawHeight = Math.round(viewport?.height || window.innerHeight || document.documentElement.clientHeight);
              document.documentElement.style.setProperty('--raw-width', `${rawWidth}px`);
              document.documentElement.style.setProperty('--raw-height', `${rawHeight}px`);
              document.documentElement.style.setProperty('--app-width', `${rawWidth}px`);
              document.documentElement.style.setProperty('--app-height', `${rawHeight}px`);
              document.documentElement.style.setProperty('--app-landscape-width', `${Math.round(rawHeight * 16 / 9)}px`);
            }
        
            function scheduleViewportSync() {
              syncViewport();
              window.requestAnimationFrame(syncViewport);
              window.setTimeout(syncViewport, 100);
              window.setTimeout(syncViewport, 360);
            }
        
            syncViewport();
            window.addEventListener('resize', scheduleViewportSync, { passive: true });
            window.addEventListener('orientationchange', scheduleViewportSync, { passive: true });
            window.visualViewport?.addEventListener('resize', scheduleViewportSync, { passive: true });
        
            function playBgm() {
              if (hasStartedAudio) return;
              hasStartedAudio = true;
              bgm.volume = 0.72;
              bgm.play().catch((error) => {
                hasStartedAudio = false;
                console.debug("[高墙之外] 第一结局音乐等待用户交互", error);
              });
            }
        
            function stopTypewriter() {
              window.clearTimeout(typingTimer);
              typewriter.textContent = '';
              typewriter.classList.remove('is-done');
              finalScreen.setAttribute('aria-hidden', 'true');
              escapeStyleReveal.classList.remove('show');
              escapeStyleReveal.setAttribute('aria-hidden', 'true');
              endingPhase = 'idle';
              styleShownAt = 0;
            }
        
            function showEscapeStyle() {
              if (endingPhase === 'style' || endingPhase === 'thanks') return;
              window.clearTimeout(typingTimer);
              typewriter.textContent = finalText;
              typewriter.classList.add('is-done');
              escapeStyleReveal.classList.add('show');
              escapeStyleReveal.setAttribute('aria-hidden', 'false');
              endingPhase = 'style';
              styleShownAt = performance.now();
              if (globalControls) globalControls.setContext(storyControlContext());
            }
        
            function startThanks(force) {
              if (!endingThanks || endingThanks.isActive()) return;
              if (!force && performance.now() - styleShownAt < 520) return;
              endingPhase = 'thanks';
              escapeStyleReveal.classList.remove('show');
              escapeStyleReveal.setAttribute('aria-hidden', 'true');
              endingThanks.start();
              if (globalControls) globalControls.setContext(storyControlContext());
            }
        
            function startTypewriter() {
              window.clearTimeout(typingTimer);
              typewriter.textContent = '';
              typewriter.classList.remove('is-done');
              finalScreen.setAttribute('aria-hidden', 'false');
              endingPhase = 'typing';
              styleShownAt = 0;
        
              let index = 0;
              function typeNext() {
                typewriter.textContent = finalText.slice(0, index);
                if (index >= finalText.length) {
                  showEscapeStyle();
                  return;
                }
                index += 1;
                typingTimer = window.setTimeout(typeNext, finalText[index - 1] === '，' ? 230 : 92);
              }
        
              typingTimer = window.setTimeout(typeNext, 620);
            }
        
            function render() {
              stage.dataset.step = String(step);
              stage.classList.toggle('is-final', step === maxStep);
              document.body.classList.toggle('is-final-mode', step === maxStep);
              if (!activeGame && globalControls) globalControls.setContext(storyControlContext());
              panels.forEach((panel) => {
                const scene = Number(panel.dataset.scene);
                panel.classList.toggle('is-revealed', scene <= step);
                panel.classList.toggle('is-current', scene === step);
                panel.classList.toggle('is-past', scene < step);
              });
        
              if (step === maxStep) {
                startTypewriter();
              } else {
                stopTypewriter();
              }
            }
        
            function advance() {
              playBgm();
              if (endingThanks?.isActive()) {
                endingThanks.advance();
                return;
              }
              if (step >= maxStep) {
                if (endingPhase === 'typing') {
                  showEscapeStyle();
                } else if (endingPhase === 'style') {
                  startThanks(false);
                }
                return;
              }
              if (step === 1) { openGame('oak'); return; }
              if (step === 4) { openGame('route'); return; }
              step += 1;
              render();
            }
        
            function storyControlContext() {
              const thanksState = endingThanks?.getControlState();
              if (thanksState?.active) {
                return {
                  controlsVisible: true,
                  joystickVisible: false,
                  actionVisible: thanksState.actionVisible,
                  actionEnabled: thanksState.actionEnabled,
                  actionLabel: thanksState.actionLabel,
                  actionHighlighted: thanksState.actionEnabled
                };
              }
              const isFinal = step >= maxStep;
              return {
                controlsVisible: true,
                joystickVisible: false,
                actionVisible: true,
                actionEnabled: true,
                actionLabel: isFinal ? (endingPhase === 'typing' ? '显示结果' : '继续') : '继续',
                actionHighlighted: true
              };
            }
        
            function setStoryAdapter() {
              globalControls.setAdapter({
                onMove() {},
                onActionDown() { advance(); },
                onActionUp() {}
              });
              globalControls.setContext(storyControlContext());
            }
        
            function finishGame(kind) {
              if (activeGame) activeGame.destroy();
              activeGame = null;
              const overlay = kind === 'oak' ? oakGameOverlay : routeGameOverlay;
              const host = kind === 'oak' ? oakGameHost : routeGameHost;
              overlay.classList.remove('is-active');
              overlay.setAttribute('aria-hidden', 'true');
              host.replaceChildren();
              step = kind === 'oak' ? 2 : 5;
              render();
              setStoryAdapter();
              stage.focus();
            }
        
            function openGame(kind) {
              const isOak = kind === 'oak';
              const overlay = isOak ? oakGameOverlay : routeGameOverlay;
              const host = isOak ? oakGameHost : routeGameHost;
              overlay.classList.add('is-active');
              overlay.setAttribute('aria-hidden', 'false');
              const mount = isOak ? window.BeyondWallsEndingOneGames.mountOak : window.BeyondWallsEndingOneGames.mountRoute;
              activeGame = mount(host, {
                embedded: true,
                onContext(context) { globalControls.setContext(context); },
                onComplete() { finishGame(kind); }
              });
              globalControls.setAdapter({
                onMove(payload) { activeGame?.setMove(payload); },
                onActionDown() { activeGame?.actionDown(); },
                onActionUp() { activeGame?.actionUp(); }
              });
            }
        
            function relayKeyboard(event) {
              const key = typeof event.key === 'string' ? event.key.toLowerCase() : '';
              if (!['w', 'a', 's', 'd', ' '].includes(key)) return;
              if (activeGame) {
                if (event.type === 'keydown') activeGame.keyDown(key, event.repeat);
                else activeGame.keyUp(key);
              } else if (event.type === 'keydown' && key === ' ' && !event.repeat) {
                advance();
              }
              event.preventDefault();
              event.stopPropagation();
            }
        
            globalControls = window.BeyondWallsControls.mount();
            endingThanks = window.BeyondWallsEndingThanks.mount({
              audio: bgm,
              onStateChange() {
                if (globalControls) globalControls.setContext(storyControlContext());
              }
            });
            setStoryAdapter();
            window.addEventListener('keydown', relayKeyboard, true);
            window.addEventListener('keyup', relayKeyboard, true);
            stage.addEventListener('click', advance);
            window.addEventListener('pagehide', () => {
              if (activeGame) activeGame.destroy();
              endingThanks.destroy();
              globalControls.destroy();
            }, { once: true });
            window.__endingOneTest = {
              state() { return { step, endingPhase, thanksPage: endingThanks.getPageIndex(), activeGame: activeGame ? activeGame.getState() : null }; },
              openOak() { if (!activeGame) openGame('oak'); },
              openRoute() { if (!activeGame) openGame('route'); },
              move(x, y) { if (activeGame) activeGame.setMove({ x, y }); },
              showThanks() {
                step = maxStep;
                render();
                showEscapeStyle();
                startThanks(true);
              }
            };
            render();
      }
    }),
    "two": Object.freeze({
      title: "第二结局·《高墙下的名单》",
      css: "\n    :host {\n      --cream: #f4dfb4;\n      --paper: #d6a45a;\n      --ink: #160d09;\n      --red: #9f2f25;\n      --glass: rgba(18, 11, 7, 0.84);\n      /* 三个结局共用的基础画幅。 */\n      --ending-aspect-ratio: 16 / 9;\n    }\n\n    * {\n      box-sizing: border-box;\n    }\n\n    :host,\n    .ending-body {\n      width: 100%;\n      min-height: 100%;\n      margin: 0;\n      background: #080504;\n      color: var(--cream);\n      font-family: \"Microsoft YaHei\", \"PingFang SC\", \"Noto Sans CJK SC\", sans-serif;\n    }\n\n    .ending-body {\n      min-height: 100vh;\n      display: grid;\n      place-items: center;\n      overflow: hidden;\n      background:\n        radial-gradient(circle at 50% 18%, rgba(121, 76, 33, 0.26), transparent 42rem),\n        #080504;\n    }\n\n    .story {\n      position: relative;\n      width: min(100vw, calc(100vh * 16 / 9));\n      aspect-ratio: var(--ending-aspect-ratio);\n      overflow: hidden;\n      border: 1px solid rgba(244, 223, 180, 0.32);\n      background: #050302;\n      box-shadow: 0 28px 100px rgba(0, 0, 0, 0.72);\n      cursor: pointer;\n      user-select: none;\n      outline: none;\n      isolation: isolate;\n    }\n\n    .story:focus-visible {\n      box-shadow: 0 0 0 3px var(--paper), 0 28px 100px rgba(0, 0, 0, 0.72);\n    }\n\n    .base,\n    .panel {\n      position: absolute;\n      inset: -1px;\n      z-index: 0;\n      background-image: url(\"../assets/ending-two/storyboard.webp\");\n      background-repeat: no-repeat;\n      background-size: 100% 100%;\n      background-position: center;\n      pointer-events: none;\n    }\n\n    .base {\n      filter: sepia(0.28) saturate(0.58) brightness(0.25) contrast(1.08);\n      transform: scale(1.003);\n    }\n\n    .panel {\n      filter: sepia(0.08) saturate(1.02) brightness(0.96) contrast(1.05);\n      opacity: 0;\n      transform: scale(1.014);\n      transition: opacity 620ms ease, transform 900ms ease, filter 650ms ease;\n    }\n\n    .panel.revealed {\n      opacity: 1;\n      transform: scale(1);\n    }\n\n    .panel.active {\n      filter: sepia(0.02) saturate(1.12) brightness(1.08) contrast(1.04);\n    }\n\n    .panel[data-panel=\"0\"] { clip-path: polygon(0 0, 34.2% 0, 32.7% 35.2%, 0 33.6%); }\n    .panel[data-panel=\"1\"] { clip-path: polygon(33.2% 0, 67.5% 0, 66.2% 34.1%, 32.5% 35.1%); }\n    .panel[data-panel=\"2\"] { clip-path: polygon(66.5% 0, 100% 0, 100% 35.6%, 66% 34.2%); }\n    .panel[data-panel=\"3\"] { clip-path: polygon(0 32.9%, 32.9% 34.4%, 34.1% 68.4%, 0 66.1%); }\n    .panel[data-panel=\"4\"] { clip-path: polygon(32.4% 34.1%, 66.9% 33.4%, 65.8% 67.2%, 33.6% 68.3%); }\n    .panel[data-panel=\"5\"] { clip-path: polygon(66.2% 33.8%, 100% 35%, 100% 66.4%, 65.7% 67.5%); }\n    .panel[data-panel=\"6\"] { clip-path: polygon(0 65.5%, 34% 67.6%, 32.8% 100%, 0 100%); }\n    .panel[data-panel=\"7\"] { clip-path: polygon(33.5% 67.1%, 66.1% 66.4%, 67.4% 100%, 32.4% 100%); }\n    .panel[data-panel=\"8\"] { clip-path: polygon(65.7% 66.8%, 100% 65.8%, 100% 100%, 66.8% 100%); }\n\n    .feature-image {\n      position: absolute;\n      inset: 0;\n      z-index: 3;\n      background:\n        linear-gradient(180deg, rgba(0, 0, 0, 0.22), transparent 25%, transparent 64%, rgba(0, 0, 0, 0.78)),\n        url(\"../assets/ending-two/network_reveal.webp\") center / cover no-repeat;\n      opacity: 0;\n      transform: scale(1.035);\n      transition: opacity 720ms ease, transform 1100ms ease;\n      pointer-events: none;\n    }\n\n    .feature-image.show {\n      opacity: 1;\n      transform: scale(1);\n    }\n\n    .grain {\n      position: absolute;\n      inset: 0;\n      z-index: 2;\n      opacity: 0.11;\n      pointer-events: none;\n      background-image: url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.48'/%3E%3C/svg%3E\");\n      mix-blend-mode: soft-light;\n    }\n\n    .topbar {\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      z-index: 5;\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 16px;\n      padding: clamp(11px, 1.5vw, 25px) clamp(14px, 2.4vw, 40px);\n      background: linear-gradient(180deg, rgba(8, 5, 3, 0.86), rgba(8, 5, 3, 0));\n      pointer-events: none;\n      transition: opacity 500ms ease;\n    }\n\n    .chapter {\n      min-width: 0;\n      text-shadow: 0 2px 8px #000;\n    }\n\n    .eyebrow {\n      margin: 0 0 5px;\n      color: rgba(244, 223, 180, 0.7);\n      font-family: \"KaiTi\", \"STKaiti\", serif;\n      font-size: clamp(11px, 0.9vw, 16px);\n      letter-spacing: 0.22em;\n    }\n\n    .subtitle-wrap {\n      position: absolute;\n      left: 50%;\n      bottom: clamp(34px, 5.2vh, 60px);\n      z-index: 7;\n      width: min(88%, 1120px);\n      transform: translateX(-50%);\n      pointer-events: none;\n      transition: opacity 420ms ease;\n    }\n\n    .subtitle {\n      position: relative;\n      margin: 0;\n      padding: clamp(13px, 1.6vw, 24px) clamp(18px, 2.8vw, 44px);\n      border-top: 1px solid rgba(244, 223, 180, 0.55);\n      border-bottom: 1px solid rgba(244, 223, 180, 0.4);\n      background:\n        linear-gradient(90deg, transparent, rgba(15, 9, 6, 0.96) 10%, rgba(15, 9, 6, 0.96) 90%, transparent);\n      color: #fff4db;\n      font-family: \"KaiTi\", \"STKaiti\", \"Microsoft YaHei\", serif;\n      font-size: clamp(14px, 1.35vw, 23px);\n      font-weight: 700;\n      line-height: 1.55;\n      text-align: center;\n      text-shadow: 0 2px 5px #000;\n      opacity: 0;\n      transform: translateY(15px);\n      transition: opacity 440ms ease, transform 440ms ease;\n    }\n\n    .subtitle.show {\n      opacity: 1;\n      transform: translateY(0);\n    }\n\n    .subtitle-wrap.hidden {\n      opacity: 0;\n    }\n\n    .document-overlay {\n      position: absolute;\n      inset: 0;\n      z-index: 14;\n      display: grid;\n      place-items: center;\n      padding: clamp(34px, 6vw, 92px);\n      background: rgba(5, 3, 2, 0.72);\n      opacity: 0;\n      transform: scale(0.96);\n      transition: opacity 430ms ease, transform 520ms ease;\n      pointer-events: none;\n    }\n\n    .document-overlay.show {\n      opacity: 1;\n      transform: scale(1);\n    }\n\n    .document-sheet {\n      position: relative;\n      width: min(82%, 860px);\n      max-height: 78vh;\n      overflow: auto;\n      padding: clamp(26px, 3.5vw, 52px);\n      border: 1px solid #8a6437;\n      background:\n        linear-gradient(rgba(235, 210, 160, 0.96), rgba(210, 180, 126, 0.96)),\n        #d8b97d;\n      color: #26170d;\n      font-family: \"KaiTi\", \"STKaiti\", \"Microsoft YaHei\", serif;\n      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.72);\n      clip-path: polygon(1% 0, 98.5% 1.3%, 100% 98%, 2% 100%, 0 2%);\n    }\n\n    .document-sheet::before {\n      content: \"\";\n      position: absolute;\n      inset: 9px;\n      border: 1px solid rgba(73, 42, 21, 0.34);\n      pointer-events: none;\n    }\n\n    .document-heading {\n      margin: 0 0 18px;\n      padding-bottom: 12px;\n      border-bottom: 2px solid rgba(89, 35, 24, 0.65);\n      color: #4c2016;\n      font-size: clamp(22px, 2.6vw, 38px);\n      text-align: center;\n      letter-spacing: 0.08em;\n    }\n\n    .document-lines {\n      margin: 0;\n      padding-left: 1.5em;\n      font-size: clamp(15px, 1.45vw, 23px);\n      line-height: 1.8;\n    }\n\n    .document-lines li + li {\n      margin-top: 8px;\n    }\n\n    .document-quote {\n      margin: 0;\n      font-size: clamp(20px, 2.3vw, 36px);\n      line-height: 1.8;\n      text-align: center;\n    }\n\n    .dialogue-layer {\n      position: absolute;\n      inset: 0;\n      z-index: 15;\n      opacity: 0;\n      transition: opacity 400ms ease;\n      pointer-events: none;\n    }\n\n    .dialogue-layer.show {\n      opacity: 1;\n    }\n\n    .dialogue-bubble {\n      position: absolute;\n      max-width: min(31%, 430px);\n      padding: clamp(10px, 1.25vw, 19px) clamp(12px, 1.6vw, 24px);\n      border: 2px solid rgba(255, 240, 207, 0.9);\n      border-radius: 5px;\n      background: rgba(22, 13, 9, 0.94);\n      color: #fff1d2;\n      font-family: \"KaiTi\", \"STKaiti\", \"Microsoft YaHei\", serif;\n      font-size: clamp(13px, 1.25vw, 22px);\n      font-weight: 700;\n      line-height: 1.55;\n      text-align: center;\n      box-shadow: 0 14px 38px rgba(0, 0, 0, 0.65);\n    }\n\n    .dialogue-bubble::after {\n      content: \"\";\n      position: absolute;\n      top: 100%;\n      width: 2px;\n      height: clamp(72px, 10vw, 160px);\n      background: rgba(255, 240, 207, 0.92);\n      box-shadow: 1px 0 3px rgba(0, 0, 0, 0.9);\n      transform-origin: top center;\n    }\n\n    .dialogue-bubble.winton {\n      left: 16%;\n      top: 48%;\n    }\n\n    .dialogue-bubble.winton::after {\n      left: 75%;\n      transform: rotate(0deg);\n    }\n\n    .dialogue-bubble.andy {\n      left: 52%;\n      right: auto;\n      top: 43%;\n    }\n\n    .dialogue-bubble.andy::after {\n      left: 35%;\n      transform: rotate(0deg);\n    }\n\n    .ending-screen {\n      position: absolute;\n      inset: 0;\n      z-index: 30;\n      display: grid;\n      grid-template-rows: 1fr 2fr 1fr;\n      align-items: center;\n      padding: clamp(24px, 6vw, 90px);\n      background: #000;\n      opacity: 0;\n      transition: opacity 850ms ease;\n      pointer-events: none;\n    }\n\n    .ending-screen.show {\n      opacity: 1;\n      pointer-events: auto;\n    }\n\n    .story.ending .topbar,\n    .story.ending .subtitle-wrap,\n    .story.ending .controls {\n      opacity: 0;\n      pointer-events: none;\n    }\n\n    .ending-title {\n      align-self: end;\n      margin: 0;\n      color: rgba(244, 223, 180, 0.9);\n      font-family: \"KaiTi\", \"STKaiti\", serif;\n      font-size: clamp(19px, 2.2vw, 36px);\n      font-weight: 500;\n      letter-spacing: 0.13em;\n      text-align: center;\n    }\n\n    .typewriter {\n      width: min(88%, 1050px);\n      margin: 0 auto;\n      color: #f7f1e5;\n      font-family: \"KaiTi\", \"STKaiti\", \"Microsoft YaHei\", serif;\n      font-size: clamp(23px, 3vw, 48px);\n      line-height: 1.75;\n      text-align: center;\n      white-space: pre-wrap;\n      text-shadow: 0 0 22px rgba(247, 241, 229, 0.2);\n    }\n\n    .typewriter.typing::after {\n      content: \"\";\n      display: inline-block;\n      width: 0.08em;\n      height: 1.05em;\n      margin-left: 0.12em;\n      vertical-align: -0.14em;\n      background: #f7f1e5;\n      animation: caretBlink 820ms steps(1) infinite;\n    }\n\n    .escape-style-reveal {\n      position: absolute;\n      inset: 0;\n      z-index: 2;\n      display: grid;\n      place-items: center;\n      padding:\n        max(12px, env(safe-area-inset-top))\n        max(12px, env(safe-area-inset-right))\n        max(12px, env(safe-area-inset-bottom))\n        max(12px, env(safe-area-inset-left));\n      overflow: hidden;\n      background: #000;\n      opacity: 0;\n      pointer-events: none;\n      transition: opacity 700ms ease;\n    }\n    .escape-style-reveal.show { opacity: 1; pointer-events: auto; }\n    .escape-style-reveal img {\n      display: block;\n      width: 100%;\n      height: 100%;\n      max-width: 760px;\n      min-width: 0;\n      min-height: 0;\n      object-fit: contain;\n      object-position: center;\n      filter: drop-shadow(0 12px 30px rgba(0,0,0,.58));\n    }\n\n    .end-restart {\n      align-self: end;\n      margin: 0;\n      color: rgba(244, 223, 180, 0.48);\n      font-size: clamp(11px, 0.9vw, 14px);\n      letter-spacing: 0.12em;\n      text-align: center;\n      opacity: 0;\n      transition: opacity 500ms ease;\n    }\n\n    .end-restart.show {\n      opacity: 1;\n    }\n\n    @keyframes caretBlink {\n      50% { opacity: 0; }\n    }\n\n    .controls {\n      position: absolute;\n      left: clamp(14px, 2.4vw, 40px);\n      right: clamp(14px, 2.4vw, 40px);\n      bottom: clamp(10px, 1.5vh, 20px);\n      z-index: 8;\n      display: grid;\n      grid-template-columns: 1fr auto 1fr;\n      align-items: center;\n      gap: 12px;\n      color: rgba(244, 223, 180, 0.58);\n      font-size: clamp(10px, 0.82vw, 14px);\n      pointer-events: none;\n      transition: opacity 500ms ease;\n    }\n\n    .hint {\n      margin: 0;\n      letter-spacing: 0.08em;\n    }\n\n    .progress {\n      display: flex;\n      justify-content: center;\n      gap: clamp(5px, 0.55vw, 9px);\n    }\n\n    .dot {\n      width: clamp(5px, 0.52vw, 8px);\n      height: clamp(5px, 0.52vw, 8px);\n      border: 1px solid rgba(244, 223, 180, 0.65);\n      border-radius: 50%;\n      background: transparent;\n      transition: transform 300ms ease, background 300ms ease;\n    }\n\n    .dot.past {\n      background: rgba(244, 223, 180, 0.45);\n    }\n\n    .dot.current {\n      background: var(--paper);\n      transform: scale(1.45);\n    }\n\n    .flash {\n      position: absolute;\n      inset: 0;\n      z-index: 20;\n      background: #f8ebce;\n      opacity: 0;\n      pointer-events: none;\n    }\n\n    .flash.play {\n      animation: flashCut 620ms ease both;\n    }\n\n    @keyframes flashCut {\n      0% { opacity: 0; }\n      18% { opacity: 0.26; }\n      100% { opacity: 0; }\n    }\n\n    @media (orientation: portrait) and (max-width: 900px) {\n      .ending-body {\n        width: 100vw;\n        height: 100vh;\n        min-height: 0;\n      }\n\n      .story {\n        position: absolute;\n        left: 50%;\n        top: 50%;\n        width: min(100vh, calc(100vw * 16 / 9));\n        height: min(56.25vh, 100vw);\n        aspect-ratio: var(--ending-aspect-ratio);\n        transform: translate(-50%, -50%) rotate(90deg);\n        transform-origin: center;\n      }\n\n      .subtitle-wrap {\n        bottom: clamp(36px, 5.2vh, 54px);\n        width: 94%;\n      }\n\n      .subtitle {\n        font-size: clamp(13px, 2.3vmin, 20px);\n      }\n\n      .dialogue-bubble {\n        max-width: 38%;\n        font-size: clamp(11px, 2.1vmin, 18px);\n      }\n\n      .dialogue-bubble.winton {\n        left: 5%;\n        top: 46%;\n      }\n\n      .dialogue-bubble.andy {\n        left: 52%;\n        right: auto;\n        top: 36%;\n      }\n\n      .controls {\n        grid-template-columns: 1fr auto;\n      }\n\n      .progress {\n        display: none;\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      .panel,\n      .subtitle,\n      .feature-image,\n      .document-overlay {\n        transition-duration: 1ms;\n      }\n\n      .flash.play {\n        animation: none;\n      }\n    }\n  ",
      body: "<audio id=\"bgm\" autoplay loop preload=\"auto\" playsinline>\n    <source src=\"../assets/ending-two/ending2_bgm.m4a\" type=\"audio/mp4\">\n  </audio>\n\n  <main\n    class=\"story\"\n    id=\"story\"\n    role=\"button\"\n    tabindex=\"0\"\n    aria-label=\"第二结局《高墙下的名单》，点击继续\"\n  >\n    <div class=\"base\" aria-hidden=\"true\"></div>\n    <div class=\"panel active revealed\" data-panel=\"0\" aria-hidden=\"true\"></div>\n    <div class=\"panel\" data-panel=\"1\" aria-hidden=\"true\"></div>\n    <div class=\"panel\" data-panel=\"2\" aria-hidden=\"true\"></div>\n    <div class=\"panel\" data-panel=\"3\" aria-hidden=\"true\"></div>\n    <div class=\"panel\" data-panel=\"4\" aria-hidden=\"true\"></div>\n    <div class=\"panel\" data-panel=\"5\" aria-hidden=\"true\"></div>\n    <div class=\"panel\" data-panel=\"6\" aria-hidden=\"true\"></div>\n    <div class=\"panel\" data-panel=\"7\" aria-hidden=\"true\"></div>\n    <div class=\"panel\" data-panel=\"8\" aria-hidden=\"true\"></div>\n    <div class=\"feature-image\" id=\"featureImage\" aria-hidden=\"true\"></div>\n\n    <div class=\"grain\" aria-hidden=\"true\"></div>\n\n    <header class=\"topbar\">\n      <div class=\"chapter\">\n        <p class=\"eyebrow\">第二结局 · 高墙下的名单</p>\n      </div>\n    </header>\n\n    <div class=\"subtitle-wrap\" aria-live=\"polite\">\n      <p class=\"subtitle show\" id=\"subtitle\">\n        安迪脱离了拘禁地，但他带走的不只是自己的自由，还有足以撕开高墙的证据。\n      </p>\n    </div>\n\n    <section class=\"document-overlay\" id=\"documentOverlay\" aria-hidden=\"true\">\n      <article class=\"document-sheet\">\n        <h2 class=\"document-heading\" id=\"documentHeading\"></h2>\n        <div id=\"documentContent\"></div>\n      </article>\n    </section>\n\n    <section class=\"dialogue-layer\" id=\"dialogueLayer\" aria-hidden=\"true\">\n      <div class=\"dialogue-bubble winton\" id=\"wintonBubble\"></div>\n      <div class=\"dialogue-bubble andy\" id=\"andyBubble\"></div>\n    </section>\n\n    <footer class=\"controls\">\n      <p class=\"hint\" id=\"hint\">点击画面继续</p>\n      <div class=\"progress\" id=\"progress\" aria-hidden=\"true\"></div>\n    </footer>\n\n    <div class=\"flash\" id=\"flash\" aria-hidden=\"true\"></div>\n\n    <section class=\"ending-screen\" id=\"endingScreen\" aria-hidden=\"true\">\n      <h2 class=\"ending-title\">第二结局 · 《高墙下的名单》</h2>\n      <p class=\"typewriter\" id=\"typewriter\" aria-live=\"polite\"></p>\n      <p class=\"end-restart\" id=\"endRestart\">点击画面重新播放</p>\n      <div class=\"escape-style-reveal\" id=\"escapeStyleReveal\" aria-hidden=\"true\"><img id=\"escapeStyleImage\" alt=\"你的脱困风格\"></div>\n    </section>\n  </main>",
      mount(scope) {
        const document = scope.document;
        const window = scope.window;
        const endingContext = scope.endingContext;
        const evidenceSnapshot = endingContext.getEvidenceSnapshot();
        const directEvidence = evidenceSnapshot.direct;
        const directEvidenceDefinitions = [
          {
            id: "brooks",
            source: "老布",
            line: "物证：老布的 D 区转送登记页，保留了编号、日期与图书馆馆藏章。"
          },
          {
            id: "red",
            source: "瑞德",
            line: "瑞德情报：三家空壳公司的结算日期，与后门夜车出入日期完全重合。"
          },
          {
            id: "tommy",
            source: "汤米",
            line: "汤米证言：转移档案没有接收拘禁地的盖章，三名被困者再未归来。"
          },
          {
            id: "haywood",
            source: "海伍德",
            line: "海伍德口述：夜车尾牌、出入时间与三次空壳公司结算日可以相互核对。"
          },
          {
            id: "floyd",
            source: "弗洛伊德",
            line: "物证：弗洛伊德的 D-17 铜牌，刻有后门与夜间时刻。"
          }
        ];
        const observedEvidenceLabels = Object.freeze({
          nightTruckRollCall: "夜车驶离后点名人数减少",
          d17NumberLink: "D-17 编号与失踪转送袋相互对应",
          shellCompanyTruckDates: "空壳公司结算日与夜车日期吻合"
        });
        const collectedDirectEvidence = directEvidenceDefinitions.filter((item) => directEvidence[item.id]);
        const collectedObservedEvidence = evidenceSnapshot.observedEvidenceIds
          .map((id) => observedEvidenceLabels[id])
          .filter(Boolean);
        const directSources = collectedDirectEvidence.map((item) => item.source).join("、");
        const observedEvidenceLines = collectedObservedEvidence.map((label) => `旁听记录：${label}。`);
        const scenes = [
              {
                title: "分镜一：安迪脱离拘禁地",
                narration: "安迪脱离了拘禁地，但他带走的不只是自己的自由，还有足以撕开高墙的证据。"
              },
              {
                title: "分镜二：失踪者名单",
                narration: `${directSources}提供的${collectedDirectEvidence.length}份直接证据，加上${collectedObservedEvidence.length}份旁听记录彼此印证，让安迪发现，那些被宣布“转移”的被困者，此后再也没有出现。`
              },
              {
                title: "分镜三：多条线索交汇",
                narration: "被困者失踪的记录，与虚假工程款的结算日期高度重合。所谓的工程资金，实际上是在帮助某些人掩盖非法所得。",
                secondaryType: "document",
                documentHeading: "物证与证言交叉比对",
                documentLines: [
                  ...collectedDirectEvidence.map((item) => item.line),
                  ...observedEvidenceLines,
                  `结论：${collectedDirectEvidence.length}份直接证据与${collectedObservedEvidence.length}份旁听记录共同指向人员转移与非法资金链。`
                ]
              },
              {
                title: "分镜四：安迪举报",
                narration: "安迪将证据分别寄给报社和司法调查部门。信封里，是失踪者留下的最后一条线索。",
                secondaryType: "document",
                documentHeading: "安迪寄出的信",
                documentQuote: "“如果这些被困者真的被转移，请查清他们究竟去了哪里。”"
              },
              {
                title: "分镜五：典狱长落网",
                narration: "工程结算单证明了典狱长长期利用拘禁地工程洗钱，但调查人员很快发现，这些黑钱背后还隐藏着更加可怕的来源。"
              },
              {
                title: "分镜六：转移文件指向温顿",
                narration: "进一步调查显示，温顿利用伪造案件制造替罪羊，再通过拘禁地将他们秘密转移。典狱长则伪造记录，并利用黑账洗白非法所得。",
                secondaryType: "document",
                documentHeading: "押送记录比对",
                documentLines: [
                  "真实押送记录：没有任何接收拘禁地的签收凭证。",
                  "伪造转移文件：日期、编号与车辆记录彼此矛盾。",
                  "车辆路线：押送车辆最终驶入温顿控制的医疗机构。",
                  "结论：失踪被困者从未被送往其他拘禁地。"
                ]
              },
              {
                title: "分镜七：更大的黑幕曝光",
                narration: "那些所谓的“被困者转移”，实际通向一个人口贩卖与非法器官交易网络。多名失踪被困者的真实遭遇，终于得到调查。",
                feature: true
              },
              {
                title: "分镜八：温顿被捕",
                narration: "温顿与典狱长分别被押上警车。经过安迪身边时，温顿停下了脚步。",
                secondaryType: "dialogue",
                dialogue: [
                  "你明明已经脱离控制了，为什么还要追查下去？",
                  "因为还有人的名字，被留在了高墙里面。"
                ]
              },
              {
                title: "最终画面：没有重逢",
                narration: "温顿与典狱长受到了审判，拘禁地隐藏多年的黑幕终于暴露在阳光下。安迪洗清了自己的冤屈，也帮助那些被抹去姓名的人重新得到公正。但他与瑞德，最终没能在约定的海边重逢。",
                secondaryType: "ending"
              }
            ];
        
            const story = document.getElementById("story");
            const panels = [...document.querySelectorAll(".panel")];
            const subtitle = document.getElementById("subtitle");
            const subtitleWrap = document.querySelector(".subtitle-wrap");
            const hint = document.getElementById("hint");
            const progress = document.getElementById("progress");
            const flash = document.getElementById("flash");
            const bgm = document.getElementById("bgm");
            const featureImage = document.getElementById("featureImage");
            const documentOverlay = document.getElementById("documentOverlay");
            const documentHeading = document.getElementById("documentHeading");
            const documentContent = document.getElementById("documentContent");
            const dialogueLayer = document.getElementById("dialogueLayer");
            const wintonBubble = document.getElementById("wintonBubble");
            const andyBubble = document.getElementById("andyBubble");
            const endingScreen = document.getElementById("endingScreen");
            const typewriter = document.getElementById("typewriter");
            const endRestart = document.getElementById("endRestart");
            const escapeStyleReveal = document.getElementById("escapeStyleReveal");
        
            let sceneIndex = 0;
            let showingSecondary = false;
            let transitioning = false;
            let endingMode = false;
            let endingReady = false;
            let endingPhase = "idle";
            let styleShownAt = 0;
            let endingTypingTimer = 0;
            let endingThanks = null;
            const endingText = "接下来是你的脱困风格";
            const endingControls = window.BeyondWallsControls.mount({
              adapter: {
                onMove() {},
                onActionDown() { advanceStory(); },
                onActionUp() {}
              }
            });
        
            function syncEndingControls() {
              const thanksState = endingThanks?.getControlState();
              if (thanksState?.active) {
                endingControls.setContext({
                  controlsVisible: true,
                  joystickVisible: false,
                  actionVisible: thanksState.actionVisible,
                  actionEnabled: thanksState.actionEnabled,
                  actionLabel: thanksState.actionLabel,
                  actionHighlighted: thanksState.actionEnabled
                });
                return;
              }
              endingControls.setContext({
                controlsVisible: true,
                joystickVisible: false,
                actionVisible: true,
                actionEnabled: true,
                actionLabel: endingMode ? (endingPhase === "typing" ? "显示结果" : "继续") : "继续",
                actionHighlighted: true
              });
            }
        
            scenes.forEach((_, index) => {
              const dot = document.createElement("span");
              dot.className = `dot${index === 0 ? " current" : ""}`;
              progress.appendChild(dot);
            });
        
            function startMusic() {
              if (!bgm.paused) return;
              bgm.muted = false;
              bgm.volume = 0.72;
              const playback = bgm.play();
              playback?.catch((error) => {
                console.debug("[高墙之外] 第二结局音乐等待用户交互", error);
              });
            }
        
            function preferLandscape() {
              if (!screen.orientation?.lock) return;
              screen.orientation.lock("landscape").catch((error) => {
                console.debug("[高墙之外] 浏览器未允许锁定横屏", error);
              });
            }
        
            function setSubtitle(text) {
              subtitle.classList.remove("show");
        
              window.setTimeout(() => {
                subtitle.textContent = text;
                subtitle.classList.add("show");
              }, 230);
            }
        
            function clearSpecialLayers() {
              subtitleWrap.classList.remove("hidden");
              documentOverlay.classList.remove("show");
              documentOverlay.setAttribute("aria-hidden", "true");
              dialogueLayer.classList.remove("show");
              dialogueLayer.setAttribute("aria-hidden", "true");
              featureImage.classList.remove("show");
            }
        
            function showDocument(scene) {
              subtitleWrap.classList.add("hidden");
              documentHeading.textContent = scene.documentHeading;
              documentContent.replaceChildren();
        
              if (scene.documentQuote) {
                const quote = document.createElement("p");
                quote.className = "document-quote";
                quote.textContent = scene.documentQuote;
                documentContent.appendChild(quote);
              } else {
                const list = document.createElement("ol");
                list.className = "document-lines";
                scene.documentLines.forEach((line) => {
                  const item = document.createElement("li");
                  item.textContent = line;
                  list.appendChild(item);
                });
                documentContent.appendChild(list);
              }
        
              documentOverlay.classList.add("show");
              documentOverlay.setAttribute("aria-hidden", "false");
            }
        
            function showDialogue(scene) {
              subtitleWrap.classList.add("hidden");
              wintonBubble.textContent = scene.dialogue[0];
              andyBubble.textContent = scene.dialogue[1];
              dialogueLayer.classList.add("show");
              dialogueLayer.setAttribute("aria-hidden", "false");
            }
        
            function showEscapeStyle() {
              if (endingPhase === "style" || endingPhase === "thanks") return;
              window.clearTimeout(endingTypingTimer);
              typewriter.textContent = endingText;
              typewriter.classList.remove("typing");
              endRestart.classList.add("show");
              escapeStyleReveal.classList.add("show");
              escapeStyleReveal.setAttribute("aria-hidden", "false");
              endingReady = true;
              endingPhase = "style";
              styleShownAt = performance.now();
              syncEndingControls();
            }
        
            function startThanks(force) {
              if (!endingThanks || endingThanks.isActive()) return;
              if (!force && performance.now() - styleShownAt < 520) return;
              endingPhase = "thanks";
              escapeStyleReveal.classList.remove("show");
              escapeStyleReveal.setAttribute("aria-hidden", "true");
              endingThanks.start();
              syncEndingControls();
            }
        
            function showEnding() {
              endingMode = true;
              endingReady = false;
              endingPhase = "typing";
              styleShownAt = 0;
              story.classList.add("ending");
              endingScreen.classList.add("show");
              endingScreen.setAttribute("aria-hidden", "false");
              typewriter.textContent = "";
              typewriter.classList.add("typing");
              endRestart.classList.remove("show");
              escapeStyleReveal.classList.remove("show");
              syncEndingControls();
        
              let index = 0;
              function typeNext() {
                typewriter.textContent = endingText.slice(0, index);
                if (index >= endingText.length) {
                  showEscapeStyle();
                  return;
                }
                index += 1;
                endingTypingTimer = window.setTimeout(typeNext, 105);
              }
        
              endingTypingTimer = window.setTimeout(typeNext, 900);
            }
        
            function resetEnding() {
              window.clearTimeout(endingTypingTimer);
              endingMode = false;
              endingReady = false;
              endingPhase = "idle";
              styleShownAt = 0;
              story.classList.remove("ending");
              endingScreen.classList.remove("show");
              endingScreen.setAttribute("aria-hidden", "true");
              typewriter.textContent = "";
              escapeStyleReveal.classList.remove("show");
              escapeStyleReveal.setAttribute("aria-hidden", "true");
              syncEndingControls();
              showScene(0);
            }
        
            function updateProgress() {
              [...progress.children].forEach((dot, index) => {
                dot.classList.toggle("past", index < sceneIndex);
                dot.classList.toggle("current", index === sceneIndex);
              });
            }
        
            function showScene(nextIndex) {
              transitioning = true;
              showingSecondary = false;
              clearSpecialLayers();
              flash.classList.remove("play");
              void flash.offsetWidth;
              flash.classList.add("play");
        
              panels[sceneIndex].classList.remove("active");
              sceneIndex = nextIndex;
              if (sceneIndex === 0) {
                panels.forEach((panel, index) => {
                  panel.classList.toggle("revealed", index === 0);
                });
              }
              panels[sceneIndex].classList.add("active", "revealed");
        
              setSubtitle(scenes[sceneIndex].narration);
              featureImage.classList.toggle("show", Boolean(scenes[sceneIndex].feature));
              updateProgress();
              syncEndingControls();
        
              if (scenes[sceneIndex].secondaryType === "document") {
                hint.textContent = "点击放大查看文件";
              } else if (scenes[sceneIndex].secondaryType === "dialogue") {
                hint.textContent = "点击查看人物对话";
              } else if (scenes[sceneIndex].secondaryType === "ending") {
                hint.textContent = "点击查看结局字幕";
              } else {
                hint.textContent = "点击画面继续";
              }
        
              window.setTimeout(() => {
                transitioning = false;
              }, 650);
            }
        
            function advanceStory() {
              if (transitioning) return;
              startMusic();
        
              if (endingMode) {
                if (endingThanks?.isActive()) {
                  endingThanks.advance();
                } else if (endingPhase === "typing") {
                  showEscapeStyle();
                } else if (endingPhase === "style") {
                  startThanks(false);
                }
                return;
              }
        
              const scene = scenes[sceneIndex];
              if (scene.secondaryType && !showingSecondary) {
                showingSecondary = true;
                if (scene.secondaryType === "document") {
                  showDocument(scene);
                  hint.textContent = "点击收起文件并进入下一幕";
                } else if (scene.secondaryType === "dialogue") {
                  showDialogue(scene);
                  hint.textContent = "点击进入下一幕";
                } else if (scene.secondaryType === "ending") {
                  showEnding();
                }
                return;
              }
        
              if (sceneIndex < scenes.length - 1) {
                showScene(sceneIndex + 1);
              } else {
                showScene(0);
              }
            }
        
            endingThanks = window.BeyondWallsEndingThanks.mount({
              audio: bgm,
              onStateChange: syncEndingControls
            });
            story.addEventListener("click", advanceStory);
            document.addEventListener("pointerdown", startMusic, { capture: true });
            document.addEventListener("pointerdown", preferLandscape, { capture: true, once: true });
            window.addEventListener("load", () => {
              bgm.load();
              startMusic();
              preferLandscape();
            });
            window.addEventListener("keydown", (event) => {
              if (event.key !== " " || event.defaultPrevented || event.repeat) return;
              event.preventDefault();
              startMusic();
              advanceStory();
            });
            window.addEventListener("pagehide", () => {
              endingThanks.destroy();
              endingControls.destroy();
            }, { once: true });
            window.__endingTwoTest = {
              state: () => ({ sceneIndex, endingMode, endingReady, endingPhase, thanksPage: endingThanks.getPageIndex() }),
              showThanks() {
                showEnding();
                showEscapeStyle();
                startThanks(true);
              }
            };
            syncEndingControls();
      }
    }),
    "three": Object.freeze({
      title: "安迪与瑞德：另一种结局",
      css: "\n    :host {\n      --cream: #f4e6c9;\n      --brown: #241914;\n      --gold: #caa66a;\n      --ease: cubic-bezier(.2,.8,.2,1);\n      /* 三个结局共用的基础画幅。 */\n      --ending-aspect-ratio: 16 / 9;\n    }\n    * { box-sizing: border-box; }\n    :host, .ending-body {\n      width: 100%;\n      height: 100%;\n      margin: 0;\n      overflow: hidden;\n      background: #070605;\n      color: var(--cream);\n      font-family: \"Microsoft YaHei\", \"PingFang SC\", Arial, sans-serif;\n    }\n    button, canvas { image-rendering: pixelated; image-rendering: crisp-edges; }\n    .screen {\n      position: fixed;\n      inset: 0;\n      opacity: 0;\n      visibility: hidden;\n      pointer-events: none;\n      transition: opacity 700ms var(--ease), visibility 700ms;\n    }\n    .screen.active { opacity: 1; visibility: visible; pointer-events: auto; }\n\n    /* 六镜头序章 */\n    #storyScreen {\n      --story-frame-padding: clamp(8px, 2vw, 24px);\n      display: grid;\n      place-items: center;\n      padding: var(--story-frame-padding);\n      background:\n        radial-gradient(circle at 65% 18%, rgba(58,126,153,.24), transparent 30rem),\n        radial-gradient(circle at 24% 60%, rgba(110,69,36,.34), transparent 30rem),\n        #070605;\n    }\n    .story-wrap {\n      width: min(100%, calc((100vh - var(--story-frame-padding) - var(--story-frame-padding)) * 16 / 9), 1672px);\n      width: min(100%, calc((100dvh - var(--story-frame-padding) - var(--story-frame-padding)) * 16 / 9), 1672px);\n    }\n    .stage {\n      position: relative;\n      width: 100%;\n      aspect-ratio: var(--ending-aspect-ratio);\n      overflow: hidden;\n      background: #050403;\n      box-shadow: 0 24px 78px rgba(0,0,0,.68);\n      cursor: pointer;\n      user-select: none;\n    }\n    .base, .scene, .mask {\n      position: absolute;\n      inset: 0;\n      background-image: url(\"../assets/ending-three/ending3_storyboard.webp\");\n      background-size: 100% 100%;\n      background-position: center;\n    }\n    .base { filter: sepia(.22) brightness(.4) contrast(1.05); }\n    .scene {\n      opacity: 0;\n      transform: scale(1.014);\n      filter: saturate(.86) brightness(.92);\n      transition: opacity 540ms var(--ease), transform 700ms var(--ease), filter 700ms var(--ease);\n      pointer-events: none;\n    }\n    .scene.revealed { opacity: 1; transform: scale(1); filter: saturate(1.04) brightness(1.03); }\n    .mask {\n      background-image: linear-gradient(rgba(7,5,4,.77),rgba(7,5,4,.77)), url(\"../assets/ending-three/ending3_storyboard.webp\");\n      background-blend-mode: multiply;\n      filter: blur(1.4px) sepia(.38) brightness(.35);\n      transition: opacity 520ms var(--ease);\n      pointer-events: none;\n    }\n    .mask.hidden { opacity: 0; }\n    .s1 { clip-path: polygon(0 0,34.5% 0,34.4% 46.5%,0 45.8%); }\n    .s2 { clip-path: polygon(34.5% 0,66.4% 0,66.2% 47.4%,34.4% 46.5%); }\n    .s3 { clip-path: polygon(66.4% 0,100% 0,100% 47.8%,66.2% 47.4%); }\n    .s4 { clip-path: polygon(0 45.8%,34.4% 46.5%,34.1% 100%,0 100%); }\n    .s5 { clip-path: polygon(34.4% 46.5%,66.2% 47.4%,66.1% 100%,34.1% 100%); }\n    .s6 { clip-path: polygon(66.2% 47.4%,100% 47.8%,100% 100%,66.1% 100%); }\n    .bubble {\n      position: absolute;\n      z-index: 8;\n      max-width: min(28%,470px);\n      padding: clamp(7px,1vw,15px) clamp(9px,1.25vw,19px);\n      border: 1px solid rgba(250,224,177,.42);\n      border-radius: 7px;\n      background: linear-gradient(135deg,rgba(43,28,17,.93),rgba(12,10,8,.88));\n      color: #fff0d2;\n      box-shadow: 0 12px 32px rgba(0,0,0,.55), inset 0 0 20px rgba(218,165,88,.12);\n      font-size: clamp(11px,1.08vw,19px);\n      line-height: 1.48;\n      font-weight: 700;\n      text-shadow: 0 1px 2px #000;\n      opacity: 0;\n      transform: translateY(10px);\n      transition: opacity 500ms var(--ease), transform 500ms var(--ease);\n      pointer-events: none;\n    }\n    .bubble.show { opacity: 1; transform: translateY(0); }\n    .b1 { left:4.3%; top:7.4%; max-width:27%; }\n    .b2 { left:38.2%; top:6.7%; max-width:25%; }\n    .b3 { right:4.5%; top:8.2%; max-width:28%; }\n    .b4 { left:4.2%; bottom:8.5%; max-width:27%; }\n    .b5 { left:39.5%; bottom:8.3%; max-width:24%; }\n    .b6 { right:4.3%; bottom:8.8%; max-width:28%; }\n    .story-hint {\n      margin-top: 9px;\n      text-align: center;\n      color: rgba(246,226,194,.75);\n      font-size: clamp(12px,1.1vw,15px);\n      letter-spacing: .08em;\n    }\n\n    /* 左右分屏关卡 */\n    #gameScreen { background: #17191b; }\n    .split-ending {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      width: 100vw;\n      height: 100vh;\n    }\n    .panel { position: relative; min-width: 0; height: 100vh; overflow: hidden; }\n    .panel + .panel { border-left: 2px solid #b3a789; }\n    .panel canvas { display: block; width: 100%; height: 100%; background: #111; }\n    #andyCanvas { filter: saturate(1.34) brightness(1.12) contrast(1.07); }\n    #redCanvas { touch-action: none; cursor: grab; }\n    #redCanvas.is-dragging { cursor: grabbing; }\n    .panel-title {\n      position: absolute;\n      top: 14px;\n      left: 16px;\n      z-index: 5;\n      padding: 5px 9px;\n      border: 1px solid rgba(243,226,193,.35);\n      background: rgba(24,19,16,.72);\n      font: 700 clamp(10px,1vw,14px)/1 monospace;\n      letter-spacing: .18em;\n      color: rgba(255,240,211,.82);\n      pointer-events: none;\n    }\n    .subtitle {\n      position: absolute;\n      left: 50%;\n      bottom: 4.5%;\n      z-index: 8;\n      width: min(88%,720px);\n      padding: clamp(10px,1.5vw,18px);\n      border: 1px solid rgba(225,199,153,.42);\n      border-radius: 7px;\n      background: rgba(25,17,13,.88);\n      box-shadow: 4px 4px 0 rgba(0,0,0,.36);\n      color: #f7ead2;\n      font-size: clamp(13px,1.45vw,22px);\n      line-height: 1.65;\n      text-align: center;\n      text-shadow: 2px 2px 0 rgba(0,0,0,.75);\n      opacity: 0;\n      transform: translate(-50%,12px);\n      transition: opacity 420ms, transform 420ms;\n      pointer-events: none;\n    }\n    .subtitle.show { opacity: 1; transform: translate(-50%,0); }\n    .subtitle.dialogue-only {\n      bottom: 7%;\n      width: min(92%,760px);\n      padding: 0 12px;\n      border: 0;\n      border-radius: 0;\n      background: transparent;\n      box-shadow: none;\n      color: #fff4dc;\n      font-weight: 800;\n      text-shadow:\n        2px 2px 0 #000,\n        -2px 2px 0 #000,\n        2px -2px 0 #000,\n        -2px -2px 0 #000,\n        0 3px 8px rgba(0,0,0,.9);\n    }\n    .game-hud {\n      position: absolute;\n      top: 14px;\n      right: 14px;\n      z-index: 8;\n      max-width: 54%;\n      padding: 8px 10px;\n      border: 1px solid rgba(225,199,153,.34);\n      background: rgba(25,22,20,.84);\n      color: #f2e7d1;\n      font: 700 clamp(10px,1.05vw,15px)/1.45 monospace;\n      text-shadow: 1px 1px #000;\n      pointer-events: none;\n    }\n    .controls {\n      position: absolute;\n      inset: 0;\n      z-index: 11;\n      display: grid;\n      place-items: center;\n      background: rgba(7,10,12,.42);\n      opacity: 0;\n      pointer-events: none;\n      transition: opacity 350ms;\n    }\n    .controls.show { opacity: 1; }\n    .controls > div {\n      padding: 16px 22px;\n      border: 2px solid rgba(232,220,194,.5);\n      background: rgba(20,23,24,.92);\n      box-shadow: 6px 6px 0 rgba(0,0,0,.45);\n      color: #f6ead2;\n      font: 700 clamp(14px,1.5vw,23px)/1.7 monospace;\n      text-align: center;\n    }\n    .message {\n      position: absolute;\n      left: 50%;\n      bottom: 3.5%;\n      z-index: 12;\n      width: min(90%,680px);\n      padding: 11px 15px;\n      border: 1px solid rgba(225,199,153,.44);\n      background: rgba(24,16,13,.92);\n      color: #fff0d2;\n      font-size: clamp(12px,1.28vw,19px);\n      line-height: 1.55;\n      text-align: center;\n      opacity: 0;\n      transform: translate(-50%,10px);\n      transition: opacity 250ms, transform 250ms;\n      pointer-events: none;\n    }\n    .message.show { opacity: 1; transform: translate(-50%,0); }\n    .sorting-game {\n      position: absolute;\n      inset: 0;\n      z-index: 9;\n      display: none;\n      pointer-events: none;\n    }\n    .sorting-game.show { display: block; }\n    .sorting-placeholder-panel {\n      position: absolute;\n      inset: 4%;\n      display: none;\n      padding: 18px;\n      border: 3px solid rgba(230,207,159,.72);\n      background:\n        linear-gradient(rgba(20,18,16,.92),rgba(36,30,24,.96)),\n        repeating-linear-gradient(0deg,transparent 0 23px,rgba(255,255,255,.035) 24px);\n      box-shadow: 0 0 0 5px rgba(15,12,10,.72), 0 14px 34px rgba(0,0,0,.55);\n      color: #f4e5c6;\n      pointer-events: auto;\n    }\n    .sorting-game.placeholder .sorting-placeholder-panel {\n      display: grid;\n      grid-template-rows: auto auto 1fr auto;\n      gap: 13px;\n    }\n    .sorting-game.placeholder .sort-instruction,\n    .sorting-game.placeholder .product-tray,\n    .sorting-game.placeholder .paper-bag { display: none; }\n    .placeholder-heading {\n      text-align: center;\n      font: 800 clamp(16px,1.7vw,25px)/1.3 monospace;\n      letter-spacing: .12em;\n    }\n    .sorting-rule-banner {\n      padding: 8px 12px;\n      border: 1px solid rgba(255,225,155,.62);\n      background: rgba(91,63,32,.5);\n      color: #ffe8af;\n      font: 700 clamp(11px,1.05vw,16px)/1.45 monospace;\n      text-align: center;\n    }\n    .placeholder-art-space {\n      display: grid;\n      place-items: center;\n      min-height: 0;\n      border: 2px dashed rgba(232,211,169,.52);\n      background: rgba(8,9,9,.45);\n      color: rgba(244,229,198,.58);\n      font: 700 clamp(12px,1.15vw,17px)/1.7 monospace;\n      text-align: center;\n    }\n    .placeholder-items {\n      display: grid;\n      grid-template-columns: repeat(4,1fr);\n      gap: 8px;\n    }\n    .placeholder-item {\n      padding: 8px 4px;\n      border: 1px solid rgba(244,224,179,.54);\n      background: rgba(105,82,53,.48);\n      text-align: center;\n      font: 700 clamp(10px,.95vw,14px)/1.2 monospace;\n    }\n    .sort-instruction {\n      position: absolute;\n      top: 12%;\n      left: 50%;\n      width: min(82%,560px);\n      padding: 9px 13px;\n      transform: translateX(-50%);\n      border: 1px solid rgba(255,232,181,.52);\n      background: rgba(24,18,15,.9);\n      color: #fff0cf;\n      font-size: clamp(11px,1.08vw,16px);\n      line-height: 1.5;\n      text-align: center;\n      text-shadow: 1px 1px #000;\n    }\n    .product-tray {\n      position: absolute;\n      left: 4%;\n      top: 25%;\n      bottom: 5%;\n      width: 32%;\n      padding: 9px;\n      border: 2px solid rgba(205,190,158,.62);\n      background: rgba(30,27,24,.9);\n      box-shadow: 4px 4px 0 rgba(0,0,0,.42);\n      pointer-events: auto;\n    }\n    .tray-title, .bag-title {\n      margin-bottom: 7px;\n      color: #d8cba8;\n      font: 700 clamp(9px,.9vw,13px)/1.2 monospace;\n      letter-spacing: .08em;\n      text-align: center;\n    }\n    .product-list {\n      display: grid;\n      grid-template-rows: repeat(4,1fr);\n      gap: 6px;\n      height: calc(100% - 22px);\n    }\n    .inventory-slot {\n      display: grid;\n      place-items: center;\n      min-height: 0;\n      border: 1px dashed rgba(216,199,159,.42);\n      background: rgba(10,11,11,.28);\n      color: rgba(238,223,193,.42);\n      font: 700 clamp(9px,.8vw,12px)/1 monospace;\n    }\n    .sort-product {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 7px;\n      width: 100%;\n      height: 100%;\n      min-width: 0;\n      min-height: 0;\n      padding: 3px 5px;\n      border: 1px solid #a99772;\n      background: linear-gradient(#665947,#433a30);\n      color: #fff2d7;\n      font: 700 clamp(10px,.92vw,14px)/1.2 monospace;\n      text-align: center;\n      cursor: grab;\n      user-select: none;\n      box-shadow: 0 0 7px rgba(255,223,154,.22);\n    }\n    .sort-product img {\n      width: clamp(34px,3.8vw,56px);\n      height: clamp(34px,3.8vw,56px);\n      object-fit: contain;\n      image-rendering: pixelated;\n      pointer-events: none;\n    }\n    .sort-product span { pointer-events:none; }\n    .sort-product.selected { outline: 2px solid #ffe9a7; box-shadow: 0 0 13px #e9c878; }\n    .sort-product:active { cursor: grabbing; }\n    .paper-bag {\n      position: absolute;\n      right: 5%;\n      top: 25%;\n      bottom: 4%;\n      width: 55%;\n      height: auto;\n      padding: 9px 12px 11px;\n      border: 3px solid #9c7748;\n      border-top-width: 1px;\n      background: linear-gradient(90deg,rgba(122,88,51,.95),rgba(175,132,79,.96),rgba(126,91,52,.95));\n      clip-path: polygon(5% 0,95% 0,100% 100%,0 100%);\n      pointer-events: auto;\n    }\n    .bag-slots {\n      display: grid;\n      grid-template-rows: repeat(4,1fr);\n      gap: 4px;\n      height: calc(100% - 49px);\n    }\n    .bag-slot {\n      display: grid;\n      place-items: center;\n      min-height: 0;\n      border: 1px dashed rgba(255,236,196,.56);\n      background: rgba(58,39,24,.35);\n      color: rgba(255,240,207,.56);\n      font: 700 clamp(9px,.85vw,12px)/1 monospace;\n    }\n    .bag-slot.wrong { border-color:#ff756d; background:rgba(136,32,27,.46); }\n    .bag-slot .sort-product { width:94%; height:92%; padding:2px 5px; }\n    .confirm-bag {\n      display: block;\n      width: 76%;\n      margin: 7px auto 0;\n      padding: 6px 8px;\n      border: 1px solid #f0d797;\n      background: #30271f;\n      color: #ffe9b7;\n      font-weight: 800;\n      cursor: pointer;\n    }\n    .paper-bag.shake { animation: bagShake 360ms steps(2); }\n    @keyframes bagShake {\n      25% { transform: translateX(-5px); }\n      50% { transform: translateX(5px); }\n      75% { transform: translateX(-3px); }\n    }\n\n    /* 黑屏打字机尾声 */\n    #epilogueScreen {\n      z-index: 30;\n      display:grid;\n      place-items:center;\n      --epilogue-frame-padding: clamp(14px,2.5vw,34px);\n      padding: var(--epilogue-frame-padding);\n      background:#000;\n    }\n    .ending-card {\n      position: relative;\n      display: grid;\n      place-items: center;\n      align-content: center;\n      gap: clamp(30px,6vh,72px);\n      width: min(100%, calc((100vh - var(--epilogue-frame-padding) - var(--epilogue-frame-padding)) * 16 / 9));\n      width: min(100%, calc((100dvh - var(--epilogue-frame-padding) - var(--epilogue-frame-padding)) * 16 / 9));\n      aspect-ratio: var(--ending-aspect-ratio);\n      height: auto;\n      border: 1px solid rgba(210,190,142,.48);\n      text-align: center;\n    }\n    .ending-title {\n      color: #d9c59a;\n      font-family: \"KaiTi\",\"STKaiti\",\"Microsoft YaHei\",serif;\n      font-size: clamp(22px,3vw,44px);\n      letter-spacing: .12em;\n    }\n    .typewriter-line {\n      width: min(86%,980px);\n      min-height: 2.2em;\n      color: #f7f1e5;\n      font-family: \"KaiTi\",\"STKaiti\",\"Microsoft YaHei\",serif;\n      font-size: clamp(22px,3.2vw,46px);\n      line-height: 1.8;\n      text-align: center;\n      white-space: pre-wrap;\n      text-shadow: 0 0 22px rgba(247,241,229,.24);\n    }\n    .typewriter-line::after {\n      content:\"\";\n      display:inline-block;\n      width:.08em;\n      height:1.05em;\n      margin-left:.12em;\n      vertical-align:-.14em;\n      background:rgba(247,241,229,.9);\n      animation:caretBlink 840ms steps(1) infinite;\n    }\n    .typewriter-line.done::after { opacity:0; animation:none; }\n    .escape-style-reveal {\n      position:absolute;\n      inset:0;\n      z-index:2;\n      display:grid;\n      place-items:center;\n      padding:\n        max(12px, env(safe-area-inset-top))\n        max(12px, env(safe-area-inset-right))\n        max(12px, env(safe-area-inset-bottom))\n        max(12px, env(safe-area-inset-left));\n      overflow:hidden;\n      background:#000;\n      opacity:0;\n      pointer-events:none;\n      transition:opacity 700ms ease;\n    }\n    .escape-style-reveal.show { opacity:1; pointer-events:auto; }\n    .escape-style-reveal img {\n      display:block;\n      width:100%;\n      height:100%;\n      max-width:760px;\n      min-width:0;\n      min-height:0;\n      object-fit:contain;\n      object-position:center;\n      filter:drop-shadow(0 12px 30px rgba(0,0,0,.58));\n    }\n    .ending-replay {\n      position: absolute;\n      left: 4%;\n      bottom: 6%;\n      color: rgba(220,208,183,.58);\n      font-size: clamp(12px,1.15vw,17px);\n      letter-spacing: .12em;\n      opacity: 0;\n      transition: opacity 700ms;\n    }\n    .ending-replay.show { opacity:1; }\n    @keyframes caretBlink { 50% { opacity:0; } }\n    @media (max-width: 760px) {\n      #storyScreen { padding:6px; }\n      .bubble { padding:5px 7px; font-size:clamp(8px,1.85vw,12px); line-height:1.3; }\n      .b1,.b2,.b3,.b4,.b5,.b6 { max-width:30%; }\n      .panel-title { top:8px; left:8px; }\n      .game-hud { top:8px; right:8px; padding:5px 7px; }\n    }\n  ",
      body: "<section class=\"screen active\" id=\"storyScreen\">\n    <main class=\"story-wrap\">\n      <section class=\"stage\" id=\"stage\" role=\"button\" tabindex=\"0\" aria-label=\"点击逐幕揭开安迪与瑞德的另一种结局\">\n        <div class=\"base\" aria-hidden=\"true\"></div>\n        <div class=\"scene s1 revealed\" data-scene=\"1\"></div>\n        <div class=\"scene s2\" data-scene=\"2\"></div>\n        <div class=\"scene s3\" data-scene=\"3\"></div>\n        <div class=\"scene s4\" data-scene=\"4\"></div>\n        <div class=\"scene s5\" data-scene=\"5\"></div>\n        <div class=\"scene s6\" data-scene=\"6\"></div>\n        <div class=\"mask s2\" data-mask=\"2\"></div>\n        <div class=\"mask s3\" data-mask=\"3\"></div>\n        <div class=\"mask s4\" data-mask=\"4\"></div>\n        <div class=\"mask s5\" data-mask=\"5\"></div>\n        <div class=\"mask s6\" data-mask=\"6\"></div>\n        <div class=\"bubble b1 show\" data-bubble=\"1\">安迪化身为史蒂文斯的假身份，在缅因州的各个银行，将典狱长的不义之财尽数取走……</div>\n        <div class=\"bubble b2\" data-bubble=\"2\">摇下车窗，安迪吹着自由的风，沿着海岸线一路驶向墨西哥……</div>\n        <div class=\"bubble b3\" data-bubble=\"3\">在海滩边，安迪买下了一艘破旧的小船，专心地打磨船身，构建着自己梦想中的新生活。</div>\n        <div class=\"bubble b4\" data-bubble=\"4\">安迪离开后，同伴们一直在讨论他的事迹……</div>\n        <div class=\"bubble b5\" data-bubble=\"5\">安迪的离开和老布的死亡使瑞德在拘禁地里显得更加苍老与孤独，他也不清楚自己脱离拘禁后该何去何从……</div>\n        <div class=\"bubble b6\" data-bubble=\"6\">离开庄园后的瑞德，在超市里做着装袋工，过着体制外的“高墙化”生活……</div>\n      </section>\n      <div class=\"story-hint\" id=\"storyHint\">点击画面继续揭开下一幕</div>\n    </main>\n  </section>\n\n  <section class=\"screen\" id=\"gameScreen\" aria-label=\"安迪与瑞德的左右分屏剧情关卡\">\n    <div class=\"split-ending\">\n      <section class=\"panel\">\n        <canvas id=\"andyCanvas\" width=\"480\" height=\"270\"></canvas>\n        <div class=\"panel-title\">安迪 · 芝华塔尼欧</div>\n        <div class=\"subtitle\" id=\"andySubtitle\"></div>\n      </section>\n      <section class=\"panel\">\n        <canvas id=\"redCanvas\" width=\"480\" height=\"270\"></canvas>\n        <div class=\"panel-title\">瑞德 · 缅因州</div>\n        <div class=\"game-hud\" id=\"gameHud\"></div>\n        <div class=\"controls\" id=\"controls\"><div>WASD / 拖动画面：移动<br>空格 / 轻点画面：工作 / 交谈</div></div>\n        <div class=\"message\" id=\"gameMessage\"></div>\n        <div class=\"subtitle\" id=\"redSubtitle\"></div>\n        <div class=\"sorting-game\" id=\"sortingGame\">\n          <div class=\"sorting-placeholder-panel\">\n            <div class=\"placeholder-heading\">商品已收齐 · 进入排序环节</div>\n            <div class=\"sorting-rule-banner\">经理提示：按重量从下往上摆放，重物在下，易碎品在上。</div>\n            <div class=\"placeholder-art-space\">\n              排序玩法主贴图与操作区域（已预留）<br>\n              下一步可直接放入你提供的新贴图\n            </div>\n            <div class=\"placeholder-items\">\n              <div class=\"placeholder-item\">面粉</div>\n              <div class=\"placeholder-item\">罐头</div>\n              <div class=\"placeholder-item\">面包</div>\n              <div class=\"placeholder-item\">鸡蛋</div>\n            </div>\n          </div>\n          <div class=\"sort-instruction\" id=\"sortInstruction\"></div>\n          <div class=\"product-tray\">\n            <div class=\"tray-title\">物品栏 · 从上到下四格</div>\n            <div class=\"product-list\" id=\"productList\"></div>\n          </div>\n          <div class=\"paper-bag\" id=\"paperBag\">\n            <div class=\"bag-title\">纸袋 · 拖动商品调整上下顺序</div>\n            <div class=\"bag-slots\" id=\"bagSlots\"></div>\n            <button class=\"confirm-bag\" id=\"confirmBag\" type=\"button\">确认装袋</button>\n          </div>\n        </div>\n      </section>\n    </div>\n  </section>\n\n  <section class=\"screen\" id=\"epilogueScreen\" role=\"button\" tabindex=\"0\" aria-label=\"第三结局：形同陌路。点击重新播放\">\n    <div class=\"ending-card\">\n      <div class=\"ending-title\">第三结局 · 《形同陌路》</div>\n      <div class=\"typewriter-line\" id=\"typewriterLine\" aria-live=\"polite\"></div>\n    <div class=\"ending-replay\" id=\"endingReplay\">点击画面重新播放</div>\n    <div class=\"escape-style-reveal\" id=\"escapeStyleReveal\" aria-hidden=\"true\"><img id=\"escapeStyleImage\" alt=\"你的脱困风格\"></div>\n    </div>\n  </section>\n\n  <audio id=\"bgm\" src=\"../assets/ending-three/ending3_bgm.mp4\" loop preload=\"auto\"></audio>",
      mount(scope) {
        const document = scope.document;
        const window = scope.window;
        const endingContext = scope.endingContext;
        "use strict";
            const $ = (selector) => document.querySelector(selector);
            const storyScreen = $("#storyScreen");
            const gameScreen = $("#gameScreen");
            const epilogueScreen = $("#epilogueScreen");
            const stage = $("#stage");
            const storyHint = $("#storyHint");
            const bgm = $("#bgm");
            const controls = $("#controls");
            const gameHud = $("#gameHud");
            const gameMessage = $("#gameMessage");
            const redSubtitle = $("#redSubtitle");
            const andySubtitle = $("#andySubtitle");
            const sortingLayer = $("#sortingGame");
            const sortInstruction = $("#sortInstruction");
            const productList = $("#productList");
            const bagSlots = $("#bagSlots");
            const paperBag = $("#paperBag");
            const confirmBag = $("#confirmBag");
            const typewriterLine = $("#typewriterLine");
            const endingReplay = $("#endingReplay");
            const escapeStyleReveal = $("#escapeStyleReveal");
            const andyCanvas = $("#andyCanvas");
            const redCanvas = $("#redCanvas");
            const ac = andyCanvas.getContext("2d");
            const rc = redCanvas.getContext("2d");
            ac.imageSmoothingEnabled = rc.imageSmoothingEnabled = false;
        
            let mode = "story";
            let currentScene = 1;
            let musicStarted = false;
            let transitionTimer = 0;
            const keys = new Set();
            const dragInput = {
              active: false,
              pointerId: null,
              startX: 0,
              startY: 0,
              x: 0,
              y: 0,
              moved: false
            };
            const POINTER_DRAG_THRESHOLD = 18;
        
            function startMusic() {
              if (musicStarted) return;
              musicStarted = true;
              bgm.volume = .68;
              bgm.play().catch((error) => {
                musicStarted = false;
                console.debug("[高墙之外] 第三结局音乐等待用户交互", error);
              });
            }
            function showScreen(next) {
              [storyScreen, gameScreen, epilogueScreen].forEach(el => el.classList.toggle("active", el === next));
            }
            function setTextLines(element, lines) {
              element.replaceChildren();
              lines.forEach((line, index) => {
                if (index) element.appendChild(document.createElement("br"));
                element.append(String(line));
              });
            }
            function revealNext() {
              if (mode !== "story" || transitionTimer) return;
              startMusic();
              if (currentScene >= 6) return;
              currentScene++;
              $(`[data-scene="${currentScene}"]`)?.classList.add("revealed");
              $(`[data-mask="${currentScene}"]`)?.classList.add("hidden");
              window.setTimeout(() => $(`[data-bubble="${currentScene}"]`)?.classList.add("show"), 560);
              if (currentScene === 6) {
                storyHint.textContent = "六幕结束 · 即将进入瑞德的超市";
                transitionTimer = window.setTimeout(enterGame, 2100);
              }
              syncEndingControls();
            }
            stage.addEventListener("click", revealNext);
            stage.addEventListener("keydown", e => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); revealNext(); }
            });
        
            const sprite = {
              front: new Image(), back: new Image(), side: new Image(),
              ready: false
            };
            const andyImages = {
              drive: new Image(),
              repair: new Image(),
              ready: false
            };
            const storeImage = new Image();
            const managerImage = new Image();
            const managerSideImage = new Image();
            sprite.front.src = "../assets/main/images/red_walk_down_sheet.webp";
            sprite.back.src = "../assets/main/images/red_walk_up_sheet.webp";
            sprite.side.src = "../assets/main/images/red_walk_side_sheet.webp";
            andyImages.drive.src = "../assets/ending-three/runtime/andy/coast_drive.webp";
            andyImages.repair.src = "../assets/ending-three/runtime/andy/boat_repair.webp";
            storeImage.src = "../assets/ending-three/runtime/store/supermarket_floor.webp";
            managerImage.src = "../assets/ending-three/runtime/manager/manager_front.webp";
            managerSideImage.src = "../assets/ending-three/runtime/manager/manager_side.webp";
            Promise.all(Object.values(sprite).filter(v => v instanceof Image).map(img => new Promise(resolve => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", () => { console.error("图片加载失败：", img.src); resolve(); }, { once: true });
            }))).then(() => { sprite.ready = true; });
            Promise.all([andyImages.drive, andyImages.repair].map(img => new Promise(resolve => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", () => { console.error("图片加载失败：", img.src); resolve(); }, { once: true });
            }))).then(() => { andyImages.ready = true; });
            storeImage.addEventListener("error", () => console.error("图片加载失败：", storeImage.src), { once: true });
            managerImage.addEventListener("error", () => console.error("图片加载失败：", managerImage.src), { once: true });
            managerSideImage.addEventListener("error", () => console.error("图片加载失败：", managerSideImage.src), { once: true });
        
            class CollisionMap {
              constructor(rects) { this.rects = rects; }
              blocked(x,y) {
                return x < 18 || x > 462 || y < 30 || y > 255 ||
                  this.rects.some(r => x > r.x && x < r.x+r.w && y > r.y && y < r.y+r.h);
              }
            }
            class BaggingSystem {
              constructor() {
                this.orders = [
                  [
                    {name:"罐头",kind:"heavy",bag:0},{name:"牛奶",kind:"cold",bag:0},
                    {name:"鸡蛋",kind:"fragile",bag:0},{name:"洗涤剂",kind:"clean",bag:1}
                  ],
                  [
                    {name:"瓶装饮料",kind:"heavy",bag:0},{name:"面包",kind:"food",bag:0},
                    {name:"冷冻食品",kind:"cold",bag:0},{name:"洗涤剂",kind:"clean",bag:1}
                  ],
                  [
                    {name:"罐头",kind:"heavy",bag:0},{name:"纸盒",kind:"food",bag:0},
                    {name:"玻璃瓶",kind:"fragile",bag:0},{name:"洗涤剂",kind:"clean",bag:1}
                  ]
                ];
                this.order = 0; this.index = 0; this.held = null; this.bags = [[],[]];
              }
              current() { return this.orders[this.order]?.[this.index] || null; }
              pick() {
                if (this.held || !this.current()) return false;
                this.held = this.current();
                return true;
              }
              place(bag) {
                if (!this.held) return {ok:false,text:"先到传送带拿起一件商品。"};
                if (bag !== this.held.bag) {
                  const text = this.held.kind === "clean" ? "清洁用品应该分开放。" : "这样装会压坏商品。";
                  this.held = null;
                  return {ok:false,text};
                }
                this.bags[bag].push(this.held);
                this.held = null; this.index++;
                if (this.index >= this.orders[this.order].length) return {ok:true,complete:true};
                return {ok:true,complete:false};
              }
              nextOrder() { this.order++; this.index=0; this.held=null; this.bags=[[],[]]; }
            }
            const productSpots = {
              "罐头": {x:101,y:105,color:"#b99362",location:"左上货架"},
              "瓶装饮料": {x:101,y:105,color:"#8eb3c0",location:"左上货架"},
              "牛奶": {x:248,y:55,color:"#e8e1bd",location:"后方冰柜"},
              "冷冻食品": {x:321,y:55,color:"#92bed0",location:"后方冰柜"},
              "鸡蛋": {x:278,y:105,color:"#ead59a",location:"右上货架"},
              "玻璃瓶": {x:278,y:105,color:"#a9c9c2",location:"右上货架"},
              "面包": {x:133,y:160,color:"#d89c5f",location:"左下货架"},
              "纸盒": {x:133,y:160,color:"#c6a76f",location:"左下货架"},
              "洗涤剂": {x:301,y:160,color:"#83b9a7",location:"右下货架"}
            };
            class RedSupermarketGame {
              constructor() {
                this.player = {x:188,y:188,dir:"front",moving:false,frame:0};
                this.manager = {x:425,y:145};
                this.collision = new CollisionMap([
                  {x:28,y:24,w:112,h:40},{x:150,y:20,w:218,h:54},
                  {x:380,y:27,w:70,h:78},
                  {x:67,y:76,w:130,h:46},{x:232,y:76,w:126,h:46},
                  {x:67,y:140,w:130,h:44},{x:232,y:140,w:126,h:44},
                  {x:19,y:192,w:158,h:48},{x:197,y:196,w:174,h:54},
                  {x:413,y:210,w:43,h:41}
                ]);
                this.bagging = new BaggingSystem();
                this.phase = "orders";
                this.locked = false;
                this.lastMove = performance.now();
                this.inactivityStep = 0;
                this.flash = 0;
                this.clock = 16*60+18;
                this.collectMode = false;
                this.sortMode = false;
                this.bagStation = {x:188,y:218,visualX:164,visualY:218};
                this.collectionItems = [
                  {id:"flour",name:"面粉",x:101,y:105,pickupX:101,pickupY:128,color:"#e3c98f",collected:false},
                  {id:"can",name:"罐头",x:278,y:105,pickupX:278,pickupY:128,color:"#a9c7c9",collected:false},
                  {id:"bread",name:"面包",x:133,y:160,pickupX:133,pickupY:188,color:"#d89c5f",collected:false},
                  {id:"eggs",name:"鸡蛋",x:301,y:160,pickupX:301,pickupY:188,color:"#ead59a",collected:false}
                ];
              }
              startCollection() {
                this.collectMode=true;
                this.sortMode=false;
                this.locked=false;
                this.phase="collect";
                this.player.x=188;this.player.y=188;this.player.dir="front";
                this.collectionItems.forEach(item=>item.collected=false);
                sortingLayer.classList.remove("show","placeholder");
                updateHud();
              }
              collectNearby() {
                if(!this.collectMode||this.locked)return;
                const item=this.collectionItems.find(entry=>!entry.collected&&Math.hypot(this.player.x-entry.pickupX,this.player.y-entry.pickupY)<38);
                if(!item){
                  showMessage("还没到拾取范围。沿货架之间的通道靠近发光框；按钮变亮时再拾取。",1900);
                  return;
                }
                item.collected=true;
                this.flash=.42;
                const count=this.collectionItems.filter(entry=>entry.collected).length;
                showMessage(`已拿取：${item.name}（${count} / 4）`,1100);
                updateHud();
                if(count===this.collectionItems.length){
                  this.locked=true;
                  this.collectMode=false;
                  playDialogue([
                    ["经理","瑞德，把这四件商品拿到装袋台。"],
                    ["经理","按照重量摆放：重物在下，易碎品放在最上面。"],
                    ["瑞德","是，先生。"]
                  ],()=>{
                    this.phase="toBag";
                    this.locked=false;
                    updateHud();
                    showMessage("前往下方装袋台，靠近后按空格或轻点画面开始装袋。",2400);
                  });
                }
              }
              canInteract() {
                if(this.locked)return false;
                if(this.collectMode){
                  return this.collectionItems.some(entry=>!entry.collected&&Math.hypot(this.player.x-entry.pickupX,this.player.y-entry.pickupY)<38);
                }
                if(this.phase==="toBag")return Math.hypot(this.player.x-this.bagStation.x,this.player.y-this.bagStation.y)<42;
                if(this.phase==="manager")return Math.hypot(this.player.x-this.manager.x,this.player.y-this.manager.y)<58;
                if(this.phase==="orders"){
                  const currentItem=this.bagging.current();
                  const currentSpot=currentItem?productSpots[currentItem.name]:null;
                  const nearProduct=!!currentSpot&&Math.hypot(this.player.x-currentSpot.x,this.player.y-currentSpot.y)<46;
                  const nearBag=Math.hypot(this.player.x-230,this.player.y-218)<48||Math.hypot(this.player.x-315,this.player.y-218)<48;
                  return nearProduct||nearBag;
                }
                return false;
              }
              actionLabel() {
                if(this.collectMode)return "拾取";
                if(this.phase==="toBag")return "开始装袋";
                if(this.phase==="manager")return "请示";
                if(this.phase==="orders")return this.bagging.held?"放入袋中":"拿取";
                return "互动";
              }
              update(dt, now) {
                if (this.locked) return;
                let dx=dragInput.x,dy=dragInput.y;
                if (keys.has("a")) dx--;
                if (keys.has("d")) dx++;
                if (keys.has("w")) dy--;
                if (keys.has("s")) dy++;
                this.player.moving = !!(dx||dy);
                if (this.player.moving) {
                  this.lastMove = now; this.inactivityStep = 0;
                  const len = Math.hypot(dx,dy) || 1;
                  const nx = this.player.x + dx/len*58*dt, ny = this.player.y + dy/len*58*dt;
                  if (!this.collision.blocked(nx,this.player.y)) this.player.x=nx;
                  if (!this.collision.blocked(this.player.x,ny)) this.player.y=ny;
                  this.player.dir = Math.abs(dx)>Math.abs(dy) ? (dx<0?"left":"right") : (dy<0?"back":"front");
                  this.player.frame = Math.floor(now/170)%4;
                } else this.player.frame=0;
                this.clock += dt*.65;
                this.flash = Math.max(0,this.flash-dt);
                if (this.bagging.order === 2 && this.phase === "orders") {
                  const idle = now-this.lastMove;
                  if (idle>5000 && this.inactivityStep===0) {
                    this.inactivityStep=1; showMessage("没人发出命令。",2000);
                  } else if (idle>7000 && this.inactivityStep===1) {
                    this.inactivityStep=2; showMessage("但瑞德仍然可以自己决定下一步。",2700);
                  }
                }
              }
              interact() {
                if (this.locked) return;
                if(this.collectMode){
                  this.collectNearby();
                  return;
                }
                if(this.phase==="toBag"){
                  if(Math.hypot(this.player.x-this.bagStation.x,this.player.y-this.bagStation.y)<42){
                    sortingGame.start();
                  }else{
                    showMessage("请前往下方收银台旁的发光装袋位置，再按空格或轻点画面。",1500);
                  }
                  return;
                }
                this.lastMove=performance.now();
                if (this.phase === "manager") {
                  if (Math.hypot(this.player.x-this.manager.x,this.player.y-this.manager.y)<58) {
                    this.locked=true;
                    playDialogue([
                      ["瑞德","先生，我能去一趟洗手间吗？"],
                      ["经理","瑞德，你不需要向我请示。你想去就可以去。"],
                      ["瑞德","我只是……还不太习惯。"]
                    ],()=> {
                      this.locked=false; this.phase="orders"; this.bagging.nextOrder();
                      this.flash=1.8; updateHud();
                      showMessage("第三位顾客来了。没人会告诉你下一步。",2800);
                    });
                  } else showMessage("去经理面前按空格或轻点画面请示。");
                  return;
                }
                const p=this.player;
                const currentItem=this.bagging.current();
                const currentSpot=currentItem?productSpots[currentItem.name]:null;
                if (currentSpot&&Math.hypot(p.x-currentSpot.x,p.y-currentSpot.y)<46) {
                  if (this.bagging.pick()) { showMessage(`拿起：${this.bagging.held.name}`,900); updateHud(); }
                  else showMessage(this.bagging.held?"手里已经拿着商品。":"这件商品已经拿走了。");
                  return;
                }
                let bag=-1;
                if (Math.hypot(p.x-230,p.y-218)<48) bag=0;
                if (Math.hypot(p.x-315,p.y-218)<48) bag=1;
                if (bag>=0) {
                  const result=this.bagging.place(bag);
                  showMessage(result.ok?"放置正确。":result.text,result.ok?800:1700);
                  if (result.ok) this.flash=.38;
                  if (result.complete) this.completeOrder();
                  updateHud();
                  return;
                }
                showMessage(currentItem?`靠近发光轮廓最亮的“${currentItem.name}”后按空格或轻点画面。`:"靠近购物袋或经理后按空格或轻点画面。");
              }
              completeOrder() {
                const finished=this.bagging.order;
                this.locked=true;
                if (finished===0) {
                  playDialogue([["经理","很好，瑞德。下一袋也是这样。"]],()=>{
                    this.bagging.nextOrder(); this.locked=false; updateHud();
                    showMessage("第二位顾客：只保留装袋规则。",2200);
                    window.setTimeout(()=>showMessage("以前，每件事都会有人告诉我什么时候开始，什么时候结束。",3200),2400);
                  });
                } else if (finished===1) {
                  showMessage("店里安静下来。瑞德头顶浮出一个省略号……",2200);
                  window.setTimeout(()=> {
                    this.phase="manager"; this.locked=false; updateHud();
                    showMessage("任务：去找经理请示。",3000);
                  },2200);
                } else {
                  this.finish();
                }
              }
              startCustomerOrders() {
                this.bagging=new BaggingSystem();
                this.collectMode=false;
                this.sortMode=false;
                this.locked=false;
                this.phase="orders";
                this.manager.x=425;
                this.manager.y=145;
                this.lastMove=performance.now();
                this.inactivityStep=0;
                updateHud();
                showMessage("第一位顾客来了。先按经理的指令完成装袋。",2600);
              }
              finish() {
                this.locked=true; this.phase="done"; this.clock=17*60;
                redSubtitle.textContent="离开庄园后的瑞德，在超市里做着装袋工，过着体制外的“高墙化”生活……";
                redSubtitle.classList.add("show");
                updateHud();
                window.setTimeout(()=>controller.gameFinished(),4000);
              }
            }
            class AndyEndingSequence {
              constructor(){ this.elapsed=0; this.done=false; }
              update(dt) {
                this.elapsed += dt;
                if (this.elapsed >= 7) this.done = true;
              }
              draw() {
                const t=this.elapsed, ctx=ac, w=480,h=270;
                ctx.clearRect(0,0,w,h);
                if(t<6.2) this.drawDrive(ctx,t); else this.drawRepair(ctx,t);
                if(t<1){ctx.fillStyle=`rgba(0,0,0,${1-t})`;ctx.fillRect(0,0,w,h);}
                if(t>5.55&&t<6.55){
                  const wipe=1-Math.abs(t-6.05)/.5;
                  ctx.fillStyle=`rgba(225,238,232,${Math.max(0,wipe)*.58})`;
                  ctx.fillRect(0,0,w,h);
                }
                const text = t>.65&&t<5.6 ? "摇下车窗，安迪吹着自由的风，沿着海岸线一路驶向墨西哥……" :
                  t>6.5 ? "在海滩边，安迪买下了一艘破旧的小船，专心地修整船身，构建着自己梦想中的新生活。" : "";
                if (andySubtitle.textContent!==text) {
                  andySubtitle.textContent=text;
                  andySubtitle.classList.toggle("show",!!text);
                }
              }
              drawDrive(c,t) {
                if(andyImages.drive.complete&&andyImages.drive.naturalWidth){
                  const sway=Math.sin(t*15)*3;
                  this.drawFocusedReference(c,andyImages.drive,sway,0,.68);
                } else {
                  c.fillStyle="#738d98";c.fillRect(0,0,480,270);
                }
                c.save();
                c.globalAlpha=.42;
                for(let i=0;i<15;i++){
                  const y=28+i*17;
                  const x=((i*83-t*420)%620)-120;
                  c.fillStyle=i%3===0?"#f4dfad":"#d8e7df";
                  c.fillRect(x,y,55+(i%4)*20,2+(i%2));
                }
                c.restore();
                c.fillStyle="rgba(248,226,177,.10)";
                c.fillRect(0,0,480,270);
              }
              drawRepair(c,t) {
                const loop=t-6.2;
                if(andyImages.repair.complete&&andyImages.repair.naturalWidth){
                  this.drawFocusedReference(c,andyImages.repair,0,0,.64);
                  this.drawRepairHandMotion(c,andyImages.repair,loop,.64);
                } else {
                  c.fillStyle="#61a6ca";c.fillRect(0,0,480,130);
                  c.fillStyle="#d8b873";c.fillRect(0,130,480,140);
                }
              }
              drawFocusedReference(c,img,offsetX=0,offsetY=0,focusY=.5) {
                const targetAspect=480/270;
                const imageAspect=img.naturalWidth/img.naturalHeight;
                let sx=0,sy=0,sw=img.naturalWidth,sh=img.naturalHeight;
                if(imageAspect<targetAspect){
                  sh=sw/targetAspect;
                  sy=(img.naturalHeight-sh)*focusY;
                } else {
                  sw=sh*targetAspect;
                  sx=(img.naturalWidth-sw)/2;
                }
                c.fillStyle="#101415";
                c.fillRect(0,0,480,270);
                c.drawImage(img,sx,sy,sw,sh,-4+offsetX,-3+offsetY,488,276);
              }
              drawRepairHandMotion(c,img,t,focusY=.64) {
                const targetAspect=480/270;
                const sourceH=img.naturalWidth/targetAspect;
                const sourceY=(img.naturalHeight-sourceH)*focusY;
                const scaleX=488/img.naturalWidth;
                const scaleY=276/sourceH;
                const crop={x:700,y:510,w:74,h:140};
                const pivot={x:711,y:622};
                const mask=[
                  [728,515],[772,528],[772,573],[751,582],
                  [755,621],[739,646],[710,632],[706,598],[718,570]
                ];
                const pivotX=-4+pivot.x*scaleX;
                const pivotY=-3+(pivot.y-sourceY)*scaleY;
                const angle=-.035+Math.sin(t*7.2)*.055;
                c.save();
                c.beginPath();
                mask.forEach(([x,y],index)=>{
                  const px=-4+x*scaleX;
                  const py=-3+(y-sourceY)*scaleY;
                  if(index===0)c.moveTo(px,py);else c.lineTo(px,py);
                });
                c.closePath();
                c.clip();
                c.translate(pivotX,pivotY);
                c.rotate(angle);
                c.drawImage(
                  img,
                  crop.x,crop.y,crop.w,crop.h,
                  (crop.x-pivot.x)*scaleX,
                  (crop.y-pivot.y)*scaleY,
                  crop.w*scaleX,
                  crop.h*scaleY
                );
                c.restore();
              }
            }
            class SortingBagGame {
              constructor(){
                this.products=[
                  {id:"flour",name:"面粉",src:"../assets/ending-three/runtime/store_items/flour_transparent.webp"},
                  {id:"can",name:"罐头",src:"../assets/ending-three/runtime/store_items/can_transparent.webp"},
                  {id:"bread",name:"面包",src:"../assets/ending-three/runtime/store_items/bread_transparent.webp"},
                  {id:"eggs",name:"鸡蛋",src:"../assets/ending-three/runtime/store_items/eggs_transparent.webp"}
                ];
                this.correct=["flour","can","bread","eggs"];
                this.slots=[null,null,null,null];
                this.selected=null;
                this.locked=false;
                confirmBag.addEventListener("click",()=>this.confirm());
                productList.addEventListener("dragover",event=>{
                  event.preventDefault();
                  event.dataTransfer.dropEffect="move";
                });
                productList.addEventListener("drop",event=>{
                  event.preventDefault();
                  this.returnToInventory(event.dataTransfer.getData("text/plain"));
                });
              }
              start(){
                this.slots=[null,null,null,null];this.selected=null;this.locked=false;
                sortingLayer.classList.remove("placeholder");
                sortingLayer.classList.add("show");
                controller.red.collectMode=false;
                controller.red.sortMode=true;
                controller.red.phase="sorting";
                controller.red.locked=true;
                controls.classList.remove("show");
                gameHud.textContent="装袋排序 · 拖动商品，或先点商品再点格子";
                this.render();
              }
              itemById(id){return this.products.find(item=>item.id===id);}
              makeProduct(item){
                const el=document.createElement("div");
                el.className="sort-product"+(this.selected===item.id?" selected":"");
                const img=document.createElement("img");
                img.src=item.src;img.alt="";
                const label=document.createElement("span");
                label.textContent=item.name;
                el.append(img,label);
                el.draggable=!this.locked;
                el.dataset.itemId=item.id;
                el.addEventListener("click",event=>{
                  event.stopPropagation();
                  if(this.locked)return;
                  const targetSlot=el.parentElement?.classList.contains("bag-slot")?el.parentElement:null;
                  if(this.selected&&this.selected!==item.id&&targetSlot){
                    this.place(this.selected,Number(targetSlot.dataset.level));
                    return;
                  }
                  this.selected=this.selected===item.id?null:item.id;
                  this.render();
                });
                el.addEventListener("dragstart",event=>{
                  if(this.locked){event.preventDefault();return;}
                  event.dataTransfer.setData("text/plain",item.id);
                  event.dataTransfer.effectAllowed="move";
                });
                return el;
              }
              render(){
                sortInstruction.textContent="经理指令：把四件商品从下往上排序。可直接拖动，或先点商品、再点纸袋格子；重物在下，易碎品在上。";
                productList.replaceChildren();
                const placed=new Set(this.slots.filter(Boolean));
                this.products.forEach((item,index)=>{
                  const inventorySlot=document.createElement("div");
                  inventorySlot.className="inventory-slot";
                  inventorySlot.dataset.inventoryIndex=String(index);
                  if(placed.has(item.id)) inventorySlot.textContent="已放入纸袋";
                  else inventorySlot.appendChild(this.makeProduct(item));
                  productList.appendChild(inventorySlot);
                });
                bagSlots.replaceChildren();
                for(let level=3;level>=0;level--){
                  const slot=document.createElement("div");
                  slot.className="bag-slot";
                  slot.dataset.level=String(level);
                  slot.textContent=level===3?"最上层 · 第 4 格":level===0?"最下层 · 第 1 格":`第 ${level+1} 格`;
                  slot.addEventListener("dragover",event=>{event.preventDefault();event.dataTransfer.dropEffect="move";});
                  slot.addEventListener("drop",event=>{
                    event.preventDefault();
                    this.place(event.dataTransfer.getData("text/plain"),level);
                  });
                  slot.addEventListener("click",()=>{
                    if(this.selected)this.place(this.selected,level);
                  });
                  const id=this.slots[level];
                  if(id){
                    slot.textContent="";
                    slot.appendChild(this.makeProduct(this.itemById(id)));
                  }
                  bagSlots.appendChild(slot);
                }
              }
              place(id,level){
                if(this.locked||!this.itemById(id))return;
                const oldLevel=this.slots.indexOf(id);
                const displaced=this.slots[level];
                if(oldLevel>=0)this.slots[oldLevel]=displaced||null;
                this.slots[level]=id;
                this.selected=null;
                this.render();
                showMessage(`已放入第 ${level+1} 层：${this.itemById(id).name}`,750);
              }
              returnToInventory(id){
                if(this.locked)return;
                const level=this.slots.indexOf(id);
                if(level<0)return;
                this.slots[level]=null;
                this.selected=null;
                this.render();
                showMessage(`已将${this.itemById(id).name}放回物品栏`,750);
              }
              confirm(){
                if(this.locked)return;
                const complete=this.slots.every(Boolean);
                if(!complete){showMessage("请先把四件商品全部放入纸袋。",1700);return;}
                const ok=this.slots.every((id,index)=>id===this.correct[index]);
                if(!ok){
                  paperBag.classList.remove("shake");void paperBag.offsetWidth;paperBag.classList.add("shake");
                  [...bagSlots.children].forEach(slot=>{
                    const level=Number(slot.dataset.level);
                    slot.classList.toggle("wrong",this.slots[level]!==this.correct[level]);
                  });
                  showMessage("重物会压坏上面的商品，请重新摆放。",2300);
                  return;
                }
                this.locked=true;
                sortingLayer.classList.remove("show");
                controller.red.sortMode=false;
                controller.red.phase="managerResult";
                controller.red.player.x=268;
                controller.red.player.y=188;
                controller.red.player.dir="right";
                controller.red.manager.x=340;
                controller.red.manager.y=188;
                gameHud.textContent="装袋完成";
                playDialogue([
                 ["瑞德","我这样放……可以吗？"],
                 ["经理","可以，瑞德。你不用每次都等我确认。"],
                 ["瑞德","……"]
                ],()=>{
                  controller.red.startCustomerOrders();
                });
              }
            }
            class SplitEndingController {
              constructor(){ this.andy=new AndyEndingSequence(); this.red=new RedSupermarketGame(); this.last=0; this.rightDone=false; }
              start(){
                mode="game"; showScreen(gameScreen); controls.classList.add("show");
                setTextLines(controls.firstElementChild, [
                  "① 左下摇杆 / WASD：移动瑞德",
                  "② 沿货架之间的通道靠近发光商品",
                  "③ 右下按钮亮起后，按按钮 / 空格拾取"
                ]);
                window.setTimeout(()=>controls.classList.remove("show"),4500);
                this.red.startCollection(); this.last=performance.now(); window.requestAnimationFrame(loop);
              }
              gameFinished(){
                this.rightDone=true;
                window.setTimeout(startEpilogue,350);
              }
              update(dt,now){
                this.andy.update(dt); this.red.update(dt,now);
              }
              draw(){ this.andy.draw(); drawStore(); }
            }
            const controller=new SplitEndingController();
            const sortingGame=new SortingBagGame();
            let epilogueReady=false;
            let epiloguePhase="idle";
            let styleShownAt=0;
            let epilogueTypingTimer=0;
            let endingThanks=null;
            const endingControls=window.BeyondWallsControls.mount({
              adapter:{
                onMove(payload){
                  if(mode!=="game"||controller.red.sortMode||controller.red.locked){dragInput.x=dragInput.y=0;return;}
                  dragInput.x=Number.isFinite(payload.x)?payload.x:0;
                  dragInput.y=Number.isFinite(payload.y)?payload.y:0;
                  if(Math.hypot(dragInput.x,dragInput.y)>.08)startMusic();
                },
                onActionDown(){
                  startMusic();
                  if(mode==="story")revealNext();
                  else if(mode==="game"&&!controller.red.sortMode&&!controller.red.locked)controller.red.interact();
                  else if(mode==="epilogue")advanceEpilogue();
                },
                onActionUp(){}
              }
            });
        
            function syncEndingControls(){
              const thanksState=endingThanks?.getControlState();
              if(thanksState?.active){
                endingControls.setContext({controlsVisible:true,joystickVisible:false,
                  actionVisible:thanksState.actionVisible,actionEnabled:thanksState.actionEnabled,
                  actionLabel:thanksState.actionLabel,actionHighlighted:thanksState.actionEnabled});
                return;
              }
              if(mode==="story"){
                const canContinue=currentScene<6&&!transitionTimer;
                endingControls.setContext({controlsVisible:true,joystickVisible:false,actionVisible:canContinue,
                  actionEnabled:canContinue,actionLabel:"继续",actionHighlighted:canContinue});
                return;
              }
              if(mode==="epilogue"){
                endingControls.setContext({controlsVisible:true,joystickVisible:false,actionVisible:true,
                  actionEnabled:true,actionLabel:epiloguePhase==="typing"?"显示结果":"继续",actionHighlighted:true});
                return;
              }
              const nativeSorting=controller.red.sortMode;
              const playable=!nativeSorting&&!controller.red.locked&&controller.red.phase!=="done";
              endingControls.setContext({controlsVisible:true,joystickVisible:playable,actionVisible:playable,
                actionEnabled:playable,actionLabel:controller.red.actionLabel(),actionHighlighted:playable&&controller.red.canInteract()});
              if(!playable){dragInput.x=dragInput.y=0;}
            }
        
            endingThanks=window.BeyondWallsEndingThanks.mount({
              audio:bgm,
              onStateChange:syncEndingControls
            });
        
            function enterGame(){
              window.clearTimeout(transitionTimer); transitionTimer=0;
              controller.start();
              syncEndingControls();
            }
            function updateHud(){
              syncEndingControls();
              if(controller.red.collectMode){
                const count=controller.red.collectionItems.filter(item=>item.collected).length;
                setTextLines(gameHud, [
                  `任务 1 / 2 · 收集商品 ${count} / 4`,
                  "左下摇杆 / WASD 移动 · 右下按钮 / 空格拾取",
                  "沿货架之间的通道靠近发光商品；靠近后按钮会亮起"
                ]);
                return;
              }
              if(controller.red.phase==="toBag"){
                setTextLines(gameHud, ["经理指令：前往装袋台", "靠近下方发光位置后按空格或轻点画面"]);
                return;
              }
              if(controller.red.sortMode){
                gameHud.textContent="商品已收齐 · 排序玩法区域";
                return;
              }
              const b=controller.red.bagging;
              if(controller.red.phase==="done"){ gameHud.textContent="下班时间 · 工作结束"; return; }
              if(controller.red.phase==="manager"){ setTextLines(gameHud, ["任务：去找经理请示", "靠近经理后按空格或轻点画面"]); return; }
              const item=b.current();
              const spot=item?productSpots[item.name]:null;
              const instructionLines=b.order===0&&item?
                [`经理：去${spot?.location||"货架"}拿${item.name} → ${item.bag===0?"食品袋":"清洁袋"}`]:
                ["规则：重物垫底 / 易碎品在上", "冷藏集中 / 清洁用品分开"];
              setTextLines(gameHud, [
                `顾客 ${b.order+1}/3　商品 ${Math.min(b.index+1,b.orders[b.order].length)}/${b.orders[b.order].length}`,
                ...instructionLines
              ]);
            }
            let messageTimer=0;
            function showMessage(text,duration=1500){
              window.clearTimeout(messageTimer); gameMessage.textContent=text; gameMessage.classList.add("show");
              messageTimer=window.setTimeout(()=>gameMessage.classList.remove("show"),duration);
            }
            function playDialogue(lines,done){
              window.clearTimeout(messageTimer);
              gameMessage.classList.remove("show");
              redSubtitle.classList.add("dialogue-only");
              let i=0;
              function next(){
                if(i>=lines.length){
                  redSubtitle.classList.remove("show");
                  window.setTimeout(()=>{
                    redSubtitle.textContent="";
                    redSubtitle.classList.remove("dialogue-only");
                    done();
                  },300);
                  return;
                }
                const [speaker,text]=lines[i++];
                redSubtitle.textContent=`${speaker}：${text}`;
                redSubtitle.classList.add("show");
                window.setTimeout(next,2050);
              }
              next();
            }
            function drawStore(){
              const c=rc,r=controller.red,w=480,h=270;
              if(storeImage.complete&&storeImage.naturalWidth)c.drawImage(storeImage,0,0,w,h);
              else {c.fillStyle="#444b4c";c.fillRect(0,0,w,h);}
              if(r.collectMode){
                const pulse=.5+.5*Math.sin(performance.now()/240);
                r.collectionItems.filter(item=>!item.collected).forEach(item=>{
                  c.save();
                  c.shadowColor=item.color;
                  c.shadowBlur=7+pulse*8;
                  c.fillStyle=item.color;
                  c.fillRect(item.x-5,item.y-4,10,8);
                  c.strokeStyle=`rgba(255,244,184,${.72+pulse*.28})`;
                  c.lineWidth=2;
                  c.strokeRect(item.x-9,item.y-8,18,16);
                  c.restore();
                });
              } else if(r.phase==="toBag"){
                const pulse=.5+.5*Math.sin(performance.now()/230);
                c.save();
                c.shadowColor="#ffe59a";
                c.shadowBlur=8+pulse*9;
                c.fillStyle="rgba(232,204,137,.72)";
                c.fillRect(r.bagStation.visualX-7,r.bagStation.visualY-5,14,10);
                c.strokeStyle=`rgba(255,241,177,${.72+pulse*.28})`;
                c.lineWidth=2;
                c.strokeRect(r.bagStation.visualX-12,r.bagStation.visualY-10,24,20);
                c.restore();
              } else if(!r.sortMode&&r.phase==="orders"){
                const orderItems=r.bagging.orders[r.bagging.order]||[];
                const pulse=.5+.5*Math.sin(performance.now()/280);
                orderItems.slice(r.bagging.index).forEach((item,index)=>{
                  const spot=productSpots[item.name];
                  if(!spot)return;
                  c.save();
                  c.shadowColor=index===0?"#fff1a6":"rgba(190,225,201,.8)";
                  c.shadowBlur=index===0?5+pulse*5:3+pulse*2;
                  c.fillStyle=spot.color;
                  c.fillRect(spot.x-5,spot.y-4,10,8);
                  c.strokeStyle=index===0?`rgba(255,244,174,${.78+pulse*.22})`:"rgba(192,224,205,.62)";
                  c.lineWidth=index===0?2:1;
                  c.strokeRect(spot.x-7,spot.y-6,14,12);
                  c.restore();
                });
                if(r.bagging.order===0&&r.bagging.current()){
                  const bx=r.bagging.current().bag===0?230:315;
                  c.strokeStyle="rgba(255,231,160,.92)";c.lineWidth=2;c.strokeRect(bx-24,208,48,34);
                }
              }
              drawManager(c,r.manager.x,r.manager.y,r.phase==="managerResult");
              drawPlayer(c,r);
              if(r.bagging.held){c.fillStyle="#f0d797";c.fillRect(r.player.x-4,r.player.y-25,9,7);c.strokeStyle="#2a211a";c.strokeRect(r.player.x-4,r.player.y-25,9,7);}
              if(r.phase==="manager"){c.fillStyle="#f4e1ad";c.font="bold 12px monospace";c.fillText("!",r.manager.x-3,r.manager.y-23);}
              if(r.flash>0){c.fillStyle=`rgba(194,215,229,${Math.min(.22,r.flash*.12)})`;c.fillRect(0,0,w,h);}
              c.fillStyle="rgba(17,19,20,.11)";
              if(r.bagging.order>=1) for(let x=365;x<480;x+=13)c.fillRect(x,0,5,270);
            }
            function drawNpc(c,x,y,type){
              c.fillStyle="#24211f";c.fillRect(x-5,y-19,10,8);
              c.fillStyle=type==="manager"?"#786752":"#9b8e78";c.fillRect(x-6,y-11,12,13);
              c.fillStyle="#252928";c.fillRect(x-5,y+2,4,6);c.fillRect(x+1,y+2,4,6);
            }
            function drawManager(c,x,y,useSide=false){
              const image=useSide?managerSideImage:managerImage;
              if(image.complete&&image.naturalWidth){
                const height=42;
                const width=Math.round(height*image.naturalWidth/image.naturalHeight);
                c.save();
                c.imageSmoothingEnabled=false;
                c.drawImage(image,Math.round(x-width/2),y+6-height,width,height);
                c.restore();
              }else{
                drawNpc(c,x,y,"manager");
              }
            }
            function drawPlayer(c,r){
              const p=r.player, frame=p.moving?p.frame:0;
              let img=p.dir==="front"?sprite.front:p.dir==="back"?sprite.back:sprite.side;
              if(sprite.ready&&img.naturalWidth){
                c.save();
                c.imageSmoothingEnabled=false;
                if(p.dir==="left"){
                  c.translate(p.x,0);c.scale(-1,1);
                  c.drawImage(img,frame*48,0,48,64,-16,p.y-36,32,42);
                }else{
                  c.drawImage(img,frame*48,0,48,64,p.x-16,p.y-36,32,42);
                }
                c.restore();
              } else drawNpc(c,p.x,p.y,"red");
            }
            function loop(now){
              if(mode!=="game") return;
              const dt=Math.min(.05,(now-controller.last)/1000);controller.last=now;
              controller.update(dt,now);controller.draw();syncEndingControls();window.requestAnimationFrame(loop);
            }
            function resetDragInput(){
              dragInput.active=false;
              dragInput.pointerId=null;
              dragInput.x=0;
              dragInput.y=0;
              dragInput.moved=false;
              redCanvas.classList.remove("is-dragging");
            }
            redCanvas.addEventListener("pointerdown",event=>{
              if(mode!=="game"||dragInput.active||event.isPrimary===false)return;
              if(event.pointerType==="mouse"&&event.button!==0)return;
              dragInput.active=true;
              dragInput.pointerId=event.pointerId;
              dragInput.startX=event.clientX;
              dragInput.startY=event.clientY;
              dragInput.x=0;
              dragInput.y=0;
              dragInput.moved=false;
              redCanvas.classList.add("is-dragging");
              redCanvas.setPointerCapture?.(event.pointerId);
              event.preventDefault();
            });
            redCanvas.addEventListener("pointermove",event=>{
              if(!dragInput.active||event.pointerId!==dragInput.pointerId)return;
              const dx=event.clientX-dragInput.startX;
              const dy=event.clientY-dragInput.startY;
              const distance=Math.hypot(dx,dy);
              dragInput.moved=dragInput.moved||distance>=POINTER_DRAG_THRESHOLD;
              if(distance>=POINTER_DRAG_THRESHOLD){
                dragInput.x=dx/distance;
                dragInput.y=dy/distance;
              }else{
                dragInput.x=0;
                dragInput.y=0;
              }
              event.preventDefault();
            });
            redCanvas.addEventListener("pointerup",event=>{
              if(!dragInput.active||event.pointerId!==dragInput.pointerId)return;
              const shouldInteract=!dragInput.moved&&mode==="game";
              resetDragInput();
              if(shouldInteract)controller.red.interact();
              event.preventDefault();
            });
            redCanvas.addEventListener("pointercancel",event=>{
              if(event.pointerId===dragInput.pointerId)resetDragInput();
            });
            redCanvas.addEventListener("lostpointercapture",event=>{
              if(event.pointerId===dragInput.pointerId)resetDragInput();
            });
            addEventListener("keydown",e=>{
              const key=e.key.toLowerCase();
              if(["w","a","s","d"," "].includes(key)) e.preventDefault();
              if(mode==="story"&&key===" "&&e.target!==stage&&!e.repeat){
                revealNext();
              }else if(mode==="game"){
                if(key===" "&&!e.repeat) controller.red.interact();
                else keys.add(key);
              }
            });
            addEventListener("keyup",e=>keys.delete(e.key.toLowerCase()));
            addEventListener("blur",()=>{
              keys.clear();
              resetDragInput();
            });
            function showEscapeStyle(){
              if(epiloguePhase==="style"||epiloguePhase==="thanks")return;
              window.clearTimeout(epilogueTypingTimer);
              typewriterLine.textContent="接下来是你的脱困风格";
              typewriterLine.classList.add("done");
              endingReplay.classList.add("show");
              escapeStyleReveal.classList.add("show");
              escapeStyleReveal.setAttribute("aria-hidden","false");
              epilogueReady=true;
              epiloguePhase="style";
              styleShownAt=performance.now();
              syncEndingControls();
            }
            function startThanks(force){
              if(!endingThanks||endingThanks.isActive())return;
              if(!force&&performance.now()-styleShownAt<520)return;
              epiloguePhase="thanks";
              escapeStyleReveal.classList.remove("show");
              escapeStyleReveal.setAttribute("aria-hidden","true");
              endingThanks.start();
              syncEndingControls();
            }
            function advanceEpilogue(){
              if(endingThanks?.isActive()){
                endingThanks.advance();
              }else if(epiloguePhase==="typing"){
                showEscapeStyle();
              }else if(epiloguePhase==="style"){
                startThanks(false);
              }
            }
            function startEpilogue(){
              if(mode==="epilogue") return;
              mode="epilogue";epilogueReady=false;bgm.volume=.24;showScreen(epilogueScreen);syncEndingControls();
              epiloguePhase="typing";styleShownAt=0;
              typewriterLine.textContent="";
              typewriterLine.classList.remove("done");
              endingReplay.classList.remove("show");
              escapeStyleReveal.classList.remove("show");
              escapeStyleReveal.setAttribute("aria-hidden", "true");
              const text="接下来是你的脱困风格";
              let i=0;
              function typeNext(){
                typewriterLine.textContent=text.slice(0,i);
                if(i<text.length){i++;epilogueTypingTimer=window.setTimeout(typeNext,82);}
                else{
                  showEscapeStyle();
                }
              }
              epilogueTypingTimer=window.setTimeout(typeNext,450);
            }
            epilogueScreen.addEventListener("click",advanceEpilogue);
            epilogueScreen.addEventListener("keydown",event=>{
              if(event.key==="Enter"||event.key===" "){event.preventDefault();advanceEpilogue();}
            });
            window.addEventListener("pagehide",()=>{endingThanks.destroy();endingControls.destroy();},{once:true});
            syncEndingControls();
        
            /* 自动化验收入口，不影响正常游玩。 */
            window.__endingTest = {
              state:()=>({mode,epilogueReady,epiloguePhase,thanksPage:endingThanks.getPageIndex()}),
              showThanks:()=>{if(mode!=="epilogue"){mode="epilogue";showScreen(epilogueScreen);}epiloguePhase="typing";showEscapeStyle();startThanks(true);},
              enterGame:()=>{ if(mode==="story") enterGame(); },
              completeGame:()=>{ if(mode!=="game") enterGame(); controller.andy.elapsed=22;controller.andy.done=true;controller.red.finish(); },
              collectItem:index=>{
                const item=controller.red.collectionItems[index];
                if(!item||!controller.red.collectMode)return false;
                controller.red.player.x=item.pickupX;controller.red.player.y=item.pickupY;
                controller.red.interact();
                return true;
              },
              enterBagging:()=>{
                if(controller.red.phase!=="toBag")return false;
                controller.red.player.x=controller.red.bagStation.x;
                controller.red.player.y=controller.red.bagStation.y;
                controller.red.interact();
                return true;
              },
              state:()=>({
                mode,currentScene,order:controller.red.bagging.order,phase:controller.red.phase,
                collected:controller.red.collectionItems.filter(item=>item.collected).length,
                collectMode:controller.red.collectMode,sortMode:controller.red.sortMode,
                andyDone:controller.andy.done,
                player:{x:controller.red.player.x,y:controller.red.player.y}
              })
            };
            const autotestMode=new URLSearchParams("").get("autotest");
            if (autotestMode === "complete") {
              window.setTimeout(() => window.__endingTest.completeGame(), 180);
            } else if(autotestMode === "collectall"){
              window.setTimeout(()=>{
                window.__endingTest.enterGame();
                [0,1,2,3].forEach((index,step)=>window.setTimeout(()=>window.__endingTest.collectItem(index),220+step*260));
                window.setTimeout(()=>window.__endingTest.enterBagging(),7800);
              },180);
            }
      }
    })
  });
})();
