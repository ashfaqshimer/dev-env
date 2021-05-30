import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
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

export const register = createAsyncThunk('auth/register', async (data) => {
	const response = await axios.post('/api/v1/auth/register', data);
	localStorage.setItem('token', response.data.token);
	setAuthToken(localStorage.token);
	return response.data;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload.data;
				state.isAuthenticated = true;
			})
			.addCase(loadUser.rejected, (state, action) => {
				localStorage.removeItem('token');
				state.status = 'failed';
				state.isAuthenticated = false;
				state.user = null;
				state.token = null;
			})
			.addCase(login.rejected, (state, action) => {
				localStorage.removeItem('token');
				state.status = 'failed';
			})
			.addMatcher(
				isAnyOf(login.fulfilled, register.fulfilled),
				(state, action) => {
					state.status = 'succeeded';
					state.user = action.payload.data;
					state.token = action.payload.token;
					state.isAuthenticated = true;
					state.loading = false;
				}
			)
			.addMatcher(
				isAnyOf(login.rejected, register.rejected),
				(state, action) => {
					localStorage.removeItem('token');
					state.status = 'failed';
				}
			)
			.addMatcher(
				isAnyOf(loadUser.pending, login.pending, register.pending),
				(state, action) => {
					state.status = 'loading';
				}
			);
	},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
