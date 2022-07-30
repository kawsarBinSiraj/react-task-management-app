import React, { useState } from 'react';
import { Routes as PathWays, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import AddTask from '../pages/AddTask';
import AddMember from '../pages/AddMember';
import Tasks from '../pages/Tasks';
import Members from '../pages/Members';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Cookies from "cookies-js";


const Routes = () => {

	/**
	 * Authentication check
	 * created_at:- 30/07/2022 17:49:57
	 */
	const [isAuth] = useState(Cookies.get('access_token') ?? false);

	return (
		<>
			<PathWays>
				<Route path="/" element={<ProtectedRoute isAuth={isAuth} redirectTo="/login" />}>
					<Route path="" element={<Dashboard />} />
				</Route>

				<Route path="/add-task" element={<ProtectedRoute isAuth={isAuth} redirectTo="/login" />}>
					<Route path="" element={<AddTask />} />
				</Route>
				<Route path="/tasks" element={<ProtectedRoute isAuth={isAuth} redirectTo="/login" />}>
					<Route path="" element={<Tasks />} />
				</Route>

				<Route path="/add-member" element={<ProtectedRoute isAuth={isAuth} redirectTo="/login" />}>
					<Route path="" element={<AddMember />} />
				</Route>
				<Route path="/members" element={<ProtectedRoute isAuth={isAuth} redirectTo="/login" />}>
					<Route path="" element={<Members />} />
				</Route>

				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</PathWays>
		</>
	);
};
export default Routes;
