import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './alert/alertSlice';
import authReducer from './auth/authSlice';
import profileReducer from './profile/profileSlice';

const store = configureStore({
	reducer: { alert: alertReducer, auth: authReducer, profile: profileReducer },
});

export default store;
