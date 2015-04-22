(function ($) {
  Drupal.behaviors.nesteoilFormsBehavior = {
    attach: function (context, settings) {
      if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        // Safari doesn't render grandient text correctly
        var brandBlue = $('.brand-blue').css("color");
        $('.brand-blue').css('-webkit-text-fill-color', brandBlue);
      }
      // $('#slider1').tinycarousel();
      // $('#slider1').carousel();
      $('#slider1', context).slick({
        infinite: true,
        speed: 300,
        centerMode: true,
        centerPadding: '30px',
        slidesToShow: 3,
        variableWidth: true,
        mobileFirst: true,
        arrows: false,
        responsive: [
        {
          breakpoint: 960,
          settings: {
            arrows: true,
            centerPadding: '60px',
          }
        },
      ]

      });

      $('input.form-text').each(function(){
        if($(this).val().length>0) {
          $(this).prev('label').addClass('focus');
        }
      });
      $('input.form-text').focus(function(){
        $(this).prev('label').addClass('focus');
      });
      $('input.form-text').blur(function(){
        if($(this).val().length==0) {
          $(this).prev('label').removeClass('focus');
        }
      });
    }
  }
})(jQuery);
