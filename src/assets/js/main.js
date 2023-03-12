(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Fixed Navbar
  $(window).scroll(function () {
    if ($(window).width() < 992) {
      if ($(this).scrollTop() > 45) {
        $(".fixed-top").addClass("bg-white shadow");
      } else {
        $(".fixed-top").removeClass("bg-white shadow");
      }
    } else {
      if ($(this).scrollTop() > 45) {
        $(".fixed-top").addClass("bg-white shadow").css("top", -45);
      } else {
        $(".fixed-top").removeClass("bg-white shadow").css("top", 0);
      }
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // $('[data-toggle="counter-up"]').counterUp({
  //   delay: 10,
  //   time: 2000,
  // });
//   $('.counter').counterUp({
//     delay: 10,
//     time: 1000,
//     offset: 70,
//     beginAt: 100,
//     formatter: function (n) {
//       return n.replace(/,/g, '.');
//     }
// });
//   function counterUp(element, startAtPercentage) {
//     if (startAtPercentage == null) {
//       startAtPercentage = 20;
//     }

//     var numericValue = getNumericValue(element);

//     jQuery(element).counterUp({
//       beginAt:
//         numericValue > 0 ? (numericValue * startAtPercentage) / 100 : undefined,
//     });
//   }
//   function getNumericValue(element) {
//     try {
//       return Number(
//         element.innerText
//           // Remove decimal points
//           .replace(/.\D+/g, "")
//           // Remove thousands separator and other symbols
//           .replace(/\D/g, "")
//       );
//     } catch (error) {
//       return 0;
//     }
//   }
//   Array.prototype.forEach.call(
//     document.querySelectorAll('.counter-up'),
//     function (element) {
//         counterUp(element, 20);
//     });

  // Project carousel
  // $(".project-carousel").owlCarousel({
  //     autoplay: true,
  //     smartSpeed: 1000,
  //     margin: 25,
  //     loop: true,
  //     center: true,
  //     dots: false,
  //     nav: true,
  //     navText : [
  //         '<i class="bi bi-chevron-left"></i>',
  //         '<i class="bi bi-chevron-right"></i>'
  //     ],
  //     responsive: {
  // 		0:{
  //             items:1
  //         },
  //         576:{
  //             items:1
  //         },
  //         768:{
  //             items:2
  //         },
  //         992:{
  //             items:3
  //         }
  //     }
  // });

  // // Testimonials carousel
  // $(".testimonial-carousel").owlCarousel({
  //     autoplay: true,
  //     smartSpeed: 1000,
  //     center: true,
  //     margin: 24,
  //     dots: true,
  //     loop: true,
  //     nav : false,
  //     responsive: {
  //         0:{
  //             items:1
  //         },
  // 		576:{
  //             items:1
  //         },
  //         768:{
  //             items:2
  //         },
  //         992:{
  //             items:3
  //         }
  //     }
  // });
})(jQuery);
