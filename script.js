(() => {
  "use strict";

  const LINK_GROUPS = [
    {
      title: "Security & Email",
      links: [
        { url: "https://us3.proofpointessentials.com", label: "Proofpoint Essentials" },
        { url: "https://urldefense.proofpoint.com", label: "Proofpoint URL Defense (HTTPS)" },
        { url: "http://urldefense.proofpoint.com", label: "Proofpoint URL Defense (HTTP)" },
      ],
    },
    {
      title: "Productivity",
      links: [
        { url: "https://translate.google.com", label: "Google Translate" },
      ],
    },
    {
      title: "DocuSign",
      links: [
        { url: "https://docusign.com", label: "DocuSign" },
        { url: "https://apps.docusign.com", label: "DocuSign Apps" },
        { url: "https://na3.docusign.net", label: "DocuSign NA3 (HTTPS)" },
        { url: "http://na3.docusign.net", label: "DocuSign NA3 (HTTP)" },
      ],
    },
    {
      title: "SharePoint & Microsoft",
      links: [
        { url: "https://ambercourtal-my.sharepoint.com", label: "SharePoint OneDrive" },
        { url: "https://ambercourtal.sharepoint.com/", label: "SharePoint Team (HTTPS)" },
        { url: "http://ambercourtal.sharepoint.com/", label: "SharePoint Team (HTTP)" },
        { url: "https://sharepoint.com", label: "SharePoint" },
        { url: "https://login.microsoftonline.com", label: "Microsoft Online Login" },
      ],
    },
    {
      title: "Training & Education",
      links: [
        { url: "https://wow.boomlearning.com", label: "Boom Learning" },
        { url: "https://www.ultimateslp.com", label: "Ultimate SLP" },
        { url: "https://wellboundchha.showdme.net", label: "ShowdMe (HTTPS)" },
        { url: "http://wellboundchha.showdme.net", label: "ShowdMe (HTTP)" },
      ],
    },
    {
      title: "Government",
      links: [
        { url: "https://nyc.gov", label: "NYC.gov (HTTPS)" },
        { url: "http://nyc.gov", label: "NYC.gov (HTTP)" },
      ],
    },
    {
      title: "IO Health",
      links: [
        { url: "https://iohealth.ai", label: "IO Health AI" },
        { url: "https://iohealthtech.com", label: "IO Health Tech" },
        { url: "https://portal.iohealthtech.com", label: "IO Health Portal" },
      ],
    },
    {
      title: "Forms",
      links: [
        { url: "https://forms.office.com/Pages/ResponsePage.aspx?", label: "Microsoft Forms" },
      ],
    },
  ];

  const externalIcon =
    '<svg class="link-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>';

  const arrowIcon =
    '<svg class="link-item-external" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"/></svg>';

  function buildLinks() {
    const container = document.getElementById("linksContainer");
    if (!container) return;

    const fragment = document.createDocumentFragment();

    LINK_GROUPS.forEach((group) => {
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

  document.addEventListener("DOMContentLoaded", () => {
    buildLinks();
    initToggle();
    initTheme();
  });
})();
