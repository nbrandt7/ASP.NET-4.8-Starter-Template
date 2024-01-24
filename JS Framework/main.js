// Trim and Remove all empty <p></p>
const paragraphs = [
  ...document.querySelectorAll(".js-site-main p:not([class])"),
];
paragraphs.filter((p) => {
  p.innerHTML = p.innerHTML.replace(/^&nbsp;|&nbsp;$/g, "").trim();
  p.childNodes.length === 0 ? p.remove() : "";
});
