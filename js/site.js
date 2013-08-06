(function () {
  var ids = {};

  function slugify(text) {
    var slug = text.toLowerCase().match(/[a-z0-9]+/g).join('-');
    return slug;
  }

  Flatdoc.transformer.addIDs = function ($content) {
    $content.find('h1, h2, h3').each(function () {
      var $el = $(this);
      var text = $el.text();
      var id = slugify(text);
      if ($el.is('h2')) {
        id = $el.prevAll('h1:first').attr('id') + '_' + id;
      } else if ($el.is('h3')) {
        id = $el.prevAll('h1:first').attr('id') + '__' + id;
      }
      $el.attr('id', id);
    });
  };
}());


$(function () {
  $('body').on('flatdoc:ready',function () {
    $('.content h3').each(function () {
      var link = document.createElement('a');
      link.href = '#' + this.id;
      link.textContent = '#';

      this.innerHTML = this.textContent.replace(/^(.*)(\.|#)/gi, '$2');
      //console.log(link.href)
      $(this).append(link);
    });

    $('.menu ul.level-3 li a').each(function () {
      this.innerHTML = this.textContent.replace(/^(.*)(\.|#)/gi, '$2');
    });
  }).on('click', '.top-link', function (event) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: 0}, 250);
    });


});