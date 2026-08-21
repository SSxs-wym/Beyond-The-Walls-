(function () {
  "use strict";

  let current = null;
  const escapeStyleCards = Object.freeze({
    insight: Object.freeze({ src: "../四张图片/01_Insight.webp", label: "洞察者" }),
    action: Object.freeze({ src: "../四张图片/02_Action.webp", label: "突围者" }),
    intuition: Object.freeze({ src: "../四张图片/03_Intuition.webp", label: "策局者" }),
    perception: Object.freeze({ src: "../四张图片/04_Perception.webp", label: "潜行者" })
  });
  const defaultEscapeStyleReason = "你依靠耐心与长线规划走到最后，因此被判定为策局者。";
  const escapeStyleLayoutCss = `
    .escape-style-reveal.has-playstyle-result {
      grid-template-columns: minmax(0, .78fr) minmax(210px, .62fr);
      grid-template-rows: minmax(0, 1fr);
      gap: clamp(16px, 3vw, 42px);
      align-items: center;
      justify-content: center;
      padding:
        max(12px, env(safe-area-inset-top))
        max(18px, env(safe-area-inset-right))
        max(12px, env(safe-area-inset-bottom))
        max(18px, env(safe-area-inset-left));
    }
    .escape-style-reveal.has-playstyle-result img {
      width: 100%;
      height: 100%;
      max-width: 430px;
      max-height: 100%;
      min-width: 0;
      min-height: 0;
      justify-self: end;
      object-fit: contain;
    }
    .escape-style-reason {
      width: min(100%, 420px);
      margin: 0;
      padding: clamp(14px, 2.2vw, 24px);
      border: 1px solid rgba(211, 177, 108, .46);
      background: rgba(12, 10, 8, .86);
      color: #ead9b5;
      font-family: "KaiTi", "STKaiti", "Microsoft YaHei", serif;
      font-size: clamp(15px, 1.8vw, 24px);
      line-height: 1.75;
      letter-spacing: .04em;
      text-align: left;
      text-shadow: 0 2px 8px rgba(0, 0, 0, .78);
      box-shadow: 0 12px 34px rgba(0, 0, 0, .38);
    }
    @media (orientation: portrait), (max-width: 700px) {
      .escape-style-reveal.has-playstyle-result {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: minmax(0, 1fr) auto;
        gap: 10px;
        padding:
          max(10px, env(safe-area-inset-top))
          max(10px, env(safe-area-inset-right))
          max(10px, env(safe-area-inset-bottom))
          max(10px, env(safe-area-inset-left));
      }
      .escape-style-reveal.has-playstyle-result img {
        width: 100%;
        height: 100%;
        max-height: 100%;
        justify-self: center;
      }
      .escape-style-reason {
        justify-self: center;
        padding: 10px 12px;
        font-size: clamp(13px, 3.8vw, 18px);
        line-height: 1.55;
        text-align: center;
      }
    }
  `;

  function normalizeEscapeStyle(options) {
    const requested = options && options.escapeStyle;
    const id = requested && escapeStyleCards[requested.id] ? requested.id : "intuition";
    const card = escapeStyleCards[id];
    const reason = requested && typeof requested.reason === "string" && requested.reason.trim() ?
      requested.reason.trim().slice(0, 180) : defaultEscapeStyleReason;
    return Object.freeze({
      id,
      src: card.src,
      label: card.label,
      reason
    });
  }

  function normalizeEvidenceSnapshot(options) {
    const requested = options && options.evidenceSnapshot;
    const requestedDirect = requested && requested.direct;
    const hasSnapshot = Boolean(requestedDirect && typeof requestedDirect === "object");
    const direct = {};
    ["brooks", "red", "tommy", "haywood", "floyd"].forEach((id) => {
      direct[id] = hasSnapshot ? requestedDirect[id] === true : true;
    });
    const observedEvidenceIds = requested && Array.isArray(requested.observedEvidenceIds) ?
      [...new Set(requested.observedEvidenceIds.filter((id) => typeof id === "string"))] : [];
    return Object.freeze({
      direct: Object.freeze(direct),
      observedEvidenceIds: Object.freeze(observedEvidenceIds)
    });
  }

  function mountEscapeStyleResult(shadow, escapeStyle) {
    const reveal = shadow.querySelector("#escapeStyleReveal");
    const image = shadow.querySelector("#escapeStyleImage");
    if (!reveal || !image) {
      throw new Error("Ending escape style view is unavailable.");
    }
    image.src = escapeStyle.src;
    image.alt = `你的脱困风格：${escapeStyle.label}`;
    reveal.classList.add("has-playstyle-result");
    const reason = document.createElement("p");
    reason.className = "escape-style-reason";
    reason.textContent = escapeStyle.reason;
    reveal.appendChild(reason);
  }

  function getHost() {
    const host = document.getElementById("endingHost");
    if (!host) throw new Error("Ending host is unavailable.");
    return host;
  }

  function createControlsFactory() {
    return Object.freeze({
      mount(options) {
        const controls = window.BeyondWallsMainControls;
        if (!controls) throw new Error("Main game controls are unavailable.");
        const settings = options || {};
        if (settings.adapter) controls.setAdapter(settings.adapter);
        let destroyed = false;
        return Object.freeze({
          setContext(context) {
            if (!destroyed) controls.setContext(context);
          },
          setAdapter(adapter) {
            if (!destroyed) controls.setAdapter(adapter);
          },
          releaseAll() {
            if (!destroyed) controls.releaseAll();
          },
          destroy() {
            if (destroyed) return;
            destroyed = true;
            controls.releaseAll();
          }
        });
      }
    });
  }

  function createScopedWindow(shadow, endingContext) {
    const eventListeners = [];
    const pagehideListeners = [];
    const timeouts = new Set();
    const intervals = new Set();
    const animationFrames = new Set();
    const localProperties = new Map();
    const controlsFactory = createControlsFactory();
    let proxy = null;
    let destroyed = false;

    function trackEvent(target, type, listener, options) {
      if (!target || typeof target.addEventListener !== "function" || typeof listener !== "function") return;
      target.addEventListener(type, listener, options);
      eventListeners.push({ target, type, listener, options });
    }

    function untrackEvent(target, type, listener, options) {
      target.removeEventListener(type, listener, options);
      const index = eventListeners.findIndex((entry) =>
        entry.target === target && entry.type === type && entry.listener === listener
      );
      if (index >= 0) eventListeners.splice(index, 1);
    }

    function addWindowEvent(type, listener, options) {
      if (destroyed || typeof listener !== "function") return;
      if (type === "load") {
        queueMicrotask(() => {
          if (!destroyed) listener.call(proxy, new Event("load"));
        });
        return;
      }
      if (type === "pagehide") {
        pagehideListeners.push(listener);
        return;
      }
      trackEvent(window, type, listener, options);
    }

    function removeWindowEvent(type, listener, options) {
      if (type === "pagehide") {
        const index = pagehideListeners.indexOf(listener);
        if (index >= 0) pagehideListeners.splice(index, 1);
        return;
      }
      untrackEvent(window, type, listener, options);
    }

    function setScopedTimeout(callback, delay, ...args) {
      const id = window.setTimeout((...callbackArgs) => {
        timeouts.delete(id);
        if (!destroyed) callback(...callbackArgs);
      }, delay, ...args);
      timeouts.add(id);
      return id;
    }

    function clearScopedTimeout(id) {
      timeouts.delete(id);
      window.clearTimeout(id);
    }

    function setScopedInterval(callback, delay, ...args) {
      const id = window.setInterval((...callbackArgs) => {
        if (!destroyed) callback(...callbackArgs);
      }, delay, ...args);
      intervals.add(id);
      return id;
    }

    function clearScopedInterval(id) {
      intervals.delete(id);
      window.clearInterval(id);
    }

    function requestScopedAnimationFrame(callback) {
      const id = window.requestAnimationFrame((timestamp) => {
        animationFrames.delete(id);
        if (!destroyed) callback(timestamp);
      });
      animationFrames.add(id);
      return id;
    }

    function cancelScopedAnimationFrame(id) {
      animationFrames.delete(id);
      window.cancelAnimationFrame(id);
    }

    const visualViewportProxy = window.visualViewport ? new Proxy(window.visualViewport, {
      get(target, property) {
        if (property === "addEventListener") {
          return (type, listener, options) => trackEvent(target, type, listener, options);
        }
        if (property === "removeEventListener") {
          return (type, listener, options) => untrackEvent(target, type, listener, options);
        }
        const value = Reflect.get(target, property, target);
        return typeof value === "function" ? value.bind(target) : value;
      }
    }) : null;

    const thanksFactory = Object.freeze({
      mount(options) {
        if (!window.BeyondWallsEndingThanks) throw new Error("Ending thanks module is unavailable.");
        return window.BeyondWallsEndingThanks.mount(Object.assign({}, options || {}, {
          target: shadow,
          onReplay: endingContext.replay,
          onReplayEnding: endingContext.replayEnding,
          getAchievementProgress: endingContext.getAchievementProgress,
          onReturnToTitle: endingContext.returnToTitle
        }));
      }
    });

    proxy = new Proxy(window, {
      get(target, property) {
        if (localProperties.has(property)) return localProperties.get(property);
        if (property === "window" || property === "self" || property === "globalThis") return proxy;
        if (property === "BeyondWallsControls") return controlsFactory;
        if (property === "BeyondWallsEndingThanks") return thanksFactory;
        if (property === "addEventListener") return addWindowEvent;
        if (property === "removeEventListener") return removeWindowEvent;
        if (property === "setTimeout") return setScopedTimeout;
        if (property === "clearTimeout") return clearScopedTimeout;
        if (property === "setInterval") return setScopedInterval;
        if (property === "clearInterval") return clearScopedInterval;
        if (property === "requestAnimationFrame") return requestScopedAnimationFrame;
        if (property === "cancelAnimationFrame") return cancelScopedAnimationFrame;
        if (property === "visualViewport") return visualViewportProxy;
        const value = Reflect.get(target, property, target);
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(_target, property, value) {
        localProperties.set(property, value);
        return true;
      }
    });

    function destroy() {
      if (destroyed) return;
      destroyed = true;
      const event = new Event("pagehide");
      pagehideListeners.splice(0).forEach((listener) => {
        try { listener.call(proxy, event); } catch (error) { console.error(error); }
      });
      eventListeners.splice(0).forEach(({ target, type, listener, options }) => {
        target.removeEventListener(type, listener, options);
      });
      timeouts.forEach((id) => window.clearTimeout(id));
      intervals.forEach((id) => window.clearInterval(id));
      animationFrames.forEach((id) => window.cancelAnimationFrame(id));
      timeouts.clear();
      intervals.clear();
      animationFrames.clear();
      shadow.querySelectorAll("audio,video").forEach((media) => {
        try {
          media.pause();
          media.currentTime = 0;
        } catch (error) {
          console.debug("[高墙之外] 结局媒体清理失败", error);
        }
      });
    }

    return { proxy, trackEvent, untrackEvent, destroy };
  }

  function createScopedDocument(shadow, host, body, scopedWindow) {
    return new Proxy(document, {
      get(target, property) {
        if (property === "body") return body;
        if (property === "documentElement") return host;
        if (property === "defaultView") return scopedWindow.proxy;
        if (property === "getElementById") {
          return (id) => typeof shadow.getElementById === "function" ?
            shadow.getElementById(id) : shadow.querySelector(`[id="${CSS.escape(id)}"]`);
        }
        if (property === "querySelector") return shadow.querySelector.bind(shadow);
        if (property === "querySelectorAll") return shadow.querySelectorAll.bind(shadow);
        if (property === "addEventListener") {
          return (type, listener, options) => scopedWindow.trackEvent(document, type, listener, options);
        }
        if (property === "removeEventListener") {
          return (type, listener, options) => scopedWindow.untrackEvent(document, type, listener, options);
        }
        const value = Reflect.get(target, property, target);
        return typeof value === "function" ? value.bind(target) : value;
      }
    });
  }

  function close() {
    if (!current) return;
    const closing = current;
    current = null;
    closing.scopedWindow.destroy();
    closing.shadow.replaceChildren();
    closing.host.hidden = true;
    closing.host.removeAttribute("data-ending");
    closing.host.setAttribute("aria-hidden", "true");
  }

  function mountEnding(id, options) {
    const definitions = window.BeyondWallsEndingDefinitions;
    const definition = definitions && definitions[id];
    if (!definition) throw new Error(`Unknown ending: ${String(id)}`);
    const escapeStyle = normalizeEscapeStyle(options);
    const evidenceSnapshot = normalizeEvidenceSnapshot(options);
    close();

    const host = getHost();
    const shadow = host.shadowRoot || host.attachShadow({ mode: "open" });
    const endingContext = {
      replay() {
        queueMicrotask(() => mountEnding(id, { escapeStyle, evidenceSnapshot }));
      },
      replayEnding(endingId) {
        queueMicrotask(() => mountEnding(endingId, { escapeStyle, evidenceSnapshot }));
      },
      getEscapeStyle: () => escapeStyle,
      getEvidenceSnapshot: () => evidenceSnapshot,
      getAchievementProgress() {
        if (typeof window.BeyondWallsGetAchievementProgress !== "function") {
          return { unlocked: 0, total: 0 };
        }
        return window.BeyondWallsGetAchievementProgress();
      },
      returnToTitle() {
        queueMicrotask(() => {
          close();
          if (typeof window.BeyondWallsReturnToTitle === "function") {
            window.BeyondWallsReturnToTitle();
          }
        });
      }
    };
    const scopedWindow = createScopedWindow(shadow, endingContext);
    const style = document.createElement("style");
    style.textContent = `
      :host { display:block; width:100%; height:100%; overflow:hidden; background:#000; color-scheme:dark; }
      .ending-body { box-sizing:border-box; width:100%; height:100%; margin:0; overflow:hidden; }
      ${definition.css}
      ${escapeStyleLayoutCss}
    `;
    const body = document.createElement("div");
    body.className = "ending-body";
    const parsed = new DOMParser().parseFromString(definition.body, "text/html");
    Array.from(parsed.body.childNodes).forEach((node) => {
      body.appendChild(document.importNode(node, true));
    });
    shadow.replaceChildren(style, body);
    const scopedDocument = createScopedDocument(shadow, host, body, scopedWindow);
    mountEscapeStyleResult(shadow, escapeStyle);
    current = { id, host, shadow, scopedWindow, escapeStyle, evidenceSnapshot };
    host.dataset.ending = id;
    host.hidden = false;
    host.setAttribute("aria-hidden", "false");
    host.setAttribute("aria-label", definition.title);
    try {
      definition.mount({ document: scopedDocument, window: scopedWindow.proxy, endingContext });
      host.focus({ preventScroll: true });
    } catch (error) {
      close();
      throw error;
    }
  }

  window.BeyondWallsEndingHost = Object.freeze({
    open: mountEnding,
    close,
    replay() {
      if (!current) return;
      const id = current.id;
      const escapeStyle = current.escapeStyle;
      current.scopedWindow.proxy.setTimeout(() => mountEnding(id, { escapeStyle }), 0);
    },
    isActive: () => Boolean(current),
    getActiveId: () => current ? current.id : null
  });
})();
