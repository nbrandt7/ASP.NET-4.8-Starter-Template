public static bool IsNullOrEmpty( object input ) {
	if (input == null) { return true; }
	if (input is string regularString) {
		return string.IsNullOrEmpty( regularString );
	}
	if (input is IHtmlString htmlString) {
		HtmlAgilityPack.HtmlDocument doc = new HtmlAgilityPack.HtmlDocument();
		doc.LoadHtml( htmlString.ToString() );
		HtmlNodeCollection mediaEls = doc.DocumentNode.SelectNodes( "//video|//img|//picture" );
		if (mediaEls != null && mediaEls.Count > 0) {
			return false;
		}
		return string.IsNullOrEmpty( doc.DocumentNode.InnerText );
	}
	return string.IsNullOrEmpty( input.ToString() );
}