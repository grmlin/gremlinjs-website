G.define('Codepen', function () {
    $(this.el).addClass('codepen').after('<script async src="' + this.klass.SCRIPT_SRC + '"></script>');
  },
  {},
  {
    SCRIPT_SRC: 'http://codepen.io/assets/embed/ei.js'
  }
);