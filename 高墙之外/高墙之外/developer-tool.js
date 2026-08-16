/* Root-level UI for local story-node debugging. */
(function () {
  "use strict";

  const gameCanvas = document.getElementById("game");
  const panel = document.getElementById("developerPanel");
  const closeButton = document.getElementById("developerCloseButton");
  const reloadButton = document.getElementById("developerReloadButton");
  const jumpButton = document.getElementById("developerJumpButton");
  const status = document.getElementById("developerStatus");
  const nodeList = document.getElementById("developerNodeList");

  let nodes = [];
  let selectedNodeId = "";
  let sixPressTimes = [];

  function api() {
    return window.BeyondWallsDebug || null;
  }

  function setStatus(message) {
    status.textContent = message;
  }

  function isSixKey(event) {
    return event.key === "6" || event.code === "Digit6" || event.code === "Numpad6";
  }

  function isEditableTarget(target) {
    return target && (
      target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" || target.isContentEditable
    );
  }

  function describeState(state) {
    if (!state) return "已连接互动空间。";
    const player = state.player || {};
    const position = Number.isFinite(player.x) && Number.isFinite(player.y)
      ? " ｜ 位置 " + player.x + ", " + player.y
      : "";
    const ambient = state.ambientConversation && state.ambientConversation.activeTopicId
      ? " ｜ 环境交谈：" + state.ambientConversation.activeTopicId
      : "";
    return "场景：" + (state.scene || "-") + " ｜ 节点：" + (state.quest || "-") +
      " ｜ 检查点：" + (state.checkpoint || "-") + position + ambient;
  }

  function selectNode(nodeId) {
    selectedNodeId = nodeId;
    jumpButton.disabled = !selectedNodeId;
    nodeList.querySelectorAll(".developer-node").forEach(function (button) {
      button.classList.toggle("is-selected", button.dataset.nodeId === selectedNodeId);
    });
  }

  function renderNodes() {
    nodeList.replaceChildren();
    if (!nodes.length) {
      const hint = document.createElement("p");
      hint.textContent = "等待互动空间提供可跳转节点…";
      nodeList.appendChild(hint);
      jumpButton.disabled = true;
      return;
    }
    const groups = new Map();
    nodes.forEach(function (node) {
      if (!groups.has(node.group)) groups.set(node.group, []);
      groups.get(node.group).push(node);
    });
    groups.forEach(function (groupNodes, groupName) {
      const section = document.createElement("section");
      section.className = "developer-group";
      const title = document.createElement("h2");
      title.textContent = groupName;
      section.appendChild(title);
      groupNodes.forEach(function (node) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "developer-node";
        button.dataset.nodeId = node.id;
        button.classList.toggle("is-selected", node.id === selectedNodeId);
        const name = document.createElement("strong");
        name.textContent = node.title;
        const note = document.createElement("span");
        note.textContent = node.note;
        button.append(name, note);
        section.appendChild(button);
      });
      nodeList.appendChild(section);
    });
    jumpButton.disabled = !selectedNodeId;
  }

  function requestGameData() {
    const debugApi = api();
    if (!debugApi) {
      setStatus("互动空间尚未初始化完成。");
      return false;
    }
    nodes = debugApi.getNodes();
    renderNodes();
    setStatus(describeState(debugApi.getState()));
    return true;
  }

  function openPanel() {
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    if (window.BeyondWallsMainControls && typeof window.BeyondWallsMainControls.releaseAll === "function") {
      window.BeyondWallsMainControls.releaseAll();
    }
    requestGameData();
    closeButton.focus();
  }

  function closePanel() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    if (gameCanvas) gameCanvas.focus();
  }

  function jumpToSelectedNode() {
    if (!selectedNodeId) {
      setStatus("请先选择一个节点。");
      return;
    }
    const selectedNode = nodes.find(function (node) { return node.id === selectedNodeId; });
    setStatus("正在跳转到：" + (selectedNode ? selectedNode.title : selectedNodeId));
    try {
      const result = api().jump(selectedNodeId);
      selectNode(result.nodeId);
      setStatus("已跳转到「" + result.title + "」。" + describeState(result.state));
      closePanel();
    } catch (error) {
      setStatus("跳转失败：" + (error && error.message ? error.message : String(error)));
    }
  }

  closeButton.addEventListener("click", closePanel);
  jumpButton.addEventListener("click", jumpToSelectedNode);
  reloadButton.addEventListener("click", function () { window.location.reload(); });
  nodeList.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-node-id]");
    if (button) selectNode(button.dataset.nodeId);
  });
  panel.addEventListener("click", function (event) {
    if (event.target === panel) closePanel();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && panel.classList.contains("is-open")) {
      event.preventDefault();
      event.stopPropagation();
      closePanel();
      return;
    }
    if (panel.classList.contains("is-open")) {
      if (["w", "a", "s", "d", " "].includes(event.key.toLowerCase())) {
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
    if (!isSixKey(event) || isEditableTarget(event.target)) return;
    const now = Date.now();
    sixPressTimes = sixPressTimes.filter(function (time) { return now - time <= 1000; });
    sixPressTimes.push(now);
    if (sixPressTimes.length >= 3) {
      sixPressTimes = [];
      event.preventDefault();
      event.stopPropagation();
      openPanel();
    }
  }, true);
  window.addEventListener("beyond-walls-debug-ready", requestGameData);

  renderNodes();
  requestGameData();
})();
