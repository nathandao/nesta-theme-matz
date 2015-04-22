var supportExpandedPosition = 0;

(function ($) {
  Drupal.behaviors.nesteoilMenuBehavior = {
      attach: function (context, settings) {

      //var supportMenu = $('.block--menu-menu-support-navigation a');
      //var supportMenu = $('.l-region--support ul li#language-selector a');
      var supportMenu = $('.l-region--support ul li:last a');
      var supportExpandedElement = $('.l-support-expanded', context);
      var mainNavigation = $('.l-region--navigation');
      var companyRegion = $('.l-region--company');
      var mobileMenu = $('.mobile-menu');
      var mobileSearchMenu = $('.mobile-search-icon');
      var mobileContactUrl = $('.l-support nav ul li.last').prev().find('a').attr('href');

      var nesteLogo = $('.neste-logo');
      var self = this;
      var body = document.getElementsByTagName('body')[0];
      //var body = $('body');
      //console.log('body', body.className);
      enquire.register("screen and (min-width:960px)", {
          match : function() {
              companyRegion.css('display','');
              mainNavigation.css('display', '');
              //console.log('do magic here');
              //$('.glyphicon-minus').parent().removeClass('js-expanded');
              $('.l-main-nav .active-trail').removeClass('js-expanded');
          }
      });

          $(window).on('resize', function(){
             var windowWidth = $( window ).width();
              if ( windowWidth >= 960 ) {
                  $('.l-main-nav .l-region, .l-region--company').removeClass('slide-from-left');

                  nesteLogo.toggleClass('element-invisible');
                  $('.l-main, .mobile-menu-second').removeClass('gray-opacity');
                  $('.l-main-nav, .l-header').removeClass('full-height');

                  $('.site-logo').removeClass('element-invisible');
                  $('body').removeClass('overlay');

                  $( '.l-main-nav .active-trail' ).removeClass( 'js-expanded' );
                  $( '.header-grid.slide-from-left' ).attr( 'styles', '' );
              }
          });
      // @todo IE9 support needed
      // http://wicky.nillia.ms/enquire.js/#legacy-browsers
      // @todo mediaquery according the Susy grid in Sass files
      // @todo move enquire.min.js to libraries
      // @todo add modernizr custom build
      enquire.register("screen and (max-width:960px)", {
          match : function() {
              //console.log('do magic here II');
              //$('.glyphicon-minus').parent().addClass('js-expanded');
              $( '.l-main-nav .active-trail' ).addClass( 'js-expanded' );
          }
      });
      enquire.register("screen and (max-width:48em)", {

          // OPTIONAL
          // If supplied, triggered when a media query matches.
          match : function() {
              nesteLogo.css('display','');
              //console.log('do Mobile magic here');
          },

          // OPTIONAL
          // If supplied, triggered when the media query transitions
          // *from a matched state to an unmatched state*.
          unmatch : function() {

              //console.log('not mobile in here');
          },

          // OPTIONAL
          // If supplied, triggered once, when the handler is registered.
          setup : function() {
          },

          // OPTIONAL, defaults to false
          // If set to true, defers execution of the setup function
          // until the first time the media query is matched
          deferSetup : true,

          // OPTIONAL
          // If supplied, triggered when handler is unregistered.
          // Place cleanup code here
          destroy : function() {}

      });

      var init = function() {
          self.bindEvents();
          $('.l-main-nav nav > div > .menu > li > .menu').easyListSplitter({ colNumber: 4 });
      }

      function hazClass(element, cls) {
          return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
      }


      // Mobile navigation expand/contract toggle button logic

      function changeToggle(element){
          if(element.hasClass('glyphicon-plus')){
              element.removeClass('glyphicon-plus');
              element.addClass('glyphicon-minus');
          }
          else if(element.hasClass('glyphicon-minus')){
              element.removeClass('glyphicon-minus');
              element.addClass('glyphicon-plus');
          }
      }

      /**
       * Bind events
       */
      self.bindEvents = function () {
          $("").after('.l-region--navigation nav.block--menu-block > div > ul.menu');

          /* Assign the contact link in mobile */
          $('.mobile-contact').attr("href", mobileContactUrl);

          /* Handle the language selection in mobile */
          $('.lang-sel-list').clone().appendTo('.l-region--navigation nav.block--menu-block > div > ul.menu');
          $('.l-region--navigation .lang-sel-list').addClass('menu mobile-lang-sel');
          $('.mobile-lang-sel').wrap('<li class="expanded mobile-last"></li>');
          $('<a href="#">Language</a>').insertBefore('.mobile-lang-sel');
          $('.mobile-lang-sel').wrap('<div class="listContainer999"></div>');
          // $('.lang-sel-list').after('.l-region--navigation nav.block--menu-block > div > ul.menu');
          // langSelList.hide();
          // $('.lang-sel-list').html().after('.l-region--navigation nav.block--menu-block > div > ul > li.last');

          $('.desktop-search-icon', context).on('tap click', function (e) {
              $(".search-block-form").toggleClass('desktop-search-active');
          });
          // Opens the row-1 overlay.
          supportMenu.on('tap click', function (e) {
              e.preventDefault();
              supportExpandedElement.toggleClass('element-invisible');
              $('.l-region--support li.last').toggleClass('active-trail');
              $('.l-page').toggleClass('support-menu-visible');
              $('.l-header').toggleClass('transition-animate');
              supportExpandedPosition = $( window ).scrollTop();
          });
          mobileSearchMenu.on('top click', function (e) {
              //console.log('searchMobile');
              e.preventDefault();
              $('body').toggleClass('mobile-search-active');

          });
          mobileMenu.on('tap click', function (e) {

          });
          $(document).on('tap click', function(e) {
              //console.log('e-target: ', e.target);

              if ((!$(e.target).closest('.l-main-nav').length) && (!$(e.target).closest('.mobile-menu-second').length) && (!$(e.target).closest('.mobile-menu-toggle').length) && (hazClass(body, 'overlay'))) {
                  e.preventDefault();
                  // Hide the menus.
                  //console.log('hide ACTIVATED');
                  $('.l-main-nav .l-region, .l-region--company').removeClass('slide-from-left');

                  nesteLogo.toggleClass('element-invisible');
                  $('.l-main, .mobile-menu-second').removeClass('gray-opacity');
                  $('.l-main-nav, .l-header').removeClass('full-height');

                  $('.site-logo').removeClass('element-invisible');
                  $('body').removeClass('overlay');
                  $('.l-region--navigation nav, .l-region--company').animate({
                      left: '-100%'
                  }, 1000, function() {
                      // Animation complete.
                  });
              }
              if ($(e.target).closest('.mobile-menu-toggle').length) {
                  e.preventDefault();
                  //console.log('mobile.menu clicked');
                  //companyRegion.toggle();
                  //mainNavigation.toggle();
                  //$('.l-region--navigation').toggleClass('slide-from-left');
                  $('.l-main-nav .l-region, .l-region--company').toggleClass('slide-from-left');

                  $('body').toggleClass('overlay');
                  $('.l-main, .mobile-menu-second').toggleClass('gray-opacity');

                  var state = $('body').hasClass('overlay');
                  //console.log('state: ', state);
                  if (state) {
                      $('.l-region--navigation').css('display', 'block');
                      $('.l-main-nav, .l-header').addClass('full-height');
                      $('.site-logo').addClass('element-invisible');
                      nesteLogo.addClass('element-invisible');
                  }
                  $('.l-region--navigation nav, .l-region--company').animate({
                      left: (state ? '0%': '-100%')
                  }, 1000, function() {
                      if (!state) {
                          $('.l-main-nav, .l-header').removeClass('full-height');
                          $('.site-logo').removeClass('element-invisible');
                          nesteLogo.removeClass('element-invisible');
                          $('.l-region--navigation').css('display', '');
                      }
                      // Animation complete.
                  });
              }

          });


    	  $('.l-region--navigation li.expanded').on('tap click', function(e) {
              if ( $(window).width() <= 960 ) {
                  var self = $( this );
                  var expanded = self.hasClass( 'js-expanded' );
                  var processed = self.hasClass( 'processed' );
                  var active_trail = self.hasClass( 'active-trail' );

                  // Stop click event from also clicking the parent li
                  // whin the child li is clicked. User is clicking on the li
                  // not the <a> in this case.
                  e.stopPropagation();

                  if ( !expanded && active_trail ) {
                      self.removeClass( 'active-trail' );
                  }
                  else {
                      self.toggleClass( 'js-expanded' );
                  }

                  $( '.l-main-nav nav' ).find( '.active-menu-item' ).removeClass( 'active-menu-item' );
                  self.addClass( 'active-menu-item' );

                  if ( !processed ) {
                      self.addClass( 'processed' );
                  }
              }
          });

          // TODO: Due to change of implementation of the mobile menu toggle to
          // work across all language menus.
          // @see chagnes template.php neste_oil_links function.
          // Need to confirm that the toggle features is only used for mobile
          // menu before removing the commented code.
          /*
    	  $('.l-region--navigation span.toggle').on('tap click', function(e) {
              //console.log('toggle clicked');
              var self = $(this);
              var parent = $(this).parent();
              var expanded = self.hasClass('js-expanded');
              var processed = parent.hasClass('processed');
              var active_trail = parent.hasClass('active-trail');
              $('.l-main-nav nav').find('.active-menu-item').removeClass('active-menu-item');
              $(this).parent().addClass('active-menu-item');

              if(!processed){
                  parent.addClass('processed');
              }

      	      if(!expanded){
                  if(active_trail){
                      parent.removeClass('active-trail');
                  }
                  else {
                      parent.toggleClass('js-expanded');
      		  }
                  changeToggle(self);
              }
              else {
                  parent.toggleClass('js-expanded');
                  changeToggle(self);
              }
          });
           */
      }
          init();
      }
  };
})(jQuery);
