import React from 'react';
import { Navigate , Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuth, redirectTo , ...props }) => {
	if (!isAuth) {
		return <Navigate to={redirectTo} />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
