import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "not-planes",
	projects: null,
	typeProjects: null,
	costsProject: null,

	window: false,
	door: false,
	railing: false
}

export const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setProjects: (state, { payload }) => { 
			// state.status = "get-planes",
			state.projects = payload.projects;
		},
		addProject: (state, { payload }) => {
			state.projects = state.projects.concat(payload.parent ? [payload.parent, payload.child] : [payload.child]);
		},
		deleteProject: (state, { payload }) => {
			// Si se elimina un projecto padre los hijos seguiran en el estado pero no se veran porque en el backend fueron eliminados
			state.projects = state.projects.filter(el => el.id !== payload.id);
		},
		setTypeProjects: (state, { payload }) => {
			state.typeProjects = payload.typeProjects;
		},
		setCostsProject: (state, { payload }) => {
			state.costsProject = payload.costsProject;
		},
		updateProjectCosts: (state, { payload }) => {
			const costsCategories = state.costsProject.costsCategories.slice();
			const calculatedCosts = state.costsProject.calculatedCosts.slice();

			var i_cat = costsCategories.findIndex(el => el.project_id === payload.project_id);

			costsCategories[i_cat] = Object.assign(costsCategories[i_cat], payload.costsCategories);
			calculatedCosts[i_cat] = Object.assign(calculatedCosts[i_cat], payload.calculatedCosts);

			state.costsProject = {
				costsCategories,
				calculatedCosts
			}
		},

		toggleWindow: (state, { payload }) => {
			state.window = !state.window;
		},
		toggleDoor: (state, { payload }) => {
			state.door = !state.door;
		},
		toggleRailing: (state, { payload }) => {
			state.railing = !state.railing;
		}
	}
});

export const { setProjects, addProject, deleteProject, setTypeProjects, setCostsProject, updateProjectCosts,
	toggleWindow, toggleDoor, toggleRailing } = projectSlice.actions;
