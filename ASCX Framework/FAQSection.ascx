@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%--
Example Usage:
===============
Html.RenderPartial("~/Views/Page/Partials/FAQSection.ascx",
	new ViewDataDictionary {
		{ "FAQs", Model.Related.FAQs },
		{ "SectionClass", "example-class" },
		{ "SectionId", "example-id" },
		{ "Heading", "Example Heading" },
	}
);
--%>

<%
	string sectionClass = ViewData["SectionClass"] as string ?? string.Empty;
	string sectionId = ViewData["SectionId"] as string ?? string.Empty;
	string altFAQHeading = ViewData["Heading"] as string ?? string.Empty;
	Collection<Genesis.ViewModels.Page> relatedFAQs = ViewData.ContainsKey("FAQs") ? ((Genesis.ViewModels.RelatedPagesList)ViewData["FAQs"]).Pages : null;

	// Filter out FAQs with no question or answer
	var validRelatedFAQs = relatedFAQs.Where(x => !string.IsNullOrEmpty(x.Data.Question) && !HtmlHelpers.IsNullOrEmpty(x.Data.Answer));

	if (validRelatedFAQs.Any()) {
%>
<section class="faq-section <%: sectionClass %>" <%: sectionId != string.Empty ? string.Format("id={0}", sectionId) : "" %>>
	<div class="wrapper">
		<h2 class="faq-heading"><%: !string.IsNullOrEmpty(altFAQHeading) ? altFAQHeading : "Frequently Asked Questions"  %></h2>
		<% foreach (var faq in validRelatedFAQs) { %>
		<div class="faq-dropdown js-dropdown">
			<button class="dropdown-header arrow js-header">
				<h5><%: faq.Data.Question %></h5>	
			</button>
			<div class="dropdown-content js-content" data-aria-hidden="true">
				<%: faq.Data.Answer %>
			</div>
		</div>
		<%	} %>
	</div>
</section>

<script type="application/ld+json">
	<%=
		Newtonsoft.Json.JsonConvert.SerializeObject(
			new {
				__context = "https://schema.org",
				__type = "FAQPage",
				mainEntity = validRelatedFAQs.Select(FAQ => new {
					__type = "Question",
					name = FAQ.Data.Question,
					acceptedAnswer = new {
						__type = "Answer",
						text = ((IHtmlString)FAQ.Data.Answer).FixString()
					}
				})
			}
		)
		.Replace("__type", "@type")
		.Replace("__context", "@context")
	%>
</script>