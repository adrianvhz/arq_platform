import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	view: "home",
	slot: "dashboard",
	projects: []
}

export const mainSlice = createSlice({
	name: "main",
	initialState,
	reducers: {
		setView: (state, { payload }) => {
			state.view = payload.view;
		},
		setSlot: (state, { payload }) => {
			state.slot = payload.slot
		}
	}
});

export const { setView, setSlot } = mainSlice.actions;
