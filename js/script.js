/******************************************************************************************************************************
Waypoints
*******************************************************************************************************************************/
$(document).ready(function() {
  var waypoints = [
    { selector: ".wp1", animation: "animated fadeInLeft", offset: "75%" },
    { selector: ".wp2", animation: "animated fadeInUp", offset: "75%" },
    { selector: ".wp3", animation: "animated fadeInDown", offset: "55%" },
    { selector: ".wp4", animation: "animated fadeInDown", offset: "75%" },
    { selector: ".wp5", animation: "animated fadeInUp", offset: "75%" },
    { selector: ".wp6", animation: "animated fadeInDown", offset: "75%" }
  ];

  $.each(waypoints, function(_, waypointConfig) {
    var $waypointElements = $(waypointConfig.selector);

    if (!$waypointElements.length) {
      return;
    }

    $waypointElements.waypoint(function() {
      $waypointElements.addClass(waypointConfig.animation);
    }, {
      offset: waypointConfig.offset
    });
  });
});
/******************************************************************************************************************************
Nav Button
*******************************************************************************************************************************/
$(window).on("load", function() {
  $(".nav_slide_button").click(function() {
    $(".pull").slideToggle();
  });
});

$(function() {
  $("a[href*=#]:not([href=#])").click(function() {
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") &&
      location.hostname === this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html,body").animate(
          {
            scrollTop: target.offset().top - 125
          },
          1000
        );
        return false;
      }
    }
  });
});

/******************************************************************************************************************************
Flexsliders
*******************************************************************************************************************************/

$(window).on("load", function() {
  var sliderConfigs = [
    { selector: "#blogSlider", touch: false },
    { selector: "#servicesSlider", touch: true },
    { selector: "#teamSlider", touch: true },
    { selector: "#clientSlider", touch: true }
  ];
  var activeSliderCount = 0;

  $.each(sliderConfigs, function(_, sliderConfig) {
    if ($(sliderConfig.selector).length) {
      activeSliderCount += 1;
    }
  });

  $.each(sliderConfigs, function(_, sliderConfig) {
    var $slider = $(sliderConfig.selector);

    if (!$slider.length) {
      return;
    }

    $slider.flexslider({
      animation: "slide",
      directionNav: false,
      controlNav: true,
      touch: sliderConfig.touch,
      pauseOnHover: true,
      start: function() {
        activeSliderCount -= 1;

        if (activeSliderCount === 0) {
          $.waypoints("refresh");
        }
      }
    });
  });
});
