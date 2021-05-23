import React from 'react';
import Moment from 'react-moment';

const Experience = ({ exp }) => {
	const experiences = exp.map((experience) => (
		<tr key={experience._id}>
			<td>{experience.company}</td>
			<td className='hide-sm'>{experience.title}</td>
			<td className='hide-sm'>
				<Moment format='YYYY/MM/DD'>{experience.from}</Moment> -{' '}
				{experience.to ? (
					<Moment format='YYYY/MM/DD'>{experience.to}</Moment>
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
						<th>Company</th>
						<th className='hide-sm'>Title</th>
						<th className='hide-sm'>Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</div>
	);
};

export default Experience;
