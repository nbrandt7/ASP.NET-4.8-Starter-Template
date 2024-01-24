<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%--
Example Usage:
===============
Html.RenderPartial("~/Views/Page/Partials/ContentSection.ascx",
	new ViewDataDictionary {
		{ "Content", Model.Data.Content },
		{ "Image", Model.Data.ContentImg },
		{ "ImageAlt", Model.Data.ContentImgAlt },
		{ "ImageTitle", Model.Data.ContentImgTitle },
		{ "SectionClass", "example-section" }, //Not required but adds custom class
		{ "SectionId", "example-id" },
		{ "OrderImgLeft", true }, // Default is false
		{ "OrderImgTop", true }, // Default is false
		{ "ImageCover", true }, // Default is false
		{ "LazyLoad", false },
		{ "MediaQuery", 1200 }
	}
);
--%>

<%
	IHtmlString content = ViewData["Content"] as IHtmlString;

	if (!HtmlHelpers.IsNullOrEmpty( content )) {

		// Find Declared Variables
		string image = ViewData["Image"] as string ?? string.Empty;
		string imageAlt = ViewData["ImageAlt"] as string ?? string.Empty;
		string imageTitle = ViewData["ImageTitle"] as string ?? string.Empty;

		// Check if section has image
		bool hasImage = !string.IsNullOrEmpty( image );

		// Check if section has specific class
		string sectionClass = ViewData["SectionClass"] as string ?? string.Empty;

		//Check if section has specific id
		string sectionId = ViewData["SectionId"] as string ?? string.Empty;

		// Check if image covers side or remains contained - defaults to false.
		bool imageCover = ViewData.ContainsKey("ImageCover") && (bool)ViewData["ImageCover"];

		// Orders image to left of content on desktop view. Defaults to false.
		bool orderImgLeft = ViewData.ContainsKey("OrderImgLeft") && (bool)ViewData["OrderImgLeft"];

		// Orders image below content when it wraps to vertical layout on mobile - defaults to false.
		bool orderImgTop = ViewData.ContainsKey("OrderImgTop") && (bool)ViewData["OrderImgTop"];

		// Lazy load image. Should be set to false for content near top of page - defaults to true.
		bool isLazy = ViewData.ContainsKey("LazyLoad") ? (bool)ViewData["LazyLoad"] : true;

		// Media query used to flip content vertically - defaults to 1200 or custom number set below
		int mediaQuery = ViewData.ContainsKey("MediaQuery") ? (int)ViewData["MediaQuery"] : 1200;
%>
	<section class="<%: sectionClass %> flow" <%: !string.IsNullOrEmpty(sectionId) ? string.Format("id={0}", sectionId) : "" %>>

		<div class="<%: hasImage ? string.Format("split-section mq-{0}", mediaQuery) : "wrapper" %>">
			<% if (hasImage) { %>
			<div class="text-wrap">
				<%: content %>
			</div>
			<div class="img-wrap <%: orderImgLeft ? "img-left" : "" %> <%: orderImgTop ? "img-top" : "" %>">
				<picture>
					<img src="<%: image %>" class="<%: imageCover ? "cover-img" : "contain-img" %>" alt="<%: imageAlt %>" title="<%: imageTitle %>" <%: isLazy ? "loading=\"lazy\"" : "" %>/>
				</picture>
			</div>
			<% } else { %>
				<%: content %>
			<% } %>
		</div>
	</section>
<% } %>