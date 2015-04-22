/** block that should link to content on clic **/

(function ($) {
  Drupal.behaviors.nesteoilBoxLink = {
    attach: function (context, settings) {

      $(document).ready(function() {

        //if element is clicked
        $('.view-release-and-stories-listing .views-row, .view-blog-post-listing .views-row').click(function(e) {
          //if clicked child element is not a link go to content location
          if(e.target.tagName != 'A') {
            var url = $(this).children('.news-and-media-js-link').attr('href');
            $(location).attr('href',url);
          }
        });
      });
    }
  }
})(jQuery);
