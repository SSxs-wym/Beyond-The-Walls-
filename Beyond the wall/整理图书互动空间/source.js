(function () {
"use strict";
let __bwmMountOptions = null;
const __bwmRuntime = window.BeyondWallsReactRuntime;
if (!__bwmRuntime) throw new Error("Load shared/react-runtime.js before 整理图书互动空间/source.js");
const _ = __bwmRuntime.React;
const v = __bwmRuntime.ReactDOM;
const w = __bwmRuntime.jsxRuntime;
var y = Object.freeze([
	{
		id: "obsidian",
		height: 96,
		width: 74,
		tone: "ink",
		sigil: "cross",
		title: "黑曜秘典"
	},
	{
		id: "midnight",
		height: 89,
		width: 68,
		tone: "navy",
		sigil: "stars",
		title: "午夜星录"
	},
	{
		id: "oak",
		height: 82,
		width: 72,
		tone: "umber",
		sigil: "runes",
		title: "古橡卷册"
	},
	{
		id: "moss",
		height: 75,
		width: 66,
		tone: "moss",
		sigil: "cross",
		title: "苔痕手札"
	},
	{
		id: "crimson",
		height: 68,
		width: 72,
		tone: "crimson",
		sigil: "gem",
		title: "绯红炼金书"
	},
	{
		id: "onyx",
		height: 61,
		width: 76,
		tone: "ink",
		sigil: "frame",
		title: "夜幕法典"
	},
	{
		id: "walnut",
		height: 54,
		width: 63,
		tone: "umber",
		sigil: "diamond",
		title: "胡桃语录"
	},
	{
		id: "slate",
		height: 47,
		width: 58,
		tone: "navy",
		sigil: "door",
		title: "石蓝门书"
	},
	{
		id: "fern",
		height: 40,
		width: 54,
		tone: "moss",
		sigil: "stars",
		title: "蕨影小册"
	},
	{
		id: "ruby",
		height: 34,
		width: 52,
		tone: "crimson",
		sigil: "cross",
		title: "红晶便笺"
	}
]), b = Object.freeze(y.map((e) => e.id));
function x(e = "") {
	let t = 2166136261, n = String(e);
	for (let e = 0; e < n.length; e += 1) t ^= n.charCodeAt(e), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function ee(e) {
	let t = e >>> 0;
	return function() {
		t += 1831565813;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function S(e = Date.now()) {
	let t = typeof e == "number" ? e >>> 0 : x(e), n = ee(t), r = [...b], i = n() < .5 ? 3 : 4, a = i + 1, o = [...r.keys()];
	for (let e = o.length - 1; e > 0; --e) {
		let t = Math.floor(n() * (e + 1));
		[o[e], o[t]] = [o[t], o[e]];
	}
	let s = o.slice(0, a), c = r[s[s.length - 1]];
	for (let e = s.length - 1; e > 0; --e) r[s[e]] = r[s[e - 1]];
	return r[s[0]] = c, {
		order: r,
		seed: t,
		minimumSwaps: i
	};
}
function C(e) {
	return e.every((e, t) => e === b[t]);
}
function te(e, t, n) {
	let r = [...e];
	return [r[t], r[n]] = [r[n], r[t]], r;
}
var T = 4, re = "1.0.0", ie = new Map(y.map((e) => [e.id, e]));
function ae() {
	if (typeof window > "u") return {
		seed: Date.now(),
		embedded: !1
	};
	let t = __bwmMountOptions || {};
	return {
		seed: t.seed || Date.now(),
		embedded: typeof t.embedded === "boolean" ? t.embedded : !0,
		nextDestination: t.nextDestination || null
	};
}
function se(e, t) {
	let n = {
		source: "magic-bookshelf",
		version: re,
		type: e,
		detail: t
	};
	if (__bwmMountOptions && typeof __bwmMountOptions.onEvent === "function") __bwmMountOptions.onEvent(n);
	window.dispatchEvent(new CustomEvent(e.toLowerCase(), { detail: t }));
}
function ce({ name: e }) {
	return /* @__PURE__ */ (0, w.jsx)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, w.jsx)("path", { d: {
			undo: "M4 7h10a5 5 0 0 1 0 10h-2v-2h2a3 3 0 1 0 0-6H4l3 3-1.4 1.4L.2 8l5.4-5.4L7 4z",
			sound: "M3 9v6h4l5 4V5L7 9H3zm12.5 3a4 4 0 0 0-2-3.46v6.92A4 4 0 0 0 15.5 12zm0-7v2.06a6 6 0 0 1 0 9.88V19a8 8 0 0 0 0-14z",
			mute: "M3 9v6h4l5 4V5L7 9H3zm11.7.3-1.4 1.4 1.3 1.3-1.3 1.3 1.4 1.4 1.3-1.3 1.3 1.3 1.4-1.4-1.3-1.3 1.3-1.3-1.4-1.4-1.3 1.3z",
			spark: "M12 1l1.6 5.4L19 8l-5.4 1.6L12 15l-1.6-5.4L5 8l5.4-1.6L12 1zm6 12 .9 3.1L22 17l-3.1.9L18 21l-.9-3.1L14 17l3.1-.9L18 13z"
		}[e] })
	});
}
function le({ book: e, index: t, selected: n, disabled: r, onSelect: i }) {
	return /* @__PURE__ */ (0, w.jsxs)("button", {
		className: `book book--${e.tone} ${n ? "is-selected" : ""}`,
		style: {
			"--book-height": `${e.height}%`,
			"--book-width": `${e.width}px`,
			"--delay": `${Math.round((96 - e.height) * 6)}ms`
		},
		type: "button",
		disabled: r,
		"aria-pressed": n,
		"aria-label": `第 ${t + 1} 本，${e.title}，高度 ${e.height}`,
		onClick: () => i(t),
		children: [
			/* @__PURE__ */ (0, w.jsx)("span", { className: "book__top" }),
			/* @__PURE__ */ (0, w.jsx)("span", { className: "book__bands book__bands--top" }),
			/* @__PURE__ */ (0, w.jsxs)("span", {
				className: `book__sigil book__sigil--${e.sigil}`,
				children: [
					/* @__PURE__ */ (0, w.jsx)("i", {}),
					/* @__PURE__ */ (0, w.jsx)("b", {}),
					/* @__PURE__ */ (0, w.jsx)("em", {})
				]
			}),
			/* @__PURE__ */ (0, w.jsx)("span", { className: "book__bands book__bands--bottom" }),
			/* @__PURE__ */ (0, w.jsx)("span", { className: "book__shine" }),
			/* @__PURE__ */ (0, w.jsx)("span", { className: "book__select-corners" })
		]
	});
}
function E({ status: e, moves: t, onReset: n }) {
	if (e === "playing") return null;
	let r = e === "complete";
	return /* @__PURE__ */ (0, w.jsx)("div", {
		className: "result-shade",
		role: "dialog",
		"aria-modal": "true",
		children: /* @__PURE__ */ (0, w.jsxs)("div", {
			className: `result-card ${r ? "result-card--win" : ""}`,
			children: [
				/* @__PURE__ */ (0, w.jsx)("span", {
					className: "result-card__spark result-card__spark--one",
					children: "✦"
				}),
				/* @__PURE__ */ (0, w.jsx)("span", {
					className: "result-card__spark result-card__spark--two",
					children: "·"
				}),
				/* @__PURE__ */ (0, w.jsx)("div", {
					className: "result-card__rune",
					children: r ? "ᛟ" : "⌛"
				}),
				/* @__PURE__ */ (0, w.jsx)("p", {
					className: "result-card__eyebrow",
					children: r ? "秩序已经复原" : "交换次数已用完"
				}),
				/* @__PURE__ */ (0, w.jsx)("h2", { children: r ? "书架整理完成" : "差一点就成功了" }),
				/* @__PURE__ */ (0, w.jsx)("p", {
					children: r ? `你用了 ${t} 次交换，让每一本书都回到了正确位置。` : "四次交换已经用完，点击下面的按钮重新开始。"
				}),
				r ? /* @__PURE__ */ (0, w.jsx)("p", {
					className: "result-card__continuing",
					children: "正在进入下一部分…"
				}) : /* @__PURE__ */ (0, w.jsxs)("button", {
					type: "button",
					className: "primary-button",
					onClick: n,
					children: [
						/* @__PURE__ */ (0, w.jsx)(ce, { name: "spark" }),
						"重新开始"
					]
				})
			]
		})
	});
}
function D() {
	let e = (0, _.useMemo)(ae, []), t = (0, _.useMemo)(() => S(e.seed), [e.seed]), [n, r] = (0, _.useState)(t.order), [i, a] = (0, _.useState)(t.seed), [o, s] = (0, _.useState)(t.minimumSwaps), [c, l] = (0, _.useState)(null), [u, d] = (0, _.useState)(0), [f, p] = (0, _.useState)("playing"), [m, h] = (0, _.useState)(!1), [g, v] = (0, _.useState)(!0), [y, b] = (0, _.useState)("书架已经打乱，请选择两本书交换位置。"), x = (0, _.useRef)({}), ee = (0, _.useRef)(() => {}), ne = (0, _.useRef)(() => {}), D = (0, _.useRef)(e.nextDestination), ue = (0, _.useRef)(null);
	x.current = (0, _.useCallback)(() => ({
		order: [...n],
		moves: u,
		movesRemaining: Math.max(0, T - u),
		maxMoves: T,
		targetMoves: T,
		selectedIndex: c,
		status: f,
		solved: f === "complete",
		enabled: g,
		seed: i,
		minimumSwaps: o
	}), [
		g,
		u,
		n,
		i,
		c,
		f,
		o
	])();
	let de = (0, _.useCallback)((e, t = .08) => {
		if (!(m || typeof window > "u")) try {
			let n = window.AudioContext || window.webkitAudioContext;
			if (!n) return;
			ue.current || (ue.current = new n());
			let r = ue.current, i = r.createOscillator(), a = r.createGain();
			i.type = "square", i.frequency.setValueAtTime(e, r.currentTime), a.gain.setValueAtTime(.035, r.currentTime), a.gain.exponentialRampToValueAtTime(1e-4, r.currentTime + t), i.connect(a), a.connect(r.destination), i.start(), i.stop(r.currentTime + t);
		} catch (error) {
			console.debug("[高墙之外] 书架音效不可用", error);
		}
	}, [m]), fe = (0, _.useCallback)((e = {}) => {
		let t = S(e.seed ?? i);
		r(t.order), a(t.seed), s(t.minimumSwaps), l(null), d(0), p("playing"), b("书架已恢复为本局初始顺序，请重新尝试。"), queueMicrotask(() => se("BOOKSHELF_RESET", x.current));
	}, [i]);
	ee.current = fe;
	let pe = (0, _.useCallback)((e) => {
		if (!g || f !== "playing") return;
		if (c === null) {
			l(e), b(`已选中第 ${e + 1} 本书，请再选择一本。`), de(330), se("BOOKSHELF_SELECT", {
				index: e,
				state: x.current
			});
			return;
		}
		if (c === e) {
			l(null), b("已取消选择。"), de(240);
			return;
		}
		let t = c, i = te(n, t, e), a = u + 1, o = C(i), s = o ? "complete" : a >= T ? "failed" : "playing";
		r(i), d(a), l(null), p(s), b(o ? `整理完成，共用了 ${a} 次交换。` : s === "failed" ? "四次交换已经用完。" : `交换完成，还剩 ${T - a} 次机会。`), de(o ? 660 : 440, o ? .16 : .08);
		let m = {
			firstIndex: t,
			secondIndex: e,
			state: {
				...x.current,
				order: i,
				moves: a,
				movesRemaining: Math.max(0, T - a),
				status: s,
				solved: o,
				selectedIndex: null
			}
		};
		if (se("BOOKSHELF_SWAP", m), o) {
			se("BOOKSHELF_COMPLETE", m.state);
		}
		s === "failed" && se("BOOKSHELF_FAILED", m.state);
	}, [
		g,
		u,
		n,
		de,
		c,
		f
	]);
	ne.current = pe, (0, _.useEffect)(() => {
		let e = {
			version: re,
			reset: (e) => ee.current(e),
			getState: () => ({
				...x.current,
				order: [...x.current.order]
			}),
			selectBook: (e) => ne.current(e),
			setEnabled: (e) => v(!!e),
			setMuted: (e) => h(!!e),
			setNextDestination: (e) => {
				D.current = e || null;
			}
		};
		window.BookShelfGame = e;
		se("BOOKSHELF_READY", e.getState());
		return () => {
			delete window.BookShelfGame;
		};
	}, []), (0, _.useEffect)(() => {
		function e(e) {
			e.key.toLowerCase() === "r" && fe(), e.key.toLowerCase() === "m" && h((e) => !e);
		}
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [fe]);
	let O = n.map((e) => ie.get(e));
	return /* @__PURE__ */ (0, w.jsxs)("main", {
		className: `game-shell ${e.embedded ? "is-embedded" : ""}`,
		children: [
			/* @__PURE__ */ (0, w.jsx)("div", { className: "ambient ambient--left" }),
			/* @__PURE__ */ (0, w.jsx)("div", { className: "ambient ambient--right" }),
			/* @__PURE__ */ (0, w.jsxs)("header", {
				className: "game-header",
				children: [
					/* @__PURE__ */ (0, w.jsx)("button", {
						type: "button",
						className: "icon-button",
						onClick: () => fe(),
						"aria-label": "重新开始，快捷键 R",
						title: "重新开始（R）",
						children: /* @__PURE__ */ (0, w.jsx)(ce, { name: "undo" })
					}),
					/* @__PURE__ */ (0, w.jsxs)("div", {
						className: "title-lockup play-rule",
						children: [/* @__PURE__ */ (0, w.jsx)("h1", { children: "点击两本书交换位置" }), /* @__PURE__ */ (0, w.jsx)("p", { children: "将所有书按高度从高到低排列 · 本局可在四次交换内完成" })]
					}),
					/* @__PURE__ */ (0, w.jsx)("button", {
						type: "button",
						className: "icon-button",
						onClick: () => h((e) => !e),
						"aria-label": m ? "开启音效，快捷键 M" : "关闭音效，快捷键 M",
						"aria-pressed": m,
						title: "切换音效（M）",
						children: /* @__PURE__ */ (0, w.jsx)(ce, { name: m ? "mute" : "sound" })
					})
				]
			}),
			/* @__PURE__ */ (0, w.jsxs)("div", {
				className: "move-counter",
				"aria-label": `已经交换 ${u} 次`,
				children: [
					"已交换 ",
					/* @__PURE__ */ (0, w.jsx)("strong", { children: u }),
					" 次"
				]
			}),
			/* @__PURE__ */ (0, w.jsxs)("section", {
				className: "scene",
				"aria-label": "待整理的书架",
				children: [
					/* @__PURE__ */ (0, w.jsx)("div", {
						className: "dust dust--one",
						children: "·"
					}),
					/* @__PURE__ */ (0, w.jsx)("div", {
						className: "dust dust--two",
						children: "✦"
					}),
					/* @__PURE__ */ (0, w.jsx)("div", {
						className: "dust dust--three",
						children: "·"
					}),
					/* @__PURE__ */ (0, w.jsx)("div", {
						className: "books",
						"data-testid": "bookshelf",
						children: O.map((e, t) => /* @__PURE__ */ (0, w.jsx)(le, {
							book: e,
							index: t,
							selected: c === t,
							disabled: !g || f !== "playing",
							onSelect: pe
						}, e.id))
					}),
					/* @__PURE__ */ (0, w.jsxs)("div", {
						className: "shelf",
						children: [
							/* @__PURE__ */ (0, w.jsx)("div", { className: "shelf__edge" }),
							/* @__PURE__ */ (0, w.jsx)("div", {
								className: "shelf__face",
								children: /* @__PURE__ */ (0, w.jsx)("span", {
									className: "shelf__carving",
									children: "✦"
								})
							}),
							/* @__PURE__ */ (0, w.jsx)("div", { className: "shelf__bracket shelf__bracket--left" }),
							/* @__PURE__ */ (0, w.jsx)("div", { className: "shelf__bracket shelf__bracket--right" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, w.jsxs)("footer", {
				className: "game-footer",
				children: [
					/* @__PURE__ */ (0, w.jsx)("span", { className: "game-footer__rule" }),
					/* @__PURE__ */ (0, w.jsxs)("p", { children: [
						/* @__PURE__ */ (0, w.jsx)("span", {
							"aria-hidden": "true",
							children: "✧"
						}),
						"先选一本，再选另一本",
						/* @__PURE__ */ (0, w.jsx)("span", {
							"aria-hidden": "true",
							children: "✧"
						})
					] }),
					/* @__PURE__ */ (0, w.jsx)("span", { className: "game-footer__rule" })
				]
			}),
			/* @__PURE__ */ (0, w.jsx)("div", {
				className: "sr-only",
				"aria-live": "polite",
				children: y
			}),
			/* @__PURE__ */ (0, w.jsx)(E, {
				status: f,
				moves: u,
				onReset: fe
			})
		]
	});
}

window.BeyondWallsMiniGameSources = window.BeyondWallsMiniGameSources || {};
window.BeyondWallsMiniGameSources.bookshelf = {
  Component: D,
  setMountOptions(options) {
    __bwmMountOptions = Object.assign({ embedded: true }, options || {});
  },
  clearMountOptions() {
    __bwmMountOptions = null;
  },
  getApi() {
    return window.BookShelfGame || null;
  }
};
})();
