G.define('ResponsiveMenu', function () {

  },
  {
    onToggle: function(e) {
      this.menu.slideToggle();
    }
  },
  {
    elements: {
      '.menubar' : 'menu'
    },
    events: {
      'click .menu-toggle': 'onToggle'
    }
  });