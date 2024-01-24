{
  /* 
<div role="mobileslider">
  <div role="tablist" aria-labelledby="channel-name">
      <button id="tab-1" role="tab" aria-controls="tabPanel-1" aria-selected="true" tabindex="0">Tab 1
      </button>
      <button id="tab-2" role="tab" aria-controls="tabPanel-2" aria-selected="false" tabindex="-1">Tab 2
      </button>
  </div>
</div>
<div class="tab-panels">
  <div id="tabPanel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
    <p>Tab Content 1</p>
  </div>

  <div id="tabPanel-2" hidden role="tabpanel" tabindex="0" aria-labelledby="tab-2">
    <p>Tab Content 2</p>
  </div>
</div>
*/
}

document.addEventListener("DOMContentLoaded", function () {
    const tabsContainer = document.querySelector(".js-tabs-contain");
    const tabButtons = tabsContainer.querySelectorAll(".js-tab-toggle");
    const tabPanelContainer = document.querySelector(".js-panel-container");
    const tabPanels = tabPanelContainer.querySelectorAll(".js-tab-content");

    tabsContainer.addEventListener("click", (e) => {
        const clickedTab = e.target.closest("button");
        const currentTab = tabsContainer.querySelector('[aria-selected="true"]');

        if (!clickedTab || clickedTab === currentTab) return;

        switchTab(clickedTab);
    });

    tabsContainer.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "Home":
                e.preventDefault();
                switchTab(tabButtons[0]);
                break;
            case "End":
                e.preventDefault();
                switchTab(tabButtons[tabButtons.length - 1]);
                break;
        }
    });

    function moveLeft() {
        const currentTab = document.activeElement;

        if (!currentTab.previousElementSibling) {
            tabButtons.item(tabButtons.length - 1).focus();
        } else {
            currentTab.previousElementSibling.focus();
        }
    }

    function moveRight() {
        const currentTab = document.activeElement;
        if (!currentTab.nextElementSibling) {
            tabButtons.item(0).focus();
        } else {
            currentTab.nextElementSibling.focus();
        }
    }

    function switchTab(newTab) {
        const activePanelId = newTab.getAttribute("aria-controls");
        const activePanel = document.querySelector(`#${activePanelId}`);
        tabButtons.forEach((button) => {
            button.setAttribute("aria-selected", false);
            button.setAttribute("tabindex", "-1");
        });

        tabPanels.forEach((panel) => {
            panel.setAttribute("hidden", true);
        });

        activePanel.removeAttribute("hidden", false);
        newTab.setAttribute("aria-selected", true);
        newTab.setAttribute("tabindex", "0");
        newTab.focus();
        tabPanelContainer.style.setProperty('--_height', `${activePanel.clientHeight}px`);
    }

    tabPanelContainer.style.setProperty('--_height', `${tabPanelContainer.querySelector(".js-tab-content:not([hidden])").clientHeight}px`);

    let resizeTimerTabs;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimerTabs);
        resizeTimerTabs = setTimeout(() => tabPanelContainer.style.setProperty('--_height', `${tabPanelContainer.querySelector(".js-tab-content:not([hidden])").clientHeight}px`), 100);
    });
});
