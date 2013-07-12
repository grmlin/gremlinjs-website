GremlinJS.define('Gizmo', function () {
    this.fetchImages();
}, {
    fetchImages: function () {
        $.ajax({
            url: this.klass.G_IMG_SEARCH_API,
            cache: false,
            dataType: 'jsonp',
            success: $.proxy(this.updateImages, this)
        });
    },
    updateImages: function (response) {
        if (response.responseData) {
            var html = '<ul>';
            response.responseData.results.forEach(function (result) {
                html += '<li style="background-image: url(' + result.url + ');"></li>'
            }, this);
            html += '</ul>';
            this.el.innerHTML = html;
            this.startSlideshow();
        } else {
            // error handling
        }
    },
    startSlideshow: function () {
        var items = this.el.querySelectorAll('ul li'),
            last = items.length - 1;
        current = 0;
        items[0].className = 'current';

        window.setInterval(function () {
            var next = current === last ? 0 : current + 1;
            items[current].className = '';
            items[next].className = 'current';
            current = next;
        }, 2500);
    }
}, {
    G_IMG_SEARCH_API: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=gizmo%20movie&rsz=5&imgsz=xxlarge'
});