import { ParamSchema, validationResult } from "express-validator";
import User from "../models/mariadb/user";
import type { Request, Response, NextFunction } from "express";

export const limitValidate = async (params: ParamSchema) => {
	if (!Number.isInteger(Number(params))) {
		throw new Error(`Parametros incorrectos`);
	}
}

export const validateEmail = async (email: string = "") => {
	const emailExists = await User.findOne({
		where: { email: email }
	});

	if (emailExists) {
		return Promise.reject("Ese correo ya esta registrado");
	}
}

export const ValidateCampos = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json({
				statusCode: 400,
				error: {
					type: "BadRequest",
					message: "Validator middleware (Validate campos)",
					info: errors.array()
				}
			});
	}

	next();
}
