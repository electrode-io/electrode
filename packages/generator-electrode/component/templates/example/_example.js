var React = require('react');
var ReactDOM = require('react-dom');
var <%= componentName %> = require('<%= packageName %>');

var App = React.createClass({
	render () {
		return (
			<div>
				<<%= componentName %> />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
