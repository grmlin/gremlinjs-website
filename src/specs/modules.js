'use strict';

var gremlins = require('gremlins'),
	React = require('react');

var ModulesComponent = require('../components/Modules'),
	modules = require('../modules');

gremlins.create('modules-grid', {
	initialize: function () {
		React.render(
			React.createElement(ModulesComponent, {modules}),
			this.el
		);
	}
});
