import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { updateEducation } from '../../redux/actions/profile';

const AddEducation = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldOfStudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const { school, degree, fieldOfStudy, from, to, current, description } =
		formData;
	const [toDateDisabled, setToDateDisabled] = useState(false);

	const handleChange = (evt) =>
		setFormData({ ...formData, [evt.target.name]: evt.target.value });

	const handleSubmit = (evt) => {
		evt.preventDefault();
		dispatch(updateEducation(formData, history));
	};

	return (
		<>
			<h1 class='large text-primary'>Add Your Education</h1>
			<p class='lead'>
				<i class='fas fa-graduation-cap'></i> Add any school, bootcamp, etc that
				you have attended
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* School'
						name='school'
						required
						value={school}
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Degree'
						name='degree'
						required
						value={degree}
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Field of Study'
						name='fieldOfStudy'
						value={fieldOfStudy}
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
						Current School or Bootcamp
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

export default AddEducation;
