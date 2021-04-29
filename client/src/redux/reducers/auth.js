import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null,
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload.data,
			};
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				user: payload.data,
				token: payload.token,
				isAuthenticated: true,
				loading: false,
			};

		case AUTH_ERROR:
		case REGISTER_FAIL:
			localStorage.removeItem('token');
			return { ...state, token: null, isAuthenticated: false, loading: false };

		default:
			return state;
	}
}
