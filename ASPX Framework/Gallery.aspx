<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/site.Master" Inherits="System.Web.Mvc.ViewPage<Genesis.ViewModels.Page>" %>
<asp:Content ContentPlaceHolderID="h1_Title" runat="server"><%: Model.Data.Title %></asp:Content>

<asp:Content ContentPlaceHolderID="h2_Meta" runat="server"><%: HtmlHelpers.Meta( Html, "description", Model.Data.MetaDescription ) %></asp:Content>

<asp:Content ContentPlaceHolderID="h3_Styles" runat="server">
    <link rel="stylesheet" type="text/css" href="/Content/css/pages/gallery.css?v=1.0" />
</asp:Content>

<asp:Content ContentPlaceHolderID="h4_Scripts" runat="server"></asp:Content>

<asp:Content ContentPlaceHolderID="B00_BodyAttributes" runat="server">class="P--<%: Model.Url.Substring( 1 ).Replace( "/", "--" ) %>"</asp:Content>

<asp:Content ContentPlaceHolderID="B10_Headline" runat="server"></asp:Content>

<asp:Content ContentPlaceHolderID="B20_MainContent" runat="server">

    <%--Gallery Section--%>
    <section class="main-section">
		<div class="pagination"><% Html.RenderPartial( "~/Views/Page/Pagination.ascx", Model.PaginationData ); %></div>
		<div class="gallery-image-grid" id="lightbox-gallery">
			<div class="grid-sizer"></div>
			<% var images = Model.ChildPages;  %>
			<% foreach (var image in images) { %>
			<a class="gallery-image slide-in bottom">
				<img src="<%: image.Data.Image  %>" alt="<%: image.Data.ImageAlt %>" title="<%: image.Data.ImageTitle %>"/>
			</a>
			<% } %>
		</div>
		<div class="pagination"><% Html.RenderPartial( "~/Views/Page/Pagination.ascx", Model.PaginationData ); %></div>
	</section>
</asp:Content>

<asp:Content ContentPlaceHolderID="B99_JavaScript_EndOfBody" runat="server">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/3.1.8/imagesloaded.pkgd.min.js"></script>
	<script type="module" src="/Content/js/lightbox.js?v=1.01"></script>
	<script type="text/javascript" src="/Content/js/Masonry-Grid.js?v=1.01"></script>
	<script>
		$(document).ready(function () {
			$('.gallery-image-grid').imagesLoaded(function () {
				$('.gallery-image-grid').masonry({
					// options...
					itemSelector: '.gallery-image',
					columnWidth: '.grid-sizer',
					percentPosition: true,
					transitionDuration: 0
				});
			});
		});
    </script>
</asp:Content>