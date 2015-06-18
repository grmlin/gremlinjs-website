'use strict';

var gremlins = require('gremlins');

gremlins.create('hello-world', {
	initialize: function () {
		this.el.querySelector('[data-content]').textContent = 'Hello World!';
	}
});