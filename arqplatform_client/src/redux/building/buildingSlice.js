import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showSettings: false,
	view: "3D",
	isPlayCamera: "non-play",
	roof: true,
	colorWall: "#f5f5f5",
	colorForLevel: true,
	classrooms_lights: false,
	view2DModule: undefined,
	floor1: true,
	floor2: true,
	floor3: true
}

export const buildingSlice = createSlice({
	name: "building",
	initialState,
	reducers: {
		setShowSettings: (state, { payload, type }) => {
			state.showSettings = payload.showSettings;
		},
		setView: (state, { payload }) => {
			state.view = payload.view;
		},
		setPlayCamera: (state, { payload }) => {
			if (state.view === "3D") {
				state.isPlayCamera = payload.isPlayCamera;
			}
		},
		setRoof: (state) => {
			if (state.view === "3D") {
				state.roof = !state.roof;
			}
		},
		setClassroomsLights: (state) => {
			if (state.view === "3D") {
				state.classrooms_lights = !state.classrooms_lights;
			}
		},
		setColorWall: (state, { payload }) => {
			if (state.view === "3D") {
				state.colorWall = payload.color;
			}
		},
		setColorForLevel: (state) => {
			if (state.view === "3D") {
				state.colorForLevel = !state.colorForLevel;
			}
		},
		// setView2DModule: (state, { payload }) => {
		// 	// state.view = "2D";
		// 	state.view2DModule = payload.view2DModule;
		// },
		
		setView3DFloor: (state, { payload }) => {
			state.floor1 = payload.floor >= 1;
			state.floor2 = payload.floor >= 2;
			state.floor3 = payload.floor >= 3;
		
		},
		setView2DFloor: (state, { payload }) => {
			state.floor1 = payload.floor === 1;
			state.floor2 = payload.floor === 2;
			state.floor3 = payload.floor === 3;
		}
	}
})

export const {
	setShowSettings,
	setView,
	setPlayCamera,
	setClassroomsLights,
	setRoof,
	setColorWall,
	setColorForLevel,
	setView2DFloor,
	setView3DFloor } = buildingSlice.actions;
