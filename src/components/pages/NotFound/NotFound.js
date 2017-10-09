/**
 * Imports
 */
import React from 'react';

/**
 * Component
 */
class NotFound extends React.Component {
	//*** Page Title and Snippets ***//

	static pageTitleAndSnippets = function(context) {
		return {
			title: 'Not Found'
		};
	};

	componentDidMount() {
		// Component styles
		require('./NotFound.scss');
	}

	//*** Template ***//

	render() {
		return (
			<div className="not-found-page">
				<h1>Page Not Found</h1>
			</div>
		);
	}
}

/**
 * Exports
 */
export default NotFound;
