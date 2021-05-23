import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { updateExperience } from '../../redux/actions/profile';

const AddExperience = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const { company, title, location, from, to, current, description } = formData;
	const [toDateDisabled, setToDateDisabled] = useState(false);

	const handleChange = (evt) =>
		setFormData({ ...formData, [evt.target.name]: evt.target.value });

	const handleSubmit = (evt) => {
		evt.preventDefault();
		dispatch(updateExperience(formData, history));
	};

	return (
		<>
			<h1 className='large text-primary'>Add An Experience</h1>
			<p className='lead'>
				<i className='fas fa-code-branch'></i> Add any developer/programming
				positions that you have had in the past
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Job Title'
						name='title'
						required
						value={title}
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Company'
						name='company'
						required
						value={company}
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<h4>From Date</h4>
					<input type='date' name='from' value={from} onChange={handleChange} />
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							value={current}
							checked={current}
							onChange={() => {
								setFormData({ ...formData, current: !current });
								setToDateDisabled(!toDateDisabled);
							}}
						/>{' '}
						Current Job
					</p>
				</div>
				<div className='form-group'>
					<h4>To Date</h4>
					<input
						type='date'
						name='to'
						value={to}
						onChange={handleChange}
						disabled={toDateDisabled}
					/>
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Job Description'
						value={description}
						onChange={handleChange}
					></textarea>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</>
	);
};

export default AddExperience;
