<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<nav class="upper-nav">
	<ul class="padding-x">
		<li class="american-made">
            <svg xmlns="http://www.w3.org/2000/svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#i-phone"></use></svg>
            100% American Made
        </li>
		<li><a class="accent js-phoneswap" href="/contact" title="">PHONE HERE</a></li>
		<li><a href="/contact" title="">Contact Us</a></li>
        <li>Login Here</li>
</nav>



<nav class="js-main-nav main-nav padding-x">
		<input type="checkbox" id="site-nav-toggle">

		<div class="hamburger-contain">
			<label for="site-nav-toggle" class="hamburger-menu">
				<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 200 200">
					<g stroke-width="8.5" stroke-linecap="round">
					  <path
						d="M72 82.286h28.75"
						fill="#009100"
						fill-rule="evenodd"
						stroke="#fff"
					  />
					  <path
						d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
						fill="none"
						stroke="#fff"
					  />
					  <path
						d="M72 125.143h28.75"
						fill="#009100"
						fill-rule="evenodd"
						stroke="#fff"
					  />
					  <path
						d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
						fill="none"
						stroke="#fff"
					  />
					  <path
						d="M100.75 82.286h28.75"
						fill="#009100"
						fill-rule="evenodd"
						stroke="#fff"
					  />
					  <path
						d="M100.75 125.143h28.75"
						fill="#009100"
						fill-rule="evenodd"
						stroke="#fff"
					  />
					</g>
				  </svg>
			</label>
		</div>

		<div class="logo-contain">
			<a class="logo" href="/" title="">
				<img src="/Content/images/logos/TODO.png" alt="" title=""/>
			</a>
		</div>

		<div class="mobile-nav-contain">
			<ul class="main-nav-list js-nav-list">
				<li class="dropdown" tabindex="0">
					<input type="checkbox" class="sub-menu-toggle" id="sub-menu-toggle1">
					<label class="sub-menu-label" for="sub-menu-toggle1">
						<a href="" target="" title=""><span class="drop-arrow">Die Sets</span></a>
					</label>
					
					<ul class="sub-menu">
						<li class="show-mobile"><a href="">TODO</a></li>
						<li><a href="" title="">TODO</a></li>
						<li><a href="" title="">TODO</a></li>
					</ul>
				</li>

				<li class="dropdown" tabindex="0">
					<input type="checkbox" class="sub-menu-toggle" id="sub-menu-toggle2">
					<label class="sub-menu-label" for="sub-menu-toggle2">
						<a href="" target="" title=""><span class="drop-arrow">Die Set Components</span></a>
					</label>
					
					<ul class="sub-menu">
						<li class="show-mobile"><a href="">Die Set Components</a></li>
						<li><a href="" title="">TODO</a></li>
						<li><a href="" title="">TODO</a></li>
					</ul>
				</li>

                <li><a href="" title="">Custom Die Set Machining</a></li>

                <li><a href="" title="">Catalog</a></li>

                <li><a href="" title="">3D Models</a></li>

                <li><a href="" title="">Company</a></li>
			</ul>
		</div>

		<div class="cta-contain">
			<a class="button accent js-phoneswap" href="/contact" title="">Get A Quote</a>
			<a class="mobile-contact js-phoneswap" href="/contact" title=""><svg xmlns="http://www.w3.org/2000/svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#i-phone"></use></svg></a>
            CART HERE
        </div>
</nav>