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

function toggleModal(id) {
  $(`#${id}`).toggleClass('modal-show');
}

$('#share').on('click', () => {
  let pageUrl = $(location).attr('href');

  $('#share-link').val(pageUrl);
  toggleModal('share-modal');

  $('#copy').on('click', () => {
    $('#share-link').select();
    document.execCommand('copy');
  });
});

$('.close-modal').on('click', function (e) {
  toggleModal(e.delegateTarget.offsetParent.offsetParent.id);
});

$('.modal-bg').click(function (e) {
  if (e.target == this) {
    toggleModal(e.delegateTarget.id);
  }
});

$('.prof-thumb').on('click', function (e) {
  toggleModal(e.currentTarget.alt);
});