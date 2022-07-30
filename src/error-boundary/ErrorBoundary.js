import React, { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasError: false,
		};
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return {
			hasError: true,
		};
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="error-boundary py-5 px-3">
					<div className="container text-center">
						<h1 className="display-3 mb-4">Something went wrong :)</h1>
						<p className="fs-3 mb-1">
							Caught by <span className="text-danger">Error Boundary</span>{' '}
						</p>
						<p className="fs-6">Please check developer tools in your browser to know in details !! </p>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
