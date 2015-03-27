'use strict';

var gremlins = require('gremlins');

gremlins.create({
	name: 'hello',
	initialize: function () {
		this.el.querySelector('[data-content]').textContent = 'Hello World!';
	}
});