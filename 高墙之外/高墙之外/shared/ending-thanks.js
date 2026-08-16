(function () {
  "use strict";

  const scriptUrl = document.currentScript && document.currentScript.src
    ? document.currentScript.src
    : new URL("./ending-thanks.js", document.baseURI).href;
  const styleUrl = new URL("./ending-thanks.css?v=8.9-thanks2", scriptUrl).href;
  const imageRoot = new URL("../assets/main/images/", scriptUrl);
  const mainGameUrl = new URL("../index.html", scriptUrl).href;

  const PAGES = Object.freeze([
    Object.freeze({
      actor: "andy",
      speaker: "安迪",
      text: "墙会把人困住很久，却不能替人决定要走向哪里。\n谢谢你，陪我们把这条路走到了最后。"
    }),
    Object.freeze({
      actor: "red",
      speaker: "瑞德",
      text: "故事停在这里，你的路还在继续。\n愿你始终记得，墙外有风，也有值得奔赴的生活。"
    }),
    Object.freeze({
      heading: "致屏幕前的你",
      speaker: "",
      developer: true,
      lowerMusic: true,
      text: "此刻，我也想认真地向屏幕前的你道一声谢谢。\n\n谢谢你愿意把时间交给《壁垒之外》，愿意听完他们的话，\n走过那些缓慢、艰难，也未必总有答案的时刻。"
    }),
    Object.freeze({
      heading: "致屏幕前的你",
      speaker: "",
      developer: true,
      final: true,
      text: "对一个创作者而言，作品被人认真地看见，就是它最幸运的结局。\n这一次，是你陪他们走到了墙外。\n从这里离开以后，愿你也始终拥有走向自己墙外的勇气。\n——《壁垒之外》"
    })
  ]);

  const ACTOR_ASSETS = Object.freeze({
    andyViews: new URL("andy_views_transparent.webp", imageRoot).href,
    andyWalk: new URL("andy_walk_right.webp", imageRoot).href,
    andyWalkLeft: new URL("andy_walk_left.webp", imageRoot).href,
    redWalk: new URL("red_walk_side_sheet.webp", imageRoot).href,
    redFront: new URL("red.webp", imageRoot).href
  });

  function ensureStyle() {
    if (document.querySelector('link[data-beyond-walls-thanks="style"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = styleUrl;
    link.dataset.beyondWallsThanks = "style";
    document.head.appendChild(link);
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = src;
    });
  }

  function createActorRenderer(canvas) {
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    let actor = null;
    let moving = false;
    let direction = "right";
    let frame = 0;
    let animationTimer = 0;
    let loadToken = 0;
    const images = {};

    function clear() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawSource(image, source, drawHeight, flip) {
      if (!image) return;
      const ratio = source.w / Math.max(1, source.h);
      const drawWidth = Math.round(drawHeight * ratio);
      const x = Math.round((canvas.width - drawWidth) / 2);
      const y = Math.round(canvas.height - drawHeight - 4);
      context.save();
      if (flip) {
        context.translate(x + drawWidth, y);
        context.scale(-1, 1);
        context.drawImage(image, source.x, source.y, source.w, source.h, 0, 0, drawWidth, drawHeight);
      } else {
        context.drawImage(image, source.x, source.y, source.w, source.h, x, y, drawWidth, drawHeight);
      }
      context.restore();
    }

    function drawAndy() {
      const views = images.andyViews;
      const walk = images.andyWalk;
      if (!views) return;
      if (!moving) {
        drawSource(views, { x: 479, y: 47, w: 283, h: 640 }, 352);
        return;
      }
      if (frame % 2 === 0 || !walk) {
        drawSource(views, { x: 1433, y: 55, w: 266, h: 632 }, 344, direction === "left");
      } else {
        const leftWalk = images.andyWalkLeft;
        if (direction === "left" && leftWalk) {
          drawSource(leftWalk, { x: 371, y: 143, w: 465, h: 914 }, 344);
        } else {
          drawSource(walk, { x: 404, y: 134, w: 461, h: 958 }, 344);
        }
      }
    }

    function drawRed() {
      const image = moving ? images.redWalk : images.redFront;
      if (!image) return;
      const frameCount = moving ? 4 : 3;
      const sourceWidth = image.naturalWidth / frameCount;
      const index = moving ? frame % frameCount : 0;
      drawSource(image, {
        x: index * sourceWidth,
        y: 0,
        w: sourceWidth,
        h: image.naturalHeight
      }, moving ? 326 : 352);
    }

    function draw() {
      clear();
      if (actor === "andy") drawAndy();
      if (actor === "red") drawRed();
    }

    function stopAnimation() {
      window.clearInterval(animationTimer);
      animationTimer = 0;
    }

    function syncAnimation() {
      stopAnimation();
      frame = 0;
      draw();
      if (!moving || !actor) return;
      animationTimer = window.setInterval(() => {
        frame += 1;
        draw();
      }, actor === "andy" ? 140 : 170);
    }

    async function setActor(nextActor, nextMoving) {
      actor = nextActor || null;
      moving = Boolean(nextMoving);
      const token = ++loadToken;
      if (actor === "andy") {
        const loaded = await Promise.all([
          images.andyViews || loadImage(ACTOR_ASSETS.andyViews),
          images.andyWalk || loadImage(ACTOR_ASSETS.andyWalk),
          images.andyWalkLeft || loadImage(ACTOR_ASSETS.andyWalkLeft)
        ]);
        if (token !== loadToken) return;
        images.andyViews = loaded[0];
        images.andyWalk = loaded[1];
        images.andyWalkLeft = loaded[2];
      } else if (actor === "red") {
        const loaded = await Promise.all([
          images.redWalk || loadImage(ACTOR_ASSETS.redWalk),
          images.redFront || loadImage(ACTOR_ASSETS.redFront)
        ]);
        if (token !== loadToken) return;
        images.redWalk = loaded[0];
        images.redFront = loaded[1];
      }
      if (token !== loadToken) return;
      syncAnimation();
    }

    function setMoving(nextMoving, nextDirection) {
      moving = Boolean(nextMoving);
      if (nextDirection) direction = nextDirection;
      syncAnimation();
    }

    function destroy() {
      loadToken += 1;
      stopAnimation();
      clear();
    }

    return { setActor, setMoving, destroy };
  }

  function defaultReturnToTitle() {
    if (window.parent && window.parent !== window) {
      window.parent.location.href = mainGameUrl;
      return;
    }
    window.location.href = mainGameUrl;
  }

  function mount(options) {
    ensureStyle();
    const settings = options || {};
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const root = createElement("section", "bwt-root");
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
    root.setAttribute("aria-label", "角色与开发者感谢谢幕");

    const stage = createElement("div", "bwt-stage");
    const actorZone = createElement("div", "bwt-actor-zone");
    actorZone.setAttribute("aria-hidden", "true");
    const beam = createElement("div", "bwt-spotlight-beam");
    const pool = createElement("div", "bwt-spotlight-pool");
    const actorElement = createElement("div", "bwt-actor");
    const actorCanvas = createElement("canvas");
    actorCanvas.width = 320;
    actorCanvas.height = 420;
    actorElement.appendChild(actorCanvas);
    actorZone.append(beam, pool, actorElement);

    const copy = createElement("article", "bwt-copy");
    copy.setAttribute("aria-live", "polite");
    const heading = createElement("p", "bwt-heading");
    const speaker = createElement("h2", "bwt-speaker");
    const text = createElement("p", "bwt-text");
    copy.append(heading, speaker, text);

    const hint = createElement("p", "bwt-hint", "点击画面 / 空格键继续");
    hint.setAttribute("aria-hidden", "true");
    const actions = createElement("div", "bwt-actions");
    actions.hidden = true;
    const replayButton = createElement("button", "bwt-button", "重看本结局");
    replayButton.type = "button";
    const titleButton = createElement("button", "bwt-button bwt-button-primary", "返回标题");
    titleButton.type = "button";
    actions.append(replayButton, titleButton);

    stage.append(actorZone, copy, hint, actions);
    root.appendChild(stage);
    (settings.target || document.body).appendChild(root);

    const actorRenderer = createActorRenderer(actorCanvas);
    let active = false;
    let destroyed = false;
    let pageIndex = -1;
    let phase = "hidden";
    let timer = 0;
    let typingTimer = 0;
    let audioFrame = 0;
    let audioLowered = false;

    function emitState() {
      if (typeof settings.onStateChange !== "function") return;
      settings.onStateChange(getControlState());
    }

    function setPhase(nextPhase) {
      phase = nextPhase;
      emitState();
    }

    function clearTimers() {
      window.clearTimeout(timer);
      window.clearTimeout(typingTimer);
      timer = 0;
      typingTimer = 0;
    }

    function getPage() {
      return PAGES[pageIndex] || null;
    }

    function getControlState() {
      if (!active) return { active: false };
      if (phase === "final") {
        return { active: true, actionVisible: false, actionEnabled: false, actionLabel: "" };
      }
      if (phase === "transition") {
        return { active: true, actionVisible: true, actionEnabled: false, actionLabel: "" };
      }
      return {
        active: true,
        actionVisible: true,
        actionEnabled: true,
        actionLabel: phase === "typing" ? "显示全文" : "继续"
      };
    }

    function lowerMusic() {
      if (audioLowered || !settings.audio) return;
      audioLowered = true;
      const audio = settings.audio;
      const startVolume = Number.isFinite(audio.volume) ? audio.volume : 1;
      const targetVolume = Math.max(0, Math.min(1, startVolume * .3));
      if (reduceMotion) {
        audio.volume = targetVolume;
        return;
      }
      const startedAt = performance.now();
      window.cancelAnimationFrame(audioFrame);
      function fade(now) {
        const progress = Math.max(0, Math.min(1, (now - startedAt) / 1500));
        const eased = 1 - Math.pow(1 - progress, 3);
        audio.volume = Math.max(0, Math.min(1, startVolume + (targetVolume - startVolume) * eased));
        if (progress < 1) audioFrame = window.requestAnimationFrame(fade);
      }
      audioFrame = window.requestAnimationFrame(fade);
    }

    function finishText() {
      const page = getPage();
      if (!page) return;
      window.clearTimeout(typingTimer);
      text.textContent = page.text;
      text.classList.remove("is-typing");
      hint.classList.toggle("is-shown", !page.final);
      hint.setAttribute("aria-hidden", page.final ? "true" : "false");
      if (page.final) {
        actions.hidden = false;
        window.requestAnimationFrame(() => actions.classList.add("is-shown"));
        setPhase("final");
        timer = window.setTimeout(() => titleButton.focus({ preventScroll: true }), 380);
      } else {
        setPhase("ready");
      }
    }

    function typeText() {
      const page = getPage();
      if (!page) return;
      if (reduceMotion) {
        finishText();
        return;
      }
      const characters = Array.from(page.text);
      let index = 0;
      text.textContent = "";
      text.classList.add("is-typing");
      hint.classList.remove("is-shown");
      hint.setAttribute("aria-hidden", "true");
      setPhase("typing");
      function next() {
        index += 1;
        text.textContent = characters.slice(0, index).join("");
        if (index >= characters.length) {
          finishText();
          return;
        }
        const character = characters[index - 1];
        const delay = character === "。" || character === "！" || character === "？"
          ? 380
          : character === "，" || character === "；" || character === "\n"
            ? 190
            : 64;
        typingTimer = window.setTimeout(next, delay);
      }
      typingTimer = window.setTimeout(next, 180);
    }

    function showCopy(instant) {
      copy.classList.add("is-shown");
      if (instant) finishText();
      else typeText();
    }

    function finishEntrance(instantText) {
      if (phase !== "entering") return;
      window.clearTimeout(timer);
      const page = getPage();
      if (page && page.actor) {
        actorElement.classList.remove("is-entering");
        actorElement.classList.add(instantText ? "skip-motion" : "is-stationed");
        actorRenderer.setMoving(false);
        stage.classList.add("actor-lit");
      }
      showCopy(Boolean(instantText));
    }

    function presentPage(presentationOptions) {
      const page = getPage();
      if (!page || destroyed) return;
      const presentation = presentationOptions || {};
      clearTimers();
      stage.className = "bwt-stage";
      copy.classList.remove("is-shown");
      actorElement.className = "bwt-actor";
      hint.classList.remove("is-shown");
      hint.setAttribute("aria-hidden", "true");
      actions.classList.remove("is-shown");
      actions.hidden = true;
      heading.textContent = page.heading || "";
      speaker.textContent = page.speaker || "";
      text.textContent = "";
      text.classList.remove("is-typing");

      if (page.developer) {
        stage.classList.add("is-developer");
        actorRenderer.setActor(null, false);
      } else {
        stage.classList.add("has-actor");
        if (presentation.keepSpotlight) stage.classList.add("actor-lit");
        actorRenderer.setActor(page.actor, true);
        actorElement.classList.add(reduceMotion ? "is-stationed" : "is-entering");
        if (reduceMotion || presentation.keepSpotlight) stage.classList.add("actor-lit");
        else timer = window.setTimeout(() => stage.classList.add("actor-lit"), 260);
      }

      if (page.lowerMusic) lowerMusic();
      setPhase("entering");
      timer = window.setTimeout(
        () => finishEntrance(false),
        reduceMotion ? 10 : page.actor ? 2250 : 520
      );
    }

    function goToPage(nextIndex) {
      if (nextIndex < 0 || nextIndex >= PAGES.length) return;
      clearTimers();
      const currentPage = getPage();
      const nextPage = PAGES[nextIndex];
      setPhase("transition");

      if (!reduceMotion && currentPage?.actor === "andy" && nextPage?.actor === "red") {
        stage.classList.add("is-actor-exiting");
        actorRenderer.setMoving(true, "left");
        actorElement.classList.remove("is-stationed", "skip-motion", "is-entering");
        actorElement.classList.add("is-exiting-left");
        timer = window.setTimeout(() => {
          pageIndex = nextIndex;
          presentPage({ keepSpotlight: true });
        }, 1600);
        return;
      }

      if (!reduceMotion && currentPage?.actor === "red" && nextPage?.developer) {
        stage.classList.add("is-character-fading");
        timer = window.setTimeout(() => {
          pageIndex = nextIndex;
          presentPage();
        }, 1400);
        return;
      }

      stage.classList.add("is-leaving");
      timer = window.setTimeout(() => {
        pageIndex = nextIndex;
        presentPage();
      }, reduceMotion ? 10 : 480);
    }

    function advance() {
      if (!active || destroyed) return false;
      if (phase === "entering") {
        finishEntrance(true);
        return true;
      }
      if (phase === "typing") {
        finishText();
        return true;
      }
      if (phase === "ready") {
        goToPage(pageIndex + 1);
        return true;
      }
      return phase === "transition" || phase === "final";
    }

    function start() {
      if (destroyed || active) return;
      active = true;
      pageIndex = 0;
      root.hidden = false;
      root.setAttribute("aria-hidden", "false");
      window.requestAnimationFrame(() => root.classList.add("is-visible"));
      presentPage();
    }

    function handleRootClick(event) {
      if (event.target.closest("button")) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      advance();
    }

    function handleKeyDown(event) {
      if (!active || destroyed || event.repeat || event.target.closest("button")) return;
      if (event.key !== " " && event.key !== "Enter") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      advance();
    }

    replayButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (typeof settings.onReplay === "function") settings.onReplay();
      else window.location.reload();
    });
    titleButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (typeof settings.onReturnToTitle === "function") settings.onReturnToTitle();
      else defaultReturnToTitle();
    });
    root.addEventListener("click", handleRootClick);
    window.addEventListener("keydown", handleKeyDown, true);

    function destroy() {
      if (destroyed) return;
      destroyed = true;
      active = false;
      clearTimers();
      window.cancelAnimationFrame(audioFrame);
      actorRenderer.destroy();
      root.removeEventListener("click", handleRootClick);
      window.removeEventListener("keydown", handleKeyDown, true);
      root.remove();
    }

    return Object.freeze({
      start,
      advance,
      destroy,
      isActive: () => active,
      getControlState,
      getPageIndex: () => pageIndex
    });
  }

  window.BeyondWallsEndingThanks = Object.freeze({ mount });
})();
