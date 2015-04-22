(function ($) {
    Drupal.behaviors.nesteoilBannerBehavior = {
        attach: function (context, settings) {
            nesteoilHeroBg( $('.pane-node-field-main-image' ));
            nesteoilHeroBg( $( '.view-blog-post-listing .field-resp-image .field-content') );
        }
    };

    function nesteoilHeroBg ( banner ) {
        var bannerImage = banner.find( 'picture' ).first(),
            bannerImageSrc = null;

        // If cannot find the source, try with traditional img tag
        if ( bannerImage.length < 1 ) {
            bannerImage = banner.find( 'img' ).first();
            bannerImageSrc = bannerImage.attr("src");
        }
        else {
            bannerImageSrc = bannerImage[0].lastElementChild.currentSrc;
        }

        if ( bannerImageSrc ) {
            // Hide the current picture
            bannerImage.fadeTo( 0, 0 );

            // Set the container background to the currently used image url
            banner.css({
                'background-image': 'url("' + bannerImageSrc  + '")',
                'background-size': 'cover',
                'background-position': 'center center'
            });

            // For picture element, detect change in picture source when
            // resizing window and change bg url accordingly
            $( window ).resize( function() {
                var newBannerImage = banner.find( 'picture' ).first(),
                    newBannerImageSrc = newBannerImage[0].lastElementChild.currentSrc;

                if ( newBannerImageSrc != bannerImageSrc && newBannerImageSrc ) {
                    banner.css({
                        'background-image': 'url("' + newBannerImageSrc  + '")'
                    });
                }
            });
        }
    }
})( jQuery );
