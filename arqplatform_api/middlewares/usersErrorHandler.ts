import { HttpException } from "../interfaces";
import type { Request, Response, NextFunction } from "express";

function usersErrorHandler(err: HttpException & Error, req: Request, res: Response, next: NextFunction) {
	console.log("Users Error Handler");
	console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");
	console.log(err);
	console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");

	res.status(err.statusCode || 500).json({
		statusCode: err.statusCode || 500, // || 400
		error: {
			type: err.name,
			message: err.message,
		},
		hint: "Controller error handler"
	});
}

export default usersErrorHandler;
