G.define("Flatdoc", function () {
  $('body').on('flatdoc:ready', function () {
    var $target = $(window.location.hash);
    if ($target.length > 0 && $target[0].scrollIntoView) {
      $(window).load(function () {
        $target[0].scrollIntoView();
      });
    }
  });

  Flatdoc.run({
    fetcher: Flatdoc.file(this.data.flatdocSrc)
  });


});