(() => {
  "use strict";

  const externalIcon =
    '<svg class="link-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>';

  const arrowIcon =
    '<svg class="link-item-external" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"/></svg>';

  function buildLinks() {
    const container = document.getElementById("linksContainer");
    var groups = window.LINK_GROUPS;
    if (!container || !groups) return;

    const fragment = document.createDocumentFragment();

    groups.forEach((group) => {
      const groupEl = document.createElement("div");
      groupEl.className = "link-group";

      const title = document.createElement("div");
      title.className = "link-group-title";
      title.textContent = group.title;
      groupEl.appendChild(title);

      group.links.forEach((link) => {
        const a = document.createElement("a");
        a.className = "link-item";
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.innerHTML = externalIcon +
          '<span class="link-item-text">' + escapeHtml(link.label) + "</span>" +
          arrowIcon;
        groupEl.appendChild(a);
      });

      fragment.appendChild(groupEl);
    });

    container.appendChild(fragment);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function initToggle() {
    const section = document.getElementById("linksSection");
    const toggle = document.getElementById("linksToggle");
    if (!section || !toggle) return;

    toggle.addEventListener("click", () => {
      const isOpen = section.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function initTheme() {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);

    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  function initVideo() {
    var btn = document.getElementById("videoToggle");
    var player = document.getElementById("videoPlayer");
    if (!btn || !player) return;

    btn.addEventListener("click", function () {
      var isOpen = player.classList.toggle("open");
      btn.textContent = isOpen ? "Hide video tutorial" : "Watch video tutorial";
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/></svg>';
      btn.innerHTML = svg + " " + (isOpen ? "Hide video tutorial" : "Watch video tutorial");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildLinks();
    initToggle();
    initTheme();
    initVideo();
  });
})();
