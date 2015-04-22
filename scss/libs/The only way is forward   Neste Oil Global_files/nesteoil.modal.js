(function ($) {
  Drupal.behaviors.nesteoilModalBehavior = {
    attach: function (context, settings) {

      $(document).ready(function(){

        $('.openModal').click(function(e) {

          //Get iframe url
          var iframe_url = $(this).next('.iframeContent').first().text();

           modalWindow(iframe_url);
        });
      });
      
      //uglipop
      function modalWindow(iframe_url){

        //initialize modal
        uglipop({class:'modalWindow', //styling class for Modal
        source:'html',
        content:'<iframe width="100%" height="100%" frameborder="0" vspace="0" hspace="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" scrolling="auto" src="' + iframe_url + '"></iframe>'});

        //hide scrolling when in modal, this will be removed in the uglipop.js
        //$('html').addClass('hideScroll');
      }
    }
  };
})(jQuery);