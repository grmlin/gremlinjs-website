'use strict';
var React = require('react'),
	masonryMixin = require('react-masonry-mixin');


var ModulePanel = require('./ModulePanel');

var Modules = React.createClass({
	mixins: [masonryMixin('modules', {})],
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
			<div className="row" ref="modules">
				{moduleNodes}
			</div>
		);
	}
});

module.exports = Modules;
