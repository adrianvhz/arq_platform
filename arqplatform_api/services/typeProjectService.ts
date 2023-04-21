import TypeProject from '../models/mariadb/typeProject';

export const getTypeProjectService = async () => {
	const typeProjects = await TypeProject.findAll();
	return typeProjects;
}
