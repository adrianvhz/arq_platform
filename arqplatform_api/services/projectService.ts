import { Op, or } from 'sequelize';
import Project from '../models/mariadb/projects';
import TypeProject from '../models/mariadb/typeProject';
import fs from "fs";
import type { Request, Response } from 'express';
import ProjectCategory from '../models/mariadb/projectCategory';
import CostsReference from '../models/mariadb/costsReference';

export const getAllProjectsService = async () => {
	//traer todos los registros de la tabla
	try { // @ts-ignore
		const projects = await Project.findAll();
		//formatear fecha de registro
		return projects;
	} catch (error) {
		console.log(error);
	}
}

// crear nuevo proyecto
export const createProjectService = async (req: Request, res: Response) => {
	const project = await Project.create(req.body);

	await project.createProjectCategory({
		user_id: project.user_id,
		project_id: project.id,
		project_parent_id: project.parent_id,
		muros_y_columnas: "A",
		techos: "A",
		puertas_y_ventanas: "A",
		revestimientos: "A",
		banos: "A",
		instalaciones: "A"
	});

	return project;
}

export const deleteProjectService = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { parentID } = req.body;

	const project = await Project.destroy({
		/* Esta logica se podria mejorar, usando OR solo cuando se elimine un projecto padre y no cuando sea una version
		 * (no buscaria 2 condiciones en la tabla) 
		 */
		where: {
			[Op.or]: [
				{ id: id },
				{ parent_id: id } // cuando se quiere eliminar un padre, entonces se borran las versiones
			]
		}
	});

	await ProjectCategory.destroy({
		where: {
			[Op.or]: [
				{ project_id: id },
				{ project_parent_id: id } // cuando se quiere eliminar un padre, entonces se borran las versiones
			]
		}
	})
	
	if (parentID) {
		Project.findAndCountAll({
			where: { parent_id: parentID }
		}).then(el => {
			console.log(el.count)
			if (el.count === 0) {
				Project.destroy({
					where: { id: parentID }
				})
			}
		})
	}
	return project;
}

export const putProjectService = async (req: Request, res: Response) => {
	const project = await Project.update(req.body, { where: { id: req.params.id } });

	return project;
}

export const getProjectsByUserIDService = async (userID: number, typeProject?: string) => {
	try {
		// @ts-ignore
		// const type_id_project = (await TypeProject.findOne({
		// 	where: { name: typeProject || null! }
		// }))?.id;

		// if (!type_id_project && typeProject) {
		// 	return {
		// 		error: "No projects found",
		// 		status: 400,
		// 		msg: "Invalid slug" // type project name
		// 	}
		// }

		const projects = await Project.findAll({
			where: {
				user_id: userID
			}
		});

		return projects;
	}
	catch (err) {
		console.log(err);
	}
}

export const getProjectByIDService = async (id: number) => {
	return Project.findOne({
		where: { id }
	});
}

export const getProjectsCostsService = async (id: number) => {
	var costsCategories = await ProjectCategory.findAll({
		where: { project_parent_id: id }
	});

	if (costsCategories.length === 0) {
		const projects = await Project.findAll({
			where: {
				[Op.or]: [
					{ id },
					{ parent_id: id }
				]
			} 
		});

		for (var project of projects) {
			await project.createProjectCategory({
				user_id: project.user_id,
				project_id: project.id,
				project_parent_id: project.parent_id,
				muros_y_columnas: "A",
				techos: "A",
				puertas_y_ventanas: "A",
				revestimientos: "A",
				banos: "A",
				instalaciones: "A"
			});
		}

		costsCategories = await ProjectCategory.findAll({
			where: { project_parent_id: id }
		});
	}

	const costsReferenceArr = await CostsReference.findAll();
	const costsReference = costsReferenceArr.reduce((obj, cur) => ({...obj, [cur.categoria]: cur.toJSON()}), {});

	const calculatedCosts = costsCategories.map(el => {
		return {
			project_id: el.id,
			muros_y_columnas: costsReference[el.muros_y_columnas].muros_y_columnas,
			techos: costsReference[el.techos].techos,
			puertas_y_ventanas: costsReference[el.puertas_y_ventanas].puertas_y_ventanas,
			revestimientos: costsReference[el.revestimientos].revestimientos,
			banos: costsReference[el.banos].banos,
			instalaciones: costsReference[el.instalaciones].instalaciones
		}
	})

	return {
		costsCategories,
		calculatedCosts
	}

	// calculated.find(el => {
	// 	return el.categoria === ela.muros_y_columnas
	// }).muros_y_columnas,
}

export const updateProjectCostsService = async (body: any, id: number) => {
	await ProjectCategory.update(body, { where: { project_id: id } });

	const costsReferenceArr = await CostsReference.findAll();
	const costsReference = costsReferenceArr.reduce((obj, cur) => ({...obj, [cur.categoria]: cur.toJSON()}), {});
	
	// console.log(costsReference)
	// console.log("body instal", body.instalaciones)
	
	return {
		calculatedProjectCosts: {
			project_id: id,
			muros_y_columnas: costsReference[body.muros_y_columnas].muros_y_columnas,
			techos: costsReference[body.techos].techos,
			puertas_y_ventanas: costsReference[body.puertas_y_ventanas].puertas_y_ventanas,
			revestimientos: costsReference[body.revestimientos].revestimientos,
			banos: costsReference[body.banos].banos,
			instalaciones: costsReference[body.instalaciones].instalaciones
		}
	}
}

export const createThumbnailService = async (req: Request, res: Response) => {
	console.log(req.file)
	res.status(200).json(req.file);
}











// en desuso
export const getProjectVersionsByIDService = async (id: number) => {
	return Project.findAll({
		where: {
			[Op.or]: [
				{ id: id },
				{ parent_id: id }
			]
		}
	});
}
