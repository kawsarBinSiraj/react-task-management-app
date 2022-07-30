import React from 'react';
import { Link } from 'react-router-dom';
import AppHelmet from '../components/AppHelmet/AppHelmet';
import { useSelector } from 'react-redux'


const Dashboard = () => {
	/**
     * get tasks & members form redux store
     * created_at:- 30/07/2022 07:15:21
     */
    const tasks = useSelector((store) => store?.taskReducer?.tasks);
	const members = useSelector((store) => store?.memberReducer?.members);

	return (
		<>
			<AppHelmet title="Dashboard" />
			<div className="dashboard py-4">
				<div className="container">
					<div className="row">
						<div className="col-xl-4">
							<Link to={'/tasks'} className='btn btn-primary text-start w-100 p-4 bg-gradient'>
								<h4 className='mb-0'>Tasks - {tasks.length}</h4>
							</Link>
						</div>
						<div className="col-xl-4">
							<Link to={'/members'} className='btn btn-success text-start w-100 rounded p-4 bg-gradient'>
								<h4 className='mb-0'>Members - {members.length}</h4>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
