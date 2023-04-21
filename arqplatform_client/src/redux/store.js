import { configureStore } from '@reduxjs/toolkit';
import { authSlice, registerSlice } from './auth';
import { buildingSlice } from './building/buildingSlice';
import { mainSlice } from './main/mainSlice';
import { planSlice } from './planes';
import { projectSlice } from './projects/projectSlice';

export const store = configureStore({
	reducer: {
		register: registerSlice.reducer,
		auth: authSlice.reducer,
		main: mainSlice.reducer,
		plan: planSlice.reducer,
		building: buildingSlice.reducer,
		project: projectSlice.reducer
	}
});
