import { HttpException } from "../Exceptions";
import { request } from "./request";

export async function getUserMaster(email: string): Promise<User> {
	return new Promise((resolve, reject) => {
		const cr = request(process.env.MASTER_AUTH_WS + "/user/getUser", {
			method: "POST",
			headers: {
				"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzcwNjM0MDAsImlhdCI6MTY1NDA1MjgwMCwia2V5IjoiQUgzaUgxNlBYUzIifQ.9y631o_6Ejl9jMDAJcg2bLpWgoNAw6W89koYPxc9jD4",
				"Content-Type": "application/x-www-form-urlencoded"
			}
		},
		(res) => {
			res.setEncoding("utf8");
			
			var data = "";
			
			res.on("data", (chunk) => {
				data += chunk;
			});
			
			res.on("end", () => {
				resolve(JSON.parse(data).data);
			});
			
		});
		
		cr.on("error", (err) => {
			throw new HttpException(500, err.message);
		})
	
		cr.end(`user=${email}`);
	})
}

interface User {
	id: string;
	user: string;
	name: string;
	lastname: string;
}
