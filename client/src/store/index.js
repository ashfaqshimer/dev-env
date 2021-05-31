import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './alertSlice';
import authReducer from './authSlice';
import profileReducer from './profileSlice';

const store = configureStore({
	reducer: { alert: alertReducer, auth: authReducer, profile: profileReducer },
});

export default store;
