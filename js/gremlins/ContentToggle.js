var ContentToggle = GremlinJS.define('ContentToggle',
    function(){
        this.host = $('#' + this.data.hostId);
        this.$_first.click();
    },
    {
        elements: {
            'ul:first-child > li.active > a': '_first'
        },
        events: {
            'click ul:first-child > li > a': '_onNavClick'
        },
        _onNavClick: function(event){
            //event.preventDefault();
            var $link = $(event.currentTarget).parent();
            $link.addClass('active').siblings().removeClass('active');
            this._toggle($(event.currentTarget.getAttribute("href")));
        },
        _toggle: function(el){
            if (this._current) {
                this._current.hide();
            }
            this._current = el;
            el.show();
        }
    }
);