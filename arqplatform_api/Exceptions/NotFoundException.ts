import { HttpException } from "./HttpException";

export class NotFoundException implements HttpException {
	name: string = "NotFound";
	statusCode: number = 404;
	message: string;
	
	constructor(message: string) {
		this.message = message;
	}
}
