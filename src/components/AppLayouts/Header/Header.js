import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AuthLibrary from "../../../libraries/AuthLibrary";
import { toast } from "react-toastify";

const Header = () => {

	/**
	 * dispatch & navigate
	 * created_at:- 30/07/2022 18:07:43
	 */
	const dispatch = useDispatch();


	/**
	 * get members & task form redux store
	 * created_at:- 30/07/2022 07:15:21
	 */
	const user = useSelector((store) => store?.userReducer?.user);


	/**
	 * logOut
	 * created_at:- 30/07/2022 18:07:26
	 */
	const logOut = () => {
		AuthLibrary.logout(() => {
			toast.success(`Successfully logout`, {
				position: 'bottom-right',
				theme: 'colored',
			});
			setTimeout(() => {
				dispatch({ type: 'DELETE_All_MEMBER' });
				dispatch({ type: 'DELETE_ALL_TASK' });
				dispatch({ type: 'USER_LOGOUT' });
				window.location.reload();
			}, 1000);
		});
	}


	return (
		<>
			<header id="header" style={{ backgroundColor: 'var(--bs-purple)' }} className='py-2 bg-gradient'>
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-lg-5">
							<div className="d-flex gap-4 align-items-center">
								<Link className="text-decoration-none text-light fs-1" to={'/'}>LOGO</Link>
								<h5 className='mb-0 mt-1 text-light border-start ps-3'>Task Management App</h5>
							</div>
						</div>
						<div className="col-lg-7">
							<div className="d-flex align-items-center gap-3 justify-content-end">
								<div className="nav-links d-flex align-items-center gap-3 justify-content-end border-end pe-3">
									<NavLink className="text-decoration-none text-light fs-6" to={'/'}>Dashboard</NavLink>
									<NavLink className="text-decoration-none text-light fs-6" to={'/tasks'}>Tasks</NavLink>
									<NavLink className="text-decoration-none text-light fs-6" to={'/members'}>Members</NavLink>
								</div>
								<div className="logged-user text-light d-flex align-items-center gap-2">
									<p className='mb-0'>{user?.user_name}</p>
									<button type='button' onClick={() => { logOut() }} className='btn btn-light btn-sm'>Logout</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
