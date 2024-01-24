<%--
	Tabs section partial.

	Templates with this partial must have:
		* Page relation name in template must be "Tabs"
--%>

<%
    // Check if page template containing partial has relation named Tabs
    if ( (( IDictionary<string, object>)Model.Related).ContainsKey("Tabs")) {
	    Collection<Genesis.ViewModels.Page> relatedTabs = Model.Related.Tabs.Pages;
	    // Filter out Tabs with no question or answer
	    var validRelatedTabs = relatedTabs.Where(x => !string.IsNullOrEmpty(x.Data.TabName) && !HtmlHelpers.IsNullOrEmpty(x.Data.TabContent));

	    if (validRelatedTabs.Any()) {
%>
        <section class="tab-section">
            <div class="wrapper">
              <div class="mobile-slider">
                <div class="tabs-contain js-tabs-contain" aria-labelledby="category-name">
                    <% for (var i = 0; i < validRelatedTabs.Count(); i++) {
					        var tab = validRelatedTabs.ElementAt(i);
                    %>
                        <button id="tab-<%: i + 1 %>" class="tab-button js-tab-toggle" aria-controls="panel-<%: i + 1 %>" 
                                aria-selected="<%: i == 0 ? "true" : "false" %>" 
                                tabindex="<%: i == 0 ? "0" : "-1" %>">
                            <%: tab.Data.TabName %>
                            <span class="plus-minus-indicator"></span>
                        </button>
                    <% } %>
                </div>
              </div>
              <div class="tab-panels js-panel-container">
                <% for (var i = 0; i < validRelatedTabs.Count(); i++) {
					    var tab = validRelatedTabs.ElementAt(i);
                %>
                  <div id="panel-<%: i + 1 %>" class="tab-content wrapper js-tab-content" tabindex="<%: i == 0 ? "0" : "-1" %>"
                       aria-labelledby="tab-<%: i + 1 %>" <%: i == 0 ? " " : "hidden " %>>
                    <%: tab.Data.TabContent %>
                  </div>
                <% } %>
              </div>
            </div>
        </section>

        <script type="text/javascript" src="/Content/js/tabs.js"></script>
<%      }
    }
%>