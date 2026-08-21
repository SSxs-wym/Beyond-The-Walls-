import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceExtensions = new Set([".html", ".js", ".mjs", ".json", ".css", ".md", ".txt"]);
const runtimeRoots = [
  "index.html", "game", "shared", "齿轮校准互动空间", "整理图书互动空间",
  "地下水管迷宫", "一结局"
];
const excludedVendor = path.normalize("shared/react-runtime.js");
const legacyStorageKeys = [
  "shawshank_game_bgm_time",
  "shawshank_pixel_escape_checkpoint",
  "shawshank_pixel_escape_save_v2",
  "shawshank_yard_navigation_map_v1",
  "shawshank_pipe_navigation_map_v1"
];
const legacyEnglishBrandPattern = new RegExp("shaw" + "shank", "i");

function walk(entryPath) {
  const absolute = path.join(projectRoot, entryPath);
  if (!fs.existsSync(absolute)) return [];
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(entryPath, entry.name);
    return entry.isDirectory() ? walk(relative) : [path.join(projectRoot, relative)];
  });
}

function relative(filePath) {
  return path.relative(projectRoot, filePath);
}

function fail(filePath, message) {
  throw new Error(`${relative(filePath)}: ${message}`);
}

const entryPath = path.join(projectRoot, "index.html");
assert.ok(fs.existsSync(entryPath), "index.html must stay at the project root");
const indexSource = fs.readFileSync(entryPath, "utf8");
assert.match(indexSource, /<base href="\.\/game\/">/, "index.html must use the neutral game base path");
assert.match(indexSource, /<title>高墙之外<\/title>/, "browser title must be 高墙之外");

for (const unwantedDirectory of ["output", ".playwright-cli", "converted_images_png", "__MACOSX"]) {
  assert.ok(!fs.existsSync(path.join(projectRoot, unwantedDirectory)), `${unwantedDirectory} must not ship`);
}

const runtimeFiles = runtimeRoots.flatMap(walk).filter((filePath) => sourceExtensions.has(path.extname(filePath)));
const authoredRuntimeFiles = runtimeFiles.filter((filePath) => relative(filePath) !== excludedVendor);
const forbiddenRuntimePatterns = [
  [/\bfetch\s*\(/, "fetch is forbidden"],
  [/\bXMLHttpRequest\b/, "XMLHttpRequest is forbidden"],
  [/\baxios\b/i, "axios is forbidden"],
  [/\bWebSocket\b/, "WebSocket is forbidden"],
  [/<iframe\b/i, "iframe is forbidden"],
  [/<a\b/i, "anchor navigation is forbidden"],
  [/\bwindow\.open\s*\(/, "window.open is forbidden"],
  [/(?:window\.)?location\.(?:href|assign|replace)\b/, "external location changes are forbidden"],
  [/(?:src|href)\s*=\s*["'](?:https?:)?\/\//i, "remote src/href is forbidden"],
  [/url\(\s*["']?(?:https?:)?\/\//i, "remote CSS resources are forbidden"]
];

for (const filePath of authoredRuntimeFiles) {
  const source = fs.readFileSync(filePath, "utf8");
  for (const [pattern, message] of forbiddenRuntimePatterns) {
    if (pattern.test(source)) fail(filePath, message);
  }
  if (/catch\s*(?:\([^)]*\))?\s*\{\s*\}/s.test(source)) fail(filePath, "silent catch block is forbidden");
  if (/\.catch\(\s*\(\s*\)\s*=>\s*\{\s*\}\s*\)/s.test(source)) fail(filePath, "empty Promise rejection handler is forbidden");
}

const allSourceFiles = walk(".").filter((filePath) => sourceExtensions.has(path.extname(filePath)));
for (const filePath of allSourceFiles) {
  let source = fs.readFileSync(filePath, "utf8");
  for (const forbiddenText of ["壁" + "垒", "黑墙" + "庄园", "Beyond the high" + " walls", "——《互动" + "空间》"]) {
    if (source.includes(forbiddenText)) fail(filePath, `legacy text remains: ${forbiddenText}`);
  }
  for (const legacyKey of legacyStorageKeys) source = source.replaceAll(legacyKey, "");
  if (legacyEnglishBrandPattern.test(source)) fail(filePath, "legacy English brand remains outside the storage compatibility allowlist");
}

for (const filePath of walk(".")) {
  if (legacyEnglishBrandPattern.test(path.basename(filePath)) || /壁\u5792/i.test(path.basename(filePath))) {
    fail(filePath, "legacy brand remains in a file name");
  }
}

const literalAssetPattern = /(?:\.\.\/|\.\/)[^"'`\\\s)]+?\.(?:webp|png|jpe?g|ico|m4a|mp3|mp4|opus|woff2|js)/gi;
for (const filePath of runtimeFiles) {
  const source = fs.readFileSync(filePath, "utf8").replaceAll('\\"', '"');
  for (const match of source.matchAll(literalAssetPattern)) {
    const reference = match[0];
    if (reference.includes("${")) continue;
    const resolutionBase = reference.startsWith("./") && relative(filePath) !== "index.html"
      ? path.dirname(filePath)
      : path.join(projectRoot, "game");
    const absolute = path.resolve(resolutionBase, reference);
    if (!fs.existsSync(absolute)) fail(filePath, `missing local resource: ${reference}`);
  }
}

for (const menuFrame of ["1.webp", "2.webp", "start_screen_selected.webp"]) {
  assert.ok(fs.existsSync(path.join(projectRoot, "assets", "main", "images", menuFrame)), `missing menu frame: ${menuFrame}`);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8"));
assert.equal(packageJson.license, "UNLICENSED", "package must remain unlicensed");
assert.ok(!packageJson.dependencies || Object.keys(packageJson.dependencies).length === 0, "runtime dependencies must remain bundled locally");

console.log(`Offline compliance checks passed for ${runtimeFiles.length} runtime source files.`);
