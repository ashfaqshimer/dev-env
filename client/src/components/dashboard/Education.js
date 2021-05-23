import React from 'react';
import Moment from 'react-moment';

const Education = ({ edu }) => {
	const educations = edu.map((education) => (
		<tr key={education._id}>
			<td>{education.school}</td>
			<td className='hide-sm'>{education.degree}</td>
			<td className='hide-sm'>
				<Moment format='YYYY/MM/DD'>{education.from}</Moment> -{' '}
				{education.to ? (
					<Moment format='YYYY/MM/DD'>{education.to}</Moment>
				) : (
					'Now'
				)}
			</td>
			<td>
				<button className='btn btn-danger'>Delete</button>
			</td>
		</tr>
	));
	return (
		<div>
			<h2 className='my-2'>Education Credentials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>School</th>
						<th className='hide-sm'>Degree</th>
						<th className='hide-sm'>Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</div>
	);
};

export default Education;
