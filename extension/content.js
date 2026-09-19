(function () {
  if (window.__gravityForceChip) return;
  window.__gravityForceChip = true;
  const chip = document.createElement("button");
  chip.type = "button";
  chip.id = "gf-chip";
  chip.textContent = "Gravity Force · log bandwidth";
  chip.addEventListener("click", () => {
    const text = document.body.innerText || "";
    const mbps = [...text.matchAll(/(\d+(?:\.\d+)?)\s*Mbps/gi)].map((m) => m[1]);
    chip.textContent =
      mbps.length >= 2
        ? `Found ${mbps[0]} / ${mbps[1]} Mbps — open the popup`
        : "No Mbps labels found — enter them in the popup";
  });
  document.documentElement.appendChild(chip);
})();
