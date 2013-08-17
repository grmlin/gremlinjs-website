(function () {
  var SEP = '_';

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
        id = $el.prevAll('h1:first').attr('id') + SEP + id;
      } else if ($el.is('h3')) {
        try {
          var id2 = $el.prevAll('h2:first').attr('id'),
            start = id2.indexOf(SEP) + 1;
          id = $el.prevAll('h1:first').attr('id') + SEP + id2.substr(start) + SEP + id;
        } catch (e) {}

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

      $('.codepen-lazy').each(function () {
        $(this).css({
          height: this.getAttribute("data-height")
        });

      });
    }
  ).
    on('click', '.top-link', function (event) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: 0}, 250);
    });


});