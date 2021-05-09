import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current user's profile
export const getProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/v1/profile/me');
		dispatch({ type: GET_PROFILE, payload: res.data });
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.data.error,
				status: error.response.status,
			},
		});
	}
};

// Create or update a profile
export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		let res;
		if (edit) {
			res = await axios.put('/api/v1/profile', formData);
		} else {
			res = await axios.post('/api/v1/profile', formData);
		}
		dispatch({ type: GET_PROFILE, payload: res.data });
		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
		if (!edit) {
			history.push('/dashboard');
		}
	} catch (error) {
		const errors = error.response.data.errors;
		const err = error.response.data.error;

		if (err) {
			dispatch(setAlert(err, 'danger'));
		}
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.data.error,
				status: error.response.status,
			},
		});
	}
};
