import { Request, Response } from "express";
import { getTypeProjectService } from "../services/typeProjectService";

export const getTypeProjects = async (req: Request, res: Response) => {
	const typeProjects = await getTypeProjectService();
	const typeProjectsShow = typeProjects!.filter(typeProject => typeProject.show === true);
	res.json(typeProjectsShow);
}

export const getTypeProjectBySlug = async (req: Request, res: Response) => {
	const typeProjects = await getTypeProjectService();
	const typeProject = typeProjects!.filter(typeProject => typeProject.slug === req.params.slug);
	res.json(typeProject);
}
