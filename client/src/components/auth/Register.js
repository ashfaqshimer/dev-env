import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../redux/actions/alert';

const Register = () => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const handleChange = (evt) =>
		setFormData({ ...formData, [evt.target.name]: evt.target.value });

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		if (password !== password2) {
			console.log('Passwords do not match');
			dispatch(setAlert('Passwords do not match', 'danger'));
		} else {
			console.log('SUCCESS!');
		}
	};

	return (
		<>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						required
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						value={email}
						name='email'
						onChange={handleChange}
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						value={password}
						name='password'
						minLength='6'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						value={password2}
						name='password2'
						minLength='6'
						onChange={handleChange}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
};

export default Register;