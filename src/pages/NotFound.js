import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiEmotionSadLine } from 'react-icons/ri';
import { BiArrowBack } from 'react-icons/bi';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="not-found position-fixed top-0 start-0 w-100 vh-100 d-flex align-items-center justify-content-center bg-white">
				<div className="container">
					<div className="error-content text-center">
						<RiEmotionSadLine className="display-1 error-title text-danger mb-4" />
						<h1 className="display-4 error-title text-uppercase text-danger mb-2">Oops!</h1>
						<h4 className="error-sub-title mb-3">
							<span className="text-danger">404</span> - Page not fund
						</h4>
						<p className="error-desc text-muted mb-3">
							The page you are looking might have been removed had its name change <br className="d-xl-inline d-none" />
							or temporarily unavailable.
						</p>
						<button type="button" onClick={() => navigate('/')} className="btn btn-sm btn-danger rounded-pill px-4">
							<BiArrowBack /> Go to the Home page
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default NotFound;
