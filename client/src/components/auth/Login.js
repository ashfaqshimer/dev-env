import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/auth';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const { email, password } = formData;

	const handleChange = (evt) =>
		setFormData({ ...formData, [evt.target.name]: evt.target.value });

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		dispatch(login(formData));
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Sign into Your Account
			</p>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						value={email}
						name='email'
						required
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						value={password}
						name='password'
						onChange={handleChange}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</>
	);
};

export default Login;
