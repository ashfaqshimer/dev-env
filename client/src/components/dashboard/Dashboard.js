import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { getProfile } from '../../redux/actions/profile';
import { getProfile } from '../../store/profile/profileSlice';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Education from './Education';
import Experience from './Experience';

const Dashboard = () => {
	const dispatch = useDispatch();
	const status = useSelector((state) => state.profile.status);
	const profile = useSelector((state) => state.profile.profile);
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	return status === 'loading' ? (
		<Spinner />
	) : (
		<>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<>
					<DashboardActions />
					<Experience exp={profile.experience} />
					<Education edu={profile.education} />
				</>
			) : (
				<>
					<p>
						You have not created your profile yet. Click the Create Profile
						button below to get started
					</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</>
			)}
		</>
	);
};

export default Dashboard;
