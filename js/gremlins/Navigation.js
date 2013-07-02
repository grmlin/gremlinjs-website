GremlinJS.define("Navigation", {
    initialize: function () {
        console.dir(this)
        $.getJSON(this.data.src, $.proxy(this.onNavData, this))
    },
    onNavData: function (data) {
        console.dir(data);
        var html = "";
        for (var i = 0; i < data.length; i++) {
            var obj = data[i],
                items = obj.items;

            html += '<li class="nav-header">' + obj.header + '</li>'
            for (var j = 0; j < items.length; j++) {
                var item = items[j],
                    className = item.url === this.data.current ? "active" : "";
                html += '<li class="' + className + '"><a href="' + item.url + '"><i class="icon-chevron-right pull-right"></i>' + item.title + '</a></li>'

            }
            html += '<li class="divider">' + obj.header + '</li>'


        }
        this.$el.append(html);
        this.$el.children().last().remove();
    }
});