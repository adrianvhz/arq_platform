import { HttpException } from "../interfaces";
import type { Request, Response, NextFunction } from "express";

function costsRefereceErrorHandler(err: HttpException & Error, req: Request, res: Response, next: NextFunction) {
	console.log("costsReference Error Handler");
	console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");
	console.log(err);
	console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");

	const status = err.statusCode || 500;

	res.status(status).json({
		statusCode: status,
		error: {
			type: err.name,
			message: err.message,
		},
		hint: "Controller error handler"
	});
}

export default costsRefereceErrorHandler;
