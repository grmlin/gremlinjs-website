G.add('ResponsiveMenu', G.Gizmo.extend(function () {

    },
    {
        onToggle: function (e) {
            this.menu.slideToggle();
        }
    },
    {
        include: ['jquery'],
        elements: {
            '.menubar': 'menu'
        },
        events: {
            'click .menu-toggle': 'onToggle'
        }
    }));