<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%--
	This partial requires a field in Genesis:
	- BannerImage* - Image File
    - BannerImageAlt - Text
    - BannerImageTitle - Text
    - Heading1* - Text
    - Heading1Sub* - Text
	for it to show up on the specific page template
--%>

<%
  if ((( IDictionary<String, object> )Model.Data ).ContainsKey( "BannerImage" )
        && (( IDictionary<String, object> )expandoObject ).ContainsKey( "Heading1" )) { 
          string bannerImg = !string.IsNullOrEmpty(Model.Data.BannerImage) ? Model.Data.BannerImage : "/Content/images/secondary/bannerDefault.jpg";
          string bannerImageAlt = !string.IsNullOrEmpty(Model.Data.BannerImageAlt) ? Model.Data.BannerImageAlt : Genesis.ConfigUtilities.Configuration.GetAppValue("SiteName","Core");
          string bannerImageTitle = !string.IsNullOrEmpty(Model.Data.BannerImageTitle) ? Model.Data.BannerImageTitle : "";
          %>
            <section class="secondary-banner flow">
                <div class="wrapper">
                    <div class="site-header-placeholder"></div>
                    <h1>
                      <%: Model.Data.Heading1 %>
                      <% if (!HtmlHelpers.IsNullOrEmpty(Model.Data.Heading1Sub)) { %>
                      <small><%: Model.Data.Heading1Sub %></small>
                      <% } %>
                    </h1>
                    <picture class="cover-img top parallax">
                        <img class="cover-img top" src="<%: bannerImage %>" alt="<%: bannerImageAlt %>" title="<%: bannerImageTitle %>"/>
                    </picture>
              </div>
            </section>
<% } %>