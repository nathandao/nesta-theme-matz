(function ($) {
  Drupal.behaviors.nesteoilHeroBehavior = {
    attach: function (context, settings) {

      // Variables for Hero
      var sizeHeroLarge = 710;
      var minSizeHeroLarge = 510;
      var sizeHeroMedium = 610;
      var minSizeHeroMedium = 410;

      // Variables for header scroll magic
      var showMenuBarAfterScrollingXpx = 100;
      var mobileMenuAtMaxScreenWidth = 1000;

      var scrollTop;
      var lastScrollTop;
      var topBarHeight;
      var posStartedScrollingUp;
      var startedScrollingUp = false;

      elementsInit();

      function elementsInit() {
        $(window).resize(function() {
          resetHeaderPosition();
        });

        topBarHeight = $('.l-support').height();

        $( window ).scroll( function() {
          headerAnimate();
        });

        startedScrollingUp = false;

      }

      /*
       * Do top bar/menu magic
       *
       * */
      function resetHeaderPosition() {
        if ($(window).width() < mobileMenuAtMaxScreenWidth) {
          var el = $('.l-header');
          el.css( 'top', 0);
        }
      }

      function headerAnimate() {
        if ($(window).width() >= mobileMenuAtMaxScreenWidth) {

          scrollTop = $( window ).scrollTop();
          supportOpen = $('.l-page').hasClass('support-menu-visible');
          var el = $('.l-header');
          var elMenuBar =  $('.l-main-nav');

          if(scrollTop > lastScrollTop) {
            // Scrolling down
            // $('.l-support-expanded').addClass('element-invisible');
            // $('.l-support li.last').removeClass('active-trail');
            if(scrollTop < topBarHeight) {
              el.css( 'top', - scrollTop);
            } else {
              // Support Menu is Opened
              if (supportOpen) {
                supportMenu = $('.l-support-expanded').outerHeight();
                keepOpen = (supportMenu + topBarHeight + supportExpandedPosition);
                if ((supportMenu + topBarHeight + supportExpandedPosition) > scrollTop) {
                  var negScroll = scrollTop - supportExpandedPosition;
                  el.css( 'top', - negScroll);
                }
                else {
                  $('.l-page').removeClass('support-menu-visible');
                  $('.l-support .block--menu li.last').removeClass('active-trail');
                  $('.l-support-expanded').addClass('element-invisible');
                  el.css( 'top', - topBarHeight);
                }
              } else {
                $('.l-header').addClass('transition-animate');
                el.css( 'top', - topBarHeight);

              }
            }
            startedScrollingUp = false;
          } else {
            //Scrolling up
            // Global variable defined in nesteoil.menu.js
            supportExpandedPosition = $( window ).scrollTop();

            // Started scrolling up
            if (startedScrollingUp === false) {
              posStartedScrollingUp = scrollTop;
              startedScrollingUp = true;
            }

            // If started to scroll up, check if we have scrolled X pixels and should show the menubar.
            if (startedScrollingUp === true & scrollTop < (posStartedScrollingUp-showMenuBarAfterScrollingXpx)) {
              startedScrollingUp = false;
              el.css( 'top', 0);
            }

            // Always show the menubar if we're at the top of the page.
            if (scrollTop < topBarHeight) {
              startedScrollingUp = false;
              el.css( 'top', 0);
            }
          }

          lastScrollTop = scrollTop;

        }
      }

    }
  };

})(jQuery);
