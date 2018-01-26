$(function() {
  // load localizations
  const language = url('?lang') || 'en';
  var browserLanguage = (navigator) ? navigator.language : undefined;

  if (browserLanguage && !url('?lang')) {
    browserLanguage = browserLanguage.replace('-', '_');

    if (browserLanguage.indexOf('en') === -1) {
      window.location = '/?lang=' + browserLanguage;
    }
  }

  if ($.inArray(language, Localizations.languages) !== -1) {
    $.each(Localizations, function(localizationTag, value) {
      $('[localization-tag="' + localizationTag + '"]').html(value[language]);
    });
  }

  // scroll functionality
  $('.view-section').click(function(e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $($(this).attr('href')).position().top
    }, 500);
  });

  $('.close-modal').click(function(e) {
    e.preventDefault();

    $('.zcl-warning').hide();
  })
});
