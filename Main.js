(function($) {

  var settings = {
    parallax: true,
    parallaxFactor: 100
  };

  skel.breakpoints({ //load skel.min.js before main script
    xlarge: '(max-width: 1800px)',
    large: '(max-width: 1280px)',
    medium: '(max-width: 980px)',
    small: '(max-width: 736px)',
    xsmall: '(max-width: 480px)'
  }); //this code will figure out screensize and tell css what category it is

  $(function () {

    var $window = $(window);
    var $body = $('body');
    var $header = $('#header');
    var $footer = $('#footer');
    var $main = $('#main');

    //disable animations till page is loaded
    $body.addClass('is-loading');
    $window.on('load', () => $body.removeClass('is-loading'));

    // TouchScreen?
    if (skel.vars.mobile) {
      $body.addClass('is-touch');
      //fix height for iOS
      window.setTimeout(function() {
        $window.scrollTop($window.scrollTop() + 1);
      }, 0);
    }

    //'Fix: Placeholder polyfill'
    $('form').placeholder();//???

    //prioritize important elements on medium size
    skel.on('+medium -medium', function () {
      $.prioritize(
        '.important\\28 medium\\29',
        skel.breakpoint('medium').active
        );
    });

    //footer stuff
    skel.on('+medium', function () {
      $footer.insertAfter($main);
    }); //happens when screen is small
    skel.on('-medium !medium', function () {
      $footer.appendTo($header);
    }); //happens when screen is big

    //header stuff
    if (skel.vars.browser == 'ie' || skel.vars.mobile) {
      settings.parallax = false;
    } //disable parallax on IE and mobile

    if (settings.parallax) {
      skel.on('change', function () {
        if (skel.breakpoint('medium').active) {
          $window.off('scrol.strata_parallax');
          $header.css('background-positioin', 'top left, center center');
        } else {
          $header.css('background-positioni', 'left 0px');
          $window.on('scroll.strata_parallax', function () {
            $header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
          });

        }

      });
      $window.on('load', function () {
        $window.triggerHandler('scroll');
      });
    }

    //lightbox gallery
    $window.on('load', function () {
      $('#ProjectsContainer').poptrox({
            caption: function($a) { return $a.next('h3').text(); },
            overlayColor: '#2c2c2c',
            overlayOpacity: 0.85,
            popupCloserText: '',
            popupLoaderText: '',
            selector: '.work-item a.image',
            usePopupCaption: true,
            usePopupDefaultStyling: false,
            usePopupEasyClose: false,
            usePopupNav: true,
            windowMargin: (skel.breakpoint('small').active ? 0 : 50)
          });
    });

  });

})(jQuery);
