function utilization(available, used) {
  if (!(available > 0) || used < 0) return 0;
  return Math.round((used / available) * 1000) / 10;
}

function diagnose(available, used, symptom) {
  const util = utilization(available, used);
  const fine = symptom === "fine";
  const blurry = symptom === "blurry";
  const hitch = symptom === "stuttering" || symptom === "lagging";

  if (used > available * 1.05) {
    return {
      title: "Numbers don't line up",
      detail: "Used is higher than available. Re-read the overlay labels from the same moment.",
    };
  }
  if (fine && util < 45) {
    return {
      title: "Low utilization looks normal",
      detail: "GeForce NOW is not trying to fill the pipe. Spare capacity is headroom, not a defect.",
    };
  }
  if (blurry && util < 45) {
    return {
      title: "Headroom exists, picture is soft",
      detail: "More likely a quality cap, Auto/Smooth fallback, or membership limit than a thin ISP plan.",
    };
  }
  if (hitch && !blurry && util < 70) {
    return {
      title: "Timing, not a thin pipe",
      detail: "Stutter with unused capacity usually points at ping, jitter, loss, or the device.",
    };
  }
  if (util >= 85 && !fine) {
    return {
      title: "Sitting on the ceiling",
      detail: "The stream is consuming nearly all bandwidth GFN says is available.",
    };
  }
  return {
    title: "Logged",
    detail: "Compare a second session before treating this as a pattern.",
  };
}

const form = document.getElementById("form");
const result = document.getElementById("result");
const dashboard = document.getElementById("dashboard");
const copyBtn = document.getElementById("copyBtn");
const scanBtn = document.getElementById("scanBtn");
const DEFAULT_SITE = "https://matthewcodergamer.github.io/gravityforce/";

chrome.storage.sync.get(["dashboardUrl"], (data) => {
  dashboard.href = data.dashboardUrl || DEFAULT_SITE;
});

chrome.storage.local.get(["lastCapture"], (data) => {
  const last = data.lastCapture;
  if (!last) return;
  if (last.available != null) document.getElementById("available").value = last.available;
  if (last.used != null) document.getElementById("used").value = last.used;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const available = Number(document.getElementById("available").value);
  const used = Number(document.getElementById("used").value);
  const symptom = document.getElementById("symptom").value;
  const util = utilization(available, used);
  const verdict = diagnose(available, used, symptom);
  result.classList.remove("hidden");
  result.innerHTML = `<strong>${used} / ${available} Mbps · ${util}%</strong><p><b>${verdict.title}.</b> ${verdict.detail}</p>`;
  chrome.storage.local.set({
    lastCapture: {
      available,
      used,
      util,
      symptom,
      resolution: document.getElementById("resolution").value,
      frameRate: document.getElementById("frameRate").value,
      at: Date.now(),
    },
  });
});

copyBtn.addEventListener("click", async () => {
  const available = document.getElementById("available").value;
  const used = document.getElementById("used").value;
  const text = [
    "Gravity Force snapshot",
    available ? `Available ${available} Mbps` : null,
    used ? `Used ${used} Mbps` : null,
    "Independent. Not affiliated with NVIDIA.",
  ]
    .filter(Boolean)
    .join("\n");
  await navigator.clipboard.writeText(text);
  copyBtn.textContent = "Copied";
  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 1200);
});

scanBtn.addEventListener("click", async () => {
  scanBtn.textContent = "Scanning";
  const response = await chrome.runtime.sendMessage({ type: "gf-scan-tab" });
  if (response?.available != null) {
    document.getElementById("available").value = response.available;
  }
  if (response?.used != null) {
    document.getElementById("used").value = response.used;
  }
  scanBtn.textContent = response?.available != null ? "Found" : "No Mbps";
  setTimeout(() => {
    scanBtn.textContent = "Scan page";
  }, 1400);
});
