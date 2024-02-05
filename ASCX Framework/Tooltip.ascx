<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<%
	/// <summary>
	/// Hover tooltips
	/// </summary>

    ///<%
    ///Html.RenderPartial("~/Views/Page/Partials/Tooltip.ascx",
    ///    new ViewDataDictionary {
    ///        { "TooltipText", "Tooltip text goes here!" }
    ///    });
    ///%>


	// Tooltip text
	string tooltipText = ViewData["TooltipText"] as string ?? string.Empty;

	Guid guid = Guid.NewGuid();

	if (!string.IsNullOrEmpty(tooltipText)) {
%>
<span id="<%: guid %>" class="tooltip js-tooltip" tabindex="0">
	<svg class="icon"><use href="#info"></use></svg>
	<span class="tooltip-text js-tooltip-text">
		<span class="tooltip-inner"><%: tooltipText %></span>
	</span>
</span>

<script>
	document.addEventListener('DOMContentLoaded', () => {
		const tooltip = document.getElementById('<%: guid %>');
		
		if (tooltip) {
			const tooltipText = tooltip.querySelector('.js-tooltip-text');

			const positionTooltip = () => {
				// If header is sticky
				const headerHeight = document.querySelector('.js-site-header')?.offsetHeight ?? 0; 

				// Reset to default position
				tooltipText.classList.remove('pos-bottom');
				tooltipText.style.setProperty('--offset-x', '0px');

				const rect = tooltipText.getBoundingClientRect();

				// Check for overflow
				const overflowTop = rect.top < headerHeight; // rect.top < 0; if no sticky header
				const overflowLeft = rect.left < 0;
				const overflowRight = rect.right > window.innerWidth;

				if (overflowTop) {
					tooltipText.classList.add('pos-bottom');
				}

				if (overflowLeft) {
					const overflowAmount = Math.abs(rect.left);
					tooltipText.style.setProperty('--offset-x', `${overflowAmount}px`);
				} else if (overflowRight) {
					const overflowAmount = rect.right - window.innerWidth;
					tooltipText.style.setProperty('--offset-x', `-${overflowAmount}px`);
				}
			};

			['mouseover', 'click'].forEach(event =>
				tooltip.addEventListener(event, positionTooltip)
			);
		}
	});
</script>

<% } %>
