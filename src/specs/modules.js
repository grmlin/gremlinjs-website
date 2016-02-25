'use strict';

var gremlins = require('gremlins'),
	React = require('react'),
	ReactDom = require('react-dom');

 var ModulesComponent = require('../components/Modules'),
	modules = require('../modules');

gremlins.create('modules-grid', {
	initialize: function () {
		ReactDom.render(
			React.createElement(ModulesComponent, {modules}),
			this.el
		);
	}
});
