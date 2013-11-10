G.add('Codepen', G.Gizmo.extend(function () {
        $(this.el).addClass('codepen').after('<script async src="' + this.constructor.SCRIPT_SRC + '"></script>');
    },
    {},
    {
        SCRIPT_SRC: 'http://codepen.io/assets/embed/ei.js'
    }
));