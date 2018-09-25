'use strict';

$('.drop-down').on('mouseenter', () => {
  $('.play-drop-down').show();
})

$('.play-drop-down').on('mouseleave', function () {
  $(this).fadeOut(100);
});

// $('.drop-down')
