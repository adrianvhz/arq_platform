import { HttpException } from "./HttpException";

export class UnauthorizedException implements HttpException {
	name: string = "Unauthorized";
	statusCode: number = 401;
	message: string;
	
	constructor(message: string) {
		this.message = message;
	}
}
