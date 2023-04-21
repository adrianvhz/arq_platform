import { addPlanService, showPlanService } from "./../services/planService";
import type { Request, Response } from "express";

export const addPlanController = async (req: Request, res: Response) => {
	const plan = await addPlanService(req);

	try {
		if (plan.error.length === 0) {
			res.status(201).json(plan);
		} else {
			res.status(401).json(plan);
		}
	} catch (error) {
		return res.status(500).json(error);
	}
}

export const showPlanController = async(req:Request, res: Response) => {
	const plan = await showPlanService(req);

	try {
		if (plan.error.length === 0) {
			res.status(201).json(plan);
		} else {
			res.status(401).json(plan);
		}
	} catch (error) {
		return res.status(500).json(error);
	}
}
