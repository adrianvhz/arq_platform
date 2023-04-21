import { HttpException } from "./HttpException";

export class BadRequestException implements HttpException {
	name: string = "BadRequest";
	statusCode: number = 400;
	message: string;
	
	constructor(message: string) {
		this.message = message;
	}
}
