'use strict';

$('.drop-down').on('mouseenter', () => {
  $('.play-drop-down').slideDown(200);
})

$('.play-drop-down').on('mouseleave', function () {
  $(this).slideUp(200);
});

$('#mobile-play').on('click', function () {
  $('.play-drop-down').slideDown();
});

