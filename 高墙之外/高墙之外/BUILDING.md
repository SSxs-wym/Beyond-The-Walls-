# 可复现构建

三个小游戏都以各自目录中的 `source.js` 为唯一源码，`component.js` 是生成文件，不应手工修改。React 与 ReactDOM 只由 `shared/react-runtime.js` 提供；小游戏产物不会再次内置 React。

要求：Node.js 20 或更高版本。构建不下载依赖。

```powershell
npm run build
npm test
```

`npm run build` 会用 `scripts/build-mini-games.mjs` 确定性生成三个 `component.js`。`npm run build:check` 只检查生成文件是否与源码一致，适合发布前或 CI 使用；发现手工修改或漏构建时会以非零状态退出。

发布时只需在根目录 `index.html` 更新一次 `window.BeyondWallsAssetVersion`，再运行 `npm run build`；构建脚本会把所有脚本 URL 同步为该版本。`npm test` 会检查共享 React runtime、三个小游戏产物和动态 CSS 是否使用该统一版本。
