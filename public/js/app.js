'use strict';

$('#mobile-hide').on('mouseenter', () => {
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
  let pageUrl = $(location).attr('href').replace(/(\?success=true)/g, '');

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
  if (e.target === this) {
    toggleModal(e.delegateTarget.id);
  }
});

$('.prof-thumb').on('click', function (e) {
  toggleModal(e.currentTarget.alt);
});

$('.completed-game').on('click', (e) => {
  // currentTarget gives me the div that has the event listener, even if I click the <p> child
  // whereas e.target will give me the <p> if I click on <p> and <div> if I click on <div>
  console.log(e.currentTarget.getAttribute('data-path'));
  const path = e.currentTarget.getAttribute('data-path');
  window.location = path;
});

const replaceBlanks = (split) => {
  let i = 0;
  let addedEjsCones = split.map(str => {
    if (str.includes('_')) {
      i++;
      return str.replace(/[_]/g, `<%= lib_${i} %>`);
    }

    return str;
  }).join('');

  console.log(addedEjsCones);
  $('#create-text').val(addedEjsCones);
};

$('#create-form').on('submit', function () {
  let underScoreString = $('#create-text').val();
  let split = underScoreString.split('');
  let checkTen = split.reduce((acc, curr) => curr.includes('_') ? acc += 1 : acc, 0);
  console.log(checkTen);

  checkTen > 10 ? alert('Too many blanks! Please, keep it to 10.') : (checkTen < 10 ? alert(`Too few blanks! Add ${10 - checkTen} more!`) : replaceBlanks(split));
});