import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';
import { setAlert } from './alert';

// Register User
export const register = (data) => async (dispatch) => {
	try {
		const response = await axios.post('/api/v1/auth/register', data);
		dispatch({ type: REGISTER_SUCCESS, payload: response.data });
	} catch (error) {
		const errors = error.response.data.errors;
		const err = error.response.data.error;

		if (err) {
			dispatch(setAlert(err, 'danger'));
		}
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error, 'danger')));
		}
		dispatch({ type: REGISTER_FAIL });
	}
};
