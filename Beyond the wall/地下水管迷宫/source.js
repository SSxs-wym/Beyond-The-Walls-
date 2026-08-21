(function () {
"use strict";
let __bwmMountOptions = null;
const __bwmRuntime = window.BeyondWallsReactRuntime;
if (!__bwmRuntime) throw new Error("Load shared/react-runtime.js before 地下水管迷宫/source.js");
const _ = __bwmRuntime.React;
const v = __bwmRuntime.ReactDOM;
const T = __bwmRuntime.jsxRuntime;
var y = Object.freeze({
	up: Object.freeze({
		name: "up",
		bit: 1,
		opposite: 4,
		dx: 0,
		dy: -1
	}),
	right: Object.freeze({
		name: "right",
		bit: 2,
		opposite: 8,
		dx: 1,
		dy: 0
	}),
	down: Object.freeze({
		name: "down",
		bit: 4,
		opposite: 1,
		dx: 0,
		dy: 1
	}),
	left: Object.freeze({
		name: "left",
		bit: 8,
		opposite: 2,
		dx: -1,
		dy: 0
	})
}), b = Object.values(y);
function x(e) {
	let t = String(e), n = 2166136261;
	for (let e = 0; e < t.length; e += 1) n ^= t.charCodeAt(e), n = Math.imul(n, 16777619);
	return n >>> 0;
}
function ee(e) {
	let t = x(e) || 2654435769;
	return () => {
		t += 1831565813;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function S(e, t, n) {
	return t * n + e;
}
function C(e, t, n, r) {
	return e >= 0 && t >= 0 && e < n && t < r;
}
function te(e, t, n) {
	let r = ee(e), i = Array(t * n).fill(0), a = new Set([S(0, 0, t)]), o = [{
		x: 0,
		y: 0
	}];
	for (; o.length > 0;) {
		let e = o[o.length - 1], s = b.filter((r) => {
			let i = e.x + r.dx, o = e.y + r.dy;
			return C(i, o, t, n) && !a.has(S(i, o, t));
		});
		if (s.length === 0) {
			o.pop();
			continue;
		}
		let c = s[Math.floor(r() * s.length)], l = {
			x: e.x + c.dx,
			y: e.y + c.dy
		}, u = S(e.x, e.y, t), d = S(l.x, l.y, t);
		i[u] |= c.bit, i[d] |= c.opposite, a.add(d), o.push(l);
	}
	return i;
}
function ne(e, t, n) {
	let r = S(0, 0, t), i = [{
		x: 0,
		y: 0
	}], a = new Map([[r, 0]]), o = /* @__PURE__ */ new Map();
	for (let n = 0; n < i.length; n += 1) {
		let r = i[n], s = S(r.x, r.y, t);
		for (let n of b) {
			if ((e[s] & n.bit) === 0) continue;
			let c = {
				x: r.x + n.dx,
				y: r.y + n.dy
			}, l = S(c.x, c.y, t);
			a.has(l) || (a.set(l, a.get(s) + 1), o.set(l, s), i.push(c));
		}
	}
	return {
		distance: a,
		parent: o
	};
}
function re(e, t, n) {
	let r = [], i = S(t.x, t.y, n);
	for (; i !== void 0 && (r.push({
		x: i % n,
		y: Math.floor(i / n)
	}), i !== 0);) i = e.get(i);
	return r.reverse();
}
function w(e, t, n) {
	let { distance: r, parent: i } = ne(e, t, n), a = [];
	for (let e = 0; e < n; e += 1) for (let i = 0; i < t; i += 1) {
		if (i !== t - 1 && e !== n - 1 || i === 0 && e === 0) continue;
		let o = r.get(S(i, e, t)), s = i === t - 1 ? "right" : "down";
		a.push({
			x: i,
			y: e,
			steps: o,
			exitDirection: s,
			penalty: o < 9 ? 9 - o : o > 16 ? o - 16 : 0
		});
	}
	a.sort((e, t) => e.penalty - t.penalty || Math.abs(13 - e.steps) - Math.abs(13 - t.steps));
	let o = a[0];
	return {
		exit: {
			x: o.x,
			y: o.y
		},
		exitDirection: o.exitDirection,
		solution: re(i, o, t),
		solutionSteps: o.steps + 1,
		penalty: o.penalty
	};
}
function ie(e, t = 6, n = 7) {
	let r = null;
	for (let i = 0; i < 160; i += 1) {
		let a = te(`${e}:${i}`, t, n), o = w(a, t, n), s = {
			seed: String(e),
			generation: i,
			columns: t,
			rows: n,
			cells: a,
			start: {
				x: 0,
				y: 0
			},
			...o
		};
		if ((!r || s.penalty < r.penalty || s.penalty === r.penalty && Math.abs(14 - s.solutionSteps) < Math.abs(14 - r.solutionSteps)) && (r = s), s.penalty === 0 && s.solutionSteps >= 11) return s;
	}
	return r;
}
function ae(e, t) {
	return C(t.x, t.y, e.columns, e.rows) ? e.cells[S(t.x, t.y, e.columns)] : 0;
}
function oe(e, t, n) {
	let r = y[n];
	return r ? t.x === e.exit.x && t.y === e.exit.y && n === e.exitDirection ? {
		position: {
			x: t.x + r.dx,
			y: t.y + r.dy
		},
		moved: !0,
		exited: !0
	} : (ae(e, t) & r.bit) === 0 ? {
		position: { ...t },
		moved: !1,
		exited: !1
	} : {
		position: {
			x: t.x + r.dx,
			y: t.y + r.dy
		},
		moved: !0,
		exited: !1
	} : {
		position: { ...t },
		moved: !1,
		exited: !1
	};
}
const PIPE_REFERENCE_NODES = {
	entrance: { x: 0, y: 205 }, leftTop: { x: 180, y: 205 }, leftCurve: { x: 198, y: 225 },
	leftOuterMid: { x: 182, y: 525 }, leftOuterJunction: { x: 158, y: 815 }, leftLowerCurve: { x: 140, y: 958 },
	leftLowerRight: { x: 264, y: 958 }, leftBottomTurn: { x: 264, y: 1197 }, leftBottomJoin: { x: 264, y: 1240 },
	leftBottomLeft: { x: 115, y: 1240 }, leftBottomDead: { x: 115, y: 1088 }, leftBottomRight: { x: 360, y: 1240 },
	leftBottomUp: { x: 360, y: 1100 }, leftBottomArch: { x: 439, y: 1100 }, bottomMiddleLeft: { x: 460, y: 1240 },
	bottomMiddleRight: { x: 672, y: 1240 }, bottomMiddleUp: { x: 672, y: 960 }, leftInnerLower: { x: 268, y: 815 },
	leftInnerCorner: { x: 286, y: 444 }, topLeftJunction: { x: 294, y: 327 }, topCenterJunction: { x: 471, y: 327 },
	topRightDown: { x: 544, y: 327 }, middleRightCorner: { x: 556, y: 440 }, middleRightDead: { x: 760, y: 444 },
	topCenterUp: { x: 471, y: 205 }, topLeftDead: { x: 294, y: 205 }, topULeft: { x: 625, y: 205 },
	topULowLeft: { x: 615, y: 332 }, topULowRight: { x: 738, y: 339 }, topURight: { x: 738, y: 205 },
	topRightJunction: { x: 830, y: 205 }, exit: { x: 1024, y: 205 }, rightUpper: { x: 842, y: 330 },
	rightMiddle: { x: 856, y: 560 }, rightCross: { x: 868, y: 822 }, rightBottom: { x: 868, y: 960 },
	innerTop: { x: 371, y: 444 }, crossLeft: { x: 371, y: 564 }, crossCenter: { x: 458, y: 564 },
	crossRightDead: { x: 754, y: 564 }, verticalTopDead: { x: 458, y: 440 }, verticalMiddle: { x: 458, y: 693 },
	verticalBottomDead: { x: 458, y: 843 }, middleRight: { x: 750, y: 693 }, rightCrossInner: { x: 750, y: 822 },
	rightLowerInner: { x: 750, y: 960 }, innerLowerCross: { x: 371, y: 693 }, innerBottomLeft: { x: 368, y: 958 },
	innerBottomRight: { x: 556, y: 958 }, innerStemDead: { x: 556, y: 1110 }, bottomRightDown: { x: 790, y: 1240 },
	bottomRightEnd: { x: 898, y: 1240 }, bottomRightDead: { x: 892, y: 1080 }
};
const PIPE_REFERENCE_EDGES = [
	["entrance-left-top", "entrance", "leftTop"], ["left-top-curve", "leftTop", "leftCurve"],
	["left-curve-outer-mid", "leftCurve", "leftOuterMid"], ["left-outer-mid-junction", "leftOuterMid", "leftOuterJunction"],
	["left-junction-lower-curve", "leftOuterJunction", "leftLowerCurve"], ["left-lower-horizontal", "leftLowerCurve", "leftLowerRight"],
	["left-lower-right-bottom-turn", "leftLowerRight", "leftBottomTurn"], ["left-bottom-turn-down", "leftBottomTurn", "leftBottomJoin"],
	["left-bottom-dead", "leftBottomLeft", "leftBottomDead"], ["left-bottom-horizontal-left", "leftBottomLeft", "leftBottomJoin"],
	["left-bottom-horizontal-right", "leftBottomJoin", "leftBottomRight"], ["left-bottom-right-up", "leftBottomRight", "leftBottomUp"],
	["left-bottom-arch", "leftBottomUp", "leftBottomArch"], ["left-bottom-arch-down", "leftBottomArch", "bottomMiddleLeft"],
	["bottom-middle-horizontal", "bottomMiddleLeft", "bottomMiddleRight"], ["bottom-middle-right-up", "bottomMiddleRight", "bottomMiddleUp"],
	["left-junction-inner", "leftOuterJunction", "leftInnerLower"], ["left-inner-vertical", "leftInnerLower", "leftInnerCorner"],
	["left-inner-to-top", "leftInnerCorner", "topLeftJunction"], ["top-middle-left", "topLeftJunction", "topCenterJunction"],
	["top-middle-right", "topCenterJunction", "topRightDown"], ["middle-right-down", "topRightDown", "middleRightCorner"],
	["middle-right-dead", "middleRightCorner", "middleRightDead"], ["top-center-up", "topCenterJunction", "topCenterUp"],
	["top-left-dead", "topCenterUp", "topLeftDead"], ["top-u-left", "topCenterUp", "topULeft"],
	["top-u-down-left", "topULeft", "topULowLeft"], ["top-u-low", "topULowLeft", "topULowRight"],
	["top-u-up-right", "topULowRight", "topURight"], ["top-right-horizontal", "topURight", "topRightJunction"],
	["top-exit", "topRightJunction", "exit"], ["right-outer-upper", "topRightJunction", "rightUpper"],
	["right-outer-middle", "rightUpper", "rightMiddle"], ["right-outer-lower", "rightMiddle", "rightCross"],
	["right-outer-bottom", "rightCross", "rightBottom"], ["inner-top-horizontal", "leftInnerCorner", "innerTop"],
	["inner-left-upper", "innerTop", "crossLeft"], ["center-horizontal-left", "crossLeft", "crossCenter"],
	["center-horizontal-right", "crossCenter", "crossRightDead"], ["center-vertical-top", "crossCenter", "verticalTopDead"],
	["center-vertical-middle", "crossCenter", "verticalMiddle"], ["center-vertical-dead", "verticalMiddle", "verticalBottomDead"],
	["middle-horizontal-right", "verticalMiddle", "middleRight"], ["middle-right-vertical", "middleRight", "rightCrossInner"],
	["right-cross-link", "rightCrossInner", "rightCross"], ["right-inner-lower", "rightCrossInner", "rightLowerInner"],
	["right-lower-link", "rightLowerInner", "rightBottom"], ["bottom-middle-link", "rightLowerInner", "bottomMiddleUp"],
	["inner-left-lower", "crossLeft", "innerLowerCross"], ["inner-left-bottom", "innerLowerCross", "innerBottomLeft"],
	["inner-bottom-horizontal", "innerBottomLeft", "innerBottomRight"], ["inner-stem-dead", "innerBottomRight", "innerStemDead"],
	["bottom-right-down", "rightLowerInner", "bottomRightDown"], ["bottom-right-horizontal", "bottomRightDown", "bottomRightEnd"],
	["bottom-right-dead", "bottomRightEnd", "bottomRightDead"]
];
const PIPE_START_NODE_ID = "leftTop", PIPE_EXIT_NODE_ID = "topRightJunction";
const PIPE_DECORATIVE_EDGE_IDS = new Set(["entrance-left-top", "top-exit"]);
const PIPE_SOURCE_BOUNDS = Object.freeze({ minX: 0, maxX: 1024, minY: 205, maxY: 1240 });
function regularizePipeAxis(axis, edgeAxis) {
	let ids = Object.keys(PIPE_REFERENCE_NODES), parent = Object.fromEntries(ids.map((id) => [id, id]));
	function find(id) {
		for (; parent[id] !== id;) parent[id] = parent[parent[id]], id = parent[id];
		return id;
	}
	function union(a, b) {
		a = find(a), b = find(b), a !== b && (parent[b] = a);
	}
	PIPE_REFERENCE_EDGES.forEach(([id, a, b]) => edgeAxis[id] === (axis === "x" ? "vertical" : "horizontal") && union(a, b));
	let groups = new Map();
	ids.forEach((id) => {
		let root = find(id);
		groups.has(root) || groups.set(root, []), groups.get(root).push(id);
	});
	let components = [...groups.values()].map((members) => ({
		members,
		value: members.reduce((sum, id) => sum + PIPE_REFERENCE_NODES[id][axis], 0) / members.length
	})).sort((a, b) => a.value - b.value), clusters = [];
	components.forEach((component) => {
		let cluster = clusters[clusters.length - 1];
		!cluster || component.value - cluster.lastValue > 14 ? clusters.push({ components: [component], lastValue: component.value }) : (cluster.components.push(component), cluster.lastValue = component.value);
	});
	let result = {};
	clusters.forEach((cluster) => {
		let members = cluster.components.flatMap((component) => component.members), value = Math.round(members.reduce((sum, id) => sum + PIPE_REFERENCE_NODES[id][axis], 0) / members.length);
		members.forEach((id) => result[id] = value);
	});
	return result;
}
function pipePoint(node) {
	return { id: node.id, x: node.x, y: node.y };
}
function createFixedPipeMazeSource(seed) {
	let edgeAxis = {}, rawEdges = PIPE_REFERENCE_EDGES.map(([id, aId, bId]) => {
		let a = PIPE_REFERENCE_NODES[aId], b = PIPE_REFERENCE_NODES[bId];
		edgeAxis[id] = Math.abs(b.x - a.x) >= Math.abs(b.y - a.y) ? "horizontal" : "vertical";
		return { id, aId, bId };
	}), xs = regularizePipeAxis("x", edgeAxis), ys = regularizePipeAxis("y", edgeAxis), nodes = {};
	Object.keys(PIPE_REFERENCE_NODES).filter((id) => id !== "entrance" && id !== "exit").forEach((id) => nodes[id] = { id, x: xs[id], y: ys[id], bits: 0, neighbors: {} });
	let edges = rawEdges.filter((edge) => !PIPE_DECORATIVE_EDGE_IDS.has(edge.id));
	edges.forEach((edge) => {
		let a = nodes[edge.aId], bNode = nodes[edge.bId], aDirection, bDirection;
		if (a.x === bNode.x) aDirection = bNode.y > a.y ? "down" : "up", bDirection = bNode.y > a.y ? "up" : "down";
		else if (a.y === bNode.y) aDirection = bNode.x > a.x ? "right" : "left", bDirection = bNode.x > a.x ? "left" : "right";
		else throw new Error(`Pipe edge is not orthogonal: ${edge.id}`);
		if (a.neighbors[aDirection] || bNode.neighbors[bDirection]) throw new Error(`Pipe direction is ambiguous: ${edge.id}`);
		a.neighbors[aDirection] = bNode.id, bNode.neighbors[bDirection] = a.id, a.bits |= y[aDirection].bit, bNode.bits |= y[bDirection].bit;
	});
	let queue = [PIPE_START_NODE_ID], parent = new Map([[PIPE_START_NODE_ID, null]]);
	for (let index = 0; index < queue.length && !parent.has(PIPE_EXIT_NODE_ID); index += 1) {
		let id = queue[index];
		Object.values(nodes[id].neighbors).forEach((nextId) => {
			parent.has(nextId) || (parent.set(nextId, id), queue.push(nextId));
		});
	}
	if (!parent.has(PIPE_EXIT_NODE_ID)) throw new Error("Fixed pipe maze has no route to the exit.");
	let solutionIds = [], cursor = PIPE_EXIT_NODE_ID;
	for (; cursor;) solutionIds.unshift(cursor), cursor = parent.get(cursor);
	let solution = solutionIds.map((id) => pipePoint(nodes[id])), branchPoints = solutionIds.slice(1, -1).reduce((count, id) => count + (Object.keys(nodes[id].neighbors).length >= 3 ? 1 : 0), 0);
	return {
		seed: String(seed), generation: 0, layoutId: "fixed-pipe-network-v1", nodes,
		nodeList: Object.values(nodes), edges, sourceBounds: PIPE_SOURCE_BOUNDS,
		startId: PIPE_START_NODE_ID, exitId: PIPE_EXIT_NODE_ID,
		start: pipePoint(nodes[PIPE_START_NODE_ID]), exit: pipePoint(nodes[PIPE_EXIT_NODE_ID]), exitDirection: "right",
		solution, solutionSteps: solution.length, branchPoints, penalty: 0
	};
}
function getFixedPipeMask(e, t) {
	return t && t.id && e.nodes[t.id] ? e.nodes[t.id].bits : 0;
}
function moveFixedPipeMaze(e, t, n) {
	let direction = y[n], node = t && t.id ? e.nodes[t.id] : null;
	if (!direction || !node) return { position: t ? { ...t } : { ...e.start }, moved: !1, exited: !1 };
	if (node.id === e.exitId && n === e.exitDirection) return {
		position: { id: "pipe-exit", x: e.sourceBounds.maxX, y: node.y }, moved: !0, exited: !0
	};
	let nextId = node.neighbors[n];
	return nextId ? { position: pipePoint(e.nodes[nextId]), moved: !0, exited: !1 } : { position: pipePoint(node), moved: !1, exited: !1 };
}

ie = createFixedPipeMazeSource;
ae = getFixedPipeMask;
oe = moveFixedPipeMaze;
var ce = "1.2.0", TIME_LIMIT = 10, le = 42, E = 20, D = 8 * le + E * 2, ue = 9 * le + E * 2, de = "underground-pipe-blueprint", fe = "地下水管图纸", pe = 86, O = le * .54;
const PIPE_EMBEDDED_LAYOUT_STYLE = `
#root {
	height: 100%;
	min-height: 0;
}
.pipe-game-shell.is-embedded.is-mobile {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	min-height: 0;
}
@media (max-height: 600px) and (orientation: landscape) {
	.pipe-game-shell.is-embedded.is-mobile {
		padding-left: max(14px, env(safe-area-inset-left));
		padding-right: max(14px, env(safe-area-inset-right));
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-maze-canvas {
		height: min(78svh, calc(100svh - 82px), 350px);
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-result-shade {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: max(10px, env(safe-area-inset-top)) max(10px, env(safe-area-inset-right)) max(10px, env(safe-area-inset-bottom)) max(10px, env(safe-area-inset-left));
		touch-action: pan-y;
		overscroll-behavior: contain;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-result-card {
		margin: auto 0;
		padding: 14px 18px 12px;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-result-card h2 {
		margin-bottom: 6px;
		font-size: 18px;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-blueprint {
		min-height: min(150px, 34svh);
		margin-bottom: 8px;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-blueprint img {
		width: min(190px, 50vw);
		max-height: 30svh;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-item-acquired {
		padding: 7px 10px;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-result-card__continuing {
		margin-top: 8px;
	}
}
@media (max-width: 600px) and (max-height: 600px) and (orientation: landscape) {
	.pipe-game-shell.is-embedded.is-mobile {
		grid-template-columns: minmax(104px, 1fr) auto minmax(88px, .72fr);
		column-gap: 6px;
		padding-left: max(8px, env(safe-area-inset-left));
		padding-right: max(8px, env(safe-area-inset-right));
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-game-header {
		grid-template-columns: minmax(44px, 1fr) minmax(44px, 1fr);
		gap: 10px 6px;
		min-width: 0;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-play-rule h1 {
		font-size: 12px;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-play-rule:after {
		font-size: 6px;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-timer {
		width: 88px;
		padding-right: 6px;
		padding-left: 6px;
	}
}
@media (max-width: 520px) and (max-height: 600px) and (orientation: landscape) {
	.pipe-game-shell.is-embedded.is-mobile {
		grid-template-columns: minmax(92px, 1fr) auto minmax(76px, .72fr);
		column-gap: 4px;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-game-header {
		grid-template-columns: minmax(40px, 1fr) minmax(40px, 1fr);
		column-gap: 4px;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-play-rule h1 {
		font-size: 11px;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-timer {
		grid-template-columns: 1fr;
		justify-items: center;
		width: 76px;
		gap: 4px;
	}
	.pipe-game-shell.is-embedded.is-mobile .pipe-timer > span,
	.pipe-game-shell.is-embedded.is-mobile .pipe-timer > i {
		display: none;
	}
}
`;
function k() {
	if (typeof window > "u") return {
		seed: Date.now(),
		embedded: !1,
		nextDestination: null
	};
	let t = __bwmMountOptions || {};
	return {
		seed: t.seed || Date.now(),
		embedded: typeof t.embedded === "boolean" ? t.embedded : !0,
		nextDestination: t.nextDestination || null
	};
}
function he(e, t) {
	let n = {
		source: "pipe-maze",
		version: ce,
		type: e,
		detail: t
	};
	if (__bwmMountOptions && typeof __bwmMountOptions.onEvent === "function") __bwmMountOptions.onEvent(n);
	window.dispatchEvent(new CustomEvent(e.toLowerCase(), { detail: t }));
}
function ge({ name: e }) {
	return /* @__PURE__ */ (0, T.jsx)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, T.jsx)("path", { d: {
			undo: "M4 7h10a5 5 0 0 1 0 10h-2v-2h2a3 3 0 1 0 0-6H4l3 3-1.4 1.4L.2 8l5.4-5.4L7 4z",
			sound: "M3 9v6h4l5 4V5L7 9H3zm12.5 3a4 4 0 0 0-2-3.46v6.92A4 4 0 0 0 15.5 12zm0-7v2.06a6 6 0 0 1 0 9.88V19a8 8 0 0 0 0-14z",
			mute: "M3 9v6h4l5 4V5L7 9H3zm11.7.3-1.4 1.4 1.3 1.3-1.3 1.3 1.4 1.4 1.3-1.3 1.3 1.3 1.4-1.4-1.3-1.3 1.3-1.3-1.4-1.4-1.3 1.3z"
		}[e] })
	});
}
function _e(e) {
	return {
		x: E + (e.x - PIPE_SOURCE_BOUNDS.minX) / (PIPE_SOURCE_BOUNDS.maxX - PIPE_SOURCE_BOUNDS.minX) * (D - E * 2),
		y: E + (e.y - PIPE_SOURCE_BOUNDS.minY) / (PIPE_SOURCE_BOUNDS.maxY - PIPE_SOURCE_BOUNDS.minY) * (ue - E * 2)
	};
}
function ve(e, t, n, r, i) {
	e.beginPath(), e.moveTo(Math.round(t), Math.round(n)), e.lineTo(Math.round(r), Math.round(i)), e.lineCap = "square", e.lineWidth = 28, e.strokeStyle = "#080706", e.stroke(), e.lineWidth = 23, e.strokeStyle = "#292925", e.stroke(), e.lineWidth = 17, e.strokeStyle = "#686451", e.stroke(), e.lineWidth = 12, e.strokeStyle = "#3f402f", e.stroke(), e.setLineDash([5, 7]), e.lineDashOffset = 2, e.lineWidth = 2, e.strokeStyle = "rgba(151, 145, 98, 0.34)", e.stroke(), e.setLineDash([]);
}
function ye(e, t, n) {
	e.fillStyle = "#080706", e.fillRect(t.x - 15, t.y - 15, 30, 30), e.fillStyle = "#292925", e.fillRect(t.x - 12, t.y - 12, 24, 24), e.fillStyle = "#66614e", e.fillRect(t.x - 9, t.y - 9, 18, 18), e.fillStyle = "#3f402f", e.fillRect(t.x - 6, t.y - 6, 12, 12), (n & y.up.bit) !== 0 && e.fillRect(t.x - 6, t.y - 15, 12, 15), (n & y.right.bit) !== 0 && e.fillRect(t.x, t.y - 6, 15, 12), (n & y.down.bit) !== 0 && e.fillRect(t.x - 6, t.y, 12, 15), (n & y.left.bit) !== 0 && e.fillRect(t.x - 15, t.y - 6, 15, 12), e.fillStyle = "#a49a72", e.fillRect(t.x - 11, t.y - 11, 2, 2), e.fillRect(t.x + 9, t.y + 9, 2, 2);
}
function be(e, t, n, r, i) {
	e.clearRect(0, 0, D, ue), e.imageSmoothingEnabled = !1, e.fillStyle = "#0a0706", e.fillRect(0, 0, D, ue);
	for (let n = 0; n < 190; n += 1) {
		let r = (n * 61 + t.generation * 7) % D, i = (n * 43 + t.generation * 11) % ue, a = n % 7 == 0 ? 3 : 2;
		e.fillStyle = n % 4 == 0 ? "#2d1d13" : "#1b120d", e.fillRect(r, i, a, a);
	}
	t.edges.forEach((edge) => {
		let a = _e(t.nodes[edge.aId]), bNode = _e(t.nodes[edge.bId]);
		ve(e, a.x, a.y, bNode.x, bNode.y);
	});
	let a = _e(t.exit), o = y[t.exitDirection];
	let startPoint = _e(t.start);
	ve(e, 0, startPoint.y, startPoint.x, startPoint.y), ve(e, a.x, a.y, D, a.y);
	t.nodeList.forEach((node) => {
		let mask = node.bits;
		node.id === t.startId && (mask |= y.left.bit), node.id === t.exitId && (mask |= y.right.bit), ye(e, _e(node), mask);
	});
	r.length > 1 && (e.beginPath(), r.forEach((t, n) => {
		let r = _e(t);
		n === 0 ? e.moveTo(r.x, r.y) : e.lineTo(r.x, r.y);
	}), e.lineJoin = "bevel", e.lineCap = "square", e.lineWidth = 9, e.strokeStyle = "rgba(19, 11, 7, 0.76)", e.stroke(), e.lineWidth = 5, e.strokeStyle = "#c27a2b", e.stroke(), e.setLineDash([2, 5]), e.lineWidth = 1, e.strokeStyle = "#ffe093", e.stroke(), e.setLineDash([]));
	let s = _e(t.start);
	e.fillStyle = "#172015", e.fillRect(s.x - 7, s.y - 7, 14, 14), e.fillStyle = "#6c8e54", e.fillRect(s.x - 4, s.y - 4, 8, 8), e.fillStyle = "#c5d48c", e.fillRect(s.x - 2, s.y - 2, 4, 4);
	let c = a.x + o.dx * 20, l = a.y + o.dy * 20;
	if (e.fillStyle = "rgba(214, 142, 49, 0.22)", e.fillRect(c - 9, l - 9, 18, 18), e.fillStyle = "#d99032", e.fillRect(c - 5, l - 5, 10, 10), e.fillStyle = "#ffe08a", e.fillRect(c - 2, l - 2, 4, 4), i !== "complete" && i !== "timeout") {
		let t = _e(n);
		e.fillStyle = "rgba(238, 165, 50, 0.2)", e.fillRect(t.x - 12, t.y - 12, 24, 24), e.fillStyle = "#0e0b08", e.fillRect(t.x - 8, t.y - 8, 16, 16), e.fillStyle = "#b66724", e.fillRect(t.x - 6, t.y - 6, 12, 12), e.fillStyle = "#ffd168", e.fillRect(t.x - 3, t.y - 3, 6, 6);
	}
}
function xe(e, t, n) {
	return {
		x: n.x + (e.x - t.sourceBounds.minX) / (t.sourceBounds.maxX - t.sourceBounds.minX) * n.width,
		y: n.y + (e.y - t.sourceBounds.minY) / (t.sourceBounds.maxY - t.sourceBounds.minY) * n.height
	};
}
function Se(e, t) {
	let n = document.createElement("canvas");
	n.width = 128, n.height = 128;
	let r = n.getContext("2d");
	r.imageSmoothingEnabled = !1;
	let i = [
		[18, 22],
		[22, 13],
		[34, 11],
		[47, 15],
		[51, 12],
		[68, 16],
		[73, 12],
		[91, 17],
		[99, 16],
		[113, 27],
		[111, 40],
		[116, 47],
		[112, 62],
		[117, 70],
		[112, 86],
		[114, 96],
		[102, 111],
		[88, 109],
		[81, 115],
		[65, 111],
		[57, 117],
		[42, 111],
		[32, 114],
		[15, 104],
		[17, 91],
		[11, 83],
		[16, 67],
		[11, 58],
		[17, 42],
		[13, 34]
	];
	function a(e = 0, t = 0) {
		let n = new Path2D();
		return i.forEach(([r, i], a) => {
			a === 0 ? n.moveTo(r + e, i + t) : n.lineTo(r + e, i + t);
		}), n.closePath(), n;
	}
	let o = a();
	r.fillStyle = "#3d210d", r.fill(a(4, 5)), r.fillStyle = "#704018", r.fill(a(2, 2)), r.fillStyle = "#d59a45", r.fill(o), r.lineJoin = "miter", r.lineWidth = 3, r.strokeStyle = "#87521f", r.stroke(o), r.lineWidth = 1, r.strokeStyle = "#f0c36d", r.stroke(o);
	let s = (e.generation + 1) * 2654435761 + t.length * 1013904223 >>> 0;
	function c() {
		return s = s * 1664525 + 1013904223 >>> 0, s / 4294967296;
	}
	r.save(), r.clip(o), r.fillStyle = "#e3ad59", r.fillRect(23, 22, 83, 80);
	for (let e = 0; e < 230; e += 1) {
		let e = Math.floor(11 + c() * 106), t = Math.floor(11 + c() * 106), n = c() < .13 ? 4 : c() < .42 ? 2 : 1;
		r.fillStyle = [
			"rgba(91, 50, 18, .14)",
			"rgba(126, 72, 25, .11)",
			"rgba(255, 217, 133, .13)",
			"rgba(235, 180, 83, .18)"
		][Math.floor(c() * 4)], r.fillRect(e, t, n, n);
	}
	r.fillStyle = "rgba(91, 48, 16, .18)", [
		[
			18,
			30,
			10,
			5
		],
		[
			20,
			34,
			6,
			9
		],
		[
			92,
			22,
			12,
			5
		],
		[
			103,
			30,
			6,
			11
		],
		[
			14,
			77,
			10,
			10
		],
		[
			96,
			93,
			12,
			12
		],
		[
			45,
			106,
			9,
			5
		]
	].forEach(([e, t, n, i]) => {
		r.fillRect(e, t, n, i), r.fillRect(e + 2, t - 2, Math.max(2, n - 4), 2);
	}), r.fillStyle = "rgba(111, 65, 23, .12)", r.fillRect(26, 26, 2, 75), r.fillRect(27, 25, 66, 1), r.fillRect(100, 35, 1, 61), r.restore();
	let l = {
		x: 31,
		y: 30,
		width: 66,
		height: 70
	};
	r.lineCap = "square", r.lineJoin = "miter", r.beginPath();
	e.edges.forEach((edge) => {
		let a = xe(e.nodes[edge.aId], e, l), bNode = xe(e.nodes[edge.bId], e, l);
		r.moveTo(Math.round(a.x), Math.round(a.y)), r.lineTo(Math.round(bNode.x), Math.round(bNode.y));
	});
	let inlet = xe(e.start, e, l), outlet = xe(e.exit, e, l);
	r.moveTo(l.x, Math.round(inlet.y)), r.lineTo(Math.round(inlet.x), Math.round(inlet.y));
	r.moveTo(Math.round(outlet.x), Math.round(outlet.y)), r.lineTo(l.x + l.width, Math.round(outlet.y));
	r.globalAlpha = .42, r.lineWidth = 1, r.strokeStyle = "#765022", r.stroke(), r.globalAlpha = 1, r.beginPath(), t.forEach((t, n) => {
		let i = xe(t, e, l), a = Math.round(i.x), o = Math.round(i.y);
		n === 0 ? r.moveTo(a, o) : r.lineTo(a, o);
	}), r.lineWidth = 5, r.strokeStyle = "rgba(96, 50, 17, .2)", r.stroke(), r.lineWidth = 3, r.strokeStyle = "#68441d", r.stroke(), r.setLineDash([1, 3]), r.lineWidth = 1, r.strokeStyle = "#a87534", r.stroke(), r.setLineDash([]);
	let u = xe(e.start, e, l), d = Math.round(u.x), f = Math.round(u.y);
	r.strokeStyle = "#65421d", r.lineWidth = 2, r.strokeRect(d - 5, f - 5, 10, 10), r.beginPath(), r.moveTo(d - 2, f + 2), r.lineTo(d - 2, f - 2), r.lineTo(d + 2, f - 2), r.lineTo(d + 2, f + 1), r.lineTo(d, f + 1), r.stroke();
	let p = xe(t[t.length - 1], e, l), m = Math.round(p.x), h = Math.round(p.y);
	r.lineWidth = 3, r.strokeStyle = "#5b3818", r.beginPath(), r.moveTo(m - 4, h - 4), r.lineTo(m + 4, h + 4), r.moveTo(m + 4, h - 4), r.lineTo(m - 4, h + 4), r.stroke(), r.fillStyle = "#755022", r.fillRect(42, 20, 2, 4), r.fillRect(67, 22, 1, 5), r.fillRect(105, 54, 3, 3), r.fillRect(21, 63, 2, 5), r.fillRect(75, 107, 2, 2), r.fillRect(80, 107, 2, 2);
	let g = document.createElement("canvas");
	g.width = 512, g.height = 512;
	let _ = g.getContext("2d");
	return _.imageSmoothingEnabled = !1, _.drawImage(n, 0, 0, n.width, n.height, 0, 0, g.width, g.height), g.toDataURL("image/png");
}
function Ce({ status: e, onStart: t }) {
	return e === "ready" ? /* @__PURE__ */ (0, T.jsx)("div", {
		className: "pipe-intro",
		role: "button",
		tabIndex: 0,
		"aria-label": "点击开始地下水管迷宫",
		onPointerDown: (e) => {
			e.button !== void 0 && e.button !== 0 || (e.preventDefault(), t());
		},
		children: /* @__PURE__ */ (0, T.jsxs)("div", {
			className: "pipe-intro__message",
			children: [/* @__PURE__ */ (0, T.jsx)("p", { children: "在10秒内按住屏幕，沿地下水管持续拖动到出口；通关路线会保存为图纸。" }), /* @__PURE__ */ (0, T.jsx)("span", { children: "点击空白处开始" })]
		})
	}) : null;
}
function we({ status: e, onRetry: t }) {
	return e === "timeout" ? /* @__PURE__ */ (0, T.jsx)("div", {
		className: "pipe-timeout",
		role: "button",
		tabIndex: 0,
		"aria-label": "时间到，点击重新尝试",
		onPointerDown: (e) => {
			e.button !== void 0 && e.button !== 0 || (e.preventDefault(), t());
		},
		children: /* @__PURE__ */ (0, T.jsxs)("div", {
			className: "pipe-timeout__message",
			children: [/* @__PURE__ */ (0, T.jsx)("p", { children: "时间到" }), /* @__PURE__ */ (0, T.jsx)("span", { children: "点击空白处重新尝试" })]
		})
	}) : null;
}
function Te({ open: e, onConfirm: t, onCancel: n }) {
	return e ? /* @__PURE__ */ (0, T.jsx)("div", {
		className: "pipe-confirm-shade",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "pipe-confirm-title",
		children: /* @__PURE__ */ (0, T.jsxs)("div", {
			className: "pipe-confirm-card",
			children: [
				/* @__PURE__ */ (0, T.jsx)("p", {
					className: "pipe-confirm-card__eyebrow",
					children: "重置路线"
				}),
				/* @__PURE__ */ (0, T.jsx)("h2", {
					id: "pipe-confirm-title",
					children: "是否重新开始？"
				}),
				/* @__PURE__ */ (0, T.jsx)("p", { children: "地图内容不会改变，确认后将回到起点并重新计时。" }),
				/* @__PURE__ */ (0, T.jsxs)("div", {
					className: "pipe-confirm-card__actions",
					children: [/* @__PURE__ */ (0, T.jsx)("button", {
						type: "button",
						onClick: t,
						children: "是"
					}), /* @__PURE__ */ (0, T.jsx)("button", {
						type: "button",
						onClick: n,
						children: "取消"
					})]
				})
			]
		})
	}) : null;
}
function Ee({ status: e, blueprint: t }) {
	return e !== "complete" || !t ? null : /* @__PURE__ */ (0, T.jsx)("div", {
		className: "pipe-result-shade",
		role: "status",
		"aria-live": "assertive",
		children: /* @__PURE__ */ (0, T.jsxs)("div", {
			className: "pipe-result-card",
			children: [
				/* @__PURE__ */ (0, T.jsx)("p", {
					className: "pipe-result-card__eyebrow",
					children: "路线已经绘制"
				}),
				/* @__PURE__ */ (0, T.jsx)("h2", { children: "成功走出迷宫" }),
				/* @__PURE__ */ (0, T.jsx)("div", {
					className: "pipe-blueprint",
					children: /* @__PURE__ */ (0, T.jsx)("img", {
						src: t,
						alt: "记录实际通关路线的地下水管图纸"
					})
				}),
				/* @__PURE__ */ (0, T.jsxs)("div", {
					className: "pipe-item-acquired",
					children: [/* @__PURE__ */ (0, T.jsx)("span", {
						"aria-hidden": "true",
						children: "▰"
					}), /* @__PURE__ */ (0, T.jsxs)("div", { children: [/* @__PURE__ */ (0, T.jsx)("small", { children: "获得道具" }), /* @__PURE__ */ (0, T.jsx)("strong", { children: fe })] })]
				}),
				/* @__PURE__ */ (0, T.jsx)("p", {
					className: "pipe-result-card__continuing",
					children: "图纸已保存 · 正在进入下一部分…"
				})
			]
		})
	});
}
function De() {
	let e = (0, _.useMemo)(k, []), t = (0, _.useRef)(null), n = (0, _.useRef)(ie(e.seed)), r = (0, _.useRef)({ ...n.current.start }), i = (0, _.useRef)([{ ...n.current.start }]), a = (0, _.useRef)("ready"), o = (0, _.useRef)(!0), s = (0, _.useRef)(!1), c = (0, _.useRef)(TIME_LIMIT), l = (0, _.useRef)(null), u = (0, _.useRef)(!1), d = (0, _.useRef)(TIME_LIMIT), f = (0, _.useRef)(null), p = (0, _.useRef)(null), m = (0, _.useRef)(e.nextDestination), h = (0, _.useRef)(null), g = (0, _.useRef)(null), v = (0, _.useRef)(() => {}), y = (0, _.useRef)(() => {}), b = (0, _.useRef)(() => {}), x = (0, _.useRef)(() => {}), ee = (0, _.useRef)(() => {}), S = (0, _.useRef)(() => {}), [C, te] = (0, _.useState)("ready"), [ne, re] = (0, _.useState)(TIME_LIMIT), [w, ae] = (0, _.useState)(0), [se, le] = (0, _.useState)(null), [E, ve] = (0, _.useState)(!1), [ye, xe] = (0, _.useState)(!1), [De, Oe] = (0, _.useState)(!0), [ke, Ae] = (0, _.useState)("请阅读玩法说明，点击空白处开始。"), A = (0, _.useCallback)(() => {
		let e = n.current;
		return {
			seed: e.seed,
			generation: e.generation,
			layoutId: e.layoutId,
			nodeCount: e.nodeList.length,
			edgeCount: e.edges.length,
			status: a.current,
			solved: a.current === "complete",
			enabled: o.current,
			muted: s.current,
			timeLimit: TIME_LIMIT,
			timeLeft: c.current,
			controlMode: "continuous-drag",
			resetConfirmationOpen: u.current,
			moveCount: i.current.length - 1,
			position: { ...r.current },
			start: { ...e.start },
			exit: { ...e.exit },
			exitDirection: e.exitDirection,
			minimumMoves: e.solutionSteps,
			route: i.current.map((e) => ({ ...e })),
			blueprintAvailable: !!p.current,
			item: a.current === "complete" ? {
				id: de,
				name: fe
			} : null
		};
	}, []), je = (0, _.useCallback)((e, t = .08) => {
		if (!(s.current || typeof window > "u")) try {
			let n = window.AudioContext || window.webkitAudioContext;
			if (!n) return;
			g.current || (g.current = new n());
			let r = g.current, i = r.createOscillator(), a = r.createGain();
			i.type = "square", i.frequency.setValueAtTime(e, r.currentTime), a.gain.setValueAtTime(.035, r.currentTime), a.gain.exponentialRampToValueAtTime(1e-4, r.currentTime + t), i.connect(a), a.connect(r.destination), i.start(), i.stop(r.currentTime + t);
		} catch (error) {
			console.debug("[高墙之外] 水管迷宫音效不可用", error);
		}
	}, []), Me = (0, _.useCallback)((e) => {
		let t = !!e;
		o.current = t, Oe(t);
	}, []), Ne = (0, _.useCallback)((e) => {
		let t = !!e;
		s.current = t, xe(t);
	}, []), Pe = (0, _.useCallback)(() => {
		!o.current || a.current !== "ready" || (a.current = "playing", l.current = performance.now(), c.current = TIME_LIMIT, re(TIME_LIMIT), te("playing"), Ae("计时开始，请按住屏幕沿管道持续拖动。"), je(440, .1), he("PIPE_MAZE_START", A()));
	}, [A, je]);
	v.current = Pe;
	let Fe = (0, _.useCallback)(() => {
		a.current === "playing" && (a.current = "timeout", f.current = null, c.current = 0, re(0), te("timeout"), Ae("时间到，请重新尝试。"), je(150, .22), he("PIPE_MAZE_TIMEOUT", A()));
	}, [A, je]);
	S.current = Fe;
	let Ie = (0, _.useCallback)(() => {
		if (a.current !== "playing" || u.current) return;
		let e = l.current === null ? 0 : (performance.now() - l.current) / 1e3, t = Math.max(0, TIME_LIMIT - e);
		if (t <= 0) {
			Fe();
			return;
		}
		d.current = t, c.current = t, re(Math.ceil(t)), u.current = !0, f.current = null, ve(!0), Ae("互动内容已暂停，请确认是否重新开始。"), he("PIPE_MAZE_RESTART_CONFIRM", A());
	}, [A, Fe]), Le = (0, _.useCallback)(() => {
		if (!u.current) return;
		let e = d.current;
		l.current = performance.now() - (TIME_LIMIT - e) * 1e3, c.current = e, u.current = !1, ve(!1), re(Math.ceil(e)), Ae("已取消重置，继续计时并保留当前路线。"), he("PIPE_MAZE_RESTART_CANCELLED", A());
	}, [A]), Re = (0, _.useCallback)(() => {
		h.current && (window.clearTimeout(h.current), h.current = null), r.current = { ...n.current.start }, i.current = [{ ...n.current.start }], p.current = null, l.current = performance.now(), c.current = TIME_LIMIT, d.current = TIME_LIMIT, u.current = !1, a.current = "playing", te("playing"), ve(!1), re(TIME_LIMIT), ae(0), le(null), Ae("已回到起点，地图保持不变，重新开始计时。"), je(390, .1), queueMicrotask(() => he("PIPE_MAZE_RESTART", A()));
	}, [A, je]);
	ee.current = Re;
	let ze = (0, _.useCallback)(() => {
		if (a.current !== "playing") return;
		a.current = "complete", te("complete");
		let e = Se(n.current, i.current);
		p.current = e, le(e);
		try {
			window.localStorage.setItem("pipe-maze-blueprint", e);
		} catch (error) {
			console.warn("[高墙之外] 水管迷宫蓝图保存失败", error);
		}
		let t = {
			id: de,
			name: fe,
			type: "quest-item",
			blueprint: e
		}, r = {
			...A(),
			item: t,
			blueprint: e
		};
		Ae(`成功走出迷宫，获得道具：${fe}。`), je(760, .2), he("PIPE_MAZE_ITEM_ACQUIRED", t), he("PIPE_MAZE_COMPLETE", r);
	}, [A, je]), Be = (0, _.useCallback)((e) => {
		if (!o.current || a.current !== "playing" || u.current) return !1;
		if (l.current !== null && performance.now() - l.current >= TIME_LIMIT * 1e3) return Fe(), !1;
		let t = oe(n.current, r.current, e);
		return t.moved ? (r.current = t.position, i.current = [...i.current, { ...t.position }], ae(i.current.length - 1), Ae(t.exited ? "已经找到出口。" : `向${{
			up: "上",
			right: "右",
			down: "下",
			left: "左"
		}[e]}移动。`), je(t.exited ? 660 : 330, t.exited ? .14 : .055), he("PIPE_MAZE_MOVE", {
			direction: e,
			moved: !0,
			exited: t.exited,
			state: A()
		}), t.exited && ze(), !0) : (je(170, .05), Ae("这个方向被管壁挡住了。"), he("PIPE_MAZE_BLOCKED", {
			direction: e,
			state: A()
		}), !1);
	}, [
		ze,
		A,
		Fe,
		je
	]);
	y.current = Be, b.current = (0, _.useCallback)((e) => {
		let i = f.current;
		if (!i || !o.current || a.current !== "playing" || u.current || e < i.nextMoveAt) return;
		let s = t.current;
		if (!s) return;
		let c = s.getBoundingClientRect();
		if (c.width <= 0 || c.height <= 0) return;
		let l = (i.x - c.left) / c.width * D, d = (i.y - c.top) / c.height * ue, p = l - i.offsetX, m = d - i.offsetY, h = _e(r.current), g = p - h.x, _ = m - h.y, v = g >= 0 ? "right" : "left", b = _ >= 0 ? "down" : "up", x = (Math.abs(g) >= Math.abs(_) ? [{
			direction: v,
			distance: Math.abs(g)
		}, {
			direction: b,
			distance: Math.abs(_)
		}] : [{
			direction: b,
			distance: Math.abs(_)
		}, {
			direction: v,
			distance: Math.abs(g)
		}]).find(({ direction: e, distance: t }) => t < O ? !1 : oe(n.current, r.current, e).moved)?.direction;
		if (!x) {
			i.nextMoveAt = e + pe;
			return;
		}
		i.nextMoveAt = e + pe, y.current(x);
	}, []);
	let Ve = (0, _.useCallback)((e = {}) => {
		h.current && (window.clearTimeout(h.current), h.current = null);
		let t = ie(e.seed ?? Date.now());
		n.current = t, r.current = { ...t.start }, i.current = [{ ...t.start }], f.current = null, p.current = null, l.current = null, c.current = TIME_LIMIT, d.current = TIME_LIMIT, u.current = !1;
		let o = e.start === !0 ? "playing" : "ready";
		a.current = o, o === "playing" && (l.current = performance.now()), te(o), re(TIME_LIMIT), ae(0), le(null), ve(!1), Ae(o === "playing" ? "地图已回到起点，计时开始。" : "请阅读玩法说明，点击空白处开始。"), queueMicrotask(() => he("PIPE_MAZE_RESET", A()));
	}, [A]);
	x.current = Ve, (0, _.useEffect)(() => {
		let e = t.current.getContext("2d"), s = 0, d = TIME_LIMIT;
		function f(t) {
			if (a.current === "playing" && o.current && !u.current && l.current !== null) {
				let e = Math.max(0, TIME_LIMIT - (t - l.current) / 1e3);
				c.current = e;
				let n = Math.ceil(e);
				n !== d && (d = n, re(n)), e <= 0 && S.current();
			}
			be(e, n.current, r.current, i.current, a.current), b.current(t), s = window.requestAnimationFrame(f);
		}
		return s = window.requestAnimationFrame(f), () => window.cancelAnimationFrame(s);
	}, []), (0, _.useEffect)(() => {
		let e = {
			version: ce,
			start: () => v.current(),
			reset: (e) => x.current(e),
			restart: () => ee.current(),
			move: (e) => y.current(e),
			getState: () => A(),
			getBlueprint: () => p.current,
			downloadBlueprint: () => !1,
			setEnabled: Me,
			setMuted: Ne,
			setNextDestination: (e) => {
				m.current = e || null;
			}
		};
		window.PipeMazeGame = e;
		he("PIPE_MAZE_READY", e.getState());
		return () => {
			delete window.PipeMazeGame;
		};
	}, [
		A,
		Me,
		Ne
	]), (0, _.useEffect)(() => {
		function handleKeyDown(event) {
			let t = {
				w: "up",
				d: "right",
				s: "down",
				a: "left"
			}, key = event.key.toLowerCase();
			if (a.current === "ready" && (event.key === " " || event.key === "Enter")) {
				event.preventDefault(), Pe();
				return;
			}
			// 集成版的 WASD 已由主互动空间统一转发；组件再次处理会让一次
			// keydown 沿两条路径各移动一步。独立版仍由组件直接处理。
			t[key] && !e.embedded && (event.preventDefault(), Be(t[key])), key === "r" && Ie(), key === "m" && Ne(!s.current);
		}
		return window.addEventListener("keydown", handleKeyDown), () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		Be,
		Ie,
		Ne,
		Pe,
		e.embedded
	]);
	let He = C === "playing" && ne <= 7;
	return /* @__PURE__ */ (0, T.jsxs)("main", {
		className: `pipe-game-shell ${e.embedded ? "is-embedded is-mobile" : ""}`,
		children: [
			e.embedded ? /* @__PURE__ */ (0, T.jsx)("style", { children: PIPE_EMBEDDED_LAYOUT_STYLE }) : null,
			/* @__PURE__ */ (0, T.jsx)("div", { className: "pipe-ambient pipe-ambient--left" }),
			/* @__PURE__ */ (0, T.jsx)("div", { className: "pipe-ambient pipe-ambient--right" }),
			/* @__PURE__ */ (0, T.jsxs)("header", {
				className: "pipe-game-header",
				children: [
					/* @__PURE__ */ (0, T.jsx)("button", {
						type: "button",
						className: "pipe-icon-button",
						onClick: Ie,
						"aria-label": "重置路线，快捷键 R",
						title: "重置路线（R）",
						children: /* @__PURE__ */ (0, T.jsx)(ge, { name: "undo" })
					}),
					/* @__PURE__ */ (0, T.jsxs)("div", {
						className: "pipe-play-rule",
						children: [/* @__PURE__ */ (0, T.jsx)("h1", { children: "按住屏幕拖动前进" }), /* @__PURE__ */ (0, T.jsx)("p", { children: "让路线跟随手指，25秒内找到出口" })]
					}),
					/* @__PURE__ */ (0, T.jsx)("button", {
						type: "button",
						className: "pipe-icon-button",
						onClick: () => Ne(!ye),
						"aria-label": ye ? "开启音效，快捷键 M" : "关闭音效，快捷键 M",
						"aria-pressed": ye,
						title: "切换音效（M）",
						children: /* @__PURE__ */ (0, T.jsx)(ge, { name: ye ? "mute" : "sound" })
					})
				]
			}),
			/* @__PURE__ */ (0, T.jsxs)("div", {
				className: `pipe-timer ${He ? "is-danger" : ""}`,
				"aria-label": `剩余 ${ne} 秒`,
				children: [
					/* @__PURE__ */ (0, T.jsx)("span", { children: "剩余时间" }),
					/* @__PURE__ */ (0, T.jsx)("strong", { children: String(ne).padStart(2, "0") }),
					/* @__PURE__ */ (0, T.jsx)("i", { children: "秒" }),
					/* @__PURE__ */ (0, T.jsx)("div", {
						className: "pipe-timer__bar",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, T.jsx)("em", { style: { width: `${Math.max(0, ne / TIME_LIMIT * 100)}%` } })
					})
				]
			}),
			/* @__PURE__ */ (0, T.jsx)("section", {
				className: `pipe-maze-stage ${De && C === "playing" ? "is-active" : ""}`,
				"data-testid": "pipe-maze-stage",
				onPointerDown: (e) => {
					if (e.button !== void 0 && e.button !== 0 || a.current !== "playing" || u.current || !o.current) return;
					let n = t.current;
					if (!n) return;
					let i = n.getBoundingClientRect(), s = (e.clientX - i.left) / i.width * D, c = (e.clientY - i.top) / i.height * ue, l = _e(r.current);
					f.current = {
						x: e.clientX,
						y: e.clientY,
						pointerId: e.pointerId,
						offsetX: s - l.x,
						offsetY: c - l.y,
						nextMoveAt: 0
					}, e.currentTarget.setPointerCapture?.(e.pointerId), e.preventDefault();
				},
				onPointerMove: (e) => {
					let t = f.current;
					!t || t.pointerId !== e.pointerId || (t.x = e.clientX, t.y = e.clientY, e.preventDefault());
				},
				onPointerUp: (e) => {
					let t = f.current;
					!t || t.pointerId !== e.pointerId || (f.current = null, e.currentTarget.releasePointerCapture?.(e.pointerId), e.preventDefault());
				},
				onPointerCancel: () => {
					f.current = null;
				},
				onLostPointerCapture: () => {
					f.current = null;
				},
				"aria-label": "地下水管迷宫区域，按住屏幕沿管道持续拖动",
				children: /* @__PURE__ */ (0, T.jsxs)("div", {
					className: "pipe-maze-frame",
					children: [
						/* @__PURE__ */ (0, T.jsx)("span", { className: "pipe-corner pipe-corner--one" }),
						/* @__PURE__ */ (0, T.jsx)("span", { className: "pipe-corner pipe-corner--two" }),
						/* @__PURE__ */ (0, T.jsx)("span", { className: "pipe-corner pipe-corner--three" }),
						/* @__PURE__ */ (0, T.jsx)("span", { className: "pipe-corner pipe-corner--four" }),
						/* @__PURE__ */ (0, T.jsx)("canvas", {
							ref: t,
							className: "pipe-maze-canvas",
							width: D,
							height: ue,
							role: "img",
							"aria-label": `地下水管迷宫，已移动 ${w} 步`
						})
					]
				})
			}),
			/* @__PURE__ */ (0, T.jsxs)("footer", {
				className: "pipe-game-footer",
				children: [
					/* @__PURE__ */ (0, T.jsx)("span", {}),
					/* @__PURE__ */ (0, T.jsx)("p", { children: "按住屏幕沿管道持续拖动 · 绘制离开路线" }),
					/* @__PURE__ */ (0, T.jsx)("span", {})
				]
			}),
			/* @__PURE__ */ (0, T.jsx)("div", {
				className: "pipe-sr-only",
				"aria-live": "polite",
				children: ke
			}),
			/* @__PURE__ */ (0, T.jsx)(Ce, {
				status: C,
				onStart: Pe
			}),
			/* @__PURE__ */ (0, T.jsx)(we, {
				status: C,
				onRetry: () => Ve({ start: !0 })
			}),
			/* @__PURE__ */ (0, T.jsx)(Te, {
				open: E,
				onConfirm: Re,
				onCancel: Le
			}),
			/* @__PURE__ */ (0, T.jsx)(Ee, {
				status: C,
				blueprint: se
			})
		]
	});
}

window.BeyondWallsMiniGameSources = window.BeyondWallsMiniGameSources || {};
window.BeyondWallsMiniGameSources.pipeMaze = {
  Component: De,
  setMountOptions(options) {
    __bwmMountOptions = Object.assign({ embedded: true }, options || {});
  },
  clearMountOptions() {
    __bwmMountOptions = null;
  },
  getApi() {
    return window.PipeMazeGame || null;
  }
};
})();
