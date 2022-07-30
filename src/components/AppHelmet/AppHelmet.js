import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const ApplicationHelmet = ({ title, description, ...props }) => {
	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="description" content={description} />
				<title> {title} </title>
				<link rel="canonical" href="#" />
				{props?.children}
			</Helmet>
		</>
	);
};

ApplicationHelmet.defaultProps = {
	title: 'React App',
	description: 'Web site created using create-react-app',
};

ApplicationHelmet.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default ApplicationHelmet;
