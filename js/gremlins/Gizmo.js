var Gizmo = GremlinJS.define('Gizmo', function () {
    this.el.innerHTML = '<strong>Hello World, Gizmo here! Loading some images from google now...</strong>';
    this._search();
}, {
    elements: {

    },
    _search: function(){
        $.ajax({
            url: Gizmo.G_IMG_SEARCH_API,
            cache: false,
            dataType: 'jsonp',
            success: function(response){
                console.dir(response.responseData);
            }
        });
    }
}, {
    G_IMG_SEARCH_API: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=gizmo&rsz=8'
});