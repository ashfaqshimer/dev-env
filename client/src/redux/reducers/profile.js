import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

const inititalState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
};

export default function (state = inititalState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
			return { ...state, profile: payload.data, loading: false };

		case PROFILE_ERROR:
			return { ...state, error: payload, loading: false };

		default:
			return state;
	}
}
