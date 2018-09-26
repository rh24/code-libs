'use strict';

$('.drop-down').on('mouseenter', () => {
  $('.play-drop-down').slideDown(200);
});

$('.drop-down-group').on('mouseleave', function () {
  $('.play-drop-down').slideUp(200);
});

$('#mobile-play').on('click', function () {
  $('.play-drop-down').slideToggle();
});

$('.hamburger').on('click', () => {
  $('.main-menu').show('slide', { direction: 'right' }, 250);
});

$('.close-menu-arrow').on('click', () => {
  $('.main-menu').hide('slide', { direction: 'right' }, 250);
});

$(window).resize(function () {
  if ($(window).width() > 800) {
    $('.main-menu').removeAttr('style');
  }
});

$('#share').on('click', () => {
  let pageUrl = $(location).attr('href');
  console.log(pageUrl);

  // debugger;
  $('#share-link').val(pageUrl);
});