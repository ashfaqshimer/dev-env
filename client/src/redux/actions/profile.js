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
export const createProfile = (formData, history) => async (dispatch) => {
	try {
		const res = await axios.post('/api/v1/profile', formData);

		dispatch({ type: GET_PROFILE, payload: res.data });
		dispatch(setAlert('Profile Created', 'success'));

		history.push('/dashboard');
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

// Update profile
export const updateProfile = (formData) => async (dispatch) => {
	try {
		const res = await axios.put('/api/v1/profile', formData);

		dispatch({ type: GET_PROFILE, payload: res.data });
		dispatch(setAlert('Profile Updated', 'success'));
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

// Update profile experience
export const updateExperience = (formData, history) => async (dispatch) => {
	try {
		const res = await axios.put('/api/v1/profile/experience', formData);

		dispatch({ type: GET_PROFILE, payload: res.data });
		dispatch(setAlert('Profile Updated', 'success'));

		history.push('/dashboard');
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

// Update profile education
export const updateEducation = (formData, history) => async (dispatch) => {
	try {
		const res = await axios.put('/api/v1/profile/education', formData);

		dispatch({ type: GET_PROFILE, payload: res.data });
		dispatch(setAlert('Profile Updated', 'success'));

		history.push('/dashboard');
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
