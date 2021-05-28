import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null,
	status: 'idle',
};

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	const res = await axios.get('/api/v1/auth/me');
	return res.data;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: {
		[loadUser.pending]: (state, action) => {
			state.status = 'loading';
		},
		[loadUser.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.user = action.payload.data;
			state.isAuthenticated = true;
		},
		[loadUser.rejected]: (state, action) => {
			localStorage.removeItem('token');
			state.status = 'failed';
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		},
	},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
