"use strict";
const config = window.SITE_CONFIG || {};
const safeUrl = value => {
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : null; } catch { return null; }
};
Object.entries(config.colors || {}).forEach(([key, value]) => {
  if (["accent", "primary", "background"].includes(key) && CSS.supports("color", value)) document.documentElement.style.setProperty(`--${key}`, value);
});
if (config.logo) document.querySelectorAll(".brand-mark").forEach(image => { image.src = config.logo; });
document.getElementById("year").textContent = new Date().getFullYear();
const dialog = document.getElementById("link-dialog");
function openMissingLink(label) {
  document.getElementById("dialog-title").textContent = `${label} coming soon.`;
  dialog.showModal();
}
document.querySelectorAll(".dialog-close, .dialog-done").forEach(button => button.addEventListener("click", () => dialog.close()));
dialog.addEventListener("click", event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.querySelectorAll('[data-link="discord"]').forEach(button => button.addEventListener("click", () => {
  const url = safeUrl(config.discord);
  if (url) window.open(url, "_blank", "noopener,noreferrer"); else openMissingLink("Discord invite");
}));
const icons = { code: "〈/〉", tools: "⌘", spark: "✧", download: "↓", database: "▤" };
const repoGrid = document.getElementById("repo-grid");
(config.repositories || []).forEach((repo, index) => {
  const card = document.createElement("article"); card.className = "repo-card";
  if (repo.id) card.id = repo.id;
  const top = document.createElement("div"); top.className = "card-top";
  const icon = document.createElement("span"); icon.className = "repo-icon"; icon.textContent = icons[repo.icon] || "〈/〉"; icon.setAttribute("aria-hidden", "true");
  const number = document.createElement("span"); number.textContent = `0${index + 1}`; top.append(icon, number);
  const category = document.createElement("p"); category.className = "eyebrow"; category.textContent = repo.category;
  const title = document.createElement("h3"); title.textContent = repo.name;
  const description = document.createElement("p"); description.textContent = repo.description;
  const url = safeUrl(repo.url); const link = document.createElement(url ? "a" : "button"); link.className = "card-link";
  link.textContent = url ? `${repo.action || "Explore repository"} ↗` : "Link coming soon ↗";
  if (url) { link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; }
  else link.addEventListener("click", () => openMissingLink(repo.name));
  card.append(top, category, title, description, link); repoGrid.append(card);
});
const people = document.getElementById("contributor-list");
if (!(config.contributors || []).length) {
  const empty = document.createElement("div"); empty.className = "credits-placeholder";
  const symbol = document.createElement("span"); symbol.className = "credits-symbol"; symbol.textContent = "✧"; symbol.setAttribute("aria-hidden", "true");
  const copy = document.createElement("div"); const title = document.createElement("h3"); title.textContent = "Our contributor wall is taking shape.";
  const description = document.createElement("p"); description.textContent = "Credits will be added here to celebrate the people behind Decomp Frontier.";
  copy.append(title, description); empty.append(symbol, copy); people.append(empty);
} else config.contributors.forEach(person => {
  const url = safeUrl(person.url); const card = document.createElement(url ? "a" : "div"); card.className = "person";
  if (url) { card.href = url; card.target = "_blank"; card.rel = "noopener noreferrer"; card.setAttribute("aria-label", `${person.name}: view GitHub profile (opens in a new tab)`); }
  const avatar = document.createElement("span"); avatar.className = "avatar"; avatar.textContent = person.name.trim().split(/\s+/).map(word => Array.from(word)[0]).slice(0, 2).join("");
  const copy = document.createElement("div"); const name = document.createElement("h3"); name.textContent = person.name;
  copy.append(name);
  if (person.username) { const username = document.createElement("p"); username.textContent = `@${person.username}`; copy.append(username); }
  if (person.role) { const role = document.createElement("p"); role.textContent = person.role; copy.append(role); }
  const profileLabel = document.createElement("span"); profileLabel.className = url ? "profile-link-label" : "profile-link-unavailable";
  profileLabel.textContent = url ? "View GitHub profile ↗" : "GitHub profile not listed";
  copy.append(profileLabel);
  card.append(avatar, copy); people.append(card);
});
const toggle = document.querySelector(".menu-toggle"); const navigation = document.getElementById("navigation");
function closeMenu() { toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open navigation"); navigation.classList.remove("open"); }
toggle.addEventListener("click", () => { const expanded = toggle.getAttribute("aria-expanded") !== "true"; toggle.setAttribute("aria-expanded", String(expanded)); toggle.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation"); navigation.classList.toggle("open", expanded); });
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => { if (event.key === "Escape" && navigation.classList.contains("open")) { closeMenu(); toggle.focus(); } });
