import { Request, Response } from "express";
import { detailPlanPermissionService } from "../services/detailPlanPermissionService";

export const addDetailPlanPermissionController = async (req: Request, res: Response) => {

	const detail = await detailPlanPermissionService(req)

	try {
		if (detail.error.length === 0) {
			res.status(201).json(detail);
		} else {
			res.status(401).json(detail);
		}
	} catch (error) {
		return res.status(500).json(error);
	}
}
