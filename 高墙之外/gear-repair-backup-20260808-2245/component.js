(function () {
"use strict";
const runtime = window.BeyondWallsReactRuntime;
const source = window.BeyondWallsMiniGameSources && window.BeyondWallsMiniGameSources.gear;
if (!runtime) throw new Error("Missing shared React runtime for gear");
if (!source) throw new Error("Missing mini-game source: gear");

window.BeyondWallsMiniGames = window.BeyondWallsMiniGames || {};
window.BeyondWallsMiniGames.gear = {
  mount(rootElement, options) {
    if (!rootElement) throw new Error("Missing mini-game root: gear");
    source.setMountOptions(options);
    const reactRoot = runtime.ReactDOM.createRoot(rootElement);
    reactRoot.render(runtime.jsxRuntime.jsx(source.Component, {}));
    let destroyed = false;
    return {
      get api() { return source.getApi(); },
      destroy() {
        if (destroyed) return;
        destroyed = true;
        reactRoot.unmount();
        source.clearMountOptions();
      }
    };
  }
};
})();
