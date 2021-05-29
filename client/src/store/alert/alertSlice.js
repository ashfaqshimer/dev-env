import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = [];

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		createAlert(state, action) {
			state = state.push(action.payload);
		},
		removeAlert(state, action) {
			state.pop();
		},
	},
});

export const setAlert =
	(msg, alertType, timeout = 5000) =>
	(dispatch) => {
		const id = uuid();
		dispatch(createAlert({ msg, alertType, id }));
		setTimeout(() => {
			dispatch(removeAlert());
		}, timeout);
	};

export const { createAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
