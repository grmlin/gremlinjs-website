'use strict';
var React = require('react');


var ModulePanel = require('./ModulePanel');

var Modules = React.createClass({
	propTypes: {
		modules: React.PropTypes.array.isRequired
	},
	render: function () {
		var moduleNodes = this.props.modules.map(function (module, index) {
			return (
				<ModulePanel {...module} key={`module-${index}`}/>
			);
		});

		return (
			<div
				className="row"
			>
				{moduleNodes}
			</div>
		);
	}
});

module.exports = Modules;
