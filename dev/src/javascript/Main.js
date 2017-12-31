$(function() {
  $('.view-section').click(function(e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $($(this).attr('href')).position().top
    }, 500);
  });
});
