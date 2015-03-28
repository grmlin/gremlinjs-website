var React = require('react');

var Module = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		description: React.PropTypes.string.isRequired,
		author: React.PropTypes.string.isRequired,
		repository: React.PropTypes.string.isRequired,
		npm: React.PropTypes.string.isRequired
	},
	render: function () {
		var npmUrl = `https://www.npmjs.com/~${this.props.author}`;
		return (
			<div className="col-xs-12 col-sm-6 col-md-4">
				<div className="well">
					<h4 style={{marginBottom: '0.1em'}}>{this.props.title}</h4>
					<p>published by <a href={npmUrl} className="label label-primary">{this.props.author}</a></p>
					<p className="lead">{this.props.description}</p>

					<p>
						<a href={this.props.npm} className="">npm</a>&nbsp;&nbsp;&nbsp;<a href={this.props.repository} className="">sources</a>
					</p>
				</div>
			</div>
		);
	}
});

module.exports = Module;
