(function () {
  "use strict";

  const scriptUrl = document.currentScript && document.currentScript.src
    ? document.currentScript.src
    : new URL("./global-controls.js", document.baseURI).href;
  const styleUrl = new URL("./global-controls.css", scriptUrl).href;
  const baseImageUrl = new URL("../assets/main/images/joystick_base.webp", scriptUrl).href;
  const knobImageUrl = new URL("../assets/main/images/joystick_knob.webp", scriptUrl).href;

  function ensureStyle() {
    if (document.querySelector('link[data-beyond-walls-controls="style"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = styleUrl;
    link.dataset.beyondWallsControls = "style";
    document.head.appendChild(link);
  }

  function emptyAdapter() {
    return {
      onMove: function () {},
      onActionDown: function () {},
      onActionUp: function () {}
    };
  }

  function mount(options) {
    ensureStyle();
    const settings = options || {};
    const parent = settings.target || document.body;
    const root = document.createElement("div");
    root.className = "bwc-controls";
    root.setAttribute("aria-label", "游戏控制");
    root.style.setProperty("--bwc-joystick-base", 'url("' + (settings.baseImage || baseImageUrl) + '")');
    root.style.setProperty("--bwc-joystick-knob", 'url("' + (settings.knobImage || knobImageUrl) + '")');

    const joystick = document.createElement("div");
    joystick.className = "bwc-control bwc-joystick";
    joystick.setAttribute("role", "button");
    joystick.setAttribute("aria-label", "移动摇杆");
    const knob = document.createElement("span");
    knob.className = "bwc-joystick-knob";
    joystick.appendChild(knob);

    const action = document.createElement("button");
    action.type = "button";
    action.className = "bwc-control bwc-action";
    action.setAttribute("aria-label", "交互");

    root.append(joystick, action);
    parent.appendChild(root);

    let adapter = Object.assign(emptyAdapter(), settings.adapter || {});
    let context = {
      controlsVisible: true,
      joystickVisible: false,
      actionVisible: false,
      actionEnabled: true,
      actionLabel: "",
      actionHighlighted: false
    };
    let stickPointer = null;
    let actionPointer = null;
    let actionHeld = false;
    let destroyed = false;
    let lastKeys = "";

    function movePayload(x, y) {
      const deadzone = 0.18;
      const keys = {
        w: y < -deadzone,
        a: x < -deadzone,
        s: y > deadzone,
        d: x > deadzone
      };
      return { x: x, y: y, keys: keys };
    }

    function emitMove(x, y, force) {
      const payload = movePayload(x, y);
      const signature = [payload.keys.w, payload.keys.a, payload.keys.s, payload.keys.d, x.toFixed(3), y.toFixed(3)].join(":");
      if (!force && signature === lastKeys) return;
      lastKeys = signature;
      adapter.onMove(payload);
    }

    function updateStick(event) {
      const rect = joystick.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const max = Math.max(1, rect.width * .42);
      let dx = event.clientX - centerX;
      let dy = event.clientY - centerY;
      const length = Math.hypot(dx, dy);
      if (length > max) {
        dx = dx / length * max;
        dy = dy / length * max;
      }
      knob.style.transform = "translate(calc(-50% + " + dx + "px), calc(-50% + " + dy + "px))";
      emitMove(dx / max, dy / max, false);
    }

    function releaseStick(pointerId) {
      if (stickPointer === null || (pointerId !== undefined && pointerId !== stickPointer)) return;
      stickPointer = null;
      knob.style.transform = "translate(-50%, -50%)";
      emitMove(0, 0, true);
    }

    function releaseAction(pointerId) {
      if (!actionHeld || (pointerId !== undefined && actionPointer !== pointerId)) return;
      actionHeld = false;
      actionPointer = null;
      action.classList.remove("is-held");
      adapter.onActionUp();
    }

    function releaseAll() {
      releaseStick();
      releaseAction();
    }

    function applyContext() {
      root.hidden = !context.controlsVisible;
      joystick.hidden = !context.controlsVisible || !context.joystickVisible;
      action.hidden = !context.controlsVisible || !context.actionVisible;
      action.disabled = !context.actionEnabled;
      action.textContent = context.actionLabel || "";
      action.setAttribute("aria-label", context.actionLabel || "交互");
      action.classList.toggle("is-highlighted", Boolean(context.actionHighlighted));
      if (joystick.hidden) releaseStick();
      if (action.hidden || action.disabled) releaseAction();
    }

    function setContext(nextContext) {
      context = Object.assign({}, context, nextContext || {});
      applyContext();
    }

    function setAdapter(nextAdapter) {
      releaseAll();
      adapter = Object.assign(emptyAdapter(), nextAdapter || {});
    }

    function onJoystickDown(event) {
      if (destroyed) return;
      event.preventDefault();
      // 新的按压可以自动清理未正常结束的旧指针，避免摇杆卡死在上次方向。
      if (stickPointer !== null) releaseStick();
      stickPointer = event.pointerId;
      try { joystick.setPointerCapture(event.pointerId); } catch (_error) {}
      updateStick(event);
    }

    function onActionDown(event) {
      if (destroyed || action.disabled || actionHeld) return;
      event.preventDefault();
      actionPointer = event.pointerId;
      actionHeld = true;
      action.classList.add("is-held");
      try { action.setPointerCapture(event.pointerId); } catch (_error) {}
      adapter.onActionDown();
    }

    function onWindowMove(event) {
      if (event.pointerId === stickPointer) {
        event.preventDefault();
        updateStick(event);
      }
    }

    function onWindowRelease(event) {
      releaseStick(event.pointerId);
      releaseAction(event.pointerId);
    }

    function onInterrupted() {
      releaseAll();
    }

    function onWindowMouseOut(event) {
      if (!event.relatedTarget) releaseAll();
    }

    joystick.addEventListener("pointerdown", onJoystickDown);
    action.addEventListener("pointerdown", onActionDown);
    window.addEventListener("pointermove", onWindowMove, { passive: false });
    // 在捕获阶段释放，避免子组件 stopPropagation() 后方向无法归零。
    window.addEventListener("pointerup", onWindowRelease, true);
    window.addEventListener("pointercancel", onWindowRelease, true);
    window.addEventListener("mouseup", onInterrupted, true);
    window.addEventListener("mouseout", onWindowMouseOut);
    joystick.addEventListener("lostpointercapture", onWindowRelease);
    action.addEventListener("lostpointercapture", onWindowRelease);
    window.addEventListener("blur", onInterrupted);
    window.addEventListener("pagehide", onInterrupted);
    document.addEventListener("visibilitychange", onInterrupted);

    applyContext();

    return {
      setContext: setContext,
      setAdapter: setAdapter,
      releaseAll: releaseAll,
      destroy: function () {
        if (destroyed) return;
        destroyed = true;
        releaseAll();
        joystick.removeEventListener("pointerdown", onJoystickDown);
        action.removeEventListener("pointerdown", onActionDown);
        window.removeEventListener("pointermove", onWindowMove);
        window.removeEventListener("pointerup", onWindowRelease, true);
        window.removeEventListener("pointercancel", onWindowRelease, true);
        window.removeEventListener("mouseup", onInterrupted, true);
        window.removeEventListener("mouseout", onWindowMouseOut);
        joystick.removeEventListener("lostpointercapture", onWindowRelease);
        action.removeEventListener("lostpointercapture", onWindowRelease);
        window.removeEventListener("blur", onInterrupted);
        window.removeEventListener("pagehide", onInterrupted);
        document.removeEventListener("visibilitychange", onInterrupted);
        root.remove();
      }
    };
  }

  window.BeyondWallsControls = Object.freeze({ mount: mount });
})();
