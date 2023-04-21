export class HttpException {
	name: string = "HttpException";
	statusCode: number;
	message: string;

	constructor(status: number, message: string) {
		this.statusCode = status;
		this.message = message;
	}
}
