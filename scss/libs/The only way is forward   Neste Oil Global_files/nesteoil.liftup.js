(function ($) {
  $.fn.noilCoverBackground = function( className ) {
    var $containers = $(this);

    $containers.each(function(){
      var targetImage = $(this).find('img');
      //console.log(targetImage);

      if ( !targetImage ) {
        return false;
      }

      var imageSrc = targetImage.attr('src');

      if ( !imageSrc ) {
        return;
      }

      $(this).css({
        'background-image': 'url("' + imageSrc + '")'
      });

      if ( className != null && !$(this).hasClass(className) ) {
        $(this).addClass(className);
      }

      if ( !$(this).hasClass('noil-cover-background') ) {
        $(this).addClass('noil-cover-background');
      }

      targetImage.fadeTo(0, 0);
    });
  }

  Drupal.behaviors.nesteoilLiftupBehavior = {
    attach: function (context, settings) {

      $('.field--name-field-headquarters-image .field__item').noilCoverBackground('noil-fixed-height-330');
      $('.view-release-and-stories-listing .field-resp-image .field-content').noilCoverBackground('noil-fixed-height-330');
      $('.view-blog-post-listing .field-resp-image .field-content').noilCoverBackground('noil-fixed-height-330');
      $('.node--cc-manual-liftup .field--type-image .field__item').noilCoverBackground('noil-fixed-height-500');
      $('.views-form-corporate-frontpage-grid-liftup-block .liftup-wrapper .img-wrap').noilCoverBackground('noil-fixed-height-330');
      $('.l-main .field--name-field-main-image .field__item').noilCoverBackground('noil-fixed-height-485');
      $('.field--name-field-secondary-image .field__item').noilCoverBackground('noil-fixed-height-485');
      $('.field--name-field-bottom-image .field__item').noilCoverBackground('noil-fixed-height-485');
      $('.view-search-promo-result .image').noilCoverBackground('noil-fixed-height-330');
    }
  }
})(jQuery);
