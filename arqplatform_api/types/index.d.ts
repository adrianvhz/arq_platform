import {} from "assert"

declare global {
	namespace Express {
		interface User {
			id: number;
		}

	}
}