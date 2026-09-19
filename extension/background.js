const MENU_SCAN = "gf-scan";
const MENU_COPY = "gf-copy";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_SCAN,
      title: "Gravity Force: scan Mbps on this page",
      contexts: ["page"],
      documentUrlPatterns: ["https://play.geforcenow.com/*"],
    });
    chrome.contextMenus.create({
      id: MENU_COPY,
      title: "Gravity Force: copy last snapshot",
      contexts: ["action"],
    });
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === MENU_COPY) {
    await copyLast();
    return;
  }
  if (info.menuItemId === MENU_SCAN && tab?.id) {
    await scanTab(tab.id);
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "snapshot") {
    await scanActive();
    return;
  }
  if (command === "copy-stats") {
    await copyLast();
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "gf-scan-tab") {
    scanActive().then(sendResponse);
    return true;
  }
  return false;
});

async function scanActive() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return null;
  return scanTab(tab.id);
}

async function scanTab(tabId) {
  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const text = document.body?.innerText || "";
        const mbps = [...text.matchAll(/(\d+(?:\.\d+)?)\s*Mbps/gi)].map((m) =>
          Number(m[1]),
        );
        return { title: document.title, mbps };
      },
    });
    const available = result?.mbps?.[0];
    const used = result?.mbps?.[1];
    const lastCapture = {
      available: Number.isFinite(available) ? available : null,
      used: Number.isFinite(used) ? used : null,
      at: Date.now(),
      title: result?.title || "",
      source: "scan",
    };
    await chrome.storage.local.set({ lastCapture });
    chrome.action.setBadgeText({
      text: Number.isFinite(used) ? String(Math.round(used)) : "?",
    });
    chrome.action.setBadgeBackgroundColor({ color: "#a4c48a" });
    return lastCapture;
  } catch {
    chrome.action.setBadgeText({ text: "!" });
    return null;
  }
}

async function copyLast() {
  const { lastCapture } = await chrome.storage.local.get("lastCapture");
  if (!lastCapture) return;
  const lines = [
    "Gravity Force snapshot",
    lastCapture.available != null ? `Available ${lastCapture.available} Mbps` : null,
    lastCapture.used != null ? `Used ${lastCapture.used} Mbps` : null,
    "Independent. Not affiliated with NVIDIA.",
  ].filter(Boolean);
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (text) => navigator.clipboard.writeText(text),
    args: [lines.join("\n")],
  });
}
