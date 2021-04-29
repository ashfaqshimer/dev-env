import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../redux/actions/auth';

const Navbar = () => {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.auth.loading);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const authLinks = (
		<ul>
			<li>
				<a onClick={() => dispatch(logout())} href='#!'>
					<i className='fas fa-sign-out-alt'></i>
					<span className='hide-sm'> Logout</span>
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> DevEnv
				</Link>
			</h1>
			{!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
		</nav>
	);
};

export default Navbar;
