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

export const login = createAsyncThunk('auth/login', async (data) => {
	const response = await axios.post('/api/v1/auth/login', data);
	localStorage.setItem('token', response.data.token);
	setAuthToken(localStorage.token);
	return response.data;
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
		[login.pending]: (state, action) => {
			state.status = 'loading';
		},
		[login.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.user = action.payload.data;
			state.token = action.payload.token;
			state.isAuthenticated = true;
			state.loading = false;
		},
		[login.rejected]: (state, action) => {
			localStorage.removeItem('token');
			state.status = 'failed';
		},
	},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
