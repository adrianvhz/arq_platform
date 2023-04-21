import { getProjectsByUserID, getProjectsCosts, getTypeProjects } from "../../services/projectsService";
import { setProjects, setTypeProjects, setCostsProject } from "./projectSlice";

export const initialProjectState = (id) => {
	return async (dispatch) => {
		const projects = await getProjectsByUserID(id);
		const typeProjects = await getTypeProjects();

		dispatch(setProjects({ projects: projects.data.proyectos }));
		dispatch(setTypeProjects({ typeProjects: typeProjects.data }));
	}
}

export const setCostsProjectThunk = (parent_id) => {
	return async (dispatch) => {
		const { data: { costsCategories, calculatedCosts } } = await getProjectsCosts(parent_id);

		dispatch(setCostsProject({ costsProject: { costsCategories, calculatedCosts } }));
	}
}
