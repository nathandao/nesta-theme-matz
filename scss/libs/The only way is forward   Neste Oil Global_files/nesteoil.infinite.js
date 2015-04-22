(function ($) {
  Drupal.behaviors.loadMoreAjax = {
    attach: function (context, settings) {
      $('.load-more-ajax', context).click(function (e) {
        e.preventDefault();
        var nextPage = $('.pager__item--next a').attr('href');
        var lastPage = $('.pager__item-last a').attr('href');
        $.get(nextPage, function (data) {
          $(data).find('.search-results').insertBefore($('.item-list'));
          $('ul.pager').remove();
          if (nextPage == lastPage) {
            $('.load-more-ajax').remove();
          }
          else {
            $(data).find('ul.pager').appendTo($('.item-list'));
            Drupal.attachBehaviors($('.item-list'));
            $('.numFound').not(':eq(0)').hide();
          }
        });
      });
      $('.section-search ul.pager').hide();
    }
  };
})(jQuery);
