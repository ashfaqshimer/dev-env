import axios from 'axios';
import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/v1/auth/me');
		dispatch({ type: USER_LOADED, payload: res.data });
	} catch (error) {
		dispatch({ type: AUTH_ERROR });
	}
};

// Register User
export const register = (data) => async (dispatch) => {
	try {
		const response = await axios.post('/api/v1/auth/register', data);
		dispatch({ type: REGISTER_SUCCESS, payload: response.data });
		dispatch(loadUser());
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

// Login User
export const login = (data) => async (dispatch) => {
	try {
		const response = await axios.post('/api/v1/auth/login', data);
		dispatch({ type: LOGIN_SUCCESS, payload: response.data });
		dispatch(loadUser());
	} catch (error) {
		const errors = error.response.data.errors;
		const err = error.response.data.error;

		if (err) {
			dispatch(setAlert(err, 'danger'));
		}
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error, 'danger')));
		}
		dispatch({ type: LOGIN_FAIL });
	}
};

// Logout / Clear profile
export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
