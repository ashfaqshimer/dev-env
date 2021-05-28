import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

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
	async (formData) => {
		const res = await axios.put('/api/v1/profile', formData);
		return res.data;
	}
);

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: {
		[getProfile.pending]: (state, action) => {
			state.status = 'loading';
		},
		[getProfile.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.profile = action.payload.data;
		},
		[getProfile.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
		[updateProfile.pending]: (state, action) => {
			state.status = 'loading';
		},
		[updateProfile.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.profile = action.payload.data;
		},
		[updateProfile.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
	},
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;
