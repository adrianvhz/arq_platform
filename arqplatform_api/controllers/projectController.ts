import {
	createProjectService,
	getAllProjectsService,
	deleteProjectService,
	putProjectService,
	getProjectsByUserIDService,
	getProjectByIDService,
	createThumbnailService,
	getProjectsCostsService,
	updateProjectCostsService
} from "../services/projectService";
import type { Request, Response } from "express";

export const getAllProjects = async (req: Request, res: Response) => {
	const projects = await getAllProjectsService();

	res.json({
		statusCode: 200,
		msg: "Proyectos obtenidos",
		proyectos: projects
	});
}

export const createProject = async (req: Request, res: Response) => {
	const project = await createProjectService(req, res);

	res.json({
		statusCode: 201,
		msg: "Proyecto creado",
		project: project
	});
}

export const putProject = async (req: Request, res: Response) => {
	const project = await putProjectService(req, res);
	
	res.status(200).json({
		statusCode: 200,
		msg: "Proyecto actualizado",
		project: project
	});
}

export const deleteProject = async (req: Request, res: Response) => {
	const project = await deleteProjectService(req, res);

	res.json({
		msg: "Proyecto eliminado",
		project: project
	});
}

export const getProjectsByUserID = async (req: Request, res: Response) => {
	const userID = Number(req.params.id);
	const typeProject = req.query.type_project as string;

	const projects = await getProjectsByUserIDService(userID, typeProject);

	res.json({
		msg: "Proyectos obtenidos por User ID.",
		proyectos: projects || []
	});
}

export const getProjectByID = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	
	
	const project = await getProjectByIDService(id);
	
	
	let projectJSON: any;

	try {
		projectJSON = project?.toJSON();
	} catch (err) {
		projectJSON = "Salio error";
	}

	console.log("aforo:", project?.aforo);
	console.log("project:", project?.toJSON());

	res.json({
		msg: "Sucesss1!",
		project: project?.toJSON(),
		aforo: project?.aforo,
		puntos: project?.puntos
	});
}

export const getProjectsCosts = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const { costsCategories, calculatedCosts } = await getProjectsCostsService(id);
	
	res
		.status(200)
		.json({
			statusCode: 200,
			costsCategories,
			calculatedCosts // || []  // puede que falle en produccion
		});
}

export const updateProjectCosts = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const data = await updateProjectCostsService(req.body, id);

	res
		.status(200)
		.json({
			statusCode: 200,
			calculatedProjectCosts: data.calculatedProjectCosts
		})

}

export const test = async (req: Request, res: Response) => {
	res.json({
		"dataRet": [
			{
				"campo": "PART-001",
				"columna": "BUKRS",
				"valor": "0027"
			},
			{
				"campo": "PART-001",
				"columna": "BELNR",
				"valor": "8100001414"
			},
			{
				"campo": "PART-001",
				"columna": "GJAHR",
				"valor": "2022"
			},
			{
				"campo": "PART-001",
				"columna": "PSPHI",
				"valor": "00002213"
			},
			{
				"campo": "PART-001",
				"columna": "POSNR",
				"valor": "00339866"
			},
			{
				"campo": "PART-001",
				"columna": "DMBTR",
				"valor": "100.00"
			},
			{
				"campo": "PART-001",
				"columna": "DMBE2",
				"valor": "25.27"
			},
			{
				"campo": "PART-001",
				"columna": "PSWSL",
				"valor": "PEN"
			},
			{
				"campo": "PART-001",
				"columna": "ZFBDT",
				"valor": "20221114"
			},
			{
				"campo": "PART-001",
				"columna": "STATUS",
				"valor": "A"
			},
			{
				"campo": "PART-001",
				"columna": "BLART",
				"valor": "R1"
			},
			{
				"campo": "PART-001",
				"columna": "LTEXT",
				"valor": "Aut. Dep. Separación"
			},
			{
				"campo": "PART-001",
				"columna": "SGTXT",
				"valor": "P20000013"
			},
			{
				"campo": "PART-002",
				"columna": "BUKRS",
				"valor": "0027"
			},
			{
				"campo": "PART-002",
				"columna": "BELNR",
				"valor": "8100001415"
			},
			{
				"campo": "PART-002",
				"columna": "GJAHR",
				"valor": "2022"
			},
			{
				"campo": "PART-002",
				"columna": "PSPHI",
				"valor": "00002214"
			},
			{
				"campo": "PART-002",
				"columna": "POSNR",
				"valor": "00339867"
			},
			{
				"campo": "PART-002",
				"columna": "DMBTR",
				"valor": "200.00"
			},
			{
				"campo": "PART-002",
				"columna": "DMBE2",
				"valor": "26.27"
			},
			{
				"campo": "PART-002",
				"columna": "PSWSL",
				"valor": "PEN"
			},
			{
				"campo": "PART-002",
				"columna": "ZFBDT",
				"valor": "20221115"
			},
			{
				"campo": "PART-002",
				"columna": "STATUS",
				"valor": "A"
			},
			{
				"campo": "PART-002",
				"columna": "BLART",
				"valor": "R1"
			},
			{
				"campo": "PART-002",
				"columna": "LTEXT",
				"valor": "Aut. Dep. Separación"
			},
			{
				"campo": "PART-002",
				"columna": "SGTXT",
				"valor": "P20000013"
			},
			{
				"campo": "PART-003",
				"columna": "BUKRS",
				"valor": "0027"
			},
			{
				"campo": "PART-003",
				"columna": "BELNR",
				"valor": "8100001416"
			},
			{
				"campo": "PART-003",
				"columna": "GJAHR",
				"valor": "2022"
			},
			{
				"campo": "PART-003",
				"columna": "PSPHI",
				"valor": "00002215"
			},
			{
				"campo": "PART-003",
				"columna": "POSNR",
				"valor": "00339868"
			},
			{
				"campo": "PART-003",
				"columna": "DMBTR",
				"valor": "100.00"
			},
			{
				"campo": "PART-003",
				"columna": "DMBE2",
				"valor": "35.27"
			},
			{
				"campo": "PART-003",
				"columna": "PSWSL",
				"valor": "PEN"
			},
			{
				"campo": "PART-003",
				"columna": "ZFBDT",
				"valor": "20221116"
			},
			{
				"campo": "PART-003",
				"columna": "STATUS",
				"valor": "A"
			},
			{
				"campo": "PART-003",
				"columna": "BLART",
				"valor": "R1"
			},
			{
				"campo": "PART-003",
				"columna": "LTEXT",
				"valor": "Aut. Dep. Separación"
			},
			{
				"campo": "PART-003",
				"columna": "SGTXT",
				"valor": "P20000013"
			},
			{
				"campo": "PART-004",
				"columna": "BUKRS",
				"valor": "0027"
			},
			{
				"campo": "PART-004",
				"columna": "BELNR",
				"valor": "8100001417"
			},
			{
				"campo": "PART-004",
				"columna": "GJAHR",
				"valor": "2022"
			},
			{
				"campo": "PART-004",
				"columna": "PSPHI",
				"valor": "00002216"
			},
			{
				"campo": "PART-004",
				"columna": "POSNR",
				"valor": "00339870"
			},
			{
				"campo": "PART-004",
				"columna": "DMBTR",
				"valor": "200.00"
			},
			{
				"campo": "PART-004",
				"columna": "DMBE2",
				"valor": "28.27"
			},
			{
				"campo": "PART-004",
				"columna": "PSWSL",
				"valor": "PEN"
			},
			{
				"campo": "PART-004",
				"columna": "ZFBDT",
				"valor": "20221118"
			},
			{
				"campo": "PART-004",
				"columna": "STATUS",
				"valor": "A"
			},
			{
				"campo": "PART-004",
				"columna": "BLART",
				"valor": "R1"
			},
			{
				"campo": "PART-004",
				"columna": "LTEXT",
				"valor": "Aut. Dep. Separación"
			},
			{
				"campo": "PART-004",
				"columna": "SGTXT",
				"valor": "P20000013"
			}
		],
		"mensaje": "Mensaje de respuesta",
		"tipo": "S"
	})
}

export const createThumbnail = async (req: Request, res: Response) => {
	await createThumbnailService(req, res);
}
