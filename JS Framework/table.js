// Set Header Table Elements on Mobile
window.setMobileTable = function (selector) {
  const tableEl = document.querySelectorAll(selector);
  for (var i = 0; i < tableEl.length; i++) {
    const thEls = tableEl[i].querySelectorAll("thead th");
    const tdLabels = Array.from(thEls).map((el) => el.innerText);
    tableEl[i].querySelectorAll("tbody tr").forEach((tr) => {
      Array.from(tr.children).forEach((td, ndx) =>
        td.setAttribute("label", tdLabels[ndx])
      );
    });
  }
};
setMobileTable("table.js-mobile-table");
