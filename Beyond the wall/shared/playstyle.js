(function (root) {
  "use strict";

  const SCHEMA_VERSION = 1;
  const STYLE_IDS = ["insight", "action", "intuition", "perception"];
  const TIE_PRIORITY = ["intuition", "insight", "perception", "action"];
  const FAILURE_IDS = new Set([
    "sideRouteMorning",
    "sideRouteOffice",
    "officeInspection",
    "soilDump",
    "pipeOpened",
    "pipeBeforeTunnel"
  ]);
  const DISCOVERY_IDS = new Set([
    "menuSecret",
    "wallVoice",
    "doorMemory",
    "bookshelfSecret",
    "mapEdge",
    "fourCorners",
    "officeSecret"
  ]);
  const STYLE_NAMES = Object.freeze({
    insight: "洞察者",
    action: "突围者",
    intuition: "策局者",
    perception: "潜行者"
  });
  const LEGACY_REASON = "你依靠耐心与长线规划走到最后，因此被判定为策局者。";
  const REASON_FRAGMENTS = Object.freeze({
    insight: Object.freeze({
      directEvidence: "主动搜集了散落的证据",
      observedEvidence: "愿意停下来倾听被忽略的谈话"
    }),
    action: Object.freeze({
      directness: "没有依赖大量旁支情报",
      mapIndependence: "更多依靠临场判断向前",
      alternateRoute: "在原计划受阻后迅速换路",
      outsidePlan: "主动尝试了计划之外的出口",
      recovery: "从数次险境中重新站稳"
    }),
    intuition: Object.freeze({
      mapUse: "反复确认了地图与路线",
      landmarks: "逐一掌握了关键地点",
      preparedEvidence: "在最终行动前准备了足够信息",
      standardPlan: "让最初的藏匿计划顺利落地"
    }),
    perception: Object.freeze({
      cleanStages: "在高风险行动中始终把握住时机",
      discoveries: "留意到了环境里容易错过的细节"
    })
  });

  function clamp01(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return Math.max(0, Math.min(1, number));
  }

  function normalizeCount(value, maximum) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return Math.max(0, Math.min(maximum, Math.floor(number)));
  }

  function normalizeUniqueIds(values, allowedIds) {
    if (!Array.isArray(values)) return [];
    return Array.from(new Set(values.filter((id) => allowedIds.has(id))));
  }

  function normalizeScores(scores) {
    const normalized = {};
    STYLE_IDS.forEach((id) => {
      const value = scores && Number(scores[id]);
      normalized[id] = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
    });
    return normalized;
  }

  function normalizeLockedResult(result) {
    if (!result || !STYLE_IDS.includes(result.id) || typeof result.reason !== "string") {
      return null;
    }
    return {
      id: result.id,
      scores: normalizeScores(result.scores),
      reason: result.reason.slice(0, 180),
      legacy: Boolean(result.legacy)
    };
  }

  function createState(options) {
    const legacyFallback = Boolean(options && options.legacyFallback);
    return {
      schemaVersion: SCHEMA_VERSION,
      legacyFallback,
      yardMapOpenCount: 0,
      pipeMapOpenCount: 0,
      evidenceBeforeStoryOffice: null,
      outsidePlanEscapeSeen: false,
      recoveredFailureIds: [],
      discoveryIds: [],
      lockedResult: null
    };
  }

  function restoreState(record, options) {
    const legacyFallback = Boolean(options && options.legacyFallback);
    if (!record || record.schemaVersion !== SCHEMA_VERSION) {
      return createState({ legacyFallback });
    }
    return {
      schemaVersion: SCHEMA_VERSION,
      legacyFallback: legacyFallback || Boolean(record.legacyFallback),
      yardMapOpenCount: normalizeCount(record.yardMapOpenCount, 999),
      pipeMapOpenCount: normalizeCount(record.pipeMapOpenCount, 999),
      evidenceBeforeStoryOffice: record.evidenceBeforeStoryOffice === null ? null :
        normalizeCount(record.evidenceBeforeStoryOffice, 8),
      outsidePlanEscapeSeen: Boolean(record.outsidePlanEscapeSeen),
      recoveredFailureIds: normalizeUniqueIds(record.recoveredFailureIds, FAILURE_IDS),
      discoveryIds: normalizeUniqueIds(record.discoveryIds, DISCOVERY_IDS),
      lockedResult: normalizeLockedResult(record.lockedResult)
    };
  }

  function captureState(state) {
    return restoreState(state, { legacyFallback: Boolean(state && state.legacyFallback) });
  }

  function recordMapOpen(state, kind) {
    if (!state) return;
    if (kind === "yard") {
      state.yardMapOpenCount = normalizeCount(state.yardMapOpenCount + 1, 999);
    } else if (kind === "pipe") {
      state.pipeMapOpenCount = normalizeCount(state.pipeMapOpenCount + 1, 999);
    }
  }

  function recordEvidenceBeforeStoryOffice(state, evidenceCount) {
    if (!state || state.evidenceBeforeStoryOffice !== null) return;
    state.evidenceBeforeStoryOffice = normalizeCount(evidenceCount, 8);
  }

  function recordOutsidePlanEscape(state) {
    if (state) state.outsidePlanEscapeSeen = true;
  }

  function recordUnique(state, field, id, allowedIds) {
    if (!state || !allowedIds.has(id)) return;
    const current = Array.isArray(state[field]) ? state[field] : [];
    if (!current.includes(id)) current.push(id);
    state[field] = current;
  }

  function recordFailureRecovery(state, id) {
    recordUnique(state, "recoveredFailureIds", id, FAILURE_IDS);
  }

  function recordDiscovery(state, id) {
    recordUnique(state, "discoveryIds", id, DISCOVERY_IDS);
  }

  function getInput(state, snapshot) {
    const safeState = restoreState(state);
    const source = snapshot || {};
    const directEvidenceCount = normalizeCount(source.directEvidenceCount, 5);
    const observedEvidenceCount = normalizeCount(source.observedEvidenceCount, 3);
    const totalEvidenceCount = directEvidenceCount + observedEvidenceCount;
    const yardMapOpenCount = normalizeCount(safeState.yardMapOpenCount, 4);
    const pipeMapOpenCount = normalizeCount(safeState.pipeMapOpenCount, 2);
    const totalMapOpenCount = yardMapOpenCount + pipeMapOpenCount;
    const recoveredFailureIds = normalizeUniqueIds(safeState.recoveredFailureIds, FAILURE_IDS);
    const discoveryIds = normalizeUniqueIds(safeState.discoveryIds, DISCOVERY_IDS);
    const evidenceBeforeStoryOffice = safeState.evidenceBeforeStoryOffice === null ? 0 :
      normalizeCount(safeState.evidenceBeforeStoryOffice, 8);
    return {
      directEvidenceCount,
      observedEvidenceCount,
      totalEvidenceCount,
      yardMapOpenCount,
      pipeMapOpenCount,
      totalMapOpenCount,
      landmarkCount: normalizeCount(source.landmarkCount, 5),
      evidenceBeforeStoryOffice,
      alternateRouteCompleted: Boolean(source.alternateRouteCompleted),
      outsidePlanEscapeSeen: Boolean(safeState.outsidePlanEscapeSeen),
      recoveredFailureIds,
      discoveryIds,
      standardRoutePlanCompleted: Boolean(source.standardRoutePlanCompleted),
      cleanStageCount: normalizeCount(source.cleanStageCount, 4)
    };
  }

  function calculateContributions(state, snapshot) {
    const input = getInput(state, snapshot);
    return {
      insight: {
        directEvidence: input.directEvidenceCount / 5 * 70,
        observedEvidence: input.observedEvidenceCount / 3 * 30
      },
      action: {
        directness: (1 - input.totalEvidenceCount / 8) * 30,
        alternateRoute: input.alternateRouteCompleted ? 20 : 0,
        recovery: Math.min(input.recoveredFailureIds.length, 3) / 3 * 20,
        mapIndependence: (1 - input.totalMapOpenCount / 6) * 20,
        outsidePlan: input.outsidePlanEscapeSeen ? 10 : 0
      },
      intuition: {
        mapUse: input.totalMapOpenCount / 6 * 40,
        landmarks: input.landmarkCount / 5 * 25,
        preparedEvidence: input.evidenceBeforeStoryOffice / 8 * 20,
        standardPlan: input.standardRoutePlanCompleted ? 15 : 0
      },
      perception: {
        cleanStages: input.cleanStageCount / 4 * 70,
        discoveries: Math.min(input.discoveryIds.length, 4) / 4 * 30
      }
    };
  }

  function sumContributions(contributions) {
    const scores = {};
    STYLE_IDS.forEach((styleId) => {
      scores[styleId] = Object.values(contributions[styleId])
        .reduce((total, value) => total + value, 0);
    });
    return scores;
  }

  function selectWinner(scores) {
    let winner = TIE_PRIORITY[0];
    TIE_PRIORITY.slice(1).forEach((styleId) => {
      if (scores[styleId] > scores[winner] + Number.EPSILON) {
        winner = styleId;
      }
    });
    return winner;
  }

  function buildReason(styleId, contributions) {
    const fragments = REASON_FRAGMENTS[styleId];
    const strongest = Object.entries(contributions[styleId])
      .filter((entry) => entry[1] > 0)
      .sort((left, right) => right[1] - left[1])
      .slice(0, 2)
      .map((entry) => fragments[entry[0]])
      .filter(Boolean);
    const behavior = strongest.length > 0 ? strongest.join("，也") : "始终按照自己的方式向前";
    return `你${behavior}，因此被判定为${STYLE_NAMES[styleId]}。`;
  }

  function calculateResult(state, snapshot) {
    const contributions = calculateContributions(state, snapshot);
    const rawScores = sumContributions(contributions);
    const winner = selectWinner(rawScores);
    const scores = {};
    STYLE_IDS.forEach((styleId) => {
      scores[styleId] = Math.round(rawScores[styleId] * 10) / 10;
    });
    return {
      id: winner,
      scores,
      reason: buildReason(winner, contributions),
      legacy: false
    };
  }

  function lockResult(state, snapshot) {
    if (!state) throw new Error("Playstyle state is unavailable.");
    const existing = normalizeLockedResult(state.lockedResult);
    if (existing) {
      state.lockedResult = existing;
      return existing;
    }
    const result = state.legacyFallback ? {
      id: "intuition",
      scores: { insight: 0, action: 0, intuition: 100, perception: 0 },
      reason: LEGACY_REASON,
      legacy: true
    } : calculateResult(state, snapshot);
    state.lockedResult = result;
    return result;
  }

  root.BeyondWallsPlaystyle = Object.freeze({
    schemaVersion: SCHEMA_VERSION,
    styleIds: STYLE_IDS.slice(),
    createState,
    restoreState,
    captureState,
    recordMapOpen,
    recordEvidenceBeforeStoryOffice,
    recordOutsidePlanEscape,
    recordFailureRecovery,
    recordDiscovery,
    calculateResult,
    lockResult
  });
})(typeof window !== "undefined" ? window : globalThis);
