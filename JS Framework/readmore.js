{
/* 
<div class="js-read-more" data-limit="200">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in erat accumsan, volutpat leo tempor, efficitur ex. Suspendisse potenti. Vivamus risus mauris, congue id ullamcorper sed, suscipit non est. Donec semper gravida eros. Phasellus ac venenatis mauris. Sed blandit libero id imperdiet tristique. Duis placerat viverra sem.
</div> 
*/
}

$(document).ready(function () {
  $(".js-read-more").each(function () {
    var $content = $(this);
    var text = $content.text();
    var charLimit = $content.data('limit') || 200;
    var $more = $('<span>').css('display', 'none').html(text.slice(charLimit));
    var $dots = $('<span>').css('display', 'inline').html('...');
    var $btn = $('<button>').text('Read more').on('click', function () {
      $dots.toggle();
      $more.toggle();
      if ($dots.is(':hidden')) {
        $btn.text('Read less');
      } else {
        $btn.text('Read more');
      }
    });
    $content.html(text.slice(0, charLimit)).append($dots, $more, $btn);
  });
});
