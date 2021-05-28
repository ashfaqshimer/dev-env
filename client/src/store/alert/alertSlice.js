import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		setAlert(state, action) {
			state = state.push(action.payload);
		},
		removeAlert(state, action) {
			state.filter((alert) => alert.id !== action.payload);
		},
	},
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
