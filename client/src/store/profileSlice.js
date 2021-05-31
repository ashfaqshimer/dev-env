import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from './alertSlice';

const initialState = {
	profile: null,
	repos: [],
	status: 'idle',
	error: {},
};

export const getProfile = createAsyncThunk('profile/getProfile', async () => {
	const res = await axios.get('/api/v1/profile/me');
	return res.data;
});

export const updateProfile = createAsyncThunk(
	'profile/updateProfile',
	async (formData, { dispatch }) => {
		const res = await axios.put('/api/v1/profile', formData);
		dispatch(setAlert('Profile Updated', 'success'));
		return res.data;
	}
);
export const createProfile = createAsyncThunk(
	'profile/createProfile',
	async (formData, { dispatch }) => {
		const res = await axios.post('/api/v1/profile', formData);
		dispatch(setAlert('Profile Created', 'success'));
		return res.data;
	}
);

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				isAnyOf(
					getProfile.pending,
					updateProfile.pending,
					createProfile.pending
				),
				(state, action) => {
					state.status = 'loading';
				}
			)
			.addMatcher(
				isAnyOf(
					getProfile.fulfilled,
					updateProfile.fulfilled,
					createProfile.fulfilled
				),
				(state, action) => {
					state.status = 'succeeded';
					state.profile = action.payload.data;
				}
			)
			.addMatcher(
				isAnyOf(
					getProfile.rejected,
					updateProfile.rejected,
					updateProfile.rejected
				),
				(state, action) => {
					state.status = 'failed';
					state.error = action.error.message;
				}
			);
	},
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;
