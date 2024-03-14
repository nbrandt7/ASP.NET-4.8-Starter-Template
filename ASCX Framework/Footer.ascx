<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<footer class="site-footer">
	<div class="main-footer wrapper">
		<div class="logo-contain">
			<a class="logo" href="/" title="Buy & sell used cars & parts at the best prices in the Milwaukee area">
				<img src="/Content/images/logos/SturtevantAuto_Logo.png" alt="Sturtevant Auto" title="" loading="lazy"/>
			</a>
			<address><a href="https://maps.app.goo.gl/54zSphE6tGrkyhoo8" target="_blank" title="Get directions to Sturtevant Auto on Google Maps">2145 N. East Frontage Rd. 1-94 Sturtevant, WI 53177</a></address>
			<ul>
				<li><strong>Monday - Friday:</strong> 8:30am - 5:00pm</li>
				<li><strong>Saturday:</strong> 8:30am - 3:00pm</li>
				<li><strong>Sunday:</strong> 9:00am - 2:00pm</li>
			</ul>
			<span class="primary-250">Last Daily Admission is 30 minutes prior to closing time</span>
			<button title="" data-tooltip="<div class='holiday-hours'><%: Html.ContentBlockHtml("Holiday Hours") %></div>">See Holiday Hours</button>
		</div>
		<nav class="footer-nav">
			<ul>
				<li><a href="/sell-junk-car" title="We pay top dollar for junk cars!">Sell Us Your Car</a></li>
				<li><a href="https://inventory.sturtevantauto.com" target="_blank" title="Shop our online store of used car parts">Vehicle Inventory</a></li>
				<li class="sub-link"><a href="https://inventory.sturtevantauto.com/Home/Interchange" target="_blank" title="">Interchange</a></li>
                <li><a href="/used-cars" title="Shop used cars at unbeatable prices">Buy a Used Car</a></li>
				<li><a href="/used-car-parts" title="Buy used car parts that fit your vehicle's year, make & model">Used Auto Parts</a></li>
			</ul>
			<ul>
				<li><a href="/about" title="Sturtevant Auto information & policies">About Us</a></li>
				<li><a href="/jobs" title="Apply for a job at Sturtevant Auto">Careers</a></li>
				<li><a href="/salvage-yard-news" title="The latest news and updates from Sturtevant Auto">News</a></li>
				<li><a href="/faq" title="Wisconsin junkyard FAQs">FAQs</a></li>
			</ul>
			<ul>
				<li><a href="/about/returns" title="Junkyard parts return policies">Returns</a></li>
				<li><a href="/about/policies" title="Junkyard policies">Policies</a></li>
				<li><a href="/contact" title="Get in touch to find a part or get a quote">Contact</a></li>
				<li><a href="/about/junkyard-reviews" title="Find out why our customers consider us the best junkyard in WI">Reviews</a></li>
			</ul>
			<ul>
				<li><a href="/yunque-de-carros/piezas-de-coches" title="¡Nuestros empleados hablan español!">Piezas de Coches</a></li>
				<li><a href="/yunque-de-carros/compramos-autos-usadas" title="Piezas de automóviles usadas">Compramos Autos Usadas</a></li>
				<li><a href="/yunque-de-carros/costas" title="Precios de piezas de automóvil">Costos de Piezas Usadas</a></li>
			</ul>
            <div class="cluster">
				<a href="https://www.bbb.org/wisconsin/business-reviews/auto-salvage-yards/sturtevant-used-auto-parts-in-mt-pleasant-wi-25003144/#bbbonlineclick" target="_blank">
					<img src="/Content/images/logos/BBB_Logo.png" alt="" title="" loading="lazy"/>
				</a>
				<a href="http://www.carsofwi.com/" target="_blank">
					<img src="/Content/images/logos/CarsOfWI_Logo.png" alt="" title="" loading="lazy"/>
				</a>
            </div>
		</nav>
	</div>

	<div class="service-areas-dropdown | js-dropdown">
		<div class="dropdown-header | wrapper arrow js-header">Serving the Wisconsin and Illinois Area</div>

		<div class="dropdown-content | wrapper js-content" data-aria-hidden="true">
            <div class="column">
			    <ul>
					<% foreach (var location in Genesis.ViewModels.Page.GetByUrl( "/salvage-yard" ).ChildPages) { %>
					<li>
						<a href="<%: location.Url %>" title="<%: location.Data.Title %>">
							<svg xmlns="http://www.w3.org/2000/svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#i-location"></use></svg><span><%: location.Data.Name %></span>
						</a>
					</li>
					<% } %>
                </ul>
            </div>
		</div>
	</div>

	<div class="copyright">
		<div class="wrapper">
			&copy; <%: DateTime.Now.Year %> Sturtevant Auto
		</div>
	</div>
	
</footer>