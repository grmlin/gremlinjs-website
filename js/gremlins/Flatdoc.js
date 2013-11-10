G.add("Flatdoc", G.Gizmo.extend(function () {
    $('body').on('flatdoc:ready', function () {
        window.setTimeout(function () {
            var $target = $(window.location.hash);
            if ($target.length > 0 && $target[0].scrollIntoView) {
                //$(window).load(function () {

                $target[0].scrollIntoView();
                //});
            }
        }, 200);

    });

    Flatdoc.run({
        fetcher: Flatdoc.file(this.data.flatdocSrc)
    });
}));