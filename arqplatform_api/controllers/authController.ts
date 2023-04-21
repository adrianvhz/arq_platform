import {
	loginUserService,
	registerUserService,
	revalidarTokenService,
	verifySSOService,
	loginSSOService,
	logoutSSOService
} from "../services/authService";
import type { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
	await loginUserService(req, res);
}

export const registerUser = async (req: Request, res: Response) => {
	await registerUserService(req, res);
}

export const revalidarToken = async(req: Request, res: Response) => {
	try {
		const resp = await revalidarTokenService(req);
		return res.status(200).json(resp);
	} catch (error: any) {
		console.log(error.message);
	}
}

export const verifySSO = async (req: Request, res: Response) => {
	await verifySSOService(req, res);
}

export const loginSSO = async (req: Request, res: Response) => {
	await loginSSOService(req, res);
}

export const logoutSSO = async (req: Request, res: Response) => {
	await logoutSSOService(req, res);
}
