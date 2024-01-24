<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<%
    Collection<Genesis.ViewModels.Page> visualNavItems = Model.Related.NavItems;
    string url = ViewData.ContainsKey("Url") ? ViewData["Url"] as string : string.Empty;
    bool isAnchor = !string.IsNullOrEmpty(url);
    string imageSrc = ViewData["ImageSrc"] as string ?? string.Empty;
    string imageAlt = ViewData["ImageAlt"] as string ?? string.Empty;
    string htmlContent = ViewData["HtmlContent"] as string ?? string.Empty;
    bool hasDescription = ViewData.ContainsKey("HasDescription") && (bool)ViewData["HasDescription"];
%>
<div class="visual-nav col-max-<%:  %> services-nav single-row">
<% foreach (var item in visualNavItems) { %>
    <% if (isAnchor) { %>
        <a href="<%= url %>" title="" class="nav-item js-visual-nav-item has-url">
            <img class="cover-img-bg" src="<%= imageSrc %>?width=590&height=490&mode=max" alt="<%= imageAlt %>" title="" />
            <div class="content-contain js-nav-item-content">
                <%= htmlContent %>
            </div>
        </a>
    <% } else { %>
        <div class="nav-item js-visual-nav-item span-row has-description">
            <img class="cover-img-bg" src="<%= imageSrc %>" alt="<%= imageAlt %>" title="" />
            <div class="content-contain js-nav-item-content">
                <%= htmlContent %>
            </div>
        </div>
    <% } %>
<% } %>
</div>

<%-- htmlContent is 
<h3 class="has-arrow"><span><%: item.seName %></span></h3>
<p class="short-desc js-nav-item-desc"><%= Html.GetEntryText(item.FieldInstances, "Short Description") %></p> --%>