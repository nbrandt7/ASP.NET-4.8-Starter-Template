<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<%
    string sectionClass = ViewData["SectionClass"] as string ?? string.Empty;
	string sectionId = ViewData["SectionId"] as string ?? string.Empty;
	string altFAQHeading = ViewData["Heading"] as string ?? string.Empty;
    IHtmlString topContent = ViewData["Top Content"] as IHtmlString;
    IHtmlString bottomContent = ViewData["Bottom Content"] as IHtmlString;
    Collection<Genesis.ViewModels.Page> reviews = ViewData.ContainsKey("Reviews") ? ((Genesis.ViewModels.RelatedPagesList)ViewData["Reviews"]).Pages : null;

    if (reviews.Any()) {
		// string googleReviewsUrl = Genesis.ConfigUtilities.Configuration.GetAppValue("GoogleReviewsUrl","BusinessInfo");
%>
<section class="testimonial-section <%: sectionClass %> flow">
    <div class="wrapper">
		<h2><%: !string.IsNullOrEmpty(Model.Data.ReviewsHeading) ? Model.Data.ReviewsHeading : "Don’t Just Take Our Word For It"  %></h2>
        <%: topContent %>

		<div class="swiper-outer-contain js-slider-reviews">
			<div class="swiper-btn-prev light"></div>
			<div class="swiper js-swiper-slider has-scrollbar" data-swiper-init="swiperReviewsInit">
				<div class="swiper-wrapper">
					<%
						int truncateLength = 300;
						foreach (var review in validRelatedReviews) {
							string reviewText = review.Data.ReviewText;
							decimal reviewRating = review.Data.ReviewRating > 5 ? 5 : review.Data.ReviewRating;
					%>
					<div class="swiper-slide">
						<div class="review-card">
							<figure class="content-contain">
								<figcaption>
									<div class="icon-wrap">
										<svg class="icon">
											<use xlink:href="#reviews-google"></use>
										</svg>
									</div>
									<div class="author-contain">
										<cite><%: !string.IsNullOrEmpty(review.Data.ReviewAuthor) ? review.Data.ReviewAuthor : "Anonymous" %></cite>
										<span style="--rating-value: <%: reviewRating %>;" class="review-stars"></span>
									</div>
								</figcaption>

								<blockquote <%-- <%: !string.IsNullOrEmpty(googleReviewsUrl) ? String.Format("cite={0}", googleReviewsUrl) : "" %>--%>>
									<% if (reviewText.Length > truncateLength) { %>
									<p class="js-review review-text active"><%: HtmlHelpers.Truncate(Html, reviewText, truncateLength, "...") %></p>
									<p class="js-review review-text"><%: reviewText %></p>
									<button class="read-more-btn js-read-more" type="button">Read More</button>
									<% } else { %>
									<p class="review-text active"><%: reviewText %></p>
									<% } %>
								</blockquote>
							</figure>
						</div>
					</div>
					<% } %>
				</div>
				<div class="swiper-scrollbar"></div>
			</div>
			<div class="swiper-btn-next light"></div>
		</div>
        <%: bottomContent %>
	</div>
</section>

<script>
	document.addEventListener('DOMContentLoaded', () => {
		// Read more/less button
		$('.js-slider-reviews').on('click', '.js-read-more', function () {
			$(this).text($(this).text() === 'Read More' ? 'Read Less' : 'Read More');
			$(this).prevAll('.js-review').toggleClass('active');
		});

        $(function () {
            $('.review-card').matchHeight();
        });
	});

	/**
	 * Initialize and configure Swiper slider
	 */
	function swiperReviewsInit() {
		const sliderContainer = document.querySelector('.js-slider-reviews');
		const swiperSlider = sliderContainer.querySelector('.swiper');
		const swiperPrev = sliderContainer.querySelector('.swiper-btn-prev');
		const swiperNext = sliderContainer.querySelector('.swiper-btn-next');
		const slideCount = swiperSlider.querySelectorAll('.swiper-slide').length;

		const swiper = new Swiper(swiperSlider, {
			direction: 'horizontal',
			speed: 400,
			rewind: true,
			spaceBetween: 10,
			slidesPerView: 1,
			noSwipingSelector: 'button',
			navigation: {
				prevEl: swiperPrev,
				nextEl: swiperNext,
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: true,
			},
			freeMode: {
				enabled: true,
				sticky: true,
				momentumRatio: 0.5,
				momentumVelocityRatio: 0.5,
			},
			autoplay: {
				delay: 4000,
				disableOnInteraction: true,
				pauseOnMouseEnter: true,
			},
			breakpoints: {
				801: {
					spaceBetween: 20,
					slidesPerView: 2,
				},
				1001: {
					spaceBetween: 30,
					slidesPerView: 2,
				},
				1401: {
					slidesPerView: slideCount > 2 ? 3 : 2,
					spaceBetween: 35,
				},
			},
			on: {
				init: function () {
					swiperPrev.classList.add('active');
					swiperNext.classList.add('active');
				},
			},
		});
	};
</script>